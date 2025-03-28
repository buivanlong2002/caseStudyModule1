

let products = [
    new Products(1, 'Hạch Khô', 'hach_kho.jpg', '50.000 VNĐ', 'Hạch khô chất lượng cao', 10, 100),
    new Products(2, 'Hành Baro', 'hanh_baro.jpg', '20.000 VNĐ', 'Hành Baro tươi ngon', 15, 80),
    new Products(3, 'Hạt Điều', 'hat_dieu.jpg', '120.000 VNĐ', 'Hạt điều rang muối', 5, 50),
    new Products(4, 'Hạt Phỉ', 'hat_phi.jpg', '150.000 VNĐ', 'Hạt phỉ nhập khẩu', 4, 40),
    new Products(5, 'Hạt Sen', 'hat_sen.jpg', '70.000 VNĐ', 'Hạt sen khô nguyên chất', 8, 90),
    new Products(6, 'Hạt Vối', 'hat_uoi.jpg', '60.000 VNĐ', 'Hạt vối khô thơm ngon', 7, 70),
    new Products(7, 'Hạt Điều Vỏ', 'hat-dieu-vo.jpg', '110.000 VNĐ', 'Hạt điều nguyên vỏ', 6, 60),
    new Products(8, 'Hạt Mắc Ca', 'hat-mac-ca.jpg', '200.000 VNĐ', 'Hạt mắc ca Úc', 5, 55),
    new Products(9, 'Hạt Tiêu', 'hat-tieu.jpg', '90.000 VNĐ', 'Hạt tiêu đen nguyên hạt', 12, 120),
    new Products(10, 'Hạt Tiêu Xanh', 'hat-tieu-xanh.jpg', '100.000 VNĐ', 'Hạt tiêu xanh tươi', 9, 80),
    new Products(11, 'Mật Ong', 'mat-ong.jpg', '180.000 VNĐ', 'Mật ong nguyên chất 100%', 10, 70),
    new Products(12, 'Na', 'na.jpg', '25.000 VNĐ', 'Na tươi ngon, ngọt tự nhiên', 20, 100),
    new Products(13, 'Nhãn Lồng', 'nhan_long.jpg', '40.000 VNĐ', 'Nhãn lồng thơm ngon', 15, 90),
    new Products(14, 'Óc Chó', 'qua-oc-cho.jpg', '130.000 VNĐ', 'Óc chó Mỹ giàu dinh dưỡng', 5, 50),
    new Products(15, 'Rau Cải', 'rau_cai.jpg', '15.000 VNĐ', 'Rau cải xanh tươi', 25, 150),
    new Products(16, 'Rau Cần Tây', 'rau_can_tay.jpg', '22.000 VNĐ', 'Rau cần tây sạch', 18, 90),
    new Products(17, 'Rau Muống', 'rau_muong.jpg', '12.000 VNĐ', 'Rau muống tươi ngon', 30, 200),
    new Products(18, 'Súp Lơ', 'sup_lo.jpg', '28.000 VNĐ', 'Súp lơ xanh tươi', 12, 80),
    new Products(19, 'Thanh Long', 'thanh_long.jpg', '30.000 VNĐ', 'Thanh long ruột đỏ', 20, 120),
    new Products(20, 'Xà Lách', 'xa_lach.jpg', '18.000 VNĐ', 'Xà lách tươi giòn', 22, 110)
];


let currentProductPage = 1;
let itemsPerPage = 7;

