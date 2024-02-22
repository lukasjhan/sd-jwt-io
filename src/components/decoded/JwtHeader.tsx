import { Controlled as ControlledEditor } from "react-codemirror2";

export const JwtHeader = ({
  header,
  setHeader,
}: {
  header: string;
  setHeader: any;
}) => {
  return (
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
  );
};
