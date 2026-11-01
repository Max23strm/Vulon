import React from "react";
import styles from "../../payments/styles/payments.module.css";
import { Card, Divider, GridCol, Text } from "@mantine/core";
import { useFormatter, useTranslations } from "next-intl";
import { useAppState } from "@/app/providers/StateProvider";
import dayjs from "dayjs";
import { ExpensesInfo } from "@/interfaces/expenses";

const MainTiles = ({headerInfo}: {headerInfo:ExpensesInfo | null}) => {
  const format = useFormatter();
  const currency_code = useAppState((state) => state.entity.currency_code);
  console.log({headerInfo})
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
                  {format.number(headerInfo?.total_spent ?? 0, {
                    style: "currency",
                    currency: currency_code,
                  })}
                </Text>
              </div>
              {/* <Divider orientation="vertical" className={styles.divider} />
              <div>
                <Text size="sm">{t("scheduled_pending_this_month")}</Text>
                <Text size="xl">{format.number(headerInfo?.pending_scheduled_expenses?.length ?? 0)}</Text>
              </div> */}
              <div className={styles.importantData}>
                <Text size="sm">{t("next_scheduled")}</Text>
                <div>
                  <Text size="lg">{headerInfo?.next_scheduled_payment?.name}</Text>
                  <Text size="lg" c={'entityPrimary'} fw={500}>{dayjs(headerInfo?.next_scheduled_payment?.date).format("DD-MM-YYYY")}</Text>
                </div>
              </div>
            </div>
          </Card>
        </GridCol>
      </>
    );
  };


export default MainTiles;
