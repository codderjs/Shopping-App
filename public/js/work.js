
document.querySelector('.panel').addEventListener('click', function() {
    var optionsContainer = document.querySelector('.options-container');
    if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
        optionsContainer.style.display = 'flex';
    } else {
        optionsContainer.style.display = 'none';
    }
});