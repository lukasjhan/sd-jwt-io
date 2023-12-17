import { Select } from 'antd';
import './Debugger.css';

const Warning = () => {
  return (
    <div className="debugger-warning">
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {'Warning: '}
      </span>
      {
        'SD JWTs are credentials, which might have personal data. Be careful where you paste them! We do not record tokens, all validation and debugging is done on the client side.'
      }
    </div>
  );
};

const SelectAlg = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        gap: '1rem',
      }}
    >
      <div>{'Algorithm'}</div>
      <Select
        defaultValue="HS256"
        style={{ width: 100 }}
        onChange={(value: string) => {
          console.log(value);
        }}
        options={[
          { value: 'HS256', label: 'HS256' },
          { value: 'HS384', label: 'HS384' },
          { value: 'HS512', label: 'HS512' },
          { value: 'RS256', label: 'RS256' },
          { value: 'RS384', label: 'RS384' },
          { value: 'RS512', label: 'RS512' },
          { value: 'ES256', label: 'ES256' },
          { value: 'ES384', label: 'ES384' },
          { value: 'ES512', label: 'ES512' },
          { value: 'PS256', label: 'PS256' },
          { value: 'PS384', label: 'PS384' },
          { value: 'PS512', label: 'PS512' },
        ]}
      />
    </div>
  );
};

export const Debugger = () => {
  return (
    <div className="debugger-wrapper">
      <div className="debugger-title">Debugger</div>
      <Warning />
      <SelectAlg />
    </div>
  );
};
