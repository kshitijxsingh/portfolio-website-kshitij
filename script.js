// ====== CURSOR ======
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateCursorRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

document.querySelectorAll('a, button, .photo-item, .contact-item, .tab-btn, .film-roll-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

// ====== BACKGROUND AUDIO ======
const musicToggle = document.getElementById('musicToggle');
const bgAudio = document.getElementById('bgAudio');
if (bgAudio) {
  bgAudio.volume = 0.4; // 40% volume for better audibility
  bgAudio.muted = false;

  const updateMusicToggle = () => {
    const playing = !bgAudio.paused && !bgAudio.muted;
    if (musicToggle) {
      musicToggle.classList.toggle('active', playing);
      musicToggle.setAttribute('aria-pressed', String(playing));
      const textSpan = musicToggle.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = playing ? 'Music On' : 'Music Off';
      }
    }
  };

  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise
      .catch(() => {
        // Autoplay may be blocked until user interaction.
      })
      .finally(updateMusicToggle);
  } else {
    updateMusicToggle();
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
      } else {
        bgAudio.pause();
      }
      updateMusicToggle();
    });
  }
}


// ====== LOADER ======
const loader = document.getElementById('loader');
const loaderCounter = document.getElementById('loaderCounter');
const loaderFrames = document.querySelectorAll('.loader-frame');
let count = 0;
const interval = setInterval(() => {
  count += Math.floor(Math.random() * 8) + 3;
  if (count > 100) count = 100;
  loaderCounter.textContent = count;
  const filled = Math.floor(count / 20);
  loaderFrames.forEach((f, i) => {
    if (i < filled) f.classList.add('active');
  });
  if (count === 100) {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.style.display = 'none', 800);
    }, 400);
  }
}, 60);

// ====== FILM STRIP DIVIDER ======
const filmStrip = document.getElementById('filmStrip');
const labels = ['KODAK', 'PORTRA', '400', '35mm', 'EXP', '2024', 'KSHITIJ', 'SINGH', '©', 'FILM'];
let filmHTML = '';
for (let i = 0; i < 6; i++) {
  labels.forEach((lbl, j) => {
    filmHTML += `<div class="film-hole-row">
      <div class="film-hole"></div>
      <div class="film-frame-label">${lbl}</div>
      <div class="film-hole"></div>
    </div>`;
  });
}
filmStrip.innerHTML = filmHTML + filmHTML; // duplicate for seamless loop

// ====== INSTAGRAM STRIP ======
const instaStrip = document.getElementById('instaStrip');
const instaImages = [
  'atulya final-00373.JPG',
  'atulya final-00390.JPG',
  'bike-1.JPG',
  'bike-10.JPG',
  'bike-20.JPG',
  'cold brew (2 of 4).JPG',
  'Copy of FInal! (12 of 27).JPG',
  'DSCF0031.jpg',
  'film-01.JPG',
  'film-20.JPG',
  'flatlay 1.JPG',
  'flatlay-4.JPG',
  'mommys chicken-04646.JPG',
  'ORANGE JUICCE (1 of 2) (2).JPG',
  'IMG_2848.JPG.jpeg',
  'IMG_2852.JPG.jpeg',
  'IMG_2860.JPG.jpeg',
  'IMG_2869.JPG.jpeg',
  'bike-38.JPG',
  'bike-40.JPG'
];

const randomImages = instaImages.sort(() => 0.5 - Math.random()).slice(0, 20);
let instaHTML = '';
for (let i = 0; i < randomImages.length; i++) {
  const image = encodeURI(randomImages[i]);
  instaHTML += `<div class="insta-cell">
      <div class="insta-bg" style="background-image:url('images/${image}')"></div>
      <div class="insta-cell-overlay"><span>FOLLOW</span></div>
    </div>`;
}
instaStrip.innerHTML = instaHTML + instaHTML;

// ====== PORTFOLIO TABS ======
const tabBtns = document.querySelectorAll('.tab-btn');
const categorySections = document.querySelectorAll('.category-section');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    categorySections.forEach(s => {
      s.classList.remove('active');
      if (s.id === 'cat-' + cat) s.classList.add('active');
    });
  });
});



