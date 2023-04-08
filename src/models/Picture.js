class Picture{
    id;
    url;
    alt;
    credit;
    price;
    additionalDetails;
    constructor(id,url,alt,credit,price,additionalDetails){
        this.id = id;
        this.url = url;
        this.alt = alt;
        this.credit = credit;
        this.price = price;
        this.additionalDetails = additionalDetails;
    }
}

export default Picture;