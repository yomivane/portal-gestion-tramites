/* ================================================================
   reports-data.js
   ----------------------------------------------------------------
   Datos transcritos directamente de los reportes oficiales
   (imágenes "Pivot_Convenios" del usuario). Valores en miles US$
   excepto en los reportes de Anticipo y Expedientes.

   NOTA: cuando una celda aparece con "*****" en la imagen original
   significa que el ancho de columna no permitía mostrar el número
   en Excel; en ese caso ponemos 0 o lo que la imagen permita
   inferir. Algunos valores se completan con null (espacio vacío).
   ================================================================ */
window.RPT = window.RPT || {};

/* ─────────── 1) MSP — Saldos por Cobrar Netos ─────────── */
window.RPT.msp = {
  titulo: "MINISTERIO DE SALUD PÚBLICA",
  subtitulo: "SALDOS POR COBRAR NETOS",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  // 19 columnas
  cols: ['2010','2012','2013','2014','2015','2012-2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2016-2026','Total'],
  acumIdx: [5, 17],   // índices de columnas acumuladas (verde lima)
  filas: [
    // Cada fila tiene EXACTAMENTE 19 valores (uno por columna)
    { lbl: "No Auditado (Primera auditoría)",
      val: [null, null, 205, 404, null, 609, null, 5, 112, 463, 108, 319, 320, 894, 132, 369, 924, 3645, 4254] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [null, null, 201, 257, 0, 458, null, 4284, 6867, 5291, 4146, 4488, 3432, 1504, 1294, 922, 1091, 33318, 33775] },
    { lbl: "Total no auditado", total: true,
      val: [null, null, 406, 661, 0, 1066, null, 4284, 6872, 5403, 4609, 4596, 3751, 1823, 2187, 1054, 1460, 36963, 38029] },
    { lbl: "Total en proceso, cierre, detalle y respuesta de objeciones", total: true,
      val: [-128, null, null, 9, null, -120, null, 6, 221, 247, 479, 1787, 3877, 6580, 22020, 36566, null, 71783, 71663] },
    { lbl: "SALDO NETO POR COBRAR AL MSP", saldo: true,
      val: [-128, null, 406, 669, 0, 947, 4284, 6878, 5624, 4856, 5075, 5539, 5700, 8767, 23073, 38026, 924, 108746, 109692] },
  ]
};

/* ─────────── 2) IESS — Saldos por Cobrar (3 secciones) ─────────── */
// Imagen 2 + imagen 3 (Individual y Familiar) + imagen 4 (Campesino)
// Usamos cols comunes: 2012..2015, 2012-2015, 2016..2026, 2016-2026, Total
const IESS_COLS = ['2012','2013','2014','2015','2012-2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2016-2026','Total'];
const IESS_ACUM = [4, 16];

window.RPT.iess_general = {
  titulo: "INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL",
  subtitulo: "SALDOS POR COBRAR NETOS — IESS GENERAL (CONVENIO)",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: IESS_COLS, acumIdx: IESS_ACUM,
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [533, 77617, 42314, 31052, 151576, 2783, 1454, 759, 951, 598, 764, 349, 1402, 2524, 32206, 5619, 49410, null] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [3332, 2499, 4764, 3437, 14032, 3369, 5078, 516, 840, 661, 1556, 1109, 1443, 1929, 299, null, 16778, 30811] },
    { lbl: "Total no auditado", total: true,
      val: [3925, 80116, null, 34490, null, 6152, 6531, 1274, 1792, 1258, 2320, 1458, 2825, 4453, null, 5619, 66188, null] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [42, 75, 203, 1361, 1681, 1130, 85, 192, 574, 82, 176, 170, 128, 1538, 3498, null, 7573, 9254] },
    { lbl: "Pre - Liquidación (Anticipo) 80% – 90%",
      val: [-3680, null, -39105, -22249, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
    { lbl: "Saldos neto por cobrar IESS", saldo: true,
      val: [288, 4097, 8176, 13602, 26162, 6617, 1466, 2366, 1340, 2496, 1628, 2953, 5990, null, null, 5619, 73761, 99924] },
  ]
};

