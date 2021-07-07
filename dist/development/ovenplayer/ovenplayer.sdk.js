/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ovenplayer.sdk": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider","ovenplayer.provider.Html5":"ovenplayer.provider.Html5","ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.WebRTCProvider"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/ovenplayer.sdk.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/js/api/Api.js":
/*!***************************!*\
  !*** ./src/js/api/Api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Manager3 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

var Api = function Api(container) {
    var that = {};
    (0, _EventEmitter2["default"])(that);

    console.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");

    var playlistManager = (0, _Manager4["default"])(that);
    var providerController = (0, _Controller2["default"])();
    var userAgentObject = (0, _browser.analUserAgent)();
    var mediaManager = (0, _Manager2["default"])(container, userAgentObject);
    var currentProvider = "";
    var playerConfig = "";
    var lazyQueue = "";

    var webrtcRetry = false;
    var WEBRTC_RETRY_COUNT = 3;
    var webrtcRetryCount = WEBRTC_RETRY_COUNT;
    var webrtcRetryInterval = 1000;
    var webrtcRetryTimer = null;

    var runNextPlaylist = function runNextPlaylist(index) {
        OvenPlayerConsole.log("runNextPlaylist");
        var nextPlaylistIndex = index; // || playlistManager.getCurrentPlaylistIndex() + 1;
        var playlist = playlistManager.getPlaylist();
        var hasNextPlaylist = playlist[nextPlaylistIndex] ? true : false;
        //init source index
        playerConfig.setSourceIndex(0);

        //set Golbal Volume info
        playerConfig.setVolume(currentProvider.getVolume());

        if (hasNextPlaylist) {
            //that.pause();
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();

            if (!playerConfig.isAutoStart()) {
                //Anyway nextplaylist runs autoStart!.
                that.play();
            }
        } else {
            //All Playlist Ended.
            that.trigger(_constants.ALL_PLAYLIST_ENDED, null);
        }
    };
    var initProvider = function initProvider(lastPlayPosition) {
        var pickQualityFromSource = function pickQualityFromSource(sources) {
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]["default"]) {
                        quality = i;
                    }
                    if (playerConfig.getSourceIndex() === i) {
                        return i;
                    }
                    /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                        return i;
                    }*/
                }
            }
            return quality;
        };

        return providerController.loadProviders(playlistManager.getCurrentPlayList()).then(function (Providers) {

            if (Providers.length < 1) {
                throw _constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR];
            }

            if (currentProvider) {
                currentProvider.destroy();
                currentProvider = null;
            }

            var currentSourceIndex = (0, _utils.pickCurrentSource)(playlistManager.getCurrentSources(), playerConfig);
            var providerName = Providers[currentSourceIndex]["name"];
            OvenPlayerConsole.log("API : init() provider", providerName);
            //Init Provider.
            currentProvider = Providers[currentSourceIndex].provider(mediaManager.createMedia(providerName, playerConfig), playerConfig, playlistManager.getCurrentAdTag());

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {

                if (name === _constants.ERROR) {

                    // Chrome >=80 on Android misses h246 in SDP when first time after web page loaded.
                    // So wait until browser get h264 capabilities and create answer SDP.
                    if (userAgentObject.os === 'Android' && userAgentObject.browser === 'Chrome') {

                        if (data && data.code && data.code === _constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR) {

                            setTimeout(function () {

                                that.setCurrentSource(that.getCurrentSource());
                            }, webrtcRetryInterval);

                            return;
                        }
                    }

                    if (playerConfig.getConfig().autoFallback && playerConfig.getSourceIndex() + 1 < that.getSources().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentSource(playerConfig.getSourceIndex() + 1);

                        return;
                    }
                }

                if (name === "complete") {
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                that.trigger(name, data);
            });
        }).then(function () {

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function () {

                that.trigger(_constants.READY);

                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();
            })["catch"](function (error) {
                lazyQueue.off();
                if (error && error.code && _constants.ERRORS.codes[error.code]) {
                    that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
                } else {
                    var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(_constants.ERROR, tempError);
                }
            });
        })["catch"](function (error) {
            //INIT ERROR
            if (error && error.code && _constants.ERRORS.codes[error.code]) {
                that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
            } else {
                var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
                tempError.error = error;
                that.trigger(_constants.ERROR, tempError);
            }

            //xxx : If you init empty sources. (I think this is strange case.)
            //This works for this case.
            //player = OvenPlayer.create("elId", {});
            //player.load(soruces);
            lazyQueue.off();
            //lazyQueue.removeAndExcuteOnce("load");
        });
    };

    /**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
    that.init = function (options) {
        //It collects the commands and executes them at the time when they are executable.
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['load', 'play', 'pause', 'seek', 'stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState', 'getQualityLevels']);
        options.mediaContainer = container;
        options.browser = userAgentObject;
        playerConfig = (0, _Configurator2["default"])(options, that);
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.loadingRetryCount !== undefined) {
            WEBRTC_RETRY_COUNT = playerConfig.getConfig().loadingRetryCount;
        }

        //Not working : SyntaxError: "ERRORS.codes" is read-only
        _constants.ERRORS.codes = playerConfig.getSystemText().api.error;
        //Cool
        //ERRORS.codes.push(playerConfig.getSystemText());

        playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        OvenPlayerConsole.log("API : init() sources : ", playlistManager.getCurrentSources());

        initProvider();
    };
    that.getProviderName = function () {
        if (currentProvider) {
            return currentProvider.getName();
        } else {
            return null;
        }
    };
    that.getMseInstance = function () {
        if (currentProvider) {
            return currentProvider.getMse();
        } else {
            return null;
        }
    };
    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };
    that.getBrowser = function () {

        return playerConfig.getBrowser();
    };
    that.setTimecodeMode = function (isShow) {
        OvenPlayerConsole.log("API : setTimecodeMode()", isShow);
        playerConfig.setTimecodeMode(isShow);
    };
    that.isTimecodeMode = function () {
        OvenPlayerConsole.log("API : isTimecodeMode()");
        return playerConfig.isTimecodeMode();
    };
    that.getFramerate = function () {
        OvenPlayerConsole.log("API : getFramerate()");

        if (currentProvider) {
            return currentProvider.getFramerate();
        }
    };
    that.seekFrame = function (frameCount) {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : seekFrame()", frameCount);
        return currentProvider.seekFrame(frameCount);
    };

    that.getDuration = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = function (playlist) {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);

        if (playlist) {
            if (currentProvider) {
                currentProvider.setCurrentQuality(0);
            }

            if ('sources' in playlist) {
                playerConfig.setPlaylist(playlist);
            } else {
                playerConfig.setPlaylist({
                    sources: playlist
                });
            }

            playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        }
        return initProvider();
    };
    that.play = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    };
    that.pause = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = function (position) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : seek() " + position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };

    that.getPlaylist = function () {
        OvenPlayerConsole.log("API : getPlaylist() ", playlistManager.getPlaylist());
        return playlistManager.getPlaylist();
    };
    that.getCurrentPlaylist = function () {
        OvenPlayerConsole.log("API : getCurrentPlaylist() ", playlistManager.getCurrentPlaylistIndex());
        return playlistManager.getCurrentPlaylistIndex();
    };
    that.setCurrentPlaylist = function (index) {
        OvenPlayerConsole.log("API : setCurrentPlaylist() ", index);
        runNextPlaylist(index);
    };

    that.getSources = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getSources() ", currentProvider.getSources());
        return currentProvider.getSources();
    };
    that.getCurrentSource = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentSource() ", currentProvider.getCurrentSource());
        return currentProvider.getCurrentSource();
    };
    that.setCurrentSource = function (index) {

        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentSource() ", index);

        // let sources = currentProvider.getSources();
        // let currentSource = sources[currentProvider.getCurrentSource()];
        // let newSource = sources[index];

        // let isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // // provider.serCurrentQuality -> playerConfig setting -> load
        // let resultSourceIndex = currentProvider.setCurrentSource(index, isSameProvider);
        //
        // if(!newSource){
        //     return null;
        // }
        //
        // OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        var lastPlayPosition = currentProvider.getPosition();
        playerConfig.setSourceIndex(index);
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek']);

        initProvider(lastPlayPosition);

        return index;
    };

    that.getQualityLevels = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = function (qualityIndex) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        return currentProvider.setCurrentQuality(qualityIndex);
    };
    that.isAutoQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : isAutoQuality()");
        return currentProvider.isAutoQuality();
    };
    that.setAutoQuality = function (isAuto) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setAutoQuality() ", isAuto);
        return currentProvider.setAutoQuality(isAuto);
    };

    that.getBuffer = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = function () {

        OvenPlayerConsole.log("API : remove() ");

        if (lazyQueue) {
            lazyQueue.destroy();
        }

        if (currentProvider) {
            currentProvider.destroy();
            currentProvider = null;
        }

        if (mediaManager) {
            mediaManager.destroy();
            mediaManager = null;
        }

        that.trigger(_constants.DESTROY);
        that.off();

        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if (OvenPlayerSDK.getPlayerList().length === 0) {
            OvenPlayerConsole.log("OvenPlayerSDK.playerList", OvenPlayerSDK.getPlayerList());
        }
    };

    that.getVersion = function () {
        return "v." + _version.version;
    };

    return that;
};

exports["default"] = Api;

/***/ }),

/***/ "./src/js/api/Configurator.js":
/*!************************************!*\
  !*** ./src/js/api/Configurator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */
var Configurator = function Configurator(options, provider) {

    var composeSourceOptions = function composeSourceOptions(options) {
        var Defaults = {
            mediaContainer: "",
            playbackRates: [2, 1.5, 1, 0.5, 0.25],
            playbackRate: 1,
            mute: false,
            volume: 100,
            loop: false,
            autoStart: false,
            autoFallback: true,
            timecode: true,
            sourceIndex: -1,
            browser: "",
            hidePlaylistIcon: false,
            adClient: "googleima",
            currentProtocolOnly: false,
            systemText: null,
            lang: "en",
            loadingRetryCount: 0,
            expandFullScreenUI: false,
            fullscreenOption: null,
            showBigPlayButton: true
        };
        var serialize = function serialize(val) {
            if (val === undefined) {
                return null;
            }
            if (typeof val === 'string' && val.length < 6) {
                var lowercaseVal = val.toLowerCase();
                if (lowercaseVal === 'true') {
                    return true;
                }
                if (lowercaseVal === 'false') {
                    return false;
                }
                if (!isNaN(Number(val)) && !isNaN(parseFloat(val))) {
                    return Number(val);
                }
            }
            return val;
        };
        var deserialize = function deserialize(options) {
            Object.keys(options).forEach(function (key) {
                if (key === 'id') {
                    return;
                }
                options[key] = serialize(options[key]);
            });
        };

        deserialize(options);
        var config = _extends({}, Defaults, options);
        var userCustumSystemText = [];
        if (config.systemText) {
            userCustumSystemText = _underscore2["default"].isArray(config.systemText) ? config.systemText : [config.systemText];
        }

        for (var i = 0; i < userCustumSystemText.length; i++) {
            if (userCustumSystemText[i].lang) {
                var currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": userCustumSystemText[i].lang });
                if (currentSystemText) {
                    //validate & update
                    _extends(currentSystemText, userCustumSystemText[i]);
                } else {
                    //create
                    currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": "en" });
                    currentSystemText.lang = userCustumSystemText[i].lang;
                    _constants.SYSTEM_TEXT.push(_extends(userCustumSystemText[i], currentSystemText));
                }
            }
        }
        config.systemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": config.lang });

        var playbackRates = config.playbackRates;

        playbackRates = playbackRates.filter(function (rate) {
            return _underscore2["default"].isNumber(rate) && rate >= 0.25 && rate <= 4;
        }).map(function (rate) {
            return Math.round(rate * 4) / 4;
        });

        if (playbackRates.indexOf(1) < 0) {
            playbackRates.push(1);
        }
        playbackRates.sort();

        config.playbackRates = playbackRates;

        if (config.playbackRates.indexOf(config.playbackRate) < 0) {
            config.playbackRate = 1;
        }

        var configPlaylist = config.playlist;
        if (!configPlaylist) {
            var obj = _underscore2["default"].pick(config, ['title', 'description', 'type', 'image', 'file', 'sources', 'tracks', 'host', 'application', 'stream', 'adTagUrl']);

            config.playlist = [obj];
        } else if (_underscore2["default"].isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    var spec = composeSourceOptions(options);

    //spec.isFullscreen = false; //IE 11 can't check current fullscreen state.

    var that = {};
    that.getConfig = function () {
        return spec;
    };
    that.getAdClient = function () {
        return spec.adClient;
    };
    that.setConfig = function (config, value) {
        spec[config] = value;
    };

    that.getContainer = function () {
        return spec.mediaContainer;
    };
    /*that.isFullscreen = () => {
        return spec.isFullscreen;
    }
    that.setFullscreen = (isFullscreen) => {
        return spec.isFullscreen = isFullscreen;
    }*/

    that.getPlaybackRate = function () {
        return spec.playbackRate;
    };
    that.setPlaybackRate = function (playbackRate) {
        spec.playbackRate = playbackRate;
        return playbackRate;
    };

    that.getQualityLabel = function () {
        return spec.qualityLabel;
    };
    that.setQualityLabel = function (newLabel) {
        spec.qualityLabel = newLabel;
    };

    that.isCurrentProtocolOnly = function () {
        return spec.currentProtocolOnly;
    };
    /*that.getSourceLabel = () => {
        return spec.sourceLabel;
    };
    that.setSourceLabel = (newLabel) => {
        spec.sourceLabel = newLabel;
    };*/

    that.getSourceIndex = function () {
        return spec.sourceIndex;
    };
    that.setSourceIndex = function (index) {
        spec.sourceIndex = index;
    };
    that.setTimecodeMode = function (timecode) {
        if (spec.timecode !== timecode) {
            spec.timecode = timecode;
            provider.trigger(_constants.CONTENT_TIME_MODE_CHANGED, timecode);
        }
    };
    that.isTimecodeMode = function () {
        return spec.timecode;
    };

    that.isMute = function () {
        return spec.mute;
    };
    that.getVolume = function () {
        return spec.volume;
    };
    that.setVolume = function (volume) {
        spec.volume = volume;
    };
    that.isLoop = function () {
        return spec.loop;
    };
    that.isAutoStart = function () {
        return spec.autoStart;
    };
    that.isControls = function () {
        return spec.controls;
    };

    that.getPlaybackRates = function () {
        return spec.playbackRates;
    };
    that.getBrowser = function () {
        return spec.browser;
    };
    that.getSystemText = function () {
        return spec.systemText;
    };
    that.getLanguage = function () {
        return spec.lang;
    };

    that.getPlaylist = function () {
        return spec.playlist;
    };
    that.setPlaylist = function (playlist) {
        if (_underscore2["default"].isArray(playlist)) {
            spec.playlist = playlist;
        } else {
            spec.playlist = [playlist];
        }
        return spec.playlist;
    };

    return that;
};

exports["default"] = Configurator;

/***/ }),

