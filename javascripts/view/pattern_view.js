/**
 * The pattern view displays the list of tracks,
 * and manages the "highlight bar" that travels over the pattern grid to indicate the current step.
 */
DS.PatternView = SC.View.extend({

  templateName: 'pattern',

  classNames: ['pattern'],

  pattern: null,

  /**
   * Fields to control the dynamic appearance of the "highlight bar" that shows the current step on the pattern.
   */
  highlightLeft: -1,
  highlightVisibility: null,
  highlightStyle: null,

  _calculateHighlightStyle: function() {
    this.set('highlightStyle', 'left:'+this.highlightLeft+'px;visibility:'+this.highlightVisibility+';');
  },

  _watchCurrentStep: function(object, field, value) {
    if(value < 0) value = 0; // the transport uses -1 as the current step when not playing, but we still want to position the highlight on the first step
    var currentStepView = this.$('.track:first-child .step:nth-child(' + (value+1) + ')'); // css nth-child counts from 1
    if(currentStepView.length) this.set('highlightLeft', currentStepView.position().left - 5);
    SC.run.once(this, this._calculateHighlightStyle);
  }.observes('pattern.transport.currentStep'),

  _watchPlaying: function(object, field, value) {
    if(this.highlightLeft < 0) this._watchCurrentStep(null,null,0); // initialize position for first time playback (probably there's a better way to handle this?)
    this.set('highlightVisibility', (value ? 'visible' : 'hidden'));
    SC.run.once(this, this._calculateHighlightStyle);
  }.observes('pattern.transport.playing')

});