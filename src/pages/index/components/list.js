import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Listdate extends Component{
    constructor(props){
       super(props);
       this.state={
         arr:[0,1,2,3,4,5,6,7]
       }
    }
    render(){
      return(
        <View className="dateRow">
            {
              this.state.arr.map(function(v,i){
                <View className="Item" key={i}><Text></Text>{v}</View>
             })
           }
        </View>
    
      )
    }
}