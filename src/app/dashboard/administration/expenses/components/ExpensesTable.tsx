import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { FileText } from "@mynaui/icons-react";
import { ActionIcon, Container, GridCol, Loader, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import { SimpleExpense } from '@/interfaces/expenses';
import styles from '@/app/components/styles/table.module.css'
import { useTranslations } from 'next-intl';
import ExpensesActioncell from './ExpensesActioncell';

const ExpensesTable = ({expenses, matches} : {expenses: SimpleExpense[], matches:boolean}) => {
    const t = useTranslations("Payments");
    let rows : JSX.Element[] = []
    if(expenses?.length) {
        rows = expenses.map((element : SimpleExpense) => (
            <TableTr key={`${element.expense_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd> {element.reason} </TableTd>
                <TableTd> {element.assigned_to} </TableTd>
                <TableTd> {element.expense_type} </TableTd>
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <ExpensesActioncell expense_uid={element.expense_uid}/>
            </TableTr>
        ));
    }
    console.log({expenses})

    return (
        <GridCol span={{sm:12}}>
            <Table stickyHeader stickyHeaderOffset={60} highlightOnHover className={styles.table_all}>
                <TableThead>
                <TableTr>
                    <TableTh>{t('date')}</TableTh>
                    <TableTh>{t('concept_reason')}</TableTh>
                    <TableTh>{t('responsible')}</TableTh>
                    <TableTh>{t('expense_type')}</TableTh>
                    <TableTh>{t('amount')}</TableTh>
                    <TableTh></TableTh>
                </TableTr>
                </TableThead>
               
                <TableTbody className={styles.table_body}>{rows}</TableTbody>
                
            </Table>
            <Container mt={'1rem'}>
                { (!rows.length) && <NoRowsAlert/> }
            </Container>
        </GridCol>
    )
}

export default ExpensesTable