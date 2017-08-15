$(document).ready(function() {
    console.log('script loaded.');

    //Getting the events data using Cypher query from neo4j database
    $.get('/events', data => parseEventsData(data));

    //Transforming the JSON data into object
    function parseEventsData(data) {

        var events = JSON.parse(data)
            //will save the events into array
        var eventsArray = []

        //mapping through the JSON response to pick out relevant info
        events.map(function(x) {

            //turning string dates to numbers
            var dateObject = new Object();
            dateObject.year = Number(x._fields[0].properties.date.slice(0, 4))
            dateObject.month = Number(x._fields[0].properties.date.slice(4, 6))
            dateObject.day = Number(x._fields[0].properties.date.slice(6, 8))

            var eventObject = new Object();

            eventObject.description = x._fields[0].properties.description
            eventObject.date = dateObject

            eventsArray.push(eventObject)

            // console.log(x._fields[0].properties.date + ": " + x._fields[0].properties.description)
        })

        console.log(eventsArray)

    }

})