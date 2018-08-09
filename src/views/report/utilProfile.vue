<style lang="less" scope>
.ivu-table td.low_row {
    background: #b7dbab;
}
.ivu-table td.normal_row {
    background: #eaeff7;
}
.ivu-table td.up_row {
    background: #ed7d31;
}
.ivu-table td.head_row {
    background: #ed7d31;
}
</style>
<template>
    <Card id="test">
        <p slot="title">
            利用率概览
        </p>
        <Button type="primary" slot="extra" @click="exportImage()">导出图片</Button>
        <search-form ref="searchForm" :objData="aSearchData" v-on:handleFormSubmit="searchFormSubmit"></search-form>
        <table-paging :bSpinShow="loading" stripe="hidden" :columns="aTableColumns" :data="aTableData"></table-paging>
    </Card>
</template>

<script>
import API from '@/libs/API.js';
import html2canvas from 'html2canvas';
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
            objParams: {
                date: '2018-08-03'
            },
            aTableColumns: [
                {
                    key: 'title',
                    title: '硬件指标业务线',
                    width: 150,
                    align: 'center'
                },
                {
                    key: 'device',
                    title: '存量台数',
                    width: 120,
                    align: 'center',
                    sortable: true,
                    sortType: 'desc'
                },
                {
                    key: 'cpu',
                    title: 'CPU',
                    className: 'head_row',
                    align: 'center',
                    children: [
                        {
                            key: 'cpu_low_name',
                            title: '空闲',
                            children: [
                                {
                                    key: 'cpu_low_num',
                                    className: 'low_row',
                                    width: 100,
                                    title: '0%~10%'
                                }
                            ]
                        },
                        {
                            key: 'cpu_normal_name',
                            title: '正常',
                            children: [
                                {
                                    key: 'cpu_normal_num',
                                    className: 'normal_row',
                                    width: 100,
                                    title: '10%~70%'
                                }
                            ]
                        },
                        {
                            key: 'cpu_up_name',
                            title: '繁忙',
                            children: [
                                {
                                    key: 'cpu_up_num',
                                    className: 'up_row',
                                    width: 100,
                                    title: '70%~100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'load',
                    title: 'LOAD',
                    align: 'center',
                    children: [
                        {
                            key: 'load_low_name',
                            title: '空闲',
                            children: [
                                {
                                    key: 'load_low_num',
                                    className: 'low_row',
                                    width: 100,
                                    title: '0~10'
                                }
                            ]
                        },
                        {
                            key: 'load_normal_name',
                            title: '正常',
                            children: [
                                {
                                    key: 'load_normal_num',
                                    className: 'normal_row',
                                    width: 100,
                                    title: '10~25'
                                }
                            ]
                        },
                        {
                            key: 'load_up_name',
                            title: '繁忙',
                            children: [
                                {
                                    key: 'load_up_num',
                                    className: 'up_row',
                                    width: 100,
                                    title: '25~100+'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'memory',
                    title: '内存',
                    align: 'center',
                    children: [
                        {
                            key: 'mem_low_name',
                            title: '空闲',
                            children: [
                                {
                                    key: 'mem_low_num',
                                    className: 'low_row',
                                    width: 100,
                                    title: '0%~10%'
                                }
                            ]
                        },
                        {
                            key: 'mem_normal_name',
                            title: '正常',
                            children: [
                                {
                                    key: 'mem_normal_num',
                                    className: 'normal_row',
                                    width: 100,
                                    title: '10%~90%'
                                }
                            ]
                        },
                        {
                            key: 'mem_up_name',
                            title: '繁忙',
                            children: [
                                {
                                    key: 'mem_up_num',
                                    className: 'up_row',
                                    width: 100,
                                    title: '90%~100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'diskUtil',
                    title: '磁盘利用率',
                    align: 'center',
                    children: [
                        {
                            key: 'diskUtil_low_name',
                            title: '空闲',
                            children: [
                                {
                                    key: 'diskUtil_low_num',
                                    className: 'low_row',
                                    width: 100,
                                    title: '0%~10%'
                                }
                            ]
                        },
                        {
                            key: 'diskUtil_normal_name',
                            title: '正常',
                            children: [
                                {
                                    key: 'diskUtil_normal_num',
                                    className: 'normal_row',
                                    width: 100,
                                    title: '10%~50%'
                                }
                            ]
                        },
                        {
                            key: 'diskUtil_up_name',
                            title: '繁忙',
                            children: [
                                {
                                    key: 'diskUtil_up_num',
                                    className: 'up_row',
                                    width: 100,
                                    title: '50%~100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'diskMem',
                    title: '磁盘容量',
                    align: 'center',
                    children: [
                        {
                            key: 'diskMem_low_name',
                            title: '空闲',
                            children: [
                                {
                                    key: 'diskMem_low_num',
                                    className: 'low_row',
                                    width: 100,
                                    title: '0%~10%'
                                }
                            ]
                        },
                        {
                            key: 'diskMem_normal_name',
                            title: '正常',
                            children: [
                                {
                                    key: 'diskMem_normal_num',
                                    className: 'normal_row',
                                    width: 100,
                                    title: '10%~70%'
                                }
                            ]
                        },
                        {
                            key: 'diskMem_up_name',
                            title: '繁忙',
                            children: [
                                {
                                    key: 'diskMem_up_num',
                                    className: 'up_row',
                                    width: 100,
                                    title: '70%~100%'
                                }
                            ]
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
            console.log(search);
            this.objParams = search;
            this.ajaxFetchData();
        },
        ajaxFetchData() {
            this.loading = true;
            this.$store
                .dispatch('ajaxPost', {
                    url: API.report.util,
                    data: this.objParams
                })
                .then(res => {
                    if (res.status == 200) {
                        console.log(res);
                        this.loading = false;
                        let objRes = res.data;
                        if (objRes.status_code == 200) {
                            let aData = objRes.data;
                            aData.map(item => {
                                if (item.cpu.length) {
                                    // cpu
                                    item['cpu_low_num'] = item.cpu[0];
                                    item['cpu_normal_num'] = item.cpu[1];
                                    item['cpu_up_num'] = item.cpu[2];
                                    // load
                                    item['load_low_num'] = item.load[0];
                                    item['load_normal_num'] = item.load[1];
                                    item['load_up_num'] = item.load[2];
                                    // mem
                                    item['mem_low_num'] = item.mem[0];
                                    item['mem_normal_num'] = item.mem[1];
                                    item['mem_up_num'] = item.mem[2];
                                    // disk_util
                                    item['diskUtil_low_num'] =
                                        item.disk_util[0];
                                    item['diskUtil_normal_num'] =
                                        item.disk_util[1];
                                    item['diskUtil_up_num'] = item.disk_util[2];
                                    // disk
                                    item['diskMem_low_num'] = item.disk[0];
                                    item['diskMem_normal_num'] = item.disk[1];
                                    item['diskMem_up_num'] = item.disk[2];
                                } else {
                                    // cpu
                                    item['cpu_low_num'] = null;
                                    item['cpu_normal_num'] = null;
                                    item['cpu_up_num'] = null;
                                    // load
                                    item['load_low_num'] = null;
                                    item['load_normal_num'] = null;
                                    item['load_up_num'] = null;
                                    // mem
                                    item['mem_low_num'] = null;
                                    item['mem_normal_num'] = null;
                                    item['mem_up_num'] = null;
                                    // disk_util
                                    item['diskUtil_low_num'] = null;
                                    item['diskUtil_normal_num'] = null;
                                    item['diskUtil_up_num'] = null;
                                    // disk
                                    item['diskMem_low_num'] = null;
                                    item['diskMem_normal_num'] = null;
                                    item['diskMem_up_num'] = null;
                                }
                            });
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



