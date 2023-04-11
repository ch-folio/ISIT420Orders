//------------------------------------------------------
//constructor function for order

function Order(storeId, salesPersonId, cdId, pricePaid, date) {
  this.StoreId = storeId;
  this.SalesPersonId = salesPersonId;
  this.CdId = cdId;
  this.PricePaid = pricePaid;
  this.Date = date;
}
//----------------------------------------------------------

const create_button = document.getElementById("create-btn");
create_button.addEventListener("click", function (e) {
  console.log("create button was clicked");

  const order = createRandomOrder();

  const table = document.getElementById("order-table");

  const row = table.insertRow();
  const storeID = row.insertCell();
  const salesPerID = row.insertCell();
  const cdID = row.insertCell();
  const pricePaid = row.insertCell();
  const date = row.insertCell();

  storeID.innerHTML = order.StoreId;
  salesPerID.innerHTML = order.SalesPersonId;
  cdID.innerHTML = order.CdId;
  pricePaid.innerHTML = order.PricePaid;
  date.innerHTML = order.Date;
});

//-----------------------------------------------------------

const submit1_button = document.getElementById("submit-one-btn");
submit1_button.addEventListener("click", function (e) {
  console.log("submit 1 button was clicked");

  const order = createRandomOrder();
  submitOrder(order);
});

const submit500_button = document.getElementById("submit-500-btn");
submit500_button.addEventListener("click", function (e) {
  console.log("submit 500 button was clicked");

  for (let i = 1; i <= 500; i++) {
    const order = createRandomOrder();
    submitOrder(order);
  }
});

function createRandomOrder() {
  const storeIds = [98053, 98007, 98077, 98055, 98011, 98046];

  const salesPersonIds = {
    98053: [1, 2, 3, 4],
    98007: [5, 6, 7, 8],
    98077: [9, 10, 11, 12],
    98055: [13, 14, 15, 16],
    98011: [17, 18, 19, 20],
    98046: [21, 22, 23, 24],
  };
  const cdIds = [
    123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453,
    623451,
  ];
  const pricePaid = Math.floor(Math.random() * 11) + 5; // Generates a random integer between 5 and 15
  const date = new Date().toLocaleString();

  const storeId = storeIds[Math.floor(Math.random() * storeIds.length)];

  const allowedSalesPersonIds = salesPersonIds[storeId];
  const salesPersonId =
    allowedSalesPersonIds[
      Math.floor(Math.random() * allowedSalesPersonIds.length)
    ];

  const cdId = cdIds[Math.floor(Math.random() * cdIds.length)];

  return new Order(storeId, salesPersonId, cdId, pricePaid, date);
}

//-----------------------------------------------------------------------

function submitOrder(order) {
  fetch("/submitOrder1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
