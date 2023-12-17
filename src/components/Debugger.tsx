import { Select } from 'antd';
import './Debugger.css';
import CodeMirror from 'codemirror';
import { useState } from 'react';
import { UnControlled as UnControlledEditor } from 'react-codemirror2';

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

const JWTCode = () => {
  const [jwt, setJwt] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );

  setTimeout(() => {
    //setJwt('hi.hi.hi');
  }, 5000);

  return (
    <UnControlledEditor
      value={jwt}
      options={{
        mode: 'jwt',
        lineWrapping: true,
      }}
      onChange={(editor, data, value) => {
        console.log(value);
      }}
    />
  );
};

export const Debugger = () => {
  return (
    <div className="debugger-wrapper">
      <div className="debugger-title" id="debugger">
        Debugger
      </div>
      <Warning />
      <SelectAlg />
      <div className="code-wrapper">
        <div className="code-item"></div>
        <div className="code-item"></div>
      </div>
    </div>
  );
};

CodeMirror.defineMode('jwt', function () {
  return {
    token: function (stream, state) {
      if (stream.sol() && !state.partParsed) {
        stream.skipTo('.') || stream.skipToEnd();
        state.partParsed = 'header';
        return 'jwt-header';
      }

      if (stream.peek() === '.' && state.partParsed !== 'signature') {
        stream.next(); // Skip the dot itself
        if (state.partParsed === 'header') {
          state.partParsed = 'payload';
        } else if (state.partParsed === 'payload') {
          state.partParsed = 'signature';
        }
        return 'jwt-dot'; // Don't style the dot
      }

      stream.skipTo('.') || stream.skipToEnd();
      return 'jwt-' + state.partParsed;
    },
    startState: function () {
      return { partParsed: null };
    },
  };
});
