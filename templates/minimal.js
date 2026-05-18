window.templateExports = {
    id: "minimal",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("minimal", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("minimal", references);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);

        return `<div class="template-minimal" style="font-family:'Courier New', monospace; max-width:950px; margin:0 auto; background:white; padding:2rem; border-left:8px solid #2c5282; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
            <div style="display:flex; gap:1.5rem; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:1.5rem; margin-bottom:1.5rem;">
                <img src="${photoUrl}" style="width:100px; height:100px; border-radius:50%; object-fit:cover;">
                <div>
                    ${window.renderNameAndTitle(personal, 'minimal')}
                    <p style="margin:0.5rem 0 0; font-size:0.9rem; color:#1a202c;">
                        <strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'} | <strong>Dirección:</strong> ${window.escapeHtml(personal.address)}<br>
                        <strong>Teléfono celular:</strong> ${window.escapeHtml(personal.mobilePhone)}${personal.homePhone ? ` | <strong>Teléfono casa:</strong> ${window.escapeHtml(personal.homePhone)}` : ''}<br>
                        <strong>Correo electrónico:</strong> ${window.escapeHtml(personal.email)}
                    </p>
                    ${socialHtml}
                </div>
            </div>
            ${profile ? `<div style="margin-bottom:1.5rem;"><h3>Perfil profesional</h3><p>${window.escapeHtml(profile)}</p></div>` : ''}
            ${workHtml && `<div style="margin-bottom:1.5rem;"><h3>Experiencia laboral</h3>${workHtml}</div>`}
            ${eduHtml && `<div style="margin-bottom:1.5rem;"><h3>Educación</h3>${eduHtml}</div>`}
            ${achievementsHtml && `<div style="margin-bottom:1.5rem;"><h3>Logros destacados</h3>${achievementsHtml}</div>`}
            ${projectsHtml && `<div style="margin-bottom:1.5rem;"><h3>Proyectos personales</h3>${projectsHtml}</div>`}
            ${skillsHtml && `<div style="margin-bottom:1.5rem;"><h3>Habilidades</h3>${skillsHtml}</div>`}
            ${languagesHtml && `<div style="margin-bottom:1.5rem;"><h3>Idiomas</h3>${languagesHtml}</div>`}
            ${certsHtml && `<div style="margin-bottom:1.5rem;"><h3>Certificaciones</h3>${certsHtml}</div>`}
            ${refHtml && `<div><h3>Referencias</h3>${refHtml}</div>`}
        </div>`;
    }
};