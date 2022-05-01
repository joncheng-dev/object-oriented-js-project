// Business Logic for Order List ----------
function orderList() {
  this.orders = {};
  this.currentId = 0;
}

orderList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

orderList.prototype.addOrder = function (order) {
  order.id = this.assignId();
  this.orders[order.id] = order;
};

orderList.prototype.findOrder = function (id) {
  if (this.orders[id] != undefined) {
    return this.orders[id];
  }
  return false;
};

orderList.prototype.deleteOrder = function (id) {
  if (this.orders[id] === undefined) {
    return false;
  }
  delete this.orders[id];
  return true;
};

// Business Logic for Pizza Orders ----------
function Pizza(size, meatToppings, veggieToppings, quantity) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.quantity = quantity;
}

Pizza.prototype.calculateCost = function () {
  // Size Cost: Base (S, M, L) - $8, $10, $12
  let totalCost = 0;
  let basePrice = 0;
  if (this.size === "small") {
    basePrice = 8;
  } else if (this.size === "medium") {
    basePrice = 10;
  } else if (this.size === "large") {
    basePrice = 12;
  }
  // Toppings - Meat: $2 each
  let meatToppingCost = 2 * this.meatToppings.length;
  // Toppings - Veg: $1 each
  let vegToppingCost = this.veggieToppings.length;
  // Total Pizza Cost (per)
  totalCost = basePrice + meatToppingCost + vegToppingCost;
  return totalCost;
};

// User Interface Logic
let allOrders = new orderList();

function addOrderToCart() {
  // Pizza Size
  let size = "";
  if ($("#small").is(":checked")) {
    size = "small";
  } else if ($("#medium").prop("checked")) {
    size = "medium";
  } else if ($("#large").prop("checked")) {
    size = "large";
  }
  // Toppings -- Meat
  let meatToppings = [];
  if ($("#meatTopping1").is(":checked")) {
    meatToppings.push($("#meatTopping1").val());
  }
  if ($("#meatTopping2").is(":checked")) {
    meatToppings.push($("#meatTopping2").val());
  }
  if ($("#meatTopping3").is(":checked")) {
    meatToppings.push($("#meatTopping3").val());
  }
  // Toppings -- Veggies
  let veggieToppings = [];
  if ($("#veggieTopping1").is(":checked")) {
    veggieToppings.push($("#veggieTopping1").val());
  }
  if ($("#veggieTopping2").is(":checked")) {
    veggieToppings.push($("#veggieTopping2").val());
  }
  if ($("#veggieTopping3").is(":checked")) {
    veggieToppings.push($("#veggieTopping3").val());
  }
  if ($("#veggieTopping4").is(":checked")) {
    veggieToppings.push($("#veggieTopping4").val());
  }
  // Quantity
  let quantity = parseInt($("#quantity").val());
  // Create order and add to order list
  let pizzaOrder = new Pizza(size, meatToppings, veggieToppings, quantity);
  allOrders.addOrder(pizzaOrder);
}

function showAllOrders() {
  $(".cartItems").html("");
  Object.keys(allOrders.orders).forEach(function (key) {
    const order = allOrders.findOrder(key);
    let sizeCost = 0;
    if (order.size === "small") {
      sizeCost = 8;
    } else if (order.size === "medium") {
      sizeCost = 10;
    } else if (order.size === "large") {
      sizeCost = 12;
    }
    let currentOrder = order.calculateCost();
    $(".cartItems").append(
      "<li><strong>Pizza Added: &nbsp$" +
        currentOrder +
        "&nbsp &nbsp &nbsp x " +
        order.quantity +
        "&nbsp &nbsp &nbsp &nbsp = $" +
        currentOrder * order.quantity +
        "&nbsp <button class = 'deleteButton' id='" +
        order.id +
        "'> X </button></strong></li>"
    );

    $(".cartItems").append(
      "<ul><li>" + order.size + ": $" + sizeCost + "</li></ul>"
    );
    for (let i = 0; i < order.meatToppings.length; i++) {
      $(".cartItems").append(
        "<ul><li>" + order.meatToppings[i] + ": $2 </li></ul>"
      );
    }
    for (let i = 0; i < order.veggieToppings.length; i++) {
      $(".cartItems").append(
        "<ul><li>" + order.veggieToppings[i] + ": $1 </li></ul>"
      );
    }
  });
  // Clears current form after specified pizza added to cart.
  $("input[type=checkbox]").prop("checked", false);
  $("#quantity").val("");
}

function calculateGrandTotal() {
  let grandTotal = 0;
  Object.keys(allOrders.orders).forEach(function (key) {
    const order = allOrders.findOrder(key);
    grandTotal = grandTotal + order.calculateCost() * order.quantity;
  });
  $("#total").html("<strong>$" + grandTotal + "</strong>");
}

function deleteOrderListener() {
  $(".cartItems").on("click", ".deleteButton", function () {
    allOrders.deleteOrder(this.id);
    $(".cartItems").html("");
    $("#total").html("");
    // Reshows the new list of orders
    showAllOrders();
    calculateGrandTotal();
  });
}

$(document).ready(function () {
  deleteOrderListener();
  // Only one pizza size can be checked at a given time
  $(".size").on("change", function () {
    $(".size").not(this).prop("checked", false);
  });
  $("#addToCart").click(function () {
    addOrderToCart();
    showAllOrders();
    calculateGrandTotal();
  });
});