/***/ "./src/js/api/EventEmitter.js":
/*!************************************!*\
  !*** ./src/js/api/EventEmitter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 7. 3..
 */

/**
 * @brief   This module provide custom events.
 * @param   object    An object that requires custom events.
 *
 * */

var EventEmitter = function EventEmitter(object) {
    var that = object;
    var _events = [];

    var triggerEvents = function triggerEvents(events, args, context) {
        var i = 0;
        var length = events.length;
        for (i = 0; i < length; i++) {
            var event = events[i];
            event.listener.apply(event.context || context, args);
        }
    };

    that.on = function (name, listener, context) {
        (_events[name] || (_events[name] = [])).push({ listener: listener, context: context });
        return that;
    };
    that.trigger = function (name) {
        if (!_events) {
            return false;
        }
        var args = [].slice.call(arguments, 1);
        var events = _events[name];
        var allEvents = _events.all;

        if (events) {
            triggerEvents(events, args, that);
        }
        if (allEvents) {
            triggerEvents(allEvents, arguments, that);
        }
    };
    that.off = function (name, listener, context) {
        if (!_events) {
            return false;
        }

        if (!name && !listener && !context) {
            _events = [];
            return that;
        }

        var names = name ? [name] : Object.keys(_events);

        for (var i = 0, l = names.length; i < l; i++) {
            name = names[i];
            var events = _events[name];
            if (events) {
                var retain = _events[name] = [];
                if (listener || context) {
                    for (var j = 0, k = events.length; j < k; j++) {
                        var event = events[j];
                        if (listener && listener !== event.listener && listener !== event.listener.listener && listener !== event.listener._listener || context && context !== event.context) {
                            retain.push(event);
                        }
                    }
                }
                if (!retain.length) {
                    delete _events[name];
                }
            }
        }
        return that;
    };
    that.once = function (name, listener, context) {
        var count = 0;
        var onceCallback = function onceCallback() {
            if (count++) {
                return;
            }
            that.off(name, onceCallback);
            listener.apply(that, arguments);
        };
        onceCallback._listener = listener;
        return that.on(name, onceCallback, context);
    };

    return that;
};

exports["default"] = EventEmitter;

/***/ }),

/***/ "./src/js/api/LazyCommandExecutor.js":
/*!*******************************************!*\
  !*** ./src/js/api/LazyCommandExecutor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */
var LazyCommandExecutor = function LazyCommandExecutor(instance, queuedCommands) {
    var commandQueue = [];
    var undecoratedMethods = {};
    var executeMode = false;
    var that = {};
    OvenPlayerConsole.log("LazyCommandExecutor loaded.");
    queuedCommands.forEach(function (command) {
        var method = instance[command];
        undecoratedMethods[command] = method || function () {};

        instance[command] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            if (!executeMode) {
                //commandQueue.push({ command, args });
                that.addQueue(command, args);
            } else {
                executeQueuedCommands();
                if (method) {
                    method.apply(that, args);
                }
            }
        };
    });
    var executeQueuedCommands = function executeQueuedCommands() {
        while (commandQueue.length > 0) {
            var _commandQueue$shift = commandQueue.shift(),
                command = _commandQueue$shift.command,
                args = _commandQueue$shift.args;

            (undecoratedMethods[command] || instance[command]).apply(instance, args);
        }
    };

    that.setExecuteMode = function (mode) {
        executeMode = mode;
        OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()", mode);
    };
    that.getUndecoratedMethods = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()", undecoratedMethods);
        return undecoratedMethods;
    };
    that.getQueue = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getQueue()", getQueue);
        return commandQueue;
    };
    that.addQueue = function (command, args) {
        OvenPlayerConsole.log("LazyCommandExecutor : addQueue()", command, args);
        commandQueue.push({ command: command, args: args });
    };

    that.flush = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : flush()");
        executeQueuedCommands();
    };
    that.empty = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : empty()");
        commandQueue.length = 0;
    };
    that.off = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : off()");
        queuedCommands.forEach(function (command) {
            var method = undecoratedMethods[command];
            if (method) {
                instance[command] = method;
                delete undecoratedMethods[command];
            }
        });
    };

    //Run once at the end
    that.removeAndExcuteOnce = function (command_) {
        var commandQueueItem = _underscore2["default"].findWhere(commandQueue, { command: command_ });
        OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_underscore2["default"].findIndex(commandQueue, { command: command_ }), 1);

        var method = undecoratedMethods[command_];
        if (method) {
            OvenPlayerConsole.log("removeCommand()");
            if (commandQueueItem) {
                (method || instance[command_]).apply(instance, commandQueueItem.args);
            }
            instance[command_] = method;
            delete undecoratedMethods[command_];
        }
    };

    that.destroy = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : destroy()");
        that.off();
        that.empty();
    };
    return that;
};

exports["default"] = LazyCommandExecutor;

/***/ }),

/***/ "./src/js/api/SupportChecker.js":
/*!**************************************!*\
  !*** ./src/js/api/SupportChecker.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

var SupportChecker = function SupportChecker() {
    var that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    var userAgentObject = (0, _browser.analUserAgent)();

    var supportList = [{
        name: 'html5',
        checkSupport: function checkSupport(source) {
            var MimeTypes = {
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

            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }

            var file = source.file;
            var type = source.type;

            if (!type) {
                return false;
            }
            var mimeType = source.mimeType || MimeTypes[type];

            if ((0, _validator.isWebRTC)(file, type)) {
                return false;
            }

            if (!mimeType) {
                return false;
            }

            return !!video.canPlayType(mimeType);
        }
    }, {
        name: 'webrtc',
        checkSupport: function checkSupport(source) {
            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }

            var file = source.file;
            var type = source.type;

            if ((0, _validator.isWebRTC)(file, type)) {
                return true;
            } else {
                return false;
            }
        }
    }];

    that.findProviderNameBySource = function (soruce_) {
        OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()", soruce_);
        var source = soruce_ === Object(soruce_) ? soruce_ : {};
        for (var i = 0; i < supportList.length; i++) {
            if (supportList[i].checkSupport(source)) {
                return supportList[i].name;
            }
        }
    };
    that.findProviderNamesByPlaylist = function (playlistItem) {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        var supportNames = [];
        /*for (let i = playlist_.length; i--;) {
            }*/
        var item = playlistItem;

        if (item && item.sources) {
            for (var j = 0; j < item.sources.length; j++) {
                var source = item.sources[j];
                if (source) {
                    var supported = that.findProviderNameBySource(source);
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

exports["default"] = SupportChecker;

/***/ }),

/***/ "./src/js/api/constants.js":
/*!*********************************!*\
  !*** ./src/js/api/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// STATE
var STATE_BUFFERING = exports.STATE_BUFFERING = "buffering";
var STATE_IDLE = exports.STATE_IDLE = "idle";
var STATE_COMPLETE = exports.STATE_COMPLETE = "complete";
var STATE_PAUSED = exports.STATE_PAUSED = "paused";
var STATE_PLAYING = exports.STATE_PLAYING = "playing";
var STATE_ERROR = exports.STATE_ERROR = "error";
var STATE_LOADING = exports.STATE_LOADING = "loading";
var STATE_STALLED = exports.STATE_STALLED = "stalled";

var STATE_AD_LOADING = exports.STATE_AD_LOADING = "adLoading";
var STATE_AD_LOADED = exports.STATE_AD_LOADED = "adLoaded";
var STATE_AD_PLAYING = exports.STATE_AD_PLAYING = "adPlaying";
var STATE_AD_PAUSED = exports.STATE_AD_PAUSED = "adPaused";
var STATE_AD_COMPLETE = exports.STATE_AD_COMPLETE = "adComplete";
var STATE_AD_ERROR = exports.STATE_AD_ERROR = "adError";
var PLAYER_AD_CLICK = exports.PLAYER_AD_CLICK = "adclick";

// PROVIDER
var PROVIDER_HTML5 = exports.PROVIDER_HTML5 = "html5";
var PROVIDER_WEBRTC = exports.PROVIDER_WEBRTC = "webrtc";

// EVENTS
var CONTENT_COMPLETE = exports.CONTENT_COMPLETE = STATE_COMPLETE;
var READY = exports.READY = "ready";
var DESTROY = exports.DESTROY = "destroy";
var CONTENT_SEEK = exports.CONTENT_SEEK = "seek";
var CONTENT_BUFFER_FULL = exports.CONTENT_BUFFER_FULL = "bufferFull";
var DISPLAY_CLICK = exports.DISPLAY_CLICK = "displayClick";
var CONTENT_LOADED = exports.CONTENT_LOADED = "loaded";
var PLAYLIST_CHANGED = exports.PLAYLIST_CHANGED = "playlistChanged";
var CONTENT_SEEKED = exports.CONTENT_SEEKED = "seeked";
var ALL_PLAYLIST_ENDED = exports.ALL_PLAYLIST_ENDED = "allPlaylistEnded";
var NETWORK_UNSTABLED = exports.NETWORK_UNSTABLED = "unstableNetwork";

var ERROR = exports.ERROR = "error";

// STATE OF PLAYER
var PLAYER_STATE = exports.PLAYER_STATE = "stateChanged";
var PLAYER_COMPLETE = exports.PLAYER_COMPLETE = STATE_COMPLETE;
var PLAYER_PAUSE = exports.PLAYER_PAUSE = "pause";
var PLAYER_PLAY = exports.PLAYER_PLAY = "play";

var PLAYER_CLICKED = exports.PLAYER_CLICKED = "clicked";
var PLAYER_RESIZED = exports.PLAYER_RESIZED = "resized";
var PLAYER_LOADING = exports.PLAYER_LOADING = "loading";
var PLAYER_FULLSCREEN_REQUEST = exports.PLAYER_FULLSCREEN_REQUEST = "fullscreenRequested";
var PLAYER_FULLSCREEN_CHANGED = exports.PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";
var PLAYER_WARNING = exports.PLAYER_WARNING = "warning";

var CONTENT_BUFFER = exports.CONTENT_BUFFER = "bufferChanged";
var CONTENT_TIME = exports.CONTENT_TIME = "time";
var CONTENT_RATE_CHANGE = exports.CONTENT_RATE_CHANGE = "ratechange";
var CONTENT_VOLUME = exports.CONTENT_VOLUME = "volumeChanged";
var CONTENT_MUTE = exports.CONTENT_MUTE = "mute";
var CONTENT_META = exports.CONTENT_META = "metaChanged";
var CONTENT_SOURCE_CHANGED = exports.CONTENT_SOURCE_CHANGED = "sourceChanged";
var CONTENT_LEVEL_CHANGED = exports.CONTENT_LEVEL_CHANGED = "qualityLevelChanged";
var CONTENT_DURATION_CHANGED = exports.CONTENT_DURATION_CHANGED = "durationChanged";
var PLAYBACK_RATE_CHANGED = exports.PLAYBACK_RATE_CHANGED = "playbackRateChanged";
var CONTENT_TIME_MODE_CHANGED = exports.CONTENT_TIME_MODE_CHANGED = "timeDisplayModeChanged";
var OME_P2P_MODE = exports.OME_P2P_MODE = "p2pMode";

var AD_CLIENT_GOOGLEIMA = exports.AD_CLIENT_GOOGLEIMA = "googleima";
var AD_CLIENT_VAST = exports.AD_CLIENT_VAST = "vast";

var INIT_UNKNWON_ERROR = exports.INIT_UNKNWON_ERROR = 100;
var INIT_UNSUPPORT_ERROR = exports.INIT_UNSUPPORT_ERROR = 101;
var PLAYER_UNKNWON_ERROR = exports.PLAYER_UNKNWON_ERROR = 300;
var PLAYER_UNKNWON_OPERATION_ERROR = exports.PLAYER_UNKNWON_OPERATION_ERROR = 301;
var PLAYER_UNKNWON_NETWORK_ERROR = exports.PLAYER_UNKNWON_NETWORK_ERROR = 302;
var PLAYER_UNKNWON_DECODE_ERROR = exports.PLAYER_UNKNWON_DECODE_ERROR = 303;
var PLAYER_FILE_ERROR = exports.PLAYER_FILE_ERROR = 304;
var PLAYER_BAD_REQUEST_ERROR = exports.PLAYER_BAD_REQUEST_ERROR = 306;
var PLAYER_AUTH_FAILED_ERROR = exports.PLAYER_AUTH_FAILED_ERROR = 307;
var PLAYER_NOT_ACCEPTABLE_ERROR = exports.PLAYER_NOT_ACCEPTABLE_ERROR = 308;
var PLAYER_WEBRTC_WS_ERROR = exports.PLAYER_WEBRTC_WS_ERROR = 501;
var PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = exports.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
var PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = exports.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
var PLAYER_WEBRTC_CREATE_ANSWER_ERROR = exports.PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
var PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = exports.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
var PLAYER_WEBRTC_NETWORK_SLOW = exports.PLAYER_WEBRTC_NETWORK_SLOW = 510;
var PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = exports.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = 511;

var WARN_MSG_MUTEDPLAY = exports.WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";

var UI_ICONS = exports.UI_ICONS = {
    volume_mute: "volume-mute",
    op_warning: "op-warning"
};

var ERRORS = exports.ERRORS = { codes: "" };

var SYSTEM_TEXT = exports.SYSTEM_TEXT = [{
    "lang": "en",
    "ui": {
        "controls": {
            "live": "Live Streaming",
            "low_latency_live": "Sub-Second Latency Streaming",
            "low_latency_p2p": "Sub-Second Latency P2P"
        },
        "playlist": "Playlist",
        "setting": {
            "title": "Settings",
            "speed": "Speed",
            "speedUnit": "x",
            "source": "Source",
            "quality": "Quality",
            "display": "Display"
        }
    },
    "api": {
        "message": {
            "muted_play": "Please touch here to turn on the sound."
        },
        "error": {
            100: {
                "code": 100,
                "message": "Can not load due to unknown reasons.",
                "reason": "Can not load due to unknown reasons."
            },
            101: {
                "code": 101,
                "message": "Can not load due to playable media not found.",
                "reason": "Can not load due to playable media not found."
            },
            300: {
                "code": 300,
                "message": "Can not play due to unknown reasons.",
                "reason": "Can not play due to unknown reasons."
            },
            301: {
                "code": 301,
                "message": "Fetching process aborted by user.",
                "reason": "Fetching process aborted by user."
            },
            302: {
                "code": 302,
                "message": "Some of the media could not be downloaded due to a network error.",
                "reason": "Error occurred when downloading."
            },
            303: {
                "code": 303,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "Error occurred when decoding."
            },
            304: {
                "code": 304,
                "message": "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.",
                "reason": "Media playback not supported."
            },
            306: {
                "code": 306,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server cannot or will not process the request."
            },
            307: {
                "code": 307,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server refused the request."
            },
            308: {
                "code": 308,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server do not accept the request."
            },
            501: {
                "code": 501,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebSocket connection failed."
            },
            502: {
                "code": 502,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC addIceCandidate failed."
            },
            503: {
                "code": 503,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setRemoteDescription failed."
            },
            504: {
                "code": 504,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC peer createOffer failed."
            },
            505: {
                "code": 505,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setLocalDescription failed."
            },
            510: {
                "code": 510,
                "message": "Network connection is unstable. Check the network connection.",
                "reason": "Network is slow."
            },
            511: {
                "code": 511,
                "message": "Connection with low-latency(OME) terminated unexpectedly.",
                "reason": "Unexpected end of connection."
            }
        }
    }
}];

/***/ }),

