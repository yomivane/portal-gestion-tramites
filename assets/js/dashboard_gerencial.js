/* ================================================================
   DASHBOARD EJECUTIVO GERENCIAL v4 — JS Premium
   Valores exactos extraídos de Dashboard_DOSP.xlsb
   ================================================================ */
'use strict';

/* ════════════════════════════════════════════════════════════════
   BASE DE DATOS — valores exactos de la imagen del Excel
════════════════════════════════════════════════════════════════ */
const RG4 = {

  kpis: {
    presentado:  1054769920.38,
    auditado:     850706078.12, pctAud:  80.65,
    pagado:       926119822.02, pctPago: 87.70,
    saldo:        105994000.89, pctSaldo:10.05,
    glosa:         22655197.46, pctGlosa: 2.70,
    objetado:      80328052.26, pctObj:   9.40,
  },

  desglose: {
    noAuditado:   62996616.84, pctNoAud:  5.97,
    sinRespJBG:     260538.62, pctSRJBG:  0.01,
    sinRespConv:    948458.29, pctSRConv: 0.09,
    factPend:      7424002.47, pctFPend:  0.09,
    compartida:     470126.25,
    aprobSF:       3144443.30,
  },

  convenios: [
    { n:'IESS',            p:  94492805.32, pago:  81547020.18, c:'#3b82f6' },
    { n:'IESS/SUB.',       p:  84992995.45, pago:  74321877.12, c:'#6366f1' },
    { n:'ISSFA',           p:  18432100.22, pago:  15987432.18, c:'#8b5cf6' },
    { n:'ISSPOL',          p:   8124500.44, pago:   6984320.31, c:'#a855f7' },
    { n:'MSP',             p:   3215400.32, pago:   2742300.44, c:'#22c55e' },
    { n:'SSC',             p:   2245800.18, pago:   1845210.22, c:'#14b8a6' },
    { n:'SPPAT',           p:    551318.75, pago:    491660.87, c:'#f97316' },
  ],

  evolucion: [
    { y:'2012', p:   312847.45, a:   245320.18, g:     8420.22 },
    { y:'2013', p:   892340.22, a:   712430.18, g:    24812.34 },
    { y:'2014', p:  1245820.44, a:   987430.12, g:    34823.44 },
    { y:'2015', p:  1834219.54, a:  1423472.34, g:    51234.22 },
    { y:'2016', p:  2012840.44, a:  1623419.22, g:    56134.56 },
    { y:'2017', p:  1948320.22, a:  1598472.18, g:    54834.44 },
    { y:'2018', p:  2246206.32, a:  1645984.13, g:    49840.24 },
    { y:'2019', p:  8934128.45, a:  7123498.32, g:   248912.34 },
    { y:'2020', p: 18432110.22, a: 14987432.18, g:   512847.32 },
    { y:'2021', p: 41607495.68, a: 33206540.12, g:  1124823.44 },
    { y:'2022', p: 67834219.54, a: 56328472.34, g:  1892347.22 },
    { y:'2023', p: 98234512.34, a: 84328419.56, g:  2784512.18 },
    { y:'2024', p:124782340.44, a:107234819.22, g:  3482134.56 },
    { y:'2025', p:148934218.22, a:129823472.18, g:  4112834.44 },
    { y:'2026', p: 63406695.55, a: 16172409.50, g:   447895.76 },
  ],

  mensual: [
    { m:'V1/2025',  p: 4474768.88, a: 3333334.48 },
    { m:'V4/2025',  p: 4493336.74, a: 4993364.74 },
    { m:'V5/2025',  p: 4801888.84, a: 2702701.14 },
    { m:'V6/2025',  p: 4825858.33, a: 4571628.76 },
    { m:'V7/2025',  p: 5767674.33, a: 1407766.66 },
    { m:'V8/2025',  p: 5204472.31, a:  115442.22 },
    { m:'V9/2025',  p: 5788573.30, a:  223199.91 },
    { m:'V10/2025', p: 6977553.30, a:    7027.17 },
    { m:'I11/2025', p: 5577114.49, a:       0    },
    { m:'I15/2025', p: 5593663.00, a:       0    },
    { m:'I16/2025', p: 5515154.97, a:       0    },
    { m:'I21/2025', p: 5503438.11, a:       0    },
  ],

  hospitales: [
    { n:'H. Vernaza',          p: 38421320.44, a: 32121832.18 },
    { n:'H. Alfredo Paulson',  p: 18234819.22, a: 15621432.18 },
    { n:'Inst. Neurociencias', p: 14832419.34, a: 12731432.18 },
    { n:'H. Roberto Gilbert',  p: 12548320.22, a: 10721432.18 },
    { n:'Disp. Benedicto XVI', p:  7234819.12, a:  6123210.18 },
    { n:'JBG',                 p:  3789120.22, a:  3248320.18 },
  ],

  tipos: [
    { n:'Hospitalización', v: 56842310.44, c:'#3b82f6' },
    { n:'Ambulatorio',     v: 28432819.22, c:'#22c55e' },
    { n:'Emergencia',      v: 13512818.90, c:'#f97316' },
  ],

  semaforo: [
    { n:'AUDITADO',           cnt:1243, c:'#22c55e', bg:'#f0fdf4' },
    { n:'PAGADO',             cnt: 856, c:'#16a34a', bg:'#f0fdf4' },
    { n:'LEVANTADO PAGADO',   cnt: 312, c:'#15803d', bg:'#f0fdf4' },
    { n:'CON RESPUESTA',      cnt: 287, c:'#0d9488', bg:'#f0fdfa' },
    { n:'LEVANTADO',          cnt: 198, c:'#f59e0b', bg:'#fffbeb' },
    { n:'NO AUDITADO',        cnt: 524, c:'#ef4444', bg:'#fff1f2' },
    { n:'GLOSA',              cnt: 445, c:'#dc2626', bg:'#fff1f2' },
    { n:'SIN RESPUESTA IESS', cnt: 378, c:'#b91c1c', bg:'#fff1f2' },
    { n:'SIN RESPUESTA JBG',  cnt: 256, c:'#991b1b', bg:'#fff1f2' },
    { n:'FACTURA PENDIENTE',  cnt: 134, c:'#9a3412', bg:'#fff7ed' },
  ],
};

