"use client";

import styles from "@/app/components/styles/appshell.module.css";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defineActive, navElements } from "@/app/utils/navigation";
import { useTranslations } from "next-intl";
function NavBar({ toogleClick }: { toogleClick: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  if (navElements.length) {
    return (
      <>
        {navElements.map((e, i) => {
          if (!e.children?.length) {
            return (
              <NavLink
                key={`${e.href} - ${i} - padre`}
                component={Link}
                variant="subtle"
                className={styles.button}
                label={t(e.name)}
                onClick={toogleClick}
                href={e.href}
                leftSection={e.icon}
                active={defineActive(e.href, pathname)}
              />
            );
          }

          return (
            <NavLink
              key={`${e.href} - ${i} - padre`}
              variant="subtle"
              label={t(e.name)}
              className={styles.button}
              leftSection={e.icon}
              active={defineActive(e.href, pathname)}
            >
              {e.children.length &&
                e.children.map((child, index) => (
                  <NavLink
                    key={`${child.href} - ${i} - ${index}`}
                    component={Link}
                    onClick={toogleClick}
                    variant="subtle"
                    className={styles.button}
                    active={defineActive(child.href, pathname)}
                    label={t(child.name)}
                    href={child.href}
                  />
                ))}
            </NavLink>
          );
        })}
      </>
    );
  }
}

export default NavBar;
