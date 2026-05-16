window.templateExports = {
    id: "executive",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=102a43&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("executive", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("executive", references);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);

        return `<div class="template-executive" style="font-family:'Times New Roman', serif; max-width:1000px; margin:0 auto; background:white; padding:2rem;">
            <div style="display:flex; flex-wrap:wrap; gap:2rem; align-items:center; margin-bottom:2rem; border-bottom:2px solid #102a43; padding-bottom:1.5rem;">
                <img src="${photoUrl}" style="width:130px; height:130px; border-radius:50%; object-fit:cover; border:3px solid #102a43;">
                <div style="flex:1;">
                    ${window.renderNameAndTitle(personal, 'executive')}
                    <p style="margin:0; line-height:1.4;">
                        📅 <strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'}<br>
                        📍 <strong>Dirección:</strong> ${window.escapeHtml(personal.address)}<br>
                        📞 <strong>Teléfono celular:</strong> ${window.escapeHtml(personal.mobilePhone)}<br>
                        ${personal.homePhone ? `🏠 <strong>Teléfono casa:</strong> ${window.escapeHtml(personal.homePhone)}<br>` : ''}
                        ✉️ <strong>Correo electrónico:</strong> ${window.escapeHtml(personal.email)}<br>
                        ${socialHtml}
                    </p>
                </div>
            </div>

            ${profile ? `<div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">Perfil profesional</h2><p>${window.escapeHtml(profile)}</p></div>` : ''}
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">💼 Experiencia laboral</h2>${workHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">🎓 Formación académica</h2>${eduHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">🏆 Logros destacados</h2>${achievementsHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">💻 Proyectos personales</h2>${projectsHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">🛠️ Habilidades</h2>${skillsHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">🌐 Idiomas</h2>${languagesHtml}</div>
            <div style="margin-bottom:1.5rem;"><h2 style="color:#102a43;">📜 Certificaciones</h2>${certsHtml}</div>
            <div><h2 style="color:#102a43;">📞 Referencias</h2>${refHtml}</div>
        </div>`;
    }
};