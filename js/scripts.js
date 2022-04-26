// Business Logic
function Pizza(size, meatToppings, veggieToppings, quantity) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.quantity = quantity;
}

Pizza.prototype.calculateCost = function () {
  // To do
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
$(document).ready(function () {
  let size = "";
  let allOrders = [];
  let orderCount = 0;
  let totalPurchase = 0;

  $(".size").on("change", function () {
    $(".size").not(this).prop("checked", false);
  });

  $("#addToCart").click(function () {
    console.log("Number of orders placed: " + orderCount);
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
    allOrders.push(pizza);

    let sizeCost = 0;
    if (allOrders[orderCount].size === "small") {
      sizeCost = 8;
    } else if (allOrders[orderCount].size === "medium") {
      sizeCost = 10;
    } else if (allOrders[orderCount].size === "large") {
      sizeCost = 12;
    }
    let order = pizza.calculateCost();
    $(".cartItems").append(
      "<li><strong>Pizza Added: $" +
        order +
        "&nbsp &nbsp &nbsp &nbsp x " +
        quantity +
        "&nbsp &nbsp &nbsp &nbsp = $" +
        order * quantity +
        "&nbsp <button type='button' class='btn btn-outline-danger text-dark btn-sm' id='deleteButton" +
        orderCount +
        "'> X </button></strong></li>"
    );
    $(".cartItems").append(
      "<ul><li>" + allOrders[orderCount].size + ": $" + sizeCost + "</li></ul>"
    );
    for (let i = 0; i < allOrders[orderCount].meatToppings.length; i++) {
      $(".cartItems").append(
        "<ul><li>" + allOrders[orderCount].meatToppings[i] + ": $2 </li></ul>"
      );
    }
    for (let i = 0; i < allOrders[orderCount].veggieToppings.length; i++) {
      $(".cartItems").append(
        "<ul><li>" + allOrders[orderCount].veggieToppings[i] + ": $1 </li></ul>"
      );
    }
    orderCount = orderCount + 1;

    // Clears current form after specified pizza added to cart.
    $("input[type=checkbox]").prop("checked", false);
    $("#quantity").val("");

    // Total Cost -- so far
    totalPurchase = totalPurchase + order * quantity;
    $("#total").html("<strong>$" + totalPurchase + "</strong>");
  });
  // What does the added delete button do if you click it?

  $(".cartItems").on("click", "button.btn-sm", function () {
    alert($(this).text());
  });
});
