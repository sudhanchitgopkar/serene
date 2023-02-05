const Security = class {
    ticker;
    numberOfShares;
    type;
    price;
    volatility;

    // constructor
    constructor(ticker, numberOfShares, type) {
        this.ticker = ticker;
        this.numberOfShares = numberOfShares;
        this.type = type;
        if (type === "equity" || type === "etf" || type === "mutual fund") {
            const prices = this.parsePrices(this.queryPriceHistory(ticker));
            this.price = prices[0];
            this.volatility = this.calculateVolatilty(prices);
            //console.log("price of this security: " + this.getPrice());// debug
        } else {
            this.price = -1;
            this.volatility = -1;
        } // if
    } // constructor()

    // get the most recent price
    getPrice() {
        //return this.prices[this.prices.length - 1];
        //return this.prices[Object.keys(this.prices).length - 1];
        return this.price;
    } // getPrice()

    // the volatility (std deviation) of the security as a percent of its mean price
    calculateVolatilty(prices) {
        const unitsOfTimeBack = 21; // 21 trading days is typical for historical volatility
        const meanPrice = this.meanPrice(prices, unitsOfTimeBack);
        var sumOfSquareOfDifferences = 0;
        for (var unitOfTime = 0; unitOfTime < unitsOfTimeBack; unitOfTime++) {
            //const difference = dailyPrices[dailyPrices.length - 1 - unitOfTime] - meanPrice;
            const difference = prices[unitOfTime] - meanPrice;
            const square = difference * difference;
            sumOfSquareOfDifferences += square;
        } // for month
        const variance = sumOfSquareOfDifferences / unitsOfTimeBack;
        const stdDeviation = Math.sqrt(variance);
        return stdDeviation / meanPrice;
    } // calculateVolatility()

    // find the mean price of the stock going so many unitsOfTimeBack
    meanPrice(prices, unitsOfTimeBack) {
        var sum = 0;
        for (var unitOfTime = 0; unitOfTime < unitsOfTimeBack; unitOfTime++) {
            sum += prices[Object.keys(prices).length - 1 - unitOfTime];
        } // for month
        return sum / unitsOfTimeBack;
    } // meanPrice()
    
    // returns the price information from Alpha Vantage in a json
    queryPriceHistory(ticker) {
        //console.groupCollapsed("Anything") // is this needed?
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
        // console.log(json); // debug
        //console.log("size of json: " + json.size); // debug
        return json;
    } // queryPriceHistory()

    // returns the daily prices in an array made from a json
    parsePrices(json) {
        var pricesArr = [];
        // console.log(json); // debug
        for (var day in json["Time Series (Daily)"]) {
            pricesArr.push(parseFloat(json["Time Series (Daily)"][day]["5. adjusted close"]));
        } // for day
        return pricesArr;

        /*
        //var metadata = convert(json["Meta Data"]);
        const tickerStats = json["Time Series (Daily)"];
        console.log("size of json[time series...]: " + Object.keys(tickerStats).length); // dubug
        //tickerStats.forEach(unitOfTime => prices.push(unitOfTime["5. Adjusted Close"]));
        var stockPrices = [];
        for (var unitOfTime in tickerStats) {
            stockPrices.push(unitOfTime["5. adjusted close"]);
            //console.log(unitOfTime["5. adjusted close"]); // debug
        } // for unitOfFime
        return stockPrices;
        */
    } // paresPrices()
};
