define([],function(){return{encode:function(n){return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,function(n,e){return String.fromCharCode("0x"+e)}))},decode:function(n){return decodeURIComponent(atob(n).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""))}}});