function showProducts() {
    products.sort((a, b) => a.id - b.id);
    let start = (currentProductPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = products.slice(start, end);

    document.getElementById("mainContent").innerHTML = `
        <h2>Danh Sách Sản Phẩm</h2>
        <button class="edit-btn" onclick="addProduct()">Thêm sản phẩm</button>
        <table>
            <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Giảm giá</th>
                <th>Số lượng</th>
                <th></th>
                <th></th>
            </tr>
            <tbody id="showProduct"></tbody>
        </table>
        <div id="pagination" class="pagination-container"></div>
    `;

    let content = '';
    for (let i = 0; i < paginatedItems.length; i++) {
        let product = paginatedItems[i];
        content += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="../img/images/${product.image}" alt="${product.name}" class="product-img" ></td>
            <td>${product.price.toLocaleString()} VND</td>
            <td>${product.description}</td>
            <td>${product.discount}%</td>
            <td>${product.number}</td>
            <td><button class="edit-btn" onclick="editProduct(${start + i})">Sửa</button></td>
            <td><button class="delete-btn" onclick="deleteProduct(${start + i})">Xóa</button></td>
        </tr>
        `;
    }

    document.getElementById("showProduct").innerHTML = content;
    renderPagination();
}

function renderPagination() {
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="edit-btn" onclick="changePageProduct(${i})" style="margin: 5px; padding: 5px 10px;">${i}</button>`  ;
    }

    document.getElementById("pagination").innerHTML = paginationHTML;
}

function changePageProduct(page) {
    currentProductPage = page;
    showProducts();
}

showProducts();

 function addProduct(){
     let contentEdit = `<fieldset >
     MSP: <input type="text" class="input-field"  id="id"> <br> <br>
     name:<input type="text" class="input-field"  id="name"> <br> <br>
     image:<input type="text" class="input-field" id="image"> <br> <br>
     price: <input type="number" class="input-field" id="price"> <br> <br>
     description: <input type="text" class="input-field" id="description"> <br> <br>
     discount: <input type="number" class="input-field"  id="discount"> <br> <br>
     number:<input type="number" class="input-field" id="number"> <br> <br>
    <button onclick="addProdcuts1()" class="edit-btn">Thêm sản phẩm</button>
    <button onclick="exit()" class="edit-btn">Quay lại</button>
    
</fieldset>`
     document.getElementById("mainContent").innerHTML = contentEdit;

 }
 function addProdcuts1(){
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        let image = document.getElementById("image").value;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        let discount = document.getElementById("discount").value;
        let number = document.getElementById("number").value;
       let addProducts = new Products(id, name, image, price, description, discount, number);
       products.push(addProducts);
       showProducts();
 }

function editProduct(index) {
    let contentEdit = `<fieldset >
     id: <input class="input-field" value="${products[index].id}" id="idEdit"> <br> <br>
     name:<input class="input-field" value="${products[index].name}" id="nameEdit"> <br> <br>
     image:<input class="input-field" value="${products[index].image}" id="imageEdit"> <br> <br>
     price: <input class="input-field" value="${products[index].price}" id="priceEdit"> <br> <br>
     description: <input class="input-field" value="${products[index].description}" id="descriptionEdit"> <br> <br>
     discount: <input  class="input-field" value="${products[index].discount}" id="discountEdit"> <br> <br>
     number:<input class="input-field" value="${products[index].number}" id="numberEdit"> <br> <br>
    <button onclick="update(${index})" class="edit-btn">Cập nhập</button>
    <button onclick="exit()" class="edit-btn">Quay lại</button>
    
</fieldset>`
    document.getElementById("mainContent").innerHTML = contentEdit;
}
function exit(){
    showProducts()
}
function update(index){
        let idEdit = document.getElementById('idEdit').value;
        let nameEdit = document.getElementById('nameEdit').value;
        let imageEdit = document.getElementById('imageEdit').value;
        let priceEdit = document.getElementById('priceEdit').value;
        let descriptionEdit = document.getElementById('descriptionEdit').value;
        let discountEdit = document.getElementById('discountEdit').value;
        let numberEdit = document.getElementById('numberEdit').value;
    products[index] = new Products(idEdit, nameEdit, imageEdit, priceEdit, descriptionEdit, discountEdit, numberEdit);

        exit()
}



function deleteProduct(index) {
    products.splice(index, 1);
    showProducts();
}

