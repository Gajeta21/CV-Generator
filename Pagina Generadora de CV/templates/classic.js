// Plantilla Clásica
window.templateExports = {
    id: "classic",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("classic", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("classic", references);
        
        return `<div class="template-classic" style="font-family:'Georgia',serif; max-width:900px; margin:0 auto; background:#ffffff; padding:1.5rem; border:1px solid #d1d5db; border-top:6px solid #1e3a5f;">
            <div class="cv-section" style="display:flex; gap:2rem; flex-wrap:wrap; border-bottom:1px solid #e5e7eb; padding-bottom:1rem; margin-bottom:1rem;">
                <img src="${photoUrl}" style="width:120px;height:120px;border-radius:50%;border:3px solid #1e3a5f;">
                <div><h1 style="color:#1e3a5f; margin:0 0 0.5rem;">${escapeHtml(personal.fullName)}</h1>
                <p><strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'}<br>
                <strong>Dirección:</strong> ${escapeHtml(personal.address)}<br>
                <strong>Teléfono celular:</strong> ${escapeHtml(personal.mobilePhone)} | <strong>Teléfono casa:</strong> ${escapeHtml(personal.homePhone)}<br>
                <strong>Correo electrónico:</strong> ${escapeHtml(personal.email)}</p>${socialHtml}</div>
            </div>
            ${profile ? `<div class="cv-section" style="margin:1rem 0;"><h3 style="color:#1e3a5f;">Perfil profesional</h3><p>${escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section"><h3 style="color:#1e3a5f;">💼 Experiencia laboral</h3>${workHtml}</div>
            <div class="cv-section"><h3 style="color:#1e3a5f;">🎓 Educación</h3>${eduHtml}</div>
            <div class="cv-section"><h3 style="color:#1e3a5f;">📞 Referencias</h3>${refHtml}</div>
        </div>`;
    }
};