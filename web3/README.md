 Folder Structure

  web3/frontend/
  ├── src/
  │   ├── app/
  │   │   ├── layout.tsx         # Root layout with Web3 providers
  │   │   ├── providers.tsx     # Wagmi, RainbowKit, React Query providers
  │   │   ├── page.tsx          # Home page with hero section
  │   │   ├── globals.css       # Global styles with Tailwind
  │   │   ├── properties/
  │   │   │   ├── page.tsx      # Property marketplace listing
  │   │   │   └── [id]/page.tsx # Property detail with buy functionality
  │   │   └── dashboard/
  │   │       └── page.tsx      # User dashboard with property management
  │   ├── components/
  │   │   ├── Navbar/           # Responsive navbar with wallet connection
  │   │   ├── Hero/             # Landing page hero section
  │   │   └── PropertyCard/     # Reusable property card component
  │   ├── config/
  │   │   ├── web3.ts           # Wagmi/RainbowKit configuration
  │   │   └── abi.ts            # Contract ABI and address
  │   └── hooks/
  │       ├── useWallet.ts      # Wallet connection hooks
  │       ├── useContractRead.ts # Contract read/write hooks
  │       ├── useEvents.ts      # Event notification helpers
  │       └── index.ts          # Hook exports
  ├── package.json
  ├── tailwind.config.ts
  ├── tsconfig.json
  ├── .env.local
  └── .env.example


   Tech Stack Implemented

  - Next.js 14 with App Router
  - TypeScript with strict mode
  - Tailwind CSS with custom dark theme
  - Wagmi + Viem for blockchain interaction
  - RainbowKit for MetaMask connection
  - React Query for data fetching
  - Framer Motion for animations

  Features Implemented

  - Property listing marketplace with search/filter
  - Property detail pages with buy functionality
  - User dashboard with property management
  - Wallet connection via MetaMask/RainbowKit
  - Transaction notifications (react-hot-toast)
  - Dark theme with glassmorphism UI
  - Responsive design
  - Modern animations


How to Run

  1. Start Hardhat local network (in web3 folder):
  npx hardhat node
  2. Deploy the contract (in another terminal):
  npx hardhat run scripts/deploy.js --network localhost
  3. Start the frontend (in web3/frontend folder):
  npm run dev
  4. Open http://localhost:3000