let reviewService = new ReviewService();

let reviews= reviewService.getAllReviews();
console.log(reviews);
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
        reviewService.deleteReview(id , reviews)
        showReviews(); // Cập nhật lại danh sách sau khi xóa
    }
}

// Hàm sửa review
function editReview(id) {
    let review = reviews.find(r => r.id === id);
    if (review) {
        let newContent = prompt("Nhập nội dung mới:", review.content);
        if (newContent !== null) {
            reviewService.updateReview(newContent);
            showReviews(); // Cập nhật lại danh sách
        }
    }
}
