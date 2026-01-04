# ScribeChain 🌐

> **Decentralized Real-Time Collaboration** — Own your work. Collaborate globally. Trust the blockchain. ScribeChain is a decentralized platform for real-time document and whiteboard collaboration. Your work is secured on the blockchain, accessible from anywhere, and owned by you. No central servers, no limits—just pure, peer-powered creation. [Demo Link](https://scribechain1.onrender.com/)

## 🌟 Features

### 📝 **ScribeChain Docs** — Decentralized Document Editor

- **On-chain real-time editing** with live cursor tracking
- **Multi-user collaboration** with instant updates
- **Decentralized storage** — Own your documents, access from anywhere
- **Personal on-chain library** — Managed by your wallet
- **Cross-device sync** — Work seamlessly across all devices
- **Wallet-based authentication** — No email, no passwords

### 🎨 **ScribeChain Whiteboard** — Decentralized Whiteboard

- **Interactive whiteboard** for diagrams and sketches
- **On-chain real-time collaboration**
- **Multi-user cursors** — See where others are working
- **Decentralized save** — Store drawings on-chain
- **Personal drawings library** — Access your creations anywhere

### 🔐 **Authentication & Security**

- **Wallet-based authentication**
- **No central authority** — You own your data
- **Cryptographic security**

### ☁️ **Decentralized Features**

- **Blockchain & IPFS integration** for reliable, censorship-resistant storage
- **Personal workspace** for each wallet

## 🎯 Usage

### Creating a New Session

1. **Visit the homepage**
2. **Choose your tool**: Doc Online or ExcaliDraw
3. **Click "Create New Session"**
4. **Start collaborating** - Share the URL with others

### Joining an Existing Session

1. **Get the session ID** from a collaborator
2. **Click "Join Existing Session"**
3. **Enter the session ID**
4. **Start collaborating** in real-time

### Managing Your Work

1. **Sign in** to access personal features
2. **View your saved documents** and drawings
3. **Access your work** from any device
4. **Organize your personal library**

## 🛠️ Tech Stack

### Blockchain & Backend
- **Mantle Sepolia Smart Contracts** — Document metadata and ownership
- **Go** — Backend API for off-chain features
- **WebSockets** — Real-time bidirectional communication
- **IPFS/Supabase** — Decentralized document and drawing storage

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **Ethers.js / Web3.js** — Blockchain interaction

## ⛓️ Smart Contract

The core document ownership logic is handled by a smart contract deployed on the **Mantle Sepolia Testnet**.

- **Contract Address:** `0xC2e108eBACC7Ea1dB63C7db5114828A0377d0f6F`
- **Network:** Mantle Sepolia Testnet
- **Explorer:** [Mantle Scan](https://sepolia.mantlescan.xyz/address/0xC2e108eBACC7Ea1dB63C7db5114828A0377d0f6F)

### 📁 Project Structure

```
Collabify/
├── server/           # Go backend
│   ├── main.go      # Main server file
│   ├── auth/        # Authentication handlers
│   ├── docs/        # Document management
│   ├── drawings/    # Drawing management
│   └── socket/      # WebSocket handlers
└── client/          # Next.js frontend
    ├── app/         # Next.js App Router
    ├── components/  # React components
    ├── contexts/    # React contexts
    └── public/      # Static assets
```
