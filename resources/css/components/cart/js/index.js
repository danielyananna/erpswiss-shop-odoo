const cart = {};

// Function to add an item to the cart
function addToCart(item) {
    const itemName = $(item).find('.shop-filter__product-name').text();
    const imgSrc = $(item).find('.items-img-holder img').attr('src'); // Get the image source
    const itemPrice = parseFloat($(item).find('.shop-filter__product-price').text().replace('$', ''));

    if (cart[itemName]) {
        cart[itemName].quantity += 1;
        cart[itemName].totalPrice = cart[itemName].quantity * itemPrice;
    } else {
        cart[itemName] = {
            name: itemName,
            price: itemPrice,
            quantity: 1,
            totalPrice: itemPrice,
            img: imgSrc,
        };
    }

    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    delete cart[itemName];
    updateCartDisplay();
}

function getTotalItemCount() {
    let totalCount = 0;

    for (const itemName in cart) {
        totalCount += cart[itemName].quantity;
    }

    return totalCount;
}

// Function to update the cart display
function updateCartDisplay() {
    const cartDisplay = $('#cart-display');
    cartDisplay.empty();
    let total = 0;

    for (const itemName in cart) {
        const item = cart[itemName];
        const itemTotalPrice = item.totalPrice;

        total += itemTotalPrice;

        const cartItemElement = $('<div class="cart-elem"></div>');

        // Add an input field for quantity
        const quantityInput = $('<input class="cart-elem__quantity-input" type="number" min="1" value="' + item.quantity + '">');
        quantityInput.on('change', function () {
            const newQuantity = parseInt($(this).val());
            item.quantity = newQuantity;
            item.totalPrice = newQuantity * item.price;
            updateCartDisplay();
        });

        const itemImage = $('<img class="cart-elem__img">');
        itemImage.attr('src', item.img); // Set the image source
        cartItemElement.append(itemImage);

        cartItemElement.append('<h3 class="cart-elem__title dib">' + itemName + ' - $' + item.price.toFixed(2) + '</h3>');
        cartItemElement.append(quantityInput);
        cartItemElement.append(' <span class="cart-elem__item-price"> = $' + itemTotalPrice.toFixed(2) + '</span>');


        // Adding a button to remove the item from the cart
        const removeButton = $('<button class="cart-elem__delete db">Delete item</button>');
        removeButton.click(() => removeFromCart(itemName));

        cartItemElement.append(removeButton);
        cartDisplay.append(cartItemElement);
    }

    // Displaying the total price
    cartDisplay.append('' +
        '<div class="cart-elem__box">' +
            '<div class="cart-elem__total-price">Total: $ ' + total.toFixed(2) + '</div>' +
            '<div class="cart-elem__total-items">Total Items: ' + getTotalItemCount() + '</div'
        + '</div>');

    // Display the total item count separately
    $('.nav-bar__cart-length').text(getTotalItemCount());
    // cartDisplay.append('<div class="cart-elem__total-items">Total Items: ' + getTotalItemCount() + '</div');
    cartDisplay.append('<button class="cart-elem__close cart-close">x</button>')
}

// Adding event listeners to "Add to Cart" buttons using jQuery
$(document).on('click', '.shop-filter__add-card', function () {
    addToCart($(this).closest('.shop-filter__item'));
    $('.shop-filter__box.items').css('display', 'block')
});

$(document).ready(function() {
    $(document).on('click', '.cart-close', function (event) {
        event.stopPropagation(); // Stop event propagation
        $('#cart-display').hide();
    });
});


$('.nav-bar__menu-link--my-cart').click(()=>{
    $('#cart-display').show()
})

// Initialize the cart display
updateCartDisplay()