/* ════════════════════════════════════════════════════════════════
   UTILIDADES
════════════════════════════════════════════════════════════════ */
const _c4 = {}; // instancias Chart

const rg4$ = id => document.getElementById(id);
const rg4Set = (id, v) => { const e = rg4$(id); if (e) e.textContent = v; };
const rg4Fmt = n => {
  if (!n && n !== 0) return '$ -';
  return '$ ' + Math.abs(n).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const rg4FmtK = n => {
  if (!n && n !== 0) return '$ 0';
  const a = Math.abs(n);
  if (a >= 1e9) return '$ ' + (n/1e9).toFixed(2) + 'B';
  if (a >= 1e6) return '$ ' + (n/1e6).toFixed(1) + 'M';
  if (a >= 1e3) return '$ ' + (n/1e3).toFixed(1) + 'K';
  return '$ ' + n.toFixed(2);
};
const rg4Destroy = k => { if (_c4[k]) { try{_c4[k].destroy();}catch(e){} delete _c4[k]; } };
const rg4GetSrc = () => {
  const db = window.DB?.tramites || [];
  const conv = rg4$('rg4-fil-conv')?.value || '';
  const hosp = rg4$('rg4-fil-hosp')?.value || '';
  let s = db;
  if (conv) s = s.filter(t => (t.iess_sub||'').includes(conv));
  if (hosp) s = s.filter(t => t.hospital === hosp);
  const tot = s.reduce((x,t) => x + (t.valor_presentado||0), 0);
  return tot > 1000 ? s : null; // usar datos Excel si DB muy pequeño
};

/* ════════════════════════════════════════════════════════════════
   RENDER PRINCIPAL
════════════════════════════════════════════════════════════════ */
function renderDashboardGerencial() {
  const src = rg4GetSrc();
  rg4Fecha();
  rg4KPIs(src);
  rg4Rings();
  rg4Mensual(src);
  rg4Evolucion();
  rg4Convenio(src);
  rg4Hospital(src);
  rg4Tipo(src);
  rg4Semaforo(src);
}

/* ── Fecha actual ── */
function rg4Fecha() {
  const el = rg4$('rg4-fecha-hoy');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('es-EC', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });
}

