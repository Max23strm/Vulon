# Vulon — Frontend

Frontend de **Vulon** para gestionar jugadores, equipos, pagos, gastos, eventos y reportes. Está construido con Next.js App Router y React.

## Tecnologías

- Next.js 16 y React 19
- TypeScript 5
- Mantine 9 y Tailwind CSS 4
- Recharts, Motion, Day.js y Zustand
- ESLint 10

## Requisitos

- Node.js 20.9 o posterior
- npm

## Configuración

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` a `.env.local` y completa la configuración para tu entorno. La plantilla documenta las variables que necesita la aplicación; solicita los valores adecuados al equipo responsable del backend.
3. Inicia el servidor de desarrollo con `npm run dev`.

No compartas ni subas `.env.local` ni otros archivos con credenciales. La plantilla `.env.example` sí está versionada.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo con Turbopack. |
| `npm run build` | Genera el build de producción. |
| `npm run start` | Sirve el build de producción. |
| `npm run lint` | Ejecuta ESLint. |

## Estructura

```text
src/
├── app/          # Rutas, páginas, layouts, componentes y servicios de la aplicación
├── helpers/      # Clientes HTTP y utilidades
├── interfaces/   # Tipos TypeScript por dominio
└── middleware.ts # Middleware de Next.js
```

Los helpers de datos tienen variantes para servidor y cliente: `dataFetcher`, `dataPoster`, `dataPutter` y `dataDeteler`, junto con sus equivalentes `*Client`. Usa los helpers sin sufijo `Client` en código de servidor y los que llevan ese sufijo en componentes de cliente.

## Despliegue

Se puede desplegar en plataformas compatibles con Next.js. Configura las variables de entorno necesarias en el entorno de despliegue y no incluyas secretos en el código ni en la documentación.

## Licencia

Privado. Todos los derechos reservados.
