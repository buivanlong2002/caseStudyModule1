class OrderService {
    constructor() {
        this.orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('orderList', JSON.stringify(this.orderList));
    }

    generateId() {
        return this.orderList.length > 0 ? Math.max(...this.orderList.map(o => o.id)) + 1 : 1;
    }

    create(order) {
        if (!order.id) {
            order.id = this.generateId();
        }
        this.orderList.push(order);
        this.saveToLocalStorage();
        return true;
    }

    createMultiple(orders) {
        orders.forEach(order => {
            if (!order.id) {
                order.id = this.generateId();
            }
            this.orderList.push(order);
        });
        this.saveToLocalStorage();
        return true;
    }

    read(id) {
        return this.orderList.find(order => order.id === id);
    }

    update(id, updatedOrder) {
        const index = this.orderList.findIndex(order => order.id === id);
        if (index !== -1) {
            Object.assign(this.orderList[index], updatedOrder);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    delete(id) {
        const index = this.orderList.findIndex(order => order.id === id);
        if (index !== -1) {
            this.orderList.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    getAll() {
        return this.orderList;
    }
}
// products8 = [
//     [1, 'Hạch Khô', 'hach_kho.jpg', 50000 , 'Hạch khô chất lượng cao', 10, 10],
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [5, 'Hạt Sen', 'hat_sen.jpg', 70000 , 'Hạt sen khô nguyên chất', 8, 9],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
// ];
//
// let products5 = [
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130. , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
// ];
//
// let products6 = [
//     [8, 'Hạt Mắc Ca', 'hat-mac-ca.jpg', 200000 , 'Hạt mắc ca Úc', 5, 5],
//     [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
//     [20, 'Xà Lách', 'xa_lach.jpg', 18000 , 'Xà lách tươi giòn', 9, 11],
//     [18,'Súp Lơ', 'sup_lo.jpg', 28000, 'Súp lơ xanh tươi', 12, 8]
// ];
// // Dữ liệu đơn hàng
// let orderDetail = [
//     { id: 1, products: products8, totalPrice: '2.000.000', date: '27-03-2025' },
//     { id: 2, products: products6, totalPrice: '2.600.000', date: '27-03-2025' },
//     { id: 3, products: products5, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 4, products: products6, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 5, products: products5, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 6, products: products6, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 7, products: products5, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 8, products: products8, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 9, products: products8, totalPrice: '2.700.000', date: '27-03-2025' },
//     { id: 10, products: products6, totalPrice: '2.700.000', date: '27-03-2025' }
// ];
//
// // Thêm dữ liệu vào OrderService
// const orderService = new OrderService();
// orderService.createMultiple(orderDetail);
// console.log(orderService.getAll());
