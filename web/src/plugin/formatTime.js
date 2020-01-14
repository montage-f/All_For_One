/**
 * Created by MonTage_fz on 2020/1/14
 */
import moment from 'moment'

export default (timer, format = 'YYYY-MM-DD HH:MM:ss') => {
    if (timer) {
        return moment(timer).format(format)
    }
    return ''
}
