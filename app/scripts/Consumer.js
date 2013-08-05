var Consumer = function(Producer){
    return {
        producer: Producer,
        processQeue: function(){
            var producerInstance = this.producer.getInstance(),
                bufferEvents = producerInstance.getBufferEvents(),
                self = this.getInstance()
            ;
            $.each(bufferEvents, function(key, chosenEvent){
                var date = new Date();
                self.addConsumerLogInList('Date: <b>' + date.getDate() + '/' + (date.getMonth() + 1) + '/' +date.getFullYear() + '</b> Consumed - <b>"' + chosenEvent + '" event of process list.</b>');
                console.log('Removing: '+key+' - ' + chosenEvent);
                producerInstance.removeElementInList( key );
            });

        },
        getInstance:  function(){
            return this;
        },
        addConsumerLogInList: function(logText){
            var option = new Array();
            $.each(this.producer.getBufferEvents(), function(key, chosenEvent){
                option[key] = document.createElement('li');
                //add text node to li element
                $( option[key] ).html('<a href="javascript:void(0);" class="' + self.classItem + '">' + logText + '</a>');
                //  Append all the items
                $('.list-events-consumer').append(option[key]);
            });
        }

    };
};