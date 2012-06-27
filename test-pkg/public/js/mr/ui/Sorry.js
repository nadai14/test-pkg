/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Sorry class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Sorry.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (Fri, 22 Jun 2012) $
 *
 */
(function(ns, $){
	ns.Sorry = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Sorry'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('sorry'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
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
			$(this.el).html(this.template({
				"title":       this.model.has('title')       ? this.model.get('title') : '申し訳ございません',
				"description": this.model.has('description') ? this.model.get('description') : '',
				"back":        this.model.has('back')        ? this.model.get('back') : ''  
			}));
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);