import $api from "../http/index.js";

export default class WishService {
  static async getWish(id) {
    const { data } = await $api.get(`/wishes/${id}`);
    return data;
  }

  static async updateWish(id, title, description, color) {
    const { data } = await $api.put(`/wishes/${id}`, {
      title: title,
      description: description,
      color: color,
    });

    return data;
  }

  static async deleteWish(id) {
    const { statusText } = await $api.delete(`/wishes/${id}`);
    return statusText;
  }

  static async addWish(wishlistId, title, description, color) {
    const { data } = await $api.post(`/wishes/${wishlistId}`, {
      title: title,
      description: description,
      color: color,
    });

    return data;
  }

  static async getWishes(wishlistId) {
    const { data } = await $api.get(`/wishes?wishlistId=${wishlistId}`);
    return data;
  }

  static async uploadImages(wishId, files) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const { data } = await $api.post(`/wishes/${wishId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  static async deleteImage(wishId, filename) {
    const { data } = await $api.delete(`/wishes/${wishId}/images/${filename}`);
    return data;
  }
}
