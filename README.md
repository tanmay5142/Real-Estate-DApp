# EstateChain — Decentralized Real Estate Marketplace

Live Link= real-estate-d-app-git-main-tanmay5143.vercel.app
EstateChain is an Ethereum-powered real estate marketplace built with Next.js, Wagmi, RainbowKit, and Hardhat. It lets users connect a wallet, browse property listings, list properties on-chain, and buy properties using smart contracts.

## Features

- ✅ Wallet connection with RainbowKit / Wagmi
- ✅ Browse all property listings
- ✅ View property details
- ✅ Connect wallet to dashboard
- ✅ List a new property on-chain
- ✅ Purchase properties with ETH
- ✅ View user-owned properties
- ✅ On-chain event notifications for listings and sales
- ✅ Local Hardhat network support
- ✅ Sepolia network support

### Planned / Incomplete Features

- ⚠️ Review UI is not exposed in the current frontend
- ⚠️ Like review UI is not exposed in the current frontend
- ⚠️ Property update / price update UI is not exposed in the current frontend
- ⚠️ Seller-specific transaction history is not implemented
- ⚠️ Image upload support is not implemented; images are stored as string metadata

## Tech Stack

**Frontend:** Next.js 14, React 18

**Blockchain:** Ethereum

**Smart Contracts:** Solidity 0.8.9

**Libraries and Frameworks:**
- Wagmi
- RainbowKit
- Viem
- React Query
- Tailwind CSS
- Framer Motion
- Lucide React
- react-hot-toast

**Development Tools:**
- Hardhat
- dotenv
- pino-pretty
- ESLint
- TypeScript

## Project Structure

```
web3/
  contracts/
    RealState.sol
  frontend/
    src/
      app/
        globals.css
        layout.tsx
        page.tsx
        dashboard/
          page.tsx
        properties/
          page.tsx
          [id]/
            page.tsx
      components/
        Hero/
          Hero.tsx
        Navbar/
          Navbar.tsx
        PropertyCard/
          PropertyCard.tsx
      config/
        abi.ts
        web3.ts
      hooks/
        useWallet.ts
        useContractRead.ts
        useEvents.ts
        index.ts
    package.json
  scripts/
    deploy.js
  hardhat.config.js
  package.json
```

## Architecture

- The frontend is a Next.js app that runs in the browser.
- The frontend uses RainbowKit and Wagmi to connect a wallet and read/write Ethereum contract data.
- Smart contract calls use Viem and Wagmi hooks to interact with the deployed contract.
- The RealEstate smart contract is compiled and deployed with Hardhat.
- The app supports:
  - Local Hardhat network (31337)
  - Sepolia testnet (11155111)
- There is no separate backend API layer; the frontend talks directly to the blockchain.

## Installation

```bash
# Clone repository
git clone https://github.com/tanmay5142/Real-Estate-Dapp-Starter-File-main.git
cd Real-Estate-Dapp-Starter-File-main/web3

# Install hardhat dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Configure Environment Variables

Create a `.env` file in `web3/` with:

```
PRIVATE_KEY=your_deployer_private_key_without_0x
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

Create a `.env.local` file in `web3/frontend/` with:

```
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_LOCAL_RPC=http://127.0.0.1:8545
```

### Start Local Blockchain

```bash
cd Real-Estate-Dapp-Starter-File-main/web3
npm run node
```

### Deploy Smart Contracts

```bash
cd Real-Estate-Dapp-Starter-File-main/web3
npm run compile
npm run deploy
```

### Start Frontend

```bash
cd Real-Estate-Dapp-Starter-File-main/web3/frontend
npm run dev
```

## Environment Variables

| Name | Purpose | Example |
|------|---------|---------|
| `PRIVATE_KEY` | Ethereum deployer wallet private key for Hardhat deploy | `abcd1234...` |
| `SEPOLIA_RPC_URL` | Sepolia network RPC endpoint for Hardhat | `https://sepolia.infura.io/v3/YOUR_PROJECT_ID` |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID used by frontend for network selection | `31337` |
| `NEXT_PUBLIC_SEPOLIA_RPC_URL` | Sepolia RPC endpoint used by frontend | `https://sepolia.infura.io/v3/YOUR_PROJECT_ID` |
| `NEXT_PUBLIC_LOCAL_RPC` | Local Hardhat RPC endpoint | `http://127.0.0.1:8545` |

