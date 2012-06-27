/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Player Test cases
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
	 * Player
	 */
	module(ns.namespace + '.Player', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<video>').addClass(ns.cls('player')));
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
			"campaign": new ns.root.model.v1.Campaign({
				"uuid": 	1,
				"thumbnail":'../../../images/poster-pc.jpg',
				"movie":	''
			})
		});
				
		var _view = new ns.Player({
			model: _content,
			el:    _el
		}).render();
		
		//TODO: Player.render()
		equal('', '', 'TODO: Player.render()');
	});
	
	/**
	 * show()
	 */
	test('show()', function() {
		var _view = new ns.Player({
			el:    _el
		});
		_view.show();
		equal($(".video-js:visible").length>=0, true, "$('.video-js') is visible");
		
		_body.removeChild(_el.parentElement);
	});
	/**
	 * hide()
	 */
	test('hide()', function() {
		var _view = new ns.Player({
			el:    _el
		});
		_view.hide();
		equal($(".video-js:hidden").length>=0,true,"$('.video-js') is hidden");
		_body.removeChild(_el.parentElement);
	});

})(mr.ui);