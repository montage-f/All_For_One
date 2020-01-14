/**
 * Created by MonTage_fz on 2020/1/14
 */
export default function (refs) {
    return new Promise((resolve) => {
        this.$refs[refs].validate((e) => {
            resolve(e)
        })
    })
}
