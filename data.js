import axios from 'axios'
// import cheerio from 'cheerio'
// cheerio => jquery 抓取官網連結時會使用
import template from './template.js'
import templateTwo from './templateTwo.js'
import fs from 'fs'

// 文字部分 => 從JSON檔抓
// 圖片部分 => 從官網連結抓
// 連續從不同地方抓取資料 => 使用 await

// 國家森林遊樂區
const courses = []
// 登山步道&訊號點
const coursesHiking = []

// 1.先抓取資料，把資料放入陣列裡面
// data 網頁上資料
// await => 等待 promise / axios(套件).get => 抓取 連結內容
// 用 Ch.19 async await 搭配 try catch 使用
const fetchData = async () => {
  try {
    // 抓取文字 => JSON
    const { data } = await axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/RA')
    const dataTwo = await axios.get('https://raw.githubusercontent.com/yunsiou6628/json-data/main/%E6%9E%97%E5%8B%99%E5%B1%80%E5%B1%B1%E5%8D%80%E6%89%8B%E6%A9%9F%E5%8F%AF%E9%80%9A%E8%A8%8A%E9%BB%9E%E6%A8%99%E7%A4%BA%E8%B3%87%E8%A8%8A%EF%BC%88%E6%9B%B4%E6%96%B0%E8%87%B3110%E5%B9%B41%E6%9C%88%EF%BC%89.json')
    const hiking = dataTwo.data
    // hiking 解構的結果
    // console.log(data)
    // console.log(dataTwo.data)
    // console.log('測試測試測試測試測試測試測試' + hiking)

    // for 迴圈跑 data (陣列-有相似性) 內容
    // courses.push => 在 courses 陣列最後面新增內容，內容為 data[i]
    // 在陣列後新增值 data[連結內的第幾個]
    // i < data.length => 正列從 0 開始跑，所以要小於 data.length 不需要加 =，不然會多跑一次&會找不到資料報錯
    for (let i = 0; i < data.length; i++) {
      courses.push(
        data[i]
      )
      // console.log(data[i])
      // console.log('之前的URL網址' + courses[i].URL)
      // 抓圖片 => 用 FB_URL 連結，更改成圖片檔案名稱的連結 .slice(50, 57) 擷取 URL 的 id 編號(跟圖片的編號相同)
      courses[i].FB_URL = 'https://recreation.forest.gov.tw/Files/Forest/index/' + courses[i].URL.slice(50, 57) + '.jpg'
      // console.log('之後的圖片檔案名稱' + courses[i].URL)
      // 使用 console.log() 測試資料才會顯示在終端機
      // console.log(courses[i].RA_name)
    }
    // console.log('hi' + hiking)

    for (let a = 0; a < hiking.length; a++) {
      coursesHiking.push(
        hiking[a]
      )
      // console.log('hi' + coursesHiking[a].Place)
    }
  } catch (error) {
    // console.log(error)
  }
}

