<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-refresh"
            v-if="hasPermission('api:list')"
            @click.native.prevent="getapiList"
          >刷新</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            v-if="hasPermission('api:add')"
            @click.native.prevent="showAddapiDialog"
          >添加api</el-button>
        </el-form-item>

        <span v-if="hasPermission('api:search')">
          <el-form-item>
            <el-input v-model="search.apiname" @keyup.enter.native="searchBy" placeholder="api名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.deployunitname" @keyup.enter.native="searchBy" placeholder="发布单元名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBy" :loading="btnLoading">查询</el-button>
          </el-form-item>
        </span>
      </el-form>
    </div>
    <el-table
      :data="apiList"
      v-loading.body="listLoading"
      element-loading-text="loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="编号" align="center" width="60">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"></span>
        </template>
      </el-table-column>
      <el-table-column label="api名" align="center" prop="apiname" width="120"/>
      <el-table-column label="访问方式" align="center" prop="visittype" width="80"/>
      <el-table-column label="路径" align="center" prop="path" width="100"/>
      <el-table-column label="发布单元" align="center" prop="deployunitname" width="130"/>
      <el-table-column label="备注" align="center" prop="memo" width="100"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="120">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column label="最后修改时间" align="center" prop="lastmodifyTime" width="120">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.lastmodifyTime) }}
        </template>
      </el-table-column>

      <el-table-column label="管理" align="center"
                       v-if="hasPermission('api:update')  || hasPermission('api:delete')">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            v-if="hasPermission('api:update') && scope.row.id !== id"
            @click.native.prevent="showUpdateapiDialog(scope.$index)"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="hasPermission('api:delete') && scope.row.id !== id"
            @click.native.prevent="removeapi(scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        status-icon
        class="small-space"
        label-position="left"
        label-width="100px"
        style="width: 300px; margin-left:50px;"
        :model="tmpapi"
        ref="tmpapi"
      >
        <el-form-item label="api名" prop="apiname" required>
          <el-input
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            v-model="tmpapi.apiname"
          />
        </el-form-item>
        <el-form-item label="访问方式" prop="visittype" required>
          <el-select v-model="tmpapi.visittype" placeholder="访问方式">
            <el-option label="请选择" value="''" style="display: none" />
            <div v-for="(vistype, index) in visittypeList" :key="index">
              <el-option :label="vistype.dicitmevalue" :value="vistype.dicitmevalue" required/>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="资源路径" prop="path" required>
          <el-input
            type="text"
            prefix-icon="el-icon-message"
            auto-complete="off"
            v-model="tmpapi.path"
          />
        </el-form-item>
        <el-form-item label="发布单元" prop="deployunitname" required >
          <el-select v-model="tmpapi.deployunitname" placeholder="发布单元" @change="selectChanged($event)">
            <el-option label="请选择" value="''" style="display: none" />
            <div v-for="(depunitname, index) in deployunitList" :key="index">
              <el-option :label="depunitname.deployunitname" :value="depunitname.deployunitname" required/>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input
            type="text"
            prefix-icon="el-icon-message"
            auto-complete="off"
            v-model="tmpapi.memo"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogFormVisible = false">取消</el-button>
        <el-button
          type="danger"
          v-if="dialogStatus === 'add'"
          @click.native.prevent="$refs['tmpapi'].resetFields()"
        >重置</el-button>
        <el-button
          type="success"
          v-if="dialogStatus === 'add'"
          :loading="btnLoading"
          @click.native.prevent="addapi"
        >添加</el-button>
        <el-button
          type="success"
          v-if="dialogStatus === 'update'"
          :loading="btnLoading"
          @click.native.prevent="updateapi"
        >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getapiList as getapiList, search, addapi, updateapi, removeapi } from '@/api/deployunit/api'
  import { getdepunitList as getdepunitList } from '@/api/deployunit/depunit'
  import { getdatabydiccodeList as getvisittypeList } from '@/api/system/dictionary'
  import { unix2CurrentTime } from '@/utils'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        apiList: [], // api列表
        visittypeList: [], // api访问方式列表
        deployunitList: [], // 发布单元列表
        listLoading: false, // 数据加载等待动画
        dicvisitypeQuery: {
          page: 1, // 页码
          size: 30, // 每页数量
          diccode: 'httpvisittype' // 获取字典表入参
        },
        total: 0, // 数据总数
        listQuery: {
          page: 1, // 页码
          size: 20, // 每页数量
          listLoading: true
        },
        dialogStatus: 'add',
        dialogFormVisible: false,
        textMap: {
          updateRole: '修改api',
          update: '修改api',
          add: '添加api'
        },
        btnLoading: false, // 按钮等待动画
        tmpapi: {
          id: '',
          deployunitid: '',
          deployunitname: '',
          apiname: '',
          visittype: '',
          path: '',
          memo: ''
        },
        search: {
          page: null,
          size: null,
          apiname: null,
          deployunitname: null
        }
      }
    },

    created() {
      this.getapiList()
      this.getvisittypeList()
      this.getdepunitList()
    },

    methods: {
      unix2CurrentTime,

      /**
       * 发布单元下拉选择事件获取发布单元id  e的值为options的选值
       */
      selectChanged(e) {
        for (let i = 0; i < this.deployunitList.length; i++) {
          if (this.deployunitList[i].deployunitname === e) {
            this.tmpapi.deployunitid = this.deployunitList[i].id
          }
          console.log(this.deployunitList[i].id)
        }
      },

      /**
       * 获取api列表
       */
      getapiList() {
        this.listLoading = true
        getapiList(this.listQuery).then(response => {
          this.apiList = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(res => {
          this.$message.error('加载api列表失败')
        })
      },
      /**
       * 获取字典访问方式列表
       */
      getvisittypeList() {
        this.listLoading = true
        getvisittypeList(this.dicvisitypeQuery).then(response => {
          this.visittypeList = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(res => {
          this.$message.error('加载字典访问方式列表失败')
        })
      },

      /**
       * 获取发布单元列表
       */
      getdepunitList() {
        this.listLoading = true
        getdepunitList(this.listQuery).then(response => {
          this.deployunitList = response.data.list
          this.total = response.data.total
          this.listLoading = false
        }).catch(res => {
          this.$message.error('加载发布单元列表失败')
        })
      },

      searchBy() {
        this.btnLoading = true
        this.listLoading = true
        this.search.page = this.listQuery.page
        this.search.size = this.listQuery.size
        search(this.search).then(response => {
          this.apiList = response.data.list
          this.total = response.data.total
        }).catch(res => {
          this.$message.error('搜索失败')
        })
        this.listLoading = false
        this.btnLoading = false
      },

      /**
       * 改变每页数量
       * @param size 页大小
       */
      handleSizeChange(size) {
        this.listQuery.size = size
        this.listQuery.page = 1
        this.getapiList()
      },
      /**
       * 改变页码
       * @param page 页号
       */
      handleCurrentChange(page) {
        this.listQuery.page = page
        this.getapiList()
      },
      /**
       * 表格序号
       * 可参考自定义表格序号
       * http://element-cn.eleme.io/#/zh-CN/component/table#zi-ding-yi-suo-yin
       * @param index 数据下标
       * @returns 表格序号
       */
      getIndex(index) {
        return (this.listQuery.page - 1) * this.listQuery.size + index + 1
      },
      /**
       * 显示添加api对话框
       */
      showAddapiDialog() {
        // 显示新增对话框
        this.dialogFormVisible = true
        this.dialogStatus = 'add'
        this.tmpapi.id = ''
        this.tmpapi.deployunitid = ''
        this.tmpapi.deployunitname = ''
        this.tmpapi.apiname = ''
        this.tmpapi.visittype = ''
        this.tmpapi.path = ''
        this.tmpapi.memo = ''
      },
      /**
       * 添加api
       */
      addapi() {
        this.$refs.tmpapi.validate(valid => {
          if (valid && this.isUniqueDetail(this.tmpapi)) {
            this.btnLoading = true
            addapi(this.tmpapi).then(() => {
              this.$message.success('添加成功')
              this.getapiList()
              this.dialogFormVisible = false
              this.btnLoading = false
            }).catch(res => {
              this.$message.error('添加失败')
              this.btnLoading = false
            })
          }
        })
      },
      /**
       * 显示修改api对话框
       * @param index api下标
       */
      showUpdateapiDialog(index) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        this.tmpapi.id = this.apiList[index].id
        this.tmpapi.deployunitid = this.apiList[index].deployunitid
        this.tmpapi.deployunitname = this.apiList[index].deployunitname
        this.tmpapi.apiname = this.apiList[index].apiname
        this.tmpapi.visittype = this.apiList[index].visittype
        this.tmpapi.path = this.apiList[index].path
        this.tmpapi.memo = this.apiList[index].memo
      },
      /**
       * 更新api
       */
      updateapi() {
        if (this.isUniqueDetail(this.tmpapi)) {
          updateapi(this.tmpapi).then(() => {
            this.$message.success('更新成功')
            this.getapiList()
            this.dialogFormVisible = false
          }).catch(res => {
            this.$message.error('更新失败')
          })
        }
      },

      /**
       * 删除字典
       * @param index api下标
       */
      removeapi(index) {
        this.$confirm('删除该api？', '警告', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          const id = this.apiList[index].id
          removeapi(id).then(() => {
            this.$message.success('删除成功')
            this.getapiList()
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },

      /**
       * api资料是否唯一
       * @param api
       */
      isUniqueDetail(api) {
        console.log(api.id)
        for (let i = 0; i < this.apiList.length; i++) {
          if (this.apiList[i].id !== api.id) { // 排除自己
            console.log(this.apiList[i].id)
            if (this.apiList[i].apiname === api.apiname) {
              this.$message.error('api名已存在')
              return false
            }
          }
        }
        return true
      }
    }
  }
</script>
