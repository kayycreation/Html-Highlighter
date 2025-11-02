const content = document.getElementById('content');
const popup = document.getElementById('popupMenu');
const linkBox = document.getElementById('linkInputBox');
const linkInput = document.getElementById('linkInput');
const submitLink = document.getElementById('submitLink');
const highlightBtn = document.getElementById('highlightBtn');
const linkBtn = document.getElementById('linkBtn');
const boldBtn = document.getElementById('BoldBtn');
const ItalicBtn = document.getElementById('ItalicBtn');
const UnderlineBtn = document.getElementById('UnderlineBtn');
const colorPicker = document.getElementById('colorPicker');

let selectedRange = null;
let selectedColor = ''; 

document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    selectedRange = selection.getRangeAt(0);
    const rect = selectedRange.getBoundingClientRect();

    popup.style.top = rect.top + window.scrollY - 40 + 'px';
    popup.style.left = rect.left + 'px';
    popup.style.display = 'flex';
    linkBox.style.display = 'none';
  } else {
    popup.style.display = 'none';
    linkBox.style.display = 'none';
  }
});

colorPicker.addEventListener('input', (e) => {
  selectedColor = e.target.value;
});


highlightBtn.addEventListener('click', () => {
  if (!selectedRange) return;
  const span = document.createElement('span');
  span.className = 'highlighted';
  let defaultColor = 'yellow';
  span.style.backgroundColor = selectedColor || 'yellow';
  selectedColor = '';
  const fragment = selectedRange.cloneContents();
  if (fragment.childNodes.length > 0) {
    span.appendChild(fragment);
  } else {
    span.textContent = selectedRange.toString();
  }

  selectedRange.deleteContents();
  selectedRange.insertNode(span);

  window.getSelection().removeAllRanges();
  popup.style.display = 'none';
});


boldBtn.addEventListener('click', () => {
  if (!selectedRange) return;
  const strong = document.createElement('strong');

  const fragment = selectedRange.cloneContents();
  if (fragment.childNodes.length > 0) {
    strong.appendChild(fragment);
  } else {
    strong.textContent = selectedRange.toString();
  }
  selectedRange.deleteContents();
  selectedRange.insertNode(strong);
  window.getSelection().removeAllRanges();
  popup.style.display = 'none';
});


ItalicBtn.addEventListener('click', () => {
  if (!selectedRange) return;
  const em = document.createElement('em');
  em.className = 'italicized';
 
  const fragment = selectedRange.cloneContents();
  if (fragment.childNodes.length > 0) {
    em.appendChild(fragment);
  } else {
    em.textContent = selectedRange.toString();
  }
  selectedRange.deleteContents();
  selectedRange.insertNode(em);
  window.getSelection().removeAllRanges();
  popup.style.display = 'none';
});


UnderlineBtn.addEventListener('click', () => {
  if (!selectedRange) return;
  const span = document.createElement('span');
  span.className = 'underlined';
  span.style.textDecoration = 'underline';
  let defaultColor = 'black';
  span.style.textDecorationColor = selectedColor || defaultColor;
  selectedColor = '';


  const fragment = selectedRange.cloneContents();
  if (fragment.childNodes.length > 0) {
    span.appendChild(fragment);
  } else {
    span.textContent = selectedRange.toString();
  }

  selectedRange.deleteContents();
  selectedRange.insertNode(span);
  window.getSelection().removeAllRanges();
  popup.style.display = 'none';
});


linkBtn.addEventListener('click', () => {
  if (!selectedRange) return;
  const rect = selectedRange.getBoundingClientRect();
  popup.style.display = 'none';
  linkBox.style.top = rect.top + window.scrollY - 10 + 'px';
  linkBox.style.left = rect.left + 'px';
  linkBox.style.display = 'block';
  linkInput.focus();
});


submitLink.addEventListener('click', () => {
  const url = linkInput.value.trim();
  if (!url || !selectedRange) return;

  const a = document.createElement('a');
  a.href = url.startsWith('http') ? url : 'https://' + url;
  a.textContent = selectedRange.toString();
  a.target = '_blank';
  a.style.color = 'blue';

  selectedRange.deleteContents();
  selectedRange.insertNode(a);

  linkInput.value = '';
  linkBox.style.display = 'none';
  window.getSelection().removeAllRanges();
});
