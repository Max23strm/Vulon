# Eventos — Catálogo · Opción 10 “Planilla de cancha”

> Mockups: `UI/opcion-10-eventos-catalogo.svg` (1440×960 desktop) y `UI/opcion-10-eventos-catalogo-mobile.svg` (390×844 mobile).
> Mantine v9 + `@mantine/dates` se conserva. No se propone cambiar librería.
> Shell conservado: sidebar `#171B2E`, topbar blanco, `MantineMainProvider.tsx` (DM Sans / Rajdhani / Space Grotesk).

## 1. Sujeto y trabajo primario

**Sujeto:** gestión de un club deportivo argentino (Vulon). Los eventos son de Google Calendar (solo lectura): entrenamientos, torneos 7s/10s/15s, actividades de integración.

**Audiencia supuesta (confirmar):** coordinador / entrenador que abre la página a diario para responder “¿qué hay esta semana / hoy / el sábado?”.

**Trabajo primario:** escanear hacia adelante en tiempo, no navegar un calendario decorativo. La lista manda; el calendario es el mapa de contexto.

## 2. Lo que está roto hoy — auditoría

Leído en `src/app/dashboard/organization/events/`:

1. **Calendario decorativo.** `MainCalendar.tsx` es `static`, sin `value` ni `onDaySelect`. Solo `Indicator` si hay evento. Tocar un día no hace nada.
2. **Cambio de mes desconectado.** `MainComponent.tsx:monthChange` solo hace `setDate`. `page.tsx` fetchea por `?date=` una sola vez en Server Component; el fetch client-side está comentado. Al cambiar de mes la lista nunca cambia.
3. **Lista plana.** `events.map(EventsListCard)` sin `sort`, sin agrupar por día, sin “hoy / próximo / pasados”, sin conteo.
4. **Badge con dato equivocado.** `EventsListCard.tsx:28` pasa `event.summary` a `<EventType event={…}/>` en vez de `event.event_type`. Si el título no es exactamente `Entrenamiento | Torneo 15s | …`, `defineColor` cae a `gray`.
5. **Hora en 12 h sin AM/PM.** `EventsListCard.tsx` usa `hh:mm`. En Argentina se lee 24 h: cambiar a `HH:mm`.
6. **Sin búsqueda, sin filtros, vacío pobre.** Un `Alert` cian genérico (“Sin datos para mostrar”), sin `Skeleton` al cambiar de mes, sin distinguir “mes vacío” vs “día sin eventos”, sin reintentar.
7. **Layout frágil en mobile.** `useMediaQuery(1050px)` duplica `MainCalendar` (arriba en mobile, al costado en desktop). A 375 px el calendario empuja la lista fuera de viewport.

## 3. Tokens (plan — primera pasada)

```
Pitch      #0F3527  — verde cancha oscuro: banner próximo evento, día seleccionado, acción primaria
Chalk      #F6F8F3  — papel tiza: fondo de página
Linen      #FFFFFF  — superficie de grupos
Field Line #DCE2D6  — bordes sutiles, líneas de la planilla
Earth      #8C4A1F  — cuero / torneo (acento cálido)
Sun        #E9B44C  — marcador de “hoy” (anillo, no relleno)
```

**Tipo:**
- Display / fecha grande: Rajdhani 700 (ya es `headings.fontFamily`), números en `DD` a 28–32 px.
- Cuerpo / título de evento: DM Sans 600, 15 px.
- Hora / metadatos: Space Grotesk 500, 12–13 px, `HH:MM hs` (ya es `fontFamilyMonospace`).
- Todo en sentence case, sin eyebrow en mayúsculas. Los grupos se etiquetan por fecha real, no por numeración `01/02/03`.

**Por tipo de evento (unificar con `EventType.tsx`):**

| Tipo | Color | Uso |
|---|---|---|
| Entrenamiento | `#0F6B4F` | barra 3 px a la izquierda de la fila |
| Torneo 7s / 10s / 15s | `#8C4A1F` | idem |
| Actividad de integración | `#6B5DD3` | idem |
| Otros / sin clasificar | `#6B7280` | idem |

> El color de entidad (`entity.colors`) sigue mandando en botones primarios vía `MantineMainProvider`. Los colores de tipo son datos, no branding, y no se pisan por entidad.

## 4. Layout — desktop (ver SVG)

