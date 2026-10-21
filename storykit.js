(() => {
  const game = window.STORY_GAME;
  const app = document.querySelector('#app');
  document.documentElement.style.setProperty('--accent', game.accent);
  document.title = `${game.title} · ${game.subtitle}`;
  let state;
  const matches = (conditions = {}) => Object.entries(conditions).every(([key, value]) => {
    if (key === 'flags') return value.every(flag => state.flags.includes(flag));
    return (value.min === undefined || state.stats[key] >= value.min) && (value.max === undefined || state.stats[key] <= value.max);
  });
  const header = label => `<header class="topbar"><div class="brand"><span>◈</span> ${game.brand}</div><div class="tag">${label}</div></header>`;
  const statCards = () => `<div class="stats">${game.stats.map(stat => `<div class="stat ${state.stats[stat.id] <= 20 ? 'low' : ''}"><div class="stat-top">${stat.name}<span class="stat-icon">${stat.icon}</span></div><div class="stat-value">${state.stats[stat.id]}<small>/ ${stat.max}</small></div><div class="stat-track"><i style="width:${state.stats[stat.id] / stat.max * 100}%"></i></div></div>`).join('')}</div>`;
  const art = () => `<div class="store-art"><div class="art-label">OPEN LATE · STAY A WHILE</div><svg viewBox="0 0 408 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="夜色中亮着暖光的便利店"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#253149"/><stop offset="1" stop-color="#3a4660"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#eed58b"/><stop offset="1" stop-color="#d7a860"/></linearGradient></defs><path fill="url(#sky)" d="M0 0h408v245H0z"/><circle cx="340" cy="47" r="18" fill="#e4e7c2"/><path fill="#253047" d="M0 63h46v-9h31v113H0zm346 31h62v87h-62zm-70-58h28v75h-28z"/><g stroke="#b9c8df" opacity=".2"><path d="m30 25-8 18m80-28-8 18m57-14-8 18m-91 48-8 18m317-21-8 18m33-64-8 18m-189-38-8 18m-38 93-8 18m207 4-8 18"/></g><path fill="#192230" d="M0 195h408v50H0z"/><path fill="#354052" d="M0 208h408v3H0z"/><path fill="#171d27" d="M66 98h269v114H66z"/><path fill="#5e7565" d="M64 89h273v30H64z"/><path fill="#d6f272" d="M64 111h273v8H64z"/><text x="83" y="107" fill="#f2f4de" font-family="sans-serif" font-weight="bold" font-size="12" letter-spacing="3">MIDNIGHT MART</text><path fill="url(#glass)" d="M79 127h110v74H79zm163 0h80v74h-80z"/><path fill="#7b7557" d="M88 146h92v4H88zm0 26h92v4H88zm162-26h64v4h-64zm0 26h64v4h-64z"/><g fill="#f1e5b4"><path d="M91 133h9v12h-9zm17 2h7v10h-7zm17-3h12v13h-12zm20 3h8v10h-8zm18-2h10v12h-10zm-70 26h12v12H93zm19-5h9v17h-9zm17 4h13v13h-13zm21-3h9v16h-9zm17 4h9v12h-9zm87-24h10v10h-10zm18-5h9v15h-9zm18 3h16v12h-16zm-36 23h13v15h-13zm20 4h8v11h-8zm17-5h13v16h-13z"/></g><path fill="#334449" d="M198 124h35v82h-35z"/><path fill="#b9b787" d="M204 132h22v51h-22z"/><path stroke="#edd99d" stroke-width="2" d="M229 171v11"/><path fill="#333e4c" d="M58 206h285v7H58z"/><ellipse cx="219" cy="224" rx="72" ry="5" fill="#d4c98b" opacity=".13"/><g fill="#dcad72"><ellipse cx="302" cy="210" rx="15" ry="8"/><circle cx="290" cy="204" r="7"/><path d="m285 200 1-7 5 6m1 1 5-6 1 9"/><path d="M313 209q16-14 17-6t-9 13"/></g><path fill="#66756c" d="M45 177h11v27H45z"/><path fill="#92a67f" d="M50 184q-20-17-9-25 14 1 9 25m0-2q3-26 13-20 5 11-13 20"/><path fill="#927b65" d="M38 201h25l-4 11H42z"/></svg><div class="ticker"><span>24:00 · 城市还没睡</span><b>● 营业中</b></div></div>`;
  function home() {
    app.innerHTML = `${header('一份深夜营业计划')}<p class="eyebrow">${game.subtitle}</p><h1 class="hero-title">${game.title.slice(0,2)}<br><em>${game.title.slice(2)}</em></h1><p class="intro">${game.intro.replaceAll('\n','<br>')}</p>${art()}<div class="features"><div><b>${String(game.days).padStart(2,'0')}</b>个夜晚</div><div><b>${String(game.events.length).padStart(2,'0')}</b>个决定</div><div><b>${String(game.endings.length).padStart(2,'0')}</b>种通关结局</div></div><button class="primary" id="start">${game.startLabel}<span>↗</span></button><p class="fine">${game.description}<br>不用赶时间，每个决定都可以慢慢想。</p>`;
    document.querySelector('#start').onclick = start;
  }
  function start() {
    state = { index: 0, stats: Object.fromEntries(game.stats.map(stat => [stat.id, stat.initial])), flags: [], history: [] };
    eventView();
  }
  function eventView() {
    const event = game.events[state.index];
    const day = event.day || Math.floor(state.index / game.turnsPerDay) + 1;
    const choices = event.choices.filter(choice => matches(choice.when));
    app.innerHTML = `${header('深夜营业中')}<div class="dayline"><h1>第 ${String(day).padStart(2,'0')} 夜<small>/ ${game.days}</small></h1><div class="clock">${event.time || '23:00'}</div></div><div class="progress">${game.events.map((_,i) => `<span class="${i <= state.index ? 'done' : ''}"></span>`).join('')}</div>${statCards()}<article class="event-card"><div class="scene" style="background:${event.color || '#dfe4d5'}"><span class="scene-label">NIGHT ${String(day).padStart(2,'0')} / EVENT ${String(state.index + 1).padStart(2,'0')}</span><span class="scene-icon">${event.icon || '✦'}</span></div><div class="event-body"><p class="event-category">${event.category || '新的事件'}</p><h2 class="event-title">${event.title}</h2><p class="event-description">${event.text}</p></div></article><div class="choices">${choices.map((choice,i) => `<button class="choice" data-choice="${i}"><span class="choice-letter">${'ABCDEF'[i]}</span><div class="choice-main"><div class="choice-label">${choice.text}</div><div class="choice-preview">${effectsText(choice.effects)}</div></div><span class="choice-arrow">↗</span></button>`).join('')}</div><div class="utility"><span>没有标准答案，只有你的经营方式。</span><button class="text-button" id="restart">重新开店 ↻</button></div>`;
    app.querySelectorAll('[data-choice]').forEach(button => button.onclick = () => choose(choices[Number(button.dataset.choice)]));
    document.querySelector('#restart').onclick = home;
    window.scrollTo(0,0);
  }
  const effectsText = effects => Object.entries(effects).filter(([,value])=>value).map(([key,value]) => `${game.stats.find(stat => stat.id === key).name} ${value > 0 ? '+' : ''}${value}`).join(' · ');
  function choose(choice) {
    const changes = {};
    Object.entries(choice.effects).forEach(([key,value]) => {
      const stat = game.stats.find(stat => stat.id === key);
      const next = Math.max(0, Math.min(stat.max, state.stats[key] + value));
      changes[key] = next - state.stats[key];
      state.stats[key] = next;
    });
    if (choice.flag && !state.flags.includes(choice.flag)) state.flags.push(choice.flag);
    state.history.push({ event: game.events[state.index].title, choice: choice.text });
    const earlyEnding = game.failEndings.find(ending => matches(ending.when));
    app.querySelector('.choices').outerHTML = `<div class="outcome"><div class="outcome-icon">✓</div><h2>门铃之后的小小回响</h2><p>${choice.result}</p><div class="deltas">${Object.entries(changes).filter(([,v]) => v).map(([key,value]) => `<span class="delta ${value < 0 ? 'negative' : ''}">${game.stats.find(stat=>stat.id===key).name} ${value > 0 ? '+' : ''}${value}</span>`).join('')}</div></div><button class="primary" id="next" style="margin-top:16px">${earlyEnding || state.index === game.events.length - 1 ? '收好这一周的故事' : '听见下一声门铃'}<span>→</span></button>`;
    app.querySelector('.stats').outerHTML = statCards();
    app.querySelector('.utility').remove();
    document.querySelector('#next').onclick = () => {
      state.index++;
      if (earlyEnding) endingView(earlyEnding);
      else if (state.index === game.events.length) endingView(game.endings.find(ending => matches(ending.when)));
      else eventView();
    };
    document.querySelector('#next').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function endingView(ending) {
    const completed = Math.min(state.index, game.events.length);
    app.innerHTML = `${header('本周营业回执')}<div class="receipt"><div class="receipt-head"><div class="ending-icon">${ending.icon}</div><p class="eyebrow">${game.title} / 你的故事结局</p><h1>${ending.title}</h1><p class="subtitle">${ending.subtitle}</p></div><div class="receipt-body"><p>${ending.description}</p><div class="receipt-rule"></div>${game.stats.map(stat=>`<div class="receipt-row"><span>${stat.icon} ${stat.name}</span><strong>${state.stats[stat.id]} / ${stat.max}</strong></div>`).join('')}<div class="receipt-row total"><span>写下的决定</span><strong>${completed} / ${game.events.length}</strong></div><div class="receipt-rule"></div><div class="receipt-footer"><div class="stamp">THANK YOU · 晚安</div><div class="ticket-number">NO. ${String(Date.now()).slice(-6)}<br>KEEP THE LIGHT ON.</div></div></div></div><button class="primary" id="again">换一种选择，再开一次店<span>↻</span></button><button class="secondary" id="copy">复制我的营业回执</button><button class="secondary" id="journal">回看这周的决定 ↓</button><div id="journal-content"></div><p class="fine">每一种选择，都让这间小店有点不一样。<br>STORYKIT · 一个故事，许多种可能</p>`;
    document.querySelector('#again').onclick = start;
    document.querySelector('#copy').onclick = () => {
      const text = `${game.title}｜我的结局：${ending.title}\n${game.stats.map(stat=>`${stat.name} ${state.stats[stat.id]}`).join(' / ')}\n${ending.subtitle}\n你会开出怎样的一家小店？`;
      const field = document.createElement('textarea');field.value = text;document.body.append(field);field.select();document.execCommand('copy');field.remove();
      const toast = document.createElement('div');toast.className='toast';toast.textContent='营业回执已复制，发给朋友看看';document.body.append(toast);setTimeout(()=>toast.remove(),2200);
    };
    document.querySelector('#journal').onclick = () => {
      const content = document.querySelector('#journal-content');
      const open = !content.innerHTML;
      content.innerHTML = open ? `<div class="notebook"><h3>本周的 ${completed} 个决定</h3><ul>${state.history.map(item=>`<li>${item.event}<br>${item.choice}</li>`).join('')}</ul></div>` : '';
      document.querySelector('#journal').textContent = open ? '收起我的决定 ↑' : '回看这周的决定 ↓';
    };
    window.scrollTo(0,0);
  }
  home();
})();