window.RPT.iess_indfam = {
  titulo: "INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL",
  subtitulo: "SALDOS POR COBRAR NETOS — SEGURO INDIVIDUAL Y FAMILIAR",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: IESS_COLS, acumIdx: IESS_ACUM,
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [138, 73460, 40611, 29231, 143441, 456, 129, 496, 554, 244, 187, 276, 138, 801, 27232, 5163, 35677, 179118] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [3087, 2450, 4759, 3406, 13701, 3300, 4423, 261, 746, 443, 1377, 920, 1166, 1888, 299, null, 14822, 28524] },
    { lbl: "Total no auditado", total: true,
      val: [3225, 75910, 45370, 32637, 157142, 3755, 4552, 757, 1300, 688, 1564, 1196, 1304, 2689, 27531, 5163, 50499, 207642] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [null, 124, 199, 1195, 1518, 1096, 55, 114, 279, 78, 92, 11, 71, 1473, 3232, null, 6501, 8019] },
    { lbl: "Pre - Liquidación (Anticipo) 80% – 90%",
      val: [-3318, -73183, -38751, -21697, -136949, null, null, null, null, null, null, null, null, null, null, null, null, -136949] },
    { lbl: "Saldos neto por cobrar IESS – SSIF", saldo: true,
      val: [-93, 2851, 6818, 12135, 21712, 4852, 4607, 872, 1579, 765, 1656, 1206, 1375, 4162, 30763, 5163, 57000, 78712] },
  ]
};

window.RPT.iess_camp = {
  titulo: "INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL",
  subtitulo: "SALDOS POR COBRAR NETOS — SEGURO SOCIAL CAMPESINO",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: IESS_COLS, acumIdx: IESS_ACUM,
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [455, 4157, 1703, 1821, 8135, 2327, 1325, 263, 397, 353, 578, 73, 1264, 1722, 4974, 456, 13733, 21868] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [245, 49, 6, 31, 331, 70, 655, 254, 94, 217, 179, 189, 257, 41, null, null, 1956, 2287] },
    { lbl: "Total no auditado", total: true,
      val: [700, 4205, 1709, 1852, 8466, 2397, 1979, 517, 491, 571, 756, 262, 1521, 1764, 4974, 456, 15689, 24155] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [42, -49, 4, 166, 163, 34, 30, 78, 296, 4, 84, 160, 57, 65, 265, null, 1072, 1235] },
    { lbl: "Pre - Liquidación (Anticipo) 80% – 90%",
      val: [-362, -2910, -354, -552, -4178, null, null, null, null, null, null, null, null, null, null, null, null, -4178] },
    { lbl: "Saldos neto por cobrar IESS – SSC", saldo: true,
      val: [380, 1246, 1358, 1467, 4451, 2431, 2010, 595, 787, 574, 840, 422, 1578, 1829, 5239, 456, 16761, 21212] },
  ]
};

/* ─────────── 3) ISSFA — Fuerzas Armadas ─────────── */
// Imagen 5 — incluye 2010 vacío al inicio
window.RPT.issfa = {
  titulo: "INSTITUTO DE SEGURIDAD SOCIAL DE LAS FUERZAS ARMADAS",
  subtitulo: "SALDOS POR COBRAR NETOS — ISSFA",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: ['2013','2014','2015','2012-2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2016-2026','Total'],
  acumIdx: [3, 15],
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [null, null, null, null, null, 26, 286, null, 56, null, null, null, 52, 452, 126, 998, 998] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [34, 6, 2, 42, 16, 27, 218, null, 3, 80, 0, 14, 45, 41, null, 446, 488] },
    { lbl: "Total no auditado", total: true,
      val: [34, 6, 2, 42, 16, 53, 504, null, 59, 80, null, 14, 97, 494, 126, 1444, 1486] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [null, null, null, null, 11, null, null, null, null, null, null, null, 15, 52, null, 77, 77] },
    { lbl: "Saldos neto por cobrar ISSFA", saldo: true,
      val: [34, 6, 2, 42, 26, 53, 504, null, 59, 80, null, 14, 112, 546, 126, 1521, 1564] },
  ]
};

