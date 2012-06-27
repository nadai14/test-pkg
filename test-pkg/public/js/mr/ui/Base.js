/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Ui Base class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Base.js 256 2012-06-20 10:04:17Z liminghua772 $
 *
 * Last changed: $LastChangedDate: 2012-06-20 19:04:17 +0900 (Wed, 20 Jun 2012) $ by $Author: liminghua772 $
 *
 */
(function(ns, $){
	ns.Base = Backbone.View.extend({
		/**
		 * typeName of this class
		 */
		typeName:      ns.typeName('Base'), 
		/**
		 * 
		 */
		initialize:    function(){
			ns.trace(this.typeName + '#initialize()');
			
			_.bindAll(this, "hide", "show", 'cloneTemplate');
		},
		/**
		 * 
		 */
		render:        function(){
			ns.trace(this.typeName + '#render()');
			
			// nothing todo
		},
		/**
		 * 
		 */
		show:          function() {
			ns.trace(this.typeName + '#show()');
			
			$(this.el).show();
			return this;
		},
		/**
		 * 
		 */
		hide:          function() {
			ns.trace(this.typeName + '#hide()');
			
			$(this.el).hide();
			return this;
		},
		/**
		 * 
		 */
		cloneTemplate: function(selector) {
			selector = selector + ns.slctr('template');
			ns.trace(this.typeName + '#cloneTemplate(\"' + selector + '\")');
			
			return 	$(selector, this.el).exists() ? 
					$(selector, this.el).clone().appendTo($(this.el)) : 
					null
		}
	});
	/**
	 * getCssClassName
	 * @param {Object} classname
	 * @return string fully qualified class name
	 */
	ns.getCssClassName = function(classname) {
		return ns.namespace.replace('.', '-') + '-' + classname;
	};
	ns.cls = ns.getCssClassName;
	/**
	 * returns selector for the classname  
		@param {Object} classname
	 */
	ns.slctr =           function(classname) {
		return '.' + ns.cls(classname);  
	};
	/**
	 * dialog function
	 */
	ns.dialog =          function(message) {
		alert(message);
	};
	/*
	 * ============================================================================
	 */
	/**
	 * extends $
	 */
	$.fn.exists = function(){
		return this.length > 0;
	};
	// for Zept
	if('undefined' === typeof($.fn.fadeOut)) {
		$.extend($.fn, {
			/**
			 * fadeOut
			 */
			fadeOut:     function(speed, callback) {
				this.hide();
				if('undefined' !== typeof(callback)) {
					callback(this);
				}
				return this;
			}
		});
	}
	if('undefined' === typeof($.fn.fadeIn)) {
		$.extend($.fn, {
			/**
			 * fadeIn
			 */
			fadeIn:     function(speed, callback) {
				this.show();
				if('undefined' !== typeof(callback)) {
					callback(this);
				}
				return this;
			}
		});
	}
	/*
	 * ============================================================================
	 */
	/**
	 * extends _(underscode)
	 * @see http://documentcloud.github.com/underscore/#template
	 */
	(function(_){
		_.templateSettings = {
			interpolate : /\{\{(.+?)\}\}/g
		};
	})(_);
})(mr.ui, mr.$);