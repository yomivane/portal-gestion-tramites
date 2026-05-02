/* ================================================================
   SISTEMA TRAMITES JBG / IESS — app.js v2
   Todos los campos del Excel "LOTES Y TRAMITES 2020 (IESS)"
   ================================================================ */
'use strict';

// ── ESTADO GLOBAL ──────────────────────────────────────────────────
let DB = { tramites: [], oficios: [] };
let pagActual = 1;
const POR_PAG = 15;
let filtrados = [];
let charts = {};

// ── DATOS DEMO (basados en campos reales del Excel) ──────────────────
const DEMO = [
  {
    id:1, hospital:'Hospital Luis Vernaza', iess_sub:'IESS/SUBDIRECCION',
    numero_tramite:'2020-LV-001', lote:'LOTE-01', num_expedientes:245,
    tipo_afiliacion:'Ambulatorio', mes_atencion:'2020-01',
    valor_presentado:125840.50, iva:15100.86, valor_sin_iva:110739.64,
    valor_pres_sin_audit:110000, parte:'1/1', factura_manual:'FM-001',
    fecha_parte:'2020-02-15', fecha_factura:'2020-02-10',
    abono_base:88591.71, abono_iva:12080.69, saldo:22147.93,
    fact_manual_cancelada:'', parte_ab:'1/1', fact_manual_ab:'FM-001A',
    fecha_parte_ab:'2020-03-10', abono_26m:5000, fact_manual_ab26:'FM-AB26-01',
    parte_ab26:'1/1', fecha_ab26:'2020-04-01',
    preliquidacion_abono:88591.71, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'2020-05-10', fecha_fact_apelaciones:'2020-05-15',
    cancelacion_apelaciones:5500, val_regularizado_apel:98650,
    val_reclamado_iess:110739.64, val_aprobado_iess:98650, iva_aprobado:11838,
    dif_iess_jbg:2089.64, diferencia_reclamada:12089.64,
    oficio_hospital:'OFC-OSP-DOF-208-2020', oficio_apelaciones:'OFC-OSP-DOF-902-2020',
    val_apelado_iess:12089.64, val_levantado_iess:6500, iva_levantamiento:780,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:5589.64,
    val_cancelado_total_inf:98650,
    oficio_solicitud_objec:'OFC-OSD-DOF-275-2020', fecha_oficio_solicitud_objec:'2020-06-01',
    oficio_respuesta_iess:'IT-CPPSSG-LF-2020-2353', fecha_respuesta_iess:'2020-07-15',
    fecha_debe_responder_hosp:'2020-08-01', fecha_notif_hospital:'2020-06-15',
    fecha_glosa_apelaciones:'2020-09-01', solicitud_oficio_glosa:'SOL-001',
    parte_a1:'1/1', fact_manual_a1:'FM-A1-01', fecha_parte_a1:'2020-05-20',
    parte_ap:'1/1', fact_manual_ap:'FM-AP-01', fecha_parte_ap:'2020-06-10',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:12089.64, objecion_aceptada:6500, objecion_sin_respuesta:3589.64,
    objecion_iess:12089.64, glosa_final_inf:5589.64, saldo_cobrar:9250,
    iva_auditado:11838, iva_objetado:1500, iva_apelado:780, iva_aprobado_2audit:11838,
    iva_glosado:720, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:9250,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'AUDITADO', estado:'aprobado',
    observacion:'Trámite liquidado correctamente',
    num_solicitud:'', dependencia:'CEX', num_lote_abono:'LOTE-01',
    fecha_entrega:'2020-02-20', numero_oficio:'OFC-OSP-DOF-208-2020',
    fecha_oficio:'2020-02-18', procedimiento_hospital:'PROC-001',
    procedimiento_informes:'INF-001', oficio_iess:'OFC-OSP-DOF-208-2020'
  },
  {
    id:2, hospital:'Hospital Alfredo Paulson', iess_sub:'IESS',
    numero_tramite:'2020-AP-001', lote:'LOTE-01', num_expedientes:189,
    tipo_afiliacion:'Hospitalización', mes_atencion:'2020-01',
    valor_presentado:98340, iva:11800.80, valor_sin_iva:86539.20,
    valor_pres_sin_audit:85000, parte:'1/2', factura_manual:'FM-002',
    fecha_parte:'2020-02-20', fecha_factura:'2020-02-15',
    abono_base:69231.36, abono_iva:9440.64, saldo:17307.84,
    fact_manual_cancelada:'', parte_ab:'', fact_manual_ab:'', fecha_parte_ab:'',
    abono_26m:0, fact_manual_ab26:'', parte_ab26:'', fecha_ab26:'',
    preliquidacion_abono:69231.36, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'2020-06-01', fecha_fact_apelaciones:'2020-06-10',
    cancelacion_apelaciones:0, val_regularizado_apel:0,
    val_reclamado_iess:86539.20, val_aprobado_iess:75200, iva_aprobado:9024,
    dif_iess_jbg:1339.20, diferencia_reclamada:11339.20,
    oficio_hospital:'OFC-OSP-DOF-211-2020', oficio_apelaciones:'OFC-OSP-DOF-903-2020',
    val_apelado_iess:11339.20, val_levantado_iess:4200, iva_levantamiento:504,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:7139.20,
    val_cancelado_total_inf:75200,
    oficio_solicitud_objec:'OFC-OSD-DOF-208-2020', fecha_oficio_solicitud_objec:'2020-07-01',
    oficio_respuesta_iess:'IT-CPPSSG-LF-2020-2819', fecha_respuesta_iess:'2020-08-20',
    fecha_debe_responder_hosp:'2020-09-01', fecha_notif_hospital:'2020-07-15',
    fecha_glosa_apelaciones:'', solicitud_oficio_glosa:'',
    parte_a1:'', fact_manual_a1:'', fecha_parte_a1:'',
    parte_ap:'', fact_manual_ap:'', fecha_parte_ap:'',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:11339.20, objecion_aceptada:4200, objecion_sin_respuesta:7139.20,
    objecion_iess:11339.20, glosa_final_inf:7139.20, saldo_cobrar:8150,
    iva_auditado:9024, iva_objetado:1200, iva_apelado:504, iva_aprobado_2audit:9024,
    iva_glosado:696, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:8150,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'SIN RESPUESTA IESS', estado:'apelacion',
    observacion:'Apelación pendiente de respuesta',
    num_solicitud:'', dependencia:'HOQ', num_lote_abono:'LOTE-01',
    fecha_entrega:'2020-02-25', numero_oficio:'OFC-OSP-DOF-211-2020',
    fecha_oficio:'2020-02-22', procedimiento_hospital:'PROC-002',
    procedimiento_informes:'INF-002', oficio_iess:'OFC-OSP-DOF-211-2020'
  },
  {
    id:3, hospital:'Instituto de Neurociencias', iess_sub:'ISSFA',
    numero_tramite:'2020-IN-001', lote:'LOTE-02', num_expedientes:78,
    tipo_afiliacion:'Ambulatorio', mes_atencion:'2020-02',
    valor_presentado:45600, iva:5472, valor_sin_iva:40128,
    valor_pres_sin_audit:40128, parte:'1/1', factura_manual:'',
    fecha_parte:'2020-03-10', fecha_factura:'2020-03-08',
    abono_base:32102.40, abono_iva:4377.60, saldo:8025.60,
    fact_manual_cancelada:'', parte_ab:'', fact_manual_ab:'', fecha_parte_ab:'',
    abono_26m:0, fact_manual_ab26:'', parte_ab26:'', fecha_ab26:'',
    preliquidacion_abono:32102.40, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'', fecha_fact_apelaciones:'',
    cancelacion_apelaciones:0, val_regularizado_apel:40128,
    val_reclamado_iess:40128, val_aprobado_iess:40128, iva_aprobado:4815.36,
    dif_iess_jbg:0, diferencia_reclamada:0,
    oficio_hospital:'OFC-OSP-DOF-896-2020', oficio_apelaciones:'',
    val_apelado_iess:0, val_levantado_iess:0, iva_levantamiento:0,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:0, val_cancelado_total_inf:40128,
    oficio_solicitud_objec:'', fecha_oficio_solicitud_objec:'',
    oficio_respuesta_iess:'', fecha_respuesta_iess:'',
    fecha_debe_responder_hosp:'', fecha_notif_hospital:'',
    fecha_glosa_apelaciones:'', solicitud_oficio_glosa:'',
    parte_a1:'', fact_manual_a1:'', fecha_parte_a1:'',
    parte_ap:'', fact_manual_ap:'', fecha_parte_ap:'',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:0, objecion_aceptada:0, objecion_sin_respuesta:0,
    objecion_iess:0, glosa_final_inf:0, saldo_cobrar:0,
    iva_auditado:4815.36, iva_objetado:0, iva_apelado:0, iva_aprobado_2audit:4815.36,
    iva_glosado:0, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:0,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'AUDITADO', estado:'aprobado', observacion:'',
    num_solicitud:'', dependencia:'CEX', num_lote_abono:'LOTE-02',
    fecha_entrega:'2020-03-12', numero_oficio:'OFC-OSP-DOF-896-2020',
    fecha_oficio:'2020-03-09', procedimiento_hospital:'PROC-003',
    procedimiento_informes:'INF-003', oficio_iess:'OFC-OSP-DOF-896-2020'
  },
  {
    id:4, hospital:'Hospital Roberto Gilbert', iess_sub:'ISSPOL',
    numero_tramite:'2020-RG-001', lote:'LOTE-02', num_expedientes:312,
    tipo_afiliacion:'Emergencia', mes_atencion:'2020-02',
    valor_presentado:187500, iva:22500, valor_sin_iva:165000,
    valor_pres_sin_audit:160000, parte:'1/3', factura_manual:'FM-004',
    fecha_parte:'2020-03-15', fecha_factura:'2020-03-12',
    abono_base:132000, abono_iva:18000, saldo:33000,
    fact_manual_cancelada:'', parte_ab:'1/3', fact_manual_ab:'FM-004A', fecha_parte_ab:'2020-04-10',
    abono_26m:15000, fact_manual_ab26:'FM-AB26-04', parte_ab26:'1/3', fecha_ab26:'2020-05-01',
    preliquidacion_abono:132000, saldo_abono:18000,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'2020-07-15', fecha_fact_apelaciones:'2020-07-20',
    cancelacion_apelaciones:12500, val_regularizado_apel:0,
    val_reclamado_iess:165000, val_aprobado_iess:142500, iva_aprobado:17100,
    dif_iess_jbg:2500, diferencia_reclamada:22500,
    oficio_hospital:'OFC-OSP-DOF-901-2020', oficio_apelaciones:'OFC-OSP-DOF-995-2020',
    val_apelado_iess:22500, val_levantado_iess:10000, iva_levantamiento:1200,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:12500, val_cancelado_total_inf:142500,
    oficio_solicitud_objec:'OFC-OSD-DOF-211-2020', fecha_oficio_solicitud_objec:'2020-08-01',
    oficio_respuesta_iess:'001-953-000267', fecha_respuesta_iess:'2020-09-15',
    fecha_debe_responder_hosp:'2020-10-01', fecha_notif_hospital:'2020-08-20',
    fecha_glosa_apelaciones:'2020-10-15', solicitud_oficio_glosa:'SOL-004',
    parte_a1:'1/1', fact_manual_a1:'FM-A1-04', fecha_parte_a1:'2020-08-15',
    parte_ap:'1/1', fact_manual_ap:'FM-AP-04', fecha_parte_ap:'2020-09-01',
    val_glosados_procuraduria:5000, parte_proc:'1/1', fact_manual_proc:'FM-PROC-04', fecha_parte_proc:'2020-11-01',
    objecion_apelada:22500, objecion_aceptada:10000, objecion_sin_respuesta:12500,
    objecion_iess:22500, glosa_final_inf:12500, saldo_cobrar:18000,
    iva_auditado:17100, iva_objetado:2700, iva_apelado:1200, iva_aprobado_2audit:17100,
    iva_glosado:1500, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:18000,
    num_tramite_reexp:'2020-RG-001-R', fecha_fact_reexp:'2021-01-15', oficio_reexpedido:'OFC-OSP-DOF-0157-2021',
    val_reclamado_reexp:12500, val_aprobado_reexp:8000, iva_aprobado_reexp:960,
    val_objetado_reexp:4500, exp_reexpedidos:45,
    responsabilidad_compartida:'RC compartida 30%', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'GLOSA', estado:'proceso', observacion:'En proceso de revisión procuraduría',
    num_solicitud:'001-953-000203', dependencia:'EME', num_lote_abono:'LOTE-02',
    fecha_entrega:'2020-03-20', numero_oficio:'OFC-OSP-DOF-901-2020',
    fecha_oficio:'2020-03-18', procedimiento_hospital:'PROC-004',
    procedimiento_informes:'INF-004', oficio_iess:'OFC-OSP-DOF-901-2020'
  },
  {
    id:5, hospital:'Dispensario Benedicto XVI', iess_sub:'SSC',
    numero_tramite:'2020-DB-001', lote:'LOTE-03', num_expedientes:56,
    tipo_afiliacion:'Ambulatorio', mes_atencion:'2020-03',
    valor_presentado:23450, iva:2814, valor_sin_iva:20636,
    valor_pres_sin_audit:20636, parte:'1/1', factura_manual:'',
    fecha_parte:'2020-04-05', fecha_factura:'2020-04-01',
    abono_base:16508.80, abono_iva:2251.20, saldo:4127.20,
    fact_manual_cancelada:'', parte_ab:'', fact_manual_ab:'', fecha_parte_ab:'',
    abono_26m:0, fact_manual_ab26:'', parte_ab26:'', fecha_ab26:'',
    preliquidacion_abono:16508.80, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'', fecha_fact_apelaciones:'',
    cancelacion_apelaciones:0, val_regularizado_apel:20636,
    val_reclamado_iess:20636, val_aprobado_iess:20636, iva_aprobado:2476.32,
    dif_iess_jbg:0, diferencia_reclamada:0,
    oficio_hospital:'OFC-OSP-DOF-902-2020', oficio_apelaciones:'',
    val_apelado_iess:0, val_levantado_iess:0, iva_levantamiento:0,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:0, val_cancelado_total_inf:20636,
    oficio_solicitud_objec:'', fecha_oficio_solicitud_objec:'',
    oficio_respuesta_iess:'', fecha_respuesta_iess:'',
    fecha_debe_responder_hosp:'', fecha_notif_hospital:'',
    fecha_glosa_apelaciones:'', solicitud_oficio_glosa:'',
    parte_a1:'', fact_manual_a1:'', fecha_parte_a1:'',
    parte_ap:'', fact_manual_ap:'', fecha_parte_ap:'',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:0, objecion_aceptada:0, objecion_sin_respuesta:0,
    objecion_iess:0, glosa_final_inf:0, saldo_cobrar:0,
    iva_auditado:2476.32, iva_objetado:0, iva_apelado:0, iva_aprobado_2audit:2476.32,
    iva_glosado:0, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:0,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'PAGADO', estado:'cancelado', observacion:'Cancelado totalmente',
    num_solicitud:'', dependencia:'CEX', num_lote_abono:'LOTE-03',
    fecha_entrega:'2020-04-08', numero_oficio:'OFC-OSP-DOF-902-2020',
    fecha_oficio:'2020-04-05', procedimiento_hospital:'PROC-005',
    procedimiento_informes:'INF-005', oficio_iess:'OFC-OSP-DOF-902-2020'
  },
  {
    id:6, hospital:'Hospital Luis Vernaza', iess_sub:'IESS/SUBDIRECCION',
    numero_tramite:'2020-LV-002', lote:'LOTE-03', num_expedientes:198,
    tipo_afiliacion:'Hospitalización', mes_atencion:'2020-03',
    valor_presentado:210300, iva:25236, valor_sin_iva:185064,
    valor_pres_sin_audit:180000, parte:'2/2', factura_manual:'FM-006',
    fecha_parte:'2020-04-12', fecha_factura:'2020-04-08',
    abono_base:148051.20, abono_iva:20188.80, saldo:37012.80,
    fact_manual_cancelada:'', parte_ab:'1/1', fact_manual_ab:'FM-006A', fecha_parte_ab:'2020-05-15',
    abono_26m:10000, fact_manual_ab26:'FM-AB26-06', parte_ab26:'1/1', fecha_ab26:'2020-06-01',
    preliquidacion_abono:148051.20, saldo_abono:5000,
    val_base_2da_fact:5000, val_iva_2da_fact:600, fecha_2da_factura:'2021-02-01', fecha_2do_pago:'2021-03-15',
    fecha_apelacion:'2020-08-20', fecha_fact_apelaciones:'2020-08-25',
    cancelacion_apelaciones:8900, val_regularizado_apel:162500,
    val_reclamado_iess:185064, val_aprobado_iess:162500, iva_aprobado:19500,
    dif_iess_jbg:2564, diferencia_reclamada:22564,
    oficio_hospital:'OFC-OSP-DOF-903-2020', oficio_apelaciones:'OFC-OSP-DOF-1153-2020',
    val_apelado_iess:22564, val_levantado_iess:13664, iva_levantamiento:1639.68,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:8900, val_cancelado_total_inf:162500,
    oficio_solicitud_objec:'OFC-OSD-DOF-275-2020', fecha_oficio_solicitud_objec:'2020-09-01',
    oficio_respuesta_iess:'001-953-000357', fecha_respuesta_iess:'2020-10-20',
    fecha_debe_responder_hosp:'2020-11-01', fecha_notif_hospital:'2020-09-15',
    fecha_glosa_apelaciones:'2020-11-15', solicitud_oficio_glosa:'SOL-006',
    parte_a1:'1/1', fact_manual_a1:'FM-A1-06', fecha_parte_a1:'2020-09-10',
    parte_ap:'1/1', fact_manual_ap:'FM-AP-06', fecha_parte_ap:'2020-10-01',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:22564, objecion_aceptada:13664, objecion_sin_respuesta:8900,
    objecion_iess:22564, glosa_final_inf:8900, saldo_cobrar:15000,
    iva_auditado:19500, iva_objetado:2700, iva_apelado:1639.68, iva_aprobado_2audit:19500,
    iva_glosado:1060.32, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:5600, total_aprobado_sin_pago:15000,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'LEVANTADO', estado:'aprobado', observacion:'Aprobado con observaciones',
    num_solicitud:'001-953-000814', dependencia:'HOQ', num_lote_abono:'LOTE-03',
    fecha_entrega:'2020-04-15', numero_oficio:'OFC-OSP-DOF-903-2020',
    fecha_oficio:'2020-04-12', procedimiento_hospital:'PROC-006',
    procedimiento_informes:'INF-006', oficio_iess:'OFC-OSP-DOF-903-2020'
  },
  {
    id:7, hospital:'JBG', iess_sub:'MSP',
    numero_tramite:'2020-JBG-001', lote:'LOTE-04', num_expedientes:423,
    tipo_afiliacion:'Consulta Externa', mes_atencion:'2020-04',
    valor_presentado:335000, iva:40200, valor_sin_iva:294800,
    valor_pres_sin_audit:290000, parte:'1/1', factura_manual:'FM-007',
    fecha_parte:'2020-05-08', fecha_factura:'2020-05-05',
    abono_base:235840, abono_iva:32160, saldo:58960,
    fact_manual_cancelada:'', parte_ab:'', fact_manual_ab:'', fecha_parte_ab:'',
    abono_26m:0, fact_manual_ab26:'', parte_ab26:'', fecha_ab26:'',
    preliquidacion_abono:235840, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'', fecha_fact_apelaciones:'',
    cancelacion_apelaciones:0, val_regularizado_apel:285000,
    val_reclamado_iess:294800, val_aprobado_iess:285000, iva_aprobado:34200,
    dif_iess_jbg:800, diferencia_reclamada:9800,
    oficio_hospital:'OFC-OSP-DOF-1373-2020', oficio_apelaciones:'',
    val_apelado_iess:9800, val_levantado_iess:9800, iva_levantamiento:1176,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:0, val_cancelado_total_inf:285000,
    oficio_solicitud_objec:'', fecha_oficio_solicitud_objec:'',
    oficio_respuesta_iess:'', fecha_respuesta_iess:'',
    fecha_debe_responder_hosp:'', fecha_notif_hospital:'',
    fecha_glosa_apelaciones:'', solicitud_oficio_glosa:'',
    parte_a1:'', fact_manual_a1:'', fecha_parte_a1:'',
    parte_ap:'', fact_manual_ap:'', fecha_parte_ap:'',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:9800, objecion_aceptada:9800, objecion_sin_respuesta:0,
    objecion_iess:9800, glosa_final_inf:0, saldo_cobrar:5800,
    iva_auditado:34200, iva_objetado:0, iva_apelado:1176, iva_aprobado_2audit:34200,
    iva_glosado:0, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:5800,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'AUDITADO', estado:'aprobado', observacion:'',
    num_solicitud:'', dependencia:'CEX', num_lote_abono:'LOTE-04',
    fecha_entrega:'2020-05-10', numero_oficio:'OFC-OSP-DOF-1373-2020',
    fecha_oficio:'2020-05-08', procedimiento_hospital:'PROC-007',
    procedimiento_informes:'INF-007', oficio_iess:'OFC-OSP-DOF-1373-2020'
  },
  {
    id:8, hospital:'Hospital Alfredo Paulson', iess_sub:'IESS',
    numero_tramite:'2020-AP-002', lote:'LOTE-04', num_expedientes:145,
    tipo_afiliacion:'Emergencia', mes_atencion:'2020-04',
    valor_presentado:87650, iva:10518, valor_sin_iva:77132,
    valor_pres_sin_audit:75000, parte:'1/2', factura_manual:'FM-008',
    fecha_parte:'2020-05-20', fecha_factura:'2020-05-18',
    abono_base:61705.60, abono_iva:8414.40, saldo:15426.40,
    fact_manual_cancelada:'', parte_ab:'', fact_manual_ab:'', fecha_parte_ab:'',
    abono_26m:0, fact_manual_ab26:'', parte_ab26:'', fecha_ab26:'',
    preliquidacion_abono:61705.60, saldo_abono:0,
    val_base_2da_fact:0, val_iva_2da_fact:0, fecha_2da_factura:'', fecha_2do_pago:'',
    fecha_apelacion:'2020-09-01', fecha_fact_apelaciones:'2020-09-10',
    cancelacion_apelaciones:3200, val_regularizado_apel:0,
    val_reclamado_iess:77132, val_aprobado_iess:65000, iva_aprobado:7800,
    dif_iess_jbg:1132, diferencia_reclamada:12132,
    oficio_hospital:'OFC-OSP-DOF-1441-2020', oficio_apelaciones:'OFC-OSP-DOF-1551-2020',
    val_apelado_iess:12132, val_levantado_iess:5000, iva_levantamiento:600,
    val_aprobado_cob_compartida:0, dif_glosas_iess_jbg:7132, val_cancelado_total_inf:65000,
    oficio_solicitud_objec:'OFC-OSD-DOF-208-2020', fecha_oficio_solicitud_objec:'2020-10-01',
    oficio_respuesta_iess:'001-953-000457', fecha_respuesta_iess:'2020-11-15',
    fecha_debe_responder_hosp:'2020-12-01', fecha_notif_hospital:'2020-10-20',
    fecha_glosa_apelaciones:'2020-12-15', solicitud_oficio_glosa:'SOL-008',
    parte_a1:'', fact_manual_a1:'', fecha_parte_a1:'',
    parte_ap:'', fact_manual_ap:'', fecha_parte_ap:'',
    val_glosados_procuraduria:0, parte_proc:'', fact_manual_proc:'', fecha_parte_proc:'',
    objecion_apelada:12132, objecion_aceptada:5000, objecion_sin_respuesta:7132,
    objecion_iess:12132, glosa_final_inf:7132, saldo_cobrar:9500,
    iva_auditado:7800, iva_objetado:1500, iva_apelado:600, iva_aprobado_2audit:7800,
    iva_glosado:900, iva_aprobado_no_pagado:0,
    total_aprobado_sin_facturar:0, total_aprobado_sin_pago:9500,
    num_tramite_reexp:'', fecha_fact_reexp:'', oficio_reexpedido:'',
    val_reclamado_reexp:0, val_aprobado_reexp:0, iva_aprobado_reexp:0,
    val_objetado_reexp:0, exp_reexpedidos:0,
    responsabilidad_compartida:'', filtro_rechazo:'',
    fact_duplicada:'', nueva_fecha_dup:'', nueva_num_fact_dup:'',
    fecha_anulacion:'', num_nota_credito:'',
    estado_hospital:'SIN RESPUESTA JBG', estado:'objetado', observacion:'Objetado - Esperando documentación',
    num_solicitud:'001-953-000837', dependencia:'EME', num_lote_abono:'LOTE-04',
    fecha_entrega:'2020-05-25', numero_oficio:'OFC-OSP-DOF-1441-2020',
    fecha_oficio:'2020-05-22', procedimiento_hospital:'PROC-008',
    procedimiento_informes:'INF-008', oficio_iess:'OFC-OSP-DOF-1441-2020'
  }
];

