import { Controlled as ControlledEditor } from 'react-codemirror2';
import { decodeItem, decodeHeader, decodeDescStyle } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';
import { ENCODED, ModeType } from '../Debugger';

export const JwtHeader = ({
  header,
  setHeader,
  mode,
}: {
  header: string;
  setHeader: (data: UpdateEncode) => Promise<void>;
  mode: ModeType;
}) => {
  return (
    <>
      <div style={decodeHeader}>
        {'HEADER'}
        <span style={decodeDescStyle}>{'ALGORITHM & TOKEN TYPE'}</span>
      </div>

      <div style={{ ...decodeItem, height: '130px' }} className="input-cursor">
        <ControlledEditor
          value={header}
          options={{
            readOnly: mode === ENCODED,
            mode: 'javascript',
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setHeader({ header: value });
          }}
          className="json-header"
        />
      </div>
    </>
  );
};
