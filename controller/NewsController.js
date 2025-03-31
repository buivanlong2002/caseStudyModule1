let newsService = new NewsService();
let listNews = newsService.getAll();
let currentNewsPage = 1;
let itemsPerPageNews = 9;
function newsController() {

    listNews.sort((a, b) => a.id - b.id);

    let start = (currentNewsPage - 1) * itemsPerPageNews;
    let end = start + itemsPerPageNews;
    let news1 = listNews.slice(start, end);

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
    let totalPages = Math.ceil(listNews.length / itemsPerPageNews);
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
        listNews = listNews.filter(news => news.id !== id);
        newsService.delete(id);
        newsController();
    }
}

// Hàm sửa tin tức
function editNews(id) {
    let news = listNews.find(n => n.id === id);
    if (news) {
        let newTitle = prompt("Nhập tiêu đề mới:", news.title);
        let newContent = prompt("Nhập nội dung mới:", news.content);
        if (newTitle !== null) news.title = newTitle.trim();
        if (newContent !== null) news.content = newContent.trim();
        newsService.update(id, news);
        newsController();
    }
}

