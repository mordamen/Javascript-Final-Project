import Picture from "../models/Picture.js";
import Address from "../models/Address.js";
import AdditionalDetails from "../models/AdditionalDetails.js";
import User from "../models/User.js";
let pic_id = 1;
let user_id = 1;
const createPicturesData = () => {
  let picturesArr = [
    new Picture(
      pic_id++,
      "https://render.fineartamerica.com/images/rendered/square-dynamic/small/images-medium-large-5/1-young-adult-male-lion-on-savanna-safari-in-serengeti-tanzania-africa-michal-bednarek.jpg",
      "Savanah Lion",
      "Andy Chilton",
      600,
      new AdditionalDetails(
        "18/05/2022",
        "Prime age wild lion at wild life reserve",
        "Mabutu - pack leader",
        "Unchallenged"
      )
    ),
    new Picture(
      pic_id++,
      "https://thebigcatsanctuary.org/wp-content/uploads/2021/04/169230029_4174091709281222_5662616443454392272_n-300x300.jpeg",
      "Snow Leopard",
      "Robert Sachowski",
      4000,
      new AdditionalDetails(
        "13/02/2021",
        "Elusive predator in the Himalayan mountains",
        "Ivory the quiet",
        "Rare Endangered animal"
      )
    ),
    new Picture(
      pic_id++,
      "https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/1-lauterbrunnen-valley-in-the-swiss-alps-viewed-from-the-alpine-village-of-wengen-miroslav-liska.jpg",
      "Switzerland Alps",
      "Daniel Lloyd",
      1000,
      new AdditionalDetails(
        "11/02/2020",
        "Very beautiful mountain in Europe",
        "Breath-taking",
        "Worth a visit"
      )
    ),
    new Picture(
      pic_id++,
      "https://i.pinimg.com/736x/59/67/32/596732652bddfb520effa10519ba0690.jpg",
      "Sunset Meadow",
      "David Clode",
      700,
      new AdditionalDetails(
        "10/08/2021",
        "Taken in Bavaria",
        "Clean Air",
        "Perfect pasture for livestock"
      )
    ),
    new Picture(
      pic_id++,
      "https://www.hawkcreek.org/wp-content/uploads/2020/04/Gryphon-2.jpg",
      "Bald Eagle",
      "Iewek Gnos",
      2000,
      new AdditionalDetails(
        "10/10/2018",
        "The American National Animal",
        "American Icon",
        "Master of the sky"
      )
    ),
    new Picture(
      pic_id++,
      "https://oceanographic.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/02/16120946/Credit_-Jay-Clue_Dive-Ninja-Expeditions-8-300x300.jpeg",
      "Humpback Whale",
      "Mathew Schwartz",
      3000,
      new AdditionalDetails(
        "08/08/2019",
        "Taken in Northern Norway",
        "Migration in motion",
        "After feeding on a school of fish"
      )
    ),
  ];
  return picturesArr;
};

const createUsersData = () => {
  let usersArr = [
    new User(
      user_id++,
      "Kenny",
      "Jenkins",
      new Address("USA", "Texas", "Huston", "Anonymous", 1, 1234900),
      "kenny@gmail.com",
      "0515456542",
      "Aa123456!",
      false
    ),
    new User(
      user_id++,
      "Bob",
      "Lincoln",
      new Address("USA", "Iowa", "Forgot", "Anonymous", 8, 1267800),
      "bob@gmail.com",
      "0518906542",
      "Aa123456!",
      false
    ),
  ];
  return usersArr;
};

const setInitialData = () => {
  let pictures = localStorage.getItem("pics");
  let users = localStorage.getItem("users");
  if (pictures) {
  } else {
    localStorage.setItem("pics", JSON.stringify(createPicturesData()));
    localStorage.setItem("next_pic_id", JSON.stringify(pic_id + ""));
  }

  if (users) {
  } else {
    localStorage.setItem("users", JSON.stringify(createUsersData()));
    localStorage.setItem("next_user_id", JSON.stringify(user_id + ""));
  }
};

setInitialData();
