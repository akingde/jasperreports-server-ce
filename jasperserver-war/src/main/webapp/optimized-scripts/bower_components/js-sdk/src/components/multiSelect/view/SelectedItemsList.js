define(["require","jquery","backbone","underscore","common/util/browserDetection","bundle!js-sdk/ScalableInputControlsBundle","common/util/xssUtil","components/singleSelect/manager/KeyboardManager","components/scalableList/model/ListWithSelectionModel","components/scalableList/model/listWithNavigationModelTrait","../mixin/scalableListItemHeightCalculationTrait","text!../templates/selectedItemsTemplate.htm","text!../templates/selectedItemsListTemplate.htm","text!../templates/listTemplate.htm","../view/ListViewForSelectedItemsList"],function(e){"use strict";var t=e("jquery"),i=e("backbone"),s=e("underscore"),n=e("common/util/browserDetection"),l=e("bundle!js-sdk/ScalableInputControlsBundle"),o=(e("common/util/xssUtil"),e("components/singleSelect/manager/KeyboardManager")),a=e("components/scalableList/model/ListWithSelectionModel"),d=e("components/scalableList/model/listWithNavigationModelTrait"),c=e("../mixin/scalableListItemHeightCalculationTrait"),r=e("text!../templates/selectedItemsTemplate.htm"),h=e("text!../templates/selectedItemsListTemplate.htm"),u=e("text!../templates/listTemplate.htm"),m=e("../view/ListViewForSelectedItemsList"),w=i.View.extend({className:"jr-mMultiselect-listContainer jr-isInactive jr",events:function(){return{"keydown input":this.keyboardManager.onKeydown,"focus input":"onFocus","blur input":"onBlur","mouseup .jr-mSelectlist-item-delete":"onMouseupOnDeleteButton",mousedown:"onMousedown",mouseup:"onMouseup"}},keydownHandlers:s.extend({65:"onAKey",8:"onDeleteKey",46:"onDeleteKey"},o.prototype.keydownHandlers),initialize:function(e){this.model||(this.model=new i.Model),this.model.set("focused",!1,{silent:!0}),this.template=s.template(r),this.keyboardManager=new o({keydownHandlers:this.keydownHandlers,keydownTimeout:e.keydownTimeout,context:this,deferredKeydownHandler:this.processKeydown,immediateHandleCondition:this.immediateHandleCondition,immediateKeydownHandler:this.immediateKeydownHandler,stopPropagation:!0});var n=a.extend(d);this.listViewModel=e.listViewModel||new n({getData:e.getData,bufferSize:e.bufferSize,loadFactor:e.loadFactor}),this.listView=e.listView||s.extend(new m({el:e.listElement||t(u),model:this.listViewModel,chunksTemplate:e.chunksTemplate,itemsTemplate:e.itemsTemplate||h,scrollTimeout:e.scrollTimeout,lazy:!0,selectedClass:"is-selected",selection:{allowed:!0,multiple:!1}}),c),this.initListeners(),this.render().resize()},initListeners:function(){this.listenTo(this.listView,"active:changed",this.activeChange,this),this.listenTo(this.model,"change:focused",this.focusStateChanged,this),this.listenTo(this.model,"change:disabled",this.changeDisabled,this),this.listenTo(this.listViewModel,"change",this.onModelChange,this)},render:function(){this.listView.undelegateEvents();var e=t(this.template({disabled:this.model.get("disabled"),i18n:l}));return this.$el.empty().append(e).find(".jr-mMultiselect-list").append(this.listView.el),this.listView.render(),this.listView.delegateEvents(),this},renderData:function(){return this.listView.renderData(),this},activeChange:function(e){e?(this.listViewModel.select(e.value,e.index),this.listView.scrollTo(e.index)):this.listViewModel.clearSelection()},changeDisabled:function(){var e=this.model.get("disabled");e?(this.$el.find("input[type='text']").attr("disabled","disabled"),this.listView.setValue({}),this.listView.activate(void 0)):this.$el.find("input[type='text']").removeAttr("disabled"),this.listView.setDisabled(e)},focusStateChanged:function(){this.model.get("focused")?this.$el.find(".mSelect-svListPlaceholder").addClass("focused"):this.$el.find(".mSelect-svListPlaceholder").removeClass("focused")},onModelChange:function(){this.listViewModel.get("total")?this.listView.$el.show():this.listView.$el.hide()},onFocus:function(){this.model.set("focused",!0)},onBlur:function(){this.preventBlur||this.model.set("focused",!1)},onMouseupOnDeleteButton:function(e){this.onDeleteKey(e)},onMousedown:function(){n.isIPad()||(this.preventBlur=!0,this.model.get("focused")||this.$el.find("input").focus())},onMouseup:function(){this.preventBlur&&(this.$el.find("input").focus(),delete this.preventBlur)},onUpKey:function(e){this.listView.activatePrevious()},onDownKey:function(e){var t=this.listView.getActiveValue();t?this.listView.activateNext():this.listView.activateFirst()},onEnterKey:function(e){},onHomeKey:function(e){this.listView.activateFirst()},onEndKey:function(e){this.listView.activateLast()},onPageUpKey:function(e){this.listView.pageUp()},onPageDownKey:function(e){this.listView.pageDown()},onTabKey:function(){},onAKey:function(e){},onDeleteKey:function(e){var t=this.listView.getValue();if(t&&t.length>0){var i=!0;for(var s in t)if(t.hasOwnProperty(s)&&void 0!==t[s]){i=!1;break}i||this.trigger("selection:remove",t)}},fetch:function(e,t){this.listView.setValue({}),this.listView.activate(void 0),this.listView.fetch(e,t)},resize:function(){this.listView.resize()},setDisabled:function(e){this.model.set("disabled",e)},getDisabled:function(){return this.model.get("disabled")},remove:function(){this.listView.remove(),i.View.prototype.remove.call(this)}});return w});