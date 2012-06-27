/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 308 2012-06-22 01:25:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 10:25:15 +0900 (Fri, 22 Jun 2012) $
 *
 */
(function(ns, $, ua){
	ns.Campaign = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:    ns.typeName('Campaign'), 
		/**
		 * 
		 */
		idAttribute: "uuid",
		/**
		 * 
		 */
		url:         function() {
			ns.trace(this.typeName + '#url()');
			return ns.api + '/campaigns/' + this.get('uuid')  + '?v=' + (((1+Math.random())*0x10000000)|0).toString(16).substring(1); 
		},
		/**
     * fecth method
     * @param {Object} options
     */
    fetch:       function(options) {
    	ns.trace(this.typeName + '#fetch()');
			
			options || (options = {});
    	var _success    = options.success;
    	options.success = function(model, response) {
  			ns.trace(model.typeName + '#fetch()#success');
  			/**
  			 * resolve URL
  			 * @see http://redmine.sunbi.co.jp/issues/1777
  			 */
  			if(model.has('client_url')){
  				ns.trace(model.typeName + '#fetch()#success/1777');
  				var _url = model.get('client_url');
  				var _uid = ns.getParameter('uid');
  				if(_uid) {
  					_url   += ((_url.indexOf('?') < 0) ? '?' : '&') + 'uid=' + _uid;
  					model.set({
  						"client_url": _url
  					});
  				}
  			}
  			/**
  			 * resolve URL
  			 * @see http://redmine.sunbi.co.jp/issues/1881
  			 */
  			ns.trace(model.typeName + '#fetch()#success/1881');
  			var _attributes = ['css', 'movie', 'thumbnail', 'second_picure'];
  			for(var i = 0; i < _attributes.length; ++i){
  				var _attribute = _attributes[i];
  				if(model.has(_attribute)) {
						model.set(_attribute, ns.absUrl(ns.api, model.get(_attribute)));
					}	
  			}
  			/**
  			 * build description
  			 * @see http://redmine.sunbi.co.jp/issues/1880
  			 */
  			ns.trace(model.typeName + '#fetch()#success/1880');
  			model.set('description', _.template(model.get('description').replace('#{', '{{').replace('}', '}}'))({ 
  				"point": model.get('point')
				}));
				/**
				 * movie fallbacks
				 * @see http://redmine.sunbi.co.jp/issues/1910 
				 */
				if(model.has('movies')) {
					ns.trace(model.typeName + '#fetch()#success/1910');
					var _types = ['video/mp4', 'video/x-flv', 'application/x-mpegURL'];
					if(ua.OS === 'Android') {
						// @see http://code.google.com/p/swfobject/wiki/api#swfobject.hasFlashPlayerVersion(versionStr)
						if (swfobject.hasFlashPlayerVersion("9.0.18")) {
							// flash
					  	_types = ['video/x-flv', 'video/mp4'];
						}else{
					  	_types = ['video/mp4'];
						}
					}else if(ua.OS === 'iPhone/iPod') {
						_types = ['application/x-mpegURL', 'video/mp4'];	
					}else{
						_types = ['video/mp4', 'video/x-flv'];
					}
					// detect best format
					var _movies = model.get('movies');
					var _movies_sorted = Array();
					for(var t = 0; t < _types.length; ++t) {
						var _type = _types[t];
						for(var m = 0; m < _movies.length; ++m) {
							var _movie = _movies[m];
							if(_movie.type === _type) {
								// set main movie
								if(!model.has('movie')) {
									// set movie
									model.set({
										"movie": _movie
									});
								}
								// sort movie
								_movies_sorted.push(_movie);
							}
						}
					}
					model.set({
						"movies": _movies_sorted
					})
				}
  			// call original
  			if('function' === typeof(_success)) {
  				_success(model, response);
  			}
    	};
			return ns.Base.prototype.fetch.call(this, options);
		},
	});
})(mr.model.v1, mr.$, mr.ua);