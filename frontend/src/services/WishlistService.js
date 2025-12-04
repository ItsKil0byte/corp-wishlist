import $api from "../http/index.js";

export default class WishlistService {
    static async getWishlists() {
         const { data } = await $api.get('/wishlists');
         return data;
    }

    static async addWishlist(name) {
        const wishlists = await this.getWishlists()

        if(wishlists.find(wishlist => wishlist.name === name)) {
            throw new Error(`${name} уже существует`)
        }

        return await $api.post('/wishlists', { name: name })
    }
}