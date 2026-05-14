// ========== ESTADO GLOBAL ==========
let cvData = {
    personal: {
        fullName: "", birthDate: "", address: "", mobilePhone: "", homePhone: "", email: "",
        facebook: "", instagram: "", github: "", photoDataURL: "", profileSummary: ""
    },
    workExperiences: [],
    educationList: [],
    references: []
};

// Configuración de listas dinámicas (DRY)
const listConfigs = {
    work: {
        array: () => cvData.workExperiences,
        defaultItem: { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
        minItems: 1,
        emptyMessage: "Debe tener al menos una experiencia",
        fields: [
            { name: "jobTitle", label: "Cargo", type: "text", placeholder: "Ej: Desarrollador Frontend", maxLength: 100 },
            { name: "company", label: "Empresa", type: "text", placeholder: "Nombre de la empresa", maxLength: 100 },
            { name: "startDate", label: "Desde", type: "text", placeholder: "2020 o Ene 2020" },
            { name: "endDate", label: "Hasta", type: "text", placeholder: "2023 o Actualidad" },
            { name: "description", label: "Descripción", type: "textarea", placeholder: "Logros, responsabilidades...", maxLength: 500, fullWidth: true }
        ],
        gridCols: "1fr 1fr"
    },
    edu: {
        array: () => cvData.educationList,
        defaultItem: { study: "", institution: "", periodStart: "", periodEnd: "", status: "finalizado", duration: "", description: "" },
        minItems: 1,
        emptyMessage: "Debe tener al menos un estudio",
        fields: [
            { name: "study", label: "Estudio", type: "text", placeholder: "Ingeniería, Bootcamp...", maxLength: 100 },
            { name: "institution", label: "Institución", type: "text", placeholder: "Universidad, plataforma", maxLength: 100 },
            { name: "periodStart", label: "Desde", type: "text", placeholder: "2020" },
            { name: "periodEnd", label: "Hasta", type: "text", placeholder: "2023" },
            { name: "status", label: "Estado", type: "select", options: ["finalizado", "en curso"] },
            { name: "duration", label: "Duración", type: "text", placeholder: "200 horas / 6 meses", maxLength: 50 },
            { name: "description", label: "Descripción", type: "textarea", placeholder: "Logros, materias...", maxLength: 500, fullWidth: true }
        ],
        gridCols: "1fr 1fr"
    },
    ref: {
        array: () => cvData.references,
        defaultItem: { name: "", phone: "", relation: "" },
        minItems: 0,
        emptyMessage: null,
        fields: [
            { name: "name", label: "Nombre", type: "text", placeholder: "Nombre completo", maxLength: 100 },
            { name: "phone", label: "Teléfono", type: "tel", placeholder: "+123456789" },
            { name: "relation", label: "Relación", type: "text", placeholder: "Ex jefe, compañero...", maxLength: 100 }
        ],
        gridCols: "1fr 1fr 1fr"
    }
};

// Inicializar con una entrada vacía
cvData.workExperiences.push({ ...listConfigs.work.defaultItem });
cvData.educationList.push({ ...listConfigs.edu.defaultItem });

let currentStep = 0;
const totalSteps = 5;
let selectedTemplate = "classic";
let loadedTemplates = {};

const stepIndicatorDiv = document.getElementById("stepIndicator");
const stepContentDiv = document.getElementById("stepContent");

// ========== FUNCIONES AUXILIARES ==========
function escapeHtml(str) { return !str ? '' : str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m])); }

function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// ========== VALIDADORES ==========
function isValidPhone(phone) {
    if (!phone) return true;
    const cleaned = phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^\+?[0-9]{6,15}$/;
    return phoneRegex.test(cleaned);
}

function isValidYearPeriod(value) {
    if (!value.trim()) return true;
    return /^[a-zA-Z0-9\-\sáéíóúüñÑ]+$/.test(value.trim());
}

function isEndDateAfterStart(startVal, endVal) {
    if (!startVal || !endVal) return true;
    if (endVal.toLowerCase() === 'actualidad') return true;
    const startYearMatch = startVal.match(/\b(19|20)\d{2}\b/);
    const endYearMatch = endVal.match(/\b(19|20)\d{2}\b/);
    if (!startYearMatch || !endYearMatch) return true;
    const startYear = parseInt(startYearMatch[0]);
    const endYear = parseInt(endYearMatch[0]);
    return endYear >= startYear;
}

