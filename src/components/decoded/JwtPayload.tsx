import { Controlled as ControlledEditor } from "react-codemirror2";

export const JwtPayload = ({
  payload,
  setPayload,
}: {
  payload: string;
  setPayload: any;
}) => {
  return (
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
  );
};