// 3.傳入 event 事件
// bubble 是新的陣列，courses 是舊的陣列
// bubble 裡面的值是 .map() 複製更新 courses 的值之後的結果
// .map() => 可以運算陣列的每個值後產生新的陣列(ch8) => 想像成迴圈
// courses => 陣列名稱
// course => 陣列裡面的值，從第 0 個跑到最後一個 => 想像成類似 data[i]
// course.RA_name => 將網站連結中的 RA_name 放入陣列
// const bubble = JSON.parse(JSON.stringify(template)) => 深層複製，先抓取 template 資料 (來源:FLEX MESSAGE SIMULATOR) ，傳存成文字後，再轉存成 JSON 檔，就會是全新的內容，不會改動到原本的資料(template)
const replyCourses = (event) => {
  let bubbles = courses.map(course => {

    const bubble = JSON.parse(JSON.stringify(template))

    const str1 = (Object.values(course)[12]).toString()
    // console.log(course)
    // console.log(event.message.text.replace(/ /g, '').slice(0, -7)) // 輸入: 武嶺 國家森林公園 => 顯示: 武嶺
    if (str1.includes(event.message.text.replace(/ /g, '').slice(0, -7))) {
      console.log(str1)

      // 圖片 URL
      bubble.hero.url = course.FB_URL
      // 文字資料
      bubble.body.contents[0].text = course.RA_name
      // bubble.body.contents[0].text = 'RA_name'
      // console.log(course.RA_name)
      bubble.body.contents[1].contents[0].text = course.ADDRESS
      // bubble.body.contents[1].contents[0].text = 'ADDRESS'
      // console.log(course.ADDRESS)
      bubble.body.contents[1].contents[2].text = course.OPEN_TIME
      // bubble.body.contents[1].contents[2].text = 'OPEN_TIME'
      bubble.body.contents[2].contents[0].action.uri = course.URL
      // console.log(course.OPEN_TIME)
      return bubble
    }
  })
  bubbles = bubbles.filter(item1 => {
    return (item1 != null)
  })

  // 宣告一個新的卡片 重新串接 另一個 templateTwo
  // const bubblesTwo = coursesHiking.map(coursehiking => {
  //   const bubbleTwo = JSON.parse(JSON.stringify(templateTwo))
  //   // 文字資料
  //   bubbleTwo.body.contents[0].text = coursehiking.name
  //   console.log(coursehiking.name)
  //   bubbleTwo.body.contents[0].contents[1].contents[2].text = coursehiking.Place
  //   return bubbleTwo
  // })

  // console.log('hello' + JSON.stringify(bubbles, null, 2))
  // 功能 => 把新的東西建立一個檔案
  // stringify => 將 bubbles.json 內容轉成 JSON 檔案
  // event.reply => 接收訊息傳入事件，把上面處理好的資料傳給機器人，並在line上顯示
  // contents: bubbles.slice(0, 6) => 第0個到第5個卡片資料(最多6個卡片顯示)
  // slice() 會回傳一個新陣列物件，原陣列選擇 begin 至 end (不含 end)的淺層複製，原本陣列不會被修改
  fs.writeFileSync('bubbles.json', JSON.stringify(bubbles, null, 2))
  event.reply([
    {
      type: 'flex',
      altText: '國家森林遊樂區',
      contents: {
        type: 'carousel',
        contents: bubbles.slice(0, 6)
      }
    }
  ])
}

