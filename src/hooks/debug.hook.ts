import { useState } from 'react';
import { stringToUint8Array } from '../utils';
import sdjwt from '@hopae/sd-jwt';
import { message } from 'antd';

const initialToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6InNkK2p3dCJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbIk4yUXhZV1UxTlRnME1qQmpOR1JpWVRCaU1tRmtaamN5WXpSbFpXUmhaRGd5WkRCbE1qaGhZVGcwTnpJMU9XSXpZek5qWkdNNE1qZG1NVGN6TmpZd05RIiwiWlRSalkyUTVOemRoWkRVM05tWTFZV0UyTmpka01XVmpNRE16WXpOak5qQmtNak5pT0dZelpHSTBOelV4TURsak9EWTRNREEzWm1JeFpUY3daREZqTmciXSwiX3NkX2FsZyI6InNoYS0yNTYifQ.mX14Sw86xy8NFQta7tCfNmhVCqzfaJ_K3VEIhTjbLDY~WyJmYjlhZTU3OTMwMDE1NTA4NjY2YTQzODQwNGU1MzA1YiIsImZpcnN0bmFtZSIsIkpvaG4iXQ~WyJiOTYzMDcyNWViZjViYTE4OTc1ZWU4MWY4MWZkNTc3YyIsImlkIiwiMTIzNCJd~';

export const DebugHook = () => {
  const [token, setToken] = useState(initialToken);
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [base64Checked, setBase64Checked] = useState(false);
  const [discloseFrame, setDiscloseFrame] = useState(
    JSON.stringify(
      {
        _sd: ['firstname', 'id'],
      },
      null,
      2
    )
  );
  const [claims, setClaims] = useState(
    JSON.stringify(
      {
        firstname: 'John',
        lastname: 'Doe',
        ssn: '123-45-6789',
        id: '1234',
      },
      null,
      2
    )
  );
  const [discolsures, setDiscolsures] = useState(
    JSON.stringify(
      [
        {
          salt: 'fb9ae57930015508666a438404e5305b',
          key: 'firstname',
          value: 'John',
        },
        {
          salt: 'b9630725ebf5ba18975ee81f81fd577c',
          key: 'id',
          value: '1234',
        },
      ],
      null,
      2
    )
  );

  const [header, setHeader] = useState(
    JSON.stringify(
      {
        alg: 'HS256',
        typ: 'sd+jwt',
      },
      null,
      2
    )
  );

  const encode = async () => {
    try {
      const data = JSON.parse(claims);
      const sd_Data = discloseFrame
        ? (JSON.parse(discloseFrame) as any)
        : undefined;
      console.log(data);
      const token = await sdjwt.issue(
        data,
        stringToUint8Array(secret),
        sd_Data,
        {
          sign_alg: 'HS256',
        }
      );
      setToken(token);
      const sdJwtToken = sdjwt.decode(token);

      setDiscolsures(JSON.stringify(sdJwtToken.disclosures, null, 2));
    } catch (e) {
      console.error(e);
      message.error('Encode Failed', 2);
    }
  };

  const decode = async () => {
    try {
      const sdJwtToken = sdjwt.decode(token);
      const header = JSON.stringify(sdJwtToken.jwt?.header ?? {}, null, 2);
      const disclosures = JSON.stringify(sdJwtToken.disclosures ?? [], null, 2);
      const claims = await sdjwt.getClaims(token);

      setHeader(header);
      setDiscolsures(disclosures);
      setClaims(JSON.stringify(claims, null, 2));
      setDiscloseFrame('');
    } catch (e) {
      console.error(e);
      message.error('Decode Failed', 2);
    }
  };

  const verify = async () => {
    try {
      const sig = base64Checked
        ? stringToUint8Array(atob(secret))
        : stringToUint8Array(secret);
      const result = await sdjwt.validate(token, sig);
      if (result) {
        message.success('Verify Success', 2);
      } else {
        message.error('Verify Failed', 2);
      }
    } catch (e) {
      console.error(e);
      message.error('Verify Failed', 2);
    }
  };

  return {
    token,
    setToken,
    secret,
    setSecret,
    base64Checked,
    setBase64Checked,
    discloseFrame,
    setDiscloseFrame,
    claims,
    setClaims,
    discolsures,
    setDiscolsures,
    header,
    setHeader,
    encode,
    decode,
    verify,
  };
};