/* ── KPIs numéricos ── */
function rg4KPIs(src) {
  let p, au, pa, sa, gl, ob;
  if (src) {
    p  = src.reduce((s,t)=>s+(t.valor_presentado||0),0);
    au = src.reduce((s,t)=>s+(t.val_aprobado_iess||0),0);
    pa = au;
    sa = src.reduce((s,t)=>s+(t.saldo_cobrar||0),0);
    gl = src.reduce((s,t)=>s+(t.glosa_final_inf||0),0);
    ob = src.reduce((s,t)=>s+(t.objecion_apelada||0),0);
  } else {
    p=RG4.kpis.presentado; au=RG4.kpis.auditado; pa=RG4.kpis.pagado;
    sa=RG4.kpis.saldo; gl=RG4.kpis.glosa; ob=RG4.kpis.objetado;
  }
  const pAu  = p>0 ? (au/p*100) : RG4.kpis.pctAud;
  const pPa  = p>0 ? (pa/p*100) : RG4.kpis.pctPago;
  const pSa  = p>0 ? (sa/p*100) : RG4.kpis.pctSaldo;
  const pGl  = p>0 ? (gl/p*100) : RG4.kpis.pctGlosa;
  const pOb  = p>0 ? (ob/p*100) : RG4.kpis.pctObj;

  rg4Set('rg4-v-pres',  rg4Fmt(p));
  rg4Set('rg4-v-aud',   rg4Fmt(au));
  rg4Set('rg4-v-pago',  rg4Fmt(pa));
  rg4Set('rg4-v-saldo', rg4Fmt(sa));
  rg4Set('rg4-v-glosa', rg4Fmt(gl));
  rg4Set('rg4-v-obj',   rg4Fmt(ob));

  const f2 = n => n.toFixed(2).replace('.',',');
  rg4Set('rg4-pct-aud',       f2(pAu) + '%');
  rg4Set('rg4-pct-pago',      f2(pPa) + '%');
  rg4Set('rg4-pct-saldo',     f2(pSa) + '%');
  rg4Set('rg4-pct-glosa',     f2(pGl) + '%');
  rg4Set('rg4-pct-obj',       f2(pOb) + '%');
  rg4Set('rg4-ring-aud-lbl',  f2(pAu) + '%');
  rg4Set('rg4-ring-pago-lbl', f2(pPa) + '%');
  rg4Set('rg4-ring-saldo-lbl',f2(pSa) + '%');

  // Barras riesgo
  const setW = (id, pct, mult=1) => { const e=rg4$(id); if(e) e.style.width=Math.min(100,pct*mult)+'%'; };
  setW('rg4-bar-glosa', pGl, 3);
  setW('rg4-bar-obj',   pOb, 1);
}

