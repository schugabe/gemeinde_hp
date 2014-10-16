$(document).ready(function(){
	$('.wysihtml5').each(function(i, elem) {
		$(elem).wysihtml5();
	});
    
	$('.datepicker').datetimepicker({pickTime: false, language: 'de'});
    $('.timepicker').datetimepicker({pickDate: false, useSeconds: false, language: 'de'});
	
    
    $("#event_starts_at_date_datepicker").on("change.dp",function (e) {
        $('#event_ends_at_date_datepicker').data("DateTimePicker").setStartDate(e.date);
    });
    
    $("#event_ends_at_date_datepicker").on("change.dp",function (e) {
        $('#event_starts_at_date_datepicker').data("DateTimePicker").setEndDate(e.date);
    });
    
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

		eventSources: [{
			url: '/calendar/index.json',
			ignoreTimezone: false
		}],
    	    
		timeFormat: 'H:mm { - H:mm} ',
    	buttonText: {
    		today: 'Heute',
    		month: 'Monat',
    		day: 'Tag',
    		week: 'Woche'
    	},
    	monthNames: ['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    	monthNamesShort: ['Jän','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sept','Okt','Nov','Dez'],
    	dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    	dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
        axisFormat: 'H:mm',
        allDayText: 'Ganztägig',
        columnFormat: {
            month: 'ddd',
            week: 'ddd d.M',
            day: 'dddd d.M'
        }
	});
    
    $(window).scroll(function(){
        if($(this).scrollTop()>=($('.jumbotron').height()+$('.navbar-fixed-top').height())){
            $('body').addClass('scrolling');
        }
        else {
            $('body').removeClass('scrolling');
        }
        
        if ($(this).scrollTop()>=$('.navbar-default').height()) {
            $('body').addClass('scrolling-menu');
        }
        else {
            $('body').removeClass('scrolling-menu');
        }
    });

    audiojs.events.ready(function() {
        var as = audiojs.createAll();
    });
});

$(document).on('page:load', function(){
    window['rangy'].initialized = false;
});
