// ==================== 1. FUNCIONES AUXILIARES GLOBALES ====================
window.escapeHtml = s => !s ? '' : s.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m]));
window.formatDate = d => d ? (d.split('-').reverse().join('/')) : '';

// Renderiza el bloque de nombre y puesto deseado
window.renderNameAndTitle = (personal, template) => {
    const name = window.escapeHtml(personal.fullName);
    const jobTitle = personal.jobTitle ? `<div style="font-size:1.1rem; color:#4a5568; margin-top:0.25rem;">${window.escapeHtml(personal.jobTitle)}</div>` : '';
    if (template === 'minimal') {
        return `<h1 style="margin:0;">${name}</h1>${jobTitle}`;
    } else {
        return `<h1 style="margin:0 0 0.2rem;">${name}</h1>${jobTitle}`;
    }
};

window.renderSocialLinks = (tpl, p) => {
    const items = [p.facebook && `👍 Facebook: ${window.escapeHtml(p.facebook)}`, p.instagram && `📷 Instagram: ${window.escapeHtml(p.instagram)}`, p.github && `🐙 GitHub: ${window.escapeHtml(p.github)}`].filter(Boolean);
    return items.length ? `<div>${tpl === 'minimal' ? 'Redes sociales: ' : ''}${items.join(' | ')}</div>` : '';
};
window.renderWorkExperiences = arr => arr.filter(w => w.jobTitle || w.company).map(w => `<div><strong>${window.escapeHtml(w.jobTitle)}</strong> en ${window.escapeHtml(w.company)} (${window.escapeHtml(w.startDate)} - ${window.escapeHtml(w.endDate)})<br><span>${window.escapeHtml(w.description)}</span></div><br>`).join('') || '<p>Sin experiencia registrada</p>';
window.renderEducation = arr => arr.filter(e => e.study).map(e => `<div><strong>${window.escapeHtml(e.study)}</strong> - ${window.escapeHtml(e.institution)} (${window.escapeHtml(e.periodStart)}/${window.escapeHtml(e.periodEnd)}) - ${window.escapeHtml(e.status)} | Duración: ${window.escapeHtml(e.duration)}<br><span>${window.escapeHtml(e.description)}</span></div><br>`).join('') || '<p>Sin estudios registrados</p>';
window.renderSkills = s => s?.length ? `<ul>${s.map(v => `<li>${window.escapeHtml(v)}</li>`).join('')}</ul>` : '<p>No se han añadido habilidades.</p>';
window.renderLanguages = l => l?.length ? `<ul>${l.map(l => `<li><strong>${window.escapeHtml(l.name)}</strong> (${window.escapeHtml(l.level)})</li>`).join('')}</ul>` : '<p>No se han añadido idiomas.</p>';
window.renderCertifications = c => c?.length ? `<ul>${c.map(c => `<li><strong>${window.escapeHtml(c.name)}</strong> - ${window.escapeHtml(c.institution)} (${window.escapeHtml(c.date)})${c.url ? ` - <a href="${window.escapeHtml(c.url)}" target="_blank">Ver credencial</a>` : ''}</li>`).join('')}</ul>` : '<p>No se han añadido certificaciones.</p>';
window.renderReferences = (tpl, refs) => refs.filter(r => r.name).map(r => tpl === 'minimal' ? `<div>${window.escapeHtml(r.name)} - ${window.escapeHtml(r.relation)} | Teléfono: ${window.escapeHtml(r.phone)}</div>` : `<div>${window.escapeHtml(r.name)} - ${window.escapeHtml(r.relation)} | 📞 ${window.escapeHtml(r.phone)}</div>`).join('') || '<p>No hay referencias</p>';
window.renderAchievements = arr => arr?.length ? `<ul>${arr.map(a => `<li>${window.escapeHtml(a)}</li>`).join('')}</ul>` : '<p>No se han añadido logros destacados.</p>';
window.renderProjects = arr => arr?.length ? arr.map(p => `<div style="margin-bottom:1rem;"><strong>${window.escapeHtml(p.name)}</strong><br>${window.escapeHtml(p.description)}<br>Tecnologías: ${window.escapeHtml(p.technologies)}${p.url ? ` <a href="${window.escapeHtml(p.url)}" target="_blank">(Enlace)</a>` : ''}</div>`).join('') : '<p>No se han añadido proyectos personales.</p>';

