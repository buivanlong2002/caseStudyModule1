class ProductService {
    constructor(storageKey = "products") {
        this.storageKey = storageKey;
    }

    // Lấy danh sách sản phẩm
    getProducts() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    // Thêm một sản phẩm mới
    addProduct(product) {
        let products = this.getProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1; // Tạo ID tự động tăng
        products.push(product);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    // Thêm nhiều sản phẩm
    addProducts(productList) {
        let products = this.getProducts();
        let lastId = products.length ? products[products.length - 1].id : 0;
        productList.forEach((product, index) => {
            product.id = lastId + index + 1;
            products.push(product);
        });
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    // Lấy sản phẩm theo ID
    getProductById(id) {
        return this.getProducts().find(product => product.id === id);
    }

    // Cập nhật sản phẩm
    updateProduct(id, updatedProduct) {
        let products = this.getProducts().map(product =>
            product.id === id ? { ...product, ...updatedProduct } : product
        );
        localStorage.setItem(this.storageKey, JSON.stringify(products));

    }

    // Xóa sản phẩm theo ID
    deleteProduct(id) {
        let products = this.getProducts().filter(product => product.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    // Xóa tất cả sản phẩm
    deleteAllProducts() {
        localStorage.removeItem(this.storageKey);
    }
}
let productService1 = new ProductService();
console.log(productService1.getProducts());