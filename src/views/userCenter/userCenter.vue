<style lang="less" scoped>
</style>
<template>
    <Card id='test' style="width:100%;">
        <p slot="title">
            用户中心
        </p>
        <Button type="primary" slot="extra" @click="handleAdd()">增加用户</Button>
        </Row>
        <Table size="small" :stripe="true" :columns="aTableColumns" :data="aTableData"></Table>
        <Row type="flex" justify="end" :style="{marginTop:'10px'}">
            <Col>
            <Page :total="pageIsp.total" show-sizer show-elevator show-total @on-change="getIspByPage" @on-page-size-change="getPageSize"></Page>
            </Col>
        </Row>
        <!-- 修改模态框 -->
        <Modal v-model="beditModal" :mask-closable="false" width="800" @on-cancel='closeDialog()'>
            <p slot="header" style="height:30px;line-height:30px;">
                <Icon type="ios-lightbulb-outline"></Icon>
                用户基本信息
                <Button type="primary" size="small" @click="updateUser()" slot="extra" style="margin-left:20px;" v-if="bInfo">
                    编辑用户
                </Button>
                <Button type="primary" size="small" @click="updateCancel()" slot="extra" style="margin-left:20px;" v-else>
                    取消编辑
                </Button>
            </p>
            <Form>
                <Card style="width:100%;">
                    <Row>
                        <Col span="12">
                        <label>id号:</label>
                        <span>
                            {{objEditForm.id}}
                        </span>
                        </Col>
                        <Col span="12">
                        <label>用户状态:</label>
                        <span v-if="bInfo">{{objEditForm.status=='1'?'启用':'禁用'}}</span>
                        <span v-else>
                            <RadioGroup v-model="objEditForm.status">
                                <Radio label="1">启用</Radio>
                                <Radio label="2">禁用</Radio>
                            </RadioGroup>
                        </span>
                        </Col>
                    </Row>
                    <Row style="margin-top:1%;">
                        <Col span="12">
                        <label>账号:</label>
                        <span>
                            {{objEditForm.erp}}
                        </span>
                        </Col>
                        <Col span="12">
                        <label>附加权限:</label>
                        <span v-if="bInfo">
                            {{objEditForm.power}}
                        </span>
                        <span v-else>
                            <Input v-model="objEditForm.power" style="width:50%;"></Input>
                        </span>
                        </Col>
                    </Row>
                    <Row style="margin-top:1%;">
                        <Col span='24'>
                        <label>用户级别:</label>
                        <span v-if="bInfo">{{objEditForm.lv=='1'?'管理员':'超级管理员'}}</span>
                        <span v-else>
                            <Select v-model="objEditForm.lv" style="width:25%;" @on-change="selectAddLevel">
                                <Option v-for="item in userLevel" :value="item.id" :key="item.id">{{ item.label }}</Option>
                            </Select>
                        </span>
                        </Col>
                    </Row>
                </Card>
            </Form>
            <div slot="footer">
                <Button type="error" @click='closeDialog()'>关闭</Button>
                <Button disabled v-if="bInfo">保存</Button>
                <Button type="primary" v-else @click="handleSubmitEdit()">保存</Button>
            </div>
        </Modal>
        <!-- 增加模态框 -->
        <Modal v-model="bAddModal" :mask-closable="false" @on-cancel="handleSubmitCancle()">
            <p slot="header">
                <Icon type="ios-lightbulb-outline"></Icon>
                <span>增加用户</span>
            </p>
            <Form :label-width="100">
                <Card style="width:100%;">
                    <FormItem label="ERP账号" prop="erp">
                        <Input v-model="objUser.erp" placeholder="请输入ERP账号" :style="{width:'310px'}"></Input>
                    </FormItem>
                    <FormItem label="用户状态" prop="status">
                        <RadioGroup v-model="objUser.status">
                            <Radio label="1">启用</Radio>
                            <Radio label="2">禁用</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="用户级别" prop="level">
                        <Select v-model="objUser.level" style="width:310px" @on-change="selectLevel">
                            <Option v-for="item in userLevel" :value="item.id" :key="item.id">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="附加权限" prop="power">
                        <Input v-model="objUser.power" placeholder="请输入附加权限,可以为空" :style="{width:'310px'}"></Input>
                    </FormItem>
                </Card>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmitAdd(false)">保存</Button>
                <Button type="success" @click="handleSubmitCancle()">取消</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
