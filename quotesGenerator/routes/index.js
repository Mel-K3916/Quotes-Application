var express = require('express');
var router = express.Router();
const axios = require('axios'); //handle API calls

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // 1. Fetch data from the API
    const response = await axios.get('https://zenquotes.io/api/random');
    
    // 2. Extract the quote and author from the API response
    // ZenQuotes returns an array, so we look at the first item [0]
    const quoteData = response.data[0]; 

    // 3. Render the page and pass the data to the view
    res.render('index', { 
      title: 'Quote of the Day', 
      quote: quoteData.q, 
      author: quoteData.a 
    });

  } catch (error) {
    console.error("Error fetching quote:", error);
    res.render('index', { 
      title: 'Quotes App', 
      quote: "The best way to predict the future is to invent it.", 
      author: "Alan Kay (Fallback)" 
    });
  }
});

module.exports = router;
