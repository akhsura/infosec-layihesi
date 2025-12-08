// Sol sidebar toggle (hamburger)
const hamburger = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icon");
const sidebar = document.querySelector("#sidebar");

if (hamburger && toggler && sidebar) {
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("expand");
        toggler.classList.toggle("bxs-chevrons-right");
        toggler.classList.toggle("bxs-chevrons-left");
    });
}

// Sağ sidebar açma funksiyası
function openRightSidebar(title, content) {
    const sidebarRight = document.getElementById("sidebar-right");
    if (!sidebarRight) return;

    document.getElementById("topic-title").innerText = title;
    document.getElementById("topic-content").innerText = content;

    sidebarRight.classList.add("show");
    document.body.style.overflow = "hidden"; // arxa planı scroll etmə
}

// Sağ sidebar bağlama funksiyası
function closeRightSidebar() {
    const sidebarRight = document.getElementById("sidebar-right");
    if (!sidebarRight) return;

    sidebarRight.classList.remove("show");
    document.body.style.overflow = ""; // scroll bərpa
}

// Sağ sidebar-dan kənara klikləsən bağlama
document.addEventListener("click", function(e) {
    const sidebarRight = document.getElementById("sidebar-right");
    if (!sidebarRight) return;

    if (sidebarRight.classList.contains("show") && e.target === sidebarRight) {
        closeRightSidebar();
    }
});

// Esc düyməsi ilə sağ sidebar bağlama
document.addEventListener("keydown", function(e) {
    const sidebarRight = document.getElementById("sidebar-right");
    if (!sidebarRight) return;

    if (e.key === "Escape" && sidebarRight.classList.contains("show")) {
        closeRightSidebar();
    }
});

$(document).ready(function(){
    // Navbar açılıb-bağlananda height problemi üçün
    $('#navbarNav').on('show.bs.collapse', function () {
        $(this).css('height', 'auto');
    });

    $('#navbarNav').on('hide.bs.collapse', function () {
        $(this).css('height', '0');
    });
});