/* ─────────── 4) ISSPOL — Policía ─────────── */
// Imagen 6
window.RPT.isspol = {
  titulo: "INSTITUTO DE SEGURIDAD SOCIAL DE LA POLICÍA",
  subtitulo: "SALDOS POR COBRAR NETOS — ISSPOL",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: ['2012-2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2016-2026','Total'],
  acumIdx: [0, 12],
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [null, 42, 146, 215, 276, 9, 8, null, 3, 2, 157, 43, 901, 901] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [null, 1, 60, 69, 86, 41, 124, 12, 48, 76, 50, null, 567, 567] },
    { lbl: "Total no auditado", total: true,
      val: [null, 43, 206, 284, 361, 50, 132, 12, 52, 79, 207, 43, 1468, 1468] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [null, 1, 0, null, null, null, null, null, 15, 9, 114, null, 139, 139] },
    { lbl: "Saldos neto por cobrar ISSPOL", saldo: true,
      val: [null, 44, 206, 284, 361, 50, 132, 13, 67, 87, 320, 43, 1606, 1606] },
  ]
};

/* ─────────── 5) SPPAT — Accidentes de Tránsito ─────────── */
// Imagen 7
window.RPT.sppat = {
  titulo: "SEGURO PÚBLICO PARA PAGO DE ACCIDENTES DE TRÁNSITO",
  subtitulo: "SALDOS POR COBRAR NETOS — SPPAT",
  fecha: "viernes, 24 de abril de 2026",
  unidad: "Expresado en miles US$",
  cols: ['2015','2012-2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2016-2026','Total'],
  acumIdx: [1, 13],
  filas: [
    { lbl: "No Auditado (Primera auditoría)",
      val: [6, 6, 18, 47, 305, 68, 40, null, 1, 1102, 6166, 3488, 77, 11311, 11316] },
    { lbl: "No Auditado Levantamiento (Segunda auditoría)",
      val: [null, null, 7, 71, 27, 29, 99, 3, 5, null, 97, 8, null, 345, 345] },
    { lbl: "Total no auditado", total: true,
      val: [6, 6, 24, 118, 332, 97, 139, 3, 6, 1102, 6263, 3495, 77, 11656, 11662] },
    { lbl: "Total en proceso de respuesta de objeciones", total: true,
      val: [null, null, null, 154, 218, 11, 0, null, 1, 1, 60, 16, null, 462, 462] },
    { lbl: "Saldos neto por cobrar SPPAT", saldo: true,
      val: [6, 6, 24, 272, 550, 108, 139, 3, 7, 1103, 6322, 3511, 77, 12118, 12124] },
  ]
};

/* ─────────── 6) Anticipos (IESS y MSP) ─────────── */
// Imagen 8 (IESS) y 9 (MSP)
window.RPT.anticipo_iess = {
  entidad: "INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL",
  fecha: "viernes, 24 de abril de 2026",
  periodo1: { titulo: "Periodo 1", filas: [
    ["marzo / 2024",     0],
    ["abril / 2024",     0],
    ["mayo / 2024",      792829.28],
    ["junio / 2024",     1245662.50],
    ["julio / 2024",     500914.52],
    ["agosto / 2024",    10096996.29],
    ["septiembre / 2024", 9887408.86],
    ["octubre / 2024",   10349993.79],
    ["noviembre / 2024", 4548934.15],
    ["diciembre / 2024", 2903691.24],
    ["enero / 2025",     3967592.62],
    ["febrero / 2025",   4834993.42]
  ], total: 49129016.68, lblTotal: "Pagos Año 1" },
  periodo2: { titulo: "Periodo 2", filas: [
    ["marzo / 2025",     4155288.50],
    ["abril / 2025",     3873518.73],
    ["mayo / 2025",      5184867.15],
    ["junio / 2025",     3414835.76],
    ["julio / 2025",     5586745.73],
    ["agosto / 2025",    9231.59],
    ["septiembre / 2025", 1293030.37],
    ["octubre / 2025",   5827433.39],
    ["noviembre / 2025", 4441034.50],
    ["diciembre / 2025", 7588285.33],
    ["enero / 2026",     267643.48],
    ["febrero / 2026",   0]
  ], total: 41641914.53, lblTotal: "Pagos Último Año" },
  total_general: 90770931.21,
  porcentaje: 60,
  anticipo_max: 24985148.72
};

