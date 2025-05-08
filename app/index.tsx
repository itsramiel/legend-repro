import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Button title="example" onPress={() => router.navigate("/example")} />
    </View>
  );
}
