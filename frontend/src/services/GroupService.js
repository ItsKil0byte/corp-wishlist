import $api from "../http/index.js";

export default class GroupService {
    static async getAllGroups () {
        return await $api.get("/groups");
    }

    static async getGroup (groupId) {
        return await $api.get(`/groups/${groupId}`);
    }

    static async addGroup (group_name) {
        return await $api.post("/groups", { name: group_name });
    }

    static async deleteGroup (group_id) {
        return await $api.delete(`/groups/${group_id}`);
    }

    static async renameGroup (group_id, group_name) {
        return await $api.put(`/groups/${group_id}`, { name: group_name });
    }

    static async putMember(group_id, user_id) {
        return $api.put(`/groups/${group_id}/member/${user_id}`);
    }
    
    static async deleteMember (group_id, user_id) {
        return await $api.delete(`/groups/${group_id}/member/${user_id}`);
    }
}