<style lang="less" scope>
.ivu-table .demo-table-head-row td {
    background-color: #9bc2e6 !important;
    color: #495060;
}
.ivu-table td.demo-table-first-column {
    background: #fff !important;
    color: #495060;
}
.ivu-table td.demo-table-range1 {
    background: #e2efda;
}
.ivu-table td.demo-table-range2 {
    background: #a9d08e;
}
.ivu-table td.demo-table-range3 {
    background: #fff2cc;
}
.ivu-table td.demo-table-range4 {
    background: #ffd966;
}
.ivu-table td.demo-table-range5 {
    background: #f4b084;
}
.ivu-table td.demo-table-range6 {
    background: #c65911;
}
</style>
<template>
    <Card id="test">
        <p slot="title">
            指标报表
        </p>
        <Button type="primary" slot="extra" @click="exportImage()">导出图片</Button>
        <search-form ref="searchForm" :objData="aSearchData" v-on:handleFormSubmit="searchFormSubmit"></search-form>
        <table-paging id="tabCon" :row-class-name="rowClassName" bHover="hidden" stripe="hidden" :bSpinShow="loading" :columns="aTableColumns" :data="aTableData"></table-paging>
        <!-- <table-paging id="tabCon" bHover="hidden" stripe="hidden" :bSpinShow="loading" :columns="aTableColumns" :data="aTableData"></table-paging> -->

    </Card>
</template>
<script>
import API from '@/libs/API.js';
import searchForm from '@/components/search-form';
import tablePaging from '@/components/table-paging';
import { setTimeout } from 'timers';
export default {
    name: 'report',
    components: {
        tablePaging,
        searchForm
    },
    data() {
        return {
            objParams: {
                date: '2018-08-03'
            },
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
                    key: 'metrics',
                    title: '指标统计维度',
                    align: 'center',
                    children: [
                        {
                            key: 'metrics',
                            combine: true,
                            className: 'demo-table-first-column',
                            render: (h, params) => {
                                let strShow = '';
                                switch (params.row.metrics) {
                                    case 'cpu':
                                        strShow = 'CPU';
                                        break;
                                    case 'load':
                                        strShow = 'Load';
                                        break;
                                    case 'mem':
                                        strShow = '内存';
                                        break;
                                    case 'disk_util':
                                        strShow = '磁盘利用率';
                                        break;
                                    case 'disk':
                                        strShow = '磁盘容量';
                                        break;

                                    default:
                                        break;
                                }
                                return h('span', strShow);
                            }
                        },
                        {
                            key: 'index'
                        },
                        {
                            key: 'total'
                        }
                    ]
                },
                {
                    key: 'load',
                    title: '利用率指标范围',
                    align: 'center',
                    children: [
                        {
                            key: 'range1',
                            className: 'demo-table-range1'
                        },
                        {
                            key: 'range2',
                            className: 'demo-table-range2'
                        },
                        {
                            key: 'range3',
                            className: 'demo-table-range3'
                        },
                        {
                            key: 'range4',
                            className: 'demo-table-range4'
                        },
                        {
                            key: 'range5',
                            className: 'demo-table-range5'
                        },
                        {
                            key: 'range6',
                            className: 'demo-table-range6'
                        }
                    ]
                }
            ],
            aTableData: []
        };
    },
    computed: {},
    methods: {
        searchFormSubmit(search) {
            this.objParams = search;
            this.ajaxFetchData();
        },
        ajaxFetchData() {
            this.loading = true;
            this.$axios.post(API.report.util_v2, this.objParams).then(res => {
                if (res.status == 200) {
                    this.loading = false;
                    let objRes = res.data;
                    if (objRes.status_code == 200) {
                        let aData = objRes.data;
                        this.aTableData = this.combineData(aData);
                        setTimeout(() => {
                            this.combineCell();
                        }, 10);
                    } else {
                        this.$Message.warning(objRes.message);
                    }
                } else {
                    this.$Message.warning('系统出错!');
                }
            });
        },
        combineData(data) {
            let objCopy = JSON.parse(JSON.stringify(data));
            delete objCopy.total;
            let arr = [];
            for (const key in objCopy) {
                let column = {
                    metrics: key,
                    index: '统计维度',
                    total: '设备数量',
                    range1: objCopy[key].part_keys[0],
                    range2: objCopy[key].part_keys[1],
                    range3: objCopy[key].part_keys[2],
                    range4: objCopy[key].part_keys[3],
                    range5: objCopy[key].part_keys[4],
                    range6: objCopy[key].part_keys[5]
                };
                let tableData = {
                    metrics: key,
                    index: objCopy[key].index,
                    total: objCopy[key].total,
                    range1: objCopy[key].part_value[0],
                    range2: objCopy[key].part_value[1],
                    range3: objCopy[key].part_value[2],
                    range4: objCopy[key].part_value[3],
                    range5: objCopy[key].part_value[4],
                    range6: objCopy[key].part_value[5]
                };
                arr.push(column);
                arr.push(tableData);
            }
            return arr;
        },
        // 合并表格
        combineCell() {
            let tabs = document.getElementById('tabCon');
            // 拿到所有行
            let tBody = tabs
                .querySelector('.ivu-table')
                .querySelector('.ivu-table-body')
                .querySelector('.ivu-table-tbody')
                .querySelectorAll('tr');
            // 表头
            let thead = tabs
                .querySelector('.ivu-table')
                .querySelector('.ivu-table-header')
                .querySelectorAll('tr');
            thead[1].style.display = 'none';
            // 拿到数据
            let aSourceData = this.aTableData;
            // 需要合并key遍历
            let aColumns = [];
            this.aTableColumns.map(item => {
                if (item.children) {
                    aColumns = aColumns.concat(item.children);
                }
            });
            aColumns.map(item => {
                if (item.combine) {
                    let field = item.key;
                    var k = 0;
                    while (k < aSourceData.length) {
                        aSourceData[k][field + '_num'] = 1;
                        aSourceData[k][field + '_isNone'] = false;
                        for (var i = k + 1; i <= aSourceData.length - 1; i++) {
                            if (
                                aSourceData[k][field] ==
                                    aSourceData[i][field] &&
                                aSourceData[k][field] != ''
                            ) {
                                aSourceData[k][field + '_num']++;
                                aSourceData[k][field + '_isNone'] = false;
                                aSourceData[i][field + '_num'] = 1;
                                aSourceData[i][field + '_isNone'] = true;
                            } else {
                                break;
                            }
                        }
                        k = i;
                    }
                }
            });
            aColumns.map((item, index) => {
                // 根据columns判断是否需要合并
                if (item.combine) {
                    // 遍历处理后的数据拿到rowspan、display属性
                    aSourceData.map((item_child, index_child) => {
                        tBody[index_child].querySelectorAll('td')[
                            index
                        ].rowSpan =
                            item_child[item.key + '_num'];
                        // 判断是否隐藏
                        if (item_child[item.key + '_isNone']) {
                            tBody[index_child].querySelectorAll('td')[
                                index
                            ].style.display =
                                'none';
                        }
                    });
                }
            });
        },

        // 行样式

        rowClassName(row, index) {
            // if (row.key === '统计维度') {
            //     return 'demo-table-head-row';
            // } else if (index === 3) {
            //     return 'demo-table-head-row';
            // }
            if (row.index === '统计维度') {
                return 'demo-table-head-row';
            }
            return '';
        }
    },
    mounted() {
        this.ajaxFetchData();
    }
};
</script>



