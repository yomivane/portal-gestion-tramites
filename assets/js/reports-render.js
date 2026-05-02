/* ================================================================
   reports-render.js
   ----------------------------------------------------------------
   Funciones que construyen el HTML interno de los 5 reportes
   nuevos (cabecera institucional, tabla, fila de saldo, etc.)
   a partir de los datos en window.RPT.

   Cada función recibe el id del contenedor donde insertar.
   ================================================================ */

(function () {
  'use strict';
  const RPT = window.RPT;
  if (!RPT) return;

  /* ── helper: render de UNA tabla de saldos (MSP, IESS_*, ISSFA, ISSPOL, SPPAT) ── */
  function renderSaldos(rep) {
    let html = '';
    // Cabecera institucional (logo + título + meta)
    html += '<div class="rpt-fin-card">';
    html += '  <div class="rpt-fin-header">';
    html += '    <div class="rpt-fin-logo"></div>';
    html += '    <div class="rpt-fin-titles">';
    html += '      <div class="ent">JUNTA DE BENEFICENCIA DE GUAYAQUIL</div>';
    html += '      <div class="sub">' + rep.titulo + '</div>';
    html += '      <div class="sub" style="margin-top:2px">' + rep.subtitulo + '</div>';
    html += '      <div class="meta">' + rep.fecha + ' · <strong>' + rep.unidad + '</strong></div>';
    html += '    </div>';
    html += '  </div>';
    // Tabla
    html += '  <div class="scroll-x"><table class="tbl-fin"><thead><tr>';
    html += '    <th>Descripción</th>';
    rep.cols.forEach((c, i) => {
      const isAcum = rep.acumIdx.indexOf(i) >= 0;
      const isTotal = (i === rep.cols.length - 1);
      html += '    <th class="' + (isAcum ? 'col-acum' : '') + (isTotal ? ' col-total' : '') + '">' + c + '</th>';
    });
    html += '  </tr></thead><tbody>';
    rep.filas.forEach(f => {
      const cls = f.saldo ? 'row-saldo' : (f.total ? 'row-total' : '');
      html += '<tr class="' + cls + '">';
      html += '  <td>' + f.lbl + '</td>';
      f.val.forEach((v, i) => {
        const isAcum = rep.acumIdx.indexOf(i) >= 0;
        const isTotal = (i === rep.cols.length - 1);
        const txt = RPT.fmt(v);
        const isNeg = (typeof v === 'number' && v < 0);
        const cellCls = (isAcum ? 'col-acum' : '') + (isTotal ? ' col-total' : '') + (isNeg ? ' neg' : '') + (txt === '' ? ' empty' : '');
        html += '<td class="' + cellCls + '">' + (txt || '—') + '</td>';
      });
      html += '</tr>';
    });
    html += '  </tbody></table></div>';
    html += '</div>';
    return html;
  }

  /* ── render de un reporte de ANTICIPO (IESS o MSP) ── */
  function renderAnticipo(rep) {
    let html = '';
    html += '<div class="rpt-fin-card">';
    html += '  <div class="rpt-fin-header">';
    html += '    <div class="rpt-fin-logo"></div>';
    html += '    <div class="rpt-fin-titles">';
    html += '      <div class="ent">JUNTA DE BENEFICENCIA DE GUAYAQUIL</div>';
    html += '      <div class="sub">' + rep.entidad + '</div>';
    html += '      <div class="sub" style="margin-top:2px">CÁLCULO PARA OBTENCIÓN DE ANTICIPO</div>';
    html += '      <div class="meta">' + rep.fecha + '</div>';
    html += '    </div>';
    html += '  </div>';

    // Grilla 3 columnas: Periodo 1 | Periodo 2 | Total General
    html += '<div class="rpt-anticipo-grid">';

    // Helper para renderizar un periodo
    function renderPeriodo(p) {
      let h = '<div class="col-period">';
      h += '<div class="col-head">' + p.titulo + '</div>';
      h += '<div class="col-subh"><div>mes y año</div><div>valor</div></div>';
      p.filas.forEach(f => {
        h += '<div class="col-row"><div>' + f[0] + '</div><div>' + RPT.fmtMoney(f[1]) + '</div></div>';
      });
      // Fila de subtotal
      h += '<div class="col-row" style="background:#dcfce7;font-weight:700;color:#14532d;border-top:2px solid #14532d">';
      h += '  <div>' + p.lblTotal + '</div><div>' + RPT.fmtMoney(p.total) + '</div>';
      h += '</div>';
      h += '</div>';
      return h;
    }

    html += renderPeriodo(rep.periodo1);
    html += renderPeriodo(rep.periodo2);

    // Tercera columna: Total General
    html += '<div class="col-period">';
    html += '<div class="col-head">TOTAL GENERAL</div>';
    html += '<div class="col-subh"><div></div><div></div></div>';
    // Mostramos para cada mes la suma de Periodo1[i] + Periodo2[i]
    for (let i = 0; i < rep.periodo1.filas.length; i++) {
      const v = (rep.periodo1.filas[i][1] || 0) + (rep.periodo2.filas[i][1] || 0);
      html += '<div class="col-row"><div></div><div>' + RPT.fmtMoney(v) + '</div></div>';
    }
    html += '<div class="col-row" style="background:#1e3a8a;color:#fff;font-weight:700;border-top:2px solid #fff">';
    html += '  <div>TOTAL GENERAL</div><div>' + RPT.fmtMoney(rep.total_general) + '</div>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    // Bloque final: %  → Anticipo máximo
    html += '<div class="rpt-anticipo-final">';
    html += '  <div style="display:flex;align-items:center;gap:14px">';
    html += '    <div class="pct-chip">' + rep.porcentaje + '%</div>';
    html += '    <div>';
    html += '      <div class="anticipo-lab">Máximo anticipo último año</div>';
    html += '      <div class="anticipo-val">' + RPT.fmtMoney(rep.anticipo_max) + '</div>';
    html += '    </div>';
    html += '  </div>';
    html += '  <div style="font-size:11px;color:#5a4a08;max-width:480px;text-align:right;line-height:1.5">';
    html += '    <strong>Acuerdo Ministerial 0217 - 2018 · Art. 6 Mecanismos de pago · Numeral 2 Literal a.2:</strong> ';
    html += '    El monto a entregar como pago anticipado no podrá ser superior al 60% de lo efectivamente pagado por el último año de servicios.';
    html += '  </div>';
    html += '</div>';

    html += '</div>'; // /card
    return html;
  }

  /* ── render del reporte de Expedientes por Financiador ── */
  function renderExpedientes(rep) {
    let html = '';
    html += '<div class="rpt-fin-card">';
    html += '  <div class="rpt-fin-header">';
    html += '    <div class="rpt-fin-logo"></div>';
    html += '    <div class="rpt-fin-titles">';
    html += '      <div class="ent">JUNTA DE BENEFICENCIA DE GUAYAQUIL</div>';
    html += '      <div class="sub">' + rep.titulo + '</div>';
    html += '      <div class="sub" style="margin-top:2px">' + rep.subtitulo + '</div>';
    html += '      <div class="meta">' + rep.fecha + '</div>';
    html += '    </div>';
    html += '  </div>';

    rep.anios.forEach(blk => {
      html += '<div class="exp-year-band">' + blk.anio + '</div>';
      html += '<div class="scroll-x"><table class="tbl-exp"><thead><tr>';
      html += '  <th>CONVENIO</th>';
      blk.meses.forEach(m => {
        html += '<th>' + m + '-' + blk.anio + '</th>';
      });
      html += '<th class="col-tot">Total Año ' + blk.anio + '</th>';
      html += '<th class="col-tot-prev">Total Año ' + blk.prevAnio + '</th>';
      html += '<th>Variación</th>';
      html += '</tr></thead><tbody>';

      blk.filas.forEach(f => {
        html += '<tr>';
        html += '<td>' + f.conv + '</td>';
        f.val.forEach(v => {
          html += '<td>' + v.toLocaleString('es-EC') + '</td>';
        });
        html += '<td class="col-tot">' + f.total.toLocaleString('es-EC') + '</td>';
        html += '<td class="col-tot-prev">' + f.totalPrev.toLocaleString('es-EC') + '</td>';
        // Variación con flecha
        const arrow = f.var > 0 ? '▲' : (f.var < 0 ? '▼' : '►');
        const cls = f.var > 0 ? 'var-up' : (f.var < 0 ? 'var-down' : 'var-flat');
        html += '<td class="' + cls + '">' + arrow + ' ' + f.var + '%</td>';
        html += '</tr>';
      });

      // Fila Totales
      const t = blk.totales;
      html += '<tr class="row-total">';
      html += '<td>Totales</td>';
      t.val.forEach(v => {
        html += '<td>' + v.toLocaleString('es-EC') + '</td>';
      });
      html += '<td>' + t.total.toLocaleString('es-EC') + '</td>';
      html += '<td>' + t.totalPrev.toLocaleString('es-EC') + '</td>';
      const arrow = t.var > 0 ? '▲' : (t.var < 0 ? '▼' : '►');
      html += '<td>' + arrow + ' ' + t.var + '%</td>';
      html += '</tr>';

      html += '</tbody></table></div>';
    });

    html += '</div>';
    return html;
  }

  /* ── KPIs de cabecera para los reportes ── */
  function renderKPIs(items) {
    let h = '<div class="rpt-kpis">';
    items.forEach(k => {
      h += '<div class="rpt-kpi-card ' + (k.tono || '') + '">';
      h += '  <div class="lbl">' + k.lbl + '</div>';
      h += '  <div class="val">' + k.val + '</div>';
      if (k.sub) h += '  <div class="sub">' + k.sub + '</div>';
      h += '</div>';
    });
    h += '</div>';
    return h;
  }

  // Exponer
  window.RPT.render = {
    saldos: renderSaldos,
    anticipo: renderAnticipo,
    expedientes: renderExpedientes,
    kpis: renderKPIs,

    /* — Render compuestos por reporte del menú — */
    msp: function () {
      let h = '';
      // KPIs basados en saldos del MSP
      const msp = RPT.msp;
      const saldoTotal = msp.filas.find(f => f.saldo).val.slice(-1)[0];
      const saldoNuevo = msp.filas.find(f => f.saldo).val[msp.acumIdx[1]];
      const saldoHist  = msp.filas.find(f => f.saldo).val[msp.acumIdx[0]];
      h += renderKPIs([
        { lbl: "Saldo Total a Cobrar (miles US$)", val: RPT.fmt(saldoTotal), tono: "kpi-dorado", sub: "Acumulado 2010-2026" },
        { lbl: "Saldo 2016 - 2026",                val: RPT.fmt(saldoNuevo), tono: "",            sub: "Período activo" },
        { lbl: "Saldo Histórico 2012 - 2015",      val: RPT.fmt(saldoHist),  tono: "kpi-naranja", sub: "Pendiente histórico" },
      ]);
      h += renderSaldos(msp);
      h += '<div class="rpt-fin-band">Cálculo para Obtención de Anticipo — MSP</div>';
      h += renderAnticipo(RPT.anticipo_msp);
      return h;
    },

    iess: function () {
      let h = '';
      const g = RPT.iess_general;
      const saldoG = g.filas.find(f => f.saldo).val.slice(-1)[0];
      const saldoIF = RPT.iess_indfam.filas.find(f => f.saldo).val.slice(-1)[0];
      const saldoSC = RPT.iess_camp.filas.find(f => f.saldo).val.slice(-1)[0];
      h += renderKPIs([
        { lbl: "IESS General — Saldo (miles US$)",    val: RPT.fmt(saldoG),  tono: "kpi-dorado" },
        { lbl: "Individual y Familiar (SSIF)",         val: RPT.fmt(saldoIF), tono: "" },
        { lbl: "Seguro Social Campesino (SSC)",        val: RPT.fmt(saldoSC), tono: "kpi-verde" },
      ]);
      h += '<div class="rpt-fin-band">Convenio General · IESS</div>';
      h += renderSaldos(g);
      h += '<div class="rpt-fin-band">Seguro Individual y Familiar · SSIF</div>';
      h += renderSaldos(RPT.iess_indfam);
      h += '<div class="rpt-fin-band">Seguro Social Campesino · SSC</div>';
      h += renderSaldos(RPT.iess_camp);
      h += '<div class="rpt-fin-band">Cálculo para Obtención de Anticipo — IESS</div>';
      h += renderAnticipo(RPT.anticipo_iess);
      return h;
    },

    issfa_isspol: function () {
      let h = '';
      const issfaSaldo = RPT.issfa.filas.find(f => f.saldo).val.slice(-1)[0];
      const isspolSaldo = RPT.isspol.filas.find(f => f.saldo).val.slice(-1)[0];
      h += renderKPIs([
        { lbl: "ISSFA — Fuerzas Armadas (miles US$)",   val: RPT.fmt(issfaSaldo),   tono: "kpi-dorado" },
        { lbl: "ISSPOL — Policía (miles US$)",          val: RPT.fmt(isspolSaldo),  tono: "" },
      ]);
      h += '<div class="rpt-fin-band">ISSFA · Instituto de Seguridad Social de las Fuerzas Armadas</div>';
      h += renderSaldos(RPT.issfa);
      h += '<div class="rpt-fin-band">ISSPOL · Instituto de Seguridad Social de la Policía</div>';
      h += renderSaldos(RPT.isspol);
      return h;
    },

    sppat: function () {
      let h = '';
      const saldo = RPT.sppat.filas.find(f => f.saldo).val.slice(-1)[0];
      const noAud = RPT.sppat.filas[2].val.slice(-1)[0];
      const proc  = RPT.sppat.filas[3].val.slice(-1)[0];
      h += renderKPIs([
        { lbl: "Saldo Total SPPAT (miles US$)",  val: RPT.fmt(saldo), tono: "kpi-dorado", sub: "Acumulado completo" },
        { lbl: "Total no auditado",              val: RPT.fmt(noAud), tono: "" },
        { lbl: "En proceso de objeciones",       val: RPT.fmt(proc),  tono: "kpi-naranja" },
      ]);
      h += renderSaldos(RPT.sppat);
      return h;
    },

    expedientes: function () {
      let h = '';
      const r = RPT.expedientes;
      const ult = r.anios[r.anios.length - 1];
      const prev = r.anios[r.anios.length - 2];
      h += renderKPIs([
        { lbl: "Total Año " + ult.anio,  val: ult.totales.total.toLocaleString('es-EC'), tono: "kpi-dorado", sub: "Expedientes presentados" },
        { lbl: "Total Año " + prev.anio, val: prev.totales.total.toLocaleString('es-EC'), tono: "" },
        { lbl: "Variación interanual",   val: (ult.totales.var > 0 ? '+' : '') + ult.totales.var + '%', tono: ult.totales.var >= 0 ? "kpi-verde" : "kpi-naranja", sub: ult.totales.var >= 0 ? "Crecimiento" : "Disminución" },
      ]);
      h += renderExpedientes(r);
      return h;
    }
  };
})();
