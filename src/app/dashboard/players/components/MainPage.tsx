"use client";


import { Button } from '@mantine/core'
import Link from 'next/link'
import styles from '../styles/players.module.css'
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import PlayerNewModal from './PlayerNewModal';
const MainPage = ({ children } : {children: React.ReactNode}) => {
    const t = useTranslations('Players')
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <div className={styles.page_structure}>
            <div className={styles.toolbar}>
                <Button
                    onClick={toggle}
                    size='compact-sm'
                    variant="gradient"
                >
                        {t('add_player')}
                </Button>
                <PlayerNewModal isOpen={opened} handleClose={close} />
            </div>
            <div className={styles.main}>
                {children}
                
            </div>
        </div>
    )
}

export default MainPage