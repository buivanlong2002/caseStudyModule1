class Review {
    id;
   nameUser;
   email;
    product_id;
    content;
    created;
    constructor(id, nameUser, email, product_id, content, created) {
        this.id = id;
        this.nameUser = nameUser;
        this.email = email;
        this.product_id = product_id;
        this.content = content;
        this.created = created;
    }
}