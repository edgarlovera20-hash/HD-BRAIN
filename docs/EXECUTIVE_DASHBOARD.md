# Executive Dashboard — HD-BRAIN

## Propósito

HD-BRAIN materializa el dashboard ejecutivo global del ecosistema: torre de control para dirección con KPIs, riesgos, recomendaciones y estado de automatizaciones. Es la implementación inicial de la capacidad "Data Cloud" definida en el plan maestro (`HD-CORE/docs/MASTER_UNIFIED_PRODUCTION_PLAN.md`).

## Principios

1. **Solo lectura**: el dashboard visualiza; nunca muta datos de otras plataformas.
2. **Fuente única**: cada métrica viene de un snapshot o evento definido en `docs/KPI_CATALOG.md`.
3. **Sin PII**: solo agregaciones e identificadores.
4. **Trazable**: cada cifra enlaza al snapshot (`snapshotId`, `producedAt`, `sourcePlatform`).
5. **Acceso por RBAC**: requiere `brain.view_global_kpis`; secciones financieras requieren adicionalmente permisos de HD-ADMIN.

## Secciones

### 1. Resumen Ejecutivo
Revenue · EBITDA · Cash Flow · Growth · MRR · ARR — con tendencia vs periodo anterior.

### 2. Clientes (fuente: HD-CRM)
Clientes activos · morosos · compromisos cumplidos vs incumplidos · churn · LTV · ticket promedio · tiempo de seguimiento.

### 3. Adquisición (fuente: HD-WEB + HD-CRM)
Leads · conversión por landing · CAC · origen de leads · funnel completo lead → cliente.

### 4. Talento (fuente: HD-RH)
Tiempo de contratación · candidatos activos · entrevistas completadas · tasa de contratación · retención.

### 5. Operación (fuente: HD-OPERATIONS)
Tareas completadas · tiempo de resolución · productividad · carga por colaborador · procesos atrasados.

### 6. Gobernanza (fuente: HD-ADMIN)
Acciones auditadas · anomalías financieras · errores de permisos · eventos de seguridad.

### 7. Riesgos y Recomendaciones (fuente: HD-BRAIN)
Riesgos abiertos por severidad · recomendaciones pendientes/aceptadas/rechazadas · automation requests en revisión · agent runs recientes.

## Wireframe Lógico

```text
┌─ Header: periodo · última actualización · correlación de snapshots ─┐
├─ Fila 1: Revenue · EBITDA · MRR · Cash Flow (cards)              │
├─ Fila 2: Funnel adquisición · Churn/LTV                          │
├─ Fila 3: Morosos y compromisos · Productividad operativa         │
├─ Fila 4: Talento RH · Gobernanza/Auditoría                       │
└─ Fila 5: Riesgos abiertos · Recomendaciones · Agent runs        ─┘
```

## Implementación por Fases

| Fase | Alcance |
|---|---|
| 1 | Catálogo de KPIs y contratos de snapshot (este documento + KPI_CATALOG.md) |
| 2 | Ingesta de eventos y snapshots (Etapa 6 del roadmap maestro) |
| 3 | UI del dashboard con @hd/core-ui y tokens oficiales |
| 4 | Forecasting y señales predictivas (BRAIN_AGENT, solo lectura) |
