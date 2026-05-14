// Plantilla Moderna
window.templateExports = {
    id: "modern",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName || 'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("modern", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("modern", references);
        
        return `<div class="template-modern" style="font-family:'Inter',system-ui; max-width:900px; margin:0 auto; background:linear-gradient(145deg,#f0f4f8 0%,#ffffff 100%); border-radius:24px; padding:2rem; box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);">
            <div class="cv-section" style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem;">
                <div><h1 style="color:#0f2b3d; margin:0 0 0.5rem;">${escapeHtml(personal.fullName)}</h1>
                <p>${formattedBirth || ''} · ${escapeHtml(personal.address)}<br>
                <strong>📞</strong> ${escapeHtml(personal.mobilePhone)} | <strong>🏠</strong> ${escapeHtml(personal.homePhone)}<br>
                <strong>✉️</strong> ${escapeHtml(personal.email)}</p>${socialHtml}</div>
                <img src="${photoUrl}" style="width:130px;height:130px;border-radius:30px;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            </div>
            ${profile ? `<div class="cv-section" style="background:white; border-radius:20px; padding:1.2rem; margin-bottom:1rem;"><h3 style="color:#0f2b3d;">Perfil profesional</h3><p>${escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section" style="background:white; border-radius:20px; padding:1.2rem; margin-bottom:1rem;"><h3 style="color:#0f2b3d;">💼 Experiencia</h3>${workHtml}</div>
            <div class="cv-section" style="background:white; border-radius:20px; padding:1.2rem; margin-bottom:1rem;"><h3 style="color:#0f2b3d;">🎓 Educación</h3>${eduHtml}</div>
            <div class="cv-section" style="background:white; border-radius:20px; padding:1.2rem;"><h3 style="color:#0f2b3d;">📞 Referencias</h3>${refHtml}</div>
        </div>`;
    }
};