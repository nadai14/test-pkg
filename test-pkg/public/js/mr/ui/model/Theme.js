/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Theme view model class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Theme.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (Fri, 22 Jun 2012) $
 *
 */
(function(ns){
	ns.Theme = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Theme'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"css":    null,
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
		}
	});
})(mr.ui.model);
