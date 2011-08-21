DS.StepView = SC.View.extend({

  templateName: 'step',

  tagName: 'li',

  classNames: ['step'],

  classNameBindings: ['content.active']

});