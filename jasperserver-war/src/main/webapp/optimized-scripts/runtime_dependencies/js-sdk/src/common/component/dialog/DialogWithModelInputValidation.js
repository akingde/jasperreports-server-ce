define(["require","jquery","underscore","./Dialog","backbone.validation"],function(e){"use strict";var t=e("jquery"),i=e("underscore"),n=e("./Dialog"),a=e("backbone.validation");return n.extend({events:i.extend({"keyup input[type=text], textarea, select":"updateModelProperty","change input[type=text], input:checkbox, textarea, select":"updateModelProperty"},n.prototype.events),initialize:function(){this._bindEvents(),n.prototype.initialize.apply(this,arguments)},_bindEvents:function(){},_unbindEvents:function(){},updateModelProperty:function(e){var i={},n=t(e.target);"input"===n[0].tagName.toLowerCase()&&"text"===n.attr("type")||"select"===n[0].tagName.toLowerCase()&&"true"!==n.attr("multiple")||"textarea"===n[0].tagName.toLowerCase()?i[n.attr("name")]=t.trim(n.val()):"input"===n[0].tagName.toLowerCase()&&"checkbox"===n.attr("type")&&(i[n.attr("name")]=n.is(":checked")),this.beforeModelPropertySet&&this.beforeModelPropertySet(i),this.model.set(i),this.model.validate(i)},bindValidation:function(){a.bind(this,{valid:this.fieldIsValid,invalid:this.fieldIsInvalid,forceUpdate:!0,selector:"name"})},unbindValidation:function(){a.unbind(this)},fieldIsValid:function(e,t,i){var n=e.$("["+i+'="'+t+'"]').parent();n.removeClass("error"),n.find(".message.warning").text("")},fieldIsInvalid:function(e,t,i,n){var a=e.$("["+n+'="'+t+'"]').parent();a.addClass("error"),a.find(".message.warning").text(i.toString())},validField:function(e){var t=this.$(e).parent();t.removeClass("error"),t.find(".message.warning").text("")},invalidField:function(e,t){var i=this.$(e).parent();i.addClass("error"),i.find(".message.warning").text(t.toString())},clearValidationErrors:function(){this.$("label").removeClass("error"),this.$(".message.warning").text("")},remove:function(){this.unbindValidation(),this._unbindEvents(),n.prototype.remove.apply(this,arguments)}})});