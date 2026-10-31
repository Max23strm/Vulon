import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { FileText } from "@mynaui/icons-react";
import { ActionIcon, Container, Loader, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import { SimpleExpense } from '@/interfaces/expenses';
import styles from '@/app/components/styles/table.module.css'

const ExpensesTable = ({expenses, matches} : {expenses: SimpleExpense[], matches:boolean}) => {

    let rows : JSX.Element[] = []
    if(expenses?.length) {
        rows = expenses.map((element : SimpleExpense) => (
            <TableTr key={`${element.expense_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd> {element.reason} </TableTd>
                {matches && <TableTd> {element.assigned_to} </TableTd>}
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <TableTd>
                    <ActionIcon
                        component={Link}                    
                        href={ 'expenses/' + element.expense_uid}
                        variant='subtle'
                    >
                        <FileText/>
                    </ActionIcon>
                </TableTd>
            </TableTr>
        ));
    }

    return (
        <>
            <Table stickyHeader stickyHeaderOffset={60} highlightOnHover className={styles.table_all}>
                <TableThead>
                <TableTr>
                    <TableTh>Fecha</TableTh>
                    <TableTh>Concepto/razon</TableTh>
                    {matches && <TableTh>Responsable</TableTh> }
                    <TableTh>Monto</TableTh>
                    <TableTh></TableTh>
                </TableTr>
                </TableThead>
               
                <TableTbody className={styles.table_body}>{rows}</TableTbody>
                
            </Table>
            <Container mt={'1rem'}>
                { (!rows.length) && <NoRowsAlert/> }
            </Container>
        </>
    )
}

export default ExpensesTable