// ==================== 2. VALIDACIONES ====================
function isValidPhone(p) { return !p || /^\+?[0-9\s\-]{6,15}$/.test(p.replace(/[\s\-]/g, '')); }
function isValidYearPeriod(v) { return !v.trim() || /^[a-zA-Z0-9\-\sáéíóúüñÑ]+$/.test(v.trim()); }
function isEndDateAfterStart(s, e) {
    if (!s || !e || e.toLowerCase() === 'actualidad') return true;
    const sY = (s.match(/\b(19|20)\d{2}\b/) || [])[0], eY = (e.match(/\b(19|20)\d{2}\b/) || [])[0];
    return !sY || !eY || parseInt(eY) >= parseInt(sY);
}
function validateDynamicItem(item, fields, required = false) {
    for (let f of fields) {
        const val = item[f.name] || '';
        if (!required && !val) continue;
        if (['startDate','endDate','periodStart','periodEnd'].includes(f.name) && !isValidYearPeriod(val)) { alert(`"${f.label}" tiene caracteres no permitidos.`); return false; }
        if (f.name === 'endDate' && item.startDate && !isEndDateAfterStart(item.startDate, val)) { alert(`Fin (${val}) no puede ser anterior a inicio (${item.startDate}).`); return false; }
        if (f.name === 'periodEnd' && item.periodStart && !isEndDateAfterStart(item.periodStart, val)) { alert(`Fin (${val}) no puede ser anterior a inicio (${item.periodStart}).`); return false; }
        if (f.name === 'phone' && val && !isValidPhone(val)) { alert(`Teléfono "${val}" no válido.`); return false; }
    }
    return true;
}
function validateCurrentStepData(step) {
    if (step === 1) return cvData.workExperiences.every(e => (!e.jobTitle && !e.company && !e.startDate && !e.endDate && !e.description) || validateDynamicItem(e, listConfigs.work.fields, true));
    if (step === 2) return cvData.educationList.every(e => (!e.study && !e.institution && !e.periodStart && !e.periodEnd && !e.duration && !e.description) || validateDynamicItem(e, listConfigs.edu.fields, true));
    if (step === 3) return cvData.references.every(r => (!r.name && !r.phone && !r.relation) || validateDynamicItem(r, listConfigs.ref.fields, true));
    if (step === 5) return cvData.projects.every(p => !p.name || p.name.trim() || (alert("El proyecto debe tener un nombre."), false));
    if (step === 7) return cvData.languages.every(l => !l.name || l.name.trim() || (alert("El idioma debe tener un nombre."), false));
    if (step === 8) return cvData.certifications.every(c => !c.name || c.name.trim() || (alert("La certificación debe tener un nombre."), false));
    return true;
}
function validatePersonalStep() {
    const p = cvData.personal;
    if (!p.fullName.trim()) return alert("❌ Nombre completo obligatorio."), false;
    if (!p.email.trim() || !p.email.includes('@')) return alert("❌ Correo válido requerido."), false;
    if (!p.mobilePhone.trim()) return alert("❌ Teléfono celular obligatorio."), false;
    if (!isValidPhone(p.mobilePhone)) return alert("❌ Teléfono celular no válido."), false;
    if (p.homePhone && !isValidPhone(p.homePhone)) return alert("❌ Teléfono casa no válido."), false;
    return true;
}

// ==================== 3. ESTADO GLOBAL ====================
let cvData = {
    personal: { fullName: '', jobTitle: '', birthDate: '', address: '', mobilePhone: '', homePhone: '', email: '', facebook: '', instagram: '', github: '', photoDataURL: '', profileSummary: '' },
    workExperiences: [], educationList: [], references: [], achievements: [], projects: [], skills: [], languages: [], certifications: []
};

