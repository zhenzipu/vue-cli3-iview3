<style lang="less" scope>
</style>
<template>
    <Card id="test">
        <p slot="title">
            报表系统
        </p>
        <Button type="primary" slot="extra" @click="exportImage()">导出图片</Button>
        <Row>
            <search-form ref="searchForm" :objData="aSearchData" v-on:handleFormSubmit="searchFormSubmit"></search-form>
            <iframe style="width:100%; height:400px;" :src="strUrl"></iframe>
            <table-paging style="marginTop:10px;" :bSpinShow="loading" :columns="aTableColumns" :data="aContractList"></table-paging>
            <table-paging style="marginTop:10px;" :bSpinShow="loading2" :columns="aTableColumns2" :data="aContractList2"></table-paging>
        </Row>

    </Card>
</template>

<script>
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
            strUrl:
                "http://kibanav2.idc.jd.com/app/kibana#/visualize/edit/382bffe0-87b8-11e8-aeb9-813623740b90?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'Mon%20Jun%2018%202018%2000:00:00%20GMT%2B0800',mode:absolute,to:'Mon%20Jun%2018%202018%2023:59:59%20GMT%2B0800'))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'76654fb0-7ffb-11e8-aeb9-813623740b90',key:department1_id_name,negate:!f,params:(query:CMO%E4%BD%93%E7%B3%BB,type:phrase),type:phrase,value:CMO%E4%BD%93%E7%B3%BB),query:(match:(department1_id_name:(query:CMO%E4%BD%93%E7%B3%BB,type:phrase))))),linked:!f,query:(language:lucene,query:'mib:%22CpuPercent%22'),uiState:(vis:(colors:('0%20to%205':%23B7DBAB,'10%20to%2025':%23F2C96D,'25%20to%2050':%23E5AC0E,'5%20to%2010':%23629E51,'50%20to%2090':%23C15C17,'90%20to%201,000':%2358140C))),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'4',params:(customLabel:T,field:op_group.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,row:!f,size:20),schema:split,type:terms),(enabled:!t,id:'2',params:(customInterval:'2h',customLabel:TIME,extended_bounds:(),field:timestamp,interval:d,min_doc_count:1),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:V,field:max,ranges:!((from:90,to:1000),(from:50,to:90),(from:25,to:50),(from:10,to:25),(from:5,to:10),(from:0,to:5))),schema:group,type:range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,style:(color:%23eee)),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,mode:stacked,show:true,showCircles:!t,type:area,valueAxis:ValueAxis-1)),times:!(),type:area,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:CMO-TAG-CPU-DAYS,type:area))",
            // 搜索数据
            aSearchData: [
                {
                    type: 'date',
                    label: '开始时间',
                    dateType: 'date',
                    value: 'stim',
                    format: 'yyyy-MM-dd',
                    placeholder: '选择开始时间',
                    limit: '2015-01-01 00:00:00'
                },
                {
                    type: 'date',
                    label: '结束时间',
                    dateType: 'date',
                    value: 'etim',
                    format: 'yyyy-MM-dd',
                    placeholder: '选择结束时间',
                    limit: '2015-01-01 00:00:00'
                }
            ],
            loading: false,
            loading2: false,
            aTableColumns: [
                {
                    key: 'item1',
                    title: '业务标签'
                },
                {
                    key: 'item2',
                    title: 'BP_OM'
                },
                {
                    key: 'item3',
                    title: 'BP_ELECTED'
                },
                {
                    key: 'item4',
                    title: 'DB_YEAR'
                },
                {
                    key: 'item5',
                    title: 'CMD_DCP'
                },
                {
                    key: 'item3',
                    title: 'BP_ELECTED'
                },
                {
                    key: 'item4',
                    title: 'DB_YEAR'
                },
                {
                    key: 'item5',
                    title: 'CMD_DCP'
                },
                {
                    key: 'item3',
                    title: 'BP_ELECTED'
                },
                {
                    key: 'item4',
                    title: 'DB_YEAR'
                },
                {
                    key: 'item5',
                    title: 'CMD_DCP'
                }
            ],
            aContractList: [
                {
                    item1: '设备数量',
                    item2: '2628台',
                    item3: '603台',
                    item4: '22.95%',
                    item5: '534'
                }
            ],
            aTableColumns2: [
                {
                    key: 'item1',
                    title: '业务标签'
                },
                {
                    key: 'range1',
                    title: '0~5'
                },
                {
                    key: 'range2',
                    title: '5~25'
                },
                {
                    key: 'range3',
                    title: '25~50'
                },
                {
                    key: 'range4',
                    title: '50~75'
                },
                {
                    key: 'range5',
                    title: '75~95'
                },
                {
                    key: 'range6',
                    title: '95~1000'
                },
                {
                    key: 'num',
                    title: '设备数量'
                }
            ],
            aContractList2: [
                {
                    item1: 'EP_DAS',
                    range1: '2342',
                    range2: '1532',
                    range3: '2332',
                    range4: '724',
                    range5: '2412',
                    range6: '522',
                    num: '224'
                },
                {
                    item1: 'OP_CE',
                    range1: '2342',
                    range2: '1532',
                    range3: '2332',
                    range4: '724',
                    range5: '2412',
                    range6: '522',
                    num: '224'
                },
                {
                    item1: 'IE_CE',
                    range1: '2342',
                    range2: '1532',
                    range3: '2332',
                    range4: '724',
                    range5: '2412',
                    range6: '522',
                    num: '224'
                },
                {
                    item1: 'IIO_CS',
                    range1: '2342',
                    range2: '1532',
                    range3: '2332',
                    range4: '724',
                    range5: '2412',
                    range6: '522',
                    num: '224'
                },
                {
                    item1: 'OPI_CDSA',
                    range1: '2342',
                    range2: '1532',
                    range3: '2332',
                    range4: '724',
                    range5: '2412',
                    range6: '522',
                    num: '224'
                }
            ]
        };
    },
    computed: {},
    methods: {
        // 导出图片
        exportImage() {
            let vm = this;
            let iframe = document.getElementsByTagName('iframe')[0];
            // console.log(111, iframe.contentWindow);
            let table = document.getElementById('test');
            html2canvas(table, {
                onrendered(image) {
                    var url = image.toDataURL();
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'test';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        },
        searchFormSubmit(search) {
            console.log(search);
            var strStim = new Date(search.stim).toString().split(' (')[0];
            var strEtim = new Date(search.etim).toString().split(' (')[0];
            // 搜索时间改变iframe url地址
            this.strUrl =
                "http://kibanav2.idc.jd.com/app/kibana#/visualize/edit/382bffe0-87b8-11e8-aeb9-813623740b90?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'" +
                strStim +
                "',mode:absolute,to:'" +
                strEtim +
                "'))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'76654fb0-7ffb-11e8-aeb9-813623740b90',key:department1_id_name,negate:!f,params:(query:CMO%E4%BD%93%E7%B3%BB,type:phrase),type:phrase,value:CMO%E4%BD%93%E7%B3%BB),query:(match:(department1_id_name:(query:CMO%E4%BD%93%E7%B3%BB,type:phrase))))),linked:!f,query:(language:lucene,query:'mib:%22CpuPercent%22'),uiState:(vis:(colors:('0%20to%205':%23B7DBAB,'10%20to%2025':%23F2C96D,'25%20to%2050':%23E5AC0E,'5%20to%2010':%23629E51,'50%20to%2090':%23C15C17,'90%20to%201,000':%2358140C))),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'4',params:(customLabel:T,field:op_group.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,row:!f,size:20),schema:split,type:terms),(enabled:!t,id:'2',params:(customInterval:'2h',customLabel:TIME,extended_bounds:(),field:timestamp,interval:d,min_doc_count:1),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:V,field:max,ranges:!((from:90,to:1000),(from:50,to:90),(from:25,to:50),(from:10,to:25),(from:5,to:10),(from:0,to:5))),schema:group,type:range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,style:(color:%23eee)),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,mode:stacked,show:true,showCircles:!t,type:area,valueAxis:ValueAxis-1)),times:!(),type:area,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:CMO-TAG-CPU-DAYS,type:area))";
        }
    },
    mounted() {}
};
</script>
