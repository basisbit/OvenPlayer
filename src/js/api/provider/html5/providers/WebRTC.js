/**
 * Created by hoho on 2018. 6. 11..
 */
import Provider from "api/provider/html5/Provider";
import WebRTCLoader from "api/provider/html5/providers/WebRTCLoader";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_WEBRTC, STATE_IDLE, CONTENT_META} from "api/constants";

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfigObj    config.getConfig()
 * */

const WebRTC = function(element, playerConfigObj){
    let that = {};
    let webrtcLoader = null;
    let superDestroy_func  = null;

    let spec = {
        name : PROVIDER_WEBRTC,
        element : element,
        mse : null,
        listener : null,
        isLoaded : false,
        canSeek : false,
        isLive : false,
        seeking : false,
        state : STATE_IDLE,
        buffer : 0,
        framerate : 0,
        currentQuality : -1,
        currentSource : -1,
        qualityLevels : [],
        sources : []
    };

    that = Provider(spec, playerConfigObj, function(source){
        console.log("WEBRTC : onBeforeLoad : ", source);
        if(webrtcLoader){
            webrtcLoader.destroy();
            webrtcLoader = null;
        }

        let loadCallback = function(stream){

            if (element.srcObject) {
                element.srcObject = null;
            }

            element.srcObject = stream;
        };

        webrtcLoader = WebRTCLoader(that, source.file, loadCallback, errorTrigger, playerConfigObj);

        webrtcLoader.connect(function(){
            //ToDo : resolve not workring
        }).catch(function(error){
            //that.destroy();
            //Do nothing
        });
    });
    superDestroy_func = that.super('destroy');

    console.log("WEBRTC PROVIDER LOADED.");


    that.destroy = () =>{
        if(webrtcLoader){
            webrtcLoader.destroy();
            element.srcObject = null;
            webrtcLoader = null;
        }
        that.off(CONTENT_META, null, that);
        console.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();

    };
    return that;
};


export default WebRTC;