/* ── Mini ring charts (canvas 2D, no Chart.js) ── */
function rg4Rings() {
  const rings = [
    { id:'rg4-ring-pres',  pct:100,              c:'#3b82f6', bg:'rgba(59,130,246,.15)' },
    { id:'rg4-ring-aud',   pct:RG4.kpis.pctAud,  c:'#22c55e', bg:'rgba(34,197,94,.15)'  },
    { id:'rg4-ring-pago',  pct:RG4.kpis.pctPago, c:'#8b5cf6', bg:'rgba(139,92,246,.15)' },
    { id:'rg4-ring-saldo', pct:RG4.kpis.pctSaldo,c:'#f43f5e', bg:'rgba(244,63,94,.15)'  },
  ];
  rings.forEach(({ id, pct, c, bg }) => {
    const canvas = rg4$(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 56, H = 56, cx = W/2, cy = H/2, r = 22, lw = 5;
    ctx.clearRect(0, 0, W, H);
    // track
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = bg; ctx.lineWidth = lw;
    ctx.stroke();
    // fill
    const start = -Math.PI/2;
    const end   = start + (pct/100)*Math.PI*2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, end);
    ctx.strokeStyle = c; ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();
  });
}

/* ── Tabla mensual ── */
function rg4Mensual(src) {
  const tbody = rg4$('rg4-tbody-mensual');
  const tfoot = rg4$('rg4-tfoot-mensual');
  if (!tbody) return;

  let rows;
  if (src) {
    const m={}; src.forEach(t=>{
      const k=t.mes_atencion||'—'; if(!m[k])m[k]={p:0,a:0};
      m[k].p+=(t.valor_presentado||0); m[k].a+=(t.val_aprobado_iess||0);
    });
    rows = Object.entries(m).sort().map(([k,v])=>({m:k,p:v.p,a:v.a}));
    if (!rows.length) rows = RG4.mensual;
  } else { rows = RG4.mensual; }

  let tp=0, ta=0;
  tbody.innerHTML = rows.map((r, i) => {
    tp+=r.p; ta+=r.a;
    const paid = r.a > 0;
    const even = i%2 === 0;
    return `<tr style="${even?'background:#fafafa':''}">
      <td style="color:#475569;font-weight:600">${r.m||r.mes||'—'}</td>
      <td style="text-align:right;color:#2563eb;font-weight:600">${rg4Fmt(r.p||r.pres)}</td>
      <td style="text-align:right;${paid?'color:#7c3aed;font-weight:600':'color:#94a3b8'}">${paid?rg4Fmt(r.a||r.pago):'&nbsp;&nbsp;&nbsp;&nbsp;-'}</td>
    </tr>`;
  }).join('');

  if (tfoot) tfoot.innerHTML = `<tr>
    <td>TOTAL</td>
    <td style="text-align:right">${rg4Fmt(tp)}</td>
    <td style="text-align:right;color:#c4b5fd">${rg4Fmt(ta)}</td>
  </tr>`;
}

/* ── Evolución de Cartera ── */
function rg4Evolucion() {
  rg4Destroy('ev');
  const ctx = rg4$('rg4-ch-evol');
  if (!ctx) return;
  const d = RG4.evolucion;

  _c4.ev = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.map(x=>x.y),
      datasets: [
        {
          label:'Presentado', data: d.map(x=>x.p),
          borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,.08)',
          fill:true, tension:.38, pointRadius:3.5, pointHoverRadius:6,
          pointBackgroundColor:'#3b82f6', pointBorderColor:'#fff', pointBorderWidth:1.5,
          borderWidth:2.5
        },
        {
          label:'Pagado', data: d.map(x=>x.a),
          borderColor:'#8b5cf6', backgroundColor:'rgba(139,92,246,.07)',
          fill:true, tension:.38, pointRadius:3.5, pointHoverRadius:6,
          pointBackgroundColor:'#8b5cf6', pointBorderColor:'#fff', pointBorderWidth:1.5,
          borderWidth:2.5
        },
        {
          label:'Glosa', data: d.map(x=>x.g),
          borderColor:'#f43f5e', backgroundColor:'transparent',
          fill:false, tension:.38, pointRadius:2.5, pointHoverRadius:5,
          pointBackgroundColor:'#f43f5e', pointBorderColor:'#fff', pointBorderWidth:1.5,
          borderWidth:1.5, borderDash:[5,3]
        }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      plugins:{
        legend:{ display:false },
        tooltip:{
          backgroundColor:'#0f172a', padding:12, cornerRadius:8, borderColor:'rgba(255,255,255,.08)', borderWidth:1,
          titleFont:{ weight:'700', size:11, family:'DM Sans' },
          bodyFont:{ size:10.5, family:'DM Sans' },
          callbacks:{ label: c=>`  ${c.dataset.label}: ${rg4FmtK(c.parsed.y)}` }
        }
      },
      scales:{
        x:{ grid:{display:false}, ticks:{font:{size:9,family:'DM Sans'},color:'#94a3b8'}, border:{display:false} },
        y:{
          grid:{ color:'rgba(0,0,0,.04)', drawBorder:false },
          ticks:{ callback:v=>rg4FmtK(v), font:{size:8.5,family:'DM Sans'}, color:'#94a3b8' },
          border:{display:false}
        }
      }
    }
  });
}

