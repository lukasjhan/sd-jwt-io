import { ContentWrapper } from "../ContentWrapper";
import { LibraryDescription } from "../LibraryDescription";
import { CSSProperties } from "react";

export const Library = () => {
  return (
    <div style={LibraryWrap}>
      <ContentWrapper>
        <LibraryDescription />
      </ContentWrapper>
      <ContentWrapper>
        <h1>Home</h1>
      </ContentWrapper>
    </div>
  );
};

const LibraryWrap: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
};
