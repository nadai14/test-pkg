/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * UserAgent class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: ua.js 170 2012-06-13 10:24:36Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-13 19:24:36 +0900 (Wed, 13 Jun 2012) $ by $Author: tsuru $
 * 
 * @link  http://www.quirksmode.org/js/detect.html
 *
 */
var ua = window.ua = (function(){
  var UserAgent =                    function(navigator) {
  	// set navigator
  	this.navigator = navigator || window.navigator;
  	
		// list of browsers
		var _browsers = [
	    {
	      string: this.navigator.userAgent,
	      subString: "Chrome",
	      identity: "Chrome"
	    },
	    {
	    	string: this.navigator.userAgent,
	      subString: "OmniWeb",
	      versionSearch: "OmniWeb/",
	      identity: "OmniWeb"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "Apple",
	      identity: "Safari",
	      versionSearch: "Version"
	    },
	    {
	      prop: window.opera,
	      identity: "Opera",
	      versionSearch: "Version"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "iCab",
	      identity: "iCab"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "KDE",
	      identity: "Konqueror"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "Firefox",
	      identity: "Firefox"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "Camino",
	      identity: "Camino"
	    },
	    {   // for newer Netscapes (6+)
	      string: this.navigator.userAgent,
	      subString: "Netscape",
	      identity: "Netscape"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "MSIE",
	      identity: "Explorer",
	      versionSearch: "MSIE"
	    },
	    {
	      string: this.navigator.userAgent,
	      subString: "Gecko",
	      identity: "Mozilla",
	      versionSearch: "rv"
	    },
	    {     // for older Netscapes (4-)
	      string: this.navigator.userAgent,
	      subString: "Mozilla",
	      identity: "Netscape",
	      versionSearch: "Mozilla"
	    }
	  ];
	  /**
	   * don't change the ORDER!
	   */
	  var _oss = [
	    {
	      string: this.navigator.userAgent,
	      subString: "Win",
	      identity:  "Windows"
	    },
	    {
	    	string: this.navigator.userAgent,
	    	subString: "iPad",
	    	identity:  "iPad"
			},
	    {
	    	string: this.navigator.userAgent,
	    	subString: "iPhone",
	    	identity:  "iPhone/iPod"
			},
			{
	      string: this.navigator.userAgent,
	      subString: "Mac",
	      identity:  "Mac"
	    },
			{
	    	string: this.navigator.userAgent,
	    	subString: "Android",
	    	identity:  "Android"
			},
	    {
	      string: this.navigator.userAgent,
	      subString: "Linux",
	      identity:  "Linux"
	    }
		];
	
		this.browser   = this.searchString(_browsers)
		                 || "An unknown browser";
		this.version   = this.searchVersion(navigator.userAgent)
		                 || this.searchVersion(navigator.appVersion)
		                 || "an unknown version";
		this.OS        = this.searchString(_oss)
		                 || "an unknown OS";
  };
  /**
   * 
	 * @param {Object} navigator
   */
  UserAgent.prototype.init         = function (navigator) {
  	return new UserAgent(navigator);
  }
  /**
   * 
 	 * @param {Object} data
   */
  UserAgent.prototype.searchString = function (data) {
    for (var i=0;i < data.length; i++)  {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  };
  /**
   * 
   * @param {Object} dataString
   */
  UserAgent.prototype.searchVersion = function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	};
	/**
	 * return
	 */
  return new UserAgent(window.navigator); 
})();