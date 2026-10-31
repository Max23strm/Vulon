import { Alert } from '@mantine/core'
import { DangerOctagon } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'

const ErrorAlert = ({errorMessage} : {errorMessage: string | null}) => {
    if(!Boolean(errorMessage)) return
    const t = useTranslations('Alerts')
    
    return (
        <Alert variant="light" radius="lg" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
            {t(errorMessage ?? 'error')}
        </Alert>
    )
}

export default ErrorAlert