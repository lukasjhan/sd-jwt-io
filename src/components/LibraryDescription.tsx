import { CSSProperties } from "react";

export const LibraryDescription = () => {
  return (
    <div className="description" style={LibraryDescriptionWrap}>
      <div>Libraries for Token Issuing/Holding/Verification.</div>
    </div>
  );
};
const LibraryDescriptionWrap: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "50px 0px 60px 0px",
  textAlign: "center",
  gap: "2.5rem",
};
