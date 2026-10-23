import { state } from '../../config.js';

// ==================== DATABASE OUTFIT & THOẠI ====================
const outfitDatabase = [
    // Set 1: Mặc định
    {
        id: 'default',
        name: 'Mặc định',
        folder: 'assets/phuong/default',
        poses: [
            { outfitId: 'default', poseId: 1, dialog: 'Ganbatte, yeh yeh, mọi điều tốt sẽ đến với cậu', slot: 'all'},
            { outfitId: 'default', poseId: 2, dialog: 'Tui luôn ở đây với cậu nè', slot: 'all'},
            { outfitId: 'default', poseId: 3, dialog: 'Konichiwa! Chúc cậu 1 ngày tốt lành', slot: 'morning'},
            { outfitId: 'default', poseId: 4, dialog: 'Cứ yên tâm, có tui ở đây rùi', slot: 'all'},
            { outfitId: 'default', poseId: 5, dialog: 'Hôm nay mệt rùi, nghỉ ngơi chút xíu nè', slot: 'evening'},
            { outfitId: 'default', poseId: 6, dialog: 'Trò chuyện chút hong, tui vẫn luôn lắng nghe nè =))', slot: 'all'},
            { outfitId: 'default', poseId: 7, dialog: 'Nghỉ trưa xíu nè', slot: 'afternoon'},
            { outfitId: 'default', poseId: 8, dialog: 'Max speed tới đây', rarity: 'SR' },
            { outfitId: 'default', poseId: 9, dialog: 'Cần là có, đồng hành mọi nơi', slot: 'all'},
            { outfitId: 'default', poseId: 10, dialog: 'Chúc cậu có một giấc ngủ thật yên bình', slot: 'night'},
            { outfitId: 'default', poseId: 11, dialog: 'Tui luôn ở đây, đồng hành cùng cậu', slot: 'all'},
            { outfitId: 'default', poseId: 12, dialog: 'Highlands tài trợ tới rùi đây!', rarity: 'SSR' },
            { outfitId: 'default', poseId: 13, dialog: 'Ăn chút gì nha!', slot: 'all'},
            { outfitId: 'default', poseId: 14, dialog: 'Cùng chăm sóc những điều đáng yêu nha', slot: 'all'},
            { outfitId: 'default', poseId: 15, dialog: 'Hù nè', rarity: 'SR' },
            { outfitId: 'default', poseId: 16, dialog: 'Cùng nhau cố gắng nhen', slot: 'evening'},
        ]
    }
];

// Lấy ID Outfit đang mặc
function getEquippedOutfit() {
    return localStorage.getItem('hikari_equipped_outfit') || 'default';
}

function getCurrentSlot() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
}

// BẢO HỘ TÂN THỦ (3 NGÀY) & COOLDOWN (SSR: 30 NGÀY / UR: 180 NGÀY)
function canTriggerRare(rarity) {
    let firstOpen = localStorage.getItem('hikari_first_open_time');
    if (!firstOpen) {
        firstOpen = Date.now().toString();
        localStorage.setItem('hikari_first_open_time', firstOpen);
    }

    // 1. Bảo hộ tân thủ 3 ngày đầu -> Khóa sạch
    const daysPassed = (Date.now() - parseInt(firstOpen)) / (1000 * 60 * 60 * 24);
    if (daysPassed < 3) return { canRoll: false, isPity: false };

    const lastKey = rarity === 'UR' ? 'hikari_last_ur_time' : 'hikari_last_ssr_time';
    const cooldownDays = rarity === 'UR' ? 180 : 30; // UR: 180 ngày, SSR: 30 ngày
    const lastTime = localStorage.getItem(lastKey) || firstOpen;

    const daysSinceLast = (Date.now() - parseInt(lastTime)) / (1000 * 60 * 60 * 24);

    // 2. Chưa đủ thời gian Cooldown tối thiểu -> Chặn
    if (daysSinceLast < cooldownDays) return { canRoll: false, isPity: false };

    // 3. BẢO HIỂM HARD PITY: 
    // Nếu quá Cooldown + 7 ngày (Tròn ~187 ngày) mà vẫn chưa nổ UR do xui xẻo -> ÉP NỔ 100%!
    const isPity = rarity === 'UR' && daysSinceLast >= (cooldownDays + 7);

    return { canRoll: true, isPity: isPity };
}