function validateDynamicItem(item, fields) {
    for (let f of fields) {
        const value = item[f.name] || '';
        if (f.name === 'startDate' || f.name === 'endDate' || f.name === 'periodStart' || f.name === 'periodEnd') {
            if (!isValidYearPeriod(value)) {
                alert(`El campo "${f.label}" contiene caracteres no permitidos.`);
                return false;
            }
        }
        if (f.name === 'endDate' && item.startDate && !isEndDateAfterStart(item.startDate, value)) {
            alert(`La fecha de fin (${value}) no puede ser anterior a la de inicio (${item.startDate}).`);
            return false;
        }
        if (f.name === 'periodEnd' && item.periodStart && !isEndDateAfterStart(item.periodStart, value)) {
            alert(`La fecha de fin (${value}) no puede ser anterior a la de inicio (${item.periodStart}).`);
            return false;
        }
        if (f.type === 'textarea' && value.length > (f.maxLength || 500)) {
            alert(`El campo "${f.label}" excede el máximo de ${f.maxLength || 500} caracteres.`);
            return false;
        }
        if (f.type === 'text' && f.maxLength && value.length > f.maxLength) {
            alert(`El campo "${f.label}" excede el máximo de ${f.maxLength} caracteres.`);
            return false;
        }
        if (f.name === 'phone' && value && !isValidPhone(value)) {
            alert(`Teléfono "${value}" no válido.`);
            return false;
        }
    }
    return true;
}

function validateCurrentStepData() {
    if (currentStep === 1) {
        for (let exp of cvData.workExperiences) {
            if (!validateDynamicItem(exp, listConfigs.work.fields)) return false;
        }
    } else if (currentStep === 2) {
        for (let edu of cvData.educationList) {
            if (!validateDynamicItem(edu, listConfigs.edu.fields)) return false;
        }
    } else if (currentStep === 3) {
        for (let ref of cvData.references) {
            if (ref.name || ref.phone || ref.relation) {
                if (!validateDynamicItem(ref, listConfigs.ref.fields)) return false;
            }
        }
    }
    return true;
}

function validatePersonalStep() {
    const p = cvData.personal;
    if (!p.fullName.trim()) { alert("❌ Nombre completo obligatorio."); return false; }
    if (!p.email.trim() || !p.email.includes("@")) { alert("❌ Correo válido requerido."); return false; }
    if (!p.mobilePhone.trim()) { alert("❌ Teléfono celular obligatorio."); return false; }
    if (!isValidPhone(p.mobilePhone)) { alert("❌ Teléfono celular no válido (solo números, espacios, guiones, +)."); return false; }
    if (p.homePhone && !isValidPhone(p.homePhone)) { alert("❌ Teléfono casa no válido."); return false; }
    return true;
}

// ========== CARGA DINÁMICA DE PLANTILLAS ==========
function loadTemplate(templateId) {
    return new Promise((resolve, reject) => {
        if (loadedTemplates[templateId]) {
            resolve(loadedTemplates[templateId]);
            return;
        }
        const script = document.createElement('script');
        script.src = `templates/${templateId}.js`;
        script.onload = () => {
            if (window.templateExports && window.templateExports.id === templateId) {
                loadedTemplates[templateId] = window.templateExports.render;
                resolve(window.templateExports.render);
            } else {
                reject(new Error(`La plantilla ${templateId} no se registró correctamente`));
            }
        };
        script.onerror = () => reject(new Error(`No se pudo cargar la plantilla ${templateId}`));
        document.head.appendChild(script);
    });
}

// ========== INDICADOR DE PASO ==========
function updateIndicator() {
    const stepsNames = ["📝 Datos Personales", "💼 Experiencia Laboral", "🎓 Educación", "📞 Referencias", "🎨 Plantilla & Vista Previa"];
    stepIndicatorDiv.innerHTML = stepsNames.map((name, idx) => `<div class="step-badge ${idx === currentStep ? 'active' : ''}">${name}</div>`).join('');
}

function goToStep(step) {
    if (step === currentStep) return;
    if (currentStep === 0 && step > 0 && !validatePersonalStep()) return;
    if ((currentStep === 1 || currentStep === 2 || currentStep === 3) && step > currentStep && !validateCurrentStepData()) return;
    if (step >= 0 && step < totalSteps) {
        currentStep = step;
        renderCurrentStep();
    }
}

function renderCurrentStep() {
    if (currentStep === 0) renderPersonalStep();
    else if (currentStep === 1) renderDynamicListStep("work", "Experiencia Laboral", "➕ Agregar experiencia", 2);
    else if (currentStep === 2) renderDynamicListStep("edu", "Educación", "📘 Agregar estudio", 3);
    else if (currentStep === 3) renderDynamicListStep("ref", "Referencias", "📇 Agregar referencia", 4);
    else if (currentStep === 4) renderPreviewAndTemplateStep();
    updateIndicator();
}

