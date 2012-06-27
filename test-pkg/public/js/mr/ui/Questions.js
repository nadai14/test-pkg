/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Questions clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Questions.js 265 2012-06-20 23:48:24Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-21 08:48:24 +0900 (Thu, 21 Jun 2012) $
 *
 */
(function(ns, $){
	ns.Questions = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:  ns.typeName('Questions'), 
		/**
		 * 
		 */
		tagName:   'div',
		/**
		 * 
		 */
		className:  ns.cls('questions'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			 _.bindAll(this, "reset", "add", "remove", "containsQuiz", "getIsResultShown", "getRequired", "hasValue", "getValue", "getValues");
			
			// sub somponents 
			this.questions = Array();
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.collection.bind("reset",  this.reset);
        this.collection.bind("add",    this.add);
        this.collection.bind("remove", this.remove);
			}
		},
		/**
		 * 
		 */
		render:     function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// same as reset
			this.reset(this.collection);
				
			return this;
		},
		/**
		 * reset method
     * @param {Object} collection
		 */
		reset:      function (collection) {
			ns.trace(this.typeName + '#reset()');
			
			// clear
			this.questions = Array();
			
			// add each
			collection.each(function (model) {
				this.add(model) 
			}, this);
    },
    /**
     * 
     * @param {Object} model
     */
    add:        function (model) {
    	ns.trace(this.typeName + '#add()');
    	
			var _question = (new ns.Question({ 
				model: 	model,
				el:     $(ns.slctr('question') + ns.slctr('template'), this.el).clone().appendTo($(this.el)).get(0)
			})).render();
			
			// push
			this.questions.push(_question);
			
			// return
			return _question;
    },
    /**
     * 
     * @param {Object} model
     */
    remove:     function (model) {
    	ns.trace(this.typeName + '#remove()');
    	
    	var _i = -1;
    	for(var i = 0; i < this.questions.length; ++i) {
    		var _question = this.questions[i];
    		if(_question.model === model){
    			_i = i;
    		} 
    	}
    	if(0 < _i) {
    		this.questions.splice(_i, 1);
    	}
			
			model.destroy();
    },
    /**
		 * containsQuiz
		 */
		containsQuiz:    function() {
			ns.trace(this.typeName + '#containsQuiz()');
			
			return this.collection.containsQuiz();
		},
		/**
		 * containsQuiz
		 */
		getIsResultShown: function() {
			ns.trace(this.typeName + '#getIsResultShown()');
			
			for(var i = 0; i < this.questions.length; ++i) {
				if(!this.questions[i].getIsResultShown()) return false;
			}
			return true;
		},
		/**
		 * containsQuiz
		 */
		showResult:       function() {
			ns.trace(this.typeName + '#showResult()');
			
			for(var i = 0; i < this.questions.length; ++i) {
				this.questions[i].showResult();
			}
			return this;
		},
    /**
		 * containsRequired
		 */
		containsRequired: function() {
			ns.trace(this.typeName + '#containsRequired()');
			
			return this.collection.containsRequired();
		},
    /**
		 * getRequired
		 */
		getRequired:      function() {
			ns.trace(this.typeName + '#getRequired()');
			
			return this.collection.getRequired();
		},
		/**
		 * hasValue
		 */
		hasValue: 	      function(question){
			ns.trace(this.typeName + '#hasValue()');
			
			return (this.getValue(question));
		},
		/**
		 * 
		 */
		getValue: 	function(question){
			ns.trace(this.typeName + '#getValue()');
			
			// @NOTE 
			return this.getValues()[question.get('num')];
		},
    /**
		 * 
		 */
		getValues:	function(){
			ns.trace(this.typeName + '#getValues()');
			
			var _result = [];
			for(var i = 0; i < this.questions.length; ++i) {
				var _question  = this.questions[i];
				var _num       = _question.model.get('num');
				var _values    = _question.getValues();
				if(0 < _values.length) {
					ns.trace(_num + ' ');
					
					_result[_num.toString()] = {
						// "model":  _question.model,
						"values": _values 
					};	
				}
			}
			return _result;
		}
	});
})(mr.ui, mr.$);