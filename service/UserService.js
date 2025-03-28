

class UserService {
    constructor(storageKey = "users") {
        this.storageKey = storageKey;
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    addUser(user) {
        let users = this.getUsers();
        user.id = users.length ? users[users.length - 1].id + 1 : 1; // Tạo ID tự tăng
        users.push(user);
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    addUsers(userList) {
        let users = this.getUsers();
        let lastId = users.length ? users[users.length - 1].id : 0;
        userList.forEach((user, index) => {
            user.id = lastId + index + 1;
            users.push(user);
        });
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    getUserById(id) {
        return this.getUsers().find(user => user.id === id);
    }

    updateUser(id, updatedUser) {
        let users = this.getUsers().map(user =>
            user.id === id ? { ...user, ...updatedUser } : user
        );
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    deleteUser(id) {
        let users = this.getUsers().filter(user => user.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    deleteAllUsers() {
        localStorage.removeItem(this.storageKey);
    }
}
// let userService = new UserService();
