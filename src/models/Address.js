class Address{
    state;
    country;
    city;
    street;
    house_num;
    zip_code;
    constructor(country,state,city,street,house_num,zip_code){
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
        this.house_num = house_num;
        this.zip_code = zip_code;
    }
}

export default Address;