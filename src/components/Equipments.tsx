import Button from "./common/Button";
import { SelectAlgorithm } from "./SelectAlgorithm";

interface EquipmentsProps {
  mode: string;
  encodeClaim: () => void;
  decodeJwt: () => void;
  shareSdJwt: () => void;
}
export const Equipments = ({
  mode,
  encodeClaim,
  decodeJwt,
  shareSdJwt,
}: EquipmentsProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <SelectAlgorithm />
      <Button
        onClick={mode === "encode" ? () => decodeJwt() : () => encodeClaim()}
      >
        {mode === "encode" ? "Decode SD JWT" : "Encode SD JWT"}
      </Button>

      <Button
        onClick={shareSdJwt}
        className="subdue"
        style={{ background: "transparent" }}
      >
        Share SD JWT
      </Button>
    </div>
  );
};
