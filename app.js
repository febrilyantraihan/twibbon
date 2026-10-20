/**
 * FTH Studio - Twibbon Platform Engine
 * Core: HTML5 Canvas Composite, Multi-touch Gestures, LocalStorage + Google Apps Script Sync
 */

// ================= CONFIGURATION & INITIAL STATE =================
const CONFIG = {
  GAS_API_URL: 'https://script.google.com/macros/s/AKfycbw7jwZnRZkPPORR7QZJlIrPT1dFE8n-xFwcM5z-Wov7_478xaCIRMogzj7UNAIhGngHhw/exec', // Google Apps Script Web App URL
  DEFAULT_SLUG: 'milad-santri-2026',
  EXPORT_SIZE: 1080,
  EXPORT_QUALITY: 0.92,
  DEFAULT_PHONE: '085704332952',
  DEFAULT_PHONE_FORMATTED: '0857-0433-2952',
  DEFAULT_WA_NUMBER: '6285704332952',
  DEFAULT_WA_URL: 'https://wa.me/6285704332952'
};

// Default Creator / Organization Accounts (Multi-Account System)
const DEFAULT_ACCOUNTS = [
  {
    id: 'acc-milad',
    name: 'Panitia Milad & Pesantren',
    handle: 'panitiamilad',
    email: 'panitiamilad@gmail.com',
    phone: '085704332952',
    avatarText: 'PM',
    color: '#15803d',
    bio: 'Penyelenggara resmi Milad Santri Nasional & Kegiatan Pesantren se-Indonesia.',
    verified: true
  },
  {
    id: 'acc-santri',
    name: 'Gerakan Santri Nusantara',
    handle: 'gerakansantri',
    email: 'gerakansantri@gmail.com',
    phone: '085704332952',
    avatarText: 'GS',
    color: '#0f766e',
    bio: 'Wadah silaturahmi santri dan alumni pesantren seluruh pelosok negeri.',
    verified: true
  },
  {
    id: 'acc-sains',
    name: 'Lembaga Prestasi Pelajar',
    handle: 'prestasipelajar',
    email: 'prestasipelajar@gmail.com',
    phone: '085704332952',
    avatarText: 'LP',
    color: '#1d4ed8',
    bio: 'Kompetisi, olimpiade sains, dan apresiasi bakat prestasi generasi muda.',
    verified: true
  },
  {
    id: 'acc-alumni',
    name: 'Ikatan Alumni FTH',
    handle: 'ikatanalumni',
    email: 'ikatanalumni@gmail.com',
    phone: '085704332952',
    avatarText: 'IA',
    color: '#b45309',
    bio: 'Forum komunikasi, temu kangen, dan sinergi alumni lintas angkatan.',
    verified: true
  },
  {
    id: 'acc-user',
    name: 'Akun Kreator Saya',
    handle: 'kreatorsaya',
    email: 'kreatorsaya@gmail.com',
    phone: '085704332952',
    avatarText: 'KS',
    color: '#ea580c',
    bio: 'Akun personal untuk membuat dan mengelola twibbon komunitasmu sendiri.',
    verified: false
  }
];

// Default Seed Campaigns with Thematic Illustrations, Creator Attribution & Curated Hashtags
const DEFAULT_CAMPAIGNS = [
  {
    id: 'cmp-001',
    slug: 'milad-santri-2026',
    title: 'Milad Santri & Pesantren 2026',
    creator: 'Panitia Milad & Pesantren',
    creatorId: 'acc-milad',
    creatorHandle: 'panitiamilad',
    creatorVerified: true,
    category: 'pesantren',
    categoryLabel: 'Milad & Pesantren',
    hashtags: ['#MiladSantri2026', '#PesantrenHebat', '#SantriMendunia'],
    description: 'Pasang foto profilmu untuk memeriahkan peringatan Milad Santri Nasional 2026 bersama keluarga besar pondok pesantren.',
    frameUrl: 'assets/frame_milad.svg',
    frameType: 'svg',
    sampleUserPhoto: 'assets/user_santri.jpg',
    downloads: 12450,
    created_at: '2026-10-04T10:00:00Z'
  },
  {
    id: 'cmp-002',
    slug: 'hari-santri-nasional',
    title: 'Twibbon Hari Santri Nasional 2026',
    creator: 'Gerakan Santri Nusantara',
    creatorId: 'acc-santri',
    creatorHandle: 'gerakansantri',
    creatorVerified: true,
    category: 'nasional',
    categoryLabel: 'Hari Besar Nasional',
    hashtags: ['#HariSantri2026', '#JihadSantri', '#SantriNusantara'],
    description: 'Semarakkan Hari Santri Nasional 2026! Jihad Santri Jayakan Negeri dengan bingkai foto resmi FTH Studio.',
    frameUrl: 'assets/frame_nasional.svg',
    frameType: 'svg',
    sampleUserPhoto: 'assets/user_santriwati.jpg',
    downloads: 24890,
    created_at: '2026-10-04T10:30:00Z'
  },
  {
    id: 'cmp-003',
    slug: 'olimpiade-sains-nusantara',
    title: 'Olimpiade Sains Pelajar Nusantara',
    creator: 'Lembaga Prestasi Pelajar',
    creatorId: 'acc-sains',
    creatorHandle: 'prestasipelajar',
    creatorVerified: true,
    category: 'lomba',
    categoryLabel: 'Olimpiade & Lomba',
    hashtags: ['#OlimpiadeSains2026', '#PrestasiPelajar', '#GenerasiEmas'],
    description: 'Dukung putra-putri berprestasi dalam ajang kompetisi sains tingkat nasional tahun 2026.',
    frameUrl: 'assets/frame_sains.svg',
    frameType: 'svg',
    sampleUserPhoto: 'assets/user_sains.jpg',
    downloads: 8930,
    created_at: '2026-10-04T11:00:00Z'
  },
  {
    id: 'cmp-004',
    slug: 'reuni-akbar-alumni',
    title: 'Reuni Akbar & Temu Kangen Alumni 2026',
    creator: 'Ikatan Alumni FTH',
    creatorId: 'acc-alumni',
    creatorHandle: 'ikatanalumni',
    creatorVerified: true,
    category: 'organisasi',
    categoryLabel: 'Organisasi & Komunitas',
    hashtags: ['#ReuniAkbar2026', '#TemuKangenAlumni', '#SilaturahmiFTH'],
    description: 'Jalin kembali silaturahmi yang erat dalam momen Reuni Akbar Alumni 2026.',
    frameUrl: 'assets/frame_reuni.svg',
    frameType: 'svg',
    sampleUserPhoto: 'assets/user_alumni.jpg',
    downloads: 5210,
    created_at: '2026-10-04T11:30:00Z'
  }
];

// Active State
let currentCampaigns = [];
let activeCampaign = null;
let accounts = [];
let activeAccountId = null;
let isRegistered = false; // Registration gate: users must register before using features
let pendingFeatureCallback = null; // Stored callback to execute once registration is completed
let activeFilter = null; // null | { type: 'creator'|'hashtag'|'my-campaigns', value: string, label: string }

// Canvas & Editor State
let canvas, ctx;
let userImg = null;
let frameImg = null;
let isPhotoOnTop = false; // When true, photo renders in front of frame
let frameCutoutShape = 'none'; // 'none' | 'circle' | 'rect'
let isFrameOpaque = false; // True if frame has no transparent cutout in center

let transformState = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0, // in degrees: 0, 90, 180, 270
  flipped: false,
  filter: 'none'
};

// Pointer / Touch Interaction State
let isDragging = false;
let startPointer = { x: 0, y: 0 };
let initialPinchDistance = null;
let initialPinchScale = 1;
let canvasEventsInitialized = false;

// ================= SESSION CONFIG & TIMERS =================
const SESSION_CONFIG = {
  IDLE_TIMEOUT_MS: 12 * 60 * 1000, // 12 Menit = 720.000 ms
  STORAGE_KEY: 'fth_session_last_active'
};
let sessionIdleTimer = null;
let lastInteractionTime = Date.now();
let isSessionWatcherActive = false;

// ================= THEME MANAGEMENT (LIGHT / DARK) =================
function initTheme() {
  const savedTheme = localStorage.getItem('fth_theme') || 'light';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  const targetTheme = isDark ? 'light' : 'dark';
  applyTheme(targetTheme);
  showToast(targetTheme === 'dark' ? '🌙 Mode Gelap diaktifkan' : '☀️ Mode Terang diaktifkan', 'info');
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
  try {
    localStorage.setItem('fth_theme', theme);
  } catch (e) {}

  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
  if (moonIcon && sunIcon) {
    if (theme === 'dark') {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    }
  }
}

// ================= DOM INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  try { initTheme(); } catch (e) { console.error('initTheme error:', e); }
  try { loadAccounts(); } catch (e) { console.error('loadAccounts error:', e); }
  try { loadCampaigns(); } catch (e) { console.error('loadCampaigns error:', e); }
  try { renderTrendingHashtags(); } catch (e) { console.error('renderTrendingHashtags error:', e); }
  try { setupCanvas(); } catch (e) { console.error('setupCanvas error:', e); }
  try { setupEventListeners(); } catch (e) { console.error('setupEventListeners error:', e); }
  try { checkUrlRouting(); } catch (e) { console.error('checkUrlRouting error:', e); }
});

// ================= AUTHENTICATION & REGISTRATION GATE =================
function requireAuth(callback, featureName = 'menggunakan fitur ini') {
  if (isRegistered) {
    return true;
  }
  pendingFeatureCallback = callback;
  openAuthModal(featureName);
  return false;
}

function handleNavAccountClick() {
  if (isRegistered) {
    openAccountModal();
  } else {
    openAuthModal('mengakses akun dan profil');
  }
}

function openAuthModal(featureReason = '') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;

  // Reset to register tab
  switchAuthTab('register');

  modal.classList.remove('hidden');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
}

function switchAuthTab(tab) {
  const tabReg = document.getElementById('tab-auth-register');
  const tabLogin = document.getElementById('tab-auth-login');
  const paneReg = document.getElementById('pane-auth-register');
  const paneLogin = document.getElementById('pane-auth-login');
  const title = document.getElementById('auth-modal-title');
  const subText = document.getElementById('auth-modal-subtitle-text');
  const switchBtn = document.getElementById('auth-header-switch-btn');
  const footerText = document.getElementById('auth-ref-footer-text');

  if (tab === 'register') {
    tabReg?.classList.add('active');
    tabLogin?.classList.remove('active');
    paneReg?.classList.remove('hidden');
    paneLogin?.classList.add('hidden');
    if (title) title.textContent = 'Create an account';
    if (subText) subText.textContent = 'Already have an account?';
    if (switchBtn) {
      switchBtn.textContent = 'Log in';
      switchBtn.onclick = () => switchAuthTab('login');
    }
    if (footerText) {
      footerText.innerHTML = `Already have an account? <button type="button" class="auth-ref-footer-btn" onclick="switchAuthTab('login')">Log in</button>`;
    }
    setTimeout(() => document.getElementById('reg-name-input')?.focus(), 150);
  } else {
    tabReg?.classList.remove('active');
    tabLogin?.classList.add('active');
    paneReg?.classList.add('hidden');
    paneLogin?.classList.remove('hidden');
    if (title) title.textContent = 'Step Into the Future of Twibbon';
    if (subText) subText.textContent = "Don't have an account?";
    if (switchBtn) {
      switchBtn.textContent = 'Sign up';
      switchBtn.onclick = () => switchAuthTab('register');
    }
    if (footerText) {
      footerText.innerHTML = `Don't have an account? <button type="button" class="auth-ref-footer-btn" onclick="switchAuthTab('register')">Sign up</button>`;
    }
    renderAuthAccountsList();
    setTimeout(() => document.getElementById('login-identifier-input')?.focus(), 150);
  }
}

function toggleAuthMode() {
  const isRegister = document.getElementById('tab-auth-register')?.classList.contains('active');
  switchAuthTab(isRegister ? 'login' : 'register');
}

function togglePasswordVisibility() {
  const input = document.getElementById('login-pin-input');
  const eyeShow = document.getElementById('eye-icon-show');
  const eyeHide = document.getElementById('eye-icon-hide');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    eyeShow?.classList.add('hidden');
    eyeHide?.classList.remove('hidden');
  } else {
    input.type = 'password';
    eyeShow?.classList.remove('hidden');
    eyeHide?.classList.add('hidden');
  }
}

function toggleSavedAccountsDropdown() {
  const drawer = document.getElementById('auth-accounts-drawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
    renderAuthAccountsList();
  }
}

function handleSocialAuthClick(provider) {
  if (provider === 'google') {
    openGoogleAuthModal();
  } else {
    toggleSavedAccountsDropdown();
  }
}

// ================= GOOGLE AUTH SYSTEM (FOR ALL USERS / PUBLIC) =================
// ================= GOOGLE AUTH SYSTEM (FOR ALL USERS / PUBLIC) =================
let selectedGoogleAccountId = null;

function openGoogleAuthModal() {
  const modal = document.getElementById('google-auth-modal');
  if (!modal) return;
  ensureGoogleAccountsReady();
  renderGoogleAccountsPicker();
  
  // Reset custom form state
  const customBox = document.getElementById('google-new-account-box');
  if (customBox) customBox.classList.add('hidden');
  const toggleText = document.getElementById('toggle-custom-google-text');
  if (toggleText) toggleText.textContent = 'Gunakan nama atau email Google lain';
  const progressBar = document.getElementById('google-progress-bar');
  if (progressBar) progressBar.classList.add('hidden');

  modal.classList.remove('hidden');
}

