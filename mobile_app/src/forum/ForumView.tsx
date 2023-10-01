import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { ListItem } from "./ListItem";
import { SubjectView } from "./SubjectView";
import { TSubjectWithoutMessages } from "./types";

import { getSubjects } from "./requests";

interface IForumViewProms {
  switchToSubjectCreation: () => void;
}
const ForumView: React.FC<IForumViewProms> = ({ switchToSubjectCreation }) => {
  const [subjectList, setSubjectList] = useState<TSubjectWithoutMessages[]>([]);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  useEffect(() => {
    getSubjects()
      .then((subjectList) => setSubjectList(subjectList))
      .catch(console.error);
  }, []);

  let selectedSubject: TSubjectWithoutMessages | undefined = undefined;
  for (const subject of subjectList) {
    if (subject._id === selectedId) {
      selectedSubject = subject;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agroleague Forum</Text>
      {!selectedSubject ? (
        <>
          <FlatList
            data={subjectList}
            renderItem={({ item }) => (
              <ListItem item={item} onPress={() => setSelectedId(item._id)} />
            )}
            style={styles.mainList}
          />
          <Button
            onPress={switchToSubjectCreation}
            title="Créer un nouveau sujet"
            color="darkslateblue"
          />
        </>
      ) : (
        <SubjectView
          subject={selectedSubject}
          backFunction={() => setSelectedId(undefined)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 4,
    paddingBottom: 40,
    backgroundColor: "cornsilk",
  },
  title: {
    padding: 10,
    fontSize: 26,
    alignSelf: "center",
    fontWeight: "bold",
    color: "brown",
  },
  mainList: {},
});
export { ForumView };
