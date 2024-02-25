import Button from "./common/Button";

interface EquipmentsProps {
  isEcode: boolean;
  encodeClaim: () => void;
  decodeJwt: () => void;
  shareSdJwt: () => void;
}
export const Equipments = ({
  isEcode,
  encodeClaim,
  decodeJwt,
  shareSdJwt,
}: EquipmentsProps) => {
  return (
    <div>
      <Button onClick={isEcode ? () => encodeClaim() : () => decodeJwt()}>
        {isEcode ? "Decode SD JWT" : "Encode SD JWT"}
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
