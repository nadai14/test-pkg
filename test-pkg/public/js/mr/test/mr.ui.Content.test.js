/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Content Test cases
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
	 * Content
	 */
	module(ns.namespace + '.Content', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('content')));
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
		mr.model.v1.api = '../../../../api/v1';
		$(_el).append($('<div>').addClass(ns.cls('landing')));	
		var _face = 'PC';
		var _controller = (_face === 'SP') ? new ns.root.controller.MobileController() : new ns.root.controller.Controller();
		_controller.campaign('1');
		_controller.models.content.set({ 
			"view":        ns.root.ui.Landing,
			"model":       _controller.models.landing,
			"selector":    ns.root.ui.slctr('landing')
		});
		var _view = new ns.Content({
			controller: _controller,
			model:	_controller.models.content,
			el	 :  _el
		}).render();
		
		//TODO
		equal('', '', 'TODO');
		//equal($(ns.slctr('title')+' b').text(),'おめでとうございます！', '{{title}}: おめでとうございます！');
		
		_body.removeChild(_el);
	});

})(mr.ui);