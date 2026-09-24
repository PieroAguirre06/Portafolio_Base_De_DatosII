// semana.js — carga la semana y permite edición de actividades/archivos (solo Admin).
// La barra admin la maneja js/admin.js

(function () {
  'use strict';

  const LS_KEY = 'bd2_materiales_editados';
  const UNIT_ICONS = { 1: '🗺️', 2: '📐', 3: '🗡️', 4: '⚙️', 5: '🛡️' };
  const UNIT_NAMES = {
    1: 'UNIDAD I · Modelo Entidad-Relación',
    2: 'UNIDAD II · Normalización',
    3: 'UNIDAD III · SQL avanzado',
    4: 'UNIDAD IV · Transacciones y ACID',
    5: 'UNIDAD V · Administración y respaldo'
  };

  let DATOS = null, unitId = null, weekIdx = null, semanaActual = null;

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('rolechange', () => { if (semanaActual) render(); });

  function init() {
    const params = new URLSearchParams(window.location.search);
    unitId  = parseInt(params.get('u'), 10);
    weekIdx = parseInt(params.get('s'), 10);
    if (!unitId || !weekIdx) { showError('Parámetros inválidos.'); return; }

    DATOS = cargarDatos();
    const unidad = DATOS[unitId];
    if (!unidad) { showError('Unidad no encontrada.'); return; }
    semanaActual = unidad[weekIdx - 1];
    if (!semanaActual) { showError('Semana no encontrada.'); return; }

    render();
  }

  function esAdmin() { return document.body.classList.contains('role-admin'); }

  function cargarDatos() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(MATERIALES_BASE));
  }

  function guardarDatos() {
    localStorage.setItem(LS_KEY, JSON.stringify(DATOS));
    if (window.BD2Admin && window.BD2Admin.toast) {
      window.BD2Admin.toast('✅ Cambios guardados en este navegador');
    }
  }

  function setText(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  }

  function render() {
    document.title = (semanaActual.titulo || 'Semana') + ' · Unidad ' + unitId + ' · BD II';
    setText('weekNode', UNIT_ICONS[unitId] || '📄');
    setText('weekUnitTag', UNIT_NAMES[unitId] || ('UNIDAD ' + unitId));
    setText('weekTitle', semanaActual.titulo || '');
    setText('weekSubtitle', semanaActual.subtitulo || '');
    setText('weekDescription', semanaActual.descripcion || '');

    // Temas
    const ul = document.getElementById('weekTopics');
    if (ul) {
      ul.innerHTML = '';
      (semanaActual.temas || []).forEach((t, i) => {
        const li = document.createElement('li');
        li.textContent = t;
        if (esAdmin()) {
          li.contentEditable = 'true';
          li.addEventListener('blur', () => {
            const n = li.textContent.trim();
            if (semanaActual.temas[i] !== n) {
              semanaActual.temas[i] = n;
              guardarDatos();
            }
          });
          li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); li.blur(); }
          });
        }
        ul.appendChild(li);
      });
      if (esAdmin()) addTemaAddButton(ul);
    }

    // Título, subtítulo y descripción editables
    [
      { id: 'weekTitle',       field: 'titulo' },
      { id: 'weekSubtitle',    field: 'subtitulo' },
      { id: 'weekDescription', field: 'descripcion' }
    ].forEach(({ id, field }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (esAdmin()) {
        el.contentEditable = 'true';
        el.spellcheck = false;
        el.onblur = () => {
          const n = el.textContent.trim();
          if (semanaActual[field] !== n) {
            semanaActual[field] = n;
            guardarDatos();
          }
        };
        el.onkeydown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey && id !== 'weekDescription') {
            e.preventDefault();
            el.blur();
          }
        };
      } else {
        el.contentEditable = 'false';
      }
    });

    renderActividades();
  }

  function renderActividades() {
    const list = document.getElementById('activitiesList');
    const count = document.getElementById('activitiesCount');
    const acts = semanaActual.actividades || [];
    if (!list) return;
    if (count) count.textContent = acts.length;
    list.innerHTML = '';

    if (acts.length === 0) {
      list.innerHTML = '<p class="no-materials">Esta semana aún no tiene actividades.</p>';
      if (esAdmin()) list.appendChild(makeAddActivityBtn());
      return;
    }

    acts.forEach((act, actIdx) => {
      const actDiv = document.createElement('div');
      actDiv.className = 'activity';
      if (actIdx === 0) actDiv.classList.add('open');

      const header = document.createElement('div');
      header.className = 'activity-header';

      const chev = document.createElement('span');
      chev.className = 'activity-chevron';
      chev.textContent = '▶';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'activity-name';
      nameSpan.textContent = '📂 ' + (act.nombre || 'Actividad');
      if (esAdmin()) {
        nameSpan.contentEditable = 'true';
        nameSpan.addEventListener('click', (e) => e.stopPropagation());
        nameSpan.addEventListener('blur', () => {
          const n = nameSpan.textContent.trim().replace(/^📂\s*/, '');
          if (n && n !== act.nombre) {
            act.nombre = n;
            guardarDatos();
          }
        });
        nameSpan.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); nameSpan.blur(); }
        });
      }

      const countSpan = document.createElement('span');
      countSpan.className = 'activity-count';
      const n = (act.archivos || []).length;
      countSpan.textContent = n + (n === 1 ? ' archivo' : ' archivos');

      header.appendChild(chev);
      header.appendChild(nameSpan);
      header.appendChild(countSpan);

      if (esAdmin()) {
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'mini-btn danger';
        del.title = 'Eliminar actividad';
        del.textContent = '✕';
        del.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!confirm('¿Eliminar la actividad "' + act.nombre + '"?')) return;
          semanaActual.actividades.splice(actIdx, 1);
          guardarDatos();
          render();
        });
        header.appendChild(del);
      }

      header.addEventListener('click', () => actDiv.classList.toggle('open'));

      const filesUl = document.createElement('ul');
      filesUl.className = 'activity-files';

      (act.archivos || []).forEach((file, fileIdx) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'file-btn';

        const ext  = getExt(file.ruta);
        const icon = ext === 'pdf' ? '📕' : ext === 'html' ? '🌐' : ext === 'sql' ? '🗄️' : '📄';
        btn.innerHTML = '<span class="file-icon">' + icon + '</span> <span class="file-name-text">' + file.nombre + '</span>';

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.file-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          loadFile(file);
        });

        li.appendChild(btn);

        if (esAdmin()) {
          const edit = document.createElement('button');
          edit.type = 'button';
          edit.className = 'mini-btn';
          edit.title = 'Editar';
          edit.textContent = '✏️';
          edit.addEventListener('click', (e) => {
            e.stopPropagation();
            const nn = prompt('Nombre:', file.nombre);
            if (nn === null) return;
            const nr = prompt('Ruta:', file.ruta);
            if (nr === null) return;
            file.nombre = nn.trim() || file.nombre;
            file.ruta = nr.trim() || file.ruta;
            guardarDatos();
            render();
          });

          const del = document.createElement('button');
          del.type = 'button';
          del.className = 'mini-btn danger';
          del.title = 'Eliminar';
          del.textContent = '✕';
          del.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!confirm('¿Eliminar "' + file.nombre + '"?')) return;
            semanaActual.actividades[actIdx].archivos.splice(fileIdx, 1);
            guardarDatos();
            render();
          });

          li.appendChild(edit);
          li.appendChild(del);
        }

        filesUl.appendChild(li);
      });

      if (esAdmin()) {
        const addLi = document.createElement('li');
        addLi.className = 'add-file-li';
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'add-file-btn';
        addBtn.textContent = '+ Añadir archivo aquí';
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const nn = prompt('Nombre del archivo:');
          if (!nn || !nn.trim()) return;
          const nr = prompt('Ruta (ej: assets/pdfs/archivo.pdf):', 'assets/pdfs/');
          if (!nr || !nr.trim()) return;
          act.archivos = act.archivos || [];
          act.archivos.push({ nombre: nn.trim(), ruta: nr.trim() });
          guardarDatos();
          render();
        });
        addLi.appendChild(addBtn);
        filesUl.appendChild(addLi);
      }

      actDiv.appendChild(header);
      actDiv.appendChild(filesUl);
      list.appendChild(actDiv);
    });

    if (esAdmin()) list.appendChild(makeAddActivityBtn());
  }

  function makeAddActivityBtn() {
    const div = document.createElement('div');
    div.className = 'add-activity-wrap';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-activity-btn';
    btn.textContent = '+ Añadir nueva actividad';
    btn.addEventListener('click', () => {
      const nn = prompt('Nombre de la actividad:', 'Actividad ' + ((semanaActual.actividades || []).length + 1));
      if (!nn || !nn.trim()) return;
      semanaActual.actividades = semanaActual.actividades || [];
      semanaActual.actividades.push({ nombre: nn.trim(), archivos: [] });
      guardarDatos();
      render();
    });
    div.appendChild(btn);
    return div;
  }

  function addTemaAddButton(ul) {
    const li = document.createElement('li');
    li.className = 'add-tema-li';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mini-btn';
    btn.textContent = '+ Añadir tema';
    btn.addEventListener('click', () => {
      const nn = prompt('Nuevo tema:');
      if (!nn || !nn.trim()) return;
      semanaActual.temas = semanaActual.temas || [];
      semanaActual.temas.push(nn.trim());
      guardarDatos();
      render();
    });
    li.appendChild(btn);
    ul.appendChild(li);
  }

  // ---------- VISOR ----------
  function getExt(ruta) {
    if (!ruta) return '';
    const m = ruta.toLowerCase().match(/\.([a-z0-9]+)(?:\?|#|$)/);
    return m ? m[1] : '';
  }

  function loadFile(file) {
    const viewer  = document.getElementById('pdfViewer');
    const status  = document.getElementById('pdfStatus');
    const pdfName = document.getElementById('pdfName');
    const pdfHint = document.getElementById('pdfHint');
    const archivo = file.ruta || '';
    const ext     = getExt(archivo);

    if (pdfName) { pdfName.textContent = file.nombre; pdfName.hidden = false; }

    if (!archivo) {
      viewer.innerHTML = '<div class="pdf-placeholder">⏳ No disponible</div>';
      status.textContent = 'Sin archivo';
      return;
    }

    status.textContent = 'Cargando…';
    status.style.color = 'var(--cream-dim)';
    viewer.innerHTML = '<div class="pdf-placeholder">Cargando…</div>';

    if (ext === 'pdf') renderPdf(viewer, status, pdfHint, archivo, file.nombre);
    else if (ext === 'html' || ext === 'htm') renderHtml(viewer, status, pdfHint, archivo);
    else if (ext === 'sql') renderSql(viewer, status, pdfHint, archivo);
    else renderGeneric(viewer, status, pdfHint, archivo);
  }

  function renderPdf(viewer, status, pdfHint, archivo, nombre) {
    fetch(archivo, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) throw new Error();
        viewer.innerHTML = '<iframe src="' + archivo + '#toolbar=1&navpanes=0&view=FitH" title="' + nombre + '" class="pdf-iframe" loading="lazy"></iframe>';
        status.textContent = '✅ Disponible';
        status.style.color = '#bfe6b8';
        pdfHint.innerHTML = '<a href="' + archivo + '" download class="pdf-download">⬇ Descargar</a> · <a href="' + archivo + '" target="_blank" rel="noopener" class="pdf-download">↗ Abrir</a>';
      })
      .catch(() => showMissing(viewer, status, pdfHint, archivo));
  }

  function renderHtml(viewer, status, pdfHint, archivo) {
    fetch(archivo, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) throw new Error();
        viewer.innerHTML = '<iframe src="' + archivo + '" class="html-iframe" loading="lazy" sandbox="allow-same-origin allow-popups allow-forms"></iframe>';
        status.textContent = '✅ Disponible';
        status.style.color = '#bfe6b8';
        pdfHint.innerHTML = '<a href="' + archivo + '" download class="pdf-download">⬇ Descargar</a> · <a href="' + archivo + '" target="_blank" rel="noopener" class="pdf-download">↗ Abrir</a>';
      })
      .catch(() => showMissing(viewer, status, pdfHint, archivo));
  }

  function renderSql(viewer, status, pdfHint, archivo) {
    fetch(archivo)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((texto) => {
        viewer.innerHTML = '<div class="sql-viewer"><div class="sql-toolbar"><span class="sql-file-name">' + archivo.split('/').pop() + '</span><button type="button" class="sql-copy-btn" id="sqlCopyBtn">📋 Copiar</button></div><pre class="sql-code"><code>' + highlightSql(texto) + '</code></pre></div>';
        status.textContent = '✅ Código cargado';
        status.style.color = '#bfe6b8';
        pdfHint.innerHTML = '<a href="' + archivo + '" download class="pdf-download">⬇ Descargar</a> · <a href="' + archivo + '" target="_blank" rel="noopener" class="pdf-download">↗ Abrir</a>';
        const copy = document.getElementById('sqlCopyBtn');
        copy.addEventListener('click', () => {
          navigator.clipboard.writeText(texto).then(() => {
            copy.textContent = '✅ ¡Copiado!';
            setTimeout(() => copy.textContent = '📋 Copiar', 1400);
          });
        });
      })
      .catch(() => showMissing(viewer, status, pdfHint, archivo));
  }

  function renderGeneric(viewer, status, pdfHint, archivo) {
    viewer.innerHTML = '<div class="pdf-placeholder"><div class="pdf-placeholder-icon">📄</div><p>Formato sin visor.</p><p><a href="' + archivo + '" download class="pdf-download">⬇ Descargar</a></p></div>';
    status.textContent = 'Sin visor';
  }

  function showMissing(viewer, status, pdfHint, archivo) {
    viewer.innerHTML = '<div class="pdf-placeholder"><div class="pdf-placeholder-icon">⚠️</div><p><b>Archivo no encontrado</b></p><p class="pdf-placeholder-path"><code>' + archivo + '</code></p></div>';
    status.textContent = '⚠️ No encontrado';
    status.style.color = '#f0c2c2';
    pdfHint.innerHTML = '';
  }

  function highlightSql(code) {
    let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/(--[^\n]*)/g, '<span class="sql-comment">$1</span>');
    html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sql-comment">$1</span>');
    html = html.replace(/('[^']*')/g, '<span class="sql-string">$1</span>');
    html = html.replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>');
    const kw = ['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DATABASE','DROP','ALTER','ADD','COLUMN','PRIMARY','KEY','FOREIGN','REFERENCES','NOT','NULL','DEFAULT','UNIQUE','CHECK','INDEX','VIEW','JOIN','INNER','LEFT','RIGHT','FULL','OUTER','ON','AS','AND','OR','IN','EXISTS','BETWEEN','LIKE','ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','DISTINCT','COUNT','SUM','AVG','MAX','MIN','USE','GO','BEGIN','END','IF','ELSE','WHILE','DECLARE','PROCEDURE','FUNCTION','TRIGGER','RETURNS','RETURN','INT','VARCHAR','CHAR','DATE','DATETIME','DECIMAL','FLOAT','BOOLEAN','TEXT','BIGINT','SMALLINT','UNION','ALL','CASE','WHEN','THEN','ASC','DESC','TOP','WITH','CASCADE','RESTRICT'];
    html = html.replace(new RegExp('\\b(' + kw.join('|') + ')\\b', 'gi'), '<span class="sql-keyword">$1</span>');
    return html;
  }

  function showError(msg) {
    setText('weekTitle', 'Error');
    setText('weekSubtitle', msg);
  }
})();