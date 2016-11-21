
var arr = ["0", "0", "2", "0", "2", "0", "0", "6", "0", "4", "0", "8","0", "0", "2", "0", "2", "0", "0", "2", "0", "0", "0", "4"];

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
  if(arguments.length === 1) {
    max = min;
    min = 0;
  }
  range = Math.abs(max - min);
  return Math.floor(Math.random() * (range)) + min;
}

/**
 * 根据滑动方向处理数据
 */
function processData(data, direction) {

  //  忽略的地址
  var ignoreIndex = 3,
      loopI, loopJ, prevItem,
      i = 0, j = 0;

  if(data instanceof Array) {
    switch (direction) {
      case "Up":
        ignoreIndex = 0;
        
        for(; i < 3; i ++) {
            loopI = data[i];
            for(; j < 3; j ++) {

                if(j !== ignoreIndex) {

                    loopJ = loopI[j];
                    prevItem = loopI[j - 1];

                    if(prevItem !== "" && loopJ === prevItem) {
                      loopI[j - 1] = "" + (parseInt(loopJ) + parseInt(loopI[j - 1]));
                      loopI[j] = arr[random(23)];

                      console.log(loopI);

                    }
                }
            }
        }

        console.log(data);
        break;

      case "Down":
        ignoreIndex = 3;
        break;

      case "Left":
        ignoreIndex = 0;
        break;

      case "Right":
        ignoreIndex = 3;
        break;

      default:break;

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

