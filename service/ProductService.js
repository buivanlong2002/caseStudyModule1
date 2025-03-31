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

    updateProduct1(id, updatedProduct) {
        let products = JSON.parse(localStorage.getItem(this.storageKey)) || [];
         let idProduct = parseInt(id);
        let index = products.findIndex(p => p.id === idProduct);

        if (index === -1) {
            console.error("Không tìm thấy sản phẩm với ID:", id);
            return;
        }

        // Cập nhật sản phẩm
        products[index] = { ...products[index], ...updatedProduct };



        console.log("Sản phẩm sau khi cập nhật:", products[index]); // 🛠 Kiểm tra

        // Lưu lại vào localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(products));


    }




    // Xóa sản phẩm theo ID
    deleteProductId(id) {
        let products = this.getProducts().filter(product => product.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    // Xóa tất cả sản phẩm
    deleteAllProducts() {
        localStorage.removeItem(this.storageKey);
    }
}
// let productService1 = new ProductService();
//
// productService1.deleteAllProducts();
//
//
//
// productService1.addProduct(new Products( "Hạch Khô", "hach_kho.jpg", "50.000 VNĐ", "Hạch khô chất lượng cao", 10, 100));
// productService1.addProduct(new Products( "Hành Baro", "hanh_baro.jpg", "20.000 VNĐ", "Hành Baro tươi ngon", 15, 80));
// productService1.addProduct(new Products( "Hạt Điều", "hat_dieu.jpg", "120.000 VNĐ", "Hạt điều rang muối", 5, 50));
// productService1.addProduct(new Products( "Hạt Phỉ", "hat_phi.jpg", "150.000 VNĐ", "Hạt phỉ nhập khẩu", 4, 40));
// productService1.addProduct(new Products( "Hạt Sen", "hat_sen.jpg", "70.000 VNĐ", "Hạt sen khô nguyên chất", 8, 90));
// productService1.addProduct(new Products( "Hạt Vối", "hat_uoi.jpg", "60.000 VNĐ", "Hạt vối khô thơm ngon", 7, 70));
// productService1.addProduct(new Products("Hạt Điều Vỏ", "hat-dieu-vo.jpg", "110.000 VNĐ", "Hạt điều nguyên vỏ", 6, 60));
// productService1.addProduct(new Products( "Hạt Mắc Ca", "hat-mac-ca.jpg", "200.000 VNĐ", "Hạt mắc ca Úc", 5, 55));
// productService1.addProduct(new Products( "Hạt Tiêu", "hat-tieu.jpg", "90.000 VNĐ", "Hạt tiêu đen nguyên hạt", 12, 120));
// productService1.addProduct(new Products( "Hạt Tiêu Xanh", "hat-tieu-xanh.jpg", "100.000 VNĐ", "Hạt tiêu xanh tươi", 9, 80));
// productService1.addProduct(new Products("Mật Ong", "mat-ong.jpg", "180.000 VNĐ", "Mật ong nguyên chất 100%", 10, 70));
// productService1.addProduct(new Products( "Na", "na.jpg", "25.000 VNĐ", "Na tươi ngon, ngọt tự nhiên", 20, 100));
// productService1.addProduct(new Products( "Nhãn Lồng", "nhan_long.jpg", "40.000 VNĐ", "Nhãn lồng thơm ngon", 15, 90));
// productService1.addProduct(new Products( "Óc Chó", "qua-oc-cho.jpg", "130.000 VNĐ", "Óc chó Mỹ giàu dinh dưỡng", 5, 50));
// productService1.addProduct(new Products( "Rau Cải", "rau_cai.jpg", "15.000 VNĐ", "Rau cải xanh tươi", 25, 150));
// productService1.addProduct(new Products( "Rau Cần Tây", "rau_can_tay.jpg", "22.000 VNĐ", "Rau cần tây sạch", 18, 90));
// productService1.addProduct(new Products( "Rau Muống", "rau_muong.jpg", "12.000 VNĐ", "Rau muống tươi ngon", 30, 200));
// productService1.addProduct(new Products( "Súp Lơ", "sup_lo.jpg", "28.000 VNĐ", "Súp lơ xanh tươi", 12, 80));
// productService1.addProduct(new Products( "Thanh Long", "thanh_long.jpg", "30.000 VNĐ", "Thanh long ruột đỏ", 20, 120));
// productService1.addProduct(new Products( "Xà Lách", "xa_lach.jpg", "18.000 VNĐ", "Xà lách tươi giòn", 22, 110));
//
// console.log(productService1.getProducts());