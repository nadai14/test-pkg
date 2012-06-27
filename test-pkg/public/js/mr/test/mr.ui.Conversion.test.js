/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Conversion Test cases
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
	 * Conversion
	 */
	module(ns.namespace + '.Conversion', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('conversion')));
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
		var _content = new ns.root.model.Content({
			//"conversion": 'conversion.render()'
		});
		
		var _view = new ns.Conversion({
			model: _content,
			el:    _el
		}).render();
		
		if(_content.has('conversion')) {
			equal($(_view.el).html(), _content.get('conversion'), "has('conversion') == true");
		}else{
			equal($(':hidden', _view.el).length>0, !_content.has('conversion'), "has('conversion') == "+_content.has('conversion')+"; _view.hide()");
		}
		_body.removeChild(_el);
	});

})(mr.ui);