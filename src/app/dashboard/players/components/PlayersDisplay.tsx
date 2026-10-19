"use client";
import { playersData } from "@/interfaces/players";
import { Badge, Card, Chip, Pagination, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import styles from "../styles/players.module.css";
import { CloseButton, TextInput } from "@mantine/core";
import { Search } from "@mynaui/icons-react";
import PlayerEditModal from "./PlayerEditModal";

const PAGE_SIZE = 12;

const PlayersDisplay = ({ players }: { players: playersData[] }) => {
    const t = useTranslations("Players");

    const [playerState, setPlayerState] = useState<playersData[] | null>(players);
    const [searchValue, setSearchValue] = useState("");
    const [paginationPage, setPaginationPage] = useState<number>(1)
    const clearState = () => {
        setSearchValue("");
        setPlayerState(players);
    };

    const searchElem = (value: string) => {
        setSearchValue(value);
        if (players) {
            if (value.length) {
                const foundElem = players.filter(
                (p) =>
                    p.firstName.toLowerCase().includes(value.toLowerCase()) ||
                    p.last_name.toLowerCase().includes(value.toLowerCase()),
                );
                setPlayerState(foundElem);
            } else {
                setPlayerState(players);
            }
        }
    };

    const displayedPlayers = useMemo(() => {
        const start = (paginationPage - 1) * PAGE_SIZE;
        return playerState?.slice(start, start + PAGE_SIZE) ?? [];
    }, [playerState, paginationPage, players]);

    const handlePag = (v : number) => {
        setPaginationPage(v)
    }
    const totalPages = Math.ceil((playerState?.length ?? 0) / PAGE_SIZE);

    return (
        <div>
            <div className={styles.player_grid_toolbar}>
                <Pagination total={totalPages === 0 ? 1 : totalPages} disabled={totalPages < 1} onChange={handlePag} value={paginationPage}/>
                <TextInput
                    className={styles.search_bar}
                    placeholder={t('search')}
                    leftSectionPointerEvents="none"
                    leftSection={<Search size={16} />}
                    value={searchValue}
                    rightSection={<CloseButton size="xs" onClick={clearState} />}
                    onChange={(e) => searchElem(e.target.value)}
                />
            </div>
            {
                displayedPlayers.length ?
                <div className={styles.player_grid}>
                    
                    { displayedPlayers.map((p) => (
                        <PlayerEditModal player={p}  key={`${p.player_uid} link`}/>
                        // <Link href={`players/${p.player_uid}`} key={`${p.player_uid} link`}>
                        //     <Card shadow="sm" padding="lg" withBorder className={styles.player_card}>
                        //         <div>
                        //             <Text size="lg" fw={500}>{`${p.firstName} ${p.last_name}`}</Text>
                        //             <div>
                        //                 {
                        //                     p.assigned.length
                        //                         ? p.assigned.map((team) => (
                        //                             <Badge 
                        //                                 variant="light"
                        //                                 color="entityPrimary"
                        //                                 key={p.player_uid + team}
                        //                             >
                        //                                 {team}
                        //                             </Badge>
                        //                         ))
                        //                     : <Text size="sm" fw={300} color="grey">{t("no_teams_assigned")}</Text>
                        //                 }
                        //             </div>
                        //         </div>
                        //         {
                        //             p.status === 0 ?
                        //                 <Badge className={styles.badge} variant="transparent" color="red">{t('inactive')}</Badge> :
                        //                 <Badge className={styles.badge} variant="transparent" color="green">{t('active')}</Badge>
                        //         }
                        //     </Card>
                        // </Link>
                    ))}
                </div> :
                <Text ta={'center'} mt={'2rem'} size="xl">{t('no_players')}</Text>
            }
        </div>
    );
};

export default PlayersDisplay;
