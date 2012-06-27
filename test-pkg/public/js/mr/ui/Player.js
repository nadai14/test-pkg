/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Player.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $, ua){
	ns.Player = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Player'), 
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
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "hide", "show", "render", "_render");
			// keep this
			var _self = this;
			
			// setup attributes
			$(this.el)
				// .attr('poster', 'images/poster-pc.jpg')
				.addClass('video-js')
				.addClass('vjs-default-skin')
				.attr('controls', 'controls')
				.attr('id', 'vs-player1')
				;
			
			// video.js
			_V_.options.flash.swf = "js/libs/video-js/video-js.swf";
			_V_.options.techOrder = (ns.player) ? [ns.player] : (ua.OS === 'Android') ? ["flash"] :  ["html5"];
			_V_.options.techOrder = (ns.player) ? [ns.player] : ["html5"];
			var _player = _V_('vs-player1', { 
				"controls":   true, 
				"autoplay":   false, 
				"preload":    "none"
			}).ready(function() {
				_self.el     = this.tag.parentElement;
				_self.$el    = $(_self.el);
				_self.player = this;
				if('undefined' !== typeof(_self.onReady)){
					ns.trace('onReady');
					_self.onReady();
				}
				
				var _video = this.tag;
				// seeking event
				_video.addEventListener('seeking', function(e) {
					ns.trace('seeking');
				}, true);
				_video.addEventListener('seeked', function(e) {
					ns.trace('seeked');
				}, true);
			});
			
			_player.addEvent('play', function(e) {
				ns.trace('play');
				
				_self.model.get('ad').set({
					"playing": true
				});
			});
			_player.addEvent('loadstart', function(e) {
				ns.trace('loadstart');
			});
			_player.addEvent('loadedmetadata', function(e) {
				ns.trace('loadedmetadata');
			});
			_player.addEvent('progress', function(e) {
				ns.trace('progress');
			});
			_player.addEvent('pause', function(e) {
				ns.trace('pause');
				if(_player.currentTime() < _player.duration() ) {
					if(!_self.model.get('ad').get('ended')) { 
						ns.alert('動画を最後まで再生してアンケートにお答えください');
						_player.play();
					}
				}
			});
			_player.addEvent('durationchange', function(e) {
				ns.trace('durationchange');
			});
			_player.addEvent('timeupdate', function(e) {
				ns.trace('timeupdate');
			});
			_player.addEvent('ended', function(e) {
				ns.trace('ended');
				_self.model.get('ad').set({
					"ended": true
				});
				if(ua.OS === "iPhone/iPod"){
					$('video').get(0).webkitExitFullscreen();
				}
			});
			_player.addEvent('error', function(e) {
				alert(e.type.detail);
				ns.trace(e.type.detail);		
				for(p in e.type) {
					ns.trace(p);
				}
			});
					
			// set event handler if model exists
			if(this.model) {
				this.model.on('change:campaign', this.render, this);
			}
		},
		/**
		 * render
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			var _self = this;
			
			// remove template
			if($(_self.el).hasClass(ns.cls('template'))) {
				$(_self.el).removeClass(ns.cls('template'));
			}
			
			if('undefined' === typeof(_self.player)) {
				_self.onReady = function() {
					_self._render();
				};
			}else{
				_self._render();
			}
			return _self;
		},
		/**
		 * 
		 */
		_render: function(){
			ns.trace(this.typeName + '#_render()');
			
			if(this.model.has('campaign')) {
				var _campaign = this.model.get('campaign');
				if(_campaign.has('thumbnail')) {
					$('video', this.el).attr('poster', _campaign.get('thumbnail'));
				}
				if(_campaign.has('movie')) {
					ns.trace(this.typeName + '#_render():' + _campaign.get('movie'));
					
					/*
					this.player.src({
						type:'video/mp4',
						src: _campaign.get('movie')
					});
					*/
					// this.player.src(_campaign.get('movie'));
					$('video', this.el).attr('src', _campaign.get('movie')); // this.player.src(_campaign.get('movie')));
				}
			}
		},
		/**
		 * 
		 */
		show:          function() {
			ns.trace(this.typeName + '#show()');
			
			// @TODO select correct element
			$('.video-js').show();
			return this;
		},
		/**
		 * 
		 */
		hide:          function() {
			ns.trace(this.typeName + '#hide()');
			
			// @TODO select correct element
			$('.video-js').hide();
			return this;
		},
	});
})(mr.ui, mr.$, mr.ua);