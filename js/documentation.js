const md = window.markdownit();

async function loadDocs() {
  try {
    const res = await fetch('/assets/documentation.md');
    if (!res.ok) throw new Error('Failed to load markdown');

    const mdText = await res.text();
    const html = md.render(mdText);

    document.getElementById('docus').innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();
});
