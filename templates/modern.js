window.templateExports = {
    id: "modern",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("modern", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("modern", references);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);

        return `<div class="template-modern" style="font-family:'Inter', system-ui; max-width:950px; margin:0 auto; background:linear-gradient(145deg,#f8fafc 0%,#ffffff 100%); border-radius:32px; padding:2rem; box-shadow:0 20px 35px -12px rgba(0,0,0,0.08);">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem; align-items:flex-start;">
                <div>
                    ${window.renderNameAndTitle(personal, 'modern')}
                    <p style="margin:0.5rem 0 0; color:#475569;">
                        📅 ${formattedBirth || ''} · 📍 ${window.escapeHtml(personal.address)}<br>
                        📞 ${window.escapeHtml(personal.mobilePhone)} ${personal.homePhone ? `| 🏠 ${window.escapeHtml(personal.homePhone)}` : ''}<br>
                        ✉️ ${window.escapeHtml(personal.email)}
                    </p>
                    ${socialHtml}
                </div>
                <img src="${photoUrl}" style="width:140px; height:140px; border-radius:30px; object-fit:cover; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
            </div>
            ${profile ? `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3 style="color:#0f2b3d; margin-top:0;">💼 Perfil profesional</h3><p>${window.escapeHtml(profile)}</p></div>` : ''}
            ${workHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>💼 Experiencia laboral</h3>${workHtml}</div>`}
            ${eduHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>🎓 Educación</h3>${eduHtml}</div>`}
            ${achievementsHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>🏆 Logros destacados</h3>${achievementsHtml}</div>`}
            ${projectsHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>💻 Proyectos personales</h3>${projectsHtml}</div>`}
            ${skillsHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>🛠️ Habilidades</h3>${skillsHtml}</div>`}
            ${languagesHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>🌐 Idiomas</h3>${languagesHtml}</div>`}
            ${certsHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem; margin-bottom:1.5rem;"><h3>📜 Certificaciones</h3>${certsHtml}</div>`}
            ${refHtml && `<div style="background:white; border-radius:24px; padding:1.2rem 1.5rem;"><h3>📞 Referencias</h3>${refHtml}</div>`}
        </div>`;
    }
};