window.RPT.anticipo_msp = {
  entidad: "MINISTERIO DE SALUD PÚBLICA",
  fecha: "viernes, 24 de abril de 2026",
  periodo1: { titulo: "Periodo 1", filas: [
    ["marzo / 2024",     0],
    ["abril / 2024",     0],
    ["mayo / 2024",      0],
    ["junio / 2024",     0],
    ["julio / 2024",     15999994.68],
    ["agosto / 2024",    0],
    ["septiembre / 2024", 207015.58],
    ["octubre / 2024",   7984281.20],
    ["noviembre / 2024", 90983.83],
    ["diciembre / 2024", 10266310.19],
    ["enero / 2025",     0],
    ["febrero / 2025",   3195.79]
  ], total: 34551781.27, lblTotal: "Pagos Año 1" },
  periodo2: { titulo: "Periodo 2", filas: [
    ["marzo / 2025",     4498312.00],
    ["abril / 2025",     1108426.85],
    ["mayo / 2025",      2436.50],
    ["junio / 2025",     2019342.74],
    ["julio / 2025",     0],
    ["agosto / 2025",    0],
    ["septiembre / 2025", 0],
    ["octubre / 2025",   0],
    ["noviembre / 2025", 0],
    ["diciembre / 2025", 0],
    ["enero / 2026",     0],
    ["febrero / 2026",   5461.08]
  ], total: 7633979.17, lblTotal: "Pagos Último Año" },
  total_general: 42185760.44,
  porcentaje: 60,
  anticipo_max: 4580387.50
};

/* ─────────── 7) Expedientes por Financiador ─────────── */
// Imagen 10
window.RPT.expedientes = {
  titulo: "Expedientes presentados por año",
  subtitulo: "POR FINANCIADOR",
  fecha: "viernes, 24 de abril de 2026",
  anios: [
    { anio: 2023, prevAnio: 2022,
      meses: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
      filas: [
        { conv: "IESS",    val: [4406,4500,4098,4776,4438,4881,4879,4436,4854,4615,3555,3095], total: 52533, totalPrev: 49236, var: 7  },
        { conv: "MSP",     val: [1651,1608,1462,1651,1532,1641,1557,1440,1535,1470,1491,1530], total: 18568, totalPrev: 20522, var: -10 },
        { conv: "ISSFA",   val: [906,952,773,857,758,786,730,703,842,541,297,374],            total: 8519,  totalPrev: 8972,  var: -5  },
        { conv: "ISSPOL",  val: [275,314,267,318,278,276,258,212,293,311,206,210],            total: 3218,  totalPrev: 3360,  var: -4  },
        { conv: "SPPAT",   val: [67,81,37,45,44,42,42,49,52,69,61,68],                        total: 657,   totalPrev: 756,   var: -13 },
      ],
      totales: { val: [7305,7455,6637,7647,7050,7626,7466,6840,7576,7006,5610,5277], total: 83495, totalPrev: 82846, var: 1 }
    },
    { anio: 2024, prevAnio: 2023,
      meses: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
      filas: [
        { conv: "IESS",    val: [2970,3229,3183,3236,3314,3442,3138,2354,2264,2301,2422,2317], total: 34170, totalPrev: 52533, var: -35 },
        { conv: "MSP",     val: [1539,1481,1607,1672,1881,1939,2021,2045,1921,1684,1884,1749], total: 21423, totalPrev: 18568, var: 15  },
        { conv: "ISSFA",   val: [650,573,525,531,708,708,616,651,666,573,575,509],             total: 7285,  totalPrev: 8519,  var: -14 },
        { conv: "ISSPOL",  val: [225,185,232,211,278,271,238,322,329,237,176,115],             total: 2819,  totalPrev: 3218,  var: -12 },
        { conv: "SPPAT",   val: [63,65,52,68,81,89,96,102,90,111,139,122],                     total: 1078,  totalPrev: 657,   var: 64  },
      ],
      totales: { val: [5447,5533,5599,5718,6262,6449,6109,5474,5270,4906,5196,4812], total: 66775, totalPrev: 83495, var: -20 }
    }
  ]
};

/* ────────── Helper de formato (miles US$) ─────────── */
window.RPT.fmt = function(v) {
  if (v === null || v === undefined || v === '') return '';
  if (typeof v !== 'number') return String(v);
  if (v === 0) return '0';
  const neg = v < 0;
  const n = Math.abs(v);
  const txt = n.toLocaleString('es-EC', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                .replace(/,/g, '.'); // estilo europeo (puntos)
  return neg ? '(' + txt + ')' : txt;
};

window.RPT.fmtMoney = function(v) {
  if (v === null || v === undefined) return '$ -';
  if (v === 0) return '$ -';
  return '$ ' + v.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
