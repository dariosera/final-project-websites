/* ============================================================
   ECCOMI — Main JavaScript
   ============================================================ */

// ============================================================
// DATA — Sample student profiles
// ============================================================
const STUDENTS = [
  {
    id: 1,
    name: "Marco Ferretti",
    age: 19,
    city: "Turin",
    avatar: "🌿",
    avatarBg: "#d4ead9",
    skills: ["Gardening", "Errands"],
    bio: "Passionate about plants and outdoor work. I have been helping neighbours with their gardens for two years. I'm reliable, careful with green spaces, and happy to do errands like grocery runs.",
    availability: "available",
    availLabel: "Available now",
    rating: 4.9,
    reviews: 12,
    schedule: {
      Mon: { morning: "Free", afternoon: "Free", evening: "Busy" },
      Tue: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Wed: { morning: "Free", afternoon: "Busy", evening: "Free" },
      Thu: { morning: "Free", afternoon: "Free", evening: "Free" },
      Fri: { morning: "Busy", afternoon: "Busy", evening: "Free" },
      Sat: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sun: { morning: "Free", afternoon: "Busy", evening: "Busy" },
    }
  },
  {
    id: 2,
    name: "Sofia Marchetti",
    age: 22,
    city: "Milan",
    avatar: "📚",
    avatarBg: "#fff3e0",
    skills: ["Tutoring", "Babysitting"],
    bio: "Third-year maths student at Bocconi. I tutor students aged 10–18 in maths, physics, and Italian. I also have experience with young children and I'm first-aid certified.",
    availability: "available",
    availLabel: "Available now",
    rating: 5.0,
    reviews: 21,
    schedule: {
      Mon: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Tue: { morning: "Busy", afternoon: "Busy", evening: "Free" },
      Wed: { morning: "Free", afternoon: "Free", evening: "Free" },
      Thu: { morning: "Busy", afternoon: "Free", evening: "Busy" },
      Fri: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sat: { morning: "Free", afternoon: "Free", evening: "Busy" },
      Sun: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
    }
  },
  {
    id: 3,
    name: "Luca De Santis",
    age: 17,
    city: "Rome",
    avatar: "💻",
    avatarBg: "#e3f2fd",
    skills: ["Tech Help"],
    bio: "I fix phones, computers, and tablets. I can help with software setup, Wi-Fi issues, and social media. Available afternoons and weekends — very patient with non-tech-savvy folks!",
    availability: "busy",
    availLabel: "Busy today",
    rating: 4.7,
    reviews: 8,
    schedule: {
      Mon: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Tue: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Wed: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Thu: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Fri: { morning: "Busy", afternoon: "Free", evening: "Busy" },
      Sat: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sun: { morning: "Free", afternoon: "Free", evening: "Busy" },
    }
  },
  {
    id: 4,
    name: "Elena Ricci",
    age: 20,
    city: "Turin",
    avatar: "🧹",
    avatarBg: "#fce4ec",
    skills: ["Cleaning", "Errands", "Pet Care"],
    bio: "Organised, thorough, and cheerful. I help with house cleaning, shopping runs, and pet-sitting. I have two cats of my own, so I'm great with animals of all kinds!",
    availability: "weekends",
    availLabel: "Weekends only",
    rating: 4.8,
    reviews: 15,
    schedule: {
      Mon: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Tue: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Wed: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Thu: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Fri: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Sat: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sun: { morning: "Free", afternoon: "Free", evening: "Free" },
    }
  },
  {
    id: 5,
    name: "Giulio Bianchi",
    age: 21,
    city: "Florence",
    avatar: "🍳",
    avatarBg: "#f3e5f5",
    skills: ["Cooking", "Errands"],
    bio: "Culinary school student who loves preparing healthy, home-cooked meals. I can prep and cook lunches or dinners for families or elderly individuals who need a hand in the kitchen.",
    availability: "weekdays",
    availLabel: "Weekdays",
    rating: 4.6,
    reviews: 6,
    schedule: {
      Mon: { morning: "Free", afternoon: "Free", evening: "Free" },
      Tue: { morning: "Free", afternoon: "Free", evening: "Free" },
      Wed: { morning: "Free", afternoon: "Free", evening: "Free" },
      Thu: { morning: "Free", afternoon: "Free", evening: "Free" },
      Fri: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sat: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
      Sun: { morning: "Busy", afternoon: "Busy", evening: "Busy" },
    }
  },
  {
    id: 6,
    name: "Chiara Conti",
    age: 16,
    city: "Turin",
    avatar: "🐾",
    avatarBg: "#e8f5e9",
    skills: ["Pet Care", "Babysitting"],
    bio: "Animal lover and responsible teenager. I walk dogs, feed cats, and can babysit kids aged 5 and up. I'm always on time and keep parents and pet owners updated.",
    availability: "available",
    availLabel: "Available now",
    rating: 4.9,
    reviews: 4,
    schedule: {
      Mon: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Tue: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Wed: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Thu: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Fri: { morning: "Busy", afternoon: "Free", evening: "Free" },
      Sat: { morning: "Free", afternoon: "Free", evening: "Free" },
      Sun: { morning: "Free", afternoon: "Free", evening: "Busy" },
    }
  }
];

