import Button from "./common/Button";

export const Equipments = ({
  isEcode,
  encodeClaim,
  decodeJwt,
  shareSdJwt,
}: any) => {
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
