!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.JSZipUtils=a():"undefined"!=typeof global?global.JSZipUtils=a():"undefined"!=typeof self&&(self.JSZipUtils=a())}(function(){return function v(c,d,i){function s(e,n){if(!d[e]){if(!c[e]){var p="function"==typeof require&&require;if(!n&&p)return p(e,!0);if(y)return y(e,!0);throw new Error("Cannot find module '"+e+"'")}var u=d[e]={exports:{}};c[e][0].call(u.exports,function(o){return s(c[e][1][o]||o)},u,u.exports,v,c,d,i)}return d[e].exports}for(var y="function"==typeof require&&require,l=0;l<i.length;l++)s(i[l]);return s}({1:[function(v,c,d){"use strict";var i={};function s(){try{return new window.XMLHttpRequest}catch(e){}}i._getBinaryFromXHR=function(e){return e.response||e.responseText};var l="undefined"!=typeof window&&window.ActiveXObject?function(){return s()||function y(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}()}:s;i.getBinaryContent=function(e,n){var p,u,o,f;n||(n={}),"function"==typeof n?(f=n,n={}):"function"==typeof n.callback&&(f=n.callback),f||"undefined"==typeof Promise?(u=function(t){f(null,t)},o=function(t){f(t,null)}):p=new Promise(function(t,w){u=t,o=w});try{var r=l();r.open("GET",e,!0),"responseType"in r&&(r.responseType="arraybuffer"),r.overrideMimeType&&r.overrideMimeType("text/plain; charset=x-user-defined"),r.onreadystatechange=function(t){if(4===r.readyState)if(200===r.status||0===r.status)try{u(i._getBinaryFromXHR(r))}catch(w){o(new Error(w))}else o(new Error("Ajax error for "+e+" : "+this.status+" "+this.statusText))},n.progress&&(r.onprogress=function(t){n.progress({path:e,originalEvent:t,percent:t.loaded/t.total*100,loaded:t.loaded,total:t.total})}),r.send()}catch(t){o(new Error(t),null)}return p},c.exports=i},{}]},{},[1])(1)});