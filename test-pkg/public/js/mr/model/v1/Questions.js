/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Questions class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Questions.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Questions = Backbone.Collection.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Questions'),
		/**
		 * model class of this collection
		 */
		model:      ns.Question,
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "containsQuiz", "getRequired", "containsRequired");
		},
		/**
		 * 
		 */
		containsQuiz: function() {
			ns.trace(this.typeName + '#containsQuiz()');
			
			for(var i = 0; i < this.length; ++i) {
				if(this.at(i).getIsQuiz()) return true;
			}
			return false;
		},
		/**
		 * 
		 */
		getRequired: function() {
			ns.trace(this.typeName + '#getRequired()');
			
			var _required = [];
			for(var i = 0; i < this.length; ++i) {
				var _question = this.at(i); 
				if(_question.getIsRequired()) {
					_required.push(_question);
				}
			}
			return _required;
		},
		/**
		 * 
		 */
		containsRequired: function() {
			ns.trace(this.typeName + '#containsRequired()');
			
			var _required = this.getRequired();
			return (0 < _required.length)  ? true : false;
		}
	});
})(mr.model.v1, mr.$);
