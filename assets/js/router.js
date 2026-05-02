/* ================================================================
   router.js — NAVEGACIÓN ENTRE VISTAS (modo file:// amigable)
   ----------------------------------------------------------------
   Cada vista vive en views/<id>/ y expone su HTML como string en
   window.PORTAL_VIEWS[<id>] (cargado vía <script src> desde el
   index.html). Este router:

     1. Monta la vista solicitada dentro de #views-container.
     2. Marca la opción activa del sidebar.
     3. Actualiza el título del topbar.
     4. Reproduce el hash de URL (#dashboard, #listado, ...) para
        que la navegación sobreviva a refresh y permita enlaces
        directos (funciona también con file://).
     5. Dispara los render* de app.js (que ya están definidos
        porque app.js se carga antes).

   Funciona con DOBLE CLIC sobre index.html (no necesita servidor).
   ================================================================ */
(function () {
  'use strict';

  // Etiquetas legibles para el topbar
  const TITULOS = {
    'dashboard':       'Dashboard',
    'listado':         'Trámites',
    'nuevo':           'Nuevo / Consultar Trámite',
    'rpt-lotes':       'Ministerio de Salud Pública — Saldos',
    'rpt-hospital':    'IESS — Saldos por Cobrar',
    'rpt-valores':     'ISSFA · ISSPOL — Saldos',
    'rpt-apelaciones': 'SPPAT — Saldos por Cobrar',
    'rpt-glosas':      'Expedientes por Financiador',
    'rpt-estado':      'Resumen Gerencial',
    'facturacion':     'Facturación',
    'oficios':         'Generador de Oficios',
    'consulta':        'Consulta',
    'rpt-oficios':     'Reporte de Oficios'
  };

  const DEFAULT_VIEW = 'dashboard';
  let vistaActual = null;

  function montarVista(id) {
    id = id || DEFAULT_VIEW;
    const container = document.getElementById('views-container');
    if (!container) {
      console.error('[router] falta #views-container en el DOM');
      return;
    }
    const html = window.PORTAL_VIEWS && window.PORTAL_VIEWS[id];
    if (!html) {
      container.innerHTML =
        '<section class="view active"><div class="view-header">' +
        '<h1>Vista no encontrada</h1>' +
        '<p>No se pudo cargar la vista <code>' + id + '</code>. ' +
        'Verifica que el archivo <code>views/' + id + '/view.js</code> ' +
        'exista y esté incluido en <code>index.html</code>.</p></div></section>';
      return;
    }

    // Inyectar el HTML de la vista
    container.innerHTML = html;

    // Asegurar que el <section> quede con la clase 'active'
    const sec = container.querySelector('section.view');
    if (sec) sec.classList.add('active');

    // Actualizar menú activo + título
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    const link = document.querySelector('.nav-link[data-view="' + id + '"]');
    if (link) link.classList.add('active');
    const title = document.getElementById('topbar-title');
    if (title) title.textContent = TITULOS[id] || id;

    // Cerrar el sidebar en móvil después de navegar
    const side = document.getElementById('sidebar');
    if (side) side.classList.remove('open');

    // Exponer la vista actual para que otros scripts sepan dónde estamos
    window.__CURRENT_VIEW__ = id;
    vistaActual = id;

    // Llamar el render correspondiente si ya tenemos datos cargados
    // (app.js se inicializa antes del router y deja DB lista).
    try {
      if (id === 'dashboard'       && typeof renderDashboard === 'function')       renderDashboard();
      if (id === 'listado'         && typeof renderTablaTramites === 'function')   renderTablaTramites();
      if (id.indexOf('rpt-') === 0 && typeof renderTodosReportes === 'function')   renderTodosReportes();
      if (id === 'oficios'         && typeof renderListaOficios === 'function')    renderListaOficios();
      if (id === 'oficios'         && typeof renderOficio === 'function') {
        // Inicializa la fecha 'hoy' del oficio si existe el campo
        const elFecha = document.getElementById('of-fecha');
        if (elFecha && !elFecha.value) elFecha.value = new Date().toISOString().slice(0,10);
        renderOficio();
      }
      if (id === 'rpt-estado' && typeof renderDashboardGerencial === 'function') {
        setTimeout(() => renderDashboardGerencial(), 80);
      }

      // Vista Facturación
      if (id === 'facturacion' && typeof renderFacturacion === 'function') {
        setTimeout(() => renderFacturacion(), 50);
      }

      // ── REPORTES FINANCIEROS NUEVOS ─────────────────────────────
      // Los 5 reportes del menú REPORTES (excepto rpt-estado) ahora
      // muestran información institucional (MSP / IESS / ISSFA-ISSPOL
      // / SPPAT / Expedientes). El HTML se construye dinámicamente
      // a partir de window.RPT (datos) y window.RPT.render (plantillas).
      if (window.RPT && window.RPT.render) {
        const slot = {
          'rpt-lotes':       { cont: 'rpt-msp-content',           fn: 'msp' },
          'rpt-hospital':    { cont: 'rpt-iess-content',          fn: 'iess' },
          'rpt-valores':     { cont: 'rpt-issfa-isspol-content',  fn: 'issfa_isspol' },
          'rpt-apelaciones': { cont: 'rpt-sppat-content',         fn: 'sppat' },
          'rpt-glosas':      { cont: 'rpt-expedientes-content',   fn: 'expedientes' },
        }[id];
        if (slot) {
          const el = document.getElementById(slot.cont);
          if (el && typeof window.RPT.render[slot.fn] === 'function') {
            el.innerHTML = window.RPT.render[slot.fn]();
          }
        }
      }
    } catch (e) {
      console.error('[router] error al renderizar', id, e);
    }

    // Disparar un evento que otras piezas puedan escuchar si quieren
    document.dispatchEvent(new CustomEvent('view:mounted', { detail: { id: id } }));
  }

  // Clicks en el sidebar
  function cablearMenu() {
    document.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const v = a.dataset.view;
        if (!v) return;
        // Actualizar el hash (no recarga la página, útil para file://)
        if (window.location.hash !== '#' + v) {
          // Usamos history.replaceState para evitar que el navegador
          // intente resolver file://...#xxx como archivo nuevo.
          try { history.replaceState(null, '', '#' + v); } catch(_) {
            window.location.hash = v;
          }
        }
        montarVista(v);
      });
    });
  }

  // Reacción a cambios manuales de hash (enlaces externos, back/forward)
  window.addEventListener('hashchange', function () {
    const id = (window.location.hash || '').replace(/^#/, '');
    if (id && id !== vistaActual) montarVista(id);
  });

  // Arranque — cuando el DOM está listo y app.js ya inicializó DB
  function arranque() {
    cablearMenu();
    // Vista inicial según hash o dashboard por defecto
    const hash = (window.location.hash || '').replace(/^#/, '');
    montarVista(hash || DEFAULT_VIEW);
  }

  // app.js arranca en DOMContentLoaded con inicializarNav() +
  // renders + etc. Queremos montar la vista después, para que DB
  // esté lista. Usamos un microtask después de DOMContentLoaded:
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(arranque, 0));
  } else {
    setTimeout(arranque, 0);
  }

  // Exponer para debugging o llamadas manuales
  window.__router = { montar: montarVista };
})();
