/** @type {import('@twa-dev/types').WebApp} */
import WebApp from "@twa-dev/sdk";

export default class Storage {
    static getItem(key) {
        return new Promise(resolve => {
            WebApp.CloudStorage.getItem(key, (err, result) => {
                if (err) {
                    console.error("Ошибка хранилища:", err);
                    return resolve(null);
                } else {
                    resolve(result)
                }
            });
        });
    }

    static setItem(key, value) {
        return new Promise((resolve, reject) => {
            WebApp.CloudStorage.setItem(key, value, (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
        })
    }

    static removeItem(key) {
        return new Promise((resolve, reject) => {
            WebApp.CloudStorage.removeItem(key, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        })
    }
}