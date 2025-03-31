class ReviewService {
   getAllReviews() {
        return JSON.parse(localStorage.getItem('reviews')) || [];
    }

    saveReviews(reviews) {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    addReview(review) {
        const reviews = this.getAllReviews();
        reviews.push(review);
        this.saveReviews(reviews);
    }

   getReviewById(id) {
        return this.getAllReviews().find(review => review.id === id);
    }

    updateReview(updatedReview) {
        let reviews = this.getAllReviews();
        reviews = reviews.map(review => review.id === updatedReview.id ? updatedReview : review);
        this.saveReviews(reviews);
    }

    deleteReview(id) {
        let reviews = this.getAllReviews().filter(review => review.id !== id);
        this.saveReviews(reviews);
    }
     deleteAllReviews() {
        localStorage.removeItem('reviews');
    }
}


// let rv = new ReviewService();
// tempReviews = [];
// const sampleNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Hannah", "Isaac", "Julia"];
// const sampleEmails = ["alice@example.com", "bob@example.com", "charlie@example.com", "david@example.com", "emma@example.com", "frank@example.com", "grace@example.com", "hannah@example.com", "isaac@example.com", "julia@example.com"];
// const sampleContents = [
//     "Amazing product!", "Not worth the price.", "Fast shipping and great quality!",
//     "Would not recommend.", "Exceeded my expectations!", "Mediocre experience.",
//     "Loved it, will buy again!", "Terrible customer service.", "Five stars!", "Defective on arrival."
// ];
//
// for (let i = 1; i <= 50; i++) {
//     tempReviews.push(new Review(
//         i,
//         sampleNames[i % sampleNames.length],
//         sampleEmails[i % sampleEmails.length],
//         100 + (i % 5),
//         sampleContents[i % sampleContents.length],
//         new Date().toISOString()
//     ));
// }
// tempReviews.forEach(review => rv.addReview(review));
//
// console.log(rv.getAllReviews());
