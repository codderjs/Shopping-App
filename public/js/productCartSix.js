
document.getElementById('addToCart').addEventListener('click', async function() {
    const product = {
        name: document.querySelector('.keyboard').textContent,
        price: parseFloat(document.querySelector('.price').textContent.replace('₹', '').replace(',', '')),
        quantity: parseInt(document.getElementById('quantitySelector').value, 10),
        image: document.querySelector('.picture-box img').src,
        discount: parseFloat(document.querySelector('.discount').textContent.replace('%', '')),
        mrp: parseFloat(document.querySelector('.mrp span').textContent.replace('₹', '').replace(',', '').replace(',', '')),
    };
    
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const data = await response.json();

        alert("Product added successfully");
        window.location.href = '/cart';
    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart. Please try again.');
    }
});