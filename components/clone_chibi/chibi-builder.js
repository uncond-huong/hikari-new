import { state } from '../../config.js';

// ==================== DATABASE OUTFIT & THOẠI ====================
const outfitDatabase = [
    // Set 1: Mặc định
    {
        id: 'default',
        name: 'Mặc định',
        folder: 'assets/phuong/default',
        poses: [
            { outfitId: 'default', poseId: 1, dialog: 'Ganbatte, yeh yeh, mọi điều tốt sẽ đến với cậu', dramaticDialog:'Không sao cả. Có tui ở đây, cậu cứ yên tâm mà tiến lên phía trước', slot: 'all'},
            { outfitId: 'default', poseId: 2, dialog: 'Ranh giới cậu đặt ra tui tôn trọng. Nhưng vị trí đồng hành này, tui chưa từng có ý định rời đi', rarity: 'UR' },
            { outfitId: 'default', poseId: 3, dialog: 'Konichiwa! Chúc cậu 1 ngày tốt lành', dramaticDialog:'Chỉ cần cậu quay đầu lại, tui sẽ luôn ở phía sau ủng hộ cậu', slot: 'morning'},
            { outfitId: 'default', poseId: 4, dialog: 'Cứ yên tâm, có tui ở đây rùi', dramaticDialog: 'Dù cả thế giới có xoay chuyển, tui vẫn ở đây là nơi bình yên nhất vì cậu', slot: 'all'},
            { outfitId: 'default', poseId: 5, dialog: 'Hôm nay mệt rùi, nghỉ ngơi chút xíu nè', dramaticDialog:'Những ngày trời xanh nhất, tui đều ước khoảng trời đó có sự bình yên của cậu', slot: 'evening'},
            { outfitId: 'default', poseId: 6, dialog: 'Trò chuyện chút hong, tui vẫn luôn lắng nghe nè =))', dramaticDialog:'Mọi tâm sự của cậu, tui đều cất giữ ở nơi an toàn nhất, chưa bao giờ bỏ sót một từ', slot: 'all'},
            { outfitId: 'default', poseId: 7, dialog: 'Nghỉ trưa xíu nè', dramaticDialog:'Công chúa, mệt thì cứ nghỉ, hãy cho phép mình yếu đuối', slot: 'afternoon'},
            { outfitId: 'default', poseId: 8, dialog: 'Max speed tới đây', rarity: 'SR' },
            { outfitId: 'default', poseId: 9, dialog: 'Cần là có, đồng hành mọi nơi', secretDialog:'Bấm gõ hoài nha, tính tiền công làm bạn đồng hành hả =))', slot: 'all'},
            { outfitId: 'default', poseId: 10, dialog: 'Chúc cậu có một giấc ngủ thật yên bình', dramaticDialog:'Mong những giấc mơ sắp tói của cậu chỉ toàn êm đềm, không còn bóng dáng lo âu', slot: 'night'},
            { outfitId: 'default', poseId: 11, dialog: 'Tui luôn ở đây, đồng hành cùng cậu', dramaticDialog:'Không cần gồng đâu, cứ thả lỏng đi, tui vẫn luôn ở đây', slot: 'all'},
            { outfitId: 'default', poseId: 12, dialog: 'Starbuck tài trợ tới rùi đây!', rarity: 'SSR' },
            { outfitId: 'default', poseId: 13, dialog: 'Ăn chút gì nha!', secretDialog:'Lại định nhịn ăn giảm cân đúng không? Bắt bài rùi nha, đi ăn ngay', slot: 'all'},
            { outfitId: 'default', poseId: 14, dialog: 'Cùng chăm sóc những điều đáng yêu nha', secretDialog:'Sau này hãy cùng nhau chăm sóc 1 bé Ragdoll nhé!', slot: 'all'},
            { outfitId: 'default', poseId: 15, dialog: 'Hù nè', rarity: 'SR' },
            { outfitId: 'default', poseId: 16, dialog: 'Cùng nhau cố gắng nhen', secretDialog:'Tương lai của ta do ta quyết định', slot: 'evening'},
        ]
    },
    // Set 2: Snow Leopard
    {
        id: 'snowleopard',
        name: 'Snow Leopard',
        folder: 'assets/phuong/snowleopard',
        poses: [
            { outfitId: 'snowleopard', poseId: 1, dialog: 'Bông tuyết đẹp và lớn nhất mùa đông này, tặng cậu nè!', dramaticDialog:'Băng rùi cũng sẽ tan, nhưng sự kiên định này tui giữ cho riêng cậu', slot: 'morning'},
            { outfitId: 'snowleopard', poseId: 2, dialog: 'Hứ, dỗi 7s', rarity: 'SR' },
            { outfitId: 'snowleopard', poseId: 3, dialog: 'Tui đang cố gắng tiến về phía cậu đấy', rarity: 'SSR'},
            { outfitId: 'snowleopard', poseId: 4, dialog: '3 năm hay bao lâu đi nữa, vị trí này tui luôn giữ vững, không bao giờ thay đổi', rarity: 'UR'},
            { outfitId: 'snowleopard', poseId: 5, dialog: 'Wow, bông tuyết nhỏ xinh, dễ thương nè!', dramaticDialog:'Chỉ cần cậu cười, cả vùng tuyết lạnh giá này cũng hóa thành mùa xuân', slot: 'evening'},
            { outfitId: 'snowleopard', poseId: 6, dialog: 'Chút năng lượng tích cực gửi tới cậu nè!', dramaticDialog:'Tui sẽ là ánh sáng dẫn đường cho cậu', slot: 'all'},
            { outfitId: 'snowleopard', poseId: 7, dialog: 'Ngầu không, ngồi giữa đống băng luôn nè =))', secretDialog:'Nhìn ngầu vậy thui chứ mông tui đang đống băng rùi nè...', slot: 'afternoon'},
            { outfitId: 'snowleopard', poseId: 8, dialog: 'Ngoan ngoan tui thương', rarity: 'SR' },
            { outfitId: 'snowleopard', poseId: 9, dialog: 'Bão tuyết ngoài kia kệ đi, ngủ một giấc thật ngon nào', dramaticDialog:'Trong giấc mơ của báo tuyết, bình yên luôn mang hình dáng của cậu', slot: 'night'},
            { outfitId: 'snowleopard', poseId: 10, dialog: 'Ranh giới đã định! Không một cơn bão nào được phép chạm tới cậu', rarity: 'SSR'},
            { outfitId: 'snowleopard', poseId: 11, dialog: 'Nơi bình yên nhất không phải nơi bão dừng...mà là nơi có cậu ở đó đứng cùng tui', rarity: 'SSR' },
            { outfitId: 'snowleopard', poseId: 12, dialog: 'Trà nóng sưởi ấm sự lạnh lẽo, còn sự tồn tại của cậu sưởi ấm cả hành trình thế giới này', rarity: 'SSR' },
            { outfitId: 'snowleopard', poseId: 13, dialog: '=)) con báo trèo lên đầu tui ngồi kìa', dramaticDialog:'Nguyên con báo tuyết trên đầu tui còn chịu được, chút áp lực này có là gì!', slot: 'all'},
            { outfitId: 'snowleopard', poseId: 14, dialog: 'Tuyết rơi đẹp quá nè! Hôm nay lại vui vẻ nha', dramaticDialog: 'Mỗi bông tuyết rơi xuống là một lời hứa kiên định tui gửi vào không trung', slot: ['morning', 'afternoon']},
            { outfitId: 'snowleopard', poseId: 15, dialog: 'Sau lưng tui nè, hehe', dramaticDialog:'Sau lưng tui không giấu gì đâu, tui sẽ không tổn thương cậu dù chỉ một chút', slot: 'all' },
            { outfitId: 'snowleopard', poseId: 16, dialog: 'Sao thế? Cậu lại đang nghĩ nhiều đúng không?', dramaticDialog:'Dù thế giới có khó hiểu đến đâu, tui vẫn luôn kiên nhẫn lắng nghe cảm xúc của cậu', slot: 'night'},
            { outfitId: 'snowleopard', poseId: 17, dialog: 'Tranh thủ nghiên cứu kiến thức nâng cấp bản thân...', secretDialog:'Thật ra tui mở sách ra làm màu thui chứ mắt dính lại rùi nè...', slot: 'evening'},
            { outfitId: 'snowleopard', poseId: 18, dialog: 'Tui muốn ôm cậu vào lòng, vỗ về và xua tan những lo âu của cậu', rarity: 'UR' },
            { outfitId: 'snowleopard', poseId: 19, dialog: 'Ủa...thấy tui hả? Núp kĩ vậy rùi mà', dramaticDialog:'Dù đóng băng cả thế giới, tui vẫn sẽ chừa một khoảng trống nhỏ để dõi theo cậu', slot: 'afternoon'},
        ]
    },
];

