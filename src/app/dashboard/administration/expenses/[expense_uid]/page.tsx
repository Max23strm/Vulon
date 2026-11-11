import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert';
import { expenseDetailFetch } from '@/helpers/dataFetcher';
import { formatCurrency } from '@/helpers/numberFormaters';
import { Button, Container, Grid, GridCol, Text } from '@mantine/core'
import Link from 'next/link';
import styles from '../styles/expenses.module.css'
import dayjs from "@/helpers/dayjs";
import CancelExpenses from './components/CancelExpenses';
import { getLocale } from 'next-intl/server';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async ({
    params,
}: {
    params: Promise<{ expense_uid: string }>;
}) => {
    const locale = await getLocale();
    const expenseParams = await params;
    const response = await expenseDetailFetch(expenseParams.expense_uid);

    if (!response.isSucces) {
        return <ErrorAlert errorMessage={"Error obteniendo datos"} />;
    }

    if (!response.expense) {
        return <ErrorAlert errorMessage={"Pago no encontrado"} />;
    }

    return (
        <Container fluid>
            <Grid>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Nombre</Text>
                    <Text>{response.expense.assigned_to}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Monto</Text>
                    <Text>{formatCurrency(parseFloat(response.expense.amount))}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Razon de gasto</Text>
                    <Text>{response.expense.reason}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Fecha de ingreso</Text>
                    <Text>{dayjs(response.expense.date).locale(locale).format("DD MMMM YYYY")}</Text>
                </GridCol>

                <GridCol className={styles.editButtons}>
                    <Button
                        variant="subtle"
                        component={Link}
                        href={"/dashboard/administration/expenses"}
                    >
                        Regresar
                    </Button>
                    <CancelExpenses expense_uid={expenseParams.expense_uid}/>
                </GridCol>
            </Grid>
        </Container>
    )
}

export default page
