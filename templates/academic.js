window.templateExports = {
    id: "academic",
    render: (data) => {
        const { personal, workExperiences, educationList, references, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("academic", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("academic", references);

        return `<div class="template-academic" style="font-family:'Garamond', serif; max-width:950px; margin:0 auto; background:#fef9e8; padding:2rem; border:1px solid #cbd5e1; box-shadow:0 4px 12px rgba(0,0,0,0.02);">
            <div class="cv-section" style="text-align:center; margin-bottom:1.5rem;">
                <img src="${photoUrl}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border:2px solid #475569;">
                <h1 style="color:#1e293b; margin:0.8rem 0 0.2rem 0;">${window.escapeHtml(personal.fullName)}</h1>
                <p style="color:#475569; font-size:1rem;">
                    📧 ${window.escapeHtml(personal.email)} | 📞 ${window.escapeHtml(personal.mobilePhone)} | 📍 ${window.escapeHtml(personal.address)}<br>
                    ${formattedBirth ? `🎂 Nacimiento: ${formattedBirth}` : ''}
                </p>
                <hr style="border-top:2px solid #94a3b8; width:100px; margin:0.5rem auto;">
            </div>
            ${profile ? `<div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">📄 Resumen profesional</h2><p>${window.escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">🎓 Formación académica</h2>${eduHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">💼 Trayectoria profesional</h2>${workHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">🛠️ Habilidades</h2>${skillsHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">🌐 Idiomas</h2>${languagesHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">📜 Certificaciones</h2>${certsHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h2 style="color:#1e293b; border-left:4px solid #475569; padding-left:0.8rem;">📞 Referencias</h2>${refHtml}</div>
            <div style="text-align:center; margin-top:2rem; border-top:1px solid #e2e8f0; padding-top:0.8rem; font-size:0.8rem; color:#64748b;">${socialHtml}</div>
        </div>`;
    }
};