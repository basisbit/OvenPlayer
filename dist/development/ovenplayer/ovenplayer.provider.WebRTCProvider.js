/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.WebRTCProvider"],{

/***/ "./src/js/api/provider/html5/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

/**
 * @brief   Trigger on various video events.
 * @param   extendedElement extended media object by mse.
 * @param   Provider provider  html5Provider
 * */

var Listener = function Listener(element, provider, videoEndedCallback, playerConfig) {
    var lowLevelEvents = {};

    console.log("EventListener loaded.", element, provider);
    var that = {};

    var stalled = -1;
    var elVideo = element;
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    var compareStalledTime = function compareStalledTime(stalled, position) {
        //Original Code is stalled !== position
        //Because Dashjs is very meticulous. Then always diffrence stalled and position.
        //That is why when I use toFixed(2).
        return stalled.toFixed(2) === position.toFixed(2);
    };

    lowLevelEvents.canplay = function () {
        //Fires when the browser can start playing the audio/video
        provider.setCanSeek(true);
        provider.trigger(_constants.CONTENT_BUFFER_FULL);
        console.log("EventListener : on canplay");
    };

    lowLevelEvents.durationchange = function () {
        //Fires when the duration of the audio/video is changed
        lowLevelEvents.progress();
        console.log("EventListener : on durationchange");

        provider.trigger(_constants.CONTENT_DURATION_CHANGED);
    };

    lowLevelEvents.ended = function () {
        //Fires when the current playlist is ended
        console.log("EventListener : on ended");

        // IE doesn't set paused property to true. So force set it.
        elVideo.pause();

        if (provider.getState() !== _constants.STATE_IDLE && provider.getState() !== _constants.STATE_COMPLETE && provider.getState() !== _constants.STATE_ERROR) {
            if (videoEndedCallback) {
                videoEndedCallback(function () {
                    provider.setState(_constants.STATE_COMPLETE);
                });
            } else {
                provider.setState(_constants.STATE_COMPLETE);
            }
        }
    };

    lowLevelEvents.loadeddata = function () {
        //Fires when the browser has loaded the current frame of the audio/video
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
    };

    lowLevelEvents.loadedmetadata = function () {
        //Fires when the browser has loaded meta data for the audio/video

        var sources = provider.getSources();
        var sourceIndex = provider.getCurrentSource();
        var type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: provider.isLive() ? Infinity : elVideo.duration,
            type: type
        };

        provider.setMetaLoaded();

        console.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(_constants.CONTENT_META, metadata);
    };

    lowLevelEvents.pause = function () {
        //Fires when the audio/video has been paused
        if (provider.getState() === _constants.STATE_COMPLETE || provider.getState() === _constants.STATE_ERROR) {
            return false;
        }
        if (elVideo.ended) {
            return false;
        }
        if (elVideo.error) {
            return false;
        }
        if (elVideo.currentTime === elVideo.duration) {
            return false;
        }
        console.log("EventListener : on pause");

        provider.setState(_constants.STATE_PAUSED);
    };

    lowLevelEvents.loadstart = function () {

        if (playerConfig) {
            if (!playerConfig.getConfig().showBigPlayButton && playerConfig.getConfig().autoStart) {
                provider.setState(_constants.STATE_LOADING);
            }
        }
    };

    lowLevelEvents.play = function () {

        //Fires when the audio/video has been started or is no longer paused
        stalled = -1;
        if (!elVideo.paused && provider.getState() !== _constants.STATE_PLAYING) {
            provider.setState(_constants.STATE_LOADING);
        }
    };

    lowLevelEvents.playing = function () {
        //Fires when the audio/video is playing after having been paused or stopped for buffering
        console.log("EventListener : on playing");
        if (stalled < 0) {
            provider.setState(_constants.STATE_PLAYING);
        }
    };

    lowLevelEvents.progress = function () {
        //Fires when the browser is downloading the audio/video
        var timeRanges = elVideo.buffered;
        if (!timeRanges) {
            return false;
        }

        var duration = elVideo.duration,
            position = elVideo.currentTime;
        var buffered = between((timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0) / duration, 0, 1);

        provider.setBuffer(buffered * 100);
        provider.trigger(_constants.CONTENT_BUFFER, {
            bufferPercent: buffered * 100,
            position: position,
            duration: duration
        });
    };

    lowLevelEvents.timeupdate = function () {
        //Fires when the current playback position has changed
        var position = elVideo.currentTime;
        var duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        if (position > duration) {
            elVideo.pause();
            provider.setState(_constants.STATE_COMPLETE);
            return;
        }

        var sectionStart = provider.getSources()[provider.getCurrentSource()].sectionStart;

        if (sectionStart && position < sectionStart && provider.getState() === _constants.STATE_PLAYING) {

            provider.seek(sectionStart);
        }

        var sectionEnd = provider.getSources()[provider.getCurrentSource()].sectionEnd;

        if (sectionEnd && position > sectionEnd && provider.getState() === _constants.STATE_PLAYING) {

            provider.stop();
            provider.setState(_constants.STATE_COMPLETE);
            return;
        }

        //Sometimes dash live gave to me crazy duration. (9007199254740991...) why???
        if (duration > 9000000000000000) {
            //9007199254740991
            duration = Infinity;
        }

        if (!provider.isSeeking() && !elVideo.paused && (provider.getState() === _constants.STATE_STALLED || provider.getState() === _constants.STATE_LOADING || provider.getState() === _constants.STATE_AD_PLAYING) && !compareStalledTime(stalled, position)) {
            stalled = -1;
            provider.setState(_constants.STATE_PLAYING);
        }

        if (sectionStart && sectionStart > 0) {

            position = position - sectionStart;

            if (position < 0) {
                position = 0;
            }
        }

        if (sectionEnd) {
            duration = sectionEnd;
        }

        if (sectionStart) {
            duration = duration - sectionStart;
        }

        if (provider.getState() === _constants.STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(_constants.CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }
    };

    lowLevelEvents.seeking = function () {
        provider.setSeeking(true);
        console.log("EventListener : on seeking", elVideo.currentTime);
        provider.trigger(_constants.CONTENT_SEEK, {
            position: elVideo.currentTime
        });
    };
    lowLevelEvents.seeked = function () {
        if (!provider.isSeeking()) {
            return;
        }
        console.log("EventListener : on seeked");
        provider.setSeeking(false);
        provider.trigger(_constants.CONTENT_SEEKED);
    };

    lowLevelEvents.stalled = function () {
        console.log("EventListener : on stalled");
        //This callback does not work on chrome. This calls on Firefox intermittent. Then do not work here. using waiting event.
    };

    lowLevelEvents.waiting = function () {
        //Fires when the video stops because it needs to buffer the next frame
        console.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() === _constants.STATE_PLAYING) {
            stalled = elVideo.currentTime;
            provider.setState(_constants.STATE_STALLED);
        }
    };

    lowLevelEvents.volumechange = function () {
        console.log("EventListener : on volumechange", Math.round(elVideo.volume * 100));
        provider.trigger(_constants.CONTENT_VOLUME, {
            volume: Math.round(elVideo.volume * 100),
            mute: elVideo.muted
        });
    };

    lowLevelEvents.error = function () {
        var code = elVideo.error && elVideo.error.code || 0;
        var convertedErroCode = {
            0: _constants.PLAYER_UNKNWON_ERROR,
            1: _constants.PLAYER_UNKNWON_OPERATION_ERROR,
            2: _constants.PLAYER_UNKNWON_NETWORK_ERROR,
            3: _constants.PLAYER_UNKNWON_DECODE_ERROR,
            4: _constants.PLAYER_FILE_ERROR
        }[code] || 0;

        console.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS.codes[convertedErroCode], provider);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        console.log("EventListener : destroy()");

        Object.keys(lowLevelEvents).forEach(function (eventName) {
            elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/html5/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Provider.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Listener = __webpack_require__(/*! api/provider/html5/Listener */ "./src/js/api/provider/html5/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
var Provider = function Provider(spec, playerConfig, onExtendedLoad) {
    console.log("[Provider] loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elVideo = spec.element;
    var listener = null;

    var isPlayingProcessing = false;

    listener = (0, _Listener2["default"])(elVideo, that, null, playerConfig);
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getPlaybackRate();

    var _load = function _load(lastPlayPosition) {

        var source = spec.sources[spec.currentSource];
        spec.framerate = source.framerate;

        that.setVolume(playerConfig.getVolume());

        if (!spec.framerate) {
            //init timecode mode
            playerConfig.setTimecodeMode(true);
        }
        if (onExtendedLoad) {
            onExtendedLoad(source, lastPlayPosition);
        } else {

            console.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);

            var previousSource = elVideo.src;

            // const sourceElement = document.createElement('source');
            // sourceElement.src = source.file;

            var sourceChanged = source.file !== previousSource;
            if (sourceChanged) {

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource || previousSource === '') {

                    elVideo.load();
                }

                if (lastPlayPosition && lastPlayPosition > 0) {
                    that.seek(lastPlayPosition);
                }
            }

            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                if (!playerConfig.isAutoStart()) {
                    // that.play();
                }
            }

            if (playerConfig.isAutoStart()) {}

            // that.play();

            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/
        }
    };

    that.getName = function () {
        return spec.name;
    };
    that.getMse = function () {
        return spec.mse;
    };
    that.canSeek = function () {
        return spec.canSeek;
    };
    that.setCanSeek = function (canSeek) {
        spec.canSeek = canSeek;
    };
    that.isSeeking = function () {
        return spec.seeking;
    };
    that.setSeeking = function (seeking) {
        spec.seeking = seeking;
    };
    that.setMetaLoaded = function () {
        spec.isLoaded = true;
    };
    that.metaLoaded = function () {
        return spec.isLoaded;
    };

    that.setState = function (newState) {
        if (spec.state !== newState) {
            var prevState = spec.state;

            console.log("Provider : setState()", newState);

            console.log("Provider : triggerSatatus", newState);

            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: _constants.STATE_PAUSED
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: _constants.STATE_PLAYING
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(_constants.PLAYER_STATE, {
                prevstate: prevState,
                newstate: spec.state
            });
        }
    };

    that.getState = function () {
        return spec.state;
    };
    that.setBuffer = function (newBuffer) {
        spec.buffer = newBuffer;
    };
    that.getBuffer = function () {
        return spec.buffer;
    };
    that.isLive = function () {
        return spec.isLive ? true : elVideo.duration === Infinity;
    };
    that.getDuration = function () {
        return that.isLive() ? Infinity : elVideo.duration;
    };
    that.getPosition = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.currentTime;
    };
    that.setVolume = function (volume) {
        if (!elVideo) {
            return false;
        }
        elVideo.volume = volume / 100;
    };
    that.getVolume = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.volume * 100;
    };
    that.setMute = function (state) {
        if (!elVideo) {
            return false;
        }
        if (typeof state === 'undefined') {

            elVideo.muted = !elVideo.muted;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        } else {

            elVideo.muted = state;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        }
        return elVideo.muted;
    };
    that.getMute = function () {
        if (!elVideo) {
            return false;
        }
        return elVideo.muted;
    };

    that.preload = function (sources, lastPlayPosition) {

        spec.sources = sources;

        spec.currentSource = 0;
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {

            if (playerConfig.isMute()) {
                that.setMute(true);
            }
            if (playerConfig.getVolume()) {
                that.setVolume(playerConfig.getVolume());
            }

            resolve();
        });
    };
    that.load = function (sources) {

        spec.sources = sources;
        spec.currentSource = 0;
        _load(0);
    };

    that.play = function () {

        console.log("Provider : play()");
        if (!elVideo) {
            return false;
        }

        //Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        // if(isPlayingProcessing){
        //     return false;
        // }

        isPlayingProcessing = true;
        if (that.getState() !== _constants.STATE_PLAYING) {
            var promise = elVideo.play();
            if (promise !== undefined) {
                promise.then(function () {
                    isPlayingProcessing = false;
                    console.log("Provider : video play success");
                    /*
                    if(mutedPlay){
                        that.trigger(PLAYER_WARNING, {
                            message : WARN_MSG_MUTEDPLAY,
                            timer : 10 * 1000,
                            iconClass : UI_ICONS.volume_mute,
                            onClickCallback : function(){
                                that.setMute(false);
                            }
                        });
                    }*/
                })["catch"](function (error) {
                    console.log("Provider : video play error", error.message);

                    isPlayingProcessing = false;
                    /*
                    if(!mutedPlay){
                        that.setMute(true);
                        that.play(true);
                    }
                    */
                });
            } else {
                //IE promise is undefinded.
                console.log("Provider : video play success (ie)");
                isPlayingProcessing = false;
            }
        }
    };
    that.pause = function () {

        console.log("Provider : pause()");
        if (!elVideo) {
            return false;
        }

        if (that.getState() === _constants.STATE_PLAYING) {
            elVideo.pause();
        }
    };
    that.seek = function (position) {
        if (!elVideo) {
            return false;
        }
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!elVideo) {
            return false;
        }
        that.trigger(_constants.PLAYBACK_RATE_CHANGED, { playbackRate: playbackRate });
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.playbackRate;
    };

    that.getSources = function () {
        if (!elVideo) {
            return [];
        }

        return spec.sources.map(function (source, index) {

            var obj = {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index,
                sectionStart: source.sectionStart,
                sectionEnd: source.sectionEnd,
                gridThumbnail: source.gridThumbnail
            };

            if (source.lowLatency) {
                obj.lowLatency = source.lowLatency;
            }

            return obj;
        });
    };
    that.getCurrentSource = function () {
        return spec.currentSource;
    };
    that.setCurrentSource = function (sourceIndex, needProviderChange) {

        if (sourceIndex > -1) {
            if (spec.sources && spec.sources.length > sourceIndex) {
                //that.pause();
                //that.setState(STATE_IDLE);
                console.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });
                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                //spec.currentQuality = sourceIndex;
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                if (needProviderChange) {
                    _load(elVideo.currentTime || 0);
                }
                //
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elVideo) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elVideo) {
            return null;
        }
        return spec.currentQuality;
    };
    that.setCurrentQuality = function (qualityIndex) {
        //Do nothing
    };
    that.isAutoQuality = function () {
        //Do nothing
    };
    that.setAutoQuality = function (isAuto) {
        //Do nothing
    };

    that.getFramerate = function () {
        return spec.framerate;
    };
    that.setFramerate = function (framerate) {
        return spec.framerate = framerate;
    };
    that.seekFrame = function (frameCount) {
        var fps = spec.framerate;
        var currentFrames = elVideo.currentTime * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = function () {
        if (!elVideo) {
            return false;
        }
        console.log("CORE : stop() ");

        elVideo.removeAttribute('preload');
        elVideo.removeAttribute('src');
        while (elVideo.firstChild) {
            elVideo.removeChild(elVideo.firstChild);
        }

        that.pause();
        that.setState(_constants.STATE_IDLE);
        isPlayingProcessing = false;
    };

    that.destroy = function () {
        if (!elVideo) {
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
    that["super"] = function (name) {
        var method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    };
    return that;
}; /**
    * Created by hoho on 2018. 6. 27..
    */
exports["default"] = Provider;

/***/ }),