// ============================================================
// STATE
// ============================================================
let currentUser = null; // { name, role, age, city, skills, bio, agenda }
let currentFilter = { cat: "", city: "", avail: "" };

// ============================================================
// NAVIGATION
// ============================================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (id === 'browse') renderStudents();
  if (id === 'dashboard') renderDashboard();
  closeMenuIfOpen();
}

function scrollToHow() {
  setTimeout(() => {
    document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 80);
}

function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}
function closeMenuIfOpen() {
  document.getElementById('navLinks').classList.remove('open');
}

// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ============================================================
// BROWSE & FILTER
// ============================================================
function renderStudents(list) {
  const grid = document.getElementById('studentsGrid');
  const source = list || filterStudents();
  if (!source.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;padding:32px 0;text-align:center;">No helpers found for these filters. Try broadening your search!</p>';
    return;
  }
  grid.innerHTML = source.map(s => `
    <div class="student-card" onclick="openProfile(${s.id})">
      <div class="sc-top">
        <div class="sc-avatar" style="background:${s.avatarBg}">${s.avatar}</div>
        <div>
          <div class="sc-name">${s.name}</div>
          <div class="sc-age">Age ${s.age} · ${s.city}</div>
        </div>
        <div class="sc-stars" style="margin-left:auto">★ ${s.rating}</div>
      </div>
      <div class="sc-tags">${s.skills.map(sk => `<span class="sc-tag">${sk}</span>`).join('')}</div>
      <div class="sc-city">📍 ${s.city}</div>
      <div class="sc-avail ${s.availability === 'available' ? 'avail-yes' : 'avail-no'}">${s.availLabel}</div>
    </div>
  `).join('');
}

function filterStudents() {
  return STUDENTS.filter(s => {
    const catOk = !currentFilter.cat || s.skills.includes(currentFilter.cat);
    const cityOk = !currentFilter.city || s.city.toLowerCase().includes(currentFilter.city.toLowerCase());
    const availOk = !currentFilter.avail || s.availability === currentFilter.avail;
    return catOk && cityOk && availOk;
  });
}

function applyFilters() {
  currentFilter.cat   = document.getElementById('filterCat').value;
  currentFilter.city  = document.getElementById('filterCity').value;
  currentFilter.avail = document.getElementById('filterAvail').value;
  renderStudents();
}

function filterCategory(cat) {
  currentFilter.cat = cat;
  const el = document.getElementById('filterCat');
  if (el) el.value = cat;
  renderStudents();
}

function resetFilters() {
  currentFilter = { cat: "", city: "", avail: "" };
  document.getElementById('filterCat').value = '';
  document.getElementById('filterCity').value = '';
  document.getElementById('filterAvail').value = '';
  renderStudents();
}