// ── ARRANQUE ─────────────────────────────────────────────────────────
// En la arquitectura modular, el router (assets/js/router.js) monta
// UNA vista a la vez dentro de #views-container y llama los render*
// que correspondan. Aquí sólo cargamos los datos de localStorage y
// dejamos DB listo. Los render globales ya no se llaman desde aquí
// (el router lo hace tras montar cada vista).
document.addEventListener('DOMContentLoaded', () => {
  const guardados = localStorage.getItem('jbg_v2_tramites');
  DB.tramites = guardados ? JSON.parse(guardados) : [...DEMO];
  const ofsGuardados = localStorage.getItem('jbg_v2_oficios');
  DB.oficios = ofsGuardados ? JSON.parse(ofsGuardados) : [];

  // Fallback: si por alguna razón el router NO está presente (por
  // ejemplo alguien abre app.js fuera del portal), mantenemos el
  // comportamiento antiguo para no dejar una pantalla en blanco.
  if (!window.__router) {
    inicializarNav();
    renderDashboard();
    renderTablaTramites();
    renderTodosReportes();
    renderListaOficios();

    const hoy = new Date().toISOString().slice(0,10);
    const elFecha = document.getElementById('of-fecha');
    if (elFecha) elFecha.value = hoy;
    renderOficio();
  }
});

function guardar() { localStorage.setItem('jbg_v2_tramites', JSON.stringify(DB.tramites)); }

// ── NAVEGACIÓN ────────────────────────────────────────────────────────
// inicializarNav() se mantiene por compatibilidad; en el modo
// modular con router.js ya no se usa porque el router se encarga
// de los clicks. Si el router no está presente, vuelve al
// comportamiento SPA antiguo (única página, secciones conviviendo).
function inicializarNav() {
  if (window.__router) return; // el router ya cableó los links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const v = a.dataset.view;
      navegarA(v, a.textContent.trim());
    });
  });
}

function navegarA(v, titulo) {
  // Si el router está activo, delegar (monta la vista correcta en
  // el contenedor único).
  if (window.__router && typeof window.__router.montar === 'function') {
    window.__router.montar(v);
    try { history.replaceState(null, '', '#' + v); } catch(_) {}
    return;
  }
  // Fallback: comportamiento SPA antiguo (todas las vistas en el DOM)
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.view').forEach(s => s.classList.remove('active'));
  const nl = document.querySelector(`[data-view="${v}"]`);
  const vl = document.getElementById(`view-${v}`);
  if (nl) nl.classList.add('active');
  if (vl) vl.classList.add('active');
  const tbt = document.getElementById('topbar-title');
  if (tbt) tbt.textContent = titulo || v;
  if (v === 'dashboard') renderDashboard();
  if (v === 'listado') renderTablaTramites();
  if (v.startsWith('rpt-')) renderTodosReportes();
  if (v === 'oficios') renderListaOficios();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── DASHBOARD ─────────────────────────────────────────────────────────
function renderDashboard() {
  const t = DB.tramites;
  const apr = t.filter(x => x.estado==='aprobado').length;
  const proc = t.filter(x => ['apelacion','proceso','objetado','glosa'].includes(x.estado)).length;
  const valPres = sum(t,'valor_presentado');
  const glosa = sum(t,'glosa_final_inf');

  set('k-aprobados', apr);
  set('k-valor', '$'+fmt(valPres));
  set('k-proceso', proc);
  set('k-total', t.length);
  set('k-glosas', '$'+fmt(glosa));

  renderCharts();
  renderTablaRecientes();
}

function renderCharts() {
  Object.values(charts).forEach(c => { try{c.destroy()}catch(e){} });
  charts = {};

  const t = DB.tramites;

  // Donut estado
  const estadoMap = {aprobado:'Aprobado',proceso:'En Proceso',apelacion:'Apelación',objetado:'Objetado',cancelado:'Cancelado',glosa:'Glosa'};
  const counts = {};
  t.forEach(x => { counts[x.estado] = (counts[x.estado]||0)+1; });
  const ctx1 = document.getElementById('ch-estado');
  if (ctx1) charts.e = new Chart(ctx1, {
    type:'doughnut',
    data:{
      labels:Object.keys(counts).map(k=>estadoMap[k]||k),
      datasets:[{data:Object.values(counts),backgroundColor:['#15803d','#1d4ed8','#d97706','#b91c1c','#475569','#c2410c'],borderWidth:0}]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'DM Sans',size:10},padding:10}}}}
  });

  // Bar hospital
  const hospV = {};
  t.forEach(x => { hospV[x.hospital]=(hospV[x.hospital]||0)+(x.valor_sin_iva||0); });
  const labels2 = Object.keys(hospV).map(h=>h.replace('Hospital ','H.').replace('Instituto de ','Inst.'));
  const ctx2 = document.getElementById('ch-hospital');
  if (ctx2) charts.h = new Chart(ctx2, {
    type:'bar',
    data:{labels:labels2,datasets:[{label:'Valor sin IVA',data:Object.values(hospV),backgroundColor:['#1d4ed8','#15803d','#7c3aed','#475569','#c2410c','#0e7490','#b91c1c'],borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>'$'+(v/1000).toFixed(0)+'k',font:{size:9}}},x:{ticks:{font:{size:9}}}}}
  });

  // Bar comparativo
  const hosps = [...new Set(t.map(x=>x.hospital))];
  const ctx3 = document.getElementById('ch-comparativo');
  if (ctx3) charts.c = new Chart(ctx3, {
    type:'bar',
    data:{
      labels:hosps.map(h=>h.replace('Hospital ','H.').replace('Instituto de ','Inst.')),
      datasets:[
        {label:'Presentado',data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'valor_presentado')),backgroundColor:'rgba(29,78,216,.7)',borderRadius:4},
        {label:'Aprobado IESS',data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'val_aprobado_iess')),backgroundColor:'rgba(21,128,61,.7)',borderRadius:4},
        {label:'Glosa Final',data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'glosa_final_inf')),backgroundColor:'rgba(185,28,28,.7)',borderRadius:4}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'DM Sans',size:9},padding:8}}},scales:{y:{ticks:{callback:v=>'$'+(v/1000).toFixed(0)+'k',font:{size:9}}},x:{ticks:{font:{size:8}}}}}
  });

  // Gerencial charts
  const ctx4 = document.getElementById('rg-ch-estado');
  if (ctx4) charts.rge = new Chart(ctx4, {
    type:'pie',
    data:{labels:Object.keys(counts).map(k=>estadoMap[k]||k),datasets:[{data:Object.values(counts),backgroundColor:['#15803d','#1d4ed8','#d97706','#b91c1c','#475569','#c2410c'],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:10}}}}}
  });
  const ctx5 = document.getElementById('rg-ch-hosp');
  if (ctx5) charts.rgh = new Chart(ctx5, {
    type:'bar',
    data:{
      labels:hosps.map(h=>h.replace('Hospital ','H.').replace('Instituto de ','Inst.')),
      datasets:[
        {label:'Presentado',data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'valor_presentado')),backgroundColor:'rgba(29,78,216,.7)',borderRadius:4},
        {label:'Aprobado',data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'val_aprobado_iess')),backgroundColor:'rgba(21,128,61,.7)',borderRadius:4}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:9}}}},scales:{y:{ticks:{callback:v=>'$'+(v/1000).toFixed(0)+'k',font:{size:9}}},x:{ticks:{font:{size:8}}}}}
  });
}

