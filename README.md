# StoryKit — 事件选择模拟模板

一个零依赖、无需构建、可直接打开 HTML 的竖屏小游戏模板。附完整示例 **《今晚别打烊》**：接手一家午夜便利店，用 14 次选择度过 7 个夜晚，管理资金、精力和口碑，遇见常客和一只橘猫。

## 在线试玩

示例游戏已公开发布：

- [BilibiliToy](https://www.bilibili.com/toy/midnight-mart/index.html)
- [VibeHub](https://gamesvibe.app/play/uvsCVlW3xG4b-pEiCJr2e)


## 运行

直接打开 `index.html` 玩示例；打开 `template/index.html` 看最小模板。也可以在目录中运行：

```bash
python3 -m http.server 8032
```

访问 `http://localhost:8032`。适配手机和桌面，无外部资源、无账号、无后端。

## 做下一个游戏

1. 复制 `index.html`、`storykit.css`、`storykit.js` 到新目录。
2. 将 `template/config.js` 复制为 `game-config.js`。
3. 改标题、主题色、属性、事件、选项和结局，打开 HTML 即可。

首页便利店插画位于 `storykit.js` 的 `art()`，更换题材时可直接替换该函数的 HTML/SVG。主流程只读 `window.STORY_GAME` 内容配置。

### 配置说明

- `stats`：属性 ID、名称、图标、初始值、上限；属性值限定在 0 到上限之间。
- `events`：按数组顺序推进；每个事件可配置 `day`、`time`、`category`、`title`、`icon`、`color`、`text`、`choices`。
- `choices`：`text` 为选项，`effects` 为属性变化，`result` 为反馈，`flag` 记录故事标记，`when` 限制选项出现条件。
- `failEndings`：每次选择后检查，符合条件即可提前结算。
- `endings`：完成最后一个事件后，从上到下选择第一个符合条件的结局；最后放 `when: {}` 作为默认结局。
- `when` 支持属性范围（`{ cash: { min: 50, max: 90 } }`）和故事标记（`{ flags: ['helped'] }`），同一条件内全部满足时成立。
- `days` 和 `turnsPerDay` 控制天数显示；事件的 `day` 可手动覆盖自动推算。

```js
{
  text: '陪客人聊十分钟',
  when: { reputation: { min: 20 } },
  effects: { energy: -5, reputation: 10 },
  flag: 'new-friend',
  result: '他把这家小店推荐给了朋友。'
}
```

## 已包含

- 开始页、事件卡、属性变化反馈、进度、故事标记、条件选项、多结局
- 可重开、决定回顾、复制文字版结果卡
- 竖屏交互、键盘焦点、减弱动态效果支持
- 原创文案与内置 SVG 店面插画，无字体和图片下载

## 发布

将项目作为静态 HTML 作品使用。示例游戏已上线 BilibiliToy 与 VibeHub。

## 许可

MIT。示例游戏文案与 SVG 同样适用。
