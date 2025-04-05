document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
            navLinks.style.display = 'none';
        }
    });
    
    // Sample AI Tools Data
    const aiTools = [
        {
            id: 1,
            name: "ChatGPT",
            description: "Advanced AI chatbot that can understand and generate human-like text responses.",
            category: ["Text", "Productivity"],
            pricing: "free",
            image: "https://images.unsplash.com/photo-1682686580391-615b4b8bd364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        },
        {
            id: 2,
            name: "Midjourney",
            description: "AI-powered image generation tool that creates stunning artwork from text prompts.",
            category: ["Image", "Art"],
            pricing: "paid",
            image: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        },
        {
            id: 3,
            name: "Grammarly",
            description: "AI writing assistant that helps you write mistake-free and polished content.",
            category: ["Text", "Writing"],
            pricing: "premium",
            image: "https://images.unsplash.com/photo-1682686580391-615b4b8bd364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        },
        {
            id: 4,
            name: "Runway ML",
            description: "Creative toolkit that makes AI accessible for video editing and generation.",
            category: ["Video", "Editing"],
            pricing: "paid",
            image: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        },
        {
            id: 5,
            name: "GitHub Copilot",
            description: "AI pair programmer that suggests code and entire functions in real-time.",
            category: ["Code", "Development"],
            pricing: "premium",
            image: "https://images.unsplash.com/photo-1682686580391-615b4b8bd364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        },
        {
            id: 6,
            name: "Notion AI",
            description: "AI-powered workspace that helps with writing, summarization, and task management.",
            category: ["Productivity", "Writing"],
            pricing: "premium",
            image: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
        }
    ];
    
    // Render AI Tools
    const toolsGrid = document.querySelector('.tools-grid');
    
    function renderTools(tools) {
        toolsGrid.innerHTML = '';
        
        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card fade-in';
            
            toolCard.innerHTML = `
                <div class="tool-image">
                    <img src="${tool.image}" alt="${tool.name}">
                </div>
                <div class="tool-content">
                    <h3 class="tool-title">${tool.name}</h3>
                    <p class="tool-description">${tool.description}</p>
                    <div class="tool-meta">
                        <span class="tool-pricing ${tool.pricing}">${tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}</span>
                        <button class="btn btn-secondary">Visit</button>
                    </div>
                    <div class="tool-categories">
                        ${tool.category.map(cat => `<span class="tool-category">${cat}</span>`).join('')}
                    </div>
                </div>
            `;
            
            toolsGrid.appendChild(toolCard);
        });
    }
    
    // Initial render
    renderTools(aiTools);
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.textContent.toLowerCase();
            
            // Filter tools
            let filteredTools = [...aiTools];
            
            if (filterValue === 'free') {
                filteredTools = aiTools.filter(tool => tool.pricing === 'free');
            } else if (filterValue === 'premium') {
                filteredTools = aiTools.filter(tool => tool.pricing === 'premium');
            } else if (filterValue === 'paid') {
                filteredTools = aiTools.filter(tool => tool.pricing === 'paid');
            } else if (filterValue === 'new') {
                // For demo purposes, we'll just reverse the array
                filteredTools = [...aiTools].reverse();
            }
            
            // Re-render tools
            renderTools(filteredTools);
        });
    });
    
    // Submit Tool Button
    const submitToolBtn = document.getElementById('submit-tool');
    
    submitToolBtn.addEventListener('click', () => {
        alert('Thank you for your interest in submitting a tool! Our submission form will be available soon.');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.style.display = 'none';
            }
        });
    });
});