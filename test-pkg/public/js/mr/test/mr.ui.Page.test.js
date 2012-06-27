/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Page Test cases
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
	 * Page
	 */
	module(ns.namespace + '.Page', {
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
		
		var _model = new ns.root.model.v1.Page({
			"enqs": 		1,
			"uuid": 		1,
			"wait_until": 	3,
			"title":		'title',
			"description":	'description',
			"questions": 	new ns.root.model.v1.Questions(),
		});
		
		var _view = new ns.Page({
			model: _model,
			el:    $(ns.slctr('page'))
		}).render();
		
		equal($(ns.slctr('title') + ' b', _view.el).text(), 'description', 'title: description');
		//TODO
		equal('', '', 'TODO');
		//_body.removeChild(_el);
	});
	
	/*
	 *  getValues()
	 */
	test('getValues()', function() {
		
		var _model = new ns.root.model.v1.Page({
			"enqs": 		1,
			"uuid": 		1,
			"wait_until": 	3,
			"title":		'title',
			"description":	'description',
			"questions": 	new ns.root.model.v1.Questions(),
		});
		
		var _view = new ns.Page({
			model: _model,
			el:    $(ns.slctr('page'))
		}).render();
		
		_getValues = _view.getValues();
		//TODO: getValues()
		equal('', '', 'TODO: getValues()');
	})
})(mr.ui);