/***/ "./src/js/api/provider/html5/providers/WebRTC.js":
/*!*******************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTC.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _WebRTCLoader = __webpack_require__(/*! api/provider/html5/providers/WebRTCLoader */ "./src/js/api/provider/html5/providers/WebRTCLoader.js");

var _WebRTCLoader2 = _interopRequireDefault(_WebRTCLoader);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 11..
 */
var WebRTC = function WebRTC(element, playerConfig, adTagUrl) {
    var that = {};
    var webrtcLoader = null;
    var superDestroy_func = null;

    var spec = {
        name: _constants.PROVIDER_WEBRTC,
        element: element,
        mse: null,
        listener: null,
        isLoaded: false,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        framerate: 0,
        currentQuality: -1,
        currentSource: -1,
        qualityLevels: [],
        sources: [],
        adTagUrl: adTagUrl
    };

    that = (0, _Provider2["default"])(spec, playerConfig, function (source) {
        console.log("WEBRTC : onBeforeLoad : ", source);
        if (webrtcLoader) {
            webrtcLoader.destroy();
            webrtcLoader = null;
        }

        var loadCallback = function loadCallback(stream) {

            if (element.srcObject) {
                element.srcObject = null;
            }

            element.srcObject = stream;
        };

        webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, loadCallback, _utils.errorTrigger, playerConfig);

        webrtcLoader.connect(function () {
            //ToDo : resolve not workring
        })["catch"](function (error) {
            //that.destroy();
            //Do nothing
        });

        that.on(_constants.CONTENT_META, function () {
            if (playerConfig.isAutoStart()) {
                // if (that.getState() !== 'error') {
                //     that.play();
                // }
            }
        }, that);
    });
    superDestroy_func = that["super"]('destroy');

    console.log("WEBRTC PROVIDER LOADED.");

    that.destroy = function () {
        if (webrtcLoader) {
            webrtcLoader.destroy();
            element.srcObject = null;
            webrtcLoader = null;
        }
        that.off(_constants.CONTENT_META, null, that);
        console.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();
    };
    return that;
};

