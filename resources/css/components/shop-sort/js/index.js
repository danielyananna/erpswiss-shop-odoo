// for the filter tab opening section
$(document).ready(function() {
    $('#selectedOption').click(function() {
        $('#sortOptions').toggle();
    });

    $('#sortOptions li').click(function() {
        const selectedValue = $(this).data('value');
        const selectedText = $(this).text();

        $('#selectedOption').text(selectedText);
        $('#sortOptions').hide();

        // Adding a class to the selected value and remove it from other options
        $('#sortOptions li').removeClass('selected');
        $(this).addClass('selected');

    });

    // Closing the list if the user clicks outside of it
    $(document).click(function(event) {
        if (!$(event.target).is('#selectedOption, #sortOptions')) {
            $('#sortOptions').hide();
        }
    });
});

//for the filter tab filtering section
$(document).ready(function() {
    function sortProducts(order) {
        const products = $(".shop-filter__item.items");

        const productContainer = document.querySelector(".shop-filter__box");
        while (productContainer.firstChild) {
            productContainer.removeChild(productContainer.firstChild);
        }

        products.detach().sort(function (a, b) {
            const aName = $(a).find(".shop-filter__product-name").text().toLowerCase();
            const bName = $(b).find(".shop-filter__product-name").text().toLowerCase();

            if (order === "high") {
                const aPrice = parseFloat($(a).find(".shop-filter__product-price").text().replace('$', ''));
                const bPrice = parseFloat($(b).find(".shop-filter__product-price").text().replace('$', ''));
                return bPrice - aPrice;
            } else if (order === "low") {
                const aPrice = parseFloat($(a).find(".shop-filter__product-price").text().replace('$', ''));
                const bPrice = parseFloat($(b).find(".shop-filter__product-price").text().replace('$', ''));
                return aPrice - bPrice;
            } else if (order === "a") {
                return aName.localeCompare(bName);
            } else if (order === "z") {
                return bName.localeCompare(aName);
            }
        }).appendTo(productContainer);
    }

    // Event listener for sorting options
    $("#sortOptions li").on("click", function () {
        $('.shop-filter__box-inner').hide()
        const order = $(this).data("value"); // Get the sorting order from the clicked option
        sortProducts(order);
    });
});

$(document).ready(function() {
    // Set the initial price range to 0
    $('#priceFilter').val(30);

    // Updating the price range label based on user input
    $('#priceFilter').on('input', function () {
        const priceRange = parseFloat($(this).val());
        $('#priceValue').text('$30 - $' + priceRange);

        // Adding logic to filter products based on price range
        filterProductsByPriceRange();
    });

    function filterProductsByPriceRange() {
        const priceRange = parseFloat($('#priceFilter').val());

        // Looping through the product items and filter based on price
        $('.shop-filter__item').each(function () {
            const productPrice = parseFloat(
                $(this)
                    .find('.shop-filter__product-price')
                    .text()
                    .replace('$', '')
            );

            if (priceRange == 30 || priceRange >= productPrice) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});

