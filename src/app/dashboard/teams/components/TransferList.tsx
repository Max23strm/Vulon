import { useState } from "react";

import {
  ActionIcon,
  Checkbox,
  Combobox,
  Group,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import classes from "./TransferList.module.css";
import { ChevronRightWaves } from "@mynaui/icons-react";
import { playersData } from "@/interfaces/players";

interface RenderListProps {
    options: playersData[];
    onTransfer: (options: playersData[]) => void;
    type: "forward" | "backward";
}

function RenderList({ options, onTransfer, type }: RenderListProps) {
    const combobox = useCombobox();
    const [value, setValue] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const handleValueSelect = (val: string) =>
        setValue((current) =>
        current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val],
        );

    const items = options.filter((item) => item.firstName.toLowerCase().includes(search.toLowerCase().trim()) || item.last_name.toLowerCase().includes(search.toLowerCase().trim())).map((item) => (
        <Combobox.Option
            value={item.player_uid}
            key={item.player_uid}
            active={value.includes(item.player_uid)}
            onMouseOver={() => combobox.resetSelectedOption()}
        >
            <Group gap="sm" className={classes.group}>
                <Checkbox
                    checked={value.includes(item.player_uid)}
                    onChange={() => {}}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: "none" }}
                />
                <Text size="sm" truncate="end">{`${item.firstName} ${item.last_name}`}</Text>
            </Group>
        </Combobox.Option>
    ));

    return (
        <div className={classes.renderList} data-type={type}>
            <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
                <Combobox.EventsTarget>
                <Group wrap="nowrap" gap={0} className={classes.controls}>
                    <TextInput
                    placeholder="Search groceries"
                    classNames={{ input: classes.input }}
                    aria-label="Search groceries"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.currentTarget.value);
                        combobox.updateSelectedOptionIndex();
                    }}
                    />
                    <ActionIcon
                    radius={0}
                    variant="default"
                    size={36}
                    className={classes.control}
                    aria-label={
                        type === "forward"
                        ? "Transfer selected items right"
                        : "Transfer selected items left"
                    }
                    onClick={() => {
                        onTransfer(options.filter(o => value.includes(o.player_uid)) );
                        setValue([]);
                    }}
                    >
                    <ChevronRightWaves className={classes.icon} />
                    </ActionIcon>
                </Group>
                </Combobox.EventsTarget>

                <div className={classes.list}>
                <Combobox.Options>
                    {items.length > 0 ? (
                    items
                    ) : (
                    <Combobox.Empty>Nothing found....</Combobox.Empty>
                    )}
                </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
}
export function TransferList({data, handleTransfer}:{data: [playersData[],playersData[]], handleTransfer: (transferFrom: number, options: playersData[]) => void}) {


    return (
        <div className={classes.root}>
            <RenderList
                type="forward"
                options={data[0]}
                onTransfer={(options) => handleTransfer(0, options)}
            />
            <RenderList
                type="backward"
                options={data[1]}
                onTransfer={(options) => handleTransfer(1, options)}
            />
        </div>
    );
}
