define(["require","underscore","backbone","common/util/xssUtil","attributes/attributesFilter/AttributesFilterCollectionView","attributes/attributesFilter/view/AttributesFilterView","text!attributes/attributesFilter/template/attributesFilterCollectionViewTemplate.htm"],function(t){var e=t("underscore"),i=t("backbone"),r=(t("common/util/xssUtil"),t("attributes/attributesFilter/AttributesFilterCollectionView")),l=t("attributes/attributesFilter/view/AttributesFilterView"),s=t("text!attributes/attributesFilter/template/attributesFilterCollectionViewTemplate.htm");return{_initFilters:function(t){this.filters=new r({collection:new i.Collection(t.filters||[]),childView:l,childViewContainer:"select",template:e.template(s),model:new i.Model({currentFilter:null}),targetCollection:this.collection})},_renderFilters:function(t){var e=this.filters.render().el;return!t&&this.$el.prepend(e)},_resetFilters:function(){this.filters.reset()}}});