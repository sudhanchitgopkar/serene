class Account {
    
    balance;
    ID;

    constructor(balance, ID) {
        this.updateBalance(balance);
        this.setID(ID);
    }

    get balance() {
        return this.balance;
    }

    get ID() {
        return this.ID;
    }

    updateBalance(balance) {
        this.balance = balance;
    }

    setID(ID) {
        this.ID = ID;
    }

}