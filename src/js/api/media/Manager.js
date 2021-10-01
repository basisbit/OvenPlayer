/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */
import LA$ from "utils/likeA$.js";

const Manager = function(container, browserInfo){
    const that = {};
    let rootId = container.getAttribute("data-parent-id");
    let $container = LA$(container);
    let videoElement = "";

    console.log("MediaManager loaded. browser : ", browserInfo );

    const createHtmlVideo = function(){

        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        videoElement.setAttribute('autoplay', '');
        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = ()  => {
        that.empty();
        return createHtmlVideo();
    }

    that.empty = () =>{
        console.log("MediaManager removeElement()");
        $container.removeChild(videoElement);
        videoElement = null;
    };

    that.destroy = () =>{
        $container.removeChild();
        $container = null;
        videoElement = null;
        rootId = null;
    };

    return that;
};

export default Manager;
