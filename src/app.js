const openTab = (event, tab) => {
    let tabcontent = document.querySelectorAll('.tab-content');
    tabcontent.forEach((value) => {
        value.style.display = "none";
    });

    let tabnavs = document.querySelectorAll('.tab-nav');
    tabnavs.forEach((value) => {
        value.className = value.className.replace(" active", "");
    });
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

// Injection Function
const injectSectionWithSubstitle = (content, id) => {
    let template = "";
    content.forEach(item => {
        template += sectionWithSubtitle(item.title, item.subtitle, item.desc);
    });

    document.getElementById(id).innerHTML = template;
};

const injectSectionWithLinkTemplate = (content, id) => {
    let template = "";
    content.forEach(item => {
        template += sectionWithLinkTemplate(item.title, item.link, item.desc);
    });

    document.getElementById(id).innerHTML = template;
}

const injectSectionListTemplate = (content, id) => {
    let template = "";
    let placeholderTemplate = [];
    content.forEach(item => {
        placeholderTemplate.push(linkTemplate(item.link, item.title));
    });
    template += sectionListTemplate(placeholderTemplate);
    document.getElementById(id).innerHTML = '<ul>' + template + '</ul>';
}

const injectIconListTemplate = (content, id) => {
    let template = "";
    content.forEach(item => {
        template += linkTemplate(item.link, iconTemplate(item.src, item.alt));
    });

    document.getElementById(id).innerHTML = template;
}

const typeWriter = (txt, speed, query, i) => {
    if (i < txt.length) {
        document.querySelector(query).innerHTML += txt.charAt(i);
        let j = ++i;
        setTimeout(() => typeWriter(txt, speed, query, j), speed);
    }
}

const main = () => {
    // default section
    document.getElementById("nav-education").click();

    injectSectionWithSubstitle(educationData, "content-education");
    injectSectionWithSubstitle(experienceData, "content-experience");
    injectSectionWithLinkTemplate(projectData, "content-project");
    injectSectionListTemplate(articlesData, "content-articles");
    injectSectionWithSubstitle(achievementData, "content-achievement");
    injectIconListTemplate(contactData, "content-contact");
    
}

main();
setTimeout(() => typeWriter('Hi.. My Name is William', 150, '.title-text', 0), 1500)

