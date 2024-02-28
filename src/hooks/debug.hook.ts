import { useState } from 'react';
import { SDJwtInstance } from '@sd-jwt/core';
import { digest, generateSalt, ES256 } from '@sd-jwt/crypto-browser';
import { message } from 'antd';
import { HS256 } from '../alg/hs256';

export type UpdateEncode = {
  header?: string;
  claims?: string;
  secret?: string;
  alg?: string;
  b64checked?: boolean;
  disclosureFrame?: string;
  pubpriKey?: { pri: string; pub: string };
};

const initialSecret = 'your-256-bit-secret';

const sdjwt = new SDJwtInstance({
  signer: HS256.getSigner(initialSecret),
  verifier: HS256.getVerifier(initialSecret),
  signAlg: HS256.alg,
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

const initialToken =
  'eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM~WyI5NDUxZjMzN2E4ZTQ3NzU5IiwiZmlyc3RuYW1lIiwiSm9obiJd~WyI3NjQ1YjUwOTM1YjQ4ZmNjIiwiaWQiLCIxMjM0Il0~';

const getSignerByAlg = (alg: string) => {
  switch (alg) {
    case 'HS256':
      return HS256.getSigner;
    case 'ES256':
      return (jwk: string) => {
        try {
          const key = JSON.parse(jwk);
          return ES256.getSigner(key);
        } catch (e) {
          console.error(e);
          throw new Error('Invalid JWK');
        }
      };
    default:
      throw new Error('Invalid Algorithm');
  }
};

const getVerifierByAlg = (alg: string) => {
  switch (alg) {
    case 'HS256':
      return HS256.getVerifier;
    case 'ES256':
      return (jwk: string) => {
        try {
          const key = JSON.parse(jwk);
          return ES256.getVerifier(key);
        } catch (e) {
          console.error(e);
          throw new Error('Invalid JWK');
        }
      };
    default:
      throw new Error('Invalid Algorithm');
  }
};

ES256.generateKeyPair().then((a) => console.log(a));

const initialPubPriKey = {
  pri: JSON.stringify(
    {
      crv: 'P-256',
      d: 'SU7I_ZZ1BgFUVusIFcMjmTIAXFuEIO-YLcpuYx6jSG4',
      kty: 'EC',
      x: 'h29tWfkCJ73nJbP51C4SotdI0CuttfQS3Svt0se6gFU',
      y: 'mBavlbiJLFhGsuIJRz7wYLiW15gpiWEDLjE1gfVh_7k',
    },
    null,
    2,
  ),
  pub: JSON.stringify(
    {
      crv: 'P-256',
      kty: 'EC',
      x: 'h29tWfkCJ73nJbP51C4SotdI0CuttfQS3Svt0se6gFU',
      y: 'mBavlbiJLFhGsuIJRz7wYLiW15gpiWEDLjE1gfVh_7k',
    },
    null,
    2,
  ),
};

function getKey(alg: string, secret: string, b64checked: boolean, privateKey: string) {
  if (alg === 'HS256') {
    return b64checked ? atob(secret) : secret;
  } else if (alg === 'ES256') {
    return privateKey;
  }

  throw new Error(`Invalid Algorithm ${alg}`);
}

export const DebugHook = () => {
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(initialToken);
  const [alg, setAlg] = useState(HS256.alg);
  const [secret, setSecret] = useState(initialSecret);
  const [pubpriKey, setPubPriKey] = useState(initialPubPriKey);
  const [base64Checked, setBase64Checked] = useState(false);
  const [discloseFrame, setDiscloseFrame] = useState(
    JSON.stringify(
      {
        _sd: ['firstname', 'id'],
      },
      null,
      2,
    ),
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
      2,
    ),
  );
  const [discolsures, setDiscolsures] = useState(
    JSON.stringify(
      [
        {
          salt: '9451f337a8e47759',
          key: 'firstname',
          value: 'John',
        },
        {
          salt: '7645b50935b48fcc',
          key: 'id',
          value: '1234',
        },
      ],
      null,
      2,
    ),
  );

  const [header, setHeader] = useState(
    JSON.stringify(
      {
        alg: 'HS256',
        typ: 'sd+jwt',
      },
      null,
      2,
    ),
  );

  const encode = async (updates: UpdateEncode) => {
    const encodingHeader = updates.header ?? header;
    const encodingClaims = updates.claims ?? claims;
    const encodingSecret = updates.secret ?? secret;
    const encodingAlg = updates.alg ?? alg;
    const encodingBase64Checked = updates.b64checked ?? base64Checked;
    const encodingDisclosureFrame = updates.disclosureFrame ?? discloseFrame;
    const encodingPubPriKey = updates.pubpriKey ?? pubpriKey;

    if (updates.header !== undefined) {
      setHeader(encodingHeader);
    }

    if (updates.claims !== undefined) {
      setClaims(encodingClaims);
    }

    if (updates.secret !== undefined) {
      setSecret(encodingSecret);
    }

    if (updates.alg !== undefined) {
      setAlg(encodingAlg);
    }

    if (updates.b64checked !== undefined) {
      setBase64Checked(encodingBase64Checked);
    }

    if (updates.disclosureFrame !== undefined) {
      setDiscloseFrame(encodingDisclosureFrame);
    }

    if (updates.pubpriKey !== undefined) {
      setPubPriKey(updates.pubpriKey);
    }

    try {
      const key = getKey(encodingAlg, encodingSecret, encodingBase64Checked, encodingPubPriKey.pri);
      const protectedHeader = JSON.parse(encodingHeader);
      const data = JSON.parse(encodingClaims);
      const sd_Data = encodingDisclosureFrame ? (JSON.parse(encodingDisclosureFrame) as any) : undefined;

      const getSigner = getSignerByAlg(encodingAlg);
      const signer = await getSigner(key);
      sdjwt.config({
        signer,
      });
      const token = await sdjwt.issue(data, sd_Data, { header: protectedHeader });
      setToken(token);
      const sdJwtToken = await sdjwt.decode(token);

      setDiscolsures(JSON.stringify(sdJwtToken.disclosures, null, 2));
      setIsValid(true);
    } catch (e) {
      console.error(e);
      setToken('');
      setIsValid(false);
    }
  };

  const decode = async (token: string) => {
    try {
      const sdJwtToken = await sdjwt.decode(token);
      const header = JSON.stringify(sdJwtToken.jwt?.header ?? {}, null, 2);
      const disclosures = JSON.stringify(sdJwtToken.disclosures ?? [], null, 2);
      const claims = await sdjwt.getClaims(token);

      setHeader(header);
      setDiscolsures(disclosures);
      setClaims(JSON.stringify(claims, null, 2));
      setDiscloseFrame('');
      setIsValid(true);
    } catch (e) {
      console.error(e);
      setHeader('');
      setDiscloseFrame('');
      setClaims('');
      setDiscolsures('');
      setIsValid(false);
    }
  };

  const updateToken = async (token: string) => {
    setToken(token);
    decode(token);
  };

  const verify = async () => {
    try {
      const key = getKey(alg, secret, base64Checked, pubpriKey.pub);
      const getVerifier = getVerifierByAlg(alg);
      const verifier = await getVerifier(key);
      sdjwt.config({
        verifier,
      });
      const result = await sdjwt.validate(token);
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

  const switchAlg = (alg: string) => {
    setAlg(alg);
    const header = JSON.stringify(
      {
        alg,
        typ: 'sd+jwt',
      },
      null,
      2,
    );
    encode({ header, alg });
  };

  return {
    isValid,
    token,
    setToken,
    secret,
    setSecret,
    pubpriKey,
    setPubPriKey,
    alg,
    setAlg: switchAlg,
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
    updateToken,
    verify,
  };
};