// ============================================================
// PROFILE PAGE
// ============================================================
function openProfile(id) {
  const s = STUDENTS.find(x => x.id === id);
  if (!s) return;
  const days = Object.keys(s.schedule);
  const slots = ['morning', 'afternoon', 'evening'];

  const scheduleRows = slots.map(slot => `
    <tr>
      <td><strong>${slot.charAt(0).toUpperCase() + slot.slice(1)}</strong></td>
      ${days.map(d => {
        const val = s.schedule[d][slot];
        return `<td class="${val === 'Free' ? 'slot-free' : 'slot-busy'}">${val}</td>`;
      }).join('')}
    </tr>
  `).join('');

  const html = `
    <div class="profile-wrap">
      <button class="btn-ghost back-btn" onclick="showPage('browse')">← Back to search</button>
      <div class="profile-header">
        <div class="profile-avatar-big" style="background:${s.avatarBg}">${s.avatar}</div>
        <div>
          <div class="profile-name">${s.name}</div>
          <div class="profile-meta">Age ${s.age} · 📍 ${s.city}</div>
          <div class="profile-meta">★ ${s.rating} rating · ${s.reviews} reviews</div>
          <div class="sc-avail ${s.availability === 'available' ? 'avail-yes' : 'avail-no'}" style="margin-top:10px">${s.availLabel}</div>
          <div class="profile-tags">${s.skills.map(sk => `<span class="profile-tag">${sk}</span>`).join('')}</div>
        </div>
      </div>
      <div class="profile-sections">
        <div class="profile-box">
          <h3>About ${s.name.split(' ')[0]}</h3>
          <p class="profile-bio">${s.bio}</p>
          <div class="contact-btn">
            ${currentUser
              ? `<button class="btn-primary" onclick="alert('Message sent to ${s.name.split(' ')[0]}! They will be in touch soon.')">💬 Send message</button>`
              : `<button class="btn-primary" onclick="openModal('login')">Log in to contact</button>`
            }
          </div>
        </div>
        <div class="profile-box">
          <h3>Weekly Availability</h3>
          <table class="timetable">
            <thead>
              <tr>
                <th></th>
                ${days.map(d => `<th>${d}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${scheduleRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  document.getElementById('profileWrap').innerHTML = html;
  showPage('profile');
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  if (!currentUser) { showPage('home'); openModal('login'); return; }

  // User card
  document.getElementById('dashUserCard').innerHTML = `
    <div style="font-size:2rem;margin-bottom:8px">${currentUser.role === 'student' ? '🎓' : '🏡'}</div>
    <strong style="font-size:1rem;color:var(--navy)">${currentUser.name}</strong>
    <div style="font-size:.82rem;color:var(--text-muted);margin-top:2px">${currentUser.role === 'student' ? 'Student' : 'Community Member'} · ${currentUser.city}</div>
  `;

  switchDashTab('overview', document.querySelector('.dash-nav-btn'));
}

function switchDashTab(tab, btn) {
  document.querySelectorAll('.dash-nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const main = document.getElementById('dashMain');
  if (tab === 'overview') {
    main.innerHTML = renderOverview();
  } else if (tab === 'agenda') {
    main.innerHTML = renderAgenda();
  } else if (tab === 'profile-edit') {
    main.innerHTML = renderProfileEdit();
  }
  main.querySelectorAll('.dash-section').forEach(s => s.classList.add('active'));
}

function renderOverview() {
  const isStudent = currentUser.role === 'student';
  return `
    <div class="dash-section">
      <div class="dash-title">Welcome back, ${currentUser.name.split(' ')[0]} 👋</div>
      <div class="stat-cards">
        <div class="stat-card">
          <div class="sc-num">${isStudent ? '3' : '2'}</div>
          <div class="sc-lbl">${isStudent ? 'Gigs completed' : 'Helpers hired'}</div>
        </div>
        <div class="stat-card">
          <div class="sc-num">${isStudent ? '2' : '1'}</div>
          <div class="sc-lbl">Upcoming ${isStudent ? 'jobs' : 'bookings'}</div>
        </div>
        <div class="stat-card">
          <div class="sc-num">${isStudent ? '★ 4.9' : '—'}</div>
          <div class="sc-lbl">${isStudent ? 'Your rating' : 'Community trust'}</div>
        </div>
      </div>
      <div style="background:var(--white);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:24px">
        <h3 style="font-family:var(--font-display);font-size:1.1rem;color:var(--navy);margin-bottom:14px">Quick actions</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${isStudent
            ? `<button class="btn-primary" onclick="switchDashTab('agenda', document.querySelectorAll('.dash-nav-btn')[1])">📅 Update agenda</button>
               <button class="btn-ghost" onclick="switchDashTab('profile-edit', document.querySelectorAll('.dash-nav-btn')[2])">✏️ Edit my profile</button>`
            : `<button class="btn-primary" onclick="showPage('browse')">🔍 Find a helper</button>`
          }
        </div>
      </div>
    </div>
  `;
}

function renderAgenda() {
  const agenda = currentUser.agenda || defaultAgenda();
  const days = Object.keys(agenda);
  const slots = ['morning', 'afternoon', 'evening'];

  return `
    <div class="dash-section">
      <div class="dash-title">My Agenda</div>
      <p style="color:var(--text-muted);margin-bottom:24px;font-size:.95rem">Click any slot to toggle availability. This schedule is visible on your public profile.</p>
      <div class="agenda-table-wrap">
        <table class="agenda-table">
          <thead>
            <tr>
              <th>Slot</th>
              ${days.map(d => `<th>${d}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${slots.map(slot => `
              <tr>
                <td><strong>${slot.charAt(0).toUpperCase() + slot.slice(1)}</strong></td>
                ${days.map(d => `
                  <td>
                    <button
                      class="gig-badge ${agenda[d][slot] === 'Free' ? 'gig-confirmed' : 'gig-pending'}"
                      onclick="toggleSlot('${d}','${slot}', this)"
                      style="cursor:pointer;border:none"
                    >${agenda[d][slot]}</button>
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="margin-top:14px;font-size:.82rem;color:var(--text-muted)">Green = Free · Orange = Busy. Changes are saved automatically.</p>
    </div>
  `;
}

function toggleSlot(day, slot, btn) {
  if (!currentUser.agenda) currentUser.agenda = defaultAgenda();
  const current = currentUser.agenda[day][slot];
  const next = current === 'Free' ? 'Busy' : 'Free';
  currentUser.agenda[day][slot] = next;
  btn.textContent = next;
  btn.className = `gig-badge ${next === 'Free' ? 'gig-confirmed' : 'gig-pending'}`;
}

function defaultAgenda() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const slots = ['morning','afternoon','evening'];
  const agenda = {};
  days.forEach(d => {
    agenda[d] = {};
    slots.forEach(s => { agenda[d][s] = 'Free'; });
  });
  return agenda;
}

function renderProfileEdit() {
  const allSkills = ['Babysitting','Tutoring','Gardening','Cleaning','Tech Help','Pet Care','Errands','Cooking'];
  const userSkills = currentUser.skills || [];
  return `
    <div class="dash-section">
      <div class="dash-title">Edit Profile</div>
      <div class="edit-form">
        <div class="form-row">
          <label>Full name</label>
          <input id="editName" type="text" value="${currentUser.name}" />
        </div>
        <div class="form-row">
          <label>City</label>
          <input id="editCity" type="text" value="${currentUser.city}" />
        </div>
        <div class="form-row">
          <label>About me</label>
          <textarea id="editBio">${currentUser.bio || ''}</textarea>
        </div>
        ${currentUser.role === 'student' ? `
        <div class="form-row">
          <label>My skills</label>
          <div class="form-tags">
            ${allSkills.map(sk => `
              <button type="button" class="form-tag-toggle ${userSkills.includes(sk) ? 'selected' : ''}"
                onclick="this.classList.toggle('selected')" data-skill="${sk}">${sk}</button>
            `).join('')}
          </div>
        </div>
        ` : ''}
        <button class="btn-primary" onclick="saveProfile()">Save changes</button>
      </div>
    </div>
  `;
}

function saveProfile() {
  currentUser.name = document.getElementById('editName').value.trim() || currentUser.name;
  currentUser.city = document.getElementById('editCity').value.trim() || currentUser.city;
  currentUser.bio  = document.getElementById('editBio').value.trim();
  if (currentUser.role === 'student') {
    currentUser.skills = Array.from(document.querySelectorAll('.form-tag-toggle.selected')).map(b => b.dataset.skill);
  }
  document.getElementById('dashUserCard').querySelector('strong').textContent = currentUser.name;
  showToast('Profile updated ✓');
}

function logout() {
  currentUser = null;
  showPage('home');
  showToast('You have been logged out.');
}

// ============================================================
// MODAL — Login / Signup
// ============================================================
function openModal(type) {
  document.getElementById('modalOverlay').classList.add('open');
  if (type === 'login') renderLoginModal();
  else renderSignupModal();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function renderLoginModal() {
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-title">Welcome back 👋</div>
    <div class="modal-sub">Log in to your Eccomi account.</div>
    <div class="form-row">
      <label>Email</label>
      <input id="loginEmail" type="email" placeholder="you@example.com" />
    </div>
    <div class="form-row">
      <label>Password</label>
      <input id="loginPass" type="password" placeholder="••••••••" />
    </div>
    <div id="loginError" class="error-msg" style="display:none"></div>
    <button class="btn-primary full-w" style="margin-top:8px" onclick="doLogin()">Log in</button>
    <div class="modal-switch">Don't have an account? <a onclick="renderSignupModal()">Sign up</a></div>
  `;
}

function renderSignupModal(role) {
  const selectedRole = role || null;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-title">Join Eccomi 🌱</div>
    <div class="modal-sub">Create your free account in seconds.</div>
    <div class="role-selector">
      <div class="role-btn ${selectedRole === 'student' ? 'selected' : ''}" id="roleStudent" onclick="selectRole('student')">
        <div class="role-icon">🎓</div>
        <strong>Student</strong>
        <span>Aged 16–25, offer gigs</span>
      </div>
      <div class="role-btn ${selectedRole === 'adult' ? 'selected' : ''}" id="roleAdult" onclick="selectRole('adult')">
        <div class="role-icon">🏡</div>
        <strong>Community member</strong>
        <span>Looking for help</span>
      </div>
    </div>
    <div id="signupFields" style="display:${selectedRole ? 'block' : 'none'}">
      <div class="form-row">
        <label>Full name</label>
        <input id="signupName" type="text" placeholder="Your name" />
      </div>
      <div class="form-row">
        <label>Email</label>
        <input id="signupEmail" type="email" placeholder="you@example.com" />
      </div>
      <div class="form-row">
        <label>City</label>
        <input id="signupCity" type="text" placeholder="e.g. Turin" />
      </div>
      ${selectedRole === 'student' ? `
      <div class="form-row">
        <label>Age</label>
        <input id="signupAge" type="number" min="16" max="25" placeholder="Min. 16" />
      </div>
      ` : ''}
      <div class="form-row">
        <label>Password</label>
        <input id="signupPass" type="password" placeholder="At least 6 characters" />
      </div>
      <div id="signupError" class="error-msg" style="display:none"></div>
      <button class="btn-primary full-w" style="margin-top:8px" onclick="doSignup('${selectedRole}')">Create account</button>
    </div>
    <div class="modal-switch">Already have an account? <a onclick="renderLoginModal()">Log in</a></div>
  `;
}

let _signupRole = null;
function selectRole(role) {
  _signupRole = role;
  renderSignupModal(role);
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');

  if (!email || !pass) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }

  // Demo: accept any valid-looking credentials
  if (!email.includes('@')) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    return;
  }

  // Create a mock session
  currentUser = {
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    role: 'student',
    city: 'Turin',
    age: 20,
    skills: ['Tutoring', 'Errands'],
    bio: 'This is my Eccomi profile.',
    agenda: defaultAgenda()
  };

  closeModal();
  showPage('dashboard');
  showToast('Welcome back! 👋');
}

function doSignup(role) {
  const name  = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const city  = document.getElementById('signupCity')?.value.trim();
  const pass  = document.getElementById('signupPass')?.value;
  const errEl = document.getElementById('signupError');

  if (!name || !email || !city || !pass) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }
  if (!email.includes('@')) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    return;
  }
  if (pass.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    errEl.style.display = 'block';
    return;
  }

  if (role === 'student') {
    const age = parseInt(document.getElementById('signupAge')?.value);
    if (!age || age < 16) {
      errEl.textContent = 'You must be at least 16 years old to register as a student.';
      errEl.style.display = 'block';
      return;
    }
    currentUser = { name, role: 'student', city, age, skills: [], bio: '', agenda: defaultAgenda() };
  } else {
    currentUser = { name, role: 'adult', city, skills: [], bio: '', agenda: null };
  }

  closeModal();
  showPage('dashboard');
  showToast(`Welcome to Eccomi, ${name.split(' ')[0]}! 🌱`);
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
      background:var(--navy); color:var(--cream);
      padding:12px 24px; border-radius:50px;
      font-size:.9rem; font-weight:500;
      box-shadow:0 4px 20px rgba(0,0,0,.2);
      z-index:9999; opacity:0;
      transition:opacity .25s, transform .25s;
      white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 3000);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderStudents();
});
