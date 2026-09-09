import { Card, CardSection, Image, Text, Title } from "@mantine/core";
import styles from "@/app/components/styles/entity.module.css";
import deafult from "@public/VulonFull.png";
import { EntityAssigned } from "@/interfaces/requests/entities";
import { useFormatter } from "next-intl";
import { useState } from "react";
import { useAppState } from "@/app/providers/StateProvider";
import { useRouter } from "next/navigation";
const EntityCard = ({ entity }: { entity: EntityAssigned }) => {
    const setEntity = useAppState((state) => state.setEntity)
    const format = useFormatter();
    const [isHovered, setIsHovered] = useState(false);
    const hoverBorder = isHovered ? { borderColor: entity.colors[0] } : {};
    const bg = `linear-gradient(185deg, ${entity.colors[0]}, var(--mantine-color-body) 65%)`;

    const router = useRouter()

    const handleClick = ( entity: EntityAssigned ) => {
        setEntity({
            colors: entity.colors,
            country_code: entity.country_code,
            currency_code: entity.currency_code,
            entity_uid: entity.entity_uid,
            logo: entity.logo,
            name: entity.name,
            short_name: entity.short_name,
        })
        
        
        router.push('/dashboard/home')
    }


    return (
        <Card
            onClick={()=>handleClick(entity)}
            padding="lg"
            withBorder
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            className={styles.entity_card}
            style={{ background: bg, ...hoverBorder }}
        >
        <CardSection className={styles.entity_card_image_section}>
            <Image
                radius="md"
                h={150}
                w={200}
                alt={entity.short_name}
                fit="contain"
                src={entity?.logo ? entity.logo : deafult.src}
            />
        </CardSection>
        <CardSection className={styles.entity_card_text_section}>
            <Title order={3}>{entity.name}</Title>
            <div>
                <Text size="md">
                    {format.displayName(entity.country_code, { type: "region" })}
                </Text>
                <Text size="md">
                    {format.displayName(entity.currency_code, { type: "currency" })}
                </Text>
            </div>
        </CardSection>
        </Card>
    );
};

export default EntityCard;
