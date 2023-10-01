import React from "react";

import Markdown from "react-native-marked";
import { IMessage } from "./types";
import { StyleSheet, View } from "react-native";

interface IMessageViewProps {
  message: IMessage;
}

const MessageView: React.FC<IMessageViewProps> = ({ message }) => {
  return (
    <View style={styles.markdown}>
      <Markdown value={message.content} />
    </View>
  );
};

const styles = StyleSheet.create({
  markdown: {},
});

export { MessageView };
