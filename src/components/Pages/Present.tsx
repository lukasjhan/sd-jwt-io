import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';
import { SDJWTEditor } from './Editor';
import { PresentData } from '../../hooks/hook';
import { SDJwtPresentHook } from '../../hooks/present.hook';

const Encoded = ({
  token,
  claims,
  present,
}: {
  token: string;
  claims: string;
  present: (data: PresentData) => Promise<void>;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Encoded SD-JWT
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '500px',
            height: '380px',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          <SDJWTEditor
            value={token}
            updateValue={(data: string) => {
              present({ oriToken: data });
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
        }}
      >
        Claims
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '500px',
            height: '390px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor value={claims} updateValue={() => {}} readonly={true} />
        </div>
      </div>
    </div>
  );
};

const Frame = ({ frame, present }: { frame: string; present: (data: PresentData) => Promise<void> }) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        PresentationFrame
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '400px',
            height: '810px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor
            value={frame}
            updateValue={(data: string) => {
              present({ presentationFrame: data });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const KBJWT = ({
  header,
  payload,
  priKey,
  present,
  pubpriKey,
}: {
  header: string;
  payload: string;
  priKey: string;
  present: (data: PresentData) => Promise<void>;
  pubpriKey: {
    pri: string;
    pub: string;
  };
}) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
        }}
      >
        Key Binding Header
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '300px',
            height: '100px',
          }}
        >
          <SampleEditor value={header} updateValue={() => {}} readonly={true} />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Key Binding Payload
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '300px',
            height: '435px',
          }}
        >
          <SampleEditor
            value={payload}
            updateValue={(data: string) => {
              present({ kbPayload: data });
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Key Binding Signature(Input JWK to verify)
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '300px',
            height: '200px',
          }}
        >
          <SampleEditor
            value={priKey}
            updateValue={(data: string) => {
              present({ kbpubpriKey: { pub: pubpriKey.pub, pri: data } });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Claims = ({ token }: { token: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
        }}
      >
        Presented SD-JWT
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '400px',
            height: '810px',
          }}
        >
          <SDJWTEditor value={token} updateValue={(data: string) => {}} readonly={true} />
        </div>
      </div>
    </div>
  );
};

const Present = () => {
  const { claims, token, KBpubpriKey, kbHeader, kbPayload, presentationFrame, present, presentedToken } =
    SDJwtPresentHook();
  return (
    <div style={HomeContainer}>
      <ContentWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Warning />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Encoded token={token} claims={claims} present={present} />
            <Frame frame={presentationFrame} present={present} />
            <KBJWT
              header={kbHeader}
              payload={kbPayload}
              priKey={KBpubpriKey.pri}
              present={present}
              pubpriKey={KBpubpriKey}
            />
            <Claims token={presentedToken} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Present;

const HomeContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
};
