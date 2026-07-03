document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const toggle = document.getElementById('lang-toggle');
  const isEnglish = localStorage.getItem('stylesmary-lang') === 'en';

  const translations = {
    es: {
      services: 'Servicios',
      gallery: 'Galería',
      schedule: 'Horario',
      contact: 'Contacto',
      badge: 'Experiencia exclusiva · Reserva prioritaria',
      title: 'Elegancia, precisión y resultado impecable en cada visita.',
      description: 'En Styles ✂ Mary creamos looks sofisticados con cortes modernos, coloración premium y tratamientos que realzan tu belleza con una experiencia exclusiva.',
      highlight1: 'Atención personalizada',
      highlight2: 'Productos premium',
      highlight3: 'Ambiente exclusivo',
      primaryBtn: 'Reservar cita',
      secondaryBtn: 'Ver servicios',
      sectionTitle1: 'Servicios de alto nivel',
      sectionText1: 'Una experiencia cuidada hasta el último detalle.',
      card1Title: 'Cortes personalizados',
      card1Text: 'Diseñamos cada corte con precisión para que realce tu esencia y personalidad.',
      card2Title: 'Coloración profesional',
      card2Text: 'Reflejos, balayage y tonos sofisticados con una ejecución impecable.',
      card3Title: 'Tratamientos capilares',
      card3Text: 'Hidratación, reconstrucción y cuidado premium para un cabello brillante y saludable.',
      galleryTitle: 'Resultados que hablan por sí solos',
      galleryText: 'Looks elegantes, modernos y cuidadosamente ejecutados.',
      gallery1Title: 'Cortes modernos',
      gallery1Text: 'Texturas limpias, volumen elegante y personalidad.',
      gallery2Title: 'Color sofisticado',
      gallery2Text: 'Paletas de color con profundidad, luminosidad y refinamiento.',
      gallery3Title: 'Estilo y cuidado',
      gallery3Text: 'Tratamientos que devuelven fuerza, brillo y suavidad.',
      scheduleTitle: 'Horario de atención',
      scheduleWeekdays: 'Lunes a Viernes: 9:00 - 20:00',
      scheduleSaturday: 'Sábado: 9:00 - 14:00',
      scheduleSunday: 'Domingo: Cerrado',
      formTitle: 'Reserva tu cita',
      nameLabel: 'Nombre',
      emailLabel: 'Correo',
      dateLabel: 'Fecha',
      timeLabel: 'Hora',
      serviceLabel: 'Servicio',
      servicePlaceholder: 'Elige el servicio que deseas',
      serviceOpt1: 'Corte personalizado',
      serviceOpt2: 'Coloración profesional',
      serviceOpt3: 'Tratamiento capilar',
      submitBtn: 'Reservar cita',
      aboutTitle1: 'Un espacio pensado para tu estilo',
      aboutText1: 'En Styles ✂ Mary combinamos técnica, creatividad y una atención cercana para que cada visita sea una experiencia relajante y memorable.',
      aboutList1: 'Profesionales con experiencia y formación constante.',
      aboutList2: 'Productos de calidad para cuidar tu cabello.',
      aboutList3: 'Ambiente acogedor y moderno.',
      aboutTitle2: 'Por qué nos eligen',
      aboutText2: 'Nos encanta escuchar tus ideas y convertirlas en un resultado que te haga sentir segura, cómoda y con estilo.',
      bannerTitle: '¿Listo para transformar tu look?',
      bannerText: 'Reserva tu cita y vive una experiencia premium hecha para destacar.',
      bannerBtn: 'Agendar cita',
      overlayTitle: 'Estudio privado',
      overlayText: 'Tu cita, tu tiempo, tu estilo.',
      footerText: 'Styles ✂ Mary by Mary Puentes. Todos los derechos reservados.',
      footerMap: 'Av. Principal 123, Ciudad · Ver en Google Maps',
      titleTag: 'Styles ✂ Mary | Salón premium de Mary Puentes',
      metaDescription: 'Styles ✂ Mary es un salón premium de Mary Puentes con cortes, coloración y tratamientos exclusivos.',
      whatsappHref: 'https://wa.me/19143300160?text=Hola,%20quiero%20agendar%20una%20cita%20con%20Mary%20Puentes'
    },
    en: {
      services: 'Services',
      gallery: 'Gallery',
      schedule: 'Schedule',
      contact: 'Contact',
      badge: 'Exclusive experience · Priority booking',
      title: 'Elegance, precision and impeccable results at every visit.',
      description: 'At Styles ✂ Mary we create sophisticated looks with modern cuts, premium color and treatments that enhance your beauty with an exclusive experience.',
      highlight1: 'Personalized attention',
      highlight2: 'Premium products',
      highlight3: 'Exclusive atmosphere',
      primaryBtn: 'Book appointment',
      secondaryBtn: 'View services',
      sectionTitle1: 'High-level services',
      sectionText1: 'An experience cared for down to the last detail.',
      card1Title: 'Personalized cuts',
      card1Text: 'We design each cut with precision so it highlights your essence and personality.',
      card2Title: 'Professional coloring',
      card2Text: 'Highlights, balayage and sophisticated tones with impeccable execution.',
      card3Title: 'Hair treatments',
      card3Text: 'Hydration, reconstruction and premium care for shiny, healthy hair.',
      galleryTitle: 'Results that speak for themselves',
      galleryText: 'Elegant, modern looks, carefully executed.',
      gallery1Title: 'Modern cuts',
      gallery1Text: 'Clean textures, elegant volume and personality.',
      gallery2Title: 'Sophisticated color',
      gallery2Text: 'Color palettes with depth, luminosity and refinement.',
      gallery3Title: 'Style and care',
      gallery3Text: 'Treatments that restore strength, shine and softness.',
      scheduleTitle: 'Opening hours',
      scheduleWeekdays: 'Monday to Friday: 9:00 AM - 8:00 PM',
      scheduleSaturday: 'Saturday: 9:00 AM - 2:00 PM',
      scheduleSunday: 'Sunday: Closed',
      formTitle: 'Book your appointment',
      nameLabel: 'Name',
      emailLabel: 'Email',
      dateLabel: 'Date',
      timeLabel: 'Time',
      serviceLabel: 'Service',
      servicePlaceholder: 'Choose the service you want',
      serviceOpt1: 'Personalized cut',
      serviceOpt2: 'Professional coloring',
      serviceOpt3: 'Hair treatment',
      submitBtn: 'Book appointment',
      aboutTitle1: 'A space designed for your style',
      aboutText1: 'At Styles ✂ Mary we combine technique, creativity and close attention so each visit is a relaxing and memorable experience.',
      aboutList1: 'Professionals with experience and ongoing training.',
      aboutList2: 'Quality products to care for your hair.',
      aboutList3: 'Warm and modern atmosphere.',
      aboutTitle2: 'Why they choose us',
      aboutText2: 'We love listening to your ideas and turning them into a result that makes you feel confident, comfortable and stylish.',
      bannerTitle: 'Ready to transform your look?',
      bannerText: 'Book your appointment and experience a premium experience made to stand out.',
      bannerBtn: 'Book appointment',
      overlayTitle: 'Private studio',
      overlayText: 'Your appointment, your time, your style.',
      footerText: 'Styles ✂ Mary by Mary Puentes. All rights reserved.',
      footerMap: 'Main Ave 123, City · See on Google Maps',
      titleTag: 'Styles ✂ Mary | Premium salon by Mary Puentes',
      metaDescription: 'Styles ✂ Mary is a premium salon by Mary Puentes offering luxury cuts, color, and personalized hair treatments.',
      whatsappHref: 'https://wa.me/19143300160?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment%20with%20Mary%20Puentes.'
    }
  };

  function applyLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });
    document.querySelectorAll('[data-i18n-value]').forEach((el) => {
      const key = el.getAttribute('data-i18n-value');
      if (t[key]) {
        el.value = t[key];
      }
    });
    document.querySelectorAll('[data-i18n-meta]').forEach((el) => {
      const key = el.getAttribute('data-i18n-meta');
      if (t[key]) {
        el.setAttribute('content', t[key]);
      }
    });
    document.querySelectorAll('[data-i18n-href]').forEach((el) => {
      const key = el.getAttribute('data-i18n-href');
      if (t[key]) {
        el.setAttribute('href', t[key]);
      }
    });
    localStorage.setItem('stylesmary-lang', lang);
    if (toggle) {
      toggle.textContent = lang === 'en' ? 'ES' : 'EN';
    }
  }

  if (toggle) {
    applyLanguage(isEnglish ? 'en' : 'es');
    toggle.addEventListener('click', () => {
      const nextLang = localStorage.getItem('stylesmary-lang') === 'en' ? 'es' : 'en';
      applyLanguage(nextLang);
    });
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
                  <img class="gallery-item-image" src="${image.url || `/uploads/${image.filename || image}`}" alt="${image.title || 'Foto de la galería'}" />
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
