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
//= require moment.min.js
//= require_tree .


$(document).ready(function(){
	$('.wysihtml5').each(function(i, elem) {
		$(elem).wysihtml5();
	});
    
	$('.datetimepicker').datetimepicker();
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
        
	$('#calendar').fullCalendar({
		editable: false,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultView: 'month',
		height: 500,
		slotMinutes: 15,
    	  
		// a future calendar might have many sources.
		eventSources: [{
			url: '/events',
			ignoreTimezone: false
		}],
    	    
		timeFormat: 'H:mm { - H:mm} '
	});
});

$(document).on('page:load', function(){
window['rangy'].initialized = false;
});