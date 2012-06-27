/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Question class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 152 2012-06-11 13:37:05Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-11 22:37:05 +0900 (Mon, 11 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Question = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Question'), 
		/**
		 * 
		 */
		defaults: {
			"type":  "Question",
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "getIsQuiz", "getIsRequired");
		},
		/**
		 * returns if this Question is QUIZ
		 * 
		 * @see http://redmine.sunbi.co.jp/issues/1781
		 */
		getIsQuiz: function() {
			ns.trace(this.typeName + '#getIsQuiz()');
			
			return this.has('answer');
		},
		/**
		 * 
		 */
		getIsRequired: function() {
			ns.trace(this.typeName + '#getIsRequired()');
			
			return this.has('required') ? this.get('required') : false;
		}
	});
})(mr.model.v1, mr.$);
