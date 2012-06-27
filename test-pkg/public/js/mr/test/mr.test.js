/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.*
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.test.js 146 2012-06-11 08:17:50Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-11 17:17:50 +0900 (Mon, 11 Jun 2012) $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
  
  module(ns.namespace);
  /**
   * guid test 
   * @see http://www.apps.ietf.org/rfc/rfc4122.html
   */
  test('guid() Test (RFC4122)', function() {
     var guid = mr.guid();
     equal(guid.match(/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/)[0], guid);
  });
  
})(mr);