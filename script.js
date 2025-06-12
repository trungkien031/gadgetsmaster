$(document).ready(function() {
    // Initialize Slick Slider for Featured Products
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    $('.add-to-cart').click(function() {
        const product = $(this).data('product');
        const price = $(this).data('price');
        cart.push({ product, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    function updateCart() {
        $('#cart-items').empty();
        let total = 0;
        cart.forEach(item => {
            $('#cart-items').append(`<p>${item.product} - $${item.price}</p>`);
            total += item.price;
        });
        $('#cart-total').text(total);
        $('#cart-count').text(cart.length);
    }
});