
const quoteId = document.getElementById('quote-id');
const deleteQuote = document.getElementById('delete-quote');
const deleteMessage = document.getElementById('delete-message');

deleteQuote.addEventListener('click', () => {
    fetch(`/api/quotes/${quoteId.value}`, { method: 'DELETE' })
    .then(response => {
        // console.log(response.json());
        if (response.ok) {
            deleteMessage.innerText = `Quote with id (${quoteId.value}) deleted successfully!`;
        } else {
            deleteMessage.innerText = `Sorry but deletion not successful!, quote with id (${quoteId.value}) does not exist!`;
        }
        quoteId.value = "";
    }).catch(err => console.log(err));
});