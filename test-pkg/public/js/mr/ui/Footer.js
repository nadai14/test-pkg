/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Footer class
 *
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Footer.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){

	ns.Footer = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Footer'), 
		/**
		 * 
		 */
		tagName: 'div',
		/**
		 * 
		 */
		className: ns.getCssClassName('footer'),
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
		 * render method 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// remove template class
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			 if($('img', this.el).exists()) {
			 	ns.trace($('img', this.el).get(0).readyState);
      	if (_url = $(this.el).css('background-image').match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
      		ns.trace(this.typeName + '#render():' + _url);
    			$(this.el).css('background-image', 'none');
    			$('img', this.el).attr('src', _url);
    			$(this.el).show();
				}
			}else{
				// render
				$(this.el).html(this.template({
					footer : ''
				}));
			}
			
			// return
			return this;
		},
		/**
		 * 
		 */
		_render:   function() {
			
		}
	});
	
})(mr.ui, mr.$);