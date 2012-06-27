/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Body Test cases
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
	 * Body
	 */
	module(ns.namespace + '.Body', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('body')));
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
		_face = 'PC';
		var _controller = (_face === 'SP') ? new ns.root.controller.MobileController() : new ns.root.controller.Controller();
		var _view = new ns.Body({
			controller:	_controller,
			el	 :		_el
		}).render();
		
		equal(typeof(_view.ad), 'object', 'new Ad()');
		equal(typeof(_view.nav), 'object', 'new Nav()');
		equal(typeof(_view.content), 'object', 'new Content()');
		_body.removeChild(_el);
	});

})(mr.ui);