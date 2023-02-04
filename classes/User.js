class User{
    
    holdings;
    accounts;

    constructor(holdings, accounts) {
        this.setHoldings(holdings);
        this.setAccounts(accounts);
    }

    get holdings() {
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
    }
    
    /**
     * @param {any} accounts
     */
    setAccounts(accounts) {
        this.accounts = accounts;
    }

}