  class Products {
    constructor(name, image, price, description, discount, number) {

        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.discount = discount;
        this.number = number;
    }
    getDiscount() {
        return this.discount * this.discount / 100 ;
    }
}