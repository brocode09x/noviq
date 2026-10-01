import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";

export default buildModule("NoviqMarketplaceModule", (m) => {
  // We can pass the backend signer address as a parameter when deploying,
  // or default to the deployer's address if not provided.
  const backendSigner = m.getParameter("backendSigner", m.getAccount(0));

  const marketplace = m.contract("NoviqMarketplace", [USDC_ADDRESS, backendSigner]);

  return { marketplace };
});