```
┌────────────────────────────────────────────────────────────────┐
│ Eventos · Agosto 2026                    [Hoy][Google ↗]       │
│ Sincronizado con Google Calendar · Solo lectura · 14 eventos   │
├────────────────────────────────────────────────────────────────┤
│ PITCH BANNER (único momento fuerte)                            │
│  SÁB 16  Torneo 7s — Amistoso · Predio Central                 │
│  10:00–16:00 hs   Presentarse 09:15            [Ver en Google] │
├────────────────────────────────────────────────────────────────┤
│ 14 eventos · 9 entr. · 3 torneos · 2 integraciones   12–31 ago │
├───────────────────────────────┬────────────────────────────────┤
│ GRUPO POR DÍA (filas, no cards)│ CALENDARIO (sticky, 5/12)    │
│ HOY — JUE 14 · 1 evento        │ Agosto 2026 ‹ › HOY         │
│ ───────────────────────────────│ L MAR MIÉ JUE VIE SÁB DOM    │
│ ▸ 14 JUE Entrenamiento 15s     │   … anillo = hoy (Sun)       │
│   19:00–21:00 hs · Cancha 1    │   … fondo Pitch = 16 sel.    │
│ ▸ SÁB 16 · 2 eventos           │   … dots = tipo (máx 3 +n)   │
│   …                            │   Leyenda + “16: 2 eventos”  │
│ MARTES 19 — sin eventos        │   ¿Falta un evento? (Google) │
│ ── dashed row, invitación ──   │                                │
└───────────────────────────────┴────────────────────────────────┘
```

- **Filas con regla, no tarjetas idénticas.** Cada evento es una fila separada por `Field Line`. A la izquierda, bloque de fecha `DD + día corto`. Barra de 3 px por tipo. La fila del próximo evento lleva fondo `#ECF3EE` (tinte de Pitch), no otra card.
- **Fecha como tipo activo.** El `DD` en Rajdhani es el ancla visual; en móvil se mantiene horizontal sin romper la fila.
- **Calendario a la derecha, sticky.** Incluye leyenda en texto plano (“Puntos = tipo, anillo = hoy, fondo oscuro = día elegido”) y un resumen del día seleccionado. Domingo atenuado (`weekendDays:[0]` existente).
- **Banner Pitch** es el único fondo oscuro de la página. El resto es quieto y disciplinado (Chalk + blancos).

**Mobile (ver SVG):** banner compacto → strip horizontal de días del mes (hoy con anillo, sel. con fondo Pitch) → grupos por día a ancho completo → calendario completo solo al expandir “Ver mes”. Se elimina la duplicación con `useMediaQuery`; un solo `MainCalendar` con `Grid span={{ base: 12, md: 5 }}`.

## 5. Revisión contra la brief — qué cambié y por qué

La primera pasada (y la opción 9 existente) caía en el default “kit de cards SaaS”: cada evento en una card blanca con `shadow xs / radius md / border`, KPIs en 4 cards iguales, todo en `#F3F5F9` + violeta `#7975D8`.

Eso se cambió por:

1. **De card-soup a planilla.** Filas con regla y fecha grande. Justificación: una agenda de club se escanea como fixture, no como tarjetas de producto.
2. **De violeta genérico a Pitch/Chalk.** Justificación: el sujeto es una cancha. El verde oscuro es propio de la marca deportiva y permite que los colores de tipo (datos) no compitan con el acento.
3. **Un solo bloque oscuro** (próximo evento) en vez de cards oscuras o gradientes decorativos. Justificación: boldness en un lugar; el resto disciplina.
4. **Sin eyebrows en mayúsculas ni numeración.** Los encabezados de grupo son fechas reales (“Hoy — Jue 14”, “Sáb 16 · 2 eventos”). Es información, no decoración.
5. **Tipografía con roles reales.** Rajdhani para fecha/mes, DM Sans para título, Space Grotesk solo para horas. Sin “una palabra en cursiva de color”.

## 6. Interacción propuesta

| Acción | Comportamiento | Implementación |
|---|---|---|
| Clic en día del calendario | Filtra la lista a ese día. Segundo clic limpia. | `value` controlado + `onDaySelect` en `MainCalendar` |
| Flechas / cambio de mes | Cambia el mes y refetchea. | `onMonthSelect/onNextMonth/onPreviousMonth → router.replace(?date=YYYY-MM-01)` con `useTransition` + `Skeleton` en lista |
| Dots en día | Hasta 3 colores por tipo + `+n` si hay más | `renderDay` agrupando `events` por `DDMMYYYY` |
| Clic en fila / ↗ | Abre Google `event.link` | `target=_blank rel=noopener noreferrer` ya; agregar `aria-label="Ver Entrenamiento 15s en Google"` |
| Buscar | Filtra por título/lugar, solo cliente | `TextInput` en `FilterBar` (nuevo) |
| Filtrar por tipo | Pills `Todos / Entrenamientos / Torneos` | estado cliente, no toca URL |
| Mes vacío | “Este mes no tiene eventos. Ver septiembre →” | `EmptyMonth` con CTA `router.replace` |
| Día sin eventos | Fila dashed: “Sin eventos el 19. Probá otro día →” | `EmptyDay` |
| Error | “No pudimos traer los eventos. Reintentar” | reutilizar `ErrorAlert` + botón retry (nuevo) |
| Pasados | Sección colapsada “Ya pasados (3)” | `sort` asc; filtrar `end < startOfToday` |

