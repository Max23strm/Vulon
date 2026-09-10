import Link from "next/link";
import { Burger, Image, } from "@mantine/core";
import styles from "@/app/components/styles/appshell.module.css";
import ThemeSwitcher from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";
import { navElements } from "@/app/utils/navigation";
import TopNavigationLink from "./TopNavigationLink";
import VulonLogo from "@public/Vulon.svg";
import { useAppState } from "@/app/providers/StateProvider";
const TopNavBar = ({
  opened,
  onClick,
}: {
  opened: boolean;
  onClick: () => void;
}) => {

    const entity = useAppState((state) => state.entity)
  
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
          <Image src={entity.logo ? entity.logo : VulonLogo} width={50} height={50} />
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
