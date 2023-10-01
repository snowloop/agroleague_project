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
    <Text>{`Créé le ${new Date(item.updatedAt).toLocaleDateString()}`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal : 4
  },
  title: {
    fontSize: 22,
  },
});

export { ListItem };
