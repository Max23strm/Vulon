import { Alert, Button, Stack } from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import { getAllPlayers, getAllPlayersStats } from "@/app/requests/players";
import { getSession } from "@/app/services/cookies/serverSideStoring";
import MainPage from "./components/MainPage";
import MainCard from "./components/MainCard";
import PlayersDisplay from "./components/PlayersDisplay";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async () => {
  const { entity_uid } = await getSession();

    const dataPromise = await Promise.allSettled([
        getAllPlayersStats(entity_uid),
        getAllPlayers(entity_uid)
    ])
    

    const hasErrors = dataPromise.find(p =>p.status === 'rejected' || !p.value.success)

    if (hasErrors) {
        return (
          <MainPage>
            <Alert
              variant="light"
              color="red"
              title="Error obteniendo información"
              withCloseButton={false}
              icon={<DangerOctagon />}
            >
              {hasErrors?.status === 'rejected' ? hasErrors.reason : hasErrors?.value.error}
            </Alert>
          </MainPage>
        );
    }
    const statsRes =  dataPromise[0].status === 'fulfilled' ? dataPromise[0].value.data : null
    const playersRes =  dataPromise[1].status === 'fulfilled' ? dataPromise[1].value.data : null
    return (
      <MainPage>
        <MainCard stats={statsRes}/>
        <PlayersDisplay players={playersRes ?? []} />
      </MainPage>
    );
};

export default page;
