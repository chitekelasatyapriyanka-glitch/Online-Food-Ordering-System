const foods = [
    { id: 1, name: "Pizza", price: 199 },
    { id: 2, name: "Burger", price: 99 },
    { id: 3, name: "Biryani", price: 149 },
    { id: 4, name: "Sandwich", price: 79 },
    { id: 5, name: "Fried Rice", price: 129 },
    { id: 6, name: "Ice Cream", price: 59 }
];

let cart = [];

function displayFoods() {
    const foodList = document.getElementById("food-list");

    foodList.innerHTML = "";

    foods.forEach(food => {
        foodList.innerHTML += `
            <div class="food-card">
                <h3>${food.name}</h3>
                <p>Price: ₹${food.price}</p>
                <button onclick="addToCart(${food.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const food = foods.find(item => item.id === id);
    cart.push(food);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <p>
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </p>
        `;
    });

    totalElement.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;

    if (name === "" || phone === "" || address === "") {
        alert("Please enter all customer details!");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number!");
        return;
    }

    alert("Order placed successfully! Thank you, " + name);

    cart = [];
    displayCart();

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    displayFoods();
    displayCart();
});