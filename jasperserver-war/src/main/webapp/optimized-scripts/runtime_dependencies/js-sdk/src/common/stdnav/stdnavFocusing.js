define(["require","exports","module","jquery","underscore","logger"],function(s,e,u){"use strict";var t=s("jquery"),r=(s("underscore"),s("logger").register(u));return{isLogicFocusable:function(s){if(this.nullOrUndefined(s))return r.error("isLogicFocusable called on a null or undefined element"),!1;var e=t(s),u=!1,n=e.prop("nodeName");e.attr("tabindex");return(e.is(":input")||t.inArray(n,["A","BUTTON","INPUT","SELECT","OBJECT","TEXTAREA"])>-1)&&e.is(":enabled")&&(u=!0),e.is("[tabindex]")&&(u=!0),u},isUserFocusable:function(s){if(this.nullOrUndefined(s))return r.error("isUserFocusable called on a null or undefined element"),!1;var e=t(s),u=!1,n=e.prop("nodeName"),i=e.attr("tabindex");return(e.is(":input")||t.inArray(n,["A","BUTTON","INPUT","SELECT","OBJECT","TEXTAREA"])>-1)&&e.is(":enabled")&&(u=!0),void 0!==i&&(u="-1"!==i),u},suspendFocusability:function(s){if(this.nullOrUndefined(s))return void r.warn("stdnav.suspendFocusability called on null or undefined element");var e=t(s);if(!this.nullOrUndefined(e.attr("js-suspended-tabindex")))return void r.warn("stdnav.suspendFocusability called on already suspended element "+s.nodeType+"#"+s.id);var u=e.attr("tabindex");this.nullOrUndefined(u)?e.attr("js-suspended-tabindex","none"):e.attr("js-suspended-tabindex",u),e.attr("tabindex","-1")},resumeFocusability:function(s){if(this.nullOrUndefined(s))return void r.warn("stdnav.resumeFocusability called on null or undefined element");var e=t(s),u=e.attr("js-suspended-tabindex");if(this.nullOrUndefined(u))return void r.warn("stdnav.resumeFocusability called on non-suspended element "+s.nodeName+"#"+s.id);"none"===u?e.removeAttr("tabindex"):e.attr("tabindex",u),e.removeAttr("js-suspended-tabindex")},ensureFocusabilityBeyond:function(s){t("[suspended-tabindex]").each(function(e){if(!t.contains(e,s)){var u=t(e),r=u.attr("js-suspended-tabindex");u.attr("tabindex",r),u.removeAttr("js-suspended-tabindex")}})},forceFocus:function(s){r.debug("stdnav.forceFocus("+s.nodeName+"#"+s.id+")");var e=t(s),u=0;if(t.each(e.parents("[tabindex]"),function(s,e){var r=t(e);r.attr("tabindex")>u&&(u=r.attr("tabindex")),r.attr("js-suspended-tabindex")>u&&(u=r.attr("js-suspended-tabindex"))}),!e.is(t(document.activeElement))&&(!this.isLogicFocusable(s)||u>e.attr("tabindex"))&&!e.attr("priortabindex")){var n=e.attr("tabindex");void 0!==n?e.data("prior-tabindex",n):e.data("prior-tabindex","none"),e.attr("tabindex",u)}t(s).focus()},setSuperfocus:function(s,e){r.debug("stdnav.setSuperfocus("+s.nodeName+"#"+s.id+", "+e+")"),void 0===e&&(e=!0);var u=t(".subfocus");u.length>0&&(e&&this.runAction("subfocusout",u[0]),u.removeClass("subfocus")),t(s).addClass("subfocus"),e&&(this._prepSubfocusIn(s),this.runAction("subfocusin",s))},setSubfocus:function(s,e){r.debug("stdnav.setSubfocus("+s.nodeName+"#"+s.id+", "+e+")"),void 0===e&&(e=!0);var u=t(".subfocus");u.length>0&&(e&&this.runAction("subfocusout",u[0]),u.removeClass("subfocus")),t(s).addClass("subfocus"),e&&(this._prepSubfocusIn(s),this.runAction("subfocusin",s))},_onFocusIn:function(s){this._currentFocus=s.target;var e=null,u=t(s.target);u.attr("aria-label")&&u.removeAttr("title"),r.info("stdnav._onFocusIn  ev.target=="+s.target.nodeName+"#"+s.target.id),this.updateDebugInfo();for(var n="",i=0;i<this.chaffLength;i++)n+="&nbsp;";if(t("#IECM").html(n),this.chaffLength=(this.chaffLength+1)%this.maxChaffLength,0===this.chaffLength&&(this.chaffLength=1),t(s.target).length<1)return void(this._refocusing=!1);var o=s.target;if(e=this.runAction("fixfocus",o),null===e&&(e=o),e!==o)this._refocusing=!0,this.forceFocus(e);else if(this._refocusing=!1,o===this._priorFocus)0===t(".superfocus").length&&t(this._priorFocus).addClass("superfocus"),0===t(".subfocus").length&&t(this._priorFocus).addClass("subfocus");else{if(t(".subfocus").removeClass("subfocus"),this._priorSubfocus&&this.runAction("subfocusout",this._priorSubfocus),this._priorFocus&&(this.runAction("focusout",this._priorFocus),this._unforceFocus(this._priorFocus)),this._currentFocus=o,this._currentSuperfocus=this.runAction("fixsuperfocus",this._currentFocus),null===this._currentSuperfocus&&(this._currentSuperfocus=t("body")[0]),r.debug("stdnav._onFocusIn: fixsuperfocus("+this._currentFocus.nodeName+"#"+this._currentFocus.id+") returned "+this._currentSuperfocus.nodeName+"#"+this._currentSuperfocus.id),this._currentSuperfocus!==this._priorSuperfocus){var c=t(".superfocus");c.length>0?r.debug("Removing .superfocus from "+c[0].nodeName+"#"+c[0].id):r.warn("No current .superfocus to remove"),t(".superfocus").removeClass("superfocus"),this._priorSuperfocus&&(this.runAction("superfocusout",this._priorSuperfocus),this.resumeFocusability(this._priorSuperfocus)),r.debug("Running ARIA refresh for "+this._currentSuperfocus.nodeName+"#"+this._currentSuperfocus.id),this.runAction("ariarefresh",this._currentSuperfocus),r.debug("Adding .superfocus to "+this._currentSuperfocus.nodeName+"#"+this._currentSuperfocus.id),t(this._currentSuperfocus).addClass("superfocus"),t(this._currentSuperfocus).is(this._currentFocus)||this.suspendFocusability(this._currentSuperfocus),this.runAction("superfocusin",this._currentSuperfocus)}this._currentSubfocus=this.runAction("focusin",this._currentFocus),null===this._currentSubfocus&&(this._currentSubfocus=this._currentFocus),t(this._currentSubfocus).addClass("subfocus"),this.runAction("subfocusin",this._currentSubfocus),this.ensureFocusabilityBeyond(this._currentFocus)}this.updateDebugInfo()},_prepSubfocusIn:function(s){0===t(s).parents(":focus").length&&t(s).focus()},_unforceFocus:function(s){var e=t(s),u=e.data("prior-tabindex");this.nullOrUndefined(u)||("none"===u?e.removeAttr("tabindex"):e.attr("tabindex",u),e.removeData("prior-tabindex"))},_onFocusOut:function(s){this.updateDebugInfo(),!0===this._refocusing||(t(".superfocus").length>0?this._priorSuperfocus=t(".superfocus")[0]:(r.warn("no prior superfocus"),this._priorSuperfocus=t("body")[0]),this._priorFocus=s.target,t(".subfocus").length>0?this._priorSubfocus=t(".subfocus")[0]:(r.warn("no prior subfocus"),this._priorSubfocus=s.target));(t(s.target).is("#globalSearch input#searchInput")||t(s.target).is("#about a.superfocus.subfocus"))&&(t(".subfocus").removeClass("subfocus"),t(".superfocus").removeClass("superfocus")),this.updateDebugInfo()}}});