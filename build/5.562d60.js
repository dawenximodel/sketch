(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{186:function(t){t.exports={close:"_5_Guc9NGGuo2h1dhTVBYj",warp:"_3tV9XfDhdOxAR0vyqkUqZC",icon:"_3uap0FYryOfXHmrQnhKifB"}},187:function(t,e,a){"use strict";var c=a(9),o=a(19),s=a(26),n=a(28),l=a(27),i=a(29),r=a(0),b=a(189),h=a.n(b),u=a(186),O=a.n(u),d={overlay:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.45)",zIndex:10},content:{position:"absolute",width:"80%",right:"10%",bottom:"auto",maxHeight:"80%",maxWidth:"460px",border:"node",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"0.2rem",outline:"none",padding:"0",top:"50%",left:"50%"}},p=function(t){function e(){return Object(o.a)(this,e),Object(n.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props,e=t.onRequestClose,a=t.children;return Object(r.h)(h.a,Object(c.a)({shouldCloseOnOverlayClick:!1,style:d},this.props,{className:O.a.warp}),e?Object(r.h)("a",{className:O.a.icon,onClick:function(t){t.preventDefault()}},Object(r.h)("i",{className:"flaticon-close-circular-button-symbol",onClick:e})):null,a)}}]),e}(r.a);h.a.setAppElement("body");e.a=p},202:function(t){t.exports={root:"_3_rzjJq5FCVbTot-0ieJTy",wrap:"_22yFubHeE_iGUISqbR63Pa",view:"rsg_2JV1c66ldSGWkciVp",iconlayout:"_2fNuzTPNErfj8DC_YQM8dB",icon:"_1lWveCdyvH1RG5OpIrIYlj",bottombtn:"_2MGAbPD2yEx9OHtr2u-Xqr",lh3:"EQUjM6XfLVhDOhS2Ajmil"}},218:function(t,e,a){"use strict";a.r(e);var c=a(19),o=a(26),s=a(28),n=a(27),l=a(30),i=a(29),r=a(8),b=a(0),h=a(36),u=a(31),O=a(59),d=a.n(O),p=a(60),j=a(61),m=a(187),f=a(202),v=a.n(f),w=function(t){function a(t){var e;return Object(c.a)(this,a),e=Object(s.a)(this,Object(n.a)(a).call(this,t)),Object(r.a)(Object(l.a)(e),"handleList",function(t){t.preventDefault(),p.a.push("".concat(e.props.rootPath,"list"))}),Object(r.a)(Object(l.a)(e),"showTimeModal",function(t){t.preventDefault(),e.setState({timeModal:!0})}),Object(r.a)(Object(l.a)(e),"hideTimeModal",function(){var t=e.props.time;e.setState({timeModal:!1}),window.localStorage.setItem("time",t)}),Object(r.a)(Object(l.a)(e),"handleMinus",function(t){t.preventDefault(),e.props.setStore({time:1<e.props.time?e.props.time-1:1})}),Object(r.a)(Object(l.a)(e),"handlePlus",function(t){t.preventDefault(),e.props.setStore({time:e.props.time<60?e.props.time+1:60})}),Object(r.a)(Object(l.a)(e),"onStart",function(){var t=e.props;0<t.selected.length?0<t.time?p.a.push("".concat(e.props.rootPath,"view")):e.setState({error:"老杆子，稳！但建议还是大于1分钟吧！"}):e.setState({error:"您还没选择图片！"})}),Object(r.a)(Object(l.a)(e),"closeError",function(){e.setState({error:null})}),Object(r.a)(Object(l.a)(e),"palyVideo",function(){}),e.state={timeModal:!1,error:null},e}return Object(i.a)(a,t),Object(o.a)(a,[{key:"render",value:function(){var t=this.props,e=t.selected,a=t.time,c=e.length*a;return Object(b.h)("div",{className:v.a.root},Object(b.h)("div",{className:v.a.wrap},Object(b.h)("div",{className:v.a.view,onClick:this.palyVideo},Object(b.h)("img",{src:"./assets/show.jpg",className:"zoom",alt:""})),Object(b.h)("div",{className:d()(v.a.iconlayout,"clearfix")},Object(b.h)("div",{className:"fl w4 al-r"},Object(b.h)("a",{href:"",onClick:this.showTimeModal},Object(b.h)("i",{className:"flaticon-alarm-clock-symbol ".concat(v.a.icon)}))),Object(b.h)("div",{className:"fr w4 al-l"},Object(b.h)("a",{href:"",onClick:this.handleList},Object(b.h)("i",{className:"flaticon-cube-of-notes-stack ".concat(v.a.icon)})))),Object(b.h)("div",{className:"font-small gray-light pdt1 al-c"},0<e.length?"共选择 ".concat(e.length," 张图片 - "):null,c&&0!=c?60<c?" 预计速写时间 ".concat((c/60).toFixed(1)," 小时"):" 预计速写时间 ".concat(c," 分钟"):null),Object(b.h)("div",{className:d()(v.a.bottombtn,"mgt4")},Object(b.h)("div",{className:"w8 center"},Object(b.h)("button",{className:"btn",onClick:this.onStart},"开  始"))),Object(b.h)(m.a,{contentLabel:"time",isOpen:this.state.timeModal,onRequestClose:this.hideTimeModal},Object(b.h)("h3",{className:"al-c font-bigger pdt2 pdb2"},"设置速写时间"),Object(b.h)("div",{className:d()(v.a.lh3,"clearfix w9 center pdb3 formBox")},Object(b.h)("div",{className:"fl w3 al-r"},"间隔时间："),Object(b.h)("div",{className:"w4-5 fl border"},Object(b.h)("div",{className:"fl w3 al-c font-biggest",onClick:this.handleMinus},Object(b.h)("a",{href:""},Object(b.h)("span",{className:"icon_minus"}))),Object(b.h)("div",{className:"fl w4"},Object(b.h)("input",{type:"text",value:a,readOnly:!0,className:"ww al-c"})),Object(b.h)("div",{className:"fl w3 al-c font-biggest",onClick:this.handlePlus},Object(b.h)("a",{href:""},Object(b.h)("span",{className:"icon_plus"})))),Object(b.h)("div",{className:"fl w2"},"  分钟")),Object(b.h)("div",{className:"w9 center pdb1"},Object(b.h)("button",{className:"btngreen font",onClick:this.hideTimeModal},"确  认"))),Object(b.h)(m.a,{contentLabel:"time",isOpen:!!this.state.error,onRequestClose:this.closeError},Object(b.h)("h3",{className:"al-c font-bigger pdt2 pdb1"},"对不起"),Object(b.h)("div",{className:"al-c pdb2 font"},this.state.error))))}}]),a}(b.a);e.default=Object(h.b)(function(t){return t||{}},function(t){return Object(u.a)({setStore:j.a},t)})(w)}}]);