// Script for HireAI Dashboard Clone

document.addEventListener('DOMContentLoaded', () => {
    // Handle toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    toggleSwitches.forEach(switchEl => {
        switchEl.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // If this is the AI Auto Apply toggle, we could show/hide the status
            if (this.closest('.ai-apply-card')) {
                const statusIndicator = document.querySelector('.status-indicator');
                if (this.classList.contains('active')) {
                    statusIndicator.style.display = 'flex';
                } else {
                    statusIndicator.style.display = 'none';
                }
            }
        });
    });

    // Handle pipeline tabs
    const pipelineTabs = document.querySelectorAll('.pipeline-tabs .tab');
    pipelineTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            pipelineTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically filter the pipeline list
            // For now, it just changes the UI state
        });
    });

    // Handle sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // If it's the auto-apply item (has a toggle), don't prevent default completely 
            // to allow the toggle to work, but don't navigate
            if (this.querySelector('.toggle-switch') && e.target.classList.contains('toggle-switch')) {
                return;
            }
            
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle save buttons on job cards
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.classList.add('text-purple');
            } else {
                icon.classList.add('fa-regular');
                icon.classList.remove('fa-solid');
                icon.classList.remove('text-purple');
            }
        });
    });
    
    // Copy link button
    const copyBtn = document.querySelector('.copy-link button');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.select();
            input.setSelectionRange(0, 99999); // For mobile devices
            
            // In a real app, you'd use navigator.clipboard.writeText
            
            // Visual feedback
            const icon = this.querySelector('i');
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');
            
            setTimeout(() => {
                icon.classList.add('fa-copy');
                icon.classList.remove('fa-check');
            }, 2000);
        });
    }
});
