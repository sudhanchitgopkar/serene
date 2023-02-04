const Security = class {
    ticker;
    numberOfShares;
    prices;
    type;

    constructor(ticker, numberOfShares, type) {
        this.ticker = ticker;
        this.numberOfShares = numberOfShares;
        this.type = type;
        this.prices = type === "equity" ? this.parsePrices(this.queryPriceHistory(ticker)): -1;
    }

    // get the most recent price
    /*getPrice() {
        return this.prices[this.prices.length - 1];
    } // getPrice()*/

    // the volatility (std deviation) of the security as a percent of its mean price
    calculateVolatilty(unitsOfTimeBack) {
        meanPrice = meanPrice(unitsOfTimeBack);
        sumOfSquareOfDifferences = 0;
        for (unitOfTime = 0; unitOfTime < unitsOfTimeBack; unitOfTime++) {
            difference = dailyPrices[dailyPrices.length - 1 - unitOfTime] - meanPrice;
            square = difference * difference;
            sumOfSquareOfDifferences += square;
        } // for month
        variance = sumOfSquareOfDifferences / unitsOfTimeBack;
        stdDeviation = Math.sqrt(variance);
        return stdDeviation / meanPrice;
    } // calculateVolatility()

    // find the mean price of the stock going so many unitsOfTimeBack
    meanPrice(unitsOfTimeBack) {
        sum = 0;
        for (unitOfTime = 0; unitOfTime < unitsOfTimeBack; unitOfTime++) {
            sum += prices[dailyPrices.length - 1 - unitOfTime];
        } // for month
        return sum / unitsOfTimeBack;
    } // meanPrice()
    
    // returns the price information from Alpha Vantage in a json
    queryPriceHistory(ticker) {
        console.groupCollapsed("Anything")
        let apikey = "8GJ0ZCRX0UGW3NPC";

        let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED"
        url += "&symbol=" + ticker;
        url += "&datatype=" + "json";
        url += "&apikey=" + apikey;

        var json = {};
        $.ajax({
            url: url + "&origin=*",
            async: false,
            dataType: "json",
            success: function (data) {
                json = data;
            },
        });
        console.log(json);
        return json;
    } // queryPriceHistory()

    // returns the daily prices in an array made from a json
    parsePrices(json) {
        //var metadata = convert(json["Meta Data"]);
        //var tickerStats = convert(json["Time Series (Daily)"]);
        //tickerStats.forEach(unitOfTime => prices.push(unitOfTime["5. Adjusted Close"]));
    } // paresPrices()
};