function closeGoogleAuthModal() {
  const modal = document.getElementById('google-auth-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleCustomGoogleInput() {
  const customBox = document.getElementById('google-new-account-box');
  const toggleText = document.getElementById('toggle-custom-google-text');
  if (!customBox) return;

  const isHidden = customBox.classList.toggle('hidden');
  if (toggleText) {
    toggleText.textContent = isHidden 
      ? 'Gunakan akun Google lain' 
      : 'Tutup formulir akun';
  }
}

function ensureGoogleAccountsReady() {
  let changed = false;
  
  // Make sure all accounts have valid email
  accounts = accounts.map(a => {
    if (!a.email) {
      changed = true;
      const def = DEFAULT_ACCOUNTS.find(d => d.id === a.id);
      return {
        ...a,
        email: def?.email || `${(a.handle || 'user').replace(/[^a-z0-9]/g, '')}@gmail.com`
      };
    }
    return a;
  });

  // Ensure default Google personal account exists
  if (!accounts.some(a => a.id === 'acc-google-user' || a.email === 'user.google@gmail.com')) {
    accounts.unshift({
      id: 'acc-google-user',
      name: 'Pengguna Google (Akun Saya)',
      handle: 'penggunagoogle',
      email: 'user.google@gmail.com',
      phone: CONFIG.DEFAULT_PHONE,
      role: 'Personal',
      avatarText: 'G',
      color: '#4285F4',
      bio: 'Akun terverifikasi Google Sign-In FTH Studio.',
      verified: true
    });
    changed = true;
  }

  if (changed) {
    localStorage.setItem('fth_accounts', JSON.stringify(accounts));
  }
}

function renderGoogleAccountsPicker() {
  const container = document.getElementById('google-accounts-picker');
  if (!container) return;

  ensureGoogleAccountsReady();

  // Find accounts with email
  const googleList = accounts.filter(a => a.email && a.email.includes('@'));

  if (!selectedGoogleAccountId && googleList.length > 0) {
    selectedGoogleAccountId = googleList[0].id;
  }

  container.innerHTML = googleList.slice(0, 4).map(acc => {
    const isSelected = acc.id === selectedGoogleAccountId;
    return `
      <div class="google-acc-pill ${isSelected ? 'selected' : ''}" onclick="selectGoogleAccountForAuth('${acc.id}')" title="Pilih ${acc.name}">
        <div class="google-acc-left">
          <div class="google-acc-avatar" style="background-color: ${acc.color || '#4285F4'};">
            ${acc.avatarText || acc.name.substring(0, 1).toUpperCase()}
          </div>
          <div class="google-acc-info">
            <span class="google-acc-name">${acc.name}</span>
            <span class="google-acc-email">${acc.email || `${acc.handle}@gmail.com`}</span>
          </div>
        </div>
        <div class="google-acc-select-indicator">
          ${isSelected ? `
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2.5" style="width: 15px; height: 15px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ` : `
            <span class="google-acc-radio-circle"></span>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Update continue button label
  const activeSelected = accounts.find(a => a.id === selectedGoogleAccountId) || googleList[0];
  const btnText = document.getElementById('btn-google-continue-text');
  if (btnText && activeSelected) {
    const pChar = String.fromCharCode(40);
    let cleanName = activeSelected.name.includes(pChar) ? activeSelected.name.split(pChar)[0].trim() : activeSelected.name;
    if (cleanName.length > 16) {
      cleanName = cleanName.split(' ')[0];
    }
    btnText.textContent = `Lanjutkan sebagai ${cleanName}`;
  }
}

function selectGoogleAccountForAuth(accId) {
  selectedGoogleAccountId = accId;
  renderGoogleAccountsPicker();
}

function handleGoogleAccountSelect(accId) {
  const acc = accounts.find(a => a.id === accId);
  if (!acc) return;

  const progressBar = document.getElementById('google-progress-bar');
  const btn = document.getElementById('btn-google-continue');
  const btnText = document.getElementById('btn-google-continue-text');

  if (progressBar) progressBar.classList.remove('hidden');
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Menghubungkan Akun Google...';

  setTimeout(() => {
    isRegistered = true;
    activeAccountId = acc.id;
    localStorage.setItem('fth_is_registered', 'true');
    localStorage.setItem('fth_active_account_id', acc.id);
    localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, Date.now().toString());
    recordSessionActivity();
    startSessionWatcher();

    if (progressBar) progressBar.classList.add('hidden');
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Lanjutkan sebagai Akun Google';

    closeGoogleAuthModal();
    closeAuthModal();
    updateActiveAccountUI();
    populateAccountDropdownInForm();

    showToast(`🎉 Berhasil masuk dengan Google: ${acc.name}!`, 'success');

    if (pendingFeatureCallback) {
      const cb = pendingFeatureCallback;
      pendingFeatureCallback = null;
      setTimeout(() => cb(), 250);
    }
  }, 400);
}

function handleGoogleAuthSubmit(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('google-name-input');
  const emailInput = document.getElementById('google-email-input');

  const customName = nameInput?.value.trim();
  const customEmail = emailInput?.value.trim();

  // If user entered a custom email, create or log in as that account
  if (customEmail && customEmail.includes('@')) {
    const cleanHandle = customEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') || `user_${Date.now().toString().slice(-4)}`;
    let existing = accounts.find(a => (a.email && a.email.toLowerCase() === customEmail.toLowerCase()) || a.handle.toLowerCase() === cleanHandle);

    if (existing) {
      handleGoogleAccountSelect(existing.id);
      return;
    }

    const initials = (customName || 'Google User').split(' ').filter(Boolean).map(w => w[0].toUpperCase()).slice(0, 2).join('') || 'G';
    const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#1a73e8'];
    const color = googleColors[Math.floor(Math.random() * googleColors.length)];

    const newGoogleAcc = {
      id: 'acc-google-' + Date.now(),
      name: customName || 'Pengguna Google',
      handle: cleanHandle,
      email: customEmail,
      phone: CONFIG.DEFAULT_PHONE,
      role: 'Personal',
      avatarText: initials,
      color: color,
      bio: 'Pengguna terverifikasi Google Sign-In FTH Studio.',
      verified: true
    };

    accounts.unshift(newGoogleAcc);
    localStorage.setItem('fth_accounts', JSON.stringify(accounts));
    handleGoogleAccountSelect(newGoogleAcc.id);
    return;
  }

  // Otherwise, log in immediately with the selected account or top account!
  ensureGoogleAccountsReady();
  const targetId = selectedGoogleAccountId || accounts[0]?.id || 'acc-google-user';
  handleGoogleAccountSelect(targetId);
}

function renderAuthAccountsList() {
  const container = document.getElementById('auth-accounts-list');
  if (!container) return;

  if (!Array.isArray(accounts) || accounts.length === 0) {
    accounts = [...DEFAULT_ACCOUNTS];
    localStorage.setItem('fth_accounts', JSON.stringify(accounts));
  }

  if (accounts.length === 0) {
    container.innerHTML = `
      <div class="auth-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span class="auth-empty-title">Belum ada akun di perangkat ini</span>
        <span class="auth-empty-desc">Silakan buat akun baru untuk mulai membuat twibbon.</span>
        <button type="button" class="btn-auth-switch-reg" onclick="switchAuthTab('register')">
          Daftar Akun Baru &rarr;
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = accounts.map(acc => {
    return `
      <div class="auth-acc-item" onclick="handleAuthQuickLogin('${acc.id}')">
        <div class="auth-acc-left">
          <div class="auth-acc-avatar" style="background-color: ${acc.color || '#15803d'};">
            ${acc.avatarText || acc.name.substring(0, 2).toUpperCase()}
          </div>
          <div class="auth-acc-details">
            <span class="auth-acc-name">${acc.name}</span>
            <span class="auth-acc-handle">@${acc.handle}</span>
          </div>
        </div>
        <button class="btn-auth-select" type="button">Masuk</button>
      </div>
    `;
  }).join('');
}

function handleAuthRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name-input').value.trim();
  const phone = document.getElementById('reg-phone-input').value.trim();
  const role = document.getElementById('reg-role-select').value;
  let handle = document.getElementById('reg-handle-input').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');

  if (!name || !handle) {
    showToast('Nama dan handle wajib diisi!', 'error');
    return;
  }

  if (accounts.some(a => a.handle.toLowerCase() === handle)) {
    showToast(`Handle @${handle} sudah digunakan. Pilih handle lain.`, 'error');
    return;
  }

  const initials = name.split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('') || 'AK';

  const vibrantColors = ['#059669', '#0284c7', '#7c3aed', '#db2777', '#ea580c', '#d97706', '#2563eb'];
  const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

  const newAcc = {
    id: 'acc-' + Date.now(),
    name: name,
    handle: handle,
    phone: phone || CONFIG.DEFAULT_PHONE,
    role: role,
    avatarText: initials,
    color: randomColor,
    bio: `${role} resmi di FTH Studio Twibbon.`,
    verified: false
  };

  accounts.unshift(newAcc);
  localStorage.setItem('fth_accounts', JSON.stringify(accounts));

  // Mark as registered & logged in
  isRegistered = true;
  activeAccountId = newAcc.id;
  localStorage.setItem('fth_is_registered', 'true');
  localStorage.setItem('fth_active_account_id', newAcc.id);
  localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, Date.now().toString());
  recordSessionActivity();
  startSessionWatcher();

  closeAuthModal();
  updateActiveAccountUI();
  populateAccountDropdownInForm();

  showToast(`🎉 Pendaftaran berhasil! Selamat datang, ${name}!`, 'success');

  // Trigger pending action if user clicked a feature before registering
  if (pendingFeatureCallback) {
    const cb = pendingFeatureCallback;
    pendingFeatureCallback = null;
    setTimeout(() => cb(), 250);
  }
}

function handleAuthQuickLogin(accId) {
  const target = accounts.find(a => a.id === accId);
  if (!target) return;

  isRegistered = true;
  activeAccountId = accId;
  localStorage.setItem('fth_is_registered', 'true');
  localStorage.setItem('fth_active_account_id', accId);
  localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, Date.now().toString());
  recordSessionActivity();
  startSessionWatcher();

  closeAuthModal();
  updateActiveAccountUI();
  populateAccountDropdownInForm();

  showToast(`👋 Berhasil masuk sebagai ${target.name}!`, 'success');

  if (pendingFeatureCallback) {
    const cb = pendingFeatureCallback;
    pendingFeatureCallback = null;
    setTimeout(() => cb(), 250);
  }
}

function handleDirectLogin(e) {
  if (e) e.preventDefault();
  const inputEl = document.getElementById('login-identifier-input');
  const pinInput = document.getElementById('login-pin-input');
  if (!inputEl) return;
  const raw = inputEl.value.trim();
  const enteredPin = pinInput ? pinInput.value.trim() : '';

  if (!raw) {
    showToast('Masukkan username (@) atau No. WhatsApp Anda', 'error');
    return;
  }

  const cleanHandle = raw.replace(/^@/, '').toLowerCase();
  const cleanPhone = raw.replace(/[^0-9]/g, '');

  // 1. Kredensial Administrator Rahasia
  if ((cleanHandle === 'admin' || cleanHandle === 'fthadmin') && 
      (enteredPin === 'fth2026' || enteredPin === 'admin123' || enteredPin === 'admin')) {
    
    let adminAcc = accounts.find(a => a.id === 'acc-admin' || a.handle === 'admin');
    if (!adminAcc) {
      adminAcc = {
        id: 'acc-admin',
        name: 'Administrator FTH',
        handle: 'admin',
        email: 'admin@fthstudio.com',
        phone: CONFIG.DEFAULT_PHONE,
        role: 'Administrator',
        avatarText: 'AD',
        color: '#0f766e',
        bio: 'Pengelola Resmi Platform FTH Studio Twibbon.',
        verified: true,
        isAdmin: true
      };
      accounts.unshift(adminAcc);
      localStorage.setItem('fth_accounts', JSON.stringify(accounts));
    }

    localStorage.setItem('fth_admin_logged_in', 'true');
    sessionStorage.setItem('fth_admin_session', 'true');
    handleAuthQuickLogin(adminAcc.id);
    
    showToast('🔐 Berhasil masuk sebagai Administrator! (Tekan Ctrl+Shift+A untuk Dashboard)', 'success');
    return;
  }

  // 2. Akun Biasa
  const found = accounts.find(a => {
    const aHandle = (a.handle || '').toLowerCase();
    const aPhone = (a.phone || '').replace(/[^0-9]/g, '');
    return aHandle === cleanHandle || (cleanPhone.length >= 8 && aPhone === cleanPhone);
  });

  if (found) {
    handleAuthQuickLogin(found.id);
  } else {
    showToast(`Akun "${raw}" belum terdaftar di perangkat ini.`, 'error');
    setTimeout(() => {
      switchAuthTab('register');
      if (/^[0-9+]+$/.test(raw)) {
        const phoneInput = document.getElementById('reg-phone-input');
        if (phoneInput) phoneInput.value = raw;
      } else {
        const handleInput = document.getElementById('reg-handle-input');
        if (handleInput) handleInput.value = cleanHandle;
      }
    }, 900);
  }
}

// ================= SESSION & IDLE TIMEOUT MANAGER (12 MENIT) =================
function recordSessionActivity() {
  if (!isRegistered) return;
  const now = Date.now();
  lastInteractionTime = now;

  // Simpan timestamp ke localStorage dengan throttle (setiap 10 detik) agar performa optimal
  const stored = parseInt(localStorage.getItem(SESSION_CONFIG.STORAGE_KEY) || '0', 10);
  if (now - stored > 10000) {
    localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, now.toString());
  }

  // Reset timer idle
  resetSessionIdleTimer();
}

function resetSessionIdleTimer() {
  if (!isRegistered) {
    clearSessionTimeout();
    return;
  }

  if (sessionIdleTimer) {
    clearTimeout(sessionIdleTimer);
  }

  sessionIdleTimer = setTimeout(() => {
    checkSessionTimeout();
  }, SESSION_CONFIG.IDLE_TIMEOUT_MS);
}

function checkSessionTimeout() {
  if (!isRegistered) return;
  const now = Date.now();
  const lastActive = Math.max(
    lastInteractionTime,
    parseInt(localStorage.getItem(SESSION_CONFIG.STORAGE_KEY) || '0', 10)
  );

  const elapsed = now - lastActive;
  if (elapsed >= SESSION_CONFIG.IDLE_TIMEOUT_MS) {
    handleLogoutUser(true);
  } else {
    // Masih ada aktivitas di tab lain / sebelum timer terpicu; jadwalkan sisa waktu
    const remaining = SESSION_CONFIG.IDLE_TIMEOUT_MS - elapsed;
    if (sessionIdleTimer) clearTimeout(sessionIdleTimer);
    sessionIdleTimer = setTimeout(checkSessionTimeout, Math.max(1000, remaining));
  }
}

function clearSessionTimeout() {
  if (sessionIdleTimer) {
    clearTimeout(sessionIdleTimer);
    sessionIdleTimer = null;
  }
}

function startSessionWatcher() {
  if (isSessionWatcherActive) return;
  isSessionWatcherActive = true;

  // Dengarkan semua interaksi pengguna di aplikasi
  const interactionEvents = [
    'pointerdown',
    'pointermove',
    'touchstart',
    'keydown',
    'wheel',
    'scroll',
    'click'
  ];

  let lastThrottle = 0;
  interactionEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      if (!isRegistered) return;
      const now = Date.now();
      // Throttle event trigger (setiap 2 detik untuk pointer/scroll)
      if (now - lastThrottle > 2000) {
        lastThrottle = now;
        recordSessionActivity();
      }
    }, { passive: true });
  });

  // Saat tab browser kembali difokuskan, periksa apakah sesi sudah kadaluarsa
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isRegistered) {
      checkSessionTimeout();
      if (isRegistered) {
        recordSessionActivity();
      }
    }
  });

  // Sinkronisasi lintas-tab (multi-tab sync)
  window.addEventListener('storage', (e) => {
    if (e.key === SESSION_CONFIG.STORAGE_KEY && isRegistered) {
      const remoteLast = parseInt(e.newValue || '0', 10);
      if (remoteLast > lastInteractionTime) {
        lastInteractionTime = remoteLast;
        resetSessionIdleTimer();
      }
    } else if (e.key === 'fth_is_registered' && e.newValue !== 'true' && isRegistered) {
      handleLogoutUser(false);
    }
  });
}

function handleLogoutUser(isAutoTimeout = false) {
  isRegistered = false;
  activeAccountId = null;
  localStorage.removeItem('fth_is_registered');
  localStorage.removeItem('fth_active_account_id');
  localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
  clearSessionTimeout();

  closeAccountModal();
  updateActiveAccountUI();
  populateAccountDropdownInForm();

  if (isAutoTimeout) {
    showToast('⏱️ Sesi Anda telah berakhir karena tidak ada interaksi selama 12 menit. Silakan login kembali.', 'info');
  } else {
    showToast('Anda telah keluar dari sesi akun.', 'info');
  }
}

// ================= ACCOUNTS / MULTI-CREATOR MANAGEMENT =================
function loadAccounts() {
  const savedAccs = localStorage.getItem('fth_accounts');
  if (savedAccs) {
    try {
      accounts = JSON.parse(savedAccs);
    } catch (e) {
      accounts = [...DEFAULT_ACCOUNTS];
    }
  } else {
    accounts = [...DEFAULT_ACCOUNTS];
    localStorage.setItem('fth_accounts', JSON.stringify(accounts));
  }

  // Fallback if empty array was previously stored
  if (!Array.isArray(accounts) || accounts.length === 0) {
    accounts = [...DEFAULT_ACCOUNTS];
    localStorage.setItem('fth_accounts', JSON.stringify(accounts));
  }

  // Ensure accounts have email & Google readiness
  ensureGoogleAccountsReady();

  // Check Registration Status & Session Timeout
  const regStatus = localStorage.getItem('fth_is_registered');
  if (regStatus === 'true') {
    const lastActiveStr = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
    const now = Date.now();
    if (lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      if (lastActive > 0 && (now - lastActive >= SESSION_CONFIG.IDLE_TIMEOUT_MS)) {
        // Sesi kadaluarsa saat browser ditutup / ditinggal
        isRegistered = false;
        activeAccountId = null;
        localStorage.removeItem('fth_is_registered');
        localStorage.removeItem('fth_active_account_id');
        localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
        clearSessionTimeout();
        updateActiveAccountUI();
        populateAccountDropdownInForm();
        setTimeout(() => {
          showToast('⏱️ Sesi Anda telah berakhir karena tidak ada aktivitas selama 12 menit.', 'info');
        }, 500);
        return;
      }
    }

    isRegistered = true;
    const savedActiveId = localStorage.getItem('fth_active_account_id');
    if (savedActiveId && accounts.some(a => a.id === savedActiveId)) {
      activeAccountId = savedActiveId;
    } else {
      activeAccountId = accounts[0]?.id || 'acc-milad';
      localStorage.setItem('fth_active_account_id', activeAccountId);
    }

    recordSessionActivity();
    startSessionWatcher();
  } else {
    isRegistered = false;
    activeAccountId = null;
    clearSessionTimeout();
  }

  updateActiveAccountUI();
  populateAccountDropdownInForm();
}

function getActiveAccount() {
  if (!isRegistered) return null;
  return accounts.find(a => a.id === activeAccountId) || accounts[0] || null;
}

function updateActiveAccountUI() {
  const navBtn = document.getElementById('nav-account-btn');
  const navAvatar = document.getElementById('nav-account-avatar');
  const navAvatarText = document.getElementById('nav-account-avatar-text');
  const navName = document.getElementById('nav-account-name');
  const navHandle = document.getElementById('nav-account-handle');

  // GUEST / UNREGISTERED STATE
  if (!isRegistered) {
    if (navBtn) {
      navBtn.classList.add('guest-state');
      navBtn.title = 'Masuk atau Buat Akun Kreator';
    }
    if (navAvatar) {
      navAvatar.style.backgroundColor = '#ff7a30';
      navAvatar.classList.add('guest-avatar');
    }
    if (navAvatarText) {
      navAvatarText.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 14px; height: 14px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
    if (navName) navName.textContent = 'Masuk / Daftar';
    if (navHandle) navHandle.textContent = 'Akun Kreator';

    updateMyCampaignsCount();
    return;
  }

  // REGISTERED USER STATE
  const active = getActiveAccount();
  if (navBtn) {
    navBtn.classList.remove('guest-state');
    navBtn.title = `Profil: ${active ? active.name : 'Akun Kreator'}`;
  }
  if (navAvatar) {
    navAvatar.classList.remove('guest-avatar');
    navAvatar.style.backgroundColor = (active && active.color) || '#15803d';
  }
  if (navAvatarText) {
    navAvatarText.textContent = active ? (active.avatarText || active.name.substring(0, 2).toUpperCase()) : 'AK';
  }
  if (navName) navName.textContent = active ? active.name : 'Akun Saya';
  if (navHandle) navHandle.textContent = active ? `@${active.handle}` : '@kreator';

  // Modal spotlight
  const spotAvatar = document.getElementById('spotlight-avatar');
  const spotName = document.getElementById('spotlight-name');
  const spotHandle = document.getElementById('spotlight-handle');
  const spotBio = document.getElementById('spotlight-bio');
  const spotBadge = document.getElementById('spotlight-verified-badge');

  if (active) {
    if (spotAvatar) {
      spotAvatar.style.backgroundColor = active.color || '#15803d';
      spotAvatar.textContent = active.avatarText || active.name.substring(0, 2).toUpperCase();
    }
    if (spotName) spotName.textContent = active.name;
    if (spotHandle) spotHandle.textContent = `@${active.handle}`;
    if (spotBio) spotBio.textContent = active.bio || 'Kreator twibbon FTH Studio.';
    if (spotBadge) {
      spotBadge.style.display = active.verified ? 'inline-flex' : 'none';
    }
  }

  const adminShortcutBtn = document.getElementById('btn-admin-portal-shortcut');
  if (adminShortcutBtn) {
    if (active && (active.isAdmin || active.handle === 'admin')) {
      adminShortcutBtn.classList.remove('hidden');
    } else {
      adminShortcutBtn.classList.add('hidden');
    }
  }

  updateMyCampaignsCount();
}

function updateMyCampaignsCount() {
  const myCountEl = document.getElementById('my-campaigns-count');
  if (!myCountEl) return;
  if (!isRegistered || !activeAccountId) {
    myCountEl.textContent = '0';
    return;
  }
  const count = currentCampaigns.filter(c => c.creatorId === activeAccountId).length;
  myCountEl.textContent = count;
}

function openAccountModal() {
  if (!isRegistered) {
    openAuthModal('mengakses akun dan kampanye');
    return;
  }
  renderAccountsList();
  updateActiveAccountUI();
  document.getElementById('account-modal').classList.remove('hidden');
}

function closeAccountModal() {
  document.getElementById('account-modal').classList.add('hidden');
  const formWrap = document.getElementById('new-account-form-wrapper');
  if (formWrap) formWrap.classList.add('hidden');
}

function renderAccountsList() {
  const container = document.getElementById('accounts-grid-list');
  if (!container) return;

  container.innerHTML = accounts.map(acc => {
    const isActive = acc.id === activeAccountId;
    const count = currentCampaigns.filter(c => c.creatorId === acc.id).length;
    return `
      <div class="account-item-card ${isActive ? 'active' : ''}" onclick="switchActiveAccount('${acc.id}')">
        <div class="account-item-left">
          <div class="account-item-avatar" style="background-color: ${acc.color || '#15803d'};">
            ${acc.avatarText || acc.name.substring(0, 2).toUpperCase()}
          </div>
          <div class="account-item-details">
            <div class="account-item-name-row">
              <span class="account-item-name">${acc.name}</span>
              ${acc.verified ? `
                <span class="verified-badge-mini" title="Terverifikasi">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>` : ''}
            </div>
            <span class="account-item-handle">@${acc.handle} • ${count} kampanye</span>
          </div>
        </div>
        <div class="account-item-action">
          ${isActive 
            ? `<span class="badge-active-account">Aktif</span>` 
            : `<button class="btn-switch-account" onclick="event.stopPropagation(); switchActiveAccount('${acc.id}')">Pilih</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function switchActiveAccount(accId) {
  const target = accounts.find(a => a.id === accId);
  if (!target) return;

  activeAccountId = accId;
  localStorage.setItem('fth_active_account_id', accId);
  recordSessionActivity();
  updateActiveAccountUI();
  renderAccountsList();

  // If in create form, sync selected value
  const selectEl = document.getElementById('new-campaign-account');
  if (selectEl) {
    selectEl.value = accId;
    const nameInput = document.getElementById('new-campaign-creator');
    if (nameInput) nameInput.value = target.name;
  }

  showToast(`Beralih ke akun: ${target.name} (@${target.handle})`, 'success');
}

function toggleNewAccountForm() {
  const formWrap = document.getElementById('new-account-form-wrapper');
  if (!formWrap) return;
  const isHidden = formWrap.classList.contains('hidden');
  if (isHidden) {
    formWrap.classList.remove('hidden');
    formWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('acc-name-input')?.focus();
  } else {
    formWrap.classList.add('hidden');
  }
}

function handleCreateNewAccount(e) {
  e.preventDefault();
  const name = document.getElementById('acc-name-input').value.trim();
  let handle = document.getElementById('acc-handle-input').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const bio = document.getElementById('acc-bio-input').value.trim();

  if (!name || !handle) {
    showToast('Nama dan handle akun wajib diisi!', 'error');
    return;
  }

  if (accounts.some(a => a.handle.toLowerCase() === handle)) {
    showToast(`Handle @${handle} sudah digunakan. Pilih handle lain.`, 'error');
    return;
  }

  // Generate initials and vibrant brand color
  const initials = name.split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('') || 'AK';

  const vibrantColors = ['#0284c7', '#7c3aed', '#db2777', '#059669', '#d97706', '#dc2626', '#4f46e5'];
  const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

  const newAcc = {
    id: 'acc-' + Date.now(),
    name: name,
    handle: handle,
    avatarText: initials,
    color: randomColor,
    bio: bio || `Akun penyelenggara twibbon resmi ${name}.`,
    verified: false
  };

  accounts.push(newAcc);
  localStorage.setItem('fth_accounts', JSON.stringify(accounts));
  
  // Switch to new account immediately
  switchActiveAccount(newAcc.id);
  populateAccountDropdownInForm();

  // Reset & close form
  document.getElementById('create-account-form').reset();
  toggleNewAccountForm();

  showToast(`Akun @${handle} berhasil dibuat dan diaktifkan!`, 'success');
}

function populateAccountDropdownInForm() {
  const selectEl = document.getElementById('new-campaign-account');
  if (!selectEl) return;

  selectEl.innerHTML = accounts.map(a => `
    <option value="${a.id}" ${a.id === activeAccountId ? 'selected' : ''}>
      ${a.name} (@${a.handle})
    </option>
  `).join('');

  const nameInput = document.getElementById('new-campaign-creator');
  if (nameInput) {
    const active = getActiveAccount();
    if (active) nameInput.value = active.name;
  }
}

function handleAccountSelectInForm(accId) {
  const acc = accounts.find(a => a.id === accId);
  const nameInput = document.getElementById('new-campaign-creator');
  if (acc && nameInput) {
    nameInput.value = acc.name;
  }
}

// ================= CAMPAIGNS DATA HANDLING =================
function loadCampaigns() {
  const localSaved = localStorage.getItem('fth_custom_campaigns');
  let customCampaigns = [];
  if (localSaved) {
    try {
      customCampaigns = JSON.parse(localSaved);
    } catch (e) {
      console.error('Error parsing local campaigns:', e);
    }
  }

  currentCampaigns = [...customCampaigns, ...DEFAULT_CAMPAIGNS];
  renderCampaignCards(currentCampaigns);
  updateMyCampaignsCount();
}

// ================= TRENDING HASHTAGS STRIP =================
function renderTrendingHashtags() {
  const container = document.getElementById('hashtag-chips-track');
  if (!container) return;

  // Count tag occurrences across all campaigns
  const tagCountMap = {};
  currentCampaigns.forEach(c => {
    (c.hashtags || []).forEach(t => {
      const cleanTag = t.startsWith('#') ? t : `#${t}`;
      tagCountMap[cleanTag] = (tagCountMap[cleanTag] || 0) + 1;
    });
  });

  const sortedTags = Object.keys(tagCountMap).sort((a, b) => tagCountMap[b] - tagCountMap[a]);

  if (sortedTags.length === 0) {
    container.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); padding: 4px 8px;">Belum ada tagar kampanye.</span>`;
    return;
  }

  container.innerHTML = sortedTags.map(tag => {
    const count = tagCountMap[tag];
    const isActive = activeFilter && activeFilter.type === 'hashtag' && activeFilter.value.toLowerCase() === tag.toLowerCase();
    return `
      <button class="hashtag-chip ${isActive ? 'active' : ''}" onclick="filterByHashtag('${tag}')" title="Filter kampanye dengan ${tag}">
        <span class="hashtag-chip-hash">#</span>
        <span class="hashtag-chip-label">${tag.replace(/^#/, '')}</span>
        <span class="hashtag-chip-count">${count}</span>
      </button>
    `;
  }).join('');
}

