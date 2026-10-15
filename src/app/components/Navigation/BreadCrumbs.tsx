'use client'

import { usePathname , useParams, useRouter, } from 'next/navigation'
import { Breadcrumbs, Button } from '@mantine/core';
import { ChevronRight } from "@mynaui/icons-react";
import Link from 'next/link';
import styles from './styles/BreadCrumbs.module.css'
import { useTranslations } from 'next-intl';

type PathConfig = {
  label: string;
  href: string | null;
};

const pathsandNames: Record<string, PathConfig> = {
    players: { label: 'players', href: '/dashboard/players' },
    "new-player": { label: 'new-player', href: '/dashboard/players/new-player' },
    teams: { label: 'teams', href: '/dashboard/teams' },
    events: { label: 'events', href: '/dashboard/organization/events' },
    "my-account": { label: 'my-account', href: '/dashboard/my-account' },
    expenses: { label: 'expenses', href: '/dashboard/administration/expenses' },
    organization: { label: 'organization', href: null },
    expense_uid: { label: 'expense_uid', href: '' },
    payment_uid: { label: 'payment_uid', href: '' },
    administration: { label: 'administration', href: null },
    credentials: { label: 'credential', href: '/dashboard/administration/credentials' },
    payments: { label: 'Payments', href: '/dashboard/administration/payments' },
    "player_uid": { label: 'player_uid', href: null },
    "new-payment": { label: 'new-payment', href: '/dashboard/administration/payments/new-payment' },
} as const;


const BreadCrumbs = () => {
    const t = useTranslations("Navigation");
    const path = usePathname()
    const params = useParams()

    const items = path.split('/').splice(1).map( (i, index) =>{
        if(i.length && i !== 'dashboard' && i !== 'home' ){
            const defineIfParam = (currentI : string) : string => {
                const pathElem = Object.keys(params).find(key => params[key as string] === currentI)
                return pathElem ?? i
            }
            const currentElem : PathConfig | null =  pathsandNames[defineIfParam(i)] ?? null 

            if(currentElem?.href === null) {
                return <Button key={index + currentElem.label} className={styles.button} disabled variant='subtle' size="compact-sm">{t(currentElem?.label)}</Button>
            }
            return <Button key={index + ( currentElem?.href  ?? '')} variant='subtle' component={Link} href={currentElem?.href ?? '/'} size="compact-sm">
                {t(currentElem?.label)}
            </Button> 
        } 
        return null
    })
    
    return (
        <Breadcrumbs
            className={styles.mainContainer}
            separator={<ChevronRight size={10}/>}
            separatorMargin={'xs'}
        >
            <Button component={Link} variant='subtle'  href={'/dashboard/home'} size="compact-sm">
                {t('home')}
            </Button>
            {items}
        </Breadcrumbs>
    )
}

export default BreadCrumbs