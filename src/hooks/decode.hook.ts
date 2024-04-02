import { useState } from 'react';
import { SDJwtInstance } from '@sd-jwt/core';
import { digest, generateSalt, ES256 } from '@sd-jwt/crypto-browser';
import { message } from 'antd';
import { Disclosures, initialPubPriKey, initialToken, processDisclosures } from './hook';

const sdjwt = new SDJwtInstance({
  signAlg: ES256.alg,
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

export const SDJwtDecodeHook = () => {
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(initialToken);
  const [pubpriKey, setPubPriKey] = useState(initialPubPriKey);
  const [payload, setPayload] = useState(
    JSON.stringify(
      {
        id: '1234',
        _sd: [
          'bDTRvm5-Yn-HG7cqpVR5OVRIXsSaBk57JgiOq_j1VI4',
          'et3UfRylwVrfXdPKzg79hcjD1ItzoQ9oBoXRGtMosFk',
          'zWfZNS19AtbRSTbo7sJRn0BZQvWRdchoC7UZabFrjY8',
        ],
        _sd_alg: 'sha-256',
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
  const [disclosures, setDiscolsures] = useState<Disclosures[]>([
    {
      _digest: 'et3UfRylwVrfXdPKzg79hcjD1ItzoQ9oBoXRGtMosFk',
      _encoded: 'WyI1ZWI4Yzg2MjM0MDJjZjJlIiwiZmlyc3RuYW1lIiwiSm9obiJd',
      salt: '5eb8c8623402cf2e',
      key: 'firstname',
      value: 'John',
    },
    {
      _digest: 'zWfZNS19AtbRSTbo7sJRn0BZQvWRdchoC7UZabFrjY8',
      _encoded: 'WyJjNWMzMWY2ZWYzNTg4MWJjIiwibGFzdG5hbWUiLCJEb2UiXQ',
      salt: 'c5c31f6ef35881bc',
      key: 'lastname',
      value: 'Doe',
    },
    {
      _digest: 'bDTRvm5-Yn-HG7cqpVR5OVRIXsSaBk57JgiOq_j1VI4',
      _encoded: 'WyJmYTlkYTUzZWJjOTk3OThlIiwic3NuIiwiMTIzLTQ1LTY3ODkiXQ',
      salt: 'fa9da53ebc99798e',
      key: 'ssn',
      value: '123-45-6789',
    },
  ]);

  const [header, setHeader] = useState(
    JSON.stringify(
      {
        alg: 'ES256',
        typ: 'sd+jwt',
      },
      null,
      2,
    ),
  );

  const [kbHeader, setKBHeader] = useState(
    JSON.stringify(
      {
        typ: 'kb+jwt',
        alg: 'ES256',
      },
      null,
      2,
    ),
  );

  const [kbPayload, setKBPayload] = useState(
    JSON.stringify(
      {
        iat: 1710069722,
        aud: 'did:example:123',
        nonce: 'k8vdf0nd6',
        sd_hash: '_-NbVK3fs9wW3Gh3NRKR4Ku6fC1L37Dv0Q_jPWwJiFE',
      },
      null,
      2,
    ),
  );

  const [KBpubpriKey, setKBPubPriKey] = useState(initialPubPriKey);

  const decode = async (token: string) => {
    try {
      const sdJwtToken = await sdjwt.decode(token);
      const header = sdJwtToken.jwt?.header ? JSON.stringify(sdJwtToken.jwt?.header, null, 2) : '';
      const payload = sdJwtToken.jwt?.payload ? JSON.stringify(sdJwtToken.jwt?.payload, null, 2) : '';
      const disclosureData = await processDisclosures(sdJwtToken.disclosures);

      const claims = await sdjwt.getClaims(token);

      const kbHeader = sdJwtToken.kbJwt?.header ? JSON.stringify(sdJwtToken.kbJwt?.header, null, 2) : '';
      const kbPayload = sdJwtToken.kbJwt?.payload ? JSON.stringify(sdJwtToken.kbJwt?.payload, null, 2) : '';

      setHeader(header);
      setPayload(payload);
      setDiscolsures(disclosureData);
      setClaims(JSON.stringify(claims, null, 2));
      setKBHeader(kbHeader);
      setKBPayload(kbPayload);
      setIsValid(true);
    } catch (e) {
      console.error(e);
      setHeader('');
      setClaims('');
      setDiscolsures([]);
      setKBHeader('');
      setKBPayload('');
      setPayload('');
      setIsValid(false);
    }
  };

  const updateToken = async (token: string) => {
    const trimedToken = token.replace(/\s/g, '');
    setToken(trimedToken);
    decode(trimedToken);
  };

  const verify = async () => {
    try {
      const key = JSON.parse(pubpriKey.pub);
      const verifier = await ES256.getVerifier(key);
      const kbVerifier = !!kbPayload ? await ES256.getVerifier(JSON.parse(KBpubpriKey.pub)) : undefined;
      sdjwt.config({
        verifier,
        kbVerifier,
      });
      const result = await sdjwt.verify(token, undefined, !!kbVerifier);
      if (result) {
        message.success('Verify Success', 2);
      } else {
        message.error('Verify Failed', 2);
      }
    } catch (e: any) {
      console.error(e.message);
      message.error(`${e.message}`, 2);
    }
  };

  return {
    isValid,
    token,
    pubpriKey,
    setPubPriKey,
    claims,
    disclosures,
    header,
    verify,
    kbHeader,
    kbPayload,
    KBpubpriKey,
    setKBPubPriKey,
    payload,
    updateToken,
  };
};
