import { stringToHexColor } from '@/app/utils/colorRandomizer'
import { eventTypeName } from '@/interfaces/events'
import { Badge } from '@mantine/core'
import React from 'react'

const EventType = ({event} : {event: string}) => {
    
    return (
        <Badge size='xs' variant='outline' color={ stringToHexColor(event)} >
            {event}
        </Badge>
    )
}

export default EventType