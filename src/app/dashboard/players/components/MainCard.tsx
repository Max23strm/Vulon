'use client'
import { Card, Divider, ProgressRoot, ProgressSection, Text, useMantineTheme } from '@mantine/core'
import styles from '../styles/players.module.css'
import { UsersGroup } from "@mynaui/icons-react";
import { useTranslations } from 'next-intl';
import { playersData, playersStatsData } from "@/interfaces/players";

const MainCard = ({stats}:{stats: playersStatsData | null}) => {
    const t = useTranslations('Players')
    const theme = useMantineTheme();

    const malePerc = ((stats?.male ?? 0 )* 100) / (stats?.registered ?? 1)
    const femalePerc = ((stats?.female ?? 0 )* 100) / (stats?.registered ?? 1)

    return (
        <Card className={styles.main_card} shadow='sm' >
            <div className={styles.titles}>
                <UsersGroup size={'4rem'}/>
                <div className={styles.texts}>
                    <Text size='xl' fw={500}>{`${t('player_rooster')}`}</Text>
                    <Text size='md' fw={500}>{`${stats?.registered ?? 0} ${t('registered_players')}`}</Text>
                    <Text size='md' fw={300}>{`${stats?.active ?? 0} ${t('active')}`}</Text>
                </div>
            </div>
            <Divider orientation="vertical"/>
            <div className={styles.main_statistics}>
                <ProgressRoot size={'lg'}>
                    <ProgressSection value={malePerc ?? 0} color={theme.colors.entityPrimary[7]}/>
                    <ProgressSection value={femalePerc ?? 0} color={theme.colors.entityPrimary[9]}/>
                </ProgressRoot>
                <div className={styles.main_statistics_text}>
                    <Text size={'sm'} fw={300}>{`${stats?.male ?? 0} ${t('male')}`}</Text>
                    <Text size={'sm'} fw={300}>{`${stats?.female ?? 0} ${t('female')}`}</Text>
                </div>
            </div>
        </Card>
    )
}

export default MainCard