import { Button, ComboboxItem, Flex, Loader, Modal, OptionsFilter } from '@mantine/core'
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react'
import { TransferList } from './TransferList';
import { getPlayersClient } from '@/app/requests/players_client';
import { notifications } from '@mantine/notifications';
import { playersData } from '@/interfaces/players';
import { deleteBulkAssignation, GetTeamAssignation, getTeamCategories, postAssignTeamCategoryClient, postBulkAssignation } from '@/app/requests/teams_client';
import { TeamRes } from '@/interfaces/teams';
import { MultiSelect } from '@mantine/core'; 
import { useRouter } from 'next/navigation';
import DeleteModal from './DeleteModal';
import { useMediaQuery } from '@mantine/hooks';

const TeamModal = ({opened, handleClose, entity, team}:{opened: boolean, handleClose:()=>void, team: TeamRes, entity: string}) => {
    const t = useTranslations("Teams");
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width: 50em)');
    const [isLoading, setisLoading] = useState(true)
    const [isUpdating, setisUpdating] = useState(false)
    const [isTransfering, setIsTransfering] = useState(false)

    const [playeroptions, setPlayeroptions] = useState<playersData[]>([]);

    const [categories, setCategories] = useState<{value:string, label:string}[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(team.categories.map((v)=>(v.category_uid)))

    const [data, setData] = useState<[playersData[], playersData[]]>([[], []]);


    const categoriesFilter: OptionsFilter = ({ options, search }) => {
        const filtered = (options as ComboboxItem[]).filter((option) =>
            option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
        );

        filtered.sort((a, b) => a.label.localeCompare(b.label));
        return filtered;
    };
    const handleTransfer = async (transferFrom: number, options: playersData[]) =>{
        try {
            setIsTransfering(true)
            const players = options.map( p => p.player_uid)
            if(transferFrom === 1) {
                const assign = await postBulkAssignation({team_uid: team.team_uid, players})
                if(!assign.success) throw new Error(assign.error) 
            } else {
                const unAssign = await deleteBulkAssignation({team_uid: team.team_uid, players})
                if(!unAssign.success) throw new Error(unAssign.error) 
            }
            setData((current) => {
                const transferTo = transferFrom === 0 ? 1 : 0;
    
                const transferFromData = current[transferFrom].filter( (p) => !options.some( o => o.player_uid === p.player_uid) );
                const transferToData = [...current[transferTo], ...options];
    
                const result = [];
                result[transferFrom] = transferFromData;
                result[transferTo] = transferToData;
                return result as [playersData[], playersData[]];
            });
            setIsTransfering(false)
        } catch(e) {
            notifications.show({
                message: t('error_during_assigntation'),
                color:'red'
            })
        }
    }
    const handleCloseAndReset = () => {
        router.refresh()
        handleClose()
        setData([[], []])
    }

    const obtainPlayersAndOptions = useCallback(async ()=>{
        setisLoading(true)
        
        const resp = await Promise.allSettled([
            getPlayersClient(entity),
            getTeamCategories(entity),
            GetTeamAssignation(team.team_uid)
        ])
        if(resp.some(r => r.status === 'rejected' || !r.value.success )){
            notifications.show({
                message: t('error_getting_players'),
                color:'red'
            })
            setPlayeroptions([])
            setCategories([])
        } else {
            const allPlayers = resp[0].status === 'fulfilled' && resp[0].value.success ? resp[0].value.data as playersData[]  : []
            const allCat = resp[1].status === 'fulfilled' && resp[1].value.success ? resp[1].value.data?.map(v => ({label:v.description, value: v.category_uid})) ?? [] : []
            const assignatedPlayers = resp[2].status === 'fulfilled' && resp[2].value.success ? resp[2].value.data : null

            setPlayeroptions(allPlayers)

            const freePlayers = allPlayers.filter( p => !assignatedPlayers?.players.includes(p.player_uid))
            const assignated = allPlayers.filter( p => assignatedPlayers?.players.includes(p.player_uid))

            setData([assignated, freePlayers])
            setCategories(allCat)
        }
        setisLoading(false)
    },[entity])

    useEffect(()=>{
        if(opened) { 
            obtainPlayersAndOptions()
        }
    },[opened, obtainPlayersAndOptions])

    const handleSubmit = async () => {
        setisUpdating(true)
        const catRes = await postAssignTeamCategoryClient(team.team_uid, selectedCategories)
        if(!catRes.success){
            notifications.show({
                message: t('team_not_updated'),
                color:'red'
            })
            setisUpdating(false)
            return
        }

        notifications.show({
            message: t('team_updated'),
            color:'green'
        })
        handleCloseAndReset()
        setisUpdating(false)
    }


    return (
        <Modal opened={opened} onClose={handleCloseAndReset} title={team.description} centered >
            {
                isLoading ?
                    <Flex justify={'center'} gap={'1rem'} my={'2rem'}>
                        <Loader/> 
                    </Flex> :
                    <>
                        <MultiSelect
                            label={t('categories')}
                            placeholder={t('pick_value')}
                            data={categories}
                            mb={'1rem'}
                            onChange={(v)=>{ setSelectedCategories(v)}}
                            value={selectedCategories}
                            filter={categoriesFilter}
                            searchable
                        />
                        
                        <TransferList data={data} handleTransfer={handleTransfer}/>

                        <Flex justify={'space-between'} gap={'1rem'} mt={'1rem'}>
                            <DeleteModal mainModalClose={handleCloseAndReset} team_uid={team.team_uid}/>
                            <Flex justify={'flex-end'} gap={'1rem'}>
                                <Button variant='subtle' onClick={handleCloseAndReset}>{t('close')}</Button>
                                <Button loading={isUpdating} onClick={handleSubmit}>{t('save')}</Button>
                            </Flex>
                        </Flex>
                    </>
            }
        </Modal>
    )
}

export default TeamModal