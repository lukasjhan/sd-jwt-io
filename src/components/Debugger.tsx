import { message } from 'antd';
import CodeMirror from 'codemirror';
import { ReactNode, useEffect, useState } from 'react';
import { copyCurrentURLToClipboard, updateURLWithQuery } from '../utils';
import { DebugHook } from '../hooks/debug.hook';
import { JwtCode, JwtHeader, JwtPayload, JwtSigature, Warning } from './index';
import './Debugger.css';
import { DebuggerContainer } from './DebuggerContainer';
import { Equipments } from './Equipments';

const CLAIM = 'claim';
const DISCLOSE_FRAME = 'discloseFrame';

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

  const {
    token,
    setToken,
    secret,
    setSecret,
    base64Checked,
    setBase64Checked,
    discloseFrame,
    setDiscloseFrame,
    claims,
    setClaims,
    discolsures,
    setDiscolsures,
    header,
    setHeader,
    encode,
    decode,
    updateToken,
    verify,
  } = DebugHook();

  type TabType = 'claim' | 'discloseFrame' | 'discolsures';
  type ModeType = 'encode' | 'decode';

  const [tab, setTab] = useState<TabType>('claim');
  const [mode, setMode] = useState<ModeType>('decode');

  const swtichMode = () => {
    if (mode === 'encode') {
      setMode('decode');
      return;
    }

    setMode('encode');
  };

  const shareSdJwt = async () => {
    updateURLWithQuery(token, mode);
    const result = await copyCurrentURLToClipboard();
    if (result) message.success('URL is copied to your clipboard', 2);
  };

  const tabValue = {
    claim: claims,
    discloseFrame: discloseFrame,
    discolsures: discolsures,
  };

  const tabHandler = {
    claim: setClaims,
    discloseFrame: setDiscloseFrame,
    discolsures: setDiscolsures,
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
      <div className="debugger-title" id="debugger">
        Debugger
      </div>
      <Warning />
      <Equipments
        mode={mode}
        switchMode={swtichMode}
        shareSdJwt={shareSdJwt}
        verify={verify}
      />
      <div
        className={mode === 'encode' ? 'code-wrapper' : 'code-reverse-wrapper'}
      >
        <DebuggerContainer headerText="Encoded">
          <JwtCode token={token} updateToken={updateToken} mode={mode} />
        </DebuggerContainer>

        <DebuggerContainer headerText="Decoded">
          <div className="decode-area">
            <JwtHeader
              header={header}
              setHeader={setHeader}
              mode={mode}
              encode={encode}
            />
            <JwtPayloadSection
              tabValue={tabValue}
              tabHandler={tabHandler}
              mode={mode}
              encode={encode}
            />
            <JwtSigature
              mode={mode}
              secret={secret}
              setSecret={setSecret}
              checked={base64Checked}
              setChecked={setBase64Checked}
              encode={encode}
            />
          </div>
        </DebuggerContainer>
      </div>
    </div>
  );
};

interface TabProps {
  tab: string;
  setTab: React.Dispatch<
    React.SetStateAction<'claim' | 'discloseFrame' | 'discolsures'>
  >;
}

CodeMirror.defineMode('jwt', function () {
  console.log('jwt code Mirror');
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

const JwtPayloadSection = ({ tabValue, tabHandler, mode, encode }: any) => (
  <>
    {mode === 'encode' && (
      <>
        <PayloadHeader>
          <span> Climas </span>
        </PayloadHeader>
        <JwtPayload
          payload={tabValue[CLAIM]}
          setPayload={tabHandler[CLAIM]}
          mode={mode}
          encode={encode}
        />
      </>
    )}

    {mode === 'decode' && (
      <>
        <PayloadHeader>
          <span style={{ flex: 1 }}> Claims </span>
          <span style={{ flex: 1 }}> Disclose Frame </span>
        </PayloadHeader>
        <div style={{ display: 'flex' }}>
          <JwtPayload
            payload={tabValue[CLAIM]}
            setPayload={tabHandler[CLAIM]}
            mode={mode}
            encode={encode}
          />
          <JwtPayload
            payload={tabValue[DISCLOSE_FRAME]}
            setPayload={tabHandler[DISCLOSE_FRAME]}
            mode={mode}
            encode={encode}
          />
        </div>
      </>
    )}
  </>
);

const PayloadHeader = ({ children }: { children: ReactNode }) => (
  <div className="decode-header decode-border-top">{children}</div>
);
