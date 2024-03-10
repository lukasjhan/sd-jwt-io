import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';
import { SDJWTEditor } from './Editor';

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
          <SampleEditor value="" updateValue={() => {}} />
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
        <div style={{ padding: '0.6rem', flex: '1', textAlign: 'center' }}>Payload</div>
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
            <SampleEditor value="" updateValue={() => {}} />
          </div>
          <div style={{ flex: '1', borderLeft: '1px solid black', width: '50%' }}>
            <SampleEditor value="" updateValue={() => {}} />
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
          <SampleEditor value="" updateValue={() => {}} />
        </div>
      </div>
    </div>
  );
};

const Encoded = () => {
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
          <SDJWTEditor value="" updateValue={(data: string) => {}} />
        </div>
      </div>
    </div>
  );
};

const Issue = () => {
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
            <JWT />
            <Encoded />
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
