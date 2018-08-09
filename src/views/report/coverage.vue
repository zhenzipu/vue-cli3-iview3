<style lang="less" scope>
</style>
<template>
    <Card id="test">
        <p slot="title">
            覆盖率
        </p>
        <Button type="primary" slot="extra" @click="exportImage()">导出图片</Button>
        <search-form ref="searchForm" :objData="aSearchData" v-on:handleFormSubmit="searchFormSubmit"></search-form>
        <table-paging :bSpinShow="loading" :columns="aTableColumns" :data="aTableData"></table-paging>
    </Card>
</template>

<script>
import API from '@/libs/API.js';
import searchForm from '@/components/search-form';
import tablePaging from '@/components/table-paging';
export default {
    name: 'report',
    components: {
        tablePaging,
        searchForm
    },
    data() {
        return {
            aSearchData: [
                {
                    type: 'date',
                    label: '查询时间',
                    dateType: 'date',
                    value: 'date',
                    format: 'yyyy-MM-dd',
                    placeholder: '选择时间',
                    limit: '2015-01-01 00:00:00'
                },
                {
                    type: 'select',
                    label: '数据源',
                    value: 'source',
                    placeholder: '请选择',
                    data: [
                        {
                            name: 'v2平台',
                            value: '2'
                        }
                        // {
                        //     name: 'v3平台',
                        //     value: '3'
                        // }
                    ]
                }
            ],
            loading: false,
            aTableColumns: [
                {
                    key: 'depName',
                    title: '业务线'
                },
                {
                    key: 'count',
                    title: '设备数量',
                    sortable: true,
                    sortType: 'desc'
                },
                {
                    key: 'monitor',
                    title: '已监控数量',
                    sortable: true
                },
                {
                    key: 'coverage',
                    title: '监控覆盖率',
                    sortable: true,
                    render: (h, params) => {
                        const strText =
                            params.row.coverage == 0
                                ? 0
                                : params.row.coverage * 100 + '%';
                        return h('span', strText);
                    }
                },
                {
                    key: 'source',
                    title: '数据来源'
                }
            ],
            aTableData: [],
            objParams: {
                date: '2018-08-03'
            }
        };
    },
    computed: {},
    methods: {
        searchFormSubmit(search) {
            console.log(search);
            this.objParams = search;
            this.ajaxFetchData();
        },
        ajaxFetchData() {
            this.loading = true;
            this.$axios.post(API.report.coverage, this.objParams).then(res => {
                if (res.status == 200) {
                    this.loading = false;
                    let objRes = res.data;
                    if (objRes.status_code == 200) {
                        let aData = objRes.data;
                        this.aTableData = aData;
                    } else {
                        this.$Message.warning(objRes.message);
                    }
                } else {
                    this.$Message.warning('系统出错!');
                }
            });
        }
    },
    mounted() {
        this.ajaxFetchData();
    }
};
</script>