/***/ "./src/js/api/media/Manager.js":
/*!*************************************!*\
  !*** ./src/js/api/media/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//ToDo : Restructuring

var Manager = function Manager(container, browserInfo) {
    var that = {};
    var rootId = container.getAttribute("data-parent-id");
    var $container = (0, _likeA$2["default"])(container);
    var videoElement = "";

    OvenPlayerConsole.log("MediaManager loaded. browser : ", browserInfo);

    var createHtmlVideo = function createHtmlVideo(isLoop, isAutoStart) {

        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if (isLoop) {
            videoElement.setAttribute('loop', '');
        }
        if (isAutoStart) {
            videoElement.setAttribute('autoplay', '');
        }
        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = function (providerName, playerConfig) {
        // if(videoElement){
        //     // that.empty();
        //     //reuse video element.
        //     //because playlist is auto next playing.
        //     //Only same video element does not require User Interaction Error.
        //     return videoElement;
        // }else{
        //     return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
        // }
        that.empty();
        return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
    };

    that.createAdContainer = function () {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        $container.append(adContainer);

        return adContainer;
    };

    that.empty = function () {
        OvenPlayerConsole.log("MediaManager removeElement()");
        $container.removeChild(videoElement);
        videoElement = null;
    };

    that.destroy = function () {
        $container.removeChild();
        $container = null;
        videoElement = null;
        rootId = null;
    };

    return that;
}; /**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/playlist/Manager.js":
/*!****************************************!*\
  !*** ./src/js/api/playlist/Manager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _strings = __webpack_require__(/*! ../../utils/strings */ "./src/js/utils/strings.js");

var _SupportChecker = __webpack_require__(/*! ../SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
var Manager = function Manager(provider) {
    var that = {};
    var currentPlaylistItem = [];
    var spec = {
        playlist: [],
        currentIndex: 0
    };
    var supportChecker = (0, _SupportChecker2["default"])();

    OvenPlayerConsole.log("PlaylistManager loaded.");

    var makePrettySource = function makePrettySource(source_) {
        if (!source_ || !source_.file && !(source_.host || source_.application || source_.stream)) {
            return;
        }

        var source = _extends({}, { 'default': false }, source_);
        source.file = (0, _strings.trim)('' + source.file);

        if (source.host && source.application && source.stream) {
            source.file = source.host + "/" + source.application + "/stream/" + source.stream;
            delete source.host;
            delete source.application;
            delete source.stream;
        }

        var mimetypeRegEx = /^[^/]+\/(?:x-)?([^/]+)$/;

        if (mimetypeRegEx.test(source.type)) {
            // if type is given as a mimetype
            source.mimeType = source.type;
            source.type = source.type.replace(mimetypeRegEx, '$1');
        }

        if ((0, _validator.isWebRTC)(source.file)) {
            source.type = 'webrtc';
        } else if (!source.type) {
            source.type = (0, _strings.extractExtension)(source.file);
        }

        if (source.lowLatency) {
            source.lowLatency = source.lowLatency;
        }

        if (!source.type) {
            return;
        }

        // normalize types
        switch (source.type) {
            case 'm3u8':
            case 'vnd.apple.mpegurl':
                source.type = 'hls';
                break;
            case 'm4a':
                source.type = 'aac';
                break;
            case 'smil':
                source.type = 'rtmp';
                break;
            default:
                break;
        }

        Object.keys(source).forEach(function (key) {
            if (source[key] === '') {
                delete source[key];
            }
        });

        return source;
    };

    that.initPlaylist = function (playlist, playerConfig) {

        OvenPlayerConsole.log("PlaylistManager setPlaylist() ", playlist);
        var prettiedPlaylist = (_underscore2["default"].isArray(playlist) ? playlist : [playlist]).map(function (item) {
            if (!_underscore2["default"].isArray(item.tracks)) {
                delete item.tracks;
            }
            var playlistItem = _extends({}, {
                sources: [],
                tracks: [],
                title: ""
            }, item);

            if (playlistItem.sources === Object(playlistItem.sources) && !_underscore2["default"].isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                playlistItem.sources = [makePrettySource(playlistItem)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                if (item.levels) {
                    playlistItem.sources = item.levels;
                } else {
                    playlistItem.sources = [makePrettySource(item)];
                }
            }

            for (var i = 0; i < playlistItem.sources.length; i++) {
                var source = playlistItem.sources[i];
                var prettySource = "";
                if (!source) {
                    continue;
                }

                var defaultSource = source["default"];
                if (defaultSource) {
                    source["default"] = defaultSource.toString() === 'true';
                } else {
                    source["default"] = false;
                }

                // If the source doesn't have a label, number it
                if (!playlistItem.sources[i].label) {
                    playlistItem.sources[i].label = playlistItem.sources[i].type + "-" + i.toString();
                }

                prettySource = makePrettySource(playlistItem.sources[i]);
                if (supportChecker.findProviderNameBySource(prettySource)) {
                    playlistItem.sources[i] = prettySource;
                } else {
                    playlistItem.sources[i] = null;
                }
            }

            playlistItem.sources = playlistItem.sources.filter(function (source) {
                return !!source;
            });

            if (!playlistItem.title && playlistItem.sources[0] && playlistItem.sources[0].label) {
                playlistItem.title = playlistItem.sources[0].label;
            }

            // default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
            /*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/

            function extractOnlyOneProtocol(sources) {
                if (!!sources) {
                    var highPriorityType = playlistItem.sources[0].type;

                    return _underscore2["default"].filter(sources, { type: highPriorityType });
                }
            }

            if (playerConfig.isCurrentProtocolOnly()) {
                playlistItem.sources = extractOnlyOneProtocol(playlistItem.sources);
            }

            if (!_underscore2["default"].isArray(playlistItem.tracks)) {
                playlistItem.tracks = [];
            }

            playlistItem.tracks = playlistItem.tracks.map(function (track) {
                if (!track || !track.file) {
                    return false;
                }
                return _extends({}, {
                    'kind': 'captions',
                    'default': false
                }, track);
            }).filter(function (track) {
                return !!track;
            });
            return playlistItem;
        }).filter(function (item) {
            return item.sources && item.sources.length > 0;
        }) || [];
        spec.playlist = prettiedPlaylist;
        return prettiedPlaylist;
    };
    that.getPlaylist = function () {
        OvenPlayerConsole.log("PlaylistManager getPlaylist() ", spec.playlist);
        return spec.playlist;
    };
    that.getCurrentPlayList = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex];
        } else {
            return [];
        }
    };
    that.getCurrentPlaylistIndex = function () {
        return spec.currentIndex;
    };
    that.setCurrentPlaylist = function (index) {
        if (spec.playlist[index]) {
            spec.currentIndex = index;
            provider.trigger(_constants.PLAYLIST_CHANGED, spec.currentIndex);
        }
        return spec.currentIndex;
    };
    that.getCurrentSources = function () {
        if (spec.playlist[spec.currentIndex]) {
            OvenPlayerConsole.log("PlaylistManager getCurrentSources() ", spec.playlist[spec.currentIndex].sources);
            return spec.playlist[spec.currentIndex].sources;
        } else {
            return null;
        }
    };
    that.getCurrentAdTag = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex].adTagUrl || "";
        }
    };

    return that;
};

exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/provider/Controller.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/Controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SupportChecker = __webpack_require__(/*! api/SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages provider.
 * @param
 * */
var Controller = function Controller() {
    var supportChacker = (0, _SupportChecker2["default"])();
    var Providers = {};

    var that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    var registeProvider = function registeProvider(name, provider) {
        if (Providers[name]) {
            return;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    var ProviderLoader = {
        html5: function html5() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.Html5 */[__webpack_require__.e("ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider"), __webpack_require__.e("ovenplayer.provider.Html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Html5 */ "./src/js/api/provider/html5/providers/Html5.js")["default"];
                registeProvider(_constants.PROVIDER_HTML5, provider);
                return { name: _constants.PROVIDER_HTML5, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/WebRTC */ "./src/js/api/provider/html5/providers/WebRTC.js")["default"];
                registeProvider(_constants.PROVIDER_WEBRTC, provider);
                return { name: _constants.PROVIDER_WEBRTC, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        }
    };

    that.loadProviders = function (playlistItem) {
        var supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlistItem);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        if (!supportedProviderNames) {
            return Promise.reject(_constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR]);
        } else {
            return Promise.all(supportedProviderNames.filter(function (providerName) {
                return !!ProviderLoader[providerName];
            }).map(function (providerName) {
                return ProviderLoader[providerName]();
            }));
        }
    };

    that.findByName = function (name) {
        OvenPlayerConsole.log("ProviderController findByName() ", name);
        return Providers[name];
    };

    that.getProviderBySource = function (source) {
        var supportedProviderName = supportChacker.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = function (currentSource, newSource) {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", supportChacker.findProviderNameBySource(currentSource), supportChacker.findProviderNameBySource(newSource));
        return supportChacker.findProviderNameBySource(currentSource) === supportChacker.findProviderNameBySource(newSource);
    };

    return that;
};

exports["default"] = Controller;

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
exports.pickCurrentSource = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

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

var pickCurrentSource = exports.pickCurrentSource = function pickCurrentSource(sources, playerConfig) {

    var sourceIndex = 0;

    if (sources) {

        if (playerConfig.getSourceIndex() === -1) {

            for (var i = 0; i < sources.length; i++) {
                if (sources[i]["default"]) {
                    sourceIndex = i;
                    break;
                }
            }
        } else {

            sourceIndex = playerConfig.getSourceIndex();
        }
    }

    return sourceIndex;
};

/***/ }),

/***/ "./src/js/ovenplayer.sdk.js":
/*!**********************************!*\
  !*** ./src/js/ovenplayer.sdk.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAndGetContainerElement = undefined;

var _Api = __webpack_require__(/*! api/Api */ "./src/js/api/Api.js");

var _Api2 = _interopRequireDefault(_Api);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.sdk.js');

/**
 * Main OvenPlayerSDK object
 */
var OvenPlayerSDK = window.OvenPlayerSDK = {};

var playerList = OvenPlayerSDK.playerList = [];

var checkAndGetContainerElement = exports.checkAndGetContainerElement = function checkAndGetContainerElement(container) {
    if (!container) {

        // TODO(rock): Should cause an error.
        return null;
    }

    var containerElement = null;

    if (typeof container === 'string') {

        containerElement = document.getElementById(container);
    } else if (container.nodeType) {

        containerElement = container;
    } else {
        // TODO(rock): Should cause an error.
        return null;
    }

    return containerElement;
};

/**
 * Create player instance and return it.
 *
 * @param      {string | dom element} container  Id of container element or container element
 * @param      {object} options  The options
 */
OvenPlayerSDK.create = function (container, options) {

    var containerElement = checkAndGetContainerElement(container);

    var playerInstance = (0, _Api2['default'])(containerElement);
    playerInstance.init(options);

    playerList.push(playerInstance);

    return playerInstance;
};

/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
OvenPlayerSDK.getPlayerList = function () {

    return playerList;
};

/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByContainerId = function (containerId) {

    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === containerId) {

            return playerList[i];
        }
    }

    return null;
};

