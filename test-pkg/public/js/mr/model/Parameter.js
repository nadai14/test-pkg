/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Parameter class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Parameter.js 252 2012-06-20 01:33:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 10:33:15 +0900 (Wed, 20 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.Parameter = ns.Base.extend({
		/**
     * typeName of this class
     */
		typeName: ns.typeName('Parameter'),
		/**
		 * defaults
		 * 
		 * @see http://redmine.sunbi.co.jp/projects/nci-201205/wiki/AGENDA-20120606
		 * 
		 * poncan_key:クリック毎のキー
		 * mid:       動画ID
		 * uid:        ユーザーID
		 * already:1・・・視聴済み、0または無い・・・未視聴
		 */
		defaults: {
			"poncan_key": ns.getParameter('poncan_key'),
			"mid":        ns.getParameter('mid'),
			"uid":        ns.getParameter('uid'),
			"already":    parseInt(ns.hasParameter('already') ? ns.getParameter('already') : 0) ,
			"player":     (ns.hasParameter('player')  ? ns.getParameter('player') : null)
		}
	});
})(mr.model);