define(["require","underscore","backbone","tenantImportExport/model/RoleModel","tenantImportExport/model/PermissionModel","actionModel.primaryNavigation"],function(e){var t=e("underscore"),n=e("backbone"),i=e("tenantImportExport/model/RoleModel"),a=e("tenantImportExport/model/PermissionModel"),s=e("actionModel.primaryNavigation");return n.Model.extend({initialize:function(e){e&&(this.userName=e.userName,this.fullName=e.fullName,this.password=e.password||"",this.confirmPassword=e.confirmPassword||"",this.tenantId=e.tenantId,this.email=e.email,this.enabled=e.enabled,this.external=e.external,this.roles=[],e.roles&&e.roles.each(function(e){this.roles.push(new i(e))}.bind(this)),e.permissionToDisplay&&(this.permission=new a(e.permissionToDisplay)))},getNameWithTenant:function(){return this.tenantId&&!t.isEmpty(this.tenantId)?this.userName+"|"+this.tenantId:this.userName},getDisplayName:function(){return this.userName},getManagerURL:function(){return"flow.html?"+Object.toQueryString({_flowId:"userListFlow",text:t.isUndefined(this.userName)?this.userName:encodeURIComponent(this.userName),tenantId:t.isUndefined(this.tenantId)?this.tenantId:encodeURIComponent(this.tenantId)})},equals:function(e){return e&&this.userName==e.userName&&this.tenantId==e.tenantId},toPermissionData:function(){return{userName:this.userName,tenantId:this.tenantId,permissionToDisplay:this.permission.toData()}},navigateToManager:function(){s.navigationPaths.tempNavigateToManager=t.cloneDeep(s.navigationPaths.user),s.navigationPaths.tempNavigateToManager.params+="&"+Object.toQueryString({text:this.userName,tenantId:this.tenantId}),s.navigationOption("tempNavigateToManager")}})});