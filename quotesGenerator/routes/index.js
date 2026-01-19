var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    // ZenQuotes returns an array, so we take the first item [0]
    const data = response.data[0]; 

    res.render('index', { 
      title: 'Famous Quotes',
      quote: data.q,  // 'q' is the quote text from the API
      author: data.a  // 'a' is the author name from the API
    });
  } catch (error) {
    console.log("API Error:", error);
    res.render('index', { 
      title: 'Famous Quotes', 
      quote: "The best way to predict the future is to create it.", 
      author: "Peter Drucker" 
    });
  }
});

module.exports = router;