let cart = [];

let addButtons = document.querySelectorAll(".add-to-cart");

for (let i = 0; i < addButtons.length; i++) {

    addButtons[i].addEventListener("click", function () {

        let name = addButtons[i].getAttribute("data-name");
        let price = Number(addButtons[i].getAttribute("data-price"));

        let found = false;

        for (let j = 0; j < cart.length; j++) {

            if (cart[j].name === name) {
                cart[j].quantity++;
                found = true;
                break;
            }

        }

        if (found === false) {

            let product = {
                name: name,
                price: price,
                quantity: 1
            };

            cart.push(product);

        }

        displayCart();

    });

}

function displayCart() {

    let cartItems = document.getElementById("cart-items");

    if (cartItems === null) {
        return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    for (let i = 0; i < cart.length; i++) {

        let itemTotal = cart[i].price * cart[i].quantity;

        subtotal = subtotal + itemTotal;

        cartItems.innerHTML +=
            "<div class='cart-item'>" +
            "<div>" +
            "<strong>" + cart[i].name + "</strong>" +
            "<p>₱" + cart[i].price + " x " + cart[i].quantity + "</p>" +
            "<p>Subtotal: ₱" + itemTotal.toFixed(2) + "</p>" +
            "</div>" +
            "<div>" +
            "<button onclick='changeQuantity(" + i + ", -1)'>-</button>" +
            "<button onclick='changeQuantity(" + i + ", 1)'>+</button>" +
            "<button onclick='removeProduct(" + i + ")'>Remove</button>" +
            "</div>" +
            "</div>";

    }

    let deliveryFee = 0;

    if (cart.length > 0) {
        deliveryFee = 49;
    }

    let total = subtotal + deliveryFee;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("delivery").textContent = deliveryFee.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);

}

function changeQuantity(index, amount) {

    cart[index].quantity = cart[index].quantity + amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();

}

function removeProduct(index) {

    cart.splice(index, 1);

    displayCart();

}

let checkoutButton = document.getElementById("checkout-btn");

if (checkoutButton !== null) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your shopping cart is empty!");

        } else {

            alert("Thank you for your order!");

            cart = [];

            displayCart();

        }

    });

}

let contactForm = document.getElementById("contact-form");

if (contactForm !== null) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        let result = document.getElementById("form-result");

        if (name === "" || email === "" || subject === "" || message === "") {

            result.textContent = "Please fill in all the required fields.";
            result.style.color = "red";

        } else {

            result.textContent = "Your message has been submitted successfully!";
            result.style.color = "green";

            contactForm.reset();

        }

    });

}

displayCart();
