import React from "react";
import { DatesProvider, MiniCalendar } from "@mantine/dates";
import { Card, GridCol } from "@mantine/core";
import styles from "../styles/events.module.css";
import { Event } from "@/interfaces/events";
import dayjs from '@/helpers/dayjs';
import { useLocale } from "next-intl";

const SmallCalendar = ({ events, changeDate, hovered }: {
  events: Event[];
  changeDate: (newDate: string) => void;
  hovered: string;
}) => {
    const locale = useLocale()
    return (
        <GridCol span={{ base: 12 }} className={styles.small_calendar_card}>
            <Card
                shadow="xs"
                padding="lg"
                radius="md"
                className={styles.calendar_card}
            >   
                <DatesProvider settings={{ locale: locale, firstDayOfWeek: 1, weekendDays: [0],  }}>
                    <MiniCalendar
                        numberOfDays={5}
                        onDateChange={changeDate}
                        getDayProps={(date) => ({
                            selected: events.some(e => dayjs(e.date_start).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY'))
                        })}
                    />
                </DatesProvider>
            </Card>
        </GridCol>
    );
};

export default SmallCalendar;
