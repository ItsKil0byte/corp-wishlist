import $api from "../http/index.js";

export default class WishService {
	static async getWishes(wishlistId) {
		return await $api.get(`/wishes?wishlistId=${wishlistId}`)
	}

	static async addWish(title, description, wishlistId) {
		console.log(`Создаю желание с параметрами:\n${title}\n${description}\n${wishlistId}`)

		return await $api.post(`/wishes/${wishlistId}`, {
			title: title,
			description: description
		})
	}
}