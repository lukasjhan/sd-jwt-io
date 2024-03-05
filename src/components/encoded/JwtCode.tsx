import { Controlled as ControlledEditor } from 'react-codemirror2';
import { updateURLWithQuery } from '../../utils';
import { DECODED, ModeType } from '../Debugger';

export const JwtCode = ({
  token,
  updateToken,
  mode,
}: {
  token: string;
  updateToken: (token: string) => void;
  mode: ModeType;
}) => {
  return (
    <div className="area-wrapper">
      <ControlledEditor
        value={token}
        options={{
          mode: 'jwt',
          lineWrapping: true,
          readOnly: mode === DECODED,
        }}
        onBeforeChange={(editor, data, value) => {
          updateURLWithQuery(value, mode);
          updateToken(value);
        }}
      />
    </div>
  );
};
