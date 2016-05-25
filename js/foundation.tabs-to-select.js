/**
 * Given foundation 6 tabs, add a select option for small displays that is synced with the tab display
 * Call on the same element that has Foundation tabs initialized on it.
 *
 * jQuery plugin template from
 * https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 */
;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "zfTabsToSelect",
    defaults = {
      selectWrapperClass: "select-holder",
      selectClass: "link-select",
      tabsClass: "f-tabs",
      activeTabClass: "is-active"
    };

  // The actual plugin constructor
  function ZfTabsToSelect( element, options ) {
    this.element = element;

    // Get merge defined options with defaults
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  ZfTabsToSelect.prototype = {

    init: function() {
      // Place initialization logic here
      // You have access to the DOM element and the options via the instance,
      // e.g. this.element and this.options
      var $selectWrapper = $('<div />').addClass(this.options.selectWrapperClass),
        $select = $('<select />').addClass(this.options.selectClass),
        $tabsWrapper = $(this.element),
        $tabs = $tabsWrapper.find('.' + this.options.tabsClass);

      // Add wrapper to select element and append to DOM
      $selectWrapper.append($select).insertBefore($tabs);

      // Iterate through tabs, and foreach tab, create a select option
      $('> li a', $tabs).each(function() {
        var option = $('<option />')
          .appendTo($select)
          .val($(this).attr('href'))
          .html($(this).html());
      });

      // Set select to initial active tab (in case of deep linking)
      $select.val($('.' + this.options.activeTabClass + ' a', $tabs).attr('href'));

      // Bind change event to select the proper tab
      $('.' + this.options.selectClass).bind('change', function () {
        var href = $(this).val(); // get selected value
        $('a[href$="'+href+'"]', $tabs).trigger('click');
        return false;
      });

      // Listen for tab change event to keep select in sync with tabs
      $tabsWrapper.on('change.zf.tabs', function(event, tab) {
        var target = $('a', tab).attr('href');
        if ($select.val() != target) {
          $select.val(target);
        }
      });
    }

  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
          new ZfTabsToSelect( this, options ));
      }
    });
  };

})( jQuery, window, document );