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

// Example Usage:
const orderService1 = new OrderService();
// orderService1.seedData();
console.log(orderService1.getAll()); // Get all orders
