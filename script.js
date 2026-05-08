/**
 * HireAI Dashboard Core Interactions
 * Refactored for modularity and performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Logic
    const sidebar = document.querySelector('aside');
    const overlay = document.getElementById('sidebar-overlay');
    const openBtn = document.getElementById('mobile-sidebar-open');
    const closeBtn = document.getElementById('mobile-sidebar-close');

    const toggleSidebar = (show) => {
        if (show) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('pointer-events-none', 'opacity-0');
            overlay.classList.add('opacity-100');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('pointer-events-none', 'opacity-0');
            overlay.classList.remove('opacity-100');
        }
    };

    if (openBtn) openBtn.addEventListener('click', () => toggleSidebar(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleSidebar(false));
    if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));

    // 2. Desktop Sidebar Collapse
    const desktopToggle = document.getElementById('desktop-sidebar-toggle');
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-hidden');
            // If the sidebar is hidden, we might want to change the icon or something,
            // but the user just asked to open/close it.
        });
    }

    // 3. Pipeline Tab Switching & Filtering
    const pipelineTabContainer = document.querySelector('.bg-muted.p-1');
    const pipelineItems = document.querySelectorAll('.pipeline-item');

    if (pipelineTabContainer) {
        const tabs = pipelineTabContainer.querySelectorAll('button');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');

                // Update active tab UI
                tabs.forEach(t => {
                    t.classList.remove('bg-card', 'text-foreground', 'shadow-sm');
                    t.classList.add('text-muted-foreground', 'hover:text-foreground');
                });
                tab.classList.add('bg-card', 'text-foreground', 'shadow-sm');
                tab.classList.remove('text-muted-foreground', 'hover:text-foreground');

                // Filter items
                pipelineItems.forEach(item => {
                    const status = item.getAttribute('data-status');
                    if (filter === 'All' || status === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. Navigation Item Selection
    const navLinks = document.querySelectorAll('aside nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle internal-like links
            const href = link.getAttribute('href');
            if (href && (href === '#' || href.startsWith('/'))) {
                e.preventDefault();
            }

            navLinks.forEach(l => {
                l.classList.remove('bg-sidebar-accent', 'text-white', 'active');
                l.classList.add('text-sidebar-foreground');
                // Hide indicator if exists
                const indicator = l.querySelector('span.absolute');
                if (indicator) indicator.classList.add('hidden');

                // Reset icon color
                const icon = l.querySelector('svg');
                if (icon) icon.classList.remove('text-white');
            });

            link.classList.add('bg-sidebar-accent', 'text-white', 'active');
            link.classList.remove('text-sidebar-foreground');
            // Show indicator
            const indicator = link.querySelector('span.absolute');
            if (indicator) indicator.classList.remove('hidden');

            // Set icon color
            const icon = link.querySelector('svg');
            if (icon) icon.classList.add('text-white');

            // Close mobile sidebar on navigation
            if (window.innerWidth < 1024) {
                toggleSidebar(false);
            }
        });
    });

    // 5. Tooltip/Hover effects for cards (Simulation)
    const cards = document.querySelectorAll('.bg-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Any subtle hover logic if not handled by CSS
        });
    });
});
