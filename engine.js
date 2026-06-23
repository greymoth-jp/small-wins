/* Small Wins — engine. Pure, deterministic, no DOM, no network.
   Maps a small-win description to one of 12 win-archetypes. Loaded by index.html (classic
   script) and unit-tested in node. Pattern proven in Dream Atlas; this is the daylight sibling. */
(function (root) {
  "use strict";

  const ARCHETYPES = [
    {key:"overdue", name:"The Overdue", glyph:"✓", verb:"were also overdue — and did it",
     citation:"For finally doing the thing you'd been avoiding since it was a smaller thing. The Order is, frankly, relieved.",
     base:4200, kw:["finally","overdue","avoided","avoiding","procrastinat","put off","putting off","the email","replied","reply","that call","dentist","appointment","taxes","dishes","laundry","got around"]},
    {key:"hardword", name:"The Hard Word", glyph:"❝", verb:"also said the hard thing",
     citation:"For saying the true thing out loud when silence was easier. Few medals are heavier than this one.",
     base:1800, kw:["told them","told her","told him","said no to","confronted","spoke up","was honest","set a boundary","difficult conversation","stood up","asked for a raise","hard conversation"]},
    {key:"theno", name:"The No", glyph:"⊘", verb:"also said no, and meant it",
     citation:"For the small, holy act of declining. Your time bows to you.",
     base:1500, kw:["said no","declined","turned down","didn't go","said i couldn't","refused","cancelled","backed out","protected my time"]},
    {key:"maker", name:"The Maker", glyph:"❖", verb:"also made something today",
     citation:"For making a thing that did not exist this morning. The universe is one object richer.",
     base:2600, kw:["made","built","finished","shipped","wrote","painted","cooked","baked","drew","created","published","launched","recorded","sewed","planted","coded a"]},
    {key:"streak", name:"The Kept Flame", glyph:"✦", verb:"also kept the streak alive",
     citation:"For showing up again — unwitnessed, unapplauded, undefeated.",
     base:3100, kw:["again","streak","day in a row","kept","didn't skip","showed up","gym","ran","jogged","meditated","woke early","got up early","practiced","day streak"]},
    {key:"theask", name:"The Open Hand", glyph:"◇", verb:"also asked for help",
     citation:"For asking — which costs more than it looks. The Order notes your courage.",
     base:1400, kw:["asked for help","reached out","texted first","apologi","asked someone","admitted","let someone","opened up"]},
    {key:"mend", name:"The Mender", glyph:"✜", verb:"also set something right",
     citation:"For fixing, sorting, or quietly putting right. Order from entropy: the oldest victory.",
     base:2400, kw:["fixed","repaired","resolved","cleaned","sorted","organized","organised","declutter","tidied","sorted out","unpacked","paid off","budget"]},
    {key:"brave", name:"The Nerve", glyph:"▲", verb:"also did it afraid",
     citation:"For doing it scared. Bravery was never the absence of the shaking.",
     base:1700, kw:["scared","nervous","afraid","anyway","first time","in public","presented","interview","flew","spoke in front","terrified","anxious but"]},
    {key:"rest", name:"The Enough", glyph:"☾", verb:"also chose to rest",
     citation:"For stopping — for deciding the day had taken enough. Rest is not surrender.",
     base:2000, kw:["rested","took a nap","napped","took a break","day off","said enough","logged off","slept","went to bed early","let myself","didn't work"]},
    {key:"tend", name:"The Tender", glyph:"❀", verb:"also cared for someone",
     citation:"For tending to someone — a call, a meal, a listening ear. Care is a quiet country.",
     base:2200, kw:["helped","cared for","listened","cooked for","visited","called my","called grandma","called mom","watered","fed the","checked on","comforted","held"]},
    {key:"learn", name:"The Lantern", glyph:"✶", verb:"also learned something",
     citation:"For understanding a thing you didn't this morning. You are slightly larger now.",
     base:1900, kw:["learned","figured out","understood","studied","finished the course","read a","read the","practiced a","taught myself","solved"]},
    {key:"showed_up", name:"The Showed-Up", glyph:"◉", verb:"also just made it through",
     citation:"For getting through a day that asked a lot and gave little. You are still here. That counts more than they tell you.",
     base:3600, kw:["got through","made it through","survived","hard day","still here","out of bed","got out of bed","kept going","didn't give up","barely","just made it","showed up at all"]}
  ];

  function hash(str){let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}

  function classify(text){
    const t=(" "+String(text).toLowerCase()+" ").replace(/[^a-z\s']/g," ");
    let best=null,bestScore=0;
    for(const a of ARCHETYPES){
      let s=0;
      for(const k of a.kw){ if(t.includes(k)) s += (k.length>5?2:1); }
      if(s>bestScore){bestScore=s;best=a;}
    }
    if(!best||bestScore===0) best=ARCHETYPES.find(a=>a.key==="showed_up");
    return best;
  }

  function daySeed(date){const d=date||new Date();return hash(""+d.getFullYear()+d.getMonth()+d.getDate());}
  function todayCount(a,date){return a.base + (hash(a.key+daySeed(date))%900);}

  /* Narrow safety guard: explicit self-harm intent stays private + warm support.
     "survived / still here / got through" are CELEBRATED (The Showed-Up), never flagged. */
  const SENSITIVE=["suicide","kill myself","killing myself","end my life","self harm","self-harm","hurt myself","cut myself"];
  function isSensitive(text){const t=" "+String(text).toLowerCase()+" ";return SENSITIVE.some(k=>t.includes(k));}

  const api={ARCHETYPES,hash,classify,daySeed,todayCount,isSensitive};
  if(typeof module!=="undefined"&&module.exports){module.exports=api;}
  root.WinEngine=api;
})(typeof window!=="undefined"?window:globalThis);
