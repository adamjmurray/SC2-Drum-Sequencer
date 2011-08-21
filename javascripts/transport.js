/**
 * The Transport is the controller for the application.
 * It manages playback via a setInterval()-based scheduler, and controls playback-related state such as volume.
 */
DS.Transport = SC.Object.extend({

  playing: false,

  currentStep: -1,

  pattern: null,

  bpm: 120,

  _bpmChanged: false,

  volumePercentage: 25,


  period: function() {
    return 60000/this.bpm;
  }.property('bpm').cacheable(),


  volume: function() {
    var volume = this.volumePercentage/100;
    if(volume < 0) return 0; // We enforce a range because firefox doesn't support the range input, so you can enter invalid values.
    if(volume > 1) return 1; // Actually, we probably should make sure volume is actually a number...
    return volume;
  }.property('volumePercentage').cacheable(),


  play: function() {
    if(!this.playing) {
      this.set('currentStep', -1);
      this.set('playing', true);
      this._scheduleStepping();
    }
  },


  stop: function() {
    if(this.playing) {
      clearInterval(this.scheduler);
      this.schedulerer = null;
      this.set('currentStep', -1);
      this.set('playing', false);
    }
  },


  toggle: function() {
    if(this.playing) {
      this.stop();
    } else {
      this.play();
    }
  },


  step: function() {
    var step = (this.currentStep+1)%this.pattern.stepCount;
    this.set('currentStep', step);
    this.pattern.tracks.forEach(function(track) {
      track.steps[step].trigger();
    });
    if(this._bpmChanged) this._scheduleStepping();
  },


  _scheduleStepping: function() {
    if(this.scheduler) clearInterval(this.scheduler);
    var self = this;
    this.scheduler = setInterval(function(){self.step()}, this.get('period')/4);
    // we divide period by 4 to make each step 1/4 of a beat
    this._bpmChanged = false;
  },


  _bpmWatcher: function(obj, field, value) {
    var bpm = value;
    if(bpm < DS.Transport.MIN_BPM) this.set('bpm', DS.Transport.MIN_BPM);
    if(bpm > DS.Transport.MAX_BPM) this.set('bpm', DS.Transport.MAX_BPM);
    this._bpmChanged = true;
  }.observes('bpm')

});


DS.Transport.MIN_BPM = 30
DS.Transport.MAX_BPM = 240
