const EXERCISE_MEDIA_API='https://exercise-database.zenithfits.com/api/v1/exercises';
const mediaQueries={
'Assisted Pull-up':'assisted pull-up',
'Chest-Supported Row':'chest supported row',
'Lat Pulldown':'lat pulldown',
'Face Pull':'face pull',
'Hanging Knee Raise':'hanging knee raise',
'Cable Crunch':'cable crunch',
'Goblet Squat':'goblet squat',
'Romanian Deadlift':'romanian deadlift',
'Dumbbell Bench Press':'dumbbell bench press',
'DB Shoulder Press':'dumbbell shoulder press',
'Walking Lunge':'walking lunge',
'Side Plank':'side plank',
'Trap-Bar Deadlift':'trap bar deadlift',
'Pull-up / Assisted Pull-up':'pull up',
'Incline Dumbbell Press':'incline dumbbell press',
'Single-Arm Cable Row':'single arm cable row',
'Hanging Knee / Leg Raise':'hanging leg raise',
'Farmer Carry':'farmer carry'
};
const mediaCache=new Map();
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function scoreExercise(ex,q){const n=norm(ex.name),aliases=(ex.aliases||[]).map(norm),qq=norm(q);if(n===qq)return 100;if(aliases.includes(qq))return 95;if(n.includes(qq)||qq.includes(n))return 80;let words=qq.split(' ');return words.reduce((s,w)=>s+(n.includes(w)?8:0),0)}
async function lookupMedia(query){if(mediaCache.has(query))return mediaCache.get(query);const p=(async()=>{const r=await fetch(`${EXERCISE_MEDIA_API}?search=${encodeURIComponent(query)}&limit=10`);if(!r.ok)throw new Error(`media ${r.status}`);const j=await r.json();const list=Array.isArray(j.data)?j.data:[];list.sort((a,b)=>scoreExercise(b,query)-scoreExercise(a,query));return list[0]||null})();mediaCache.set(query,p);return p}
function makeStatus(text){const d=document.createElement('div');d.className='open-media-status';d.textContent=text;d.style.cssText='margin:12px 0;padding:14px;border:1px solid #2b303a;border-radius:13px;background:#101319;color:#9ba3af;text-align:center';return d}
async function attachMedia(card){if(card.dataset.realMedia==='1')return;const title=card.querySelector('.row b')?.textContent?.trim();const query=mediaQueries[title];if(!query)return;card.dataset.realMedia='1';card.querySelectorAll('.guideimg,.illustration-note,.workout-library-ref').forEach(x=>x.remove());const guide=card.querySelector('.guide');const holder=makeStatus('Loading real exercise demonstration…');card.insertBefore(holder,guide);try{const ex=await lookupMedia(query);if(!ex||!ex.videos?.male)throw new Error('no match');const wrap=document.createElement('div');wrap.className='real-media';wrap.style.cssText='margin:12px 0';const video=document.createElement('video');video.src=ex.videos.male;video.poster=ex.thumbnails?.male||'';video.autoplay=true;video.loop=true;video.muted=true;video.playsInline=true;video.controls=true;video.preload='metadata';video.style.cssText='display:block;width:100%;max-height:480px;object-fit:contain;background:#080a0d;border:1px solid #2b303a;border-radius:13px';const caption=document.createElement('div');caption.className='muted';caption.style.cssText='margin-top:6px;text-align:center';caption.textContent=`Open exercise demo: ${ex.name}`;wrap.append(video,caption);holder.replaceWith(wrap)}catch(e){holder.textContent='Real demonstration unavailable for this movement right now — no placeholder image shown.'}}
function scanMedia(){document.querySelectorAll('#today .ex').forEach(attachMedia)}
scanMedia();new MutationObserver(scanMedia).observe(document.getElementById('today'),{childList:true,subtree:true});