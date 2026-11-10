'use client'

import dayjs from '@/helpers/dayjs'
import { Indicator } from '@mantine/core';
import { Calendar, DatesProvider } from '@mantine/dates';
import styles from '../styles/events.module.css'
import { Event, GoogleEvent } from '@/interfaces/events';
import { stringToHexColor } from '@/app/utils/colorRandomizer';
import { RefObject } from 'react';
const MainCalendar = ({ events, monthChange, hoverRef }: {events:Event[], monthChange: (newDate: string)=> void, hoverRef: string}) => {
    console.log(hoverRef)
    return (
        <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
            <Calendar
                hideOutsideDates={true}
                onMonthSelect={(date)=>{monthChange(date)}}
                getDayProps={(date) => ({
                    selected: Boolean(Boolean(hoverRef) && hoverRef?.length && dayjs(hoverRef).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY'))
                })}
                onNextMonth={(date)=>{monthChange(date)}}
                onPreviousMonth={(date)=>{monthChange(date)}}
                renderDay={(date) => {
                    const day = dayjs(date).date();
                    const indicate = events?.find(e =>  dayjs(e.date_start).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY') )

                    return (
                        <Indicator 
                            size={9} 
                            color={stringToHexColor(indicate?.type_name ?? '')}
                            offset={-2} 
                            disabled={!Boolean(indicate) || 
                                (Boolean(hoverRef) && hoverRef?.length ? dayjs(hoverRef).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY') : false)}
                        >
                            <div >{day}</div>
                        </Indicator>
                    );
                }}
                    static
            />
        </DatesProvider>
    )
}

export default MainCalendar