dialogs.dependentResources={dependenciesPanel:null,show:function(e,t,n){this.dependenciesPanel=jQuery("#dependencies"),this._$title=this.dependenciesPanel.find(".content .header .title"),n.dialogTitle&&(this._titleBackup=this._$title.html(),this._$title.html(n.dialogTitle)),dialogs.popup.show(this.dependenciesPanel[0]),this._changeMessage(n),this._switchButtons(n);var s=this._initList(e);this.dependenciesPanel.on("click",function(e){var n=jQuery(e.target).closest("button").attr("id"),i=t&&t[n];_.include(["dependenciesBtnSave","dependenciesBtnSaveAs","dependenciesBtnOk","dependenciesBtnCancel"],n)&&(dialogs.dependentResources.hide(),s.setItems([]),e.stopPropagation(),i&&i())})},hide:function(){this.dependenciesPanel&&(this.dependenciesPanel.off("click"),dialogs.popup.hide(this.dependenciesPanel[0]),this.dependenciesPanel=null),this._titleBackup&&this._$title&&(this._$title.html(this._titleBackup),this._titleBackup=null)},_changeMessage:function(e){jQuery("#topMessage").html(e.topMessage),jQuery("#bottomMessage").html(e.bottomMessage)},_initList:function(e){var t=new dynamicList.List("dependenciesList",{listTemplateDomId:"tabular_oneColumn",itemTemplateDomId:"tabular_oneColumn:leaf"}),n=[];return e&&(n=e.collect(function(e){var t=new dynamicList.ListItem({cssClassName:layoutModule.LEAF_CLASS,value:e});return t.processTemplate=function(e){var t,n=e.select(".uri")[0];return t="string"==typeof this.getValue()?this.getValue():this.getValue().uristring?this.getValue().uristring:this.getValue().URIString,n.update(xssUtil.hardEscape(t)),e},t})),t.setItems(n),t.show(),t},_switchButtons:function(e){var t,n={save:jQuery("#dependenciesBtnSave"),saveAs:jQuery("#dependenciesBtnSaveAs"),ok:jQuery("#dependenciesBtnOk"),cancel:jQuery("#dependenciesBtnCancel")};t=e.buttons?e.buttons:e.okOnly?["ok"]:e.canSave?["save","saveAs","cancel"]:["ok","cancel"],_.each(n,function(e,n){t.indexOf(n)<0?e.addClass("hidden"):e.removeClass("hidden")})}};