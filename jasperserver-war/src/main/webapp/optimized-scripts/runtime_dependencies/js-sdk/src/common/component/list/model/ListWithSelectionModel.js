define(["require","underscore","common/component/list/model/BaseListWithSelectionModel"],function(e){"use strict";var t=e("underscore"),i=e("common/component/list/model/BaseListWithSelectionModel");return i.extend({_addToSelection:function(e,t){this.selection[t]=e},_removeFromSelection:function(e,t){this.selection[t]=void 0},_clearSelection:function(){this.selection=[]},_selectionContains:function(e,t){return this.selection[t]===e},_getSelection:function(){return this.selection},_isSelectionEmpty:function(e){if(!e)return!0;if(t.isArray(e)&&0===e.length)return!0;if(t.isArray(e)||"string"==typeof e)return!1;for(var i in e)if(e.hasOwnProperty(i)&&void 0!==e[i])return!1;return!0},_selectPendingSelection:function(e,t){if(0===this.get("bufferStartIndex")&&this.get("bufferEndIndex")==this.get("total")-1)this._convertInitialArrayToSelection(this.get("items"),e,t);else{var i=this;this.getData().done(function(n){i._convertInitialArrayToSelection(n.data,e,t)}).fail(this.fetchFailed)}},_convertInitialArrayToSelection:function(e,t,i){for(var n=0;n<e.length;n++)t[e[n].value]&&this._addToSelection(e[n].value,n);this._triggerSelectionChange(i)},_triggerSelectionChange:function(e){this._calcSelectionStartIndex&&this._calcSelectionStartIndex(),i.prototype._triggerSelectionChange.call(this,e)},_calcSelectionStartIndex:function(){if(void 0===this.selectionStartIndex)for(var e in this.selection)if(this.selection.hasOwnProperty(e)&&void 0!==this.selection[e]){this.selectionStartIndex=parseInt(e,10);break}},select:function(e,i){if(this._clearSelection(),this._isSelectionEmpty(e))return void this._triggerSelectionChange(i);if(t.isArray(e)||"string"==typeof e){var n={};if("string"==typeof e)n[e]=!0;else for(var o=0;o<e.length;o++)n[e[o]]=!0;this._selectPendingSelection(n,i)}else{for(var r in e)if(e.hasOwnProperty(r)){var c=e[r];void 0!==c&&this._addToSelection(c,r)}this._triggerSelectionChange(i)}}})});