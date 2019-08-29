var resourceListOfValues={LABEL_ID:"labelID",RESOURCE_ID_ID:"resourceID",DESCRIPTION_ID:"description",ITEM_NAME_ID:"name",ITEM_VALUE_ID:"value",SUBMIT_EVENT_ID:"submitEvent",ITEM_TO_DELETE_ID:"itemToDelete",SAVE_BUTTON_PATTERN:"#save",CANCEL_BUTTON_PATTERN:"#cancel",ADD_LINK_ID:"add",LINK_PATTERN:"a.launcher",_canGenerateId:!0,initialize:function(e){this._form=$(document.body).select("form")[0],this._label=$(this.LABEL_ID),this._resourceId=$(this.RESOURCE_ID_ID),this._description=$(this.DESCRIPTION_ID),this._itemName=$(this.ITEM_NAME_ID),this._itemValue=$(this.ITEM_VALUE_ID),this._submitEvent=$(this.SUBMIT_EVENT_ID),this._itemToDelete=$(this.ITEM_TO_DELETE_ID),this._addLink=$(this.ADD_LINK_ID),this._isEditMode=e.isEditMode,this._label.validator=resource.labelValidator.bind(this),this._resourceId.validator=resource.resourceIdValidator.bind(this),this._description.validator=resource.descriptionValidator.bind(this),this._itemName.validator=this._itemNameValidator.bind(this),this._itemValue.validator=this._itemValueValidator.bind(this),this._initEvents()},_initEvents:function(){this._form.observe("click",function(e){var t=e.element();if(e.stop(),matchAny(t,[this.SAVE_BUTTON_PATTERN],!0))this._isDataValid()&&(this._submitEvent.writeAttribute("name","_eventId_save"),this._form.submit());else if(t==this._addLink)this._isValueDataValid()&&this._isDataValid()&&(this._submitEvent.writeAttribute("name","_eventId_addItem"),this._form.submit());else if(matchAny(t,[this.LINK_PATTERN],!0)&&t!=this._addLink){var i=t.identify();this._itemToDelete.setValue(i),this._submitEvent.writeAttribute("name","_eventId_removeItem"),this._form.submit()}else matchAny(t,[this.CANCEL_BUTTON_PATTERN],!0)&&(this._submitEvent.writeAttribute("name","_eventId_cancel"),this._form.submit())}.bindAsEventListener(this)),this._form.observe("keyup",function(e){var t=e.element();[this._label,this._resourceId,this._description,this._itemName,this._itemValue].include(t)&&(ValidationModule.validate(resource.getValidationEntries([t])),t==this._resourceId&&this._resourceId.getValue()!=resource.generateResourceId(this._label.getValue())&&(this._canGenerateId=!1),t==this._label&&!this._isEditMode&&this._canGenerateId&&(this._resourceId.setValue(resource.generateResourceId(this._label.getValue())),ValidationModule.validate(resource.getValidationEntries([this._resourceId]))))}.bindAsEventListener(this))},_isDataValid:function(){var e=[this._label,this._resourceId,this._description];return ValidationModule.validate(resource.getValidationEntries(e))},_isValueDataValid:function(){var e=[this._itemName,this._itemValue];return ValidationModule.validate(resource.getValidationEntries(e))},_itemNameValidator:function(e){var t=!0,i="";return e.blank()&&(i=resource.messages.itemNameIsEmpty,t=!1),{isValid:t,errorMessage:i}},_itemValueValidator:function(e){var t=!0,i="";return e.blank()&&(i=resource.messages.itemValueIsEmpty,t=!1),{isValid:t,errorMessage:i}}};"undefined"==typeof require&&document.observe("dom:loaded",function(){resourceListOfValues.initialize(localContext.initOptions)});