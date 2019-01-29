/* eslint-disable react/no-multi-comp */
import Taro, {Component} from '@tarojs/taro'
import {View, Text, Swiper, SwiperItem} from '@tarojs/components'
import './index.less'
import {array} from 'prop-types';

export default class Index extends Component {
    config = {
        navigationBarTitleText: 'demo'
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 传入当前swiper索引来计算上一年或下一年的date数据
     * @param {Number}curindex
     */
    getnewyear(curindex) {
        let index = curindex.currentTarget.current;
        let absIndex = index - this.state.currencyIndex;
        console.log(absIndex);
        if (absIndex == -11) {
            var newyear = this.state.y + 1;
            console.log('当前是'+newyear+"年")
            let stateinit = {
                oDate: new Date(newyear, 0, 1),
                daylist: ['日', '一', '二', '三', '四', '五', '六'],
                dayWeek: '',
                dateItem: [],
                month12date: []

            }
            stateinit.oYear = stateinit.oDate.getFullYear();
            stateinit.isleap = stateinit.oYear % 400 == 0 ? 1 : ((stateinit.oYear % 100 !== 0 && stateinit.oYear % 4 == 0) ? 1 : 0);
            stateinit.lastday = [31, 28 + stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//12个月的尾号日期表
            stateinit.y = stateinit.oDate.getFullYear();
            stateinit.m = stateinit.oDate.getMonth();
            stateinit.d = stateinit.oDate.getDate();
            stateinit.w = stateinit.oDate.getDay();
            for (var y = 0; y < 12; y++) {
                let firstDate = new Date(stateinit.y, y, 1);
                let dayWeek = firstDate.getDay();
                stateinit.month12date.push([]);
                for (let i = 0; i < 6; i++) {
                    stateinit.month12date[y].push([]);
                    for (let j = 0; j < 7; j++) {
                        let l = i * 7 + j;
                        let v = l - dayWeek + 1;
                        if (v <= 0 || v > stateinit.lastday[y]) {
                            //不属于当月的内容先占位
                            stateinit.month12date[y][i][j] = '';
                        } else {
                            stateinit.month12date[y][i][j] = v;

                        }
                    }
                }
            }

            // 执行数据更新
            this.setState({month12date:stateinit.month12date,y:newyear});



        }else{
            if(absIndex ==11){
                var newyear = this.state.y - 1;
                console.log('当前是'+newyear+"年")
                let stateinit = {
                    oDate: new Date(newyear, 0, 1),
                    daylist: ['日', '一', '二', '三', '四', '五', '六'],
                    dayWeek: '',
                    dateItem: [],
                    month12date: []

                }
                stateinit.oYear = stateinit.oDate.getFullYear();
                stateinit.isleap = stateinit.oYear % 400 == 0 ? 1 : ((stateinit.oYear % 100 !== 0 && stateinit.oYear % 4 == 0) ? 1 : 0);
                stateinit.lastday = [31, 28 + stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                stateinit.y = stateinit.oDate.getFullYear();
                stateinit.m = stateinit.oDate.getMonth();
                stateinit.d = stateinit.oDate.getDate();
                stateinit.w = stateinit.oDate.getDay();
                //核心数据构造
                for (var y = 0; y < 12; y++) {
                    let firstDate = new Date(stateinit.y, y, 1);
                    let dayWeek = firstDate.getDay();
                    stateinit.month12date.push([]);
                    for (let i = 0; i < 6; i++) {
                        stateinit.month12date[y].push([]);
                        for (let j = 0; j < 7; j++) {
                            let l = i * 7 + j;
                            let v = l - dayWeek + 1;
                            if (v <= 0 || v > stateinit.lastday[y]) {
                                //不属于当月的内容先占位
                                stateinit.month12date[y][i][j] = '';
                            } else {
                                stateinit.month12date[y][i][j] = v;
                            }
                        }
                    }
                }

                // 执行数据更新
                this.setState({month12date:stateinit.month12date,y:newyear});
            }
        }
        this.setState({currencyIndex:index})
    }

    /**
     * 创建基础当前年份日历所需要的数据
     * @param {Number}y
     * @param {Number}m
     * @param {Number}d
     * @returns {Object}
     */
    initcalender() {
        //初始化state的数据
        let stateinit = {
            oDate: new Date(),
            daylist: ['日', '一', '二', '三', '四', '五', '六'],
            dayWeek: '',
            swiper: new Array(12),
            dateItem: [],
            month12date: [],
            currencyIndex: 0,

        }
        stateinit.oYear = stateinit.oDate.getYear();
        stateinit.isleap = stateinit.oYear % 400 == 0 ? 1 : ((stateinit.oYear % 100 !== 0 && stateinit.oYear % 4 == 0) ? 1 : 0);
        stateinit.lastday = [31, 28 + stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        stateinit.y = stateinit.oDate.getFullYear();
        stateinit.m = stateinit.oDate.getMonth();
        stateinit.d = stateinit.oDate.getDate();
        stateinit.w = stateinit.oDate.getDay();
        stateinit.currencyIndex=stateinit.m
        //一次生成1年所需要的数据生成一个多维数组
        for (var y = 0; y < 12; y++) {
            let firstDate = new Date(stateinit.y, y, 1);
            let dayWeek = firstDate.getDay();
            stateinit.month12date.push([]);
            for (let i = 0; i < 6; i++) {
                stateinit.month12date[y].push([]);
                for (let j = 0; j < 7; j++) {
                    let l = i * 7 + j;
                    let v = l - dayWeek + 1;
                    if (v <= 0 || v > stateinit.lastday[y]) {
                        //不属于当月的内容先占位
                        stateinit.month12date[y][i][j] = '';
                    } else {
                        stateinit.month12date[y][i][j] = v;

                    }
                }
            }
        }

        //初始化原始state
        this.setState(stateinit)
        return stateinit

    }

    componentWillMount() {
        this.initcalender();
    }

    componentDidMount() {
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
                    <View className="date_select">{this.state.y}年{this.state.m + 1}月▼</View>
                </View>
                <View className="dayHeader">
                    <View className="day_date">
                        {this.state.d}
                    </View>
                    <View className="day_info">
                        <View
                            className="day">星期{this.state.d == 7 ? "日" : this.state.daylist[this.state.w]}</View>
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
                    <Swiper
                        className='test-h swiperH'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular={true}
                        duration={300}
                        current={this.state.m}
                        onChange={this.getnewyear.bind(this, this.current)}
                        indicatorDots>
                        {
                            this.state.month12date.map(function (item1, index1) {
                                return (
                                    <SwiperItem key={index1}>
                                        <View className="dateList">

                                            {
                                                item1.map(function (item2, index2) {
                                                    return (
                                                        <View className="dateRow" key={index2}>
                                                            {
                                                                item2.map(function (item3, index3) {
                                                                    return (
                                                                        <View
                                                                            className={this.state.d == item3 ? "dateItem this_day" : "dateItem"}
                                                                            key={index3}>{item3}</View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </SwiperItem>
                                )
                            })
                        }


                    </Swiper>

                </View>
            </View>
        )
    }
}

