// Business Logic

// User Interface Logic
$(document).ready(function () {
  // After document is loaded.. do this.
  $("#addToCart").click(function () {
    $(".cartItems").append("<li>Pizza Order</li>");
  });
});
