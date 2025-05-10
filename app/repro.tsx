import { useState } from "react";
import * as Crypto from "expo-crypto";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type TItem = {
  id: string;
  datetime: string;
  message: string;
  sender: "me" | "them";
};

export default function ChatUi() {
  const [data, setData] = useState<TItem[]>(INITIAL_DATA.reverse());

  const onSend = (message: string) => {
    setData((prev) => [
      ...prev,
      {
        id: Crypto.randomUUID(),
        datetime: new Date().toISOString(),
        message,
        sender: "me",
      },
    ]);
  };

  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior="padding"
        // headerHeight is broken on Android https://github.com/software-mansion/react-native-screens/issues/2661
        keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 97.14}
      >
        <FlatList
          style={styles.flex1}
          contentContainerStyle={styles.listContentContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
        />
        <Input onSend={onSend} />
      </KeyboardAvoidingView>
      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
  },
  flex1: {
    flex: 1,
  },
  listContentContainer: {
    padding: 8,
  },
});

interface InputProps {
  onSend: (message: string) => void;
}

function Input({ onSend }: InputProps) {
  const [message, setMessage] = useState("");

  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8,
        backgroundColor: "#fff",
      }}
    >
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: "#eee",
          borderRadius: 4,
        }}
        placeholder="Enter message"
      />
      <Button title="Send" onPress={() => onSend(message)} />
    </View>
  );
}

function renderItem(props: ListRenderItemInfo<TItem>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: ListRenderItemInfo<TItem>) {
  return (
    <View
      style={{
        alignItems: item.sender === "me" ? "flex-end" : "flex-start",
        marginVertical: 4,
      }}
    >
      <View
        style={{
          width: "75%",
          borderRadius: 4,
          padding: 8,
          backgroundColor: item.sender === "me" ? "#007AFF" : "#fff",
        }}
      >
        <Text>{item.message}</Text>
        <Text>
          {new Date(item.datetime).toLocaleTimeString("en", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </View>
    </View>
  );
}

const INITIAL_DATA = Array<TItem>(
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:00:04.950Z",
    message: "Hey, are you free to talk now?",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:01:10.230Z",
    message: "Yeah, what's up?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:02:15.421Z",
    message: "I need help debugging a React Native issue.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:03:05.750Z",
    message: "Sure, what's the problem?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:03:45.112Z",
    message: "The app crashes on startup after the latest update.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:04:20.338Z",
    message: "Any logs or errors you can share?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:05:04.950Z",
    message: "Yeah, it throws an undefined is not a function error.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:06:30.125Z",
    message: "Sounds like a hook or prop issue. Did you update any libs?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:07:10.980Z",
    message: "Yeah, I bumped react-navigation to v7 yesterday.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:08:40.407Z",
    message: "That could be it. Check their changelog for breaking changes.",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:09:15.732Z",
    message: "Good idea. Let me pull that up real quick.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:10:02.189Z",
    message:
      "Also double-check if you need to update the stack navigator config.",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:11:24.693Z",
    message: "Yeah, they deprecated some options. That might be it.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:12:18.540Z",
    message: "Try reverting those or updating according to the new API.",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:13:01.885Z",
    message: "On it. I’ll let you know if that fixes the crash.",
    sender: "me",
  },
);
