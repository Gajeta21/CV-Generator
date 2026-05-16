window.templateExports = {
    id: "creative",
    render: (data) => {
        const { personal, workExperiences, educationList, references, achievements, projects, skills, languages, certifications } = data;
        const photoUrl = personal.photoDataURL || `https://ui-avatars.com/api/?background=2c5530&color=fff&name=${encodeURIComponent(personal.fullName||'CV')}`;
        const formattedBirth = window.formatDate(personal.birthDate);
        const profile = personal.profileSummary || "";
        const socialHtml = window.renderSocialLinks("creative", personal);
        const workHtml = window.renderWorkExperiences(workExperiences);
        const eduHtml = window.renderEducation(educationList);
        const skillsHtml = window.renderSkills(skills);
        const languagesHtml = window.renderLanguages(languages);
        const certsHtml = window.renderCertifications(certifications);
        const refHtml = window.renderReferences("creative", references);
        const achievementsHtml = window.renderAchievements(achievements);
        const projectsHtml = window.renderProjects(projects);

        return `<div class="template-creative" style="font-family:'Trebuchet MS', sans-serif; max-width:950px; margin:0 auto; background:white; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.05); overflow:hidden;">
            <div style="background:linear-gradient(135deg, #2c5530, #1e3a2a); color:white; padding:2rem; text-align:center;">
                <img src="${photoUrl}" style="width:140px; height:140px; border-radius:50%; object-fit:cover; border:4px solid #d4af37; margin-bottom:1rem;">
                ${window.renderNameAndTitle(personal, 'creative')}
                <p style="margin:0; font-size:1rem;">
                    📅 ${formattedBirth || 'No especificada'} &nbsp;|&nbsp; 📍 ${window.escapeHtml(personal.address)} &nbsp;|&nbsp;
                    📞 ${window.escapeHtml(personal.mobilePhone)} ${personal.homePhone ? `&nbsp;|&nbsp; 🏠 ${window.escapeHtml(personal.homePhone)}` : ''}<br>
                    ✉️ ${window.escapeHtml(personal.email)}
                </p>
                ${socialHtml.replace('🌐 Redes:', '')}
            </div>

            <div style="padding:2rem;">
                ${profile ? `<div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">Declaración personal</h3><p>${window.escapeHtml(profile)}</p></div>` : ''}
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">💼 Experiencia profesional</h3>${workHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">🎓 Formación</h3>${eduHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">🏆 Logros destacados</h3>${achievementsHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">💻 Proyectos personales</h3>${projectsHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">🛠️ Habilidades</h3>${skillsHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">🌐 Idiomas</h3>${languagesHtml}</div>
                <div style="margin-bottom:1.5rem;"><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">📜 Certificaciones</h3>${certsHtml}</div>
                <div><h3 style="color:#2c5530; border-left:4px solid #d4af37; padding-left:0.8rem;">📞 Referencias</h3>${refHtml}</div>
            </div>
        </div>`;
    }
};