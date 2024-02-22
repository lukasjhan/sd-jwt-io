import { Controlled as ControlledEditor } from "react-codemirror2";
import { updateURLWithQuery } from "../../utils";

export const JwtCode = ({
  token,
  setToken,
}: {
  token: string;
  setToken: (t: string) => void;
}) => {
  return (
    <ControlledEditor
      value={token}
      options={{
        mode: "jwt",
        lineWrapping: true,
      }}
      onBeforeChange={(editor, data, value) => {
        updateURLWithQuery(`token=${value}`);
        setToken(value);
        console.log(value);
      }}
    />
  );
};
