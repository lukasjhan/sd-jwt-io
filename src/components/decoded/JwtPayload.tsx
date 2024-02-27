import { Controlled as ControlledEditor } from 'react-codemirror2';
import { decodeItem } from '../common/style';

export const JwtPayload = ({
  payload,
  setPayload,
  mode,
  encode,
  className,
}: {
  payload: string;
  setPayload: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  encode: () => Promise<void>;
  className?: string;
}) => {
  return (
    <div style={decodeItem}>
      <ControlledEditor
        value={payload}
        options={{
          mode: 'javascript',
          readOnly: mode === 'encode' ? 'nocursor' : false,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          console.log(value);
          setPayload(value);
          encode();
        }}
        className={`json-payload ${className}`}
      />
    </div>
  );
};
