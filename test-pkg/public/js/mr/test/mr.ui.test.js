/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.ui.*
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.ui.test.js 174 2012-06-14 03:34:17Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-14 12:34:17 +0900 (Thu, 14 Jun 2012) $ by $Author: tsuru $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
	var _body;
	var _el;
	module(ns.namespace + '.Player', {
		setup: function() { // 初期化処理
			_body = document.getElementsByTagName('body')[0];
		},	
	});
	/**
	 * Basic test 
	 */
	/*
	test('Basic Test', function() {
		var _el    = document.createElement('video');
		_body.appendChild(_el);
		
		
		var player = new ns.Player({
			el: _el
		});
		equal(player.typeName, ns.typeName('Player'));
		equal(player.$el.get(0).tagName.toLowerCase(), 'video'); 
		
		
		_body.removeChild(_el);
	});
	*/
	/**
	 * Question
	 */
	module(ns.namespace + '.Question', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('answer')));
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
	 * addLabel
	 */
	test('addLabel/addCheckbox/addRadio/addSelect/showResult', function() {
	/*
	**addLabel()
	*/
		var _question = new ns.root.model.Question({
			"answer": {content: 'a'},
		});
		
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}); /* .render(); */ // render() will call addLabel() inside itself.
		
		// LET'S It BE CLEAR. What will be tested?  
		equal(_view.addLabel($(ns.slctr('answer'), this.el),_question,'a',1));
		equal(_view.addLabel($(ns.slctr('answer'), this.el),_question,'ab',1));
	
	});
	
	test('addCheckbox/addRadio/addSelect/showResult', function() {
	/*
	**getValues()
	*/
	// prepare model
		var _question = new ns.root.model.Question({
			"kind": 'text'
		});
		// create model
	var _view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
	// simulate user innput
	$('input', _view.el).val('日本語');
	// test
	equal(_view.getValues()[0], '日本語');
	
	/*
	**validate()
	*/
	_question = new ns.root.model.Question({
			"kind": 'numeric'
		});
		// create model
	_view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
		// simulate user innput
	//$('input', _view.el).val('aaa');
		// test
	equal(_view.validate()[0], '入力した値は数値ではありません 。');
	
		$(ns.slctr('answer'), this.el).append('<br>');
	/*
	**addCheckbox
	*/
		_question = new ns.root.model.Question({
			"kind": 'checkbox',
			"choices": new Array({uuid:'1',content: 'Checkbox1'},{uuid:'2',content: 'Checkbox2'},{uuid:'3',content: 'Checkbox3'},{uuid:'4',content: 'Checkbox4'})
		});
	_view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
	//equal(_view.addCheckbox($(ns.slctr('answer'), this.el),_question));
	
	/*
	**addRadio()
	*/
	_question = new ns.root.model.Question({
			"kind": 'radio',
			"choices": new Array({uuid:'1',content: 'Radio1'},{uuid:'2',content: 'Radio2'},{uuid:'3',content: 'Radio3'},{uuid:'4',content: 'Radio4'}),
		});
	_view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
	//equal(_view.addRadio($(ns.slctr('answer'), this.el),_question));
	
	/*
	**addSelect()
	*/
	_question = new ns.root.model.Question({
			"kind": 'select',
			"choices": new Array({uuid:'1',content: 'Select1'},{uuid:'2',content: 'Select2'},{uuid:'3',content: 'Select3'},{uuid:'4',content: 'Select4'}),
		});
	_view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
	//equal(_view.addSelect($(ns.slctr('answer'), this.el),_question));
	
	/*
	**showResult()
	*/
		_question = new ns.root.model.Question({
			"kind": 'select'
		});
	_view = new ns.Question({
		model: _question,
		el:    _el
	}).render();
	equal(typeof(_view.showResult()),'undefined');
	});
		
// })(mr.initialize({api: 'http://demo.sunbi.co.jp/nci-201205/trunk/api/v1'}).ui);
})(mr.ui);