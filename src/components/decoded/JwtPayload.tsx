import { Controlled as ControlledEditor } from 'react-codemirror2';
import { decodeItem } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';

export const JwtPayload = ({
  payload,
  setPayload,
  mode,
  type,
  className,
}: {
  payload: string;
  setPayload: (data: UpdateEncode) => Promise<void>;
  mode: string;
  type: 'claim' | 'disclosureFrame';
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
          if (type === 'claim') setPayload({ claims: value });
          else if (type === 'disclosureFrame') setPayload({ disclosureFrame: value });
        }}
        className={`json-payload ${className}`}
      />
    </div>
  );
};
