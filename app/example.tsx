import { Text, View } from "react-native";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";

type TItem = { id: number };

const data: TItem[] = Array.from({ length: 100 })
  .fill(0)
  .map((_, i) => ({ id: i }));

export default function Example() {
  return (
    <LegendList
      data={data}
      renderItem={renderItem}
      style={{ flex: 1 }}
      keyExtractor={(item) => item.id.toString()}
      columnWrapperStyle={{
        rowGap: 16,
      }}
      maintainVisibleContentPosition
    />
  );
}

function renderItem(props: LegendListRenderItemProps<TItem>) {
  return <ListItem {...props} />;
}

function ListItem({ index }: LegendListRenderItemProps<TItem>) {
  return (
    <View style={{ padding: 16, borderWidth: 1, borderColor: "black" }}>
      <Text>{index}</Text>
    </View>
  );
}