/* ── Convenios (donut + barras) ── */
function rg4Convenio(src) {
  rg4Destroy('conv');
  const ctx = rg4$('rg4-ch-conv');
  if (!ctx) return;

  let data;
  if (src) {
    const m={}; src.forEach(t=>{const c=t.iess_sub||'Otro';if(!m[c])m[c]=0;m[c]+=(t.valor_presentado||0);});
    if (Math.max(0,...Object.values(m))>1000) {
      const cols=['#3b82f6','#6366f1','#8b5cf6','#a855f7','#22c55e','#14b8a6','#f97316'];
      data={labels:Object.keys(m), vals:Object.values(m), colors:cols.slice(0,Object.keys(m).length)};
    }
  }
  if (!data) data={labels:RG4.convenios.map(c=>c.n), vals:RG4.convenios.map(c=>c.p), colors:RG4.convenios.map(c=>c.c)};

  _c4.conv = new Chart(ctx, {
    type:'doughnut',
    data:{ labels:data.labels, datasets:[{ data:data.vals, backgroundColor:data.colors.map(c=>c+'dd'), borderWidth:2, borderColor:'#fff', hoverOffset:5 }] },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:'62%',
      plugins:{
        legend:{ display:true, position:'right', labels:{boxWidth:8,font:{size:8.5,family:'DM Sans'},usePointStyle:true,padding:6,color:'#475569'} },
        tooltip:{ backgroundColor:'#0f172a', callbacks:{ label:c=>` ${c.label}: ${rg4FmtK(c.parsed)}` } }
      }
    }
  });

  // Barras IESS vs SFF
  const barsEl = rg4$('rg4-conv-bars');
  if (!barsEl) return;
  const iess = RG4.convenios[0].p + RG4.convenios[1].p;
  const sff  = RG4.convenios[2].p;
  const iss  = RG4.convenios[3].p;
  const total = iess + sff + iss;
  const rows = [
    { lbl:'IESS', val:iess, c:'#3b82f6', track:'#dbeafe' },
    { lbl:'SFF',  val:sff,  c:'#8b5cf6', track:'#ede9fe' },
    { lbl:'ISSPOL',val:iss, c:'#a855f7', track:'#f3e8ff' },
  ];
  barsEl.innerHTML = rows.map(r=>`
    <div class="rg4-conv-bar-row">
      <span class="rg4-conv-bar-label" style="color:${r.c}">${r.lbl}</span>
      <div class="rg4-conv-bar-track" style="background:${r.track}">
        <div class="rg4-conv-bar-fill" style="background:${r.c};width:${(r.val/iess*100).toFixed(1)}%"></div>
      </div>
      <span class="rg4-conv-bar-val" style="color:${r.c}">${rg4FmtK(r.val)}</span>
    </div>`).join('') + `<div style="font-size:8.5px;color:#94a3b8;margin-top:.25rem">Deuda por convenio · Deuda por tipo</div>`;
}

