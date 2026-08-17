document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const C = WEDDING_CONFIG;

  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  let toastTimer = null;

  function showToast(message, type = 'success') {
    const toast = $('toast');
    const toastMsg = $('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;

    toast.style.borderColor = type === 'error'
      ? '#B07878'
      : '#C9A96E';

    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.hidden = true; }, 400);
    }, 3000);
  }

  function renderContent() {
    const coverNames = $('cover-names');
    if (coverNames) {
      coverNames.textContent = `${C.groom.nickname} & ${C.bride.nickname}`;
    }

    const coverDate = $('cover-date');
    if (coverDate && C.events.length > 0) {
      coverDate.textContent = formatDateLong(C.events[0].date);
    }

    const guestName = $('cover-guest-name');
    if (guestName) {
      const params = new URLSearchParams(window.location.search);
      const toName = params.get('to') || params.get('nama') || 'Tamu Undangan';
      guestName.textContent = decodeURIComponent(toName);
    }

    const openArabic = $('opening-arabic');
    const openTranslation = $('opening-translation');
    const openSource = $('opening-source');
    if (openArabic) openArabic.textContent = C.openingQuote.arabic;
    if (openTranslation) openTranslation.textContent = C.openingQuote.translation;
    if (openSource) openSource.textContent = `— ${C.openingQuote.source}`;

    const groomName = $('groom-name');
    const groomParent = $('groom-parent-info');
    if (groomName) groomName.textContent = C.groom.name;
    if (groomParent) groomParent.textContent = C.groom.parentInfo;

    const groomPhoto = $('groom-photo');
    const groomPhotoFrame = $('groom-photo-frame');
    if (groomPhoto && groomPhotoFrame && C.groom.photo) {
      groomPhoto.src = C.groom.photo;
      groomPhotoFrame.hidden = false;
    }

    const brideName = $('bride-name');
    const brideParent = $('bride-parent-info');
    if (brideName) brideName.textContent = C.bride.name;
    if (brideParent) brideParent.textContent = C.bride.parentInfo;

    const bridePhoto = $('bride-photo');
    const bridePhotoFrame = $('bride-photo-frame');
    if (bridePhoto && bridePhotoFrame && C.bride.photo) {
      bridePhoto.src = C.bride.photo;
      bridePhotoFrame.hidden = false;
    }

    const eventsWrapper = $('events-wrapper');
    if (eventsWrapper) {
      eventsWrapper.innerHTML = C.events.map((evt, i) => `
        <div class="event-card" data-event-index="${i}">
          <h3 class="event-card__name">${escapeHTML(evt.name)}</h3>
          <div class="event-card__detail">
            <span class="event-card__icon">🗓️</span>
            <span>${formatDateLong(evt.date)}</span>
          </div>
          <div class="event-card__detail">
            <span class="event-card__icon">🕐</span>
            <span>${evt.time ? (evt.time + (evt.endTime ? ' — ' + evt.endTime : '') + ' WIB') : 'Waktu akan diinformasikan'}</span>
          </div>
          <div class="event-card__detail">
            <span class="event-card__icon">📍</span>
            <span>${escapeHTML(evt.venue)}</span>
          </div>
          <div class="event-card__detail">
            <span class="event-card__icon" style="visibility:hidden">📍</span>
            <span style="font-size:0.95em">${escapeHTML(evt.address)}</span>
          </div>
          <div class="event-card__actions">
            <a class="event-card__btn" href="${evt.mapsLink}" target="_blank" rel="noopener noreferrer">
              📍 Buka di Maps
            </a>
            <button class="event-card__btn btn-copy-address" type="button" data-address="${escapeHTML(evt.address)}">
              📋 Salin Alamat
            </button>
          </div>
        </div>
      `).join('');

      eventsWrapper.querySelectorAll('.btn-copy-address').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(btn.dataset.address);
            showToast('Alamat berhasil disalin! ✓');
          } catch {
            showToast('Gagal menyalin alamat', 'error');
          }
        });
      });
    }

    const gallerySlides = $('gallery-slides');
    if (gallerySlides) {
      gallerySlides.innerHTML = C.gallery.map((src, i) => `
        <div class="swiper-slide">
          <div class="gallery__slide-frame" data-gallery-index="${i}">
            <img class="gallery__slide-img" src="${src}" alt="Foto ${i + 1}" loading="lazy">
          </div>
        </div>
      `).join('');
    }

    const rsvpEvents = $('rsvp-events');
    if (rsvpEvents) {
      rsvpEvents.innerHTML = C.events.map(evt => `
        <label class="rsvp__checkbox">
          <input type="checkbox" name="events" value="${escapeHTML(evt.name)}">
          <span class="rsvp__checkbox-mark"></span>
          <span class="rsvp__checkbox-text">${escapeHTML(evt.name)}</span>
        </label>
      `).join('');
    }

    const rsvpGuests = $('rsvp-guests');
    if (rsvpGuests && C.rsvp.maxGuests) {
      const options = rsvpGuests.querySelectorAll('option');
      options.forEach(opt => {
        if (opt.value && parseInt(opt.value) > C.rsvp.maxGuests) {
          opt.remove();
        }
      });
    }

    const closingMsg = $('closing-message');
    if (closingMsg) closingMsg.textContent = C.closingMessage;

    const closingNames = $('closing-names');
    if (closingNames) {
      closingNames.textContent = `${C.groom.nickname} & ${C.bride.nickname}`;
    }

    const closingContact = $('closing-contact');
    if (closingContact) {
      closingContact.innerHTML = `
        <a class="closing__contact-btn" href="https://wa.me/${formatPhone(C.contact.groomPhone)}" target="_blank" rel="noopener noreferrer">
          📱 Hubungi ${escapeHTML(C.groom.nickname)}
        </a>
        <a class="closing__contact-btn" href="https://wa.me/${formatPhone(C.contact.bridePhone)}" target="_blank" rel="noopener noreferrer">
          📱 Hubungi ${escapeHTML(C.bride.nickname)}
        </a>
      `;
    }

    const audioSource = $('audio-source');
    const musicTitle = $('music-title');
    if (audioSource) audioSource.src = C.audio.file;
    if (musicTitle) musicTitle.textContent = C.audio.title;

    document.title = `Undangan Pernikahan ${C.groom.nickname} & ${C.bride.nickname}`;
  }

  function initCover() {
    const btnOpen = $('btn-open-invitation');
    const coverSection = document.querySelector('.section--cover');
    const mainContent = $('main-content');
    const envelope = $('cover-envelope');
    const navDots = $('nav-dots');
    const musicPlayer = $('music-player');

    if (!btnOpen || !coverSection || !mainContent) return;

    document.body.classList.add('cover-active');

    btnOpen.addEventListener('click', () => {
      if (envelope) envelope.classList.add('open');

      setTimeout(() => {
        fireConfetti();
      }, 600);

      setTimeout(() => {
        coverSection.classList.add('hidden');
        document.body.classList.remove('cover-active');

        mainContent.setAttribute('aria-hidden', 'false');
        mainContent.classList.add('visible');

        if (navDots) navDots.hidden = false;
        if (musicPlayer) musicPlayer.hidden = false;

        if (C.audio.autoplay) {
          playAudio();
        }

        initParticles();

        setTimeout(() => {
          triggerScrollReveal();
          startAutoScroll();
        }, 300);
      }, 1500);
    });
  }

  function fireConfetti() {
    const confettiCanvas = $('confetti-canvas');
    if (!confettiCanvas || typeof confetti === 'undefined') return;

    const myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });

    myConfetti({
      particleCount: 200,
      spread: 360,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#C9A96E', '#E8D5A8', '#FFFFFF', '#A67C52', '#DFC088', '#B8866F'],
      shapes: ['circle', 'square'],
      scalar: 1.2
    });

    setTimeout(() => {
      myConfetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#C9A96E', '#FFFFFF', '#E8D5A8']
      });
      myConfetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#C9A96E', '#FFFFFF', '#E8D5A8']
      });
    }, 300);
  }

  function fireMiniConfetti() {
    const confettiCanvas = $('confetti-canvas');
    if (!confettiCanvas || typeof confetti === 'undefined') return;

    const myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });

    myConfetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 20,
      gravity: 1,
      ticks: 120,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#C9A96E', '#FFFFFF', '#E8D5A8', '#B8866F']
    });
  }

  function initParticles() {
    const container = $('petals-container');
    if (!container) return;

    container.innerHTML = '';


    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty('--petal-duration', `${6 + Math.random() * 8}s`);
      petal.style.setProperty('--petal-delay', `${Math.random() * 10}s`);
      petal.style.opacity = '0';
      container.appendChild(petal);
    }


    const shimmerColors = ['#E8D5A8', '#C9A96E', '#DFC088', '#FFFFFF', '#D4A999'];
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'petal';
      particle.style.left = `${Math.random() * 100}%`;
      const size = 2 + Math.random() * 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.background = shimmerColors[Math.floor(Math.random() * shimmerColors.length)];
      if (size < 4) {
        particle.style.boxShadow = `0 0 ${4 + Math.random() * 6}px rgba(232, 213, 168, 0.6)`;
      }
      particle.style.setProperty('--petal-duration', `${8 + Math.random() * 12}s`);
      particle.style.setProperty('--petal-delay', `${Math.random() * 15}s`);
      particle.style.opacity = '0';
      container.appendChild(particle);
    }
  }

  function initCountdown() {
    const target = new Date(C.countdownTarget).getTime();
    const elDays = $('countdown-days');
    const elHours = $('countdown-hours');
    const elMinutes = $('countdown-minutes');
    const elSeconds = $('countdown-seconds');
    const elTimer = $('countdown-timer');
    const elExpired = $('countdown-expired');

    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    let prev = { d: '', h: '', m: '', s: '' };

    function updateCountdown() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        if (elTimer) elTimer.hidden = true;
        if (elExpired) elExpired.hidden = false;
        return false;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      updateBox(elDays, days, 'd');
      updateBox(elHours, hours, 'h');
      updateBox(elMinutes, minutes, 'm');
      updateBox(elSeconds, seconds, 's');

      return true;
    }

    function updateBox(el, value, key) {
      if (prev[key] !== value) {
        el.textContent = value;
        el.classList.add('flip');
        setTimeout(() => el.classList.remove('flip'), 400);
        prev[key] = value;
      }
    }

    updateCountdown();
    const interval = setInterval(() => {
      const running = updateCountdown();
      if (!running) clearInterval(interval);
    }, 1000);
  }

  function initGallery() {
    if (typeof Swiper === 'undefined') return;

    const swiper = new Swiper('#gallery-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      grabCursor: true,
      speed: 800
    });

    const lightbox = $('gallery-lightbox');
    const lightboxImg = $('lightbox-image');
    const lightboxClose = $('lightbox-close');
    const lightboxPrev = $('lightbox-prev');
    const lightboxNext = $('lightbox-next');

    if (!lightbox || !lightboxImg) return;

    let currentLightboxIndex = 0;

    document.querySelectorAll('.gallery__slide-frame').forEach(frame => {
      frame.addEventListener('click', () => {
        const index = parseInt(frame.dataset.galleryIndex);
        currentLightboxIndex = index;
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      lightboxImg.src = C.gallery[index];
      lightbox.hidden = false;
      void lightbox.offsetWidth;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.hidden = true;
        document.body.style.overflow = '';
      }, 350);
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + C.gallery.length) % C.gallery.length;
        lightboxImg.src = C.gallery[currentLightboxIndex];
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % C.gallery.length;
        lightboxImg.src = C.gallery[currentLightboxIndex];
      });
    }

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev?.click();
      if (e.key === 'ArrowRight') lightboxNext?.click();
    });
  }

  function initMaps() {
    const tabsContainer = $('location-tabs');
    const panelsContainer = $('location-panels');

    if (!tabsContainer || !panelsContainer || C.events.length === 0) return;

    tabsContainer.innerHTML = C.events.map((evt, i) => `
      <button
        class="location__tab-btn ${i === 0 ? 'active' : ''}"
        type="button"
        role="tab"
        data-tab-index="${i}"
        aria-selected="${i === 0}"
      >${escapeHTML(evt.name)}</button>
    `).join('');

    panelsContainer.innerHTML = C.events.map((evt, i) => `
      <div class="location__panel ${i === 0 ? 'active' : ''}" data-panel-index="${i}">
        <div class="location__map-frame">
          <iframe
            src="${evt.mapsEmbed}"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Peta ${escapeHTML(evt.name)}"
          ></iframe>
        </div>
        <div class="location__info">
          <div class="location__info-row">
            <span class="location__info-icon">📍</span>
            <span>${escapeHTML(evt.venue)}</span>
          </div>
          <div class="location__info-row">
            <span class="location__info-icon">🏠</span>
            <span>${escapeHTML(evt.address)}</span>
          </div>
          <div class="location__info-row">
            <span class="location__info-icon">🕐</span>
            <span>${evt.time ? (evt.time + (evt.endTime ? ' — ' + evt.endTime : '') + ' WIB') : 'Waktu akan diinformasikan'}</span>
          </div>
        </div>
        <div class="location__actions">
          <a class="event-card__btn" href="${evt.mapsLink}" target="_blank" rel="noopener noreferrer">
            📍 Buka di Google Maps
          </a>
          <button class="event-card__btn btn-copy-address" type="button" data-address="${escapeHTML(evt.address)}">
            📋 Salin Alamat
          </button>
        </div>
      </div>
    `).join('');

    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.location__tab-btn');
      if (!btn) return;

      const index = btn.dataset.tabIndex;

      tabsContainer.querySelectorAll('.location__tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      panelsContainer.querySelectorAll('.location__panel').forEach(p => {
        p.classList.remove('active');
      });
      const activePanel = panelsContainer.querySelector(`[data-panel-index="${index}"]`);
      if (activePanel) activePanel.classList.add('active');
    });

    panelsContainer.querySelectorAll('.btn-copy-address').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.address);
          showToast('Alamat berhasil disalin! ✓');
        } catch {
          showToast('Gagal menyalin alamat', 'error');
        }
      });
    });
  }

  function initDigitalGift() {
    const { digitalGift } = C;

    if (!digitalGift.enabled) {
      const section = document.querySelector('.section--digital-gift');
      if (section) section.style.display = 'none';
      return;
    }

    const envelope = $('gift-envelope');
    const content = $('gift-content');
    const tabsContainer = $('gift-tabs');
    const panelsContainer = $('gift-panels');
    const qrisModal = $('qris-modal');
    const qrisModalImg = $('qris-modal-image');
    const qrisModalClose = $('qris-modal-close');
    const qrisModalBackdrop = $('qris-modal-backdrop');

    if (envelope && content) {
      envelope.addEventListener('click', () => {
        envelope.classList.add('opened');

        setTimeout(() => {
          envelope.style.display = 'none';
          content.hidden = false;
        }, 800);
      });
    }

    if (tabsContainer) {
      tabsContainer.innerHTML = digitalGift.accounts.map((acc, i) => `
        <button
          class="gift__tab-btn ${i === 0 ? 'active' : ''}"
          type="button"
          role="tab"
          data-gift-index="${i}"
        >${escapeHTML(acc.bank)}</button>
      `).join('');
    }

    if (panelsContainer) {
      panelsContainer.innerHTML = digitalGift.accounts.map((acc, i) => `
        <div class="gift__panel ${i === 0 ? 'active' : ''}" data-gift-panel="${i}">
          ${acc.logoUrl ? `<img class="gift__bank-logo" src="${acc.logoUrl}" alt="Logo ${escapeHTML(acc.bank)}">` : ''}
          <p class="gift__account-number">${escapeHTML(acc.accountNumber)}</p>
          <p class="gift__account-name">a/n ${escapeHTML(acc.accountName)}</p>
          <div class="gift__actions">
            <button class="gift__btn btn-copy-rekening" type="button" data-number="${escapeHTML(acc.accountNumber)}">
              📋 Salin Nomor
            </button>
            ${acc.qrisImage ? `
              <button class="gift__btn btn-show-qris" type="button" data-qris="${acc.qrisImage}">
                📱 Tampilkan QR
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

    if (tabsContainer) {
      tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.gift__tab-btn');
        if (!btn) return;

        const index = btn.dataset.giftIndex;

        tabsContainer.querySelectorAll('.gift__tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (panelsContainer) {
          panelsContainer.querySelectorAll('.gift__panel').forEach(p => p.classList.remove('active'));
          const panel = panelsContainer.querySelector(`[data-gift-panel="${index}"]`);
          if (panel) panel.classList.add('active');
        }
      });
    }

    if (panelsContainer) {
      panelsContainer.addEventListener('click', async (e) => {
        const copyBtn = e.target.closest('.btn-copy-rekening');
        if (copyBtn) {
          try {
            await navigator.clipboard.writeText(copyBtn.dataset.number);
            showToast('Nomor berhasil disalin! ✓');
          } catch {
            showToast('Gagal menyalin nomor', 'error');
          }
          return;
        }

        const qrisBtn = e.target.closest('.btn-show-qris');
        if (qrisBtn && qrisModal && qrisModalImg) {
          qrisModalImg.src = qrisBtn.dataset.qris;
          qrisModal.hidden = false;
          void qrisModal.offsetWidth;
          qrisModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    function closeQrisModal() {
      if (!qrisModal) return;
      qrisModal.classList.remove('active');
      setTimeout(() => {
        qrisModal.hidden = true;
        document.body.style.overflow = '';
      }, 350);
    }

    if (qrisModalClose) qrisModalClose.addEventListener('click', closeQrisModal);
    if (qrisModalBackdrop) qrisModalBackdrop.addEventListener('click', closeQrisModal);
  }

  function initRSVP() {
    const form = $('rsvp-form');
    const submitBtn = $('rsvp-submit');
    const submitText = form?.querySelector('.rsvp__submit-text');
    const submitLoader = form?.querySelector('.rsvp__submit-loader');
    const successDiv = $('rsvp-success');
    const guestsField = $('rsvp-guests-field');
    const eventsField = $('rsvp-events-field');
    const guestbookList = $('guestbook-list');

    if (!form) return;

    if (new URLSearchParams(window.location.search).get('reset') === '1') {
      localStorage.removeItem('hasRSVP');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (localStorage.getItem('hasRSVP')) {
      form.style.display = 'none';
      if (successDiv) {
        successDiv.hidden = false;
        const rsvpText = successDiv.querySelector('.rsvp__success-text');
        if (rsvpText) rsvpText.textContent = "Anda sudah mengonfirmasi kehadiran sebelumnya. Terima kasih! 🌹";
      }
    }

    const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const isHadir = radio.value === 'hadir';
        if (guestsField) guestsField.hidden = !isHadir;
        if (eventsField) eventsField.hidden = !isHadir;
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (localStorage.getItem('hasRSVP')) {
        showToast('Anda sudah mengirim konfirmasi sebelumnya.', 'error');
        return;
      }

      const honeypot = $('rsvp-website');
      if (honeypot && honeypot.value) return;

      const name = $('rsvp-name')?.value.trim();
      let phone = $('rsvp-phone')?.value.trim();
      const attendance = form.querySelector('input[name="attendance"]:checked')?.value;
      const message = $('rsvp-message')?.value.trim() || '';

      if (!name) {
        showToast('Mohon isi nama lengkap Anda', 'error');
        $('rsvp-name')?.focus();
        return;
      }

      if (!phone) {
        showToast('Mohon isi nomor HP / WhatsApp', 'error');
        $('rsvp-phone')?.focus();
        return;
      }

      phone = phone.replace(/\D/g, '');
      if (!phone.startsWith('08') && !phone.startsWith('628')) {
        showToast('Nomor HP tidak valid. Gunakan format 08... atau 628...', 'error');
        $('rsvp-phone')?.focus();
        return;
      }
      if (phone.length < 10 || phone.length > 13) {
        showToast('Nomor HP harus terdiri dari 10-13 digit', 'error');
        $('rsvp-phone')?.focus();
        return;
      }

      if (!attendance) {
        showToast('Mohon pilih konfirmasi kehadiran', 'error');
        return;
      }

      const data = {
        name,
        phone,
        attendance,
        guestCount: attendance === 'hadir' ? ($('rsvp-guests')?.value || '1') : '0',
        events: attendance === 'hadir'
          ? Array.from(form.querySelectorAll('input[name="events"]:checked')).map(cb => cb.value).join(', ')
          : '-',
        message
      };

      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Mengirim...';
      if (submitLoader) submitLoader.hidden = false;

      try {
        await fetch(C.rsvp.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        localStorage.setItem('hasRSVP', 'true');
        form.style.display = 'none';
        if (successDiv) successDiv.hidden = false;

        fireMiniConfetti();
        showToast('Konfirmasi berhasil dikirim! 🌹');

      } catch (error) {
        console.error('RSVP Error:', error);
        showToast('Gagal mengirim konfirmasi. Silakan coba lagi.', 'error');

        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Kirim Konfirmasi';
        if (submitLoader) submitLoader.hidden = true;
      }
    });
  }

  const GUESTBOOK_INITIAL_SHOW = 10;
  let allGuestMessages = [];

  async function initGuestbook() {
    const list = $('guestbook-list');
    const loadMoreBtn = $('guestbook-load-more');

    if (!list) return;

    try {
      const response = await fetch(C.rsvp.googleScriptUrl, {
        method: 'GET'
      });

      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result)) {
          allGuestMessages = result.reverse();
          renderGuestCards(list, allGuestMessages.slice(0, GUESTBOOK_INITIAL_SHOW));

          if (loadMoreBtn && allGuestMessages.length > GUESTBOOK_INITIAL_SHOW) {
            loadMoreBtn.hidden = false;
          }
        }
      }
    } catch (error) {
      console.warn('Guestbook fetch skipped:', error.message);
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        renderGuestCards(list, allGuestMessages);
        loadMoreBtn.hidden = true;
      });
    }
  }

  function renderGuestCards(container, messages) {
    container.innerHTML = '';
    messages.forEach((msg, i) => {
      const card = createGuestCard(msg);
      card.style.animationDelay = `${i * 0.1}s`;
      container.appendChild(card);
    });
  }

  function createGuestCard(msg) {
    const card = document.createElement('div');
    card.className = 'guestbook__card';

    const initial = msg.name ? msg.name.charAt(0).toUpperCase() : '?';
    const dateStr = msg.timestamp
      ? new Date(msg.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : '';

    card.innerHTML = `
      <div class="guestbook__card-header">
        <div class="guestbook__card-avatar">🌸</div>
        <span class="guestbook__card-name">${escapeHTML(msg.name)}</span>
      </div>
      <p class="guestbook__card-message">${escapeHTML(msg.message)}</p>
      <span class="guestbook__card-date">${dateStr}</span>
    `;

    return card;
  }

  let audioPlayer = null;
  let isPlaying = false;

  function initAudio() {
    audioPlayer = $('audio-player');
    const audioSource = $('audio-source');
    const musicPlayer = $('music-player');
    const disc = $('music-disc');
    const btnPlayPause = $('btn-play-pause');
    const iconPlay = $('icon-play');
    const iconPause = $('icon-pause');
    const btnMute = $('btn-mute');
    const iconVolume = $('icon-volume');

    if (!audioPlayer || !audioSource) return;

    audioSource.src = C.audio.file;
    audioPlayer.load();

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        if (isPlaying) {
          pauseAudio();
        } else {
          playAudio();
        }
      });
    }

    if (btnMute) {
      btnMute.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted;
        if (iconVolume) {
          iconVolume.textContent = audioPlayer.muted ? '🔇' : '🔊';
        }
      });
    }

    audioPlayer.addEventListener('play', () => {
      isPlaying = true;
      if (iconPlay) iconPlay.hidden = true;
      if (iconPause) iconPause.hidden = false;
      if (disc) disc.classList.add('spinning');
    });

    audioPlayer.addEventListener('pause', () => {
      isPlaying = false;
      if (iconPlay) iconPlay.hidden = false;
      if (iconPause) iconPause.hidden = true;
      if (disc) disc.classList.remove('spinning');
    });

    audioPlayer.addEventListener('ended', () => {
      isPlaying = false;
      if (disc) disc.classList.remove('spinning');
    });


    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (isPlaying) {
          pauseAudio();
          audioPlayer.dataset.wasPlaying = 'true';
        } else {
          audioPlayer.dataset.wasPlaying = 'false';
        }
      } else {
        if (audioPlayer.dataset.wasPlaying === 'true') {
          playAudio();
        }
      }
    });
  }

  function playAudio() {
    if (!audioPlayer) return;
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio autoplay ditolak browser:', err.message);
      });
    }
  }

  function pauseAudio() {
    if (audioPlayer) audioPlayer.pause();
  }







  let autoScrollActive = false;
  let autoScrollPaused = false;
  let autoScrollRAF = null;
  let autoScrollResumeTimer = null;
  let autoScrollAccumulator = 0;
  const AUTO_SCROLL_SPEED = 0.5;
  const AUTO_SCROLL_RESUME_DELAY = 3000;

  function startAutoScroll() {
    if (autoScrollActive) return;
    autoScrollActive = true;
    autoScrollPaused = false;

    document.documentElement.style.scrollBehavior = 'auto';
    bindAutoScrollEvents();
    autoScrollLoop();
  }

  function autoScrollLoop() {
    if (!autoScrollActive) return;

    if (!autoScrollPaused) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 1) {

        stopAutoScroll();
        return;
      }

      autoScrollAccumulator += AUTO_SCROLL_SPEED;
      if (autoScrollAccumulator >= 1) {
        const px = Math.floor(autoScrollAccumulator);
        window.scrollBy(0, px);
        autoScrollAccumulator -= px;
      }
    }

    autoScrollRAF = requestAnimationFrame(autoScrollLoop);
  }

  function pauseAutoScroll() {
    autoScrollPaused = true;
    clearTimeout(autoScrollResumeTimer);
  }

  function resumeAutoScroll() {
    if (!autoScrollActive) return;
    autoScrollPaused = false;
  }

  function resumeAutoScrollDelayed() {
    if (!autoScrollActive) return;
    clearTimeout(autoScrollResumeTimer);
    autoScrollResumeTimer = setTimeout(() => {
      resumeAutoScroll();
    }, AUTO_SCROLL_RESUME_DELAY);
  }

  function stopAutoScroll() {
    autoScrollActive = false;
    autoScrollPaused = false;
    autoScrollAccumulator = 0;
    if (autoScrollRAF) {
      cancelAnimationFrame(autoScrollRAF);
      autoScrollRAF = null;
    }
    clearTimeout(autoScrollResumeTimer);
    unbindAutoScrollEvents();

    document.documentElement.style.scrollBehavior = 'smooth';
  }


  function onAutoScrollTouchStart() {
    pauseAutoScroll();
  }

  function onAutoScrollTouchEnd() {

    setTimeout(() => resumeAutoScroll(), 200);
  }

  function onAutoScrollMouseDown(e) {

    if (e.button === 0) pauseAutoScroll();
  }

  function onAutoScrollMouseUp() {
    setTimeout(() => resumeAutoScroll(), 200);
  }

  function onAutoScrollWheel() {

    pauseAutoScroll();
    resumeAutoScrollDelayed();
  }

  function onAutoScrollKeydown(e) {

    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (scrollKeys.includes(e.key)) {
      pauseAutoScroll();
      resumeAutoScrollDelayed();
    }
  }

  function bindAutoScrollEvents() {

    window.addEventListener('touchstart', onAutoScrollTouchStart, { passive: true });
    window.addEventListener('touchend', onAutoScrollTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onAutoScrollTouchEnd, { passive: true });


    window.addEventListener('mousedown', onAutoScrollMouseDown, { passive: true });
    window.addEventListener('mouseup', onAutoScrollMouseUp, { passive: true });


    window.addEventListener('wheel', onAutoScrollWheel, { passive: true });


    window.addEventListener('keydown', onAutoScrollKeydown, { passive: true });
  }

  function unbindAutoScrollEvents() {
    window.removeEventListener('touchstart', onAutoScrollTouchStart);
    window.removeEventListener('touchend', onAutoScrollTouchEnd);
    window.removeEventListener('touchcancel', onAutoScrollTouchEnd);
    window.removeEventListener('mousedown', onAutoScrollMouseDown);
    window.removeEventListener('mouseup', onAutoScrollMouseUp);
    window.removeEventListener('wheel', onAutoScrollWheel);
    window.removeEventListener('keydown', onAutoScrollKeydown);
  }

  function initScrollEffects() {
    const revealElements = $$('[data-scroll-reveal]');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function triggerScrollReveal() {
    const revealElements = $$('[data-scroll-reveal]');
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('revealed');
      }
    });
  }

  function initNavDots() {
    const dots = $$('.nav-dots__dot');
    if (dots.length === 0) return;

    const sectionIds = Array.from(dots).map(dot => dot.dataset.section);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.getElementById(dot.dataset.section);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === id);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-10% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  function formatDateLong(dateStr) {
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  function formatPhone(phone) {
    let clean = phone.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.substring(1);
    }
    return clean;
  }

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function init() {
    renderContent();
    initCover();
    initCountdown();
    initGallery();
    initMaps();
    initDigitalGift();
    initRSVP();
    initGuestbook();
    initAudio();
    initScrollEffects();
    initNavDots();
  }

  init();

});
