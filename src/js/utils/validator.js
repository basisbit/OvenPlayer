import {extractExtension} from "utils/strings";

export const isWebRTC = function (file, type) {
    if(file){
        return (file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc');
    }
    return false;
};
