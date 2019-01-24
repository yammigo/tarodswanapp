/* eslint-disable react/no-multi-comp */
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.less'
import {array} from 'prop-types';
import calendar from "../../../lib/calendar"

export default class Index extends Component {
    config = {
        navigationBarTitleText: 'demo'
    }

    constructor(props) {
        super(props);
        this.state = {
            oDate: new Date(),
            oYear: new Date().getYear(),
            isleap: this.oYear % 400 == 0 ? 1 : ((this.oYear % 100 !== 0 && this.oYear % 4 == 0) ? 1 : 0), //计算闰平年
            daylist: ['日', '一', '二', '三', '四', '五', '六'],
            lastday: [31, 28 + this.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            dayWeek: '',
            y: new Date().getFullYear(),
            m: new Date().getMonth(),
            d: new Date().getDate(),
            w: new Date().getDay(),
            dateItem: [],
            nondateItem: []
        }
    }

    /*
       @param 当前年月日
       @return object 返回上一个月是多少年、多少月,之后一天date
     */
    getberfordate(yy, mm, dd) {
        var opt = {};
        if (mm-1 < 0) {
            opt.year=yy-1;
            opt.month=12;
            opt.date=31;
            opt.isleap = new Date("'"+yy-1+ "/" + 12 + "/" + 31+"'").getYear() % 400 == 0 ? 1 : ((this.oYear % 100 !== 0 && this.oYear % 4 == 0) ? 1 : 0);

        }else if(mm-1==2){
            opt.year=yy;
            opt.month=mm-1;
            opt.isleap = new Date("'"+yy+ "/" + 2 + "/" + dd+"'").getYear() % 400 == 0 ? 1 : ((this.oYear % 100 !== 0 && this.oYear % 4 == 0) ? 1 : 0);
            opt.date=28+opt.isleap;
        }else{
            opt.year=yy;
            opt.month=mm-1;
            opt.isleap =  opt.isleap = new Date("'"+yy+ "/" + opt.month + "/" + dd+"'").getYear() % 400 == 0 ? 1 : ((this.oYear % 100 !== 0 && this.oYear % 4 == 0) ? 1 : 0);
            opt.date=this.lastday[opt.month];
        }

        return opt;

    }

// 创建基础date
    initcalender() {
        //获取当前月份的第一天
        let self = this
        let firstDate = new Date(this.state.y, this.state.m, 1);
        let dayWeek = firstDate.getDay();
        let dateItem = [];
        let nondateItem = [];
        //生成单页日历需要的数据一个二维数组
        for (let i = 0; i < 6; i++) {
            dateItem.push([])
            nondateItem.push([])
            for (let j = 0; j < 7; j++) {
                let l = i * 7 + j;
                let v = l - dayWeek + 1;
                if (v <= 0 || v > this.state.lastday[this.state.m]) {

                    dateItem[i][j] = '-'; //不属于当月的内容先占位
                } else {
                    dateItem[i][j] = v;

                }
            }
        }
        this.setState({
            dateItem: dateItem,
            nondateItem: nondateItem
        }, function () {
            console.log(this.state.dateItem);
            console.log(this.state.m + 1);
        })


    }

    componentWillMount() {

        this.initcalender();
        console.log("componentWillMount")

    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(calendar.solar2lunar(2051, 12, 31));
        console.log(this.getberfordate(2019,4,1));

    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    componentDidShow() {
        console.log('componentDidShow');
    }

    componentDidHide() {
        console.log('componentDidHide');
    }

    render() {


        return (
            <View className='index'>
                <View className="Pdate">
                    <View className="date_select">2019年1月▼</View>
                </View>
                <View className="dayHeader">
                    <View className="day_date">
                        {this.state.d}
                    </View>
                    <View className="day_info">
                        <View
                            className="day">星期{this.state.daylist == 7 ? "日" : this.state.daylist[this.state.w]}</View>
                        <View className="lunar">初七</View>
                    </View>
                    <View className="today">
                        今
                    </View>
                </View>
                <View className="contentDate">
                    <View className="Header">
                        {
                            this.state.daylist.map(function (item, index) {
                                return (
                                    <View className="date">{item}</View>
                                )
                            })

                        }
                    </View>
                    <View className="dateList">
                        {
                            this.state.dateItem.map(function (item, index) {
                                return (
                                    <View className="dateRow" key={index}>
                                        {
                                            item.map(function (item2, index) {
                                                return (
                                                    <View
                                                        className={this.state.d == item2 ? "dateItem this_day" : "dateItem"}
                                                        key={index}>{item2}</View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}

