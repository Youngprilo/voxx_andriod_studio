import{g as w,p as F,L as N,P as Y,s as M,a as l,b as U,m as x,u as g,c as y,S as G,d as $,l as j,e as z,f as L,B as H,R as V,h as T,i as Z,j as B,k as J,n as K}from"./CXBtRYQN.js";import{p as Q}from"./CSSALvxy.js";import{c as W}from"./D6A_DPMJ.js";function C(r){for(var a=L,n=L;a!==null&&!(a.f&(H|V));)a=a.parent;try{return T(a),r()}finally{T(n)}}function ae(r,a,n,v){var A;var R=(n&Z)!==0,d=!j||(n&z)!==0,c=(n&y)!==0,D=(n&J)!==0,I=!1,i;c?[i,I]=W(()=>r[a]):i=r[a];var p=G in r||$ in r,_=c&&(((A=w(r,a))==null?void 0:A.set)??(p&&a in r&&(e=>r[a]=e)))||void 0,t=v,P=!0,o=!1,O=()=>(o=!0,P&&(P=!1,D?t=g(v):t=v),t);i===void 0&&v!==void 0&&(_&&d&&F(),i=O(),_&&_(i));var u;if(d)u=()=>{var e=r[a];return e===void 0?O():(P=!0,o=!1,e)};else{var b=C(()=>(R?B:K)(()=>r[a]));b.f|=N,u=()=>{var e=l(b);return e!==void 0&&(t=void 0),e===void 0?t:e}}if(!(n&Y))return u;if(_){var q=r.$$legacy;return function(e,f){return arguments.length>0?((!d||!f||q||I)&&_(f?u():e),e):u()}}var S=!1,h=!1,m=x(i),s=C(()=>B(()=>{var e=u(),f=l(m);return S?(S=!1,h=!0,f):(h=!1,m.v=e)}));return R||(s.equals=M),function(e,f){if(arguments.length>0){const E=f?l(s):d&&c?Q(e):e;return s.equals(E)||(S=!0,U(m,E),o&&t!==void 0&&(t=E),g(()=>l(s))),e}return l(s)}}export{ae as p};
