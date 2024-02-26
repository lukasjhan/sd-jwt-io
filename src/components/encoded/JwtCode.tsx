import { Controlled as ControlledEditor } from "react-codemirror2";
import { updateURLWithQuery } from "../../utils";

export const JwtCode = ({
  token,
  setToken,
  isEcoded,
}: {
  token: string;
  setToken: (t: string) => void;
  isEcoded: boolean;
}) => {
  return (
    <div className="area-wrapper">
      <ControlledEditor
        value={token}
        options={{
          mode: "jwt",
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          updateURLWithQuery(value, isEcoded);
          setToken(value);
          console.log(value);
        }}
      />
    </div>
  );
};
