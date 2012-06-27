/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Creative Test cases
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
	 * Creative
	 */
	module(ns.namespace + '.Creative', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('creative')));
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
		
		$(ns.slctr('creative')).append($('<img>'));
		
		var _model = new ns.root.model.Content({
			"campaign": new Backbone.Model({
				'second_picture': '../../../images/poster-pc.jpg'
			})
		});
		
		var _view = new ns.Creative({
			model: _model,
			el:    _el
		}).render();
		
		if(_model.has('campaign')) {
			equal($('img', _view.el).attr('src'), _model.get('campaign').get('second_picture'), "campaign:{'second_picture':'../../../images/poster-pc.jpg'}");
		}else{
			equal($(':hidden', _view.el).length>0, !_model.has('campaign'), "has('campaign') == "+_model.has('campaign')+"; _view.hide()");
		}
		
		//_body.removeChild(_el);
	});

})(mr.ui);