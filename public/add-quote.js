const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote');
  const person = document.getElementById('person');

  fetch(`/api/quotes?quote=${quote.value}&person=${person.value}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then(response => {
      const {id, quote, person} = response.quote;
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="quote-text">${id}. ${quote}</div>
    <div class="attribution">- ${person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
      newQuoteContainer.appendChild(newQuote);
    }).catch(err => console.log(err));
    quote.value = '';
    person.value = '';
});
