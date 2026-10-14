import { Button, ComboboxItem, Flex, Loader, Modal, OptionsFilter } from '@mantine/core'
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react'
import { TransferList } from './TransferList';
import { getPlayersClient } from '@/app/requests/players_client';
import { notifications } from '@mantine/notifications';
import { playersData } from '@/interfaces/players';
import { getTeamCategories, postAssignTeamCategoryClient } from '@/app/requests/teams_client';
import { TeamRes } from '@/interfaces/teams';
import { MultiSelect } from '@mantine/core'; 
import { useRouter } from 'next/navigation';

const TeamModal = ({opened, handleClose, entity, team}:{opened: boolean, handleClose:()=>void, team: TeamRes, entity: string}) => {
    const t = useTranslations("Teams");
    const router = useRouter()

    const [isLoading, setisLoading] = useState(true)
    const [isUpdating, setisUpdating] = useState(false)


    const [playeroptions, setPlayeroptions] = useState<playersData[]>([]);

    const [categories, setCategories] = useState<{value:string, label:string}[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(team.categories.map((v)=>(v.category_uid)))

    const [data, setData] = useState<[string[], string[]]>([[], []]);


    const categoriesFilter: OptionsFilter = ({ options, search }) => {
        const filtered = (options as ComboboxItem[]).filter((option) =>
            option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
        );

        filtered.sort((a, b) => a.label.localeCompare(b.label));
        return filtered;
        };
    const handleTransfer = (transferFrom: number, options: string[]) =>
        setData((current) => {
        const transferTo = transferFrom === 0 ? 1 : 0;
        const transferFromData = current[transferFrom].filter(
            (item) => !options.includes(item),
        );
        const transferToData = [...current[transferTo], ...options];

        const result = [];
        result[transferFrom] = transferFromData;
        result[transferTo] = transferToData;
        return result as [string[], string[]];
    });

    const obtainPlayersAndOptions = useCallback(async ()=>{
        setisLoading(true)
        
        const resp = await Promise.allSettled([
            getPlayersClient(),
            getTeamCategories(entity)
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
            setPlayeroptions(allPlayers)
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
        handleClose()
        setisUpdating(false)
        router.refresh()
    }


    return (
        <Modal opened={opened} onClose={handleClose} title={team.description} centered>
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

                        <Flex justify={'space-between'} gap={'1rem'}>
                            <Button variant='outline' color='red' onClick={handleClose}>{t('delete_team')}</Button>
                            <Flex justify={'flex-end'} gap={'1rem'}>
                                <Button variant='subtle' onClick={handleClose}>{t('close')}</Button>
                                <Button loading={isUpdating} onClick={handleSubmit}>{t('save')}</Button>
                            </Flex>
                        </Flex>
                    </>
            }
        </Modal>
    )
}

export default TeamModal