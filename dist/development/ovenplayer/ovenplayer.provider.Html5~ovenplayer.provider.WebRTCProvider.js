/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider"],{

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

    OvenPlayerConsole.log("EventListener loaded.", element, provider);
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
        OvenPlayerConsole.log("EventListener : on canplay");
    };

    lowLevelEvents.durationchange = function () {
        //Fires when the duration of the audio/video is changed
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");

        provider.trigger(_constants.CONTENT_DURATION_CHANGED);
    };

    lowLevelEvents.ended = function () {
        //Fires when the current playlist is ended
        OvenPlayerConsole.log("EventListener : on ended");

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

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
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
        OvenPlayerConsole.log("EventListener : on pause");

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
        OvenPlayerConsole.log("EventListener : on playing");
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
        OvenPlayerConsole.log("EventListener : on progress", buffered * 100);
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
        OvenPlayerConsole.log("EventListener : on seeking", elVideo.currentTime);
        provider.trigger(_constants.CONTENT_SEEK, {
            position: elVideo.currentTime
        });
    };
    lowLevelEvents.seeked = function () {
        if (!provider.isSeeking()) {
            return;
        }
        OvenPlayerConsole.log("EventListener : on seeked");
        provider.setSeeking(false);
        provider.trigger(_constants.CONTENT_SEEKED);
    };

    lowLevelEvents.stalled = function () {
        OvenPlayerConsole.log("EventListener : on stalled");
        //This callback does not work on chrome. This calls on Firefox intermittent. Then do not work here. using waiting event.
    };

    lowLevelEvents.waiting = function () {
        //Fires when the video stops because it needs to buffer the next frame
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() === _constants.STATE_PLAYING) {
            stalled = elVideo.currentTime;
            provider.setState(_constants.STATE_STALLED);
        }
    };

    lowLevelEvents.volumechange = function () {
        OvenPlayerConsole.log("EventListener : on volumechange", Math.round(elVideo.volume * 100));
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

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS.codes[convertedErroCode], provider);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        OvenPlayerConsole.log("EventListener : destroy()");

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

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
/**
 * Created by hoho on 2018. 6. 27..
 */
var Provider = function Provider(spec, playerConfig, onExtendedLoad) {
    OvenPlayerConsole.log("[Provider] loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elVideo = spec.element;
    var listener = null,
        videoEndedCallback = null;

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

            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);

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

            OvenPlayerConsole.log("Provider : setState()", newState);

            OvenPlayerConsole.log("Provider : triggerSatatus", newState);

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

        spec.currentSource = (0, _utils.pickCurrentSource)(sources, playerConfig);
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
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, playerConfig);
        _load(0);
    };

    that.play = function () {

        OvenPlayerConsole.log("Provider : play()");
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
                    OvenPlayerConsole.log("Provider : video play success");
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
                    OvenPlayerConsole.log("Provider : video play error", error.message);

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
                OvenPlayerConsole.log("Provider : video play success (ie)");
                isPlayingProcessing = false;
            }
        }
    };
    that.pause = function () {

        OvenPlayerConsole.log("Provider : pause()");
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
                OvenPlayerConsole.log("source changed : " + sourceIndex);
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
        OvenPlayerConsole.log("CORE : stop() ");

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
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
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
};

