import { getAllTeamsByEntity } from "@/app/requests/teams"
import { getSession } from "@/app/services/cookies/serverSideStoring"
import TeamCard from "./components/TeamCard"
import styles from "./teams.module.css";
import { Flex } from "@mantine/core";
import AddTeam from "./components/AddTeam";
import AddCategory from "./components/AddCategory";

const page = async () => {
    const session = await getSession()
    const { entity_uid } = session
    const teamRes = await getAllTeamsByEntity(entity_uid!!)

    if (!teamRes.success) return <div>Error</div>

    const currentTeams= teamRes.data


    return (
        <section className={styles.container}>
            <Flex justify={'flex-end'} w={'100%'} gap={'1rem'}>
                <AddCategory entity_uid={entity_uid ?? ''}/>
                <AddTeam entity_uid={entity_uid ?? ''}/>
            </Flex>
            <div className={styles.teams_container}>
                {
                    currentTeams?.map( t => <TeamCard team={t} key={t.team_uid}/>)
                }
            </div>
        </section>
    )
}

export default page