// ==================== 4. CONFIGURACIÓN DE LISTAS DINÁMICAS ====================
const listConfigs = {
    work: { array: ()=>cvData.workExperiences, defaultItem: { jobTitle:'', company:'', startDate:'', endDate:'', description:'' }, minItems:1, emptyMsg:'Debe tener al menos una experiencia', fields: [ {name:'jobTitle',label:'Cargo'},{name:'company',label:'Empresa'},{name:'startDate',label:'Desde'},{name:'endDate',label:'Hasta'},{name:'description',label:'Descripción',type:'textarea'} ], gridCols:'1fr 1fr' },
    edu: { array: ()=>cvData.educationList, defaultItem: { study:'', institution:'', periodStart:'', periodEnd:'', status:'finalizado', duration:'', description:'' }, minItems:1, emptyMsg:'Debe tener al menos un estudio', fields: [ {name:'study',label:'Estudio'},{name:'institution',label:'Institución'},{name:'periodStart',label:'Desde'},{name:'periodEnd',label:'Hasta'},{name:'status',label:'Estado',type:'select',options:['finalizado','en curso']},{name:'duration',label:'Duración'},{name:'description',label:'Descripción',type:'textarea'} ], gridCols:'1fr 1fr' },
    ref: { array: ()=>cvData.references, defaultItem: { name:'', phone:'', relation:'' }, minItems:0, fields: [ {name:'name',label:'Nombre'},{name:'phone',label:'Teléfono'},{name:'relation',label:'Relación'} ], gridCols:'1fr 1fr 1fr' },
    achievements: { array: ()=>cvData.achievements, defaultItem: '', minItems:0, fields: [ {name:'value',label:'Logro'} ], gridCols:'1fr' },
    projects: { array: ()=>cvData.projects, defaultItem: { name:'', description:'', technologies:'', url:'' }, minItems:0, fields: [ {name:'name',label:'Nombre'},{name:'description',label:'Descripción',type:'textarea'},{name:'technologies',label:'Tecnologías'},{name:'url',label:'Enlace (opcional)'} ], gridCols:'1fr 1fr' },
    skills: { array: ()=>cvData.skills, defaultItem: '', minItems:0, fields: [ {name:'value',label:'Habilidad'} ], gridCols:'1fr' },
    languages: { array: ()=>cvData.languages, defaultItem: { name:'', level:'Intermedio (B1)' }, minItems:0, fields: [ {name:'name',label:'Idioma'},{name:'level',label:'Nivel',type:'select',options:['Básico (A1)','Básico (A2)','Intermedio (B1)','Intermedio (B2)','Avanzado (C1)','Avanzado (C2)','Nativo']} ], gridCols:'1fr 1fr' },
    certifications: { array: ()=>cvData.certifications, defaultItem: { name:'', institution:'', date:'', url:'' }, minItems:0, fields: [ {name:'name',label:'Certificación'},{name:'institution',label:'Institución'},{name:'date',label:'Fecha'},{name:'url',label:'Enlace (opcional)'} ], gridCols:'1fr 1fr' }
};
cvData.workExperiences.push({ ...listConfigs.work.defaultItem });
cvData.educationList.push({ ...listConfigs.edu.defaultItem });

