define(["require","request","requestSettings","underscore","jrs.configs"],function(e){"use strict";var t=e("request"),n=e("requestSettings"),r=e("underscore"),u=e("jrs.configs"),i=u.contextPath+"/rest_v2/",s=function(e,u){var s=r.extend({},n,{type:"GET",dataType:"json",url:i+e});t(s).fail(function(){u(null)}).then(function(e){u(e)})};return s.load=function(e,t,n,r){if(r.isBuild)return void n();s(e,n)},s});