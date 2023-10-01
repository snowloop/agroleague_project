import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TSubjectWithoutMessages } from "./types";

interface IItemProps {
  item: TSubjectWithoutMessages;
  onPress: () => void;
}
const ListItem: React.FC<IItemProps> = ({ item, onPress }: IItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{item.value}</Text>
    <Text>{item.updatedAt}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export { ListItem };