// ==================== 5. AUTO-SAVE ====================
(function() {
    const KEY = 'cvGeneratorData';
    let last = null;
    function save() { try { const c = JSON.parse(JSON.stringify(cvData)); localStorage.setItem(KEY, JSON.stringify(c)); last = c; show(); } catch(e){} }
    function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch(e){} }
    function show() { let el = document.getElementById('autoSaveIndicator'); if(!el){ el = Object.assign(document.createElement('div'),{id:'autoSaveIndicator',textContent:'💾 Guardado automático'}); el.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#10b981;color:white;padding:8px 16px;border-radius:40px;font-size:0.8rem;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:1000;'; document.body.appendChild(el); } el.style.opacity='1'; setTimeout(()=>el.style.opacity='0',1500); }
    const saved = load(); if(saved){ Object.assign(cvData, saved); if(!cvData.workExperiences?.length) cvData.workExperiences = [{ ...listConfigs.work.defaultItem }]; if(!cvData.educationList?.length) cvData.educationList = [{ ...listConfigs.edu.defaultItem }]; if(!cvData.achievements) cvData.achievements = []; if(!cvData.projects) cvData.projects = []; ['skills','languages','certifications'].forEach(k=>{ if(!cvData[k]) cvData[k]=[]; }); if(cvData.personal.profileSummary===undefined) cvData.personal.profileSummary=''; if(cvData.personal.jobTitle===undefined) cvData.personal.jobTitle=''; }
    setInterval(()=>{ if(JSON.stringify(cvData) !== JSON.stringify(last)) save(); },3000);
    window.addEventListener('beforeunload', ()=>save());
    window.forceSave = save;
})();

// ==================== 6. INDICADOR DE COMPLETITUD ====================
(function(){
    const SCORES = { personal:22, profile:5, photo:5, work:25, education:25, references:20, achievements:5, projects:5 };
    function calc(){
        let total=0, max=0, p=cvData.personal;
        let ps = (p.fullName?.trim()?3:0)+(p.email?.includes('@')?3:0)+(isValidPhone(p.mobilePhone)?3:0)+(p.address?.trim()?1:0)+(p.birthDate?1:0)+(isValidPhone(p.homePhone)?1:0);
        ps += Math.min([p.facebook,p.instagram,p.github].filter(s=>s?.trim()).length,4);
        if(p.jobTitle?.trim()) ps += 2;
        total += Math.min(ps,SCORES.personal); max += SCORES.personal;
        let pl = p.profileSummary?.trim().length||0; total += pl>20?SCORES.profile : pl?2:0; max += SCORES.profile;
        total += p.photoDataURL?.startsWith('data:image')?SCORES.photo:0; max += SCORES.photo;
        let wItems = cvData.workExperiences.filter(w=>w.jobTitle||w.company);
        let ws = Math.min(wItems.length,3)*5;
        for(let w of wItems){ let e=0; if(w.startDate&&w.endDate) e+=2; else if(w.startDate||w.endDate) e+=1; if(w.description?.trim().length>20) e+=3; else if(w.description?.trim().length) e+=1; ws += Math.min(e,5); }
        total += Math.min(ws,SCORES.work); max += SCORES.work;
        let eItems = cvData.educationList.filter(e=>e.study);
        let es = Math.min(eItems.length,3)*5;
        for(let e of eItems){ let e2=0; if(e.periodStart&&e.periodEnd) e2+=2; else if(e.periodStart||e.periodEnd) e2+=1; if(e.description?.trim().length>20) e2+=3; else if(e.description?.trim().length) e2+=1; if(e.institution?.trim()) e2+=1; es += Math.min(e2,5); }
        total += Math.min(es,SCORES.education); max += SCORES.education;
        let rItems = cvData.references.filter(r=>r.name);
        let rs = Math.min(rItems.length,3)*5;
        for(let r of rItems){ let e=0; if(r.phone?.trim()) e+=2; if(r.relation?.trim()) e+=2; rs += Math.min(e,5); }
        total += Math.min(rs,SCORES.references); max += SCORES.references;
        let aItems = cvData.achievements?.length||0;
        total += Math.min(aItems,3)*5; max += SCORES.achievements;
        let pItems = cvData.projects?.length||0;
        total += Math.min(pItems,3)*5; max += SCORES.projects;
        return max?Math.round((total/max)*100):0;
    }
    function update(){
        let el = document.getElementById('completionIndicator');
        if(!el){ el = document.createElement('div'); el.id='completionIndicator'; const h = document.querySelector('.step-header'); if(h){ el.style.cssText='margin-top:0.75rem;background:rgba(255,255,255,0.15);border-radius:40px;padding:0.3rem 0.8rem;display:inline-block;font-size:0.8rem;'; h.appendChild(el); } else { el.style.cssText='position:fixed;bottom:20px;left:20px;background:#1e293b;color:white;border-radius:40px;padding:0.4rem 1rem;font-size:0.8rem;z-index:1000;'; document.body.appendChild(el); } }
        const p = calc();
        const msg = p===100?'🎉 ¡CV completo!':p>=80?'👍 Muy bien, casi listo':p>=50?'📝 Vas por buen camino':p>0?'💪 Completa más datos':'✨ Empieza a llenar tu CV';
        el.textContent = `📊 Completitud: ${p}% ${msg}`;
        el.style.backgroundColor = p===100?'#10b981':'rgba(255,255,255,0.15)';
    }
    window.refreshCompletion = update;
})();

// ==================== 7. NAVEGACIÓN Y RENDERIZADO PRINCIPAL ====================
let currentStep = 0, totalSteps = 10, selectedTemplate = 'classic', loadedTemplates = {};
const stepIndicator = document.getElementById('stepIndicator'), stepContent = document.getElementById('stepContent');

function loadTemplate(id){ return new Promise((res,rej)=>{ if(loadedTemplates[id]) return res(loadedTemplates[id]); const s=document.createElement('script'); s.src=`templates/${id}.js`; s.onload=()=>{ if(window.templateExports?.id===id){ loadedTemplates[id]=window.templateExports.render; res(loadedTemplates[id]); } else rej(new Error()); }; s.onerror=()=>rej(new Error()); document.head.appendChild(s); }); }
function updateIndicator(){ const steps=['📝 Datos Personales','💼 Experiencia','🎓 Educación','📞 Referencias','🏆 Logros','💻 Proyectos','🛠️ Habilidades','🌐 Idiomas','📜 Certificaciones','🎨 Plantilla & Vista Previa']; stepIndicator.innerHTML = steps.map((s,i)=>`<div class="step-badge ${i===currentStep?'active':''}">${s}</div>`).join(''); }
function goToStep(step){ if(step===currentStep) return; if(currentStep===0 && step>0 && !validatePersonalStep()) return; if(currentStep>=1 && currentStep<=8 && step>currentStep && !validateCurrentStepData(currentStep)) return; if(step>=0 && step<totalSteps){ currentStep=step; renderCurrentStep(); } }
function renderCurrentStep(){ const f = [renderPersonalStep,()=>renderDynamicStep('work','💼 Experiencia','➕ Agregar experiencia',2),()=>renderDynamicStep('edu','🎓 Educación','📘 Agregar estudio',3),()=>renderDynamicStep('ref','📞 Referencias','📇 Agregar referencia',4),()=>renderDynamicStep('achievements','🏆 Logros Destacados','➕ Agregar logro',5),()=>renderDynamicStep('projects','💻 Proyectos Personales','➕ Agregar proyecto',6),()=>renderDynamicStep('skills','🛠️ Habilidades','➕ Agregar habilidad',7),()=>renderDynamicStep('languages','🌐 Idiomas','➕ Agregar idioma',8),()=>renderDynamicStep('certifications','📜 Certificaciones','➕ Agregar certificación',9),renderPreviewAndTemplateStep]; f[currentStep](); updateIndicator(); window.refreshCompletion(); }

// ==================== 8. PASO 0: DATOS PERSONALES ====================
function renderPersonalStep(){
    const p = cvData.personal;
    const fields = ['fullName','jobTitle','birthDate','address','mobilePhone','homePhone','email','facebook','instagram','github'].map(f=>`<div class="form-group"><label>${f==='fullName'?'Nombre completo *':f==='jobTitle'?'Puesto deseado (opcional)':f==='birthDate'?'Fecha nacimiento':f==='mobilePhone'?'Teléfono celular *':f==='homePhone'?'Teléfono casa':f==='email'?'Correo electrónico *':f}</label><input type="${f==='birthDate'?'date':f==='email'?'email':'text'}" id="${f}" value="${window.escapeHtml(p[f]||'')}"></div>`).join('');
    stepContent.innerHTML = `<div style="display:flex;justify-content:space-between;gap:0.8rem;margin-bottom:1.5rem;flex-wrap:wrap;"><button id="resetDataBtn" class="danger" style="background:#dc2626;">🗑️ Borrar todo</button><div style="display:flex;gap:0.5rem;"><button id="exportDataBtn">💾 Exportar</button><label for="importFileInput" style="background:#10b981;color:white;padding:0.6rem 1.2rem;border-radius:40px;cursor:pointer;">📂 Cargar</label><input type="file" id="importFileInput" accept=".json" style="display:none;"></div></div><div class="form-grid">${fields}<div class="form-group" style="grid-column:1/-1;"><label>Resumen profesional / Perfil</label><textarea id="profileSummary" rows="3" placeholder="Breve descripción de tu perfil profesional...">${window.escapeHtml(p.profileSummary||'')}</textarea></div><div class="form-group"><label>📸 Foto</label><input type="file" id="photoUpload" accept="image/jpeg,image/png"><img id="photoPreview" class="photo-preview" src="${p.photoDataURL||`https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(p.fullName||'CV')}`}"></div></div><div class="nav-buttons"><button class="secondary" disabled>◀ Anterior</button><button id="nextStepBtn">Continuar ➤</button></div>`;
    ['fullName','jobTitle','birthDate','address','mobilePhone','homePhone','email','facebook','instagram','github'].forEach(id=>{ document.getElementById(id)?.addEventListener('input',e=>{ cvData.personal[id]=e.target.value; if(!cvData.personal.photoDataURL){ document.getElementById('photoPreview').src=`https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(cvData.personal.fullName||'CV')}`; } window.refreshCompletion(); }); });
    document.getElementById('profileSummary')?.addEventListener('input',e=>{ cvData.personal.profileSummary=e.target.value; window.refreshCompletion(); });
    document.getElementById('photoUpload')?.addEventListener('change',e=>{ if(e.target.files[0]){ const r=new FileReader(); r.onload=ev=>{ cvData.personal.photoDataURL=ev.target.result; document.getElementById('photoPreview').src=ev.target.result; window.refreshCompletion(); }; r.readAsDataURL(e.target.files[0]); } });
    document.getElementById('resetDataBtn')?.addEventListener('click',resetAllData);
    document.getElementById('exportDataBtn')?.addEventListener('click',exportData);
    document.getElementById('importFileInput')?.addEventListener('change',importData);
    document.getElementById('nextStepBtn')?.addEventListener('click',()=>{ if(validatePersonalStep()) goToStep(1); });
}

