/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Complete Test cases
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
	 * Complete
	 */
	module(ns.namespace + '.Complete', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('complete')));
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
		$(ns.slctr('complete')).append($('<div>').addClass(ns.cls('next')));
		$(ns.slctr('complete')).append($('<div>').addClass(ns.cls('title')));
		$(ns.slctr('title')).append($('<b>'));
		
		var _face = 'PC';
		var _controller = (_face === 'SP') ? new ns.root.controller.MobileController() : new ns.root.controller.Controller();
		
		var _view = new ns.Complete({
			controller: _controller,
			model	  : new ns.model.Complete({
				//"conversion_tag" : '',
				"client_url"	 : 'http://127.0.0.1'
			}),
			el	 	  : _el
		}).render();
		
		equal($(ns.slctr('title') + ' b').text(), 'アンケートが完了しました。次のボタンを押してポイントを獲得して下さい。', ns.cls('title')+".text: アンケートが完了しました。次のボタンを押してポイントを獲得して下さい。");
		equal($('a', _view.next.el).attr('href'), 'http://127.0.0.1', '<a>.href: ' + $(_view.next.el).find('a').attr('href'));
		
		//_body.removeChild(_el);
	});

})(mr.ui);