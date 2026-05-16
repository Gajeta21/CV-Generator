window.templateExports = {
    id: "classic",
    render: (data) => {
        const { personal, workExperiences, educationList, references, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("classic", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("classic", references);

        return `<div class="template-classic" style="font-family:'Georgia', serif; max-width:950px; margin:0 auto; background:#ffffff; padding:1.8rem; border:1px solid #e2e8f0; border-top:8px solid #1e3a5f; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <div class="cv-section" style="display:flex; gap:2rem; flex-wrap:wrap; border-bottom:2px solid #e2e8f0; padding-bottom:1.5rem; margin-bottom:1.5rem;">
                <img src="${photoUrl}" style="width:130px; height:130px; border-radius:50%; object-fit:cover; border:3px solid #1e3a5f;">
                <div style="flex:1;">
                    <h1 style="color:#1e3a5f; margin:0 0 0.5rem 0; font-size:2rem;">${window.escapeHtml(personal.fullName)}</h1>
                    <p style="margin:0; line-height:1.5;">
                        <strong>📅 Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'}<br>
                        <strong>📍 Dirección:</strong> ${window.escapeHtml(personal.address)}<br>
                        <strong>📞 Teléfono celular:</strong> ${window.escapeHtml(personal.mobilePhone)}<br>
                        ${personal.homePhone ? `<strong>🏠 Teléfono casa:</strong> ${window.escapeHtml(personal.homePhone)}<br>` : ''}
                        <strong>✉️ Correo electrónico:</strong> ${window.escapeHtml(personal.email)}
                    </p>
                    ${socialHtml}
                </div>
            </div>
            ${profile ? `<div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">💼 Perfil profesional</h3><p style="margin-top:0.5rem;">${window.escapeHtml(profile)}</p></div>` : ''}
            <div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">💼 Experiencia laboral</h3>${workHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">🎓 Educación</h3>${eduHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">🛠️ Habilidades</h3>${skillsHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">🌐 Idiomas</h3>${languagesHtml}</div>
            <div class="cv-section" style="margin-bottom:1.5rem;"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">📜 Certificaciones</h3>${certsHtml}</div>
            <div class="cv-section"><h3 style="color:#1e3a5f; border-left:4px solid #1e3a5f; padding-left:0.8rem;">📞 Referencias</h3>${refHtml}</div>
        </div>`;
    }
};