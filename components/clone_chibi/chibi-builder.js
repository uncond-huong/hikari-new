import { state } from '../../config.js';

// OUTFIT
const outfitDatabase = {
    // Set 1: Default
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






// Lấy giờ theo máy
function getCurrentSlot() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'everning';
    return 'night'
}

function getRandomDialog() {
    const currentSlot = getCurrentSlot();
    const currentOutfit = getEquippedOutfit();
    const currentOutfitPool = outfitDatabase.filter(item => item.outfitId === currentOutfit);
    const roll = Math.random();

    // 1. Tầng UR (0.03% = 0.0003)
    if (roll < 0.0003) {
        const urList = currentOutfitPool.filter(item => item.rarity === 'UR');
        if (urList.length > 0) return getRandomItem(urList);
    }
    // 2. Tầng SSR (1% = 0.01)
    if (roll < 0.01) {
        const ssrList = currentOutfitPool.filter(item => item.rarity === 'SSR');
         if (ssrList.length > 0) return getRandomItem(ssrList);
    }
    // 3. Tầng SR (5% = 0.05)
    if (roll < 0.05) {
        const srList = currentOutfitPool.filter(item => item.rarity === 'SR');
         if (srList.length > 0) return getRandomItem(srList);
    }
    // 4. Tầng NORMAL (~94%)
    const normalList = currentOutfitPool.filter(item => 
        !item.rarity && (item.slot === currentSlot || item.slot === 'all'));
    
    return getRandomItem(normalList);
}

// Thanh EXP
export function initChibi() {
  const interactBtn = document.getElementById('btn-chibi-interact');
  const bubbleEl = document.getElementById('bubble-phuong');
  const textEl = document.getElementById('chibi-text-phuong');
  const expFillEl = document.getElementById('chibi-exp-fill');
  const expTextEl = document.getElementById('chibi-exp-text');
  const levelTagEl = document.getElementById('chibi-level-tag');

  function renderChibiStatus() {
    if (expFillEl) expFillEl.style.width = `${state.chibi.exp}%`;
    if (expTextEl) expTextEl.textContent = `${state.chibi.exp}%`;
    if (levelTagEl) levelTagEl.textContent = `Lv.${state.chibi.level}`;
  }

  function speakRandomDialogue() {
    if (!textEl || !bubbleEl) return;

    // Lấy ngẫu nhiên 1 câu nói
    const randomIndex = Math.floor(Math.random() * state.chibi.dialogues.length);
    textEl.textContent = state.chibi.dialogues[randomIndex];

    // Hiện bong bóng thoại
    bubbleEl.classList.remove('hidden');

    // Tăng nhẹ % EXP khi tương tác
    if (state.chibi.exp < 100) {
      state.chibi.exp = Math.min(100, state.chibi.exp + 2);
      renderChibiStatus();
    } else {
      // Level Up!
      state.chibi.level += 1;
      state.chibi.exp = 0;
      renderChibiStatus();
      alert(`🎉 Tiểu Thế Phương đã thăng cấp lên Lv.${state.chibi.level}!`);
    }
  }

  if (interactBtn) {
    interactBtn.addEventListener('click', speakRandomDialogue);
  }

  renderChibiStatus();
}

