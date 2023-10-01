import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "./ListItem";
import { SubjectView } from "./SubjectView";
import { TSubjectWithoutMessages } from "./types";

import { getSubjects } from "./requests";

const ForumView: React.FC = () => {
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
        <FlatList
          data={subjectList}
          renderItem={({ item }) => (
            <ListItem item={item} onPress={() => setSelectedId(item._id)} />
          )}
          style={styles.mainList}
        />
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
    // display: "flex",
    height: "100%",
    // flexDirection: "column",
    // alignItems: "stretch",
    // justifyContent: "center",
    fontVariant: "",
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
