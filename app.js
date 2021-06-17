import Web3 from "web3";
import supplyChainArtifact from "./build/contracts/SupplyChain.json";

const app = async function () {
  const state = [
    "Harvested",
    "Processed",
    "Packed",
    "ForSale",
    "Sold",
    "Shipped",
    "Received",
    "Purchased",
  ];
  // input element
  const skuInput = document.querySelector("#sku");
  const upcInput = document.querySelector("#upc");
  const ownerIDInput = document.querySelector("#ownerID");
  const originFarmerIDInput = document.querySelector("#originFarmerID");
  const originFarmNameInput = document.querySelector("#originFarmName");
  const originFarmInformationInput = document.querySelector(
    "#originFarmInformation"
  );
  const originFarmLatitudeInput = document.querySelector("#originFarmLatitude");
  const originFarmLongitudeInput = document.querySelector(
    "#originFarmLongitude"
  );
  const productNotesInput = document.querySelector("#productNotes");
  const productPriceInput = document.querySelector("#productPrice");
  const distributorIDInput = document.querySelector("#distributorID");
  const retailerIDInput = document.querySelector("#retailerID");
  const consumerIDInput = document.querySelector("#consumerID");

  // button element
  const harvestButton = document.querySelector(".btn-harvest");
  const fetchOneButton = document.querySelector(".btn-fetchOne");
  const fetchTwoButton = document.querySelector(".btn-fetchTwo");
  const processButton = document.querySelector(".btn-process");
  const packButton = document.querySelector(".btn-pack");
  const forSaleButton = document.querySelector(".btn-forsale");
  const buyButton = document.querySelector(".btn-buy");
  const shipButton = document.querySelector(".btn-ship");
  const receiveButton = document.querySelector(".btn-receive");
  const purchaseButton = document.querySelector(".btn-purchase");

  // span element
  const itemStateSpan = document.querySelector(".item-state");

  // event
  const eventDiv = document.querySelector("#ftc-events");

  // initial web3 object
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");

  // get current account
  let accounts = await web3.eth.getAccounts();

  // account change event
  window.ethereum.on("accountsChanged", (event) => {
    accounts = event;
  });

  // get contract instance
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = supplyChainArtifact.networks[networkId];
  const supplyChainContract = new web3.eth.Contract(
    supplyChainArtifact.abi,
    deployedNetwork.address
  );

  // get history 10 events
  const allEvents = await supplyChainContract.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: "latest",
  });
  for (let i = 0; i < (allEvents.length > 10 ? 10 : allEvents.length); i++) {
    let event = allEvents[i];
    const getBlock = await web3.eth.getBlock(event.blockHash);
    const ulHTML = `<ul>Event Name: ${event.event}, UPC: ${
      event.returnValues.upc
    }, ${new Date(getBlock.timestamp * 1000)}, TXH: ${
      event.transactionHash
    }</ul>`;
    eventDiv.insertAdjacentHTML("afterbegin", ulHTML);
  }

  // events
  supplyChainContract.events.allEvents().on("data", async (event) => {
    const getBlock = await web3.eth.getBlock(event.blockHash);
    const ulHTML = `<ul>Event Name: ${event.event}, UPC: ${
      event.returnValues.upc
    }, ${new Date(getBlock.timestamp * 1000)}, TXH: ${
      event.transactionHash
    }</ul>`;
    eventDiv.insertAdjacentHTML("afterbegin", ulHTML);
  });

  // fetchItemBufferOne()
  fetchOneButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await supplyChainContract.methods
      .fetchItemBufferOne(upcInput.value)
      .call();
    skuInput.value = result.itemSKU;
    upcInput.value = result.itemUPC;
    originFarmInformationInput.value = result.originFarmInformation;
    originFarmLatitudeInput.value = result.originFarmLatitude;
    originFarmLongitudeInput.value = result.originFarmLongitude;
    originFarmNameInput.value = result.originFarmName;
    originFarmerIDInput.value = result.originFarmerID;
    ownerIDInput.value = result.ownerID;
  });

  // fetchItemBufferTwo()
  fetchTwoButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await supplyChainContract.methods
      .fetchItemBufferTwo(upcInput.value)
      .call();
    skuInput.value = result.itemSKU;
    upcInput.value = result.itemUPC;
    productNotesInput.value = result.productNotes;
    productPriceInput.value = result.productPrice;
    itemStateSpan.textContent = `State: ${state[+result.itemState]}`;
    distributorIDInput.value = result.distributorID;
    retailerIDInput.value = result.retailerID;
    consumerIDInput.value = result.consumerID;
  });

  // harvestItem()
  harvestButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .harvestItem(
        upcInput.value,
        originFarmerIDInput.value,
        originFarmNameInput.value,
        originFarmInformationInput.value,
        originFarmLatitudeInput.value,
        originFarmLongitudeInput.value,
        productNotesInput.value
      )
      .send({ from: accounts[0] });
  });

  // processItem()
  processButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .processItem(upcInput.value)
      .send({ from: accounts[0] });
  });

  // packItem()
  packButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .packItem(upcInput.value)
      .send({ from: accounts[0] });
  });

  // sellItem()
  forSaleButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .sellItem(upcInput.value, productPriceInput.value)
      .send({ from: accounts[0] });
  });

  // buyItem()
  buyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods.buyItem(upcInput.value).send({
      from: accounts[0],
      value: web3.utils.toWei(productPriceInput.value),
    });
  });

  // shipItem()
  shipButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .shipItem(upcInput.value)
      .send({ from: accounts[0] });
  });

  // receiveItem()
  receiveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .receiveItem(upcInput.value)
      .send({ from: accounts[0] });
  });

  // purchaseItem()
  purchaseButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await supplyChainContract.methods
      .purchaseItem(upcInput.value)
      .send({ from: accounts[0] });
  });
};

app();
