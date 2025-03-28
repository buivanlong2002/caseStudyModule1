

let products1 = [
    [1, 'Hạch Khô', 'hach_kho.jpg', 50000 , 'Hạch khô chất lượng cao', 10, 10],
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [5, 'Hạt Sen', 'hat_sen.jpg', 70000 , 'Hạt sen khô nguyên chất', 8, 9],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
];

let products2 = [
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130. , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
];

let products3 = [
    [8, 'Hạt Mắc Ca', 'hat-mac-ca.jpg', 200000 , 'Hạt mắc ca Úc', 5, 5],
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [20, 'Xà Lách', 'xa_lach.jpg', 18000 , 'Xà lách tươi giòn', 9, 11],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000, 'Súp lơ xanh tươi', 12, 8]
];

let transactions = [
    new Transaction(1, 'Nguyễn Văn An', products1, 20000, "đã thanh toán", 'ATM'),
    new Transaction(2, 'Bùi Văn Long', products2, 30000, "chưa thanh toán", 'COD'),
    new Transaction(3, 'Nguyễn Văn Bình', products3, 30000, "đã thanh toán", 'ATM'),
    new Transaction(4, 'Nguyễn Hoàng Tuấn', products1, 50000, "chưa thanh toán", 'VNPay'),
    new Transaction(5, 'Đỗ Bá Tùng', products2, 40000, "đã thanh toán", 'Momo'),
    new Transaction(6, 'Ngô Gia Khánh', products3, 60000, "chưa thanh toán", 'COD'),
    new Transaction(7, 'Hồ A Tâm', products1, 25000, "đã thanh toán", 'ATM'),
    new Transaction(8, 'Trần Văn Tú', products2, 70000, "đã thanh toán", 'VNPay'),
    new Transaction(9, 'Đinh Đức Hậu', products3, 80000, "chưa thanh toán", 'Momo'),
    new Transaction(10, 'Phạm Trung Hiếu', products1, 90000, "đã thanh toán", 'COD')
];

let currentOrderPage = 1;
let itemOrderPerPage = 8;
function showOrder() {
    transactions.sort((a, b) => a.id - b.id);

    let start = (currentOrderPage - 1) * itemOrderPerPage;
    let end = start + itemOrderPerPage;
    let paginatedItems1 = transactions.slice(start, end);
    document.getElementById("mainContent").innerHTML = `
            <h2>Danh Sách Đơn Hàng</h2>
           
            <table>
                <tr>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Số lượng sản phẩm</th>
                    <th>Giá</th>
                    <th>Thanh toán</th>
                    <th>Phương thức thanh toán</th>
                    
                    <th></th>
                    <th></th>
                </tr>
                <tbody id="showOrder"></tbody>
            </table>
            <div id="paginationOrder" class="pagination-container"></div>
        `;
    let content ='';
    for (let i = 0; i < paginatedItems1.length; i++) {
        content += `
        <tr>
           <td>${transactions[i].id}</td> 
            <td>${transactions[i].nameUser}</td>
            <td>${transactions[i].products.length }</td>
            <td>${transactions[i].getAmount1().toLocaleString()} VND</td>
            <td>${transactions[i].status}</td>
            <td>${transactions[i].payment}</td>
        
            <td><button class="edit-btn" onclick="showOrderDetail(${i+1})">Chi tiết</button></td>
            <td><button class="delete-btn" onclick="deleteTransaction(${i})">Hủy</button></td>
        </tr>
    `;
    }

    document.getElementById("showOrder").innerHTML = content;
    renderPaginationOrder();
}

function renderPaginationOrder() {
    let totalPages = Math.ceil(transactions.length / itemOrderPerPage);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="edit-btn" onclick="changePageOrder(${i})" style="margin: 5px; padding: 5px 10px;">${i}</button>`  ;
    }

    document.getElementById("paginationOrder").innerHTML = paginationHTML;
}


function changePageOrder(page) {
    currentOrderPage = page;
    showOrder();
}
showOrder();


function showOrderDetail(id) {
    let transaction = transactions.find(t => t.id === id);
    if (!transaction) {
        alert("Không tìm thấy đơn hàng!");
        return;
    }

    let productDetails = transaction.products.map(p => `
        <tr>
            <td>${p[0]}</td>
            <td>${p[1]}</td>
            <td><img src="../img/images/${p[2]}" width="50"></td>
            <td>${p[3].toLocaleString('vi-VN')} VND</td>
            <td>${p[4]}</td>
            <td>${p[5]}</td>
        </tr>
    `).join('');

    document.getElementById("mainContent").innerHTML = `
        <h2>Chi Tiết Đơn Hàng #${transaction.id}</h2>
        <p><strong>Người đặt:</strong> ${transaction.nameUser}</p>
        <p><strong>Tổng tiền:</strong> ${transaction.getAmount1().toLocaleString('vi-VN')} VND</p>
        <p><strong>Trạng thái:</strong> ${transaction.status}</p>
        <p><strong>Phương thức thanh toán:</strong> ${transaction.payment}</p>
        
        <h3>Sản phẩm trong đơn hàng:</h3>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Số lượng</th>
            </tr>
            ${productDetails}
        </table>

        <button class="edit-btn" onclick="showOrder()">Quay lại danh sách</button>
    `;
}
function deleteTransaction(id) {
    transactions.splice(id, 1);
    showOrder();
}