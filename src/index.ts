const convertHexUnitTo255 = (hexStr) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);

// 8 digit hex isn't supported by all browsers, convert to rgba.
// Works for 3, 4, 6, and 8 digit hex.
export function hexToRGBA(hex: string) {
  if (hex.charAt(0) === "#") hex = hex.slice(1);
  const isHex = /^([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
  if (isHex) {
    // Needed to break the hex down if it's a multiple of 2 or 3.
    const chunkSize: number = Math.floor(hex.length / 3);
    // Gets array, 'ff7700cc' will be ['ff', '77', '00', 'cc'];
    const hexArr = hex.match(new RegExp(`.{${chunkSize}}`, "g"));
    // Convert hex chunk to rgb 255 val.
    // @ts-ignore - RegExp match() has a return type of RegExpMatchArray | null, but in this case it can't be null
    const arr = hexArr.map(convertHexUnitTo255);
    // Converts alpha 255 into number between 0 and 1 with three significant figures.
    const alpha = arr[3] || arr[3] === 0 ? (arr[3] / 255).toFixed(2) : 1;
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${alpha})`;
  }
  throw new TypeError("Value provided to hexToRGBA is not a valid hex string.");
}
