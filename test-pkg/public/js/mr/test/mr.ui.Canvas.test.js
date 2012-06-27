/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Canvas Test cases
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
	 * Canvas
	 */
	module(ns.namespace + '.Canvas', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('canvas')));
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
		$(_el).append($('<div>').addClass(ns.cls('header')));
		$(_el).append($('<div>').addClass(ns.cls('body')));
		$(_el).append($('<div>').addClass(ns.cls('footer')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('ad')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('nav')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('content')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('player')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('creative')));
		
		var _face = 'PC';
		var _controller = (_face === 'SP') ? new ns.root.controller.MobileController() : new ns.root.controller.Controller();
		
		var _view = new ns.Canvas({
			controller	: _controller,
			el	 		: _el
		}).render();
		
		equal(typeof(_view.header), 'object', 'new Header()');
		equal(typeof(_view.body), 'object', 'new body()');
		equal(typeof(_view.footer), 'object', 'new footer()');
		equal(typeof(_view.theme), 'object', 'new theme()');
		
		_body.removeChild(_el);
	});

})(mr.ui);