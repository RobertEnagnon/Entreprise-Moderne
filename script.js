document.addEventListener('DOMContentLoaded', () => {
    // Charger les données JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Remplir les services
            const serviceGrid = document.getElementById('service-grid');
            data.services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.innerHTML = `
                    <img src="${service.image}" alt="${service.name}">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                `;
                serviceGrid.appendChild(serviceCard);
            });

            // Remplir les témoignages
            const testimonialGrid = document.getElementById('testimonial-grid');
            data.testimonials.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.innerHTML = `
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                    <p class="quote">"${testimonial.quote}"</p>
                    <div class="author">${testimonial.name}</div>
                    <div class="company">${testimonial.company}</div>
                `;
                testimonialGrid.appendChild(testimonialCard);
            });

            // Animation des cartes de service au défilement
            const serviceCards = document.querySelectorAll('.service-card');
            const observerOptions = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            serviceCards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                observer.observe(card);
            });
        });

    // Navigation mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire de contact avec localStorage
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData  = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        };

        // Simuler l'envoi des données (dans un vrai scénario, vous enverriez ces données à un serveur)
        console.log('Données du formulaire:', formData);

        // Sauvegarder les données dans localStorage
        localStorage.setItem('lastContactSubmission', JSON.stringify(formData));

        // Réinitialiser le formulaire
        contactForm.reset();

        // Afficher un message de confirmation
        alert('Merci pour votre message ! Nous vous contacterons bientôt.');
    });

    // Charger les dernières données soumises depuis localStorage (pour démonstration)
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
        const lastData = JSON.parse(lastSubmission);
        console.log('Dernière soumission:', lastData);
    }
});

// Animation GSAP pour le titre principal
gsap.from('.hero h1', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero p', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.cta-button', {
    duration: 1,
    scale: 0.5,
    opacity: 0,
    ease: 'back.out(1.7)',
    delay: 1
});