let products8 = [
    [1, 'Hạch Khô', 'hach_kho.jpg', 50000 , 'Hạch khô chất lượng cao', 10, 10],
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [5, 'Hạt Sen', 'hat_sen.jpg', 70000 , 'Hạt sen khô nguyên chất', 8, 9],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
];

let products5 = [
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130. , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000 , 'Súp lơ xanh tươi', 12, 8]
];

let products6 = [
    [8, 'Hạt Mắc Ca', 'hat-mac-ca.jpg', 200000 , 'Hạt mắc ca Úc', 5, 5],
    [14,'Óc Chó', 'qua-oc-cho.jpg', 130000 , 'Óc chó Mỹ giàu dinh dưỡng', 5, 5],
    [20, 'Xà Lách', 'xa_lach.jpg', 18000 , 'Xà lách tươi giòn', 9, 11],
    [18,'Súp Lơ', 'sup_lo.jpg', 28000, 'Súp lơ xanh tươi', 12, 8]
];



let orderDetailsPage = 1;
let orderDetailsPerPage = 2; // Số đơn hàng trên mỗi tran
let orderDetail = [
    new OrderDetails(1,products8,'2.000.000' ,"27-03-2025"),
    new OrderDetails(2,products6,'2.600.000' ,"27-03-2025"),
    new OrderDetails(3,products5,'2.700.000' ,"27-03-2025"),
    new OrderDetails(4,products6,'2.700.000' ,"27-03-2025"),
    new OrderDetails(5,products5,'2.700.000' ,"27-03-2025"),
    new OrderDetails(6,products6,'2.700.000' ,"27-03-2025"),
    new OrderDetails(7,products5,'2.700.000' ,"27-03-2025"),
    new OrderDetails(8,products8,'2.700.000' ,"27-03-2025"),
    new OrderDetails(9,products8,'2.700.000' ,"27-03-2025"),
    new OrderDetails(10,products6,'2.700.000' ,"27-03-2025")
];


console.log(orderDetail);

function showOrderDetails(page = 1) {
    orderDetailsPage = page;
    orderDetail.sort((a, b) => a.id - b.id);

    let startIndex = (orderDetailsPage - 1) * orderDetailsPerPage;
    let endIndex = startIndex + orderDetailsPerPage;
    let displayedOrders = orderDetail.slice(startIndex, endIndex);

    let content = `
        <h2 style="text-align: center; color: #333; margin-bottom: 15px;">Danh Sách Đơn Hàng</h2>
        <table border="1" width="100%" cellspacing="0" cellpadding="10" style="border-collapse: collapse; font-size: 14px;">
            <tr style="background-color: #007bff; color: white;">
                <th>ID</th>
                <th>Chi tiết đơn hàng</th>
            </tr>
    `;

    for (let order of displayedOrders) {
        content += `
            <tr class="order-row">
                <td align="center"><strong>${order.id}</strong></td>
                <td>
                    <table width="100%" cellspacing="0" cellpadding="5" class="inner-table">
                        <tr style="background-color: #f8f9fa;">
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Giảm giá</th>
                            <th>Số lượng</th>
                        </tr>
                        ${order.products.map(p => `
                            <tr class="product-row">
                                <td align="center"><img src="../img/images/${p[2]}" alt="${p[1]}" class="product-img"></td>
                                <td>${p[1]}</td>
                                <td>${p[3].toLocaleString('vi-VN')} VND</td>
                                <td>${p[5]}%</td>
                                <td>${p[6]}</td>
                            </tr>
                        `).join('')}
                        <tr class="total-row">
                            <td colspan="2" align="left" style="color: red;">Tổng tiền: ${order.getAmount().toLocaleString('vi-VN')} VND</td>
                            <td colspan="3" align="right" style="color: blue;">Ngày đặt: ${order.date}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        `;
    }

    content += `</table>`;

    // Phân trang
    content += `<div id="pagination" style="text-align: center; margin-top: 10px;">`;
    for (let i = 1; i <= Math.ceil(orderDetail.length / orderDetailsPerPage); i++) {
        content += `<button onclick="changePage(${i})" class="edit-btn" style="margin: 5px; padding: 5px 10px;">${i}</button>`;
    }
    content += `</div>`;

    document.getElementById("mainContent").innerHTML = content;

    setTimeout(() => {
        document.getElementById("mainContent").classList.remove("fade-out");
        document.getElementById("mainContent").classList.add("fade-in");
    }, 1);
}

function changePage(page) {
    document.getElementById("mainContent").classList.add("fade-out");
    setTimeout(() => {
        showOrderDetails(page);
    }, 300);
}
