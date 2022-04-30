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

$(document).ready(function () {
  let size = "";
  let orderCount = 1;
  let totalPurchase = 0;

  $(".size").on("change", function () {
    $(".size").not(this).prop("checked", false);
  });

  $("#addToCart").click(function () {
    // Pizza Size
    if ($("#small").is(":checked")) {
      size = "small";
    }
    if ($("#medium").prop("checked")) {
      size = "medium";
    }
    if ($("#large").prop("checked")) {
      size = "large";
    }

    let meatToppings = [];
    // Toppings -- Meat
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

    let pizza = new Pizza(size, meatToppings, veggieToppings, quantity);
    allOrders.addOrder(pizza);
    // Show orders of pizza added so far.
    // console.log("Orders: " + JSON.stringify(allOrders.orders));

    // Object.keys(allOrders.orders).forEach(function (key) {
    const order = allOrders.findOrder(orderCount);
    console.log("Order Id: " + order.id);
    console.log("Pizza size: " + order.size);
    let sizeCost = 0;
    if (order.size === "small") {
      sizeCost = 8;
    } else if (order.size === "medium") {
      sizeCost = 10;
    } else if (order.size === "large") {
      sizeCost = 12;
    }
    let currentOrder = pizza.calculateCost();
    console.log("Meat Toppings: " + order.meatToppings);
    console.log("Veggie Toppings: " + order.veggieToppings);
    console.log("Quantity: " + order.quantity);
    console.log("Current total: $" + currentOrder * quantity);
    $(".cartItems").append(
      "<li><strong>Pizza Added: $" +
        currentOrder +
        "&nbsp &nbsp &nbsp &nbsp x " +
        quantity +
        "&nbsp &nbsp &nbsp &nbsp = $" +
        currentOrder * quantity +
        "&nbsp <button type='button' class='btn btn-outline-danger text-dark btn-sm' id='deleteButton" +
        allOrders.currentId +
        "'> X </button></strong></li>"
    );
    // });
    console.log("Current Id: " + allOrders.currentId);

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
    orderCount = orderCount + 1;

    // Clears current form after specified pizza added to cart.
    $("input[type=checkbox]").prop("checked", false);
    $("#quantity").val("");

    // // Total Cost -- so far
    // totalPurchase = totalPurchase + currentOrder * quantity;
    // $("#total").html("<strong>$" + totalPurchase + "</strong>");
  });
  // What does the added delete button do if you click it?
  $(".cartItems").on("click", "button.btn-sm", function () {
    alert($(this).text());
  });
});
