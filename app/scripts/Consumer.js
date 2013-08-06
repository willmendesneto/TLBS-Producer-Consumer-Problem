var Consumer = function(Producer){
    "use strict";

    return {
        producer: Producer,
        processQeue: function(){
            if( !semaphore.bufferEventIsAccessible() ){
                alert('Buffer isn\'t accessible!');
                return false;
            }
            //  Close access for bufferEvent
            semaphore.accessibleBufferEvents = false;

            var producerInstance = this.producer.getInstance();
            this.addConsumerLogInList();
            // Buffer will be accessible in 5 seconds
            setTimeout( function() {
                semaphore.accessibleBufferEvents = true;
            }, 5000);
        },
        getInstance:  function(){
            return this;
        },
        addConsumerLogInList: function(){
            var option = new Array(),
                producerInstance = this.producer.getInstance(),
                logText
            ;
            //  Removing oldest elements
            //$('.list-events-consumer').find('li').remove();

            var bufferEvents = producerInstance.getBufferEvents(),
                bufferEventsLength = bufferEvents.length,
                key = 0
            ;
            while(bufferEventsLength > key ) {
                var date = new Date(),
                    chosenEvent = bufferEvents[ key ]
                ;
                logText = 'Date: <b>' + date.getDate() + '/' + (date.getMonth() + 1) + '/' +date.getFullYear() + '</b> Consumed - <b>"' + chosenEvent + '" event of process list.</b>'

                option[key] = document.createElement('li');
                //add text node to li element
                $( option[key] ).html('<a href="javascript:void(0);" class="' + self.classItem + '">' + logText + '</a>');
                //  Append all the items
                $('.list-events-consumer').append(option[key]);

                ++key;
            }
            producerInstance.removeElementInList();
        }

    };
};