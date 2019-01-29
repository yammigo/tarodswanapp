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

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "current", "daylist", "m", "month12date", "d", "y", "w"], _this.config = {
      navigationBarTitleText: 'demo'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {};
    }

    /**
     * 传入当前swiper索引来计算上一年或下一年的date数据
     * @param {Number}curindex
     */

  }, {
    key: "getnewyear",
    value: function getnewyear(curindex) {
      var index = curindex.currentTarget.current;
      var absIndex = index - this.state.currencyIndex;
      console.log(absIndex);
      if (absIndex == -11) {
        var newyear = this.state.y + 1;
        console.log('当前是' + newyear + "年");
        var stateinit = {
          oDate: new Date(newyear, 0, 1),
          daylist: ['日', '一', '二', '三', '四', '五', '六'],
          dayWeek: '',
          dateItem: [],
          month12date: []

        };
        stateinit.oYear = stateinit.oDate.getFullYear();
        stateinit.isleap = stateinit.oYear % 400 == 0 ? 1 : stateinit.oYear % 100 !== 0 && stateinit.oYear % 4 == 0 ? 1 : 0;
        stateinit.lastday = [31, 28 + stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //12个月的尾号日期表
        stateinit.y = stateinit.oDate.getFullYear();
        stateinit.m = stateinit.oDate.getMonth();
        stateinit.d = stateinit.oDate.getDate();
        stateinit.w = stateinit.oDate.getDay();
        for (var y = 0; y < 12; y++) {
          var firstDate = new Date(stateinit.y, y, 1);
          var dayWeek = firstDate.getDay();
          stateinit.month12date.push([]);
          for (var i = 0; i < 6; i++) {
            stateinit.month12date[y].push([]);
            for (var j = 0; j < 7; j++) {
              var l = i * 7 + j;
              var v = l - dayWeek + 1;
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
        this.setState({ month12date: stateinit.month12date, y: newyear });
      } else {
        if (absIndex == 11) {
          var newyear = this.state.y - 1;
          console.log('当前是' + newyear + "年");
          var _stateinit = {
            oDate: new Date(newyear, 0, 1),
            daylist: ['日', '一', '二', '三', '四', '五', '六'],
            dayWeek: '',
            dateItem: [],
            month12date: []

          };
          _stateinit.oYear = _stateinit.oDate.getFullYear();
          _stateinit.isleap = _stateinit.oYear % 400 == 0 ? 1 : _stateinit.oYear % 100 !== 0 && _stateinit.oYear % 4 == 0 ? 1 : 0;
          _stateinit.lastday = [31, 28 + _stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          _stateinit.y = _stateinit.oDate.getFullYear();
          _stateinit.m = _stateinit.oDate.getMonth();
          _stateinit.d = _stateinit.oDate.getDate();
          _stateinit.w = _stateinit.oDate.getDay();
          //核心数据构造
          for (var y = 0; y < 12; y++) {
            var _firstDate = new Date(_stateinit.y, y, 1);
            var _dayWeek = _firstDate.getDay();
            _stateinit.month12date.push([]);
            for (var _i = 0; _i < 6; _i++) {
              _stateinit.month12date[y].push([]);
              for (var _j = 0; _j < 7; _j++) {
                var _l = _i * 7 + _j;
                var _v = _l - _dayWeek + 1;
                if (_v <= 0 || _v > _stateinit.lastday[y]) {
                  //不属于当月的内容先占位
                  _stateinit.month12date[y][_i][_j] = '';
                } else {
                  _stateinit.month12date[y][_i][_j] = _v;
                }
              }
            }
          }

          // 执行数据更新
          this.setState({ month12date: _stateinit.month12date, y: newyear });
        }
      }
      this.setState({ currencyIndex: index });
    }

    /**
     * 创建基础当前年份日历所需要的数据
     * @param {Number}y
     * @param {Number}m
     * @param {Number}d
     * @returns {Object}
     */

  }, {
    key: "initcalender",
    value: function initcalender() {
      //初始化state的数据
      var stateinit = {
        oDate: new Date(),
        daylist: ['日', '一', '二', '三', '四', '五', '六'],
        dayWeek: '',
        swiper: new Array(12),
        dateItem: [],
        month12date: [],
        currencyIndex: 0

      };
      stateinit.oYear = stateinit.oDate.getYear();
      stateinit.isleap = stateinit.oYear % 400 == 0 ? 1 : stateinit.oYear % 100 !== 0 && stateinit.oYear % 4 == 0 ? 1 : 0;
      stateinit.lastday = [31, 28 + stateinit.isleap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      stateinit.y = stateinit.oDate.getFullYear();
      stateinit.m = stateinit.oDate.getMonth();
      stateinit.d = stateinit.oDate.getDate();
      stateinit.w = stateinit.oDate.getDay();
      stateinit.currencyIndex = stateinit.m;
      //一次生成1年所需要的数据生成一个多维数组
      for (var y = 0; y < 12; y++) {
        var firstDate = new Date(stateinit.y, y, 1);
        var dayWeek = firstDate.getDay();
        stateinit.month12date.push([]);
        for (var i = 0; i < 6; i++) {
          stateinit.month12date[y].push([]);
          for (var j = 0; j < 7; j++) {
            var l = i * 7 + j;
            var v = l - dayWeek + 1;
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
      this.setState(stateinit);
      return stateinit;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initcalender();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
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
      var current = this.current;

      var anonymousState__temp = this.__state.d == 7 ? "日" : this.__state.daylist[this.__state.w];
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        current: current,
        _triggerObserer: false
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["getnewyear"], _temp2);
exports.default = Index;

Page(require('../../npm/@tarojs/taro-swan/index.js').default.createComponent(Index, true));