// ================= FILTERING SYSTEM (NO MIXING UP) =================
function filterByHashtag(tag) {
  const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
  activeFilter = {
    type: 'hashtag',
    value: cleanTag,
    label: `Tagar: ${cleanTag}`
  };

  updateFilterBanner();
  renderTrendingHashtags();

  const filtered = currentCampaigns.filter(c => 
    (c.hashtags || []).some(t => t.toLowerCase() === cleanTag.toLowerCase())
  );

  renderCampaignCards(filtered);
  scrollToCampaigns();
  showToast(`Menampilkan kampanye dengan tagar ${cleanTag}`, 'info');
}

function filterByCreator(creatorId, creatorName, handle) {
  activeFilter = {
    type: 'creator',
    value: creatorId,
    label: `Akun: ${creatorName} (@${handle})`
  };

  updateFilterBanner();

  const filtered = currentCampaigns.filter(c => c.creatorId === creatorId || c.creatorHandle === handle);
  renderCampaignCards(filtered);
  scrollToCampaigns();
  showToast(`Menampilkan kampanye milik ${creatorName}`, 'info');
}

function filterByMyCampaigns() {
  if (!requireAuth(() => filterByMyCampaigns(), 'melihat daftar kampanye Anda')) return;
  const active = getActiveAccount();
  if (!active) return;
  activeFilter = {
    type: 'my-campaigns',
    value: active.id,
    label: `Kampanye Saya (@${active.handle})`
  };

  // Set category chip active
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === 'my-campaigns');
  });

  updateFilterBanner();

  const filtered = currentCampaigns.filter(c => c.creatorId === active.id);
  renderCampaignCards(filtered);
  scrollToCampaigns();

  if (filtered.length === 0) {
    showToast(`Belum ada kampanye untuk akun @${active.handle}. Buat sekarang!`, 'info');
  } else {
    showToast(`Menampilkan ${filtered.length} kampanye milik Anda (@${active.handle})`, 'success');
  }
}

