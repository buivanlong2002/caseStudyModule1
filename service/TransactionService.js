class TransactionService {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    // Create
    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.saveToLocalStorage();
    }

    // Read
    getTransactionById(id) {
        return this.transactions.find(tx => tx.id === id);
    }

    getAllTransactions() {
        return this.transactions;
    }

    // Update
    updateTransaction(id, updatedTransaction) {
        const index = this.transactions.findIndex(tx => tx.id === id);
        if (index !== -1) {
            this.transactions[index] = updatedTransaction;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Delete
    deleteTransaction(id) {
        const index = this.transactions.findIndex(tx => tx.id === id);
        if (index !== -1) {
            this.transactions.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
}
let manager =  new TransactionService();

console.log(manager.getAllTransactions());

