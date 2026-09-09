'use client'
import { formatCurrency } from '@/helpers/numberFormaters';
import { UpcomingEvent } from '@/interfaces/home'
import { Card, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { CalendarCheck, Dollar,  UsersGroup, ChevronDownLeft, ChevronUpRight } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import styles from './Card.module.css'
import stylesDefault from '@/app/components/styles/defaults.module.css'
import Link from 'next/link'
import ErrorAlert from '../InformationDisplay/ErrorAlert';

interface AmountCardProps {
    type: 'amount';
    data: {
        income: number
        expense: number
    };
}

interface PlayersCardProps {
    type: 'players';
    data: number;
}

interface EventCardProps {
    type: 'event';
    data: UpcomingEvent | null;
}

type Props = AmountCardProps | PlayersCardProps | EventCardProps;

const StandardCard = ({ type, data }: Props) => {
    const {colors, primaryColor} = useMantineTheme();

    if(type === 'event' && data === null) {
        return <Link href="/dashboard/organization/events" className={stylesDefault.link_deco}>
            <Card
                radius="lg" withBorder
                padding="xl"
                className={styles.mainCard}
            >
                <Text>Sin eventos programados</Text>
                <CalendarCheck className={styles.heroIcon} size={'100px'} color={colors[primaryColor][8]}/>
            </Card>
        </Link>
    }
    
    if(type === 'event' && data !== null ) {
        const { summary, start, location, status } : UpcomingEvent = data
        if( status === '') {
            return  <ErrorAlert errorMessage={"Error obteniendo fechas"}/>
        }
        return ( <Link href="/dashboard/organization/events">
            <Card
                radius="lg" withBorder
                padding="xl"
                className={styles.mainCard}
            >
                <Group justify='space-between'>
                    <Stack >
                        <Text  fw={700} size="lg" >Próximo evento</Text>
                        <Stack gap={'xs'}>
                            <Text size="lg" c='indigo'>{summary}</Text>
                            <Text c="dimmed" size='sm'>{start?.dateTime ? dayjs(start.dateTime).format('DD/MM/YYYY HH:mm') : dayjs(start.date).format('DD/MM/YYYY')}</Text>
                            <Text c="dimmed" size='sm'>{location}</Text>
                        </Stack>
                    </Stack>
                    <CalendarCheck className={styles.heroIcon} size={'100px'} color={colors[primaryColor][8]}/>
                </Group>
            </Card>
        </Link>
        )

    }
    if(type === 'amount' ) {
        const total = data.income - data.expense
        return (
            <Card
                radius="lg" withBorder
                padding="xl"
                className={styles.mainCard}
            >
                <Group justify='space-between'>
                    <Stack gap={'lg'}>
                        <Group>
                            <Stack gap={'xs'}>
                                <Link href={`/dashboard/administration/payments`} className={stylesDefault.link_deco}>
                                    <Text fw={600} size="md">
                                            Recaudado
                                    </Text>
                                </Link>
                                <Group gap={'sm'}>
                                    <Text size="lg" >{formatCurrency(data.income)}</Text>
                                    <ChevronDownLeft color='green'/>
                                </Group>
                            </Stack>
                            <Stack gap={'xs'}>
                                <Link href={`/dashboard/administration/expenses`} className={stylesDefault.link_deco}>
                                    <Text fw={600} size="md">
                                        Gastado
                                    </Text>
                                </Link>
                                <Group gap={'sm'}>
                                    <Text size="lg" >{formatCurrency(data.expense)}</Text>
                                    <ChevronUpRight color='red'/>
                                </Group>
                            </Stack>
                        </Group>
                        {
                            total !== 0 &&
                                <Group>
                                    <Text fw={600} size="md" >Diferencia</Text>
                                    <Stack gap={'sm'}>
                                        <Text size="lg" c={total > 0 ? 'green' : 'red'}>{formatCurrency(total)}</Text>
                                    </Stack>
                                </Group>
                        }
                    </Stack>
                </Group>
                <Dollar className={styles.heroIcon} size={'100px'} color={colors[primaryColor][8]}/>
            </Card>
        )

    }
    if(type === 'players' ) {
        return (
            <Link href={`/dashboard/players`} className={stylesDefault.link_deco}>
                <Card
                    radius="lg" withBorder
                    padding="xl"
                    className={styles.mainCard}
                >
                    <Group justify='space-between'>
                        <Stack >
                            <Text fw={600} size="md" >Jugadores activos</Text>
                            <Stack gap={'sm'}>
                                <Text size="lg" >{data}</Text>
                            </Stack>
                        </Stack>
                        <UsersGroup className={styles.heroIcon} size={'100px'} color={colors[primaryColor][8]}/>
                    </Group>
                </Card>
            </Link>
        )

    }
}

export default StandardCard