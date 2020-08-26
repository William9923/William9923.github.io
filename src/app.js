// Data
// experience
const experience = [
    {
        "position": "Backend Developer Intern",
        "place": "Xtremax, Bandung",
        "from": "May 2020",
        "until": "August 2020",
    },
    {
        "position": "Graphics and Artificial Intelligence Laboratory Assistant",
        "place": "Institut Teknologi Bandung, Bandung",
        "from": "August 2020",
        "until": "present",
    }
];

// project
const project = [
    {
        "link": 'https://info-extractor9923.herokuapp.com',
        "title": "InfoExtractor",
        "description": 'Developed an info extractor using Pattern Matching Algorithm. Created with Flask and MaterializeCSS.'
    },
    {
        "link": 'https://github.com/William9923/infoqerja-line',
        "title": "InfoQerja",
        "description": 'Developed a simple chatbot for storing information about job listing for colledge student. Developed using go and line sdk'
    },
    {
        "link": 'https://github.com/William9923/DuelFX',
        "title": "DuelFX",
        "description": 'A simple turn-based card game battle created using JavaFX'
    }
];

const education = [
    {
        "title": "Undergraduate student in Computer Science",
        "from": "2018",
        "until": "present"
    },
    {
        "title": "IPEKA Tomang High Schol",
        "from": "2015",
        "until": "2018"
    }
];

const articles = [
    {
        "title" : "What is CNN ? A 5 year old guide to Convolutional Neural Network",
        "link" : "https://medium.com/analytics-vidhya/what-is-cnn-a-5-year-old-guide-to-convolutional-neural-network-c9d0338c3bf7"
    }
];

const achievement = [
    {
        "title": "3rd Place in Gemastik Data Mining Competition",
        "time": "Oct 2019",
        "division": "National",
        "description": "Developed a deep learning model to identify difference between leaves."
    },
    {
        "title": "Best Paper in National Data Summit (2019)",
        "time": "Nov 2019",
        "division": "National",
        "description": "Developed a new way to handle and process waste with deep learning."
    }
]

const openTab = (event, tab) => {
    let tabcontent = document.querySelectorAll('.tab-content');
    tabcontent.forEach((value, index) => {
        value.style.display = "none";
    });

    let tabnavs = document.querySelectorAll('.tab-nav');
    tabnavs.forEach((value, index) => {
        value.className = value.className.replace(" active", "");
    });
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

// Injection Function
const injectExperience = (content) => {
    let template = "";
    content.forEach(item => {
        template += experienceTemplate(item.position, item.place, item.from, item.until);
    });

    document.getElementById('content-experience').innerHTML = template;
}

const injectProject = (content) => {
    let template = "";
    content.forEach(item => {
        template += projectTemplate(item.title, item.description, item.link);
    });

    document.getElementById('content-project').innerHTML = template;
}

const injectEducation = (content) => {
    let template = "";
    content.forEach(item => {
        template += educationTemplate(item.title, item.from, item.until);
    });

    document.getElementById('content-education').innerHTML = template;
}

const injectArticles = (content) => {
    let template = "";
    content.forEach(item => {
        template += articleTemplate(item.title, item.link);
    });

    document.getElementById('content-articles').innerHTML = '<ul>' + template + '</ul>';
}

const injectAchievement = (content) => {
    let template = "";
    content.forEach(item => {
        template += achievementTemplate(item.title, item.time, item.division, item.description);
    });

    document.getElementById('content-achievement').innerHTML = template;
}

// Template Function
const experienceTemplate = (position, place, from, until) => {
    return `
    <h2>${position}</h2>
    <p class="block-color-gray">${place}<em> – ${from} - ${until}</em></p>
    `;
}

const projectTemplate = (title, desc, link) => {
    return `
    <a href='${link}' target="_blank"><h3>${title}</h3></a>
    <p>${desc}</p>
    `;
}

const educationTemplate = (title, from, until) => {
    return `
    <h2>${title}</h2>
    <p class="block-color-gray"><em>${from} - ${until}</em></p>
    `;
}

const articleTemplate = (title, link) => {
    return`
    <li><a href='${link}' target="_blank"><span class="article-title sans">${title}</span></a></li>
    `;
}

const achievementTemplate = (title, time, division, desc) => {
    return `
    <h2>${title}</h2>
    <p class="block-color-gray">${time} | ${division}</p>
    <p>${desc}</p>
    `;
}

const main = () => {
    // default section
    document.getElementById("nav-education").click();

    injectEducation(education);
    injectExperience(experience);
    injectProject(project);
    injectArticles(articles);
    injectAchievement(achievement);

    console.log(document.getElementById('content-articles').innerHTML);
}   

main();

