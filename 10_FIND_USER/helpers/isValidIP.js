export default function isValidIP(octetArr) {
  if (octetArr.length !== 4) {
    return false;
  }

  return octetArr.every((octet) => {
    const numericOctet = parseInt(octet);
    return !isNaN(numericOctet) && numericOctet >= 0 && numericOctet <= 255;
  });
}
