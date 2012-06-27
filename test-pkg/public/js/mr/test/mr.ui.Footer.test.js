/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Footer Test cases
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
	 * Footer
	 */
	module(ns.namespace + '.Footer', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			//$(_el).append($('<div>').addClass(ns.getCssClassName('footer')));
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
		
		var _view = new ns.Footer({
			//model: _content,
			el:    $('footer')
		}).render();
		
		if($('img', this.el).exists()){
			//TODO
			equal('', '', "TODO: $('img', this.el).exists()");
		}else{
			equal($('footer p').text(), '© xxxxxxxxxxxxxx. All Rights Reserved.', 'footer: © xxxxxxxxxxxxxx. All Rights Reserved.');
		}
		
		_body.removeChild(_el);
	});

})(mr.ui);