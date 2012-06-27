/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Nav Test cases
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
	 * Nav
	 */
	module(ns.namespace + '.Nav', {
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
		_model = new ns.root.model.Content({
			//"title":		'Landing_title',
			//"description":	'Landing_description'
		});
		var _view = new ns.Nav({
			model:	_model,
			el:    	$(ns.slctr('nav'))
		}).render();
		
		_message = $(ns.slctr('nav')+' p').text();
		
		if(_model.has('complete')){
			equal(_message, 'アンケートの回答は完了しています。', "has('complete'): アンケートの回答は完了しています。");
		}else{
			if(_model.has('page')){
				equal(_message, _model.get('page').get('questions').at(0).get('num')+'/'+_model.get('page').get('question_cnt'), "has('page'): /");
			}else{
				if(_model.get('parameter').get('already')){
					equal(_message, 'アンケートの回答は完了しています。', "has('already'): アンケートの回答は完了しています。");
				}else{
					if((_model.get('ad').get('playing') && (ns.face === 'PC'))){
						equal(_message, _model.get('countdown').get('count'), "has('playing'): " + _model.get('countdown').get('count'));
					}else if((_model.get('ad').get('playing') && (ns.face === 'SP'))){
						equal(_message, '動画の視聴が完了していません', "has('playing'): 動画の視聴が完了していません");
					}else{
						equal(_message, '再生ボタンを押して下さい', "再生ボタンを押して下さい");
					}
				}
			}
		}
		
		//_body.removeChild(_el);
	});

})(mr.ui);