// auth.js — control de acceso del portafolio (Admin / Invitado)
// Aparece al abrir cualquier página si todavía no se eligió un rol en esta sesión.
//
// Admin  -> puede agregar/quitar materiales en Unidades (usuario: piero.aguirre / clave: bd2-2026)
// Invitado -> solo puede ver el contenido.

(function () {
  const ADMIN_USER = 'piero.aguirre';
  const ADMIN_PASS = 'bd2-2026';
  const ROLE_KEY = 'bd2_role';

  function getRole() {
    return sessionStorage.getItem(ROLE_KEY) || localStorage.getItem(ROLE_KEY);
  }
  function setRole(role, remember) {
    sessionStorage.setItem(ROLE_KEY, role);
    if (remember) localStorage.setItem(ROLE_KEY, role);
    else localStorage.removeItem(ROLE_KEY);
  }
  function clearRole() {
    sessionStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  function applyRole(role) {
    document.body.classList.remove('role-admin', 'role-guest');
    document.body.classList.add(role === 'admin' ? 'role-admin' : 'role-guest');
    renderBadge(role);
    document.dispatchEvent(new CustomEvent('rolechange', { detail: { role } }));
  }

  function renderBadge(role) {
    const badge = document.getElementById('roleBadge');
    if (!badge) return;
    badge.innerHTML = role === 'admin'
      ? '👑 Admin <button type="button" id="logoutBtn" class="role-switch">Cambiar</button>'
      : '🛡 Invitado <button type="button" id="logoutBtn" class="role-switch">Cambiar</button>';
    const btn = document.getElementById('logoutBtn');
    if (btn) btn.addEventListener('click', () => { clearRole(); showGate(); });
  }

  function buildGate() {
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.id = 'authOverlay';
    overlay.innerHTML = `
      <div class="auth-modal">
        <div class="glyph-lg">🛡️</div>
        <h1>Selecciona tu rol</h1>
        <p class="sub">Base de Datos II · Aguirre Osores Piero</p>

        <div class="role-options" id="roleOptions">
          <button type="button" class="role-card" id="pickGuest">
            <span class="role-icon">👁️</span>
            <span class="role-title">Invitado</span>
            <span class="role-desc">Solo puedes ver el portafolio y las unidades.</span>
          </button>
          <button type="button" class="role-card" id="pickAdmin">
            <span class="role-icon">👑</span>
            <span class="role-title">Administrador</span>
            <span class="role-desc">Puedes agregar o quitar materiales de cada unidad.</span>
          </button>
        </div>

        <div class="admin-login" id="adminLogin" hidden>
          <div class="field"><label for="gateUser">Usuario</label>
            <input id="gateUser" type="text" placeholder="piero.aguirre" autocomplete="username"></div>
          <div class="field"><label for="gatePass">Contraseña</label>
            <input id="gatePass" type="password" placeholder="••••••••" autocomplete="current-password"></div>
          <label class="remember-inline"><input type="checkbox" id="gateRemember"> Recordarme en este dispositivo</label>
          <button type="button" class="btn btn-primary" id="gateSubmit" style="width:100%">Entrar como Admin</button>
          <p id="gateMsg"></p>
          <button type="button" class="link-back" id="gateBack">← Volver</button>
        </div>
      </div>`;
    document.body.prepend(overlay);

    document.getElementById('pickGuest').addEventListener('click', () => {
      setRole('guest', false);
      hideGate('guest');
    });
    document.getElementById('pickAdmin').addEventListener('click', () => {
      document.getElementById('roleOptions').hidden = true;
      document.getElementById('adminLogin').hidden = false;
      document.getElementById('gateUser').focus();
    });
    document.getElementById('gateBack').addEventListener('click', () => {
      document.getElementById('adminLogin').hidden = true;
      document.getElementById('roleOptions').hidden = false;
    });
    document.getElementById('gateSubmit').addEventListener('click', submitAdmin);
    document.getElementById('gatePass').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitAdmin();
    });

    function submitAdmin() {
      const u = document.getElementById('gateUser').value.trim();
      const p = document.getElementById('gatePass').value.trim();
      const remember = document.getElementById('gateRemember').checked;
      const msg = document.getElementById('gateMsg');
      if (u === ADMIN_USER && p === ADMIN_PASS) {
        setRole('admin', remember);
        hideGate('admin');
      } else {
        msg.textContent = 'Usuario o contraseña incorrectos.';
        msg.className = 'err';
      }
    }
  }

  function hideGate(role) {
    const overlay = document.getElementById('authOverlay');
    if (overlay) overlay.remove();
    applyRole(role);
  }

  function showGate() {
    if (!document.getElementById('authOverlay')) buildGate();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const role = getRole();
    if (role) applyRole(role);
    else buildGate();
  });

  window.BD2Auth = { getRole, clearRole, showGate };
})();
