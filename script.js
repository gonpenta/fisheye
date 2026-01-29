document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const fisheyeMenu = document.querySelector('.fisheye-container');


    // Function to update menu state
    function updateMenuState() {
        const hasActive = Array.from(menuItems).some(item => 
            item.classList.contains('active')
        );
        if (hasActive) {
            fisheyeMenu.classList.add('has-active');
        } else {
            fisheyeMenu.classList.remove('has-active');
        }
    }

    // Handle mouse events
    menuItems.forEach(item => {
        // Mouse enter - expand item
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
            updateMenuState();
        });

        // Mouse leave - collapse
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            updateMenuState();
        });
    });

    // Keyboard navigation support
    let currentIndex = -1;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % menuItems.length;
            menuItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            menuItems[currentIndex].classList.add('active');
            menuItems.forEach((item, index) => {
                if (index !== currentIndex) {
                    item.classList.remove('active');
                }
            });
            updateMenuState();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            menuItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            menuItems[currentIndex].classList.add('active');
            menuItems.forEach((item, index) => {
                if (index !== currentIndex) {
                    item.classList.remove('active');
                }
            });
            updateMenuState();
        } else if (e.key === 'Escape') {
            menuItems.forEach(item => {
                item.classList.remove('active');
            });
            currentIndex = -1;
            updateMenuState();
        }
    });
});
