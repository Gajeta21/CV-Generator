window.templateExports = {
    id: "double",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";

        const socials = [];
        if (personal.facebook) socials.push(`Facebook: ${window.escapeHtml(personal.facebook)}`);
        if (personal.instagram) socials.push(`Instagram: ${window.escapeHtml(personal.instagram)}`);
        if (personal.github) socials.push(`GitHub: ${window.escapeHtml(personal.github)}`);
        const socialHtml = socials.length ? `<div><strong>Redes sociales:</strong> ${socials.join(' | ')}</div>` : '';

        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);
        const refHtml = window.renderReferences("double", references);

        return `
        <div style="display: flex; flex-wrap: wrap; max-width: 1100px; margin: 0 auto; background: white; font-family: 'Segoe UI', Arial, sans-serif; box-shadow: 0 0 8px rgba(0,0,0,0.05);">
            <!-- Columna izquierda -->
            <div style="flex: 1; min-width: 240px; background: #f8fafc; padding: 1.5rem;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <img src="${photoUrl}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #cbd5e1;">
                    <h1 style="margin: 0.5rem 0 0.2rem;">${window.escapeHtml(personal.fullName)}</h1>
                    ${personal.jobTitle ? `<p style="color: #3b82f6; font-weight: bold;">${window.escapeHtml(personal.jobTitle)}</p>` : ''}
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Contacto</h2>
                    <p>📞 ${window.escapeHtml(personal.mobilePhone)}<br>
                    ${personal.homePhone ? `🏠 ${window.escapeHtml(personal.homePhone)}<br>` : ''}
                    ✉️ ${window.escapeHtml(personal.email)}<br>
                    📍 ${window.escapeHtml(personal.address)}<br>
                    📅 ${formattedBirth || 'No especificada'}</p>
                    ${socialHtml}
                </div>
                ${skillsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Habilidades</h2>${skillsHtml}</div>`}
                ${languagesHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Idiomas</h2>${languagesHtml}</div>`}
                ${certsHtml && `<div><h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Certificaciones</h2>${certsHtml}</div>`}
            </div>
            <!-- Columna derecha -->
            <div style="flex: 2; min-width: 300px; padding: 1.5rem;">
                ${profile ? `<div style="margin-bottom: 1.5rem;"><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Resumen profesional</h2><p>${window.escapeHtml(profile)}</p></div>` : ''}
                ${workHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Experiencia laboral</h2>${workHtml}</div>`}
                ${eduHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Educación</h2>${eduHtml}</div>`}
                ${achievementsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Logros destacados</h2>${achievementsHtml}</div>`}
                ${projectsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Proyectos personales</h2>${projectsHtml}</div>`}
                ${refHtml && `<div><h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Referencias</h2>${refHtml}</div>`}
            </div>
        </div>`;
    }
};