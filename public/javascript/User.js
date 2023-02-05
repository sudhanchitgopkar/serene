class User{
    holdings;
    accounts;
    // the square of 10 - risk aversness is the threshold
    volatilityThreshold = this.getVolatilityThreshold(7);

    constructor(holdings, accounts) {
        this.setHoldings(holdings);
        this.setAccounts(accounts);
    }

    // scans the user's holdings for items with volatility above the threshhold
    // returns a list of the holdings that are deemed too volatile for the user
    getOverlyVolatileHoldings() {
        var volatileHoldings;
        // iterate through holdings
        for (var holding in this.holdings) {
            if (this.holdings[holding].volatility != -1 &&
                // * 10 since we want to compare as percents
                this.holdings[holding].volatility * 10 >= volatilityThreshold) {
                // volatile stock found
                volatileHoltings.push(holdings[holdings]);
            } // if
        } // for holding
        return volatileHoldings;
    } // getOverlyVolatileHoldings()

    // finds the threshold of volatility based on the risk averseness
    getVolatilityThreshold(riskAverseness) {
        return Math.pow(11 - riskAverseness, 2)
    } // getVolatility()

    getHoldings() {
        return this.holdings;
    }

    getAccounts() {
        return this.accounts;
    }

    /**
     * @param {Holding []} holdings
     */
    setHoldings(holdings) {
        this.holdings = holdings;
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
