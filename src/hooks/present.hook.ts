import { useEffect, useState } from 'react';
import { SDJwtInstance } from '@sd-jwt/core';
import { digest, generateSalt, ES256 } from '@sd-jwt/crypto-browser';
import { PresentData, initialPubPriKey, initialToken, initialTokenWithNoKB } from './hook';

const sdjwt = new SDJwtInstance({
  signAlg: ES256.alg,
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

export const SDJwtPresentHook = () => {
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(initialTokenWithNoKB);
  const [presentedToken, setPresentedToken] = useState(initialToken);

  const [presentationFrame, setPresentationFrame] = useState(
    JSON.stringify(
      {
        firstname: true,
        lastname: true,
        ssn: true,
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
  const kbHeader = JSON.stringify(
    {
      typ: 'kb+jwt',
      alg: 'ES256',
    },
    null,
    2,
  );

  const [kbPayload, setKBPayload] = useState(
    JSON.stringify(
      {
        iat: 1710069722,
        aud: 'did:example:123',
        nonce: 'k8vdf0nd6',
      },
      null,
      2,
    ),
  );

  const [KBpubpriKey, setKBPubPriKey] = useState(initialPubPriKey);

  const present = async (data: PresentData) => {
    if (data.oriToken !== undefined) {
      setToken(data.oriToken);
      try {
        const claims = await sdjwt.getClaims(data.oriToken);
        setClaims(JSON.stringify(claims, null, 2));
      } catch (e) {
        console.error(e);
        setClaims('');
      }
    }

    if (data.presentationFrame !== undefined) {
      setPresentationFrame(data.presentationFrame);
    }

    if (data.kbpubpriKey !== undefined) {
      setKBPubPriKey(data.kbpubpriKey);
    }

    if (data.kbPayload !== undefined) {
      setKBPayload(data.kbPayload);
    }
  };

  useEffect(() => {
    const handlePresent = async () => {
      try {
        const kb = !!kbPayload ? JSON.parse(kbPayload) : undefined;
        if (kb) {
          sdjwt.config({
            kbSignAlg: ES256.alg,
            kbSigner: await ES256.getSigner(JSON.parse(KBpubpriKey.pri)),
          });
        }

        const newPresentedToken = await sdjwt.present(token, JSON.parse(presentationFrame), {
          kb: kb ? { payload: kb } : undefined,
        });
        setPresentedToken(newPresentedToken);
      } catch (e) {
        console.error(e);
        setPresentedToken('');
        setIsValid(false);
      }
    };

    handlePresent();
  }, [token, presentationFrame, KBpubpriKey, kbPayload]);

  return {
    isValid,
    token,
    claims,
    kbHeader,
    kbPayload,
    KBpubpriKey,
    presentationFrame,
    present,
    presentedToken,
  };
};
