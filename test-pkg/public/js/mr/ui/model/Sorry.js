/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Sorry class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Sorry.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (Fri, 22 Jun 2012) $
 *
 */
(function(ns){
	ns.Sorry = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Sorry'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":       '申し訳ございません。',
			"description": '...',
			"back":        '#',
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
