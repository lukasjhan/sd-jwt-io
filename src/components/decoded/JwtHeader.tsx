import { Controlled as ControlledEditor } from 'react-codemirror2';
import { decodeItem, decodeHeader, decodeDescStyle } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';

export const JwtHeader = ({
  header,
  setHeader,
  mode,
}: {
  header: string;
  setHeader: (data: UpdateEncode) => Promise<void>;
  mode: string;
}) => {
  return (
    <>
      <div style={decodeHeader}>
        {'HEADER'}
        <span style={decodeDescStyle}>{'ALGORITHM & TOKEN TYPE'}</span>
      </div>

      <div style={decodeItem}>
        <ControlledEditor
          value={header}
          options={{
            readOnly: mode === 'encode' ? 'nocursor' : false,
            mode: 'javascript',
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => {
            console.log(value);
            setHeader({ header: value });
          }}
          className="json-header"
        />
      </div>
    </>
  );
};
