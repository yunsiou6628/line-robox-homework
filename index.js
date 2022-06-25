import 'dotenv/config'
import linebot from 'linebot'
import data from './data.js'
import schedule from 'node-schedule'

data.fetchData()

// 更新
schedule.scheduleJob('0 0 * * *', () => {
  data.fetchData()
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 2.訊息傳進來會執行的事情(抓取到的資料)
// event => 偵測訊息傳入(物件)
// reply => 機器人會回復的內容
// data.courses.length === 0 => 沒有抓取到資料傳入到陣列裡面沒東西時，陣列長度就會等於0
// event.message.type === 'text' => 使用者輸入的內容為文字時
// data.replyCourses(event) => 接收 訊息傳入事件，並傳入  replyCourses 的 function 裡面
bot.on('message', (event) => {
  // data.courses.forEach((allvalue, index, arr) => {
  //   for (let i = 0; i < Object.keys(allvalue).length; i++) {
  //     if (Object.values(allvalue)[i] === null) {
  //       Object.values(allvalue)[i] = '無資料' // 這裡不會改值，console.log 會顯示 null
  //     } else {
  //       const str = (Object.values(allvalue)[i]).toString()
  //       if (str.includes(event.message.text)) {
  //         // console.log(str.includes(event.message.text))
  //         // 抓取到資料後，加入如何顯示資料內容
  //       }
  //     }
  //   }
  // })

  if (data.courses.length === 0) {
    event.reply('資料讀取中，請稍後在試')
  } else if (event.message.type === 'text') {
    // data.replyCoursesTwo(event)
    // 輸入任何內容 只要有關鍵字就跑出有關鍵字的登山步道訊號點資料

    if (event.message.text.match(/[\u4e00-\u9fa5]+\s+國家森林遊樂區/g)) {
      // console.log("321")
      data.replyCourses(event)
    } else if (event.message.text.match(/[\u4e00-\u9fa5]+\s+步道/g)) {
      // console.log("456")
      data.replyCoursesTwo(event)
    }
    // 增加 新資料輸入關鍵字()
  }
})

// 判斷 使用者輸入 是第幾筆資料
// 有什麼辦法輸入 XX登山步道 ， 可以讓 JSON 檔裡面的 "name": "XX登山步道" 跑出資料
// https://manager.line.biz/account/@301lcriw/autoresponse/welcome => 增加 如何使用機器人 輸入什麼關鍵字
// https://manager.line.biz/account/@301lcriw/richmenu/create => 圖文選單

// 監聽事件
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('國家森林機器人偵測...逼..逼..逼..')
  console.log('登山步道訊號機器人偵測...1G..2G..3G..4G..5G..')
})
