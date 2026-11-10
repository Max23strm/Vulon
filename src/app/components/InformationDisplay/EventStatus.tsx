import { stringToHexColor } from '@/app/utils/colorRandomizer'
import { Badge } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'

const EventStatus = ({event_state}: {event_state: string}) => {
    const t = useTranslations("Events")
        
    return (
        <Badge size='xs' variant='dot' color={ stringToHexColor(event_state)} >
            {t(event_state)}
        </Badge>
    )
}

export default EventStatus