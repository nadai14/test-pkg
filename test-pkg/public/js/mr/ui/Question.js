/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Question clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (Fri, 22 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Question = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Question'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('question'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			_.bindAll(this, "createLabel", "createRadio", "getIsQuiz", "getIsResultShown");
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
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
			
			// title
			if(this.model.has('title')) {
				$(ns.slctr('title') + ' b', this.el).text(this.model.get('seq') + '. ' + this.model.get('title'));
			}else{
				$(ns.slctr('title'), this.el).hide();
			}
			
			// required
			if(this.model.has('required')) {
				if(this.model.get('required')) {
					$(ns.slctr('required'), this.el).text('*');	
				}
			}
			
			// content
			if(this.model.has('content')) {
				$(ns.slctr('description') + ' p', this.el).text(this.model.get('content'));
			}else{
				$(ns.slctr('description'), this.el).hide();
			}
			
			// chioice
			if(this.model.has('kind')) {
				$container = $(ns.slctr('answer'), this.el)
				switch(this.model.get('kind').toUpperCase()){
					case 'RADIO':
						this.createRadios(this.model.get('choices'), this.model.cid, this.model.getIsQuiz() ? this.model.get('answer').content : null)
							.appendTo($container);
						break;
					case 'CHECKBOX':
						this.createCheckbox(this.model).appendTo($container);
						break;
					case 'SELECT':
						this.createSelect(this.model).appendTo($container);
						break;
					case 'TEXT':
						$('<input>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('type',  'text')
							.appendTo($container);
						break;
					case 'NUMERIC':
						$('<input>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('type',  'text')
							.appendTo($container)
							
						break;
					case 'TEXTAREA':
						$('<textarea>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('cols',  '35')
							.attr('rows',  '4')
							.attr('maxlength',  '255')
							.appendTo($container);
						break;
				}
			}
			
			return this;
		},
		/**
		 * validate method
		 */
		validate:	function(textValue){
			ns.trace(this.typeName + '#validate()');
			
			var _results = new Array(); 
			var _values  = this.getValues();
			for(var i = 0; i < _values.length; ++i) {
				var _value = _values[i];
				if(this.model.get('kind').toUpperCase() === 'NUMERIC'){
					if(isNaN(_value) || _value === '') {
						_results.push('入力した値は数値ではありません 。');
					}
				}
			}
			return _results;
		},
		/**
		 * createLabel() method
		 */
		createLabel:	function(label, id){
			ns.trace(this.typeName + '#createLabel()');
			
			return $('<label>').attr('for', id).text(label);
		},
		/**
		 * 
		 */
		createRadios:	function(choices, name, answer){
			ns.trace(this.typeName + '#createRadios()');
			
			var _$container = $('<p>');
			
			for(var i = 0; i < choices.length; ++i) {
				var _option = choices[i];
				var _id     = name + '-' + i.toString();
				
				// radio
				this.createRadio(_option.content, _id, name)
					.appendTo(_$container);		
				// label
				this.createLabel(_option.content, _id)
					.addClass(ns.cls('label'))
					.appendTo(_$container);
				// answer
				if(answer) {
					var _corrent = (_option.content === answer); 
					this.createLabel((_corrent) ? '○' : '×', _id)
						.addClass(ns.cls('result'))
						.addClass(ns.cls((_corrent) ? 'correct' : 'wrong'))
						.appendTo(_$container);	
				}
				// LR
				$('<br>')
					.appendTo(_$container);
			}
			
			return $(_$container.html());
		},
		/**
		 * createRadio
		 */
		createRadio:	function(value, id, name){
			ns.trace(this.typeName + '#createRadio()');
			
			return $('<input>')
				.attr('type',  'radio')
				.attr('id',    id)
				.attr('name',  name)
				.attr('value', value);
		},
		/**
		 * createCheckbox
		 */
		createCheckbox:	function(model){
			ns.trace(this.typeName + '#addCheckbox()');
			
			var _$container = $('<p>');
			if(model.has('choices')) {
				var options  = model.get('choices');
				for(var i = 0; i < options.length; ++i) {
					var option = options[i];
					var _id    = model.cid + '-' + i.toString();
					
					$('<input>')
						.attr('id',    model.cid + '-' + i.toString())
						.attr('name',  model.cid)
						.attr('type',  'checkbox')
						.attr('value', option.content)
						.appendTo(_$container);
						
					// add label
					this.createLabel(option.content, _id)
						.appendTo(_$container);
						
					if(model.has('answer')) {
						// add label for answer
						var _corrent = (model.get('answer').content === option.content); 
						this.createLabel((_corrent) ? '○' : '×', _id)
							.addClass(ns.cls('result'))
							.addClass(ns.cls((_corrent) ? 'correct' : 'wrong'))
							.appendTo(_$container);	
					}
					
					$('<br>')
						.appendTo(_$container);
				}
			}
			return $(_$container.html());
		},
		
		/**
		 * createSelect method
		 */
		createSelect:	function(model){
			ns.trace(this.typeName + '#createSelect()');
			if(!model.has('choices')) return '';
			// prepare container, etc..
			var options     = model.get('choices');
			var _$container = $('<p>');
			var _$select    = $('<select>').attr('id', model.cid).attr('name', model.cid);
			// 
			$('<option>')
					.text('<お選び下さい>')
					.addClass(ns.cls('presuedo-option'))
					.appendTo(_$select);
			// create <option>s for each options 
			for(var i=0; i< options.length; ++i){
				$('<option>')
					.attr('value', options[i].content)
					.text(options[i].content)
					.appendTo(_$select);
			}
			// append to container
			_$container.append(_$select);
			// return html <select>...
			return $(_$container.html());
		},
		/**
		 * 
		 */
		getValues:	function(){
			ns.trace(this.typeName + '#getValues()');
			
			var answerUser = new Array();
			switch(this.model.get('kind').toUpperCase()){
				case 'RADIO':
					var radio = $(ns.slctr('answer') + ' :radio:checked', this.el);
					if(radio.length>0){
						answerUser[0] = radio[0].value;//.substring(radio[0].value.indexOf('-')+1);
					}
					break;
				case 'CHECKBOX':
					var checkbox = $(ns.slctr('answer') + ' :checkbox:checked', this.el);
					var arrayI = 0;
					if(checkbox.length>0){
						for(var i=0; i<checkbox.length; ++i){
							answerUser[arrayI] = checkbox[i].value;//.substring(checkbox[i].value.indexOf('-')+1);
							++arrayI;
						}
					}
					break;
				case 'SELECT':
					var _$select       = $(ns.slctr('answer') + ' select', this.el);
					if(0 < _$select.length) {
						var _$selected   = $('option:selected', _$select);
						// 
						//   As of jQuery 1.6, the .attr() method returns undefined
						//   for attributes that have not been set. 
						if(0 < _$selected.length && !_$selected.hasClass(ns.cls('presuedo-option'))) {
							answerUser[0]	 = _$selected.attr('value');
						}
					}
					break;
				case 'TEXT':
					if($(ns.slctr('answer') + ' :text').val().replace(/\s+/g,"")!='')
						answerUser[0] = $(ns.slctr('answer') + ' :text', this.el).val().replace(/\s+/g,"");
					break;
				case 'NUMERIC':
					answerUser[0] = $('input', this.el).val();
					break;
				case 'TEXTAREA':
					if($(ns.slctr('answer') + ' textarea').val().replace(/\s+/g,"")!='')
						answerUser[0] = $(ns.slctr('answer') + ' textarea', this.el).val().replace(/\s+/g,"");
					break;
			}
			
			return answerUser;
		},
		/**
		 * 
		 */
		showResult:	function(){
			ns.trace(this.typeName + '#showResult()');
			
			if($(ns.slctr('answer'), this.el).hasClass(ns.cls('result-hide'))){
				$(ns.slctr('answer'), this.el).removeClass(ns.cls('result-hide'));
			}
			
			switch(this.model.get('kind').toUpperCase()){
				case 'RADIO':
					$(ns.slctr('answer') + ' :radio').attr('disabled','disabled');
					//$(ns.slctr('answer') + ' :radio:checked').next('label').addClass('mr-ui-select');
					break;
				case 'CHECKBOX':
					$(ns.slctr('answer') + ' :checkbox').attr('disabled','disabled');
					break;
				case 'SELECT':
					$(ns.slctr('answer') + ' select').attr('disabled','disabled');
					break;
				case 'TEXT':
					$(ns.slctr('answer') + ' :text').attr('disabled','disabled');
					break;
				case 'NUMERIC':
					$(ns.slctr('answer') + ' :text').attr('disabled','disabled');
					break;
				case 'TEXTAREA':
					$(ns.slctr('answer') + ' textarea').attr('disabled','disabled');
					break;
			}
			return this;
		},
		/**
		 * getIsQuiz 
		 */
		getIsQuiz: function() {
			ns.trace(this.typeName + '#getIsQuiz()');
			
			return this.model.getIsQuiz();
		},
		/**
		 * getIsQuiz 
		 */
		getIsResultShown: function() {
			ns.trace(this.typeName + '#getIsResultShown()');
			
			return !$(ns.slctr('answer'), this.el).hasClass(ns.cls('result-hide'));
		}
	});
})(mr.ui, mr.$);