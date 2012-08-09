(function() {
  var bin, commandline, div, error, history, js, ls, span;

  history = 0;

  error = function(cmd) {
    return cmd + ': command not found';
  };

  ls = function() {
    return localStorage.length;
  };

  js = function() {
    var h, json, url;
    url = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo&callback=?';
    h = history;
    json = $.getJSON(url, function(data) {
      var r;
      r = $('#r' + h);
      return r.text($.param(data.earthquakes[0]));
    });
    json.error(function() {
      var r;
      r = $('#r' + h);
      return r.text('error!');
    });
    return 'running...';
  };

  bin = {
    ls: ls,
    dir: ls,
    js: js
  };

  span = $('<span/>');

  div = $('<div/>');

  commandline = function() {
    var c;
    c = div.clone().attr('id', 'a' + history).append(span.clone().text('$ '));
    c.append(span.clone().attr('id', 'h' + history));
    return c;
  };

  $(function() {
    var debug;
    debug = div.clone().append(commandline());
    $('#sandbox').append(debug);
    return $('body').keypress(function(ev) {
      var c, code, command, f, l;
      code = ev.which;
      l = $('#h' + history);
      if (code === 13) {
        command = l.text();
        f = bin[command] || error;
        $('#a' + history).append(div.clone().attr('id', 'r' + history).text(f(command)));
        history += 1;
        debug.append(commandline());
        return $('#a' + (history - 10)).remove();
      } else {
        c = String.fromCharCode(code);
        l.text(l.text() + c);
        return command += c;
      }
    });
  });

}).call(this);
