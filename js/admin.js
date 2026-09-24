// admin.js — modo administrador universal para TODAS las páginas del portafolio.
// - Hace editables los elementos con [data-editable]
// - Guarda los cambios por página en localStorage
// - Barra flotante: 🔄 Restaurar  ·  📥 Exportar  ·  💾 Guardar
// - Atajo Ctrl+S para guardar

(function () {
  'use strict';

  const PAGE_KEY = 'bd2_admin_' + window.location.pathname.split('/').pop().replace(/\.html?$/, '');
  const MATERIALES_KEY = 'bd2_materiales_editados';

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(PAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveSaved(data) {
    localStorage.setItem(PAGE_KEY, JSON.stringify(data));
  }
  function esAdmin() {
    return document.body.classList.contains('role-admin');
  }
  function esPaginaSemana() {
    return window.location.pathname.indexOf('semana') !== -1;
  }

  let activo = false;

  // ---------- ACTIVAR / DESACTIVAR ----------
  function activar() {
    if (activo) return;
    activo = true;
    document.body.classList.add('admin-editing');

    const saved = getSaved();

    document.querySelectorAll('[data-editable]').forEach((el) => {
      const key = el.dataset.editable;
      if (saved[key] !== undefined) el.innerHTML = saved[key];

      el.contentEditable = 'true';
      el.spellcheck = false;

      el.addEventListener('blur', () => {
        const data = getSaved();
        data[key] = el.innerHTML;
        saveSaved(data);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && el.dataset.editableMultiline !== 'true') {
          e.preventDefault();
          el.blur();
        }
      });
    });

    mostrarBarra();
  }

  function desactivar() {
    activo = false;
    document.body.classList.remove('admin-editing');
    document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
      el.contentEditable = 'false';
    });
    const bar = document.getElementById('adminBar');
    if (bar) bar.remove();
  }

  // ---------- BARRA ----------
  function mostrarBarra() {
    if (document.getElementById('adminBar')) return;
    const bar = document.createElement('div');
    bar.className = 'admin-bar';
    bar.id = 'adminBar';
    bar.innerHTML =
      '<span class="admin-bar-title">👑 Modo Admin</span>' +
      '<button type="button" class="admin-btn" id="adminRestore">🔄 Restaurar</button>' +
      '<button type="button" class="admin-btn" id="adminExport">📥 Exportar</button>' +
      '<button type="button" class="admin-btn admin-btn-primary" id="adminSave">💾 Guardar</button>';
    document.body.appendChild(bar);

    document.getElementById('adminRestore').addEventListener('click', restaurar);
    document.getElementById('adminExport').addEventListener('click', exportar);
    document.getElementById('adminSave').addEventListener('click', guardar);
  }

  // ---------- GUARDAR ----------
  function guardar() {
    toast('✅ Cambios guardados en este navegador');
  }

  // ---------- RESTAURAR ----------
  function restaurar() {
    if (!confirm('¿Restaurar el contenido original de esta página? Se perderán los cambios.')) return;
    if (esPaginaSemana()) {
      localStorage.removeItem(MATERIALES_KEY);
    } else {
      localStorage.removeItem(PAGE_KEY);
    }
    location.reload();
  }

  // ---------- EXPORTAR ----------
  function exportar() {
    if (esPaginaSemana()) {
      exportarMaterialesJS();
    } else {
      exportarRespaldoJSON();
    }
  }

  // Exporta el materiales.js completo (para subir a GitHub)
  function exportarMaterialesJS() {
    let datos;
    try {
      const raw = localStorage.getItem(MATERIALES_KEY);
      datos = raw ? JSON.parse(raw) : null;
    } catch (e) { datos = null; }

    if (!datos && typeof MATERIALES_BASE !== 'undefined') {
      datos = MATERIALES_BASE;
    }

    if (!datos) {
      toast('⚠️ No se encontraron datos para exportar');
      return;
    }

    const contenido =
      '// materiales.js — exportado desde el portafolio\n' +
      '// Fecha: ' + new Date().toISOString() + '\n' +
      '// Sube este archivo a js/materiales.js en GitHub para publicar los cambios.\n\n' +
      'const MATERIALES_BASE = ' + JSON.stringify(datos, null, 2) + ';\n';

    descargar('materiales.js', contenido, 'application/javascript');
    toast('📥 materiales.js descargado. Súbelo a GitHub para publicar.');
  }

  // Exporta un JSON con los textos editados de la página actual
  function exportarRespaldoJSON() {
    const saved = getSaved();
    if (!Object.keys(saved).length) {
      toast('⚠️ No hay cambios que exportar en esta página');
      return;
    }

    const nombre = window.location.pathname.split('/').pop().replace(/\.html?$/, '');
    const fecha = new Date().toISOString().slice(0, 10);
    const contenido = JSON.stringify({
      pagina: nombre,
      fecha: new Date().toISOString(),
      textos: saved
    }, null, 2);

    descargar('bd2-' + nombre + '-' + fecha + '.json', contenido, 'application/json');
    toast('📥 Respaldo JSON descargado');
  }

  function descargar(nombre, contenido, tipo) {
    const blob = new Blob([contenido], { type: tipo + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ---------- TOAST ----------
  function toast(msg, ms) {
    ms = ms || 2600;
    const t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('visible'), 10);
    setTimeout(() => {
      t.classList.remove('visible');
      setTimeout(() => t.remove(), 300);
    }, ms);
  }

  // ---------- EVENTOS ----------
  document.addEventListener('DOMContentLoaded', () => {
    if (esAdmin()) activar();
  });
  document.addEventListener('rolechange', () => {
    if (esAdmin()) activar();
    else desactivar();
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && esAdmin()) {
      e.preventDefault();
      guardar();
    }
  });

  window.BD2Admin = { toast };
})();