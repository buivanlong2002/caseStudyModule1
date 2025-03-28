
let reviews = [
    new Review(1, "Nguyễn Văn An", "an@gmail.com", 5, "Sản phẩm rất tốt!", "2025-03-25"),
    new Review(2, "Bùi Văn Long", "long@gmail.com", 5, "Hàng giao nhanh, chất lượng ổn.", "2025-03-26"),
    new Review(3, "Trần Thị Mai", "mai@gmail.com", 3, "Mùi vị ngon, nhưng hơi đắt.", "2025-03-24"),
    new Review(4, "Phạm Minh Khoa", "khoa@gmail.com", 8, "Dùng rất thích, sẽ mua tiếp!", "2025-03-27"),

    new Review(5, "Hoàng Văn Tiến", "tien@gmail.com", 6, "Sản phẩm đẹp hơn mong đợi!", "2025-03-23"),
    new Review(6, "Lê Thị Hạnh", "hanh@gmail.com", 2, "Giao hàng hơi chậm, nhưng chất lượng tốt.", "2025-03-22"),
    new Review(7, "Đỗ Minh Châu", "chau@gmail.com", 7, "Giá cả hợp lý, mình sẽ mua lại.", "2025-03-21"),
    new Review(8, "Nguyễn Văn Dũng", "dung@gmail.com", 4, "Tạm ổn, chất liệu chưa như mong muốn.", "2025-03-20"),
    new Review(9, "Trịnh Hoài Nam", "nam@gmail.com", 1, "Hàng bị móp khi nhận, mong shop cải thiện.", "2025-03-19"),
    new Review(10, "Lý Thị Lan", "lan@gmail.com", 9, "Hàng như hình, rất hài lòng!", "2025-03-18")

];
let currentReviewPage = 1;
let itemsPerPageReview = 9;
function showReviews() {

    reviews.sort((a, b) => a.id -b.id);

    let start = (currentReviewPage - 1) * itemsPerPageReview;
    let end = start + itemsPerPageReview;
    let reviews1 = reviews.slice(start, end);

    // Tạo HTML danh sách review
    let content = `
        <h2>Danh Sách Đánh Giá</h2>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Email</th>
                <th>Mã sản phẩm</th>
                <th>Nội dung</th>
                <th>Ngày đánh giá</th>
                <th></th>
                <th></th>
            </tr>
    `;

    for (let review of reviews1) {
        content += `
            <tr>
                <td>${review.id}</td>
                <td>${review.nameUser}</td>
                <td>${review.email}</td>
                <td>${review.product_id}</td>
                <td>${review.content}</td>
                <td>${review.created}</td>
                <td><button class="edit-btn" onclick="editReview(${review.id})">Sửa</button></td>
                <td><button class="delete-btn" onclick="deleteReview(${review.id})" >Xóa</button></td>
                
            </tr>
        `;
    }

    content += `</table><br>
<div id="pagination" class="pagination-container"></div>`;



    // Đưa nội dung vào phần tử có ID "mainContent"
    document.getElementById("mainContent").innerHTML = content;
    renderPaginationReview()
}

function renderPaginationReview() {
    let totalPages = Math.ceil(reviews.length / itemsPerPageReview);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="edit-btn" onclick="changePageReviews(${i})" style="margin: 5px; padding: 5px 10px;">${i}</button>`  ;
    }

    document.getElementById("pagination").innerHTML = paginationHTML;
}

function changePageReviews(page) {
    currentReviewPage = page;
    showReviews();
}



// Hàm xóa review
function deleteReview(id) {
    if (confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
        reviews = reviews.filter(review => review.id !== id);
        showReviews(); // Cập nhật lại danh sách sau khi xóa
    }
}

// Hàm sửa review
function editReview(id) {
    let review = reviews.find(r => r.id === id);
    if (review) {
        let newContent = prompt("Nhập nội dung mới:", review.content);
        if (newContent !== null) {
            review.content = newContent.trim(); // Cập nhật nội dung review
            showReviews(); // Cập nhật lại danh sách
        }
    }
}
