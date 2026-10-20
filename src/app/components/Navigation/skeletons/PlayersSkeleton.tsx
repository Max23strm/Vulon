import { Skeleton } from '@mantine/core'
import styles from '../styles/Skeleton.module.css'

const PlayersSkeleton = () => {
    return (
        <div className={styles.teams_main_container}>
            <div className={styles.teams_tags}>
                <Skeleton height={29} width={140}/>
            </div>
            <Skeleton height={115}/>
            <div className={styles.teams_container}>
                <Skeleton height={91}/>
                <Skeleton height={91}/>
                <Skeleton height={91}/>
                <Skeleton height={91}/>
                <Skeleton height={91}/>
            </div>
        </div>
    )
}

export default PlayersSkeleton