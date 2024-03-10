import { useState } from 'react';
import { SDJwtInstance } from '@sd-jwt/core';
import { digest, generateSalt, ES256 } from '@sd-jwt/crypto-browser';
import { Disclosure } from '@sd-jwt/utils';
import { message } from 'antd';

export type IssueData = {
  header?: string;
  claims?: string;
  disclosureFrame?: string;
  pubpriKey?: { pri: string; pub: string };
};

export type Disclosures = {
  _digest: string;
  _encoded: string;
  salt: string;
  key: string | undefined;
  value: string;
};

async function processDisclosures(disclosure: Disclosure[] | undefined) {
  if (!disclosure) {
    return [];
  }

  const ret: Disclosures[] = [];

  for (const d of disclosure) {
    ret.push({
      _digest: await d.digest({ hasher: digest, alg: 'sha-256' }),
      _encoded: d.encode(),
      salt: d.salt,
      key: d.key,
      value: d.value as string,
    });
  }
  return ret;
}

const sdjwt = new SDJwtInstance({
  signAlg: ES256.alg,
  hasher: digest,
  hashAlg: 'SHA-256',
  saltGenerator: generateSalt,
});

const initialToken =
  'eyJ0eXAiOiJzZCtqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpZCI6IjEyMzQiLCJfc2QiOlsiYkRUUnZtNS1Zbi1IRzdjcXBWUjVPVlJJWHNTYUJrNTdKZ2lPcV9qMVZJNCIsImV0M1VmUnlsd1ZyZlhkUEt6Zzc5aGNqRDFJdHpvUTlvQm9YUkd0TW9zRmsiLCJ6V2ZaTlMxOUF0YlJTVGJvN3NKUm4wQlpRdldSZGNob0M3VVphYkZyalk4Il0sIl9zZF9hbGciOiJzaGEtMjU2In0.n27NCtnuwytlBYtUNjgkesDP_7gN7bhaLhWNL4SWT6MaHsOjZ2ZMp987GgQRL6ZkLbJ7Cd3hlePHS84GBXPuvg~WyI1ZWI4Yzg2MjM0MDJjZjJlIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyJjNWMzMWY2ZWYzNTg4MWJjIiwibGFzdG5hbWUiLCJEb2UiXQ~WyJmYTlkYTUzZWJjOTk3OThlIiwic3NuIiwiMTIzLTQ1LTY3ODkiXQ~eyJ0eXAiOiJrYitqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpYXQiOjE3MTAwNjk3MjIsImF1ZCI6ImRpZDpleGFtcGxlOjEyMyIsIm5vbmNlIjoiazh2ZGYwbmQ2Iiwic2RfaGFzaCI6Il8tTmJWSzNmczl3VzNHaDNOUktSNEt1NmZDMUwzN0R2MFFfalBXd0ppRkUifQ.pqw2OB5IA5ya9Mxf60hE3nr2gsJEIoIlnuCa4qIisijHbwg3WzTDFmW2SuNvK_ORN0WU6RoGbJx5uYZh8k4EbA';

const initialTokenWithNoKB =
  'eyJ0eXAiOiJzZCtqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpZCI6IjEyMzQiLCJfc2QiOlsiYkRUUnZtNS1Zbi1IRzdjcXBWUjVPVlJJWHNTYUJrNTdKZ2lPcV9qMVZJNCIsImV0M1VmUnlsd1ZyZlhkUEt6Zzc5aGNqRDFJdHpvUTlvQm9YUkd0TW9zRmsiLCJ6V2ZaTlMxOUF0YlJTVGJvN3NKUm4wQlpRdldSZGNob0M3VVphYkZyalk4Il0sIl9zZF9hbGciOiJzaGEtMjU2In0.n27NCtnuwytlBYtUNjgkesDP_7gN7bhaLhWNL4SWT6MaHsOjZ2ZMp987GgQRL6ZkLbJ7Cd3hlePHS84GBXPuvg~WyI1ZWI4Yzg2MjM0MDJjZjJlIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyJjNWMzMWY2ZWYzNTg4MWJjIiwibGFzdG5hbWUiLCJEb2UiXQ~WyJmYTlkYTUzZWJjOTk3OThlIiwic3NuIiwiMTIzLTQ1LTY3ODkiXQ~';

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

export const SDJwtHook = (kb: boolean) => {
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(kb ? initialToken : initialTokenWithNoKB);
  const [alg, setAlg] = useState(ES256.alg);
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
  const [discloseFrame, setDiscloseFrame] = useState(
    JSON.stringify(
      {
        _sd: ['firstname', 'lastname', 'ssn'],
      },
      null,
      2,
    ),
  );
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

  const issue = async (updates: IssueData) => {
    const encodingHeader = updates.header ?? header;
    const encodingClaims = updates.claims ?? claims;
    const encodingDisclosureFrame = updates.disclosureFrame ?? discloseFrame;
    const encodingPubPriKey = updates.pubpriKey ?? pubpriKey;

    if (updates.header !== undefined) {
      setHeader(encodingHeader);
    }

    if (updates.claims !== undefined) {
      setClaims(encodingClaims);
    }

    if (updates.disclosureFrame !== undefined) {
      setDiscloseFrame(encodingDisclosureFrame);
    }

    if (updates.pubpriKey !== undefined) {
      setPubPriKey(updates.pubpriKey);
    }

    try {
      const key = JSON.parse(encodingPubPriKey.pri);
      const protectedHeader = JSON.parse(encodingHeader);
      const data = JSON.parse(encodingClaims);
      const sd_Data = encodingDisclosureFrame ? (JSON.parse(encodingDisclosureFrame) as any) : undefined;

      const signer = await ES256.getSigner(key);
      sdjwt.config({
        signer,
      });
      const token = await sdjwt.issue(data, sd_Data, { header: protectedHeader });
      setToken(token);
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
      setDiscloseFrame('');
      setKBHeader(kbHeader);
      setKBPayload(kbPayload);
      setIsValid(true);
    } catch (e) {
      console.error(e);
      setHeader('');
      setDiscloseFrame('');
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

  const present = async () => {
    // TODO: fix
  };

  return {
    isValid,
    token,
    setToken,
    pubpriKey,
    setPubPriKey,
    discloseFrame,
    setDiscloseFrame,
    claims,
    setClaims,
    disclosures,
    setDiscolsures,
    header,
    setHeader,
    issue,
    decode,
    updateToken,
    verify,
    kbHeader,
    setKBHeader,
    kbPayload,
    setKBPayload,
    KBpubpriKey,
    setKBPubPriKey,
    presentationFrame,
    setPresentationFrame,
    present,
    payload,
    setPayload,
  };
};
