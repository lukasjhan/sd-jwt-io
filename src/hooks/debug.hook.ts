import { useState } from 'react';
import { bufferToBase64Url, decodeBase64URL } from '../utils';
import { SDJwtInstance } from '@lukas.j.han/sd-jwt-core';
import { Signer, Verifier } from '@lukas.j.han/sd-jwt-type';
import { digest, generateSalt } from '@lukas.j.han/sd-jwt-browser-crypto';
import { message } from 'antd';

const initialSecret = 'your-256-bit-secret';

const getSigner = (secret: string): Signer => {
  return async (data: string) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(data);

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );

    const signature = await window.crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      messageData,
    );
    return bufferToBase64Url(signature);
  };
};

const getVerifier = (secret: string): Verifier => {
  return async (data: string, signature: string) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(data);
    const signatureData = Uint8Array.from(
      decodeBase64URL(signature)
        .split('')
        .map((c) => c.charCodeAt(0)),
    );

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );

    return window.crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureData,
      messageData,
    );
  };
};

const sdjwt = new SDJwtInstance({
  signer: getSigner(initialSecret),
  verifier: getVerifier(initialSecret),
  signAlg: 'HS256',
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

const initialToken =
  'eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM~WyI5NDUxZjMzN2E4ZTQ3NzU5IiwiZmlyc3RuYW1lIiwiSm9obiJd~WyI3NjQ1YjUwOTM1YjQ4ZmNjIiwiaWQiLCIxMjM0Il0~';

export const DebugHook = () => {
  const [token, setToken] = useState(initialToken);
  const [secret, setSecret] = useState(initialSecret);
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

  const encode = async () => {
    try {
      const data = JSON.parse(claims);
      const sd_Data = discloseFrame
        ? (JSON.parse(discloseFrame) as any)
        : undefined;
      console.log(data);
      sdjwt.config({
        signer: getSigner(secret),
      });
      const token = await sdjwt.issue(data, sd_Data);
      setToken(token);
      const sdJwtToken = await sdjwt.decode(token);

      setDiscolsures(JSON.stringify(sdJwtToken.disclosures, null, 2));
    } catch (e) {
      console.error(e);
      message.error('Encode Failed', 2);
    }
  };

  const decode = async () => {
    try {
      const sdJwtToken = await sdjwt.decode(token);
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
      const sig = base64Checked ? atob(secret) : secret;
      sdjwt.config({
        verifier: getVerifier(sig),
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
