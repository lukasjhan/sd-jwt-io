import { Controlled as ControlledEditor } from "react-codemirror2";
import { decodeItem } from "../common/style";

export const JwtPayload = ({
  payload,
  setPayload,
  mode,
  encode,
}: {
  payload: string;
  setPayload: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  encode: () => Promise<void>;
}) => {
  return (
    <div style={decodeItem}>
      <ControlledEditor
        value={payload}
        options={{
          mode: "javascript",
          readOnly: mode === "encode",
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          console.log(value);
          setPayload(value);
          encode();
        }}
        className="json-payload"
      />
    </div>
  );
};
