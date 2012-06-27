/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 265 2012-06-20 23:48:24Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-21 08:48:24 +0900 (Thu, 21 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Page = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:  ns.typeName('Page'), 
		/**
		 * element tag name
		 */
		tagName:   'div',
		/**
		 * css class name 
		 */
		className:  ns.cls('page'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// 
			var _self = this;
			// set controller
			this.controller = options.controller;
			// extend model
			this.model.getValues = function(){
				ns.trace(this.typeName + '#initialize():getValues at '  + _self.model.get('uuid'));
				return _self.getValues();
			};
			// questions
			this.questions = new ns.Questions({ 
				controller:  this.controller,
				collection:  this.model.get('questions'),
				el:          $(ns.slctr('questions'), this.el).exists() ? $(ns.slctr('questions'), this.el).get(0) : null 
			});
			// next button
			this.next      = new ns.Next({
				controller:  this.controller, 
				model:       this.controller.models.next,
				el:          $(ns.slctr('next'), this.el).get(0)
			});
			// overrides function
			this.controller.canMoveNext = function(){
				// check required
				if(_self.questions.containsRequired()) {
					var _required = _self.questions.getRequired();
					for(var i = 0; i < _required.length; ++i) {
						if(!_self.questions.hasValue(_required[i])){
							ns.dialog('この設問は回答必須です。');
							// return false;
							return false;
						}
					}
				}
				// check quiz
				if(_self.questions.containsQuiz() && !_self.questions.getIsResultShown()) {
					//  update nextbutton
					$(_self.next.el).text('次へ');
					// show result;
					_self.questions.showResult();
					// return false;
					return false;
				}
				delete _self.controller.canMoveNext;
				return true;
			};
			// 
			this.next.on('click', function(){
				_self.controller.requestNextPage();
			});
			this.model.on('change', this.render, this);
		},
		/**
		 * render method
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			// render 
			$(ns.slctr('title') + ' b', this.el).text(this.model.has('description') ? this.model.get('description') : '');
			this.questions.render();
			this.next.render();
			// return
			return this;
		},
    /**
		 * 
		 */
		getValues:	function(){
			ns.trace(this.typeName + '#getValues()');
			return this.questions.getValues();
		}
	});
})(mr.ui, mr.$, mr.ua);