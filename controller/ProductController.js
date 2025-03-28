

const productService = new ProductService();
let productList1 = productService.getProducts();
console.log(productList1[0]);
let currentProductPage = 1;
let itemsPerPageProduct = 7;

function showProducts() {
    productList1[0].sort((a, b) => a.id - b.id);
    let start = (currentProductPage - 1) * itemsPerPageProduct;
    let end = start + itemsPerPageProduct;
    let paginatedItems =  productList1[0].slice(start, end);

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
        <div id="paginationProduct" class="pagination-container"></div>
    `;

    let content = paginatedItems.map((product, i) => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="../img/images/${product.image}" alt="${product.name}" class="product-img"></td>
            <td>${product.price} VND</td>
            <td>${product.description}</td>
            <td>${product.discount}%</td>
            <td>${product.number}</td>
            <td><button class="edit-btn" onclick="editProduct(${start + i})">Sửa</button></td>
            <td><button class="delete-btn" onclick="deleteProduct(${start + i})">Xóa</button></td>
        </tr>`
    ).join("");

    document.getElementById("showProduct").innerHTML = content;
    renderPagination();
}

function renderPagination() {
    let totalPages = Math.ceil( productList1[0].length / itemsPerPageProduct);
    document.getElementById("paginationProduct").innerHTML = Array.from({ length: totalPages }, (_, i) =>
        `<button class="edit-btn" onclick="changePageProduct(${i + 1})">${i + 1}</button>`
    ).join("");
}

function changePageProduct(page) {
    currentProductPage = page;
    showProducts();
}

function addProduct() {
    document.getElementById("mainContent").innerHTML = `
        <fieldset>
            MSP: <input type="text" class="input-field" id="id"> <br><br>
            Name: <input type="text" class="input-field" id="name"> <br><br>
            Image: <input type="text" class="input-field" id="image"> <br><br>
            Price: <input type="number" class="input-field" id="price"> <br><br>
            Description: <input type="text" class="input-field" id="description"> <br><br>
            Discount: <input type="number" class="input-field" id="discount"> <br><br>
            Number: <input type="number" class="input-field" id="number"> <br><br>
            <button onclick="addProductToService()" class="edit-btn">Thêm sản phẩm</button>
            <button onclick="exit()" class="edit-btn">Quay lại</button>
        </fieldset>`;
}

function addProductToService() {
    let product = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        image: document.getElementById("image").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        discount: parseFloat(document.getElementById("discount").value),
        number: parseInt(document.getElementById("number").value)
    };
    productService.addProduct(product);
    showProducts();
}

function editProduct(index) {
    let product = productList1[0][index];
    document.getElementById("mainContent").innerHTML = `
        <fieldset>
            ID: <input class="input-field" value="${product.id}" id="idEdit"> <br><br>
            Name: <input class="input-field" value="${product.name}" id="nameEdit"> <br><br>
            Image: <input class="input-field" value="${product.image}" id="imageEdit"> <br><br>
            Price: <input class="input-field" value="${product.price}" id="priceEdit"> <br><br>
            Description: <input class="input-field" value="${product.description}" id="descriptionEdit"> <br><br>
            Discount: <input class="input-field" value="${product.discount}" id="discountEdit"> <br><br>
            Number: <input class="input-field" value="${product.number}" id="numberEdit"> <br><br>
            <button onclick="updateProduct(${index})" class="edit-btn">Cập nhật</button>
            <button onclick="exit()" class="edit-btn">Quay lại</button>
        </fieldset>`;
}

function updateProduct(index) {
    let updatedProduct = {
        id: document.getElementById("idEdit").value,
        name: document.getElementById("nameEdit").value,
        image: document.getElementById("imageEdit").value,
        price: parseFloat(document.getElementById("priceEdit").value),
        description: document.getElementById("descriptionEdit").value,
        discount: parseFloat(document.getElementById("discountEdit").value),
        number: parseInt(document.getElementById("numberEdit").value)
    };
    productService.updateProduct(index, updatedProduct);
    showProducts();
}

function deleteProduct(index) {
    productService.deleteProduct(index);
    showProducts();
}

function exit() {
    showProducts();
}

showProducts();
