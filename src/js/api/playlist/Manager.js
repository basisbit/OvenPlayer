import _ from "utils/underscore";
import {trim} from "../../utils/strings";
import {PLAYLIST_CHANGED} from "api/constants";

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
const Manager = function(provider){
    const that = {};
    let currentPlaylistItem = [];
    let spec = {
        playlist : [],
        currentIndex : 0
    };

    console.log("PlaylistManager loaded.");

    const makePrettySource = function(source_){
        if (!source_ || !source_.file && !(source_.host || source_.application || source_.stream)) {
            return;
        }

        let source = Object.assign({}, { 'default': false }, source_);
        source.file = trim('' + source.file);

        if(source.host && source.application && source.stream){
            source.file = source.host + "/" + source.application + "/stream/" + source.stream;
            delete source.host;
            delete source.application;
            delete source.stream;
        }

        const mimetypeRegEx = /^[^/]+\/(?:x-)?([^/]+)$/;

        if (mimetypeRegEx.test(source.type)) {
            // if type is given as a mimetype
            source.mimeType = source.type;
            source.type = source.type.replace(mimetypeRegEx, '$1');
        }

        source.type = 'webrtc';

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

        Object.keys(source).forEach(function(key) {
            if (source[key] === '') {
                delete source[key];
            }
        });

        return source;

    }

    that.initPlaylist =(playlist, playerConfig) =>{

        console.log("PlaylistManager setPlaylist() ", playlist);
        const prettiedPlaylist = (_.isArray(playlist) ? playlist : [playlist]).map(function(item){
            if(!_.isArray(item.tracks)) {
                delete item.tracks;
            }
            let playlistItem = Object.assign({},{
                sources: [],
                tracks: [],
                title : ""
            }, item );

            if((playlistItem.sources === Object(playlistItem.sources)) && !_.isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_.isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                playlistItem.sources = [makePrettySource(playlistItem)];
            }

            if(!_.isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                if (item.levels) {
                    playlistItem.sources = item.levels;
                } else {
                    playlistItem.sources = [makePrettySource(item)];
                }
            }


            for(let i = 0; i < playlistItem.sources.length; i++) {
                let source = playlistItem.sources[i];
                let prettySource = "";
                if (!source) {
                    continue;
                }

                let defaultSource = source.default;
                if (defaultSource) {
                    source.default = (defaultSource.toString() === 'true');
                } else {
                    source.default = false;
                }

                // If the source doesn't have a label, number it
                if (!playlistItem.sources[i].label) {
                    playlistItem.sources[i].label = playlistItem.sources[i].type+"-"+i.toString();
                }

                prettySource = makePrettySource(playlistItem.sources[i]);
                playlistItem.sources[i] = prettySource;
            }

            playlistItem.sources = playlistItem.sources.filter(source => !!source);

            if(!playlistItem.title &&  playlistItem.sources[0] && playlistItem.sources[0].label){
                playlistItem.title = playlistItem.sources[0].label;
            }

            if(!_.isArray(playlistItem.tracks)){
                playlistItem.tracks = [];
            }

            playlistItem.tracks = playlistItem.tracks.map(function(track){
                if(!track || !track.file){
                    return false;
                }
                return Object.assign({}, {
                    'kind': 'captions',
                    'default': false
                }, track);
            }).filter(track => !!track);
            return playlistItem;
        }).filter(function(item){return item.sources && item.sources.length > 0;})||[];
        spec.playlist = prettiedPlaylist;
        return prettiedPlaylist;
    };
    that.getPlaylist = () => {
        console.log("PlaylistManager getPlaylist() ", spec.playlist);
        return spec.playlist;
    };
    that.getCurrentPlayList = () => {
        if(spec.playlist[spec.currentIndex]){
            return spec.playlist[spec.currentIndex];
        }else{
            return [];
        }
    };
    that.getCurrentPlaylistIndex = () => {
        return spec.currentIndex;
    };
    that.setCurrentPlaylist = (index) => {
        if(spec.playlist[index]){
            spec.currentIndex = index;
            provider.trigger(PLAYLIST_CHANGED, spec.currentIndex);
        }
        return spec.currentIndex;
    };
    that.getCurrentSources = () => {
        if(spec.playlist[spec.currentIndex]){
            console.log("PlaylistManager getCurrentSources() ", spec.playlist[spec.currentIndex].sources);
            return spec.playlist[spec.currentIndex].sources;
        }else{
            return null;
        }

    };
    that.getCurrentAdTag = () => {
        if(spec.playlist[spec.currentIndex]){
            return spec.playlist[spec.currentIndex].adTagUrl || "";
        }
    };

    return that;
};


export default Manager;
