define(["require","common/util/browserDetection","jquery"],function(e){"use strict";var t=e("common/util/browserDetection"),n=e("jquery");return{mouseEventOptions:{bubbles:!0,cancelable:!0,view:document.defaultView,detail:0,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null,srcElement:null},triggerNativeEvent:function(e,i,c){var s,r=t.isIE();if(i=i||(r?document.documentElement:window),document.createEvent){var u;switch(e){case"click":case"doubleclick":case"mousedown":case"mousemove":case"mouseout":case"mouseover":case"mouseup":u=n.extend({},this.mouseEventOptions,c),u.srcElement=i,"function"==typeof MouseEvent?s=new MouseEvent(e,u):(s=document.createEvent("MouseEvents"),s.initMouseEvent(e,u.bubbles,u.cancelable,u.view,u.detail,u.screenX,u.screenY,u.clientX,u.clientY,u.ctrlKey,u.altKey,u.shiftKey,u.metaKey,u.button,u.relatedTarget));break;default:u=n.extend({},this.eventOptions,c),u.srcElement=i,s=document.createEvent("HTMLEvents"),s.initEvent(e,u.bubble,u.cancelable)}i.dispatchEvent(s)}else s=document.createEventObject(),s.srcElement=i,"click"==e&&void 0!==i.click?i.click():i.fireEvent("on"+e,s)},simulateClickSequence:function(e){this.triggerNativeEvent("mousedown",e),this.triggerNativeEvent("mouseup",e),this.triggerNativeEvent("click",e)},simulateDoubleClickSequence:function(e){this.triggerNativeEvent("mousedown",e),this.triggerNativeEvent("mouseup",e),this.triggerNativeEvent("click",e),this.triggerNativeEvent("mousedown",e),this.triggerNativeEvent("mouseup",e),this.triggerNativeEvent("click",e),this.triggerNativeEvent("dblclick",e)}}});