import { Controlled as ControlledEditor } from 'react-codemirror2';
import { updateURLWithQuery } from '../../utils';

export const JwtCode = ({
  token,
  updateToken,
  mode,
}: {
  token: string;
  updateToken: (token: string) => void;
  mode: string;
}) => {
  return (
    <div className="area-wrapper">
      <ControlledEditor
        value={token}
        options={{
          mode: 'jwt',
          lineWrapping: true,
          readOnly: mode === 'decode' ? 'nocursor' : false,
        }}
        onBeforeChange={(editor, data, value) => {
          updateURLWithQuery(value, mode);
          updateToken(value);
        }}
      />
    </div>
  );
};
