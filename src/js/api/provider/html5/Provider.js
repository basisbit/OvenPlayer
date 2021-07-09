/**
 * Created by hoho on 2018. 6. 27..
 */
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/html5/Listener";
import {
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY,
    CONTENT_SOURCE_CHANGED, CONTENT_MUTE
} from "api/constants";

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfigObj  player config.getConfig object
 * @param   onExtendedLoad on load handler
 * */
const Provider = function (spec, playerConfigObj, onExtendedLoad){

    let that ={};
    EventEmitter(that);

    let elVideo = spec.element;
    let listener = null;

    let isPlayingProcessing = false;

    listener = EventsListener(elVideo, that, null, playerConfigObj);
    elVideo.playbackRate = 1;

    const _load = (lastPlayPosition) =>{

        const source = playerConfigObj.sources[0];
        spec.framerate = 0;

        that.setVolume(100);

        if(onExtendedLoad){
            onExtendedLoad(source, lastPlayPosition);

        }else{

            console.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);

            let previousSource = elVideo.src;

            // const sourceElement = document.createElement('source');
            // sourceElement.src = source.file;

            const sourceChanged = (source.file !== previousSource);
            if (sourceChanged) {

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource || previousSource === '') {

                    elVideo.load();
                }


                if(lastPlayPosition && lastPlayPosition > 0){
                    that.seek(lastPlayPosition);
                }

            }

            if(lastPlayPosition > 0){
                that.seek(lastPlayPosition);
            }
        }

    };

    that.getName = () => {
        return playerConfigObj.name;
    };
    that.canSeek = () => {
        return false;
    };
    that.setCanSeek = (canSeek) => {;};
    that.isSeeking = ()=>{
        return spec.seeking;
    };
    that.setSeeking = (seeking)=>{
        spec.seeking = seeking;
    };
    that.setMetaLoaded = () => {
        spec.isLoaded = true;
    };
    that.metaLoaded = () => {
        return spec.isLoaded;
    };

    that.setState = (newState) => {
        if(spec.state !== newState){
            let prevState = spec.state;

            console.log("Provider : setState()", newState);

            switch (newState) {
                case STATE_COMPLETE :
                    that.trigger(PLAYER_COMPLETE);
                    break;
                case STATE_PAUSED :
                    that.trigger(PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: STATE_PAUSED
                    });
                    break;
                case STATE_PLAYING :
                    that.trigger(PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: STATE_PLAYING
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(PLAYER_STATE, {
                prevstate: prevState,
                newstate: spec.state
            });
        }
    };

    that.getState = () =>{
        return spec.state;
    };
    that.setBuffer = (newBuffer) => {
        spec.buffer = newBuffer;
    };
    that.getBuffer = () => {
        return spec.buffer;
    };
    that.isLive = () => {
        return spec.isLive ? true : (elVideo.duration === Infinity);
    };
    that.getDuration = () => {
        return that.isLive() ?  Infinity : elVideo.duration;
    };
    that.getPosition = () => {
        if(!elVideo){
            return 0;
        }
        return elVideo.currentTime;
    };
    that.setVolume = (volume) =>{
        if(!elVideo){
            return false;
        }
        elVideo.volume = volume/100;
    };
    that.getVolume = () =>{
        if(!elVideo){
            return 0;
        }
        return elVideo.volume*100;
    };
    that.setMute = (state) =>{
        if(!elVideo){
            return false;
        }
        if (typeof state === 'undefined') {

            elVideo.muted = !elVideo.muted;

            that.trigger(CONTENT_MUTE, {
                mute: elVideo.muted
            });

        } else {

            elVideo.muted = state;

            that.trigger(CONTENT_MUTE, {
                mute: elVideo.muted
            });
        }
        return elVideo.muted;
    };
    that.getMute = () =>{
        if(!elVideo){
            return false;
        }
        return elVideo.muted;
    };

    that.preload = (sources, lastPlayPosition) =>{

        spec.sources = sources;

        spec.currentSource = 0;
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            that.setVolume(100);
            resolve();
        });

    };
    that.load = (sources) =>{

        spec.sources = sources;
        spec.currentSource = 0;
        _load(0);
    };

    that.play = () =>{

        console.log("Provider : play()");
        if(!elVideo){
            return false;
        }

        //Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        // if(isPlayingProcessing){
        //     return false;
        // }

        isPlayingProcessing = true;
        if(that.getState() !== STATE_PLAYING){
            let promise = elVideo.play();
            if (promise !== undefined) {
                promise.then(function(){
                    isPlayingProcessing = false;
                    console.log("Provider : video play success");
                }).catch(error => {
                    console.log("Provider : video play error", error.message);
                    isPlayingProcessing = false;
                });
            }else{
                //IE promise is undefinded.
                console.log("Provider : video play success (ie)");
                isPlayingProcessing = false;
            }

        }

    };
    that.pause = () =>{

        console.log("Provider : pause()");
        if(!elVideo){
            return false;
        }

        if (that.getState() === STATE_PLAYING) {
            elVideo.pause();
        }
    };
    that.seek = (position) =>{
        if(!elVideo){
            return false;
        }
        elVideo.currentTime = position;
    };

    that.getSources = () => {
        if(!elVideo){
            return [];
        }

        return playerConfigObj.sources.map(function(source, index) {

            var obj = {
                file: source.file,
                type: source.type,
                label: source.label,
                index : index,
                sectionStart: source.sectionStart,
                sectionEnd: source.sectionEnd,
                gridThumbnail: source.gridThumbnail,
            };

            if (source.lowLatency) {
                obj.lowLatency = source.lowLatency;
            }

            return obj;
        });
    };
    
    that.setCurrentSource = (needProviderChange) => {
        that.trigger(CONTENT_SOURCE_CHANGED, {
            currentSource: 0
        });
        that.setState(STATE_IDLE);
        if(needProviderChange){
            _load(elVideo.currentTime || 0);
        }
        //
        return 0;
    };


    that.getQualityLevels = () => {
        if(!elVideo){
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = () => {
        if(!elVideo){
            return null;
        }
        return spec.currentQuality;
    };

    that.getFramerate = () => {
        return spec.framerate;
    };
    that.setFramerate = (framerate) => {
        return spec.framerate = framerate;
    };
    that.seekFrame = (frameCount) =>{
        let fps = spec.framerate;
        let currentFrames = elVideo.currentTime * fps;
        let newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = () =>{
        if(!elVideo){
            return false;
        }
        console.log("CORE : stop() ");

        elVideo.removeAttribute('preload');
        elVideo.removeAttribute('src');
        while (elVideo.firstChild) {
            elVideo.removeChild(elVideo.firstChild);
        }

        that.pause();
        that.setState(STATE_IDLE);
        isPlayingProcessing = false;
    };

    that.destroy = () =>{
        if(!elVideo){
            return false;
        }
        that.stop();
        listener.destroy();
        //elVideo.remove();

        that.off();
        console.log("CORE : destroy() player stop, listener, event destroied");
    };

    //XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
    // use : let super_destroy  = that.super('destroy'); ... super_destroy();
    that.super = (name) => {
        const method = that[name];
        return function(){
            return method.apply(that, arguments);
        };
    };
    return that;

};

export default Provider;
