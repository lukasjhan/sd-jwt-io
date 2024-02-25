import Button from "./common/Button";

interface EquipmentsProps {
  isEcoded: boolean;
  encodeClaim: () => void;
  decodeJwt: () => void;
  shareSdJwt: () => void;
}
export const Equipments = ({
  isEcoded,
  encodeClaim,
  decodeJwt,
  shareSdJwt,
}: EquipmentsProps) => {
  return (
    <div>
      <Button onClick={isEcoded ? () => decodeJwt() : () => encodeClaim()}>
        {isEcoded ? "Decode SD JWT" : "Encode SD JWT"}
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
