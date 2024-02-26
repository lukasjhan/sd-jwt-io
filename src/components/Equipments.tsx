import Button from './common/Button';
import { SelectAlgorithm } from './SelectAlgorithm';

interface EquipmentsProps {
  mode: string;
  alg: string;
  setAlg: (value: string) => void;
  switchMode: () => void;
  shareSdJwt: () => void;
  verify: any;
}
export const Equipments = ({ alg, setAlg, shareSdJwt, switchMode, verify }: EquipmentsProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <SelectAlgorithm
        alg={alg}
        select={(value: string) => {
          console.log(value);
          setAlg(value);
        }}
      />
      <Button onClick={switchMode}>Toggle Mode</Button>

      <Button onClick={shareSdJwt} className="subdue" style={{ background: 'transparent' }}>
        Share
      </Button>
      <Button onClick={verify}>Verify Signature</Button>
    </div>
  );
};
