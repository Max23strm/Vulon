"use client";


import { Button } from '@mantine/core'
import Link from 'next/link'
import styles from '../styles/players.module.css'
import { useTranslations } from 'next-intl';
const MainPage = ({ children } : {children: React.ReactNode}) => {
    const t = useTranslations('Players')
    return (
        <div className={styles.page_structure}>
            <div className={styles.toolbar}>
                <Link href={"/dashboard/players/new-player"}>
                    <Button
                        size='compact-sm'
                        variant="gradient"
                    >
                            {t('add_player')}
                    </Button>
                </Link>
            </div>
            <div className={styles.main}>
                {children}
                
            </div>
        </div>
    )
}

export default MainPage