/**
 * Created by MonTage_fz on 2020/1/16
 */
import { MessageBox } from 'element-ui'

export function confirm(text = '请确认删除!', title = '提示', type = 'warning') {
    return new Promise(resolve => {
        MessageBox.confirm(text, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        })
        .then(() => {
            resolve(true)
        })
        .catch(() => {
            resolve(false)
        })
    })
}
