import {PROVIDER_WEBRTC} from "api/constants";

/**
 * @brief   This manages provider.
 * @param
 * */
const Controller = function () {
    const Providers = {};

    const that = {};
    console.log("ProviderController loaded.");

    const registeProvider = (name, provider) => {
        if (Providers[name]) {
            return;
        }
        console.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    const ProviderLoader = {
        webrtc: function () {

            const provider = WebRTC;
            registeProvider(PROVIDER_WEBRTC, provider);
            return {name: PROVIDER_WEBRTC, provider: provider};
        },
    };


    that.loadProviders = (playlistItem) => {
        return ProviderLoader['webrtc']();
    };


    that.getProviderBySource = (source) => {
        return Providers['webrtc'];
    };

    that.isSameProvider = (currentSource, newSource) => {
        return true;
    };

    return that;
};

export default Controller;
