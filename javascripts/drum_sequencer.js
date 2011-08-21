// The application namespace is DS, for Drum Sequencer
DS = SC.Application.create();


$(document).ready(function() {

  // Initialize the model (which will automatically initialize the view as well)
  DS.pattern = DS.Pattern.setup(['kick', 'snare', 'hat', 'clap'], 16);
  DS.transport = DS.pattern.transport;

  var serializedPattern = location.hash.slice(1);
  if(serializedPattern) DS.pattern.deserialize(serializedPattern);

  // Setup keyboard shortcuts
  document.onkeyup = function(e) {
    if(e.keyCode >= 65 && e.keyCode <= 90) DS.pattern.transport.toggle(); // play/stop on each press of an alphabetic key
  };

});

