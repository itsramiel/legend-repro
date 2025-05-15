import { StyleSheet, Text, View } from "react-native";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";

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
  return (
    <View style={styles.screen}>
      <LegendList
        style={styles.list}
        data={INITIAL_DATA}
        initialScrollIndex={5}
        maintainVisibleContentPosition
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
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
