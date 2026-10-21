(function () {
  const UNIT_IDS = [1, 2, 3, 4]; // Solo 4 unidades

  function renderUnit(unitId) {
    const list = document.querySelector('.materials-list[data-unit="' + unitId + '"]');
    if (!list) return;

    if (typeof MATERIALES_BASE === 'undefined' || !MATERIALES_BASE[unitId]) {
      list.innerHTML = '<li class="no-materials">Aún no hay materiales cargados.</li>';
      return;
    }

    const items = MATERIALES_BASE[unitId];
    list.innerHTML = '';

    items.forEach((item, idx) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      
      link.href = 'semana.html?u=' + unitId + '&s=' + (idx + 1);
      link.className = 'week-btn';
      link.textContent = '📄 ' + item.titulo; 
      
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  function renderAll() {
    UNIT_IDS.forEach(renderUnit);
  }

  document.addEventListener('DOMContentLoaded', renderAll);
  document.addEventListener('rolechange', renderAll);
})();