import { Select, Input, Checkbox } from 'antd';
import './Debugger.css';
import CodeMirror from 'codemirror';
import { useEffect, useState } from 'react';
import { UnControlled as UnControlledEditor } from 'react-codemirror2';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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

const JWTHeader = () => {
  return (
    <UnControlledEditor
      value={''}
      options={{
        mode: 'javascript',
        lineWrapping: true,
      }}
      onChange={(editor, data, value) => {
        console.log(value);
      }}
      className="json-header"
    />
  );
};

const JWTPayload = () => {
  return (
    <UnControlledEditor
      value={''}
      options={{
        mode: 'javascript',
        lineWrapping: true,
      }}
      onChange={(editor, data, value) => {
        console.log(value);
      }}
      className="json-payload"
    />
  );
};

const JWTDecode = () => {
  const [value, setValue] = useState('your-256-bit-secret');
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <pre
      style={{
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
          onChange={(e) => setValue(e.target.value)}
          value={value}
          style={{
            width: '200px',
            color: 'rgb(0, 185, 241)',
          }}
        />
      </div>
      <div>
        {')  '}
        <Checkbox
          onChange={onChange}
          style={{
            color: 'rgb(0, 185, 241)',
          }}
        >
          {'secret base64 encoded'}
        </Checkbox>
      </div>
    </pre>
  );
};

export const Debugger = () => {
  useEffect(() => {
    if (window.location.hash !== '#debugger') {
      return;
    }
    setTimeout(() => {
      const element = document.getElementById('debugger');
      if (element) {
        const offset = 150; // Number of pixels you want to scroll above the element
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  }, []);

  return (
    <div className="debugger-wrapper">
      <div className="debugger-title" id="debugger">
        Debugger
      </div>
      <Warning />
      <SelectAlg />
      <div className="code-wrapper">
        <div className="code-item">
          <div className="code-title-wrapper">
            <div className="code-title">{'Encoded'}</div>
            <div className="code-desc">
              {'paste your token here'.toUpperCase()}
            </div>
          </div>
          <div className="area-wrapper">
            <JWTCode />
          </div>
        </div>
        <div className="code-item">
          <div className="code-title-wrapper">
            <div className="code-title">{'Decoded'}</div>
            <div className="code-desc">
              {'edit the payload and secret'.toUpperCase()}
            </div>
          </div>
          <div className="decode-area">
            <div className="decode-header">
              {'HEADER'}
              <span className="decode-desc">{'ALGORITHM & TOKEN TYPE'}</span>
            </div>
            <div className="decode-item">
              <JWTHeader />
            </div>
            <div className="decode-header decode-border-top">
              {'PAYLOAD'}
              <span className="decode-desc">{'DATA'}</span>
            </div>
            <div className="decode-item">
              <JWTPayload />
            </div>
            <div className="decode-header decode-border-top">
              {'VERIFY SIGNATURE'}
            </div>
            <div className="decode-item">
              <JWTDecode />
            </div>
          </div>
        </div>
      </div>
      <div className="verified-share-wrapper">
        <div>Signature Verified</div>
        <div>Share SD JWT</div>
      </div>
    </div>
  );
};

CodeMirror.defineMode('jwt', function () {
  return {
    token: function (stream, state) {
      if (stream.sol()) {
        state.partParsed = 'header'; // Start of line, assume header
      }

      if (stream.eat('.')) {
        // Consume and style the dot
        if (state.partParsed === 'header') {
          state.partParsed = 'payload';
        } else if (state.partParsed === 'payload') {
          state.partParsed = 'signature';
        } else if (state.partParsed === 'signature') {
          state.partParsed = 'after-signature'; // After the signature, no styling
        }
        return 'jwt-dot';
      }

      stream.next(); // Consume the next character
      if (state.partParsed === 'after-signature') {
        return null; // No styling after the signature
      }
      return 'jwt-' + state.partParsed; // Style based on the current part
    },
    startState: function () {
      return { partParsed: null };
    },
  };
});
