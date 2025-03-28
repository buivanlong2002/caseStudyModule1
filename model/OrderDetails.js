
 class OrderDetails {

     constructor(id, products, amount, date) {
         this.id = id;
         this.products = products;
         this.amount = amount;
         this.date = date;
     }

     getAmount() {
        let sum = 0;
        for (let i = 0; i < this.products.length; i++) {
            sum += (this.products[i][3]  - this.products[i][3] *(this.products[i][5]/100) )*this.products[i][6] ;  // Giá của sản phẩm nằm ở vị trí 3
        }
        return sum;
    }
}

