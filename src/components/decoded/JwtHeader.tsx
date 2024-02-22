import { Controlled as ControlledEditor } from "react-codemirror2";
import { decodeItem, decodeHeader, decodeDescStyle } from "../common/style";

export const JwtHeader = ({
  header,
  setHeader,
}: {
  header: string;
  setHeader: any;
}) => {
  return (
    <>
      <div style={decodeHeader}>
        {"HEADER"}
        <span style={decodeDescStyle}>{"ALGORITHM & TOKEN TYPE"}</span>
      </div>

      <div style={decodeItem}>
        <ControlledEditor
          value={header}
          options={{
            mode: "javascript",
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => {
            console.log(value);
            setHeader(value);
          }}
          className="json-header"
        />
      </div>
    </>
  );
};
