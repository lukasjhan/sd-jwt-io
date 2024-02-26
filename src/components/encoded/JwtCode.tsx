import { Controlled as ControlledEditor } from "react-codemirror2";
import { updateURLWithQuery } from "../../utils";

export const JwtCode = ({
  token,
  setToken,
  mode,
  decode,
}: {
  token: string;
  setToken: any;
  mode: string;
  decode: any;
}) => {
  return (
    <div className="area-wrapper">
      <ControlledEditor
        value={token}
        options={{
          mode: "jwt",
          lineWrapping: true,
          readOnly: mode === "decode",
        }}
        onBeforeChange={(editor, data, value) => {
          updateURLWithQuery(value, mode);
          setToken(value);
          decode();
          // console.log(value);
        }}
      />
    </div>
  );
};
