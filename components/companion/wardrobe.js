import { activeEquippedState } from './core.js';

/**
 * 🌟 1. Hàm mặc Outfit trực tiếp (Thay đổi full hình Chibi)
 * Được gọi khi người dùng bấm chọn đồ trong Tủ đồ (Trực tiếp hoặc qua window.handleEquipItem)
 */
export function equipItem(characterId, slot, itemImgUrl, outfitId) {
  // A. Cập nhật State trong RAM
  if (activeEquippedState[characterId]) {
    activeEquippedState[characterId].outfit = outfitId;
  }

  // B. Lưu ID Outfit vào localStorage để hệ thống Gacha Dialogue nhận diện
  localStorage.setItem('hikari_equipped_outfit', outfitId);

  // C. Đổi trực tiếp URL hình ảnh Chibi trên giao diện
  // Tìm thẻ <img> hiển thị Chibi (tìm theo id `${characterId}-img` hoặc `#chibi-img`)
  const chibiImgElement = document.getElementById(`${characterId}-img`) || document.getElementById('chibi-img');

  if (chibiImgElement && itemImgUrl) {
    chibiImgElement.src = itemImgUrl;
  }
}

/**
 * 🌟 2. Hàm Render Outfit từ Firebase / Dữ liệu khởi chạy
 * Được gọi khi app mở lên hoặc khi Firebase trả dữ liệu về (syncChibiFromFirebase)
 */
export function renderChibiOutfit(outfitData) {
  if (!outfitData) return;

  const { characterId = 'chibi', outfitId, imgUrl } = outfitData;

  // Cập nhật lại ID outfit đang mặc vào localStorage
  if (outfitId) {
    localStorage.setItem('hikari_equipped_outfit', outfitId);
  }

  // Cập nhật thẻ <img> trên giao diện
  const chibiImgElement = document.getElementById(`${characterId}-img`) || document.getElementById('chibi-img');
  
  if (chibiImgElement && imgUrl) {
    chibiImgElement.src = imgUrl;
  }
}