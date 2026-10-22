// ==========================================
// FILE CHÍNH KHỞI CHẠY HIKARI SPACE (CLEANED)
// ==========================================

// 1. Import các module hệ thống cốt lõi
import { buildClockTicks, updateClockWidget } from './components/clock/clock.js';
import { initAuth, setupProfileEvents } from './components/auth/auth.js';
import { setupAvatarEvents, setupChangePasswordEvents } from './components/avatar/profile.js';

// 2. Import Logger & Companion Modules
import { renderChibiOutfit } from './components/clone_chibi/chibi-builder.js';

// 3. Khởi tạo Đồng hồ Kép (Việt Nam & Nhật Bản)
function initClocks() {
    buildClockTicks('clock-face-vn');
    buildClockTicks('clock-face-jp');
    
    const tick = () => {
        updateClockWidget('vn', 'Asia/Ho_Chi_Minh');
        updateClockWidget('jp', 'Asia/Tokyo');
    };
    
    tick();
    setInterval(tick, 1000);
}

// 4. Chuyển Tab Navigation (Bottom Nav)
function setupNavigation() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.id === 'btn-open-post') return;
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 5. Đồng bộ Outfit Chibi từ Firebase
export function syncChibiFromFirebase(data) {
    if (data && data.outfit) {
        renderChibiOutfit(data.outfit);
    }
}

// 6. Hàm toàn cục hỗ trợ mặc đồ từ giao diện tủ đồ
window.handleEquipItem = function(characterId, slot, itemImgUrl, itemId) {
    equipItem(characterId, slot, itemImgUrl, itemId);
};

// ==========================================
// MAIN ENTRY POINT (CHỈ NÊN CÓ 1 DOMContentLoaded)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log('🌸 HIKARI Space App Initialized!');

    // A. Chạy UI cơ bản & Khởi tạo Clock
    initClocks();
    setupNavigation();
    setupProfileEvents();

    // C. Sự kiện đổi trạng thái, avatar & mật khẩu   
    setupAvatarEvents();         
    setupChangePasswordEvents();  

    // D. Đăng ký PWA Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("HIKARI PWA sẵn sàng!"))
            .catch(err => console.warn("Lỗi PWA:", err));
    }
});