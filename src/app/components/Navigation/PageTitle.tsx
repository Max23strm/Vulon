import { Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

const PAGE_MAP: Record<string, string> = {
    '/dashboard/administration/expenses': 'expenses',
    '/dashboard/home': 'home',
    '/dashboard/administration/payments': 'payments',
}

const PageTitle = () => {

    const t = useTranslations('Navigation')
    const pathname = usePathname()

    const onlylast = pathname.split("/")[pathname.split("/").length - 1]
    
    return (
        <Text size='lg' fw={500}>{
            pathname in PAGE_MAP ? t(PAGE_MAP[pathname]) : onlylast
        }</Text>
    )
}

export default PageTitle