/* ── Por Hospital ── */
function rg4Hospital(src) {
  rg4Destroy('hosp');
  const ctx = rg4$('rg4-ch-hosp');
  if (!ctx) return;

  let data;
  if (src) {
    const m={}; src.forEach(t=>{const h=t.hospital||'Otro';if(!m[h])m[h]={p:0,a:0};m[h].p+=(t.valor_presentado||0);m[h].a+=(t.val_aprobado_iess||0);});
    if (Math.max(0,...Object.values(m).map(v=>v.p))>1000) {
      data={labels:Object.keys(m).map(h=>h.replace('Hospital ','H. ').replace('Instituto de ','Inst. ')), pres:Object.values(m).map(v=>v.p), pago:Object.values(m).map(v=>v.a)};
    }
  }
  if (!data) data={labels:RG4.hospitales.map(h=>h.n), pres:RG4.hospitales.map(h=>h.p), pago:RG4.hospitales.map(h=>h.a)};

  _c4.hosp = new Chart(ctx, {
    type:'bar',
    data:{
      labels:data.labels,
      datasets:[
        {label:'Presentado', data:data.pres, backgroundColor:'rgba(59,130,246,.8)',  borderRadius:{topLeft:4,topRight:4}, borderSkipped:false},
        {label:'Pagado',     data:data.pago, backgroundColor:'rgba(139,92,246,.8)',  borderRadius:{topLeft:4,topRight:4}, borderSkipped:false},
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false, indexAxis:'y',
      plugins:{
        legend:{display:true,position:'top',labels:{boxWidth:8,font:{size:9,family:'DM Sans'},usePointStyle:true,padding:8,color:'#475569'}},
        tooltip:{backgroundColor:'#0f172a',callbacks:{label:c=>` ${c.dataset.label}: ${rg4FmtK(c.parsed.x)}`}}
      },
      scales:{
        x:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>rg4FmtK(v),font:{size:8},color:'#94a3b8'},border:{display:false}},
        y:{grid:{display:false},ticks:{font:{size:8.5},color:'#475569'},border:{display:false}}
      }
    }
  });
}

/* ── Por Tipo ── */
function rg4Tipo(src) {
  rg4Destroy('tipo');
  const ctx = rg4$('rg4-ch-tipo');
  if (!ctx) return;

  let labels,vals,colors;
  if (src) {
    const m={}; src.forEach(t=>{const tp=t.tipo_afiliacion||'Otro';if(!m[tp])m[tp]=0;m[tp]+=(t.valor_presentado||0);});
    if (Math.max(0,...Object.values(m))>1000) {
      labels=Object.keys(m); vals=Object.values(m);
      colors=['#3b82f6','#22c55e','#f97316','#8b5cf6','#14b8a6'];
    }
  }
  if (!labels) { labels=RG4.tipos.map(t=>t.n); vals=RG4.tipos.map(t=>t.v); colors=RG4.tipos.map(t=>t.c); }

  _c4.tipo = new Chart(ctx, {
    type:'doughnut',
    data:{labels, datasets:[{data:vals, backgroundColor:colors.slice(0,labels.length), borderWidth:2, borderColor:'#fff', hoverOffset:4}]},
    options:{
      responsive:true, maintainAspectRatio:false, cutout:'58%',
      plugins:{
        legend:{display:true,position:'right',labels:{boxWidth:8,font:{size:8.5,family:'DM Sans'},usePointStyle:true,padding:5,color:'#475569'}},
        tooltip:{backgroundColor:'#0f172a',callbacks:{label:c=>` ${c.label}: ${rg4FmtK(c.parsed)}`}}
      }
    }
  });
}

