'use server'
import { getTranslations } from 'next-intl/server';
import EntityCarrousel from './components/EntityCarrousel';
import { Suspense } from 'react';
import { Title } from '@mantine/core';
import styles from '@/app/components/styles/entity.module.css'


const page = async() => {
    const t = await getTranslations('Authentication');

    return (
        <Suspense fallback={null}>
            <main className={styles.container}>
                <Title>{t('select_entity')}</Title>
                <EntityCarrousel/>
            </main>
        </Suspense>
    )
}

export default page