// undefined => 終端機
// 串接有空的值
// 要如何輸入文字內容，查到那個路線的資料(如果超過6張?)
const replyCoursesTwo = (event) => {
  // 宣告一個新的卡片 重新串接 另一個 templateTwo
  let bubblesTwo = coursesHiking.map(coursehiking => {
    const bubbleTwo = JSON.parse(JSON.stringify(templateTwo))

    // Object.values(coursehiking)[1] => 判斷 coursehiking 物件 = includes(event.message.text) 使用者輸入
    // Object.values => 每個物件中的值  [1] => "name": "林美石磐步道" => console.log(str)
    const str2 = (Object.values(coursehiking)[1]).toString()
    // console.log('str:' + typeof (str))
    console.log(str2)
    // console.log(str.includes(event.message.text))
    // console.log('(event:' + typeof (event.message.text))

    // 判斷使用者輸入 和 步道名稱(空格問題)，有空格 bubblesTwo 都是 null => 消除空格
    // if (event.message.text.match(/[\u4e00-\u9fa5]+\s+步道/g))
    // console.log(event.message.text.replace(/ /g, ''))
    // .replace(/ /g, '') 測試 - LINE輸入: 關鍵字 步道 (山步道) / 終端機文字顯示: 關鍵字步道 (刪除空格) / LINE顯示資料: ****山步道 (山步道連著)
    // .slice(0, -2) 測試 - LINE輸入: 關鍵字 步道(阿里山 步道) / 終端機文字顯示: 關鍵字步道 (刪除空格) / LINE顯示資料: 阿里山國家森林遊樂區巨木群步道 (山跟步道分開)
    // .includes(文字) 是否有包含指定文字，回傳 true 或 false
    if (str2.includes(event.message.text.replace(/ /g, '').slice(0, -2))) {
      console.log(str2)

      // 文字資料
      bubbleTwo.body.contents[0].text = coursehiking.name
      // console.log('123' + coursehiking.name)
      if (coursehiking.Place == null) {
        bubbleTwo.body.contents[1].contents[0].contents[1].text = '沒有資料'
      } else {
        bubbleTwo.body.contents[1].contents[0].contents[1].text = coursehiking.Place
      }

      bubbleTwo.body.contents[1].contents[1].contents[1].text = coursehiking.county
      // coursehiking.twd97_X => 數字型別 ， 強制轉換成 JSON.stringify(coursehiking.twd97_X) => 文字型別
      // 型別會影響整張卡片無法顯示
      // console.log(typeof (JSON.stringify(coursehiking.twd97_X)))
      bubbleTwo.body.contents[1].contents[3].contents[1].text = JSON.stringify(coursehiking.twd97_X)
      bubbleTwo.body.contents[1].contents[4].contents[1].text = JSON.stringify(coursehiking.twd97_Y)
      bubbleTwo.body.contents[1].contents[6].contents[1].text = JSON.stringify(coursehiking.WGS84_East_longitude)
      // console.log('123' + coursehiking.GS84_East_longitude)
      bubbleTwo.body.contents[1].contents[7].contents[1].text = JSON.stringify(coursehiking.WGS84_north_latitude)

      // 判斷內容如果是空的值 輸入'沒有通訊支援' ， 有內容就依照原本的顯示
      if (coursehiking.CHT == null) {
        bubbleTwo.body.contents[1].contents[10].contents[1].text = '沒有通訊支援'
      } else {
        bubbleTwo.body.contents[1].contents[10].contents[1].text = coursehiking.CHT
      }
      if (coursehiking.FET == null) {
        bubbleTwo.body.contents[1].contents[11].contents[1].text = '沒有通訊支援'
      } else {
        bubbleTwo.body.contents[1].contents[11].contents[1].text = coursehiking.FET
      }
      if (coursehiking.TWM == null) {
        bubbleTwo.body.contents[1].contents[12].contents[1].text = '沒有通訊支援'
      } else {
        bubbleTwo.body.contents[1].contents[12].contents[1].text = coursehiking.TWM
      }
      if (coursehiking.TSTAR == null) {
        bubbleTwo.body.contents[1].contents[13].contents[1].text = '沒有通訊支援'
      } else {
        bubbleTwo.body.contents[1].contents[13].contents[1].text = coursehiking.TSTAR
      }
      if (coursehiking.APT == null) {
        bubbleTwo.body.contents[1].contents[14].contents[1].text = '沒有通訊支援'
      } else {
        bubbleTwo.body.contents[1].contents[14].contents[1].text = coursehiking.APT
      }
      return bubbleTwo
    }
  })
  bubblesTwo = bubblesTwo.filter(item2 => {
    return (item2 != null)
  })

  // 創一個新陣列 篩選過 bubblesTwo 裡面不是 null 的值
  // 不是 null 才會進入 if 判斷式，並且在 新陣列newarry 新增push 值(item)
  // const newarry = []
  // for (let item of bubblesTwo) {
  //   if (item != null) {
  //     newarry.push(item)
  //     // console.log('我是null')
  //   }
  // }

  fs.writeFileSync('bubblesTwo.json', JSON.stringify(bubblesTwo, null, 2))
  event.reply([
    {
      type: 'flex',
      altText: '登山步道訊號點',
      contents: {
        type: 'carousel',
        contents: bubblesTwo.slice(0, 6)
      }
    }
  ])
}

// 4.傳送出去的內容有什麼
// fetchData / replyCourses => function
// courses => 陣列
export default {
  fetchData,
  courses,
  coursesHiking,
  replyCourses,
  replyCoursesTwo
}
