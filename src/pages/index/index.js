/* eslint-disable react/no-multi-comp */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { array } from 'prop-types';
import Listdate from "./components/list"

// class Listdate extends Component{
//       constructor(props){
//          super(props);
//          this.state={
//            arr:[0,1,2,3,4,5,6,7]
//          }
//       }
//       render(){
//         return(
//           <View className="dateRow">
//               {
//                 this.state.arr.map(function(v,i){
//                   <View className="Item" key={i}><Text></Text>{v}</View>
//                })
//              }
//           </View>
      
//         )
//       }
// }

export default class Index extends Component {
  config = {
    navigationBarTitleText: '万年历'
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
    let firstDate=new Date(this.state.y,this.state.m,1);
    let dayWeek=firstDate.getDay();
    let dateItem=[];
    //生成单页需要的数据一个二维数组
    for(let i=0;i<6;i++){
       dateItem.push([])
       for(let j=0;j<7;j++){
           let l=i*7+j;
           let v=l-dayWeek+1;
           console.log(dayWeek);
           if(v<=0||v>this.state.lastday[this.state.m]){
            dateItem[i][j]='-'
           }else{
            dateItem[i][j]=v
           }
    
       }
    }
   this.setState({
      dateItem:dateItem
    },function(){
      console.log(this.state.dateItem)
    })
    
  }
   


  componentWillMount () { 
   this.initcalender()
   
  }

  componentDidMount () {
    console.log('2');
   }

  componentWillUnmount () { 
    console.log('3');
  }

  componentDidShow () { 
    console.log('4');
  }

  componentDidHide () { 
    console.log('5');
  }

  render () {

    return (
      <View className='index'>
      <View className="dayHeader">
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
                <Listdate></Listdate>
             </View>
      </View>
      </View>
    )
  }
}

