# Vulon — Frontend

Aplicación web de Vulon para la gestión de organizaciones deportivas. Permite administrar jugadores, equipos, eventos, pagos y gastos, además de consultar el resumen del panel. Está construida con Next.js App Router y React.

## Funcionalidades

- Inicio de sesión y recuperación de contraseña.
- Selección de organización y panel con resumen.
- Gestión de jugadores y equipos.
- Calendario y gestión de eventos.
- Administración de pagos, gastos y credenciales.
- Gestión de la cuenta del usuario.
- Interfaz disponible en español e inglés.

## Tecnologías

- Next.js 16 y React 19
- TypeScript 5
- Mantine 9 y Tailwind CSS 4
- next-intl, Zustand, Recharts, Motion y Day.js
- ESLint 10

## Requisitos

- Node.js 20.9 o posterior
- npm
- Acceso a una instancia del backend de Vulon

## Configuración local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea `.env.local` a partir de `.env.example` y configura las variables:

   | Variable | Uso |
   | --- | --- |
   | `BASE_URL` | URL base del backend para solicitudes desde el servidor. |
   | `NEXT_PUBLIC_BASE_URL` | URL base del backend para solicitudes desde el navegador. Es visible para los usuarios. |
   | `SESSION_SECRET` | Secreto largo y aleatorio usado para firmar la sesión. |

   Las URL deben apuntar al backend adecuado y no terminar en `/` ni incluir `/api`. Para generar un secreto de sesión local:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

No subas `.env.local` ni secretos al repositorio. No incluyas credenciales en `NEXT_PUBLIC_BASE_URL`, ya que las variables con el prefijo `NEXT_PUBLIC_` se exponen al navegador. `.env.example` es una plantilla y no debe contener valores privados.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo con Turbopack. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run build` | Genera el build de producción. |
| `npm run start` | Sirve el build de producción. Ejecuta primero `npm run build`. |

## Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/login` | Inicio de sesión. |
| `/forgot-password` | Recuperación de contraseña. |
| `/entity-selector` | Selección de organización. |
| `/dashboard/home` | Resumen del panel. |
| `/dashboard/players` | Jugadores. |
| `/dashboard/teams` | Equipos. |
| `/dashboard/organization/events` | Eventos de la organización. |
| `/dashboard/administration/payments` | Pagos. |
| `/dashboard/administration/expenses` | Gastos. |
| `/dashboard/administration/credentials` | Credenciales. |
| `/dashboard/my-account` | Cuenta del usuario. |

## Estructura del proyecto

```text
src/
├── app/          # Rutas, páginas, componentes, estado y servicios
├── helpers/      # Funciones de acceso a datos y utilidades
├── i18n/         # Configuración de internacionalización
├── interfaces/   # Tipos TypeScript por dominio
└── proxy.ts      # Proxy de Next.js
messages/         # Traducciones en inglés y español
public/           # Recursos estáticos
```

Las funciones de acceso a datos tienen variantes para servidor y cliente (sufijo `Client`). La mayoría de las solicitudes del servidor usan `BASE_URL` y las del navegador usan `NEXT_PUBLIC_BASE_URL`; revisa el módulo correspondiente si añades o modificas una integración.

## Despliegue

Usa una plataforma compatible con Next.js. Configura `BASE_URL`, `NEXT_PUBLIC_BASE_URL` y `SESSION_SECRET` en el entorno de despliegue, ejecuta `npm run build` y luego `npm run start` (o el comando de inicio requerido por la plataforma). Usa un secreto de sesión distinto y seguro en cada entorno; no lo guardes en el código ni en la documentación.

## Licencia

Privado. Todos los derechos reservados.
