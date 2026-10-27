import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { paymentsResponse } from '@/interfaces/payments';
import { ActionIcon, Container, Loader, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import styles from '@/app/components/styles/table.module.css'
import PaymentDetail from './PaymentDetail';

const PaymentsTable = ({payments, loading, matches} : {payments: paymentsResponse[], loading: boolean, matches:boolean}) => {
    let rows : JSX.Element[] = []
    if(payments?.length) {
        rows = payments.map((element : paymentsResponse) => (
            <TableTr key={`${element.payment_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd>{`${element.player_name}`}</TableTd>
                {matches && <TableTd> {element.payment_name} </TableTd>}
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <TableTd>
                    <PaymentDetail
                        payment_uid={element.payment_uid}
                    />
                </TableTd>
            </TableTr>
        ));
    }

    return (
        <>  
            <div className={styles.table_all}>
                <Table stickyHeader stickyHeaderOffset={60} highlightOnHover >
                    <TableThead>
                    <TableTr>
                        <TableTh>Fecha de ingreso</TableTh>
                        <TableTh>Nombre</TableTh>
                        {matches &&<TableTh>Tipo</TableTh>}
                        <TableTh>Monto</TableTh>
                        <TableTh>   </TableTh>
                    </TableTr>
                    </TableThead>
                    <TableTbody className={styles.table_body}>{rows}</TableTbody>
                </Table>
            </div>
            <Container>
                { loading && <Loader color='#0C5C7A' size="lg" type="dots" />} 
                { (!rows.length && !loading) && <NoRowsAlert/> }
            </Container>
        </>
    )
}

export default PaymentsTable