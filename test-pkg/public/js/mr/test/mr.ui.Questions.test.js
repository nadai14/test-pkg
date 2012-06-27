/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Questions Test cases
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
	 * Questions
	 */
	module(ns.namespace + '.Questions', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('questions')));
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
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		}).render();
		
		//TODO render()
		equal('', '', 'TODO render()');
	});

	/**
	 * reset()
	 */
	test('reset()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO reset()
		equal('', '', 'TODO reset()');
	});
	
	/**
	 * add()
	 */
	test('add()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO add()
		equal('', '', 'TODO add()');
	});
	
	/**
	 * remove()
	 */
	test('remove()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO remove()
		equal('', '', 'TODO remove()');
	});
	
	/**
	 * containsQuiz()
	 */
	test('containsQuiz()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO containsQuiz()
		equal('', '', 'TODO containsQuiz()');
	});
	
	/**
	 * getIsResultShown()
	 */
	test('getIsResultShown()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO getIsResultShown()
		equal('', '', 'TODO getIsResultShown()');
	});
	
	/**
	 * showResult()
	 */
	test('showResult()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO showResult()
		equal('', '', 'TODO showResult()');
	});
	
	/**
	 * containsRequired()
	 */
	test('containsRequired()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO containsRequired()
		equal('', '', 'TODO containsRequired()');
	});
	
	/**
	 * getRequired()
	 */
	test('getRequired()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO getRequired()
		equal('', '', 'TODO getRequired()');
	});
	
	/**
	 * hasValue()
	 */
	test('hasValue()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO hasValue()
		equal('', '', 'TODO hasValue()');
	});
	
	/**
	 * getValue()
	 */
	test('getValue()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO getValue()
		equal('', '', 'TODO getValue()');
	});
	
	/**
	 * getValue()
	 */
	test('getValues()', function() {
		var _collection = new ns.root.model.v1.Questions();
		
		var _view = new ns.Questions({
			collection:  _collection,
			el:    	_el
		});
		//TODO getValues()
		equal('', '', 'TODO getValues()');
	});
})(mr.ui);