// @ts-check
import $api from "../http/index.js";

/**
 * @typedef {Object} Member
 * @property {number} id
 * @property {string|null} username
 * @property {string} photo_url
 * @property {string} first_name
 * @property {string} last_name
 * @property {string|null} hobbies
 * @property {string|null} interests
 * **/

/**
 * @typedef {Object} Group
 * @property {number} id
 * @property {string} name
 * @property {string} icon
 * @property {Member[]} members
 * **/

export default class GroupService {
  /**
   * Возвращает группу
   * @returns {Promise<Group>}
   * **/
  static async getGroup(groupId) {
    const { data } = await $api.get(`/groups/${groupId}`);
    return data;
  }

  /**
   * Обновляет название и иконку группы. Возвращает обновленную группу
   * @returns {Promise<Group>}
   * **/
  static async updateGroup(group_id, group_name, group_icon) {
    const { data } = await $api.put(`/groups/${group_id}`, {
      name: group_name,
      icon: group_icon,
    });

    return data;
  }

  /**
   * Удаляет группу. Возвращает статус запроса
   * @returns {Promise<number>}
   * **/
  static async deleteGroup(group_id) {
    const { status } = await $api.delete(`/groups/${group_id}`);
    return status;
  }

  /**
   *  Добавляет пользователя в группу. Возвращает обновленную группу
   *  @returns {Promise<Group>}
   * **/
  static async addMember(group_id, user_id) {
    const { data } = await $api.put(`/groups/${group_id}/member/${user_id}`);
    return data;
  }

  /**
   * Удаляет пользователя из группы. Возвращает обновленную группу
   * @returns {Promise<Group>}
   * **/
  static async deleteMember(group_id, user_id) {
    const { data } = await $api.delete(`/groups/${group_id}/member/${user_id}`);
    return data;
  }

  /**
   * Возвращает группы текущего пользователя
   * @returns {Promise<Group[]>}
   * **/
  static async getGroups() {
    const { data } = await $api.get("/groups");
    return data;
  }

  /**
   * Добавляет группу текущему пользователю. Возвращает созданную группу
   * @returns {Promise<Group>}
   * **/
  static async addGroup(group_name, group_icon) {
    const { data } = await $api.post("/groups", {
      name: group_name,
      icon: group_icon,
    });

    return data;
  }
}
