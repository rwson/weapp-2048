
var arr = ["0", "0", "2", "0", "2", "0", "0", "6", "0", "4", "0", "8", "0", "0", "2", "0", "2", "0", "0", "2", "0", "0", "0", "4"];

/**
 * get formatTime
 */
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(" ");
}

/**
 * formatNumber
 */
function formatNumber(num) {
  return num > 9 ? num : "0" + num;
}

/**
 * 获得滑动方向
 */
function getDirection(startX, startY, endX, endY) {
  var xRes = startX - endX,
    xResAbs = Math.abs(startX - endX),
    yRes = startY - endY,
    yResAbs = Math.abs(startY - endY),
    direction = "";

  if (xResAbs >= yResAbs && xResAbs > 25) {
    direction = (xRes > 0) ? "Left" : "Right";
  } else if (yResAbs > xResAbs && yResAbs > 25) {
    direction = (yRes > 0) ? "Up" : "Down";
  }
  return direction;
}

/**
 * 获取指定范围内的随机数
 */
function random(min, max) {
  var range = 0;
  if (arguments.length === 1) {
    max = min;
    min = 0;
  }
  range = Math.abs(max - min);
  return Math.floor(Math.random() * (range)) + min;
}

/**
 * 根据坐标改变数据
 */
function change(data, i, j, value) {
  value = isNaN(parseInt(value)) ? "0" : value;
  data[i][j] = value;
  return data;
}

/**
 * 判断某个元素是否有值
 */
function isBlock(data, i, j) {
  return data[i][j] !== "0";
}

/**
 * 根据滑动方向处理数据
 */
function processData(data, direction) {

  var ignoreIndex = 3,  //  忽略的地址
    loopI,            //  外层数组   
    loopJ,            //  当前循环项 
    prevItem,         //  当前项的之前项
    i = 0,            //  外层计数器 
    j = 0,            //  内层计数器
    k = 0,            //  滚动循环计数器
    tmp;

  if (data instanceof Array) {

    //  判断滑动方向
    switch (direction) {

      case "Up":


        ignoreIndex = 0;

        for (i = 0; i < 4; i++) {
          for (j = 0; j < 4; j++) {
            if (i === ignoreIndex) {

            } else {
              loopJ = data[i][j];
              if (loopJ === "0") {
                continue;
              }

              // 上一行相同位置
              prevItem = data[i - 1][j];

              if (prevItem === "0") {
                for (k = i - 1; k >= 0; k--) {
                  if (data[k][j] === "0") {
                    data = change(data, k, j, loopJ);
                    data = change(data, k + 1, j, "0");
                  } else if (data[k][j] === "0") {
                    data = change(data, k, j, loopJ * 2);
                    data = change(data, k + 1, j, "0");
                  }
                }
              } else if (loopJ === prevItem) {
                loopI = loopJ * 2;
                data = change(data, i, j, "0");
                data = change(data, i - 1, j, loopI);
              }
            }
          }
        }

        break;

      case "Down":


        ignoreIndex = 3;

        for (i = 0; i < 4; i++) {
          for (j = 3; j >= 0; j --) {
            if (i === ignoreIndex) {

            } else {
              loopJ = data[i][j];

              if (loopI === "0") {
                continue;
              }

              prevItem = data[i + 1][j];

              if (prevItem === "0") {
                for (k = i + 1; k < 4; k++) {
                  if (data[k][j] === "0") {
                    data = change(data, k, j, loopJ);
                    data = change(data, k - 1, j, "0");
                  } else if (data[k][j] === loopJ) {
                    data = change(data, k, j, loopJ * 2);
                    data = change(data, k - 1, j, "0");
                  }
                }
              } else if (loopJ === prevItem) {
                loopI = loopJ * 2;
                data = change(data, i, j, "0");
                data = change(data, i - 1, j, loopI);
              }
            }
          }
        }

        break;

      case "Left":

        ignoreIndex = 0;

        for (i = 0; i < 4; i++) {
          for (j = 0; j < 4; j++) {

            if (j === 0) {
              continue;
            } else {
              loopJ = data[i][j];

              if (loopJ === "0") {
                continue;
              }

              prevItem = data[i][j - 1];

              if (prevItem === "0") {
                for (k = j - 1; k >= 0; k--) {
                  tmp = data[i][k];

                  if (tmp === "0") {
                    data = change(data, i, k, loopJ);
                    data = change(data, i, k + 1, "0");
                  } else if (tmp === loopJ) {
                    data = change(data, i, k, loopJ * 2);
                    data = change(data, i, k + 1, "0");
                  }
                }
              } else if (loopJ === prevItem) {
                data = change(data, i, k, loopJ * 2);
                data = change(data, i, k + 1, "0");
              }

            }

          }
        }

        break;

      case "Right":

      console.log(data);

        ignoreIndex = 3;

        for(i = 0; i < 4; i ++) {
          for(j = 3; j >= 0; j --) {

            if(j === ignoreIndex) {
              
            } else {
              loopJ = data[i][j];
              
              if(loopJ === "0") {

                for(k = i + 1; k < 4; k ++) {
                  tmp = data[i][k];

                  if(tmp === "0") {
                    data = change(data, i , k, loopJ);
                    data = change(data, i , k - 1, "0");
                  } else if(tmp === loopJ) {
                    data = change(data, i ,k , loopJ * 2);
                    data = change(data, i ,k , "0");
                  }

                }

              } else if (loopJ === prevItem) {
                data = change(data, i , j, "0");
                data = change(data, i , j + 1, loopJ * 2);
              }

            }

          }
        }

        break;

      default: break;

    }
  }

  return data;
}

module.exports = {
  formatTime: formatTime,
  getDirection: getDirection,
  random: random,
  processData: processData,
  array: arr
}

