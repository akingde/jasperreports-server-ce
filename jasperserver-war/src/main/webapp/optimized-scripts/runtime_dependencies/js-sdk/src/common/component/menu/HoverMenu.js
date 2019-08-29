define(["require","jquery","./AttachableMenu","underscore"],function(t){"use strict";var e=t("jquery"),o=t("./AttachableMenu"),i=t("underscore");return o.extend({_isVisible:!1,_elementHovered:!1,_menuHovered:!1,TIME_BETWEEN_MOUSE_OVERS:200,constructor:function(t,e,s,n){i.bindAll(this,"_onAttachToMouseOver","_onAttachToMouseOut"),this.padding=s||{top:0,left:0},o.call(this,t,e,this.padding,n),this.on("mouseover container:mouseover",this._onMenuItemMouseOver),this.on("mouseout container:mouseout",this._onMenuItemMouseOut),this.on("selectionMade",this._hide)},setAttachTo:function(t){this._removeEventListeners(),o.prototype.setAttachTo.call(this,t),this._addEventListeners()},hide:function(){this._hide()},_onMenuItemMouseOver:function(){this._menuHovered=!0,this._elementHovered=!1},_onMenuItemMouseOut:function(){this._menuHovered=!1,this._hideByTimeout()},_onAttachToMouseOver:function(){this.$attachTo.is(":disabled")||(this._elementHovered=!0,this._isVisible||(this.show(),this._isVisible=!0))},_onAttachToMouseOut:function(t){var o=t.relatedTarget;this.el===o||e.contains(this.el,o)||(this._elementHovered=!1,this._hideByTimeout())},_hideByTimeout:function(){this._elementHovered||this._menuHovered||setTimeout(i.bind(this._tryHide,this),this.TIME_BETWEEN_MOUSE_OVERS)},_tryHide:function(){this._elementHovered||this._menuHovered||this._hide()},_hide:function(){o.prototype.hide.call(this),this._isVisible=!1,this.trigger("hidden")},_addEventListeners:function(){this.$attachTo&&this.$attachTo.on("mouseover",this._onAttachToMouseOver),this.$attachTo&&this.$attachTo.on("mouseout",this._onAttachToMouseOut)},_removeEventListeners:function(){this.$attachTo&&this.$attachTo.off("mouseover",this._onAttachToMouseOver),this.$attachTo&&this.$attachTo.off("mouseout",this._onAttachToMouseOut)},remove:function(){this._removeEventListeners(),o.prototype.remove.apply(this,arguments)}})});