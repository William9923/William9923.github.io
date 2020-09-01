/* Section Template, can be customizeable */ 
const sectionWithSubtitle = (title, subtitle, desc) => {
    let template = "";
    template += titleTemplate(title);
    template += subtitleTemplate(subtitle);
    desc.forEach(item => {
        template += descTemplate(item);
    });

    return template;
}

const sectionWithLinkTemplate = (title, link, desc) => {
    let template = "";
    template += linkTemplate(link, titleTemplate(title));
    desc.forEach(item => {
        template += descTemplate(item);
    });

    return template
} 

const sectionListTemplate = (list) => {
    let template = "";
    list.forEach(item => {
        template += itemListTemplate(item);
    });
    
    return template;
}

/* Component block for templating with Vanilla JS */ 
const titleTemplate = (title) => {
    return `
        <h2>${title}</h2>
    `;
}

const itemListTemplate = (item) => {
    return `
    <li>${item}</li>
    `;
}

const subtitleTemplate = (subtitle) => {
    return `
        <p class="block-color-gray">${subtitle}</p>
    `;
}

const descTemplate = (desc) => {
    return `
        <p>${desc}</p>
    `;
}

const linkTemplate = (link, content) => {
    return `
        <a href='${link}' target="_blank">${content}</a>
    `;
}

const iconTemplate = (src, alt) => {
    return `
        <img class="contact-icon" alt="${alt}" width="40vh" src="${src}"/>
    `;
}