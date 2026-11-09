# Eventos — Gestión interna · Opción 11 “Planilla de cancha · Edición”

> Respuestas incorporadas: **staff only · crear/editar en Vulon · sin búsqueda/filtros · detalle/recurrencia por definir · archivo por mes · zona horaria por definir · Maps sí**
> Diseño puro. No se toca código en `src/`.
> Mockups en esta carpeta:
> - `opcion-11-eventos-gestion.svg` — desktop 1440×960 (lista + calendario + crear)
> - `opcion-11-modal-nuevo-editar.svg` — desktop 1440×960 (modal Nuevo/Editar)
> - `opcion-11-eventos-mobile.svg` — mobile 390×844 (lista + alta rápida)
> Shell: sidebar `#171B2E`, topbar blanco, `MantineMainProvider` (Rajdhani / DM Sans / Space Grotesk), Mantine + `@mantine/dates` como referencia visual.

## 1. Sujeto y trabajo

**Sujeto:** staff de un club (Vulon). Ya no es “ver Google”, es **cargar y corregir la agenda del mes** desde la cancha para la oficina.

**Trabajo primario:** me abren el mes, veo qué falta / qué está en borrador, cargo o corrijo un evento y lo publico en menos de un minuto.

**Qué cambia respecto a opción 10 (solo lectura):**
- La página deja de ser un catálogo público. Tono operativo, densidad de staff, estado `Borrador/Publicado`.
- Google pasa a ser “importar / sincronizar” o enlace externo, no el origen. El CTA central es **+ Nuevo evento**.
- Sin búsqueda ni filtros por pedido: el control es **mes (URL `?date=`) + día seleccionado (cliente)**.
- Cada fila es editable; el calendario crea en el día vacío con un clic.

## 2. Tokens (revisión)

Se mantienen los de opción 10 por continuidad, con un agregado para estado editorial:

```
Pitch  #0F3527 — primario, día seleccionado, banner próximo evento
Chalk  #F6F8F3 — fondo
Linen  #FFFFFF — superficie
Line   #DCE2D6 — regla de planilla
Earth  #8C4A1F — torneo / advertencia de borrador
Sun    #E9B44C — hoy / foco
Mist   #E6EDE6 — borrador (fondo)
```

Tipo: Rajdhani 700 fechas/mes · DM Sans 600 títulos · Space Grotesk 500 horas `HH:MM hs`.

Por tipo (dato, no branding):
- Entrenamiento `#0F6B4F` · Torneo 7s/10s/15s `#8C4A1F` · Integración `#6B5DD3`
- Estado: `Publicado` chip sólido `#ECF3EE` texto `#0F3527` · `Borrador` chip `#FFF4D6` texto `#8C6A00` con borde punteado

Revisión anti-default: sin card-soup; filas con fecha grande, una sola superficie oscura (próximo evento + modal header). Sin eyebrows `01/02`, sin mayúsculas sistemáticas.

## 3. Layout desktop — gestión (SVG 1)

```
┌───────────────────────────────────────────────────────────────┐
│ Eventos · Agosto 2026              [Hoy] [+ Nuevo evento]     │
│ Staff · Archivo por mes · 14 eventos · 1 borrador             │
├───────────────────────────────────────────────────────────────┤
│ PITCH BANNER — Próximo evento (Publicado)                     │
│ Sáb 16 Torneo 7s — Amistoso · Predio                 [Editar]  │
├──────────────────────────────────┬────────────────────────────┤
│ GRUPOS POR DÍA (sin filtros)     │ CALENDARIO + CREAR         │
│ Jue 14 · Entrenamiento [Pub]  ✎  │ Agosto ‹ › HOY             │
│     19:00–21:00 · Cancha 1  📍   │  anillo hoy / Pitch sel.    │
│     maps link                      │  + Nuevo el 16             │
│ Sáb 16 · Torneo 7s [Pub]       ✎  │  19 vacío → [+ Nuevo el 19]│
│ Sáb 16 · Integración [Borr.]   ✎  │  Leyenda estados/tipos     │
│ Mar 19 · Sin eventos   [+ Nuevo] │  ¿Falta algo? Esto es Vulon│
└──────────────────────────────────┴────────────────────────────┘
```

- **Header:** mes grande + conteo operativo (“14 eventos · 1 borrador · 3 publicados esta semana”). Botones `Hoy` (secundario) y `+ Nuevo evento` (primario Pitch). Ya no hay “Abrir Google” como acción principal; queda en el calendario como “Sincronizar / Importar Google” secundario.
- **Banner Pitch:** próximo `Publicado` con botón `Editar`. Si el próximo está en borrador, se muestra en `#FFF4D6` con CTA `Revisar y publicar`.
- **Lista:** grupos por día. Cada fila: `DD` Rajdhani + título + chip tipo + chip estado + hora/lugar + `📍 Maps` + `✎ Editar` + `⋮` (ver duplicar/eliminar). Sin buscador ni pills. Fila de vacío en día clicable: `+ Nuevo evento el 19`.
- **Calendario:** día con evento = dots por tipo; día vacío con foco = `+` tenue. Panel bajo el calendario: resumen del día seleccionado + botón `+ Nuevo el 16`. Panel oscuro bajo ese: “Vulon es la fuente. Google solo se importa.”

