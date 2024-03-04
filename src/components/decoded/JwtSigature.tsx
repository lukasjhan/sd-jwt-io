import { Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { decodeItem } from '../common/style';
import { decodeHeader, decodeHeaderTop } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';
import TextArea from 'antd/es/input/TextArea';
import { CSSProperties } from 'react';

interface JwtSigatureType {
  alg: string;
  secret: string;
  pubpriKey: { pri: string; pub: string };
  checked: boolean;
  encode: (data: UpdateEncode) => Promise<void>;
  mode: string;
  setPubPriKey: (data: { pri: string; pub: string }) => void;
  setSecret: (data: string) => void;
  setBase64Checked: (check: boolean) => void;
}

export const JwtSigature = ({
  alg,
  secret,
  pubpriKey,
  checked,
  encode,
  mode,
  setPubPriKey,
  setSecret,
  setBase64Checked,
}: JwtSigatureType) => {
  const HS256 = 'HS256';

  const onHandlecCheckBox = (e: CheckboxChangeEvent) => {
    if (mode === 'decode') encode({ b64checked: e.target.checked });
    if (mode === 'encode') setBase64Checked(e.target.checked);
  };

  return (
    <>
      <div style={{ ...decodeHeader, ...decodeHeaderTop }}>{'SIGNATURE'}</div>
      <div style={{ ...decodeItem, maxHeight: '500px' }} className="input-cursor">
        <pre style={signatureWrap}>
          <div>{true ? 'HMACSHA256(' : 'ECDSASHA256('}</div>
          <div>{`base64UrlEncode(header) + "." +`}</div>
          <div style={secretWrap}>
            {alg === HS256 ? (
              <HS256Algorithm
                mode={mode}
                encode={encode}
                setSecret={setSecret}
                secret={secret}
                checked={checked}
                onHandlecCheckBox={onHandlecCheckBox}
              />
            ) : (
              <ES2565Algorithm setPubPriKey={setPubPriKey} mode={mode} encode={encode} pubpriKey={pubpriKey} />
            )}
          </div>
          <div>{')  '}</div>
        </pre>
      </div>
    </>
  );
};

interface HS256Type {
  mode: string;
  encode: (data: UpdateEncode) => Promise<void>;
  setSecret: (data: string) => void;
  secret: string;
  checked: boolean;
  onHandlecCheckBox: (e: CheckboxChangeEvent) => void;
}

const HS256Algorithm = ({ mode, encode, setSecret, secret, checked, onHandlecCheckBox }: HS256Type) => (
  <>
    <Input
      onChange={(e) => {
        if (mode === 'encode') setSecret(e.target.value);
        else encode({ secret: e.target.value });
      }}
      value={secret}
      style={HS256TextArea}
    />
    <Checkbox
      checked={checked}
      onChange={onHandlecCheckBox}
      style={{
        color: 'rgb(0, 185, 241)',
      }}
    >
      {'secret base64 encoded'}
    </Checkbox>
  </>
);

interface ES2565Type {
  setPubPriKey: (data: { pri: string; pub: string }) => void;
  mode: string;
  encode: (data: UpdateEncode) => Promise<void>;
  pubpriKey: { pri: string; pub: string };
}

const ES2565Algorithm = ({ setPubPriKey, mode, encode, pubpriKey }: ES2565Type) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === 'encode') setPubPriKey({ ...pubpriKey, pub: e.target.value });
    else encode({ pubpriKey: { ...pubpriKey, pub: e.target.value } });
  };

  return (
    <>
      <span style={algorithmFontiSize}>{'[Public Key]'}</span>
      <TextArea onChange={onChange} value={pubpriKey.pub} style={ES2565TextArea} />
      <span style={algorithmFontiSize}>{'[Private Key]'}</span>

      <TextArea onChange={onChange} value={pubpriKey.pri} style={ES2565TextArea} />
    </>
  );
};

const signatureWrap: CSSProperties = {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  color: 'rgb(0, 185, 241)',
};

const secretWrap: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};
const algorithmFontiSize = {
  fontSize: '0.8rem',
};

const HS256TextArea = {
  width: '200px',
  color: 'rgb(0, 185, 241)',
};

const ES2565TextArea = {
  width: '600px',
  color: 'rgb(0, 185, 241)',
  height: '100px',
};
