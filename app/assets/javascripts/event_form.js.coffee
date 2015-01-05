$ ->
  $("#recurring_unit").change ->
    unit = $(this).val()
    
    $("#recurring_frequency option").each ->
      if $(this).val() == "1"
        if unit == 'day'
          $(this).text("Jeden")
        else if unit == 'week'
          $(this).text("Jede")
        else
          $(this).text("Jedes")
  
  $("#recurring_frequency").change ->
    freq = $(this).val()
    
    $("#recurring_unit option").each ->
      if $(this).val() == "week"
        if freq == '1'
          $(this).text("Woche")
        else
          $(this).text("Wochen")
      if $(this).val() == "day"
        if freq == '1'
          $(this).text("Tag")
        else
          $(this).text("Tage")
      if $(this).val() == "month"
        if freq == '1'
          $(this).text("Monat")
        else
          $(this).text("Monate")
          
  $("#recurring_frequency").trigger("change")
  $("#recurring_unit").trigger("change")