'use client'

import dayjs from '@/helpers/dayjs'
import { Indicator } from '@mantine/core';
import { Calendar, DatesProvider } from '@mantine/dates';
import { Event, GoogleEvent } from '@/interfaces/events';

const MainCalendar = ({ events, monthChange }: {events:Event[], monthChange: (newDate: string)=> void}) => {

    return (
        <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
            <Calendar
                hideOutsideDates={true}
                onMonthSelect={(date)=>{monthChange(date)}}
                onNextMonth={(date)=>{monthChange(date)}}
                onPreviousMonth={(date)=>{monthChange(date)}}
                renderDay={(date) => {
                    const day = dayjs(date).date();
                    const indicate = events?.find(e =>  dayjs(e.date_start).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY') )
                    console.log(indicate)
                    return (
                        <Indicator 
                            size={9} 
                            color="entityPrimary" 
                            offset={-2} 
                            disabled={!Boolean(indicate)}
                        >
                            <div>{day}</div>
                        </Indicator>
                    );
                }}
                    static
            />
        </DatesProvider>
    )
}

export default MainCalendar