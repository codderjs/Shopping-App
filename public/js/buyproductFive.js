

document.getElementById('buyproduct').addEventListener('click', async function() {

    const product = {
        name: document.querySelector('.Mouse').textContent,
        price: parseFloat(document.querySelector('.price').textContent.replace('₹', '').replace(',', '')),
        quantity: parseInt(document.getElementById('quantitySelector').value, 10),
        image: document.querySelector('.picture-box img').src,
        discount: parseFloat(document.querySelector('.discount').textContent.replace('%', '')),
        mrp: parseFloat(document.querySelector('.mrp span').textContent.replace('₹', '').replace(',', '').replace(',', '')),
    };

    try {
        const response = await fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Failed to buy product to buy');
        }

        const data = await response.json();
        // alert('Congratulations, buy successful!');
        
        window.location.href = '/buyproduct';
    } catch (error) {
        console.error('Error adding product to buy:', error);
        alert('Failed product to buy. Please try again.');
    }



});