import os
import sys
import time
import json
import subprocess
import urllib.request
import urllib.error

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TOOLS_E2E = os.path.join(RAIZ, "tools", "e2e")
LOGS_DIR = os.path.join(TOOLS_E2E, "logs")
PIDS_FILE = os.path.join(LOGS_DIR, "pids.json")

PORTS_SERVICES = [
    ("config", "infra/eduspace-config", 18888),
    ("eureka", "infra/eduspace-eureka", 18761),
    ("auth", "services/auth-ms", 8090),
    ("planificacion", "services/planificacion-ms", 8091),
    ("alumnos", "services/alumnos-ms", 8092),
    ("matricula", "services/matricula-ms", 8093),
    ("asistencia", "services/asistencia-ms", 8094),
    ("calificaciones", "services/calificaciones-ms", 8095),
    ("pago", "services/pago-ms", 8096),
    ("examenes", "services/examenes-ms", 8097),
    ("tareas", "services/tareas-ms", 8098),
    ("notificaciones", "services/notificaciones-ms", 8099),
    ("gateway", "infra/eduspace-gateway", 18080),
]

POSTGRES_DBS = [
    ("auth", 15440),
    ("planificacion", 15441),
    ("alumnos", 15442),
    ("matricula", 15443),
    ("asistencia", 15444),
    ("calificaciones", 15445),
    ("pago", 15446),
    ("examenes", 15447),
    ("tareas", 15448),
    ("notificaciones", 15449),
]

JV = ["-Xmx256m", "-Xss512k", "-XX:+UseSerialGC", "-XX:TieredStopAtLevel=1"]

def log(msg):
    print(f"[E2E] {msg}", flush=True)

def check_health(port, timeout=45):
    url = f"http://localhost:{port}/actuator/health"
    t0 = time.time()
    while time.time() - t0 < timeout:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "E2E-Check"})
            with urllib.request.urlopen(req, timeout=2) as r:
                body = r.read().decode("utf-8", errors="ignore")
                if "UP" in body:
                    return True
        except Exception:
            pass
        time.sleep(2)
    return False

def stop_java():
    log("Deteniendo procesos Java...")
    if os.path.exists(PIDS_FILE):
        try:
            with open(PIDS_FILE, "r") as f:
                pids = json.load(f)
            for name, pid in pids.items():
                try:
                    subprocess.run(["taskkill", "/F", "/PID", str(pid)], capture_output=True)
                except Exception:
                    pass
        except Exception:
            pass
        try:
            os.remove(PIDS_FILE)
        except Exception:
            pass

    for name, path, port in PORTS_SERVICES:
        kill_port(port)

def stop_all():
    stop_java()
    log("Eliminando contenedores e2e-*...")
    try:
        out = subprocess.check_output(["docker", "ps", "-a", "--format", "{{.Names}}"], text=True)
        for line in out.splitlines():
            name = line.strip()
            if name.startswith("e2e-"):
                subprocess.run(["docker", "rm", "-f", name], capture_output=True)
    except Exception as e:
        log(f"Aviso al limpiar docker: {e}")
    log("Detención completa.")

def kill_port(port):
    try:
        out = subprocess.check_output(f'netstat -ano | findstr :{port} | findstr LISTENING', shell=True, text=True)
        for line in out.splitlines():
            parts = line.strip().split()
            if len(parts) >= 5:
                pid = parts[-1]
                subprocess.run(["taskkill", "/F", "/PID", pid], capture_output=True)
    except Exception:
        pass

def start_infra():
    os.makedirs(LOGS_DIR, exist_ok=True)
    stop_all()

    log("Iniciando Kafka (KRaft)...")
    kp = 19092
    subprocess.run([
        "docker", "run", "-d", "--name", "e2e-kafka", "-p", f"{kp}:{kp}",
        "-e", "KAFKA_NODE_ID=1", "-e", "KAFKA_PROCESS_ROLES=broker,controller",
        "-e", f"KAFKA_LISTENERS=INTERNAL://0.0.0.0:9092,EXTERNAL://0.0.0.0:{kp},CONTROLLER://0.0.0.0:9093",
        "-e", f"KAFKA_ADVERTISED_LISTENERS=INTERNAL://localhost:9092,EXTERNAL://localhost:{kp}",
        "-e", "KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT",
        "-e", "KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL", "-e", "KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER",
        "-e", "KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093", "-e", "KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1",
        "-e", "KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1", "-e", "KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1",
        "-e", "KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS=0", "-e", "KAFKA_AUTO_CREATE_TOPICS_ENABLE=false",
        "-e", "KAFKA_HEAP_OPTS=-Xmx384m -Xms256m", "apache/kafka:4.3.1"
    ], check=True)

    log("Iniciando MinIO...")
    subprocess.run([
        "docker", "run", "-d", "--name", "e2e-minio", "-p", "19000:9000",
        "-e", "MINIO_ROOT_USER=minioadmin", "-e", "MINIO_ROOT_PASSWORD=minioadmin",
        "cgr.dev/chainguard/minio:latest", "server", "/data"
    ], check=True)

    log("Iniciando Mailpit...")
    subprocess.run([
        "docker", "run", "-d", "--name", "e2e-mailpit", "-p", "11025:1025", "-p", "18025:8025",
        "axllent/mailpit:v1.21"
    ], check=True)

    log("Iniciando 10 bases de datos PostgreSQL...")
    for n, p in POSTGRES_DBS:
        subprocess.run([
            "docker", "run", "-d", "--name", f"e2e-pg-{n}", "-p", f"{p}:5432",
            "-e", f"POSTGRES_DB={n}_db", "-e", "POSTGRES_USER=eduspace", "-e", "POSTGRES_PASSWORD=eduspace",
            "-e", "TZ=America/Lima", "postgres:16-alpine",
            "-c", "shared_buffers=32MB", "-c", "max_connections=60"
        ], check=True)

    log("Esperando 10 segundos para inicialización de bases de datos y Kafka...")
    time.sleep(10)

