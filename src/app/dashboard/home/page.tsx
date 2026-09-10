import { Alert, Container, Grid, GridCol, Text } from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import StandardCard from "../../components/homeComponents/StandardCard";
import { connection } from "next/server";
import { fetchHomeDashboard } from "@/app/requests/dashboard";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;
export default async function Home() {
  await connection()
  const currentDate = dayjs().format("YYYY-MM-DD")
  const { data, error, success } = await fetchHomeDashboard(currentDate);
  
  if (!success) {
    return (
      <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon />}>
        {error.home}
      </Alert>
    );
  }

return <Container fluid>
    <Grid>
      <GridCol span={{ base: 12}}>
        <Text c='primary-pitz'  fw={700} size="xl" ta={'end'}>
          {dayjs().format("MMMM YYYY").toUpperCase()}
        </Text>
      </GridCol>
      <GridCol span={{ base: 12}}>
        <StandardCard type={'event'} data={data?.upcoming_event ?? null}/>
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
        <StandardCard type={"players"} data={data?.players_amount ?? 0}/>
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
         <StandardCard type={"amount"} data={{income: data?.monthly_income ?? 0, expense: data?.monthly_expense ?? 0}}/>
      </GridCol>
    </Grid>
  </Container>;
}
