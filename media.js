const RAW='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';
const imageMedia={
'Assisted Pull-up':{id:'Pullups',label:'Standard pull-up reference'},
'Pull-up / Assisted Pull-up':{id:'Pullups'},
'Chest-Supported Row':{id:'Incline_Bench_Pull',label:'Incline bench pull'},
'Lat Pulldown':{id:'Full_Range-Of-Motion_Lat_Pulldown',label:'Full-range lat pulldown'},
'Face Pull':{id:'Face_Pull'},
'Hanging Knee Raise':{id:'Hanging_Leg_Raise',label:'Hanging leg raise reference'},
'Cable Crunch':{id:'Cable_Crunch'},
'Goblet Squat':{id:'Goblet_Squat'},
'Romanian Deadlift':{id:'Romanian_Deadlift'},
'Dumbbell Bench Press':{id:'Dumbbell_Bench_Press'},
'DB Shoulder Press':{id:'Dumbbell_Shoulder_Press',label:'Dumbbell shoulder press'},
'Walking Lunge':{id:'Bodyweight_Walking_Lunge',label:'Bodyweight walking lunge'},
'Side Plank':{id:'Side_Bridge',label:'Side bridge / side plank'},
'Trap-Bar Deadlift':{id:'Trap_Bar_Deadlift'},
'Incline Dumbbell Press':{id:'Incline_Dumbbell_Press'},
'Single-Arm Cable Row':{id:'Seated_One-arm_Cable_Pulley_Rows',label:'Seated one-arm cable row'},
'Hanging Knee / Leg Raise':{id:'Hanging_Leg_Raise'},
'Farmer Carry':{id:'Farmers_Walk',label:"Farmer's walk"}
};
function imgUrl(id,n){return `${RAW}/${id}/${n}.jpg`}
function attachMedia(card){
 if(card.dataset.realMedia==='1')return;
 const title=card.querySelector('.row b')?.textContent?.trim();
 const entry=imageMedia[title]; if(!entry)return;
 card.dataset.realMedia='1';
 card.querySelectorAll('.guideimg,.illustration-note,.workout-library-ref,.open-media-status,.real-media').forEach(x=>x.remove());
 const guide=card.querySelector('.guide');
 const wrap=document.createElement('div');wrap.className='real-media';wrap.style.cssText='margin:12px 0';
 const stage=document.createElement('div');stage.style.cssText='position:relative;aspect-ratio:4/3;background:#080a0d;border:1px solid #2b303a;border-radius:13px;overflow:hidden';
 const a=document.createElement('img'),b=document.createElement('img');
 [a,b].forEach(img=>img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .55s ease;background:#080a0d');
 a.src=imgUrl(entry.id,0);b.src=imgUrl(entry.id,1);a.alt=`${title} start position`;b.alt=`${title} finish position`;b.style.opacity='0';
 let loaded=0,interval=null;const ok=()=>{loaded++;if(loaded===2&&!interval){let showB=false;interval=setInterval(()=>{showB=!showB;a.style.opacity=showB?'0':'1';b.style.opacity=showB?'1':'0'},1800)}};
 a.onload=ok;b.onload=ok;
 const fail=()=>{if(interval)clearInterval(interval);stage.innerHTML='<div style="display:grid;place-items:center;height:100%;padding:20px;text-align:center;color:#9ba3af">Start/finish images unavailable.</div>'};a.onerror=fail;b.onerror=fail;
 const labels=document.createElement('div');labels.style.cssText='display:flex;justify-content:space-between;margin-top:6px;color:#9ba3af;font-size:12px';labels.innerHTML='<span>START</span><span>FINISH</span>';
 wrap.append(stage,labels);stage.append(a,b);
 if(entry.label){const note=document.createElement('div');note.className='muted';note.style.cssText='text-align:center;margin-top:5px';note.textContent=`Visual source: ${entry.label}`;wrap.append(note)}
 card.insertBefore(wrap,guide);
}
function scanMedia(){document.querySelectorAll('#today .ex').forEach(attachMedia)}
scanMedia();new MutationObserver(scanMedia).observe(document.getElementById('today'),{childList:true,subtree:true});