export const ContentWrapper = ({
  children,
  style,
}: {
  children: JSX.Element;
  style?: any;
}) => (
  <div
    style={{
      width: '100%',
      ...style,
    }}
  >
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.25rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  </div>
);
