// Business Logic
function Pizza(size, meatToppings, veggieToppings, quantity) {
  this.size = size;
  this.meatToppings = meatToppings;
  this.veggieToppings = veggieToppings;
  this.quantity = quantity;
}

// User Interface Logic
$(document).ready(function () {
  // After document is loaded.. do this.
  // Check pizza size
  let size = "";
  let allOrders = [];

  $("#addToCart").click(function () {
    $(".cartItems").append("<li>Pizza Order</li>");

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
    console.log("Size of pizza: " + size);

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
    console.log("Meat toppings: " + meatToppings);
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
    console.log("Veggie toppings: " + veggieToppings);
    // Quantity
    let quantity = 0;
    quantity = parseInt($("#quantity").val());
    console.log("Quantity: " + quantity);

    let pizza1 = new Pizza(size, meatToppings, veggieToppings, quantity);
    console.log(
      "Pizza made: " + pizza1.size,
      pizza1.meatToppings,
      pizza1.veggieToppings,
      pizza1.quantity
    );

    allOrders.push(pizza1);
    for (let i = 0; i < allOrders.length; i++) {
      console.log("Current number of orders: " + allOrders.length);
      console.log("Order #" + (i + 1) + "'s size: " + allOrders[i].size);
      console.log(
        "Order #" + (i + 1) + "'s meat toppings: " + allOrders[i].meatToppings
      );
      console.log(
        "Order #" + (i + 1) + "'s veg toppings: " + allOrders[i].veggieToppings
      );
      console.log(
        "Order #" + (i + 1) + "'s quantity: " + allOrders[i].quantity
      );
    }
  });
});
