const express = require('express');
const app = express();
const quoteRouter = require('express').Router();
let { quotes, nextQuoteId } = require('./data');
const { getRandomElement, getElementByIndex, updateElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes', quoteRouter);

//Get parameters and query values from request objects
const getRequestValues = (req, res, next) => {
  req.quotePerson = req.query.person;
  req.quote = req.query.quote;
  req.quoteParamsId = Number(req.params.id);
  req.quoteQueryId = Number(req.query.id);
  next();
}

//Get random quotes
quoteRouter.get('/random', (req, res, next) => {
    const randQuote = getRandomElement(quotes);
    res.send({quote: randQuote});
});

//Get quote by person name or quote id
quoteRouter.get("/", getRequestValues, (req, res, next) => {
  if (req.quotePerson) {
    const quotesByPerson = quotes.filter(
      (quote) => quote.person === req.query.person
    );
    res.status(200).send({ quotes: quotesByPerson });
  } else if (req.quoteQueryId) {
    const quoteById = quotes.find((quote) => quote.id === req.quoteQueryId);
    res.status(200).send({ quotes: quoteById });
  } else {
    res.send({ quotes });
  }
});

//Create quotes
quoteRouter.post("/", getRequestValues, (req, res, next) => {
    if (req.quote && req.quotePerson) {
      const newQuote = {
        id: nextQuoteId,
        quote: req.quote,
        person: req.quotePerson,
      };
      quotes.push(newQuote);
      nextQuoteId += 1;
      res.send({ quote: newQuote});
  } else {
      res.status(400).send();
  }
});

//Update quotes with id
quoteRouter.put("/:id", getRequestValues, (req, res, next) => {
  if (req.quoteParamsId) {
    if (req.quote && req.quotePerson) {
      const quoteIndex = getElementByIndex(req.quoteParamsId, quotes);
      if (quoteIndex !== -1) {
        const quoteUpdate = {
          id: req.quoteParamsId,
          quote: req.quote,
          person: req.quotePerson,
        };
        updateElement(quoteIndex, quotes, quoteUpdate);
        res.status(200).send();
      }
    }
  } else {
    res.status(400).send();
  }
});

//Delete quotes with id
quoteRouter.delete("/:id", getRequestValues, (req, res, next) => {
  const quoteIndex = getElementByIndex(req.quoteParamsId, quotes);
  if (quoteIndex !== -1) {
    quotes.splice(quoteIndex, 1);
    res.status(204).send(quotes);
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