**Flujo de datos (fix central):**

```
?date=2026-08-16 ──server──→ eventsGeneralFetch(date, entity_uid) ──→ events[]
                                                               │
                                              MainComponent ◄────┘
         ┌─ MonthChange → router.replace(?date=YYYY-MM-01) ────┤
         ├─ DaySelect   → setSelectedDay (cliente)              ─┤
         └─ Query/Type  → setQuery/setTypeFilter (cliente)      ─┘
```

- URL = fuente de verdad del **mes** (compartible, “atrás” funciona).
- **Día + filtros** solo cliente (no ensucian URL).
- Mientras carga: `useTransition` → `Skeleton` en lista, `opacity .6` en calendario. No mostrar “sin datos” hasta terminar.

**Utilidades nuevas (`helpers/events.ts`):** `groupByDay(events)`, `formatTimeRange(e)`, `nextEvent(events)`, `isFullDay(e)`. Reutilizables en `StandardCard` del home.

## 7. Componentes sugeridos

| Componente | Archivo | Rol |
|---|---|---|
| `EventsPage` (server) | `organization/events/page.tsx` | Lee `?date=`, llama `eventsGeneralFetch`, error → `ErrorAlert` |
| `MainComponent` (client) | `…/events/components/MainComponent.tsx` | Orquesta `month / selectedDay / query / typeFilter / isPending` |
| `NextEventBanner` | `…/events/components/NextEventBanner.tsx` (nuevo) | Bloque Pitch con el próximo evento |
| `FilterBar` | `…/events/components/FilterBar.tsx` (nuevo) | `TextInput` + pills de tipo |
| `EventsDayGroup` | `…/events/components/EventsDayGroup.tsx` (nuevo) | Encabezado de día + filas |
| `EventsListRow` (v2) | `…/events/components/EventsListCard.tsx` | Fila con fecha, badge corregido, `HH:mm` |
| `MainCalendar` (v2) | `…/events/components/MainCalendar.tsx` | Controlado, dots por tipo, leyenda, `aria-label` por día |
| `EmptyMonth / EmptyDay` | dentro de `MainComponent` | Vacíos con CTA |

Fixes de 1 PR (quick wins): `event.event_type` + `hh:mm→HH:mm` + `sort` + calendario seleccionado + `router.replace(?date=…)` + `EmptyMonth` con retry.

## 8. Accesibilidad / i18n / polish

- Cada día con eventos: `aria-label="16 de agosto: 2 eventos"` + botón focusable con anillo visible. Hoy con texto “Hoy” además del anillo (no solo color).
- Contraste: `#0F3527` sobre blanco y `#F6F8F3` pasa 4.5:1. Texto secundario `#5F6B5F` sobre Chalk verificado.
- `prefers-reduced-motion`: sin slide-in en filas; hover cambia borde, no translate.
- `dayjs` locale `es` ya configurado: `dddd DD`, `HH:mm hs`. `firstDayOfWeek: 1`, `weekendDays: [0]` se mantienen.
- Foco visible en pills y en día seleccionado; orden de tab = orden visual (banner → filtros → grupos → calendario).

## 9. Preguntas pendientes (ver chat)

1. Audiencia y permisos: ¿solo coordinadores/staff, o también padres/jugadores ven esta página?
2. Alcance del calendario: ¿solo lectura desde Google (como hoy) o quieren crear/editar eventos en Vulon?
3. Búsqueda/filtros: ¿necesitan buscar por nombre/lugar y filtrar por tipo, o alcanza con mes + día?
4. Detalle de evento: ¿alcanza con abrir Google, o quieren modal con descripción / invitados / notas?
5. Entrenamientos recurrentes: ¿se muestran como eventos individuales de Google o quieren agrupar “Entrenamiento — Semanal”?
6. Pasados y archivo: ¿se archivan por mes o hay que ver historial completo?
7. Zona horaria y `full-day`: confirmar `America/Argentina/Buenos_Aires` y cómo tratar `date` vs `dateTime`.
8. Ubicación: ¿link a Maps además de Google Calendar?
