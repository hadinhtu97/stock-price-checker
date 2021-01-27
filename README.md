# Stock Price Checker

You should set the content security policies to only allow loading of scripts and CSS from your server.

You can send a GET request to /api/stock-prices with form data containing a NASDAQ stock ticker. Returned will be an object with the property stockData.

The stockData property includes the stock ticker as a string, the price as a number, and likes as a number.

You can also pass along a like field as true (boolean) to have your like added to the stock(s). Only 1 like per IP should be accepted.

If you pass along 2 stocks, the returned value will be an array with information about both stocks. Instead of likes, it will display rel_likes (the difference between the likes on both stocks) for both stockData objects.

All 5 functional tests are complete and passing :

    Viewing one stock: GET request to /api/stock-prices/
    Viewing one stock and liking it: GET request to /api/stock-prices/
    Viewing the same stock and liking it again: GET request to /api/stock-prices/
    Viewing two stocks: GET request to /api/stock-prices/
    Viewing two stocks and liking them: GET request to /api/stock-prices/
