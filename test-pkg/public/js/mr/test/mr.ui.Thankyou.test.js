/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Thankyou Test cases
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
	 * Thankyou
	 */
	module(ns.namespace + '.Thankyou', {
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
			"point":	1,
			"message":	'Thankyou_message',
			"client_url":'http://127.0.0.1'
		});
		var _view = new ns.Thankyou({
			model:	_model,
			el:    	$(ns.slctr('thankyou'))
		}).render();
		
		equal($(ns.slctr('title') + ' b',_view.el).text(), 'おめでとうございます！', 'title: おめでとうございます！');
		equal($(ns.slctr('description') + ' p',_view.el).text(), _model.get('point') + ' ポイントをプレゼントいたします。', 'point: 1  ポイントをプレゼントいたします。');
		equal($(ns.slctr('message'),_view.el).text().replace(/\s+/g,''), _model.get('message'), 'message: '+_model.get('message'));
		equal($(ns.slctr('conversion'), _view.el).text().replace(/\s+/g,''), _model.get('client_url'), 'client_url: ' + _model.get('client_url'));
		
	});

})(mr.ui);