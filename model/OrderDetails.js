
 class OrderDetails {

     constructor( products, amount, date) {

         this.products = products;
         this.amount = amount;
         this.date = date;
     }

     getA() {
         if (!Array.isArray(this.products) || this.products.length === 0) {
             return 0;
         }
         let sum = 0;
         for (let i = 0; i < this.products.length; i++) {
             let price = this.products[i][3];   // Giá sản phẩm
             let discount = this.products[i][5]; // % giảm giá
             let quantity = this.products[i][6]; // Số lượng

             if (price == null || discount == null || quantity == null) {
                 continue;  // Bỏ qua nếu dữ liệu không hợp lệ
             }

             sum += (price - price * (discount / 100)) * quantity;
         }
         return sum;
     }
}
let order = new OrderDetails([ [1, 'Hạch Khô', 'hach_kho.jpg', 50000, 'Hạch khô chất lượng cao', 10, 10],

 [14, 'Óc Chó', 'qua-oc-cho.jpg', 130000, 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],

 [5, 'Hạt Sen', 'hat_sen.jpg', 70000, 'Hạt sen khô nguyên chất', 8, 9],

[18, 'Súp Lơ', 'sup_lo.jpg', 28000, 'Súp lơ xanh tươi', 12, 8]] , 348464 , 'djfguyrf' );


console.log(order.getA())

