import React from "react";
import styles from "../../payments/styles/payments.module.css";
import { Card, Divider, GridCol, Text } from "@mantine/core";
import { useFormatter, useTranslations } from "next-intl";
import { useAppState } from "@/app/providers/StateProvider";
import dayjs from "dayjs";

const MainTiles = () => {
  const format = useFormatter();
  const currency_code = useAppState((state) => state.entity.currency_code);

  const t = useTranslations("Payments");
  if (!currency_code) return;

  return (
    <>
      <GridCol span={{ xs: 12 }}>
        <Card className={styles.mainDataStyles} shadow="sm">
          <div className={styles.dataDisplayed}>
            <div>
              <Text size="sm">{t("spent")}</Text>
              <Text size="xl">
                {format.number(500, {
                  style: "currency",
                  currency: currency_code,
                })}
              </Text>
            </div>
            <Divider orientation="vertical" className={styles.divider} />
            <div>
              <Text size="sm">{t("scheduled_pending_this_month")}</Text>
              <Text size="xl">{format.number(22)}</Text>
            </div>
            <div className={styles.importantData}>
              <Text size="sm">{t("next_scheduled")}</Text>
              <div>
                <Text size="lg">Salario del coach</Text>
                <Text size="lg" c={'entityPrimary'} fw={500}>{dayjs("2026-02-23").format("DD-MM-YYYY")}</Text>
              </div>
            </div>
          </div>
        </Card>
      </GridCol>
    </>
  );
};

export default MainTiles;
