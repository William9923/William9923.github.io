const openTab = (event, tab) => {
    let tabcontent = document.querySelectorAll('.tab-content');
    tabcontent.forEach((value, index) => {
        value.style.display = "none";
    });

    let tabnavs = document.querySelectorAll('.tab-nav');
    tabnavs.forEach((value, index) => {
        value.className = value.className.replace(" active", "");
    });
    console.log(tab);
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

const main = () => {
    // default section
    document.getElementById("nav-profile").click();
}

main();

