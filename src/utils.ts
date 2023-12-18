export const copyCurrentURLToClipboard = async () => {
  if (!navigator.clipboard) {
    console.error('Clipboard API not available');
    return false;
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

export function updateURLWithQuery(queryData: string) {
  if (window.history.pushState) {
    const newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      `?${queryData}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }
}

export function stringToUint8Array(str: string) {
  const encoder = new TextEncoder(); // Create a new TextEncoder instance
  const uint8Array = encoder.encode(str); // Encode the string
  return uint8Array;
}
