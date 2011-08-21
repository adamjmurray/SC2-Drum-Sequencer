/**
 * A drum pattern, which consists of a collection of tracks.
 */
DS.Pattern = SC.Object.extend({

  tracks: [],

  stepCount: 0,

  transport: null,


  init: function() {
    this.set('transport', DS.Transport.create({pattern: this}));
  },


  stepAt: function(trackIndex, stepIndex) {
    return this.tracks[trackIndex].steps[stepIndex];
  },


  /**
   * Serialized value of the pattern, which goes into the URL hash
   */
  serialized: function() {
    var str = null;
    this.tracks.forEach(function(track) {
      if(str == null) {
        str = '';
      } else {
        str += '|';
      }
      str += track.get('serialized');
    });
    return str;
  }.property('tracks.@each.serialized').cacheable(),


  deserialize: function(str) {
    var tracks = this.tracks;
    str.split('|').forEach(function(serializedTrack,index){
      tracks[index].deserialize(serializedTrack);
    });
  },


  _onSerializedChange: function(obj, field, value) {
    var baseHref = location.href.split('#')[0];
    location.replace(baseHref + '#' + value); // use location.replace to avoid creating a ton of back button history during app usage
  }.observes('serialized')


});

DS.Pattern.setup = function(sampleFilenames, numSteps) {
  var tracks = sampleFilenames.map(function(sampleFilename) {
    return DS.Track.setup(sampleFilename, numSteps);
  });
  return DS.Pattern.create({tracks: tracks, stepCount: numSteps});
}
