import { Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { decodeItem } from '../common/style';
import { decodeHeader, decodeHeaderTop } from '../common/style';
import { UpdateEncode } from '../../hooks/debug.hook';
import TextArea from 'antd/es/input/TextArea';

export const JwtSigature = ({
  alg,
  secret,
  pubpriKey,
  checked,
  encode,
  mode,
  setPubPriKey,
  setSecret,
}: {
  alg: string;
  secret: string;
  pubpriKey: { pri: string; pub: string };
  checked: boolean;
  encode: (data: UpdateEncode) => Promise<void>;
  mode: string;
  setPubPriKey: (data: { pri: string; pub: string }) => void;
  setSecret: (data: string) => void;
}) => {
  const onChange = (e: CheckboxChangeEvent) => {
    encode({ b64checked: e.target.checked });
  };
  const field =
    alg === 'HS256' ? (
      <Input
        onChange={(e) => {
          if (mode === 'encode') setSecret(e.target.value);
          else encode({ secret: e.target.value });
        }}
        value={secret}
        style={{
          width: '200px',
          color: 'rgb(0, 185, 241)',
        }}
      />
    ) : (
      <>
        <span
          style={{
            fontSize: '0.8rem',
          }}
        >
          {'[Public Key]'}
        </span>
        <TextArea
          onChange={(e) => {
            if (mode === 'encode') setPubPriKey({ ...pubpriKey, pub: e.target.value });
            else encode({ pubpriKey: { ...pubpriKey, pub: e.target.value } });
          }}
          value={pubpriKey.pub}
          style={{
            width: '600px',
            color: 'rgb(0, 185, 241)',
            height: '100px',
          }}
        />
        <span
          style={{
            fontSize: '0.8rem',
          }}
        >
          {'[Private Key]'}
        </span>
        <TextArea
          onChange={(e) => {
            if (mode === 'encode') setPubPriKey({ ...pubpriKey, pri: e.target.value });
            else encode({ pubpriKey: { ...pubpriKey, pri: e.target.value } });
          }}
          value={pubpriKey.pri}
          style={{
            width: '600px',
            color: 'rgb(0, 185, 241)',
            height: '100px',
          }}
        />
      </>
    );

  return (
    <>
      <div style={{ ...decodeHeader, ...decodeHeaderTop }}>{'SIGNATURE'}</div>
      <div style={decodeItem} className="input-cursor">
        <pre
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            color: 'rgb(0, 185, 241)',
          }}
        >
          <div>{true ? 'HMACSHA256(' : 'ECDSASHA256('}</div>
          <div>{`base64UrlEncode(header) + "." +`}</div>
          <div>{'base64UrlEncode(payload),'}</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {field}
          </div>
          <div>
            {')  '}
            {alg === 'HS256' ? (
              <Checkbox
                checked={checked}
                onChange={onChange}
                style={{
                  color: 'rgb(0, 185, 241)',
                }}
              >
                {'secret base64 encoded'}
              </Checkbox>
            ) : null}
          </div>
        </pre>
      </div>
    </>
  );
};
