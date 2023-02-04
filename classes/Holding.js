class Holding {
    
    securities;

    constructor(securities) {
        this.setSecurities(securities)
    }

    get securities() {
        return this.securities;
    }

    setSecurities(securities) {
        this.securities = securities;
    }
}