function renderTablaRecientes() {
  const tbody = document.getElementById('tbody-recientes');
  if (!tbody) return;
  tbody.innerHTML = DB.tramites.slice(-7).reverse().map(t => `<tr>
    <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis">${t.hospital}</td>
    <td><strong>${t.numero_tramite}</strong></td>
    <td>${fMes(t.mes_atencion)}</td>
    <td style="text-align:right">$${fmt(t.valor_presentado)}</td>
    <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
  </tr>`).join('');
}

// ── TABLA TRAMITES ────────────────────────────────────────────────────
function filtrarTramites() { pagActual=1; renderTablaTramites(); }

function renderTablaTramites() {
  const busq = (document.getElementById('f-buscar')?.value||'').toLowerCase();
  const hosp = document.getElementById('f-hospital')?.value||'';
  const est  = document.getElementById('f-estado')?.value||'';
  const conv = document.getElementById('f-convenio')?.value||'';

  filtrados = DB.tramites.filter(t => {
    const mb = !busq||[t.hospital,t.numero_tramite,t.lote,t.iess_sub].some(v=>(v||'').toLowerCase().includes(busq));
    const mh = !hosp||t.hospital===hosp;
    const me = !est||t.estado===est;
    const mc = !conv||(t.iess_sub||'').includes(conv);
    return mb&&mh&&me&&mc;
  });

  const total = filtrados.length;
  const tPags = Math.ceil(total/POR_PAG);
  const ini = (pagActual-1)*POR_PAG;
  const pag = filtrados.slice(ini, ini+POR_PAG);

  const tbody = document.getElementById('tbody-tramites');
  if (!tbody) return;
  tbody.innerHTML = pag.length===0
    ? `<tr><td colspan="37" style="text-align:center;padding:2rem;color:#94a3b8">No hay registros</td></tr>`
    : pag.map(t => `<tr>
      <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis" title="${t.hospital}">${t.hospital}</td>
      <td>${t.iess_sub||'—'}</td>
      <td><strong>${t.numero_tramite}</strong></td>
      <td>${t.lote}</td>
      <td style="text-align:center">${t.num_expedientes||'—'}</td>
      <td>${t.tipo_afiliacion||'—'}</td>
      <td>${fMes(t.mes_atencion)}</td>
      <td style="text-align:right">$${fmt(t.valor_presentado)}</td>
      <td style="text-align:right">$${fmt(t.iva)}</td>
      <td style="text-align:right">$${fmt(t.valor_sin_iva)}</td>
      <td>${t.parte||'—'}</td>
      <td>${t.factura_manual||'—'}</td>
      <td>${t.fecha_parte||'—'}</td>
      <td style="text-align:right">$${fmt(t.abono_base)}</td>
      <td style="text-align:right">$${fmt(t.abono_iva)}</td>
      <td style="text-align:right">$${fmt(t.saldo)}</td>
      <td>${t.fecha_factura||'—'}</td>
      <td>${t.fecha_apelacion||'—'}</td>
      <td style="text-align:right">$${fmt(t.cancelacion_apelaciones)}</td>
      <td style="text-align:right">$${fmt(t.val_reclamado_iess)}</td>
      <td style="text-align:right">$${fmt(t.val_aprobado_iess)}</td>
      <td style="text-align:right">$${fmt(t.iva_aprobado)}</td>
      <td style="text-align:right;color:${(t.diferencia_reclamada||0)>0?'#b91c1c':'#15803d'}">$${fmt(t.diferencia_reclamada)}</td>
      <td>${t.oficio_hospital||'—'}</td>
      <td>${t.oficio_apelaciones||'—'}</td>
      <td style="text-align:right">$${fmt(t.saldo_cobrar)}</td>
      <td style="text-align:right">$${fmt(t.val_regularizado_apel)}</td>
      <td style="text-align:right">$${fmt(t.objecion_apelada)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(t.objecion_aceptada)}</td>
      <td style="text-align:right;color:#b91c1c">$${fmt(t.objecion_sin_respuesta)}</td>
      <td style="text-align:right">$${fmt(t.objecion_iess)}</td>
      <td style="text-align:right;color:#c2410c">$${fmt(t.glosa_final_inf)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(t.val_levantado_iess)}</td>
      <td style="text-align:right">$${fmt(t.iva_levantamiento)}</td>
      <td><span class="badge badge-${t.estado_hospital?.toLowerCase().replace(/ /g,'-')}">${t.estado_hospital||'—'}</span></td>
      <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
      <td>
        <button class="btn-icon" title="Ver" onclick="verDetalle(${t.id})">🔍</button>
        <button class="btn-icon" title="Editar" onclick="editarTramite(${t.id})">✏️</button>
        <button class="btn-icon" title="Eliminar" onclick="eliminarTramite(${t.id})" style="color:#b91c1c">🗑</button>
      </td>
    </tr>`).join('');

  document.getElementById('tbl-count').textContent = `${total} registros`;
  renderPaginacion(tPags);
}

function renderPaginacion(tPags) {
  const c = document.getElementById('pagination');
  if (!c) return;
  c.innerHTML = tPags<=1?'':Array.from({length:tPags},(_,i)=>i+1)
    .map(i=>`<button class="pg-btn ${i===pagActual?'active':''}" onclick="irPag(${i})">${i}</button>`).join('');
}
function irPag(p) { pagActual=p; renderTablaTramites(); }

