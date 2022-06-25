export default {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://recreation.forest.gov.tw/Files/Forest/index/0100001.jpg',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'http://linecorp.com/'
    }
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'text',
        text: '太平山國家森林遊樂區',
        wrap: true,
        weight: 'bold',
        gravity: 'center',
        size: 'xl'
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '267臺灣宜蘭縣大同鄉太平巷58之1號',
            flex: 4,
            size: 'sm',
            color: '#666666',
            margin: 'none'
          },
          {
            type: 'text',
            text: 'Open time',
            flex: 2,
            size: 'sm',
            color: '#aaaaaa',
            align: 'start',
            margin: 'xxl'
          },
          {
            type: 'text',
            text: '因應新冠肺炎防疫措施，調整開園時間平日為6:00-18:00、假日為04:00-18:00(建議16:00前購票入園)',
            flex: 4,
            size: 'sm',
            color: '#666666',
            wrap: true
          }
        ]
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'xxl',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '➤ 點我進官網 ➤',
              uri: 'http://linecorp.com/'
            }
          }
        ]
      }
    ]
  }
}
