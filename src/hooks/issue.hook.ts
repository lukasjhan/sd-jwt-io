import { useEffect, useState } from 'react';
import { SDJwtInstance } from '@sd-jwt/core';
import { digest, generateSalt, ES256 } from '@sd-jwt/crypto-browser';
import { IssueData, initialPubPriKey, initialTokenWithNoKB } from './hook';

const sdjwt = new SDJwtInstance({
  signAlg: ES256.alg,
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

export const SDJwtIssueHook = () => {
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(initialTokenWithNoKB);
  const [pubpriKey, setPubPriKey] = useState(initialPubPriKey);

  const [discloseFrame, setDiscloseFrame] = useState(
    JSON.stringify(
      {
        _sd: ['firstname', 'lastname', 'ssn'],
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

  const issue = async (updates: IssueData) => {
    if (updates.header !== undefined) {
      setHeader(updates.header);
    }

    if (updates.claims !== undefined) {
      setClaims(updates.claims);
    }

    if (updates.disclosureFrame !== undefined) {
      setDiscloseFrame(updates.disclosureFrame);
    }

    if (updates.pubpriKey !== undefined) {
      setPubPriKey(updates.pubpriKey);
    }
  };

  useEffect(() => {
    const handleIssue = async () => {
      const key = JSON.parse(pubpriKey.pri);
      const protectedHeader = JSON.parse(header);
      const data = JSON.parse(claims);
      const sd_Data = discloseFrame ? (JSON.parse(discloseFrame) as any) : undefined;

      const signer = await ES256.getSigner(key);
      sdjwt.config({
        signer,
      });
      const token = await sdjwt.issue(data, sd_Data, { header: protectedHeader });
      setToken(token);
      setIsValid(true);
    };

    handleIssue();
  }, [claims, header, discloseFrame, pubpriKey]);

  return {
    isValid,
    token,
    pubpriKey,
    discloseFrame,
    claims,
    header,
    issue,
  };
};
