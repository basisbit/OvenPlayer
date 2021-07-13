// STATE
export const STATE_BUFFERING = "buffering";
export const STATE_IDLE = "idle";
export const STATE_COMPLETE = "complete";
export const STATE_PAUSED = "paused";
export const STATE_PLAYING = "playing";
export const STATE_ERROR = "error";
export const STATE_LOADING = "loading";
export const STATE_STALLED = "stalled";

export const STATE_AD_LOADING = "adLoading";
export const STATE_AD_LOADED = "adLoaded";
export const STATE_AD_PLAYING = "adPlaying";
export const STATE_AD_PAUSED = "adPaused";
export const STATE_AD_COMPLETE = "adComplete";
export const STATE_AD_ERROR = "adError";
export const PLAYER_AD_CLICK = "adclick";

// PROVIDER
export const PROVIDER_WEBRTC = "webrtc";

// EVENTS
export const CONTENT_COMPLETE = STATE_COMPLETE;
export const READY = "ready";
export const DESTROY = "destroy";
export const CONTENT_SEEK = "seek";
export const CONTENT_BUFFER_FULL = "bufferFull";
export const DISPLAY_CLICK = "displayClick";
export const CONTENT_LOADED = "loaded";
export const PLAYLIST_CHANGED = "playlistChanged";
export const CONTENT_SEEKED = "seeked";
export const ALL_PLAYLIST_ENDED = "allPlaylistEnded";
export const NETWORK_UNSTABLED = "unstableNetwork";



export const ERROR = "error";

// STATE OF PLAYER
export const PLAYER_STATE = "stateChanged";
export const PLAYER_COMPLETE = STATE_COMPLETE;
export const PLAYER_PAUSE = "pause";
export const PLAYER_PLAY = "play";

export const PLAYER_CLICKED = "clicked";
export const PLAYER_RESIZED = "resized";
export const PLAYER_LOADING = "loading";
export const PLAYER_FULLSCREEN_REQUEST = "fullscreenRequested";
export const PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";
export const PLAYER_WARNING = "warning";

export const CONTENT_BUFFER = "bufferChanged";
export const CONTENT_TIME = "time";
export const CONTENT_RATE_CHANGE = "ratechange";
export const CONTENT_VOLUME = "volumeChanged";
export const CONTENT_MUTE = "mute";
export const CONTENT_META = "metaChanged";
export const CONTENT_SOURCE_CHANGED = "sourceChanged";
export const CONTENT_LEVEL_CHANGED = "qualityLevelChanged";
export const CONTENT_DURATION_CHANGED = "durationChanged";
export const CONTENT_TIME_MODE_CHANGED = "timeDisplayModeChanged";
export const OME_P2P_MODE = "p2pMode";


export const AD_CLIENT_GOOGLEIMA = "googleima";
export const AD_CLIENT_VAST = "vast";


export const INIT_UNKNWON_ERROR = 100;
export const INIT_UNSUPPORT_ERROR = 101;
export const PLAYER_UNKNWON_ERROR = 300;
export const PLAYER_UNKNWON_OPERATION_ERROR = 301;
export const PLAYER_UNKNWON_NETWORK_ERROR = 302;
export const PLAYER_UNKNWON_DECODE_ERROR = 303;
export const PLAYER_FILE_ERROR = 304;
export const PLAYER_BAD_REQUEST_ERROR = 306;
export const PLAYER_AUTH_FAILED_ERROR = 307;
export const PLAYER_NOT_ACCEPTABLE_ERROR = 308;
export const PLAYER_WEBRTC_WS_ERROR = 501;
export const PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
export const PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
export const PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
export const PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
export const PLAYER_WEBRTC_NETWORK_SLOW = 510;
export const PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = 511;

export const WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";


export const UI_ICONS = {
    volume_mute : "volume-mute",
    op_warning : "op-warning"
};


export const SYSTEM_TEXT = [
    {
        "lang" : "en",
        "ui" : {
            "controls" : {
                "live" : "Live Streaming",
                "low_latency_live" : "Sub-Second Latency Streaming",
                "low_latency_p2p" : "Sub-Second Latency P2P",
            },
            "playlist" : "Playlist",
            "setting" : {
                "title" : "Settings",
                "speed" : "Speed",
                "speedUnit" : "x",
                "source" : "Source",
                "quality" : "Quality",
                "display" : "Display"
            }
        },
        "api" : {
            "message" : {
                "muted_play" : "Please touch here to turn on the sound."
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
    }
];


export const ERRORS = {codes : SYSTEM_TEXT[0].api.error};