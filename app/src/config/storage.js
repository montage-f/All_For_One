/**
 * Created by MonTage_fz on 2019/12/26
 */
export default {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (e) {
            return localStorage.getItem(key)
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            localStorage.setItem(key, value)
        }
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    
}
