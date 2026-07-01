# Peluquería Aurora

Aplicación web para peluquería con:
- landing page pública
- formulario de citas
- panel de administración protegido
- galería administrable

## Variables de entorno

En el despliegue define:
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- ADMIN_USERNAME
- ADMIN_PASSWORD

## Ejecutar localmente

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Desplegar en Render (forma simple)

1. Sube esta carpeta a GitHub.
2. Crea un nuevo servicio Web en Render.
3. Conecta el repositorio y selecciona la carpeta backend como raíz del servicio.
4. Usa estos valores:
   - Build Command: pip install -r requirements.txt
   - Start Command: python app.py
5. Añade estas variables de entorno:
   - DB_HOST
   - DB_PORT
   - DB_NAME
   - DB_USER
   - DB_PASSWORD
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
6. Conecta una base de datos PostgreSQL en Render o usa una externa.
7. Cuando termine el despliegue, Render te dará una URL pública.

## Forma simple de abrirlo después

Una vez publicado, abre la URL que te dio Render y entra en:
- / para la landing page
- /admin para el panel
