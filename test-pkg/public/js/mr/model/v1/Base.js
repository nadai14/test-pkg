/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Base class
 *
 * This class is the base class of all classes of current namespace
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Base.js 303 2012-06-21 13:46:49Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-21 22:46:49 +0900 (Thu, 21 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $, ua){
  ns.Base = ns.root.model.Base.extend({
    /**
     * typeName of this class
     */
		typeName: ns.typeName('Base')
	});
  /**
   * overrides Backbone.sync
   * @see http://documentcloud.github.com/backbone/docs/backbone.html#section-162
   * @see https://github.com/documentcloud/backbone/blob/master/backbone.js#L1328 
   */
  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    // extends options
    var _options = _.extend({
      /**
       * data options
       */
      data: _.extend({
        //@link http://redmine.sunbi.co.jp/issues/1755
        terminal: (ns.terminal) ? 
                ns.terminal : 
                (ua.OS === "iPhone/iPod") ? 
                	'iPhone' :
                	(ua.OS === "Android") ?
                		'Android' : 
                  	'PC'
      }, (options.data || {})),
      /**
       * 
       * @param {Object} xhr
       * @param {Object} settings
       */
      beforeSend: function(xhr, settings) {
        ns.trace(ns.namespace + '#beforeSend:' + settings.type + "\t" + settings.url);
        
        //@link http://redmine.sunbi.co.jp/issues/1763
        //@see http://api.jquery.com/jQuery.ajax/
        //@see http://zeptojs.com#ajax
        xhr.setRequestHeader("X-Requested-By","poncan-moviereward");
        // call original 
        if('function' === typeof(options.beforeSend)) {
          return options.beforeSend.call(xhr, settings);
        }
        
        // return true;
        return true;
      }
    }, options);
    
    // call original
    var _result = _sync(method, model, _options);
    //  
    return _result;
  };
  /**
	 * 
	 */
	ns.absUrl = function(base, path){
		ns.trace(ns.namespace + '#absUrl("' + base + '", "' + path + '")');
  	url = (new URI(path)).resolve(new URI(base));
    return url.toString();
	};
})(mr.model.v1, mr.$, mr.ua);