// @ts-check
import $api from "../http/index.js";

/**
 * @typedef {Object} Wish
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} color
 * @property {number} wishlistId
 * **/

/**
 * @typedef {Object} Wishlist
 * @property {number} id
 * @property {string} name
 * @property {string} color
 * @property {string} icon
 * @property {number} ownerId
 * @property {Wish[]} wishes
 * **/

export default class WishlistService {
  /**
   * Возвращает вишлист текущего пользователя по id
   * @returns {Promise<Wishlist>}
   * **/
  static async getWishlist(wishlistId) {
    const { data } = await $api.get(`/wishlists/${wishlistId}`);
    return data;
  }

  /**
   * Возвращает обновленный вишлист текущего пользователя по id
   * @returns {Promise<Wishlist>}
   * **/
  static async updateWishlist(wishlistId, name, color, icon) {
    const { data } = await $api.put(`/wishlists/${wishlistId}`, {
      name,
      color,
      icon,
    });

    return data;
  }

  /**
   * Удаляет вишлист текущего пользователя по id. Возвращает код статуса запроса
   * @returns {Promise<Number>}
   * **/
  static async deleteWishlist(wishlistId) {
    const { status } = await $api.delete(`/wishlists/${wishlistId}`);
    return status;
  }

  /**
   * Возвращает список вишлистов текущего пользователя
   * @returns {Promise<Wishlist[]>}
   * **/
  static async getWishlists() {
    const { data } = await $api.get("/wishlists");
    return data;
  }

  /**
   * Добавляет вишлист текущему пользователю. Возвращает созданный вишлист
   * @returns {Promise<Wishlist>}
   * **/
  static async addWishlist(name, color, icon) {
    const { data } = await $api.post("/wishlists", {
      name: name,
      color: color,
      icon: icon,
    });

    return data;
  }

  /**
   * Возвращает список вишлистов пользователя по его id
   * @returns {Promise<Wishlist[]>}
   * **/
  static async getWishlistsByUserId(userId) {
    const { data } = await $api.get(`/wishlists/user/${userId}`);
    return data;
  }
}
