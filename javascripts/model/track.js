/**
 * A collection of Steps.
 */
DS.Track = SC.Object.extend({

  name: '',

  steps: [],

  /**
   * Serialized value of track, which goes into the URL hash
   */
  serialized: function() {
    var hexdigit = 0;
    var str = '';
    this.steps.forEach(function(step, index) {
      if(step.active) hexdigit += Math.pow(2, 3-(index % 4));
      if(index % 4 == 3) {
        str += hexdigit.toString(16);
        hexdigit = 0;
      }
    });
    return str;
  }.property('steps.@each.active').cacheable(),


  deserialize: function(str) {
    for(var i=0, l=str.length; i<l; i++) {
      var stepOffset = i*4;
      var hexdigitAsBinary = parseInt(str.charAt(i), 16).toString(2); // convert a single hex digit to binary
      while(hexdigitAsBinary.length < 4) hexdigitAsBinary = '0' + hexdigitAsBinary;

      for(var j=0, k=hexdigitAsBinary.length; j<k; j++) {
        var active = (hexdigitAsBinary.charAt(j) == '1');
        this.steps[stepOffset + j].set('active', active);
      }
    }
  }

});

DS.Track.setup = function(sampleFilename, numSteps) {
  var steps = [];
  for(var i=0; i<numSteps; i++) {
    steps[i] = DS.Step.create({
      sample: DS.Sample.load(sampleFilename) // load a separate copy of the same for each step, to avoid cutting off sounds...
    });
  }
  var track = DS.Track.create({
    name: sampleFilename,
    steps: steps
  });
  return track;
}