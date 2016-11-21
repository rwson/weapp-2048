//index.js
//获取应用实例

var Util = require("../../utils/util.js");
var app = getApp();

var direction = "",
    posStart, isMoved, isEnd, posEnd;

Page({

  data: {
    chessBoard: [
        [ "0", "0", "0", "0" ], 
        [ "0", "0", "0", "0" ], 
        [ "0", "0", "0", "0" ], 
        [ "0", "0", "0", "0" ] 
      ],

    userInfo: {}
  },

  /**
   * 触碰开始
   */
  touchStart: function(ev) {
    posStart = {
      x: ev.changedTouches[0].pageX,
      y: ev.changedTouches[0].pageY
    };
    isEnd = false;
  },

  /**
   * 手指未抬起
   */
  touchMove: function(ev) {
    //  多个手指滑动
    isMoved = ev.changedTouches.length > 1;
  },

  /**
   * 触碰结束
   */
  touchEnd: function(ev) {
    if(isMoved || isEnd) {
      return;
    }

    posEnd = {
      x: ev.changedTouches[0].pageX,
      y: ev.changedTouches[0].pageY
    };
    direction = Util.getDirection(posStart.x, posStart.y, posEnd.x, posEnd.y);

    this.setData({
      chessBoard: Util.processData(this.data.chessBoard, direction)
    });

    isEnd = true;
  },

  onLoad: function() {
    var that = this,
      chessBoard = that.data.chessBoard;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){

    chessBoard = chessBoard.map((item) => {
        item = item.map((itemIn) => {
            itemIn = "" + Util.array[Util.random(23)];
            return itemIn;
        });
        return item;
    });

      //更新数据
      that.setData({
        userInfo:userInfo,
        chessBoard: chessBoard
      });
    });

  }
});