// ── DETALLE TRAMITE ───────────────────────────────────────────────────
function verDetalle(id) {
  const t = DB.tramites.find(x=>x.id===id);
  if (!t) return;

  const s = (label, val, money=false) =>
    `<div class="detail-item"><label>${label}</label><span>${money?'$'+fmt(val):(val||'—')}</span></div>`;

  document.getElementById('modal-body').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item" style="grid-column:1/-1">
        <label>Hospital</label>
        <span style="font-size:1rem;font-weight:700">${t.hospital}</span>
        <span class="badge badge-${t.estado}" style="margin-left:8px">${eTxt(t.estado)}</span>
      </div>
      <div class="dsec">Identificación</div>
      ${s('N° Trámite',t.numero_tramite)} ${s('IESS/Sub.',t.iess_sub)}
      ${s('Lote',t.lote)} ${s('# Expedientes',t.num_expedientes)}
      ${s('Tipo Afiliación',t.tipo_afiliacion)} ${s('Mes Atención',fMes(t.mes_atencion))}
      ${s('Parte',t.parte)} ${s('Oficio Hospital',t.oficio_hospital)}
      ${s('Dependencia',t.dependencia)} ${s('Procedimiento Hospital',t.procedimiento_hospital)}
      ${s('Procedimiento Informes',t.procedimiento_informes)} ${s('N° Solicitud',t.num_solicitud)}
      ${s('N° Lote Abono',t.num_lote_abono)} ${s('N° Oficio',t.numero_oficio)}
      ${s('Fecha Entrega',t.fecha_entrega)} ${s('Fecha Oficio',t.fecha_oficio)}

      <div class="dsec">Valores Financieros</div>
      ${s('Valor Presentado',t.valor_presentado,true)} ${s('IVA Presentado',t.iva,true)}
      ${s('Valor sin IVA',t.valor_sin_iva,true)} ${s('Val.Pres.sin Auditoría',t.valor_pres_sin_audit,true)}
      ${s('Factura Manual',t.factura_manual)} ${s('Fecha Parte',t.fecha_parte)}
      ${s('Fecha Factura',t.fecha_factura)} ${s('Abono Base',t.abono_base,true)}
      ${s('Abono IVA',t.abono_iva,true)} ${s('Saldo 40/30/10%',t.saldo,true)}
      ${s('Abono 26M',t.abono_26m,true)} ${s('Preliquidación Abono',t.preliquidacion_abono,true)}
      ${s('Saldo Abono',t.saldo_abono,true)}

      <div class="dsec">Apelaciones y Liquidación IESS</div>
      ${s('Fecha Apelación',t.fecha_apelacion)} ${s('Val.Reclamado IESS',t.val_reclamado_iess,true)}
      ${s('Val.Aprobado IESS',t.val_aprobado_iess,true)} ${s('IVA Aprobado',t.iva_aprobado,true)}
      ${s('Dif.Reclamada',t.diferencia_reclamada,true)} ${s('Dif.IESS/JBG',t.dif_iess_jbg,true)}
      ${s('Oficio Apelaciones',t.oficio_apelaciones)} ${s('Val.Apelado IESS',t.val_apelado_iess,true)}
      ${s('Val.Levantado IESS',t.val_levantado_iess,true)} ${s('IVA Levantamiento',t.iva_levantamiento,true)}
      ${s('Val.Regularizado Apel.',t.val_regularizado_apel,true)} ${s('Cancelac.Apelaciones',t.cancelacion_apelaciones,true)}
      ${s('N°Ofic.Solicitud Obj.',t.oficio_solicitud_objec)} ${s('F.Ofic.Solicitud',t.fecha_oficio_solicitud_objec)}
      ${s('N°Ofic.Resp.IESS',t.oficio_respuesta_iess)} ${s('F.Respuesta IESS',t.fecha_respuesta_iess)}
      ${s('F.Notif.Hospital',t.fecha_notif_hospital)} ${s('F.Debe Responder Hosp.',t.fecha_debe_responder_hosp)}

      <div class="dsec">Glosas, Objeciones y Reexpedición</div>
      ${s('Obj.Apelada',t.objecion_apelada,true)} ${s('Obj.Aceptada',t.objecion_aceptada,true)}
      ${s('Obj.sin Respuesta',t.objecion_sin_respuesta,true)} ${s('Obj.según IESS',t.objecion_iess,true)}
      ${s('Glosa Final Informes',t.glosa_final_inf,true)} ${s('Saldo x Cobrar',t.saldo_cobrar,true)}
      ${s('IVA Auditado',t.iva_auditado,true)} ${s('IVA Objetado',t.iva_objetado,true)}
      ${s('IVA Apelado',t.iva_apelado,true)} ${s('IVA Aprobado 2aAudit.',t.iva_aprobado_2audit,true)}
      ${s('IVA Glosado',t.iva_glosado,true)} ${s('Total Aprobado sin Pago',t.total_aprobado_sin_pago,true)}
      ${s('N°Trámite Reexp.',t.num_tramite_reexp)} ${s('Val.Aprobado Reexp.',t.val_aprobado_reexp,true)}
      ${s('Estado Hospital',t.estado_hospital)} ${s('Observación',t.observacion)}
    </div>`;

  document.getElementById('modal-bg').classList.add('open');
}

function editarTramite(id) {
  const t = DB.tramites.find(x=>x.id===id);
  if (!t) return;
  navegarA('nuevo','Nuevo Trámite');
  setTimeout(()=>{
    const form = document.getElementById('form-tramite');
    Object.keys(t).forEach(k=>{
      const el = form.querySelector(`[name="${k}"]`);
      if (el) el.value = t[k]!==undefined&&t[k]!==null?t[k]:'';
    });
    form.dataset.editId = id;
    autoCalc();
    toast('✏️ Trámite cargado para edición');
  },120);
}

function eliminarTramite(id) {
  if (!confirm('¿Eliminar este trámite? No se puede deshacer.')) return;
  DB.tramites = DB.tramites.filter(t=>t.id!==id);
  guardar();
  renderTablaTramites();
  renderDashboard();
  toast('Trámite eliminado');
}

function cerrarModal() {
  document.getElementById('modal-bg').classList.remove('open');
}

// ── FORMULARIO ────────────────────────────────────────────────────────
function autoCalc() {
  const vp  = parseFloat(document.querySelector('[name="valor_presentado"]')?.value)||0;
  const iva = parseFloat(document.querySelector('[name="iva"]')?.value)||0;
  const el  = document.getElementById('f-siniva');
  if (el) el.value = Math.max(0,vp-iva).toFixed(2);
}

function guardarTramite(e) {
  e.preventDefault();
  const form = e.target;
  const fd   = new FormData(form);
  const data = {};
  fd.forEach((v,k) => {
    const n = parseFloat(v);
    data[k] = (v==='' ? '' : (isNaN(n) || v.includes('-') && v.length===10 || v.length===7) ? v : n);
  });
  const editId = form.dataset.editId;
  data.id = editId ? parseInt(editId) : Date.now();
  if (!data.valor_sin_iva || data.valor_sin_iva===0)
    data.valor_sin_iva = (parseFloat(data.valor_presentado)||0) - (parseFloat(data.iva)||0);

  if (editId) {
    const idx = DB.tramites.findIndex(t=>t.id===parseInt(editId));
    if (idx!==-1) DB.tramites[idx]=data;
    delete form.dataset.editId;
    toast('✓ Trámite actualizado');
  } else {
    DB.tramites.push(data);
    toast('✓ Trámite guardado');
  }
  guardar();
  form.reset();
  renderDashboard();
  renderTodosReportes();
  setTimeout(()=>navegarA('listado','Trámites'),700);
}

function limpiarForm() {
  document.getElementById('form-tramite').reset();
  delete document.getElementById('form-tramite').dataset.editId;
  document.getElementById('form-titulo').textContent = 'Registrar Nuevo Trámite';
}

// ── REPORTES ──────────────────────────────────────────────────────────
function renderTodosReportes() {
  renderRptLotes();
  renderRptHospital();
  renderRptValores();
  renderRptApelaciones();
  renderRptGlosas();
  renderResumenGerencial();
}

function renderRptLotes() {
  const agrp = {};
  DB.tramites.forEach(t => {
    if (!agrp[t.lote]) agrp[t.lote]={n:0,exp:0,pres:0,iva:0,siniva:0,apr:0,ivaApr:0,dif:0,obj:0,objAcep:0,objSinResp:0,glosa:0,reg:0,saldo:0,estados:{}};
    const g=agrp[t.lote];
    g.n++; g.exp+=(t.num_expedientes||0);
    g.pres+=(t.valor_presentado||0); g.iva+=(t.iva||0); g.siniva+=(t.valor_sin_iva||0);
    g.apr+=(t.val_aprobado_iess||0); g.ivaApr+=(t.iva_aprobado||0);
    g.dif+=(t.diferencia_reclamada||0); g.obj+=(t.objecion_apelada||0);
    g.objAcep+=(t.objecion_aceptada||0); g.objSinResp+=(t.objecion_sin_respuesta||0);
    g.glosa+=(t.glosa_final_inf||0); g.reg+=(t.val_regularizado_apel||0);
    g.saldo+=(t.saldo_cobrar||0);
    g.estados[t.estado]=(g.estados[t.estado]||0)+1;
  });

  const tbody=document.getElementById('tbody-rpt-lotes');
  const tfoot=document.getElementById('tfoot-rpt-lotes');
  if (!tbody) return;

  let tp=0,ts=0,ta=0,tg=0,tc=0;
  tbody.innerHTML=Object.entries(agrp).sort((a,b)=>a[0].localeCompare(b[0])).map(([lote,g])=>{
    tp+=g.pres; ts+=g.siniva; ta+=g.apr; tg+=g.glosa; tc+=g.saldo;
    const ep=Object.entries(g.estados).sort((a,b)=>b[1]-a[1])[0]?.[0]||'proceso';
    return `<tr>
      <td><strong>${lote}</strong></td>
      <td style="text-align:center">${g.n}</td><td style="text-align:center">${g.exp}</td>
      <td style="text-align:right">$${fmt(g.pres)}</td>
      <td style="text-align:right">$${fmt(g.iva)}</td>
      <td style="text-align:right">$${fmt(g.siniva)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(g.apr)}</td>
      <td style="text-align:right">$${fmt(g.ivaApr)}</td>
      <td style="text-align:right;color:${g.dif>0?'#b91c1c':'#15803d'}">$${fmt(g.dif)}</td>
      <td style="text-align:right">$${fmt(g.obj)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(g.objAcep)}</td>
      <td style="text-align:right;color:#b91c1c">$${fmt(g.objSinResp)}</td>
      <td style="text-align:right;color:#c2410c">$${fmt(g.glosa)}</td>
      <td style="text-align:right">$${fmt(g.reg)}</td>
      <td style="text-align:right">$${fmt(g.saldo)}</td>
      <td><span class="badge badge-${ep}">${eTxt(ep)}</span></td>
    </tr>`;
  }).join('');
  if (tfoot) tfoot.innerHTML=`<tr>
    <td colspan="3"><strong>TOTALES</strong></td>
    <td style="text-align:right"><strong>$${fmt(tp)}</strong></td>
    <td></td>
    <td style="text-align:right"><strong>$${fmt(ts)}</strong></td>
    <td style="text-align:right"><strong>$${fmt(ta)}</strong></td>
    <td colspan="2"></td>
    <td colspan="3"></td>
    <td style="text-align:right"><strong>$${fmt(tg)}</strong></td>
    <td></td>
    <td style="text-align:right"><strong>$${fmt(tc)}</strong></td>
    <td></td>
  </tr>`;
}

function renderRptHospital() {
  const conv = document.getElementById('f-rpt-convenio')?.value||'';
  const src = conv ? DB.tramites.filter(t=>(t.iess_sub||'').includes(conv)) : DB.tramites;
  const agrp = {};
  src.forEach(t=>{
    const k=`${t.hospital}||${t.iess_sub}`;
    if (!agrp[k]) agrp[k]={hospital:t.hospital,conv:t.iess_sub,n:0,exp:0,amb:0,hosp:0,eme:0,pres:0,apr:0,ivaApr:0,glosa:0};
    const g=agrp[k];
    g.n++; g.exp+=(t.num_expedientes||0);
    if ((t.tipo_afiliacion||'').includes('Ambulatorio')) g.amb+=(t.num_expedientes||0);
    if ((t.tipo_afiliacion||'').includes('Hospitaliz')) g.hosp+=(t.num_expedientes||0);
    if ((t.tipo_afiliacion||'').includes('Emergencia')) g.eme+=(t.num_expedientes||0);
    g.pres+=(t.valor_presentado||0); g.apr+=(t.val_aprobado_iess||0);
    g.ivaApr+=(t.iva_aprobado||0); g.glosa+=(t.glosa_final_inf||0);
  });
  const tbody=document.getElementById('tbody-rpt-hospital');
  if (!tbody) return;
  tbody.innerHTML=Object.values(agrp).map(g=>{
    const pct=g.pres>0?(g.apr/g.pres*100).toFixed(1):'0.0';
    const col=parseFloat(pct)>=80?'#15803d':parseFloat(pct)>=60?'#d97706':'#b91c1c';
    return `<tr>
      <td>${g.hospital}</td><td>${g.conv||'—'}</td>
      <td style="text-align:center">${g.n}</td><td style="text-align:center">${g.exp}</td>
      <td style="text-align:center">${g.amb}</td><td style="text-align:center">${g.hosp}</td>
      <td style="text-align:center">${g.eme}</td>
      <td style="text-align:right">$${fmt(g.pres)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(g.apr)}</td>
      <td style="text-align:right">$${fmt(g.ivaApr)}</td>
      <td style="text-align:right;color:#c2410c">$${fmt(g.glosa)}</td>
      <td style="text-align:center"><strong style="color:${col}">${pct}%</strong></td>
    </tr>`;
  }).join('');
}

function renderRptValores() {
  const tbody=document.getElementById('tbody-rpt-valores');
  if (!tbody) return;
  const tp=sum(DB.tramites,'valor_presentado'), ta=sum(DB.tramites,'val_aprobado_iess'),
        to=sum(DB.tramites,'objecion_apelada'), tg=sum(DB.tramites,'glosa_final_inf');
  set('rv-presentado','$'+fmt(tp)); set('rv-aprobado','$'+fmt(ta));
  set('rv-objetado','$'+fmt(to)); set('rv-glosa','$'+fmt(tg));
  tbody.innerHTML=DB.tramites.map(t=>`<tr>
    <td>${t.hospital}</td><td>${t.iess_sub||'—'}</td><td>${fMes(t.mes_atencion)}</td>
    <td style="text-align:center">${t.num_expedientes||'—'}</td>
    <td style="text-align:right">$${fmt(t.valor_presentado)}</td>
    <td style="text-align:right">$${fmt(t.iva)}</td>
    <td style="text-align:right">$${fmt(t.valor_sin_iva)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.val_aprobado_iess)}</td>
    <td style="text-align:right">$${fmt(t.iva_aprobado)}</td>
    <td style="text-align:right;color:${(t.diferencia_reclamada||0)>0?'#b91c1c':'#15803d'}">$${fmt(t.diferencia_reclamada)}</td>
    <td style="text-align:right">$${fmt(t.objecion_apelada)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.objecion_aceptada)}</td>
    <td style="text-align:right;color:#c2410c">$${fmt(t.glosa_final_inf)}</td>
    <td style="text-align:right">$${fmt(t.val_regularizado_apel)}</td>
  </tr>`).join('');
}

function renderRptApelaciones() {
  const tbody=document.getElementById('tbody-rpt-apelaciones');
  if (!tbody) return;
  const src=DB.tramites.filter(t=>t.fecha_apelacion||(t.objecion_apelada||0)>0);
  tbody.innerHTML=src.map(t=>`<tr>
    <td>${t.hospital}</td><td>${t.numero_tramite}</td><td>${t.lote}</td>
    <td>${t.fecha_apelacion||'—'}</td>
    <td style="text-align:right">$${fmt(t.objecion_apelada)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.objecion_aceptada)}</td>
    <td style="text-align:right;color:#b91c1c">$${fmt(t.objecion_sin_respuesta)}</td>
    <td style="text-align:right">$${fmt(t.objecion_iess)}</td>
    <td>${t.fecha_oficio_solicitud_objec||'—'}</td>
    <td>${t.oficio_solicitud_objec||'—'}</td>
    <td>${t.fecha_respuesta_iess||'—'}</td>
    <td>${t.oficio_respuesta_iess||'—'}</td>
    <td>${t.fecha_notif_hospital||'—'}</td>
    <td style="text-align:right">$${fmt(t.cancelacion_apelaciones)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.val_regularizado_apel)}</td>
    <td style="text-align:right">$${fmt(t.val_apelado_iess)}</td>
    <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
  </tr>`).join('');
}

function renderRptGlosas() {
  const tbody=document.getElementById('tbody-rpt-glosas');
  if (!tbody) return;
  tbody.innerHTML=DB.tramites.map(t=>`<tr>
    <td>${t.hospital}</td><td>${t.numero_tramite}</td><td>${t.iess_sub||'—'}</td>
    <td style="text-align:right">$${fmt(t.iva)}</td>
    <td style="text-align:right">$${fmt(t.iva_auditado)}</td>
    <td style="text-align:right;color:#b91c1c">$${fmt(t.iva_objetado)}</td>
    <td style="text-align:right">$${fmt(t.iva_apelado)}</td>
    <td style="text-align:right">$${fmt(t.iva_aprobado_2audit)}</td>
    <td style="text-align:right;color:#c2410c">$${fmt(t.iva_glosado)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.iva_aprobado)}</td>
    <td style="text-align:right;color:#c2410c">$${fmt(t.glosa_final_inf)}</td>
    <td style="text-align:right;color:#15803d">$${fmt(t.val_levantado_iess)}</td>
    <td style="text-align:right">$${fmt(t.iva_levantamiento)}</td>
    <td>${t.estado_hospital||'—'}</td>
    <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
  </tr>`).join('');
}

function renderResumenGerencial() {
  const t=DB.tramites;
  const tp=sum(t,'valor_presentado'), ta=sum(t,'val_aprobado_iess'),
        ts=sum(t,'saldo_cobrar'), to=sum(t,'objecion_apelada'), tg=sum(t,'glosa_final_inf');
  set('rg-presentado','$'+fmt(tp)); set('rg-aprobado','$'+fmt(ta));
  set('rg-saldo','$'+fmt(ts)); set('rg-objecion','$'+fmt(to)); set('rg-glosa','$'+fmt(tg));

  // Por convenio
  const convMap={};
  t.forEach(x=>{
    const c=x.iess_sub||'—';
    if (!convMap[c]) convMap[c]={n:0,exp:0,pres:0,apr:0,ivaApr:0,obj:0,glosa:0,saldo:0};
    const g=convMap[c];
    g.n++; g.exp+=(x.num_expedientes||0); g.pres+=(x.valor_presentado||0);
    g.apr+=(x.val_aprobado_iess||0); g.ivaApr+=(x.iva_aprobado||0);
    g.obj+=(x.objecion_apelada||0); g.glosa+=(x.glosa_final_inf||0); g.saldo+=(x.saldo_cobrar||0);
  });
  const tbody=document.getElementById('tbody-rg-convenio');
  if (tbody) tbody.innerHTML=Object.entries(convMap).map(([c,g])=>{
    const pct=g.pres>0?(g.apr/g.pres*100).toFixed(1):'0.0';
    return `<tr>
      <td><strong>${c}</strong></td>
      <td style="text-align:center">${g.n}</td>
      <td style="text-align:center">${g.exp}</td>
      <td style="text-align:right">$${fmt(g.pres)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(g.apr)}</td>
      <td style="text-align:right">$${fmt(g.ivaApr)}</td>
      <td style="text-align:right;color:#b91c1c">$${fmt(g.obj)}</td>
      <td style="text-align:right;color:#c2410c">$${fmt(g.glosa)}</td>
      <td style="text-align:right">$${fmt(g.saldo)}</td>
      <td style="text-align:center"><strong style="color:${parseFloat(pct)>=80?'#15803d':parseFloat(pct)>=60?'#d97706':'#b91c1c'}">${pct}%</strong></td>
    </tr>`;
  }).join('');
}

// ── EXPORTAR CSV ──────────────────────────────────────────────────────
function exportarCSV() {
  const cols=['Hospital','IESS/Sub','N°Trámite','Lote','Expedientes','Tipo Afiliación','Mes Atención',
    'Valor Presentado','IVA','Valor sin IVA','Parte','Factura Manual','Fecha Parte',
    'Abono Base','Abono IVA','Saldo','Fecha Factura','Fecha Apelación',
    'Cancelac.Apelaciones','Val.Reclamado IESS','Val.Aprobado IESS','IVA Aprobado',
    'Dif.Reclamada','Oficio Hospital','Oficio Apelaciones','Saldo x Cobrar',
    'Val.Regularizado Apel.','Obj.Apelada','Obj.Aceptada','Obj.sin Respuesta',
    'Obj.según IESS','Glosa Final','Val.Levantado IESS','IVA Levantamiento',
    'Estado Hospital','Estado','Observación'];
  const rows=DB.tramites.map(t=>([t.hospital,t.iess_sub,t.numero_tramite,t.lote,
    t.num_expedientes,t.tipo_afiliacion,t.mes_atencion,t.valor_presentado,t.iva,
    t.valor_sin_iva,t.parte,t.factura_manual,t.fecha_parte,t.abono_base,t.abono_iva,
    t.saldo,t.fecha_factura,t.fecha_apelacion,t.cancelacion_apelaciones,t.val_reclamado_iess,
    t.val_aprobado_iess,t.iva_aprobado,t.diferencia_reclamada,t.oficio_hospital,
    t.oficio_apelaciones,t.saldo_cobrar,t.val_regularizado_apel,t.objecion_apelada,
    t.objecion_aceptada,t.objecion_sin_respuesta,t.objecion_iess,t.glosa_final_inf,
    t.val_levantado_iess,t.iva_levantamiento,t.estado_hospital,eTxt(t.estado),t.observacion
  ]).map(v=>`"${v!==undefined&&v!==null?v:''}"`).join(','));
  const csv=[cols.join(','),...rows].join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));
  a.download=`tramites_iess_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  toast('✓ CSV exportado');
}

