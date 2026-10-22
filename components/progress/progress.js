
export function updateProgressBar() {
    const startDate = new Date(2026, 8, 9).getTime(); 
    const endDate = new Date(2026, 11, 31).getTime(); 
    const now = new Date().getTime();
    let percentage = ((now - startDate) / (endDate - startDate)) * 100;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    const formattedPercent = percentage.toFixed(2) + '%';
    const progressBarFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (progressBarFill) progressBarFill.style.width = formattedPercent;
    if (progressText) progressText.innerText = formattedPercent;
}