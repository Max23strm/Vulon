# Vulon — Frontend

Aplicación web frontend de **Pitz**, construida con Next.js 15 (App Router) y React 19. Incluye autenticación, dashboard y módulos de gestión (jugadores, reportes, pagos, eventos, etc.) con UI basada en Mantine y gráficos con Recharts.

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** React 19, Mantine 8 (`@mantine/core`, `dates`, `form`, `charts`, `notifications`, `hooks`)
- **Estilos:** TailwindCSS 4 + PostCSS
- **Gráficos:** Recharts (vía `@mantine/charts`)
- **Íconos:** `@mynaui/icons-react`
- **Animaciones:** Motion (`motion`)
- **Fechas:** Day.js
- **Color:** chroma-js
- **Lenguaje:** TypeScript 5
- **Linter:** ESLint 9 + `eslint-config-next`

## Requisitos previos

- Node.js (versión recomendada por Next.js 15, ≥ 18.18)
- npm (o el gestor de paquetes de tu preferencia: yarn / pnpm / bun)

## Scripts

| Comando       | Descripción                                  |
| ------------- | -------------------------------------------- |
| `npm run dev` | Inicia el servidor de desarrollo con Turbopack en `http://localhost:3000` |
| `npm run build` | Compila la aplicación para producción      |
| `npm run start` | Sirve el build de producción               |
| `npm run lint` | Ejecuta ESLint sobre el proyecto            |

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las variables necesarias (por ejemplo, la URL base del backend). Consulta con el equipo backend para los valores exactos.

```bash
# Ejemplo
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## Estructura del proyecto

```
src/
├── app/                  # Rutas y páginas (App Router)
│   ├── (auth)/           # Rutas de autenticación
│   ├── components/       # Componentes compartidos
│   ├── dashboard/        # Pantallas del dashboard
│   ├── providers/        # Proveedores de contexto (Mantine, tema, etc.)
│   ├── layout.tsx        # Layout raíz
│   └── globals.css       # Estilos globales
├── helpers/              # Utilidades y clientes de datos
│   ├── dataFetcher*      # GET  (cliente y servidor)
│   ├── dataPoster*       # POST (cliente y servidor)
│   ├── dataPutter*       # PUT  (cliente y servidor)
│   ├── dataDeteler*      # DELETE
│   ├── loginFn.ts        # Lógica de login
│   ├── dayjs.ts          # Configuración de Day.js
│   ├── numberFormaters.ts
│   └── promiseTypeGuards.ts
├── interfaces/           # Tipos TypeScript por dominio
│   ├── users.ts
│   ├── players.ts
│   ├── reports.ts
│   ├── payments.ts
│   ├── expenses.ts
│   ├── events.ts
│   ├── home.ts
│   └── fetchers.ts
└── middleware.ts         # Middleware de Next.js (auth/redirects)
```

## Convención de helpers de datos

Existe un par cliente/servidor para cada operación HTTP:

- `dataFetcher` / `dataFetcherClient` → `GET`
- `dataPoster` / `dataPosterClient` → `POST`
- `dataPutter` / `dataPutterClient` → `PUT`
- `dataDeteler` / `dataDetelerClient` → `DELETE`

Usa las variantes **sin sufijo `Client`** desde Server Components / Route Handlers y las variantes con `Client` desde Client Components.

## Conventional commits / estilo de commits

Sigue los mensajes de commit al estilo Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.) y mantén los cambios enfocados por feature.

## Despliegue

El proyecto es compatible con cualquier plataforma que soporte Next.js (Vercel, Node.js con `next start`, Docker, etc.). Recuerda configurar las variables de entorno en el destino del deploy.

## Licencia

Privado. Todos los derechos reservados.
