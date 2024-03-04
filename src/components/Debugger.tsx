import { message } from 'antd';
import CodeMirror from 'codemirror';
import { ReactNode, useEffect, useState } from 'react';
import { copyCurrentURLToClipboard, updateURLWithQuery } from '../utils';
import { DebugHook } from '../hooks/debug.hook';
import { JwtCode, JwtHeader, JwtPayload, JwtSigature, Warning } from './index';
import './Debugger.css';
import { DebuggerContainer } from './DebuggerContainer';
import { Equipments } from './Equipments';

// Mode represents the left section
// e.g. if mode is encode, then left section is `encoded`
export type ModeType = 'encode' | 'decode';

export const Debugger = () => {
  useEffect(() => {
    if (window.location.hash !== '#debugger') {
      return;
    }
    setTimeout(() => {
      const element = document.getElementById('debugger');
      if (element) {
        const offset = 150; // Number of pixels you want to scroll above the element
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  }, []);

  const {
    isValid,
    token,
    setToken,
    secret,
    base64Checked,
    discloseFrame,
    claims,
    header,
    encode,
    updateToken,
    verify,
    alg,
    setAlg,
    pubpriKey,
    setPubPriKey,
    setSecret,
    setBase64Checked,
  } = DebugHook();

  const [mode, setMode] = useState<ModeType>('encode');

  const switchMode = (mode: ModeType) => {
    setMode(mode);
  };

  const shareSdJwt = async () => {
    updateURLWithQuery(token, mode);
    const result = await copyCurrentURLToClipboard();
    if (result) message.success('URL is copied to your clipboard', 2);
  };

  useEffect(() => {
    // Parse the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    const modeParams = queryParams.get('mode');

    // If the "token" parameter exists, use it as the initial state
    if (tokenParam) {
      setToken(tokenParam);
    }
    if (modeParams) {
      setMode(modeParams as ModeType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="debugger-wrapper">
      <Warning />
      <Equipments
        alg={alg}
        setAlg={setAlg}
        mode={mode}
        switchMode={switchMode}
        shareSdJwt={shareSdJwt}
        verify={verify}
      />
      <div className={mode === 'encode' ? 'code-wrapper' : 'code-reverse-wrapper'}>
        <DebuggerContainer
          headerText={mode === 'encode' ? 'Encoded' : 'Encoded Result'}
          descriptionText="SD-JWT TOKEN"
          isValid={isValid || mode === 'decode'}
        >
          <JwtCode token={token} updateToken={updateToken} mode={mode} />
        </DebuggerContainer>

        <DebuggerContainer
          headerText={mode === 'decode' ? 'Decoded' : 'Decoded Result'}
          descriptionText="PAYLOAD AND SECRET"
          isValid={isValid || mode === 'encode'}
        >
          <div className="decode-area">
            <JwtHeader header={header} setHeader={encode} mode={mode} />
            <JwtPayloadSection claim={claims} disclosureFrame={discloseFrame} tabHandler={encode} mode={mode} />
            <JwtSigature
              alg={alg}
              secret={secret}
              checked={base64Checked}
              encode={encode}
              pubpriKey={pubpriKey}
              mode={mode}
              setPubPriKey={setPubPriKey}
              setSecret={setSecret}
              setBase64Checked={setBase64Checked}
            />
          </div>
        </DebuggerContainer>
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

      if (stream.eat('.') || stream.eat('~')) {
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
        return 'sdjwt-disclosure'; // No styling after the signature
      }
      return 'jwt-' + state.partParsed; // Style based on the current part
    },
    startState: function () {
      return { partParsed: null };
    },
  };
});

const JwtPayloadSection = ({ claim, disclosureFrame, tabHandler, mode }: any) => (
  <>
    {mode === 'encode' && (
      <>
        <PayloadHeader>
          <span> {'Claims'.toUpperCase()} </span>
        </PayloadHeader>
        <JwtPayload payload={claim} setPayload={tabHandler} mode={mode} type="claim" />
      </>
    )}

    {mode === 'decode' && (
      <>
        <PayloadHeader>
          <span style={{ flex: 1 }}> {'Claims'.toUpperCase()} </span>
          <span style={{ flex: 1 }}> {'Disclosure Frame'.toUpperCase()} </span>
        </PayloadHeader>
        <div style={{ display: 'flex' }}>
          <JwtPayload payload={claim} setPayload={tabHandler} mode={mode} type="claim" />
          <div
            role="presentation"
            aria-label="border"
            style={{
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          />
          <JwtPayload
            className="cm-sdjwt-disclosure"
            payload={disclosureFrame}
            setPayload={tabHandler}
            mode={mode}
            type="disclosureFrame"
          />
        </div>
      </>
    )}
  </>
);

const PayloadHeader = ({ children }: { children: ReactNode }) => (
  <div className="decode-header decode-border-top">{children}</div>
);
