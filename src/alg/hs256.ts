import { Signer, Verifier } from '@sd-jwt/types';
import { bufferToBase64Url, decodeBase64URL } from '../utils';

const alg = 'HS256';

const getSigner = (secret: string): Signer => {
  return async (data: string) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(data);

    const cryptoKey = await window.crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, [
      'sign',
    ]);

    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData);
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

    const cryptoKey = await window.crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, [
      'verify',
    ]);

    return window.crypto.subtle.verify('HMAC', cryptoKey, signatureData, messageData);
  };
};

export const HS256 = {
  alg,
  getSigner,
  getVerifier,
};
