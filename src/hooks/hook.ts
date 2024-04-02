import { digest } from '@sd-jwt/crypto-browser';
import { Disclosure } from '@sd-jwt/utils';

export type IssueData = {
  header?: string;
  claims?: string;
  disclosureFrame?: string;
  pubpriKey?: { pri: string; pub: string };
};

export type PresentData = {
  oriToken?: string;
  presentationFrame?: string;
  kbPayload?: string;
  kbpubpriKey?: { pri: string; pub: string };
};

export type Disclosures = {
  _digest: string;
  _encoded: string;
  salt: string;
  key: string | undefined;
  value: string;
};

export async function processDisclosures(disclosure: Disclosure[] | undefined) {
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

export const initialToken =
  'eyJ0eXAiOiJzZCtqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpZCI6IjEyMzQiLCJfc2QiOlsiYkRUUnZtNS1Zbi1IRzdjcXBWUjVPVlJJWHNTYUJrNTdKZ2lPcV9qMVZJNCIsImV0M1VmUnlsd1ZyZlhkUEt6Zzc5aGNqRDFJdHpvUTlvQm9YUkd0TW9zRmsiLCJ6V2ZaTlMxOUF0YlJTVGJvN3NKUm4wQlpRdldSZGNob0M3VVphYkZyalk4Il0sIl9zZF9hbGciOiJzaGEtMjU2In0.n27NCtnuwytlBYtUNjgkesDP_7gN7bhaLhWNL4SWT6MaHsOjZ2ZMp987GgQRL6ZkLbJ7Cd3hlePHS84GBXPuvg~WyI1ZWI4Yzg2MjM0MDJjZjJlIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyJjNWMzMWY2ZWYzNTg4MWJjIiwibGFzdG5hbWUiLCJEb2UiXQ~WyJmYTlkYTUzZWJjOTk3OThlIiwic3NuIiwiMTIzLTQ1LTY3ODkiXQ~eyJ0eXAiOiJrYitqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpYXQiOjE3MTAwNjk3MjIsImF1ZCI6ImRpZDpleGFtcGxlOjEyMyIsIm5vbmNlIjoiazh2ZGYwbmQ2Iiwic2RfaGFzaCI6Il8tTmJWSzNmczl3VzNHaDNOUktSNEt1NmZDMUwzN0R2MFFfalBXd0ppRkUifQ.pqw2OB5IA5ya9Mxf60hE3nr2gsJEIoIlnuCa4qIisijHbwg3WzTDFmW2SuNvK_ORN0WU6RoGbJx5uYZh8k4EbA';

export const initialTokenWithNoKB =
  'eyJ0eXAiOiJzZCtqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpZCI6IjEyMzQiLCJfc2QiOlsiYkRUUnZtNS1Zbi1IRzdjcXBWUjVPVlJJWHNTYUJrNTdKZ2lPcV9qMVZJNCIsImV0M1VmUnlsd1ZyZlhkUEt6Zzc5aGNqRDFJdHpvUTlvQm9YUkd0TW9zRmsiLCJ6V2ZaTlMxOUF0YlJTVGJvN3NKUm4wQlpRdldSZGNob0M3VVphYkZyalk4Il0sIl9zZF9hbGciOiJzaGEtMjU2In0.n27NCtnuwytlBYtUNjgkesDP_7gN7bhaLhWNL4SWT6MaHsOjZ2ZMp987GgQRL6ZkLbJ7Cd3hlePHS84GBXPuvg~WyI1ZWI4Yzg2MjM0MDJjZjJlIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyJjNWMzMWY2ZWYzNTg4MWJjIiwibGFzdG5hbWUiLCJEb2UiXQ~WyJmYTlkYTUzZWJjOTk3OThlIiwic3NuIiwiMTIzLTQ1LTY3ODkiXQ~';

export const initialPubPriKey = {
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
