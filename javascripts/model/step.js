/**
 * A single step in the drum sequencer, which can trigger an audio sample.
 */
DS.Step = SC.Object.extend({

  sample: null,

  active: false,

  toggle: function() {
    this.set('active', !this.active);
  },

  trigger: function() {
    if(this.active) {
      this.sample.play(this.volume);
    }
  }

});
