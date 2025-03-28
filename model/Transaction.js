class Transaction {
    id ;
    nameUser ;
    products = [] ;
    amount ;
    status ;
    payment ;

    constructor(id, nameUser, products, amount, status, payment) {
        this.id = id;
        this.nameUser = nameUser;
        this.products = products;
        this.amount = amount;
        this.status = status;
        this.payment = payment;
    }
    getAmount1() {
        let sum = 0;
        for (let i = 0; i < this.products.length; i++) {
            sum += (this.products[i][3]  - this.products[i][3] *(this.products[i][5]/100) )*this.products[i][6] ;  // Giá của sản phẩm nằm ở vị trí 3
        }
        return sum;
    }
}