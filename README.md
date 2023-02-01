# Blathers 🦉

> "I must say! This art here... IS A FAKE!" - Blathers, Animal Crossing: New Leaf

Blathers is a barebone web app to view NFT collections for a specific wallet address or ENS domain. It's powered by [Zora](https://zora.co/).

## Setup

Clone repo:

```
git clone https://github.com/kislakiruben/blathers.git
```

```
cd blathers
```

Install dependencies:

```
npm install
```

Rename `.env.example`

```
mv .env.example .env
```

Start the web app:

```
npm start
```

This will build the React app and then start a NodeJS server on `localhost:5001` with the following endpoints:
* `/` - main page where the React app is loaded and rendered
* `/api/nft` - an API endpoint used to call Zora; it accepts the following params:
  * `ownerAddresses` - wallet address or ENS domain;
  * `limit` - maximum number of entries to return per call;
  * `after` - a cursor after which the entries should be returned;
