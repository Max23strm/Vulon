import Image from "next/image";
import PitzLogo from "../../../../public/images/pitz-player.png";
import Link from "next/link";
import { Burger, NavLink } from "@mantine/core";
import styles from "@/app/components/styles/appshell.module.css";
import ThemeSwitcher from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";
import { navElements } from "@/app/utils/navigation";
import TopNavigationLink from "./TopNavigationLink";
import VulonLogo from '@public/Vulon.svg'
const TopNavBar = ({
  opened,
  onClick,
}: {
  opened: boolean;
  onClick: () => void;
}) => {

  return (
    <>
      <Burger
        opened={opened}
        onClick={onClick}
        hiddenFrom="sm"
        size="md"
        className={styles.menu_button}
      />

      <Link href={"/entity-selector"}>

        <Image
            src={VulonLogo}
            width={50}
            height={50}
            alt={'Vulon logo'}
        />
      </Link>

      <div className={styles.nav_line}>
        {navElements.map((nav, i) => {
          return <TopNavigationLink navElem={nav} key={`top-nav-${i}`} />;
        })}
      </div>

      <div className={styles.header_group}>
        <ThemeSwitcher />
        <UserAvatar />
      </div>
    </>
  );
};

export default TopNavBar;