function resetCampaignFilter() {
  activeFilter = null;
  updateFilterBanner();
  renderTrendingHashtags();

  // Reset category chips to 'all'
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === 'all');
  });

  renderCampaignCards(currentCampaigns);
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === cat);
  });
  activeFilter = null;
  updateFilterBanner();
  if (cat === 'all') {
    renderCampaignCards(currentCampaigns);
  } else {
    const filtered = currentCampaigns.filter(c => c.category === cat);
    renderCampaignCards(filtered);
  }
  scrollToCampaigns();
}

function updateFilterBanner() {
  const banner = document.getElementById('active-filter-banner');
  const badge = document.getElementById('filter-banner-badge');
  const text = document.getElementById('filter-banner-text');

  if (!banner) return;

  if (!activeFilter) {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');

  if (activeFilter.type === 'hashtag') {
    badge.textContent = 'Tagar';
    text.innerHTML = `Menampilkan kampanye dengan tagar <strong>${activeFilter.value}</strong>`;
  } else if (activeFilter.type === 'creator') {
    badge.textContent = 'Penyelenggara';
    text.innerHTML = `Menampilkan kampanye milik: <strong>${activeFilter.label.replace('Akun: ', '')}</strong>`;
  } else if (activeFilter.type === 'my-campaigns') {
    badge.textContent = 'Akun Saya';
    text.innerHTML = `Menampilkan kampanye milik: <strong>${activeFilter.label}</strong>`;
  }
}

function renderCampaignCards(campaigns) {
  const container = document.getElementById('campaign-cards-container');
  if (!container) return;

  if (campaigns.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(22, 163, 74, 0.1); color: var(--primary-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 26px; height: 26px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <h4 style="font-family: var(--font-brand); font-size: 17px; margin-bottom: 6px; color: var(--text-primary);">Tidak ada kampanye yang cocok</h4>
        <p style="color: var(--text-secondary); font-size: 13.5px; max-width: 380px; margin: 0 auto 16px;">Coba gunakan kata kunci lain, atau hapus filter untuk melihat seluruh kampanye yang tersedia.</p>
        <button class="btn-sub-action" onclick="resetCampaignFilter()" style="margin: 0 auto; display: inline-flex;">Tampilkan Semua Kampanye</button>
      </div>
    `;
    return;
  }

  container.innerHTML = campaigns.map(c => {
    // Creator Avatar Initial & Color lookup
    const creatorAcc = accounts.find(a => a.id === c.creatorId) || {
      name: c.creator,
      avatarText: c.creator ? c.creator.substring(0, 2).toUpperCase() : 'FT',
      color: '#16a34a',
      handle: c.creatorHandle || 'fthstudio',
      verified: c.creatorVerified || false
    };

    const tagsHtml = (c.hashtags || []).map(t => `
      <span class="card-hashtag-badge" onclick="event.stopPropagation(); filterByHashtag('${t}')" title="Filter tagar ${t}">${t}</span>
    `).join('');

    return `
      <article class="campaign-card" data-slug="${c.slug}" data-category="${c.category}" onclick="openTwibbonEditor('${c.slug}')">
        <div class="card-frame-preview">
          <span class="card-badge-category">${c.categoryLabel || 'Twibbon'}</span>
          <img src="${c.sampleUserPhoto || 'assets/user_santri.jpg'}" alt="Foto Profil" class="card-sample-user-photo" loading="lazy">
          <img src="${c.frameUrl}" alt="${c.title}" class="card-frame-img" loading="lazy">
          <span class="card-badge-supporters">${formatNumber(c.downloads)}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title" title="${c.title}">${c.title}</h3>
          
          <!-- Creator Account Attribution Row (No Mixing Up) -->
          <div class="card-creator-row" onclick="event.stopPropagation(); filterByCreator('${c.creatorId || creatorAcc.id}', '${c.creator}', '${creatorAcc.handle}')" title="Lihat semua twibbon dari ${c.creator}">
            <div class="card-creator-avatar" style="background-color: ${creatorAcc.color || '#15803d'};">
              ${creatorAcc.avatarText || 'FT'}
            </div>
            <div class="card-creator-meta">
              <div class="card-creator-name-row">
                <span class="card-creator-name">${c.creator}</span>
                ${creatorAcc.verified ? `
                  <svg class="verified-check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" title="Akun Resmi">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>` : ''}
              </div>
              <span class="card-creator-handle">@${creatorAcc.handle || 'fthstudio'}</span>
            </div>
          </div>

          <!-- Dynamic Hashtags Row -->
          ${tagsHtml ? `<div class="card-hashtags-list">${tagsHtml}</div>` : ''}

          <div class="card-actions">
            <button class="btn-card-use" onclick="openTwibbonEditor('${c.slug}')" aria-label="Pakai Twibbon">
              <span>Pakai</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="card-arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button class="btn-card-wa" onclick="event.stopPropagation(); shareCampaignToWhatsApp('${c.slug}', event)" title="Bagikan ke WhatsApp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </button>
            <button class="btn-card-share" onclick="event.stopPropagation(); shareCampaignLink('${c.slug}', event)" title="Salin Tautan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ================= ROUTING VIA QUERY PARAM (?c=slug) =================
function checkUrlRouting() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('c');
  if (slug) {
    // Attempt to open the campaign editor immediately
    const found = currentCampaigns.find(c => c.slug === slug);
    if (found) {
      openTwibbonEditor(slug);
    } else {
      showToast(`Kampanye "${slug}" tidak ditemukan. Menampilkan daftar umum.`, 'error');
    }
  }
}

// ================= CANVAS ENGINE & COMPOSITE =================
function setupCanvas() {
  canvas = document.getElementById('twibbon-canvas');
  if (!canvas) return;
  if (!ctx) {
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  }
  
  canvas.width = CONFIG.EXPORT_SIZE;
  canvas.height = CONFIG.EXPORT_SIZE;

  // Pointer / Touch Events for Pan & Pinch (attach only once)
  if (canvasEventsInitialized) return;
  canvasEventsInitialized = true;

  const stage = document.getElementById('canvas-stage');
  if (!stage) return;

  stage.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('pointercancel', handlePointerUp);

  // Wheel zoom
  stage.addEventListener('wheel', (e) => {
    if (!userImg) return;
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.06 : 0.06;
    setZoom(transformState.scale + zoomDelta);
  }, { passive: false });

  // Drag and drop image file directly onto canvas stage
  stage.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
  stage.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUserPhotoSelected(e.dataTransfer.files[0]);
    }
  });

  // Touch gesture prevention for smooth pan
  stage.addEventListener('touchstart', handleTouchStart, { passive: false });
  stage.addEventListener('touchmove', handleTouchMove, { passive: false });
  stage.addEventListener('touchend', handleTouchEnd);
}

// Render loop: draws user image and frame template with layer order & cutout support
function renderCanvas() {
  if (!canvas) canvas = document.getElementById('twibbon-canvas');
  if (canvas && !ctx) ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx || !canvas) return;

  try {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // 1. Draw User Photo Layer
    const drawUserPhoto = () => {
      if (!userImg || !userImg.complete || (userImg.naturalWidth === 0 && userImg.width === 0)) return;
      ctx.save();
      applyCanvasFilter(ctx, transformState.filter);
      const tx = Number.isFinite(transformState.x) ? transformState.x : 0;
      const ty = Number.isFinite(transformState.y) ? transformState.y : 0;
      const scale = (Number.isFinite(transformState.scale) && transformState.scale > 0) ? transformState.scale : 1;
      const rot = Number.isFinite(transformState.rotation) ? transformState.rotation : 0;

      ctx.translate(cx + tx, cy + ty);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.scale(
        transformState.flipped ? -scale : scale,
        scale
      );
      const w = userImg.naturalWidth || userImg.width || 800;
      const h = userImg.naturalHeight || userImg.height || 800;
      ctx.drawImage(
        userImg,
        -w / 2,
        -h / 2,
        w,
        h
      );
      ctx.restore();
    };

    // 2. Draw Frame Layer (with optional cutout hole)
    const drawFrame = () => {
      if (!frameImg || !frameImg.complete || (frameImg.naturalWidth === 0 && frameImg.width === 0)) return;
      ctx.save();
      ctx.filter = 'none';

      if (frameCutoutShape && frameCutoutShape !== 'none') {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(frameImg, 0, 0, tempCanvas.width, tempCanvas.height);

        tempCtx.globalCompositeOperation = 'destination-out';
        if (frameCutoutShape === 'circle') {
          tempCtx.beginPath();
          tempCtx.arc(cx, cy, 390, 0, Math.PI * 2);
          tempCtx.fill();
        } else if (frameCutoutShape === 'rect') {
          const w = 720;
          const h = 720;
          const r = 36;
          tempCtx.beginPath();
          if (tempCtx.roundRect) {
            tempCtx.roundRect(cx - w / 2, cy - h / 2, w, h, r);
          } else {
            tempCtx.rect(cx - w / 2, cy - h / 2, w, h);
          }
          tempCtx.fill();
        }
        ctx.drawImage(tempCanvas, 0, 0);
      } else {
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    };

    if (isPhotoOnTop) {
      // Solid frame in back, user photo in front
      drawFrame();
      drawUserPhoto();
    } else {
      // Normal twibbon: user photo in back, frame on top
      drawUserPhoto();
      drawFrame();
    }
  } catch (err) {
    console.error('renderCanvas composite error:', err);
  }
}