**Mobile (SVG 3):** banner compacto → strip de días con `+` en vacío → grupos → FAB `+ Nuevo` fijo abajo-derecha. Alta por bottom-sheet (mismo form del modal, apilado).

## 4. Crear / Editar — modal (SVG 2)

Modal centrado 640×720, header Pitch con título dinámico `Nuevo evento` / `Editar — Torneo 7s`.

**Campos (orden de carga rápida):**
1. Título (texto libre, requerido — no se usa para derivar tipo)
2. Tipo (segmented: Entrenamiento / Torneo 7s / Torneo 10s / Torneo 15s / Integración)
3. Fecha inicio + Hora inicio + Fecha fin + Hora fin (DateTime pickers Mantine). Toggle `Día completo` oculta horas y guarda `HH=00` → se muestra “Día completo” (resuelve confusión `date` vs `dateTime`)
4. Lugar (texto) + URL de Maps (texto, requerido si hay lugar — por respuesta 8)
5. Descripción (textarea, opcional — detalle por definir, se guarda pero no se muestra en fila)
6. Estado (Segmented `Publicado / Borrador`) — borrador permite cargar incompleto
7. Frecuencia (select `Una vez / Semanal / Quincenal` + chip “Por definir — ver respuesta 5” en gris, sin bloquear guardado)
8. Zona horaria (select, campo visible por respuesta 7 — ya no se asume `America/Argentina`; default vacío con ayuda “Elige para que la hora sea correcta”)

**Footer:** `[Cancelar] [Guardar borrador] [Guardar y publicar]`. En editar: `[Eliminar]` a la izquierda (danger ghost). Guardado con `validación inline` (título/tipo/fecha inicio obligatorios; fin ≥ inicio; Maps obligatoria si hay lugar).

**Atajos staff:** en calendario, clic en día vacío → abre modal precargado con esa fecha. En fila, `✎` → precarga evento. `Esc` cierra sin guardar.

## 5. Detalle y recurrencia — por definir (respuestas 4–5)

- **Detalle:** no se mostró como página. La fila es clicable y **expande inline** (acordeón) mostrando descripción + Maps + `Editar/Eliminar`. Evita decidir entre modal/página por ahora. Si luego quieren “vista staff completa”, esa expansión es el puente.
- **Recurrencia:** el form la expone pero marcada TBD. En la lista, un evento recurrente muestra chip `↻ Semanal` y la edición aplica a “solo esta ocurrencia” con diálogo de confirmación. Diseño intencionalmente gris para no prometer comportamiento.

## 6. Archivo por mes, estados y Maps

- **Por mes:** `?date=YYYY-MM-DD` como fuente de verdad. Flechas del calendario cambian de mes (archiva). Sin infinite scroll; sin “historial total”. Pasados dentro del mes van en sección colapsada `Ya pasados (n)` al final, siempre editables.
- **Borrador vs Publicado:** solo `Publicados` alimentan Home/`StandardCard`. Borradores solo los ve staff. El banner solo elige publicados futuros.
- **Maps (respuesta 8):** fila: `📍 Predio Central · Ver en Maps ↗`. Form exige URL válida (`https://maps…` / `https://goo.gl/maps…`). En móvil abre Maps nativo.

## 7. Supuestos / pendientes explícitos

- **Zona horaria (7 = No):** se asume “todavía no confirmada”. El diseño la hace visible y obligatoria en el form; `HH:MM` se renderiza con la zona elegida, nunca se hardcodea en el mock.
- **Detalle (4) y recurrencia (5):** se dejan como campos/chips TBD sin bloquear el flujo base.
- Google: queda como importador secundario. No se diseña flujo de sync en esta opción.

## 8. Componentes visuales (solo diseño, sin código)

| Pieza | SVG | Contenido |
|---|---|---|
| Gestión desktop | `opcion-11-eventos-gestion.svg` | Header, banner, grupos, calendario+crear, fila vacío |
| Modal Nuevo/Editar | `opcion-11-modal-nuevo-editar.svg` | Form completo, estados, validación, peligro |
| Mobile gestión | `opcion-11-eventos-mobile.svg` | Strip días, filas, FAB, bottom-sheet implied |

Si aprueban, el siguiente paso (cuando autorices código) sería: `EventsPage (server) + MainComponent + EventFormModal + EventsDayGroup + MainCalendar v2` manteniendo Mantine/Date y tema por entidad.