// ==================== 9. RENDERIZADO DE LISTAS DINÁMICAS ====================
function renderDynamicStep(key, title, addBtnText, nextStep){
    const cfg = listConfigs[key];
    stepContent.innerHTML = `<h2 style="margin-bottom:1rem;">${title}</h2><div id="${key}Container"></div><button id="add${key}Btn" class="add-button">${addBtnText}</button><div class="nav-buttons"><button id="prevBtn" class="secondary">◀ Anterior</button><button id="nextBtn">Continuar ➤</button></div>`;
    const container = document.getElementById(`${key}Container`);
    const render = ()=>renderDynamicItems(container, key);
    render();
    document.getElementById(`add${key}Btn`).onclick = ()=>{ cfg.array().push(key==='skills' || key==='achievements' ? '' : {...cfg.defaultItem}); render(); window.refreshCompletion(); };
    document.getElementById('prevBtn').onclick = ()=>goToStep(currentStep-1);
    document.getElementById('nextBtn').onclick = ()=>goToStep(nextStep);
}
function renderDynamicItems(container, key){
    const cfg = listConfigs[key], arr = cfg.array();
    container.innerHTML = '';
    arr.forEach((item,idx)=>{
        const card = document.createElement('div'); card.className = 'card-item';
        let fieldsHtml = `<div class="form-grid" style="grid-template-columns:${cfg.gridCols};">`;
        if(key==='skills' || key==='achievements'){
            fieldsHtml += `<div style="grid-column:1/-1;"><label>${key==='skills'?'Habilidad':'Logro'}</label><input type="text" data-field="value" data-idx="${idx}" value="${window.escapeHtml(item)}" placeholder="Ej: ${key==='skills'?'Python, Liderazgo':'Reduje tiempos de consulta en 30%'}"></div>`;
        } else {
            for(const f of cfg.fields){
                const val = item[f.name]??'';
                if(f.type==='select'){
                    const opts = f.options.map(o=>`<option value="${o}" ${val===o?'selected':''}>${o}</option>`).join('');
                    fieldsHtml += `<div><label>${f.label}</label><select data-field="${f.name}" data-idx="${idx}">${opts}</select></div>`;
                } else if(f.type==='textarea'){
                    fieldsHtml += `<div style="grid-column:1/-1;"><label>${f.label}</label><textarea data-field="${f.name}" data-idx="${idx}" rows="2" placeholder="${f.placeholder||''}">${window.escapeHtml(val)}</textarea></div>`;
                } else {
                    fieldsHtml += `<div><label>${f.label}</label><input type="text" data-field="${f.name}" data-idx="${idx}" value="${window.escapeHtml(val)}" placeholder="${f.placeholder||''}"></div>`;
                }
            }
        }
        fieldsHtml += '</div>';
        card.innerHTML = `<button class="remove-btn danger" data-idx="${idx}">🗑</button>${fieldsHtml}`;
        container.appendChild(card);
    });
    container.querySelectorAll('input, select, textarea').forEach(el=>{
        el.addEventListener('input',e=>{
            const i = parseInt(e.target.dataset.idx), f = e.target.dataset.field;
            if(isNaN(i)) return;
            if(key==='skills' || key==='achievements') arr[i] = e.target.value;
            else if(f) arr[i][f] = e.target.value;
            if(f==='phone' && e.target.value && !isValidPhone(e.target.value)) e.target.style.borderColor='red';
            else if(['startDate','endDate','periodStart','periodEnd'].includes(f) && e.target.value && !isValidYearPeriod(e.target.value)) e.target.style.borderColor='red';
            else e.target.style.borderColor='';
            window.refreshCompletion();
        });
    });
    container.querySelectorAll('.remove-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
            const i = parseInt(btn.dataset.idx);
            if(arr.length > cfg.minItems) arr.splice(i,1);
            else if(cfg.emptyMsg) alert(cfg.emptyMsg);
            renderDynamicItems(container, key);
            window.refreshCompletion();
        });
    });
}

