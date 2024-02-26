import Button from "./common/Button";
import { SelectAlgorithm } from "./SelectAlgorithm";

interface EquipmentsProps {
  mode: string;
  switchMode: () => void;
  shareSdJwt: () => void;
  verify: any;
}
export const Equipments = ({
  shareSdJwt,
  switchMode,
  verify,
}: EquipmentsProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <SelectAlgorithm />
      <Button onClick={switchMode}>Toggle Mode</Button>

      <Button
        onClick={shareSdJwt}
        className="subdue"
        style={{ background: "transparent" }}
      >
        Share
      </Button>
      <Button onClick={verify}>Verify Signature</Button>
    </div>
  );
};