import API from '@/libs/API.js';
export default {
    data() {
        return {
            //分页设置
            pageIsp: { total: 0, page_size: 10, page: 1 },
            // 已选中数据
            aSelect: [],
            //判断用户是否点击了编辑按钮,默认为false
            bInfo: true,
            //添加新用户时的输入框设置
            objUser: {
                erp: '',
                status: '1',
                level: '1',
                power: ''
            },
            //用户级别
            userLevel: [
                {
                    id: '1',
                    label: '管理员'
                },
                {
                    id: '2',
                    label: '超级管理员'
                }
            ],
            bAddModal: false,
            beditModal: false,
            objEditForm: {},
            // 带宽规模 table表头
            aTableColumns: [
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '账号',
                    key: 'erp'
                },
                {
                    title: '用户级别',
                    key: 'lv',
                    render: (h, params) => {
                        const objRow = params.row;
                        const strText = objRow.lv;
                        let strLevel = '';
                        switch (strText) {
                            case '1':
                                strLevel = '管理员';
                                break;
                            case '2':
                                strLevel = '超级管理员';
                                break;
                            case '3':
                                strLevel = '高管';
                                break;
                            case '4':
                                strLevel = '集团财务';
                                break;
                            default:
                                break;
                        }
                        return h('div', strLevel);
                    }
                },
                {
                    title: '用户状态',
                    key: 'status',
                    render: (h, params) => {
                        const objRow = params.row;
                        const strColor =
                            objRow.status === '1' ? 'success' : 'error';
                        const strText = objRow.status === '1' ? '启用' : '禁用';
                        return h(
                            'Tag',
                            {
                                props: {
                                    type: 'dot',
                                    color: strColor
                                }
                            },
                            strText
                        );
                    }
                },
                {
                    title: '操作',
                    width: 150,
                    key: 'handle',
                    render: (h, params) => {
                        return h('div', [
                            h('a', [
                                h('Icon', {
                                    props: {
                                        type: 'md-create'
                                    }
                                }),
                                h(
                                    'a',
                                    {
                                        style: {
                                            margin: '0 5px'
                                        },
                                        props: {
                                            type: 'error',
                                            placement: 'top'
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetail(params.row);
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]),
                            h('a', [
                                h('Icon', {
                                    props: {
                                        type: 'md-remove-circle'
                                    }
                                }),
                                h(
                                    'a',
                                    {
                                        style: {
                                            margin: '0 5px'
                                        },
                                        props: {
                                            type: 'error',
                                            placement: 'top'
                                        },
                                        on: {
                                            click: () => {
                                                this.trashUser(params.row);
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ])
                        ]);
                    }
                }
            ],
            // table数据
            aTableData: []
        };
    },
    methods: {
        selectAddLevel(value) {
            this.objUser.level = value;
        },
        /*
         *选择用户级别
         *@param {string} value
         */
        selectLevel(value) {
            this.objEditForm.level = value;
        },
        /**
         * 实现分页
         * @param {number} page
         */
        getIspByPage(page) {
            this.pageIsp.page = page;
            this.ajaxFetchData();
        },
        /**
         * 实现每页显示多少条
         * @param {number} value
         */
        getPageSize(value) {
            this.pageIsp.page_size = value;
            this.ajaxFetchData();
        },
        handleAdd() {
            this.bAddModal = true;
        },
        /*
         *将新添加的用户保存
         *@param {Boolean} nodesc
         */
        handleSubmitAdd(nodesc) {
            let Data = Object.assign({
                erp: this.objUser.erp,
                status: this.objUser.status,
                lv: this.objUser.level,
                power: this.objUser.power
            });
            this.$axios.post(API.user.add, Data).then(res => {
                if (res.data.code == 1000) {
                    this.$Notice.success({
                        title: '通知提醒',
                        desc: nodesc ? '' : '添加用户成功。'
                    });
                    this.ajaxFetchData();
                    this.bAddModal = false;
                }
            });
        },
        //取消创建操作的弹出框时
        handleSubmitCancle() {
            this.bAddModal = false;
        },
        /*
         *弹出查看用户详情的弹出框
         *@param {object} data
         */
        showDetail(data) {
            let Data = Object.assign({
                id: data.id
            });
            this.$axios.post(API.user.userinfo, Data).then(res => {
                this.objEditForm = res.data.data;
                this.objEditForm.status = this.objEditForm.status + '';
                this.objEditForm.lv = this.objEditForm.lv + '';
            });
            this.beditModal = true;
        },
        //点击编辑按钮时
        updateUser() {
            this.bInfo = false;
        },
        //取消编辑用户
        updateCancel() {
            this.bInfo = true;
        },
        //关闭用户详情的弹出框
        closeDialog() {
            this.bInfo = true;
            this.beditModal = false;
        },
        /*
         *删除用户
         *@param {Object} data
         *@param {Boolean} nodesc
         */
        trashUser(data, nodesc) {
            let Data = Object.assign({
                id: data.id
            });
            this.$Modal.confirm({
                title: '通知提醒',
                content: '<p>你确定删除该用户吗？</p>',
                loading: true,
                onOk: () => {
                    this.$axios.post(API.user.del, Data).then(res => {
                        if (res.data.code == 1000) {
                            this.$Notice.success({
                                title: '通知提醒',
                                desc: nodesc ? '' : '删除用户成功。'
                            });
                            this.$Modal.remove();
                            this.ajaxFetchData();
                        }
                    });
                }
            });
        },
        handleSubmitEdit(nodesc) {
            let Data = Object.assign({
                id: this.objEditForm.id,
                erp: this.objEditForm.erp,
                status: this.objEditForm.status,
                lv: this.objEditForm.lv,
                power: this.objEditForm.power
            });
            this.$axios.post(API.user.edit, Data).then(res => {
                if (res.data.code == 1000) {
                    this.$Notice.success({
                        title: '通知提醒',
                        desc: nodesc ? '' : '修改用户信息成功。'
                    });
                    this.ajaxFetchData();
                }
            });
            this.beditModal = false;
            this.bInfo = true;
        },
        // 查询数据
        ajaxFetchData() {
            let Data = Object.assign({
                page: this.pageIsp.page,
                limit: this.pageIsp.page_size
            });
            this.$axios.post(API.user.list, Data).then(res => {
                if (res.status == 200) {
                    let objRes = res.data;
                    if (objRes.code == 1000) {
                        let aData = objRes.data.data;
                        this.pageIsp.total = objRes.data.total;
                        this.aTableData = aData;
                        this.aTableData.forEach(element => {
                            element.status = element.status + '';
                            element.lv = element.lv + '';
                        });
                    } else {
                        this.$Message.warning(objRes.msg);
                    }
                } else {
                    let msg = res.data.msg || '系统出错！';
                    this.$Message.warning({
                        content: msg,
                        duration: 10
                    });
                }
            });
        }
    },
    created() {
        document.domain = 'jd.com';
    },
    mounted() {
        //对弹出的提示框属性进行设置
        this.$Notice.config({
            top: 120,
            duration: 4
        });
        //加载用户信息
        this.ajaxFetchData();
    }
};
</script>
