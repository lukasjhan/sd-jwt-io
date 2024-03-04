import { Controlled as ControlledEditor } from 'react-codemirror2';
import { decodeItem } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';

interface JwtPayloadType {
  payload: string;
  setPayload: (data: UpdateEncode) => Promise<void>;
  mode: string;
  type: 'claim' | 'disclosureFrame';
  className?: string;
}

export const JwtPayload = ({ payload, setPayload, mode, type, className }: JwtPayloadType) => {
  const editorOption = {
    mode: 'javascript',
    readOnly: mode === 'encode',
    lineWrapping: true,
  };

  return (
    <div style={{ ...decodeItem, height: '350px' }} className="input-cursor">
      <ControlledEditor
        value={payload}
        options={editorOption}
        onBeforeChange={(editor, data, value) => {
          if (type === 'claim') setPayload({ claims: value });
          else if (type === 'disclosureFrame') setPayload({ disclosureFrame: value });
        }}
        className={`json-payload ${className}`}
      />
    </div>
  );
};
