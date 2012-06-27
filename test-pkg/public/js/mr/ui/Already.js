/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Already.js 305 2012-06-21 14:48:40Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-21 23:48:40 +0900 (Thu, 21 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Already = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Already'), 
		/**
		 * 
		 */
		tagName: 'div',
		/**
		 * 
		 */
		className: ns.cls('already'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			 
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
			$(this.el).html(this.template({
				title:            this.model.get('title'),
				social:           this.model.get('social'),
				client_url:       this.model.get('client_url')
			}));
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);