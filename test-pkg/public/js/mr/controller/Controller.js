/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Controller Base Class
 * 
 * JavaScript (ECMAScript)
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Controller.js 308 2012-06-22 01:25:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 10:25:15 +0900 (Fri, 22 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.Controller = Backbone.Router.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Controller'), 
		/**
		 * Routing rules
		 */
		routes: {	
			"":                      "start",
			"campaign/:id":          "campaign"
		},
		/**
		 * initialize
		 *
		 * @see http://backbonejs.org/#Collection-constructor 
		 */
		initialize: function(options) {
			ns.trace(this.typeName + '#initialize()');
			// setup model 
			var _self = this;
			// bind this
			_.bindAll(this, 
				"ajaxError", 
				"fetchCampaign", 
				"getAdCurrentTime", 
				"setAdCurrentTime", 
				"onAdCurrentTimeChanged", 
				"getIsAdPlaying", 
				"setIsAdPlaying", 
				"onIsAdPlayingChanged",
				"requestThankyouPage",
				"onIsAdEndedChanged");
			
			// 
			this.models = {
				parameter: new ns.root.model.Parameter(),
				ad:        new ns.root.ui.model.Ad(),
				nav:       new ns.root.ui.model.Nav(),
				theme:     new ns.root.ui.model.Theme(),
				landing:   new ns.root.ui.model.Landing(),
				content:   new ns.root.ui.model.Content(),
				next:      new ns.root.ui.model.Next()
			}; 
			
			// set default values
			this.isAdEnded     = false;
			this.isAdPlaying   = false;
			this.isTimePassed  = false;
			this.adCurrentTime = 0;
			this.isAlready     = false;
			
			// event handler
			this.on('change:isAdPlaying',   this.onIsAdPlayingChanged,   this);
			this.on('change:isAdEnded',     this.onIsAdEndedChanged,     this);	
			this.on('change:adCurrentTime', this.onAdCurrentTimeChanged, this);
			this.on('change:isTimePassed',  this.onIsTimePassedChanged,  this);
			
			var _cookies = document.cookie.split(';');
			var _parsed = {};
			for(var i = 0; i < _cookies.length; ++i){
				var _cookie = _cookies[i].split('=');
				_parsed[_cookie[0]] = (1 < _cookie.length) ? _cookie[1] : null;
			}
			if('undefined' === typeof(_parsed['MRID'])){
				this.session_id = ns.guid();
				document.cookie = 'MRID=' + this.session_id;
			}else{
				this.session_id = _parsed['MRID'];
			}
			// start history
			
			// this.start();
		},
		/**
		 * start
		 */
		start: function() { 
			ns.trace(this.typeName + '#start()');
			
			// check uid
			if(!this.models.parameter.has('uid')) {
			 	location.href = location.href + '&uid=' + (((1+Math.random())*0x10000000)|0).toString(16).substring(1);	
			}
			
			if(this.models.parameter.has('mid')) {
				if(this.models.parameter.get('already') === 1) {
					this.already(this.models.parameter.get('mid'));
				}else{
					this.campaign(this.models.parameter.get('mid'));
				}
			}else{
				this.sorry('ページの呼び出しが不正です。');
			}
		},
		/**
		 * campaign route
		 */
		campaign: function(id) {
			ns.trace(this.typeName + '#campaign("' + id + '")');
			// 
			var _self = this;
			// fetch
			this.fetchCampaign(id, function(campaign){
				_self._campaign   = campaign;
				// update view models
				// theme
				_self.models.theme.set({
					 "css":       (campaign.has('css') ? campaign.get('css') : null)
				});
				// ad
				_self.models.ad.set({ 
					"poster":     (campaign.has('thumbnail') ? campaign.get('thumbnail') : null),
					"movies":      (campaign.has('movies') ? campaign.get('movies') : null),
					"movie":      (campaign.has('movie') ? campaign.get('movie') : null)
				});
				// 
				if(!_self.isAlready) {
					// landing
					_self.models.landing.set({ 
						"title":       campaign.get('title'),
						"description": campaign.has('description') ? campaign.get('description') : ''
					});
					// content
					_self.models.content.set({ 
						"view":        ns.root.ui.Landing,
						"model":       _self.models.landing,
						"selector":    ns.root.ui.slctr('landing')
					});
				}else{
					_self.models.nav.set({
						"html":        'アンケートの回答は完了しています。'
					});
					// already
					var _model = new ns.root.ui.model.Already({
						"title":       campaign.get('title'),
						"social":      campaign.has('message') ? campaign.get('message') : '',
						"client_url":  campaign.has('client_url') ? campaign.get('client_url') : ''
					});
					// content
					_self.models.content.set({ 
						"view":        ns.root.ui.Already,
						"model":       _model,
						"selector":    ns.root.ui.slctr('already')
					});
				}
			});
		},
		/**
		 * sorry
		 */
		sorry:   function(message) {
			ns.trace(this.typeName + '#sorry("' + message + '")');
			var _self = this;
			
			// content
			_self.models.content.set({ 
				"view":        ns.root.ui.Sorry,
				"model":       new ns.root.ui.model.Sorry({
				               	"title":       '申し訳ございません。',
				               	"description": message,
				               	"back":        'javascript:location.reload();'
				               }),
				"selector":    ns.root.ui.slctr('sorry')
			});
		},
		/**
		 * already 
		 */
		already:   function(id) {
			ns.trace(this.typeName + '#already("' + id + '")');
      // 
      this.isAlready = true;
      // same as campaign
      this.campaign(id, true);
   	},
   	/**
   	 * 
   	 */
   	ajaxError: function(xhr, textStatus) {
   		ns.trace(this.typeName + '#ajaxError("' + xhr.status + '", "' + textStatus + '")');
   		var _self = this;
   		var _message = 'データ通信時にエラーが発生しました';
			switch(xhr.status) {
				case 0:
				case 400:	
				case 401:
					// 認可されていない UnauthorizedException 401
				case 403:
					// 状態が入稿前 ForbiddenException 403
					// 状態が終了 ForbiddenException 403
				case 404:
					// アンケートIDが存在しない NotFoundException 404
					// ページIDが存在しない NotFoundException 404
					// アンケートIDとページIDが矛盾している NotFoundException 404
					// アンケートページと回答の設問番号が矛盾している NotFoundException 404
					var _data    = { message:   _message };
					try { _data = $.parseJSON(xhr.responseText); }catch(ex){}
					try { _message = ('undefined' !== typeof(_data)) ? _data.message : _message; }catch(ex){}
					var _handler = (ns.handleError || ns.root.handleError || function(message) {  
						_self.sorry(message); 
					});
					_handler(_message);
					return this;
					break;
			}
			// return 
			return this;
   	},
   	/**
     * fetchCampaign()
     */
    fetchCampaign: function(id, success) {
    	ns.trace(this.typeName + '#fetchCampaign("' + id + '")');
    	//
    	var _self = this;
    	// create model
    	var _campaign = new ns.root.model.Campaign({ uuid: id }); 
    	// fetch data
			_campaign.fetch({
				/**
				 * success
				 */
				success: function(campaign, response) {
					ns.trace(_self.typeName + '#fetchCampaign()#success');
					ns.trace(ns.stringify(campaign));
					// set this
					_self.wait_until = campaign.has('wait_until') ? campaign.get('wait_until') : -1;
					// callback
					success(campaign);
				},
				/**
	       * 
	 			 * @param {Object} xhr
	 			 * @param {Object} textStatus
	 			 * 
	 			 * @see http://redmine.sunbi.co.jp/issues/1770
	       */
	      complete:  function(xhr, textStatus){
	      	ns.trace(_self.typeName + '#fetchCampaign()#complete');
	      	_self.ajaxError(xhr, textStatus);
				}
			});
    },
    /**
     * fetchCampaign()
     */
    fetchPage: function(enq_id, id, success) {
    	ns.trace(this.typeName + '#fetchPage("' + id + '")');
    	// 
    	var _self = this;
    	// create model
    	var _page = new ns.root.model.Page({ 
    		enq_id:         enq_id,
				uuid:           id
			}); 
    	// fetch data
			_page.fetch({
				/**
				 * success
				 */
				success: function(page, response) {
					ns.trace(_self.typeName + '#fetchPage()#success');
					ns.trace(ns.stringify(page));
					// set this
					_self.wait_until = page.has('wait_until') ? page.get('wait_until') : -1;
					// callback
					success(page);
				},
				error:  function(xhr, textStatus){
	      	ns.trace(ns.typeName + '#fetchPage()#error');
	      	_self.ajaxError(xhr, textStatus);
				},
	      complete:  function(xhr, textStatus){
	      	ns.trace(ns.typeName + '#fetchPage()#complete');
	      	_self.ajaxError(xhr, textStatus);
				}
			});
    },
    /**
     * 
     */
    sendAnswer: function(answer, success) {
    	ns.trace(this.typeName + '#sendAnswer("' + ns.stringify(answer.data) + '")');
    	// 
    	var _self = this;
    	// send answer
			$.ajax({
				type:       "POST",
				url:        answer.url(),
				data:       answer.data,
				beforeSend: function(xhr, settings) {
					ns.trace(_self.typeName + '#sendAnswer()#beforeSend:' + settings.type + "\t" + settings.url);
					xhr.setRequestHeader("X-Requested-By","poncan-moviereward");
      	},
				success: function(data, status) {
					ns.trace(_self.typeName + '#sendAnswer()#success');
					success();
				},
				complete:  function(xhr, textStatus){
					ns.trace(_self.typeName + '#sendAnswer()#complete');
					_self.ajaxError(xhr, textStatus);
				}
			});
    },
   	/**
     * 
     */
    getAdCurrentTime: function() {
    	ns.trace(this.typeName + '#getAdCurrentTime()');
    	return this.adCurrentTime;
    },
   	/**
     * 
     */
    setAdCurrentTime: function(currentTime) {
    	ns.trace(this.typeName + '#setAdCurrentTime(' + currentTime + ')');
    	if(this.adCurrentTime !== currentTime) {
    		this.adCurrentTime = currentTime;
    		this.trigger('change:adCurrentTime');	
    	}
    	return this;
    },
    /**
     * isAdPlayingChanged 
     */
    onAdCurrentTimeChanged: function() {
    	ns.trace(this.typeName + '#onAdCurrentTimeChanged()' + this.wait_until);
    	var _self             = this;
    	var _currentTimeInSec =  Math.floor(this.adCurrentTime);
    	var _isTimePassed     = false;
    	if(_self.getIsAdEnded()) {
    		_isTimePassed = true;
				_self.models.nav.set('html', '動画の視聴は完了しています。');
    	}else if(_self.adCurrentTime === 0 ) {
    		_self.models.nav.set('html', '再生ボタンをクリックしてください。');
    	}else if(0 < _self.wait_until){
    		var _left = _self.wait_until - _currentTimeInSec;
				if(0 < _left) {
					_self.models.next.set('title', '次の設問まで 残り：' + _left + ' 秒');
    			_self.models.nav.set('html',   '次の設問まで 残り：' + _left + ' 秒');
				}else{
					_self.models.next.set('title', '次へ');
					_isTimePassed = true;
				}
    	}else{
    		_isTimePassed = true;
    	}
    	// next
    	_self.setIsTimePassed(_isTimePassed);
    },
    /**
     * 
     */
    getIsTimePassed: function() {
    	ns.trace(this.typeName + '#getIsTimePassed()');
    	return this.isTimePassed;
    },
   	/**
     * 
     */
    setIsTimePassed: function(timePassed) {
    	ns.trace(this.typeName + '#setIsTimePassed(' + timePassed + ')');
    	if(this.isTimePassed !== timePassed) {
    		this.isTimePassed = timePassed;
    		this.trigger('change:isTimePassed');	
    	}
    	return this;
    },
    /**
     * onIsTimePassedChanged() 
     */
    onIsTimePassedChanged: function() {
    	ns.trace(this.typeName + '#onIsTimePassedChanged()');
    	this.requestNextPage();
    },
    /**
     * requestNextPage()
     */
    requestNextPage: function(callback) {
    	ns.trace(this.typeName + '#requestNextPage()');
    	// 
    	var _self     = this;
    	if('undefined' !== typeof(this.canMoveNext)) {
    		if(!this.canMoveNext()) {
    			return this;
    		}
    	}
    	// 
    	if(!_self._requestNextPageProcess) {
    		
    		_self._requestNextPageProcess = function(callback) {
    			var _fetchPage = function(_enq_id, _id) {
    				_self.fetchPage(_enq_id, _id, function(page){
							_self._page   = page;
							/// navi
							_self.models.nav.set({
		    				"html": _self._page.get('questions').at(0).get('num') + ' / ' +  _self._page.get('question_cnt')
		    			});
							// content
							_self.models.content.set({ 
								"view":        ns.root.ui.Page,
								"model":       page,
								"selector":    ns.root.ui.slctr('page') + ns.root.ui.slctr('template'),
								"clone":       true,
							});
							//
							_self.models.next.set({
								"title":       page.containsQuiz() ? '回答' : '次へ'
							});
							// callback
							callback();
						});
					};
					if(_self._page) {
						var _page       = _self._page; 
						// send answer
						var _answer     = new ns.root.model.Answer({
						                  	enq_id:      _page.get('enq_id'),
						                  	enq_page_id: _page.get('uuid'),
						                  	campaign_id: _self.models.parameter.get('mid'),
						                  	session_id:  this.session_id,
						                  	uid:         _self.models.parameter.get('uid'),
						                  	key:         _self._campaign.get('platform') + '_uid',
						                  });
						// build answer
						var _data = {
							session_id:   _answer.get('session_id'),
							uid:          _answer.get('uid'),
							key:          _answer.get('key')
						};
						var values        = _page.getValues();
						
						var _questions    = _page.get('questions');
						for(var i = 0; i < _questions.length; ++i ){
							var _question   = _questions.at(i);
							var _num        = _question.get('num'); 
							var _value      = values[_num];
							if(_value) {
								var _name     = 'answer_' + _num + '[]';
								_data[_name]  = _value.values;
								// _answer.set(_name, (_values.length === 1) ? _values[0] : _values);
							}
						}
						_answer.data  = _data;
						
						// send
						_self.sendAnswer(_answer, function(){
							var _page     = _self._page;
							var _enq_id   = _page.get('enq_id');
							var _id       = _page.get('next_page_id');
							if(_id) {
								_fetchPage(_enq_id, _id);	
							}else{
								var _model = new ns.root.ui.model.Complete({
									"conversion_tag": _self._campaign.has('conversion_tag') ? _self._campaign.get('conversion_tag') : null,
									"client_url":     _self._campaign.has('client_url') ? _self._campaign.get('client_url') : null
								});
								// complete
								_self.models.content.set({ 
									"view":        ns.root.ui.Complete,
									"model":       _model,
									"selector":    ns.root.ui.slctr('complete')
								});
							}
						});
						
					}else{
						// content
						var _campaign   = _self._campaign;
						var _enq_id     = _campaign.get('enq_id');
						var _id         = _campaign.get('first_page_id');
						_fetchPage(_enq_id, _id);
					}
				};
				_self._requestNextPageProcess(function(){
					_self._requestNextPageProcess = null;
					if('undefined' !== typeof(callback)) {
						callback();
					}
				});
    	}else{
    		_self._requestNextPageProcess(function(){
					_self._requestNextPageProcess = null;
					if('undefined' !== typeof(callback)) {
						callback();
					}
				});
    	}
			return this;
    },
    /**
     * requestThankyouPage()
     */
    requestThankyouPage: function() {
    	ns.trace(this.typeName + '#requestThankyouPage()');
    	// 
    	var _self     = this;
    	// complete
			_self.models.content.set({ 
				"view":        ns.root.ui.Thankyou,
				"model":       new ns.root.ui.model.Thankyou({
				               	"title":        'おめでとうございます！',
				               	"description":  _self._campaign.get('point') + 'をプレゼント',
				               	"social":       _self._campaign.get('message'),
				               	"client_url":   _self._campaign.get('client_url')
				               }),
				"selector":    ns.root.ui.slctr('thankyou')
			});
			// creative if exists
			if(_self._campaign.has('second_picture')) {
				// scond
				_self.models.ad.set({ 
					"creative":    _self._campaign.get('second_picture')
				});
			}
    },
   	/**
     * getIsAdPlaying()
     */
    getIsAdPlaying: function() {
    	ns.trace(this.typeName + '#getIsPlaying()');
    	return this.isAdPlaying;
    },
   	/**
     * setIsAdPlaying()
     */
    setIsAdPlaying: function(playing) {
    	ns.trace(this.typeName + '#setIsAdPlaying(' + playing + ')');
    	if(this.isAdPlaying !== playing) {
    		this.isAdPlaying = playing;
    		this.trigger('change:isAdPlaying');
    	}
    	return this;
    },
    /**
     * onIsAdPlayingChanged() 
     */
    onIsAdPlayingChanged: function() {
    	ns.trace(this.typeName + '#onIsAdPlayingChanged()');
    	
    },
    /**
     * getIsAdEnded()
     */
    getIsAdEnded: function() {
    	ns.trace(this.typeName + '#getIsAdEnded()');
    	return this.isAdEnded;
    },
   	/**
     * setIsAdEnded()
     */
    setIsAdEnded: function(ended) {
    	ns.trace(this.typeName + '#setIsAdEnded(' + ended + ')');
    	if(this.isAdEnded !== ended) {
    		this.isAdEnded = ended;	
    		this.trigger('change:isAdEnded');
    	}
    	return this;
    },
    /**
     * onIsAdEndedChanged() 
     */
    onIsAdEndedChanged: function() {
    	ns.trace(this.typeName + '#onIsAdEndedChanged()');
    },
	}); 
})(mr.controller);