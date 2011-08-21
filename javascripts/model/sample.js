/**
 * An audio sample, which can be played.
 */
DS.Sample = SC.Object.extend({

  src: null,

  loaded: false,

  init: function() {
    var audio = new Audio(this.src);
    this.audio = audio;
    this.retryCount = 0;
    var self = this;

    audio.addEventListener('progress', onProgress, false);
    audio.addEventListener('error', onError, false);
    audio.load();

    function onProgress() {
      if(audio.networkState == HTMLMediaElement.NETWORK_IDLE) {
        self.set('loaded', true);
        audio.removeEventListener('progress', onProgress, false);
      }
    }
    function onError() {
      if(self.retryCount < 2) {
        if(console) console.warn("Couldn't load audio '" + audio.src + "', retrying...");
        // This shouldn't be necessary, but Safari randomly fails to load some samples.
        // I guess I might be requesting too many samples at the same time? But it's arguably
        // a bug in Safari because Chrome and Firefox seem to work fine without this retry system.
        self.retryCount++;
        audio.load();
      } else {
        if(console) console.error("Failed to load audio '" + audio.src + "': " + audio.error);
      }
    }
  },

  play: function(volume) {
    if(volume == null) volume = 1;
    console.log(DS.transport.get('volume'));
    volume *= DS.transport.get('volume'); // scale by global volume
    var audio = this.audio;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }

});

(function() {
  var audio = new Audio();
  if(audio.canPlayType('audio/ogg')) DS.Sample.filetype = '.ogg';
  if(audio.canPlayType('audio/mp3')) DS.Sample.filetype = '.mp3';
})();

DS.Sample.load = function(filename) {
  return DS.Sample.create({
    // Using a "convention over configuration" approach to locating audio. This could certainly be made configurable...
    src: 'audio/'+filename+DS.Sample.filetype
  });
};