export const Warning = () => {
  return (
    <div className="debugger-warning">
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {'Warning: '}
      </span>
      {
        'SD JWTs are credentials, which might have personal data. Be careful where you paste them! We do not record tokens, all validation and debugging is done on the client side.'
      }
    </div>
  );
};
