window.templateExports = {
    id: "ats",
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

        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences('ats', references);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);

        return `
        <div style="font-family: 'Arial', 'Calibri', sans-serif; max-width: 1000px; margin: 0 auto; background: white; padding: 2rem; line-height: 1.4;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <img src="${photoUrl}" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 0.5rem;">
                ${window.renderNameAndTitle(personal, 'ats')}
                <p style="margin: 0.2rem 0;">
                    📅 ${formattedBirth || 'No especificada'} | 📍 ${window.escapeHtml(personal.address)}<br>
                    📞 ${window.escapeHtml(personal.mobilePhone)} ${personal.homePhone ? `| 🏠 ${window.escapeHtml(personal.homePhone)}` : ''}<br>
                    ✉️ ${window.escapeHtml(personal.email)}
                </p>
                ${socialHtml}
            </div>
            ${profile ? `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Perfil profesional</h2><p>${window.escapeHtml(profile)}</p></div>` : ''}
            ${workHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Experiencia laboral</h2>${workHtml}</div>`}
            ${eduHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Educación</h2>${eduHtml}</div>`}
            ${achievementsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Logros destacados</h2>${achievementsHtml}</div>`}
            ${projectsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Proyectos personales</h2>${projectsHtml}</div>`}
            ${skillsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Habilidades</h2>${skillsHtml}</div>`}
            ${languagesHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Idiomas</h2>${languagesHtml}</div>`}
            ${certsHtml && `<div style="margin-bottom: 1.5rem;"><h2 style="border-bottom: 2px solid #3b82f6;">Certificaciones</h2>${certsHtml}</div>`}
            ${refHtml && `<div><h2 style="border-bottom: 2px solid #3b82f6;">Referencias</h2>${refHtml}</div>`}
        </div>`;
    }
};