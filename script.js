document.addEventListener('DOMContentLoaded', () => {
  const actionBtn = document.getElementById('actionBtn');
  const messageBox = document.getElementById('messageBox');
  let isVisible = false;

  actionBtn.addEventListener('click', () => {
    isVisible = !isVisible;
    if (isVisible) {
      messageBox.classList.remove('hidden');
      actionBtn.textContent = 'Hide Message';
    } else {
      messageBox.classList.add('hidden');
      actionBtn.textContent = 'Click Me';
    }
  });
});
