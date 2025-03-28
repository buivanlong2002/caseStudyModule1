let userService = new UserService();
let userList = userService.getUsers();
let currentPageUser = 1;
let itemsPerPageUser = 9;

function showUsers() {
    userList.sort((a, b) => a.id - b.id);

    let start = (currentPageUser - 1) * itemsPerPageUser;
    let end = start + itemsPerPageUser;
    let usersToShow = userList.slice(start, end);

    let content = `
        <h2>Danh Sách Người Dùng</h2>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Tuổi</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Sửa</th>
                <th>Xóa</th>
            </tr>
    `;

    for (let user of usersToShow) {
        content += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.address}</td>
                <td><button class="edit-btn" onclick="editUser(${user.id})">Sửa</button></td>
                <td><button class="delete-btn" onclick="deleteUser(${user.id})">Xóa</button></td>
            </tr>
        `;
    }

    content += `</table><br>
                  <div id="paginationUser" class="pagination-container"></div>`;

    document.getElementById("mainContent").innerHTML = content;
    renderPaginationUser();
}

function renderPaginationUser() {
    let totalPagesUser = Math.ceil(userList.length / itemsPerPageUser);
    let paginationHTML = '';

    for (let i = 1; i <= totalPagesUser; i++) {
        paginationHTML += `<button class="edit-btn" onclick="changePageUser(${i})" style="margin: 5px; padding: 5px 10px;">${i}</button>`;
    }

    document.getElementById("paginationUser").innerHTML = paginationHTML;
}

function changePageUser(page) {
    currentPageUser = page;
    showUsers();
}

function deleteUser(id) {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
        userService.deleteUser(id);
        userList = userService.getUsers();
        showUsers();
    }
}

function editUser(id) {
    let user = userList.find(u => u.id === id);
    if (user) {
        let newName = prompt("Nhập tên mới:", user.name);
        let newAge = prompt("Nhập tuổi mới:", user.age);
        let newEmail = prompt("Nhập email mới:", user.email);
        let newPhone = prompt("Nhập số điện thoại mới:", user.phone);
        let newAddress = prompt("Nhập địa chỉ mới:", user.address);

        let updatedUser = {
            name: newName ? newName.trim() : user.name,
            age: newAge ? parseInt(newAge) : user.age,
            email: newEmail ? newEmail.trim() : user.email,
            phone: newPhone ? newPhone.trim() : user.phone,
            address: newAddress ? newAddress.trim() : user.address
        };

        userService.updateUser(id, updatedUser);
        userList = userService.getUsers();
        showUsers();
    }
}

showUsers();
