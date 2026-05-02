#!/usr/bin/env python3
"""
Regenera views/<id>/view.js a partir del HTML actual de
views/<id>/view.html. Úsalo tras editar manualmente un view.html.

Uso:
  python3 regenerar_view_js.py              # regenera TODOS los view.js
  python3 regenerar_view_js.py dashboard    # regenera solo uno
  python3 regenerar_view_js.py listado oficios   # regenera varios
"""
import os, re, json, sys

VIEWS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "views")

ETIQUETAS = {
    "dashboard":       "Dashboard",
    "listado":         "Trámites",
    "nuevo":           "Nuevo / Consultar Trámite",
    "rpt-lotes":       "Reporte por Lotes",
    "rpt-hospital":    "Reporte por Hospital",
    "rpt-valores":     "Valores / Resumen",
    "rpt-apelaciones": "Apelaciones",
    "rpt-glosas":      "Glosas y Objeciones",
    "rpt-estado":      "Resumen Gerencial",
    "facturacion":     "Facturación",
    "oficios":         "Generador de Oficios",
    "consulta":        "Consulta",
    "rpt-oficios":     "Reporte de Oficios",
}

def regenerar(vid):
    if vid not in ETIQUETAS:
        print(f"  [error] '{vid}' no es una vista conocida.")
        return False
    carpeta = os.path.join(VIEWS_DIR, vid)
    html_path = os.path.join(carpeta, "view.html")
    js_path   = os.path.join(carpeta, "view.js")
    if not os.path.isfile(html_path):
        print(f"  [error] no existe {html_path}")
        return False
    with open(html_path, "r", encoding="utf-8") as f:
        raw = f.read()
    # quitar comentario documental inicial (si lo hay)
    fragmento = re.sub(r'^\s*<!--.*?-->\s*', '', raw, count=1, flags=re.DOTALL).strip()
    label = ETIQUETAS[vid]
    html_js = json.dumps(fragmento, ensure_ascii=False)
    view_js = (
        f"/* ================================================================\n"
        f"   {label} — HTML empaquetado\n"
        f"   Carpeta: views/{vid}\n"
        f"   Generado automáticamente por regenerar_view_js.py\n"
        f"   ================================================================ */\n"
        f"window.PORTAL_VIEWS = window.PORTAL_VIEWS || {{}};\n"
        f"window.PORTAL_VIEWS[{json.dumps(vid)}] = {html_js};\n"
    )
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(view_js)
    print(f"  OK  views/{vid}/view.js   ({len(fragmento)} chars de HTML)")
    return True

if __name__ == "__main__":
    ids = sys.argv[1:] if len(sys.argv) > 1 else list(ETIQUETAS.keys())
    todos_ok = True
    for vid in ids:
        if not regenerar(vid):
            todos_ok = False
    print("Listo." if todos_ok else "Con errores.")
    sys.exit(0 if todos_ok else 1)
