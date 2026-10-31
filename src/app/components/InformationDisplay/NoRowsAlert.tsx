import { Alert } from '@mantine/core'
import { InfoCircle } from '@mynaui/icons-react'
import styles from './styles/noRows.module.css'

const NoRowsAlert = () => {
    return (
        <Alert 
            className={styles.alert}
            variant="light" 
            color="entityPrimary" 
            radius="lg"
            title="Sin datos para mostrar" 
            withCloseButton={false} 
            icon={<InfoCircle/>}
        />
    )
}

export default NoRowsAlert