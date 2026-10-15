"use client";
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
import { useAppState } from "@/app/providers/StateProvider";
import { useDisclosure } from "@mantine/hooks";
import TeamModal from "./TeamModal";

const TeamCard = ({ team }: { team: TeamRes }) => {
  const t = useTranslations("Teams");

  const entity = useAppState((state) => state.entity);
  const decorationStyle = {
    "--grad-c1": entity.colors[0] || "transparent",
  } as React.CSSProperties;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <TeamModal opened={opened} handleClose={close} team={team} entity={team.entity_uid} />
      <Card
        withBorder
        orientation="horizontal"
        className={styles.card}
        style={decorationStyle}
        onClick={open}
      >
        <CardSection className={styles.section}>
          <ThemeIcon
            size={52}
            variant="filled"
            color="entitySecondary"
          >
            <UsersGroup size={52} stroke={1} />
          </ThemeIcon>
        </CardSection>
        <CardSection className={styles.section}>
          <Title order={4}>{team.description}</Title>
          <Text size="sm">{team.entity_name}</Text>
          <Text size="sm">{`${team.players_assigned} ${t("players_assigned", { count: team.players_assigned })}`}</Text>
          <div className={styles.category_container}>
            {team.categories.map((t, index) => (
              <Badge
                variant="light"
                color={stringToHexColor(t.name)}
                key={`${index} ${team.team_uid}`}
              >
                {t.name}
              </Badge>
            ))}
          </div>
        </CardSection>
      </Card>
    </>
  );
};

export default TeamCard;
