// 复制本目录后，修改这份内容配置。运行时不依赖框架，也不需要构建。
window.STORY_GAME = {
  id: 'your-story', title: '你的小店', subtitle: '把这个故事换成你的主题',
  brand: 'YOUR STORY / 01', accent: '#d6f272', days: 1, turnsPerDay: 2,
  intro: '这是一个可直接替换内容的事件模拟模板。\n修改属性、事件、选项和结局，就能开始新的故事。',
  description: '2 个事件展示规则，正式内容可以自由扩充。', startLabel: '开始我的故事',
  stats: [
    { id: 'cash', name: '资源', icon: '◈', initial: 50, max: 100 },
    { id: 'energy', name: '精力', icon: 'ϟ', initial: 70, max: 100 },
    { id: 'reputation', name: '人气', icon: '✦', initial: 30, max: 100 }
  ],
  failEndings: [
    { when: { energy: { max: 0 } }, icon: '💤', title: '休息一下', subtitle: '精力归零时触发的提前结局', description: '你决定先充好电，再开始下一段旅程。' }
  ],
  endings: [
    { when: { reputation: { min: 45 }, flags: ['helped'] }, icon: '🌟', title: '人气新星', subtitle: '属性和标记共同决定结局', description: '你帮助了别人，也收获了一个温暖的开始。' },
    { when: {}, icon: '🌙', title: '故事继续', subtitle: '最后一项是默认结局', description: '每个决定都会留下回声。接下来，写下属于你的新故事。' }
  ],
  events: [
    { id:'first', day:1, time:'21:00', category:'开始', title:'有人向你求助', icon:'☔', color:'#dce6e7', text:'一位路人想借一把伞。\n你要怎么做？', choices:[
      { text:'把伞借给他', effects:{cash:-5,reputation:12,energy:-3}, flag:'helped', result:'路人认真道了谢。这个标记会影响后续选项和结局。' },
      { text:'告诉他附近的避雨处', effects:{reputation:4,energy:3}, result:'他找到了一处干燥的屋檐。' }
    ]},
    { id:'second', day:1, time:'23:00', category:'回响', title:'为今天画个句号', icon:'🌙', color:'#d5deea', text:'夜深了，你打算怎么度过最后一小时？', choices:[
      { text:'和还伞的路人聊聊天', when:{flags:['helped']}, effects:{reputation:8,energy:4}, result:'原来他也住在附近。你认识了一个新朋友。' },
      { text:'整理账本', effects:{cash:12,energy:-5}, result:'把数字理顺，也让明天更从容。' },
      { text:'早点休息', effects:{energy:15,reputation:2}, result:'你为自己泡了杯茶。今天辛苦了。' }
    ]}
  ]
};
