import { fetchEntitiesAssigned } from '@/app/requests/enties'
import { getTranslations } from 'next-intl/server';
import { Title } from '@mantine/core';
import styles from '@/app/components/styles/entity.module.css'
import EntityCarrousel from './EntityCarrousel';


const EntityPage = async () => {
    const t = await getTranslations('Authentication');
    const entitiesRes = await fetchEntitiesAssigned()
    
    if(!entitiesRes.success) return <section className={styles.container}>
        <Title>{t('select_entity')}</Title>
        Error fetching
    </section>
    return (
        <section className={styles.container}>
            <Title>{t('select_entity')}</Title>
            <EntityCarrousel entities={entitiesRes.data ?? []}/>
        </section>
    )
}

export default EntityPage
