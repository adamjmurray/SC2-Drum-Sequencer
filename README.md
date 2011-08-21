SproutCore2 Drum Sequencer 
==========================

This is a demo application I put together for the [SproutCore Demo App Hackathon](http://demohackathon.strobeapp.com/).


Usage
-----
   0. [Download and unzip the project](https://github.com/adamjmurray/SC2-Drum-Sequencer/zipball/master)

   0. Open the drum_sequencer.html file (for best results, use Chrome or Safari). You may need to give it a couple seconds to initialize.

   0. Click some buttons in the grid, and then press the "play" button (the triangle-shaped button under the "Playback Controls" section)


Features
--------
   * 4-track drum sequencer, backed by 4 audio samples in .mp3 and .ogg format (a kick drum, a snare, a high hat, and a clap sound).

   * Create 4-beat patterns with 16th note resolution (each beat is divided into 4 steps, for a total of 16 steps per track).

   * Pattern state is recorded in the URL hash, so you can save and reload your favorite patterns by bookmarking the URL.

   * Speed (BPM, aka beats per minute) and volume controls are provided.

   * The following [SproutCore 2](http://guides.sproutcore20.com/) features are demonstrated:
       
      * View templates and bindings. The main HTML file is beautiful in its simplicity.

      * Enumerable methods, like forEach() and map()

      * OO-style programming, making use of class extension

      * Computed properties. Some use the amazingly powerful '@each' feature for collections (check out how conveniently the URL hash is calculated in the models' serialized() methods)

      * Observers

      * Two-way bindings: the slider controls both get and set model state.
 
      * Custom view controls (see javascripts/view/slider.js)


Goals
-----
   * Build a pure HTML/CSS/JS drum sequencer (no Flash!) with [SproutCore 2](http://guides.sproutcore20.com/)

   * Use good MVC patterns

   * Use minimal markup and no graphics (just CSS)

   * Experiment with the latest HTML 5 features and don't worry too much about cross-browser compatibility.

   * Keep it simple. There's a ton more features I'd like to add (see below), but it's just a demo...


Browser Compatibility
---------------------
   * The demo runs best in WebKit-based browsers (Chrome and Safari). 

   * It works in Firefox, but I made use of the [range input](http://www.w3.org/wiki/HTML/Elements/input/range), which is not yet supported in Firefox. So these degrade to a text input. It's not as nice, but it works.

   * It doesn't work in IE. I think there's a minor bug in the audio playback system (which has nothing to do with SproutCore), but I didn't care enough to debug it. The main UI works, so you can still see that SproutCore is a great platform for cross-browser development.

   * It doesn't work in iOS. Probably another issue with audio playback that could be sorted out. Again, the SproutCore-based features like the UI all seem to work fine...


Caveats
-------
JavaScript wasn't designed for realtime music applications. You will _not_ get perfect timing. I wouldn't actually write music with an app like this. But it's fun and shows where web technology may take us in the future. 

If someone knows a better way to write a schedulerer in JavaScript besides using setInterval() (maybe with web workers?), let me know!


Ideas for Features & Improvements
---------------------------------
Want to build on this demo and make it better? Here's some ideas:

   * The app needs to load the audio samples before it becomes responsive. It would have been nice to have an initialization view that shows loading progress and hides the main UI until it is ready.

   * Fix the cross-browser compatibility problems.

   * Remember all application state (BPM, volume, etc) in the URL hash.

   * The app loads an audio sample for every step in the grid. This increases start-up time, and won't scale up. It would be better to have a set number of samples (aka "voices") per track. Then we could use a round-robin strategy to select a sample during playback. I'd default to 4, or maybe 8, samples per track. Bonus points for making the number of samples per track configurable.

   * Provide per-track volume controls, perhaps via a slider on the side of each track.

   * Provide per-step volume controls. I was thinking if you click near the top of a button in the grid, the step would be louder than if you click near the bottom. You could use a color coding strategy as a volume indicator, like red is loud, blue is quiet.


License
-------
Meh... I don't care. I built this for the experience. So do whatever you want. Let's say this code is released under the [MIT license](http://www.opensource.org/licenses/mit-license.php). 

If you do something cool with this app, shoot me a note on github. Some credit would be nice too :)

-----------------
Adam Murray, 2011