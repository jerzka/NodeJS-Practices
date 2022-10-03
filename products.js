import { productConstructor } from './client/productConstructor.js'

const productsArray = [
    productConstructor("Café Americano", "https://www.starbucksathome.com/ca/sites/default/files/styles/rdp_banner_image/public/2021-03/3-CaffeAmericano_ContactShadow_Green.png?itok=Kl-bJG_e", "In the morning"),
    productConstructor("Café au Lait", "https://www.starbucksathome.com/ca/sites/default/files/styles/rdp_banner_image/public/2021-05/10032021_BAB_CAFE_AU_LAIT_CS-min.png?itok=JoWLDPcf", "In the afternoon"),
    productConstructor("Capuccino", "https://www.starbucksathome.com/ca/sites/default/files/styles/rdp_banner_image/public/2021-05/10032021_CAPPUCCINO_CS-min.png?itok=n_45xlrE", "In the evening"),
    productConstructor("Vanilla Latte", "https://www.starbucksathome.com/ca/sites/default/files/styles/rdp_banner_image/public/2021-03/Vanilla%20Latte_ContactShadow_Green.png?itok=0XAQ8A-O", "In the afternoon")
];

productsArray.map((product) => {
    product.populate();
});

export default productsArray;
