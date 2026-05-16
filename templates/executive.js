window.templateExports = {
    id: "executive",
    render: (data) => {
        const { personal, workExperiences, educationList, references, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("executive", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("executive", references);

        return `
        <div class="template-executive" style="font-family:'Times New Roman', serif; max-width:1050px; margin:0 auto; background:white;">
            <div style="display:flex; flex-wrap:wrap;">
                <!-- Columna izquierda (oscura) -->
                <div style="flex:1; background:#102a43; color:white; padding:2rem;">
                    <img src="${photoUrl}" style="width:150px; height:150px; border-radius:50%; object-fit:cover; margin-bottom:1rem; border:4px solid #e2e8f0;">
                    <h2 style="border-bottom:2px solid #e2e8f0;">Contacto</h2>
                    <!-- CADA DATO EN SU PROPIA LÍNEA PARA EVITAR DESPLAZAMIENTOS -->
                    <p><strong>📞</strong> ${window.escapeHtml(personal.mobilePhone)}</p>
                    ${personal.homePhone ? `<p><strong>🏠</strong> ${window.escapeHtml(personal.homePhone)}</p>` : ''}
                    <p><strong>✉️</strong> ${window.escapeHtml(personal.email)}</p>
                    <p><strong>📍</strong> ${window.escapeHtml(personal.address)}</p>
                    <h2 style="margin-top:1.5rem;">Perfil</h2>
                    <p>${window.escapeHtml(profile) || "Profesional con amplia experiencia."}</p>
                    ${socialHtml}
                </div>
                <!-- Columna derecha -->
                <div style="flex:2; padding:2rem;">
                    <h1>${window.escapeHtml(personal.fullName)}</h1>
                    <p><strong>📅 Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'}</p>
                    <div><h2>💼 Experiencia profesional</h2>${workHtml}</div>
                    <div><h2>🎓 Formación académica</h2>${eduHtml}</div>
                    <div><h2>🛠️ Habilidades</h2>${skillsHtml}</div>
                    <div><h2>🌐 Idiomas</h2>${languagesHtml}</div>
                    <div><h2>📜 Certificaciones</h2>${certsHtml}</div>
                    <div><h2>📞 Referencias</h2>${refHtml}</div>
                </div>
            </div>
        </div>`;
    }
};