// ====== FILM TOGGLE ======
const filmToggle = document.getElementById('filmToggle');
const digitalLabel = document.getElementById('digitalLabel');
const filmLabel = document.getElementById('filmLabel');
let isFilmMode = true; // Start in film mode by default

filmToggle.addEventListener('click', () => {
  isFilmMode = !isFilmMode;
  filmToggle.classList.toggle('film-mode', isFilmMode);
  digitalLabel.classList.toggle('active', !isFilmMode);
  filmLabel.classList.toggle('active', isFilmMode);

  const filmItems = document.querySelectorAll('#filmGrid .film-roll-item');
  filmItems.forEach(item => {
    const filmImg = item.querySelector('.film-image');
    const digitalImg = item.querySelector('.digital-image');
    if (isFilmMode) {
      // Show film images
      if (filmImg) filmImg.style.opacity = '1';
      if (digitalImg) digitalImg.style.opacity = '0';
    } else {
      // Show digital images
      if (filmImg) filmImg.style.opacity = '0';
      if (digitalImg) digitalImg.style.opacity = '1';
    }
  });
});

// ====== SCROLL REVEAL ======
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ====== CONTACT MULTI-STEP FORM ======
const contactState = {
  step: 1,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectTypes: [],
    message: ''
  }
};

const formSteps = Array.from(document.querySelectorAll('.form-step'));
const stepNumbers = Array.from(document.querySelectorAll('.step-number'));
const projectTiles = Array.from(document.querySelectorAll('.project-tile'));
const successPanel = document.querySelector('.form-success');

const showContactStep = step => {
  contactState.step = step;
  formSteps.forEach(stepEl => {
    const stepIndex = Number(stepEl.dataset.step);
    stepEl.classList.toggle('active', stepIndex === step);
  });
  stepNumbers.forEach((dot, index) => {
    dot.classList.toggle('active', index + 1 === step);
  });
};

const syncFormData = () => {
  contactState.data.firstName = document.getElementById('firstName').value.trim();
  contactState.data.lastName = document.getElementById('lastName').value.trim();
  contactState.data.email = document.getElementById('emailAddress').value.trim();
  contactState.data.phone = document.getElementById('phoneNumber').value.trim();
  contactState.data.message = document.getElementById('projectMessage').value.trim();
};

const toggleProjectType = value => {
  const index = contactState.data.projectTypes.indexOf(value);
  if (index === -1) {
    contactState.data.projectTypes.push(value);
  } else {
    contactState.data.projectTypes.splice(index, 1);
  }
};

projectTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const value = tile.dataset.value;
    toggleProjectType(value);
    tile.classList.toggle('selected');
  });
});

const validateStep1 = () => {
  syncFormData();
  return contactState.data.firstName !== '' && contactState.data.email !== '';
};

const validateStep3 = () => {
  syncFormData();
  return contactState.data.message !== '';
};

const clearContactForm = () => {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('emailAddress').value = '';
  document.getElementById('phoneNumber').value = '';
  document.getElementById('projectMessage').value = '';
  projectTiles.forEach(tile => tile.classList.remove('selected'));
  contactState.data.projectTypes = [];
};

const showSuccessState = () => {
  formSteps.forEach(stepEl => stepEl.classList.remove('active'));
  successPanel.classList.remove('hidden');
};

const step1Continue = document.getElementById('step1Continue');
const step2Back = document.getElementById('step2Back');
const step2Continue = document.getElementById('step2Continue');
const step3Back = document.getElementById('step3Back');
const step3Submit = document.getElementById('step3Submit');

if (step1Continue) {
  step1Continue.addEventListener('click', () => {
    if (validateStep1()) {
      showContactStep(2);
    }
  });
}

if (step2Back) {
  step2Back.addEventListener('click', () => showContactStep(1));
}

if (step2Continue) {
  step2Continue.addEventListener('click', () => showContactStep(3));
}

if (step3Back) {
  step3Back.addEventListener('click', () => showContactStep(2));
}

if (step3Submit) {
  step3Submit.addEventListener('click', () => {
    if (validateStep3()) {
      syncFormData();
      console.log('Contact form data:', contactState.data);
      clearContactForm();
      showSuccessState();
    }
  });
}

