(this.webpackJsonpcat3d=this.webpackJsonpcat3d||[]).push([[0],{108:function(e,t,r){},118:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(24),a=r.n(i),c=(r(95),r(5)),s=r(8),d=Object(n.createContext)({setCurrentlyDragging:function(){},setOnBackgroundClick:function(){},setControlMode:function(){},controlMode:"view",render:function(){}});function u(e){var t=e.children,r=e.environment;return Object(s.jsx)(d.Provider,{value:r,children:t})}function l(){return Object(n.useContext)(d)}var h=r(15),f=r(14),j=r(16),w=r(1),v=r(4);function b(){for(var e=new c.Vector3(0,0,0),t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return r.forEach((function(t){return e.add(t)})),e.divideScalar(r.length),e}function g(e){return Object.keys(e)}var m=r(78);function O(e){return e.startsWith("n")}function p(e){return e.startsWith("1a")}function y(e){var t,r;if(0===e.length)return!1;var n={};e.forEach((function(e){var t=e.domainId,r=e.codomainId;if(n[t]){if(n[t].out)return!1;n[t].out=e}else n[t]={out:e};if(n[r]){if(n[r].in)return!1;n[r].in=e}else n[r]={in:e}}));for(var o=null!==(t=null===(r=Object.values(n).find((function(e){return e.out&&!e.in})))||void 0===r?void 0:r.out)&&void 0!==t?t:e[0],i=o.domainId,a=o.codomainId,c=n[a].out,s=[o.id];c&&c!==o;)s.push(c.id),a=c.codomainId,c=n[a].out;return s.length===e.length&&{domainId:i,codomainId:a,sequence:s}}var I=function(){function e(t,r){Object(w.a)(this,e),this.render=t,this.addToast=r,this.nodes={},this.arrows={},this.twoArrows={},this.threeArrows={},this.nodeIdCounter=0,this.arrowIdCounter=0,this.twoArrowIdCounter=0,this.threeArrowIdCounter=0,this.selected={};var n=new URLSearchParams(window.location.search),o=n.get("n");o&&(this.nodes=function(e){var t={};try{e.split("_").forEach((function(e){var r=e.split("*");t[r[0]]={id:r[0],position:new c.Vector3(parseFloat(r[1]),parseFloat(r[2]),parseFloat(r[3]))}}))}catch(r){return console.warn("Error deserialising Nodes, defaulting to empty"),{}}return t}(o)),this.nodeIdCounter=g(this.nodes).length;var i=n.get("a");i&&(this.arrows=function(e){var t={};try{e.split("_").forEach((function(e){var r=e.split("*");t[r[0]]={id:r[0],domainId:r[1],codomainId:r[2],guidePoint:new c.Vector3(parseFloat(r[3]),parseFloat(r[4]),parseFloat(r[5]))}}))}catch(r){return console.warn("Error deserialising Arrows, defaulting to empty"),{}}return t}(i)),this.arrowIdCounter=g(this.arrows).length;var a=n.get("a2");a&&(this.twoArrows=function(e){var t={};try{e.split("_").forEach((function(e){var r=e.split("*");t[r[0]]={id:r[0],domainIds:r[1].split("-"),codomainIds:r[2].split("-"),guidePoint:new c.Vector3(parseFloat(r[3]),parseFloat(r[4]),parseFloat(r[5]))}}))}catch(r){return console.warn("Error deserialising 2-arrows, defaulting to empty"),{}}return t}(a)),this.twoArrowIdCounter=g(this.twoArrows).length}return Object(v.a)(e,[{key:"update",value:function(){var e,t,r,n=new URL(window.location.toString());n.searchParams.set("n",(e=this.nodes,Object.values(e).map((function(e){return[e.id,e.position.x.toFixed(3),e.position.y.toFixed(3),e.position.z.toFixed(3)].join("*")})).join("_"))),n.searchParams.set("a",(t=this.arrows,Object.values(t).map((function(e){return[e.id,e.domainId,e.codomainId,e.guidePoint.x.toFixed(3),e.guidePoint.y.toFixed(3),e.guidePoint.z.toFixed(3)].join("*")})).join("_"))),n.searchParams.set("a2",(r=this.twoArrows,Object.values(r).map((function(e){return[e.id,e.domainIds.join("-"),e.codomainIds.join("-"),e.guidePoint.x.toFixed(3),e.guidePoint.y.toFixed(3),e.guidePoint.z.toFixed(3)].join("*")})).join("_"))),window.history.pushState({},"",n),this.render()}},{key:"addNode",value:function(e){var t="n".concat(this.nodeIdCounter);this.nodeIdCounter+=1,this.nodes[t]={position:e,id:t},this.selected={},this.update(),Object(m.a)(this)}},{key:"addArrow",value:function(e,t){var r="1a".concat(this.arrowIdCounter);this.arrowIdCounter+=1,this.arrows[r]={domainId:e,codomainId:t,id:r,guidePoint:b(this.nodes[e].position,this.nodes[t].position)}}},{key:"addTwoArrow",value:function(e,t,r){var n="2a".concat(this.twoArrowIdCounter);this.twoArrowIdCounter+=1,this.twoArrows[n]={domainIds:e,codomainIds:t,id:n,guidePoint:r}}},{key:"addTwoArrowFromSelectionIfPossible",value:function(){var e=this.getSelectedArrows("primary"),t=this.getSelectedArrows("secondary"),r=y(e),n=y(t);r&&n&&r.domainId===n.domainId&&r.codomainId===n.codomainId&&(this.addTwoArrow(r.sequence,n.sequence,b.apply(void 0,Object(j.a)([].concat(Object(j.a)(e),Object(j.a)(t)).map((function(e){return e.guidePoint}))))),this.selected={})}},{key:"getNodes",value:function(){return Object.values(this.nodes)}},{key:"getArrows",value:function(){return Object.values(this.arrows)}},{key:"getTwoArrows",value:function(){return Object.values(this.twoArrows)}},{key:"getArrowPoints",value:function(e){var t=this.arrows[e],r=t.domainId,n=t.guidePoint,o=t.codomainId;return[this.nodes[r].position,n,this.nodes[o].position]}},{key:"getSelectedNodeIds",value:function(){var e=this;return g(this.selected).filter(O).filter((function(t){return e.selected[t]}))}},{key:"getSelectedArrowIds",value:function(e){var t=this;return g(this.selected).filter(p).filter((function(r){var n;return null===(n=t.selected[r]===e)||void 0===n||n}))}},{key:"getSelectedArrows",value:function(e){var t=this;return this.getSelectedArrowIds(e).map((function(e){return t.arrows[e]}))}},{key:"onClick",value:function(e,t){O(e)?this.onNodeClick(e,t):p(e)&&this.onArrowClick(e,t),this.update()}},{key:"onNodeClick",value:function(e,t){var r=this;this.selectionState(e)?t.shiftKey?this.selected[e]=!1:this.selected={}:t.shiftKey?this.selected[e]="primary":t.ctrlKey||t.metaKey?(this.getSelectedNodeIds().forEach((function(t){r.addArrow(t,e)})),this.selected={}):this.selected=Object(f.a)({},e,"primary")}},{key:"onArrowClick",value:function(e,t){this.selectionState(e)?t.shiftKey?this.selected[e]=!1:this.selected={}:!t.shiftKey||t.ctrlKey||t.metaKey?t.shiftKey&&(t.ctrlKey||t.metaKey)||t.ctrlKey||t.metaKey?this.trySelectArrow(e,"secondary"):this.selected=Object(f.a)({},e,"primary"):this.trySelectArrow(e,"primary")}},{key:"trySelectArrow",value:function(e,t){y(this.getSelectedArrows(t).concat(this.arrows[e]))?this.selected[e]=t:this.addToast("Cannot compose that arrow with current selection",{appearance:"warning"}),this.addTwoArrowFromSelectionIfPossible()}},{key:"selectionState",value:function(e){var t;return null!==(t=this.selected[e])&&void 0!==t&&t}},{key:"deleteNode",value:function(e){var t=this;g(this.arrows).forEach((function(r){var n=t.arrows[r];n.codomainId!==e&&n.domainId!==e||t.deleteArrow(r)})),delete this.nodes[e]}},{key:"deleteArrow",value:function(e){var t=this;g(this.twoArrows).forEach((function(r){var n=t.twoArrows[r];(n.codomainIds.includes(e)||n.domainIds.includes(e))&&t.deleteTwoArrow(r)})),delete this.arrows[e]}},{key:"deleteTwoArrow",value:function(e){var t=this;g(this.threeArrows).forEach((function(r){var n=t.threeArrows[r];(n.codomainIds.includes(e)||n.domainIds.includes(e))&&t.deleteThreeArrow(r)})),delete this.twoArrows[e]}},{key:"deleteThreeArrow",value:function(e){delete this.threeArrows[e]}},{key:"onKeyDown",value:function(e){var t=this;"Backspace"===e.key&&(g(this.selected).forEach((function(e){O(e)&&t.deleteNode(e),p(e)&&t.deleteArrow(e),function(e){return e.startsWith("2a")}(e)&&t.deleteTwoArrow(e),function(e){return e.startsWith("3a")}(e)&&t.deleteThreeArrow(e)})),this.selected={},this.update())}}]),e}(),x=r(23);function C(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.05,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:36,o=3===e.length?Object(x.a)(c.QuadraticBezierCurve3,Object(j.a)(e)):Object(x.a)(c.CubicBezierCurve3,Object(j.a)(e)),i=o.getTangent(1),a=e.slice(-1)[0],s=a.clone().sub(i.clone().multiplyScalar(r));return new c.ConeGeometry(t,r,n).applyQuaternion((new c.Quaternion).setFromUnitVectors(new c.Vector3(0,1,0),i)).translate(s.x,s.y,s.z)}var A=r(86);function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.02,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:48;return new A.a.TubeGeometry(3===e.length?Object(x.a)(c.QuadraticBezierCurve3,Object(j.a)(e)):Object(x.a)(c.CubicBezierCurve3,Object(j.a)(e)),r,t,12)}function S(e,t,r){for(var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:32,o=e.map((function(e){return 3===e.length?Object(x.a)(c.QuadraticBezierCurve3,Object(j.a)(e)):Object(x.a)(c.CubicBezierCurve3,Object(j.a)(e))})),i=t.map((function(e){return 3===e.length?Object(x.a)(c.QuadraticBezierCurve3,Object(j.a)(e)):Object(x.a)(c.CubicBezierCurve3,Object(j.a)(e))})),a=new c.QuadraticBezierCurve3(e[0][0],r,e.slice(-1)[0].slice(-1)[0]),s=[],d=n*Math.max(o.length,i.length),u=1;u<d;u++){var l=d/o.length,h=d/i.length,f=o[Math.floor(u/l)],w=i[Math.floor(u/h)],v=f.getPoint(u%Math.floor(l)/l),b=w.getPoint(u%Math.floor(h)/h),g=a.getPoint(u/d),m=new c.QuadraticBezierCurve3(v,g,b);s.push([]);for(var O=0;O<=n;O++){var p=m.getPoint(O/n);s[u-1].push(p)}}for(var y=[],I=1;I<d;I++)for(var C=0;C<=n;C++){var A=s[I-1][C],k=I>1?s[I-2][C]:s[I][C],S=C>0?s[I-1][C-1]:s[I-1][C+1],P=A.clone().sub(k).cross(A.clone().sub(S)).normalize();P.multiplyScalar((I>1?1:-1)*(C>0?1:-1)),y.push(P)}for(var F=[],T=0;T<d-2;T++)for(var G=0;G<n;G++){var L=G+T*(n+1),R=G+1+T*(n+1),E=G+(T+1)*(n+1),M=G+1+(T+1)*(n+1);F.push(L,R,E),F.push(M,E,R)}var H=new c.BufferGeometry;return H.setAttribute("position",new c.BufferAttribute(new Float32Array(s.flatMap((function(e){return e})).flatMap((function(e){return[e.x,e.y,e.z]}))),3)),H.setAttribute("normal",new c.BufferAttribute(new Float32Array(y.flatMap((function(e){return[e.x,e.y,e.z]}))),3)),H.setIndex(F),H}function P(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.05,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12,r=[],n=0;n<=t;n++)r.push(new c.Vector2(e*Math.sin(n*Math.PI/t),-e*Math.cos(n*Math.PI/t)));return new c.LatheGeometry(r,2*t)}var F=r(13),T=Object(n.createContext)({nodeRadius:0,guidePointRadius:0,highlightWidth:0,arrowRadius:0});function G(e){var t=e.children,r=Object(n.useState)(.1),o=Object(F.a)(r,1)[0],i=Object(n.useState)(.07),a=Object(F.a)(i,1)[0],c=Object(n.useState)(.005),d=Object(F.a)(c,1)[0],u=Object(n.useState)(.02),l=Object(F.a)(u,1)[0];return Object(s.jsx)(T.Provider,{value:{nodeRadius:o,guidePointRadius:a,highlightWidth:d,arrowRadius:l},children:t})}function L(){return Object(n.useContext)(T)}function R(e){var t=e.color;return Object(s.jsx)("meshBasicMaterial",{attach:"material",color:t.toString(),side:c.BackSide})}function E(e){var t=e.color;return Object(s.jsx)("meshStandardMaterial",{attach:"material",color:t.toString(),emissiveIntensity:0,roughness:.5})}function M(e){var t=e.color,r=e.twoSided,n=void 0!==r&&r;return Object(s.jsx)("meshStandardMaterial",{attach:"material",color:t.toString(),opacity:.3,transparent:!0,side:n?c.DoubleSide:c.BackSide})}r(71),r(137);var H=r(27),B=r.n(H),K={HIGHLIGHTS:[B()("#8dff13"),B()("#ff12bc")],BLACK:B()("#000000"),DARK:B()("#0d1416"),GREY:B()("#475154"),LIGHT:B()("#f7f9f9"),WHITE:B()("#FFFFFF"),LIGHTING:{WARM:B()("#FFCCCC"),NEUTRAL:B()("#E5CCE5"),COLD:B()("#CCCCFF")}};var z,N,V=r(37),D=r(38);D.a.div(z||(z=Object(V.a)(["\n  display: flex;\n  flex-direction: column;\n"])));D.a.div(N||(N=Object(V.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));var W,Q=r(9);D.a.div(W||(W=Object(V.a)(["\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n"]))),r(108);r(20);r(138);var _=r(84),U=function(e){var t=e.position,r=void 0===t?new c.Vector3(0,0,0):t,o=e.onClick,i=e.children,a=Object(n.useRef)(null),d=l().setCurrentlyDragging,u=Object(h.k)(),f=u.camera,j=u.size,w=Object(n.useMemo)((function(){return new c.Raycaster}),[]),v=Object(n.useRef)(new c.Plane(new c.Vector3(0,0,1))),b=Object(n.useRef)(new c.Vector3(0,0,0));Object(n.useEffect)((function(){a.current&&a.current.position.copy(r)}),[]);var g=Object(n.useCallback)((function(e,t){var r=new c.Vector2(e/j.width*2-1,-t/j.height*2+1),n=new c.Vector3;return w.setFromCamera(r,f),w.ray.intersectPlane(v.current,n),n}),[]),m=Object(_.a)((function(e){var t=Object(F.a)(e.xy,2),n=t[0],i=t[1],s=Object(F.a)(e.movement,2),u=s[0],l=s[1],h=e.first,j=e.last,w=e.event;if(w.stopPropagation(),h){var m,O;d(!0);var p=new c.Vector3;f.getWorldDirection(p),v.current.setFromNormalAndCoplanarPoint(p,(null===(m=a.current)||void 0===m?void 0:m.position)||new c.Vector3(0,0,0)),b.current=(null===(O=a.current)||void 0===O?void 0:O.position.clone().sub(g(n,i)))||new c.Vector3(0,0,0)}a.current&&a.current.position.copy(g(n,i).add(b.current)),j&&(d(!1),a.current&&r.copy(a.current.position),0===u&&0===l&&(null===o||void 0===o||o(w)))}));return Object(s.jsx)("group",Object(Q.a)(Object(Q.a)({},m()),{},{ref:a,children:i}))};function Y(e){var t=e.arrow,r=t.id,n=t.guidePoint,o=e.elements,i=L(),a=i.arrowRadius,c=i.highlightWidth,d=i.guidePointRadius,u=i.nodeRadius,l=o.selectionState(r),h="primary"===l?0:1;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("mesh",{geometry:k(o.getArrowPoints(r),a),onClick:function(e){return o.onClick(r,e)},children:Object(s.jsx)(E,{color:K.GREY})},r),Object(s.jsx)("mesh",{geometry:C(o.getArrowPoints(r),.07,.14,u/3),onClick:function(e){return o.onClick(r,e)},children:Object(s.jsx)(E,{color:K.GREY})},r),l&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("mesh",{geometry:k(o.getArrowPoints(r),a+c),children:Object(s.jsx)(R,{color:K.HIGHLIGHTS[h]})},r+"highlight"),Object(s.jsx)(U,{position:n,children:Object(s.jsx)("mesh",{geometry:P(d),children:Object(s.jsx)(M,{color:K.HIGHLIGHTS[h]})})},r+"guidePoint")]})]})}function q(e){var t=e.node,r=t.id,n=t.position,o=e.elements,i=L(),a=i.nodeRadius,c=i.highlightWidth;return Object(s.jsxs)(U,{position:n,onClick:function(e){return o.onClick(r,e)},children:[Object(s.jsx)("mesh",{geometry:P(a),children:Object(s.jsx)(E,{color:K.GREY})}),o.selectionState(r)&&Object(s.jsx)("mesh",{geometry:P(a+c),children:Object(s.jsx)(R,{color:K.HIGHLIGHTS[0]})})]},r)}function J(e){var t=e.twoArrow,r=t.id,n=t.domainIds,o=t.codomainIds,i=t.guidePoint,a=e.elements;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("mesh",{geometry:S(n.map(a.getArrowPoints.bind(a)),o.map(a.getArrowPoints.bind(a)),i),onClick:function(e){return a.onClick(r,e)},children:Object(s.jsx)(M,{color:K.HIGHLIGHTS[0],twoSided:!0})},r)})}var X=r(62);function Z(){var e=l(),t=e.setOnBackgroundClick,r=e.render,o=Object(X.useToasts)().addToast,i=Object(n.useRef)(new I(r,o)).current,a=Object(h.k)(),d=a.camera,u=a.size;Object(n.useEffect)((function(){return document.addEventListener("keydown",i.onKeyDown.bind(i)),function(){document.removeEventListener("keydown",i.onKeyDown.bind(i))}}),[]);var f=Object(n.useMemo)((function(){return new c.Raycaster}),[]),j=Object(n.useMemo)((function(){return new c.Plane(new c.Vector3(0,1,0))}),[]);return Object(n.useEffect)((function(){return t((function(){return function(e){if(!(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey||e.button>1)){var t=new c.Vector2(e.x/u.width*2-1,-e.y/u.height*2+1),n=new c.Vector3;f.setFromCamera(t,d),f.ray.intersectPlane(j,n),i.addNode(n),r()}}}))}),[t]),Object(s.jsxs)(s.Fragment,{children:[i.getNodes().map((function(e){return Object(s.jsx)(q,{node:e,elements:i},e.id)})),i.getArrows().map((function(e){return Object(s.jsx)(Y,{arrow:e,elements:i},e.id)})),i.getTwoArrows().map((function(e){return Object(s.jsx)(J,{twoArrow:e,elements:i},e.id)}))]})}var $=r(41),ee=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("ambientLight",{intensity:.45}),Object(s.jsx)("directionalLight",{position:[0,0,20],color:K.LIGHTING.WARM.toString(),castShadow:!0}),Object(s.jsx)("directionalLight",{position:[17,0,-10],color:K.LIGHTING.COLD.toString(),castShadow:!0}),Object(s.jsx)("directionalLight",{position:[-17,0,-10],color:K.LIGHTING.NEUTRAL.toString(),castShadow:!0}),Object(s.jsx)("directionalLight",{position:[0,20,0],color:K.LIGHTING.WARM.toString(),castShadow:!0}),Object(s.jsx)("directionalLight",{position:[0,-20,0],color:K.LIGHTING.COLD.toString(),castShadow:!0})]})},te=r(139);function re(e){var t=e.children,r=Object(n.useState)(!1),o=Object(F.a)(r,2),i=o[0],a=o[1],c=Object(n.useState)("view"),d=Object(F.a)(c,2),l=d[0],h=d[1],f=Object(n.useState)((function(){})),j=Object(F.a)(f,2),w=j[0],v=j[1],b=Object(n.useState)(!1),g=Object(F.a)(b,2),m=(g[0],g[1]),O=Object(n.useCallback)((function(){return m((function(e){return!e}))}),[]);return Object(s.jsx)("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0},children:Object(s.jsx)(u,{environment:{setCurrentlyDragging:a,setOnBackgroundClick:v,setControlMode:h,controlMode:l,render:O},children:Object(s.jsxs)($.a,{style:{background:K.BLACK.toString()},camera:{position:[4,4,10]},onPointerMissed:w,shadows:!0,children:[Object(s.jsx)("gridHelper",{args:[20,20]}),Object(s.jsx)(ee,{}),t,!i&&"view"==l&&Object(s.jsx)(te.a,{autoRotate:!1})]})})})}var ne=function(){return Object(s.jsx)(G,{children:Object(s.jsx)(X.ToastProvider,{autoDismiss:!0,placement:"bottom-left",children:Object(s.jsx)(re,{children:Object(s.jsx)(Z,{})})})})};a.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(ne,{})}),document.getElementById("root"))},95:function(e,t,r){}},[[118,1,2]]]);
//# sourceMappingURL=main.db8e9888.chunk.js.map