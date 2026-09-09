'use client'
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../Navigation/NavBar";
import TopNavBar from "../Navigation/TopNavBar";
import styles from '@/app/components/styles/appshell.module.css'
import BreadCrumbs from "../Navigation/BreadCrumbs";
import { useAppState } from "@/app/providers/StateProvider";


function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const entity = useAppState((state) => state.entity)
  const decorationStyle = {
  "--grad-c1": entity.colors[0] || "transparent",
  "--grad-c2": entity.colors[1] || "transparent",
  "--grad-c3": entity.colors[2] || "transparent",
} as React.CSSProperties;
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 210,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop:!opened },
      }}
      withBorder={false}
      padding="md"
    >
      <span className={styles.main_section_decoration} style={decorationStyle}></span>
      <AppShellHeader className={styles.header_con_logo}>
        <TopNavBar opened={opened} onClick={toggle} />
      </AppShellHeader>

      <AppShellNavbar p="md">
        <NavBar toogleClick={close}/>
      </AppShellNavbar>

      <AppShellMain className={styles.main_section}>
        <BreadCrumbs/>
        {children}
      </AppShellMain>
    </AppShell>
  );
}

export default AppLayout;