const secretCeoList = [
    { dialog: 'Em tưởng em bỏ bữa là tôi không biết sao? Cả cái khu này...đều là người của tôi!', secretImgSrc: './assets/phuong/ceo/1.png', slot: 'all' },
    { dialog: 'Phụ nữ! bát cơm này, em tự ăn hay để tui đút em ăn?', secretImgSrc: './assets/phuong/ceo/2.png', slot: ['afternoon', 'evening'] },
    { dialog: '23 giờ rồi mà vẫn chưa ngủ? Em định thức để ngắm tôi cả đêm sao?', secretImgSrc: './assets/phuong/ceo/3.png', slot: 'night' },
    { dialog: 'Đi ngủ ngay trước khi tôi đóng băng điện thoại của em', secretImgSrc: './assets/phuong/ceo/4.png', slot: 'night' },
    { dialog: 'Chỉ là mấy bài tiếng Nhật đơn giản này thôi sao? Em cứ ngoan ngoãn ngồi yên đó, để tôi mua lại cả cái trung tâm này cho em!...Nhưng trước mắt thì em tự làm đi!', secretImgSrc: './assets/phuong/ceo/5.png', slot: 'evening' },
    { dialog: 'Ở trước mặt tôi, em không cần phải gồng mình tỏ ra mạnh mẽ. Tôi cho phép em dựa vào tôi...5 phút!', secretImgSrc: './assets/phuong/ceo/6.png', slot: 'all' },
];

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

