window.templateExports = {
    id: "double",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";

        // --- Columna izquierda (Contacto, habilidades, idiomas, certificaciones) ---
        const socials = [];
        if (personal.facebook) socials.push(`Facebook: ${window.escapeHtml(personal.facebook)}`);
        if (personal.instagram) socials.push(`Instagram: ${window.escapeHtml(personal.instagram)}`);
        if (personal.github) socials.push(`GitHub: ${window.escapeHtml(personal.github)}`);
        const socialHtml = socials.length ? `<div><strong>Redes sociales:</strong> ${socials.join(' | ')}</div>` : '';

        const skillsHtml = skills?.length
            ? `<ul style="margin:0; padding-left:1rem;">${skills.map(s => `<li>${window.escapeHtml(s)}</li>`).join('')}</ul>`
            : '<p>No se han añadido habilidades.</p>';

        const languagesHtml = languages?.length
            ? `<ul style="margin:0; padding-left:1rem;">${languages.map(l => `<li>${window.escapeHtml(l.name)} - ${window.escapeHtml(l.level)}</li>`).join('')}</ul>`
            : '<p>No se han añadido idiomas.</p>';

        const certsHtml = certifications?.length
            ? `<ul style="margin:0; padding-left:1rem;">${certifications.map(c => `<li>${window.escapeHtml(c.name)} - ${window.escapeHtml(c.institution)} (${window.escapeHtml(c.date)})${c.url ? ` - <a href="${window.escapeHtml(c.url)}" target="_blank">ver</a>` : ''}</li>`).join('')}</ul>`
            : '<p>No se han añadido certificaciones.</p>';

        // --- Columna derecha (Experiencia, educación, proyectos, logros, referencias) ---
        const workItems = workExperiences.filter(w => w.jobTitle || w.company);
        const workHtml = workItems.length
            ? workItems.map(w => `
                <div style="margin-bottom: 1rem;">
                    <h3 style="margin:0 0 0.2rem;">${window.escapeHtml(w.jobTitle)}</h3>
                    <p style="margin:0 0 0.2rem;"><strong>${window.escapeHtml(w.company)}</strong> | ${window.escapeHtml(w.startDate)} - ${window.escapeHtml(w.endDate)}</p>
                    <p style="margin:0;">${window.escapeHtml(w.description)}</p>
                </div>`).join('')
            : '<p>Sin experiencia registrada</p>';

        const eduItems = educationList.filter(e => e.study);
        const eduHtml = eduItems.length
            ? eduItems.map(e => `
                <div style="margin-bottom: 1rem;">
                    <h3 style="margin:0 0 0.2rem;">${window.escapeHtml(e.study)}</h3>
                    <p style="margin:0 0 0.2rem;"><strong>${window.escapeHtml(e.institution)}</strong> | ${window.escapeHtml(e.periodStart)} - ${window.escapeHtml(e.periodEnd)} | ${window.escapeHtml(e.status)}</p>
                    <p style="margin:0;">${window.escapeHtml(e.description)}</p>
                </div>`).join('')
            : '<p>Sin estudios registrados</p>';

        const achievementsHtml = achievements?.length
            ? `<ul style="margin:0.5rem 0 0 1rem;">${achievements.map(a => `<li style="margin-bottom:0.3rem;">${window.escapeHtml(a)}</li>`).join('')}</ul>`
            : '<p>No se han añadido logros destacados.</p>';

        const projectsHtml = projects?.length
            ? projects.map(p => `
                <div style="margin-bottom: 1rem;">
                    <h3 style="margin:0 0 0.2rem;">${window.escapeHtml(p.name)}</h3>
                    <p style="margin:0.2rem 0;">${window.escapeHtml(p.description)}</p>
                    <p style="margin:0.1rem 0;"><strong>Tecnologías:</strong> ${window.escapeHtml(p.technologies)}</p>
                    ${p.url ? `<p style="margin:0.1rem 0;"><strong>Enlace:</strong> ${window.escapeHtml(p.url)}</p>` : ''}
                </div>`).join('')
            : '<p>No se han añadido proyectos personales.</p>';

        const refItems = references.filter(r => r.name);
        const refHtml = refItems.length
            ? `<ul style="margin:0.5rem 0 0 1rem;">${refItems.map(r => `<li>${window.escapeHtml(r.name)} - ${window.escapeHtml(r.relation)} | 📞 ${window.escapeHtml(r.phone)}</li>`).join('')}</ul>`
            : '<p>No hay referencias</p>';

        return `
        <div style="display: flex; flex-wrap: wrap; max-width: 1100px; margin: 0 auto; background: white; font-family: 'Segoe UI', Arial, sans-serif; box-shadow: 0 0 8px rgba(0,0,0,0.05);">
            <!-- COLUMNA IZQUIERDA (30%) -->
            <div style="flex: 1; min-width: 240px; background: #f9fafb; padding: 1.5rem;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <img src="${photoUrl}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #e5e7eb;">
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

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Habilidades</h2>
                    ${skillsHtml}
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Idiomas</h2>
                    ${languagesHtml}
                </div>

                <div>
                    <h2 style="font-size: 1.1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.2rem;">Certificaciones</h2>
                    ${certsHtml}
                </div>
            </div>

            <!-- COLUMNA DERECHA (70%) -->
            <div style="flex: 2; min-width: 300px; padding: 1.5rem;">
                ${profile ? `
                <div style="margin-bottom: 1.5rem;">
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Resumen profesional</h2>
                    <p>${window.escapeHtml(profile)}</p>
                </div>
                ` : ''}

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Experiencia laboral</h2>
                    ${workHtml}
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Educación</h2>
                    ${eduHtml}
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Logros destacados</h2>
                    ${achievementsHtml}
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Proyectos personales</h2>
                    ${projectsHtml}
                </div>

                <div>
                    <h2 style="border-left: 4px solid #3b82f6; padding-left: 0.5rem;">Referencias</h2>
                    ${refHtml}
                </div>
            </div>
        </div>`;
    }
};