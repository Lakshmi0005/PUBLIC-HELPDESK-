// Services data with referral links
const services = [
    { 
        id: 1, 
        title: 'Birth Certificate', 
        description: 'Apply for a birth certificate',
        link: 'https://onlineap.meeseva.gov.in/CitizenPortal/UserInterface/Citizen/Home.aspx'
    },
    { 
        id: 2, 
        title: 'Passport Services', 
        description: 'Passport application and renewal',
        link: 'https://www.passportindia.gov.in/AppOnlineProject/welcomeLink#main-content'
    },
    { 
        id: 3, 
        title: 'Vehicle Registration', 
        description: 'Register or renew vehicle registration',
        link: 'https://aptransport.org/html/tempregistration-non-transport-vehicles.html'
    },
    { 
        id: 4, 
        title: 'White Card to Pink Card', 
        description: 'Convert your white ration card to pink card',
        link: 'https://onlineap.meeseva.gov.in/CitizenPortal/UserInterface/Citizen/Home.aspx'
    },
    { 
        id: 5, 
        title: 'PAN Card', 
        description: 'Apply for new PAN card or corrections',
        link: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html'
    },
    { 
        id: 6, 
        title: 'Driving License', 
        description: 'Apply for new license or renewal',
        link: 'https://sarathi.parivahan.gov.in/'
    },
    { 
        id: 7, 
        title: 'Income Certificate', 
        description: 'Apply for income certificate',
        link: 'https://serviceonline.gov.in/'
    },
    
    
];
document.getElementById('navSearchInput').addEventListener('input', function () {
    document.getElementById('searchInput').value = this.value; // mirror input
    renderServices(); // trigger filtering
});



// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Live chat functionality
    const chatBtn = document.querySelector('.live-chat-card .assistance-btn');
    
    chatBtn.addEventListener('click', function() {
        // Create chat dialog
        const chatDialog = document.createElement('div');
        chatDialog.className = 'chat-dialog';
        chatDialog.innerHTML = `
            <div class="chat-header">
                <h3>Live Chat Support</h3>
                <button class="close-chat">&times;</button>
            </div>
            <div class="chat-messages">
                <p class="system-message">Connecting to a support representative...</p>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." disabled>
                <button disabled>Send</button>
            </div>
        `;
        
        document.body.appendChild(chatDialog);
        
        // Add close functionality
        const closeBtn = chatDialog.querySelector('.close-chat');
        closeBtn.addEventListener('click', function() {
            chatDialog.remove();
        });
        
        // Simulate connecting to chat
        setTimeout(() => {
            const messagesDiv = chatDialog.querySelector('.chat-messages');
            const inputField = chatDialog.querySelector('input');
            const sendButton = chatDialog.querySelector('button');
            
            messagesDiv.innerHTML += `
                <p class="system-message">Connected! Representative John is here to help.</p>
                <p class="agent-message">Hi! How can I assist you today?</p>
            `;
            
            inputField.disabled = false;
            sendButton.disabled = false;
            
            // Handle sending messages
            sendButton.addEventListener('click', sendMessage);
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
            
            function sendMessage() {
                const message = inputField.value.trim();
                if (message) {
                    messagesDiv.innerHTML += `
                        <p class="user-message">${message}</p>
                    `;
                    inputField.value = '';
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
            }
        }, 2000);
    });
    
    // Callback button functionality
    const callbackBtn = document.querySelector('.assistance-card:nth-child(1) .assistance-btn');
    callbackBtn.addEventListener('click', function() {
        const phoneNumber = prompt('Please enter your phone number for a callback:');
        if (phoneNumber) {
            alert(`Thank you! We'll call you back at ${phoneNumber} shortly.`);
        }
    });
    
    // Email support button functionality
    const emailBtn = document.querySelector('.assistance-card:nth-child(2) .assistance-btn');
    emailBtn.addEventListener('click', function() {
        window.location.href = 'mailto:help@government.com';
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Tab navigation
    const navButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    let currentTabIndex = 0;
    const tabs = Array.from(tabContents);

    function showTab(index) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const currentTab = tabs[index];
        const currentButton = navButtons[index];
        
        currentTab.classList.add('active');
        currentButton?.classList.add('active');
    }

    // Service cards carousel functionality
    let currentSlide = 0;
    const totalSlides = 3; // Number of slides (6 services / 2 per slide)
    const serviceGrid = document.querySelector('.service-grid');
    const carouselDots = document.querySelector('.carousel-dots');

    function updateCarousel() {
        serviceGrid.style.transform = `translateX(-${currentSlide * 33.33}%)`; // 100% / 3 slides
        
        // Update dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Create carousel dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
        });
        carouselDots.appendChild(dot);
    }

    // Auto-advance carousel every 3 seconds
    setInterval(nextSlide, 3000);

    // Initialize services list
    const servicesList = document.getElementById('servicesList');
    const searchInput = document.getElementById('searchInput');

    function renderServices(searchQuery = '') {
        const filteredServices = services.filter(service => 
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        servicesList.innerHTML = filteredServices.map(service => `
            <div class="service-item">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="${service.link}" target="_blank" rel="noopener noreferrer">Apply Now →</a>
            </div>
        `).join('');
    }
    
    
  // Optional JavaScript to show/hide clear button
  document.getElementById('navSearchInput').addEventListener('input', function(e) {
    const searchContainer = e.target.closest('.nav-search');
    if (e.target.value) {
      searchContainer.classList.add('has-input');
      searchContainer.querySelector('svg').style.display = 'none';
    } else {
      searchContainer.classList.remove('has-input');
      searchContainer.querySelector('svg').style.display = 'block';
    }
  });

  // Clear input when X is clicked
  document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-search::after')) {
      const searchInput = e.target.closest('.nav-search').querySelector('input');
      searchInput.value = '';
      searchInput.focus();
      searchInput.dispatchEvent(new Event('input'));
    }
  });


    // Initial render of services
    renderServices();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        renderServices(e.target.value);
    });
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTab(index);
        });
    });
    // Login button functionality
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        alert('Login functionality will be available soon!');
    });

    // Visitor counter
    let visitorCount = 1;
    const visitorCountElement = document.getElementById('visitorCount');

    // Update visitor count every 5 minutes
    setInterval(() => {
        visitorCount++;
        visitorCountElement.textContent = visitorCount;
    }, 300000);
});

  document.addEventListener('DOMContentLoaded', function() {
    // Live chat functionality
    const chatBtn = document.querySelector('.live-chat-card .assistance-btn');
    
    chatBtn.addEventListener('click', function() {
      // You would replace this with your actual chat implementation
      alert('Connecting you to a live representative...');
      // Example: window.open('your-chat-url', '_blank');
    });
    
    // Other button functionality
    const callbackBtn = document.querySelector('.assistance-card:nth-child(1) .assistance-btn');
    const emailBtn = document.querySelector('.assistance-card:nth-child(2) .assistance-btn');
    
    callbackBtn.addEventListener('click', function() {
      alert('Please enter your phone number for a callback:');
    });
    
    emailBtn.addEventListener('click', function() {
      window.location.href = 'mailto:help@government.com';
    });
  });
  // Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Live chat functionality
    const chatBtn = document.querySelector('.live-chat-card .assistance-btn');
    
    chatBtn.addEventListener('click', function() {
        // You can replace this with your actual chat implementation
        alert('Connecting you to a live representative...');
    });
    
    // Callback button functionality
    const callbackBtn = document.querySelector('.assistance-card:nth-child(1) .assistance-btn');
    callbackBtn.addEventListener('click', function() {
        const phoneNumber = prompt('Please enter your phone number for a callback:');
        if (phoneNumber) {
            alert(`Thank you! We'll call you back at ${phoneNumber} shortly.`);
        }
    });
    
    // Email support button functionality
    const emailBtn = document.querySelector('.assistance-card:nth-child(2) .assistance-btn');
    emailBtn.addEventListener('click', function() {
        window.location.href = 'mailto:help@government.com';
    });
});
// Feedback star rating system
const stars = document.querySelectorAll('.rating-stars .star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    updateStars(rating);
  });

  star.addEventListener('mouseout', () => {
    updateStars(selectedRating);
  });

  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-rating'));
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach(star => {
    const currentRating = parseInt(star.getAttribute('data-rating'));
    if (currentRating <= rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}


  document.querySelector('.grievance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you! Your grievance has been submitted.");
    this.reset();
  });

  document.querySelector('.submit-feedback').addEventListener('click', () => {
    const comments = document.querySelector('.feedback-system textarea').value;
    if (selectedRating > 0) {
      alert(`Thanks for rating us ${selectedRating} star(s)!`);
      // You can also show a styled thank-you box here instead of alert
    } else {
      alert('Please select a rating before submitting.');
    }
  });