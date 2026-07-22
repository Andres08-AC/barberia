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
      serviceCategory1Title: 'Keratina & tratamientos',
      serviceCategory1Item1: 'Keratina parcial',
      serviceCategory1Item2: 'Keratina completa',
      serviceCategory1Item3: 'Tratamiento Olaplex hidratante',
      serviceCategory1Item4: 'Wella Professionals terapia de reparación',
      serviceCategory2Title: 'Cortes',
      serviceCategory2Item1: 'Shampoo / Blowdry / Peinado',
      serviceCategory2Item2: 'Blow Dry',
      serviceCategory2Item3: 'Flat Iron',
      serviceCategory2Item4: 'Updo',
      serviceCategory2Item5: 'Corte de hombre',
      serviceCategory2Item6: 'Corte de hombre con diseño',
      serviceCategory2Item7: 'Corte de mujer',
      serviceCategory2Item8: 'Corte de niño',
      serviceCategory2Item9: 'Corte de niña',
      serviceCategory3Title: 'Paquetes Blow Dry',
      serviceCategory3Item1: 'Blow Dry ... consigue 5 + 1 gratis',
      serviceCategory3Item2: 'Blow Dry (cabello largo) ... consigue 5 + 1 gratis',
      serviceCategory3Item3: 'Updo',
      serviceCategory4Title: 'Maquillaje & peinado',
      serviceCategory4Item1: 'Maquillaje',
      serviceCategory4Item2: 'Peinados',
      serviceCategory4Item3: 'Maquillaje y peinado para novia',
      serviceCategory5Title: 'Color',
      serviceCategory5Item1: 'Proceso simple',
      serviceCategory5Item2: 'Color medio',
      serviceCategory5Item3: 'Color completo',
      serviceCategory5Item4: 'Corrección de color',
      serviceCategory5Item5: 'Highlights en marco facial',
      serviceCategory5Item6: 'Highlights parciales',
      serviceCategory5Item7: 'Highlights completos',
      serviceCategory5Item8: 'Balayage en marco facial',
      serviceCategory5Item9: 'Balayage parcial',
      serviceCategory5Item10: 'Balayage completo',
      serviceCategory5Item11: 'Glaze',
      serviceCategory5Item12: 'Glaze con color',
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
      scheduleMonday: 'Lunes: 11:30 AM - 6:00 PM',
      scheduleTuesday: 'Martes: 9:00 AM - 6:00 PM',
      scheduleWednesday: 'Miércoles: 11:30 AM - 6:00 PM',
      scheduleThursday: 'Jueves: 9:00 AM - 6:00 PM',
      scheduleFriday: 'Viernes: 8:00 AM - 6:00 PM',
      scheduleSaturday: 'Sábado: 8:00 AM - 6:00 PM',
      scheduleSunday: 'Domingo: Cerrado',
      scheduleVip: 'Citas especiales bajo agenda previa VIP.',
      formTitle: 'Reserva tu cita',
      nameLabel: 'Nombre',
      emailLabel: 'Correo',
      dateLabel: 'Fecha',
      timeLabel: 'Hora',
      serviceLabel: 'Servicio',
      servicePlaceholder: 'Elige el servicio que deseas',
      serviceOpt1: 'Keratina parcial',
      serviceOpt2: 'Keratina completa',
      serviceOpt3: 'Tratamiento Olaplex hidratante',
      serviceOpt4: 'Wella Professionals terapia de reparación',
      serviceOpt5: 'Shampoo / Blowdry / Peinado',
      serviceOpt6: 'Blow Dry',
      serviceOpt7: 'Flat Iron',
      serviceOpt8: 'Updo',
      serviceOpt9: 'Corte de hombre',
      serviceOpt10: 'Corte de hombre con diseño',
      serviceOpt11: 'Corte de mujer',
      serviceOpt12: 'Corte de niño',
      serviceOpt13: 'Corte de niña',
      serviceOpt14: 'Blow Dry ... consigue 5 + 1 gratis',
      serviceOpt15: 'Blow Dry (cabello largo) ... consigue 5 + 1 gratis',
      serviceOpt16: 'Maquillaje',
      serviceOpt17: 'Peinados',
      serviceOpt18: 'Maquillaje y peinado para novia',
      serviceOpt19: 'Proceso simple',
      serviceOpt20: 'Color medio',
      serviceOpt21: 'Color completo',
      serviceOpt22: 'Corrección de color',
      serviceOpt23: 'Highlights en marco facial',
      serviceOpt24: 'Highlights parciales',
      serviceOpt25: 'Highlights completos',
      serviceOpt26: 'Balayage en marco facial',
      serviceOpt27: 'Balayage parcial',
      serviceOpt28: 'Balayage completo',
      serviceOpt29: 'Glaze',
      serviceOpt30: 'Glaze con color',
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
      footerMap: 'My Salon Suite of New Rochelle',
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
      serviceCategory1Title: 'Keratin & treatments',
      serviceCategory1Item1: 'Partial keratin',
      serviceCategory1Item2: 'Full keratin',
      serviceCategory1Item3: 'Hydrating Olaplex treatment',
      serviceCategory1Item4: 'Wella Professionals repair therapy',
      serviceCategory2Title: 'Haircuts',
      serviceCategory2Item1: 'Shampoo / blowdry / styling',
      serviceCategory2Item2: 'Blow dry',
      serviceCategory2Item3: 'Flat iron',
      serviceCategory2Item4: 'Updo',
      serviceCategory2Item5: 'Men\'s haircut',
      serviceCategory2Item6: 'Men\'s haircut with design',
      serviceCategory2Item7: 'Women\'s haircut',
      serviceCategory2Item8: 'Boy\'s haircut',
      serviceCategory2Item9: 'Girl\'s haircut',
      serviceCategory3Title: 'Blow dry packages',
      serviceCategory3Item1: 'Blow dry ... get 5 + 1 free',
      serviceCategory3Item2: 'Blow dry (long hair) ... get 5 + 1 free',
      serviceCategory3Item3: 'Updo',
      serviceCategory4Title: 'Makeup & styling',
      serviceCategory4Item1: 'Makeup',
      serviceCategory4Item2: 'Hairstyles',
      serviceCategory4Item3: 'Bridal makeup and hairstyle',
      serviceCategory5Title: 'Color',
      serviceCategory5Item1: 'Single process',
      serviceCategory5Item2: 'Medium color',
      serviceCategory5Item3: 'Full color',
      serviceCategory5Item4: 'Color correction',
      serviceCategory5Item5: 'Face frame highlights',
      serviceCategory5Item6: 'Partial highlights',
      serviceCategory5Item7: 'Full highlights',
      serviceCategory5Item8: 'Face frame balayage',
      serviceCategory5Item9: 'Partial balayage',
      serviceCategory5Item10: 'Full balayage',
      serviceCategory5Item11: 'Glaze',
      serviceCategory5Item12: 'Glaze with color',
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
      scheduleMonday: 'Monday: 11:30 AM - 6:00 PM',
      scheduleTuesday: 'Tuesday: 9:00 AM - 6:00 PM',
      scheduleWednesday: 'Wednesday: 11:30 AM - 6:00 PM',
      scheduleThursday: 'Thursday: 9:00 AM - 6:00 PM',
      scheduleFriday: 'Friday: 8:00 AM - 6:00 PM',
      scheduleSaturday: 'Saturday: 8:00 AM - 6:00 PM',
      scheduleSunday: 'Sunday: Closed',
      scheduleVip: 'Special appointments by prior VIP booking.',
      formTitle: 'Book your appointment',
      nameLabel: 'Name',
      emailLabel: 'Email',
      dateLabel: 'Date',
      timeLabel: 'Time',
      serviceLabel: 'Service',
      servicePlaceholder: 'Choose the service you want',
      serviceOpt1: 'Partial keratin',
      serviceOpt2: 'Full keratin',
      serviceOpt3: 'Hydrating Olaplex treatment',
      serviceOpt4: 'Wella Professionals repair therapy',
      serviceOpt5: 'Shampoo / blowdry / styling',
      serviceOpt6: 'Blow dry',
      serviceOpt7: 'Flat iron',
      serviceOpt8: 'Updo',
      serviceOpt9: 'Men\'s haircut',
      serviceOpt10: 'Men\'s haircut with design',
      serviceOpt11: 'Women\'s haircut',
      serviceOpt12: 'Boy\'s haircut',
      serviceOpt13: 'Girl\'s haircut',
      serviceOpt14: 'Blow dry ... get 5 + 1 free',
      serviceOpt15: 'Blow dry (long hair) ... get 5 + 1 free',
      serviceOpt16: 'Makeup',
      serviceOpt17: 'Hairstyles',
      serviceOpt18: 'Bridal makeup and hairstyle',
      serviceOpt19: 'Single process',
      serviceOpt20: 'Medium color',
      serviceOpt21: 'Full color',
      serviceOpt22: 'Color correction',
      serviceOpt23: 'Face frame highlights',
      serviceOpt24: 'Partial highlights',
      serviceOpt25: 'Full highlights',
      serviceOpt26: 'Face frame balayage',
      serviceOpt27: 'Partial balayage',
      serviceOpt28: 'Full balayage',
      serviceOpt29: 'Glaze',
      serviceOpt30: 'Glaze with color',
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
      footerMap: 'My Salon Suite of New Rochelle',
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
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
      const options = Array.from(serviceSelect.options);
      options.forEach((option, index) => {
        const optionKey = option.getAttribute('data-i18n');
        if (optionKey && t[optionKey]) {
          option.textContent = t[optionKey];
        }
      });
      const selectedValue = serviceSelect.value;
      if (selectedValue) {
        const matchingOption = Array.from(serviceSelect.options).find((option) => option.value === selectedValue);
        if (matchingOption) {
          serviceSelect.value = selectedValue;
        }
      }
    }
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
    const dateInput = form.querySelector('input[name="date"]');
    const timeInput = form.querySelector('input[name="time"]');

    const updateTimeConstraints = () => {
      if (!dateInput || !timeInput) {
        return;
      }

      const selectedDate = dateInput.value ? new Date(`${dateInput.value}T00:00:00`) : null;
      if (!selectedDate || Number.isNaN(selectedDate.getTime())) {
        timeInput.disabled = true;
        timeInput.value = '';
        return;
      }

      const day = selectedDate.getDay();
      let minTime = '';
      let maxTime = '';
      let isClosed = false;

      if (day === 0) {
        isClosed = true;
      } else if (day === 2) {
        minTime = '09:00';
        maxTime = '18:00';
      } else if (day === 1 || day === 3 || day === 4) {
        minTime = '11:30';
        maxTime = '18:00';
      } else {
        minTime = '08:00';
        maxTime = '18:00';
      }

      timeInput.disabled = isClosed;
      timeInput.setAttribute('min', minTime);
      timeInput.setAttribute('max', maxTime);

      if (isClosed) {
        timeInput.value = '';
        message.textContent = 'El salón permanece cerrado ese día.';
        message.className = 'form-message error';
        return;
      }

      if (timeInput.value && (timeInput.value < minTime || timeInput.value > maxTime)) {
        timeInput.value = '';
        message.textContent = 'Selecciona una hora dentro del horario de atención.';
        message.className = 'form-message error';
      } else {
        message.textContent = '';
        message.className = 'form-message';
      }
    };

    dateInput?.addEventListener('change', updateTimeConstraints);
    timeInput?.addEventListener('change', updateTimeConstraints);
    updateTimeConstraints();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      message.textContent = 'Guardando cita...';
      message.className = 'form-message';

      try {
        const response = await fetch('/appointments', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        message.textContent = data.message || 'Cita registrada.';
        message.className = `form-message ${response.ok ? 'success' : 'error'}`;
        if (response.ok) {
          form.reset();
        }
      } catch (error) {
        message.textContent = 'No se pudo guardar la cita. Intenta de nuevo.';
        message.className = 'form-message error';
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
