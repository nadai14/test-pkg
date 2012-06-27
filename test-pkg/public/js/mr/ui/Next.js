/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Next.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Next = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Next'), 
		/**
		 * 
		 */
		tagName:    'button',
		/**
		 * 
		 */
		className:  ns.cls('next'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// 
			var _self = this;
			// initialize
			if(!$(this.el).hasClass(ns.cls('next'))) {
				$(this.el).addClass(ns.cls('next'))
			}
			// events 
			$(this.el).click(function(){
				_self.trigger('click');
			});
			// bind events
			this.model.on('change', this.render, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			// render
			$(this.el).text(this.model.get('title'));
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);