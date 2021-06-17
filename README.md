## Coffee Supply Chain

Using solidity and web3.js to build supply chain system for coffee. For learning Solidity and web3.js

### Etherscan (rinkeby)

https://rinkeby.etherscan.io/address/0xd211cfc09ed746b866a22c22770c27daec52e364

### Project write-up - Libraries

1.  **@truffle/hdwallet-provider** - for truffle be able to sign transaction when deployed via infura.
2.  **web3** - for interact with contract using JavaScript.
3.  **truffle** - for develop, test, deployed smart contract using Solidity language.
4.  **parcel (dev)** - for bundle frontend to prepare deploy to server (also for old browser be able to support ES6+ syntax
5.  **ganache-cli or ganache gui** - for develop smart contract using local blockchain.

### Tools version

1. Truffle v5.3.9 (core: 5.3.9)
2. Solidity - ^0.8.0 (solc-js)
3. Node v14.17.0
4. Web3.js v1.3.6

### General write-up

#### Prepare environment to develop

> **npm i**

- install library from package.json
  > **npm i truffle -g**
- install truffle in global scope
  > **npm i ganache-cli**
- install ganache-cli to run local blockchain
  > **truffle console**
- start truffle development environment
  > **npm start**
- start parcel build and run live-server

#### Write smart contract

1. Start with Access Control - to control access of each role
   - Roles.sol
   - FarmerRole.sol
   - RetailerRole.sol
   - DistributorRole.sol
   - ConsumerRole.sol
2. Second, Ownable.sol - to make transferable capability to contract
3. Third, SupplyChain.sol - contain base function for Coffee Supply chain system

#### Unit-test

1. In test/TestSupplychain.js, using truffle test which is base on Mocha and JavaScript language to write unit-test for smart contract

#### Front-end

1. In app.js, using JavaScript ES6+ and Web3.js to write interaction between user and smart contract

#### Deployment

1. modify truffle-config.js by adding rinkeby network
2. run **truffle compile** then **truffle migrate --network rinkeby** to deploy smart contract
3. This is contract address that already deployed:
   FarmerRole: 0x216cfA3658Fd132170B00A187D50d8cDA2d6A92b
   DistributorRole: 0xB4FF974b96D7E5C043F2783D630d6B080711f95f
   RetailerRole: 0xE2dBe1b2b2A13B48C0054Ee3e8acaA31b30fC842
   ConsumerRole: 0x3aEfaB6c1c9F74a62F4Fccfd98B66B6f08ea2ccA
   Ownable: 0x8c4964CB4FE03E811c5D441328fE162B2092313B
   **SupplyChain: 0xD211cFc09ed746B866a22C22770c27daec52E364**
   Feel free to check SupplyChain address to see transactions.
4. using Contract owner address to add role for any address, for example:
   > const supplyChain = await SupplyChain.deployed();
   > const accounts = await web3.eth.getAccounts(); await supplyChain.addFarmer(accounts[1], { from: accounts[0] });
   > await supplyChain.addDistributor(accounts[2], { from: accounts[0] });
   > await supplyChain.addRetailer(accounts[3], {from: accounts[0] });
   > await supplyChain.addConsumer(accounts[4], {from: accounts[0] });
5. test by changing address when clicked on each button (e.g. harvest for only farmer role)

## Deployment log

### Deploying 'FarmerRole'

---

> transaction hash: 0x1d0f5b99fcd2049e08a4832a7ac1e817eda2f3d06c4cc7a3d0352fd0cb3fc33d
> Blocks: 3 Seconds: 37
> contract address: 0x216cfA3658Fd132170B00A187D50d8cDA2d6A92b
> block number: 8780732
> block timestamp: 1623947340
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.899005831000000001
> gas used: 369859 (0x5a4c3)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.000369859 ETH

### Deploying 'DistributorRole'

---

> transaction hash: 0x5090a856a8e7d8b1a6af6601411b6907ac6663f57370fe8ca9d4f62ef02ca687
> Blocks: 2 Seconds: 21
> contract address: 0xB4FF974b96D7E5C043F2783D630d6B080711f95f
> block number: 8780734
> block timestamp: 1623947370
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.898641819000000001
> gas used: 364012 (0x58dec)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.000364012 ETH

### Deploying 'RetailerRole'

---

> transaction hash: 0x6cd46d28b8742afe87e1c5ca7a1f2869231c2ce5c4f16bb2242a9fae316a91df
> Blocks: 2 Seconds: 21
> contract address: 0xE2dBe1b2b2A13B48C0054Ee3e8acaA31b30fC842
> block number: 8780736
> block timestamp: 1623947400
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.898277807000000001
> gas used: 364012 (0x58dec)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.000364012 ETH

### Deploying 'ConsumerRole'

---

> transaction hash: 0xfccd2610d6f93d440c8be6abf8800ca6c994825902def93efe3dda49ea45b85d
> Blocks: 2 Seconds: 21
> contract address: 0x3aEfaB6c1c9F74a62F4Fccfd98B66B6f08ea2ccA
> block number: 8780738
> block timestamp: 1623947430
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.897913831000000001
> gas used: 363976 (0x58dc8)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.000363976 ETH

### Deploying 'Ownable'

---

> transaction hash: 0x8978ec85d8e4fe2618bf5d0ebd320ea0e8e1dfc335fe60f97839f83b3fadbb93
> Blocks: 2 Seconds: 21
> contract address: 0x8c4964CB4FE03E811c5D441328fE162B2092313B
> block number: 8780740
> block timestamp: 1623947460
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.897599862000000001
> gas used: 313969 (0x4ca71)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.000313969 ETH

### Deploying 'SupplyChain'

---

> transaction hash: 0x81ea34b72ba07cfd3dbb18db303d0e5b04b0f15926d255b4669fdcfd659c88aa
> Blocks: 2 Seconds: 21
> contract address: 0xD211cFc09ed746B866a22C22770c27daec52E364
> block number: 8780742
> block timestamp: 1623947490
> account: 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
> balance: 2.894364809000000001
> gas used: 3235053 (0x315ced)
> gas price: 1 gwei
> value sent: 0 ETH
> total cost: 0.003235053 ETH

> Saving migration to chain.
> Saving artifacts

---

> Total cost: 0.005010881 ETH

### Summary

====================

> Total deployments: 7
> Final cost: 0.005285401 ETH
