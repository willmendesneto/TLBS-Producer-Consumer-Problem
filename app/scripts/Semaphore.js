var Semaphore = function(){
    "use strict";

    return {
        accessibleBufferEvents: true,
        getInstance:  function(){
            return this;
        },
        bufferEventIsAccessible: function(){
            return this.getInstance().accessibleBufferEvents;
        }
    };
};