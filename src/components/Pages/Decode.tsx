import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';
import Button from '../common/Button';
import { CheckCircleOutlined } from '@ant-design/icons';
import { SDJWTEditor } from './Editor';
import { Disclosures } from '../../hooks/hook';
import { SDJwtDecodeHook } from '../../hooks/decode.hook';
import { trackButtonClick } from '../../hooks/ga.hooks';

const Encoded = ({ token, updateToken }: { token: string; updateToken: (data: string) => void }) => {
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
            width: '500px',
            height: '780px',
            boxSizing: 'border-box',
          }}
        >
          <SDJWTEditor value={token} updateValue={updateToken} />
        </div>
      </div>
    </div>
  );
};

const DisclosuresTable = ({ disclosures }: { disclosures: Disclosures[] }) => {
  return (
    <div
      style={{
        overflow: 'auto',
        height: '100%',
      }}
    >
      {disclosures.map((disclosure, index) => {
        const value =
          typeof disclosure.value === 'string' ? disclosure.value : JSON.stringify(disclosure.value, null, 2);
        return (
          <div
            key={index}
            style={{
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.6rem',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div>
              <span>Salt: </span>
              <span>{disclosure.salt}</span>
            </div>
            <div>
              <span>Key: </span>
              <span>{disclosure.key}</span>
            </div>
            <div>
              <span>Value: </span>
              <span>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const JWT = ({
  header,
  payload,
  pubKey,
  setPubPriKey,
  disclosures,
}: {
  header: string;
  payload: string;
  pubKey: string;
  setPubPriKey: React.Dispatch<
    React.SetStateAction<{
      pri: string;
      pub: string;
    }>
  >;
  disclosures: Disclosures[];
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
      <div style={{ padding: '0.6rem' }}>Header</div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '600px',
            height: '100px',
          }}
        >
          <SampleEditor value={header} updateValue={() => {}} readonly={true} />
        </div>
      </div>
      <div style={{ display: 'flex', position: 'relative', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ padding: '0.6rem', flex: '1', textAlign: 'center' }}>Payload</div>
        <div style={{ padding: '0.6rem', flex: '1', textAlign: 'center', borderLeft: '1px solid black' }}>
          Disclosure
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
            <SampleEditor value={payload} updateValue={() => {}} readonly={true} />
          </div>
          <div style={{ flex: '1', borderLeft: '1px solid black', width: '50%', position: 'relative' }}>
            <DisclosuresTable disclosures={disclosures} />
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
        Signature(Input JWK to verify)
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
            value={pubKey}
            updateValue={(data: string) => {
              setPubPriKey((prev) => ({ ...prev, pub: data }));
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
  pubKey,
  setPubPriKey,
}: {
  header: string;
  payload: string;
  pubKey: string;
  setPubPriKey: React.Dispatch<
    React.SetStateAction<{
      pri: string;
      pub: string;
    }>
  >;
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
      <div style={{ padding: '0.6rem' }}>Key Binding Header</div>
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
      <div style={{ padding: '0.6rem' }}>Key Binding Payload</div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '300px',
            height: '400px',
          }}
        >
          <SampleEditor value={payload} updateValue={() => {}} readonly={true} />
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
            value={pubKey}
            updateValue={(data: string) => {
              setPubPriKey((prev) => ({ ...prev, pub: data }));
            }}
            readonly={!payload}
          />
        </div>
      </div>
    </div>
  );
};

const Claims = ({ claims }: { claims: string }) => {
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
        Claims
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '400px',
            height: '780px',
          }}
        >
          <SampleEditor value={claims} updateValue={() => {}} readonly={true} />
        </div>
      </div>
    </div>
  );
};

const Decode = () => {
  const {
    claims,
    token,
    updateToken,
    pubpriKey,
    disclosures,
    header,
    verify,
    payload,
    kbHeader,
    kbPayload,
    KBpubpriKey,
    setPubPriKey,
    setKBPubPriKey,
  } = SDJwtDecodeHook();
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
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => {
                verify();
                trackButtonClick('Verify Button');
              }}
              icon={<CheckCircleOutlined />}
            >
              {'Verify SD-JWT'}
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            <Encoded token={token} updateToken={updateToken} />
            <JWT
              header={header}
              payload={payload}
              pubKey={pubpriKey.pub}
              disclosures={disclosures}
              setPubPriKey={setPubPriKey}
            />
            <KBJWT header={kbHeader} payload={kbPayload} pubKey={KBpubpriKey.pub} setPubPriKey={setKBPubPriKey} />
            <Claims claims={claims} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Decode;

const HomeContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
};
