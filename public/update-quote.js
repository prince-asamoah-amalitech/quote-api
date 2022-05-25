const quoteId =  document.getElementById('quote-id');
const quotePerson = document.getElementById('quote-person');
const quoteText = document.getElementById('quote-text');
const updateQuote = document.getElementById('update-quote');
const updateMessage = document.getElementById('update-message');
const getQuote = document.getElementById('get-quote');

getQuote.addEventListener('click', () => {
    if (quoteId.value !== '') {
        fetch(`/api/quotes?id=${quoteId.value}`)
        .then(response => {
              if (response.ok) {
              return response.json();
            } else {
              updateMessage.innerText = `Sorry could not get quote with id ${quoteId.value}`;
            }
        }).then(response => {
            const {id, quote, person} = response.quotes;
            quoteId.value = id;
            quotePerson.value = person;
            quoteText.value = quote;
        }).catch(err => console.log(err));
    } else {
        updateMessage.innerText = 'Please enter a quote id to update!';
    }
});

updateQuote.addEventListener('click', () => {
    fetch(`/api/quotes/${quoteId.value}?person=${quotePerson.value}&quote=${quoteText.value}`,
      { method: 'PUT'}
    ).then(response => {
        if (response.ok) {
            console.log(quoteId.value);
            updateMessage.innerText = `Quote with id (${quoteId.value}) has been updated successfuly!`;
            quoteId.value = "";
            quotePerson.value = "";
            quoteText.value = "";
        } else {
            updateMessage.innerText = `Update failed!`;
        }
    }).catch(err => console.log(err));
    
});