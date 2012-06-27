/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Landing Test cases
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
	var _body;
	var _el;
	/**
	 * Landing
	 */
	module(ns.namespace + '.Landing', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			if('undefined' !== typeof(_body)) {
				_body.appendChild(_el);
			}
		},
		teardown: function() { // 終了処理
			if('undefined' !== typeof(_el)) {
				if('undefined' !== typeof(_body)) {
					// _body.removeChild(_el);
				}
			}
		}
	});
	
	/**
	 * render()
	 */
	test('render()', function() {
		_model = new Backbone.Model({
			"title":		'Landing_title',
			"description":	'Landing_description'
		});
		var _view = new ns.Landing({
			model:	_model,
			el:    	$(ns.slctr('landing'))
		}).render();
		
		equal($(ns.slctr('title')+' b',_view.el).text(), 'Landing_title', 'title: Landing_title');
		equal($(ns.slctr('description')+' p',_view.el).text(), 'Landing_description', 'description: Landing_description');
		
		//_body.removeChild(_el);
	});

})(mr.ui);