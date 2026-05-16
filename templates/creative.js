window.templateExports = {
    id: "creative",
    render: (data) => {
        const { personal, workExperiences, educationList, references, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("creative", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("creative", references);

        return `
        <div class="template-creative" style="font-family:'Trebuchet MS', sans-serif; max-width:950px; margin:0 auto; background:#fdfcf8;">
            <div style="display:flex; flex-wrap:wrap; gap:2rem; padding:2rem;">
                <!-- Columna izquierda (contacto) -->
                <div style="flex:1; text-align:center;">
                    <img src="${photoUrl}" style="width:150px; height:150px; border-radius:50%; border:4px solid #d4af37; margin-bottom:1rem;">
                    <div style="border-top:2px solid #d4af37; padding-top:1rem;">
                        <h3>Contacto</h3>
                        <!-- CADA DATO EN SU PROPIA LÍNEA PARA EVITAR DESPLAZAMIENTOS -->
                        <p><strong>📞</strong> ${window.escapeHtml(personal.mobilePhone)}</p>
                        ${personal.homePhone ? `<p><strong>🏠</strong> ${window.escapeHtml(personal.homePhone)}</p>` : ''}
                        <p><strong>✉️</strong> ${window.escapeHtml(personal.email)}</p>
                        <p><strong>📍</strong> ${window.escapeHtml(personal.address)}</p>
                        ${socialHtml}
                        <h3>Nacimiento</h3>
                        <p>${formattedBirth || 'No especificada'}</p>
                    </div>
                </div>
                <!-- Columna derecha (contenido principal) -->
                <div style="flex:2;">
                    <h1 style="color:#2c5530;">${window.escapeHtml(personal.fullName)}</h1>
                    ${profile ? `<div><h3>Declaración personal</h3><p>${window.escapeHtml(profile)}</p></div>` : ''}
                    <div><h3>Experiencia profesional</h3>${workHtml}</div>
                    <div><h3>Formación</h3>${eduHtml}</div>
                    <div><h3>Habilidades</h3>${skillsHtml}</div>
                    <div><h3>Idiomas</h3>${languagesHtml}</div>
                    <div><h3>Certificaciones</h3>${certsHtml}</div>
                    <div><h3>Referencias</h3>${refHtml}</div>
                </div>
            </div>
        </div>`;
    }
};