// @ts-check
import $api from "../http/index.js";

/**
 * @typedef {Object} UserInfo
 * @property {number} id
 * @property {string|null} username
 * @property {string} photo_url
 * @property {string} first_name
 * @property {string} last_name
 * @property {string|null} hobbies
 * @property {string|null} interests
 * **/

export default class UserInfoService {
    /**
     * Обновляет информацию о текущем пользователе. Возвращает обновленную информацию
     * @param {UserInfo} userInfo
     * @returns {Promise<UserInfo>}
     * **/
    static async updateInfo(userInfo) {
        const { data } = await $api.put("/userInfo", userInfo);
        return data;
    }

    /**
     * Возвращает информацию о пользователе.
     * @param {number} userId
     * @returns {Promise<UserInfo>}
     * **/
    static async getInfo(userId) {
        const { data } = await $api.get(`/userInfo/${userId}`);
        return data;
    }
}