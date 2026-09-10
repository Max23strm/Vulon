// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import {
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';
import MantineMainProvider from "./providers/MantineMainProvider";
import StateProvider from "./providers/StateProvider";
import { getServerSession } from "./providers/serverSession";
import { NextIntlClientProvider } from "next-intl";


// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
  title: "Vulon team management",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="es" {...mantineHtmlProps}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
            <StateProvider initialState={session}>
              <MantineMainProvider>
                  <Notifications/>
                  {children}
              </MantineMainProvider>
            </StateProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
