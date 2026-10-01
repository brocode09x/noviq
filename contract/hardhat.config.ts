import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { defineConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env from the root directory (../.env)
dotenv.config({ path: resolve("../.env") });

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.34",
      },
      production: {
        version: "0.8.34",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    arc: {
      type: "http",
      chainType: "l1",
      url: "https://rpc.drpc.mainnet.arc.io",
      accounts: process.env.BACKEND_PRIVATE_KEY ? [process.env.BACKEND_PRIVATE_KEY] : [],
    },
  },
});