// ========== MANEJO DE LISTAS DINÁMICAS ==========
function renderDynamicListStep(listKey, title, addButtonText, nextStep) {
    const cfg = listConfigs[listKey];
    const html = `
        <div id="${listKey}Container"></div>
        <button id="add${listKey}Btn" class="add-button">${addButtonText}</button>
        <div class="nav-buttons">
            <button id="prevStep${currentStep-1}" class="secondary">◀ Anterior</button>
            <button id="nextStep${nextStep}" class="">Continuar ➤</button>
        </div>
    `;
    stepContentDiv.innerHTML = html;
    const container = document.getElementById(`${listKey}Container`);
    const render = () => renderDynamicItems(container, listKey);
    render();
    document.getElementById(`add${listKey}Btn`).onclick = () => { cfg.array().push({ ...cfg.defaultItem }); render(); };
    document.getElementById(`prevStep${currentStep-1}`).onclick = () => goToStep(currentStep-1);
    document.getElementById(`nextStep${nextStep}`).onclick = () => goToStep(nextStep);
}

function renderDynamicItems(container, listKey) {
    const cfg = listConfigs[listKey];
    const array = cfg.array();
    container.innerHTML = '';
    array.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'card-item';
        let fieldsHtml = `<div class="form-grid" style="grid-template-columns: ${cfg.gridCols};">`;
        for (let f of cfg.fields) {
            const value = item[f.name] ?? '';
            if (f.type === 'select') {
                const options = f.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('');
                fieldsHtml += `<div><label>${f.label}</label><select data-field="${f.name}" data-idx="${idx}">${options}</select></div>`;
            } else if (f.type === 'textarea') {
                fieldsHtml += `<div style="grid-column:1/-1;"><label>${f.label}</label><textarea data-field="${f.name}" data-idx="${idx}" rows="2" placeholder="${f.placeholder || ''}" maxlength="${f.maxLength || 500}">${escapeHtml(value)}</textarea><small style="display:block; text-align:right; font-size:0.7rem;">${value.length}/${f.maxLength || 500}</small></div>`;
            } else {
                fieldsHtml += `<div><label>${f.label}</label><input type="${f.type}" data-field="${f.name}" data-idx="${idx}" value="${escapeHtml(value)}" placeholder="${f.placeholder || ''}" ${f.maxLength ? `maxlength="${f.maxLength}"` : ''}></div>`;
            }
        }
        fieldsHtml += `</div>`;
        card.innerHTML = `<button class="remove-btn danger" data-idx="${idx}">🗑</button>${fieldsHtml}`;
        container.appendChild(card);
    });
    container.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            const field = e.target.dataset.field;
            if (!isNaN(idx) && field) {
                array[idx][field] = e.target.value;
                if (field === 'phone' && !isValidPhone(e.target.value) && e.target.value) {
                    e.target.style.borderColor = 'red';
                } else if ((field === 'startDate' || field === 'endDate' || field === 'periodStart' || field === 'periodEnd') && !isValidYearPeriod(e.target.value) && e.target.value) {
                    e.target.style.borderColor = 'red';
                } else {
                    e.target.style.borderColor = '';
                }
            }
        });
        el.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            const field = e.target.dataset.field;
            if (field === 'phone' && !isValidPhone(e.target.value) && e.target.value) {
                alert('Formato de teléfono no válido');
                e.target.style.borderColor = 'red';
            } else if ((field === 'startDate' || field === 'endDate' || field === 'periodStart' || field === 'periodEnd') && !isValidYearPeriod(e.target.value) && e.target.value) {
                alert('Caracteres no permitidos en la fecha');
                e.target.style.borderColor = 'red';
            } else {
                e.target.style.borderColor = '';
            }
        });
    });
    container.querySelectorAll('select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            const field = e.target.dataset.field;
            if (!isNaN(idx) && field) array[idx][field] = e.target.value;
        });
    });
    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            if (array.length > cfg.minItems) array.splice(idx, 1);
            else if (cfg.emptyMessage) alert(cfg.emptyMessage);
            renderDynamicItems(container, listKey);
        });
    });
}