/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByIndex = function (index) {

    var playerInstance = playerList[index];

    if (playerInstance) {

        return playerInstance;
    } else {

        return null;
    }
};

/**
 * Remove the player instance by playerId.
 *
 * @param      {playerId}  id
 * @return     {null}
 */
OvenPlayerSDK.removePlayer = function (playerId) {
    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === playerId) {

            playerList.splice(i, 1);
        }
    }
};

/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Object.
 */
OvenPlayerSDK.generateWebrtcUrls = function (sources) {
    return (_underscore2['default'].isArray(sources) ? sources : [sources]).map(function (source, index) {
        if (source.host && (0, _validator.isWebRTC)(source.host) && source.application && source.stream) {
            return { file: source.host + "/" + source.application + "/" + source.stream, type: "webrtc", label: source.label ? source.label : "webrtc-" + (index + 1) };
        }
    });
};

/**
 * Whether show the player core log or not.
 *
 * @param      {boolean}  boolean   run debug mode or not.
 * @return     {boolean}  run debug mode or not.
 */
OvenPlayerSDK.debug = function (isDebugMode) {
    if (isDebugMode) {
        window.OvenPlayerConsole = { log: window['console']['log'] };
    } else {
        window.OvenPlayerConsole = { log: function log() {} };
    }
    return isDebugMode;
};

exports['default'] = OvenPlayerSDK;

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowserLanguage = exports.getBrowserLanguage = function getBrowserLanguage() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i = void 0,
        language = void 0;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};
