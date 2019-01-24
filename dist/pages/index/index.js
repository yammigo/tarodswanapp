"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2; /* eslint-disable react/no-multi-comp */


var _index = require("../../npm/@tarojs/taro-swan/index.js");

var _index2 = _interopRequireDefault(_index);

var _calendar = require("../../../lib/calendar.js");

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "oDate", "oYear", "isleap", "daylist", "lastday", "dayWeek", "y", "m", "d", "w", "dateItem", "nondateItem"], _this.config = {
      navigationBarTitleText: 'demo'
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
        dateItem: [],
        nondateItem: []
      };
    }

    /*
       @param 当前年月日
       @return object 返回上一个月是多少年、多少月,之后一天date
     */

  }, {
    key: "getberfordate",
    value: function getberfordate(yy, mm, dd) {
      var opt = {};
      if (mm - 1 < 0) {
        opt.year = yy - 1;
        opt.month = 12;
        opt.date = 31;
        opt.isleap = new Date("'" + yy - 1 + "/" + 12 + "/" + 31 + "'").getYear() % 400 == 0 ? 1 : this.oYear % 100 !== 0 && this.oYear % 4 == 0 ? 1 : 0;
      } else if (mm - 1 == 2) {
        opt.year = yy;
        opt.month = mm - 1;
        opt.isleap = new Date("'" + yy + "/" + 2 + "/" + dd + "'").getYear() % 400 == 0 ? 1 : this.oYear % 100 !== 0 && this.oYear % 4 == 0 ? 1 : 0;
        opt.date = 28 + opt.isleap;
      } else {
        opt.year = yy;
        opt.month = mm - 1;
        opt.isleap = opt.isleap = new Date("'" + yy + "/" + opt.month + "/" + dd + "'").getYear() % 400 == 0 ? 1 : this.oYear % 100 !== 0 && this.oYear % 4 == 0 ? 1 : 0;
        opt.date = this.lastday[opt.month];
      }

      return opt;
    }

    // 创建基础date

  }, {
    key: "initcalender",
    value: function initcalender() {
      //获取当前月份的第一天
      var self = this;
      var firstDate = new Date(this.state.y, this.state.m, 1);
      var dayWeek = firstDate.getDay();
      var dateItem = [];
      var nondateItem = [];
      //生成单页日历需要的数据一个二维数组
      for (var i = 0; i < 6; i++) {
        dateItem.push([]);
        nondateItem.push([]);
        for (var j = 0; j < 7; j++) {
          var l = i * 7 + j;
          var v = l - dayWeek + 1;
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
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {

      this.initcalender();
      console.log("componentWillMount");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('componentDidMount');
      console.log(_calendar2.default.solar2lunar(2051, 12, 31));
      console.log(this.getberfordate(2019, 4, 1));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      console.log('componentDidShow');
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      console.log('componentDidHide');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;
      var anonymousState__temp = this.__state.daylist == 7 ? "日" : this.__state.daylist[this.__state.w];
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        _triggerObserer: false
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = [], _temp2);
exports.default = Index;

Page(require('../../npm/@tarojs/taro-swan/index.js').default.createComponent(Index, true));