exports["default"] = WebRTC;

/***/ }),

/***/ "./src/js/api/provider/html5/providers/WebRTCLoader.js":
/*!*************************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTCLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, loadCallback, errorTrigger, playerConfig) {

    var defaultConnectionConfig = {};

    var that = {};

    var ws = null;

    var wsPing = null;

    var mainStream = null;

    // used for getting media stream from OME or host peer
    var mainPeerConnectionInfo = null;

    // used for send media stream to client peer.
    var clientPeerConnections = {};

    //closed websocket by ome or client.
    var wsClosedByPlayer = false;

    var recorverPacketLoss = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.recorverPacketLoss === false) {

        recorverPacketLoss = playerConfig.getConfig().webrtcConfig.recorverPacketLoss;
    }

    var generatePublicCandidate = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.generatePublicCandidate === false) {

        generatePublicCandidate = playerConfig.getConfig().webrtcConfig.generatePublicCandidate;
    }

    var statisticsTimer = null;

    var currentBrowser = (0, _browser.analUserAgent)();

    (function () {
        var existingHandler = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (existingHandler) {
                existingHandler(event);
            }
            console.log("This calls auto when browser closed.");
            closePeer();
        };
    })();

    function getPeerConnectionById(id) {

        var peerConnection = null;

        if (mainPeerConnectionInfo && id === mainPeerConnectionInfo.id) {
            peerConnection = mainPeerConnectionInfo.peerConnection;
        } else if (clientPeerConnections[id]) {
            peerConnection = clientPeerConnections[id].peerConnection;
        }

        return peerConnection;
    }

    function extractLossPacketsOnNetworkStatus(peerConnectionInfo) {

        if (peerConnectionInfo.statisticsTimer) {
            clearTimeout(peerConnectionInfo.statisticsTimer);
        }

        if (!peerConnectionInfo.status) {
            peerConnectionInfo.status = {};
            peerConnectionInfo.status.lostPacketsArr = [];
            peerConnectionInfo.status.slotLength = 8; //8 statistics. every 2 seconds
            peerConnectionInfo.status.prevPacketsLost = 0;
            peerConnectionInfo.status.avg8Losses = 0;
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0; //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 40;
        }

        var lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength,
            //8 statistics. every 2 seconds
        prevPacketsLost = peerConnectionInfo.status.prevPacketsLost,
            avg8Losses = peerConnectionInfo.status.avg8Losses,

        // avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount,  //If avg8Loss more than threshold.
        threshold = peerConnectionInfo.status.threshold;

        peerConnectionInfo.statisticsTimer = setTimeout(function () {
            if (!peerConnectionInfo.peerConnection) {
                return false;
            }

            peerConnectionInfo.peerConnection.getStats().then(function (stats) {

                if (!stats) {
                    return;
                }

                if (playerConfig.getConfig().autoFallback && stats) {

                    stats.forEach(function (state) {

                        if (state.type === "inbound-rtp" && state.kind === 'video' && !state.isRemote) {

                            //(state.packetsLost - prevPacketsLost) is real current lost.

                            var actualPacketLost = parseInt(state.packetsLost) - parseInt(prevPacketsLost);

                            lostPacketsArr.push(parseInt(state.packetsLost) - parseInt(prevPacketsLost));

                            if (lostPacketsArr.length > slotLength) {

                                lostPacketsArr.shift();
                            }

                            if (lostPacketsArr.length === slotLength) {

                                avg8Losses = _underscore2["default"].reduce(lostPacketsArr, function (memo, num) {
                                    return memo + num;
                                }, 0) / slotLength;
                                console.log("Last8 LOST PACKET AVG  : " + avg8Losses, "Current Packet LOST: " + actualPacketLost, "Total Packet Lost: " + state.packetsLost, lostPacketsArr);

                                if (avg8Losses > threshold) {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount + 1;
                                    if (peerConnectionInfo.status.avgMoreThanThresholdCount >= 60) {
                                        console.log("NETWORK UNSTABLED!!! ");
                                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_NETWORK_SLOW];
                                        closePeer(tempError);
                                    }
                                } else {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = 0;
                                }
                            }
                            peerConnectionInfo.status.prevPacketsLost = state.packetsLost;
                        }
                    });

                    extractLossPacketsOnNetworkStatus(peerConnectionInfo);
                }
            });
        }, 2000);
    }

    // return -1 if no opus;
    // return opus format number
    function getOpusFormatNumber(sdp) {

        var lines = sdp.split('\n');
        var opusFormatNumber = -1;

        for (var i = 0; i < lines.length - 1; i++) {

            lines[i] = lines[i].toLowerCase();

            if (lines[i].indexOf('a=rtpmap') > -1 && lines[i].indexOf('opus') > -1) {
                // parsing "a=rtpmap:102 OPUS/48000/2" line
                opusFormatNumber = lines[i].split(' ')[0].split(':')[1];
                break;
            }
        }

        return opusFormatNumber;
    }

    function checkOpusIsStereo(sdp, opusFormatNumber) {

        var lines = sdp.split('\n');

        var stereo = false;

        for (var i = 0; i < lines.length - 1; i++) {

            lines[i] = lines[i].toLowerCase();

            // check stereo=1 from "a=fmtp:102 sprop-stereo=1;stereo=1;minptime=10;useinbandfec=1"
            if (lines[i].indexOf('a=fmtp:' + opusFormatNumber) > -1) {

                if (lines[i].indexOf('stereo=1') > -1) {
                    stereo = true;
                }
                break;
            }
        }

        return stereo;
    }

    function mungeSdpForceStereoOpus(sdp, opusFormatNumber) {

        var lines = sdp.split('\n');

        // find this line and modify. "a=fmtp:102 minptime=10;useinbandfec=1"
        for (var i = 0; i < lines.length - 1; i++) {

            // check stereo=1 from "a=fmtp:102 sprop-stereo=1;stereo=1;minptime=10;useinbandfec=1"
            if (lines[i].indexOf('a=fmtp:' + opusFormatNumber) > -1) {

                if (lines[i].indexOf('stereo=1') === -1) {

                    lines[i] = lines[i] + ';stereo=1';
                }
                break;
            }
        }

        return lines.join('\n');
    }

    function createMainPeerConnection(id, peerId, sdp, candidates, iceServers, resolve) {

        var peerConnectionConfig = {};

        // first priority using ice servers from player setting.
        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.iceServers) {

            peerConnectionConfig.iceServers = playerConfig.getConfig().webrtcConfig.iceServers;

            if (playerConfig.getConfig().webrtcConfig.iceTransportPolicy) {

                peerConnectionConfig.iceTransportPolicy = playerConfig.getConfig().webrtcConfig.iceTransportPolicy;
            }
        } else if (iceServers) {

            // second priority using ice servers from ome and force using TCP
            peerConnectionConfig.iceServers = [];

            for (var i = 0; i < iceServers.length; i++) {

                var iceServer = iceServers[i];

                var regIceServer = {};

                regIceServer.urls = iceServer.urls;

                var hasWebsocketUrl = false;
                var socketUrl = generateDomainFromUrl(webSocketUrl);

                for (var j = 0; j < regIceServer.urls.length; j++) {

                    var serverUrl = regIceServer.urls[j];

                    if (serverUrl.indexOf(socketUrl) > -1) {
                        hasWebsocketUrl = true;
                        break;
                    }
                }

                if (!hasWebsocketUrl) {

                    if (regIceServer.urls.length > 0) {

                        var cloneIceServer = _underscore2["default"].clone(regIceServer.urls[0]);
                        var ip = findIp(cloneIceServer);

                        if (socketUrl && ip) {
                            regIceServer.urls.push(cloneIceServer.replace(ip, socketUrl));
                        }
                    }
                }

                regIceServer.username = iceServer.user_name;
                regIceServer.credential = iceServer.credential;

                peerConnectionConfig.iceServers.push(regIceServer);
            }

            peerConnectionConfig.iceTransportPolicy = 'relay';
        } else {

            // last priority using default ice servers.
            peerConnectionConfig = defaultConnectionConfig;
        }

        console.log("Main Peer Connection Config : ", peerConnectionConfig);

        var peerConnection = new RTCPeerConnection(peerConnectionConfig);

        mainPeerConnectionInfo = {
            id: id,
            peerId: peerId,
            peerConnection: peerConnection
        };

        //Set remote description when I received sdp from server.
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp)).then(function () {

            peerConnection.createAnswer().then(function (desc) {

                var opusFormatNumber = getOpusFormatNumber(sdp.sdp);

                if (opusFormatNumber > -1) {

                    if (checkOpusIsStereo(sdp.sdp, opusFormatNumber)) {

                        //If offer has opus and if it is stereo, munge local sdp to force stereo=1
                        //Thanks to community https://github.com/AirenSoft/OvenMediaEngine/issues/203
                        desc.sdp = mungeSdpForceStereoOpus(desc.sdp, opusFormatNumber);
                    }
                }

                console.log("create Host Answer : success");

                peerConnection.setLocalDescription(desc).then(function () {
                    // my SDP created.
                    var localSDP = peerConnection.localDescription;
                    console.log('Local SDP', localSDP);

                    sendMessage(ws, {
                        id: id,
                        peer_id: peerId,
                        command: 'answer',
                        sdp: localSDP
                    });
                })["catch"](function (error) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
            })["catch"](function (error) {
                var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                tempError.error = error;
                closePeer(tempError);
            });
        })["catch"](function (error) {
            var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
            tempError.error = error;
            closePeer(tempError);
        });

        if (candidates) {

            addIceCandidate(peerConnection, candidates);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {

                console.log("WebRTCLoader send candidate to server : ", e.candidate);

                // console.log('Main Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: id,
                    peer_id: peerId,
                    command: "candidate",
                    candidates: [e.candidate]
                });
            }
        };
        peerConnection.onconnectionstatechange = function (e) {
            //iceConnectionState
            console.log("[on connection state change]", peerConnection.connectionState, e);
        };
        peerConnection.oniceconnectionstatechange = function (e) {
            console.log("[on ice connection state change]", peerConnection.iceConnectionState, e);

            /*
            * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
            * Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than "failed" and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the "connected" state.
            * */
            //This process is my imagination. I do not know how to reproduce.
            //Situation : OME is dead but ome can't send 'stop' message.
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'closed') {
                if (!wsClosedByPlayer) {
                    if (mainPeerConnectionInfo) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                        closePeer(tempError);
                    }
                }
            }
        };
        peerConnection.ontrack = function (e) {

            console.log("stream received.");

            console.log('Recovery On Packet Loss :', recorverPacketLoss);

            if (recorverPacketLoss) {
                extractLossPacketsOnNetworkStatus(mainPeerConnectionInfo);
            }

            mainStream = e.streams[0];
            loadCallback(e.streams[0]);

            if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.playoutDelayHint) {

                var hint = playerConfig.getConfig().webrtcConfig.playoutDelayHint;

                var receivers = mainPeerConnectionInfo.peerConnection.getReceivers();

                for (var _i = 0; _i < receivers.length; _i++) {

                    var receiver = receivers[_i];

                    receiver.playoutDelayHint = hint;
                    console.log("WebRTC playoutDelayHint", receiver, hint);
                }
            }
        };
    }

    function createClientPeerConnection(hostId, clientId) {

        if (!mainStream) {

            setTimeout(function () {

                createClientPeerConnection(hostId, clientId);
            }, 100);

            return;
        }

        var peerConnection = new RTCPeerConnection(defaultConnectionConfig);

        clientPeerConnections[clientId] = {
            id: clientId,
            peerId: hostId,
            peerConnection: peerConnection
        };

        peerConnection.addStream(mainStream);

        // let offerOption = {
        //     offerToReceiveAudio: 1,
        //     offerToReceiveVideo: 1
        // };

        peerConnection.createOffer(setLocalAndSendMessage, handleCreateOfferError, {});

        function setLocalAndSendMessage(sessionDescription) {
            peerConnection.setLocalDescription(sessionDescription);

            sendMessage(ws, {
                id: hostId,
                peer_id: clientId,
                sdp: sessionDescription,
                command: 'offer_p2p'
            });
        }

        function handleCreateOfferError(event) {}

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                console.log("WebRTCLoader send candidate to server : " + e.candidate);

                // console.log('Client Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: hostId,
                    peer_id: clientId,
                    command: "candidate_p2p",
                    candidates: [e.candidate]
                });
            }
        };
    }

    function generateDomainFromUrl(url) {
        var result = '';
        var match = void 0;
        if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1];
        }

        return result;
    }

    function findIp(string) {

        var result = '';
        var match = void 0;

        if (match = string.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
            result = match[0];
        }

        return result;
    }

    function copyCandidate(basicCandidate) {

        var cloneCandidate = _underscore2["default"].clone(basicCandidate);

        var newDomain = generateDomainFromUrl(webSocketUrl);
        var ip = findIp(cloneCandidate.candidate);

        if (ip === '' || ip === newDomain) {

            return null;
        }

        return new Promise(function (resolve, reject) {

            // firefox browser throws a candidate parsing exception when a domain name is set at the address property. So we resolve the dns using google dns resolve api.
            if (currentBrowser.browser === 'Firefox' && !findIp(newDomain)) {

                fetch('https://dns.google.com/resolve?name=' + newDomain).then(function (resp) {
                    return resp.json();
                }).then(function (data) {

                    if (data && data.Answer && data.Answer.length > 0) {

                        if (data.Answer[0].data) {

                            var relsolvedIp = data.Answer[0].data;

                            cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, relsolvedIp);
                            resolve(cloneCandidate);
                        } else {

                            resolve(null);
                        }
                    } else {

                        resolve(null);
                    }
                });
            } else {

                cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, newDomain);
                resolve(cloneCandidate);
            }
        });
    }

    function addIceCandidate(peerConnection, candidates) {

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                var basicCandidate = candidates[i];

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    console.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (generatePublicCandidate) {

                    var cloneCandidatePromise = copyCandidate(basicCandidate);

                    if (cloneCandidatePromise) {
                        cloneCandidatePromise.then(function (cloneCandidate) {

                            if (cloneCandidate) {

                                peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                                    console.log("cloned addIceCandidate : success");
                                })["catch"](function (error) {

                                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                                    tempError.error = error;
                                    closePeer(tempError);
                                });
                            }
                        });
                    }
                }
            }
        }
    }

    function initWebSocket(resolve, reject) {

        try {

            ws = new WebSocket(webSocketUrl);

            ws.onopen = function () {

                sendMessage(ws, {
                    command: "request_offer"
                });

                // wsPing = setInterval(function () {
                //
                //     sendMessage(ws, {command: "ping"});
                //
                // }, 20 * 1000);
            };

            ws.onmessage = function (e) {

                var message = JSON.parse(e.data);

                if (message.error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = message.error;
                    closePeer(tempError);
                    return;
                }

                if (Object.keys(message).length === 0 && message.constructor === Object) {

                    console.log('Empty Message');
                    return;
                }

                if (message.command === 'ping') {

                    sendMessage(ws, { command: 'pong' });
                    return;
                }

                if (!message.id) {

                    console.log('ID must be not null');
                    return;
                }

                if (message.command === 'offer') {

                    createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, message.ice_servers, resolve);
                    if (message.peer_id === 0) {
                        provider.trigger(_constants.OME_P2P_MODE, false);
                    } else {
                        provider.trigger(_constants.OME_P2P_MODE, true);
                    }
                }

                if (message.command === 'request_offer_p2p') {

                    createClientPeerConnection(message.id, message.peer_id);
                }

                if (message.command === 'answer_p2p') {

                    var peerConnection1 = getPeerConnectionById(message.peer_id);

                    peerConnection1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(function (desc) {})["catch"](function (error) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
                    });
                }

                if (message.command === 'candidate') {

                    // Candidates for new client peer
                    var peerConnection2 = getPeerConnectionById(message.id);

                    addIceCandidate(peerConnection2, message.candidates);
                }

                if (message.command === 'candidate_p2p') {

                    // Candidates for new client peer
                    var peerConnection3 = getPeerConnectionById(message.peer_id);

                    addIceCandidate(peerConnection3, message.candidates);
                }

                if (message.command === 'stop') {

                    if (mainPeerConnectionInfo.peerId === message.peer_id) {

                        //My parent was dead. And then I will retry.

                        // close connection with host and retry
                        // console.log('close connection with host');

                        mainStream = null;
                        mainPeerConnectionInfo.peerConnection.close();
                        mainPeerConnectionInfo = null;

                        //resetCallback();
                        provider.pause();

                        sendMessage(ws, {
                            command: 'request_offer'
                        });
                    } else {

                        // close connection with client
                        if (clientPeerConnections[message.peer_id]) {
                            // console.log('close connection with client: ', message.peer_id);
                            clientPeerConnections[message.peer_id].peerConnection.close();
                            delete clientPeerConnections[message.peer_id];
                        }
                    }
                }
            };
            ws.onclose = function () {

                if (!wsClosedByPlayer) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];

                    if (mainPeerConnectionInfo) {
                        tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                    }

                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {

                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                    // reject(error);
                }
            };
        } catch (error) {

            closePeer(error);
        }
    }

    function initialize() {

        console.log("WebRTCLoader connecting...");

        return new Promise(function (resolve, reject) {

            console.log("WebRTCLoader url : " + webSocketUrl);

            initWebSocket(resolve, reject);
        });
    }

    function closePeer(error) {

        console.log('WebRTC Loader closePeer()');

        if (!error) {
            wsClosedByPlayer = true;
        }

        if (mainPeerConnectionInfo) {

            if (mainPeerConnectionInfo.statisticsTimer) {
                clearTimeout(mainPeerConnectionInfo.statisticsTimer);
            }

            mainStream = null;

            console.log('Closing main peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }

            if (mainPeerConnectionInfo.peerConnection) {

                mainPeerConnectionInfo.peerConnection.close();
            }

            mainPeerConnectionInfo.peerConnection = null;
            mainPeerConnectionInfo = null;
        }

        if (Object.keys(clientPeerConnections).length > 0) {

            for (var clientId in clientPeerConnections) {

                var clientPeerConnection = clientPeerConnections[clientId].peerConnection;

                if (clientPeerConnection) {
                    console.log('Closing client peer connection...');
                    clientPeerConnection.close();
                    clientPeerConnection = null;
                }
            }

            clientPeerConnections = {};
        }

        clearInterval(wsPing);
        wsPing = null;

        if (ws) {
            console.log('Closing websocket connection...');
            console.log("Send Signaling : Stop.");
            /*
            0 (CONNECTING)
            1 (OPEN)
            2 (CLOSING)
            3 (CLOSED)
            */
            if (ws.readyState === 0 || ws.readyState === 1) {

                wsClosedByPlayer = true;

                if (mainPeerConnectionInfo) {
                    sendMessage(ws, {
                        command: 'stop',
                        id: mainPeerConnectionInfo.id
                    });
                }

                ws.close();
            }
        } else {
            wsClosedByPlayer = false;
        }

        ws = null;

        if (error) {
            errorTrigger(error, provider);
        }
    }

    function sendMessage(ws, message) {

        if (ws) {
            ws.send(JSON.stringify(message));
        }
    }

    that.connect = function () {
        return initialize();
    };

    that.destroy = function () {
        closePeer();
    };

    return that;
};

