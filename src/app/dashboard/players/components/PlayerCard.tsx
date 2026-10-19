import { playersData } from '@/interfaces/players'
import { Card, Text } from '@mantine/core'
import React from 'react'
import styles from "../styles/players.module.css";

const PlayerCard = ({player}:{player: playersData}) => {
    return (
        <Card shadow="sm" padding="lg" withBorder>
            <Text>
                {player.firstName}
            </Text>
        </Card>
    )
}

export default PlayerCard