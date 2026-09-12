'use client'
import { TeamRes } from "@/interfaces/teams";
import {
  Badge,
  Card,
  CardSection,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { UsersGroup } from "@mynaui/icons-react";
import { useTranslations } from "next-intl";
import styles from "../teams.module.css";
import { stringToHexColor } from "@/app/utils/colorRandomizer";
import Link from "next/link";
import { useAppState } from "@/app/providers/StateProvider";

const TeamCard = ({ team }: { team: TeamRes }) => {
const t = useTranslations("Teams");

const entity = useAppState((state) => state.entity)
  const decorationStyle = {
  "--grad-c1": entity.colors[0] || "transparent",
} as React.CSSProperties;

  return (
    <Link href={`${team.team_uid}`} className={styles.link}>
        <Card withBorder orientation="horizontal" className={styles.card} style={decorationStyle}>
        <CardSection className={styles.section}>
            <ThemeIcon
            size={52}
            variant="gradient"
            gradient={{ from: "entityPrimary", to: "entitySecondary", deg: 90 }}
            >
            <UsersGroup size={52} stroke={2} />
            </ThemeIcon>
        </CardSection>
        <CardSection className={styles.section}>
            <Title order={4}>{team.description}</Title>
            <Text size="sm">{team.entity_name}</Text>
            <Text size="sm">{`${team.players_assigned} ${t('players_assigned', {count: team.players_assigned})}`}</Text>
            <div className={styles.category_container}>
            {team.categories.map((t, index) => (
                <Badge
                variant="light"
                color={stringToHexColor(t)}
                key={`${index} ${team.team_uid}`}
                >
                {t}
                </Badge>
            ))}
            </div>
        </CardSection>
        </Card>
    </Link>
  );
};

export default TeamCard;
