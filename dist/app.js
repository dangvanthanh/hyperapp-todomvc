!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.app={})}(this,function(t){"use strict";function e(t,e){for(var n=[],o=[],r=arguments.length;r-- >2;)n.push(arguments[r]);for(;n.length;){var u=n.pop();if(u&&u.pop)for(r=u.length;r--;)n.push(u[r]);else null!=u&&!0!==u&&!1!==u&&o.push(u)}return"function"==typeof t?t(e||{},o):{nodeName:t,attributes:e||{},children:o,key:e&&e.key}}var n={All:0,Active:1,Completed:2},o=function(t,e){var n=arguments.length<=2?void 0:arguments[2];return t.map(function(t){return e===t.id?Object.assign({},t,n):t})},r=function(){return JSON.parse(localStorage.getItem("todos-hyperapp")||"[]")},u=function(t){return localStorage.setItem("todos-hyperapp",JSON.stringify(t))},i={input:function(t){var e=t.value;return function(t){return{input:e}}},add:function(){return function(t){var e=t.todos.concat({id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}),done:!1,editing:!1,value:t.input});return u(e),{input:"",todos:e}}},editUpdate:function(t){var e=t.uuid,n=t.value;return function(t,r){var i=o(t.todos,e,{editing:!1,value:n});return u(i),{todos:i}}},editEnter:function(t){var e=t.uuid,n=t.e;return function(t,o){o.editEnterDbClick(e),o.editEnterFocus(n)}},editEnterDbClick:function(t){return function(e,n){var r=o(e.todos,t,{editing:!0});return u(r),{todos:r}}},editEnterFocus:function(t){return function(e,n){t.target.parentNode.parentNode.querySelector(".edit").focus()}},remove:function(t){var e=t.uuid;return function(t,n){var o=t.todos.filter(function(t){return e!==t.id});return u(o),{todos:o}}},toggle:function(t){var e=t.uuid;return function(t,n){var o=t.todos.map(function(t){return e===t.id?Object.assign({},t,{done:!t.done}):t});return u(o),{todos:o}}},toggleAll:function(t){return function(e,n){var o=t.target.previousSibling.checked;o=!o;var r=e.todos.map(function(t){return t.done=o,t});return u(r),{todos:r}}},filter:function(t){var e=t.value;return function(t,n){return{filter:e}}},clearCompleted:function(){return function(t){var e=t.todos.filter(function(t){return!t.done});return u(e),{todos:e}}}},l={input:"",placeholder:"What needs to be done?",todos:[],filter:n.All},a=function(){return e("header",{className:"header"},e("h1",null,"todos"))},c=function(){return e("footer",{className:"info"},e("p",null,"Double-click to edit a todo"),e("p",null,"Written by ",e("a",{href:"http://dangthanh.org"},"Dang Van Thanh")),e("p",null,"Part of ",e("a",{href:"http://todomvc.com"},"TodoMVC")))},d=function(t){return e("div",null,e("input",{type:"text",class:"new-todo",onkeyup:function(e){return 13===e.keyCode&&""!==e.target.value?t.actions.add():null},oninput:function(e){return t.actions.input({value:e.target.value})},value:t.state.input,placeholder:t.state.placeholder,autofocus:!0}))},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var s=function(t){return e("li",{class:function t(e){var n="",o=void 0===e?"undefined":f(e);if("string"===o||"number"===o)return e||"";if(Array.isArray(e)&&e.length>0)for(var r=0,u=e.length;r<u;r++){var i=t(e[r]);i&&(n+=(n&&" ")+i)}else for(var l in e)e.hasOwnProperty(l)&&e[l]&&(n+=(n&&" ")+l);return n}(["todo",{completed:t.todo.done,editing:t.todo.editing}]),key:t.todo.id},e("div",{className:"view"},e("input",{type:"checkbox",class:"toggle",checked:!!t.todo.done,onclick:function(e){return t.actions.toggle({uuid:t.todo.id})}}),e("label",{ondblclick:function(e){return t.actions.editEnter({uuid:t.todo.id,e:e})}},t.todo.value),e("button",{class:"destroy",onclick:function(e){return t.actions.remove({uuid:t.todo.id})}})),e("input",{type:"text",class:"edit",onkeyup:function(e){return 13===e.keyCode?t.actions.editUpdate({uuid:t.todo.id,value:e.target.value}):null},onblur:function(e){return t.actions.editUpdate({uuid:t.todo.id,value:e.target.value})},value:t.todo.value}))},p=function(t){return e("ul",{class:"todo-list"},t.todos.filter(function(e){return t.filter===n.Completed?e.done:t.filter===n.Active?!e.done:t.filter===n.All}).map(function(n){return e(s,{todo:n,actions:t.actions})}))},v=function(t){return e("button",{className:"clear-completed",onclick:t.clearCompleted},"Clear completed")},g=function(t){return e("footer",{className:"footer"},e("span",{className:"todo-count"},t.state.todos.filter(function(t){return!t.done}).length," item left"),e("ul",{className:"filters"},Object.keys(n).map(function(o){return e("li",null,e("a",{href:"#",class:t.state.filter===n[o]?"selected":"",onclick:function(){return t.actions.filter({value:n[o]})}},o))})),t.state.todos.filter(function(t){return t.done}).length>0?e(v,{clearCompleted:t.actions.clearCompleted}):"")},m=function(t){return e("div",null,e("input",{type:"checkbox",className:"toggle-all",id:"toggle-all"}),e("label",{htmlFor:"toggle-all",onclick:function(e){return t.toggleAll(e)}},"Mark all as complete"))};l.todos=r(),l.todos=l.todos.map(function(t){return t.editing=!1,t});var h=function(t,e,n,o){var r,u=[].map,i=o&&o.children[0]||null,l=i&&function t(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:u.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:t(e)})}}(i),a=[],c=!0,d=g(t),f=function t(e,n,o){for(var r in o)"function"==typeof o[r]?function(t,r){o[t]=function(t){var u=r(t);return"function"==typeof u&&(u=u(h(e,d),o)),u&&u!==(n=h(e,d))&&!u.then&&v(d=m(e,g(n,u),d)),u}}(r,o[r]):t(e.concat(r),n[r]=g(n[r]),o[r]=g(o[r]));return o}([],d,g(e));return v(),f;function s(t){return"function"==typeof t?s(t(d,f)):null!=t?t:""}function p(){r=!r;var t=s(n);for(o&&!r&&(i=function t(e,n,o,r,u){if(r===o);else if(null==o||o.nodeName!==r.nodeName){var i=function t(e,n){var o="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),r=e.attributes;if(r){r.oncreate&&a.push(function(){r.oncreate(o)});for(var u=0;u<e.children.length;u++)o.appendChild(t(e.children[u]=s(e.children[u]),n));for(var i in r)b(o,i,r[i],null,n)}return o}(r,u);e.insertBefore(i,n),null!=o&&N(e,n,o),n=i}else if(null==o.nodeName)n.nodeValue=r;else{!function(t,e,n,o){for(var r in g(e,n))n[r]!==("value"===r||"checked"===r?t[r]:e[r])&&b(t,r,n[r],e[r],o);var u=c?n.oncreate:n.onupdate;u&&a.push(function(){u(t,e)})}(n,o.attributes,r.attributes,u=u||"svg"===r.nodeName);for(var l={},d={},f=[],p=o.children,v=r.children,m=0;m<p.length;m++){f[m]=n.childNodes[m];var h=y(p[m]);null!=h&&(l[h]=[f[m],p[m]])}for(var m=0,x=0;x<v.length;){var h=y(p[m]),k=y(v[x]=s(v[x]));if(d[h])m++;else if(null==k||c)null==h&&(t(n,f[m],p[m],v[x],u),x++),m++;else{var C=l[k]||[];h===k?(t(n,C[0],C[1],v[x],u),m++):C[0]?t(n,n.insertBefore(C[0],f[m]),C[1],v[x],u):t(n,f[m],null,v[x],u),d[k]=v[x],x++}}for(;m<p.length;)null==y(p[m])&&N(n,f[m],p[m]),m++;for(var m in l)d[m]||N(n,l[m][0],l[m][1])}return n}(o,i,l,l=t)),c=!1;a.length;)a.pop()()}function v(){r||(r=!0,setTimeout(p))}function g(t,e){var n={};for(var o in t)n[o]=t[o];for(var o in e)n[o]=e[o];return n}function m(t,e,n){var o={};return t.length?(o[t[0]]=t.length>1?m(t.slice(1),e,n[t[0]]):e,g(n,o)):e}function h(t,e){for(var n=0;n<t.length;)e=e[t[n++]];return e}function y(t){return t?t.key:null}function x(t){return t.currentTarget.events[t.type](t)}function b(t,e,n,o,r){if("key"===e);else if("style"===e)for(var u in g(o,n)){var i=null==n||null==n[u]?"":n[u];"-"===u[0]?t[e].setProperty(u,i):t[e][u]=i}else"o"===e[0]&&"n"===e[1]?(e=e.slice(2),t.events?o||(o=t.events[e]):t.events={},t.events[e]=n,n?o||t.addEventListener(e,x):t.removeEventListener(e,x)):e in t&&"list"!==e&&!r?t[e]=null==n?"":n:null!=n&&!1!==n&&t.setAttribute(e,n),null!=n&&!1!==n||t.removeAttribute(e)}function N(t,e,n){function o(){t.removeChild(function t(e,n){var o=n.attributes;if(o){for(var r=0;r<n.children.length;r++)t(e.childNodes[r],n.children[r]);o.ondestroy&&o.ondestroy(e)}return e}(e,n))}var r=n.attributes&&n.attributes.onremove;r?r(e,o):o()}}(l,i,function(t,n){return e("div",{class:"container"},e("section",{class:"todoapp"},e(a,null),e(d,{state:t,actions:n}),e("section",{className:"main"},t.todos.filter(function(t){return!t.done}).length>0?e(m,{toggleAll:n.toggleAll}):"",e(p,{todos:t.todos,actions:n,filter:t.filter})),e(g,{state:t,actions:n})),e(c,null))},document.getElementById("app"));t.main=h,Object.defineProperty(t,"__esModule",{value:!0})});
