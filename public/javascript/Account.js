class Account {
    
    balance;
    ID;

    constructor(balance, ID) {
        this.updateBalance(balance);
        this.setID(ID);
    }

    getBalance() {
        return this.balance;
    }

    getID() {
        return this.ID;
    }

    updateBalance(balance) {
        this.balance = balance;
    }

    setID(ID) {
        this.ID = ID;
    }

}