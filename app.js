(function(){var R=document.documentElement;function g(k){try{return localStorage.getItem(k)}catch(e){return null}}function s(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var t=g('theme');if(t)R.setAttribute('data-theme',t);
document.getElementById('th').onclick=function(){var d=R.getAttribute('data-theme')==='dark'||(!R.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);var n=d?'light':'dark';R.setAttribute('data-theme',n);s('theme',n)};
// filters
var fb=document.querySelectorAll('.filters button');fb.forEach(function(b){b.onclick=function(){fb.forEach(function(x){x.classList.remove('on')});b.classList.add('on');var f=b.dataset.f;document.querySelectorAll('.ev').forEach(function(e){e.style.display=(f==='all'||e.dataset.cat===f)?'':'none'});document.querySelectorAll('.grp').forEach(function(sec){var any=sec.querySelector('.ev:not([style*="none"])');sec.style.display=any?'':'none'})}});
// counters
document.querySelectorAll('[data-n]').forEach(function(el){var n=+el.dataset.n,plus=n===700?'+':'',i=0,st=Math.max(1,Math.round(n/40));var iv=setInterval(function(){i=Math.min(n,i+st);el.textContent=i+(i===n?plus:'');if(i===n)clearInterval(iv)},30)});
// poll
var box=document.getElementById('opts');if(!box)return;
var O=['Государство должно защищать общество от экстремизма','Свобода религии — важное право человека','Чрезмерный контроль может ограничить законные убеждения','Просвещение и профилактика эффективнее одних запретов'];
function load(){try{return JSON.parse(g('poll_votes')||'[]')}catch(e){return[]}}
box.innerHTML=O.map(function(o,i){return '<label><input type="radio" name="o" value="'+i+'">'+o+'</label>'}).join('');
function render(){var v=load(),c=O.map(function(){return 0});v.forEach(function(x){if(c[x.o]!==undefined)c[x.o]++});var T=v.length;
document.getElementById('stats').innerHTML='<p>Всего ответов: <b>'+T+'</b></p>'+O.map(function(o,i){var p=T?Math.round(c[i]*100/T):0;return '<div>'+o+' — <b>'+c[i]+'</b> ('+p+'%)<div class="bar"><i style="width:'+p+'%"></i></div></div>'}).join('');
document.getElementById('hist').innerHTML=v.slice().reverse().map(function(x){return '<li>'+new Date(x.t).toLocaleString('ru-RU')+' — '+O[x.o]+'</li>'}).join('')||'<li style="list-style:none">Пока нет ответов.</li>'}
document.getElementById('vote').onclick=function(){var r=document.querySelector('input[name=o]:checked'),m=document.getElementById('msg');if(!r){m.textContent='Выберите вариант';return}var v=load();v.push({o:+r.value,t:Date.now()});s('poll_votes',JSON.stringify(v));m.textContent='Спасибо, ответ сохранён';r.checked=false;render()};
document.getElementById('clr').onclick=function(){if(confirm('Удалить всю историю ответов?')){s('poll_votes','[]');render()}};
render()})();
