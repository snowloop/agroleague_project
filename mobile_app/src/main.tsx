import React, { useState } from "react";
import { ForumView } from "./forum";
import { CreateSubject } from "./forum/CreateSubject";

const Main: React.FC = () => {
  const [creationMode, setCreationMode] = useState<boolean>(false);
  if (creationMode) {
    return <CreateSubject switchToSubjectList={() => setCreationMode(false)} />;
  }
  return <ForumView switchToSubjectCreation={() => setCreationMode(true)} />;
};

export { Main };
