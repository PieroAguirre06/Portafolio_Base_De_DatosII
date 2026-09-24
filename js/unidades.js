// unidades.js — pinta los botones de SEMANA (1..4) por unidad.
// Cada botón abre  semana.html?u=X&s=Y  con la interfaz temática.

(function () {
  const LS_KEY = 'bd2_materiales_extra';
  const UNIT_IDS = [1, 2, 3, 4, 5];

  function getExtra() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveExtra(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  function renderUnit(unitId) {
    const list = document.querySelector(`.materials-list[data-unit="${unitId}"]`);
    if (!list) return;

    const base = (typeof MATERIALES_BASE !== 'undefined' && MATERIALES_BASE[unitId]) || [];
    const extra = getExtra()[unitId] || [];
    const items = [...base, ...extra];

    list.innerHTML = '';

    if (items.length === 0) {
      const li = document.createElement('li');
      li.className = 'no-materials';
      li.textContent = 'Aún no hay materiales cargados en esta unidad.';
      list.appendChild(li);
      return;
    }

    items.forEach((item, idx) => {
      const li = document.createElement('li');
      const isExtra = idx >= base.length;

      // Todos los botones apuntan a semana.html con parámetros
      const link = document.createElement('a');
      const weekNumber = idx + 1;
      link.href = `semana.html?u=${unitId}&s=${weekNumber}`;
      link.className = 'week-btn';
      link.textContent = '📄 ' + item.titulo + (isExtra ? ' (vista previa)' : '');
      li.appendChild(link);

      // Botón de borrar (solo Admin y solo para los extra)
      if (isExtra && document.body.classList.contains('role-admin')) {
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'material-del';
        del.textContent = '✕';
        del.title = 'Quitar de la vista previa';
        del.addEventListener('click', () => {
          const data = getExtra();
          data[unitId].splice(idx - base.length, 1);
          saveExtra(data);
          renderUnit(unitId);
        });
        li.appendChild(del);
      }

      list.appendChild(li);
    });
  }

  function renderAll() {
    UNIT_IDS.forEach(renderUnit);
  }

  function setupAddButtons() {
    document.querySelectorAll('.add-material-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const unitId = btn.dataset.unit;
        const titulo = prompt('Nombre del botón (ej: Semana 5):');
        if (!titulo) return;
        const archivo = prompt('Ruta del PDF, ej: assets/pdfs/mi-trabajo.pdf\n(deja vacío para crear un botón "Próximamente"):') || '';
        const data = getExtra();
        data[unitId] = data[unitId] || [];
        data[unitId].push({ titulo, archivo });
        saveExtra(data);
        renderUnit(unitId);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    setupAddButtons();
  });
  document.addEventListener('rolechange', renderAll);
})();