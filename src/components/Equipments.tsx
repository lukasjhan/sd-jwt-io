import Button from './common/Button';
import { ShareAltOutlined, SwapOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SelectAlgorithm } from './SelectAlgorithm';

interface EquipmentsProps {
  mode: string;
  alg: string;
  setAlg: (value: string) => void;
  switchMode: () => void;
  shareSdJwt: () => void;
  verify: any;
}
export const Equipments = ({ mode, alg, setAlg, shareSdJwt, switchMode, verify }: EquipmentsProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      {mode === 'decode' ? (
        <SelectAlgorithm
          alg={alg}
          select={(value: string) => {
            setAlg(value);
          }}
        />
      ) : null}
      <Button onClick={switchMode}>
        <SwapOutlined />
        Toggle Mode
      </Button>

      {/* <Switch onChange={switchMode} checkedChildren="Encode" unCheckedChildren="Decode" defaultChecked /> */}

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
