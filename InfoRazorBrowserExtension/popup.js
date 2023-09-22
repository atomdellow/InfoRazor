document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('textArea');
    const categoryInput = document.getElementById('category');
    const saveBtn = document.getElementById('saveBtn');
  
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, selection => {
      textArea.value = selection[0];
    });
  
    saveBtn.addEventListener('click', () => {
      const text = textArea.value;
      const category = categoryInput.value;
      if (text) {
        fetch('http://localhost:3000/save-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text, category })
        }).then(response => response.json())
          .then(data => console.log('Data saved:', data))
          .catch(error => console.error('Error:', error));
      }
    });
  });
  