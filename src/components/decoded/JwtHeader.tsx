import { Controlled as ControlledEditor } from "react-codemirror2";
import { decodeItem, decodeHeader, decodeDescStyle } from "../common/style";

export const JwtHeader = ({
  header,
  setHeader,
  mode,
}: {
  header: string;
  setHeader: any;
  mode: string;
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
            readOnly: mode === "encode",
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
