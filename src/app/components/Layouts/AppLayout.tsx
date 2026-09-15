"use client";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Image,
  NavLink,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import NavBar from "../Navigation/NavBar";
import TopNavBar from "../Navigation/TopNavBar";
import styles from "@/app/components/styles/appshell.module.css";
import BreadCrumbs from "../Navigation/BreadCrumbs";
import { useAppState } from "@/app/providers/StateProvider";
import ThemeSwitcher from "../Navigation/ThemeSwitcher";
import UserAvatar from "../Navigation/UserAvatar";
import VulonLogo from "@public/Vulon.svg";
function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const entity = useAppState((state) => state.entity);
  const decorationStyle = {
    "--grad-c1": entity.colors[0] || "transparent",
    "--grad-c2": entity.colors[1] || "transparent",
    "--grad-c3": entity.colors[2] || "transparent",
  } as React.CSSProperties;

  const matches = useMediaQuery('(min-width: 48em)');

  return (
    <AppShell
      header={{ height: 60, collapsed:matches }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      withBorder={true}
      padding="md"
      // className={styles.main_background}
    >
      <span
        className={styles.main_section_decoration}
        style={decorationStyle}
      ></span>
      <AppShellHeader className={styles.header_con_logo}>
        <TopNavBar opened={opened} onClick={toggle} />
      </AppShellHeader>

      <AppShellNavbar p="md">
        <NavLink
          href={"/entity-selector"}
          className={`${styles.button_entity}`}
          label={entity.name}
          leftSection={
            <Image
              src={entity.logo ? entity.logo : VulonLogo}
              width={30}
              height={30}
            />
          }
        />
        <NavBar toogleClick={close} />
        <div className={styles.user_theme_group}>
          <ThemeSwitcher />
          <UserAvatar />
        </div>
      </AppShellNavbar>

      <AppShellMain className={styles.main_section}>
        <BreadCrumbs />
        {children}
      </AppShellMain>
    </AppShell>
  );
}

export default AppLayout;