function exportarReporte() { exportarCSV(); }

// ── OFICIOS ───────────────────────────────────────────────────────────
const DEST_MAP = {
  'INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL - IESS':
    {trato:'Señor Doctor',nombre:'',cargo:'Coordinador Provincial de Prestaciones del Seguro de Salud Guayas'},
  'INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL CAMPESINO - IESS':
    {trato:'Señor',nombre:'',cargo:'Coordinador del Seguro Social Campesino - Guayas'},
  'INSTITUTO DE SEGURIDAD SOCIAL DE LAS FUERZAS ARMADAS -ISSFA':
    {trato:'Señor Teniente Coronel',nombre:'Frank Cevallos Molina',cargo:'Director de la Dirección Nacional de Salud'},
  'MINISTERIO DE SALUD PÚBLICA':
    {trato:'Señora Doctora',nombre:'Mariana Italia Pihuave Nacif',cargo:'Coordinadora Zonal 8 – Salud'},
  'SERVICIO PUBLICO PARA PAGO DE ACCIDENTES DE TRÁNSITO-SPPAT':
    {trato:'Señor',nombre:'',cargo:''}
};

function autoFillDestinatario() {
  const inst=document.getElementById('of-inst').value;
  const manual=document.getElementById('of-inst-manual');
  manual.style.display = inst==='otro'?'block':'none';
  if (DEST_MAP[inst]) {
    const d=DEST_MAP[inst];
    if (d.trato) document.getElementById('of-trato').value=d.trato;
    if (d.nombre) document.getElementById('of-nombre').value=d.nombre;
    if (d.cargo) document.getElementById('of-cargo').value=d.cargo;
  }
  renderOficio();
}

function renderOficio() {
  const g=id=>document.getElementById(id)?.value?.trim()||'';
  const num=g('of-num')||'JBG-DC-2026-___';
  const fechaRaw=g('of-fecha');
  const ciudad=g('of-ciudad')||'Guayaquil';
  const trato=g('of-trato');
  const nombre=g('of-nombre');
  const cargo=g('of-cargo');
  const instSel=g('of-inst');
  const instManual=g('of-inst-manual');
  const inst=instSel==='otro'?instManual:instSel;
  const hosp=g('of-hosp');
  const mes=g('of-mes');
  const exp=g('of-exp');
  const valor=g('of-valor');
  const serv=g('of-servicio')||'Consulta Externa';
  const asunto=g('of-asunto');
  const firmante=g('of-firmante');
  const cargoFirm=g('of-cargo-firm');

  let fechaFmt='';
  if (fechaRaw){
    const d=new Date(fechaRaw+'T12:00:00');
    fechaFmt=d.toLocaleDateString('es-EC',{day:'numeric',month:'long',year:'numeric'});
  }
  const mesFmt=mes?new Date(mes+'-01').toLocaleDateString('es-EC',{month:'long',year:'numeric'}):'[mes de atención]';

  const h=id=>document.getElementById(id);
  const st=(id,html)=>{const e=h(id);if(e)e.innerHTML=html;};

  st('prev-num','N° '+num);
  st('prev-fecha',fechaFmt);
  st('prev-ciudad',ciudad+'.-');
  st('prev-trato',`<strong>${trato} ${nombre}</strong>`);
  st('prev-nombre-dest','');
  st('prev-cargo-dest',cargo);
  st('prev-inst',inst);
  st('prev-hosp',hosp?`<strong>${hosp}</strong>`:'<strong>[Hospital]</strong>');
  st('prev-mes',`<strong>${mesFmt}</strong>`);
  st('prev-serv',serv);
  st('prev-exp',exp||'—');
  st('prev-val',valor?'$'+parseFloat(valor).toLocaleString('es-EC',{minimumFractionDigits:2}):'—');
  st('prev-asunto',asunto);
  st('prev-firmante',`<strong>${firmante||'[Firmante]'}</strong>`);
  st('prev-cargo-firm',cargoFirm);
}

function guardarOficio() {
  const g=id=>document.getElementById(id)?.value?.trim()||'';
  const num=g('of-num');
  if (!num){toast('Ingrese el N° de oficio');return;}
  DB.oficios.push({id:Date.now(),numero:num,fecha:g('of-fecha'),hospital:g('of-hosp'),
    institucion:g('of-inst'),mes:g('of-mes'),exp:g('of-exp'),valor:g('of-valor')});
  localStorage.setItem('jbg_v2_oficios',JSON.stringify(DB.oficios));
  renderListaOficios();
  toast('✓ Oficio guardado');
}

function renderListaOficios() {
  const c=document.getElementById('lista-oficios');
  if (!c) return;
  if (!DB.oficios.length){c.innerHTML='<p style="color:#aaa;text-align:center;padding:1rem">No hay oficios guardados</p>';return;}
  c.innerHTML=DB.oficios.slice().reverse().map(o=>`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:.55rem .8rem;border-bottom:1px solid #f1f5f9;font-size:12px">
      <div><strong>${o.numero}</strong><br><span style="color:#64748b">${o.hospital||'—'} · ${fMes(o.mes)}</span></div>
      <button class="btn-icon" onclick="eliminarOficio(${o.id})" style="color:#b91c1c">🗑</button>
    </div>`).join('');
}

function eliminarOficio(id){
  DB.oficios=DB.oficios.filter(o=>o.id!==id);
  localStorage.setItem('jbg_v2_oficios',JSON.stringify(DB.oficios));
  renderListaOficios();
}

