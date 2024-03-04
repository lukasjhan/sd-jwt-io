import Button from './common/Button';
import { ShareAltOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SelectAlgorithm } from './SelectAlgorithm';
import { Radio, RadioChangeEvent } from 'antd';
import { ModeType } from './Debugger';
import { DECODED, ENCODED } from './Debugger';
interface EquipmentsProps {
  mode: string;
  alg: string;
  setAlg: (value: string) => void;
  switchMode: (mode: ModeType) => void;
  shareSdJwt: () => void;
  verify: any;
}
export const Equipments = ({ mode, alg, setAlg, shareSdJwt, switchMode, verify }: EquipmentsProps) => {
  const handleModeChange = (e: RadioChangeEvent) => {
    switchMode(e.target.value);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      {mode === DECODED ? (
        <SelectAlgorithm
          alg={alg}
          select={(value: string) => {
            setAlg(value);
          }}
        />
      ) : null}
      <Radio.Group onChange={handleModeChange} value={mode} style={{ padding: '0 6px' }}>
        <Radio.Button value={ENCODED}>Encode</Radio.Button>
        <Radio.Button value={DECODED}>Decode</Radio.Button>
      </Radio.Group>

      <Button onClick={verify} icon={<CheckCircleOutlined />}>
        Verify Signature
      </Button>
      <Button
        type="primary"
        onClick={shareSdJwt}
        icon={<ShareAltOutlined />}
        className="subdue"
        style={{ background: 'transparent' }}
      >
        Share
      </Button>
    </div>
  );
};
