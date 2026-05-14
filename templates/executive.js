// Plantilla Ejecutiva (dos columnas, fondo oscuro)
window.templateExports = {
    id: "executive",
    render: (data) => {
        const { personal, workExperiences, educationList, references } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName || 'CV')}`;
        const formattedBirth = formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = renderSocialLinks("executive", personal);
        const workHtml = renderWorkExperiences(workExperiences);
        const eduHtml = renderEducation(educationList);
        const refHtml = renderReferences("executive", references);
        
        return `<div class="template-executive" style="font-family:'Times New Roman', serif; max-width:1000px; margin:0 auto; background:white; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <div style="display:flex; flex-wrap:wrap;">
                <div class="cv-section" style="flex:1; background:#102a43; color:white; padding:1.5rem;">
                    <img src="${photoUrl}" style="width:100%; max-width:150px; border-radius:50%; margin-bottom:1rem; border:3px solid #e2e8f0;">
                    <h2>Contacto</h2>
                    <p><strong>📞</strong> ${escapeHtml(personal.mobilePhone)}<br>
                    <strong>🏠</strong> ${escapeHtml(personal.homePhone)}<br>
                    <strong>✉️</strong> ${escapeHtml(personal.email)}<br>
                    <strong>📍</strong> ${escapeHtml(personal.address)}</p>
                    <h2>Perfil</h2>
                    <p>${escapeHtml(profile) || "Profesional con amplia experiencia en el sector, orientado a resultados y liderazgo."}</p>
                    ${socialHtml}
                </div>
                <div style="flex:2; padding:1.5rem;">
                    <div class="cv-section"><h1 style="color:#102a43; margin-top:0;">${escapeHtml(personal.fullName)}</h1>
                    <p><strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'}</p></div>
                    <div class="cv-section"><h2>Experiencia profesional</h2>${workHtml}</div>
                    <div class="cv-section"><h2>Formación académica</h2>${eduHtml}</div>
                    <div class="cv-section"><h2>Referencias</h2>${refHtml}</div>
                </div>
            </div>
        </div>`;
    }
};