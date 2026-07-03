import os
import unittest
from io import BytesIO

import psycopg

from app import app, UPLOAD_FOLDER


class GalleryAdminFlowTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self._cleanup_test_data()

    def tearDown(self):
        self._cleanup_test_data()

    def _cleanup_test_data(self):
        for path in UPLOAD_FOLDER.glob("test_gallery_*"):
            if path.is_file():
                path.unlink()

        with psycopg.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", "5432")),
            dbname=os.getenv("DB_NAME", "peluqueria_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "root"),
        ) as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM galeria_imagenes WHERE titulo LIKE %s", ("Test gallery%",))
            conn.commit()

    def _upload_image(self, title, description, filename="test_gallery.png"):
        image_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
        response = self.client.post(
            "/admin/gallery",
            data={
                "title": title,
                "description": description,
                "image": (BytesIO(image_bytes), filename),
            },
            content_type="multipart/form-data",
        )
        self.assertEqual(response.status_code, 302)
        return response

    def test_upload_delete_and_replace_gallery_image(self):
        self._upload_image("Test gallery upload", "Descripción inicial")

        with psycopg.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", "5432")),
            dbname=os.getenv("DB_NAME", "peluqueria_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "root"),
        ) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, titulo, descripcion, nombre_archivo FROM galeria_imagenes WHERE titulo = %s",
                    ("Test gallery upload",),
                )
                row = cur.fetchone()

        self.assertIsNotNone(row)
        image_id = row[0]
        old_filename = row[3]

        replace_response = self.client.post(
            f"/admin/gallery/{image_id}/replace",
            data={
                "title": "Test gallery replace",
                "description": "Descripción actualizada",
                "image": (BytesIO(b"\x89PNG\r\n\x1a\n"), "test_gallery_replaced.png"),
            },
            content_type="multipart/form-data",
        )
        self.assertEqual(replace_response.status_code, 302)

        with psycopg.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", "5432")),
            dbname=os.getenv("DB_NAME", "peluqueria_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "root"),
        ) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT titulo, descripcion, nombre_archivo FROM galeria_imagenes WHERE id = %s",
                    (image_id,),
                )
                updated_row = cur.fetchone()

        self.assertEqual(updated_row[0], "Test gallery replace")
        self.assertEqual(updated_row[1], "Descripción actualizada")
        self.assertNotEqual(updated_row[2], old_filename)

        delete_response = self.client.post(f"/admin/gallery/{image_id}/delete")
        self.assertEqual(delete_response.status_code, 302)

        with psycopg.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", "5432")),
            dbname=os.getenv("DB_NAME", "peluqueria_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "root"),
        ) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1 FROM galeria_imagenes WHERE id = %s", (image_id,))
                self.assertIsNone(cur.fetchone())


if __name__ == "__main__":
    unittest.main()
