import _ from 'utils/underscore';

/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */
const LazyCommandExecutor = function (instance, queuedCommands) {
    let commandQueue = [];
    let undecoratedMethods = {};
    let executeMode = false;
    let that = {};
    console.log("LazyCommandExecutor loaded.");
    queuedCommands.forEach((command) => {
        const method = instance[command];
        undecoratedMethods[command] = method || function(){};

        instance[command] = function() {
            const args = Array.prototype.slice.call(arguments, 0);
              if (!executeMode) {
                //commandQueue.push({ command, args });
                that.addQueue(command, args)
            } else {
                executeQueuedCommands();
                if (method) {
                    method.apply(that, args);
                }
            }
        };
    });
    var executeQueuedCommands = function () {
        while (commandQueue.length > 0) {
            const { command, args } = commandQueue.shift();
            (undecoratedMethods[command] || instance[command]).apply(instance, args);
        }
    }

    that.setExecuteMode = (mode) => {
        executeMode = mode;
        console.log("LazyCommandExecutor : setExecuteMode()", mode);
    };
    that.getUndecoratedMethods = function(){
        console.log("LazyCommandExecutor : getUndecoratedMethods()", undecoratedMethods);
        return undecoratedMethods;
    }
    that.getQueue = function(){
        console.log("LazyCommandExecutor : getQueue()", getQueue);
        return commandQueue;
    }
    that.addQueue = function(command, args){
        console.log("LazyCommandExecutor : addQueue()", command, args);
        commandQueue.push({ command, args });
    }

    that.flush = function(){
        console.log("LazyCommandExecutor : flush()");
        executeQueuedCommands();
    };
    that.empty = function() {
        console.log("LazyCommandExecutor : empty()");
        commandQueue.length = 0;
    };
    that.off = function() {
        console.log("LazyCommandExecutor : off()");
        queuedCommands.forEach((command) => {
            const method = undecoratedMethods[command];
            if (method) {
                instance[command] = method;
                delete undecoratedMethods[command];
            }
        });
    };


    //Run once at the end
    that.removeAndExcuteOnce = function(command_){
        let commandQueueItem = _.findWhere(commandQueue, {command : command_});
        console.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_.findIndex(commandQueue, {command : command_}), 1);

        const method = undecoratedMethods[command_];
        if (method) {
            console.log("removeCommand()");
            if(commandQueueItem){
                (method|| instance[command_]).apply(instance, commandQueueItem.args);
            }
            instance[command_] = method;
            delete undecoratedMethods[command_];
        }
    };

    that.destroy = function() {
        console.log("LazyCommandExecutor : destroy()");
        that.off();
        that.empty();
    };
    return that;
}

export default LazyCommandExecutor;