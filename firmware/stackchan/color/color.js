import { Digest } from 'crypt'
import { hslToRgb } from 'stackchan-util'

function getMacAddress() @ "mod_get_mac_address";

export function getDeviceSpecificColor() {
    let sha1 = new Digest('SHA1')
    sha1.write(getMacAddress())
    const arr = sha1.close()
    trace(arr)
    const dv = new DataView(arr, 0, 2)
    trace(dv.getUint8(0) + '\n')
    trace(dv.getUint8(1) + '\n')

    const color = hslToRgb(dv.getUint8(0) * 360 / 255, 1, 0.1 + (dv.getUint8(1) * 0.8 / 255))

    return color
}
