# Portal JBG / Convenios IESS

## Cómo ejecutarlo

**Haz doble clic en `index.html`.** Se abrirá en tu navegador y todas
las opciones del menú funcionarán correctamente sin necesidad de
servidor web. No te saldrá el mensaje "Vista no disponible".

> Nota: si quieres servirlo por HTTP (recomendado en un entorno
> compartido o productivo) puedes seguir usando cualquier servidor
> estático: `python -m http.server`, `npx serve`, etc. El portal
> funciona igual en ambos modos.

---

## Estructura de carpetas

```
portal/
├── index.html                       ← Único HTML que abre el usuario
│
├── assets/
│   ├── css/
│   │   ├── styles.css               ← Estilos globales (sidebar, tablas, KPIs…)
│   │   └── dashboard_gerencial.css  ← Estilos del resumen gerencial
│   ├── js/
│   │   ├── app.js                   ← Lógica principal (DB, renders, exportación…)
│   │   ├── dashboard_gerencial.js   ← Lógica del resumen gerencial
│   │   └── router.js                ← NUEVO: navegación entre vistas
│   └── img/
│       └── logo-menu.png
│
└── views/
    ├── dashboard/           ← GESTIÓN ▸ Dashboard
    │   ├── view.html        ← HTML de la vista (editable a mano)
    │   ├── view.js          ← El mismo HTML empaquetado como JS
    │   └── view.css         ← Estilos específicos de esta vista
    ├── listado/             ← GESTIÓN ▸ Trámites
    ├── nuevo/               ← GESTIÓN ▸ Nuevo / Consultar Trámite
    ├── rpt-lotes/           ← REPORTES ▸ Reporte por Lotes
    ├── rpt-hospital/        ← REPORTES ▸ Por Hospital
    ├── rpt-valores/         ← REPORTES ▸ Valores / Resumen
    ├── rpt-apelaciones/     ← REPORTES ▸ Apelaciones
    ├── rpt-glosas/          ← REPORTES ▸ Glosas y Objeciones
    ├── rpt-estado/          ← REPORTES ▸ Resumen Gerencial
    ├── oficios/             ← DOCUMENTOS ▸ Generador de Oficios
    ├── consulta/            ← Consulta auxiliar
    └── rpt-oficios/         ← DOCUMENTOS ▸ Reporte de Oficios
```

Cada carpeta de `views/` contiene **su propio HTML, CSS y JS**, y el
portal sigue siendo **uno solo**: todo se navega desde el mismo
`index.html` raíz.

---

## ¿Cómo se conectan?

1. Al abrir `index.html`, el navegador carga:
   - Los CSS globales y los 12 `views/<id>/view.css`.
   - Los 12 `views/<id>/view.js`. Cada uno registra el HTML de su
     vista en `window.PORTAL_VIEWS[<id>]`.
   - `assets/js/router.js` — el que maneja los clics del menú.
   - `assets/js/app.js` y `dashboard_gerencial.js` — toda la lógica
     del sistema original, intacta.

2. Cuando haces clic en una opción del menú:
   - El router toma el HTML correspondiente desde
     `window.PORTAL_VIEWS` y lo inyecta en `#views-container`.
   - Actualiza la URL con un `#` (por ejemplo `#listado`) así el
     portal recuerda dónde estabas si recargas.
   - Llama al render correspondiente de `app.js`
     (`renderDashboard`, `renderTablaTramites`, etc.).

### ¿Por qué empaquetar el HTML como `.js`?

Porque es la **única técnica** que permite que un `index.html`
cargue otros HTML separados funcionando con **doble clic**
(protocolo `file://`). Los navegadores bloquean por seguridad las
llamadas `fetch()` a archivos `.html` locales, pero sí permiten
cargar `.js` locales vía `<script src="">`. Al envolver el HTML
en un string JS (`window.PORTAL_VIEWS['x'] = "<section>…</section>"`)
obtenemos lo mejor de los dos mundos: archivos separados por vista
**y** funcionamiento sin servidor.

---

## Editar una vista

### Solo CSS o solo JS
Edita directamente `views/<id>/view.css` o añade código en
`views/<id>/view.js` (después del `window.PORTAL_VIEWS[...]=...`).
Los cambios aplican al recargar la página.

### Modificar el HTML de una vista
1. Edita `views/<id>/view.html`.
2. Regenera el `view.js` con el script incluido:
   ```bash
   python3 regenerar_view_js.py <id>
   ```
   O regenera todos a la vez:
   ```bash
   python3 regenerar_view_js.py
   ```
   (Este script solo vuelve a empaquetar el HTML editado dentro
   del `view.js` de cada carpeta. No toca nada más.)

---

## ¿Qué se mantuvo intacto?

- Todo el `styles.css` y `dashboard_gerencial.css` (byte por byte).
- Toda la lógica de datos, renders, gráficos, filtros, export CSV,
  oficios, etc. — se mantuvo en `app.js`. Los únicos cambios son:
  el arranque ya no dispara renders de vistas que no están en el
  DOM y `navegarA()` delega al router cuando éste está presente.
  Si el router no se carga, `app.js` mantiene su comportamiento SPA
  antiguo como fallback.
- Los 12 fragmentos HTML de las vistas se preservan carácter por
  carácter con respecto al `index.html` monolítico original.