// ==================== 10. EXPORTAR / IMPORTAR / RESET ====================
function exportData(){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(JSON.parse(JSON.stringify(cvData)),null,2)],{type:'application/json'})); a.download=`${cvData.personal.fullName?.replace(/\s/g,'_')||'cv_data'}.json`; a.click(); alert('✅ Datos exportados.'); window.forceSave(); }
function importData(e){ const file=e.target.files[0]; if(!file) return; const r=new FileReader(); r.onload=ev=>{ try{ const imp=JSON.parse(ev.target.result); if(imp.personal && imp.workExperiences && imp.educationList && imp.references){ Object.assign(cvData,imp); if(!cvData.workExperiences.length) cvData.workExperiences=[{...listConfigs.work.defaultItem}]; if(!cvData.educationList.length) cvData.educationList=[{...listConfigs.edu.defaultItem}]; if(!cvData.achievements) cvData.achievements=[]; if(!cvData.projects) cvData.projects=[]; ['skills','languages','certifications'].forEach(k=>{ if(!cvData[k]) cvData[k]=[]; }); if(cvData.personal.profileSummary===undefined) cvData.personal.profileSummary=''; if(cvData.personal.jobTitle===undefined) cvData.personal.jobTitle=''; currentStep=0; renderCurrentStep(); alert('✅ Datos importados.'); window.forceSave(); window.refreshCompletion(); } else alert('❌ Formato incorrecto.'); } catch{ alert('❌ Error al leer archivo.'); } e.target.value=''; }; r.readAsText(file); }
function resetAllData(){ if(confirm('⚠️ ¿Borrar todos los datos? No se puede deshacer.')){ cvData.personal={ fullName:'', jobTitle:'', birthDate:'', address:'', mobilePhone:'', homePhone:'', email:'', facebook:'', instagram:'', github:'', photoDataURL:'', profileSummary:'' }; cvData.workExperiences=[{...listConfigs.work.defaultItem}]; cvData.educationList=[{...listConfigs.edu.defaultItem}]; cvData.references=[]; cvData.achievements=[]; cvData.projects=[]; cvData.skills=[]; cvData.languages=[]; cvData.certifications=[]; currentStep=0; renderCurrentStep(); alert('✅ Datos eliminados.'); window.forceSave(); window.refreshCompletion(); } }

