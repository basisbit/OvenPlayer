import _ from 'utils/underscore';

export function trim(string) {
    return string ? string.replace(/^\s+|\s+$/g, '') : "";
}

/**
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
export function naturalHms(second) {
    let secNum = parseInt(second, 10);
    if(!second){
        return "00:00";
    }
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    //if (hours > 0) {minutes = "0"+minutes;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours > 0) {
        return hours+':'+minutes+':'+seconds;
    } else {
        return minutes+':'+seconds;
    }
}


export function hmsToSecond(str, frameRate) {
    if(!str) {
        return 0;
    }
    if(_.isNumber(str) && !_.isNaN(str)){
        return str;
    }
    str = str.replace(',', '.');
    let arr = str.split(':');
    let arrLength = arr.length;
    let sec = 0;
    if (str.slice(-1) === 's'){
        sec = parseFloat(str);
    }else if (str.slice(-1) === 'm'){
        sec = parseFloat(str) * 60;
    }else if (str.slice(-1) === 'h'){
        sec = parseFloat(str) * 3600;
    }else if (arrLength > 1) {
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
    if (_.isNaN(sec)) {
        return 0;
    }
    return sec;
}