function imprimirOficio(){
  const body=document.getElementById('oficio-doc').innerHTML;
  const w=window.open('','_blank','width=820,height=950');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>body{font-family:'DM Sans',sans-serif;font-size:12.5pt;line-height:1.7;margin:2cm;color:#0f172a}
  .oficio-membrete{display:flex;align-items:center;gap:13px;border-bottom:3px solid #1d4ed8;padding-bottom:12px;margin-bottom:16px}
  .membrete-logo{width:48px;height:48px;border-radius:7px;background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#fff;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center}
  .oficio-nf{display:flex;justify-content:space-between;color:#64748b;margin-bottom:12px;font-size:11pt}
  .oficio-dest p,.oficio-dest{margin-bottom:2px}
  .oficio-desp{margin-bottom:30px}
  .firma-line{width:180px;border-top:1px solid #333;margin-bottom:5px;margin-top:20px}
  table{width:100%;border-collapse:collapse;margin:10px 0}th,td{border:1px solid #e2e8f0;padding:7px 11px}th{background:#f8fafc}
  </style></head><body>${body}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(()=>w.print(),500);
}

// ── HELPERS ───────────────────────────────────────────────────────────
function sum(arr,k){return arr.reduce((s,x)=>s+(parseFloat(x[k])||0),0);}
function fmt(v){return (parseFloat(v)||0).toLocaleString('es-EC',{minimumFractionDigits:2,maximumFractionDigits:2});}
function fMes(m){if(!m)return'—';try{return new Date(m+'-01').toLocaleDateString('es-EC',{month:'short',year:'numeric'});}catch{return m;}}
function eTxt(e){return{aprobado:'Aprobado',proceso:'En Proceso',apelacion:'Apelación',objetado:'Objetado',cancelado:'Cancelado',glosa:'Glosa'}[e]||e||'—';}
function set(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

/* ================================================================
   CONSULTA DE TRÁMITES — Lógica
   ================================================================ */

let tramiteConsultaActual = null;

function buscarTramiteConsulta() {
  const q = (document.getElementById('consulta-input')?.value || '').trim().toLowerCase();
  const clearBtn = document.getElementById('consulta-clear');
  const resPanel = document.getElementById('consulta-resultados');
  const emptyEl  = document.getElementById('consulta-empty');
  const panel    = document.getElementById('consulta-panel');

  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

  if (!q || q.length < 2) {
    resPanel.style.display = 'none';
    panel.style.display    = 'none';
    emptyEl.style.display  = 'block';
    return;
  }

  const resultados = DB.tramites.filter(t =>
    [t.numero_tramite, t.hospital, t.lote, t.num_solicitud, t.iess_sub]
      .some(v => (v || '').toLowerCase().includes(q))
  );

  const titulo = document.getElementById('consulta-res-titulo');
  if (titulo) titulo.textContent = `${resultados.length} resultado(s) para "${q}"`;

  const tbody = document.getElementById('tbody-consulta-res');
  if (!tbody) return;

  if (resultados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:1.5rem;color:#94a3b8">No se encontraron trámites</td></tr>`;
    resPanel.style.display = 'block';
    panel.style.display    = 'none';
    emptyEl.style.display  = 'none';
    return;
  }

  tbody.innerHTML = resultados.map(t => `
    <tr onclick="abrirConsultaTramite(${t.id})" style="cursor:pointer">
      <td><strong>${t.hospital}</strong></td>
      <td style="color:var(--azul);font-weight:700">${t.numero_tramite}</td>
      <td>${t.lote}</td>
      <td>${fMes(t.mes_atencion)}</td>
      <td style="text-align:center">${t.num_expedientes || '—'}</td>
      <td>${t.tipo_afiliacion || '—'}</td>
      <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
      <td>
        <button class="btn-sm btn-primary" onclick="event.stopPropagation();abrirConsultaTramite(${t.id})">
          Consultar →
        </button>
      </td>
    </tr>`).join('');

  resPanel.style.display = 'block';
  emptyEl.style.display  = 'none';

  // Si hay un único resultado, abrirlo automáticamente
  if (resultados.length === 1) {
    setTimeout(() => abrirConsultaTramite(resultados[0].id), 200);
  }
}

function abrirConsultaTramite(id) {
  const t = DB.tramites.find(x => x.id === id);
  if (!t) return;
  tramiteConsultaActual = t;

  // Actualizar título
  set('c-titulo-tramite', `Trámite ${t.numero_tramite}`);
  set('c-subtitulo-tramite', `${t.hospital} — ${t.iess_sub || ''} — ${fMes(t.mes_atencion)}`);

  // Badge estado
  const badge = document.getElementById('c-estado-badge');
  if (badge) {
    badge.className = `badge badge-${t.estado}`;
    badge.textContent = eTxt(t.estado);
  }

  // ── DATOS SISTEMA EXTERNO (simulados como pre-extraídos) ──
  set('c-hospital',              t.hospital || '—');
  set('c-iess-sub',              t.iess_sub || '—');
  set('c-oficio-hospital',       t.oficio_hospital || '—');
  set('c-num-solicitud',         t.num_solicitud || simulateNumSolicitud(t));
  set('c-rc',                    t.responsabilidad_compartida || (t.iess_sub?.includes('IESS') ? 'No aplica' : 'RC-' + t.lote));
  set('c-mes-atencion',          fMes(t.mes_atencion));
  set('c-numero-tramite',        t.numero_tramite || '—');
  set('c-lote',                  t.lote || '—');
  set('c-expedientes',           t.num_expedientes ? t.num_expedientes.toString() : '—');
  set('c-tipo-afiliacion',       t.tipo_afiliacion || '—');
  set('c-procedimiento-hospital', t.procedimiento_hospital || simulateProcedimiento(t));
  set('c-procedimiento-informes', t.procedimiento_informes || simulateProcedimientoInf(t));

  // Fecha de sincronización simulada
  const ahora = new Date().toLocaleString('es-EC', {
    day:'2-digit', month:'short', year:'numeric',
    hour:'2-digit', minute:'2-digit'
  });
  set('c-sync-fecha', `Última sincronización: ${ahora}`);

  // ── LLENAR CAMPOS EDITABLES DEL FORMULARIO ──
  const form = document.getElementById('form-consulta-adicional');
  if (!form) return;

  document.getElementById('c-tramite-id').value = id;

  const campos = [
    'valor_presentado','iva','valor_sin_iva','valor_pres_sin_audit',
    'parte','factura_manual','fecha_parte','fecha_factura',
    'abono_base','abono_iva','saldo','fecha_entrega',
    'fecha_apelacion','cancelacion_apelaciones','val_reclamado_iess','val_aprobado_iess',
    'iva_aprobado','diferencia_reclamada','val_regularizado_apel','oficio_apelaciones',
    'oficio_solicitud_objec','fecha_oficio_solicitud_objec','oficio_respuesta_iess',
    'fecha_respuesta_iess','val_levantado_iess','iva_levantamiento',
    'fecha_notif_hospital','fecha_debe_responder_hosp',
    'objecion_apelada','objecion_aceptada','objecion_sin_respuesta','objecion_iess',
    'glosa_final_inf','saldo_cobrar','iva_glosado','iva_auditado',
    'total_aprobado_sin_pago','val_cancelado_total_inf','estado_hospital','estado','observacion'
  ];
  campos.forEach(k => {
    const el = form.querySelector(`[name="${k}"]`);
    if (el && t[k] !== undefined && t[k] !== null) el.value = t[k];
  });

  // Auto-calcular
  autoCalcConsulta();

  // Mostrar panel
  document.getElementById('consulta-panel').style.display = 'block';
  document.getElementById('consulta-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Simuladores de datos de sistema externo
function simulateNumSolicitud(t) {
  const n = String(t.id * 1000 + 203).padStart(9, '0');
  return `001-953-${n}`;
}
function simulateProcedimiento(t) {
  const map = { Ambulatorio: 'CONS-EXT-001', Hospitalización: 'HOSP-INT-002', Emergencia: 'EMER-URG-003', 'Consulta Externa': 'CONS-EXT-004' };
  return map[t.tipo_afiliacion] || 'PROC-GEN-000';
}
function simulateProcedimientoInf(t) {
  return `INF-${(t.iess_sub || 'IESS').replace('/', '-')}-${t.lote || '000'}`;
}

function autoCalcConsulta() {
  const form = document.getElementById('form-consulta-adicional');
  if (!form) return;
  const vp  = parseFloat(form.querySelector('[name="valor_presentado"]')?.value) || 0;
  const iva = parseFloat(form.querySelector('[name="iva"]')?.value) || 0;
  const el  = document.getElementById('c-siniva');
  if (el) el.value = Math.max(0, vp - iva).toFixed(2);
}

function guardarConsultaAdicional(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('c-tramite-id').value);
  const t  = DB.tramites.find(x => x.id === id);
  if (!t) return;

  const form = e.target;
  const fd = new FormData(form);
  fd.forEach((v, k) => {
    const n = parseFloat(v);
    t[k] = (v === '' ? '' : (!isNaN(n) && !['parte','factura_manual','oficio_apelaciones',
      'oficio_solicitud_objec','oficio_respuesta_iess','estado_hospital','estado','observacion'].includes(k))
      ? n : v);
  });

  guardar();
  renderDashboard();
  renderTodosReportes();
  toast('✓ Trámite actualizado desde Consulta');

  // Refrescar el badge de estado
  const badge = document.getElementById('c-estado-badge');
  if (badge) {
    badge.className = `badge badge-${t.estado}`;
    badge.textContent = eTxt(t.estado);
  }
}

function cerrarConsulta() {
  document.getElementById('consulta-panel').style.display = 'none';
  document.getElementById('consulta-input').value = '';
  document.getElementById('consulta-resultados').style.display = 'none';
  document.getElementById('consulta-empty').style.display = 'block';
  document.getElementById('consulta-clear').style.display = 'none';
  tramiteConsultaActual = null;
}

function limpiarConsulta() {
  document.getElementById('consulta-input').value = '';
  buscarTramiteConsulta();
}

function simularSincronizacion() {
  const btn = document.querySelector('.btn-sync');
  if (btn) {
    btn.textContent = '⟳ Sincronizando…';
    btn.disabled = true;
  }
  setTimeout(() => {
    const ahora = new Date().toLocaleString('es-EC', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    set('c-sync-fecha', `Última sincronización: ${ahora}`);
    if (btn) { btn.textContent = '⟳ Sincronizar'; btn.disabled = false; }
    toast('✅ Datos sincronizados con el sistema externo');
  }, 1800);
}

/* ================================================================
   REPORTE DE OFICIOS
   ================================================================ */

let oficiosFiltrados = [];

function filtrarRptOficios() {
  const busq = (document.getElementById('f-rpt-oficio-buscar')?.value || '').toLowerCase();
  const hosp = document.getElementById('f-rpt-oficio-hosp')?.value || '';
  const mes  = document.getElementById('f-rpt-oficio-mes')?.value || '';

  oficiosFiltrados = DB.oficios.filter(o => {
    const mb = !busq || [o.numero, o.hospital, o.institucion, o.firmante, o.cargo_firm]
      .some(v => (v || '').toLowerCase().includes(busq));
    const mh = !hosp || o.hospital === hosp;
    const mm = !mes  || (o.mes || '').startsWith(mes);
    return mb && mh && mm;
  });

  renderTablaRptOficios();
}

function renderRptOficios() {
  oficiosFiltrados = [...DB.oficios];
  renderTablaRptOficios();
}

function renderTablaRptOficios() {
  const tbody = document.getElementById('tbody-rpt-oficios');
  if (!tbody) return;

  // KPIs
  const hosps   = new Set(oficiosFiltrados.map(o => o.hospital).filter(Boolean));
  const valTotal = oficiosFiltrados.reduce((s, o) => s + (parseFloat(o.valor) || 0), 0);
  const expTotal = oficiosFiltrados.reduce((s, o) => s + (parseInt(o.exp) || 0), 0);

  set('ro-total',       oficiosFiltrados.length);
  set('ro-hospitales',  hosps.size);
  set('ro-valor',       '$' + fmt(valTotal));
  set('ro-expedientes', expTotal);
  set('ro-count-lbl',   `${oficiosFiltrados.length} registro(s)`);

  if (!oficiosFiltrados.length) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center;padding:2rem;color:#94a3b8">
      ${DB.oficios.length === 0
        ? '📭 No hay oficios generados aún. Vaya a <strong>Generador de Oficios</strong> para crear el primero.'
        : 'No se encontraron oficios con los filtros aplicados.'
      }</td></tr>`;
    return;
  }

  tbody.innerHTML = oficiosFiltrados.slice().reverse().map((o, i) => `
    <tr class="rpt-oficio-row" onclick="previewOficioRpt(${o.id})">
      <td style="color:#94a3b8;text-align:center">${oficiosFiltrados.length - i}</td>
      <td class="oficio-num-cell">${o.numero || '—'}</td>
      <td>${o.fecha ? new Date(o.fecha + 'T12:00:00').toLocaleDateString('es-EC', {day:'2-digit',month:'short',year:'numeric'}) : '—'}</td>
      <td>${o.hospital || '—'}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis" title="${o.institucion || ''}">${(o.institucion || '—').replace('INSTITUTO','INST.').replace('ECUATORIANO','ECUAT.').replace('SEGURIDAD','SEG.')}</td>
      <td>${fMes(o.mes)}</td>
      <td style="text-align:center">${o.exp || '—'}</td>
      <td style="text-align:right">${o.valor ? '$' + fmt(parseFloat(o.valor)) : '—'}</td>
      <td>${o.firmante || '—'}</td>
      <td>${o.cargo_firm || '—'}</td>
      <td>
        <button class="btn-icon" title="Vista previa e imprimir" onclick="event.stopPropagation();previewOficioRpt(${o.id})">🖨</button>
        <button class="btn-icon" title="Eliminar" onclick="event.stopPropagation();eliminarOficioRpt(${o.id})" style="color:#b91c1c">🗑</button>
      </td>
    </tr>`).join('');
}

function previewOficioRpt(id) {
  const o = DB.oficios.find(x => x.id === id);
  if (!o) return;

  // Construir el HTML del oficio
  const fechaFmt = o.fecha
    ? new Date(o.fecha + 'T12:00:00').toLocaleDateString('es-EC', { day:'numeric', month:'long', year:'numeric' })
    : '';
  const mesFmt = o.mes
    ? new Date(o.mes + '-01').toLocaleDateString('es-EC', { month:'long', year:'numeric' })
    : '[mes de atención]';
  const valFmt = o.valor
    ? '$' + parseFloat(o.valor).toLocaleString('es-EC', { minimumFractionDigits: 2 })
    : '—';

  const html = `
    <div class="oficio-membrete">
      <div class="membrete-logo">JBG</div>
      <div>
        <strong>JUNTA DE BENEFICENCIA DE GUAYAQUIL</strong>
        <small>Dirección de Convenios del Sector Público</small>
      </div>
    </div>
    <div class="oficio-nf">
      <span><strong>N° ${o.numero || '—'}</strong></span>
      <span>${fechaFmt}</span>
    </div>
    <p class="oficio-ciudad">${o.ciudad || 'Guayaquil'}.-</p>
    <div class="oficio-dest">
      <p><strong>${o.trato || ''} ${o.nombre || ''}</strong></p>
      <p style="color:#555">${o.cargo || ''}</p>
      <p style="font-weight:600">${o.institucion || ''}</p>
      <p>Ciudad.-</p>
    </div>
    <p class="oficio-saludo">De mis consideraciones:</p>
    <div class="oficio-cuerpo">
      <p>Adjunto al presente remito a su autoridad:</p>
      <p>La planilla consolidada y el respectivo respaldo magnético de la información de los usuarios/pacientes
        atendidos en <strong>${o.hospital || '[Hospital]'}</strong>, por <strong>${mesFmt}</strong>.</p>
      <table class="oficio-tbl">
        <tr><th>Servicio</th><th>N° Expedientes</th><th>Valor ($)</th></tr>
        <tr>
          <td>${o.servicio || 'Consulta Externa'}</td>
          <td style="text-align:center">${o.exp || '—'}</td>
          <td style="text-align:right">${valFmt}</td>
        </tr>
      </table>
      ${o.asunto ? `<p style="margin-top:.8rem">${o.asunto}</p>` : ''}
    </div>
    <p class="oficio-desp">Muy atentamente,</p>
    <div class="oficio-firma">
      <div class="firma-line"></div>
      <p><strong>${o.firmante || '[Firmante]'}</strong></p>
      <p style="color:#555;font-size:.85rem">${o.cargo_firm || ''}</p>
    </div>`;

  const doc = document.getElementById('rpt-oficio-doc');
  if (doc) doc.innerHTML = html;

  set('rpt-preview-titulo', `Oficio N° ${o.numero || '—'} — Vista Previa`);

  const panel = document.getElementById('rpt-oficio-preview-panel');
  if (panel) {
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function imprimirOficioRpt() {
  const contenido = document.getElementById('rpt-oficio-doc')?.innerHTML || '';
  const titulo    = document.getElementById('rpt-preview-titulo')?.textContent || 'Oficio';
  const w = window.open('', '_blank', 'width=850,height=1000');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>${titulo}</title>
  <style>
    @page { margin: 2cm; }
    body { font-family: 'Georgia', serif; font-size: 12pt; color: #0f172a; line-height: 1.75; }
    .oficio-membrete { display: flex; align-items: center; gap: 14px; border-bottom: 3px solid #1d4ed8; padding-bottom: 14px; margin-bottom: 18px; }
    .membrete-logo { width: 52px; height: 52px; border-radius: 8px; background: linear-gradient(135deg,#1d4ed8,#7c3aed); color: #fff; font-weight: 900; font-size: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .membrete-logo::before { content: 'JBG'; }
    .oficio-membrete div strong { display: block; font-size: 13pt; font-family: Georgia; }
    .oficio-membrete div small { font-size: 9.5pt; color: #64748b; }
    .oficio-nf { display: flex; justify-content: space-between; font-size: 10.5pt; color: #64748b; margin-bottom: 14px; }
    .oficio-ciudad { margin-bottom: 18px; }
    .oficio-dest { margin-bottom: 18px; line-height: 1.5; }
    .oficio-dest p { margin: 0 0 2px; }
    .oficio-saludo { margin-bottom: 12px; }
    .oficio-cuerpo { margin-bottom: 24px; }
    .oficio-cuerpo p { margin-bottom: 10px; }
    .oficio-desp { margin-bottom: 40px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; }
    th { background: #f8fafc; font-size: 10pt; }
    .firma-line { width: 200px; border-top: 1px solid #333; margin-bottom: 6px; margin-top: 10px; }
  </style></head>
  <body>${contenido}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
}

function cerrarPreviewRpt() {
  const panel = document.getElementById('rpt-oficio-preview-panel');
  if (panel) panel.style.display = 'none';
}

function eliminarOficioRpt(id) {
  if (!confirm('¿Eliminar este oficio del registro?')) return;
  DB.oficios = DB.oficios.filter(o => o.id !== id);
  localStorage.setItem('jbg_v2_oficios', JSON.stringify(DB.oficios));
  renderRptOficios();
  cerrarPreviewRpt();
  toast('Oficio eliminado');
}

function exportarRptOficios() {
  const cols = ['N° Oficio','Fecha','Hospital','Institución','Mes Atención','N° Expedientes','Valor ($)','Servicio','Firmante','Cargo Firmante'];
  const rows = oficiosFiltrados.slice().reverse().map(o => [
    o.numero, o.fecha, o.hospital, o.institucion, fMes(o.mes),
    o.exp, o.valor, o.servicio, o.firmante, o.cargo_firm
  ].map(v => `"${v !== undefined && v !== null ? v : ''}"`).join(','));
  const csv = [cols.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `reporte_oficios_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  toast('✓ Reporte de oficios exportado');
}

/* ── Guardar oficio mejorado (capturar más campos) ── */
const _guardarOficioOrig = guardarOficio;
guardarOficio = function() {
  const g = id => document.getElementById(id)?.value?.trim() || '';
  const num = g('of-num');
  if (!num) { toast('Ingrese el N° de oficio'); return; }
  const oficio = {
    id: Date.now(),
    numero: num, fecha: g('of-fecha'), ciudad: g('of-ciudad'),
    trato: g('of-trato'), nombre: g('of-nombre'), cargo: g('of-cargo'),
    institucion: g('of-inst') === 'otro' ? g('of-inst-manual') : g('of-inst'),
    hospital: g('of-hosp'), mes: g('of-mes'), exp: g('of-exp'),
    valor: g('of-valor'), servicio: g('of-servicio'), asunto: g('of-asunto'),
    firmante: g('of-firmante'), cargo_firm: g('of-cargo-firm')
  };
  DB.oficios.push(oficio);
  localStorage.setItem('jbg_v2_oficios', JSON.stringify(DB.oficios));
  renderListaOficios();
  renderRptOficios();
  toast('✓ Oficio guardado');
};

/* ── Integrar renderRptOficios al renderTodosReportes ── */
const _renderTodos = renderTodosReportes;
renderTodosReportes = function() {
  _renderTodos();
  renderRptOficios();
};

/* ── Integrar al navegarA ── */
const _navegarAOrig = navegarA;
navegarA = function(v, titulo) {
  _navegarAOrig(v, titulo);
  if (v === 'rpt-oficios') {
    renderRptOficios();
    filtrarRptOficios();
  }
};

/* ================================================================
   NUEVO / CONSULTAR — búsqueda integrada
   ================================================================ */

function buscarEnNuevo() {
  const q = (document.getElementById('nuevo-buscar')?.value || '').toLowerCase().trim();
  const clearBtn = document.getElementById('nuevo-clear-btn');
  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

  const resPanel = document.getElementById('nuevo-resultados-panel');
  if (!resPanel) return;

  if (q.length < 2) { resPanel.style.display = 'none'; return; }

  const resultados = DB.tramites.filter(t =>
    [t.numero_tramite, t.hospital, t.lote, t.iess_sub, t.num_solicitud]
      .some(v => (v || '').toLowerCase().includes(q))
  );

  const label = document.getElementById('nuevo-res-label');
  if (label) label.textContent = `${resultados.length} resultado(s) para "${q}"`;

  const tbody = document.getElementById('tbody-nuevo-res');
  if (!tbody) return;

  tbody.innerHTML = resultados.length === 0
    ? `<tr><td colspan="9" style="text-align:center;padding:1.2rem;color:#94a3b8">Sin resultados</td></tr>`
    : resultados.map(t => `<tr style="cursor:pointer" onclick="cargarTramiteEnForm(${t.id})">
        <td><strong>${t.hospital}</strong></td>
        <td>${t.iess_sub || '—'}</td>
        <td style="color:var(--azul);font-weight:700">${t.numero_tramite}</td>
        <td>${t.lote}</td>
        <td>${fMes(t.mes_atencion)}</td>
        <td style="text-align:center">${t.num_expedientes || '—'}</td>
        <td style="text-align:right">$${fmt(t.valor_presentado)}</td>
        <td><span class="badge badge-${t.estado}">${eTxt(t.estado)}</span></td>
        <td>
          <button class="btn-sm btn-primary" onclick="event.stopPropagation();cargarTramiteEnForm(${t.id})">
            Cargar ✏️
          </button>
        </td>
      </tr>`).join('');

  resPanel.style.display = 'block';

  // si hay un solo resultado, cargarlo automáticamente
  if (resultados.length === 1) setTimeout(() => cargarTramiteEnForm(resultados[0].id), 150);
}

function cargarTramiteEnForm(id) {
  const t = DB.tramites.find(x => x.id === id);
  if (!t) return;

  // Cambiar a tab "formulario"
  switchNuevoTab('nuevo', false);

  const form = document.getElementById('form-tramite');
  if (!form) return;

  // Llenar todos los campos
  Object.keys(t).forEach(k => {
    const el = form.querySelector(`[name="${k}"]`);
    if (el && t[k] !== undefined && t[k] !== null) el.value = t[k];
  });
  form.dataset.editId = id;
  autoCalc();

  // Banner modo edición
  const banner = document.getElementById('nuevo-modo-edicion');
  const bannerTit = document.getElementById('modo-edicion-titulo');
  const bannerSub = document.getElementById('modo-edicion-sub');
  if (banner) banner.style.display = 'flex';
  if (bannerTit) bannerTit.textContent = `Editando: ${t.numero_tramite}`;
  if (bannerSub) bannerSub.textContent = `${t.hospital} · ${fMes(t.mes_atencion)}`;

  // Ocultar resultados
  const resPanel = document.getElementById('nuevo-resultados-panel');
  if (resPanel) resPanel.style.display = 'none';

  // Scroll al form
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  toast(`✏️ Trámite ${t.numero_tramite} cargado para edición`);
}

function switchNuevoTab(tab, scroll = true) {
  const tabBuscar = document.getElementById('tab-buscar');
  const tabNuevo  = document.getElementById('tab-nuevo');
  const resPanel  = document.getElementById('nuevo-resultados-panel');
  const banner    = document.getElementById('nuevo-modo-edicion');
  const buscar    = document.getElementById('nuevo-buscar');
  const form      = document.getElementById('form-tramite');

  if (tab === 'buscar') {
    if (tabBuscar)  tabBuscar.classList.add('active');
    if (tabNuevo)   tabNuevo.classList.remove('active');
    // Solo ocultar form si hay búsqueda activa
    if (buscar?.value?.length >= 2) resPanel.style.display = 'block';
    buscar?.focus();
  } else {
    if (tabNuevo)   tabNuevo.classList.add('active');
    if (tabBuscar)  tabBuscar.classList.remove('active');
    if (resPanel)   resPanel.style.display = 'none';
    // Si no hay trámite cargado, asegurar formulario vacío
    if (!form?.dataset.editId) {
      if (banner) banner.style.display = 'none';
    }
    if (scroll) form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function limpiarBusquedaNuevo() {
  const input = document.getElementById('nuevo-buscar');
  if (input) input.value = '';
  document.getElementById('nuevo-clear-btn').style.display = 'none';
  document.getElementById('nuevo-resultados-panel').style.display = 'none';
}

// Override limpiarForm para también resetear banner
const _limpiarFormOld = limpiarForm;
limpiarForm = function() {
  _limpiarFormOld();
  const banner = document.getElementById('nuevo-modo-edicion');
  if (banner) banner.style.display = 'none';
  limpiarBusquedaNuevo();
};

/* ================================================================
   DASHBOARD EJECUTIVO — renderResumenGerencial COMPLETO
   ================================================================ */

// Override the old renderResumenGerencial with the full executive version
renderResumenGerencial = function() {
  const filtroConv = document.getElementById('dash-filtro-convenio')?.value || '';
  const t = filtroConv
    ? DB.tramites.filter(x => (x.iess_sub || '').includes(filtroConv))
    : DB.tramites;

  if (!t.length) return;

  // ── KPIs ──
  const totPres  = sum(t, 'valor_presentado');
  const totAprob = sum(t, 'val_aprobado_iess');
  const totObj   = sum(t, 'objecion_apelada');
  const totGlosa = sum(t, 'glosa_final_inf');
  const totSaldo = sum(t, 'saldo_cobrar');
  const totExp   = t.reduce((s, x) => s + (parseInt(x.num_expedientes) || 0), 0);
  const pctAprob = totPres > 0 ? (totAprob / totPres * 100).toFixed(1) : '0.0';
  const pctGlosa = totObj > 0 ? (totGlosa / totObj * 100).toFixed(1) : '0.0';

  set('rg-presentado',   '$' + fmt(totPres));
  set('rg-aprobado',     '$' + fmt(totAprob));
  set('rg-objecion',     '$' + fmt(totObj));
  set('rg-glosa',        '$' + fmt(totGlosa));
  set('rg-saldo',        '$' + fmt(totSaldo));
  set('rg-exp-total',    totExp.toLocaleString('es-EC') + ' expedientes');
  set('rg-tramites-total', t.length + ' trámites activos');
  set('rg-pct-aprobacion', pctAprob + '% de aprobación');
  set('rg-obj-sub',      'Obj. apelada · ' + pctGlosa + '% glosado');

  // ── CHARTS ──
  const hosps = [...new Set(t.map(x => x.hospital))];
  const convs = [...new Set(t.map(x => x.iess_sub || 'Sin convenio'))];

  // Destruir charts gerenciales previos
  ['rg-ch-hosp','rg-ch-estado','rg-ch-servicio','rg-ch-convenio','rg-ch-objecion']
    .forEach(id => { if (charts['exec_'+id]) { try{charts['exec_'+id].destroy()}catch(e){} } });

  const font = { family: 'DM Sans', size: 10 };
  const ticksY = { callback: v => '$' + (v/1000).toFixed(0) + 'k', font };
  const ticksYN = { font };

  // Bar: Hospital Pres vs Aprobado vs Glosa
  const ctx1 = document.getElementById('rg-ch-hosp');
  if (ctx1) charts['exec_rg-ch-hosp'] = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: hosps.map(h => h.replace('Hospital ','H. ').replace('Instituto de ','Inst. ')),
      datasets: [
        { label: 'Presentado',    data: hosps.map(h => sum(t.filter(x=>x.hospital===h),'valor_presentado')), backgroundColor:'rgba(29,78,216,.75)', borderRadius:4 },
        { label: 'Aprobado IESS', data: hosps.map(h => sum(t.filter(x=>x.hospital===h),'val_aprobado_iess')), backgroundColor:'rgba(21,128,61,.75)', borderRadius:4 },
        { label: 'Glosa Final',   data: hosps.map(h => sum(t.filter(x=>x.hospital===h),'glosa_final_inf')), backgroundColor:'rgba(185,28,28,.7)', borderRadius:4 }
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ position:'top', labels:{ font, padding:10 } } },
      scales: { y:{ ticks:ticksY, grid:{ color:'rgba(0,0,0,.05)' } }, x:{ ticks:{font:{size:9}} } }
    }
  });

  // Pie: Estado
  const estadoMap = { aprobado:'Aprobado', proceso:'En Proceso', apelacion:'Apelación', objetado:'Objetado', cancelado:'Cancelado', glosa:'Glosa' };
  const eCounts = {};
  t.forEach(x => { eCounts[x.estado] = (eCounts[x.estado]||0)+1; });
  const ctx2 = document.getElementById('rg-ch-estado');
  if (ctx2) charts['exec_rg-ch-estado'] = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: Object.keys(eCounts).map(k => estadoMap[k]||k),
      datasets: [{ data: Object.values(eCounts),
        backgroundColor: ['#15803d','#1d4ed8','#d97706','#b91c1c','#475569','#c2410c'],
        borderWidth: 2, borderColor: '#fff' }]
    },
    options: { responsive:true, maintainAspectRatio:false, cutout:'65%',
      plugins: { legend:{ position:'bottom', labels:{ font, padding:8 } } }
    }
  });

  // Bar: Expedientes por Tipo de Servicio por Hospital
  const servicios = ['Ambulatorio','Hospitalización','Emergencia','Consulta Externa'];
  const colServ = ['rgba(29,78,216,.7)','rgba(21,128,61,.7)','rgba(194,65,12,.7)','rgba(124,58,237,.7)'];
  const ctx3 = document.getElementById('rg-ch-servicio');
  if (ctx3) charts['exec_rg-ch-servicio'] = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: hosps.map(h => h.replace('Hospital ','H. ').replace('Instituto de ','Inst. ')),
      datasets: servicios.map((s, i) => ({
        label: s,
        data: hosps.map(h => t.filter(x=>x.hospital===h&&x.tipo_afiliacion===s)
                               .reduce((acc,x)=>acc+(parseInt(x.num_expedientes)||0),0)),
        backgroundColor: colServ[i], borderRadius: 3
      }))
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ position:'top', labels:{ font, padding:8, boxWidth:10 } } },
      scales: { x:{ stacked:true, ticks:{font:{size:9}} }, y:{ stacked:true, ticks:ticksYN } }
    }
  });

  // Doughnut: Valor por Convenio
  const convData = {};
  t.forEach(x => { const c=x.iess_sub||'Otro'; convData[c]=(convData[c]||0)+(x.valor_presentado||0); });
  const colConv = ['#1d4ed8','#15803d','#7c3aed','#c2410c','#475569','#b91c1c','#0e7490'];
  const ctx4 = document.getElementById('rg-ch-convenio');
  if (ctx4) charts['exec_rg-ch-convenio'] = new Chart(ctx4, {
    type: 'pie',
    data: {
      labels: Object.keys(convData),
      datasets: [{ data: Object.values(convData), backgroundColor: colConv.slice(0,Object.keys(convData).length), borderWidth:2, borderColor:'#fff' }]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ position:'bottom', labels:{ font, padding:8 } } }
    }
  });

  // Bar: Composición de Objeciones
  const objAcep    = sum(t,'objecion_aceptada');
  const objSinResp = sum(t,'objecion_sin_respuesta');
  const objGlosa   = sum(t,'glosa_final_inf');
  const ctx5 = document.getElementById('rg-ch-objecion');
  if (ctx5) charts['exec_rg-ch-objecion'] = new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: hosps.map(h=>h.replace('Hospital ','H. ').replace('Instituto de ','Inst. ')),
      datasets: [
        { label:'Obj. Aceptada',    data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'objecion_aceptada')),    backgroundColor:'rgba(21,128,61,.7)', borderRadius:4 },
        { label:'Sin Resp. Hosp.',  data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'objecion_sin_respuesta')),backgroundColor:'rgba(194,65,12,.7)', borderRadius:4 },
        { label:'Glosa Final',      data:hosps.map(h=>sum(t.filter(x=>x.hospital===h),'glosa_final_inf')),      backgroundColor:'rgba(185,28,28,.7)', borderRadius:4 }
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ position:'top', labels:{ font, padding:8, boxWidth:10 } } },
      scales: { x:{ stacked:true, ticks:{font:{size:9}} }, y:{ stacked:true, ticks:ticksY } }
    }
  });

  // ── TABLA POR CONVENIO ──
  const tbody1 = document.getElementById('tbody-rg-convenio');
  const tfoot1 = document.getElementById('tfoot-rg-convenio');
  if (tbody1) {
    let tp=0,ta=0,tia=0,to=0,toa=0,tg=0,ts=0,tn=0,te=0;
    tbody1.innerHTML = Object.entries(convData).map(([c, vp]) => {
      const rows  = t.filter(x=>(x.iess_sub||'Otro')===c);
      const apr   = sum(rows,'val_aprobado_iess');
      const ivaApr= sum(rows,'iva_aprobado');
      const obj   = sum(rows,'objecion_apelada');
      const objAc = sum(rows,'objecion_aceptada');
      const gl    = sum(rows,'glosa_final_inf');
      const sl    = sum(rows,'saldo_cobrar');
      const n     = rows.length;
      const exp   = rows.reduce((s,x)=>s+(parseInt(x.num_expedientes)||0),0);
      const pct   = vp>0?(apr/vp*100).toFixed(1):'0.0';
      const col   = parseFloat(pct)>=80?'#15803d':parseFloat(pct)>=60?'#d97706':'#b91c1c';
      tp+=vp; ta+=apr; tia+=ivaApr; to+=obj; toa+=objAc; tg+=gl; ts+=sl; tn+=n; te+=exp;
      return `<tr>
        <td><strong>${c}</strong></td>
        <td style="text-align:center">${n}</td><td style="text-align:center">${exp.toLocaleString('es-EC')}</td>
        <td style="text-align:right">$${fmt(vp)}</td>
        <td style="text-align:right;color:#15803d">$${fmt(apr)}</td>
        <td style="text-align:right">$${fmt(ivaApr)}</td>
        <td style="text-align:right;color:#b91c1c">$${fmt(obj)}</td>
        <td style="text-align:right;color:#15803d">$${fmt(objAc)}</td>
        <td style="text-align:right;color:#c2410c">$${fmt(gl)}</td>
        <td style="text-align:right">$${fmt(sl)}</td>
        <td style="text-align:center"><strong style="color:${col}">${pct}%</strong></td>
      </tr>`;
    }).join('');
    if (tfoot1) {
      const pctT = tp>0?(ta/tp*100).toFixed(1):'0.0';
      tfoot1.innerHTML = `<tr>
        <td><strong>TOTAL</strong></td>
        <td style="text-align:center"><strong>${tn}</strong></td>
        <td style="text-align:center"><strong>${te.toLocaleString('es-EC')}</strong></td>
        <td style="text-align:right"><strong>$${fmt(tp)}</strong></td>
        <td style="text-align:right;color:#15803d"><strong>$${fmt(ta)}</strong></td>
        <td style="text-align:right"><strong>$${fmt(tia)}</strong></td>
        <td style="text-align:right;color:#b91c1c"><strong>$${fmt(to)}</strong></td>
        <td style="text-align:right;color:#15803d"><strong>$${fmt(toa)}</strong></td>
        <td style="text-align:right;color:#c2410c"><strong>$${fmt(tg)}</strong></td>
        <td style="text-align:right"><strong>$${fmt(ts)}</strong></td>
        <td style="text-align:center"><strong style="color:${parseFloat(pctT)>=80?'#15803d':'#b91c1c'}">${pctT}%</strong></td>
      </tr>`;
    }
  }

  // ── TABLA POR HOSPITAL y SERVICIO ──
  const tbody2 = document.getElementById('tbody-rg-hospital');
  const tfoot2 = document.getElementById('tfoot-rg-hospital');
  if (tbody2) {
    const byHospConv = {};
    t.forEach(x => {
      const k = `${x.hospital}||${x.iess_sub||'—'}`;
      if (!byHospConv[k]) byHospConv[k]={hospital:x.hospital,conv:x.iess_sub||'—',
        ambExp:0,ambVal:0,hospExp:0,hospVal:0,emeExp:0,emeVal:0,totExp:0,pres:0,apr:0};
      const g=byHospConv[k];
      const exp=parseInt(x.num_expedientes)||0;
      const val=x.valor_presentado||0;
      const ta=x.tipo_afiliacion||'';
      if(ta.includes('Ambulatorio')){g.ambExp+=exp;g.ambVal+=val;}
      else if(ta.includes('Hospitaliz')){g.hospExp+=exp;g.hospVal+=val;}
      else if(ta.includes('Emergencia')){g.emeExp+=exp;g.emeVal+=val;}
      g.totExp+=exp; g.pres+=val; g.apr+=(x.val_aprobado_iess||0);
    });
    let tpe2=0,tpa2=0,ttexp2=0;
    tbody2.innerHTML = Object.values(byHospConv).map(g => {
      const pct=g.pres>0?(g.apr/g.pres*100).toFixed(1):'0.0';
      const col=parseFloat(pct)>=80?'#15803d':parseFloat(pct)>=60?'#d97706':'#b91c1c';
      tpe2+=g.pres; tpa2+=g.apr; ttexp2+=g.totExp;
      return `<tr>
        <td><strong>${g.hospital}</strong></td><td>${g.conv}</td>
        <td style="text-align:center;background:#eff6ff">${g.ambExp}</td>
        <td style="text-align:right;background:#eff6ff">$${fmt(g.ambVal)}</td>
        <td style="text-align:center;background:#f0fdf4">${g.hospExp}</td>
        <td style="text-align:right;background:#f0fdf4">$${fmt(g.hospVal)}</td>
        <td style="text-align:center;background:#fff7ed">${g.emeExp}</td>
        <td style="text-align:right;background:#fff7ed">$${fmt(g.emeVal)}</td>
        <td style="text-align:center;font-weight:700">${g.totExp}</td>
        <td style="text-align:right">$${fmt(g.pres)}</td>
        <td style="text-align:right;color:#15803d">$${fmt(g.apr)}</td>
        <td style="text-align:center"><strong style="color:${col}">${pct}%</strong></td>
      </tr>`;
    }).join('');
    if (tfoot2) {
      const pctT2=tpe2>0?(tpa2/tpe2*100).toFixed(1):'0.0';
      tfoot2.innerHTML=`<tr>
        <td colspan="2"><strong>TOTALES</strong></td>
        <td colspan="6"></td>
        <td style="text-align:center;font-weight:700">${ttexp2.toLocaleString('es-EC')}</td>
        <td style="text-align:right"><strong>$${fmt(tpe2)}</strong></td>
        <td style="text-align:right;color:#15803d"><strong>$${fmt(tpa2)}</strong></td>
        <td style="text-align:center"><strong>${pctT2}%</strong></td>
      </tr>`;
    }
  }

  // ── GLOSAS POR HOSPITAL ──
  const tbody3 = document.getElementById('tbody-rg-glosas-hosp');
  if (tbody3) tbody3.innerHTML = hosps.map(h => {
    const rows = t.filter(x=>x.hospital===h);
    const gl=sum(rows,'glosa_final_inf'), os=sum(rows,'objecion_sin_respuesta'),
          lv=sum(rows,'val_levantado_iess'), sl=sum(rows,'saldo_cobrar');
    const riesgo = gl>50000?'rojo':gl>10000?'amarillo':'verde';
    const icon = {rojo:'🔴',amarillo:'🟡',verde:'🟢'}[riesgo];
    return `<tr>
      <td>${h.replace('Hospital ','H. ')}</td>
      <td style="text-align:right;color:#c2410c">$${fmt(gl)}</td>
      <td style="text-align:right;color:#b91c1c">$${fmt(os)}</td>
      <td style="text-align:right;color:#15803d">$${fmt(lv)}</td>
      <td style="text-align:right">$${fmt(sl)}</td>
      <td style="text-align:center">${icon}</td>
    </tr>`;
  }).join('');

  // ── SEMÁFORO ──
  const semEl = document.getElementById('rg-semaforo');
  if (semEl) {
    const estadoHosp = {};
    t.forEach(x => {
      const eh = x.estado_hospital || 'Sin estado';
      estadoHosp[eh] = (estadoHosp[eh]||0) + 1;
    });
    const colorMap = {
      'AUDITADO':'verde','PAGADO':'verde','LEVANTADO PAGADO':'verde','CON RESPUESTA':'verde',
      'LEVANTADO':'amarillo','LEVANTADO NO AUDITADO':'amarillo','DIFERENCIAS':'amarillo',
      'GLOSA':'rojo','SIN RESPUESTA IESS':'rojo','SIN RESPUESTA JBG':'rojo',
      'SIN RESPUESTA':'rojo','APELADO':'rojo','NO AUDITADO':'rojo'
    };
    const dotMap = { verde:'sd-verde', amarillo:'sd-amarillo', rojo:'sd-rojo' };
    semEl.innerHTML = Object.entries(estadoHosp)
      .sort((a,b) => b[1]-a[1])
      .map(([est, n]) => {
        const col = colorMap[est] || 'plomo';
        const cls = col === 'verde' ? 'semaforo-verde' : col === 'amarillo' ? 'semaforo-amarillo' : 'semaforo-rojo';
        const dot = dotMap[col] || 'sd-amarillo';
        return `<div class="semaforo-item ${cls}">
          <div style="display:flex;align-items:center">
            <div class="semaforo-dot ${dot}"></div>
            <span style="font-weight:600">${est}</span>
          </div>
          <span style="font-weight:700">${n}</span>
        </div>`;
      }).join('');
  }
};

