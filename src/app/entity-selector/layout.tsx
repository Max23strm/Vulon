import { AppShell, AppShellHeader, AppShellMain } from "@mantine/core";
import styles from '@/app/components/styles/appshell.module.css'
import BasicNavbar from "../components/Navigation/BasicNavbar";

export default function EnityLayout({ children }: { children: React.ReactNode;}) {
    return (
        <AppShell
              header={{ height: 60 }}
              withBorder={false}
              padding="md"
            >
                <span className={styles.main_section_decoration}></span>
                <AppShellHeader className={styles.header_con_logo}>
                    <BasicNavbar/>
                </AppShellHeader>
                <AppShellMain className={styles.main_section}>
                    {children}

                </AppShellMain>
        </AppShell>
    );
}