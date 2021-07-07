import {isWebRTC} from "utils/validator";
import {analUserAgent} from "utils/browser";
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

const SupportChecker = function(){
    const that = {};
    console.log("SupportChecker loaded.");
    let userAgentObject = analUserAgent();

    const supportList = [
        {
            name: 'webrtc',
            checkSupport: function (source) {
                const video = function(){
                    return document.createElement('video')
                }();
                if (!video.canPlayType) {
                    return false;
                }

                const file = source.file;
                const type = source.type;

                if(isWebRTC(file, type)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    ];

    return that;
};

export default SupportChecker;
