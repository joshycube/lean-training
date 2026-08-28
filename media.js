const CDN='https://pub-585d42eb1aa64a67aedf483ec328d3fe.r2.dev';
const directMedia={
'Assisted Pull-up':'band-assisted-pull-up',
'Chest-Supported Row':'dumbbell-incline-row',
'Lat Pulldown':'lat-pulldown',
'Face Pull':'face-pull',
'Hanging Knee Raise':'hanging-knee-raise',
'Cable Crunch':'cable-crunch',
'Goblet Squat':'goblet-squat',
'Romanian Deadlift':'barbell-romanian-deadlift',
'Dumbbell Bench Press':'dumbbell-bench-press',
'DB Shoulder Press':'dumbbell-shoulder-press',
'Walking Lunge':'dumbbell-walking-lunge',
'Side Plank':'side-plank',
'Trap-Bar Deadlift':'trap-bar-deadlift',
'Pull-up / Assisted Pull-up':'pull-up',
'Incline Dumbbell Press':'incline-dumbbell-bench-press',
'Single-Arm Cable Row':'cable-one-arm-seated-row',
'Hanging Knee / Leg Raise':'hanging-leg-raise',
'Farmer Carry':'farmers-walk'
};
function mediaUrl(slug){return `${CDN}/exercise-videos/male/${slug}.mp4`}
function posterUrl(slug){return `${CDN}/exercise-posters/male/${slug}.jpg`}
function attachMedia(card){
 if(card.dataset.realMedia==='1')return;
 const title=card.querySelector('.row b')?.textContent?.trim();
 const slug=directMedia[title];
 if(!slug)return;
 card.dataset.realMedia='1';
 card.querySelectorAll('.guideimg,.illustration-note,.workout-library-ref,.open-media-status,.real-media').forEach(x=>x.remove());
 const guide=card.querySelector('.guide');
 const wrap=document.createElement('div');wrap.className='real-media';wrap.style.cssText='margin:12px 0';
 const video=document.createElement('video');
 video.src=mediaUrl(slug);video.poster=posterUrl(slug);video.autoplay=true;video.loop=true;video.muted=true;video.playsInline=true;video.controls=true;video.preload='metadata';
 video.style.cssText='display:block;width:100%;max-height:480px;object-fit:contain;background:#080a0d;border:1px solid #2b303a;border-radius:13px';
 const caption=document.createElement('div');caption.className='muted';caption.style.cssText='margin-top:6px;text-align:center';caption.textContent='Real exercise demonstration';
 const fail=document.createElement('a');fail.href=mediaUrl(slug);fail.target='_blank';fail.rel='noopener';fail.textContent='Open demonstration video';fail.style.cssText='display:none;margin-top:8px;text-align:center;color:#d7ff5b';
 video.addEventListener('error',()=>{caption.textContent='Inline playback failed on this browser.';fail.style.display='block'});
 wrap.append(video,caption,fail);card.insertBefore(wrap,guide);
 video.play().catch(()=>{});
}
function scanMedia(){document.querySelectorAll('#today .ex').forEach(attachMedia)}
scanMedia();new MutationObserver(scanMedia).observe(document.getElementById('today'),{childList:true,subtree:true});