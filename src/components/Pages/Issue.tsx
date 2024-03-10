import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';
import { SDJWTEditor } from './Editor';
import { IssueData, SDJwtHook } from '../../hooks/hook';

const JWT = ({
  header,
  payload,
  priKey,
  disclosureFrame,
  issue,
  pubpriKey,
}: {
  header: string;
  payload: string;
  priKey: string;
  disclosureFrame: string;
  issue: (updates: IssueData) => Promise<void>;
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
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Header
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '600px',
            height: '100px',
          }}
        >
          <SampleEditor
            value={header}
            updateValue={(data: string) => {
              issue({ header: data });
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ padding: '0.6rem', flex: '1', textAlign: 'center' }}>Claims</div>
        <div style={{ padding: '0.6rem', flex: '1', textAlign: 'center', borderLeft: '1px solid black' }}>
          DisclosureFrame
        </div>
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '600px',
            height: '400px',
            display: 'flex',
          }}
        >
          <div style={{ flex: '1', width: '50%', height: '100%' }}>
            <SampleEditor
              value={payload}
              updateValue={(data: string) => {
                issue({ claims: data });
              }}
            />
          </div>
          <div style={{ flex: '1', borderLeft: '1px solid black', width: '50%' }}>
            <SampleEditor
              value={disclosureFrame}
              updateValue={(data: string) => {
                issue({ disclosureFrame: data });
              }}
            />
          </div>
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
        Signature(Input JWK to sign)
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '600px',
            height: '200px',
          }}
        >
          <SampleEditor
            value={priKey}
            updateValue={(data: string) => {
              issue({ pubpriKey: { pub: pubpriKey.pub, pri: data } });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Encoded = ({ token }: { token: string }) => {
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
        Encoded SD-JWT
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '500px',
            height: '780px',
            boxSizing: 'border-box',
          }}
        >
          <SDJWTEditor value={token} updateValue={(data: string) => {}} readonly={true} />
        </div>
      </div>
    </div>
  );
};

const Issue = () => {
  const { claims, token, pubpriKey, header, discloseFrame, issue } = SDJwtHook(false);
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
            <JWT
              header={header}
              disclosureFrame={discloseFrame}
              payload={claims}
              priKey={pubpriKey.pri}
              pubpriKey={pubpriKey}
              issue={issue}
            />
            <Encoded token={token} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Issue;

const HomeContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
};
