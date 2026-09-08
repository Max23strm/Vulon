import styles from "@/app/components/styles/appshell.module.css";
import ThemeSwitcher from './ThemeSwitcher'
import UserAvatar from './UserAvatar'
import VulonLogo from '@public/Vulon.svg'
import Image from "next/image";
const BasicNavbar = () => {
    return (
        <>
            <div>
                <Image
                    src={VulonLogo}
                    width={50}
                    height={50}
                    alt={'Vulon logo'}
                />
            </div>
            <div className={styles.header_group}>
                <ThemeSwitcher />
                <UserAvatar />
            </div>
        </>
    )
}

export default BasicNavbar