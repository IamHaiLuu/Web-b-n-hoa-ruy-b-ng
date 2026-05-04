const bulkBar = document.querySelector('[data-bulk-bar]');
const rowChecks = document.querySelectorAll('[data-row-check]');
const allCheck = document.querySelector('[data-check-all]');

function updateBulkBar() {
  const selected = Array.from(rowChecks).filter((checkbox) => checkbox.checked).length;
  if (bulkBar) {
    bulkBar.classList.toggle('hidden', selected === 0);
    const count = bulkBar.querySelector('[data-selected-count]');
    if (count) {
      count.textContent = selected;
    }
  }
}

if (allCheck) {
  allCheck.addEventListener('change', () => {
    rowChecks.forEach((checkbox) => {
      checkbox.checked = allCheck.checked;
    });
    updateBulkBar();
  });
}

rowChecks.forEach((checkbox) => {
  checkbox.addEventListener('change', updateBulkBar);
});

updateBulkBar();
