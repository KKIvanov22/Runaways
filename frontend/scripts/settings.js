document.getElementById('apply-theme').addEventListener('click', () => {
    const theme = document.getElementById('theme-select').value;
    document.documentElement.setAttribute('data-theme', theme);
});