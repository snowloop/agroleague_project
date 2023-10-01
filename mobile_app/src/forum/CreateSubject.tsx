import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Markdown from "react-native-marked";
import { putSubject } from "./requests";

interface ICreateSubjectProps {
  backFunction: () => void;
}
const CreateSubject: React.FC<ICreateSubjectProps> = ({ backFunction }) => {
  const [subjectDraft, setSubjectDraft] = useState<string>("");
  const [contentDraft, setContentDraft] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function createNewSubject(subject: string, content: string) {
    setLoading(true);
    try {
      await putSubject(subject, content);
      setLoading(false);
      backFunction();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const isSubmitButtonDisabled: boolean =
    loading || subjectDraft.length < 7 || contentDraft.length < 20;

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Agroleague Forum</Text>
      <View>
        <Text style={styles.title}>Indiquer le sujet</Text>
        <TextInput
          style={styles.input}
          value={subjectDraft}
          onChangeText={setSubjectDraft}
        />

        <Text style={styles.title}>Écrivez le corps</Text>
        <TextInput
          style={styles.input}
          value={contentDraft}
          onChangeText={setContentDraft}
          multiline={true}
        />
        <Text style={styles.title}>Preview</Text>
        <Text>{subjectDraft}</Text>
        <Markdown value={contentDraft} />

        <View style={styles.buttonView}>
          <Button
            onPress={backFunction}
            title="Retour"
            color="orange"
            disabled={loading}
          />
          <Button
            onPress={() => createNewSubject(subjectDraft, contentDraft)}
            disabled={isSubmitButtonDisabled}
            title="Envoyez la réponse"
            color="blue"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 4,
    paddingBottom: 40,
    backgroundColor: "cornsilk",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  mainTitle: {
    padding: 10,
    fontSize: 26,
    alignSelf: "center",
    fontWeight: "bold",
    color: "brown",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkseagreen",
  },
  buttonView: {
    display: "flex",
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

export { CreateSubject };
