

function waitForSectionEl(callback, retryCount = 50, interval = 100) {
  const sectionElement = sectionEl();
  if (sectionElement) {
    callback(sectionElement);
  } else if (retryCount > 0) {
    setTimeout(() => waitForSectionEl(callback, retryCount - 1, interval), interval);
  } else {
    // console.debug("sectionEl not found within timeout period");
  }
}

  chartSTFlowIfApplied();

  //Observe when the file is changed
  const observer = new MutationObserver(() => {
    // console.console.debug("URL changed to:", window.location.href);
    chartSTFlowIfApplied();
  });
  
  let contentArea =  sectionEl();
  observer.observe(contentArea, { childList: true, subtree: true });

function chartSTFlowIfApplied(){
  resetView();
  const isStflowFile = window.location.pathname.endsWith(".stflow");
  if (isStflowFile) {
    // console.debug("found stflow file")
    waitForSectionEl(setupButtons);
    // setupButtons();
  }
}

function resetView(){
  // console.debug("removing iframe and button if added")
  let iframe = document.getElementById('chartIframe');
  if(iframe){
    const sectionElement = sectionEl();
    sectionElement.style.display = "block";
    iframe.remove();
  }
  let prevButton = document.getElementById('stflow-preview');
  if(prevButton){

    prevButton.remove();
  }
}

function sectionEl(){
  return document.querySelector('section[aria-labelledby~="file-name-id-wide"]');
}
function inputText(sectionElement){ //this will work only if code button is enabled
  return sectionElement.querySelector("textarea").textContent;
}

function setupButtons() {
  let buttonList = document.querySelectorAll('ul[aria-label="File view"] > li');

  // Variables to store class lists for active and inactive states
  let activeClasses, inactiveClasses;

  // Determine and store active/inactive classes from current state
  buttonList.forEach(li => {
    const button = li.querySelector('button');

    if (button) {
      if (button.getAttribute("aria-current") === "true") {
        activeClasses = Array.from(li.classList); // Store all classes for active state
      } else {
        inactiveClasses = Array.from(li.classList); // Store all classes for inactive state
      }
    }
  });

  const prevButton = injectPreviewButton(buttonList);

  // set initial state
  prevButton.setAttribute("aria-current", "true");
  buttonList[0].setAttribute("aria-current", "false");

  prevButton.className = activeClasses.join(" ");
  buttonList[0].className = inactiveClasses.join(" ");

  
  // attach events
  buttonList = document.querySelectorAll('ul[aria-label="File view"] > li');
  buttonList.forEach(li => {
    const button = li.querySelector('button');

    if (button) {
      button.addEventListener('click', (event) => handleButtonClick(event, buttonList, li, button, activeClasses, inactiveClasses));
    }
  });
}

function injectPreviewButton(buttonList){
  // console.debug("Injecting preview button")
  // let previewExists = Array.from(listItems).some(li => {
  //   const textElement = li.querySelector('.segmentedControl-text');
  //   return textElement && textElement.textContent.trim() === "Preview";
  // });

  const clonedLi = buttonList[0].cloneNode(true);
  clonedLi.id = "stflow-preview";
  const spn = clonedLi.querySelector('.segmentedControl-content');
  if(spn) spn["background-color"] = "brown"; //not working
  const textElement = clonedLi.querySelector('.segmentedControl-text');
  if (textElement) textElement.textContent = "Preview";

  const ulElement = document.querySelector('ul[aria-label="File view"]');
  ulElement.insertBefore(clonedLi, buttonList[0]);

  return clonedLi;
}

// Function to handle button click and toggle states
function handleButtonClick(event, buttonList, clickedLi, clickedButton, activeClasses, inactiveClasses) {
  // console.debug(event.target);
  // console.debug(clickedButton);
  // console.debug(clickedLi);

  buttonList.forEach(li => {
    // console.debug(li);
    const button = li.querySelector('button');
    if (button) {
      const isActive = li === clickedLi;

      // Set state
      button.setAttribute("aria-current", isActive ? "true" : "false");
      li.className = isActive ? activeClasses.join(" ") : inactiveClasses.join(" ");

      // Perform additional actions if Preview button is clicked
      if (isActive && button.textContent.trim() === "Preview") {
        handlePreviewButtonClick();
      }else if(isActive){
        displaySection();
      }
    }
  });
}

function handlePreviewButtonClick() {
  // console.debug("Preview");
  // Hide the section element
  const sectionElement = sectionEl();
  let iframe = document.getElementById('chartIframe');

  if (!iframe) {
    const input = inputText(sectionElement);
    if(input){
      iframe = createIFrameEl(sectionElement.parentElement);
      iframe.onload = function () { //pass 
        iframe.contentWindow.postMessage({text: input }, 'https://solothought.com');
      };
      sectionElement.parentElement.appendChild(iframe);
    }else{ //when user try to preview without selecting "code" button first
      return;
    }
  }
  sectionElement.style.display = "none";
  // Show iframe
  iframe.style.display = "block";
}

function displaySection() {
  // console.debug("other button clicked")
  const sectionElement = sectionEl();
  let iframe = document.getElementById('chartIframe');

  sectionElement.style.display = "block";
  if (iframe) iframe.style.display = "none";
}

function createIFrameEl(parentElement){
  // console.debug("create iframe");
  const iframe = document.createElement('iframe');
  iframe.src = "https://solothought.com/text2chart/embed.html"; 
  iframe.id = "chartIframe";
  iframe.style.position = "relative";
  iframe.style.border = "none";
  iframe.style.width = `${parentElement.clientWidth}px`;
  iframe.style.height = "100vh";
  iframe.style["margin-top"] = "46px";
  
  return iframe;
}