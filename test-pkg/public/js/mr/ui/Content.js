/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Content class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Content.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
  ns.Content = ns.Base.extend({
    /**
     * typeName of this class
     */
    typeName:   ns.typeName('Content'), 
    /**
     * 
     */
    tagName:    'div',
    /**
     * 
     */
    className:  ns.cls('content'),
    /**
     * Constructor
     */
    initialize: function(options){
      ns.trace(this.typeName + '#initialize()');
      //
      _.bindAll(this, "render", "_render")
			// set controller
			this.controller = options.controller;
			
      // bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
    },

    /**
     * 
     */
    render: function(){
      ns.trace(this.typeName + '#render()');
      // keep the references
      var _self = this;
      // remove template
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
      if('undefined' !== typeof(this.current)) {
        // if something is shown, fadeOut current, and fadeIn new.
        var _$target = $(this.el);
        _$target.fadeOut('fast', function(){ 
          _self._render();
          _$target.fadeIn('slow');
        });
      }else{
        // when current nothing, simply to render 
        _self._render();
      }
      
      // return this
      return this;
    },
    
    /**
     * 
     */
    _render: function(){
      ns.trace(this.typeName + '#_render()');// clear
      // 
      var _self = this;
			// hide current
    	if('undefined' !== typeof(this.current)) {
    		this.current.hide();
    	}
      // render 
     	this.current = new (this.model.get('view'))({
     		controller:  _self.controller,
     		model:       _self.model.get('model'),
        el:          _self.model.get('clone') ? $(_self.model.get('selector'), this.el).clone().appendTo($(this.el)) : $(this.model.get('selector'), this.el) 
      }).render();
			// return
      return this;
    },
  });
})(mr.ui, mr.$);