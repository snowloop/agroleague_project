import React, { useEffect } from "react";
import { View } from "react-native";

interface ISubjectViewProps {
  id: string;
}

const SubjectView: React.FC<ISubjectViewProps> = ({ id }) => {
  useEffect(() => {}, []);
  return <View></View>;
};

export { SubjectView };
