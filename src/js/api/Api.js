import Configurator from "api/Configurator";
import EventEmitter from "api/EventEmitter";
import LazyCommandExecutor from "api/LazyCommandExecutor";
import MediaManager from "api/media/Manager";
import PlaylistManager from "api/playlist/Manager";
import ProviderController from "api/provider/Controller";
import {READY, ERRORS, ERROR, INIT_UNKNWON_ERROR, INIT_UNSUPPORT_ERROR, DESTROY, PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR, ALL_PLAYLIST_ENDED} from "api/constants";
import {analUserAgent} from "utils/browser";

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

const Api = function(container){
    const that = {};
    EventEmitter(that);
    console.log("API loaded.");

    let playlistManager = PlaylistManager(that);
    let providerController = ProviderController();
    let userAgentObject = analUserAgent();
    let mediaManager = MediaManager(container, userAgentObject);
    let currentProvider = "";
    let playerConfig = "";
    let lazyQueue = "";

    let webrtcRetryInterval = 1000;


    const runNextPlaylist = function(index){
        console.log("runNextPlaylist");
        let nextPlaylistIndex = index; // || playlistManager.getCurrentPlaylistIndex() + 1;
        let playlist = playlistManager.getPlaylist();
        let hasNextPlaylist = playlist[nextPlaylistIndex]? true : false;
        //set Golbal Volume info
        playerConfig.setVolume(currentProvider.getVolume());

        if(hasNextPlaylist){
            //that.pause();
            lazyQueue = LazyCommandExecutor(that, ['play','seek','stop']);
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();


            if(!playerConfig.isAutoStart()){
                //Anyway nextplaylist runs autoStart!.
                that.play();
            }
        }else{
            //All Playlist Ended.
            that.trigger(ALL_PLAYLIST_ENDED, null);
        }
    };
    const initProvider = function(lastPlayPosition){
        return providerController.loadProviders(playlistManager.getCurrentPlayList()).then(Providers => {

            if(Providers.length < 1){
                throw ERRORS.codes[INIT_UNSUPPORT_ERROR];
            }

            if(currentProvider){
                currentProvider.destroy();
                currentProvider = null;
            }

            console.log("API : init() provider", "webrtc");
            //Init Provider.
            currentProvider =  Providers.provider(
                mediaManager.createMedia(),
                playerConfig.getConfig()
            );

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function(name, data){

                if( name === ERROR) {

                    // Chrome >=80 on Android misses h246 in SDP when first time after web page loaded.
                    // So wait until browser get h264 capabilities and create answer SDP.
                    if (userAgentObject.os === 'Android' && userAgentObject.browser === 'Chrome') {

                        if (data && data.code && data.code === PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR) {

                            setTimeout(function () {

                                that.setCurrentSource(0);
                            }, webrtcRetryInterval);

                            return;
                        }
                    }
                }

                if(name === "complete"){
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                that.trigger(name, data);
            });

        }).then(()=>{

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function(){

                that.trigger(READY);

                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();

            }).catch((error) => {
                lazyQueue.off();
                if(error && error.code && ERRORS.codes[error.code]){
                    that.trigger(ERROR, ERRORS.codes[error.code]);
                }else {
                    let tempError = ERRORS.codes[INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(ERROR, tempError);
                }
            });
        }).catch((error) => {
            //INIT ERROR
            if(error && error.code && ERRORS.codes[error.code]){
                that.trigger(ERROR, ERRORS.codes[error.code]);
            }else {
                let tempError = ERRORS.codes[INIT_UNKNWON_ERROR];
                tempError.error = error;
                that.trigger(ERROR, tempError);
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
    that.init = (options) =>{
        //It collects the commands and executes them at the time when they are executable.
        lazyQueue = LazyCommandExecutor(that, [
            'load','play','pause','seek','stop', 'getDuration', 'getPosition', 'getVolume'
            , 'getMute', 'getBuffer', 'getState' , 'getQualityLevels'
        ]);
        options.mediaContainer = container;
        options.browser = userAgentObject;
        playerConfig = Configurator(options, that);
        console.log("API : init()");
        console.log("API : init() config : ", playerConfig);

        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.loadingRetryCount !== undefined) {
            WEBRTC_RETRY_COUNT = playerConfig.getConfig().loadingRetryCount;
        }

        //Not working : SyntaxError: "ERRORS.codes" is read-only
        ERRORS.codes = playerConfig.getSystemText().api.error;
        //Cool
        //ERRORS.codes.push(playerConfig.getSystemText());

        playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        console.log("API : init() sources : " , playlistManager.getCurrentSources());

        initProvider();
    };
    that.getConfig = () => {
        console.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };
    that.getBrowser = () => {

        return playerConfig.getBrowser();
    };
    that.getFramerate = () => {
        console.log("API : getFramerate()");

        if (currentProvider) {
            return currentProvider.getFramerate();
        }

    };
    that.seekFrame = (frameCount) => {
        if(!currentProvider){return null;}
        console.log("API : seekFrame()", frameCount);
        return currentProvider.seekFrame(frameCount);
    };

    that.getDuration = () => {
        if(!currentProvider){return null;}
        console.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = () => {
        if(!currentProvider){return null;}

        console.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = () => {
        if(!currentProvider){return null;}

        console.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = (volume) => {
        if(!currentProvider){return null;}

        console.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = (state) => {
        if(!currentProvider){return null;}

        console.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = () => {
        if(!currentProvider){return null;}

        console.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = (playlist) => {
        console.log("API : load() ", playlist);
        lazyQueue = LazyCommandExecutor(that, ['play','seek','stop']);

        if(playlist){
            if(currentProvider){
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
    that.play = () => {
        if(!currentProvider){return null;}
        console.log("API : play() ");
        currentProvider.play();
    }
    that.pause = () => {
        if(!currentProvider){return null;}

        console.log("API : pause() ");
        currentProvider.pause();
    };

    that.getPlaylist = () => {
        console.log("API : getPlaylist() ", playlistManager.getPlaylist());
        return playlistManager.getPlaylist();
    };
    that.getCurrentPlaylist = () => {
        console.log("API : getCurrentPlaylist() ", playlistManager.getCurrentPlaylistIndex());
        return playlistManager.getCurrentPlaylistIndex();
    };
    that.setCurrentPlaylist = (index) => {
        console.log("API : setCurrentPlaylist() ", index);
        runNextPlaylist(index);
    };

    that.getSources = () => {
        if(!currentProvider){return null;}

        console.log("API : getSources() ", currentProvider.getSources());
        return currentProvider.getSources();
    };
    that.setCurrentSource = (index) =>{

        if(!currentProvider){return null;}

        lazyQueue = LazyCommandExecutor(that, ['play','seek']);

        initProvider(lastPlayPosition);

        return index;
    };

    that.getBuffer = () => {
        if(!currentProvider){return null;}
        console.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = () => {
        if(!currentProvider){return null;}
        console.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = () => {
        if(!currentProvider){return null;}

        console.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = () => {

        console.log("API : remove() ");

        if (lazyQueue) {
            lazyQueue.destroy();
        }

        if(currentProvider){
            currentProvider.destroy();
            currentProvider = null;
        }

        if(mediaManager){
            mediaManager.destroy();
            mediaManager = null;
        }

        that.trigger(DESTROY);
        that.off();

        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        console.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if(OvenPlayerSDK.getPlayerList().length  === 0){
            console.log("OvenPlayerSDK.playerList",  OvenPlayerSDK.getPlayerList());
        }
    };

    return that;
};



export default Api;


