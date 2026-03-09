import axios from "axios";
import $api from "../http/index.js";

const API_URL = import.meta.env.VITE_API_URL || 'https://squarely-compatible-lungfish.cloudpub.ru/api'
const URL = API_URL.replace('/api', '')

export default class LinkService {
    static async getLinkInfo(type, entityId, expiresAt = null) {
        const {data} = await $api.post("/links", {
            type: type,
            entityId: entityId,
            expiresAt: expiresAt
        })

        return data
    }

    static async getEntity(token) {
        const {data} = await axios.get(`${URL}/public/link/${token}`)
        return data
    }

    static async joinToGroup(token) {
        const {data} = await axios.post(`${URL}/public/link/${token}/join`)
        return data
    }
}