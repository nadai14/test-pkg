/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Question Test cases
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
	 * createLabel() ( refactored method of addLabel() )
	 */
	test('createLabel()', function() {
		var _question = new ns.root.model.Question({
			"answer": {content: 'a'},
		});
		
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}); /* .render(); */ // render() will call addLabel() inside itself.
		 
		var _label = _view.createLabel('TEST-LABEL', 'TEST-ID');
		equal(_label.get(0).tagName.toUpperCase(), 'LABEL');      // -- 1
		equal(_label.text(),                       'TEST-LABEL'); // -- 2
		equal(_label.attr('for'),                  'TEST-ID');    // -- 3
	});
	/**
	 * createRadio() ( refactored method of addRadio() )
	 */
	test('createRadio()', function() {
		var _question = new ns.root.model.Question({
			"answer": {content: 'a'},
		});
		
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		 
		var _radio = _view.createRadio('TEST-VALUE', 'TEST-ID', 'TEST-NAME');
		equal(_radio.get(0).tagName.toUpperCase(), 'INPUT');      // -- 1
		equal(_radio.attr('value'),                'TEST-VALUE'); // -- 2
		equal(_radio.attr('id'),                   'TEST-ID');    // -- 3
		equal(_radio.attr('name'),                 'TEST-NAME');  // -- 4
	});
	/**
	 * createRadios() ( refactored method of addRadio() )
	 */
	test('createRadios()', function() {
		var _question = new ns.root.model.Question({
			"answer":    {
				content:     "TEST-CHOICE-3"
			},
			"choices":   [
				{ "content": "TEST-CHOICE-1"},
				{ "content": "TEST-CHOICE-2"},
				{ "content": "TEST-CHOICE-3"},
				{ "content": "TEST-CHOICE-4"}
			]
		});
		
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		
		
		var _choices = _question.get('choices');
		var _name    = 'TEST-CHOICE';
		var _answer  = _question.get('answer').content;
		var _radios = _view.createRadios(_choices, _name, _answer);
		
		ns.trace(_radios.html());
		
		equal(_radios.filter('input').length,  _choices.length, 'enough inputs created');     // -- 1
		_radios.filter('input').each(function(i, _input){
			var _id = _name + '-' + i.toString();
			equal($(_input).attr('id'),  _id,  '@id present');                         // -- 2
			equal($(_input).attr('name'), _name, '@name present');                     // -- 3
			equal($(_input).attr('value'), _choices[i].content, '@value present');     // -- 4
			
			var _selector = 'label' + ns.slctr('label') + '[for="' +_id +'"]';
			var _label = _radios.filter(_selector); 
			equal(_label.length,  1, _selector + ' present');                        // -- 5
			equal(_label.text(), $(_input).attr('value'), _selector + 'including valid text');  // -- 6
			
			if(_question.getIsQuiz()) {
				var _selector = 'label' + ns.slctr('result') + '[for="' +_id +'"]';
				var _result = _radios.filter(_selector);
				equal(_result.length,  1,  _selector + ' present');                        // -- 7
				var _correct = $(_input).attr('value') === _answer;
				equal(_result.hasClass(_correct ? ns.cls('correct') : ns.cls('wrong')), true);  // -- 8
				equal(_result.text(),                 _correct ? '○' : '×');   // -- 9
			} 
		});
	});
	/**
	 **createCheckbox()
	**/
	test('createCheckbox()', function() {
		var _question = new ns.root.model.Question({
			"kind":"checkbox",
			"answer":    {
				content:     "TEST-CHECKBOX-1"
			},
			"choices":   [
				{ "content": "TEST-CHECKBOX-1"},
				{ "content": "TEST-CHECKBOX-2"},
				{ "content": "TEST-CHECKBOX-3"},
				{ "content": "TEST-CHECKBOX-4"}
			]
		});
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		
		var _choices = _question.get('choices');
		var _answer  = _question.get('answer').content;
		
		var _checkboxs = _view.createCheckbox(_question);
		equal(_checkboxs.filter('input').length,  _choices.length, 'enough inputs created');     // -- 1
		
		_checkboxs.filter('input').each(function(i, _input){
			var _id = _question.cid + '-' + i.toString();
			equal($(_input).attr('id'),  _id,  '@id present'); 
			
			if(_question.getIsQuiz()) {
				var _selector = 'label' + ns.slctr('result') + '[for="' +_id +'"]';
				var _result = _checkboxs.filter(_selector);
				equal(_result.length,  1,  _selector + ' present');                        // -- 7
				var _correct = $(_input).attr('value') === _answer;
				equal(_result.hasClass(_correct ? ns.cls('correct') : ns.cls('wrong')), true);  // -- 8
				equal(_result.text(),                 _correct ? '○' : '×');   // -- 9
			}
		});
		
		//$(ns.slctr('answer'), this.el).append('<br>');
	});
	
	/**
	 **createSelect()
	**/
	test('createSelect()', function() {
		var _question = new ns.root.model.Question({
			"kind":		 "SELECT",
			"choices":   [
				{ "uuid":"1","content": "TEST-SELECT-1"},
				{ "uuid":"2","content": "TEST-SELECT-2"},
				{ "uuid":"3","content": "TEST-SELECT-3"},
				{ "uuid":"4","content": "TEST-SELECT-4"}
			]
		});
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		
		var _choices = _question.get('choices');
		var _selects = _view.createSelect(_question);
		equal(_selects.find('option').length,  _choices.length, 'enough inputs created');     // -- 1
		
		_selects.find('option').each(function(i, _option){
			var _id = _question.get('choices')[i].uuid;
			equal($(_option).attr('value'),  _id,  '@id present'); 
		});
	});
	/*
	**showResult()
	*/
	test('showResult()', function() {
		_question = new ns.root.model.Question({
			"kind": 'text'
		});
		_view = new ns.Question({
			model: _question,
			el:    _el
		}).render();
		_result = _view.showResult();
		equal($(':text', _result.el).attr('disabled'),'disabled','disabled');
		
		_body.removeChild(_el);
	});
	/*
	**getValues()
	*/
	test('getValues()',function(){
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
		equal(_view.getValues()[0], '日本語','Values(日本語)');
		_body.removeChild(_el);
	});
	
	/*
	**validate()
	*/
	test('validate()',function(){
		var _question = new ns.root.model.Question({
				"kind": 'numeric'
			});
			// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}).render();
		// simulate user innput
		$('input', _view.el).val('aaa');
		// test
		equal(_view.validate()[0], '入力した値は数値ではありません 。','not numeric');
		_body.removeChild(_el);
	});
	
	/*
	**getIsQuiz()
	*/
	test('getIsQuiz()',function(){
		var _question = new ns.root.model.Question({
				"answer": 'numeric'
			});
			// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		// test
		equal(_view.getIsQuiz(), _question.has('answer'),"has('answer') == " + _question.has('answer'));
		_body.removeChild(_el);
	});
	
	/*
	**getIsResultShown()
	*/
	test('getIsResultShown()',function(){
		var _question = new ns.root.model.Question({
				//"answer": 'numeric'
			});
			// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		});
		// test
		var isExist = $(ns.slctr('answer'), _view.el).hasClass(ns.cls('result-hide'));
		equal(_view.getIsResultShown(), !isExist,"has('"+ ns.cls('result-hide') +"') == " + isExist);
		_body.removeChild(_el);
	});
	/*
	**render()
	*/
	test('render()',function(){
		var _question = new ns.root.model.Question({
			"kind"  :	 "radio",
			"answer":    {
				content:     "TEST-RADIO-3"
			},
			"choices":   [
				{ "content": "TEST-RADIO-1"},
				{ "content": "TEST-RADIO-2"},
				{ "content": "TEST-RADIO-3"},
				{ "content": "TEST-RADIO-4"}
			]
		});
		// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}).render();
		
		var _choices = _question.get('choices');
		var _name    = 'TEST-CHOICE';
		var _answer  = _question.get('answer').content;
		var _radios = $(':radio',_view.el);
		equal(_radios.length,_question.get('choices').length,'radio-4');
		_radios.each(function(i, _radio){
			var _id = _question.cid + '-' + i.toString();
			equal($(_radio).attr('id'),  _id,  '@id present');                         
			
			var _selector = 'label' + ns.slctr('label') + '[for="' +_id +'"]';
			var _label = $(this).siblings().filter(_selector); 
			equal(_label.length,  1, _selector + ' present');                        
			equal(_label.text(), $(_radio).attr('value'), _selector + 'including valid text');
			
			if(_question.getIsQuiz()) {
				var _selector = 'label' + ns.slctr('result') + '[for="' +_id +'"]';
				var _result = $(this).siblings().filter(_selector);
				equal(_result.length,  1,  _selector + ' present');                        
				var _correct = $(_radio).attr('value') === _answer;
				equal(_result.hasClass(_correct ? ns.cls('correct') : ns.cls('wrong')), true); 
				equal(_result.text(),                 _correct ? '○' : '×');   
			} 
		});
		_body.removeChild(_el);
	});
// })(mr.initialize({api: 'http://demo.sunbi.co.jp/nci-201205/trunk/api/v1'}).ui);
})(mr.ui);