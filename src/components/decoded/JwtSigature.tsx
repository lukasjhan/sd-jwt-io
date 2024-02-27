import { Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { decodeItem } from '../common/style';
import { decodeHeader, decodeHeaderTop } from '../common/style';
export const JwtSigature = ({
  secret,
  setSecret,
  checked,
  setChecked,
  mode,
  encode,
}: {
  secret: any;
  setSecret: any;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string;
  encode: () => Promise<void>;
}) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };
  return (
    <div>
      <div style={{ ...decodeHeader, ...decodeHeaderTop }}>{'SIGNATURE'}</div>
      <div style={decodeItem}>
        <pre
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            color: 'rgb(0, 185, 241)',
          }}
        >
          <div>{'HMACSHA256('}</div>
          <div>{`base64UrlEncode(header) + "." +`}</div>
          <div>{'base64UrlEncode(payload),'}</div>
          <div>
            <Input
              readOnly={mode === 'encode'}
              onChange={(e) => setSecret(e.target.value)}
              value={secret}
              style={{
                width: '200px',
                color: 'rgb(0, 185, 241)',
              }}
            />
          </div>
          <div>
            {')  '}
            <Checkbox
              checked={checked}
              onChange={onChange}
              style={{
                color: 'rgb(0, 185, 241)',
              }}
            >
              {'secret base64 encoded'}
            </Checkbox>
          </div>
        </pre>
      </div>
    </div>
  );
};
