window.STORY_GAME = {
  id: 'midnight-convenience', title: '今晚别打烊', subtitle: '一家便利店的七日生存记',
  brand: 'MIDNIGHT / STORY 01', accent: '#d6f272', days: 7, turnsPerDay: 2,
  intro: '接手了一家快要倒闭的便利店。\n接下来的七个夜晚，你会遇到奇怪的客人、棘手的订单，和一只不肯走的猫。',
  description: '用 14 个决定，保住这盏深夜的灯。', startLabel: '卷起门帘，开始营业',
  stats: [
    { id: 'cash', name: '资金', icon: '◈', initial: 56, max: 100 },
    { id: 'energy', name: '精力', icon: 'ϟ', initial: 72, max: 100 },
    { id: 'reputation', name: '口碑', icon: '✦', initial: 38, max: 100 }
  ],
  failEndings: [
    { when: { cash: { max: 0 } }, icon: '🧾', title: '暂时休业', subtitle: '余额归零，但故事没结束', description: '你把最后一包关东煮送给了路过的清洁工。卷帘门落下来时，有人在门上贴了一张便签：“老板，下次还来。”这一次，先好好补补账本吧。' },
    { when: { energy: { max: 0 } }, icon: '💤', title: '老板先充电', subtitle: '便利店可以通宵，老板不行', description: '你趴在收银台睡着了。醒来时，常客帮你挂上了“今日休息”的牌子，旁边还放了一杯热豆浆。开店是长跑，下一次给自己留点电。' }
  ],
  endings: [
    { when: { reputation: { min: 72 }, flags: ['cat'] }, icon: '🐈', title: '猫店长正式上岗', subtitle: '全城最有人情味的深夜角落', description: '那只猫趴在收银台，像是它才是房东。有人专程来买一瓶水，也有人只是来摸摸它。你终于明白，便利店卖的还有一种东西：让人愿意停留的理由。' },
    { when: { cash: { min: 78 } }, icon: '💎', title: '深夜商业奇才', subtitle: '小店流水，开始有点东西', description: '隔壁老板打听起你的进货渠道，房东也突然变得格外客气。你在新的账本第一页写下：“第二家分店？先把这家再开好一点。”' },
    { when: { reputation: { min: 70 } }, icon: '🌟', title: '城市深夜避风港', subtitle: '每个晚归的人，都记得这盏灯', description: '夜班护士、外卖骑手、加班到头晕的设计师，都在这家小店找到了固定座位。没有爆款，也没上热搜，但你每天开门时，都有人笑着说“晚上好”。' },
    { when: { cash: { min: 52 }, energy: { min: 40 }, reputation: { min: 48 } }, icon: '🏪', title: '刚刚好的小日子', subtitle: '生意、生活，一个都没落下', description: '第七天打烊前，你给自己热了一份便当。账本是正的，冰柜是满的，明天值得期待。也许这就是你想要的生活：忙一点，但不慌。' },
    { when: {}, icon: '🌙', title: '灯还亮着', subtitle: '开过这七个夜晚，就算小小胜利', description: '你还没把这家店经营成传说，但卷帘门每天都准时升起。门口那盏灯亮着，就还有人会走进来。把今天的收据收好，明天继续。' }
  ],
  events: [
    { id:'rain', day:1, time:'22:15', category:'第一位客人', title:'暴雨中，门铃响了', icon:'☔', color:'#dce6e7', text:'一个浑身湿透的外卖骑手站在门口。\n“老板，能在这里躲十分钟雨吗？我只买一瓶水。”', choices:[
      { text:'搬张椅子，再倒杯热水', effects:{energy:-7,reputation:12}, result:'他把椅子擦得干干净净才走。第二天，你的店出现在骑手群里：“这里的老板，人真好。”', flag:'shelter' },
      { text:'当然可以，顺便推荐雨衣', effects:{cash:9,reputation:3}, result:'雨衣卖出去了。他临走说：“质量不错，下次还来。”你记下了雨天热销品。' },
      { text:'让他坐着，自己抓紧盘货', effects:{energy:5,reputation:4}, result:'你们安静地各忙各的。雨停了，他在门口帮你扶正了歪掉的招牌。' }
    ]},
    { id:'cat', day:1, time:'01:40', category:'不速之客', title:'谁在偷吃鱼丸？', icon:'🐈', color:'#e8ddcc', text:'关东煮旁边多了一团橘色。\n一只猫蹲在门口，对你的鱼丸发起了无声的道德绑架。', choices:[
      { text:'收编！给它做个纸箱窝', effects:{cash:-10,energy:-4,reputation:8}, result:'它检查了纸箱、毛巾和你的态度，最终勉强同意入职。暂定岗位：占据收银台。', flag:'cat' },
      { text:'喂点猫粮，送去附近救助站', effects:{cash:-6,reputation:9}, result:'救助站很快来接它，还在社交账号上感谢了你。猫走之前，狠狠蹭了一下你的裤脚。' },
      { text:'鱼丸不能吃，给它一碗清水', effects:{energy:5,reputation:2}, result:'它喝完水，投给你一个“预算有限是吧”的眼神，转身去考察隔壁早餐店。' }
    ]},
    { id:'delivery', day:2, time:'21:30', category:'进货时间', title:'供货商的神秘纸箱', icon:'📦', color:'#e3ddce', text:'供货商推来一箱新品汽水。\n“现在年轻人都爱这味儿——香菜柠檬。整箱拿，给你优惠。”', choices:[
      { text:'全进！没有话题就没有生意', effects:{cash:-12,reputation:10}, result:'第一位客人喝出了表情包，第二位客人专程来挑战。大家都说难喝，但一人买了一瓶。', flag:'novelty' },
      { text:'先拿几瓶试卖', effects:{cash:5,energy:-3}, result:'你把试喝杯摆在柜台边。销量不惊人，但至少没人拿着整箱香菜味汽水来退货。' },
      { text:'把预算留给招牌饭团', effects:{cash:11,reputation:2}, result:'凌晨的饭团又一次卖空了。奇怪口味会过气，饿肚子的人一直都在。' }
    ]},
    { id:'streamer', day:2, time:'00:20', category:'流量来敲门', title:'“老板，能拍个视频吗？”', icon:'📹', color:'#dfdaec', text:'一位本地探店博主举起手机。\n“主题就叫《凌晨两点还亮着灯的便利店》，你愿意出镜吗？”', choices:[
      { text:'介绍今晚的招牌夜宵', effects:{cash:10,energy:-8,reputation:7}, result:'你紧张得把鱼丸叫成了肉球，弹幕却说“老板真实得可爱”。当晚多了好几笔订单。', flag:'video' },
      { text:'让猫店长出镜，我负责上货', when:{flags:['cat']}, effects:{cash:8,reputation:12,energy:2}, result:'视频标题改成了《这家店的老板为什么这么毛茸茸》。猫全程背对镜头，播放量却很争气。', flag:'video' },
      { text:'拍店就好，给常客留些清静', effects:{energy:7,reputation:5}, result:'镜头慢慢扫过亮着暖光的货架。博主没打扰任何人，片尾留了一句：“城市很大，这里很暖。”' }
    ]},
    { id:'freezer', day:3, time:'22:50', category:'设备警报', title:'冰柜开始唱歌了', icon:'🧊', color:'#d8e4ea', text:'冰柜发出拖拉机般的轰鸣。\n维修师傅说现在能来，但深夜上门，要收加急费。', choices:[
      { text:'付加急费，今晚就修', effects:{cash:-15,energy:7,reputation:4}, result:'轰鸣停止了。你终于听见店里的音乐，也保住了明天的冰淇淋。', flag:'fixed' },
      { text:'冰品半价，把库存先卖掉', effects:{cash:12,energy:-12,reputation:5}, result:'凌晨的冰淇淋派对意外热闹。你忙得脚不沾地，但至少冰柜没在你面前融化。' },
      { text:'借隔壁冷柜，明早再修', effects:{cash:-5,energy:-3,reputation:3}, result:'早餐店老板让出了半层冷柜，条件是明天帮他带两箱牛奶。街坊生意，也靠互相搭把手。' }
    ]},
    { id:'noodles', day:3, time:'02:10', category:'深夜菜单', title:'一碗泡面的隐藏价值', icon:'🍜', color:'#eadfcd', text:'一个刚下夜班的姑娘捧着泡面发呆。\n“能不能……加个蛋？我今天过生日。”', choices:[
      { text:'送她一个蛋，再插根小蜡烛', effects:{cash:-4,energy:-5,reputation:13}, result:'她愣了一下，笑出了眼泪。便利店没有蛋糕，但泡面上的烛光一样认真。', flag:'birthday' },
      { text:'加蛋免费，祝你生日快乐', effects:{cash:-2,reputation:8,energy:2}, result:'“这是我今天收到的第一个祝福。”她把那碗面拍了照，吃得比平时慢了很多。' },
      { text:'推荐一份实惠的生日套餐', effects:{cash:9,reputation:3}, result:'你认真算了一份最划算的搭配。她拿着热便当说：“谢谢，今晚终于不用凑合了。”' }
    ]},
    { id:'parcel', day:4, time:'21:45', category:'副业机会', title:'收银台要变快递站？', icon:'🚚', color:'#dce2d1', text:'快递员想在店里放一个临时取件点。\n每晚能多挣一点，但你看了看本来就不大的收银台……', choices:[
      { text:'接下取件点，顺便带动消费', effects:{cash:16,energy:-14,reputation:2}, result:'“取件码多少”成了你的新口头禅。账上的数字很漂亮，嗓子却已经开始抗议。', flag:'parcel' },
      { text:'只收小件，和他约好上限', effects:{cash:8,energy:-5,reputation:4}, result:'你用胶带在地上划出一块区域。小小的规则，让两个人都省了不少麻烦。' },
      { text:'先顾好小店，暂时婉拒', effects:{energy:12,reputation:1}, result:'你整理了被忽视的货架，还终于吃上了一顿热饭。今晚少赚了一点，也少乱了一点。' }
    ]},
    { id:'lost', day:4, time:'01:15', category:'失物招领', title:'一只没有署名的钱包', icon:'👛', color:'#e7d8de', text:'靠窗的座位上，有人落下了钱包。\n里面有证件和现金。监控显示，失主刚离开不久。', choices:[
      { text:'追出去找人，暂停营业十分钟', effects:{cash:-5,energy:-9,reputation:15}, result:'你追过两个路口，终于赶在末班车开走前喊住了他。回店时，门口的常客正在帮你看店。', flag:'wallet' },
      { text:'联系失主，把钱包妥善收好', effects:{energy:-3,reputation:9}, result:'失主半小时后赶回来，确认一分没少。你们交换了一个终于松口气的笑容。' },
      { text:'交给巡逻民警，让他们处理', effects:{energy:5,reputation:5}, result:'民警记下了情况，很快联系上失主。你把座位擦干净，继续接待下一位客人。' }
    ]},
    { id:'trend', day:5, time:'22:00', category:'经营抉择', title:'要不要跟上这波热度？', icon:'🔥', color:'#e8d9ca', text:'附近突然流行“便利店盲盒夜宵”。\n有人说会爆单，也有人担心内容不透明。你决定怎么做？', choices:[
      { text:'做明码标价的随机组合', effects:{cash:13,energy:-8,reputation:6}, result:'你把食材、分量和价格写得清清楚楚。大家抽的是今晚的口味，没人在结账时犯嘀咕。' },
      { text:'推出自选夜宵，拒绝选择困难', effects:{cash:8,reputation:9,energy:-5}, result:'客人们反倒觉得更有趣。有人把饭团和酸奶配成套餐，还给它取名“今晚早睡”。' },
      { text:'不追热点，维护老顾客菜单', effects:{cash:4,energy:10,reputation:3}, result:'“还是老样子？”你记得常客的口味。这句简单的招呼，也是一种只有小店才有的招牌。' }
    ]},
    { id:'complaint', day:5, time:'00:55', category:'口碑时刻', title:'一条两星评价', icon:'💬', color:'#dcddea', text:'“等关东煮等了太久，店员也不理我。”\n你记得那晚忙得不可开交。但对方的坏心情，也是真实的。', choices:[
      { text:'认真道歉，改进排队提示', effects:{cash:-4,energy:-5,reputation:13}, result:'你在锅边放上了等待时间牌。对方把评价改成四星：“老板真的有在看，祝生意越来越好。”' },
      { text:'说明当时情况，邀请再来体验', effects:{energy:-3,reputation:7}, result:'没有争吵，也没有复制粘贴的回复。评论下面，多了几个常客帮你说话。' },
      { text:'先优化出餐流程，再慢慢回应', effects:{cash:7,energy:5,reputation:1}, result:'你重新摆了操作台，把高频商品移到了手边。接下来的一小时，大家明显等得更少了。' }
    ]},
    { id:'rest', day:6, time:'21:20', category:'老板的电量', title:'今天的你，电量多少？', icon:'🔋', color:'#e1e7cf', text:'你对着冰柜玻璃打了个大哈欠。\n朋友发来消息：“我今晚有空，需不需要我帮你看两个小时？”', choices:[
      { text:'请朋友帮忙，自己睡一会儿', effects:{cash:-9,energy:23,reputation:3}, result:'你在仓库睡了人生质量很高的两小时。醒来时，朋友学会了热饭团，还给货架排了个队。' },
      { text:'一起干，忙完请一顿宵夜', effects:{cash:-5,energy:12,reputation:6}, result:'你们边理货边讲学生时代的蠢事。原来同样一堆工作，有人一起做就没那么累了。' },
      { text:'今晚提前两小时打烊', effects:{cash:-6,energy:19}, result:'你第一次在午夜前走出了小店。路灯很亮，晚风很凉。偶尔早点回家，不会让世界停转。' }
    ]},
    { id:'bulk', day:6, time:'00:10', category:'大单上门', title:'二十份，来得及吗？', icon:'🍱', color:'#e8dbc8', text:'附近剧组打来电话，要二十份热便当。\n价格不错，但配送时间很紧。你看着正在预热的微波炉……', choices:[
      { text:'接单！今晚火力全开', effects:{cash:23,energy:-20,reputation:5}, result:'微波炉工作得像流水线。你赶在最后一分钟送出便当，换来一句很真诚的“救命了”。' },
      { text:'接十份，剩下推荐给隔壁', effects:{cash:12,energy:-7,reputation:8}, result:'你和隔壁小店平分了订单。两家店一起完成任务，谁也没被这一单压垮。' },
      { text:'改成无需加热的饭团组合', effects:{cash:14,energy:-4,reputation:3}, result:'剧组接受了新方案。你附上了热茶，送达比预定时间还早了十分钟。' }
    ]},
    { id:'anniversary', day:7, time:'22:35', category:'第七夜', title:'庆祝一下，还是再等等？', icon:'🎈', color:'#e1d8ea', text:'小店熬过了六个夜晚。\n你翻出一串旧彩灯，突然想给这段新生活留个小小的纪念。', choices:[
      { text:'办一场小小的夜宵分享会', effects:{cash:-12,energy:-8,reputation:17}, result:'几位常客各带来一点东西，有人弹吉他，有人提供笑话。便利店第一次像一间客厅。', flag:'party' },
      { text:'挂上彩灯，送每人一句晚安', effects:{cash:-3,energy:-3,reputation:10}, result:'一串不起眼的灯，把门口照得很温柔。有人拍照，有人在你的便签墙上写了“明天见”。' },
      { text:'把钱留在账上，自己喝杯汽水', effects:{cash:8,energy:10,reputation:2}, result:'你坐在仓库的小凳子上，拉开汽水拉环。砰的一声，也算一个人的小小礼炮。' }
    ]},
    { id:'last', day:7, time:'02:50', category:'最后一位客人', title:'“明天，你还开门吗？”', icon:'🌙', color:'#d5deea', text:'打烊前，一个熟悉的客人走进来。\n他买了两瓶水，把其中一瓶递给你，问出了这个问题。', choices:[
      { text:'当然，这盏灯会继续亮着', effects:{energy:-5,reputation:10}, result:'他笑了，推开门走进夜色。你把“明日正常营业”贴在门上，字写得比第一天更稳了。' },
      { text:'会的，不过要换个更舒服的节奏', effects:{energy:12,reputation:5}, result:'你重新排了营业时间。照顾好自己，才能更长久地照顾这间小店。' },
      { text:'会，而且明天要上新菜单', effects:{cash:10,energy:-5,reputation:4}, result:'你在便签上画起了新套餐。抬头时，天边已经亮起一点点蓝色。原来明天真的快来了。' }
    ]}
  ]
};