## Usage

1. Open the frontend in a browser after running `npm run dev`
2. Connect wallet using RainbowKit
3. Browse properties on `/properties`
4. Click a property card to view details
5. Go to `/dashboard` to see owned properties and list a new property
6. List a property by entering price, title, category, address, and description
7. Buy a property from the detail page by sending ETH

## Smart Contracts

### RealEstate.sol

**Purpose:** Manages property listings, ownership transfers, reviews, and ratings on-chain.

**Main Functions**

| Function | Description |
|----------|-------------|
| `listProperty(price, propertyTitle, category, images, propertyAddress, description)` | List a new property |
| `updateProperty(productId, ...)` | Update property metadata |
| `updatePrice(productId, price)` | Update asking price |
| `buyProperty(productId)` | Purchase a property using ETH |
| `getAllProperties()` | Read all properties |
| `getProperty(id)` | Read details for a single property |
| `getUserProperties(user)` | Read properties owned by a specific wallet |
| `addReview(productId, rating, comment)` | Add a review to a property |
| `getProductReviews(productId)` | Read reviews for a property |
| `getUserReviews(user)` | Read reviews by a user |
| `likeReview(productId, reviewIndex)` | Like a review |
| `getHighestRatedProduct()` | Returns the ID of the highest-rated property |

**Events**

- `PropertyListed(id, owner, price)`
- `PropertySold(id, oldOwner, newOwner, price)`
- `ReviewAdded(productId, reviewer, rating, comment)`
- `ReviewLiked(productId, reviewIndex, liker, likes)`

### Deployment Information

- Deployment script: `web3/scripts/deploy.js`
- Hardhat config: `web3/hardhat.config.js`
- Supported networks:
  - Hardhat local node
  - localhost
  - Sepolia

## Screenshots

- Home
- Properties
- Dashboard
- Property Detail

## API

Not detected from the codebase. The app uses direct smart contract interaction via frontend hooks.

## Folder Explanation

| Folder | Description |
|--------|-------------|
| `web3/contracts/` | Solidity smart contract source |
| `web3/frontend/` | Next.js frontend app |
| `web3/frontend/src/app/` | Page routes and root layout |
| `web3/frontend/src/components/` | Reusable UI components |
| `web3/frontend/src/config/` | Contract ABI and network config |
| `web3/frontend/src/hooks/` | Wallet, contract read/write, transaction, and event hooks |
| `web3/scripts/` | Deployment script |
| `web3/hardhat.config.js` | Hardhat network and compiler settings |
| `web3/package.json` | Hardhat scripts |
| `web3/frontend/package.json` | Frontend scripts |

## Scripts

### `web3/package.json`

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile Solidity contracts with Hardhat |
| `npm run test` | Run Hardhat tests |
| `npm run deploy` | Deploy contract to Sepolia |
| `npm run node` | Launch local Hardhat node |

### `web3/frontend/package.json`

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js production bundle |
| `npm run start` | Start Next.js production server |
| `npm run lint` | Run Next.js linting |

## Security Notes

- Do not commit `PRIVATE_KEY` or any secret keys
- Use environment variables for RPC URLs and keys
- Deploy with a secure wallet and never expose private keys in source control
- Treat Sepolia credentials like sensitive data
- Use browser wallet security best practices when connecting accounts

## Future Improvements

- Add frontend support for reviews and review likes
- Add property update and price update UI for owners
- Implement image upload and storage integration
- Add authenticated seller/owner dashboards with activity history
- Add pagination and advanced filtering for property listings
- Add production-ready deployment and contract address management
- Add unit and integration tests for frontend components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Install dependencies
4. Make changes
5. Submit a pull request with a clear description
