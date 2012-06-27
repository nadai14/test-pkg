/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: PlayerME.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (Fri, 22 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $, ua){
	ns.PlayerME = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('PlayerME'), 
		/**
		 * default tag name of this view
		 */
		tagName:    'video',
		/**
		 * 
		 */
		className:  ns.cls('player'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "hide", "show", "render");
			
			// 
			this.controller = options.controller;
			
			// keep this
			var _self = this;
					
			// set event handler if model exists
			if(this.model) {
				this.model.on('change:campaign', this.render, this);
			}
		},
		/**
		 * render
		 */
		render: function(success){
			ns.trace(this.typeName + '#render()');
			var _self = this;
			// remove template
			if($(_self.el).hasClass(ns.cls('template'))) {
				$(_self.el).removeClass(ns.cls('template'));
			}
			
			// set source
			var _$video = $(this.el);
			// poster
			if(this.model.has('poster')) {
				// _$video.attr('poster', this.model.get('poster'));
			}
			// video
			if(this.model.has('movie')) {
				var _movies  = this.model.get('movies');
				var _movie   = this.model.get('movie');
				// set source (main)
				_$video.attr('type', _movie.type).attr('src', _movie.src);
				// fallback sources
				for(var m = 0; m < _movies.length; ++m) {
					var _movie   = _movies[m];
					var _$source = $('<source>')
						.attr('type', _movie.type)
						.attr('src', _movie.src)
						.appendTo(_$video);	
				}	
				// debug out put
				ns.trace(_$video.parent().html());
				// mediaelement
				var _player = $(this.el).mediaelementplayer({
					flashName:                'player.swf?v=20120622',
					features:                 ['playpause', 'current', 'duration', 'fullscreen'],
					loop:                     false,
					alwaysShowControls:       true,
					usePluginFullScreen:      true,
					enablePluginDebug:        false,
					// alwaysShowControls:       false,
  				// AndroidUseNativeControls: false,
					success:                  function (mediaElement, domObject) {
						if(0 < _self.model.get('movie').src.indexOf('flv')) {
							$('.mejs-overlay-play').css('display', 'nonde');
						}
						mediaElement.addEventListener('progress', function(e) {
							ns.trace('progress');
						}, false);
						mediaElement.addEventListener('loadedmetadata', function(e) {
							ns.trace('loadedmetadata');
						}, false);
						mediaElement.addEventListener('canplay', function(e) {
							ns.trace('canplay');
						}, false);
						mediaElement.addEventListener('timeupdate', function(e) {
							ns.trace('timeupdate');
							_self.controller.setAdCurrentTime(mediaElement.currentTime);
						}, false);
						mediaElement.addEventListener('play', function(e) {
							ns.trace('play');
							// mediaElement.setVideoSize($(document).width(), $(document).height());
							// mediaElement.enterFullScreen();
							if(ua.OS === 'Android') {
							}
						}, false);
						mediaElement.addEventListener('playing', function(e) {
							ns.trace('playing');
							_self.controller.setIsAdPlaying(true);
						}, false);
						mediaElement.addEventListener('pause', function(e) {
							ns.trace('pause');
							if(!_self.controller.getIsAdEnded()) {
								if(mediaElement.currentTime < mediaElement.duration ) {
									ns.alert('動画を最後まで再生してアンケートにお答えください');
									// mediaElement.play();
								}
							}
						}, false);
						mediaElement.addEventListener('seeking', function(e) {
							ns.trace('seeking');
						}, false);
						mediaElement.addEventListener('seeked', function(e) {
							ns.trace('seeked');
						}, false);
						mediaElement.addEventListener('ended', function(e) {
							ns.trace('ended');
							// end
							_self.controller.setIsAdEnded(true);
							// exit fullscreen
							if(ua.OS === "iPhone/iPod" || ua.OS === 'Android'){
								$(domObject).get(0).webkitExitFullscreen();
							}
						}, false);
						
						success(_self);
	        }
	    	});
			}
			return this;
		}
	});
})(mr.ui, mr.$, mr.ua);