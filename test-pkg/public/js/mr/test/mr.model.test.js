/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.model.*
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.model.test.js 167 2012-06-13 01:58:51Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-13 10:58:51 +0900 (Wed, 13 Jun 2012) $ by $Author: tsuru $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
  
  /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	 * mr.umodel.Campaign
	 */
  module(ns.namespace + '.Campaign');
  /**
   * Basic test 
   */
  test("Basic Test", function() {
    // create model
    var model = new ns.Campaign();
    equal(model.idAttribute, 'uuid');
  
  });
  
  /**
   * fetch test
   */
  asyncTest('#fetch() Test', function() {
    var model = new ns.Campaign({ uuid: 1 });
    model.fetch({
      success: function(m, response) {
        equal(m.has('uuid'),           true);
        equal(m.has('enq_id'),         true);
        equal(m.has('platform'),       true);
				equal(m.has('wait_until'),    true);
				equal(m.has('css'),            true);
				equal(m.has('movie'),          true);
				equal(m.has('thumbnail'),      true);
				equal(m.has('point'),          true);
				equal(m.has('title'),          true);
				equal(m.has('description'),    true);
				equal(m.has('message'),        true);
				equal(m.has('conversion_tag'), true);
				equal(m.has('second_picture'), true);
				equal(m.has('second_point'),   true);
				equal(m.has('client_url'),     true);
        start();
      },
    });
  });
  
  /**
   * Test for #1763
   * 
   * Add HTTP header "X-Requested-By : poncan-moviereward"
   * 
   * @see http://redmine.sunbi.co.jp/issues/1763
   */
  asyncTest('Test for #1763', function() {
    var model = new ns.Campaign({ uuid: 1 });
    // change api url to echoheaders.php
    model.url = function() { return ns.api + '/echoheaders.php' };
    // fetch
    model.fetch({
      success: function(model, response) {
        equal(model.get('X-Requested-By'), 'poncan-moviereward');
        start();
      },
    });
  });
 
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	 * mr.umodel.Page
	 */
  module(ns.namespace + '.Page');
  /**
   * Basic test 
   */
  test("Basic Test", function() {
    // create model
    var model = new ns.Page();
    equal(model.idAttribute, 'uuid');
  });
  
  /**
   * fetch test
   */
  asyncTest('#fetch() Test', function() {
    var model = new ns.Page({ enq_id: 1, uuid: 1 });
    model.fetch({
      success: function(m, response) {
        equal(m.has('enq_id'),        true);
        equal(m.has('uuid'),          true);
        equal(m.has('description'),   true);
        equal(m.has('question_cnt'),  true);
        equal(m.has('questions'),     true);
        equal(m.has('next_page_id'),  true);
        equal(m.has('wait_until'),    true);
        start();
      },
    });
  });

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	 * mr.umodel.Question
	 */
  module(ns.namespace + '.Question');
  /**
   * Basic test 
   */
  test("Basic Test", function() {
    // create model
    var model = new ns.Page();
    equal(model.idAttribute, 'uuid');
  });
  
  /**
   * fetch test
   */
  asyncTest('#fetch() Test', function() {
    var model = new ns.Page({ enq_id: 1, uuid: 1 });
    model.fetch({
      success: function(m, response) {
      	var _questions = m.get('questions');
      	for(var i = 0; i < _questions.length; ++i) {
      		var m = _questions.at(i);
      		equal(m.has('num'),        true);
	        equal(m.has('seq'),        true);
	        // equal(m.has('kind'),       true);
	        // equal(m.has('title'),      true);
	        // equal(m.has('content'),    true);
	        // equal(m.has('required'),  true);
      	}
        start();
      },
    });
  });
  
})(mr.initialize({api: 'http://demo.sunbi.co.jp/nci-201205/trunk/api/v1'}).model);