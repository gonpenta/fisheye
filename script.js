
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only run this logic if we are on mobile/tablet (less than 1024px)
            if (window.innerWidth < 1024) {
                // Prevent event from bubbling up to the document click listener
                e.stopPropagation();

                const isActive = this.classList.contains('active');

                // 1. Remove 'active' class from all other cards 
                // This ensures that when you click a new card, the previous one collapses
                menuItems.forEach(i => {
                    if (i !== this) {
                        i.classList.remove('active');
                    }
                });

                // 2. Toggle the 'active' class on the clicked card
                // If it was already active, this removes it (collapsing the card)
                // If it wasn't active, it adds it (expanding the card)
                if (isActive) {
                    this.classList.remove('active');
                } else {
                    this.classList.add('active');
                }
            }
        });
    });

    // 3. Unexpand when clicking anywhere else on the screen
    document.addEventListener('click', function() {
        if (window.innerWidth < 1024) {
            menuItems.forEach(item => item.classList.remove('active'));
        }
    });

    // Handle window resizing
    // If the user resizes from mobile to desktop, clean up any active classes
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            menuItems.forEach(item => item.classList.remove('active'));
        }
    });
});