if (successPanel) {
  successPanel.classList.add('hidden');
}

showContactStep(1);

// ====== PARALLAX HERO on mouse ======
const heroContent = document.querySelector('.hero-content');
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ====== NAV SCROLL HIDE ======
const navbar = document.querySelector('nav');
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.classList.add('hide-nav');
  } else {
    navbar.classList.remove('hide-nav');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);


// ====== LIGHTBOX ======
const lbLabels = ["atulya final-00373", "atulya final-00390", "atulya final-00397", "atulya final-00800", "atulya final-00997", "atulya final-01018", "atulya final-01442", "atulya final-01488", "atulya final-01511", "Copy of FInal! (12 of 27)", "Copy of FInal! (23 of 27)", "Copy of FInal! (25 of 27)", "Copy of FInal! (26 of 27)", "Copy of FInal! (4 of 27)", "Copy of FInal! (8 of 27)", "Copy of FInal! (9 of 27)", "Copy of ggg1 (4 of 6)", "Copy of ggg1 (6 of 6)", "Bike 1", "Bike 2", "Bike 3", "Bike 5", "Bike 6", "Bike 7", "Bike 4", "Bike 8", "Bike 9", "Bike 10", "Bike 11", "Bike 12", "Bike 13", "Bike 14", "Bike 18", "Bike 14", "Bike 15", "Bike 16", "Bike 17", "Bike 19", "Bike 20", "Bike 21", "Bike 22", "Bike 23", "Bike 27", "Bike 24", "Bike 25", "Bike 26", "Bike 28", "Bike 29", "Bike 30", "Bike 37", "Bike 31", "Bike 35", "Bike 32", "Bike 38", "Bike 39", "Bike 40", "Film 01", "Film 03", "Film 3", "Film 4", "Film 4of", "Film 66of", "Film 8", "Film 9", "Film 10", "Film 12", "Film 13", "Film 14", "Film 15", "Film 16", "Film 17", "Film 18", "Film 19", "Film 20", "Film 21", "Film 22", "Film 23", "Film 24", "Film 25", "Orange Juice", "Cold Brew", "Cold Brew", "Flatlay", "Flatlay", "Flatlay", "Flatlay", "Flatlay", "Flatlay", "Flatlay", "Chicken Dish", "Chicken Dish", "Orange Juice", "Food Shot", "Street 1", "Street 2", "Street 3", "Street 4", "Street 5", "Street 6", "Street 7", "Street 8", "Street 9", "Street 10", "Street 11", "Street 12", "Street 13", "Street 14", "Street 15", "Street 16", "Street 17", "Street 18", "Street 19", "Street 20", "Street 21", "Street 22", "Street 23", "Street 24"];
let lbIndex = 0;
let lbCurrentSet = [];

function buildCurrentSet() {
  // collect all visible photo-card imgs in current active tab
  const active = document.querySelector('.category-section.active');
  const cards = active ? active.querySelectorAll('.photo-card[onclick]') : [];
  lbCurrentSet = [];
  cards.forEach(card => {
    const onclick = card.getAttribute('onclick');
    const m = onclick.match(/openLightbox\((\d+)\)/);
    if (m) lbCurrentSet.push(parseInt(m[1]));
  });
}

function openLightbox(globalIdx) {
  buildCurrentSet();
  lbIndex = lbCurrentSet.indexOf(globalIdx);
  if (lbIndex === -1) lbIndex = 0;
  showLightboxAt(lbIndex);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxAt(i) {
  const gi = lbCurrentSet[i];
  const imgEl = document.getElementById('lightbox-img');
  const capEl = document.getElementById('lightbox-caption');
  // find the img with this globalIdx
  const card = document.querySelector('.photo-card[onclick="openLightbox(' + gi + ')"]');
  if (card) {
    const src = card.querySelector('img').src;
    imgEl.src = src;
    capEl.textContent = card.dataset.caption || lbLabels[gi] || '';
  }
}

function shiftLightbox(dir) {
  lbIndex = (lbIndex + dir + lbCurrentSet.length) % lbCurrentSet.length;
  showLightboxAt(lbIndex);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});