function applyCanvasFilter(context, filterType) {
  switch (filterType) {
    case 'bright':
      context.filter = 'brightness(1.15) contrast(1.05)';
      break;
    case 'warm':
      context.filter = 'sepia(0.2) saturate(1.2) brightness(1.05)';
      break;
    case 'vibrant':
      context.filter = 'saturate(1.4) contrast(1.1)';
      break;
    case 'bw':
      context.filter = 'grayscale(1) contrast(1.15)';
      break;
    case 'none':
    default:
      context.filter = 'none';
      break;
  }
}

// ================= GESTURE & POINTER HANDLING =================
let gestureHintTimer = null;

function showGestureHint() {
  const hint = document.getElementById('gesture-hint');
  if (!hint) return;
  hint.classList.remove('hidden');
  hint.classList.remove('hint-hidden');
  if (gestureHintTimer) clearTimeout(gestureHintTimer);
  gestureHintTimer = setTimeout(() => {
    dismissGestureHint();
  }, 2200);
}

function dismissGestureHint() {
  const hint = document.getElementById('gesture-hint');
  if (!hint || hint.classList.contains('hidden')) return;
  hint.classList.add('hint-hidden');
  if (gestureHintTimer) clearTimeout(gestureHintTimer);
  gestureHintTimer = setTimeout(() => {
    hint.classList.add('hidden');
    hint.classList.remove('hint-hidden');
  }, 360);
}

function handlePointerDown(e) {
  if (!userImg) return;
  dismissGestureHint();
  isDragging = true;
  startPointer = { x: e.clientX, y: e.clientY };
  canvas.setPointerCapture?.(e.pointerId);
}

function handlePointerMove(e) {
  if (!isDragging || !userImg) return;

  const dx = e.clientX - startPointer.x;
  const dy = e.clientY - startPointer.y;

  // Convert screen pixels to canvas coordinates (1080 resolution)
  const rect = canvas.getBoundingClientRect();
  const scaleRatio = canvas.width / rect.width;

  transformState.x += dx * scaleRatio;
  transformState.y += dy * scaleRatio;

  startPointer = { x: e.clientX, y: e.clientY };
  renderCanvas();
}

function handlePointerUp() {
  isDragging = false;
}

// Mobile 2-Finger Pinch-to-zoom
function handleTouchStart(e) {
  dismissGestureHint();
  if (e.touches.length === 2 && userImg) {
    e.preventDefault();
    isDragging = false;
    initialPinchDistance = getDistanceBetweenTouches(e.touches[0], e.touches[1]);
    initialPinchScale = transformState.scale;
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 2 && userImg && initialPinchDistance) {
    e.preventDefault();
    const currentDistance = getDistanceBetweenTouches(e.touches[0], e.touches[1]);
    const factor = currentDistance / initialPinchDistance;
    setZoom(initialPinchScale * factor);
  }
}

function handleTouchEnd(e) {
  if (e.touches.length < 2) {
    initialPinchDistance = null;
  }
}

function getDistanceBetweenTouches(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// ================= EDITOR CONTROLS =================
function setZoom(val) {
  const clamped = Math.max(0.3, Math.min(3.5, val));
  transformState.scale = clamped;

  const slider = document.getElementById('zoom-slider');
  const text = document.getElementById('zoom-val-text');
  if (slider) slider.value = clamped;
  if (text) text.textContent = Math.round(clamped * 100) + '%';

  renderCanvas();
}

function stepZoom(delta) {
  if (!userImg) return;
  const current = transformState.scale || 1.0;
  setZoom(current + delta);
}

function rotatePhoto() {
  if (!userImg) return;
  transformState.rotation = (transformState.rotation + 90) % 360;
  renderCanvas();
}

function flipPhoto() {
  if (!userImg) return;
  transformState.flipped = !transformState.flipped;
  renderCanvas();
}

function resetPhotoTransform() {
  if (!userImg) return;
  fitPhotoToCenter();
  renderCanvas();
}

function applyPhotoFilter(filterType) {
  transformState.filter = filterType;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('onclick')?.includes(filterType));
  });
  renderCanvas();
}

function fitPhotoToCenter() {
  if (!userImg || !canvas) return;
  // Calculate aspect fill ratio so photo comfortably covers the frame opening
  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = userImg.width / userImg.height;

  let baseScale = 1;
  if (imgAspect > canvasAspect) {
    baseScale = canvas.height / userImg.height;
  } else {
    baseScale = canvas.width / userImg.width;
  }

  transformState.x = 0;
  transformState.y = 0;
  transformState.scale = Math.max(0.2, Math.min(3.5, baseScale));
  transformState.rotation = 0;
  transformState.flipped = false;
  setZoom(transformState.scale);
}

// ================= TWIBBON EDITOR MODAL LIFECYCLE =================
function openTwibbonEditor(slug) {
  setupCanvas();

  const campaign = currentCampaigns.find(c => c.slug === slug);
  if (!campaign) {
    showToast('Kampanye tidak ditemukan.', 'error');
    return;
  }

  activeCampaign = campaign;
  const titleEl = document.getElementById('editor-campaign-title');
  const creatorEl = document.getElementById('editor-campaign-creator');
  if (titleEl) titleEl.textContent = campaign.title;
  if (creatorEl) creatorEl.textContent = `Oleh ${campaign.creator}`;

  // Reset transforms for fresh placement
  transformState = {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    flipped: false,
    filter: 'none'
  };

  // Synchronize canvas empty state, photo detection UI & download button
  const emptyState = document.getElementById('canvas-empty-state');
  const gestureHint = document.getElementById('gesture-hint');
  const downloadBtn = document.getElementById('btn-download-action');

  if (userImg) {
    if (emptyState) emptyState.classList.add('hidden');
    if (gestureHint) gestureHint.classList.add('hidden');
    if (downloadBtn) downloadBtn.removeAttribute('disabled');
    updatePhotoDetectionUI(true, userImg.src);
    fitPhotoToCenter();
    renderCanvas();
  } else {
    // Auto-load sample photo so user immediately sees a working, gorgeous twibbon preview!
    const sampleSrc = campaign.sampleUserPhoto || 'assets/user_santri.jpg';
    loadSamplePhoto(sampleSrc, true);
  }

  // Show modal
  const modal = document.getElementById('editor-modal');
  if (modal) modal.classList.remove('hidden');

  // Load Frame Image with graceful fallback
  loadFrameImage(campaign.frameUrl || 'assets/frame_milad_transparent.png');

  // Update browser URL silently for shareable link (?c=slug)
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?c=${slug}`;
  window.history.replaceState({ path: newUrl }, '', newUrl);
}

function copyCampaignCaptionAndTags() {
  if (!activeCampaign) return;
  const desc = activeCampaign.description || activeCampaign.title;
  const tagsStr = (activeCampaign.hashtags || []).join(' ');
  const link = `${window.location.origin}${window.location.pathname}?c=${activeCampaign.slug}`;
  const textToCopy = `${desc}\n\n${tagsStr}\n\nPasang Twibbonmu di sini:\n${link}`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast('Teks pesan & tagar berhasil disalin ke papan klip!', 'success');
  }).catch(() => {
    prompt('Salin pesan dan tagar kampanye:', textToCopy);
  });
}

function closeEditorModal() {
  const modal = document.getElementById('editor-modal');
  if (modal) modal.classList.add('hidden');
  // Clear url parameter cleanly
  const cleanUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
}

function analyzeFrameTransparency(img) {
  try {
    const c = document.createElement('canvas');
    c.width = 120;
    c.height = 120;
    const testCtx = c.getContext('2d');
    testCtx.drawImage(img, 0, 0, 120, 120);
    const data = testCtx.getImageData(0, 0, 120, 120).data;

    // Check center 60% of the image (x: 24..96, y: 24..96)
    let transparentPixelsInCenter = 0;
    let totalCenterPixels = 0;
    for (let y = 24; y < 96; y++) {
      for (let x = 24; x < 96; x++) {
        totalCenterPixels++;
        const idx = (y * 120 + x) * 4;
        if (data[idx + 3] < 200) {
          transparentPixelsInCenter++;
        }
      }
    }

    // If center has less than 4% transparent pixels, frame is opaque / has no transparent hole
    return (transparentPixelsInCenter / totalCenterPixels) > 0.04;
  } catch (e) {
    return true; // Fallback
  }
}

function loadFrameImage(url) {
  const loader = document.getElementById('canvas-loader');
  if (loader) loader.classList.remove('hidden');

  frameImg = new Image();
  // Safe CORS handling: only set anonymous for foreign http(s) origins to avoid local CORS blocks & data: URL blocks
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    try {
      const parsed = new URL(url);
      if (parsed.origin !== window.location.origin) {
        frameImg.crossOrigin = 'anonymous';
      }
    } catch (e) {}
  }

  frameImg.onload = () => {
    if (loader) loader.classList.add('hidden');

    // Analyze if frame has transparent hole in center
    const hasTransparentHole = analyzeFrameTransparency(frameImg);
    const noticeEl = document.getElementById('opaque-frame-notice');
    const layerBtnText = document.getElementById('layer-order-text');

    if (!hasTransparentHole) {
      isFrameOpaque = true;
      isPhotoOnTop = true; // Auto-position photo on top so it is NEVER buried!
      if (noticeEl) noticeEl.classList.remove('hidden');
      if (layerBtnText) layerBtnText.textContent = 'Foto Depan';
    } else {
      isFrameOpaque = false;
      isPhotoOnTop = false;
      if (noticeEl) noticeEl.classList.add('hidden');
      if (layerBtnText) layerBtnText.textContent = 'Lapisan';
    }

    if (userImg) {
      fitPhotoToCenter();
    }
    renderCanvas();
  };

  frameImg.onerror = () => {
    if (loader) loader.classList.add('hidden');
    console.warn('Frame image failed to load, falling back to transparent frame:', url);
    // Graceful fallback to guarantee preview is NEVER blank
    if (url !== 'assets/frame_milad_transparent.png') {
      frameImg = new Image();
      frameImg.onload = () => {
        if (userImg) fitPhotoToCenter();
        renderCanvas();
      };
      frameImg.src = 'assets/frame_milad_transparent.png';
    } else {
      showToast('Gagal memuat file bingkai template.', 'error');
    }
  };

  frameImg.src = url || 'assets/frame_milad_transparent.png';
}

function triggerPhotoUpload() {
  const input = document.getElementById('user-photo-input');
  if (input) {
    input.value = ''; // Reset value so selecting same file works reliably
    input.click();
  }
}

function handleUserPhotoSelected(file) {
  if (!file) return;

  // Flexible validation supporting mobile cameras, screenshots, and all image mime-types
  const isImage = (file.type && file.type.startsWith('image/')) ||
                  /\.(jpe?g|png|webp|gif|bmp|heic|heif|jfif|svg|tiff)$/i.test(file.name) ||
                  file.size > 0;

  if (!isImage) {
    showToast('Silakan pilih file gambar yang valid (JPG, PNG, WEBP).', 'error');
    return;
  }

  const loader = document.getElementById('canvas-loader');
  if (loader) loader.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      if (loader) loader.classList.add('hidden');
      userImg = img;
      
      // Hide empty placeholder & enable download
      const emptyState = document.getElementById('canvas-empty-state');
      if (emptyState) emptyState.classList.add('hidden');
      const downloadBtn = document.getElementById('btn-download-action');
      if (downloadBtn) downloadBtn.removeAttribute('disabled');

      // Update Photo Detection Status Card
      updatePhotoDetectionUI(true, e.target.result);

      // If frame has no transparent hole, make sure photo is on top
      if (isFrameOpaque) {
        isPhotoOnTop = true;
      }

      fitPhotoToCenter();
      renderCanvas();
      showGestureHint();
      showToast('Foto berhasil terdeteksi dan dipasang!', 'success');
    };
    img.onerror = () => {
      if (loader) loader.classList.add('hidden');
      showToast('Gagal memproses file foto yang dipilih.', 'error');
    };
    img.src = e.target.result;
  };
  reader.onerror = () => {
    if (loader) loader.classList.add('hidden');
    showToast('Gagal membaca file dari penyimpanan perangkat.', 'error');
  };
  reader.readAsDataURL(file);
}

function toggleLayerOrder(forcePhotoTop) {
  if (forcePhotoTop !== undefined) {
    isPhotoOnTop = forcePhotoTop;
  } else {
    isPhotoOnTop = !isPhotoOnTop;
  }

  const textEl = document.getElementById('layer-order-text');
  const noticeBtn = document.getElementById('btn-notice-layer');
  const label = isPhotoOnTop ? 'Foto di Depan' : 'Bingkai di Depan';
  if (textEl) textEl.textContent = isPhotoOnTop ? 'Foto Depan' : 'Bingkai Depan';
  if (noticeBtn) noticeBtn.textContent = label;

  renderCanvas();
  showToast(`Posisi lapisan: ${label}`, 'info');
}

function cycleCutoutShape() {
  if (frameCutoutShape === 'none') {
    frameCutoutShape = 'circle';
    isPhotoOnTop = false; // When cutout hole is active, photo shows through cutout
  } else if (frameCutoutShape === 'circle') {
    frameCutoutShape = 'rect';
    isPhotoOnTop = false;
  } else {
    frameCutoutShape = 'none';
    if (isFrameOpaque) isPhotoOnTop = true;
  }

  const textEl = document.getElementById('cutout-shape-text');
  const noticeBtn = document.getElementById('btn-notice-cutout');
  const labels = { none: 'Tanpa Lubang', circle: 'Lubang Bulat', rect: 'Lubang Kotak' };
  const currentLabel = labels[frameCutoutShape] || 'Lubang';
  if (textEl) textEl.textContent = currentLabel;
  if (noticeBtn) noticeBtn.textContent = currentLabel;

  renderCanvas();
  showToast(`Lubang bingkai: ${currentLabel}`, 'info');
}

function updatePhotoDetectionUI(isDetected, imgSrc) {
  const thumb = document.getElementById('detected-photo-thumb');
  const placeholderSvg = document.getElementById('detection-placeholder-svg');
  const title = document.getElementById('detection-title');
  const badge = document.getElementById('detection-badge-pill');
  const desc = document.getElementById('detection-desc');
  const btnText = document.getElementById('btn-detect-action-text');

  if (isDetected) {
    if (thumb && imgSrc) {
      thumb.src = imgSrc;
      thumb.classList.remove('hidden');
    }
    if (placeholderSvg) placeholderSvg.classList.add('hidden');
    if (title) title.textContent = 'Foto Terdeteksi ✓';
    if (badge) {
      badge.className = 'detection-badge-pill verified';
      badge.textContent = 'Aktif';
    }
    if (desc) desc.textContent = 'Foto siap disesuaikan (geser & zoom)';
    if (btnText) btnText.textContent = 'Ganti';
  } else {
    if (thumb) {
      thumb.src = '';
      thumb.classList.add('hidden');
    }
    if (placeholderSvg) placeholderSvg.classList.remove('hidden');
    if (title) title.textContent = 'Foto Belum Terdeteksi';
    if (badge) {
      badge.className = 'detection-badge-pill unverified';
      badge.textContent = 'Belum Ada';
    }
    if (desc) desc.textContent = 'Klik tombol untuk memilih fotomu dari galeri';
    if (btnText) btnText.textContent = 'Pilih Foto';
  }
}

function loadSamplePhoto(url, isSilent = false) {
  const loader = document.getElementById('canvas-loader');
  if (loader && !isSilent) loader.classList.remove('hidden');

  const img = new Image();
  // Safe CORS handling: only set anonymous for foreign http(s) origins to avoid local CORS blocks & data: URL blocks
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    try {
      const parsed = new URL(url);
      if (parsed.origin !== window.location.origin) {
        img.crossOrigin = 'anonymous';
      }
    } catch (e) {}
  }

  img.onload = () => {
    if (loader) loader.classList.add('hidden');
    userImg = img;
    
    const emptyState = document.getElementById('canvas-empty-state');
    if (emptyState) emptyState.classList.add('hidden');
    const downloadBtn = document.getElementById('btn-download-action');
    if (downloadBtn) downloadBtn.removeAttribute('disabled');

    updatePhotoDetectionUI(true, url);
    if (isFrameOpaque) {
      isPhotoOnTop = true;
    }
    fitPhotoToCenter();
    renderCanvas();
    if (!isSilent) {
      showGestureHint();
      showToast('Contoh foto berhasil dipasang! Kamu juga bisa memilih foto sendiri.', 'success');
    }
  };
  img.onerror = () => {
    if (loader) loader.classList.add('hidden');
    if (!isSilent) showToast('Gagal memuat contoh foto.', 'error');
  };
  img.src = url;
}

// Global cache for last exported composite
let lastExportedBlob = null;
let lastExportedFile = null;
let lastExportedDataUrl = null;

// ================= EXPORT & DOWNLOAD 1080P FHD =================
function downloadTwibbonComposite() {
  if (!userImg || !canvas) {
    showToast('Pilih foto terlebih dahulu sebelum mengunduh.', 'error');
    return;
  }

  const downloadBtn = document.getElementById('btn-download-action');
  const btnText = document.getElementById('btn-download-text');
  downloadBtn.setAttribute('disabled', 'true');
  btnText.textContent = 'Mengekspor FHD 1080p...';

  // Perform full render to ensure clean composite
  renderCanvas();

  setTimeout(() => {
    canvas.toBlob((blob) => {
      if (!blob) {
        showToast('Gagal memproses gambar.', 'error');
        downloadBtn.removeAttribute('disabled');
        btnText.textContent = 'Unduh Twibbon (FHD 1080p)';
        return;
      }

      // Trigger instant browser download
      const slug = activeCampaign ? activeCampaign.slug : 'twibbon';
      const fileName = `twibbon-${slug}-FHD1080p.jpg`;
      const blobUrl = URL.createObjectURL(blob);

      // Cache for social media sharing
      lastExportedBlob = blob;
      lastExportedFile = new File([blob], fileName, { type: 'image/jpeg' });
      try {
        lastExportedDataUrl = canvas.toDataURL('image/jpeg', CONFIG.EXPORT_QUALITY || 0.96);
      } catch (e) {
        lastExportedDataUrl = blobUrl;
      }

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      // Increment Supporter Counter locally & via API
      incrementDownloadCount(slug);

      downloadBtn.removeAttribute('disabled');
      btnText.textContent = 'Unduh Twibbon (FHD 1080p)';
      showToast('Twibbon Full HD (1080×1080) berhasil diunduh ke galeri!', 'success');

      // Update thumbnail preview in success modal
      const successThumb = document.getElementById('success-twibbon-thumb');
      if (successThumb) {
        successThumb.src = lastExportedDataUrl;
      }

      // Seamlessly open share dialog post-download
      setTimeout(() => {
        openDownloadSuccessModal();
      }, 300);
    }, 'image/jpeg', CONFIG.EXPORT_QUALITY || 0.96);
  }, 200);
}

// ================= DOWNLOAD SUCCESS MODAL LIFECYCLE =================
function openDownloadSuccessModal() {
  const modal = document.getElementById('download-success-modal');
  if (!modal || !activeCampaign) return;

  const titleEl = document.getElementById('success-caption-title');
  if (titleEl) {
    titleEl.textContent = activeCampaign.title || 'Caption & Tagar';
  }

  const captionEl = document.getElementById('success-caption-text');
  if (captionEl) {
    captionEl.textContent = activeCampaign.description || `Twibbon resmi ${activeCampaign.title}. Pasang foto dan dukung sekarang!`;
  }

  const tagsRow = document.getElementById('success-hashtags-row');
  if (tagsRow) {
    const tags = activeCampaign.hashtags || [`#${activeCampaign.slug.replace(/-/g, '')}`];
    tagsRow.innerHTML = tags.map(t => `<span class="caption-hashtag-pill">${t}</span>`).join('');
  }

  const thumb = document.getElementById('success-twibbon-thumb');
  if (thumb && lastExportedDataUrl) {
    thumb.src = lastExportedDataUrl;
  }

  modal.classList.remove('hidden');
}

