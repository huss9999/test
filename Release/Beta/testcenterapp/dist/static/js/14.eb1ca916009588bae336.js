webpackJsonp([14],{Xjku:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("vLgD");function i(e){return Object(r.a)({url:"/apicases/report/performance/search",method:"post",data:e})}var n=a("XcM5"),p=a("vuyV"),o=a("W5b6"),s={filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},data:function(){return{tmptestplanname:"",tmptestplanid:null,tmpbatchname:null,apiperformancereportList:[],apiList:[],planbatchList:[],execplanList:[],deployunitList:[],listLoading:!1,dicvisitypeQuery:{page:1,size:30,diccode:"httpvisittype"},total:0,listQuery:{page:1,size:10,listLoading:!0,testplanname:"",testplanid:null,batchname:null},dialogStatus:"add",dialogFormVisible:!1,textMap:{updateRole:"修改apiperformancereport",update:"修改apiperformancereport",add:"添加apiperformancereport"},btnLoading:!1,tmpapiperformancereport:{executeplanid:"",id:"",deployunitid:"",deployunitname:"",batchname:"",apiperformancereportname:"",visittype:"",path:"",memo:""},tmpexecplantype:{usetype:""},search:{page:1,size:10,testplanname:"",testplanid:null,batchname:null}}},created:function(){this.getexecplanList(),this.getdepunitList(),this.getapiperformancereportList()},methods:{unix2CurrentTime:a("0xDb").b,testplanselectChanged:function(e){for(var t=this,a=0;a<this.execplanList.length;a++)this.execplanList[a].executeplanname===e&&(this.tmpapiperformancereport.executeplanid=this.execplanList[a].id);Object(o.b)(this.tmpapiperformancereport).then(function(e){t.planbatchList=e.data}).catch(function(e){t.$message.error("加载批次列表失败")})},selectChanged:function(e){for(var t=0;t<this.deployunitList.length;t++)this.deployunitList[t].deployunitname===e&&(this.tmpapiperformancereport.deployunitid=this.deployunitList[t].id),console.log(this.deployunitList[t].id)},getapiperformancereportList:function(){var e,t=this;this.listLoading=!0,(e=this.listQuery,Object(r.a)({url:"/apicases/report/performance",method:"get",params:e})).then(function(e){t.apiperformancereportList=e.data.list,t.total=e.data.total,t.listLoading=!1}).catch(function(e){t.$message.error("加载api报告列表失败")})},getexecplanList:function(){var e=this;this.tmpexecplantype.usetype="性能",Object(p.e)(this.tmpexecplantype).then(function(t){e.execplanList=t.data}).catch(function(t){e.$message.error("加载计划列表失败")})},getdepunitList:function(){var e=this;Object(n.d)(this.listQuery).then(function(t){e.deployunitList=t.data.list}).catch(function(t){e.$message.error("加载发布单元列表失败")})},searchBy:function(){var e=this;this.btnLoading=!0,this.listLoading=!0,this.search.page=this.listQuery.page,this.search.size=this.listQuery.size,this.search.testplanid=this.tmpapiperformancereport.executeplanid,i(this.search).then(function(t){e.apiperformancereportList=t.data.list,e.total=t.data.total}).catch(function(t){e.$message.error("搜索失败")}),this.tmptestplanname=this.search.testplanname,this.tmptestplanid=this.search.testplanid,this.tmpbatchname=this.search.batchname,this.listLoading=!1,this.btnLoading=!1},searchBypageing:function(){var e=this;this.btnLoading=!0,this.listLoading=!0,this.listQuery.testplanname=this.tmptestplanname,this.listQuery.testplanid=this.tmptestplanid,this.listQuery.batchname=this.tmpbatchname,i(this.listQuery).then(function(t){e.apiperformancereportList=t.data.list,e.total=t.data.total}).catch(function(t){e.$message.error("搜索失败")}),this.listLoading=!1,this.btnLoading=!1},handleSizeChange:function(e){this.listQuery.size=e,this.listQuery.page=1,this.searchBypageing()},handleCurrentChange:function(e){this.listQuery.page=e,this.searchBypageing()},getIndex:function(e){return(this.listQuery.page-1)*this.listQuery.size+e+1},showAddapiperformancereportDialog:function(){this.dialogFormVisible=!0,this.dialogStatus="add",this.tmpapiperformancereport.id="",this.tmpapiperformancereport.deployunitid="",this.tmpapiperformancereport.deployunitname="",this.tmpapiperformancereport.apiperformancereportname="",this.tmpapiperformancereport.visittype="",this.tmpapiperformancereport.path="",this.tmpapiperformancereport.memo=""},addapiperformancereport:function(){var e=this;this.$refs.tmpapiperformancereport.validate(function(t){var a;t&&e.isUniqueDetail(e.tmpapiperformancereport)&&(e.btnLoading=!0,(a=e.tmpapiperformancereport,Object(r.a)({url:"/apicases/report/performance",method:"post",data:a})).then(function(){e.$message.success("添加成功"),e.getapiperformancereportList(),e.dialogFormVisible=!1,e.btnLoading=!1}).catch(function(t){e.$message.error("添加失败"),e.btnLoading=!1}))})},showUpdateapiperformancereportDialog:function(e){this.dialogFormVisible=!0,this.dialogStatus="update",this.tmpapiperformancereport.id=this.apiperformancereportList[e].id,this.tmpapiperformancereport.deployunitid=this.apiperformancereportList[e].deployunitid,this.tmpapiperformancereport.deployunitname=this.apiperformancereportList[e].deployunitname,this.tmpapiperformancereport.apiperformancereportname=this.apiperformancereportList[e].apiperformancereportname,this.tmpapiperformancereport.visittype=this.apiperformancereportList[e].visittype,this.tmpapiperformancereport.path=this.apiperformancereportList[e].path,this.tmpapiperformancereport.memo=this.apiperformancereportList[e].memo},updateapiperformancereport:function(){var e,t=this;this.isUniqueDetail(this.tmpapiperformancereport)&&(e=this.tmpapiperformancereport,Object(r.a)({url:"/apicases/report/performance",method:"put",data:e})).then(function(){t.$message.success("更新成功"),t.getapiperformancereportList(),t.dialogFormVisible=!1}).catch(function(e){t.$message.error("更新失败")})},removeapiperformancereport:function(e){var t=this;this.$confirm("删除该apiperformancereport？","警告",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then(function(){var a,i=t.apiperformancereportList[e].id;(a=i,Object(r.a)({url:"/apicases/report/performance/"+a,method:"delete"})).then(function(){t.$message.success("删除成功"),t.getapiperformancereportList()})}).catch(function(){t.$message.info("已取消删除")})},isUniqueDetail:function(e){console.log(e.id);for(var t=0;t<this.apiperformancereportList.length;t++)if(this.apiperformancereportList[t].id!==e.id&&(console.log(this.apiperformancereportList[t].id),this.apiperformancereportList[t].apiperformancereportname===e.apiperformancereportname))return this.$message.error("apiperformancereport名已存在"),!1;return!0}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[e.hasPermission("apiperformancereport:list")?a("el-button",{attrs:{type:"success",size:"mini",icon:"el-icon-refresh"},nativeOn:{click:function(t){return t.preventDefault(),e.getapiperformancereportList(t)}}},[e._v("刷新")]):e._e()],1),e._v(" "),e.hasPermission("apiperformancereport:search")?a("span",[a("el-form-item",{attrs:{label:"执行计划",prop:"testplanname"}},[a("el-select",{attrs:{placeholder:"执行计划"},on:{change:function(t){return e.testplanselectChanged(t)}},model:{value:e.search.testplanname,callback:function(t){e.$set(e.search,"testplanname",t)},expression:"search.testplanname"}},[a("el-option",{staticStyle:{display:"none"},attrs:{label:"请选择",value:"''"}}),e._v(" "),e._l(e.execplanList,function(e,t){return a("div",{key:t},[a("el-option",{attrs:{label:e.executeplanname,value:e.executeplanname}})],1)})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"批次",prop:"batchname"}},[a("el-select",{attrs:{placeholder:"批次"},model:{value:e.search.batchname,callback:function(t){e.$set(e.search,"batchname",t)},expression:"search.batchname"}},[a("el-option",{staticStyle:{display:"none"},attrs:{label:"请选择",value:"''"}}),e._v(" "),e._l(e.planbatchList,function(e,t){return a("div",{key:t},[a("el-option",{attrs:{label:e.batchname,value:e.batchname}})],1)})],2)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.searchBy}},[e._v("查询")])],1)],1):e._e()],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.apiperformancereportList,"element-loading-text":"loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"编号",align:"center",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(e.getIndex(t.$index))}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"用例名",align:"center",prop:"casename",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"apiname",align:"center",prop:"apiname",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",prop:"status",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return["失败"===t.row.status?a("span",{staticStyle:{color:"red"}},[e._v(e._s(t.row.status))]):a("span",{staticStyle:{color:"#37B328"}},[e._v(e._s(t.row.status))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"批次",align:"center",prop:"batchname",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{label:"发布单元",align:"center",prop:"deployunitname",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:"期望值",align:"center",prop:"expect",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v(e._s(t.row.expect))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v("...")])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"响应",align:"center",prop:"respone",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v(e._s(t.row.respone))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v("...")])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"断言详情",align:"center",prop:"assertvalue",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v(e._s(t.row.assertvalue))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v("...")])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"运行时间(ms)",align:"center",prop:"runtime",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:"运行信息",align:"center",prop:"errorinfo",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v(e._s(t.row.errorinfo))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v("...")])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"createTime",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.unix2CurrentTime(t.row.createTime)))]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.listQuery.page,"page-size":e.listQuery.size,total:e.total,"page-sizes":[10,20,30,40],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"tmpapiperformancereport",staticClass:"small-space",staticStyle:{width:"300px","margin-left":"50px"},attrs:{"status-icon":"","label-position":"left","label-width":"100px",model:e.tmpapiperformancereport}},[a("el-form-item",{attrs:{label:"apiperformancereport名",prop:"apiperformancereportname",required:""}},[a("el-input",{attrs:{type:"text","prefix-icon":"el-icon-edit","auto-complete":"off"},model:{value:e.tmpapiperformancereport.apiperformancereportname,callback:function(t){e.$set(e.tmpapiperformancereport,"apiperformancereportname",t)},expression:"tmpapiperformancereport.apiperformancereportname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"访问方式",prop:"visittype",required:""}},[a("el-select",{attrs:{placeholder:"访问方式"},model:{value:e.tmpapiperformancereport.visittype,callback:function(t){e.$set(e.tmpapiperformancereport,"visittype",t)},expression:"tmpapiperformancereport.visittype"}},[a("el-option",{staticStyle:{display:"none"},attrs:{label:"请选择",value:"''"}}),e._v(" "),e._l(e.visittypeList,function(e,t){return a("div",{key:t},[a("el-option",{attrs:{label:e.dicitmevalue,value:e.dicitmevalue,required:""}})],1)})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"资源路径",prop:"path",required:""}},[a("el-input",{attrs:{type:"text","prefix-icon":"el-icon-message","auto-complete":"off"},model:{value:e.tmpapiperformancereport.path,callback:function(t){e.$set(e.tmpapiperformancereport,"path",t)},expression:"tmpapiperformancereport.path"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发布单元",prop:"deployunitname",required:""}},[a("el-select",{attrs:{placeholder:"发布单元"},on:{change:function(t){return e.selectChanged(t)}},model:{value:e.tmpapiperformancereport.deployunitname,callback:function(t){e.$set(e.tmpapiperformancereport,"deployunitname",t)},expression:"tmpapiperformancereport.deployunitname"}},[a("el-option",{staticStyle:{display:"none"},attrs:{label:"请选择",value:"''"}}),e._v(" "),e._l(e.deployunitList,function(e,t){return a("div",{key:t},[a("el-option",{attrs:{label:e.deployunitname,value:e.deployunitname,required:""}})],1)})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"memo"}},[a("el-input",{attrs:{type:"text","prefix-icon":"el-icon-message","auto-complete":"off"},model:{value:e.tmpapiperformancereport.memo,callback:function(t){e.$set(e.tmpapiperformancereport,"memo",t)},expression:"tmpapiperformancereport.memo"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){t.preventDefault(),e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"add"===e.dialogStatus?a("el-button",{attrs:{type:"danger"},nativeOn:{click:function(t){return t.preventDefault(),e.$refs.tmpapiperformancereport.resetFields()}}},[e._v("重置")]):e._e(),e._v(" "),"add"===e.dialogStatus?a("el-button",{attrs:{type:"success",loading:e.btnLoading},nativeOn:{click:function(t){return t.preventDefault(),e.addapiperformancereport(t)}}},[e._v("添加")]):e._e(),e._v(" "),"update"===e.dialogStatus?a("el-button",{attrs:{type:"success",loading:e.btnLoading},nativeOn:{click:function(t){return t.preventDefault(),e.updateapiperformancereport(t)}}},[e._v("修改")]):e._e()],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(s,l,!1,function(e){a("v8DI")},null,null);t.default=c.exports},v8DI:function(e,t){}});
//# sourceMappingURL=14.eb1ca916009588bae336.js.map