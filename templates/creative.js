// Plantilla Creativa (verde bosque + dorado, sin título)
window.templateExports = {
    id: "creative",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName || 'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("creative", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("creative", references);
        
        return `<div class="template-creative" style="font-family:'Trebuchet MS', sans-serif; max-width:900px; margin:0 auto; background:#fdfcf8; border-radius:0; box-shadow:0 15px 30px rgba(0,0,0,0.05);">
            <div style="background:#2c5530; height:6px;"></div>
            <div style="display:flex; flex-wrap:wrap; gap:2rem; padding:2rem;">
                <div class="cv-section" style="flex:1; text-align:center;">
                    <img src="${photoUrl}" style="width:160px; height:160px; border-radius:50%; object-fit:cover; border:4px solid #d4af37; margin-bottom:1rem;">
                    <div style="border-top:2px solid #d4af37; padding-top:1rem;">
                        <h3 style="color:#2c5530;">Contacto</h3>
                        <p>📞 ${escapeHtml(personal.mobilePhone)}<br>🏠 ${escapeHtml(personal.homePhone)}<br>✉️ ${escapeHtml(personal.email)}<br>📍 ${escapeHtml(personal.address)}</p>
                        ${socialHtml}
                        <h3 style="color:#2c5530;">Nacimiento</h3>
                        <p>${formattedBirth || 'No especificada'}</p>
                    </div>
                </div>
                <div style="flex:2;">
                    <div class="cv-section"><h1 style="color:#2c5530; border-bottom:2px solid #d4af37; display:inline-block; padding-bottom:0.2rem;">${escapeHtml(personal.fullName)}</h1></div>
                    ${profile ? `<div class="cv-section" style="margin:1rem 0;"><h3 style="color:#2c5530;">Declaración personal</h3><p style="font-style:italic;">${escapeHtml(profile)}</p></div>` : ''}
                    <div class="cv-section" style="margin:1.5rem 0;"><h3 style="color:#2c5530;">Trayectoria profesional</h3>${workHtml}</div>
                    <div class="cv-section" style="margin:1.5rem 0;"><h3 style="color:#2c5530;">Formación</h3>${eduHtml}</div>
                    <div class="cv-section"><h3 style="color:#2c5530;">Referencias</h3>${refHtml}</div>
                </div>
            </div>
            <div style="background:#2c5530; height:4px;"></div>
        </div>`;
    }
};