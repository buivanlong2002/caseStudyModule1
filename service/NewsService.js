class NewsService {
    constructor() {
        this.newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('newsList', JSON.stringify(this.newsList));
    }

    create(news) {
        this.newsList.push(news);
        this.saveToLocalStorage();
    }

    read(id) {
        return this.newsList.find(news => news.id === id);
    }

    update(id, updatedNews) {
        const index = this.newsList.findIndex(news => news.id === id);
        if (index !== -1) {
            this.newsList[index] = { ...this.newsList[index], ...updatedNews };
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    delete(id) {
        const index = this.newsList.findIndex(news => news.id === id);
        if (index !== -1) {
            this.newsList.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    getAll() {
        return this.newsList;
    }

}




// Example Usage:
const newsService1 = new NewsService();

console.log(newsService1.getAll()); // Get all news

