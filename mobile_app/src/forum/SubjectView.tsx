import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Markdown from "react-native-marked";
import { MessageView } from "./MessageView";
import { IMessage, TSubjectWithoutMessages } from "./types";
import { getMessageList, postMessage } from "./requests";

interface ISubjectViewProps {
  subject: TSubjectWithoutMessages;
  backFunction: () => void;
}

const SubjectView: React.FC<ISubjectViewProps> = ({
  subject,
  backFunction,
}) => {
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [writingMode, setWritingMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [answerDraft, setAnswerDraft] = useState<string>("");

  useEffect(() => {
    getMessageList(subject._id)
      .then((result) => setMessageList(result))
      .catch(console.error);
  }, []);

  async function postNewMessage(id: string, content: string) {
    setLoading(true);
    let messageList;

    try {
      messageList = await postMessage(id, content);
      setMessageList(messageList);
    } catch (err) {
      console.error(err);
    }
    setWritingMode(false);
    setLoading(false);
  }

  const isSubmitButtonDisabled: boolean = loading || answerDraft.length < 20;

  const jsxBody = (
    <>
      <Text style={styles.mainTitle}>{subject.value}</Text>
      {writingMode ? (
        <View>
          <Text style={styles.title}>Écrivez votre réponse</Text>
          <TextInput
            style={styles.input}
            value={answerDraft}
            onChangeText={setAnswerDraft}
            multiline={true}
          />
          <Text style={styles.title}>Preview</Text>
          <Markdown value={answerDraft} />
          <Button
            onPress={() => postNewMessage(subject._id, answerDraft)}
            disabled={isSubmitButtonDisabled}
            title="Envoyez la réponse"
            color="blue"
          />
        </View>
      ) : null}
      {!writingMode ? (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 5,
                backgroundColor: "gray",
              }}
            />
          )}
          style={styles.list}
          data={messageList}
          renderItem={({ item }) => <MessageView message={item} />}
        />
      ) : (
        <View>
          <Text style={styles.title}>Dernière réponse</Text>
          <MessageView message={messageList[messageList.length - 1]} />
        </View>
      )}
      <View style={styles.buttonView}>
        <Button
          onPress={!writingMode ? backFunction : () => setWritingMode(false)}
          title="Retour"
          color="orange"
          disabled={loading}
        />
        <Button
          onPress={() => setWritingMode(true)}
          disabled={writingMode}
          title="Répondre"
        />
      </View>
    </>
  );

  if (!writingMode) {
    return <View style={{ height: "100%" }}>{jsxBody}</View>;
  }
  return <ScrollView>{jsxBody}</ScrollView>;
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "darkslateblue",
    marginVertical: 6,
  },
  text: { fontSize: 14 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkseagreen",
  },
  list: {
    padding: 20,
    height: "70%",
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    height: 40,
    marginVertical: 6,
    borderWidth: 2,
    padding: 10,
    backgroundColor: "white",
  },
});
export { SubjectView };
