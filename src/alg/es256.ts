export const ES256 = {
  alg: 'ES256',

  async generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256', // ES256
      },
      true, // whether the key is extractable (i.e., can be used in exportKey)
      ['sign', 'verify'] // can be used to sign and verify signatures
    );

    // Export the public and private keys in JWK format
    const publicKeyJWK = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.publicKey
    );
    const privateKeyJWK = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.privateKey
    );

    return { publicKey: publicKeyJWK, privateKey: privateKeyJWK };
  },

  async getSigner(privateKeyJWK: object) {
    const privateKey = await window.crypto.subtle.importKey(
      'jwk',
      privateKeyJWK,
      {
        name: 'ECDSA',
        namedCurve: 'P-256', // Must match the curve used to generate the key
      },
      true, // whether the key is extractable (i.e., can be used in exportKey)
      ['sign']
    );

    return async (data: string) => {
      const encoder = new TextEncoder();
      const signature = await window.crypto.subtle.sign(
        {
          name: 'ECDSA',
          hash: { name: 'SHA-256' }, // Required for ES256
        },
        privateKey,
        encoder.encode(data)
      );

      return window
        .btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Convert to base64url format
    };
  },

  async getVerifier(publicKeyJWK: object) {
    const publicKey = await window.crypto.subtle.importKey(
      'jwk',
      publicKeyJWK,
      {
        name: 'ECDSA',
        namedCurve: 'P-256', // Must match the curve used to generate the key
      },
      true, // whether the key is extractable (i.e., can be used in exportKey)
      ['verify']
    );

    return async (data: string, signatureBase64url: string) => {
      const encoder = new TextEncoder();
      const signature = Uint8Array.from(
        atob(signatureBase64url.replace(/-/g, '+').replace(/_/g, '/')),
        (c) => c.charCodeAt(0)
      );
      const isValid = await window.crypto.subtle.verify(
        {
          name: 'ECDSA',
          hash: { name: 'SHA-256' }, // Required for ES256
        },
        publicKey,
        signature,
        encoder.encode(data)
      );

      return isValid;
    };
  },
};