// ==================== 11. VISTA PREVIA Y SELECCIÓN DE PLANTILLA ====================
async function renderPreviewAndTemplateStep(){
    const templates = window.cvTemplatesList || [];
    if(!templates.length){ stepContent.innerHTML='<div>Error: No se encontraron plantillas.</div>'; return; }
    stepContent.innerHTML = `<div style="display:flex;justify-content:space-between;gap:0.8rem;flex-wrap:wrap;margin-bottom:1rem;"><button id="resetBtn2" class="danger" style="background:#dc2626;">🗑️ Borrar todo</button><div style="display:flex;gap:0.5rem;"><button id="exportBtn2">💾 Exportar</button><label for="importFile2" style="background:#10b981;color:white;padding:0.6rem 1.2rem;border-radius:40px;cursor:pointer;">📂 Cargar</label><input type="file" id="importFile2" accept=".json" style="display:none;"></div></div>
        <div class="ats-tips" style="background:#eef2ff; border-left:4px solid #3b82f6; padding:1rem; margin-bottom:1rem; border-radius:8px;">
            <strong>🤖 Consejos ATS para mejorar tu puntuación:</strong>
            <ul style="margin:0.5rem 0 0 1rem;">
                <li>📌 Usa esta plantilla <strong>ATS Pro</strong> para máxima compatibilidad.</li>
                <li>📊 Cuantifica tus logros: “Reduje tiempos en 30%”, “Aumenté ventas un 20%”.</li>
                <li>🔍 Incluye keywords de la oferta: SQL, Oracle, Power BI, Python, metodologías ágiles, etc.</li>
                <li>📄 Guarda siempre como PDF nativo desde el botón “Imprimir / Guardar PDF”.</li>
                <li>🧹 Evita columnas, tablas complejas y gráficos. Mantén una sola columna.</li>
            </ul>
        </div>
        <div class="template-selector">${templates.map(t=>`<div data-template="${t.id}" class="template-option ${selectedTemplate===t.id?'selected':''}">${t.icono} ${t.nombre}</div>`).join('')}</div>
        <div id="livePreview" class="cv-preview"></div>
        <div class="nav-buttons" style="margin-top:1.5rem;"><button id="prevStepBtn" class="secondary">◀ Editar</button><button id="printBtn">🖨️ Imprimir / Guardar PDF</button></div>`;
    document.getElementById('resetBtn2')?.addEventListener('click',resetAllData);
    document.getElementById('exportBtn2')?.addEventListener('click',exportData);
    document.getElementById('importFile2')?.addEventListener('change',importData);
    document.querySelectorAll('.template-option').forEach(opt=>opt.addEventListener('click',async e=>{ selectedTemplate=e.currentTarget.dataset.template; await loadTemplate(selectedTemplate); renderPreviewAndTemplateStep(); }));
    await updatePreview();
    document.getElementById('prevStepBtn')?.addEventListener('click',()=>goToStep(8)); // Corregido: ahora va a certificaciones (paso 8)
    document.getElementById('printBtn')?.addEventListener('click',printCV);
}
async function updatePreview(){ const preview=document.getElementById('livePreview'); if(preview){ try{ const render=await loadTemplate(selectedTemplate); preview.innerHTML=render(cvData); } catch{ preview.innerHTML='<p style="color:red;">Error cargando plantilla.</p>'; } } }

// ==================== 12. IMPRIMIR ====================
async function printCV(){
    try{
        const render = await loadTemplate(selectedTemplate);
        const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV ${window.escapeHtml(cvData.personal.fullName||'')}</title><style>@page{margin:1.2cm 0.8cm;size:A4;}body{margin:0;padding:0;background:white;font-family:'Segoe UI',Roboto,sans-serif;}.cv-section{break-inside:avoid;}img{max-width:100%;height:auto;}h1,h2,h3{break-after:avoid;}</style></head><body>${render(cvData)}<script>window.onload=function(){window.print();setTimeout(()=>window.close(),2000);};<\/script></body></html>`;
        const w = window.open('','_blank','width=900,height=700');
        if(w){ w.document.write(html); w.document.close(); }
        else alert('⚠️ Permite ventanas emergentes para imprimir.');
    } catch(e){ alert('Error al preparar la impresión.'); }
}

// ==================== 13. INICIO ====================
renderCurrentStep();