// Ensure renderResumenGerencial is called on view load
const _navegarA4 = navegarA;
navegarA = function(v, titulo) {
  _navegarA4(v, titulo);
  if (v === 'rpt-estado') renderResumenGerencial();
};


/* ================================================================
   FACTURACIÓN — gestión de facturas asociadas a trámites
   ----------------------------------------------------------------
   Se almacena un nuevo store en localStorage: 'jbg_v2_facturas'
   Cada factura: { id, numero, fecha, importe, concepto, tramites: [ids] }
   ================================================================ */

if (typeof DB !== 'undefined') {
  // Inicializar el store de facturas si no existe
  try {
    DB.facturas = JSON.parse(localStorage.getItem('jbg_v2_facturas') || '[]');
  } catch (_e) { DB.facturas = []; }
}

function guardarFacturas() {
  if (typeof DB !== 'undefined') {
    localStorage.setItem('jbg_v2_facturas', JSON.stringify(DB.facturas || []));
  }
}

// Render de la pantalla completa de Facturación
function renderFacturacion() {
  if (!document.getElementById('view-facturacion')) return;
  renderFacturacionTabla();
  renderFacturacionHistorial();
  recalcularKPIsFacturacion();
}

// Render de la tabla de trámites disponibles
function renderFacturacionTabla() {
  const body = document.getElementById('fac-tabla-body');
  const count = document.getElementById('fac-count');
  if (!body) return;
  const buscar = (document.getElementById('fac-buscar')?.value || '').toLowerCase().trim();

  const tramites = (DB && DB.tramites) ? DB.tramites : [];
  const filtrados = tramites.filter(t => {
    if (!buscar) return true;
    const blob = `${t.numero_tramite || ''} ${t.lote || ''} ${t.hospital || ''}`.toLowerCase();
    return blob.indexOf(buscar) >= 0;
  });

  if (count) count.textContent = `${filtrados.length} trámite${filtrados.length !== 1 ? 's' : ''}`;

  if (!filtrados.length) {
    body.innerHTML = `<tr><td colspan="13" style="padding:30px;text-align:center;color:var(--text-muted)">
      ${buscar ? `Sin resultados para "${buscar}"` : 'Sin trámites cargados todavía. Registra trámites desde "Nuevo / Consultar Trámite" para que aparezcan aquí.'}
    </td></tr>`;
    return;
  }

  // Mantener selecciones previas
  const seleccionadosPrev = window._facSeleccionados || new Set();

  body.innerHTML = filtrados.map(t => {
    // Normalizar siempre a string para que coincida en el Set de seleccionados
    const id = String(t.id != null ? t.id : t.numero_tramite);
    const sel = seleccionadosPrev.has(id);
    const presentado = num(t.valor_presentado);
    const aprobIVA = num(t.val_aprobado_iess) + num(t.iva_aprobado);
    const aprobSinIVA = num(t.val_aprobado_iess);
    const objIVA = num(t.objecion_iess) + num(t.iva_objetado);
    const objSinIVA = num(t.objecion_iess);
    return `
      <tr data-id="${esc(id)}" class="${sel ? 'fac-selected' : ''}">
        <td class="fac-col-check">
          <input type="checkbox" ${sel ? 'checked' : ''}
            onchange="toggleSeleccionFac('${esc(id)}', this.checked)">
        </td>
        <td><strong>${esc(t.numero_tramite || '—')}</strong></td>
        <td>${esc(t.lote || '—')}</td>
        <td>${esc(t.hospital || '—')}</td>
        <td class="fac-num">${fmt(presentado)}</td>
        <td class="fac-num">${fmt(aprobIVA)}</td>
        <td class="fac-num">${fmt(aprobSinIVA)}</td>
        <td class="fac-num">${fmt(objIVA)}</td>
        <td class="fac-num">${fmt(objSinIVA)}</td>
        <td>${esc(t.factura_manual || '—')}</td>
        <td>${esc(t.fecha_factura || '—')}</td>
        <td class="fac-num">${fmt(num(t.val_cancelado_total_inf))}</td>
        <td>${esc(t.concepto_factura || '—')}</td>
      </tr>`;
  }).join('');
}

