import { Container, Group, Skeleton } from '@mantine/core'
import styles from './styles/payments.module.css'


const Loading = () => {
    return (
        <Container fluid flex={1} style={{gap:'1rem', display:'flex', flexDirection:'column'}}>
            <Group justify='space-between'>
                <Skeleton height={26} width={100} radius="xl" />
                <Group justify='space-between'>
                    <Skeleton height={26} width={100} radius="xl" />
                    <Skeleton height={26} width={100} radius="xl" />
                    <Skeleton height={26} width={100} radius="xl" />
                </Group>
            </Group>
            <Skeleton height={85.3}/>
            <div className={styles.chartsConitainer}>
                <Skeleton height={300}/>
                <Skeleton height={300}/>
            </div>
            <Skeleton height={250}/>

        </Container>
      )
}

export default Loading