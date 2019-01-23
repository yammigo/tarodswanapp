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
            //    self.getjq(2019,2,v);
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
    
    var jq=new Array('0105小寒','0120大寒','0203立春','0218雨水','0305惊蜇','0320春分','0404清明','0419谷雨','0505立夏','0520小满','0605芒种','0621夏至','0706小暑','0722大暑','0807立秋','0822处暑','0907白露','0922秋分','1008寒露','1023霜降','1107立冬','1122小雪','1206大雪','1221冬至');
    var d=new Date("2019/3/7");
    var s='';
    if (mm<9) s+='0';
    s+=''+(mm);
    if (dd<10) s+='0';
    s+=''+dd;
    var i=0;
    while(i<jq.length && s>=jq[i]) i++;i--;

    console.log('今天是',yyyy,'年',mm,'月',dd,'日 正处于',jq[i].substr(4));
    
    }
    componentWillMount () {

        this.initcalender();
        this.getjq(2019,1,20);
        this.getjq(2020,4,5);
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

