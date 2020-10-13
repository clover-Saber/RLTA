//Worker 响应代码
const utils = require('./utils')

// 在 Worker 线程执行上下文会全局暴露一个 worker 对象，直接调用 worker.onMessage/postMessage 即可
worker.onMessage(function (res) {
  console.log(res.msgs)
})

var count = 0;
var a = setInterval(function () { 
  //循环执行代码 
  console.log(count)
  worker.postMessage({
    msg: 'from woker' + count++
  })
}, 5000) //循环时间 这里是5秒