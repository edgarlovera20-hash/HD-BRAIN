# KPI Catalog — HD-BRAIN

Catálogo canónico de KPIs del ecosistema. Cada KPI define su fuente, mecanismo y frecuencia. Las plataformas productoras son responsables de la calidad de sus snapshots (ver `HD-CORE/docs/DATA_LAYER_STRATEGY.md`).

## Financieros (fuente: HD-ADMIN — snapshots aprobados)

| KPI | Definición | Frecuencia |
|---|---|---|
| Revenue | Ingresos totales del periodo | Mensual |
| EBITDA | Resultado antes de intereses, impuestos, depreciación y amortización | Mensual |
| Cash Flow | Flujo de caja neto | Mensual |
| MRR | Ingreso recurrente mensual | Mensual |
| ARR | Ingreso recurrente anualizado (MRR × 12) | Mensual |
| Anomalías financieras | Conteo de anomalías detectadas (FINANCE_AGENT, revisadas) | Diaria |

## Clientes / CRM (fuente: HD-CRM)

| KPI | Definición | Frecuencia |
|---|---|---|
| Clientes activos | Clientes con estado activo | Diaria |
| Clientes morosos | Clientes con pagos vencidos | Diaria |
| Compromisos cumplidos | % compromisos de pago cumplidos en el periodo | Semanal |
| Churn | % clientes perdidos sobre base inicial del periodo | Mensual |
| LTV | Valor de vida del cliente | Mensual |
| Ticket promedio | Ingreso promedio por cliente | Mensual |
| Conversión | % leads convertidos a clientes | Semanal |
| Tiempo de seguimiento | Tiempo medio entre contactos de seguimiento | Semanal |

## Adquisición / Web (fuente: HD-WEB)

| KPI | Definición | Frecuencia |
|---|---|---|
| Tráfico | Sesiones en sitio público (anonimizado) | Diaria |
| Leads | Formularios enviados (web.lead.created) | Diaria |
| Conversión por landing | % visitas que generan lead, por landing | Semanal |
| Origen de leads | Distribución por canal/utm | Semanal |
| CAC | Costo de adquisición por cliente (con datos de HD-ADMIN) | Mensual |

## Talento / RH (fuente: HD-RH)

| KPI | Definición | Frecuencia |
|---|---|---|
| Tiempo de contratación | Días entre publicación de vacante y contratación | Por evento |
| Candidatos activos | Candidatos en pipeline | Diaria |
| Entrevistas completadas | Conteo del periodo | Semanal |
| Tasa de contratación | Contratados / candidatos entrevistados | Mensual |
| Retención | % colaboradores retenidos en el periodo | Mensual |

## Operación (fuente: HD-OPERATIONS)

| KPI | Definición | Frecuencia |
|---|---|---|
| Tareas completadas | Conteo del periodo | Diaria |
| Tiempo de resolución | Tiempo medio creación → completado | Semanal |
| Productividad | Snapshot operations.productivity_snapshot.created | Semanal |
| Carga por colaborador | Tareas abiertas por asignado | Diaria |
| Procesos atrasados | Tareas con SLA vencido | Diaria |

## Gobernanza y Riesgo (fuentes: HD-ADMIN + HD-BRAIN)

| KPI | Definición | Frecuencia |
|---|---|---|
| Acciones auditadas | AuditEntry registradas | Diaria |
| Errores de permisos | Rechazos 403 / intentos RBAC | Diaria |
| Riesgos abiertos | brain.risk.detected sin resolver, por severidad | Diaria |
| Recomendaciones aceptadas | % recomendaciones de BRAIN aprobadas por humanos | Semanal |
| Automatizaciones solicitadas | brain.automation.requested del periodo | Semanal |
| NPS | Net Promoter Score (cuando exista encuesta) | Trimestral |

## Reglas

1. Ningún KPI se calcula leyendo directamente la base de datos de otra plataforma.
2. Todo snapshot lleva `schemaVersion`, `producedAt`, `sourcePlatform` y `correlationId`.
3. KPIs financieros requieren aprobación de HD-ADMIN antes de publicarse en el dashboard.
4. Cambios a definiciones de KPI se hacen vía PR a este catálogo.
