export const REAL_STATE_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "PropertyListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "oldOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "PropertySold",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "reviewer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "rating", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "comment", "type": "string" }
    ],
    "name": "ReviewAdded",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "productId", "type": "uint256" },
      { "internalType": "uint256", "name": "rating", "type": "uint256" },
      { "internalType": "string", "name": "comment", "type": "string" }
    ],
    "name": "addReview",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "productId", "type": "uint256" }],
    "name": "buyProperty",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllProperties",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "productId", "type": "uint256" },
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "uint256", "name": "price", "type": "uint256" },
          { "internalType": "string", "name": "propertyTitle", "type": "string" },
          { "internalType": "string", "name": "category", "type": "string" },
          { "internalType": "string", "name": "images", "type": "string" },
          { "internalType": "string", "name": "propertyAddress", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "address[]", "name": "reviewers", "type": "address[]" },
          { "internalType": "string[]", "name": "reviews", "type": "string[]" }
        ],
        "internalType": "struct RealEstate.Property[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHighestRatedProduct",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "productId", "type": "uint256" }],
    "name": "getProductReviews",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "reviewer", "type": "address" },
          { "internalType": "uint256", "name": "productId", "type": "uint256" },
          { "internalType": "uint256", "name": "rating", "type": "uint256" },
          { "internalType": "string", "name": "comment", "type": "string" },
          { "internalType": "uint256", "name": "likes", "type": "uint256" }
        ],
        "internalType": "struct RealEstate.Review[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "getProperty",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserProperties",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "productId", "type": "uint256" },
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "uint256", "name": "price", "type": "uint256" },
          { "internalType": "string", "name": "propertyTitle", "type": "string" },
          { "internalType": "string", "name": "category", "type": "string" },
          { "internalType": "string", "name": "images", "type": "string" },
          { "internalType": "string", "name": "propertyAddress", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "address[]", "name": "reviewers", "type": "address[]" },
          { "internalType": "string[]", "name": "reviews", "type": "string[]" }
        ],
        "internalType": "struct RealEstate.Property[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserReviews",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "reviewer", "type": "address" },
          { "internalType": "uint256", "name": "productId", "type": "uint256" },
          { "internalType": "uint256", "name": "rating", "type": "uint256" },
          { "internalType": "string", "name": "comment", "type": "string" },
          { "internalType": "uint256", "name": "likes", "type": "uint256" }
        ],
        "internalType": "struct RealEstate.Review[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "productId", "type": "uint256" },
      { "internalType": "uint256", "name": "reviewIndex", "type": "uint256" }
    ],
    "name": "likeReview",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "string", "name": "_propertyTitle", "type": "string" },
      { "internalType": "string", "name": "_category", "type": "string" },
      { "internalType": "string", "name": "_images", "type": "string" },
      { "internalType": "string", "name": "_propertyAddress", "type": "string" },
      { "internalType": "string", "name": "_description", "type": "string" }
    ],
    "name": "listProperty",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "propertyIndex",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reviewsCounter",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "productId", "type": "uint256" },
      { "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "updatePrice",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "productId", "type": "uint256" },
      { "internalType": "string", "name": "_propertyTitle", "type": "string" },
      { "internalType": "string", "name": "_category", "type": "string" },
      { "internalType": "string", "name": "_images", "type": "string" },
      { "internalType": "string", "name": "_propertyAddress", "type": "string" },
      { "internalType": "string", "name": "_description", "type": "string" }
    ],
    "name": "updateProperty",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const CONTRACT_ADDRESS = '0xCaaC5e44FD6512014E90a1098d033caeAa6FA34E';
