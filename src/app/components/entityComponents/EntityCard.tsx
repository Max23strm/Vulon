import { Card, CardSection, Image, Text, Title } from '@mantine/core'
import styles from '@/app/components/styles/entity.module.css'
import PitzLogo from "@public/images/pitz-logo.png";

const EntityCard = () => {
    return (
        <Card padding="lg" withBorder className={styles.entity_card}>
            <CardSection className={styles.entity_card_image_section}>
                <Image
                    radius="md"
                    h={150}
                    w={200}
                    fit="cover"
                    src={PitzLogo.src}
                />
            </CardSection>
            <CardSection className={styles.entity_card_text_section}>
                <Title order={3}>Club deportivo que juega al fútbol</Title>
                <div>
                    <Text size="md">Tero Violado</Text>
                    <Text size="md">Club deportivo que juega al fútbol</Text>
                    <Text size="md">Club deportivo que juega al fútbol</Text>
                </div>
            </CardSection>
        </Card >
    )
}

export default EntityCard