// ========== PASO 0: DATOS PERSONALES ==========
function renderPersonalStep() {
    const p = cvData.personal;
    const html = `
        <div style="display: flex; justify-content: space-between; gap: 0.8rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <button id="resetDataBtnPersonal" class="danger" style="background:#dc2626;">🗑️ Borrar todo</button>
            <div style="display: flex; gap: 0.5rem;">
                <button id="exportDataBtnPersonal" class="outline">💾 Exportar</button>
                <label for="importFileInputPersonal" class="outline" style="background:#10b981; color:white; padding:0.6rem 1.2rem; border-radius:40px; cursor:pointer;">📂 Cargar</label>
                <input type="file" id="importFileInputPersonal" accept=".json" style="display: none;">
            </div>
        </div>
        <div class="form-grid">
            ${['fullName','birthDate','address','mobilePhone','homePhone','email','facebook','instagram','github'].map(f => {
                let label = f === 'fullName' ? 'Nombre completo *' : f === 'birthDate' ? 'Fecha nacimiento' : f === 'mobilePhone' ? 'Teléfono celular *' : f === 'homePhone' ? 'Teléfono casa' : f === 'email' ? 'Correo electrónico *' : f;
                let type = f === 'birthDate' ? 'date' : (f === 'email' ? 'email' : 'text');
                return `<div class="form-group"><label>${label}</label><input type="${type}" id="${f}" value="${escapeHtml(p[f])}" ${f === 'mobilePhone' ? 'required' : ''}></div>`;
            }).join('')}
            <div class="form-group" style="grid-column:1/-1;"><label>Resumen profesional / Perfil</label><textarea id="profileSummary" rows="3" maxlength="500" placeholder="Breve descripción de tu perfil profesional...">${escapeHtml(p.profileSummary)}</textarea></div>
            <div class="form-group photo-area"><label>📸 Foto</label><input type="file" id="photoUpload" accept="image/jpeg,image/png"><div><img id="photoPreview" class="photo-preview" src="${p.photoDataURL || 'https://ui-avatars.com/api/?background=3b82f6&color=fff&name=' + encodeURIComponent(p.fullName || 'CV')}"></div></div>
        </div>
        <div class="nav-buttons"><button class="secondary" disabled>◀ Anterior</button><button id="nextStepBtn">Continuar ➤</button></div>
    `;
    stepContentDiv.innerHTML = html;

    document.getElementById('resetDataBtnPersonal')?.addEventListener('click', resetAllData);
    document.getElementById('exportDataBtnPersonal')?.addEventListener('click', exportData);
    document.getElementById('importFileInputPersonal')?.addEventListener('change', importData);

    const personalFields = ['fullName','birthDate','address','mobilePhone','homePhone','email','facebook','instagram','github'];
    personalFields.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            el.addEventListener('input', (e) => { cvData.personal[f] = e.target.value; updatePhotoPreview(); });
            if (f === 'mobilePhone' || f === 'homePhone') {
                el.addEventListener('change', (e) => {
                    if (!isValidPhone(e.target.value) && e.target.value) {
                        alert('Formato de teléfono no válido.');
                        e.target.style.borderColor = 'red';
                    } else {
                        e.target.style.borderColor = '';
                    }
                });
            }
        }
    });
    document.getElementById('profileSummary')?.addEventListener('input', (e) => { cvData.personal.profileSummary = e.target.value; });
    document.getElementById('photoUpload')?.addEventListener('change', e => {
        if(e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => { cvData.personal.photoDataURL = ev.target.result; document.getElementById('photoPreview').src = ev.target.result; };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    function updatePhotoPreview() {
        const preview = document.getElementById('photoPreview');
        if(preview && !cvData.personal.photoDataURL) preview.src = `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(cvData.personal.fullName || 'CV')}`;
    }
    document.getElementById('nextStepBtn')?.addEventListener('click', () => { if(validatePersonalStep()) goToStep(1); });
}

// ========== IMPORTAR / EXPORTAR / RESET ==========
function exportData() {
    const dataToExport = JSON.parse(JSON.stringify(cvData));
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const nombreArchivo = cvData.personal.fullName ? cvData.personal.fullName.replace(/\s/g, '_') : 'cv_data';
    a.download = `${nombreArchivo}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("✅ Datos exportados.");
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.personal && importedData.workExperiences && importedData.educationList && importedData.references) {
                cvData = importedData;
                if (!cvData.workExperiences.length) cvData.workExperiences.push({ ...listConfigs.work.defaultItem });
                if (!cvData.educationList.length) cvData.educationList.push({ ...listConfigs.edu.defaultItem });
                if (cvData.personal.profileSummary === undefined) cvData.personal.profileSummary = "";
                currentStep = 0;
                renderCurrentStep();
                alert("✅ Datos importados.");
            } else alert("❌ Formato incorrecto.");
        } catch (error) { alert("❌ Error al leer archivo."); }
        event.target.value = '';
    };
    reader.readAsText(file);
}

function resetAllData() {
    if (confirm("⚠️ ¿Borrar todos los datos? No se puede deshacer.")) {
        cvData = {
            personal: { fullName: "", birthDate: "", address: "", mobilePhone: "", homePhone: "", email: "", facebook: "", instagram: "", github: "", photoDataURL: "", profileSummary: "" },
            workExperiences: [],
            educationList: [],
            references: []
        };
        cvData.workExperiences.push({ ...listConfigs.work.defaultItem });
        cvData.educationList.push({ ...listConfigs.edu.defaultItem });
        currentStep = 0;
        renderCurrentStep();
        alert("✅ Todos los datos eliminados.");
    }
}

// ========== PASO FINAL: SELECTOR DE PLANTILLAS Y VISTA PREVIA ==========
function renderPreviewAndTemplateStep() {
    const templatesList = window.cvTemplatesList || [];
    if (templatesList.length === 0) {
        stepContentDiv.innerHTML = '<div>Error: No se encontraron plantillas. Asegúrate de que el archivo templates/config.js esté cargado correctamente.</div>';
        return;
    }
    const selectorHtml = templatesList.map(t => 
        `<div data-template="${t.id}" class="template-option ${selectedTemplate === t.id ? 'selected' : ''}">${t.icono} ${t.nombre}</div>`
    ).join('');
    const html = `
        <div style="display: flex; justify-content: space-between; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <button id="resetDataBtnFinal" class="danger" style="background:#dc2626;">🗑️ Borrar todo</button>
            <div style="display: flex; gap: 0.5rem;">
                <button id="exportDataBtnFinal" class="outline">💾 Exportar</button>
                <label for="importFileInputFinal" style="background:#10b981; color:white; padding:0.6rem 1.2rem; border-radius:40px; cursor:pointer;">📂 Cargar</label>
                <input type="file" id="importFileInputFinal" accept=".json" style="display:none;">
            </div>
        </div>
        <div class="template-selector" id="templateSelector">
            ${selectorHtml}
        </div>
        <div id="livePreview" class="cv-preview"></div>
        <div class="nav-buttons"><button id="prevStep3" class="secondary">◀ Editar</button><button id="printBtn">🖨️ Imprimir</button></div>
    `;
    stepContentDiv.innerHTML = html;
    
    document.getElementById('resetDataBtnFinal')?.addEventListener('click', resetAllData);
    document.getElementById('exportDataBtnFinal')?.addEventListener('click', exportData);
    document.getElementById('importFileInputFinal')?.addEventListener('change', importData);
    
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.addEventListener('click', async (e) => {
            const newTemplate = e.currentTarget.dataset.template;
            selectedTemplate = newTemplate;
            try {
                await loadTemplate(newTemplate);
                renderPreviewAndTemplateStep();
            } catch (err) {
                console.error(err);
                alert('Error al cargar la plantilla');
            }
        });
    });
    updatePreview();
    document.getElementById('prevStep3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('printBtn')?.addEventListener('click', () => printCV());
}

async function updatePreview() {
    const previewDiv = document.getElementById('livePreview');
    if (previewDiv && selectedTemplate) {
        try {
            const renderFn = await loadTemplate(selectedTemplate);
            previewDiv.innerHTML = renderFn(cvData);
        } catch (err) {
            previewDiv.innerHTML = '<p>Error cargando la plantilla</p>';
        }
    }
}

async function printCV() {
    try {
        const renderFn = await loadTemplate(selectedTemplate);
        const cvHTML = renderFn(cvData);
        const printStyles = `
            @page { margin: 1.2cm 0.8cm; size: A4; }
            body { margin: 0; padding: 0; background: white; font-family: 'Segoe UI', Roboto, sans-serif; }
            .cv-container { max-width: 100%; margin: 0 auto; }
            .cv-section { break-inside: avoid; page-break-inside: avoid; }
            h1, h2, h3 { break-after: avoid; }
            img { max-width: 100%; height: auto; break-inside: avoid; }
            @media print { body { margin: 0; padding: 0; } }
        `;
        const printDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV ${escapeHtml(cvData.personal.fullName||'')}</title><style>${printStyles}</style></head><body><div class="cv-container">${cvHTML}</div><script>window.onload=function(){window.print();setTimeout(()=>window.close(),1000);};<\/script></body></html>`;
        const w = window.open('', '_blank', 'width=900,height=700');
        if (w) { w.document.write(printDoc); w.document.close(); } else alert("Permite ventanas emergentes.");
    } catch (err) {
        alert('Error al generar la vista de impresión');
    }
}

// Iniciar aplicación
renderCurrentStep();