def find_jar(rel_dir):
    target = os.path.join(RAIZ, rel_dir.replace("/", os.sep), "target")
    if not os.path.exists(target):
        return None
    for f in os.listdir(target):
        if f.endswith(".jar") and not f.endswith(".jar.original"):
            return os.path.join(target, f)
    return None

def start_services():
    pids = {}
    env = os.environ.copy()
    env["KAFKA_BOOTSTRAP_SERVERS"] = "localhost:19092"
    env["JWK_SET_URI"] = "http://localhost:8090/.well-known/jwks.json"
    env["CORS_ALLOWED_ORIGINS"] = "http://localhost:4200,http://127.0.0.1:4200,http://localhost:5000,http://*:4200"

    def launch(name, rel_dir, port):
        jar = find_jar(rel_dir)
        if not jar:
            raise RuntimeError(f"No se encontró jar en {rel_dir}/target!")
        log_file = open(os.path.join(LOGS_DIR, f"{name}.log"), "w", encoding="utf-8")
        work_dir = os.path.join(RAIZ, rel_dir.replace("/", os.sep))
        cmd = ["java"] + JV + ["-jar", jar]
        proc = subprocess.Popen(cmd, cwd=work_dir, stdout=log_file, stderr=subprocess.STDOUT, env=env)
        pids[name] = proc.pid
        log(f"Lanzado {name} (PID: {proc.pid})")
        return proc

    # 1. Config
    launch("config", "infra/eduspace-config", 18888)
    log("Esperando a eduspace-config (18888)...")
    if not check_health(18888, 60):
        raise RuntimeError("eduspace-config no respondió UP a tiempo.")
    log("eduspace-config UP!")

    # 2. Eureka
    launch("eureka", "infra/eduspace-eureka", 18761)
    log("Esperando a eduspace-eureka (18761)...")
    if not check_health(18761, 60):
        raise RuntimeError("eduspace-eureka no respondió UP a tiempo.")
    log("eduspace-eureka UP!")

    # 3. Auth
    launch("auth", "services/auth-ms", 8090)
    log("Esperando a auth-ms (8090)...")
    if not check_health(8090, 60):
        raise RuntimeError("auth-ms no respondió UP a tiempo.")
    log("auth-ms UP!")

    # 4. Los 9 servicios de dominio
    dom_services = [
        ("planificacion", "services/planificacion-ms", 8091),
        ("alumnos", "services/alumnos-ms", 8092),
        ("notificaciones", "services/notificaciones-ms", 8099),
        ("matricula", "services/matricula-ms", 8093),
        ("asistencia", "services/asistencia-ms", 8094),
        ("tareas", "services/tareas-ms", 8098),
        ("pago", "services/pago-ms", 8096),
        ("examenes", "services/examenes-ms", 8097),
        ("calificaciones", "services/calificaciones-ms", 8095),
    ]

    for name, rel_dir, port in dom_services:
        launch(name, rel_dir, port)

    # 5. Gateway
    launch("gateway", "infra/eduspace-gateway", 18080)

    with open(PIDS_FILE, "w") as f:
        json.dump(pids, f)

    log("Esperando a que todos los microservicios estén UP...")
    all_up = True
    for name, rel_dir, port in dom_services + [("gateway", "infra/eduspace-gateway", 18080)]:
        ok = check_health(port, 90)
        status_txt = "UP" if ok else "TIMEOUT / ERROR"
        log(f" - {name:<15} (:{port}) -> {status_txt}")
        if not ok:
            all_up = False

    if all_up:
        log("¡TODOS LOS SERVICIOS ESTAN UP Y LISTOS!")
    else:
        log("Aviso: Algunos servicios tardaron en reportar UP. Revisa los logs en tools/e2e/logs/")

def run_scenarios():
    log("Esperando 15s para propagación de Eureka...")
    time.sleep(15)

    scenarios = [
        "01_planificacion_alumnos.py",
        "02_matricula_pago.py",
        "03_cobro_y_replicas.py",
        "04_asistencia_tareas_examenes.py",
        "05_calificaciones_boletin.py",
        "06_gateway_traslado_notificaciones.py",
    ]

    total_ok = True
    for sc in scenarios:
        sc_path = os.path.join(TOOLS_E2E, sc)
        log(f"\n======================================================\nEJECUTANDO: {sc}\n======================================================")
        res = subprocess.run([sys.executable, sc_path], cwd=TOOLS_E2E, capture_output=True, text=True)
        print(res.stdout)
        if res.stderr:
            print(res.stderr)
        if res.returncode != 0 or "FAILS: []" not in res.stdout:
            total_ok = False
            log(f"Falla detectada en {sc}")

    if total_ok:
        log("\n******************************************************\nTODOS LOS ESCENARIOS E2E OK - EXITO TOTAL!\n******************************************************")
    else:
        log("\nSe detectaron fallas en algunos escenarios (revisar salida arriba).")

if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "start"
    if action == "start":
        start_infra()
        start_services()
    elif action == "restart-services":
        stop_java()
        start_services()
    elif action == "stop":
        stop_all()
    elif action == "test":
        run_scenarios()
    elif action == "all":
        start_infra()
        start_services()
        run_scenarios()
    else:
        print("Uso: python e2e_runner.py [start|stop|test|all]")

