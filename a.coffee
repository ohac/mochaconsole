history = 0

error = (cmd) ->
  cmd + ': command not found'

ls = ->
  localStorage.length

js = ->
  url = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo&callback=?'
  h = history
  json = $.getJSON url, (data) ->
    r = $('#r' + h)
    r.text($.param(data.earthquakes[0]))
  json.error ->
    r = $('#r' + h)
    r.text('error!')
  'running...'

bin =
  ls: ls
  dir: ls
  js: js

span = $('<span/>')
div = $('<div/>')

commandline = ->
  c = div.clone().attr('id', 'a' + history).append(span.clone().text('$ '))
  c.append(span.clone().attr('id', 'h' + history))
  c

$ ->
  debug = div.clone().append(commandline())
  $('#sandbox').append(debug)
  $('body').keypress (ev) ->
    code = ev.which
    l = $('#h' + history)
    if code == 13
      command = l.text()
      f = bin[command] || error
      $('#a' + history).append(div.clone().attr('id', 'r' + history).text(f(command)))
      history += 1
      debug.append(commandline())
      $('#a' + (history - 10)).remove()
    else
      c = String.fromCharCode(code)
      l.text(l.text() + c)
      command += c
