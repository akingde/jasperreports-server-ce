define(["require","underscore","jquery","../view/MultiSelect","jquery-ui/widgets/resizable"],function(e){"use strict";var t=e("underscore"),i=e("jquery"),s=e("../view/MultiSelect");e("jquery-ui/widgets/resizable");return{_checkDataSize:function(){var e=this.resizableOptions,t=e.sizer,i=e.el,s=e.defaultItemsCount,a=this.availableItemsList.listViewModel.get("total");if(this.resized)return void t.removeClass("hidden");a<=e.defaultItemsCount?(t.addClass("hidden"),i.css("height",this.calcHeightByItemsCount(a)+"px")):(t.removeClass("hidden"),i.css("height",this.calcHeightByItemsCount(s)+"px"))},makeResizable:function(e){if(e=e||{},!e.el||!e.sizer)throw"resizableMultiSelectTrait expect el and sizable to be defined";t.defaults(e,{defaultItemsCount:10,minItemsCount:3,sizerOptions:{}}),this.resizableOptions=e,e.el=i(e.el),e.sizer=i(e.sizer);var s=e.el,a=e.sizer,l=e.sizerOptions,n=e.minItemsCount,r=Math.max(e.defaultItemsCount,n),h=this.calcHeightByItemsCount(r);return t.defaults(l,{handles:{s:a},minHeight:this.calcHeightByItemsCount(n),stop:t.bind(function(){this.resize(),this.resized=!0},this)}),a.addClass(e.sizerClass),s.css("height",h+"px").resizable(l),this.listenTo(this.availableItemsList.model,"change:totalValues",this._checkDataSize,this),this},calcHeightByItemsCount:function(e){return e*this.availableItemsList.listView.itemHeight+this.emptyContainerHeight},destroyResizable:function(){try{this.resizableOptions&&this.resizableOptions.el.resizable("destroy")}catch(e){}},enableResizable:function(){try{this.resizableOptions&&this.resizableOptions.el.resizable("disable")}catch(e){}},disableResizable:function(){try{this.resizableOptions&&this.resizableOptions.el.resizable("enable")}catch(e){}},remove:function(){this.destroyResizable(),s.prototype.remove.call(this)}}});