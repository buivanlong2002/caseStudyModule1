let orderService = new OrderService();
let listOrder = orderService.getAll();

// Gán ID cho đơn hàng
listOrder = listOrder.map((order, index) => ({
    id: index + 1,
    ...order
}));

let orderDetailsPage = 1;
let orderDetailsPerPage = 3;

function showOrderDetails(page = 1) {
    orderDetailsPage = page;
    listOrder.sort((a, b) => a.id - b.id);

    let startIndex = (orderDetailsPage - 1) * orderDetailsPerPage;
    let endIndex = startIndex + orderDetailsPerPage;
    let displayedOrders = listOrder.slice(startIndex, endIndex);

    let content = `
        <h2 style="text-align: center; color: #333; margin-bottom: 15px;">Danh Sách Đơn Hàng</h2>
        <table border="1" width="100%" cellspacing="0" cellpadding="10" style="border-collapse: collapse; font-size: 14px;">
            <tr style="background-color: #007bff; color: white;">
                <th>ID</th>
                <th>Chi tiết đơn hàng</th>
            </tr>
           ${displayedOrders.map(order => {
        const formattedOrder = new OrderDetails(order.products, order.amount, order.date);
        return `
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
                    ${formattedOrder.products.map(p => `
                        <tr class="product-row">
                            <td align="center"><img src="../img/images/${p[2]}" alt="${p[1]}" class="product-img"></td>
                            <td>${p[1]}</td>
                            <td>${p[3].toLocaleString('vi-VN')} VND</td>
                            <td>${p[5]}%</td>
                            <td>${p[6]}</td>
                        </tr>
                    `).join('')}
                    <tr class="total-row">
                        <td colspan="2" align="left" style="color: red;">
                            Tổng tiền: ${formattedOrder.getA().toLocaleString('vi-VN')} VND
                        </td>
                        <td colspan="3" align="right" style="color: blue;">Ngày đặt: ${formattedOrder.date}</td>
                    </tr>
                </table>
            </td>
        </tr>
    `;
    }).join('')}
        </table>
    `;

    // Phân trang
    content += `<div id="pagination" style="text-align: center; margin-top: 10px;">`;
    for (let i = 1; i <= Math.ceil(listOrder.length / orderDetailsPerPage); i++) {
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
    }, 1);
}