function closeDownloadSuccessModal() {
  const modal = document.getElementById('download-success-modal');
  if (modal) modal.classList.add('hidden');
}

// ================= MULTI-CHANNEL SOCIAL MEDIA SHARING =================
async function shareTwibbonToNativeOrSocial(platform = 'all') {
  if (!activeCampaign) return;

  const title = activeCampaign.title;
  const desc = activeCampaign.description || activeCampaign.title;
  const tagsStr = (activeCampaign.hashtags || []).join(' ');
  const link = `${window.location.origin}${window.location.pathname}?c=${activeCampaign.slug}`;
  const shareText = `*${title}*\n${desc}\n\n${tagsStr}\n\nPasang Twibbonmu di sini:\n${link}`;

  // 1. Mobile Web Share API with actual FHD image file
  if ((platform === 'native' || platform === 'all') && navigator.canShare && lastExportedFile && navigator.canShare({ files: [lastExportedFile] })) {
    try {
      await navigator.share({
        files: [lastExportedFile],
        title: title,
        text: shareText
      });
      showToast('Twibbon FHD berhasil dibagikan!', 'success');
      return;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Native share error, falling back to direct channels:', err);
      } else {
        return; // User cancelled native share sheet
      }
    }
  }

  // 2. Platform-specific fallbacks
  if (platform === 'whatsapp' || platform === 'all') {
    navigator.clipboard?.writeText?.(shareText).catch(() => {});
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
    showToast('Teks caption telah disalin! Kirim foto FHD dari galerimu ke WhatsApp.', 'info');
  } else if (platform === 'instagram') {
    navigator.clipboard?.writeText?.(shareText).catch(() => {});
    showToast('📸 Foto FHD tersimpan di galeri & caption telah disalin! Buka Instagram untuk posting Story/Feed.', 'success');
  } else if (platform === 'telegram') {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
    window.open(tgUrl, '_blank');
  } else if (platform === 'facebook') {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank');
  } else if (platform === 'twitter') {
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}&hashtags=${encodeURIComponent((activeCampaign.hashtags || []).map(t => t.replace(/^#/, '')).join(','))}`;
    window.open(twUrl, '_blank');
  }
}

function incrementDownloadCount(slug) {
  // 1. Local update
  const campaign = currentCampaigns.find(c => c.slug === slug);
  if (campaign) {
    campaign.downloads = (campaign.downloads || 0) + 1;
    renderCampaignCards(currentCampaigns);
  }

  // 2. Google Apps Script background ping (PRD architecture)
  if (CONFIG.GAS_API_URL) {
    fetch(`${CONFIG.GAS_API_URL}?action=incrementDownload&slug=${encodeURIComponent(slug)}`, {
      method: 'POST',
      mode: 'no-cors'
    }).catch(err => console.log('Async increment count error:', err));
  }
}

// ================= BUAT KAMPANYE BARU (CREATOR STUDIO & SOCIAL MEDIA PREVIEW) =================
let uploadedFrameBase64 = null;
let creatorLoadedFrameImg = null;
let creatorTesterImg = null;
let creatorTesterSrc = 'assets/user_santri.jpg';
let creatorFrameScale = 1.0;
let creatorCutoutShape = 'auto'; // 'auto' | 'circle' | 'rounded' | 'rect'
let creatorMockupMode = 'square'; // 'square' | 'story'
let creatorFrameStats = { width: 0, height: 0, fileSizeKb: 0, hasTransparent: false };
let currentCreatorMobileStep = 1;

function setCreatorMobileStep(step) {
  currentCreatorMobileStep = step;
  const colLeft = document.querySelector('.creator-studio-col-left');
  const colRight = document.querySelector('.creator-studio-col-right');
  const tab1 = document.getElementById('btn-creator-step-1');
  const tab2 = document.getElementById('btn-creator-step-2');
  const modalBody = document.querySelector('.create-modal-card .compact-modal-body');

  if (tab1) tab1.classList.toggle('active', step === 1);
  if (tab2) tab2.classList.toggle('active', step === 2);

  if (window.innerWidth <= 768) {
    if (colLeft) colLeft.style.display = step === 1 ? 'block' : 'none';
    if (colRight) colRight.style.display = step === 2 ? 'block' : 'none';
  } else {
    if (colLeft) colLeft.style.display = 'block';
    if (colRight) colRight.style.display = 'block';
  }

  if (modalBody) {
    modalBody.scrollTop = 0;
  }
}

window.addEventListener('resize', () => {
  const colLeft = document.querySelector('.creator-studio-col-left');
  const colRight = document.querySelector('.creator-studio-col-right');
  if (window.innerWidth > 768) {
    if (colLeft) colLeft.style.display = 'block';
    if (colRight) colRight.style.display = 'block';
  } else {
    setCreatorMobileStep(currentCreatorMobileStep);
  }
});

function openCreateModal() {
  if (!requireAuth(() => openCreateModal(), 'membuat twibbon baru')) return;
  document.getElementById('create-modal').classList.remove('hidden');
  setCreatorMobileStep(1);

  // Pre-load default tester photo for instant live preview
  if (!creatorTesterImg) {
    loadCreatorTesterImage(creatorTesterSrc, () => {
      renderCreatorStudioPreview();
    });
  } else {
    renderCreatorStudioPreview();
  }
}

function closeCreateModal() {
  document.getElementById('create-modal').classList.add('hidden');
  resetCreateForm();
}

function resetCreateForm() {
  document.getElementById('create-campaign-form').reset();
  uploadedFrameBase64 = null;
  creatorLoadedFrameImg = null;
  creatorFrameScale = 1.0;
  creatorCutoutShape = 'auto';
  creatorMockupMode = 'square';
  document.getElementById('dropzone-preview')?.classList.add('hidden');
  document.getElementById('dropzone-prompt')?.classList.remove('hidden');
  document.getElementById('creator-adjust-box')?.classList.add('hidden');
  
  const slider = document.getElementById('creator-scale-slider');
  if (slider) slider.value = 100;
  const valLabel = document.getElementById('creator-scale-val');
  if (valLabel) valLabel.textContent = '100%';

  document.querySelectorAll('.cutout-shape-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.shape === 'auto');
  });

  switchMockupView('square');
}

function handleFrameFileSelect(input) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > 4.5 * 1024 * 1024) {
    showToast('Ukuran file maksimal 4.5 MB.', 'error');
    input.value = '';
    return;
  }

  creatorFrameStats.fileSizeKb = Math.round(file.size / 1024);

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedFrameBase64 = e.target.result;
    
    const previewImg = document.getElementById('frame-preview-img');
    if (previewImg) previewImg.src = uploadedFrameBase64;
    document.getElementById('dropzone-prompt')?.classList.add('hidden');
    document.getElementById('dropzone-preview')?.classList.remove('hidden');

    // Create Image Object for live preview canvas
    const img = new Image();
    img.onload = () => {
      creatorLoadedFrameImg = img;
      creatorFrameStats.width = img.naturalWidth;
      creatorFrameStats.height = img.naturalHeight;

      // Reveal Studio Adjuster
      const adjustBox = document.getElementById('creator-adjust-box');
      if (adjustBox) adjustBox.classList.remove('hidden');

      // Update story preview handle
      const authorField = document.getElementById('new-campaign-creator');
      const storyAuthor = document.getElementById('story-handle-preview');
      if (storyAuthor && authorField && authorField.value) {
        storyAuthor.textContent = `@${authorField.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()}`;
      }

      // Check transparency & update stats
      checkImageTransparency(uploadedFrameBase64);

      // Render Live Canvas Preview
      if (!creatorTesterImg) {
        loadCreatorTesterImage(creatorTesterSrc, () => renderCreatorStudioPreview());
      } else {
        renderCreatorStudioPreview();
      }
    };
    img.src = uploadedFrameBase64;
  };
  reader.readAsDataURL(file);
}

