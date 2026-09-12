import { getAllTeamsByEntity } from "@/app/requests/teams"
import { getSession } from "@/app/services/cookies/serverSideStoring"
import TeamCard from "./components/TeamCard"
import styles from "./teams.module.css";



const page = async () => {
    const session = await getSession()
    const { entity_uid } = session
    const teamRes = await getAllTeamsByEntity(entity_uid!!)

    if (!teamRes.success) return <div>Error</div>

    const currentTeams= teamRes.data
    return (
        <section className={styles.container}>
            {
                currentTeams?.map( t => <TeamCard team={t} key={t.team_uid}/>)
            }
        </section>
    )
}

export default page