import { Skeleton } from '@mantine/core'
import styles from '../styles/Skeleton.module.css'

const TeamsSkeleton = () => {
    return (
        <div className={styles.teams_main_container}>
            <div className={styles.teams_tags}>
                <Skeleton height={29} width={140}/>
                <Skeleton height={29} width={140}/>

            </div>
            <div className={styles.teams_container}>
                <Skeleton height={135}/>
                <Skeleton height={135}/>
                <Skeleton height={135}/>
                <Skeleton height={135}/>
                <Skeleton height={135}/>
            </div>
        </div>
    )
}

export default TeamsSkeleton