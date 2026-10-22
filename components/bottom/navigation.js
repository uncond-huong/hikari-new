export function initNavigation() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Xóa active hiện tại
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Active tab được chọn
      item.classList.add('active');

      const target = item.getAttribute('data-target');
      console.log(`Chuyển hướng sang Tab: ${target}`);
      // Sau này bổ sung logic ẩn/hiện section tương ứng với target ở đây
    });
  });
}