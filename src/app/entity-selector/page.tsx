'use server'
import { getTranslations } from 'next-intl/server';
import EntityCarrousel from './components/EntityCarrousel';
import { Suspense } from 'react';
import { Title } from '@mantine/core';
import styles from '@/app/components/styles/entity.module.css'
import { fetchEntitiesAssigned } from '../requests/enties';
import EntityPage from './components/EntityPage';


const page = async() => {
    
    return (
        <Suspense fallback={null}>
            <EntityPage/>
        </Suspense>
    )
}

export default page