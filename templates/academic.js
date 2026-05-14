// Plantilla Académica (estilo publicación, marfil y azul pizarra)
window.templateExports = {
    id: "academic",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName || 'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("academic", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("academic", references);
        
        return `<div class="template-academic" style="font-family:'Garamond', serif; max-width:900px; margin:0 auto; background:#fef9e8; padding:1.8rem; border:1px solid #cbd5e1; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <div class="cv-section" style="text-align:center; margin-bottom:1rem;">
                <img src="${photoUrl}" style="width:110px;height:110px;border-radius:50%; border:2px solid #475569;">
                <h1 style="color:#1e293b; margin:0.5rem 0 0;">${escapeHtml(personal.fullName)}</h1>
                <p style="color:#475569;">📧 ${escapeHtml(personal.email)} | 📞 ${escapeHtml(personal.mobilePhone)} | ${escapeHtml(personal.address)}<br>${formattedBirth ? `Nacimiento: ${formattedBirth}` : ''}</p>
                <hr style="border-top:2px solid #94a3b8; width:80px; margin:0.5rem auto;">
            </div>
            ${profile ? `<div class="cv-section" style="margin:1rem 0;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.5rem;">Resumen profesional</h2><p>${escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.5rem;">Formación académica</h2>${eduHtml}</div>
            <div class="cv-section"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.5rem;">Trayectoria profesional</h2>${workHtml}</div>
            <div class="cv-section"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.5rem;">Referencias</h2>${refHtml}</div>
            <div style="text-align:center; margin-top:1.5rem; border-top:1px solid #e2e8f0; padding-top:0.8rem; font-size:0.8rem; color:#64748b;">${socialHtml}</div>
        </div>`;
    }
};