// BẢO HỘ TÂN THỦ & COOLDOWN
function canTriggerRare(rarity) {
    let firstOpen = localStorage.getItem('hikari_first_open_time');
    if (!firstOpen) {
        firstOpen = Date.now().toString();
        localStorage.setItem('hikari_first_open_time', firstOpen);
    }

    // 1. Bảo hộ tân thủ 3 ngày đầu -> Khóa sạch đồ hiếm
    const daysPassed = (Date.now() - parseInt(firstOpen)) / (1000 * 60 * 60 * 24);
    if (daysPassed < 3) return { canRoll: false, isPity: false };

    const lastKey = rarity === 'UR' ? 'hikari_last_ur_time' : 'hikari_last_ssr_time';
    const cooldownDays = rarity === 'UR' ? 180 : 30; 
    const lastTime = localStorage.getItem(lastKey);

    // Nếu CHƯA TỪNG nổ lần nào -> Cho phép roll ngay (coi như trôi qua 999 ngày)
    // Nếu ĐÃ TỪNG nổ -> Tính thời gian từ lần nổ cuối
    const daysSinceLast = lastTime ? (Date.now() - parseInt(lastTime)) / (1000 * 60 * 60 * 24) : 999;

    // 2. Chưa đủ Cooldown -> Chặn
    if (daysSinceLast < cooldownDays) return { canRoll: false, isPity: false };

    // 3. HARD PITY: Quá Cooldown + 7 ngày mà vẫn chưa ra -> Ép nổ 100%!
    const isPity = daysSinceLast >= (cooldownDays + 7);

    return { canRoll: true, isPity: isPity };
}

// HÀM XỬ LÝ LỌC CÂU THOẠI PHỤ (Dramatic / Secret)
function resolveFinalText(item) {
    if (!item) return '';
    // Tỷ lệ 5% nổ secretDialog
    if (item.secretDialog && Math.random() < 0.05) {
        return item.secretDialog;
    }
    // Tỷ lệ 10% nổ dramaticDialog
    if (item.dramaticDialog && Math.random() < 0.1) {
        return item.dramaticDialog;
    }
    return item.dialog;
}