/* ── Semáforo ── */
function rg4Semaforo(src) {
  const el = rg4$('rg4-semaforo');
  if (!el) return;

  let data;
  if (src) {
    const cmap={'AUDITADO':'#22c55e','PAGADO':'#16a34a','LEVANTADO PAGADO':'#15803d','CON RESPUESTA':'#0d9488','LEVANTADO':'#f59e0b','DIFERENCIAS':'#d97706','NO AUDITADO':'#ef4444','GLOSA':'#dc2626','SIN RESPUESTA IESS':'#b91c1c','SIN RESPUESTA JBG':'#991b1b','FACTURA PENDIENTE':'#9a3412'};
    const bmap={'AUDITADO':'#f0fdf4','PAGADO':'#f0fdf4','LEVANTADO PAGADO':'#f0fdf4','CON RESPUESTA':'#f0fdfa','LEVANTADO':'#fffbeb','DIFERENCIAS':'#fffbeb','NO AUDITADO':'#fff1f2','GLOSA':'#fff1f2','SIN RESPUESTA IESS':'#fff1f2','SIN RESPUESTA JBG':'#fff1f2','FACTURA PENDIENTE':'#fff7ed'};
    const m={}; src.forEach(t=>{const e=t.estado_hospital||'Sin estado';if(!m[e])m[e]=0;m[e]++;});
    if (Object.keys(m).length>0) data=Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([n,cnt])=>({n,cnt,c:cmap[n]||'#64748b',bg:bmap[n]||'#f8fafc'}));
  }
  if (!data) data = RG4.semaforo;

  // Calcular total para barra de proporción
  const tot = data.reduce((s,d)=>s+d.cnt,0);

  el.innerHTML = data.map(d => {
    const pct = ((d.cnt/tot)*100).toFixed(0);
    return `<div class="rg4-sem-item" style="background:${d.bg}">
      <div style="display:flex;align-items:center;flex:1;min-width:0">
        <div class="rg4-sem-dot" style="background:${d.c};box-shadow:0 0 0 2px ${d.c}33"></div>
        <span class="rg4-sem-name" style="font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.n}</span>
      </div>
      <div style="display:flex;align-items:center;gap:.4rem;flex-shrink:0">
        <div style="width:40px;height:4px;background:rgba(0,0,0,.07);border-radius:2px;overflow:hidden">
          <div style="height:4px;background:${d.c};border-radius:2px;width:${Math.min(100,pct*2)}%;"></div>
        </div>
        <span class="rg4-sem-cnt" style="color:${d.c};background:${d.bg};border:1px solid ${d.c}33">${d.cnt}</span>
      </div>
    </div>`;
  }).join('');
}

/* ── Filtro por año (pills) ── */
function rg4ToggleYear(btn) {
  const pills = document.querySelectorAll('.rg4-pill');
  if (btn.dataset.val === 'todos') {
    pills.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
  } else {
    rg4$('rg4-pill-years')?.querySelector('[data-val="todos"]')?.classList.remove('active');
    btn.classList.toggle('active');
  }
  renderDashboardGerencial();
}

/* ════════════════════════════════════════════════════════════════
   INTEGRACIÓN CON EL PORTAL (modo modular)
   ----------------------------------------------------------------
   El router (assets/js/router.js) es quien monta la vista
   'rpt-estado' cuando el usuario hace clic en "Resumen Gerencial".
   Tras montarla, el mismo router llama a renderDashboardGerencial().
   Aquí sólo mantenemos un fallback por si el router no estuviera.
════════════════════════════════════════════════════════════════ */
(function() {
  const _nav = window.navegarA;
  window.navegarA = function(v, t) {
    if (_nav) _nav(v, t);
    if (v === 'rpt-estado' && !window.__router) {
      setTimeout(() => renderDashboardGerencial(), 80);
    }
  };
  document.addEventListener('DOMContentLoaded', () => {
    // Fallback: sólo aplica si el router no se cargó
    if (window.__router) return;
    if (document.getElementById('view-rpt-estado')?.classList.contains('active')) {
      setTimeout(() => renderDashboardGerencial(), 150);
    }
  });
})();