function toggleSeleccionFac(id, checked) {
  if (!window._facSeleccionados) window._facSeleccionados = new Set();
  if (checked) window._facSeleccionados.add(id);
  else window._facSeleccionados.delete(id);
  // Actualizar fila visual
  const row = document.querySelector(`#fac-tabla-body tr[data-id="${id}"]`);
  if (row) row.classList.toggle('fac-selected', checked);
  recalcularKPIsFacturacion();
}

function toggleSelectAllFac() {
  const all = document.getElementById('fac-check-all').checked;
  if (!window._facSeleccionados) window._facSeleccionados = new Set();
  document.querySelectorAll('#fac-tabla-body tr[data-id]').forEach(r => {
    const id = r.dataset.id;
    const cb = r.querySelector('input[type=checkbox]');
    if (cb) cb.checked = all;
    if (all) window._facSeleccionados.add(id);
    else window._facSeleccionados.delete(id);
    r.classList.toggle('fac-selected', all);
  });
  recalcularKPIsFacturacion();
}

function recalcularKPIsFacturacion() {
  if (!document.getElementById('view-facturacion')) return;
  const sel = window._facSeleccionados || new Set();
  // Normalizar IDs a string para que coincidan los que vinieron del DOM
  // (siempre strings) con los de DB.tramites (a veces números).
  const tramites = (DB && DB.tramites) ? DB.tramites.filter(t => {
    const id = String(t.id != null ? t.id : t.numero_tramite);
    return sel.has(id);
  }) : [];
  let presentado = 0, aprobIVA = 0, aprobSinIVA = 0, objIVA = 0, objSinIVA = 0, totalFact = 0;
  tramites.forEach(t => {
    presentado += num(t.valor_presentado);
    aprobSinIVA += num(t.val_aprobado_iess);
    aprobIVA += num(t.val_aprobado_iess) + num(t.iva_aprobado);
    objSinIVA += num(t.objecion_iess);
    objIVA += num(t.objecion_iess) + num(t.iva_objetado);
    totalFact += num(t.val_cancelado_total_inf);
  });
  setText('kpi-total-presentado', fmt(presentado));
  setText('kpi-total-aprob-iva', fmt(aprobIVA));
  setText('kpi-total-aprob-sin-iva', fmt(aprobSinIVA));
  setText('kpi-total-factura', fmt(totalFact));
  setText('kpi-total-obj-iva', fmt(objIVA));
  setText('kpi-total-obj-sin-iva', fmt(objSinIVA));

  // Actualizar contador de seleccionados en la barra de acciones
  const n = sel.size;
  setText('fac-sel-count', n);
  setText('fac-sel-plural',  n === 1 ? '' : 's');
  setText('fac-sel-plural2', n === 1 ? '' : 's');

  // Pre-llenar el campo "Importe Total" del formulario con el Total
  // Aprobado con IVA (el valor más usado para facturar). El usuario
  // puede sobreescribirlo si lo desea.
  const inpImp = document.getElementById('fac-importe-total');
  if (inpImp && document.activeElement !== inpImp) {
    inpImp.value = aprobIVA ? aprobIVA.toFixed(2) : '';
  }

  // Pequeño "flash" visual en los KPI cards para indicar que se
  // recalcularon — sólo cuando lo dispara el botón Calcular o cambian
  // selecciones (no en el primer render).
  document.querySelectorAll('#fac-kpis .fac-kpi').forEach(card => {
    card.classList.remove('fac-kpi-flash');
    void card.offsetWidth; // forzar reflow
    card.classList.add('fac-kpi-flash');
  });
}

function limpiarSeleccionFac() {
  if (window._facSeleccionados) window._facSeleccionados.clear();
  document.querySelectorAll('#fac-tabla-body input[type=checkbox]').forEach(cb => cb.checked = false);
  document.querySelectorAll('#fac-tabla-body tr.fac-selected').forEach(r => r.classList.remove('fac-selected'));
  const all = document.getElementById('fac-check-all');
  if (all) all.checked = false;
  recalcularKPIsFacturacion();
}

function cargarFactura() {
  const num_fact = (document.getElementById('fac-num-factura').value || '').trim();
  const fecha = document.getElementById('fac-fecha-factura').value;
  const importe = parseFloat(document.getElementById('fac-importe-total').value) || 0;
  const concepto = (document.getElementById('fac-concepto').value || '').trim();
  const sel = window._facSeleccionados || new Set();

  if (!num_fact) { alert('Ingresa el número de factura'); return; }
  if (!fecha)    { alert('Ingresa la fecha de la factura'); return; }
  if (!sel.size) { alert('Selecciona al menos un trámite para la factura'); return; }

  if (!DB.facturas) DB.facturas = [];

  const factura = {
    id: 'fac_' + Date.now(),
    numero: num_fact,
    fecha: fecha,
    importe: importe,
    concepto: concepto,
    tramites: Array.from(sel),
    creada: new Date().toISOString()
  };
  DB.facturas.unshift(factura);
  guardarFacturas();

  // Actualizar los trámites con datos de la factura
  sel.forEach(id => {
    const t = DB.tramites.find(x => String(x.id != null ? x.id : x.numero_tramite) === String(id));
    if (t) {
      t.factura_manual = num_fact;
      t.fecha_factura = fecha;
      t.concepto_factura = concepto;
    }
  });
  guardar();

  // Limpiar form y selecciones
  document.getElementById('fac-num-factura').value = '';
  document.getElementById('fac-fecha-factura').value = '';
  document.getElementById('fac-importe-total').value = '';
  document.getElementById('fac-concepto').value = '';
  window._facSeleccionados = new Set();
  document.getElementById('fac-check-all').checked = false;

  alert(`✓ Factura ${num_fact} cargada con ${sel.size} trámite${sel.size !== 1 ? 's' : ''}`);
  renderFacturacion();
}

function renderFacturacionHistorial() {
  const card = document.getElementById('fac-historial-card');
  const body = document.getElementById('fac-historial-body');
  const count = document.getElementById('fac-historial-count');
  if (!card || !body) return;
  const facturas = (DB && DB.facturas) ? DB.facturas : [];
  if (count) count.textContent = facturas.length;
  if (!facturas.length) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  body.innerHTML = facturas.map(f => `
    <tr>
      <td><strong>${esc(f.numero)}</strong></td>
      <td>${esc(f.fecha)}</td>
      <td class="fac-num">${fmt(f.importe)}</td>
      <td>${esc(f.concepto || '—')}</td>
      <td class="fac-num">${(f.tramites || []).length}</td>
      <td>
        <button class="btn-icon btn-icon-del" onclick="eliminarFactura('${esc(f.id)}')" title="Eliminar">🗑</button>
      </td>
    </tr>
  `).join('');
}

function eliminarFactura(id) {
  if (!confirm('¿Eliminar esta factura del historial?')) return;
  DB.facturas = DB.facturas.filter(f => f.id !== id);
  guardarFacturas();
  renderFacturacionHistorial();
}

/* Helpers (si no están ya definidos) */
function num(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
function fmt(v) {
  if (v === null || v === undefined || v === '') return '0';
  const n = typeof v === 'number' ? v : parseFloat(v);
  if (isNaN(n)) return '0';
  return n.toLocaleString('es-EC', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function setText(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