// Kiểm tra slot (hỗ trợ cả String lẫn Array)
function isSlotMatching(itemSlot, currentSlot) {
    if (itemSlot === 'all') return true;
    if (Array.isArray(itemSlot)) return itemSlot.includes(currentSlot);
    return itemSlot === currentSlot;
}

// HÀM QUAY GACHA THOẠI 5 TẦNG (CÓ CEO BIẾN HÌNH)
export function getRandomDialog() {
    const currentSlot = getCurrentSlot();
    const currentOutfitId = getEquippedOutfit();

    const currentSet = outfitDatabase.find(set => set.id === currentOutfitId) || outfitDatabase[0];
    const currentOutfitPool = currentSet ? currentSet.poses : [];

    const roll = Math.random();
    const urStatus = canTriggerRare('UR');
    const ssrStatus = canTriggerRare('SSR');

    let selectedPose = null;
    let isCeoSecret = false;

    // 1. Tầng SECRET CEO (0.01%) - Biến hình Outfit CEO Ẩn
    if (roll < 0.0001) {
        const validCeoList = secretCeoList.filter(item => isSlotMatching(item.slot, currentSlot));
        const secretItem = getRandomItem(validCeoList.length > 0 ? validCeoList : secretCeoList);
        
        return {
            dialog: secretItem.dialog,
            imgUrl: secretItem.secretImgSrc,
            isCeo: true
        };
    }

    // 2. TẦNG UR (0.03% / Pity)
    if (urStatus.canRoll && (roll < 0.0003 || urStatus.isPity)) {
        const urList = currentOutfitPool.filter(item => item.rarity === 'UR');
        if (urList.length > 0) {
            localStorage.setItem('hikari_last_ur_time', Date.now().toString());
            selectedPose = getRandomItem(urList);
        }
    }

    // 3. TẦNG SSR (1% / Pity)
    if (!selectedPose && ssrStatus.canRoll && (roll < 0.01 || ssrStatus.isPity)) {
        const ssrList = currentOutfitPool.filter(item => item.rarity === 'SSR');
        if (ssrList.length > 0) {
            localStorage.setItem('hikari_last_ssr_time', Date.now().toString());
            selectedPose = getRandomItem(ssrList);
        }
    }

    // 4. TẦNG SR (5%)
    if (!selectedPose && roll < 0.06) {
        const srList = currentOutfitPool.filter(item => item.rarity === 'SR');
        if (srList.length > 0) selectedPose = getRandomItem(srList);
    }

    // 5. TẦNG NORMAL (~94%)
    if (!selectedPose) {
        const normalList = currentOutfitPool.filter(item => 
            !item.rarity && isSlotMatching(item.slot, currentSlot)
        );
        selectedPose = getRandomItem(normalList.length > 0 ? normalList : currentOutfitPool);
    }

    if (!selectedPose) return null;

    // Trả về Object chuẩn gồm thoại đã qua xử lý Sub-roll và Ảnh tương ứng
    return {
        ...selectedPose,
        dialog: resolveFinalText(selectedPose),
        imgUrl: `${currentSet.folder}/${selectedPose.poseId}.png`
    };
}

function getRandomItem(array) {
    if (!array || array.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// ==================== QUẢN LÝ THANH EXP & TƯƠNG TÁC ====================
export function initChibi() {
  const interactBtn = document.getElementById('btn-chibi-interact') || document.getElementById('chibi-img');
  const bubbleEl = document.getElementById('bubble-phuong') || document.getElementById('speech-box');
  const textEl = document.getElementById('chibi-text-phuong') || document.getElementById('dialog-text');
  const chibiImgEl = document.getElementById('chibi-img');
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
    const dialogData = getRandomDialog();
    
    if (dialogData) {
        // Cập nhật text câu thoại
        if (textEl) textEl.textContent = dialogData.dialog;
        if (bubbleEl) bubbleEl.classList.remove('hidden');

        // Cập nhật ảnh Chibi (Chuyển sang CEO hoặc trả về ảnh Outfit thường)
        if (chibiImgEl && dialogData.imgUrl) {
            chibiImgEl.src = dialogData.imgUrl;
        }
    }

    // Tăng EXP tương tác
    if (state && state.chibi) {
      if (state.chibi.exp < 100) {
        state.chibi.exp = Math.min(100, state.chibi.exp + 2);
        renderChibiStatus();
      } else {
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