exports["default"] = Provider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJwbGF5ZXJDb25maWciLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsIkNPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCIsImVuZGVkIiwicGF1c2UiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0VSUk9SIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsImR1cmF0aW9uIiwiaXNMaXZlIiwiSW5maW5pdHkiLCJzZXRNZXRhTG9hZGVkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsImxvYWRzdGFydCIsImdldENvbmZpZyIsInNob3dCaWdQbGF5QnV0dG9uIiwiYXV0b1N0YXJ0IiwiU1RBVEVfTE9BRElORyIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsInNlY3Rpb25TdGFydCIsInNlZWsiLCJzZWN0aW9uRW5kIiwic3RvcCIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJjb2RlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiUHJvdmlkZXIiLCJzcGVjIiwib25FeHRlbmRlZExvYWQiLCJsaXN0ZW5lciIsImlzUGxheWluZ1Byb2Nlc3NpbmciLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiaXNBdXRvU3RhcnQiLCJnZXROYW1lIiwibmFtZSIsImdldE1zZSIsIm1zZSIsImNhblNlZWsiLCJpc0xvYWRlZCIsIm1ldGFMb2FkZWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwibWVzc2FnZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4Iiwib2JqIiwibGFiZWwiLCJncmlkVGh1bWJuYWlsIiwibG93TGF0ZW5jeSIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUE0QkE7O0FBRUE7Ozs7OztBQU9B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LG1CQUFPLEtBQVA7QUFDSDtBQUNERixhQUFLOEQsSUFBTDtBQUNBb0MsaUJBQVNKLE9BQVQ7QUFDQTs7QUFFQTlGLGFBQUtxTCxHQUFMO0FBQ0F2TCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBVkQ7O0FBWUE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDc0gsSUFBRCxFQUFVO0FBQ25CLFlBQU1nRSxTQUFTdEwsS0FBS3NILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPZ0UsT0FBT0MsS0FBUCxDQUFhdkwsSUFBYixFQUFtQndMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU94TCxJQUFQO0FBRUgsQ0F0YkQ7O3FCQXdiZStGLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBDT05URU5UX0RVUkFUSU9OX0NIQU5HRUQsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cclxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2ssIHBsYXllckNvbmZpZyl7XHJcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcclxuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XHJcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcclxuICAgICAgICAvL09yaWdpbmFsIENvZGUgaXMgc3RhbGxlZCAhPT0gcG9zaXRpb25cclxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxyXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxyXG4gICAgICAgIHJldHVybiBzdGFsbGVkLnRvRml4ZWQoMikgPT09IHBvc2l0aW9uLnRvRml4ZWQoMik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxyXG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xyXG5cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcclxuXHJcbiAgICAgICAgLy8gSUUgZG9lc24ndCBzZXQgcGF1c2VkIHByb3BlcnR5IHRvIHRydWUuIFNvIGZvcmNlIHNldCBpdC5cclxuICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XHJcblxyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfRVJST1IpIHtcclxuICAgICAgICAgICAgaWYodmlkZW9FbmRlZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cclxuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xyXG5cclxuICAgICAgICBsZXQgc291cmNlcyA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogcHJvdmlkZXIuaXNMaXZlKCkgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICB0eXBlIDp0eXBlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0TWV0YUxvYWRlZCgpO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghcGxheWVyQ29uZmlnLmdldENvbmZpZygpLnNob3dCaWdQbGF5QnV0dG9uICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxyXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcclxuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XHJcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XHJcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcclxuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xyXG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uID4gZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uU3RhcnQgPSBwcm92aWRlci5nZXRTb3VyY2VzKClbcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXS5zZWN0aW9uU3RhcnQ7XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uU3RhcnQgJiYgcG9zaXRpb24gPCBzZWN0aW9uU3RhcnQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xyXG5cclxuICAgICAgICAgICAgcHJvdmlkZXIuc2VlayhzZWN0aW9uU3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb25FbmQgPSBwcm92aWRlci5nZXRTb3VyY2VzKClbcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXS5zZWN0aW9uRW5kO1xyXG5cclxuICAgICAgICBpZiAoc2VjdGlvbkVuZCAmJiBwb3NpdGlvbiA+IHNlY3Rpb25FbmQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xyXG5cclxuICAgICAgICAgICAgcHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU29tZXRpbWVzIGRhc2ggbGl2ZSBnYXZlIHRvIG1lIGNyYXp5IGR1cmF0aW9uLiAoOTAwNzE5OTI1NDc0MDk5MS4uLikgd2h5Pz8/XHJcbiAgICAgICAgaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gSW5maW5pdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORykgJiZcclxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcclxuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uU3RhcnQgJiYgc2VjdGlvblN0YXJ0ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiAtIHNlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25FbmQpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBzZWN0aW9uRW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25TdGFydCkge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC0gc2VjdGlvblN0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbGVkXCIpO1xyXG4gICAgICAgIC8vVGhpcyBjYWxsYmFjayBkb2VzIG5vdCB3b3JrIG9uIGNocm9tZS4gVGhpcyBjYWxscyBvbiBGaXJlZm94IGludGVybWl0dGVudC4gVGhlbiBkbyBub3Qgd29yayBoZXJlLiB1c2luZyB3YWl0aW5nIGV2ZW50LlxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcclxuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgIH1bY29kZV18fDApO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xyXG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlMuY29kZXNbY29udmVydGVkRXJyb0NvZGVdLCBwcm92aWRlcik7XHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICBVSV9JQ09OUywgUExBWUVSX1dBUk5JTkcsXHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxyXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVENcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxyXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXHJcbiAqICovXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1Byb3ZpZGVyXSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9e307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xyXG5cclxuICAgIGxldCBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcblxyXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBudWxsLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XHJcblxyXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XHJcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cclxuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSB8fCBwcmV2aW91c1NvdXJjZSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubXNlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TWV0YUxvYWRlZCA9ICgpID0+IHtcclxuICAgICAgICBzcGVjLmlzTG9hZGVkID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0Lm1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XHJcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBzZXRTdGF0ZSgpXCIsIG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdHJpZ2dlclNhdGF0dXNcIiwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChuZXdTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMaXZlID8gdHJ1ZSA6IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhhdC5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcblxyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xyXG5cclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVGVzdCBpdCB0aG9yb3VnaGx5IGFuZCByZW1vdmUgaXNQbGF5aW5nUHJvY2Vzc2luZy4gTW9zdCBvZiB0aGUgaGF6YXJkcyBoYXZlIGJlZW4gcmVtb3ZlZC4gYSBsb3Qgb2Ygbm9uYmxvY2tpbmcgcGxheSgpIHdheSAtPiBibG9ja2luZyBwbGF5KClcclxuICAgICAgICAvLyBpZihpc1BsYXlpbmdQcm9jZXNzaW5nKXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IHRydWU7XHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9XQVJOSU5HLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgOiAxMCAqIDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uQ2xhc3MgOiBVSV9JQ09OUy52b2x1bWVfbXV0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBpZighbXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL0lFIHByb21pc2UgaXMgdW5kZWZpbmRlZC5cclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBzdWNjZXNzIChpZSlcIik7XHJcbiAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGF1c2UoKVwiKTtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25TdGFydDogc291cmNlLnNlY3Rpb25TdGFydCxcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25FbmQ6IHNvdXJjZS5zZWN0aW9uRW5kLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFRodW1ibmFpbDogc291cmNlLmdyaWRUaHVtYm5haWwsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcclxuICAgICAgICAgICAgICAgIG9iai5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xyXG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcclxuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcclxuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuXHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnN0b3AoKTtcclxuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=