var analUserAgent = exports.analUserAgent = function analUserAgent() {
    var unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
        var width = screen.width ? screen.width : '';
        var height = screen.height ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var isWebview = false;
    var nameOffset = void 0,
        verOffset = void 0,
        ix = void 0;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    //삼성 브라우저
    else if ((verOffset = nAgt.indexOf('SamsungBrowser')) != -1) {
            browser = 'SamsungBrowser';
            version = nAgt.substring(verOffset + 15);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(verOffset + 5);

                    //win7 IE11 userAgent is ugly....
                    if (nAgt.indexOf('Trident/') !== -1 && nAgt.indexOf('rv:') !== -1) {
                        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                    }
                }
                // Chrome
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 7);
                    } else if ((verOffset = nAgt.indexOf('CriOS')) != -1) {
                        //iphone - chrome
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 6);
                    }
                    // Firefox
                    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 8);
                        } else if ((verOffset = nAgt.indexOf('FxiOS')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 6);
                        }
                        // Safari
                        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                                browser = 'Safari';
                                version = nAgt.substring(verOffset + 7);
                                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                                    version = nAgt.substring(verOffset + 8);
                                }
                            }

                            // MSIE 11+
                            else if (nAgt.indexOf('Trident/') !== -1) {
                                    browser = 'Microsoft Internet Explorer';
                                    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                                }
                                // Other browsers
                                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                                        browser = nAgt.substring(nameOffset, verOffset);
                                        version = nAgt.substring(verOffset + 1);
                                        if (browser.toLowerCase() == browser.toUpperCase()) {
                                            browser = navigator.appName;
                                        }
                                    }
    if (nAgt.indexOf(' wv') > 0) {
        isWebview = true;
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') != -1 ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS XI', r: /Mac OS X 11/ }, { s: 'Mac OS X', r: /Mac OS X 10/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'BeOS', r: /BeOS/ }, { s: 'OS/2', r: /OS\/2/ }, { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS XI':
            osVersion = /Mac OS X (11[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    return {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        ua: nAgt,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
};

/***/ }),

/***/ "./src/js/utils/likeA$.js":
/*!********************************!*\
  !*** ./src/js/utils/likeA$.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */

var La$ = function La$(selectorOrElement) {
    var that = {};
    var returnNode = function returnNode($element, selector) {
        var nodeList = $element.querySelectorAll(selector);
        if (nodeList.length > 1) {
            return nodeList;
        } else {
            return nodeList[0];
        }
    };

    var $element = "";

    if (_underscore2["default"].isElement(selectorOrElement) || _underscore2["default"].every(selectorOrElement, function (item) {
        return _underscore2["default"].isElement(item);
    })) {
        $element = selectorOrElement;
    } else if (selectorOrElement === "document") {
        $element = document;
    } else if (selectorOrElement === "window") {
        $element = window;
    } else {
        $element = returnNode(document, selectorOrElement);
    }

    if (!$element) {
        return null;
    }

    /*EFFECTS*/

    that.show = function () {
        $element.style.display = 'block';
    };

    that.hide = function () {
        $element.style.display = 'none';
    };

    /*ELEMENTS*/

    that.addClass = function (name) {
        if ($element.classList) {
            $element.classList.add(name);
        } else {
            var classNames = $element.className.split(" ");
            if (classNames.indexOf(name) === -1) {
                $element.className += " " + name;
            }
        }
    };

    that.after = function (htmlString) {
        $element.insertAdjacentHTML('afterend', htmlString);
    };

    that.append = function (htmlString) {
        $element.appendChild(htmlString);
    };

    that.before = function (htmlString) {
        $element.insertAdjacentHTML('beforebegin', htmlString);
    };

    that.children = function () {
        return $element.children || [];
    };

    //The contains() method returns a Boolean value indicating whether a node is a descendant of a specified node.
    //A descendant can be a child, grandchild, great-grandchild, and so on.
    that.contains = function (elChild) {
        return $element !== elChild && $element.contains(elChild);
    };

    that.empty = function () {
        $element.innerHTML = "";
    };

    that.find = function (selector) {
        return La$(returnNode($element, selector));
    };

    that.css = function (name, value) {
        if (value) {
            if ($element.length > 0) {
                $element.forEach(function (element) {
                    element.style[name] = value;
                });
            } else {
                $element.style[name] = value;
            }
        } else {
            return $element.style[name];
        }
    };

    that.removeClass = function (name) {
        if ($element.classList) {
            $element.classList.remove(name);
        } else {
            $element.className = $element.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    that.removeAttribute = function (attrName) {
        $element.removeAttribute(attrName);
    };

    /*that.append = (htmlCode) =>{
        $element.innerHTML += htmlCode;
    };*/

    that.text = function (text) {
        //IE8+
        if (text === undefined) {
            return $element.textContent;
        } else {
            $element.textContent = text;
        }
    };
    that.html = function (htmlString) {
        $element.innerHTML = htmlString;
    };
    that.hasClass = function (name) {
        //IE8+
        if ($element.classList) {
            return $element.classList.contains(name);
        } else {
            return new RegExp('(^| )' + name + '( |$)', 'gi').test($element.name);
        }
    };

    that.is = function ($targetElement) {
        /*var matches = function(el, selector) {
            return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
        };
          matches(el, '.my-class');*/
        return $element === $targetElement;
    };

    that.offset = function () {
        //IE8+
        var rect = $element.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    };

    that.width = function () {
        //IE8+
        return $element.clientWidth;
    };

    that.height = function () {
        //IE8+
        return $element.clientHeight;
    };

    that.attr = function (attr) {
        return $element.getAttribute(attr);
    };

    that.replace = function (html) {
        $element.replaceWith(html);
    };

    that.remove = function () {
        if ($element.length > 1) {
            $element.parentElement.removeChild($element);
        } else {
            $element.remove();
        }
    };

    that.removeChild = function (element) {
        if (element) {
            $element.removeChild(element);
        } else {
            while ($element.hasChildNodes()) {
                $element.removeChild($element.firstChild);
            }
        }
    };

    that.get = function () {
        return $element;
    };

    that.closest = function (selectorString) {

        $element.closest = function (s) {

            var el = $element;

            do {

                if (el.matches(s)) {
                    return el;
                }

                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
        };

        var closestElement = $element.closest(selectorString);

        if (closestElement) {
            return La$(closestElement);
        } else {
            return null;
        }
    };

    return that;
}; /**
    * Created by hoho on 2018. 7. 23..
    */
exports["default"] = La$;

/***/ }),

/***/ "./src/js/utils/strings.js":
/*!*********************************!*\
  !*** ./src/js/utils/strings.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractExtension = undefined;
exports.trim = trim;
exports.naturalHms = naturalHms;
exports.hmsToSecond = hmsToSecond;

var _underscore = __webpack_require__(/*! ./underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function trim(string) {
    return string ? string.replace(/^\s+|\s+$/g, '') : "";
}

/**
 * extractExtension
 *
 * @param      {string} path for url
 * @return     {string}  Extension
 */
var extractExtension = exports.extractExtension = function extractExtension(path) {
    if (!path) {
        return "";
    }
    function getAzureFileFormat(path) {
        var extension = "";
        if (/[(,]format=mpd-/i.test(path)) {
            extension = 'mpd';
        } else if (/[(,]format=m3u8-/i.test(path)) {
            extension = 'm3u8';
        }
        return extension;
    }

    var azuredFormat = getAzureFileFormat(path);
    if (azuredFormat) {
        return azuredFormat;
    }
    path = path.split('?')[0].split('#')[0];
    if (path.lastIndexOf('.') > -1) {
        return path.substr(path.lastIndexOf('.') + 1, path.length).toLowerCase();
    } else {
        return "";
    }
};

/**
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
function naturalHms(second) {
    var secNum = parseInt(second, 10);
    if (!second) {
        return "00:00";
    }
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - hours * 3600) / 60);
    var seconds = secNum - hours * 3600 - minutes * 60;

    //if (hours > 0) {minutes = "0"+minutes;}
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds;
    } else {
        return minutes + ':' + seconds;
    }
}

function hmsToSecond(str, frameRate) {
    if (!str) {
        return 0;
    }
    if (_underscore2['default'].isNumber(str) && !_underscore2['default'].isNaN(str)) {
        return str;
    }
    str = str.replace(',', '.');
    var arr = str.split(':');
    var arrLength = arr.length;
    var sec = 0;
    if (str.slice(-1) === 's') {
        sec = parseFloat(str);
    } else if (str.slice(-1) === 'm') {
        sec = parseFloat(str) * 60;
    } else if (str.slice(-1) === 'h') {
        sec = parseFloat(str) * 3600;
    } else if (arrLength > 1) {
        var secIndex = arrLength - 1;
        if (arrLength === 4) {
            if (frameRate) {
                sec = parseFloat(arr[secIndex]) / frameRate;
            }
            secIndex -= 1;
        }
        sec += parseFloat(arr[secIndex]);
        sec += parseFloat(arr[secIndex - 1]) * 60;
        if (arrLength >= 3) {
            sec += parseFloat(arr[secIndex - 2]) * 3600;
        }
    } else {
        sec = parseFloat(str);
    }
    if (_underscore2['default'].isNaN(sec)) {
        return 0;
    }
    return sec;
}

/***/ }),

/***/ "./src/js/utils/underscore.js":
/*!************************************!*\
  !*** ./src/js/utils/underscore.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function () {
  var n = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self.self === self && self || "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) && global.global === global && global || this || {},
      r = n._,
      e = Array.prototype,
      o = Object.prototype,
      s = "undefined" != typeof Symbol ? Symbol.prototype : null,
      u = e.push,
      c = e.slice,
      p = o.toString,
      i = o.hasOwnProperty,
      t = Array.isArray,
      a = Object.keys,
      l = Object.create,
      f = function f() {},
      h = function h(n) {
    return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n);
  }; false || exports.nodeType ? n._ = h : ( true && !module.nodeType && module.exports && (exports = module.exports = h), exports._ = h), h.VERSION = "1.9.1";var v,
      y = function y(u, i, n) {
    if (void 0 === i) return u;switch (null == n ? 3 : n) {case 1:
        return function (n) {
          return u.call(i, n);
        };case 3:
        return function (n, r, t) {
          return u.call(i, n, r, t);
        };case 4:
        return function (n, r, t, e) {
          return u.call(i, n, r, t, e);
        };}return function () {
      return u.apply(i, arguments);
    };
  },
      d = function d(n, r, t) {
    return h.iteratee !== v ? h.iteratee(n, r) : null == n ? h.identity : h.isFunction(n) ? y(n, r, t) : h.isObject(n) && !h.isArray(n) ? h.matcher(n) : h.property(n);
  };h.iteratee = v = function v(n, r) {
    return d(n, r, 1 / 0);
  };var g = function g(u, i) {
    return i = null == i ? u.length - 1 : +i, function () {
      for (var n = Math.max(arguments.length - i, 0), r = Array(n), t = 0; t < n; t++) {
        r[t] = arguments[t + i];
      }switch (i) {case 0:
          return u.call(this, r);case 1:
          return u.call(this, arguments[0], r);case 2:
          return u.call(this, arguments[0], arguments[1], r);}var e = Array(i + 1);for (t = 0; t < i; t++) {
        e[t] = arguments[t];
      }return e[i] = r, u.apply(this, e);
    };
  },
      m = function m(n) {
    if (!h.isObject(n)) return {};if (l) return l(n);f.prototype = n;var r = new f();return f.prototype = null, r;
  },
      b = function b(r) {
    return function (n) {
      return null == n ? void 0 : n[r];
    };
  },
      j = function j(n, r) {
    return null != n && i.call(n, r);
  },
      x = function x(n, r) {
    for (var t = r.length, e = 0; e < t; e++) {
      if (null == n) return;n = n[r[e]];
    }return t ? n : void 0;
  },
      _ = Math.pow(2, 53) - 1,
      A = b("length"),
      w = function w(n) {
    var r = A(n);return "number" == typeof r && 0 <= r && r <= _;
  };h.each = h.forEach = function (n, r, t) {
    var e, u;if (r = y(r, t), w(n)) for (e = 0, u = n.length; e < u; e++) {
      r(n[e], e, n);
    } else {
      var i = h.keys(n);for (e = 0, u = i.length; e < u; e++) {
        r(n[i[e]], i[e], n);
      }
    }return n;
  }, h.map = h.collect = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
      var a = e ? e[o] : o;i[o] = r(n[a], a, n);
    }return i;
  };var O = function O(c) {
    return function (n, r, t, e) {
      var u = 3 <= arguments.length;return function (n, r, t, e) {
        var u = !w(n) && h.keys(n),
            i = (u || n).length,
            o = 0 < c ? 0 : i - 1;for (e || (t = n[u ? u[o] : o], o += c); 0 <= o && o < i; o += c) {
          var a = u ? u[o] : o;t = r(t, n[a], a, n);
        }return t;
      }(n, y(r, e, 4), t, u);
    };
  };h.reduce = h.foldl = h.inject = O(1), h.reduceRight = h.foldr = O(-1), h.find = h.detect = function (n, r, t) {
    var e = (w(n) ? h.findIndex : h.findKey)(n, r, t);if (void 0 !== e && -1 !== e) return n[e];
  }, h.filter = h.select = function (n, e, r) {
    var u = [];return e = d(e, r), h.each(n, function (n, r, t) {
      e(n, r, t) && u.push(n);
    }), u;
  }, h.reject = function (n, r, t) {
    return h.filter(n, h.negate(d(r)), t);
  }, h.every = h.all = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (!r(n[o], o, n)) return !1;
    }return !0;
  }, h.some = h.any = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (r(n[o], o, n)) return !0;
    }return !1;
  }, h.contains = h.includes = h.include = function (n, r, t, e) {
    return w(n) || (n = h.values(n)), ("number" != typeof t || e) && (t = 0), 0 <= h.indexOf(n, r, t);
  }, h.invoke = g(function (n, t, e) {
    var u, i;return h.isFunction(t) ? i = t : h.isArray(t) && (u = t.slice(0, -1), t = t[t.length - 1]), h.map(n, function (n) {
      var r = i;if (!r) {
        if (u && u.length && (n = x(n, u)), null == n) return;r = n[t];
      }return null == r ? r : r.apply(n, e);
    });
  }), h.pluck = function (n, r) {
    return h.map(n, h.property(r));
  }, h.where = function (n, r) {
    return h.filter(n, h.matcher(r));
  }, h.findWhere = function (n, r) {
    return h.find(n, h.matcher(r));
  }, h.max = function (n, e, r) {
    var t,
        u,
        i = -1 / 0,
        o = -1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && i < t && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      u = e(n, r, t), (o < u || u === -1 / 0 && i === -1 / 0) && (i = n, o = u);
    });return i;
  }, h.min = function (n, e, r) {
    var t,
        u,
        i = 1 / 0,
        o = 1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && t < i && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      ((u = e(n, r, t)) < o || u === 1 / 0 && i === 1 / 0) && (i = n, o = u);
    });return i;
  }, h.shuffle = function (n) {
    return h.sample(n, 1 / 0);
  }, h.sample = function (n, r, t) {
    if (null == r || t) return w(n) || (n = h.values(n)), n[h.random(n.length - 1)];var e = w(n) ? h.clone(n) : h.values(n),
        u = A(e);r = Math.max(Math.min(r, u), 0);for (var i = u - 1, o = 0; o < r; o++) {
      var a = h.random(o, i),
          c = e[o];e[o] = e[a], e[a] = c;
    }return e.slice(0, r);
  }, h.sortBy = function (n, e, r) {
    var u = 0;return e = d(e, r), h.pluck(h.map(n, function (n, r, t) {
      return { value: n, index: u++, criteria: e(n, r, t) };
    }).sort(function (n, r) {
      var t = n.criteria,
          e = r.criteria;if (t !== e) {
        if (e < t || void 0 === t) return 1;if (t < e || void 0 === e) return -1;
      }return n.index - r.index;
    }), "value");
  };var k = function k(o, r) {
    return function (e, u, n) {
      var i = r ? [[], []] : {};return u = d(u, n), h.each(e, function (n, r) {
        var t = u(n, r, e);o(i, n, t);
      }), i;
    };
  };h.groupBy = k(function (n, r, t) {
    j(n, t) ? n[t].push(r) : n[t] = [r];
  }), h.indexBy = k(function (n, r, t) {
    n[t] = r;
  }), h.countBy = k(function (n, r, t) {
    j(n, t) ? n[t]++ : n[t] = 1;
  });var S = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;h.toArray = function (n) {
    return n ? h.isArray(n) ? c.call(n) : h.isString(n) ? n.match(S) : w(n) ? h.map(n, h.identity) : h.values(n) : [];
  }, h.size = function (n) {
    return null == n ? 0 : w(n) ? n.length : h.keys(n).length;
  }, h.partition = k(function (n, r, t) {
    n[t ? 0 : 1].push(r);
  }, !0), h.first = h.head = h.take = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[0] : h.initial(n, n.length - r);
  }, h.initial = function (n, r, t) {
    return c.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)));
  }, h.last = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[n.length - 1] : h.rest(n, Math.max(0, n.length - r));
  }, h.rest = h.tail = h.drop = function (n, r, t) {
    return c.call(n, null == r || t ? 1 : r);
  }, h.compact = function (n) {
    return h.filter(n, Boolean);
  };var M = function M(n, r, t, e) {
    for (var u = (e = e || []).length, i = 0, o = A(n); i < o; i++) {
      var a = n[i];if (w(a) && (h.isArray(a) || h.isArguments(a))) {
        if (r) for (var c = 0, l = a.length; c < l;) {
          e[u++] = a[c++];
        } else M(a, r, t, e), u = e.length;
      } else t || (e[u++] = a);
    }return e;
  };h.flatten = function (n, r) {
    return M(n, r, !1);
  }, h.without = g(function (n, r) {
    return h.difference(n, r);
  }), h.uniq = h.unique = function (n, r, t, e) {
    h.isBoolean(r) || (e = t, t = r, r = !1), null != t && (t = d(t, e));for (var u = [], i = [], o = 0, a = A(n); o < a; o++) {
      var c = n[o],
          l = t ? t(c, o, n) : c;r && !t ? (o && i === l || u.push(c), i = l) : t ? h.contains(i, l) || (i.push(l), u.push(c)) : h.contains(u, c) || u.push(c);
    }return u;
  }, h.union = g(function (n) {
    return h.uniq(M(n, !0, !0));
  }), h.intersection = function (n) {
    for (var r = [], t = arguments.length, e = 0, u = A(n); e < u; e++) {
      var i = n[e];if (!h.contains(r, i)) {
        var o;for (o = 1; o < t && h.contains(arguments[o], i); o++) {}o === t && r.push(i);
      }
    }return r;
  }, h.difference = g(function (n, r) {
    return r = M(r, !0, !0), h.filter(n, function (n) {
      return !h.contains(r, n);
    });
  }), h.unzip = function (n) {
    for (var r = n && h.max(n, A).length || 0, t = Array(r), e = 0; e < r; e++) {
      t[e] = h.pluck(n, e);
    }return t;
  }, h.zip = g(h.unzip), h.object = function (n, r) {
    for (var t = {}, e = 0, u = A(n); e < u; e++) {
      r ? t[n[e]] = r[e] : t[n[e][0]] = n[e][1];
    }return t;
  };var F = function F(i) {
    return function (n, r, t) {
      r = d(r, t);for (var e = A(n), u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i) {
        if (r(n[u], u, n)) return u;
      }return -1;
    };
  };h.findIndex = F(1), h.findLastIndex = F(-1), h.sortedIndex = function (n, r, t, e) {
    for (var u = (t = d(t, e, 1))(r), i = 0, o = A(n); i < o;) {
      var a = Math.floor((i + o) / 2);t(n[a]) < u ? i = a + 1 : o = a;
    }return i;
  };var E = function E(i, o, a) {
    return function (n, r, t) {
      var e = 0,
          u = A(n);if ("number" == typeof t) 0 < i ? e = 0 <= t ? t : Math.max(t + u, e) : u = 0 <= t ? Math.min(t + 1, u) : t + u + 1;else if (a && t && u) return n[t = a(n, r)] === r ? t : -1;if (r != r) return 0 <= (t = o(c.call(n, e, u), h.isNaN)) ? t + e : -1;for (t = 0 < i ? e : u - 1; 0 <= t && t < u; t += i) {
        if (n[t] === r) return t;
      }return -1;
    };
  };h.indexOf = E(1, h.findIndex, h.sortedIndex), h.lastIndexOf = E(-1, h.findLastIndex), h.range = function (n, r, t) {
    null == r && (r = n || 0, n = 0), t || (t = r < n ? -1 : 1);for (var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0; i < e; i++, n += t) {
      u[i] = n;
    }return u;
  }, h.chunk = function (n, r) {
    if (null == r || r < 1) return [];for (var t = [], e = 0, u = n.length; e < u;) {
      t.push(c.call(n, e, e += r));
    }return t;
  };var N = function N(n, r, t, e, u) {
    if (!(e instanceof r)) return n.apply(t, u);var i = m(n.prototype),
        o = n.apply(i, u);return h.isObject(o) ? o : i;
  };h.bind = g(function (r, t, e) {
    if (!h.isFunction(r)) throw new TypeError("Bind must be called on a function");var u = g(function (n) {
      return N(r, u, t, this, e.concat(n));
    });return u;
  }), h.partial = g(function (u, i) {
    var o = h.partial.placeholder,
        a = function a() {
      for (var n = 0, r = i.length, t = Array(r), e = 0; e < r; e++) {
        t[e] = i[e] === o ? arguments[n++] : i[e];
      }for (; n < arguments.length;) {
        t.push(arguments[n++]);
      }return N(u, a, this, this, t);
    };return a;
  }), (h.partial.placeholder = h).bindAll = g(function (n, r) {
    var t = (r = M(r, !1, !1)).length;if (t < 1) throw new Error("bindAll must be passed function names");for (; t--;) {
      var e = r[t];n[e] = h.bind(n[e], n);
    }
  }), h.memoize = function (e, u) {
    var i = function i(n) {
      var r = i.cache,
          t = "" + (u ? u.apply(this, arguments) : n);return j(r, t) || (r[t] = e.apply(this, arguments)), r[t];
    };return i.cache = {}, i;
  }, h.delay = g(function (n, r, t) {
    return setTimeout(function () {
      return n.apply(null, t);
    }, r);
  }), h.defer = h.partial(h.delay, h, 1), h.throttle = function (t, e, u) {
    var i,
        o,
        a,
        c,
        l = 0;u || (u = {});var f = function f() {
      l = !1 === u.leading ? 0 : h.now(), i = null, c = t.apply(o, a), i || (o = a = null);
    },
        n = function n() {
      var n = h.now();l || !1 !== u.leading || (l = n);var r = e - (n - l);return o = this, a = arguments, r <= 0 || e < r ? (i && (clearTimeout(i), i = null), l = n, c = t.apply(o, a), i || (o = a = null)) : i || !1 === u.trailing || (i = setTimeout(f, r)), c;
    };return n.cancel = function () {
      clearTimeout(i), l = 0, i = o = a = null;
    }, n;
  }, h.debounce = function (t, e, u) {
    var i,
        o,
        a = function a(n, r) {
      i = null, r && (o = t.apply(n, r));
    },
        n = g(function (n) {
      if (i && clearTimeout(i), u) {
        var r = !i;i = setTimeout(a, e), r && (o = t.apply(this, n));
      } else i = h.delay(a, e, this, n);return o;
    });return n.cancel = function () {
      clearTimeout(i), i = null;
    }, n;
  }, h.wrap = function (n, r) {
    return h.partial(r, n);
  }, h.negate = function (n) {
    return function () {
      return !n.apply(this, arguments);
    };
  }, h.compose = function () {
    var t = arguments,
        e = t.length - 1;return function () {
      for (var n = e, r = t[e].apply(this, arguments); n--;) {
        r = t[n].call(this, r);
      }return r;
    };
  }, h.after = function (n, r) {
    return function () {
      if (--n < 1) return r.apply(this, arguments);
    };
  }, h.before = function (n, r) {
    var t;return function () {
      return 0 < --n && (t = r.apply(this, arguments)), n <= 1 && (r = null), t;
    };
  }, h.once = h.partial(h.before, 2), h.restArguments = g;var I = !{ toString: null }.propertyIsEnumerable("toString"),
      T = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
      B = function B(n, r) {
    var t = T.length,
        e = n.constructor,
        u = h.isFunction(e) && e.prototype || o,
        i = "constructor";for (j(n, i) && !h.contains(r, i) && r.push(i); t--;) {
      (i = T[t]) in n && n[i] !== u[i] && !h.contains(r, i) && r.push(i);
    }
  };h.keys = function (n) {
    if (!h.isObject(n)) return [];if (a) return a(n);var r = [];for (var t in n) {
      j(n, t) && r.push(t);
    }return I && B(n, r), r;
  }, h.allKeys = function (n) {
    if (!h.isObject(n)) return [];var r = [];for (var t in n) {
      r.push(t);
    }return I && B(n, r), r;
  }, h.values = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = n[r[u]];
    }return e;
  }, h.mapObject = function (n, r, t) {
    r = d(r, t);for (var e = h.keys(n), u = e.length, i = {}, o = 0; o < u; o++) {
      var a = e[o];i[a] = r(n[a], a, n);
    }return i;
  }, h.pairs = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = [r[u], n[r[u]]];
    }return e;
  }, h.invert = function (n) {
    for (var r = {}, t = h.keys(n), e = 0, u = t.length; e < u; e++) {
      r[n[t[e]]] = t[e];
    }return r;
  }, h.functions = h.methods = function (n) {
    var r = [];for (var t in n) {
      h.isFunction(n[t]) && r.push(t);
    }return r.sort();
  };var R = function R(c, l) {
    return function (n) {
      var r = arguments.length;if (l && (n = Object(n)), r < 2 || null == n) return n;for (var t = 1; t < r; t++) {
        for (var e = arguments[t], u = c(e), i = u.length, o = 0; o < i; o++) {
          var a = u[o];l && void 0 !== n[a] || (n[a] = e[a]);
        }
      }return n;
    };
  };h.extend = R(h.allKeys), h.extendOwn = h.assign = R(h.keys), h.findKey = function (n, r, t) {
    r = d(r, t);for (var e, u = h.keys(n), i = 0, o = u.length; i < o; i++) {
      if (r(n[e = u[i]], e, n)) return e;
    }
  };var q,
      K,
      z = function z(n, r, t) {
    return r in t;
  };h.pick = g(function (n, r) {
    var t = {},
        e = r[0];if (null == n) return t;h.isFunction(e) ? (1 < r.length && (e = y(e, r[1])), r = h.allKeys(n)) : (e = z, r = M(r, !1, !1), n = Object(n));for (var u = 0, i = r.length; u < i; u++) {
      var o = r[u],
          a = n[o];e(a, o, n) && (t[o] = a);
    }return t;
  }), h.omit = g(function (n, t) {
    var r,
        e = t[0];return h.isFunction(e) ? (e = h.negate(e), 1 < t.length && (r = t[1])) : (t = h.map(M(t, !1, !1), String), e = function e(n, r) {
      return !h.contains(t, r);
    }), h.pick(n, e, r);
  }), h.defaults = R(h.allKeys, !0), h.create = function (n, r) {
    var t = m(n);return r && h.extendOwn(t, r), t;
  }, h.clone = function (n) {
    return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n;
  }, h.tap = function (n, r) {
    return r(n), n;
  }, h.isMatch = function (n, r) {
    var t = h.keys(r),
        e = t.length;if (null == n) return !e;for (var u = Object(n), i = 0; i < e; i++) {
      var o = t[i];if (r[o] !== u[o] || !(o in u)) return !1;
    }return !0;
  }, q = function q(n, r, t, e) {
    if (n === r) return 0 !== n || 1 / n == 1 / r;if (null == n || null == r) return !1;if (n != n) return r != r;var u = typeof n === "undefined" ? "undefined" : _typeof(n);return ("function" === u || "object" === u || "object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) && K(n, r, t, e);
  }, K = function K(n, r, t, e) {
    n instanceof h && (n = n._wrapped), r instanceof h && (r = r._wrapped);var u = p.call(n);if (u !== p.call(r)) return !1;switch (u) {case "[object RegExp]":case "[object String]":
        return "" + n == "" + r;case "[object Number]":
        return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;case "[object Date]":case "[object Boolean]":
        return +n == +r;case "[object Symbol]":
        return s.valueOf.call(n) === s.valueOf.call(r);}var i = "[object Array]" === u;if (!i) {
      if ("object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || "object" != (typeof r === "undefined" ? "undefined" : _typeof(r))) return !1;var o = n.constructor,
          a = r.constructor;if (o !== a && !(h.isFunction(o) && o instanceof o && h.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in r) return !1;
    }e = e || [];for (var c = (t = t || []).length; c--;) {
      if (t[c] === n) return e[c] === r;
    }if (t.push(n), e.push(r), i) {
      if ((c = n.length) !== r.length) return !1;for (; c--;) {
        if (!q(n[c], r[c], t, e)) return !1;
      }
    } else {
      var l,
          f = h.keys(n);if (c = f.length, h.keys(r).length !== c) return !1;for (; c--;) {
        if (l = f[c], !j(r, l) || !q(n[l], r[l], t, e)) return !1;
      }
    }return t.pop(), e.pop(), !0;
  }, h.isEqual = function (n, r) {
    return q(n, r);
  }, h.isEmpty = function (n) {
    return null == n || (w(n) && (h.isArray(n) || h.isString(n) || h.isArguments(n)) ? 0 === n.length : 0 === h.keys(n).length);
  }, h.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, h.isArray = t || function (n) {
    return "[object Array]" === p.call(n);
  }, h.isObject = function (n) {
    var r = typeof n === "undefined" ? "undefined" : _typeof(n);return "function" === r || "object" === r && !!n;
  }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (r) {
    h["is" + r] = function (n) {
      return p.call(n) === "[object " + r + "]";
    };
  }), h.isArguments(arguments) || (h.isArguments = function (n) {
    return j(n, "callee");
  });var D = n.document && n.document.childNodes; true && "object" != (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) && "function" != typeof D && (h.isFunction = function (n) {
    return "function" == typeof n || !1;
  }), h.isFinite = function (n) {
    return !h.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n));
  }, h.isNaN = function (n) {
    return h.isNumber(n) && isNaN(n);
  }, h.isBoolean = function (n) {
    return !0 === n || !1 === n || "[object Boolean]" === p.call(n);
  }, h.isNull = function (n) {
    return null === n;
  }, h.isUndefined = function (n) {
    return void 0 === n;
  }, h.has = function (n, r) {
    if (!h.isArray(r)) return j(n, r);for (var t = r.length, e = 0; e < t; e++) {
      var u = r[e];if (null == n || !i.call(n, u)) return !1;n = n[u];
    }return !!t;
  }, h.noConflict = function () {
    return n._ = r, this;
  }, h.identity = function (n) {
    return n;
  }, h.constant = function (n) {
    return function () {
      return n;
    };
  }, h.noop = function () {}, h.property = function (r) {
    return h.isArray(r) ? function (n) {
      return x(n, r);
    } : b(r);
  }, h.propertyOf = function (r) {
    return null == r ? function () {} : function (n) {
      return h.isArray(n) ? x(r, n) : r[n];
    };
  }, h.matcher = h.matches = function (r) {
    return r = h.extendOwn({}, r), function (n) {
      return h.isMatch(n, r);
    };
  }, h.times = function (n, r, t) {
    var e = Array(Math.max(0, n));r = y(r, t, 1);for (var u = 0; u < n; u++) {
      e[u] = r(u);
    }return e;
  }, h.random = function (n, r) {
    return null == r && (r = n, n = 0), n + Math.floor(Math.random() * (r - n + 1));
  }, h.now = Date.now || function () {
    return new Date().getTime();
  };var L = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
      P = h.invert(L),
      W = function W(r) {
    var t = function t(n) {
      return r[n];
    },
        n = "(?:" + h.keys(r).join("|") + ")",
        e = RegExp(n),
        u = RegExp(n, "g");return function (n) {
      return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
    };
  };h.escape = W(L), h.unescape = W(P), h.result = function (n, r, t) {
    h.isArray(r) || (r = [r]);var e = r.length;if (!e) return h.isFunction(t) ? t.call(n) : t;for (var u = 0; u < e; u++) {
      var i = null == n ? void 0 : n[r[u]];void 0 === i && (i = t, u = e), n = h.isFunction(i) ? i.call(n) : i;
    }return n;
  };var C = 0;h.uniqueId = function (n) {
    var r = ++C + "";return n ? n + r : r;
  }, h.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var J = /(.)^/,
      U = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
      V = /\\|'|\r|\n|\u2028|\u2029/g,
      $ = function $(n) {
    return "\\" + U[n];
  };h.template = function (i, n, r) {
    !n && r && (n = r), n = h.defaults({}, n, h.templateSettings);var t,
        e = RegExp([(n.escape || J).source, (n.interpolate || J).source, (n.evaluate || J).source].join("|") + "|$", "g"),
        o = 0,
        a = "__p+='";i.replace(e, function (n, r, t, e, u) {
      return a += i.slice(o, u).replace(V, $), o = u + n.length, r ? a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : t ? a += "'+\n((__t=(" + t + "))==null?'':__t)+\n'" : e && (a += "';\n" + e + "\n__p+='"), n;
    }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";try {
      t = new Function(n.variable || "obj", "_", a);
    } catch (n) {
      throw n.source = a, n;
    }var u = function u(n) {
      return t.call(this, n, h);
    },
        c = n.variable || "obj";return u.source = "function(" + c + "){\n" + a + "}", u;
  }, h.chain = function (n) {
    var r = h(n);return r._chain = !0, r;
  };var G = function G(n, r) {
    return n._chain ? h(r).chain() : r;
  };h.mixin = function (t) {
    return h.each(h.functions(t), function (n) {
      var r = h[n] = t[n];h.prototype[n] = function () {
        var n = [this._wrapped];return u.apply(n, arguments), G(this, r.apply(h, n));
      };
    }), h;
  }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (r) {
    var t = e[r];h.prototype[r] = function () {
      var n = this._wrapped;return t.apply(n, arguments), "shift" !== r && "splice" !== r || 0 !== n.length || delete n[0], G(this, n);
    };
  }), h.each(["concat", "join", "slice"], function (n) {
    var r = e[n];h.prototype[n] = function () {
      return G(this, r.apply(this._wrapped, arguments));
    };
  }), h.prototype.value = function () {
    return this._wrapped;
  }, h.prototype.valueOf = h.prototype.toJSON = h.prototype.value, h.prototype.toString = function () {
    return String(this._wrapped);
  },  true && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return h;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/utils/validator.js":
/*!***********************************!*\
  !*** ./src/js/utils/validator.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isWebRTC = undefined;

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var isWebRTC = exports.isWebRTC = function isWebRTC(file, type) {
    if (file) {
        return file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc';
    }
    return false;
};

/***/ }),

