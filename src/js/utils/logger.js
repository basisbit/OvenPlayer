/**
 * Created by hoho on 2018. 5. 24..
 */

const logger = function(id){
    const that = {};
    let prevConsoleLog = null;

    window.console = {log : window['console']['log']};

    that.enable = () =>{
        if(prevConsoleLog == null){
            return;
        }
        console['log'] = prevConsoleLog;
    };
    that.disable = () =>{
        prevConsoleLog = console.log;
        console['log'] = function(){};
    };
    /*that.log = () => {

    };*/
    that.destroy = () =>{
        window.console = null;
    };

    return that;
};


export default logger;