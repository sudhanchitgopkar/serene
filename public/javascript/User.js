class User{
    holdings;
    accounts;

    constructor(holdings, accounts) {
        this.setHoldings(holdings);
        this.setAccounts(accounts);
    }

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