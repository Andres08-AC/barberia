document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.97)' },
          { transform: 'scale(1)' }
        ],
        { duration: 220 }
      );
    });
  });

  const form = document.getElementById('reservation-form');
  const message = document.getElementById('form-message');

  if (form && message) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      message.textContent = 'Guardando cita...';

      try {
        const response = await fetch('/appointments', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        message.textContent = data.message || 'Cita registrada.';
        if (response.ok) {
          form.reset();
        }
      } catch (error) {
        message.textContent = 'No se pudo guardar la cita. Intenta de nuevo.';
      }
    });
  }

  const galleryGrid = document.getElementById('gallery-grid');
  const galleryPagination = document.getElementById('gallery-pagination');

  if (galleryGrid) {
    fetch('/uploads')
      .then((response) => response.json())
      .catch(() => [])
      .then((images) => {
        if (!Array.isArray(images)) {
          return;
        }

        const perPage = 6;
        const pages = Math.ceil(images.length / perPage);

        if (images.length === 0) {
          galleryGrid.innerHTML = '<p class="section-title">Aún no hay fotos en la galería.</p>';
          return;
        }

        const renderPage = (page) => {
          const start = (page - 1) * perPage;
          const visibleImages = images.slice(start, start + perPage);

          galleryGrid.innerHTML = visibleImages
            .map(
              (image) => `
                <article class="gallery-card">
                  <img src="${image.url || `/uploads/${image.filename || image}`}" alt="${image.title || 'Foto de la galería'}" style="width:100%; height:220px; object-fit:cover; border-radius:14px; margin-bottom:0.8rem;" />
                  <h3>${image.title || 'Foto de la galería'}</h3>
                  ${image.description ? `<p>${image.description}</p>` : ''}
                </article>
              `
            )
            .join('');
        };

        if (galleryPagination) {
          galleryPagination.innerHTML = Array.from({ length: pages }, (_, index) => {
            const pageNumber = index + 1;
            return `<button class="btn btn-secondary" data-page="${pageNumber}" ${pageNumber === 1 ? 'disabled' : ''}>${pageNumber}</button>`;
          }).join('');

          galleryPagination.querySelectorAll('button[data-page]').forEach((button) => {
            button.addEventListener('click', () => {
              const page = Number(button.getAttribute('data-page'));
              renderPage(page);
              galleryPagination.querySelectorAll('button[data-page]').forEach((btn) => btn.disabled = false);
              button.disabled = true;
            });
          });
        }

        renderPage(1);
      });
  }
});
