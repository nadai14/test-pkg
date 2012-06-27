/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * MobileController class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: MobileController.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.MobileController = ns.Controller.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('MobileController'), 
    /**
     * isAdPlayingChanged 
     */
    onAdCurrentTimeChanged: function() {
    	ns.trace(this.typeName + '#onAdCurrentTimeChanged()' + this.wait_until);
    },
		/**
     * isAdPlayingChanged 
     */
    onIsAdPlayingChanged: function() {
    	ns.trace(this.typeName + '#onIsAdPlayingChanged()');
    	
    	this.models.nav.set('html', '動画の視聴が完了していません。');
    },
    /**
     * isAdPlayingChanged 
     */
    onIsAdEndedChanged: function() {
    	ns.trace(this.typeName + '#onIsAdEndedChanged()');
    	//
    	var _self = this;
    	// 
    	if(this.getIsAdEnded()){
    		this.requestNextPage(function(){
    			_self.models.nav.set({
    				"html": _self._page.get('questions').at(0).get('num') + ' / ' +  _self._page.get('question_cnt')
    			});
    		});
    	}
    }
	});
})(mr.controller);