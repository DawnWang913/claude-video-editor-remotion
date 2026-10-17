import React from "react";
import { Composition } from "remotion";
import { EditorStory } from "./EditorStory";
export const Root: React.FC = () => (
  <Composition
    id="EditorStory"
    component={EditorStory}
    durationInFrames={902}
    fps={30}
    width={1280}
    height={720}
  />
);
