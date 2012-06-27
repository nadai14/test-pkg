/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Next Test cases
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
	 * Next
	 */
	module(ns.namespace + '.Next', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('next')));
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
		
		//$(ns.slctr('creative')).append($('<img>'));
		
		var _content = new ns.root.model.Content({
			"title": 	'Next',
			"countdown":new Backbone.Model({
				//"finished": 'true'
			})
		});
		
		var _view = new ns.Next({
			model: _content,
			el:    _el
		}).render();
		
		if(_content.has('countdown')) {
			if(_content.get('countdown').get('finished')) {
				equal($(_view.el).attr('class').indexOf('countdown-counting')<0, true, 'class [countdown-counting] is not exist!');
				equal(typeof($(_view.el).attr('disabled')), 'undefined', '$(_view.el) not disabled');
			}else{
				equal($(_view.el).attr('class').indexOf('countdown-counting')>=0, true, 'class [countdown-counting] is exist!');
				equal($(_view.el).attr('disabled'), 'disabled', '$(_view.el) disabled');
			}
		}
		
		equal($(_view.el).text(), 'Next', '$(ns.Next.el).text(): Next');
		
		//_body.removeChild(_el);
	});
	
	/**
	 * startCountDown()
	 */
	test('startCountDown()', function() {
		
		var _content = new ns.root.model.Content({
		});
		
		var _view = new ns.Next({
			model: _content,
			el:    _el
		});
		
		//_view.startCountDown();
		equal('', '', 'TODO: startCountDown()');
	})
})(mr.ui);