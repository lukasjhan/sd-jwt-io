import { Alert } from 'antd';

export const Warning = () => {
  return (
    <Alert
      style={{
        width: '100%',
        maxWidth: '1200px',
      }}
      showIcon
      message="SD-JWTs are credentials, which might have personal data. Be careful where you paste them! We do not record tokens, all validation and debugging is done on the client side."
      type="warning"
    />
  );
};
