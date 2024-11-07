document.getElementById('extractButton').addEventListener('click', async () => {
  console.log('Starting question extraction process...');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes('docs.google.com/forms')) {
    console.error('Invalid URL:', tab.url);
    document.getElementById('response').textContent = 'Please open a Google Form first!';
    return;
  }

  try {
    console.log('Executing content script to extract questions...');
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractQuestions,
    });

    const questions = results[0].result;
    console.log('Extracted questions:', questions);

    const response = await fetch('http://localhost:8000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questions),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Received response:', result);
  
      // Store the response in local storage
      chrome.storage.local.set({ questionsResponse: result });
  
      // Display the response JSON in the response div
      document.getElementById('response').textContent = result
  } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response').textContent = 'Error extracting questions: ' + error.message;
  }
});

function extractQuestions() {
  const questions = [];
  const questionElements = document.querySelectorAll('[role="listitem"]');

  questionElements.forEach((element, index) => {
    const isRadio = element.querySelector('[role="radiogroup"]') !== null;
    const isCheckbox = element.querySelector('[role="group"]') !== null;
    const questionText = element.querySelector('[role="heading"] .M7eMe')?.textContent.trim();
    const options = Array.from(
      element.querySelectorAll('.aDTYNe.snByac.OvPDhc.OIC90c')
    ).map(option => option.textContent.trim());
    const isRequired = element.querySelector('.vnumgf') !== null;

    const questionObj = {
      question_number: index + 1,
      question: questionText,
      type: isRadio ? 'radio' : 'checkbox',
      required: isRequired,
      options: options
    };

    questions.push(questionObj);
  });

  return questions;
}

document.getElementById('screenshotButton').addEventListener('click', async () => {
  console.log('Taking screenshot...');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    
    const response = await fetch('http://localhost:8000/screenshot', {
      method: 'GET'
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Received response:', result);
  
      // Store the response in local storage
      chrome.storage.local.set({ questionsResponse: result });
  
      // Display the response JSON in the response div
      document.getElementById('response').textContent = result
  } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response').textContent = 'Error extracting questions: ' + error.message;
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  // Check for stored response and display it
  chrome.storage.local.get('questionsResponse', (data) => {
      if (data.questionsResponse) {
          document.getElementById('response').textContent = data.questionsResponse
      }
  });
});

