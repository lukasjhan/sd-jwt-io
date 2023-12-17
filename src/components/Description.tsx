import './Description.css';

export const Description = () => {
  return (
    <div
      className="description"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '50px 0px 60px 0px',
        textAlign: 'center',
        gap: '2.5rem',
      }}
    >
      <h2>SD JWT</h2>
      <div>
        Selective Disclosure for JWTs is an method aimed at{' '}
        <span
          style={{
            color: '#6495ED',
            fontWeight: 'bold',
          }}
        >
          {'enhancing privacy '}
        </span>
        and data minimization in digital transactions.
      </div>
      <div>SD-JWT.net allows you to decode, verify and generate SD JWT.</div>
      <div className="cta-buttons">
        <div
          className="button primary"
          onClick={() => {
            window.open(
              'https://www.ietf.org/archive/id/draft-ietf-oauth-selective-disclosure-jwt-06.html',
              '_blank'
            );
          }}
        >
          {'LEARN MORE ABOUT SD JWT'}
        </div>
        <div
          className="button subdue"
          onClick={() => {
            window.location.href = window.location.origin + '/library';
          }}
        >
          {'SEE JWT LIBRARIES'}
        </div>
      </div>
    </div>
  );
};
