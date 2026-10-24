// ==========================================
// FILE CHÍNH KHỞI CHẠY HIKARI SPACE (FULL INTEGRATED)
// ==========================================

// 0. Khởi tạo Firebase SDK (Bắt buộc nạp đầu tiên)
import { app, auth, db } from './firebase.js';

// 1. Import các module hệ thống cốt lõi
import { buildClockTicks, updateClockWidget } from './components/clock/clock.js';
import { initAuth, setupProfileEvents } from './components/auth/auth.js';
import { setupAvatarEvents, setupChangePasswordEvents } from './components/avatar/profile.js';

// 2. Import Utilities
import { uploadToCloudinary } from './components/utils/cloudinary.js';

// 3. Import Companion & Outfit Modules
import { renderChibiOutfit, equipItem } from './components/companion/wardrobe.js';
import { getRandomDialog, initChibi } from './components/clone_chibi/chibi-builder.js';
import { askGeminiChibi } from './components/companion/events.js';

// 4. Khởi tạo Đồng hồ Kép (Việt Nam & Nhật Bản)
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

// 5. Chuyển Tab Navigation (Bottom Nav)
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

// 6. Đồng bộ Outfit Chibi từ Firebase
export function syncChibiFromFirebase(data) {
    if (data && data.outfit) {
        renderChibiOutfit(data.outfit);
    }
}

// 7. Hàm toàn cục hỗ trợ mặc đồ từ giao diện tủ đồ
window.handleEquipItem = function(characterId, slot, itemImgUrl, itemId) {
    equipItem(characterId, slot, itemImgUrl, itemId);
};

// ==========================================
// 8. XỬ LÝ SỰ KIỆN TƯƠNG TÁC CÙNG CHIBI
// ==========================================
let bubbleTimeout = null;

export function setupChibiEvents() {
    const chibiImg = document.getElementById('chibiImg');
    const touchArea = document.getElementById('chibi-touch-area');
    const interactBtn = document.getElementById('btn-chibi-interact');
    const dialogText = document.getElementById('dialog');
    const speechBox = document.getElementById('speech-box');

    // Hàm gọi gacha, hiển thị thoại & cập nhật dáng pose Chibi
    const triggerDialog = () => {
        const data = getRandomDialog(); // Lấy thoại Rarity 4 tầng & imgUrl
        
        if (data) {
            // A. Đổi nội dung lời thoại
            if (dialogText) {
                dialogText.textContent = data.dialog;
            }

            // B. Đổi hình ảnh Chibi theo poseId tương ứng (tránh bị vỡ ảnh)
            if (chibiImg && (data.imgUrl || data.itemImgUrl)) {
                chibiImg.src = data.imgUrl || data.itemImgUrl;
            }

            // C. Hiện bóng thoại
            if (speechBox) {
                speechBox.classList.add('show');
            }

            // D. Hiệu ứng nảy Chibi khi tương tác
            if (chibiImg) {
                chibiImg.classList.remove('bounce-anim');
                void chibiImg.offsetWidth; // Trigger reflow
                chibiImg.classList.add('bounce-anim');
            }

            // E. Tự động ẩn bóng thoại sau 4 giây
            clearTimeout(bubbleTimeout);
            bubbleTimeout = setTimeout(() => {
                if (speechBox) speechBox.classList.remove('show');
            }, 4000);
        }
    };

    // Bấm vào hình Chibi, vùng Banner HOẶC Nút gậy phép đều nổ thoại
    if (touchArea) touchArea.addEventListener('click', triggerDialog);
    if (interactBtn) interactBtn.addEventListener('click', triggerDialog);

    // Kích hoạt thoại đầu tiên ngay khi mở App
    triggerDialog();
}

// ==========================================
// MAIN ENTRY POINT (DUY NHẤT 1 DOMContentLoaded)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log('🌸 HIKARI Space App Initialized!');

    // A. Khởi tạo Auth & Sync dữ liệu người dùng từ Firebase
    initAuth((userData) => {
        if (userData) {
            syncChibiFromFirebase(userData);
        }
    });

    // B. Chạy UI cơ bản & Khởi tạo Clock
    initClocks();
    setupNavigation();
    setupProfileEvents();

    // C. Sự kiện đổi trạng thái, avatar & mật khẩu   
    setupAvatarEvents();         
    setupChangePasswordEvents();  

    // D. Khởi tạo tương tác Chibi (Click gacha thoại & đổi pose)
    setupChibiEvents();
    initChibi();

    askGeminiChibi();

    // E. Đăng ký PWA Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("HIKARI PWA sẵn sàng!"))
            .catch(err => console.warn("Lỗi PWA:", err));
    }
});