document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNav = document.getElementById('mobile-nav');
    const sections = document.querySelectorAll('.content-section');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const clickableElements = document.querySelectorAll('.clickable');

    function navigate(hash) {
        const targetHash = hash || '#overview';
        
        // Update active link
        navLinks.forEach(link => {
            if (link.hash === targetHash) {
                link.classList.add('active', 'text-sky-600', 'border-sky-600');
            } else {
                link.classList.remove('active', 'text-sky-600', 'border-sky-600');
            }
        });

        // Show target section
        sections.forEach(section => {
            if (`#${section.id}` === targetHash) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        // Update mobile nav selection
        mobileNav.value = targetHash.substring(1);
    }

    // Handle desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, null, e.target.hash);
            navigate(e.target.hash);
        });
    });
    
    // Handle mobile navigation
    mobileNav.addEventListener('change', (e) => {
           const hash = `#${e.target.value}`;
           history.pushState(null, null, hash);
           navigate(hash);
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        navigate(window.location.hash);
    });

    // Handle modal interactions
    clickableElements.forEach(el => {
        el.addEventListener('click', () => {
            modalTitle.textContent = el.dataset.title;
            modalContent.textContent = el.dataset.content;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });
    
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    // Initialize page based on URL hash
    navigate(window.location.hash || '#overview');
    
    // Chart.js implementation
    const ctx = document.getElementById('remediationChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['NULL Customer ID', 'Invalid Country Code', 'Negative Quantity', 'Future Order Date', 'Other'],
            datasets: [{
                label: 'Data Quality Issues',
                data: [120, 85, 45, 25, 15],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',  // red-500
                    'rgba(249, 115, 22, 0.8)', // orange-500
                    'rgba(234, 179, 8, 0.8)',  // yellow-500
                    'rgba(139, 92, 246, 0.8)', // violet-500
                    'rgba(107, 114, 128, 0.8)' // gray-500
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(107, 114, 128, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Breakdown of Quarantined Record Issues'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + ' records';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});