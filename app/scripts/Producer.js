var Producer = function(elementListener, listEvents, classItem){
    "use strict";

    var bufferEvents = ['Click'];
    return {
        $elementListener : $(elementListener),
        $listEvents : $(listEvents),
        classItem : classItem,
        waitForEvent: function (){
            var self = this.getInstance();
            $(this.$elementListener).on('click', function(){

                if( !semaphore.bufferEventIsAccessible() ){
                    alert('Buffer isn\'t accessible!');
                    return false;
                }

                var chosenEvent = $(this).text();
                bufferEvents.push( chosenEvent );
                self.appendElementInList();

            });
        },
        appendElementInList: function(){
            var countEvents = bufferEvents.length;
            var self = this.getInstance();
            //  Removing oldest elements
            self.$listEvents.find('li').remove();

            var option = new Array();
            $.each(bufferEvents, function(key, chosenEvent){
                option[key] = document.createElement('li');
                //add text node to li element
                $( option[key] ).html('<a href="javascript:void(0);" data-key="' + key + '" class="' + self.classItem + '">' + key + ' of ' + countEvents + ' - ' + chosenEvent + '</a>');
                //  Append all the items
                self.$listEvents.append(option[key]);
            });

            this.writingEventsInList();
        },
        removeElementInList: function(item){
            if( item !== undefined) {
                bufferEvents.splice(item, 1);
            } else if (item === undefined) {
                bufferEvents = [];
            }

            this.appendElementInList();
        },
        writingEventsInList:  function(){
            var self = this.getInstance();
            $('.' + self.classItem).off('click').on('click', function(){

                if( !semaphore.bufferEventIsAccessible() ){
                    alert('Buffer isn\'t accessible!');
                    return false;
                }
                //  Close access for bufferEvent
                semaphore.accessibleBufferEvents = false;

                self.removeElementInList( $(this).data('key') );

                // Buffer will be accessible in 5 seconds
                setTimeout( function() {
                    semaphore.accessibleBufferEvents = true;
                }, 5000);

            });
        },
        getInstance:  function(){
            return this;
        },
        getBufferEvents:  function(){
            return bufferEvents;
        },
        init: function(){
            this.appendElementInList();
            this.waitForEvent();
            this.writingEventsInList();
        },
    };
};