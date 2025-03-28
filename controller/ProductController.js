

const productService = new ProductService();
let productList1 = productService.getProducts();

let currentProductPage = 1;
let itemsPerPageProduct = 10;

function showProducts() {
    productList1.sort((a, b) => a.name - b.name);
    let start = (currentProductPage - 1) * itemsPerPageProduct;
    let end = start + itemsPerPageProduct;
    let paginatedItems =  productList1.slice(start, end);

    document.getElementById("mainContent").innerHTML = `
        <h2>Danh Sách Sản Phẩm</h2>
        <button class="edit-btn" onclick="addProduct()">Thêm sản phẩm</button>
        <input class="input-product"  type="text" id="searchProduct"  placeholder="nhập thông tin cần tìm" oninput="searchProduct()">
        <button class="edit-btn" onclick="exportToExcel()">Xuất Excel</button>
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
            <td>${product.price.toLocaleString("vi-VN")} </td>
            <td>${product.description}</td>
            <td>${product.discount}%</td>
            <td>${product.number}</td>
            <td><button class="edit-btn" onclick="editProduct(${product.id})">Sửa</button></td>
            <td><button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button></td>
        </tr>`
    ).join("");

    document.getElementById("showProduct").innerHTML = content;
    renderPagination();
}

function renderPagination() {
    let totalPages = Math.ceil( productList1.length / itemsPerPageProduct);
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
        <h2>Thêm sản phẩm</h2>
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

function editProduct(id) {
    let product = productService.getProducts().find(p => p.id === id);

    if (!product) {
        console.error("Không tìm thấy sản phẩm với ID:", id);
        return;
    }

    document.getElementById("mainContent").innerHTML = `
        <fieldset>
<!--            ID: <input class="input-field" value="${product.id}" id="idEdit" readonly> <br><br>-->
            Name: <input class="input-field" value="${product.name}" id="nameEdit"> <br><br>
            Image: <input class="input-field" value="${product.image}" id="imageEdit"> <br><br>
            Price: <input class="input-field" value="${product.price}" id="priceEdit"> <br><br>
            Description: <input class="input-field" value="${product.description}" id="descriptionEdit"> <br><br>
            Discount: <input class="input-field" value="${product.discount}" id="discountEdit"> <br><br>
            Number: <input class="input-field" value="${product.number}" id="numberEdit"> <br><br>
            <button onclick="updateProduct('${product.id}')" class="edit-btn">Cập nhật</button>
            <button onclick="exit()" class="edit-btn">Quay lại</button>
        </fieldset>`;
}

function updateProduct(id) {
    let priceValue = document.getElementById("priceEdit")?.value.trim() || "0";
    let updatedProduct = {
        // id: document.getElementById("idEdit").value,
        name: document.getElementById("nameEdit").value,
        image: document.getElementById("imageEdit").value,
        price: document.getElementById("priceEdit")?.value.trim() || "0",
        description: document.getElementById("descriptionEdit").value,
        discount: parseFloat(document.getElementById("discountEdit").value),
        number: parseInt(document.getElementById("numberEdit").value)
    };
    productService.updateProduct1(id, updatedProduct);
    productList1 = productService.getProducts();
    showProducts();
}

function deleteProduct(id) {
    productService.deleteProductId(id);
    productList1 = productService.getProducts();
    showProducts();
}

function exit() {
    showProducts();
}

// tìm kiếm sản phẩm
function searchProduct() {
    let keyword = document.getElementById("searchProduct").value.toLowerCase();
    let filteredProducts = productList1.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    // Gọi hàm hiển thị danh sách, nhưng chỉ cập nhật `showProduct`
    document.getElementById("showProduct").innerHTML = filteredProducts.map((product, i) => `
        
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="../img/images/${product.image}" alt="${product.name}" class="product-img"></td>
            <td>${product.price.toLocaleString("vi-VN")}</td>
            <td>${product.description}</td>
            <td>${product.discount}%</td>
            <td>${product.number}</td>
            <td><button class="edit-btn" onclick="editProduct(${product.id})">Sửa</button></td>
            <td><button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button></td>
        </tr>`
    ).join("");

    // Ẩn phân trang khi có từ khóa tìm kiếm
    document.getElementById("paginationProduct").style.display = keyword.length > 0 ? "none" : "block";

}
  // xuất file excel
function exportToExcel() {
    let data = productService.getProducts();

    // Tạo tiêu đề
    let worksheetData = [
        ["DANH SÁCH SẢN PHẨM"], // Tiêu đề chính
        ["ID", "Tên sản phẩm", "Ảnh", "Giá (VND)", "Mô tả", "Giảm giá (%)", "Số lượng"] // Tiêu đề cột
    ];

    // Thêm dữ liệu sản phẩm
    data.forEach(product => {
        worksheetData.push([
            product.id,
            product.name,
            product.image,
            product.price,
            product.description,
            product.discount,
            product.number
        ]);
    });

    // Tạo worksheet
    let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Căn chỉnh và tạo style
    let range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; C++) {
        let cell = worksheet[XLSX.utils.encode_cell({ r: 1, c: C })]; // Tiêu đề cột
        if (cell) {
            cell.s = {
                font: { bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "4F81BD" } },
                alignment: { horizontal: "center" }
            };
        }
    }

    // Tạo workbook
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Sản Phẩm");

    // Xuất file
    XLSX.writeFile(workbook, "ListProduct.xlsx");
}


showProducts();
