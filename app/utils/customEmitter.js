const eventEmitter = new (require('events').EventEmitter)();

const emitEvent = (str) => {
    eventEmitter.emit(str);
}

const registerEvent = (str, callback) => {
    eventEmitter.on(str, callback);
}

const registerEventOnce = (str, callback) => {
    eventEmitter.once(str, callback);
}

module.exports = {
    emitEvent,
    registerEvent,
    registerEventOnce
}