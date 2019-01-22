/* eslint-disable react/no-multi-comp */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { array } from 'prop-types';
import Listdate from "./components/list"
export default class Index extends Component {
  config = {
    navigationBarTitleText: 'demo'
  }
  constructor(props){
      super(props);
      this.state={
        oDate:new Date(),
        oYear:new Date().getYear(),
        isleap:this.oYear%400==0?1:((this.oYear%100!==0&&this.oYear%4==0)?1:0), //计算闰平年
        daylist:['日','一','二','三','四','五','六'],
        lastday:[31,28+this.isleap,31,30,31,30,31,31,30,31,30,31],
        dayWeek:'',
        y:new Date().getFullYear(),
        m:new Date().getMonth(),
        d:new Date().getDate(),
        w:new Date().getDay(),
        dateItem:[]
      }
  }


  initcalender(){
    //获取当前月份的第一天
    let self=this
    let firstDate=new Date(this.state.y,this.state.m,1);
    let dayWeek=firstDate.getDay();
    let dateItem=[];
    //生成单页日历需要的数据一个二维数组
    for(let i=0;i<6;i++){
       dateItem.push([])
       for(let j=0;j<7;j++){
           let l=i*7+j;
           let v=l-dayWeek+1;
           if(v<=0||v>this.state.lastday[this.state.m]){
            dateItem[i][j]='-' //不属于当月的内容先占位
           }else{
               dateItem[i][j]=v;
               self.getjq(2019,1,v);
           }
       }
    }
   this.setState({
      dateItem:dateItem
    },function(){
      console.log(this.state.dateItem)
    })

  }
  //计算节气
  getjq(yyyy, mm, dd) {
        if(yyyy==2016&&mm==12&&dd==7){
            return "大雪";
        }
        if(yyyy==2016&&mm==12&&dd==6){
            return "";
        }
        mm = mm - 1;
          let sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
          let solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
          let tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
          let tmp2 = tmp1.getUTCDate();
          let solarTerms = "";
        if (tmp2 == dd) {
            solarTerms = solarTerm[mm * 2 + 1];
            tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            tmp2 = tmp1.getUTCDate();
        }
        if (tmp2 == dd) {
            solarTerms = solarTerm[mm * 2];
        }
        console.log('获取节气分析数据'+solarTerms);
        return solarTerms;
    }
    componentWillMount () {

        this.initcalender();
        this.getjq(2019,2,22);
        console.log("componentWillMount")
   
  }

  componentDidMount () {
    console.log('componentDidMount');
   }

  componentWillUnmount () { 
    console.log('componentWillUnmount');
  }

  componentDidShow () { 
    console.log('componentDidShow');
  }

  componentDidHide () { 
    console.log('componentDidHide');
  }

  render () {


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
              <View className="day">星期{this.state.daylist==7?"日":this.state.daylist[this.state.w]}</View>
              <View className="lunar">初七</View>
          </View>
          <View className="today">
              今
          </View>
      </View>
      <View className="contentDate">
             <View className="Header">
             {
              this.state.daylist.map(function(item,index){
                  return (
                    <View className="date">{item}</View>
                  )
              })
              
            }
             </View>
             <View className="dateList">
                 {
                     this.state.dateItem.map(function(item,index){
                         return(
                             <View className="dateRow" key={index}>
                                 {
                                     item.map(function(item2,index){
                                         return(
                                             <View className={this.state.d==item2?"dateItem this_day":"dateItem"} key={index}>{item2}</View>
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

