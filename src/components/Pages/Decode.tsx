import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';

const Encoeded = () => {
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
            height: '825px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const JWT = () => {
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
            height: '150px',
          }}
        >
          <SampleEditor />
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
            <SampleEditor />
          </div>
          <div style={{ flex: '1', borderLeft: '1px solid black', width: '50%' }}>
            <SampleEditor />
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
        Signature(Input key to verify)
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '600px',
            height: '200px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const KBJWT = () => {
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
            height: '150px',
          }}
        >
          <SampleEditor />
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
          <SampleEditor />
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
        Key Binding Signature(Input key to verify)
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '300px',
            height: '200px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const Claims = () => {
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
            height: '825px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const Decode = () => {
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
              alignItems: 'flex-start',
            }}
          >
            <Encoeded />
            <JWT />
            <KBJWT />
            <Claims />
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
