# Stock Price Checker

## Description
Backend APIs check the price of given stock

## Use 
```
git clone https://github.com/hadinhtu97/stock-price-checker
cd stock-price-checker
npm install
touch .env
[This app use mongodb as database, you need to add a MONGO_URI variable into .env]
npm run start
```

## APIs
* GET : `[]/api/stock-prices?stock=[name]` or `[]/api/stock-prices?stock=[name1]&stock=[name2]`
  * `name` is a NASDAQ stock ticker.
  * You can also pass along a `like` field as true (boolean) to have your like added to the stock(s). Only 1 like per IP should be accepted.
  * If you pass along 2 stocks, the returned value will be an array with information about both stocks. Instead of `likes`, it will display `rel_likes` (the difference between the likes on both stocks) for both stockData objects.
  * Exam:
    * `[]/api/stock-prices?stock=GOOG`
    * `[]/api/stock-prices?stock=GOOG&like=true`
    * `[]/api/stock-prices?stock=GOOG&stock=MSFT`
    * `[]/api/stock-prices?stock=GOOG&stock=MSFT&like=true`

## Testing
Functional test in test directory

Run the project and `run npm run test` to run tests.
