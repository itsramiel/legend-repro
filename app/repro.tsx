import { LegendList, LegendListRenderItemProps } from "@legendapp/list";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const now = new Date();
const INITIAL_ITEMS_COUNTS = 13;
const INITIAL_DATA = Array.from({ length: INITIAL_ITEMS_COUNTS }).map(
  (_, i) => {
    return new Date(
      now.getFullYear(),
      i - Math.floor(INITIAL_ITEMS_COUNTS / 2) + now.getMonth(),
    );
  },
);

export default function Repro() {
  const [data, setData] = useState(INITIAL_DATA);

  const onEndReached = () => {
    const lastDate = data[data.length - 1];
    const nextData = Array.from({ length: 10 })
      .fill(0)
      .map((_, i) => {
        return new Date(lastDate.getFullYear(), lastDate.getMonth() + i + 1);
      });

    setTimeout(() => {
      setData((prevData) => [...prevData, ...nextData]);
    }, 2000);
  };

  const onStartReached = () => {
    const firstDate = data[0];
    const prevData = Array.from({ length: 10 })
      .fill(0)
      .map((_, i) => {
        return new Date(firstDate.getFullYear(), firstDate.getMonth() - i - 1);
      });
    setTimeout(() => {
      setData([...prevData.reverse(), ...data]);
    }, 2000);
  };

  return (
    <View style={styles.screen}>
      <LegendList
        style={styles.list}
        data={data}
        initialScrollIndex={data.findIndex((item) => {
          return (
            item.getFullYear() === now.getFullYear() &&
            item.getMonth() === now.getMonth()
          );
        })}
        maintainVisibleContentPosition
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        onStartReached={onStartReached}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 24,
    fontWeight: "semibold",
  },
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
});

function renderItem(props: LegendListRenderItemProps<Date>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: LegendListRenderItemProps<Date>) {
  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: MONTHLY_COLORS[item.getMonth()],
        },
      ]}
    >
      <Text style={styles.itemText}>{dateFormatter.format(item)}</Text>
    </View>
  );
}

const MONTHLY_COLORS = [
  "#C1D7E0",
  "#D6CDE0",
  "#B1D8B7",
  "#FFE0B2",
  "#FFCC80",
  "#FFF176",
  "#FFD54F",
  "#FFAB91",
  "#A5D6A7",
  "#CE93D8",
  "#B0BEC5",
  "#FFCDD2",
] as const;
