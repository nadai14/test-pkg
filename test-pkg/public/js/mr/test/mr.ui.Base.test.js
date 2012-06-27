/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Base Test cases
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
	 * Base
	 */
	module(ns.namespace + '.Base', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('Base')));
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
		
		var _view = new ns.Base({
			el:    _el
		}).render();
		 
		equal('','');
		_body.removeChild(_el);
	});
	
	/**
	 * show()
	 */
	test('show()', function() {
		var _view = new ns.Base({
			el:    _el
		});
		base = _view.show();
		equal($(ns.slctr('Base')+":visible").length>=0, true, ns.slctr('Base')+" is visible");
		_body.removeChild(_el);
	});
	/**
	 * hide()
	 */
	test('hide()', function() {
		var _view = new ns.Base({
			el:    _el
		});
		base = _view.hide();
		equal($(ns.slctr('Base')+":hidden").length>=0, true, ns.slctr('Base')+" is hidden");
		_body.removeChild(_el);
	});

	/**
	 * cloneTemplate()
	 */
	test('cloneTemplate()', function() {
		
		$('<div>')
			.addClass('clear-type')
			.addClass('mr-ui-template')
			.appendTo($(ns.slctr('Base')));
		
		var _view = new ns.Base({
			el:    _el
		});
		_div = _view.cloneTemplate('.clear-type');
		equal(_div != null, true, 'cloneTemplate()');
	});
})(mr.ui);