export function getTokenSymbol(tokenAddress: string): string {
  if (tokenAddress === "0x826551890Dc65655a0Aceca109aB11AbDbD7a07B") {
    return "WCANTO";
  } else if (tokenAddress === "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687") {
    return "ETH";
  } else if (tokenAddress === "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265") {
    return "ATOM";
  }
  return "unknownToken";
}