// HÀM QUAY GACHA THOẠI 4 TẦNG
export function getRandomDialog() {
    const currentSlot = getCurrentSlot();
    const currentOutfitId = getEquippedOutfit();

    const currentSet = outfitDatabase.find(set => set.id === currentOutfitId) || outfitDatabase[0];
    const currentOutfitPool = currentSet ? currentSet.poses : [];

    if (currentOutfitPool.length === 0) return null;

    const roll = Math.random();
    const urStatus = canTriggerRare('UR');
    const ssrStatus = canTriggerRare('SSR');

    let selectedPose = null;

    // TẦNG UR: Kích hoạt khi TRÚNG RỒI (0.03%) HOẶC ĐẠT BẢO HIỂM HARD PITY (100%)
    if (urStatus.canRoll && (roll < 0.0003 || urStatus.isPity)) {
        const urList = currentOutfitPool.filter(item => item.rarity === 'UR');
        if (urList.length > 0) {
            localStorage.setItem('hikari_last_ur_time', Date.now().toString());
            console.log(urStatus.isPity ? "Nổ UR nhờ Bảo hiểm Hard Pity!" : "Nổ UR nhờ Nhân phẩm!");
            selectedPose = getRandomItem(urList);
        }
    }
    // TẦNG SSR (1%)
    if (!selectedPose && ssrStatus.canRoll && (roll < 0.01 || ssrStatus.isPity)) {
        const ssrList = currentOutfitPool.filter(item => item.rarity === 'SSR');
        if (ssrList.length > 0) {
            localStorage.setItem('hikari_last_ssr_time', Date.now().toString());
            selectedPose = getRandomItem(ssrList);
        }
    }
    // TẦNG SR (5%)
    if (!selectedPose && roll < 0.06) {
        const srList = currentOutfitPool.filter(item => item.rarity === 'SR');
        if (srList.length > 0) selectedPose = getRandomItem(srList);
    }
    // TẦNG NORMAL (~94%)
    if (!selectedPose) {
        const normalList = currentOutfitPool.filter(item => 
            !item.rarity && (item.slot === currentSlot || item.slot === 'all')
        );
        selectedPose = getRandomItem(normalList.length > 0 ? normalList : currentOutfitPool);
    }
    if (!selectedPose) return null;
    // Đường dẫn ảnh
    return {
        ...selectedPose, 
        imgUrl: `${currentSet.folder}/${selectedPose.poseId}.png`
    };
}


// Hàm bốc ngẫu nhiên 1 item trong mảng
function getRandomItem(array) {
    if (!array || array.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// ==================== QUẢN LÝ THANH EXP & TƯƠNG TÁC ====================
export function initChibi() {
  const interactBtn = document.getElementById('btn-chibi-interact');
  const bubbleEl = document.getElementById('bubble-phuong') || document.getElementById('speech-box');
  const textEl = document.getElementById('chibi-text-phuong') || document.getElementById('dialog');
  const expFillEl = document.getElementById('chibi-exp-fill');
  const expTextEl = document.getElementById('chibi-exp-text');
  const levelTagEl = document.getElementById('chibi-level-tag');

  function renderChibiStatus() {
    if (!state || !state.chibi) return;
    if (expFillEl) expFillEl.style.width = `${state.chibi.exp}%`;
    if (expTextEl) expTextEl.textContent = `${state.chibi.exp}%`;
    if (levelTagEl) levelTagEl.textContent = `Lv.${state.chibi.level}`;
  }

  function speakRandomDialogue() {
    if (!textEl) return;

    // Gọi hàm Gacha 4 tầng đã thiết lập tỉ lệ chuẩn
    const dialogData = getRandomDialog();
    if (dialogData) {
        textEl.textContent = dialogData.dialog;
        if (bubbleEl) bubbleEl.classList.remove('hidden');
    }

    // Tăng % EXP khi tương tác
    if (state && state.chibi) {
      if (state.chibi.exp < 100) {
        state.chibi.exp = Math.min(100, state.chibi.exp + 2);
        renderChibiStatus();
      } else {
        // Level Up!
        state.chibi.level += 1;
        state.chibi.exp = 0;
        renderChibiStatus();
        alert(`🎉 Thăng cấp lên Lv.${state.chibi.level}!`);
      }
    }
  }

  if (interactBtn) {
    interactBtn.addEventListener('click', speakRandomDialogue);
  }

  renderChibiStatus();
}