exports["default"] = WebRTCLoader;

/***/ }),

/***/ "./src/js/api/provider/utils.js":
/*!**************************************!*\
  !*** ./src/js/api/provider/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 11. 12..
 */
var extractVideoElement = exports.extractVideoElement = function extractVideoElement(elementOrMse) {
    if (_underscore2["default"].isElement(elementOrMse)) {
        return elementOrMse;
    }
    if (elementOrMse.getVideoElement) {
        return elementOrMse.getVideoElement();
    } else if (elementOrMse.media) {
        return elementOrMse.media;
    }
    return null;
};

var separateLive = exports.separateLive = function separateLive(mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (mse && mse.isDynamic) {
        return mse.isDynamic();
    } else {
        return false;
    }
};

var errorTrigger = exports.errorTrigger = function errorTrigger(error, provider) {
    if (provider) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQ0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkxpc3RlbmVyIiwiZWxlbWVudCIsInByb3ZpZGVyIiwidmlkZW9FbmRlZENhbGxiYWNrIiwicGxheWVyQ29uZmlnIiwibG93TGV2ZWxFdmVudHMiLCJjb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsIkNPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCIsImVuZGVkIiwicGF1c2UiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0VSUk9SIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsImR1cmF0aW9uIiwiaXNMaXZlIiwiSW5maW5pdHkiLCJzZXRNZXRhTG9hZGVkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsImxvYWRzdGFydCIsImdldENvbmZpZyIsInNob3dCaWdQbGF5QnV0dG9uIiwiYXV0b1N0YXJ0IiwiU1RBVEVfTE9BRElORyIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsInNlY3Rpb25TdGFydCIsInNlZWsiLCJzZWN0aW9uRW5kIiwic3RvcCIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJjb2RlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiUHJvdmlkZXIiLCJzcGVjIiwib25FeHRlbmRlZExvYWQiLCJsaXN0ZW5lciIsImlzUGxheWluZ1Byb2Nlc3NpbmciLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiaXNBdXRvU3RhcnQiLCJnZXROYW1lIiwibmFtZSIsImdldE1zZSIsIm1zZSIsImNhblNlZWsiLCJpc0xvYWRlZCIsIm1ldGFMb2FkZWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwibWVzc2FnZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4Iiwib2JqIiwibGFiZWwiLCJncmlkVGh1bWJuYWlsIiwibG93TGF0ZW5jeSIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIldlYlJUQyIsImFkVGFnVXJsIiwid2VicnRjTG9hZGVyIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9XRUJSVEMiLCJsb2FkQ2FsbGJhY2siLCJzdHJlYW0iLCJzcmNPYmplY3QiLCJlcnJvclRyaWdnZXIiLCJjb25uZWN0Iiwib24iLCJXZWJSVENMb2FkZXIiLCJ3ZWJTb2NrZXRVcmwiLCJkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZyIsIndzIiwid3NQaW5nIiwibWFpblN0cmVhbSIsIm1haW5QZWVyQ29ubmVjdGlvbkluZm8iLCJjbGllbnRQZWVyQ29ubmVjdGlvbnMiLCJ3c0Nsb3NlZEJ5UGxheWVyIiwicmVjb3J2ZXJQYWNrZXRMb3NzIiwid2VicnRjQ29uZmlnIiwiZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUiLCJzdGF0aXN0aWNzVGltZXIiLCJjdXJyZW50QnJvd3NlciIsImV4aXN0aW5nSGFuZGxlciIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwiZXZlbnQiLCJjbG9zZVBlZXIiLCJnZXRQZWVyQ29ubmVjdGlvbkJ5SWQiLCJpZCIsInBlZXJDb25uZWN0aW9uIiwiZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzIiwicGVlckNvbm5lY3Rpb25JbmZvIiwiY2xlYXJUaW1lb3V0Iiwic3RhdHVzIiwibG9zdFBhY2tldHNBcnIiLCJzbG90TGVuZ3RoIiwicHJldlBhY2tldHNMb3N0IiwiYXZnOExvc3NlcyIsImF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQiLCJ0aHJlc2hvbGQiLCJzZXRUaW1lb3V0IiwiZ2V0U3RhdHMiLCJzdGF0cyIsImF1dG9GYWxsYmFjayIsImtpbmQiLCJpc1JlbW90ZSIsImFjdHVhbFBhY2tldExvc3QiLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwicHVzaCIsInNoaWZ0IiwiXyIsInJlZHVjZSIsIm1lbW8iLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImdldE9wdXNGb3JtYXROdW1iZXIiLCJzZHAiLCJsaW5lcyIsInNwbGl0Iiwib3B1c0Zvcm1hdE51bWJlciIsImkiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJjaGVja09wdXNJc1N0ZXJlbyIsInN0ZXJlbyIsIm11bmdlU2RwRm9yY2VTdGVyZW9PcHVzIiwiam9pbiIsImNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbiIsInBlZXJJZCIsImNhbmRpZGF0ZXMiLCJpY2VTZXJ2ZXJzIiwicGVlckNvbm5lY3Rpb25Db25maWciLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJpY2VTZXJ2ZXIiLCJyZWdJY2VTZXJ2ZXIiLCJ1cmxzIiwiaGFzV2Vic29ja2V0VXJsIiwic29ja2V0VXJsIiwiZ2VuZXJhdGVEb21haW5Gcm9tVXJsIiwiaiIsInNlcnZlclVybCIsImNsb25lSWNlU2VydmVyIiwiY2xvbmUiLCJpcCIsImZpbmRJcCIsInJlcGxhY2UiLCJ1c2VybmFtZSIsInVzZXJfbmFtZSIsImNyZWRlbnRpYWwiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJwbGF5b3V0RGVsYXlIaW50IiwiaGludCIsInJlY2VpdmVycyIsImdldFJlY2VpdmVycyIsInJlY2VpdmVyIiwiY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24iLCJob3N0SWQiLCJjbGllbnRJZCIsImFkZFN0cmVhbSIsImNyZWF0ZU9mZmVyIiwic2V0TG9jYWxBbmRTZW5kTWVzc2FnZSIsImhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IiLCJzZXNzaW9uRGVzY3JpcHRpb24iLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsInN0cmluZyIsIlJlZ0V4cCIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwibmV3RG9tYWluIiwiYnJvd3NlciIsImZldGNoIiwicmVzcCIsImpzb24iLCJkYXRhIiwiQW5zd2VyIiwicmVsc29sdmVkSXAiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJjbG9uZUNhbmRpZGF0ZVByb21pc2UiLCJpbml0V2ViU29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsImNvbnN0cnVjdG9yIiwiaWNlX3NlcnZlcnMiLCJPTUVfUDJQX01PREUiLCJwZWVyQ29ubmVjdGlvbjEiLCJwZWVyQ29ubmVjdGlvbjIiLCJwZWVyQ29ubmVjdGlvbjMiLCJjbG9zZSIsIm9uY2xvc2UiLCJvbmVycm9yIiwiaW5pdGlhbGl6ZSIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJzZW5kIiwic3RyaW5naWZ5IiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsImVsZW1lbnRPck1zZSIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwiaXNEeW5hbWljIiwiRVJST1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBeUJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUFnREMsWUFBaEQsRUFBNkQ7QUFDMUUsUUFBTUMsaUJBQWlCLEVBQXZCOztBQUVBQyxZQUFRQyxHQUFSLENBQVksdUJBQVosRUFBb0NOLE9BQXBDLEVBQTZDQyxRQUE3QztBQUNBLFFBQU1NLE9BQU8sRUFBYjs7QUFFQSxRQUFJQyxVQUFVLENBQUMsQ0FBZjtBQUNBLFFBQUlDLFVBQVdULE9BQWY7QUFDQSxRQUFNVSxVQUFVLFNBQVZBLE9BQVUsQ0FBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QjtBQUNyQyxlQUFPQyxLQUFLRCxHQUFMLENBQVNDLEtBQUtGLEdBQUwsQ0FBU0QsR0FBVCxFQUFjRSxHQUFkLENBQVQsRUFBNkJELEdBQTdCLENBQVA7QUFDSCxLQUZEO0FBR0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBU1AsT0FBVCxFQUFrQlEsUUFBbEIsRUFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsZUFBT1IsUUFBUVMsT0FBUixDQUFnQixDQUFoQixNQUF1QkQsU0FBU0MsT0FBVCxDQUFpQixDQUFqQixDQUE5QjtBQUNILEtBTEQ7O0FBT0FiLG1CQUFlYyxPQUFmLEdBQXlCLFlBQU07QUFDM0I7QUFDQWpCLGlCQUFTa0IsVUFBVCxDQUFvQixJQUFwQjtBQUNBbEIsaUJBQVNtQixPQUFULENBQWlCQyw4QkFBakI7QUFDQWhCLGdCQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDSCxLQUxEOztBQU9BRixtQkFBZWtCLGNBQWYsR0FBZ0MsWUFBTTtBQUNsQztBQUNBbEIsdUJBQWVtQixRQUFmO0FBQ0FsQixnQkFBUUMsR0FBUixDQUFZ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LFNBQUYsQ0FBWUQsWUFBWixDQUFILEVBQTZCO0FBQ3pCLGVBQU9BLFlBQVA7QUFDSDtBQUNELFFBQUdBLGFBQWFFLGVBQWhCLEVBQWdDO0FBQzVCLGVBQU9GLGFBQWFFLGVBQWIsRUFBUDtBQUNILEtBRkQsTUFFTSxJQUFHRixhQUFhRyxLQUFoQixFQUFzQjtBQUN4QixlQUFPSCxhQUFhRyxLQUFwQjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FWTTs7QUFZQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVNsUCxHQUFULEVBQWM7QUFDdEM7O0FBRUEsUUFBR0EsT0FBT0EsSUFBSW1QLFNBQWQsRUFBd0I7QUFDcEIsZUFBT25QLElBQUltUCxTQUFKLEVBQVA7QUFDSCxLQUZELE1BRUs7QUFDRCxlQUFPLEtBQVA7QUFDSDtBQUNKLENBUk07O0FBVUEsSUFBTTFLLHNDQUFlLFNBQWZBLFlBQWUsQ0FBUzNKLEtBQVQsRUFBZ0I1QyxRQUFoQixFQUF5QjtBQUNqRCxRQUFHQSxRQUFILEVBQVk7QUFDUkEsaUJBQVM4QixRQUFULENBQWtCRCxzQkFBbEI7QUFDQTdCLGlCQUFTeUIsS0FBVDtBQUNBekIsaUJBQVNtQixPQUFULENBQWlCK1YsZ0JBQWpCLEVBQXdCdFUsS0FBeEI7QUFDSDtBQUVKLENBUE0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIENPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cclxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2ssIHBsYXllckNvbmZpZyl7XHJcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xyXG4gICAgbGV0IGVsVmlkZW8gPSAgZWxlbWVudDtcclxuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29tcGFyZVN0YWxsZWRUaW1lID0gZnVuY3Rpb24oc3RhbGxlZCwgcG9zaXRpb24pe1xyXG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxyXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXHJcbiAgICAgICAgLy9UaGF0IGlzIHdoeSB3aGVuIEkgdXNlIHRvRml4ZWQoMikuXHJcbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcclxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xyXG5cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xyXG5cclxuICAgICAgICAvLyBJRSBkb2Vzbid0IHNldCBwYXVzZWQgcHJvcGVydHkgdG8gdHJ1ZS4gU28gZm9yY2Ugc2V0IGl0LlxyXG4gICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuXHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9FUlJPUikge1xyXG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghcGxheWVyQ29uZmlnLmdldENvbmZpZygpLnNob3dCaWdQbGF5QnV0dG9uICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxyXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcclxuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xyXG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24gPiBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb25TdGFydCA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKVtwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldLnNlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25TdGFydCAmJiBwb3NpdGlvbiA8IHNlY3Rpb25TdGFydCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcblxyXG4gICAgICAgICAgICBwcm92aWRlci5zZWVrKHNlY3Rpb25TdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvbkVuZCA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKVtwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldLnNlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uRW5kICYmIHBvc2l0aW9uID4gc2VjdGlvbkVuZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcblxyXG4gICAgICAgICAgICBwcm92aWRlci5zdG9wKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cclxuICAgICAgICBpZihkdXJhdGlvbiA+IDkwMDAwMDAwMDAwMDAwMDApeyAgICAvLzkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBJbmZpbml0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQgJiYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1NUQUxMRUQgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfTE9BRElORyB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKSAmJlxyXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xyXG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25TdGFydCAmJiBzZWN0aW9uU3RhcnQgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIC0gc2VjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvbkVuZCkge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHNlY3Rpb25FbmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLSBzZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsZWRcIik7XHJcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcclxuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgIH1bY29kZV18fDApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XHJcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SUy5jb2Rlc1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cclxuICovXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSxcclxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cclxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXHJcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxyXG4gKiAqL1xyXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgIGNvbnNvbGUubG9nKFwiW1Byb3ZpZGVyXSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9e307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBudWxsO1xyXG5cclxuICAgIGxldCBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcblxyXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBudWxsLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XHJcblxyXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XHJcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcclxuICAgICAgICAgICAgLy8gc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRG9uJ3QgdXNlIHRoaXMuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNjM3Nzg0L2RldGVjdC1hbi1lcnJvci1vbi1odG1sNS12aWRlb1xyXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlIHx8IHByZXZpb3VzU291cmNlID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiAmJiBsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKnRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcclxuICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE1zZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5tc2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcclxuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xyXG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNZXRhTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0xvYWRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogc2V0U3RhdGUoKVwiLCBuZXdTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdHJpZ2dlclNhdGF0dXNcIiwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChuZXdTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMaXZlID8gdHJ1ZSA6IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhhdC5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcblxyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IDA7XHJcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xyXG5cclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IDA7XHJcbiAgICAgICAgX2xvYWQoMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGxheSgpXCIpO1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9UZXN0IGl0IHRob3JvdWdobHkgYW5kIHJlbW92ZSBpc1BsYXlpbmdQcm9jZXNzaW5nLiBNb3N0IG9mIHRoZSBoYXphcmRzIGhhdmUgYmVlbiByZW1vdmVkLiBhIGxvdCBvZiBub25ibG9ja2luZyBwbGF5KCkgd2F5IC0+IGJsb2NraW5nIHBsYXkoKVxyXG4gICAgICAgIC8vIGlmKGlzUGxheWluZ1Byb2Nlc3Npbmcpe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG11dGVkUGxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBpZighbXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL0lFIHByb21pc2UgaXMgdW5kZWZpbmRlZC5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3MgKGllKVwiKTtcclxuICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uU3RhcnQ6IHNvdXJjZS5zZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uRW5kOiBzb3VyY2Uuc2VjdGlvbkVuZCxcclxuICAgICAgICAgICAgICAgIGdyaWRUaHVtYm5haWw6IHNvdXJjZS5ncmlkVGh1bWJuYWlsLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuXHJcbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xyXG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcclxuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcclxuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xyXG5cclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDExLi5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCBXZWJSVENMb2FkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7UFJPVklERVJfV0VCUlRDLCBTVEFURV9JRExFLCBDT05URU5UX01FVEF9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgd2VicnRjIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcbmNvbnN0IFdlYlJUQyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IG51bGw7XHJcblxyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1dFQlJUQyxcclxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBtc2UgOiBudWxsLFxyXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdLFxyXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oc3RyZWFtKXtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL1RvRG8gOiByZXNvbHZlIG5vdCB3b3JrcmluZ1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuICAgIH0pO1xyXG4gICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJXRUJSVEMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm9mZihDT05URU5UX01FVEEsIG51bGwsIHRoYXQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxyXG4gICAgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsXHJcbiAgICBPTUVfUDJQX01PREVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgbGV0IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnID0ge307XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgd3MgPSBudWxsO1xyXG5cclxuICAgIGxldCB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBnZXR0aW5nIG1lZGlhIHN0cmVhbSBmcm9tIE9NRSBvciBob3N0IHBlZXJcclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBzZW5kIG1lZGlhIHN0cmVhbSB0byBjbGllbnQgcGVlci5cclxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuXHJcbiAgICAvL2Nsb3NlZCB3ZWJzb2NrZXQgYnkgb21lIG9yIGNsaWVudC5cclxuICAgIGxldCB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJlY29ydmVyUGFja2V0TG9zcyA9IHRydWU7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiZcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnJlY29ydmVyUGFja2V0TG9zcyA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgcmVjb3J2ZXJQYWNrZXRMb3NzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5yZWNvcnZlclBhY2tldExvc3M7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJlxyXG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5nZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudEJyb3dzZXIgPSBhbmFsVXNlckFnZW50KCk7XHJcblxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZXhpc3RpbmdIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0hhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbyAmJiBpZCA9PT0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZCkge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXS5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cykge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzID0ge307XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIgPSBbXTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoID0gODsgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7ICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkID0gNDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9zdFBhY2tldHNBcnIgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyLFxyXG4gICAgICAgICAgICBzbG90TGVuZ3RoID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoLCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0LFxyXG4gICAgICAgICAgICBhdmc4TG9zc2VzID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzLFxyXG4gICAgICAgICAgICAvLyBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50LCAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZDtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uZ2V0U3RhdHMoKS50aGVuKGZ1bmN0aW9uIChzdGF0cykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc3RhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvRmFsbGJhY2sgJiYgc3RhdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgc3RhdGUua2luZCA9PT0gJ3ZpZGVvJyAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhzdGF0ZS5wYWNrZXRzTG9zdCAtIHByZXZQYWNrZXRzTG9zdCkgaXMgcmVhbCBjdXJyZW50IGxvc3QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdHVhbFBhY2tldExvc3QgPSBwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA+IHNsb3RMZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID09PSBzbG90TGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24gKG1lbW8sIG51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVtbyArIG51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSAvIHNsb3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIFwiQ3VycmVudCBQYWNrZXQgTE9TVDogXCIgKyBhY3R1YWxQYWNrZXRMb3N0LCBcIlRvdGFsIFBhY2tldCBMb3N0OiBcIiArIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmc4TG9zc2VzID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPj0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPV107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSBzdGF0ZS5wYWNrZXRzTG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIDIwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gLTEgaWYgbm8gb3B1cztcclxuICAgIC8vIHJldHVybiBvcHVzIGZvcm1hdCBudW1iZXJcclxuICAgIGZ1bmN0aW9uIGdldE9wdXNGb3JtYXROdW1iZXIoc2RwKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gc2RwLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICBsZXQgb3B1c0Zvcm1hdE51bWJlciA9IC0xO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgbGluZXNbaV0gPSBsaW5lc1tpXS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmVzW2ldLmluZGV4T2YoJ2E9cnRwbWFwJykgPiAtMSAmJiBsaW5lc1tpXS5pbmRleE9mKCdvcHVzJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcGFyc2luZyBcImE9cnRwbWFwOjEwMiBPUFVTLzQ4MDAwLzJcIiBsaW5lXHJcbiAgICAgICAgICAgICAgICBvcHVzRm9ybWF0TnVtYmVyID0gbGluZXNbaV0uc3BsaXQoJyAnKVswXS5zcGxpdCgnOicpWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHVzRm9ybWF0TnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrT3B1c0lzU3RlcmVvKHNkcCwgb3B1c0Zvcm1hdE51bWJlcikge1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lcyA9IHNkcC5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIGxldCBzdGVyZW8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggLSAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZXNbaV0udG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHN0ZXJlbz0xIGZyb20gXCJhPWZtdHA6MTAyIHNwcm9wLXN0ZXJlbz0xO3N0ZXJlbz0xO21pbnB0aW1lPTEwO3VzZWluYmFuZGZlYz0xXCJcclxuICAgICAgICAgICAgaWYgKGxpbmVzW2ldLmluZGV4T2YoJ2E9Zm10cDonICsgb3B1c0Zvcm1hdE51bWJlcikgPiAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lc1tpXS5pbmRleE9mKCdzdGVyZW89MScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVyZW8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVyZW87XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbXVuZ2VTZHBGb3JjZVN0ZXJlb09wdXMoc2RwLCBvcHVzRm9ybWF0TnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gc2RwLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgLy8gZmluZCB0aGlzIGxpbmUgYW5kIG1vZGlmeS4gXCJhPWZtdHA6MTAyIG1pbnB0aW1lPTEwO3VzZWluYmFuZGZlYz0xXCJcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgc3RlcmVvPTEgZnJvbSBcImE9Zm10cDoxMDIgc3Byb3Atc3RlcmVvPTE7c3RlcmVvPTE7bWlucHRpbWU9MTA7dXNlaW5iYW5kZmVjPTFcIlxyXG4gICAgICAgICAgICBpZiAobGluZXNbaV0uaW5kZXhPZignYT1mbXRwOicgKyBvcHVzRm9ybWF0TnVtYmVyKSA+IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzW2ldLmluZGV4T2YoJ3N0ZXJlbz0xJykgPT09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZXNbaV0gKyAnO3N0ZXJlbz0xJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKGlkLCBwZWVySWQsIHNkcCwgY2FuZGlkYXRlcywgaWNlU2VydmVycywgcmVzb2x2ZSkge1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb25Db25maWcgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gZmlyc3QgcHJpb3JpdHkgdXNpbmcgaWNlIHNlcnZlcnMgZnJvbSBwbGF5ZXIgc2V0dGluZy5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVNlcnZlcnMpIHtcclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVNlcnZlcnM7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaWNlU2VydmVycykge1xyXG5cclxuICAgICAgICAgICAgLy8gc2Vjb25kIHByaW9yaXR5IHVzaW5nIGljZSBzZXJ2ZXJzIGZyb20gb21lIGFuZCBmb3JjZSB1c2luZyBUQ1BcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGljZVNlcnZlciA9IGljZVNlcnZlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZ0ljZVNlcnZlciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci51cmxzID0gaWNlU2VydmVyLnVybHM7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhhc1dlYnNvY2tldFVybCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvY2tldFVybCA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVnSWNlU2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZlclVybCA9IHJlZ0ljZVNlcnZlci51cmxzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmVyVXJsLmluZGV4T2Yoc29ja2V0VXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1dlYnNvY2tldFVybCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc1dlYnNvY2tldFVybCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVnSWNlU2VydmVyLnVybHMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lSWNlU2VydmVyID0gXy5jbG9uZShyZWdJY2VTZXJ2ZXIudXJsc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpcCA9IGZpbmRJcChjbG9uZUljZVNlcnZlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc29ja2V0VXJsICYmIGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIudXJscy5wdXNoKGNsb25lSWNlU2VydmVyLnJlcGxhY2UoaXAsIHNvY2tldFVybCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci51c2VybmFtZSA9IGljZVNlcnZlci51c2VyX25hbWU7XHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIuY3JlZGVudGlhbCA9IGljZVNlcnZlci5jcmVkZW50aWFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMucHVzaChyZWdJY2VTZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAncmVsYXknO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gbGFzdCBwcmlvcml0eSB1c2luZyBkZWZhdWx0IGljZSBzZXJ2ZXJzLlxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZyA9IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluIFBlZXIgQ29ubmVjdGlvbiBDb25maWcgOiBcIiwgcGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0ge1xyXG4gICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogcGVlcklkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCkpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHVzRm9ybWF0TnVtYmVyID0gZ2V0T3B1c0Zvcm1hdE51bWJlcihzZHAuc2RwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHVzRm9ybWF0TnVtYmVyID4gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tPcHVzSXNTdGVyZW8oc2RwLnNkcCwgb3B1c0Zvcm1hdE51bWJlcikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiBvZmZlciBoYXMgb3B1cyBhbmQgaWYgaXQgaXMgc3RlcmVvLCBtdW5nZSBsb2NhbCBzZHAgdG8gZm9yY2Ugc3RlcmVvPTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RoYW5rcyB0byBjb21tdW5pdHkgaHR0cHM6Ly9naXRodWIuY29tL0FpcmVuU29mdC9PdmVuTWVkaWFFbmdpbmUvaXNzdWVzLzIwM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2Muc2RwID0gbXVuZ2VTZHBGb3JjZVN0ZXJlb09wdXMoZGVzYy5zZHAsIG9wdXNGb3JtYXROdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZSBIb3N0IEFuc3dlciA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTRFAgPSBwZWVyQ29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvY2FsIFNEUCcsIGxvY2FsU0RQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2FuZGlkYXRlcykge1xyXG5cclxuICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgLCBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvbiBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uY29ubmVjdGlvblN0YXRlLCBlKTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW29uIGljZSBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlLCBlKTtcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ1BlZXJDb25uZWN0aW9uL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICAqIENoZWNrcyB0byBlbnN1cmUgdGhhdCBjb21wb25lbnRzIGFyZSBzdGlsbCBjb25uZWN0ZWQgZmFpbGVkIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50IG9mIHRoZSBSVENQZWVyQ29ubmVjdGlvbi4gVGhpcyBpcyBhIGxlc3Mgc3RyaW5nZW50IHRlc3QgdGhhbiBcImZhaWxlZFwiIGFuZCBtYXkgdHJpZ2dlciBpbnRlcm1pdHRlbnRseSBhbmQgcmVzb2x2ZSBqdXN0IGFzIHNwb250YW5lb3VzbHkgb24gbGVzcyByZWxpYWJsZSBuZXR3b3Jrcywgb3IgZHVyaW5nIHRlbXBvcmFyeSBkaXNjb25uZWN0aW9ucy4gV2hlbiB0aGUgcHJvYmxlbSByZXNvbHZlcywgdGhlIGNvbm5lY3Rpb24gbWF5IHJldHVybiB0byB0aGUgXCJjb25uZWN0ZWRcIiBzdGF0ZS5cclxuICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAvL1RoaXMgcHJvY2VzcyBpcyBteSBpbWFnaW5hdGlvbi4gSSBkbyBub3Qga25vdyBob3cgdG8gcmVwcm9kdWNlLlxyXG4gICAgICAgICAgICAvL1NpdHVhdGlvbiA6IE9NRSBpcyBkZWFkIGJ1dCBvbWUgY2FuJ3Qgc2VuZCAnc3RvcCcgbWVzc2FnZS5cclxuICAgICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Rpc2Nvbm5lY3RlZCcgfHwgcGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVjb3ZlcnkgT24gUGFja2V0IExvc3MgOicsIHJlY29ydmVyUGFja2V0TG9zcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVjb3J2ZXJQYWNrZXRMb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XHJcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5wbGF5b3V0RGVsYXlIaW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnBsYXlvdXREZWxheUhpbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjZWl2ZXJzID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRSZWNlaXZlcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY2VpdmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjZWl2ZXIgPSByZWNlaXZlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLnBsYXlvdXREZWxheUhpbnQgPSBoaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViUlRDIHBsYXlvdXREZWxheUhpbnRcIiwgcmVjZWl2ZXIsIGhpbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCkge1xyXG5cclxuICAgICAgICBpZiAoIW1haW5TdHJlYW0pIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXSA9IHtcclxuICAgICAgICAgICAgaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkU3RyZWFtKG1haW5TdHJlYW0pO1xyXG5cclxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlVmlkZW86IDFcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBoYW5kbGVDcmVhdGVPZmZlckVycm9yLCB7fSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBzZHA6IHNlc3Npb25EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvZmZlcl9wMnAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZV9wMnBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluRnJvbVVybCh1cmwpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbGV0IG1hdGNoO1xyXG4gICAgICAgIGlmIChtYXRjaCA9IHVybC5tYXRjaCgvXig/Ondzcz86XFwvXFwvKT8oPzpbXkBcXG5dK0ApPyg/Ond3d1xcLik/KFteOlxcL1xcblxcP1xcPV0rKS9pbSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRJcChzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGxldCBtYXRjaDtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcYigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXGJcIiwgJ2dpJykpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICBsZXQgbmV3RG9tYWluID0gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHdlYlNvY2tldFVybCk7XHJcbiAgICAgICAgbGV0IGlwID0gZmluZElwKGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGlmIChpcCA9PT0gJycgfHwgaXAgPT09IG5ld0RvbWFpbikge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZmlyZWZveCBicm93c2VyIHRocm93cyBhIGNhbmRpZGF0ZSBwYXJzaW5nIGV4Y2VwdGlvbiB3aGVuIGEgZG9tYWluIG5hbWUgaXMgc2V0IGF0IHRoZSBhZGRyZXNzIHByb3BlcnR5LiBTbyB3ZSByZXNvbHZlIHRoZSBkbnMgdXNpbmcgZ29vZ2xlIGRucyByZXNvbHZlIGFwaS5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRCcm93c2VyLmJyb3dzZXIgPT09ICdGaXJlZm94JyAmJiAhZmluZElwKG5ld0RvbWFpbikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9kbnMuZ29vZ2xlLmNvbS9yZXNvbHZlP25hbWU9JyArIG5ld0RvbWFpbilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5BbnN3ZXIgJiYgZGF0YS5BbnN3ZXIubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkFuc3dlclswXS5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWxzb2x2ZWRJcCA9IGRhdGEuQW5zd2VyWzBdLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGlwLCByZWxzb2x2ZWRJcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZUNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIG5ld0RvbWFpbik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVzW2ldICYmIGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJhc2ljQ2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvbmVDYW5kaWRhdGVQcm9taXNlID0gY29weUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZUNhbmRpZGF0ZVByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGNsb25lQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNsb25lQ2FuZGlkYXRlKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvbmVkIGFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcInJlcXVlc3Rfb2ZmZXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd3NQaW5nID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICAgICBzZW5kTWVzc2FnZSh3cywge2NvbW1hbmQ6IFwicGluZ1wifSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAgKiAxMDAwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1lc3NhZ2UpLmxlbmd0aCA9PT0gMCAmJiBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VtcHR5IE1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3BpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogJ3BvbmcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZS5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnb2ZmZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQsIG1lc3NhZ2Uuc2RwLCBtZXNzYWdlLmNhbmRpZGF0ZXMsIG1lc3NhZ2UuaWNlX3NlcnZlcnMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnBlZXJfaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdyZXF1ZXN0X29mZmVyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnYW5zd2VyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMSA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjEuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjIgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjIsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZV9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjMgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMywgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc3RvcCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlcklkID09PSBtZXNzYWdlLnBlZXJfaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTXkgcGFyZW50IHdhcyBkZWFkLiBBbmQgdGhlbiBJIHdpbGwgcmV0cnkuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCBhbmQgcmV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdyZXF1ZXN0X29mZmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudDogJywgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1doeSBFZGdlIEJyb3dzZXIgY2FsbHMgb25lcnJvcigpIHdoZW4gd3MuY2xvc2UoKT9cclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIGNsb3NlUGVlcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJSVEMgTG9hZGVyIGNsb3NlUGVlcigpJyk7XHJcblxyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG5cclxuICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWFpblBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbG9zaW5nIG1haW4gcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyBjbGllbnQgcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh3c1BpbmcpO1xyXG4gICAgICAgIHdzUGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDAgKENPTk5FQ1RJTkcpXHJcbiAgICAgICAgICAgIDEgKE9QRU4pXHJcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXHJcbiAgICAgICAgICAgIDMgKENMT1NFRClcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDAgfHwgd3MucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3N0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3MgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKGVycm9yLCBwcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViUlRDTG9hZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xyXG4gICAgfVxyXG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIGlmKHByb3ZpZGVyKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfVxyXG5cclxufTsiXSwic291cmNlUm9vdCI6IiJ9