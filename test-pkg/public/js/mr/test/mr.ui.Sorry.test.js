/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Sorry Test cases
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
	 * Sorry
	 */
	module(ns.namespace + '.Sorry', {
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
			"title":	'Sorry_title',
			"message":	'Sorry_message',
			"back":		'#'
		});
		var _view = new ns.Sorry({
			model:	_model,
			el:    	$(ns.slctr('sorry'))
		}).render();
		
		equal($(ns.slctr('title') + ' b',_view.el).text(), 'Sorry_title', 'title: Sorry_title');
		equal($(ns.slctr('message'),_view.el).text().replace(/\s+/g,''), 'Sorry_message', 'message: Sorry_message');
		equal($(ns.slctr('button') + ' a',_view.el).attr('href'), '#', 'back: #');
		
		//_body.removeChild(_el);
	});

})(mr.ui);