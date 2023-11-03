$(document).ready(function() {
    // Filtering
    $('.shop-filter button').on('click', function() {
        const filterValue = $(this).attr('cs-filter');

        // Remove "btn-active" class from all filter buttons
        $('.shop-filter button').removeClass('btn-active');

        // Add "btn-active" class to the clicked button
        $(this).addClass('btn-active');

        if (filterValue === '*') {
            $('.shop-filter__box').show();
        } else {
            $('.shop-filter__box').hide();
            $(`.shop-filter__box[cs-category="${filterValue}"]`).show();
        }
    });

    //for the search section
    $(".form__search-box .form__input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".shop-filter__item.items").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


