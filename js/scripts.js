// Business Logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

// User Interface Logic
$(document).ready(function () {
  // After document is loaded.. do this.
  // Check pizza size
  let size1 = false;
  let size2 = false;
  let size3 = false;

  $("#addToCart").click(function () {
    $(".cartItems").append("<li>Pizza Order</li>");
    // Pizza Size
    if ($("#small").is(":checked")) {
      size1 = true;
    }
    if ($("#medium").prop("checked")) {
      size2 = true;
    }
    if ($("#large").prop("checked")) {
      size3 = true;
    }
    console.log("Size of pizza: " + size1);
    console.log("Size of pizza: " + size2);
    console.log("Size of pizza: " + size3);

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
  });
});
