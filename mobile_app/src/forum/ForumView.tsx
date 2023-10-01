import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem, SubjectView } from ".";
import { handleResponse } from "../utils";
import { TSubjectWithoutMessages } from "./types";

const backEndUrl = "http://192.168.1.52:3000";

async function GetSubjetcts() {
  console.log("ici");
  const response = await fetch(`${backEndUrl}/forum/subjects`);
  return handleResponse<TSubjectWithoutMessages[]>(response);
}
const ForumView: React.FC = () => {
  const [subjectList, setSubjectList] = useState<TSubjectWithoutMessages[]>([]);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  useEffect(() => {
    GetSubjetcts()
      .then((subjectList) => {
        setSubjectList(subjectList);
      })
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agroleague Forum</Text>
      {!selectedId ? (
        <FlatList
          data={subjectList}
          renderItem={({ item }) => (
            <ListItem item={item} onPress={() => setSelectedId(item._id)} />
          )}
          style={styles.mainList}
        />
      ) : (
        <SubjectView id={selectedId} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    padding: 15,
    fontSize: 32,
    alignSelf: "center",
  },
  mainList: {},
});
export { ForumView };
