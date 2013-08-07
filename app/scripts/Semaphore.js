var Semaphore = function(element) {
    "use strict";

    return {
        $elementForWriteAccessInDom: $(element),
        accessibleBufferEvents: true,
        getInstance:  function(){
            return this;
        },
        bufferEventIsAccessible: function(){
            return this.getInstance().accessibleBufferEvents;
        },
        setAccessBufferEvents: function(access){
            this.accessibleBufferEvents = access;
            this.writingAccessInDOMElement(this.accessibleBufferEvents);
        },
        writingAccessInDOMElement: function(access){
            //  By default the access is false
            var className = 'label-important',
                messageHtml = 'Não! Favor aguardar o tempo de 5 segundos...'
            ;
            if (access) {
                className = 'label-success';
                messageHtml = 'Sim! O buffer por ser utilizado novamente!';
            }

            this.$elementForWriteAccessInDom.removeClass('label-important label-success')
                                            .addClass(className)
                                            .text(messageHtml);
        }
    };
};