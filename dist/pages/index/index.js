"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2; /* eslint-disable react/no-multi-comp */


var _index = require("../../npm/@tarojs/taro-swan/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["oDate", "oYear", "isleap", "daylist", "lastday", "dayWeek", "y", "m", "d", "w", "dateItem"], _this.config = {
      navigationBarTitleText: '万年历'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        oDate: new Date(),
        oYear: new Date().getYear(),
        isleap: this.oYear % 400 == 0 ? 1 : this.oYear % 100 !== 0 && this.oYear % 4 == 0 ? 1 : 0, //计算闰平年
        daylist: ['日', '一', '二', '三', '四', '五', '六'],
        lastday: [31, 28 + this.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        dayWeek: '',
        y: new Date().getFullYear(),
        m: new Date().getMonth(),
        d: new Date().getDate(),
        w: new Date().getDay(),
        dateItem: []
      };
    }
  }, {
    key: "initcalender",
    value: function initcalender() {
      //获取当前月份的第一天
      var firstDate = new Date(this.state.y, this.state.m, 1);
      var dayWeek = firstDate.getDay();
      var dateItem = [];
      //生成单页需要的数据一个二维数组
      for (var i = 0; i < 6; i++) {
        dateItem.push([]);
        for (var j = 0; j < 7; j++) {
          var l = i * 7 + j;
          var v = l - dayWeek + 1;
          console.log(dayWeek);
          if (v <= 0 || v > this.state.lastday[this.state.m]) {
            dateItem[i][j] = '-';
          } else {
            dateItem[i][j] = v;
          }
        }
      }
      this.setState({
        dateItem: dateItem
      }, function () {
        console.log(this.state.dateItem);
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initcalender();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('2');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('3');
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      console.log('4');
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      console.log('5');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;
      Object.assign(this.__state, {
        _triggerObserer: false
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = [], _temp2);
exports.default = Index;

Page(require('../../npm/@tarojs/taro-swan/index.js').default.createComponent(Index, true));