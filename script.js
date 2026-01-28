document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const fisheyeMenu = document.querySelector('.fisheye-menu');
    let clickedItem = null;

    // Function to update menu state
    function updateMenuState() {
        const hasActive = Array.from(menuItems).some(item => 
            item.classList.contains('active') || item.classList.contains('clicked')
        );
        if (hasActive) {
            fisheyeMenu.classList.add('has-active');
        } else {
            fisheyeMenu.classList.remove('has-active');
        }
    }

    // Handle mouse events
    menuItems.forEach(item => {
        // Mouse enter - expand item (unless another is clicked)
        item.addEventListener('mouseenter', function() {
            // If another item is clicked, don't expand on hover
            if (clickedItem && clickedItem !== this) {
                return;
            }
            this.classList.add('active');
            updateMenuState();
        });

        // Mouse leave - collapse only if not clicked
        item.addEventListener('mouseleave', function() {
            // Only remove active if not the clicked item
            if (this !== clickedItem) {
                this.classList.remove('active');
                updateMenuState();
            }
        });

        // Click event - toggle persistent expansion
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const wasClicked = (this === clickedItem);
            
            // Remove clicked state from all items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('clicked');
                menuItem.classList.remove('active');
            });
            
            // Toggle clicked state
            if (wasClicked) {
                // If it was already clicked, unclick it
                clickedItem = null;
            } else {
                // Otherwise, make this the clicked item
                this.classList.add('clicked');
                this.classList.add('active');
                clickedItem = this;
            }
            updateMenuState();
        });
    });

    // Click outside to close all items
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item')) {
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('clicked');
            });
            clickedItem = null;
            updateMenuState();
        }
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
        } else if (e.key === 'Escape') {
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('clicked');
            });
            currentIndex = -1;
            activeItem = null;
        } else if (e.key === 'Enter' && currentIndex >= 0) {
            menuItems[currentIndex].click();
        }
    });
});
