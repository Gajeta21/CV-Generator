window.templateExports = {
    id: "ats",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || '';
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";

        // Redes sociales sin emojis
        const socials = [];
        if (personal.facebook) socials.push(`Facebook: ${window.escapeHtml(personal.facebook)}`);
        if (personal.instagram) socials.push(`Instagram: ${window.escapeHtml(personal.instagram)}`);
        if (personal.github) socials.push(`GitHub: ${window.escapeHtml(personal.github)}`);
        const socialHtml = socials.length ? `<div><strong>Redes sociales:</strong> ${socials.join(' | ')}</div>` : '';

        // Experiencia laboral con estructura clara
        const workItems = workExperiences.filter(w => w.jobTitle || w.company);
        const workHtml = workItems.length
            ? workItems.map(w => `
                <div style="margin-bottom: 1.2rem;">
                    <h3 style="margin: 0 0 0.2rem;">${window.escapeHtml(w.jobTitle)}</h3>
                    <p style="margin: 0 0 0.2rem; font-weight: normal;">${window.escapeHtml(w.company)} | ${window.escapeHtml(w.startDate)} - ${window.escapeHtml(w.endDate)}</p>
                    <p style="margin: 0.2rem 0 0;">${window.escapeHtml(w.description)}</p>
                </div>`).join('')
            : '<p>Sin experiencia registrada</p>';

        // Educación
        const eduItems = educationList.filter(e => e.study);
        const eduHtml = eduItems.length
            ? eduItems.map(e => `
                <div style="margin-bottom: 1.2rem;">
                    <h3 style="margin: 0 0 0.2rem;">${window.escapeHtml(e.study)}</h3>
                    <p style="margin: 0 0 0.2rem;">${window.escapeHtml(e.institution)} | ${window.escapeHtml(e.periodStart)} - ${window.escapeHtml(e.periodEnd)} | ${window.escapeHtml(e.status)}</p>
                    <p style="margin: 0.2rem 0 0;">${window.escapeHtml(e.description)}</p>
                </div>`).join('')
            : '<p>Sin estudios registrados</p>';

        // Logros como lista de viñetas
        const achievementsHtml = achievements?.length
            ? `<ul style="margin-top: 0.5rem;">${achievements.map(a => `<li style="margin-bottom: 0.3rem;">${window.escapeHtml(a)}</li>`).join('')}</ul>`
            : '<p>No se han añadido logros destacados.</p>';

        // Proyectos
        const projectsHtml = projects?.length
            ? projects.map(p => `
                <div style="margin-bottom: 1.2rem;">
                    <h3 style="margin: 0 0 0.2rem;">${window.escapeHtml(p.name)}</h3>
                    <p style="margin: 0.2rem 0;">${window.escapeHtml(p.description)}</p>
                    <p style="margin: 0.1rem 0;"><strong>Tecnologías:</strong> ${window.escapeHtml(p.technologies)}</p>
                    ${p.url ? `<p style="margin: 0.1rem 0;"><strong>Enlace:</strong> ${window.escapeHtml(p.url)}</p>` : ''}
                </div>`).join('')
            : '<p>No se han añadido proyectos personales.</p>';

        // Habilidades: lista simple
        const skillsHtml = skills?.length
            ? `<ul style="margin-top: 0.5rem;">${skills.map(s => `<li style="margin-bottom: 0.3rem;">${window.escapeHtml(s)}</li>`).join('')}</ul>`
            : '<p>No se han añadido habilidades.</p>';

        // Idiomas
        const languagesHtml = languages?.length
            ? `<ul style="margin-top: 0.5rem;">${languages.map(l => `<li style="margin-bottom: 0.3rem;">${window.escapeHtml(l.name)} - ${window.escapeHtml(l.level)}</li>`).join('')}</ul>`
            : '<p>No se han añadido idiomas.</p>';

        // Certificaciones
        const certsHtml = certifications?.length
            ? `<ul style="margin-top: 0.5rem;">${certifications.map(c => `<li style="margin-bottom: 0.3rem;">${window.escapeHtml(c.name)} - ${window.escapeHtml(c.institution)} (${window.escapeHtml(c.date)})${c.url ? ` - <a href="${window.escapeHtml(c.url)}" target="_blank">ver credencial</a>` : ''}</li>`).join('')}</ul>`
            : '<p>No se han añadido certificaciones.</p>';

        // Referencias
        const refItems = references.filter(r => r.name);
        const refHtml = refItems.length
            ? `<ul style="margin-top: 0.5rem;">${refItems.map(r => `<li style="margin-bottom: 0.3rem;">${window.escapeHtml(r.name)} - ${window.escapeHtml(r.relation)} | Teléfono: ${window.escapeHtml(r.phone)}</li>`).join('')}</ul>`
            : '<p>No hay referencias</p>';

        return `
        <div style="max-width: 1000px; margin: 0 auto; background: white; padding: 1.5rem; font-family: Arial, Helvetica, sans-serif; line-height: 1.4;">
            <!-- Encabezado central -->
            <div style="text-align: center; margin-bottom: 1.8rem;">
                ${photoUrl ? `<img src="${photoUrl}" style="width: 100px; height: 100px; border-radius: 50%; display: block; margin: 0 auto 0.8rem;" alt="Foto de perfil">` : ''}
                <h1 style="margin: 0 0 0.2rem;">${window.escapeHtml(personal.fullName)}</h1>
                ${personal.jobTitle ? `<p style="font-size: 1.1rem; font-weight: bold; margin: 0 0 0.5rem;">${window.escapeHtml(personal.jobTitle)}</p>` : ''}
                <p style="margin: 0;">
                    <strong>Fecha de nacimiento:</strong> ${formattedBirth || 'No especificada'} &nbsp;|&nbsp;
                    <strong>Dirección:</strong> ${window.escapeHtml(personal.address)}<br>
                    <strong>Teléfono:</strong> ${window.escapeHtml(personal.mobilePhone)} ${personal.homePhone ? `&nbsp;|&nbsp; <strong>Casa:</strong> ${window.escapeHtml(personal.homePhone)}` : ''}<br>
                    <strong>Correo electrónico:</strong> ${window.escapeHtml(personal.email)}
                </p>
                ${socialHtml}
            </div>

            ${profile ? `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Perfil profesional</h2>
                <p style="margin-top: 0.5rem;">${window.escapeHtml(profile)}</p>
            </div>
            ` : ''}

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Experiencia laboral</h2>
                ${workHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Educación</h2>
                ${eduHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Logros destacados</h2>
                ${achievementsHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Proyectos personales</h2>
                ${projectsHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Habilidades</h2>
                ${skillsHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Idiomas</h2>
                ${languagesHtml}
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Certificaciones</h2>
                ${certsHtml}
            </div>

            <div>
                <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 0.2rem;">Referencias</h2>
                ${refHtml}
            </div>
        </div>`;
    }
};