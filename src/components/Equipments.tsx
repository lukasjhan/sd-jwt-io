import Button from "./common/Button";

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
    <div>
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
