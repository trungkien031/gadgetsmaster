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
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
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

    // Toggle cart dropdown
    $('.cart-icon').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('#cart-dropdown').toggleClass('show');
    });

    // Close cart when clicking outside
    $(document).click(function() {
        $('#cart-dropdown').removeClass('show');
    });

    // Add to cart functionality
    $('.add-to-cart').click(function() {
        const product = $(this).data('product');
        const price = parseFloat($(this).data('price'));
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.product === product);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ 
                product, 
                price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        
        // Show added notification
        const notification = $(`<div class="alert alert-success">${product} added to cart!</div>`);
        $('body').append(notification);
        notification.fadeIn();
        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 2000);
    });

    function updateCart() {
        $('#cart-items').empty();
        let total = 0;
        let itemCount = 0;
        
        if (cart.length === 0) {
            $('#cart-items').append('<p class="text-muted">Your cart is empty</p>');
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * (item.quantity || 1);
                total += itemTotal;
                itemCount += (item.quantity || 1);
                
                $('#cart-items').append(`
                    <div class="cart-item d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h6>${item.product}</h6>
                            <small>$${item.price} x ${item.quantity || 1}</small>
                        </div>
                        <div>
                            <span>$${itemTotal.toFixed(2)}</span>
                            <button class="btn btn-sm btn-outline-danger ml-2 remove-item" data-product="${item.product}">
                                &times;
                            </button>
                        </div>
                    </div>
                `);
            });
        }
        
        $('#cart-total').text(total.toFixed(2));
        $('#cart-count').text(itemCount);
        
        // Add remove item functionality
        $('.remove-item').click(function() {
            const product = $(this).data('product');
            cart = cart.filter(item => item.product !== product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    }
    
    // Category box hover effect
    $('.box').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 500);
    });
});
