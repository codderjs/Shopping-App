
function formatNumberWithCommas(number) {
    let num = number.toString();
    let lastThree = num.substring(num.length - 3);
    let otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

document.addEventListener('DOMContentLoaded', async function() {
    const buyItemsContainer = document.querySelector('.container');

    async function fetchBuyItem() {
        try {
            const response = await fetch('/api/buy');
            const products = await response.json();
            renderBuy(products);
        } catch (error) {
            console.error('Error fetching buy items:', error);
            alert('Failed to load buy items. Please try again later.');
        }
    }

    function renderBuy(buyItems) {
        buyItemsContainer.innerHTML = '';
        buyItems.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'buy-item';
            itemElement.innerHTML = `
                <div class="buy-item-content">
                    <div class="buy-item-section-one">
                        <div class="image-quantity">
                            <div class="buy-item-image">
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
                    <div class="buy-item-section-two">
                        <div class="buy-product">
                            <button class="place-order-button"> Place Order </button>
                        </div>
                    </div>
                </div>
            `;
            buyItemsContainer.appendChild(itemElement);
        });

          // Add event listener to the "Place Order" button
          const placeOrderButtons = document.querySelectorAll('.place-order-button');
          placeOrderButtons.forEach(button => {
              button.addEventListener('click', () => {
                  alert('Congratulations, buy successful!');
                    

              });
          });
    }

    // Initial fetch and render
    await fetchBuyItem();
});
