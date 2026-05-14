// Plantilla Minimalista (sin emojis)
window.templateExports = {
    id: "minimal",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName || 'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("minimal", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("minimal", references);
        
        return `<div class="template-minimal" style="font-family:'Courier New', monospace; max-width:900px; margin:0 auto; background:white; padding:1.2rem; border-left:5px solid #2c5282;">
            <div class="cv-section" style="display:flex; gap:1rem; align-items:center; border-bottom:1px solid #ccc; padding-bottom:1rem; margin-bottom:1rem;">
                <img src="${photoUrl}" style="width:70px;height:70px;border-radius:50%;">
                <div><h1 style="font-size:1.8rem; margin:0;">${escapeHtml(personal.fullName)}</h1>
                <p style="margin:0.3rem 0 0; font-size:0.8rem;"><strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'} | <strong>Dirección:</strong> ${escapeHtml(personal.address)}<br>
                <strong>Teléfono celular:</strong> ${escapeHtml(personal.mobilePhone)} ${personal.homePhone ? '| <strong>Teléfono casa:</strong> '+escapeHtml(personal.homePhone) : ''}<br>
                <strong>Correo electrónico:</strong> ${escapeHtml(personal.email)}</p>${socialHtml}</div>
            </div>
            ${profile ? `<div class="cv-section" style="margin-bottom:1rem;"><h3>Perfil</h3><p>${escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section"><h3>Experiencia laboral</h3>${workHtml}</div>
            <div class="cv-section"><h3>Educación</h3>${eduHtml}</div>
            <div class="cv-section"><h3>Referencias</h3>${refHtml}</div>
        </div>`;
    }
};