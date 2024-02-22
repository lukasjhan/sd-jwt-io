import { ContentWrapper } from "../ContentWrapper";
import { Debugger } from "../Debugger";
import { CSSProperties } from "react";

export const Home = () => {
  return (
    <div style={HomeContainer}>
      <ContentWrapper>
        <Debugger />
      </ContentWrapper>
    </div>
  );
};

const HomeContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
};