function loadCreatorTesterImage(src, callback) {
  const img = new Image();
  // Safe CORS handling: only set anonymous for external origins
  if (typeof src === 'string') {
    try {
      const parsed = new URL(src, window.location.href);
      if (parsed.origin !== window.location.origin) {
        img.crossOrigin = 'anonymous';
      }
    } catch (e) {}
  }
  img.onload = () => {
    creatorTesterImg = img;
    if (callback) callback();
    renderCreatorStudioPreview();
  };
  img.onerror = () => {
    console.warn('Could not load tester photo:', src);
    if (callback) callback();
    renderCreatorStudioPreview();
  };
  img.src = src;
}

function checkImageTransparency(base64) {
  const statusEl = document.getElementById('transparency-status');
  const transBadge = document.getElementById('spec-trans-badge');
  const dimBadge = document.getElementById('spec-dim-badge');
  const sizeBadge = document.getElementById('spec-size-badge');

  if (dimBadge && creatorFrameStats.width) {
    const isSquare = Math.abs(creatorFrameStats.width - creatorFrameStats.height) < 10;
    dimBadge.textContent = `📐 ${creatorFrameStats.width}×${creatorFrameStats.height}px ${isSquare ? '(1:1 Sempurna)' : '(Auto-Fit 1:1)'}`;
  }
  if (sizeBadge && creatorFrameStats.fileSizeKb) {
    sizeBadge.textContent = `⚡ ${creatorFrameStats.fileSizeKb} KB`;
  }

  if (statusEl) {
    statusEl.className = 'transparency-status';
    statusEl.querySelector('.status-text').textContent = 'Memeriksa transparansi...';
  }

  const testImg = new Image();
  testImg.onload = () => {
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 100;
    testCanvas.height = 100;
    const testCtx = testCanvas.getContext('2d');
    testCtx.drawImage(testImg, 0, 0, 100, 100);

    const imgData = testCtx.getImageData(0, 0, 100, 100).data;
    let transparentPixels = 0;
    const totalPixels = 100 * 100;
    for (let i = 3; i < imgData.length; i += 4) {
      if (imgData[i] < 240) {
        transparentPixels++;
      }
    }

    const transPercent = Math.round((transparentPixels / totalPixels) * 100);

    if (transPercent > 5) {
      if (statusEl) {
        statusEl.className = 'transparency-status valid';
        statusEl.querySelector('.status-text').textContent = `Transparan Valid (${transPercent}% area foto)`;
      }
      if (transBadge) {
        transBadge.className = 'spec-badge valid';
        transBadge.textContent = `✓ Transparan (${transPercent}%)`;
      }
    } else {
      if (statusEl) {
        statusEl.className = 'transparency-status invalid';
        statusEl.querySelector('.status-text').textContent = 'Bingkai padat (Tanpa lubang)';
      }
      if (transBadge) {
        transBadge.className = 'spec-badge warning';
        transBadge.textContent = '⚠️ Belum Ada Lubang (Pilih Bentuk Lubang)';
      }
      // Auto-suggest circular cutout if frame has no transparent hole!
      if (creatorCutoutShape === 'auto') {
        setCreatorCutoutShape('circle');
      }
    }
  };
  testImg.src = base64;
}

function renderCreatorStudioPreview() {
  const canvas = document.getElementById('creator-preview-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  if (creatorMockupMode === 'story') {
    // 9:16 Story / Status WA Mockup View
    // 1. Draw blurred ambient background from frame or tester
    if (creatorLoadedFrameImg || creatorTesterImg) {
      ctx.save();
      ctx.filter = 'blur(16px) brightness(0.6)';
      const bgImg = creatorLoadedFrameImg || creatorTesterImg;
      const bgScale = Math.max(w / bgImg.width, h / bgImg.height);
      const bgW = bgImg.width * bgScale;
      const bgH = bgImg.height * bgScale;
      ctx.drawImage(bgImg, (w - bgW) / 2, (h - bgH) / 2, bgW, bgH);
      ctx.restore();
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
    }

    // 2. In center: 1:1 Twibbon frame box
    const boxSize = Math.round(w * 0.86);
    const boxX = Math.round((w - boxSize) / 2);
    const boxY = Math.round((h - boxSize) / 2) - 15;

    // Outer subtle shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#000000';
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
    ctx.restore();

    // Composite inside box
    ctx.save();
    ctx.beginPath();
    ctx.rect(boxX, boxY, boxSize, boxSize);
    ctx.clip();
    renderCompositeInsideBox(ctx, boxX, boxY, boxSize, boxSize);
    ctx.restore();

    // 3. Instagram Story UI Overlay
    ctx.save();
    // Top Progress line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(boxX, 20, boxSize, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boxX, 20, boxSize * 0.72, 3);

    // Profile pill
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Poppins, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 5;
    const authorVal = document.getElementById('new-campaign-creator')?.value || 'fthstudio.id';
    const cleanAuthor = '@' + (authorVal.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'panitia');
    ctx.fillText(cleanAuthor, boxX + 28, 45);

    // Bottom Reply Bar Mockup
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, h - 54, boxSize, 36, 18);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '13px Poppins, sans-serif';
    ctx.fillText('Kirim pesan...', boxX + 16, h - 31);
    ctx.restore();

  } else {
    // 1:1 Square Feed Instagram / Twibbon View
    renderCompositeInsideBox(ctx, 0, 0, w, h);
  }
}

function renderCompositeInsideBox(ctx, x, y, size, sizeH) {
  // 1. Draw Tester Supporter Photo Underneath
  if (creatorTesterImg) {
    ctx.save();

    // Cutout Shape Clipping if not 'auto'
    if (creatorCutoutShape === 'circle') {
      ctx.beginPath();
      ctx.arc(x + size / 2, y + sizeH / 2, size * 0.38, 0, Math.PI * 2);
      ctx.clip();
    } else if (creatorCutoutShape === 'rounded') {
      ctx.beginPath();
      ctx.roundRect(x + size * 0.12, y + sizeH * 0.12, size * 0.76, sizeH * 0.76, size * 0.12);
      ctx.clip();
    } else if (creatorCutoutShape === 'rect') {
      ctx.beginPath();
      ctx.rect(x + size * 0.12, y + sizeH * 0.12, size * 0.76, sizeH * 0.76);
      ctx.clip();
    }

    // Scale and center tester image
    const imgRatio = creatorTesterImg.width / creatorTesterImg.height;
    let dw, dh, dx, dy;
    if (imgRatio > 1) {
      dh = sizeH;
      dw = sizeH * imgRatio;
      dx = x + (size - dw) / 2;
      dy = y;
    } else {
      dw = size;
      dh = size / imgRatio;
      dx = x;
      dy = y + (sizeH - dh) / 2;
    }
    ctx.drawImage(creatorTesterImg, dx, dy, dw, dh);
    ctx.restore();
  } else {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x, y, size, sizeH);
  }

  // 2. Draw Uploaded Frame on top with scale
  if (creatorLoadedFrameImg) {
    ctx.save();
    const frameW = size * creatorFrameScale;
    const frameH = sizeH * creatorFrameScale;
    const frameX = x + (size - frameW) / 2;
    const frameY = y + (sizeH - frameH) / 2;

    ctx.drawImage(creatorLoadedFrameImg, frameX, frameY, frameW, frameH);
    ctx.restore();
  }
}

function switchMockupView(mode) {
  creatorMockupMode = mode;
  const btnSquare = document.getElementById('mockup-tab-square');
  const btnStory = document.getElementById('mockup-tab-story');
  const card = document.getElementById('creator-canvas-card');
  const tag = document.getElementById('preview-mode-tag');
  const canvas = document.getElementById('creator-preview-canvas');

  if (mode === 'story') {
    btnSquare?.classList.remove('active');
    btnStory?.classList.add('active');
    card?.classList.add('story-mode');
    if (tag) tag.textContent = 'Story / Status 9:16';
    if (canvas) {
      canvas.width = 450;
      canvas.height = 800;
    }
  } else {
    btnSquare?.classList.add('active');
    btnStory?.classList.remove('active');
    card?.classList.remove('story-mode');
    if (tag) tag.textContent = 'Feed IG 1:1';
    if (canvas) {
      canvas.width = 600;
      canvas.height = 600;
    }
  }

  renderCreatorStudioPreview();
}

function setCreatorTesterPhoto(src, btnEl) {
  creatorTesterSrc = src;
  document.querySelectorAll('.tester-pill').forEach(p => p.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  loadCreatorTesterImage(src, () => renderCreatorStudioPreview());
}

function handleCreatorCustomTesterPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.querySelectorAll('.tester-pill').forEach(p => p.classList.remove('active'));
    input.closest('.tester-pill')?.classList.add('active');
    loadCreatorTesterImage(e.target.result, () => renderCreatorStudioPreview());
  };
  reader.readAsDataURL(file);
}

function updateCreatorFrameScale(val) {
  creatorFrameScale = parseFloat(val) / 100;
  const label = document.getElementById('creator-scale-val');
  if (label) label.textContent = Math.round(val) + '%';
  renderCreatorStudioPreview();
}

function stepCreatorScale(delta) {
  const slider = document.getElementById('creator-scale-slider');
  if (!slider) return;
  let curr = parseInt(slider.value, 10) || 100;
  curr = Math.max(60, Math.min(140, curr + delta));
  slider.value = curr;
  updateCreatorFrameScale(curr);
}

function setCreatorCutoutShape(shape) {
  creatorCutoutShape = shape;
  document.querySelectorAll('.cutout-shape-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.shape === shape);
  });
  renderCreatorStudioPreview();
}

function resetCreatorAdjustments() {
  creatorFrameScale = 1.0;
  creatorCutoutShape = 'auto';
  const slider = document.getElementById('creator-scale-slider');
  if (slider) slider.value = 100;
  const valLabel = document.getElementById('creator-scale-val');
  if (valLabel) valLabel.textContent = '100%';
  document.querySelectorAll('.cutout-shape-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.shape === 'auto');
  });
  renderCreatorStudioPreview();
}

function getProcessedCreatorFramePng() {
  return new Promise((resolve) => {
    if (!creatorLoadedFrameImg) {
      resolve(uploadedFrameBase64);
      return;
    }

    // Export high-res 1080x1080 canvas preserving transparency
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1080;
    exportCanvas.height = 1080;
    const expCtx = exportCanvas.getContext('2d');

    const size = 1080;
    const frameW = size * creatorFrameScale;
    const frameH = size * creatorFrameScale;
    const frameX = (size - frameW) / 2;
    const frameY = (size - frameH) / 2;

    expCtx.drawImage(creatorLoadedFrameImg, frameX, frameY, frameW, frameH);

    // If cutout shape is not 'auto', punch transparent hole into frame
    if (creatorCutoutShape !== 'auto') {
      expCtx.globalCompositeOperation = 'destination-out';
      if (creatorCutoutShape === 'circle') {
        expCtx.beginPath();
        expCtx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
        expCtx.fill();
      } else if (creatorCutoutShape === 'rounded') {
        expCtx.beginPath();
        if (expCtx.roundRect) {
          expCtx.roundRect(size * 0.12, size * 0.12, size * 0.76, size * 0.76, size * 0.12);
        } else {
          expCtx.rect(size * 0.12, size * 0.12, size * 0.76, size * 0.76);
        }
        expCtx.fill();
      } else if (creatorCutoutShape === 'rect') {
        expCtx.beginPath();
        expCtx.rect(size * 0.12, size * 0.12, size * 0.76, size * 0.76);
        expCtx.fill();
      }
      expCtx.globalCompositeOperation = 'source-over';
    }

    resolve(exportCanvas.toDataURL('image/png'));
  });
}

// ================= CUSTOM IN-MODAL CATEGORY SELECT =================
function toggleCategoryDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('cat-options-menu');
  const chevron = document.getElementById('cat-chevron');
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    menu.classList.remove('hidden');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  } else {
    menu.classList.add('hidden');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
}

