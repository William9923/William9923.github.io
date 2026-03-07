document.addEventListener('DOMContentLoaded', () => {
  fetchExperience();
  fetchProjects();
  fetchBlogPosts();
  setupMobileMenu();
});

// 1. Fetch and render Experience from JSON
async function fetchExperience() {
  const container = document.getElementById('experience-list');
  try {
    const res = await fetch('data/experience.json');
    if (!res.ok) throw new Error('Failed to fetch experience');
    const data = await res.json();
    
    container.innerHTML = ''; // clear loading
    const template = document.getElementById('experience-template').content;
    
    data.forEach(item => {
      const node = document.importNode(template, true);
      node.querySelector('.timeline-date').textContent = item.period;
      node.querySelector('.role').textContent = item.role;
      node.querySelector('.company').textContent = item.company;
      node.querySelector('.company').href = item.companyUrl;
      node.querySelector('.description').textContent = item.description;
      container.appendChild(node);
    });
  } catch (err) {
    container.innerHTML = '<li><p>Could not load experience timeline.</p></li>';
    console.error(err);
  }
}

// 2. Fetch and render Projects from JSON
async function fetchProjects() {
  const container = document.getElementById('projects-list');
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    
    container.innerHTML = ''; // clear loading
    const template = document.getElementById('project-template').content;
    
    data.forEach(item => {
      const node = document.importNode(template, true);
      node.querySelector('.project-link').textContent = item.name;
      node.querySelector('.project-link').href = item.url;
      node.querySelector('.project-desc').textContent = item.description;
      
      const tagsContainer = node.querySelector('.project-tags');
      if (item.tags) {
        item.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag;
          tagsContainer.appendChild(span);
        });
      }
      container.appendChild(node);
    });
  } catch (err) {
    container.innerHTML = '<p>Could not load projects list.</p>';
    console.error(err);
  }
}

// 3. Fetch and render Latest Blog Posts via RSS2JSON (Bear Blog Headless Integration)
async function fetchBlogPosts() {
  const container = document.getElementById('blog-list');
  // Replace this with your actual Bear Blog RSS feed URL when you create it.
  const bearBlogRssUrl = 'https://williamong.bearblog.dev/feed/';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(bearBlogRssUrl)}`;
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    const data = await res.json();
    
    container.innerHTML = ''; // clear loading
    
    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<li><p>No recent posts found. Check back later!</p></li>';
      return;
    }

    const template = document.getElementById('blog-template').content;
    
    // Display up to 5 most recent posts
    data.items.slice(0, 5).forEach(post => {
      const node = document.importNode(template, true);
      // Format date (e.g., "YYYY-MM-DD")
      const dateObj = new Date(post.pubDate);
      const dateStr = dateObj.toISOString().split('T')[0];
      
      node.querySelector('.post-date').textContent = dateStr;
      node.querySelector('.post-link').textContent = post.title;
      node.querySelector('.post-link').href = post.link;
      container.appendChild(node);
    });
  } catch (err) {
    // Graceful fallback
    container.innerHTML = `
      <li>
        <p>Couldn't fetch latest posts automatically. 
        <a href="https://williamong.bearblog.dev" target="_blank">Visit my blog directly</a>.</p>
      </li>`;
    console.error(err);
  }
}

// 4. Auto-close mobile menu on click
function setupMobileMenu() {
  const details = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-nav a');
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      details.removeAttribute('open');
    });
  });
}
