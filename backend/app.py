import os
from pathlib import Path

import psycopg
from flask import Flask, jsonify, render_template, request, send_from_directory, redirect, url_for, session
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

app = Flask(__name__, template_folder=str(FRONTEND_DIR), static_folder=str(FRONTEND_DIR), static_url_path="/")
app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["ADMIN_USERNAME"] = os.getenv("ADMIN_USERNAME", "admin")
app.config["ADMIN_PASSWORD"] = os.getenv("ADMIN_PASSWORD", "aurora2026")
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "aurora-admin-secret")


def get_db_config():
    return {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": int(os.getenv("DB_PORT", "5432")),
        "dbname": os.getenv("DB_NAME", "peluqueria_db"),
        "user": os.getenv("DB_USER", "postgres"),
        "password": os.getenv("DB_PASSWORD", "root"),
        "connect_timeout": 5,
    }


def init_db():
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS clientes (
                    id SERIAL PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    email VARCHAR(150) UNIQUE NOT NULL,
                    telefono VARCHAR(20),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS servicios (
                    id SERIAL PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    descripcion TEXT,
                    precio NUMERIC(10,2) DEFAULT 0,
                    duracion_minutos INT DEFAULT 60,
                    activo BOOLEAN DEFAULT TRUE
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS empleados (
                    id SERIAL PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    especialidad VARCHAR(100),
                    activo BOOLEAN DEFAULT TRUE
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS citas (
                    id SERIAL PRIMARY KEY,
                    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE,
                    servicio_id INT REFERENCES servicios(id) ON DELETE SET NULL,
                    empleado_id INT REFERENCES empleados(id) ON DELETE SET NULL,
                    fecha_hora TIMESTAMP NOT NULL,
                    estado VARCHAR(20) DEFAULT 'pendiente',
                    observaciones TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS mensajes_contacto (
                    id SERIAL PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    email VARCHAR(150) NOT NULL,
                    mensaje TEXT NOT NULL,
                    leido BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS galeria_imagenes (
                    id SERIAL PRIMARY KEY,
                    titulo VARCHAR(200) NOT NULL,
                    descripcion TEXT DEFAULT '',
                    nombre_archivo VARCHAR(255) NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cur.execute(
                """
                ALTER TABLE galeria_imagenes
                ADD COLUMN IF NOT EXISTS descripcion TEXT DEFAULT ''
                """
            )
            cur.execute(
                """
                INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos)
                SELECT %s, %s, %s, %s
                WHERE NOT EXISTS (
                    SELECT 1 FROM servicios WHERE nombre = %s
                )
                """,
                (
                    "Corte personalizado",
                    "Corte adaptado a tu estilo y rostro.",
                    35.0,
                    45,
                    "Corte personalizado",
                ),
            )
            cur.execute(
                """
                INSERT INTO empleados (nombre, especialidad)
                SELECT %s, %s
                WHERE NOT EXISTS (
                    SELECT 1 FROM empleados WHERE nombre = %s
                )
                """,
                ("Ana López", "Cortes y color", "Ana López"),
            )
            cur.execute(
                """
                INSERT INTO empleados (nombre, especialidad)
                SELECT %s, %s
                WHERE NOT EXISTS (
                    SELECT 1 FROM empleados WHERE nombre = %s
                )
                """,
                ("Marta Ruiz", "Tratamientos capilares", "Marta Ruiz"),
            )
        conn.commit()


def save_contact(name, email, service):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO mensajes_contacto (nombre, email, mensaje, leido)
                VALUES (%s, %s, %s, FALSE)
                """,
                (name, email, service),
            )
        conn.commit()


def save_gallery_image(title, description, filename):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO galeria_imagenes (titulo, descripcion, nombre_archivo)
                VALUES (%s, %s, %s)
                """,
                (title, description, filename),
            )
        conn.commit()


def update_gallery_image(image_id, title, description, filename):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE galeria_imagenes
                SET titulo = %s, descripcion = %s, nombre_archivo = %s
                WHERE id = %s
                """,
                (title, description, filename, image_id),
            )
            updated = cur.rowcount > 0
        conn.commit()
    return updated


def get_gallery_image_filename(image_id):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT nombre_archivo FROM galeria_imagenes WHERE id = %s
                """,
                (image_id,),
            )
            row = cur.fetchone()
    return row[0] if row else None


def delete_gallery_image(image_id):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT nombre_archivo FROM galeria_imagenes WHERE id = %s
                """,
                (image_id,),
            )
            row = cur.fetchone()
            if not row:
                return None

            filename = row[0]
            cur.execute("DELETE FROM galeria_imagenes WHERE id = %s", (image_id,))
        conn.commit()
    return filename


def get_gallery_images():
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT titulo, descripcion, nombre_archivo, created_at
                FROM galeria_imagenes
                ORDER BY created_at DESC
                """
            )
            rows = cur.fetchall()

    return [
        {
            "title": row[0],
            "description": row[1] or "",
            "filename": row[2],
            "url": f"/uploads/{row[2]}",
            "created_at": row[3].isoformat() if row[3] else None,
        }
        for row in rows
    ]


def save_appointment(name, email, appointment_date, appointment_time, service):
    with psycopg.connect(**get_db_config()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO clientes (nombre, email)
                VALUES (%s, %s)
                ON CONFLICT (email) DO UPDATE
                SET nombre = EXCLUDED.nombre
                RETURNING id
                """,
                (name, email),
            )
            client_id = cur.fetchone()[0]

            cur.execute(
                """
                SELECT id FROM servicios WHERE nombre = %s
                """,
                (service,),
            )
            service_row = cur.fetchone()
            service_id = service_row[0] if service_row else None

            cur.execute(
                """
                INSERT INTO citas (cliente_id, servicio_id, fecha_hora, estado, observaciones)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    client_id,
                    service_id,
                    f"{appointment_date} {appointment_time}",
                    "pendiente",
                    "Reservada desde la web",
                ),
            )
        conn.commit()


def get_admin_data():
    try:
        with psycopg.connect(**get_db_config()) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, nombre, email, mensaje, leido, created_at
                    FROM mensajes_contacto
                    ORDER BY created_at DESC
                    """
                )
                messages = cur.fetchall()

                cur.execute(
                    """
                    SELECT c.id, cl.nombre, s.nombre, e.nombre, c.fecha_hora, c.estado
                    FROM citas c
                    LEFT JOIN clientes cl ON c.cliente_id = cl.id
                    LEFT JOIN servicios s ON c.servicio_id = s.id
                    LEFT JOIN empleados e ON c.empleado_id = e.id
                    ORDER BY c.fecha_hora DESC
                    """
                )
                appointments = cur.fetchall()

                cur.execute(
                    """
                    SELECT id, titulo, descripcion, nombre_archivo, created_at
                    FROM galeria_imagenes
                    ORDER BY created_at DESC
                    """
                )
                gallery_images = cur.fetchall()

        return messages, appointments, gallery_images, None
    except Exception as exc:
        app.logger.warning("No se pudo cargar el panel de administración: %s", exc)
        return [], [], [], str(exc)


@app.get("/")
def index():
    return render_template("index.html")


def is_admin_authenticated():
    return bool(session.get("admin_authenticated"))


@app.before_request
def protect_admin_area():
    if request.path.startswith("/admin") and request.path not in {"/admin/login", "/admin/static"}:
        if not is_admin_authenticated():
            return redirect(url_for("admin_login", next=request.path))


@app.get("/admin/login")
@app.post("/admin/login")
def admin_login():
    next_url = request.args.get("next", request.form.get("next", url_for("admin_panel")))

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if username == app.config["ADMIN_USERNAME"] and password == app.config["ADMIN_PASSWORD"]:
            session["admin_authenticated"] = True
            session["admin_username"] = username
            return redirect(next_url)

        return render_template("admin_login.html", error="Usuario o contraseña incorrectos.", next_url=next_url)

    return render_template("admin_login.html", error="", next_url=next_url)


@app.get("/admin")
def admin_panel():
    messages, appointments, gallery_images, db_error = get_admin_data()
    message = request.args.get("message", "")
    return render_template(
        "admin.html",
        messages=messages,
        appointments=appointments,
        gallery_images=gallery_images,
        db_error=db_error,
        message=message,
    )


@app.post("/contact")
def contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    service = request.form.get("service", "").strip()

    if not name or not email:
        return jsonify({"success": False, "message": "Por favor completa tu nombre y correo."}), 400

    try:
        save_contact(name, email, service)
    except Exception as exc:
        app.logger.exception("No se pudo guardar el contacto en PostgreSQL")
        return jsonify({"success": False, "message": "No se pudo guardar la solicitud. Revisa la conexión a PostgreSQL."}), 500

    return jsonify({
        "success": True,
        "message": "Gracias por tu mensaje. Te contactaremos pronto para confirmar tu cita."
    })


@app.post("/appointments")
def appointments():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    appointment_date = request.form.get("date", "").strip()
    appointment_time = request.form.get("time", "").strip()
    service = request.form.get("service", "").strip()

    if not name or not email or not appointment_date or not appointment_time or not service:
        return jsonify({"success": False, "message": "Completa todos los campos para reservar tu cita."}), 400

    try:
        save_appointment(name, email, appointment_date, appointment_time, service)
    except Exception as exc:
        app.logger.exception("No se pudo guardar la cita en PostgreSQL")
        return jsonify({"success": False, "message": "No se pudo guardar la cita. Revisa la conexión a PostgreSQL."}), 500

    return jsonify({
        "success": True,
        "message": "Tu cita ha quedado registrada correctamente."
    })


@app.post("/admin/gallery")
def upload_gallery_image():
    title = request.form.get("title", "").strip()
    description = request.form.get("description", "").strip()
    image = request.files.get("image")

    if not title or not image or not image.filename:
        return redirect(url_for("admin_panel", message="Completa el título y selecciona una imagen."))

    filename = secure_filename(f"{Path(image.filename).stem}_{os.urandom(4).hex()}{Path(image.filename).suffix}")
    image_path = UPLOAD_FOLDER / filename
    image.save(image_path)

    try:
        save_gallery_image(title, description, filename)
        return redirect(url_for("admin_panel", message="Foto subida correctamente."))
    except Exception as exc:
        app.logger.warning("No se pudo guardar la foto en PostgreSQL: %s", exc)
        if image_path.exists():
            image_path.unlink()
        return redirect(url_for("admin_panel", message="No se pudo guardar la imagen. Revisa la conexión a PostgreSQL."))


@app.post("/admin/gallery/<int:image_id>/replace")
def replace_gallery_image(image_id):
    title = request.form.get("title", "").strip()
    description = request.form.get("description", "").strip()
    image = request.files.get("image")

    if not title or not image or not image.filename:
        return redirect(url_for("admin_panel", message="Completa el título y selecciona una imagen para reemplazar."))

    old_filename = get_gallery_image_filename(image_id)
    filename = secure_filename(f"{Path(image.filename).stem}_{os.urandom(4).hex()}{Path(image.filename).suffix}")
    image_path = UPLOAD_FOLDER / filename
    image.save(image_path)

    try:
        if not update_gallery_image(image_id, title, description, filename):
            if image_path.exists():
                image_path.unlink()
            return redirect(url_for("admin_panel", message="No se encontró la foto a reemplazar."))

        if old_filename and old_filename != filename:
            old_path = UPLOAD_FOLDER / old_filename
            if old_path.exists():
                old_path.unlink()

        return redirect(url_for("admin_panel", message="Foto reemplazada correctamente."))
    except Exception as exc:
        app.logger.warning("No se pudo reemplazar la foto en PostgreSQL: %s", exc)
        if image_path.exists():
            image_path.unlink()
        return redirect(url_for("admin_panel", message="No se pudo reemplazar la imagen. Revisa la conexión a PostgreSQL."))


@app.post("/admin/gallery/<int:image_id>/delete")
def delete_gallery_image_route(image_id):
    filename = delete_gallery_image(image_id)
    if filename:
        image_path = UPLOAD_FOLDER / filename
        if image_path.exists():
            image_path.unlink()
        return redirect(url_for("admin_panel", message="Foto eliminada correctamente."))
    return redirect(url_for("admin_panel", message="No se encontró la foto a eliminar."))


@app.get("/uploads")
def list_uploads():
    try:
        images = get_gallery_images()
        if images:
            return jsonify(images)
    except Exception as exc:
        app.logger.warning("No se pudo leer la galería desde PostgreSQL: %s", exc)

    files = sorted(
        [
            f.name
            for f in UPLOAD_FOLDER.iterdir()
            if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
        ],
        key=lambda name: (UPLOAD_FOLDER / name).stat().st_mtime,
        reverse=True,
    )
    return jsonify(
        [
            {
                "title": Path(name).stem.replace("_", " "),
                "description": "",
                "filename": name,
                "url": f"/uploads/{name}",
            }
            for name in files
        ]
    )


@app.get("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


try:
    init_db()
    app.logger.info("Conexión a PostgreSQL establecida correctamente")
except Exception as exc:
    app.logger.warning("No se pudo conectar a PostgreSQL: %s", exc)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(debug=False, host="0.0.0.0", port=port)
