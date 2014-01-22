// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require bootstrap-wysihtml5/b3
//= require bootstrap-wysihtml5/locales/de-DE
//= require turbolinks
//= require bootstrap
//= require fullcalendar
//= require_tree .


$(document).ready(function(){
    $('.wysihtml5').each(function(i, elem) {
        $(elem).wysihtml5();
    });
    
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
        
    $('#calendar').fullCalendar({
        editable: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
    defaultView: 'month',
    height: 500,
    slotMinutes: 15,
        
    loading: function(bool){
        if (bool)
        $('#loading').show();
        else
        $('#loading').hide();
    },
        
    // a future calendar might have many sources.
    eventSources: [{
        url: '/events',
        color: 'yellow',
        textColor: 'black',
        ignoreTimezone: false
    }],
        
    timeFormat: 'h:mm t{ - h:mm t} ',
    dragOpacity: "0.5",
        
    //http://arshaw.com/fullcalendar/docs/event_ui/eventDrop/
    eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc){
        updateEvent(event);
    },

    // http://arshaw.com/fullcalendar/docs/event_ui/eventResize/
    eventResize: function(event, dayDelta, minuteDelta, revertFunc){
        updateEvent(event);
    },

    // http://arshaw.com/fullcalendar/docs/mouse/eventClick/
    eventClick: function(event, jsEvent, view){
        // would like a lightbox here.
    },
});
});

$(document).on('page:load', function(){
  window['rangy'].initialized = false;
});