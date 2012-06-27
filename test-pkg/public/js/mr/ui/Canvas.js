/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Canvas class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Canvas.js 252 2012-06-20 01:33:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 10:33:15 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Canvas = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Canvas'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('canvas'),
		
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			
			// 
			this.controller = options.controller;
			
			// header 
			this.header     = new ns.Header({ 
				model:        this.model,
				el:           $(ns.slctr('header'), this.el)
			});
			// body
			this.body       = new ns.Body({
				controller:   this.controller,
				model:        this.model, 
				el:           $(ns.slctr('body'), this.el)
			});
			// footer
			this.footer     = new ns.Footer({ 
				model:        this.model,
				el:           $(ns.slctr('footer'), this.el)
			});
			//theme
			this.theme      = new ns.Theme({
				controller:   this.controller,
				model:        this.controller.models.theme,
				header:       this.header,
				footer:       this.footer
			}).render();
			// catch player event & cascade
			this.body.on('play:ad', function(e) { 
				this.trigger('play:ad'); 
			}, this);
			this.body.on('click:next', function(e) {
				this.trigger('click:next');
			}, this);
		},

		/**
		 * Render
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			return this;
		},
		
	});
	
})(mr.ui, mr.$);