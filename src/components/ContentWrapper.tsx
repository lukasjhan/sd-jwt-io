import { CSSProperties } from "react";

export const ContentWrapper = ({ children }: { children: JSX.Element }) => (
  <div style={containerStyle}>
    <div style={contentWrap}>{children}</div>
  </div>
);

const containerStyle = {
  width: "100%",
};

const contentWrap: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1.25rem",
  boxSizing: "border-box",
};
