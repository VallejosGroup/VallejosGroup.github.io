if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme("dark");
        document.addEventListener('DOMContentLoaded', function() {
            const mode_toggle = document.getElementById("light-toggle");
        
            mode_toggle.addEventListener("load", function() {
                toggleTheme(localStorage.getItem("theme"));
            });
            mode_toggle.addEventListener("click", function() {
                toggleTheme(localStorage.getItem("theme"));
            });
        });
        
  } else {
    document.addEventListener('DOMContentLoaded', function() {
        const mode_toggle = document.getElementById("light-toggle");
    
        mode_toggle.addEventListener("click", function() {
            toggleTheme(localStorage.getItem("theme"));
        });
    });
  }

  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem('theme');
