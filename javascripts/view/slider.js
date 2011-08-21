DS.Slider = SC.View.extend({
  title: '',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  unit: '',

  classNames: ['slider'],

  defaultTemplate: SC.Handlebars.compile(
    '<span class="label">{{title}}: {{value}}{{unit}}</span> <input type="range" {{bindAttr min="min" max="max" step="step" value="value"}}>'
  ),

  change: function() {
    SC.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    var value = this.$('input').val();
    SC.set(this, 'value', value);
  }
});
