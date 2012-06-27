/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Complete class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Complete.js 327 2012-06-22 07:55:33Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 16:55:33 +0900 (Fri, 22 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Complete = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Complete'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('complete'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// set controller
			this.controller = options.controller;
			// countdown
			this.next      = new ns.Next({
				controller:  this.controller ,
				model:       this.controller.models.next,
				el:          $(ns.slctr('next'), this.el)
      });
			// setup template
			this.template = _.template($(this.el).html());
			// bind events
			this.model.on('change', this.render, this);
			this.next.on('click', function(){
				this.trigger('click:next');	
			}, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			var _self = this;
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			$(ns.slctr('title') + ' b', this.el).text('アンケートが完了しました。次のボタンを押してポイントを獲得して下さい。');
			
			var _html = 'ポイントをもらう';
			if(this.model.has('client_url')) {
				var _$p = $('<p>');
				var _$a = null; 
				if(this.model.has('conversion_tag')) {
					this.next.off('click');
					
					var _tag        = this.model.get('conversion_tag');
					var _client_url = this.model.get('client_url');
					mr.__conversion__ = function(){ 
						_self.controller.requestThankyouPage();
						mr.__conversion__ = false;
						$(_tag)
							.appendTo($(ns.slctr('conversion')).removeClass(ns.cls('template')));

						// callback late
						setTimeout(function(){
							mr.__conversion__ = true;
						}, 1000);
					};
					_$a = $('<a>')
					          	.attr('href', _client_url)
					          	.attr('target', '_blank')
					          	.attr('onclick', "javascript: " +
					          	                 "var _url  = this.href; " +
					          	                 "var _open = function(){ window.open(_url, '') }; " + 
					          	                 "mr.__conversion__(); " +
					          	                 "(function(){ " +
					          	                 "	var _callee = arguments.callee; " + 
					          	                 "	if(mr.__conversion__ === true){ _open(); delete mr.__conversion__; } " +
					          	                 "	else{ setTimeout(_callee, 1000); } " + 
					          	                 "})(); " +
					          	                 "return false;")
					          	.text(_html)
					          	;
				}else{
					_$a = $('<a>')
					          	.attr('href', this.model.get('client_url'))
					          	.attr('target', '_blank')
					          	.text(_html)
					          	;
				}
				_html = _$p.append(_$a).html();
				ns.trace(_html);
			} 
			
			$(this.next.render().el).html(_html);
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);