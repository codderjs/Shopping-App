
function formatNumberWithCommas(number) {
    let num = number.toString();
    let lastThree = num.substring(num.length - 3);
    let otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}



document.addEventListener('DOMContentLoaded', async function() {
    const cartItemsContainer = document.getElementById('cartItems');

    const itemPriceElement = document.getElementById("itemPrice");
    const itemDiscountElement = document.getElementById("itemDiscount");
    const deliveryChargesElement = document.getElementById("deliveryCharges");
    const totalAmountElement = document.getElementById("totalAmount");
    const countitemElement = document.getElementById('countitem');
    async function fetchCartItems() {
        try {
            const response = await fetch('/api/cart');
            
            const products = await response.json();

            renderCart(products);
            updatePriceDetails(products);
                 

        } catch (error) {
            console.error('Error fetching cart items:', error);
            alert('Failed to load cart items. Please try again later.');
        }
    }

    function renderCart(cart) {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            const emptyCartMessage = document.createElement('div');
            emptyCartMessage.className = 'empty-cart';
            emptyCartMessage.textContent = 'Your cart is empty!';
            cartItemsContainer.appendChild(emptyCartMessage);
            return;
        }

        cart.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-content">
                    <div class="cart-item-section-one">
                        <div class="image-quentity">
                            <div class="cart-item-image">
                                <div class="image">
                                    <img src="${item.image}" alt="">
                                </div>
                            </div>
                            <div class="quantity">
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                        <div class="product-name">
                            <div id="productname">
                                <p>${item.name}</p>
                            </div>
                            <div class="product-mrp">
                                <div id="arrow"><i class="fa-solid fa-arrow-down"></i></div>
                                <div id="discount">${item.discount}%</div>
                                <div id="mrp">₹ ${formatNumberWithCommas(item.mrp)}</div>
                                <div id="price">₹${formatNumberWithCommas(item.price)}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item-section-two">
                        <div class="delete">
                            <button class="remove-item" data-id="${item._id}"> <i class="fa-solid fa-trash"></i> Remove</button>
                        </div>
                        <div class="buy-product">
                            <button><a href="/buyproduct"> Buy Now </a></button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', async function() {
                const productId = this.dataset.id;
                await removeFromCart(productId);
                await fetchCartItems();
            });
        });
    }

    async function removeFromCart(productId) {
        try {
            const response = await fetch(`/api/cart/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            alert('Product removed successfully');
        } catch (error) {
            console.error('Error removing product from cart:', error);
            alert('Failed to remove product from cart. Please try again.');
        }
    }


     // Price Detail Updates.
     function updatePriceDetails(calculate){
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalCounts = 0;
        const deliveryCharges = 40;
    
        calculate.forEach(item => {

            const mrp = parseInt(item.mrp, 10);
            const discount = parseInt(item.discount, 10);
            const quantity = parseInt(item.quantity, 10);
            
            const itemDiscount = (mrp * discount / 100) * quantity;
            totalDiscount += itemDiscount;
            totalPrice += (mrp * quantity) - itemDiscount;
            totalCounts += quantity;
        });


        let finalDeliveryCharges = totalPrice > 500 ? 0 : deliveryCharges;

        countitemElement.textContent = totalCounts;
        itemPriceElement.textContent = `₹${formatNumberWithCommas((totalPrice).toFixed(0))}`;
        itemDiscountElement.textContent = `₹${formatNumberWithCommas(totalDiscount.toFixed(0))}`;
        deliveryChargesElement.textContent = `₹${formatNumberWithCommas(deliveryCharges.toFixed(0))}`;
        totalAmountElement.textContent = `₹${formatNumberWithCommas((totalPrice  + finalDeliveryCharges).toFixed(0))}`;
    }


    // Initial fetch and render
    await fetchCartItems();
});
