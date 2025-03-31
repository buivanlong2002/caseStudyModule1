class TransactionService {
    constructor() {
        const data = JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactions = data.map(tx => new Transaction(tx.id, tx.nameUser, tx.products, tx.amount, tx.status, tx.payment));
    }

    saveToLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.saveToLocalStorage();
    }

    getTransactionById(id) {
        return this.transactions.find(tx => tx.id === id);
    }

    getAllTransactions() {
        return this.transactions;
    }

    updateTransaction(id, updatedTransaction) {
        const index = this.transactions.findIndex(tx => tx.id === id);
        if (index !== -1) {
            this.transactions[index] = updatedTransaction;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(tx => tx.id !== id);
        this.saveToLocalStorage();
    }

    deleteAllTransactions() {
        this.transactions = [];
        this.saveToLocalStorage();
    }
}

// let manager = new TransactionService();
// let products1 = [
//     [1, 'Hạch Khô', 'hach_kho.jpg', 50000 , 'Hạch khô chất lượng cao', 10, 10],
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [5, 'Hạt Sen', 'hat_sen.jpg', 70000 , 'Hạt sen khô nguyên chất', 8, 9],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
// ];
//
// let products2 = [
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
// ];
//
// let products3 = [
//     [8, 'Hạt Mắc Ca', 'hat-mac-ca.jpg', 200000 , 'Hạt mắc ca Úc', 5, 5],
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [20, 'Xà Lách', 'xa_lach.jpg', 18000 , 'Xà lách tươi giòn', 9, 11],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000, 'Súp lơ xanh tươi', 12, 8]
// ];
//
// // Tạo danh sách giao dịch
// let transactions = [
//     new Transaction(1, 'Nguyễn Văn An', products1, 20000, "đã thanh toán", 'ATM'),
//     new Transaction(2, 'Bùi Văn Long', products2, 30000, "chưa thanh toán", 'COD'),
//     new Transaction(3, 'Nguyễn Văn Bình', products3, 30000, "đã thanh toán", 'ATM'),
//     new Transaction(4, 'Nguyễn Hoàng Tuấn', products1, 50000, "chưa thanh toán", 'VNPay'),
//     new Transaction(5, 'Đỗ Bá Tùng', products2, 40000, "đã thanh toán", 'Momo'),
//     new Transaction(6, 'Ngô Gia Khánh', products3, 60000, "chưa thanh toán", 'COD'),
//     new Transaction(7, 'Hồ A Tâm', products1, 25000, "đã thanh toán", 'ATM'),
//     new Transaction(8, 'Trần Văn Tú', products2, 70000, "đã thanh toán", 'VNPay'),
//     new Transaction(9, 'Đinh Đức Hậu', products3, 80000, "chưa thanh toán", 'Momo'),
//     new Transaction(10, 'Phạm Trung Hiếu', products1, 90000, "đã thanh toán", 'COD')
// ];
//
// // Khởi tạo TransactionService và thêm giao dịch
//
// transactions.forEach(tx => manager.addTransaction(tx));
//
// // In ra danh sách giao dịch
//
//
//
// console.log(manager.getAllTransactions());