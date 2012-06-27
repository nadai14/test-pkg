/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Ad class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Ad.js 308 2012-06-22 01:25:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 10:25:15 +0900 (Fri, 22 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Ad = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Ad'), 
		/**
		 * 
		 */
		tagName:   'div',
		/**
		 * 
		 */
		className:  ns.cls('ad'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// set controller
			this.controller = options.controller;
			// bind events
			this.model.on('change', this.render, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			// 
			var _self = this;
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// render
			if(this.model.has('creative')) {
				$(this.el).html(
				new ns.Creative({ 
					controller: this.controller,
					model:      this.model,
					el:         $(ns.slctr('creative'), this.el)
				}).render().el);
			}else if(this.model.has('movie')) {
				new ns.PlayerME({ 
					controller: this.controller,
					model:      this.model,
					el:         $(ns.slctr('player'), this.el)
				}).render(function(e){
					// alert(e);
				});
			}
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);