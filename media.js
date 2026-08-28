const RAW='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';
const imageMedia={
'Assisted Pull-up':'Pullups',
'Pull-up / Assisted Pull-up':'Pullups',
'Chest-Supported Row':'Incline_Bench_Pull',
'Lat Pulldown':'Full_Range-Of-Motion_Lat_Pulldown',
'Face Pull':'Face_Pull',
'Cable Crunch':'Cable_Crunch',
'Goblet Squat':'Goblet_Squat',
'Romanian Deadlift':'Romanian_Deadlift',
'Dumbbell Bench Press':'Dumbbell_Bench_Press',
'DB Shoulder Press':'Dumbbell_Shoulder_Press'
};
function imgUrl(id,n){return `${RAW}/${id}/${n}.jpg`}
function attachMedia(card){
 if(card.dataset.realMedia==='1')return;
 const title=card.querySelector('.row b')?.textContent?.trim();
 const id=imageMedia[title];
 if(!id)return;
 card.dataset.realMedia='1';
 card.querySelectorAll('.guideimg,.illustration-note,.workout-library-ref,.open-media-status,.real-media').forEach(x=>x.remove());
 const guide=card.querySelector('.guide');
 const wrap=document.createElement('div');wrap.className='real-media';wrap.style.cssText='margin:12px 0';
 const stage=document.createElement('div');stage.style.cssText='position:relative;aspect-ratio:4/3;background:#080a0d;border:1px solid #2b303a;border-radius:13px;overflow:hidden';
 const a=document.createElement('img'),b=document.createElement('img');
 [a,b].forEach(img=>{img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .55s ease;background:#080a0d';});
 a.src=imgUrl(id,0);b.src=imgUrl(id,1);a.alt=`${title} start position`;b.alt=`${title} finish position`;b.style.opacity='0';
 let loaded=0;const ok=()=>{loaded++;if(loaded===2){let showB=false;setInterval(()=>{showB=!showB;a.style.opacity=showB?'0':'1';b.style.opacity=showB?'1':'0';},1800)}};
 a.onload=ok;b.onload=ok;
 const fail=()=>{stage.innerHTML='<div style="display:grid;place-items:center;height:100%;padding:20px;text-align:center;color:#9ba3af">Exercise images unavailable.</div>'};a.onerror=fail;b.onerror=fail;
 const labels=document.createElement('div');labels.style.cssText='display:flex;justify-content:space-between;margin-top:6px;color:#9ba3af;font-size:12px';labels.innerHTML='<span>START</span><span>FINISH</span>';
 stage.append(a,b);wrap.append(stage,labels);card.insertBefore(wrap,guide);
}
function scanMedia(){document.querySelectorAll('#today .ex').forEach(attachMedia)}
scanMedia();new MutationObserver(scanMedia).observe(document.getElementById('today'),{childList:true,subtree:true});