import { Controlled as ControlledEditor } from "react-codemirror2";
import { decodeItem } from "../common/style";

export const JwtPayload = ({
  payload,
  setPayload,
}: {
  payload: string;
  setPayload: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div style={decodeItem}>
      <ControlledEditor
        value={payload}
        options={{
          mode: "javascript",
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          console.log(value);
          setPayload(value);
        }}
        className="json-payload"
      />
    </div>
  );
};
