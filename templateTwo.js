export default {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '嘉明湖國家步道',
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Place',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2
              },
              {
                type: 'text',
                text: '0.5K',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 2
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'county',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: '臺東縣',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          },
          {
            type: 'separator',
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'TWD97_X',
                size: 'sm',
                color: '#aaaaaa'
              },
              {
                type: 'text',
                text: '248291.0826',
                flex: 1,
                size: 'sm',
                color: '#666666'
              }
            ],
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'TWD97_Y',
                size: 'sm',
                color: '#aaaaaa'
              },
              {
                type: 'text',
                text: '2571715.744',
                size: 'sm',
                flex: 1,
                color: '#666666'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'WGS84_東經',
                color: '#aaaaaa',
                size: 'sm'
              },
              {
                type: 'text',
                text: '120.983299',
                flex: 1,
                color: '#666666',
                size: 'sm'
              }
            ],
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'WGS84_北緯',
                color: '#aaaaaa',
                size: 'sm'
              },
              {
                type: 'text',
                text: '23.247732',
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          },
          {
            type: 'separator',
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: '電信',
                color: '#aaaaaa',
                size: 'sm'
              }
            ],
            margin: 'md'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'CHT',
                size: 'sm',
                color: '#aaaaaa'
              },
              {
                type: 'text',
                text: '中華電信',
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'FET',
                size: 'sm',
                color: '#aaaaaa'
              },
              {
                type: 'text',
                text: '遠傳電信',
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'TWM',
                size: 'sm',
                color: '#aaaaaa'
              },
              {
                type: 'text',
                text: '台灣大哥大',
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'T-STAR',
                color: '#aaaaaa',
                size: 'sm'
              },
              {
                type: 'text',
                text: '台灣之星',
                flex: 1,
                size: 'sm',
                color: '#666666'
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'APT',
                color: '#aaaaaa',
                size: 'sm'
              },
              {
                type: 'text',
                text: '亞太電信',
                color: '#666666',
                size: 'sm',
                flex: 1
              }
            ]
          }
        ],
        flex: 1
      }
    ]
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '山難緊急救援專線  119、112',
        margin: 'sm',
        size: 'sm',
        color: '#aaaaaa',
        wrap: true,
        align: 'center'
      }
    ]
  }
}
