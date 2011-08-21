/**
 * Customizes SC.Button to allow for the element title to be specified, so we can have tooltips.
 */
DS.Button = SC.Button.extend({
  title: '',
  attributeBindings: ['title']
});
