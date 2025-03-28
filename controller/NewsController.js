
let newsList = [
    new News(1, "Ra mắt bộ sưu tập Xuân Hè", "Admin", "2025-03-27", "Chúng tôi vừa ra mắt bộ sưu tập thời trang Xuân Hè mới."),
    new News(2, "Giảm giá đặc biệt tháng 4", "Nguyễn Văn A", "2025-03-26", "Nhiều ưu đãi hấp dẫn lên đến 50% cho khách hàng."),
    new News(3, "Hướng dẫn bảo quản sản phẩm", "Trần Thị B", "2025-03-25", "Những mẹo bảo quản giúp tăng tuổi thọ sản phẩm."),
    new News(4, "Cập nhật chính sách đổi trả", "Phạm Minh C", "2025-03-24", "Chúng tôi đã gia hạn chính sách đổi trả lên 30 ngày."),
    new News(5, "Tuyển dụng nhân sự mới", "Lê Văn D", "2025-03-23", "Cơ hội làm việc tại công ty với nhiều vị trí hấp dẫn."),
    new News(6, "Hợp tác với thương hiệu lớn", "Trương Quốc H", "2025-03-22", "Chúng tôi vừa ký kết hợp tác với đối tác quốc tế."),
    new News(7, "Sản phẩm thân thiện môi trường", "Nguyễn Hữu T", "2025-03-21", "Ra mắt dòng sản phẩm xanh, bảo vệ môi trường."),
    new News(8, "Chương trình khách hàng thân thiết", "Đỗ Hoàng P", "2025-03-20", "Ưu đãi đặc biệt cho thành viên VIP của chúng tôi."),
    new News(9, "Sự kiện tri ân khách hàng", "Nguyễn Văn K", "2025-03-19", "Mời bạn tham dự sự kiện đặc biệt vào tháng sau."),
    new News(10, "Mở rộng cửa hàng mới", "Lý Minh N", "2025-03-18", "Cửa hàng mới tại trung tâm thương mại sắp khai trương."),
    new News(11, "Bí quyết phối đồ đẹp", "Hoàng Anh Q", "2025-03-17", "Những mẹo phối đồ giúp bạn nổi bật hơn."),
    new News(12, "Công nghệ sản xuất tiên tiến", "Vũ Hải M", "2025-03-16", "Ứng dụng công nghệ hiện đại trong sản xuất."),
    new News(13, "Xu hướng thời trang 2025", "Trịnh Nhật P", "2025-03-15", "Dự đoán những phong cách thời trang hot nhất năm."),
    new News(14, "Chia sẻ từ khách hàng", "Khánh Linh N", "2025-03-14", "Những phản hồi tích cực từ khách hàng thân thiết."),
    new News(15, "Hỗ trợ khách hàng 24/7", "Lương Bảo H", "2025-03-13", "Dịch vụ hỗ trợ khách hàng đã được nâng cấp."),
    new News(16, "Sản phẩm handmade độc đáo", "Dương Tấn A", "2025-03-12", "Những sản phẩm thủ công mang đậm nét cá nhân."),
    new News(17, "Giải đáp thắc mắc khách hàng", "Cao Ngọc T", "2025-03-11", "Chúng tôi giải đáp tất cả câu hỏi thường gặp."),
    new News(18, "Thị trường tiêu dùng năm nay", "Đặng Thùy D", "2025-03-10", "Phân tích xu hướng tiêu dùng của năm 2025."),
    new News(19, "Lịch sử thương hiệu", "Ngô Minh C", "2025-03-09", "Câu chuyện phát triển của thương hiệu chúng tôi."),
    new News(20, "Quà tặng đặc biệt", "Tạ Thị H", "2025-03-08", "Chương trình quà tặng hấp dẫn cho khách hàng."),
];;

let currentNewsPage = 1;
let itemsPerPageNews = 9;
function newsController() {

    newsList.sort((a, b) => a.id - b.id);

    let start = (currentNewsPage - 1) * itemsPerPageNews;
    let end = start + itemsPerPageNews;
    let news1 = newsList.slice(start, end);

    let content2 = `
        <h2>Danh Sách Tin Tức</h2>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Ngày đăng</th>
                <th>Nội dung</th>
                <th>Sửa</th>
                <th>Xóa</th>
            </tr>
    `;

    for (let news of news1) {
        content2 += `
            <tr>
                <td>${news.id}</td>
                <td>${news.title}</td>
                <td>${news.author}</td>
                <td>${news.date}</td>
                <td>${news.content}</td>
                <td><button class="edit-btn" onclick="editNews(${news.id})">Sửa</button></td>
                <td><button class="delete-btn" onclick="deleteNews(${news.id})">Xóa</button></td>
            </tr>
        `;
    }

    content2 += `</table><br>
                  <div id="paginationNew" class="pagination-container"></div>`;

    document.getElementById("mainContent").innerHTML = content2;
    renderPaginationNew()
}


function renderPaginationNew() {
    let totalPages = Math.ceil(newsList.length / itemsPerPageNews);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="edit-btn" onclick="changePageNews(${i})" style="margin: 5px; padding: 5px 10px;">${i}</button>`  ;
    }

    document.getElementById("paginationNew").innerHTML = paginationHTML;
}

function changePageNews(page) {
    currentNewsPage = page;
    newsController();
}

// Hàm xóa tin tức
function deleteNews(id) {
    if (confirm("Bạn có chắc chắn muốn xóa tin tức này không?")) {
        newsList = newsList.filter(news => news.id !== id);
        newsController();
    }
}

// Hàm sửa tin tức
function editNews(id) {
    let news = newsList.find(n => n.id === id);
    if (news) {
        let newTitle = prompt("Nhập tiêu đề mới:", news.title);
        let newContent = prompt("Nhập nội dung mới:", news.content);
        if (newTitle !== null) news.title = newTitle.trim();
        if (newContent !== null) news.content = newContent.trim();
        newsController();
    }
}

