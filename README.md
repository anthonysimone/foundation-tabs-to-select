#Foundation Tabs to Select

##Installation

- Run `bower install --save anthonysimone/foundation-tabs-to-select`
- Add `paths.bowerDir + '/foundation-tabs-to-select/foundation-tabs-to-select.js` to the `scriptsSrc` array in `gulpfile.js`.

##Use

Foundation Tabs to Select adds a jQuery plugin that you call on the same element that has been initialized as a Foundation Sites tabs component. A dropdown select is created that stays synced with the tabs in both directions. For example:

```
var tabs = new Foundation.Tabs($('.my-tabs-wrapper'));
$('.my-tabs-wrapper').zfTabsToSelect(options);
```

The options object lets you adjust the default classes being used by the plugin, in case you aren't using the defaults used by Foundation Sites.

```
var options = {
	selectWrapperClass: "select-holder",
	selectClass: "link-select",
	tabsClass: "f-tabs",
	activeTabClass: "is-active"
	tabTextTransform: function($tab) {} // returns string
};
```