function chooseCategoryOption(val, label, el) {
  const hiddenInput = document.getElementById('new-campaign-cat');
  const labelEl = document.getElementById('cat-val-label');
  const menu = document.getElementById('cat-options-menu');
  const chevron = document.getElementById('cat-chevron');
  
  if (hiddenInput) hiddenInput.value = val;
  if (labelEl) labelEl.textContent = label;

  const iconEl = document.getElementById('cat-val-icon');
  if (iconEl && el) {
    const optSvg = el.querySelector('.option-icon');
    if (optSvg) iconEl.innerHTML = optSvg.innerHTML;
  }

  const allItems = document.querySelectorAll('.select-option-item');
  allItems.forEach(item => item.classList.remove('selected'));
  if (el) el.classList.add('selected');

  if (menu) menu.classList.add('hidden');
  if (chevron) chevron.style.transform = 'rotate(0deg)';
}

function handleCreateCampaign(e) {
  e.preventDefault();

  if (!uploadedFrameBase64) {
    showToast('Pilih file bingkai PNG terlebih dahulu!', 'error');
    return;
  }

  const title = document.getElementById('new-campaign-title').value.trim();
  const slug = document.getElementById('new-campaign-slug').value.trim().toLowerCase();
  const category = document.getElementById('new-campaign-cat').value;
  const creator = document.getElementById('new-campaign-creator').value.trim();
  const desc = document.getElementById('new-campaign-desc').value.trim();
  const rawTags = document.getElementById('new-campaign-tags')?.value.trim() || '';
  const chosenAccountId = document.getElementById('new-campaign-account')?.value || activeAccountId;

  // Validate slug uniqueness
  if (currentCampaigns.some(c => c.slug === slug)) {
    showToast(`Slug "${slug}" sudah digunakan. Buat slug yang berbeda.`, 'error');
    return;
  }

  // Account Attribution
  const matchedAcc = accounts.find(a => a.id === chosenAccountId) || getActiveAccount();

  // Parse hashtags
  let parsedTags = [];
  if (rawTags) {
    parsedTags = rawTags.split(/[\s,]+/)
      .map(t => t.trim().replace(/^#*/, '#'))
      .filter(t => t.length > 1);
  }
  if (parsedTags.length === 0) {
    const cleanWord = title.replace(/[^a-zA-Z0-9]/g, '');
    parsedTags = [`#${cleanWord || 'TwibbonFTH'}`];
  }

  const categoryLabels = {
    pesantren: 'Milad & Pesantren',
    nasional: 'Hari Besar Nasional',
    pendidikan: 'Pendidikan & Wisuda',
    organisasi: 'Organisasi & Komunitas',
    lomba: 'Olimpiade & Lomba'
  };

  const submitBtn = document.getElementById('btn-submit-campaign');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Memproses &amp; Merilis...</span>';
  }

  getProcessedCreatorFramePng().then((finalFrameUrl) => {
    const newCampaign = {
      id: 'cmp-' + Date.now(),
      slug: slug,
      title: title,
      creator: creator || matchedAcc.name,
      creatorId: matchedAcc.id,
      creatorHandle: matchedAcc.handle,
      creatorVerified: matchedAcc.verified || false,
      category: category,
      categoryLabel: categoryLabels[category] || 'Twibbon',
      hashtags: parsedTags,
      description: desc || `Twibbon resmi ${title} oleh ${creator || matchedAcc.name}. Pasang foto dan dukung sekarang!`,
      frameUrl: finalFrameUrl,
      frameType: 'png',
      sampleUserPhoto: creatorTesterSrc || 'assets/user_santri.jpg',
      downloads: 1,
      created_at: new Date().toISOString()
    };

    // Save to LocalStorage with safe quota protection
    try {
      const localSaved = localStorage.getItem('fth_custom_campaigns');
      let customCampaigns = localSaved ? JSON.parse(localSaved) : [];
      if (customCampaigns.length > 5) {
        customCampaigns = customCampaigns.slice(0, 5);
      }
      customCampaigns.unshift(newCampaign);
      localStorage.setItem('fth_custom_campaigns', JSON.stringify(customCampaigns));
    } catch (quotaErr) {
      console.warn('LocalStorage quota limit reached, maintaining in memory:', quotaErr);
    }

    // Prepend to current list
    currentCampaigns.unshift(newCampaign);
    renderCampaignCards(currentCampaigns);
    renderTrendingHashtags();
    updateMyCampaignsCount();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="btn-submit-svg">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <span>Terbitkan Kampanye</span>
      `;
    }

    closeCreateModal();
    showToast(`🎉 Kampanye "${title}" berhasil diterbitkan dan siap dibagikan ke media sosial!`, 'success');

    // Open the newly created campaign immediately in editor
    setTimeout(() => {
      openTwibbonEditor(slug);
    }, 400);
  });
}

// ================= REMOVE BACKGROUND (AI SIMULATOR) =================
let processedCutoutBase64 = null;

function openBgRemoverModal() {
  if (!requireAuth(() => openBgRemoverModal(), 'menggunakan fitur Hapus Background AI')) return;
  document.getElementById('bg-remover-modal').classList.remove('hidden');
}

function closeBgRemoverModal() {
  document.getElementById('bg-remover-modal').classList.add('hidden');
  document.getElementById('bg-preview-stage').classList.add('hidden');
  processedCutoutBase64 = null;
}

function processBgRemoval(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawImg = new Image();
    rawImg.onload = () => {
      // Simulate client-side portrait mask cutout using edge detection & center subject priority
      const c = document.createElement('canvas');
      c.width = rawImg.width;
      c.height = rawImg.height;
      const ctx2 = c.getContext('2d');
      ctx2.drawImage(rawImg, 0, 0);

      const imgData = ctx2.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;

      // Sample border color (corner) as background reference
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const cx = c.width / 2;
      const cy = c.height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      for (let i = 0; i < data.length; i += 4) {
        const px = (i / 4) % c.width;
        const py = Math.floor((i / 4) / c.width);

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Color difference from background sample
        const colorDiff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
        const distFromCenter = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
        const centerFactor = 1 - (distFromCenter / maxDist);

        if (colorDiff < 75 && centerFactor < 0.6) {
          data[i + 3] = 0; // Make transparent
        }
      }

      ctx2.putImageData(imgData, 0, 0);
      processedCutoutBase64 = c.toDataURL('image/png');

      document.getElementById('bg-result-img').src = processedCutoutBase64;
      document.getElementById('bg-preview-stage').classList.remove('hidden');
      showToast('Latar belakang berhasil diolah!', 'success');
    };
    rawImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function useCutoutInEditor() {
  if (!processedCutoutBase64) return;
  closeBgRemoverModal();

  // If no editor is active, open default campaign
  if (!activeCampaign) {
    openTwibbonEditor(CONFIG.DEFAULT_SLUG);
  }

  const img = new Image();
  img.onload = () => {
    userImg = img;
    document.getElementById('canvas-empty-state').classList.add('hidden');
    document.getElementById('btn-download-action').removeAttribute('disabled');
    fitPhotoToCenter();
    renderCanvas();
    showToast('Foto cutout berhasil dipasang ke frame!', 'success');
  };
  img.src = processedCutoutBase64;
}

// ================= EXPLORE / SEARCH MODAL & CHIPS =================
function openExploreModal() {
  document.getElementById('explore-modal').classList.remove('hidden');
  const input = document.getElementById('modal-search-field');
  input.value = '';
  input.focus();
  populateExploreResults('');
}

function closeExploreModal() {
  document.getElementById('explore-modal').classList.add('hidden');
}

function searchTag(tagText) {
  const input = document.getElementById('modal-search-field');
  input.value = tagText;
  populateExploreResults(tagText);
}

function populateExploreResults(query) {
  const list = document.getElementById('explore-results-list');
  const q = query.toLowerCase().trim();

  const filtered = currentCampaigns.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.creator.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.slug.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<p style="padding: 16px; text-align: center; color: var(--text-muted);">Tidak ada kampanye ditemukan.</p>`;
    return;
  }

  list.innerHTML = filtered.map(c => `
    <div class="explore-result-item" onclick="closeExploreModal(); openTwibbonEditor('${c.slug}');">
      <img src="${c.frameUrl}" alt="${c.title}" class="explore-thumb">
      <div class="explore-item-info">
        <h5 class="explore-item-title">${c.title}</h5>
        <span class="explore-item-supporters">Oleh ${c.creator} • ${formatNumber(c.downloads)} pendukung</span>
      </div>
      <button class="btn-sub-action" style="padding: 6px 12px; font-size: 11px;">Gunakan</button>
    </div>
  `).join('');
}

// ================= QUICK MENU POPUP =================
function toggleMenuPopup() {
  const popup = document.getElementById('menu-popup');
  popup.classList.toggle('hidden');
}

// Close menu popup when clicking outside
document.addEventListener('click', (e) => {
  const popup = document.getElementById('menu-popup');
  const btn = document.getElementById('menu-grid-btn');
  if (popup && !popup.classList.contains('hidden')) {
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.classList.add('hidden');
    }
  }
});

// ================= SHARING & TOAST HELPERS =================
function copyCurrentCampaignLink() {
  if (!activeCampaign) return;
  const link = `${window.location.origin}${window.location.pathname}?c=${activeCampaign.slug}`;
  navigator.clipboard.writeText(link).then(() => {
    showToast('Tautan kampanye berhasil disalin ke papan klip!', 'success');
  }).catch(() => {
    prompt('Salin tautan kampanye di bawah ini:', link);
  });
}

function shareCampaignLink(slug, event) {
  if (event) event.stopPropagation();
  const link = `${window.location.origin}${window.location.pathname}?c=${slug}`;
  navigator.clipboard.writeText(link).then(() => {
    showToast('Tautan kampanye berhasil disalin!', 'success');
  }).catch(() => {
    prompt('Salin tautan kampanye:', link);
  });
}

function shareCampaignToWhatsApp(slug, event) {
  if (event) event.stopPropagation();
  const targetCampaign = slug 
    ? (currentCampaigns.find(c => c.slug === slug) || activeCampaign)
    : activeCampaign;

  if (!targetCampaign) return;

  const title = targetCampaign.title;
  const desc = targetCampaign.description || '';
  const tags = (targetCampaign.hashtags || []).join(' ');
  const link = `${window.location.origin}${window.location.pathname}?c=${targetCampaign.slug}`;
  const message = `*${title}*\n${desc}\n\n${tags}\n\nPasang foto Twibbonmu di sini:\n${link}`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

function openWhatsAppContact(customMessage) {
  const text = customMessage || 'Halo Admin FTH Studio, saya ingin bertanya seputar layanan twibbon.';
  window.open(`https://wa.me/6285704332952?text=${encodeURIComponent(text)}`, '_blank');
}

function scrollToCampaigns() {
  const el = document.getElementById('campaigns-grid-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return num.toString();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconSvg = type === 'success' 
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : type === 'error'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Global click-away listener for dropdowns
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('category-select-wrapper');
  const menu = document.getElementById('cat-options-menu');
  const chevron = document.getElementById('cat-chevron');
  if (wrapper && !wrapper.contains(e.target) && menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
});

// ================= EVENT LISTENERS SETUP =================
function setupEventListeners() {
  // Global search input in navbar
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = currentCampaigns.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.creator.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
      );
      renderCampaignCards(filtered);
    });
  }

  // Modal search field
  const modalSearch = document.getElementById('modal-search-field');
  if (modalSearch) {
    modalSearch.addEventListener('input', (e) => {
      populateExploreResults(e.target.value);
    });
  }

  // Category chips
  const chips = document.querySelectorAll('.cat-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.category;
      if (cat === 'my-campaigns') {
        return; // filterByMyCampaigns() handles this directly
      }

      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Clear any specific creator / hashtag filter banner when switching category
      activeFilter = null;
      updateFilterBanner();

      if (cat === 'all') {
        renderCampaignCards(currentCampaigns);
      } else {
        const filtered = currentCampaigns.filter(c => c.category === cat);
        renderCampaignCards(filtered);
      }
    });
  });

  // User photo file input
  const photoInput = document.getElementById('user-photo-input');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleUserPhotoSelected(e.target.files[0]);
      }
    });
  }

  // Zoom range input
  const zoomSlider = document.getElementById('zoom-slider');
  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      setZoom(parseFloat(e.target.value));
    });
  }

  // Auto-generate slug from title in Create Modal
  const titleInput = document.getElementById('new-campaign-title');
  const slugInput = document.getElementById('new-campaign-slug');
  if (titleInput && slugInput) {
    titleInput.addEventListener('input', () => {
      if (!slugInput.dataset.manual) {
        slugInput.value = titleInput.value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    });
    slugInput.addEventListener('input', () => {
      slugInput.dataset.manual = 'true';
    });
  }

  // Auto-generate handle from name in Auth Register modal
  const regNameInput = document.getElementById('reg-name-input');
  const regHandleInput = document.getElementById('reg-handle-input');
  if (regNameInput && regHandleInput) {
    regNameInput.addEventListener('input', () => {
      if (!regHandleInput.dataset.manual) {
        regHandleInput.value = regNameInput.value
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, '')
          .slice(0, 18);
      }
    });
    regHandleInput.addEventListener('input', () => {
      regHandleInput.dataset.manual = 'true';
    });
  }

  // Discreet shortcut: Ctrl + Shift + A (or Alt + A) to open Admin Dashboard
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });
}
