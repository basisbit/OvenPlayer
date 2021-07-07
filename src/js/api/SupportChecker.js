import {isWebRTC} from "utils/validator";
import {analUserAgent} from "utils/browser";
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

const SupportChecker = function(){
    const that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    let userAgentObject = analUserAgent();

    const supportList = [
        {
            name: 'html5',
            checkSupport: function (source) {
                const MimeTypes = {
                    aac: 'audio/mp4',
                    mp4: 'video/mp4',
                    f4v: 'video/mp4',
                    m4v: 'video/mp4',
                    mov: 'video/mp4',
                    mp3: 'audio/mpeg',
                    mpeg: 'audio/mpeg',
                    ogv: 'video/ogg',
                    ogg: 'video/ogg',
                    oga: 'video/ogg',
                    vorbis: 'video/ogg',
                    webm: 'video/webm',
                    f4a: 'video/aac',
                    m3u8: 'application/vnd.apple.mpegurl',
                    m3u: 'application/vnd.apple.mpegurl',
                    hls: 'application/vnd.apple.mpegurl'
                };

                const video = function(){
                    return document.createElement('video')
                }();
                if (!video.canPlayType) {
                    return false;
                }


                const file = source.file;
                const type = source.type;

                if(!type){return false;}
                const mimeType = source.mimeType || MimeTypes[type];

                if(isWebRTC(file, type)){
                    return false;
                }

                if (!mimeType) {
                    return false;
                }

                return !!video.canPlayType(mimeType);
            }
        },
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

    that.findProviderNameBySource = (soruce_) => {
        OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()", soruce_);
        const source = (soruce_ === Object(soruce_)) ? soruce_ : {};
        for(var i = 0; i < supportList.length; i ++){
            if(supportList[i].checkSupport(source)){
                return supportList[i].name;
            }
        }
    };
    that.findProviderNamesByPlaylist = (playlistItem) => {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        let supportNames = [];
        /*for (let i = playlist_.length; i--;) {


        }*/
        const item = playlistItem;

        if(item && item.sources){
            for(let j = 0; j < item.sources.length; j ++){
                let source = item.sources[j];
                if (source) {
                    const supported = that.findProviderNameBySource(source);
                    if (supported) {
                        supportNames.push(supported);
                    }
                }
            }

            return supportNames;
        }
        return null;

    };
    return that;
};

export default SupportChecker;
