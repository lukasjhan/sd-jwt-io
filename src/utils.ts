export const copyCurrentURLToClipboard = async () => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available");
    return false;
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};

export function updateURLWithQuery(token: string, mode: string) {
  if (window.history.pushState) {
    const { protocol, host, pathname } = window.location;
    const newurl = `${protocol}//${host}${pathname}`;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("token", token);
    searchParams.set("mode", mode);

    const newURLWithQuery = `${newurl}?${searchParams.toString()}`;
    window.history.pushState({ path: newURLWithQuery }, "", newURLWithQuery);

    //   const newurl =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   window.location.pathname +
    //   `?${queryData}`;
    // window.history.pushState({ path: newurl }, '', newurl);
  }
}

export function stringToUint8Array(str: string) {
  const encoder = new TextEncoder(); // Create a new TextEncoder instance
  const uint8Array = encoder.encode(str); // Encode the string
  return uint8Array;
}

export function decodeBase64URL(base64urlString: string): string {
  // Convert Base64Url to Base64 by replacing '-' with '+', '_' with '/' and appending '=' to make the length a multiple of 4
  const base64 = base64urlString
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(
      base64urlString.length + ((4 - (base64urlString.length % 4)) % 4),
      "="
    );

  // Decode the Base64 string
  const decodedString = atob(base64);

  return decodedString;
}

export function bufferToBase64Url(buffer: ArrayBuffer): string {
  // Convert ArrayBuffer to Base64
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  // Convert Base64 to Base64Url by replacing '+' with '-', '/' with '_', and removing '='
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