/***/ "./src/js/utils/webpack.js":
/*!*********************************!*\
  !*** ./src/js/utils/webpack.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * utils for webpack
 */

var getScriptPath = exports.getScriptPath = function getScriptPath(scriptName) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        if (src) {
            var index = src.lastIndexOf('/' + scriptName);
            if (index >= 0) {
                return src.substr(0, index + 1);
            }
        }
    }
    return '';
};

/***/ }),

/***/ "./src/js/version.js":
/*!***************************!*\
  !*** ./src/js/version.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 6. 29..
 */
var version = exports.version = '0.9.0-2021070601-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQ29uZmlndXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL1N1cHBvcnRDaGVja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsIndlYnJ0Y1JldHJ5IiwiV0VCUlRDX1JFVFJZX0NPVU5UIiwid2VicnRjUmV0cnlDb3VudCIsIndlYnJ0Y1JldHJ5SW50ZXJ2YWwiLCJ3ZWJydGNSZXRyeVRpbWVyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9VTlNVUFBPUlRfRVJST1IiLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwib24iLCJuYW1lIiwiZGF0YSIsIkVSUk9SIiwib3MiLCJicm93c2VyIiwiY29kZSIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFNvdXJjZSIsImdldEN1cnJlbnRTb3VyY2UiLCJnZXRDb25maWciLCJhdXRvRmFsbGJhY2siLCJnZXRTb3VyY2VzIiwicGF1c2UiLCJnZXRDdXJyZW50UGxheWxpc3RJbmRleCIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJ0ZW1wRXJyb3IiLCJJTklUX1VOS05XT05fRVJST1IiLCJpbml0Iiwib3B0aW9ucyIsIm1lZGlhQ29udGFpbmVyIiwid2VicnRjQ29uZmlnIiwibG9hZGluZ1JldHJ5Q291bnQiLCJ1bmRlZmluZWQiLCJnZXRTeXN0ZW1UZXh0IiwiYXBpIiwiaW5pdFBsYXlsaXN0IiwiZ2V0UHJvdmlkZXJOYW1lIiwiZ2V0TmFtZSIsImdldE1zZUluc3RhbmNlIiwiZ2V0TXNlIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2V0UGxheWxpc3QiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJnZXRRdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyTGlzdCIsImdldFZlcnNpb24iLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiYXV0b1N0YXJ0IiwidGltZWNvZGUiLCJzb3VyY2VJbmRleCIsImhpZGVQbGF5bGlzdEljb24iLCJhZENsaWVudCIsImN1cnJlbnRQcm90b2NvbE9ubHkiLCJzeXN0ZW1UZXh0IiwibGFuZyIsImV4cGFuZEZ1bGxTY3JlZW5VSSIsImZ1bGxzY3JlZW5PcHRpb24iLCJzaG93QmlnUGxheUJ1dHRvbiIsInNlcmlhbGl6ZSIsInZhbCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImNvbmZpZyIsInVzZXJDdXN0dW1TeXN0ZW1UZXh0IiwiXyIsImlzQXJyYXkiLCJjdXJyZW50U3lzdGVtVGV4dCIsImZpbmRXaGVyZSIsIlNZU1RFTV9URVhUIiwicHVzaCIsImZpbHRlciIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsImluZGV4T2YiLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsInNwZWMiLCJnZXRBZENsaWVudCIsInNldENvbmZpZyIsInZhbHVlIiwiZ2V0Q29udGFpbmVyIiwiZ2V0UXVhbGl0eUxhYmVsIiwicXVhbGl0eUxhYmVsIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJpc0N1cnJlbnRQcm90b2NvbE9ubHkiLCJDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEIiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImNvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsImdldExhbmd1YWdlIiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiUExBWUxJU1RfQ0hBTkdFRCIsIkNPTlRFTlRfU0VFS0VEIiwiTkVUV09SS19VTlNUQUJMRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9DTElDS0VEIiwiUExBWUVSX1JFU0laRUQiLCJQTEFZRVJfTE9BRElORyIsIlBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QiLCJQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEIiwiUExBWUVSX1dBUk5JTkciLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJDT05URU5UX0RVUkFUSU9OX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJBRF9DTElFTlRfR09PR0xFSU1BIiwiQURfQ0xJRU5UX1ZBU1QiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QiLCJXQVJOX01TR19NVVRFRFBMQVkiLCJVSV9JQ09OUyIsInZvbHVtZV9tdXRlIiwib3Bfd2FybmluZyIsIk1hbmFnZXIiLCJicm93c2VySW5mbyIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIiRjb250YWluZXIiLCJ2aWRlb0VsZW1lbnQiLCJjcmVhdGVIdG1sVmlkZW8iLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJjdXJyZW50UGxheWxpc3RJdGVtIiwiY3VycmVudEluZGV4Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJ0ZXN0IiwicmVwbGFjZSIsImxvd0xhdGVuY3kiLCJwcmV0dGllZFBsYXlsaXN0IiwidHJhY2tzIiwidGl0bGUiLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwidG9TdHJpbmciLCJsYWJlbCIsImV4dHJhY3RPbmx5T25lUHJvdG9jb2wiLCJoaWdoUHJpb3JpdHlUeXBlIiwidHJhY2siLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJyZXF1aXJlIiwiZXJyIiwiRXJyb3IiLCJ3ZWJydGMiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInJlamVjdCIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiaXNTYW1lUHJvdmlkZXIiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsImVsZW1lbnRPck1zZSIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwic2V0U3RhdGUiLCJwaWNrQ3VycmVudFNvdXJjZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwid2luZG93IiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJkZWJ1ZyIsImlzRGVidWdNb2RlIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2IiwibmF2aWdhdG9yIiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2UiLCJsYW5ndWFnZXMiLCJhbmFsVXNlckFnZW50IiwidW5rbm93biIsInNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsImhlaWdodCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwibkFndCIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImlzV2VidmlldyIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9VcHBlckNhc2UiLCJtb2JpbGUiLCJjb29raWVFbmFibGVkIiwiY29va2llIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJ1YSIsImNvb2tpZXMiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInNwbGl0IiwiYWZ0ZXIiLCJodG1sU3RyaW5nIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXBwZW5kQ2hpbGQiLCJiZWZvcmUiLCJjaGlsZHJlbiIsImNvbnRhaW5zIiwiZWxDaGlsZCIsImlubmVySFRNTCIsImZpbmQiLCJjc3MiLCJlbGVtZW50IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJqb2luIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJodG1sIiwiaGFzQ2xhc3MiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvZHkiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsInJlcGxhY2VXaXRoIiwicGFyZW50RWxlbWVudCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiZWwiLCJtYXRjaGVzIiwicGFyZW50Tm9kZSIsImNsb3Nlc3RFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJobXNUb1NlY29uZCIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic3Vic3RyIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyIiwiZnJhbWVSYXRlIiwiYXJyIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJuIiwic2VsZiIsImdsb2JhbCIsImUiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJoIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsInciLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwiVHlwZUVycm9yIiwiY29uY2F0IiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJjb25zdHJ1Y3RvciIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJyZXN1bHQiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImRlZmluZSIsImlzV2ViUlRDIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJfX1ZFUlNJT05fXyJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0EseUNBQXlDLGdRQUFnUTtRQUN6Uzs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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Ozs7Ozs7Ozs7OztBQ0ZQOzs7O0FBSU8sSUFBTXFkLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVM2QsU0FBUzRkLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJL3JCLElBQUksQ0FBYixFQUFnQkEsSUFBSThyQixRQUFRN3JCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNZ3NCLE1BQU1GLFFBQVE5ckIsQ0FBUixFQUFXZ3NCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1sdEIsUUFBUWt0QixJQUFJclMsV0FBSixDQUFnQixNQUFNa1MsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJL3NCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPa3RCLElBQUk3TSxNQUFKLENBQVcsQ0FBWCxFQUFjcmdCLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTWYsNEJBQVVrdUIsNkJBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIFBMQVlFUl9QTEFZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge3BpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKHRoYXQpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCB1c2VyQWdlbnRPYmplY3QpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG5cclxuICAgIGxldCB3ZWJydGNSZXRyeSA9IGZhbHNlO1xyXG4gICAgbGV0IFdFQlJUQ19SRVRSWV9DT1VOVCA9IDM7XHJcbiAgICBsZXQgd2VicnRjUmV0cnlDb3VudCA9IFdFQlJUQ19SRVRSWV9DT1VOVDtcclxuICAgIGxldCB3ZWJydGNSZXRyeUludGVydmFsID0gMTAwMDtcclxuICAgIGxldCB3ZWJydGNSZXRyeVRpbWVyID0gbnVsbDtcclxuXHJcblxyXG4gICAgY29uc3QgcnVuTmV4dFBsYXlsaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJ1bk5leHRQbGF5bGlzdFwiKTtcclxuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0SW5kZXggPSBpbmRleDsgLy8gfHwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxO1xyXG4gICAgICAgIGxldCBwbGF5bGlzdCA9IHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xyXG4gICAgICAgIGxldCBoYXNOZXh0UGxheWxpc3QgPSBwbGF5bGlzdFtuZXh0UGxheWxpc3RJbmRleF0/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KDApO1xyXG5cclxuICAgICAgICAvL3NldCBHb2xiYWwgVm9sdW1lIGluZm9cclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0Vm9sdW1lKGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgIC8vQW55d2F5IG5leHRwbGF5bGlzdCBydW5zIGF1dG9TdGFydCEuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEFMTF9QTEFZTElTVF9FTkRFRCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlMaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKFByb3ZpZGVycy5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tDdXJyZW50U291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgcHJvdmlkZXJcIiwgcHJvdmlkZXJOYW1lKTtcclxuICAgICAgICAgICAgLy9Jbml0IFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXHJcbiAgICAgICAgICAgICAgICBtZWRpYU1hbmFnZXIuY3JlYXRlTWVkaWEocHJvdmlkZXJOYW1lLCBwbGF5ZXJDb25maWcpLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbmFtZSA9PT0gRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lID49ODAgb24gQW5kcm9pZCBtaXNzZXMgaDI0NiBpbiBTRFAgd2hlbiBmaXJzdCB0aW1lIGFmdGVyIHdlYiBwYWdlIGxvYWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTbyB3YWl0IHVudGlsIGJyb3dzZXIgZ2V0IGgyNjQgY2FwYWJpbGl0aWVzIGFuZCBjcmVhdGUgYW5zd2VyIFNEUC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckFnZW50T2JqZWN0Lm9zID09PSAnQW5kcm9pZCcgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09ICdDaHJvbWUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgJiYgZGF0YS5jb2RlID09PSBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSh0aGF0LmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB3ZWJydGNSZXRyeUludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b0ZhbGxiYWNrICYmIHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpICsgMSA8IHRoYXQuZ2V0U291cmNlcygpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc2VxdWVudGlhbCBoYXMgYXZhaWxhYmxlIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJjb21wbGV0ZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBydW5OZXh0UGxheWxpc3QocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS50aGVuKCgpPT57XHJcblxyXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24pLnRoZW4oZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgLy9JTklUIEVSUk9SXHJcbiAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKXtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX1VOS05XT05fRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgIC8vbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxyXG4gICAgICogaW5pdFxyXG4gICAgICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyBwbGF5ZXIgaW5pdGlhbCBvcHRpb24gdmFsdWUuXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICoqL1xyXG4gICAgdGhhdC5pbml0ID0gKG9wdGlvbnMpID0+e1xyXG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcclxuICAgICAgICAgICAgJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnXHJcbiAgICAgICAgICAgICwgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJyAsICdnZXRRdWFsaXR5TGV2ZWxzJ1xyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIG9wdGlvbnMubWVkaWFDb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgb3B0aW9ucy5icm93c2VyID0gdXNlckFnZW50T2JqZWN0O1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zLCB0aGF0KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmxvYWRpbmdSZXRyeUNvdW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgV0VCUlRDX1JFVFJZX0NPVU5UID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9Ob3Qgd29ya2luZyA6IFN5bnRheEVycm9yOiBcIkVSUk9SUy5jb2Rlc1wiIGlzIHJlYWQtb25seVxyXG4gICAgICAgIEVSUk9SUy5jb2RlcyA9IHBsYXllckNvbmZpZy5nZXRTeXN0ZW1UZXh0KCkuYXBpLmVycm9yO1xyXG4gICAgICAgIC8vQ29vbFxyXG4gICAgICAgIC8vRVJST1JTLmNvZGVzLnB1c2gocGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKSk7XHJcblxyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCksIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuXHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQcm92aWRlck5hbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNc2VJbnN0YW5jZSA9ICgpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE1zZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKGlzU2hvdykgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0VGltZWNvZGVNb2RlKClcIiwgaXNTaG93KTtcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuaXNUaW1lY29kZU1vZGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRGcmFtZXJhdGUoKVwiKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRQcm92aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEZyYW1lcmF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrRnJhbWUoKVwiLCBmcmFtZUNvdW50KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNlZWtGcmFtZShmcmFtZUNvdW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJ3NvdXJjZXMnIGluIHBsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFBsYXlsaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBwbGF5bGlzdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCksIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XHJcbiAgICAgICAgcnVuTmV4dFBsYXlsaXN0KGluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKGluZGV4KSA9PntcclxuXHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIC8vIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcclxuICAgICAgICAvLyBsZXQgbmV3U291cmNlID0gc291cmNlc1tpbmRleF07XHJcblxyXG4gICAgICAgIC8vIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICAvLyBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChpbmRleCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcblxyXG4gICAgICAgIGlmIChsYXp5UXVldWUpIHtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtZWRpYU1hbmFnZXIpe1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICAgICAgaWYoT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkubGVuZ3RoICA9PT0gMCl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk92ZW5QbGF5ZXJTREsucGxheWVyTGlzdFwiLCAgT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBcInYuXCIrdmVyc2lvbjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIFNZU1RFTV9URVhUXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxyXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9TdGFydCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvRmFsbGJhY2s6IHRydWUsXHJcbiAgICAgICAgICAgIHRpbWVjb2RlIDogdHJ1ZSxcclxuICAgICAgICAgICAgc291cmNlSW5kZXggOiAtMSxcclxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcclxuICAgICAgICAgICAgYWRDbGllbnQgOiBcImdvb2dsZWltYVwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdG9jb2xPbmx5IDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN5c3RlbVRleHQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYW5nIDogXCJlblwiLFxyXG4gICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudDogMCxcclxuICAgICAgICAgICAgZXhwYW5kRnVsbFNjcmVlblVJOiBmYWxzZSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbk9wdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgc2hvd0JpZ1BsYXlCdXR0b246IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB1c2VyQ3VzdHVtU3lzdGVtVGV4dCA9IFtdO1xyXG4gICAgICAgIGlmKGNvbmZpZy5zeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBfLmlzQXJyYXkoY29uZmlnLnN5c3RlbVRleHQpID8gY29uZmlnLnN5c3RlbVRleHQgOiBbY29uZmlnLnN5c3RlbVRleHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJDdXN0dW1TeXN0ZW1UZXh0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmd9KTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRlICYgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3lzdGVtVGV4dCwgdXNlckN1c3R1bVN5c3RlbVRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBcImVuXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dC5sYW5nID0gdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZztcclxuICAgICAgICAgICAgICAgICAgICBTWVNURU1fVEVYVC5wdXNoKE9iamVjdC5hc3NpZ24odXNlckN1c3R1bVN5c3RlbVRleHRbaV0sIGN1cnJlbnRTeXN0ZW1UZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLnN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogY29uZmlnLmxhbmd9KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5wbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXHJcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IHNwZWMgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvL3NwZWMuaXNGdWxsc2NyZWVuID0gZmFsc2U7IC8vSUUgMTEgY2FuJ3QgY2hlY2sgY3VycmVudCBmdWxsc2NyZWVuIHN0YXRlLlxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QWRDbGllbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYWRDbGllbnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuaXNGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbjtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0RnVsbHNjcmVlbiA9IChpc0Z1bGxzY3JlZW4pID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW4gPSBpc0Z1bGxzY3JlZW47XHJcbiAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XHJcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICAgICAgcmV0dXJuIHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XHJcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc0N1cnJlbnRQcm90b2NvbE9ubHkgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFByb3RvY29sT25seTtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlTGFiZWw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMuc291cmNlTGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZUluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlSW5kZXggPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAodGltZWNvZGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XHJcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCB0aW1lY29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubXV0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnZvbHVtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIHNwZWMudm9sdW1lID0gdm9sdW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNMb29wID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubG9vcDtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1N0YXJ0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYXV0b1N0YXJ0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNDb250cm9scyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNvbnRyb2xzO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN5c3RlbVRleHQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3lzdGVtVGV4dDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldExhbmd1YWdlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmxhbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xyXG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcGxheWxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cclxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XHJcbiAgICBsZXQgX2V2ZW50cyA9W107XHJcblxyXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcclxuXHJcbiAgICAgICAgaWYoZXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhbGxFdmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xyXG4gICAgICAgICAgICBfZXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXHJcbiAqIEBwYXJhbSAgIGluc3RhbmNlXHJcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXHJcbiAqICovXHJcbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XHJcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XHJcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XHJcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XHJcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XHJcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcclxuXHJcbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xyXG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcclxuICAgIH1cclxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcclxuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xyXG4gICAgfVxyXG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcclxuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XHJcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XHJcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXHJcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcclxuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcclxuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIHRoYXQuZW1wdHkoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzV2ViUlRDfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcblxyXG5cclxuICAgICAgICB9Ki9cclxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xyXG5cclxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BMQVlJTkcgPSBcImFkUGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0VSUk9SID0gXCJhZEVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQURfQ0xJQ0sgPSBcImFkY2xpY2tcIjtcclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gXCJzZWVrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gXCJsb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlMSVNUX0NIQU5HRUQgPSBcInBsYXlsaXN0Q2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xyXG5leHBvcnQgY29uc3QgQUxMX1BMQVlMSVNUX0VOREVEID0gXCJhbGxQbGF5bGlzdEVuZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0xJQ0tFRCA9IFwiY2xpY2tlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUID0gXCJmdWxsc2NyZWVuUmVxdWVzdGVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dBUk5JTkcgPSBcIndhcm5pbmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcInF1YWxpdHlMZXZlbENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCA9IFwiZHVyYXRpb25DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcclxuZXhwb3J0IGNvbnN0IEFEX0NMSUVOVF9WQVNUID0gXCJ2YXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SID0gMzAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IgPSAzMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IgPSAzMDg7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCA9IDUxMTtcclxuXHJcbmV4cG9ydCBjb25zdCBXQVJOX01TR19NVVRFRFBMQVkgPSBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcclxuICAgIHZvbHVtZV9tdXRlIDogXCJ2b2x1bWUtbXV0ZVwiLFxyXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtjb2RlcyA6IFwiXCJ9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTWVNURU1fVEVYVCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCJMaXZlIFN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBTdHJlYW1pbmdcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCJQbGF5bGlzdFwiLFxyXG4gICAgICAgICAgICBcInNldHRpbmdcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwiU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRVbml0XCIgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCIgOiBcIlNvdXJjZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIlF1YWxpdHlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCJEaXNwbGF5XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwiUGxlYXNlIHRvdWNoIGhlcmUgdG8gdHVybiBvbiB0aGUgc291bmQuXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XHJcbiAgICAgICAgICAgICAgICAxMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBwbGF5YWJsZSBtZWRpYSBub3QgZm91bmQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlNvbWUgb2YgdGhlIG1lZGlhIGNvdWxkIG5vdCBiZSBkb3dubG9hZGVkIGR1ZSB0byBhIG5ldHdvcmsgZXJyb3IuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRvd25sb2FkaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBjYW5ub3Qgb3Igd2lsbCBub3QgcHJvY2VzcyB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5ldHdvcmsgaXMgc2xvdy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUxMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MTEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJVbmV4cGVjdGVkIGVuZCBvZiBjb25uZWN0aW9uLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbl07IiwiLyoqXHJcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cclxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG4vL1RvRG8gOiBSZXN0cnVjdHVyaW5nXHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBicm93c2VySW5mbyl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xyXG4gICAgbGV0ICRjb250YWluZXIgPSBMQSQoY29udGFpbmVyKTtcclxuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXIgOiBcIiwgYnJvd3NlckluZm8gKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVIdG1sVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGlzQXV0b1N0YXJ0KXtcclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNBdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xyXG4gICAgICAgIC8vIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgLy8gICAgIC8vIHRoYXQuZW1wdHkoKTtcclxuICAgICAgICAvLyAgICAgLy9yZXVzZSB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgIC8vICAgICAvL2JlY2F1c2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXHJcbiAgICAgICAgLy8gICAgIC8vT25seSBzYW1lIHZpZGVvIGVsZW1lbnQgZG9lcyBub3QgcmVxdWlyZSBVc2VyIEludGVyYWN0aW9uIEVycm9yLlxyXG4gICAgICAgIC8vICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgcm9vdElkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzV2ViUlRDIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBwbGF5bGlzdCA6IFtdLFxyXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcclxuICAgIH07XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0LCBwbGF5ZXJDb25maWcpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJcIlxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFwbGF5bGlzdEl0ZW0udGl0bGUgJiYgIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdICYmIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RPbmx5T25lUHJvdG9jb2woc291cmNlcyl7XHJcbiAgICAgICAgICAgICAgICBpZighIXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdoUHJpb3JpdHlUeXBlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0udHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHNvdXJjZXMsIHt0eXBlIDogaGlnaFByaW9yaXR5VHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNDdXJyZW50UHJvdG9jb2xPbmx5KCkpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBleHRyYWN0T25seU9uZVByb3RvY29sKHBsYXlsaXN0SXRlbS5zb3VyY2VzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zb3VyY2VzICYmIGl0ZW0uc291cmNlcy5sZW5ndGggPiAwO30pfHxbXTtcclxuICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBzcGVjLnBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5TGlzdCA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdEluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3RbaW5kZXhdKXtcclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZTElTVF9DSEFOR0VELCBzcGVjLmN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRBZFRhZyA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5hZFRhZ1VybCB8fCBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG4gICAgY29uc3QgUHJvdmlkZXJzID0ge307XHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgaWYgKFByb3ZpZGVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPSB7XHJcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hUTUw1LCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRQcm92aWRlck5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9VTlNVUFBPUlRfRVJST1JdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkpO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cclxuICovXHJcbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcclxuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XHJcbiAgICB9XHJcbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xyXG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XHJcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cclxuXHJcbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XHJcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xyXG4gICAgaWYocHJvdmlkZXIpe1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIHBsYXllckNvbmZpZykgPT4ge1xyXG5cclxuICAgIGxldCBzb3VyY2VJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc291cmNlSW5kZXg7XHJcbn0iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcclxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcclxuICovXHJcbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcclxuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcclxuXHJcbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXHJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxyXG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XHJcblxyXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxyXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cclxuICovXHJcbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXHJcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JqZWN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XHJcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHNob3cgdGhlIHBsYXllciBjb3JlIGxvZyBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cclxuICogQHJldHVybiAgICAge2Jvb2xlYW59ICBydW4gZGVidWcgbW9kZSBvciBub3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcclxuICAgIGlmKGlzRGVidWdNb2RlKXtcclxuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiAgZnVuY3Rpb24oKXt9fTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXHJcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBsYW5ndWFnZTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xyXG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFuYWxVc2VyQWdlbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHVua25vd24gPSAnLSc7XHJcblxyXG4gICAgLy8gc2NyZWVuXHJcbiAgICBsZXQgc2NyZWVuU2l6ZSA9ICcnO1xyXG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJyc7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJztcclxuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJyb3dzZXJcclxuICAgIGxldCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XHJcbiAgICBsZXQgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XHJcbiAgICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeDtcclxuXHJcbiAgICAvLyBPcGVyYVxyXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09wZXJhJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBPcGVyYSBOZXh0XHJcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xyXG4gICAgfVxyXG4gICAgLy/sgrzshLEg67iM65287Jqw7KCAXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYW1zdW5nQnJvd3NlcicpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxNSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdFZGdlJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xyXG4gICAgfVxyXG4gICAgLy8gTVNJRVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XHJcblxyXG5cclxuICAgICAgICAvL3dpbjcgSUUxMSB1c2VyQWdlbnQgaXMgdWdseS4uLi5cclxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2hyb21lXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDaHJvbWUnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxyXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICB9XHJcbiAgICAvLyBGaXJlZm94XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGaXJlZm94JykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgfVxyXG4gICAgLy8gU2FmYXJpXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYWZhcmknKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE1TSUUgMTErXHJcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICB9XHJcbiAgICAvLyBPdGhlciBicm93c2Vyc1xyXG4gICAgZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcvJykpKSB7XHJcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDEpO1xyXG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XHJcbiAgICAgICAgaXNXZWJ2aWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCc7JykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcblxyXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xyXG4gICAgICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW9iaWxlIHZlcnNpb25cclxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XHJcblxyXG4gICAgLy8gY29va2llXHJcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcclxuICAgICAgICBjb29raWVFbmFibGVkID0gKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT0gLTEpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN5c3RlbVxyXG4gICAgdmFyIG9zID0gdW5rbm93bjtcclxuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xyXG4gICAgICAgIHtzOidXaW5kb3dzIDEwJywgcjovKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOC4xJywgcjovKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDcnLCByOi8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFZpc3RhJywgcjovV2luZG93cyBOVCA2LjAvfSxcclxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgWFAnLCByOi8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcclxuICAgICAgICB7czonV2luZG93cyAyMDAwJywgcjovKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcclxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDk4JywgcjovKFdpbmRvd3MgOTh8V2luOTgpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOTUnLCByOi8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIENFJywgcjovV2luZG93cyBDRS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDMuMTEnLCByOi9XaW4xNi99LFxyXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxyXG4gICAgICAgIHtzOidPcGVuIEJTRCcsIHI6L09wZW5CU0QvfSxcclxuICAgICAgICB7czonU3VuIE9TJywgcjovU3VuT1MvfSxcclxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxyXG4gICAgICAgIHtzOidpT1MnLCByOi8oaVBob25lfGlQYWR8aVBvZCkvfSxcclxuICAgICAgICB7czonTWFjIE9TIFhJJywgcjovTWFjIE9TIFggMTEvfSxcclxuICAgICAgICB7czonTWFjIE9TIFgnLCByOi9NYWMgT1MgWCAxMC99LFxyXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcclxuICAgICAgICB7czonUU5YJywgcjovUU5YL30sXHJcbiAgICAgICAge3M6J1VOSVgnLCByOi9VTklYL30sXHJcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXHJcbiAgICAgICAge3M6J09TLzInLCByOi9PU1xcLzIvfSxcclxuICAgICAgICB7czonU2VhcmNoIEJvdCcsIHI6LyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cclxuICAgIF07XHJcbiAgICBmb3IgKHZhciBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XHJcbiAgICAgICAgdmFyIGNzID0gY2xpZW50U3RyaW5nc1tpZF07XHJcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xyXG4gICAgICAgICAgICBvcyA9IGNzLnM7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcclxuXHJcbiAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XHJcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XHJcbiAgICAgICAgb3MgPSAnV2luZG93cyc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChvcykge1xyXG4gICAgICAgIGNhc2UgJ01hYyBPUyBYSSc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTFbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FuZHJvaWQnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2lPUyc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxyXG4gICAgICAgIGJyb3dzZXI6IGJyb3dzZXIsXHJcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXHJcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxyXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxyXG4gICAgICAgIHVhIDogbkFndCxcclxuICAgICAgICBvczogb3MsXHJcbiAgICAgICAgb3NWZXJzaW9uOiBvc1ZlcnNpb24sXHJcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZFxyXG4gICAgfTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYoISRlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKkVGRkVDVFMqL1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKkVMRU1FTlRTKi9cclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFmdGVyID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5iZWZvcmUgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jaGlsZHJlbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2hpbGRyZW4gfHwgW107XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhlIGNvbnRhaW5zKCkgbWV0aG9kIHJldHVybnMgYSBCb29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciBhIG5vZGUgaXMgYSBkZXNjZW5kYW50IG9mIGEgc3BlY2lmaWVkIG5vZGUuXHJcbiAgICAvL0EgZGVzY2VuZGFudCBjYW4gYmUgYSBjaGlsZCwgZ3JhbmRjaGlsZCwgZ3JlYXQtZ3JhbmRjaGlsZCwgYW5kIHNvIG9uLlxyXG4gICAgdGhhdC5jb250YWlucyA9IChlbENoaWxkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ICE9PSBlbENoaWxkICYmICRlbGVtZW50LmNvbnRhaW5zKGVsQ2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xyXG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnN0eWxlW25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIC8qdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5odG1sID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgLyp2YXIgbWF0Y2hlcyA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsLm1hdGNoZXMgfHwgZWwubWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwub01hdGNoZXNTZWxlY3RvcikuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1hdGNoZXMoZWwsICcubXktY2xhc3MnKTsqL1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYoZWxlbWVudCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcblxyXG4gICAgICAgICRlbGVtZW50LmNsb3Nlc3QgPSBmdW5jdGlvbiAocykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGVsID0gJGVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsLm1hdGNoZXMocykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuXHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0cmFjdEV4dGVuc2lvblxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZighcGF0aCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcclxuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcclxuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcclxuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XHJcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xyXG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogbmF0dXJhbEhtc1xyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcclxuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcclxuICAgIGlmKCFzZWNvbmQpe1xyXG4gICAgICAgIHJldHVybiBcIjAwOjAwXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcclxuXHJcbiAgICAvL2lmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cclxuXHJcbiAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xyXG4gICAgaWYoIXN0cikge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XHJcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuICAgIGxldCBzZWMgPSAwO1xyXG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xyXG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcclxuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1cclxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWM7XHJcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiB1dGlscyBmb3Igd2VicGFja1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xyXG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xyXG4gICAgICAgIGlmIChzcmMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=