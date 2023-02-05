class User{
    holdings;
    accounts;
    volatilityThreshold;

    constructor() {
        this.holdings = new Array();
        this.accounts = new Array();
        //this.volatilityThreshold = this.getVolatilityThreshold(10);
        this.volatilityThreshold = 0;
    }

    // scans the user's holdings for items with volatility above the threshhold
    // returns a list of the holdings that are deemed too volatile for the user
    getOverlyVolatileHoldings() {
        var volatileHoldings = [];
        // iterate through holdings
        for (var holding in this.holdings) {
            const h = this.holdings[holding];
            //console.log(h); // debug
            //console.log("volatility: " + h.volatility); // debug
            if (h.volatility != -1 &&
                // * 10 since we want to compare as percents
                h.volatility * 10 >= this.volatilityThreshold) {
                // volatile stock found
                volatileHoldings.push(h);
            } // if
        } // for holding
        //console.log("volatile! " + volatileHoldings);
        return volatileHoldings;
    } // getOverlyVolatileHoldings()

    // finds the threshold of volatility based on the risk averseness
    // a stock with volatility above this percent is 'too volatile'
    getVolatilityThreshold(riskAverseness) {
        return Math.pow(11 - riskAverseness, 2)
    } // getVolatility()

    getholdings() {
        return this.holdings;
    }

    get accounts() {
        return this.accounts;
    }

    /**
     * @param {Holding []} holdings
     */
    setHoldings(holdings) {
        this.holdings = holdings;
        //console.log(this.holdings); // debug
        //console.log(this.getOverlyVolatileHoldings()); // debug
    }
    
    /**
     * @param {any} accounts
     */
    setAccounts(accounts) {
        this.accounts = accounts;
    }

    /**
     * @param {any} holding
     */
    addHolding(holding) {
        this.holdings.push(holding);
    }

    /**
     * @param {any} account
     */
    addAccount(account) {
        this.accounts.push(account);
    }


}
