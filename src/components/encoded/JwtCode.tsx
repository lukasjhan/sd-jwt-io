import { Controlled as ControlledEditor } from "react-codemirror2";
import { updateURLWithQuery } from "../../utils";

export const JwtCode = ({
  token,
  setToken,
  mode,
}: {
  token: string;
  setToken: (t: string) => void;
  mode: string;
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
          console.log(value);
        }}
      />
    </div>
  );
};
