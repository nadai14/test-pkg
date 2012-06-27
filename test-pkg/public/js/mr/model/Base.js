/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Base class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Base.js 152 2012-06-11 13:37:05Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-11 22:37:05 +0900 (Mon, 11 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.Base = Backbone.Model.extend({
		/**
		 * 
		 */
		urlRoot: ns.api,
		/**
		 * get 
		 */
		get: function(attribute) {
			ns.trace(this.typeName + '#get(\"' + attribute + '\")');
			
      return Backbone.Model.prototype.get.call(this, attribute);
    }
  });
})(mr.model);