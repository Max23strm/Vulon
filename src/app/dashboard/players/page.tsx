import { Alert, Button, Stack } from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import { getAllPlayers } from "@/app/requests/players";
import { getSession } from "@/app/services/cookies/serverSideStoring";
import MainPage from "./components/MainPage";
import MainCard from "./components/MainCard";
import PlayersDisplay from "./components/PlayersDisplay";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async () => {
  const { entity_uid } = await getSession();

  const { data, error, success } = await getAllPlayers(entity_uid);
    if (!success) {
        return (
          <MainPage>
            <Alert
              variant="light"
              color="red"
              title="Error obteniendo información"
              withCloseButton={false}
              icon={<DangerOctagon />}
            >
              {error}
            </Alert>
          </MainPage>
        );
    }
  return (
    <MainPage>
      <MainCard players={data ?? []}/>
      <PlayersDisplay players={data ?? []} />
    </MainPage>
  );
};

export default page;
