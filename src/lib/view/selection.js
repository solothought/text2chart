export function getSelectedLines(textarea, key, withShift) {
  const text = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  // Split the text into lines
  const lines = text.split('\n');

  // Find the starting and ending line numbers
  let startLine = 0;
  let endLine = 0;
  let currentPos = 0;
  let lineCount = 0;
  let flowIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();
    if(trimmedLine.startsWith("FLOW:")) { 
      lineCount = -1;
      flowIndex++;
    }else if(trimmedLine.length !== 0 && trimmedLine[0] !== "#") lineCount++;

    const lineLength = lines[i].length + 1; // +1 for the newline character
    if (currentPos <= start && currentPos + lineLength > start && startLine === 0) {
        startLine = lineCount;
    }
    if (currentPos <= end && currentPos + lineLength > end) {
        endLine = lineCount;
        break;
    }
    currentPos += lineLength;
  }

  // Return the selected lines
  if(key==="ArrowDown") {
    // endLine++;
    // if(!withShift)startLine++;
    if (withShift) {
      endLine++; // Move the end line down
    } else {
      endLine++;
      startLine++;
    }
  }else if(key==="ArrowUp") {
    // endLine--;
    // if(!withShift)startLine--;
    if (withShift) {
      // When Shift is held, we want to keep the endLine the same
      startLine--; // Move the start line up
    } else {
      endLine--;
      startLine--;
    }
  }
  if (startLine > endLine) {
    startLine = endLine;
  }

  // return lines.slice(startLine, endLine + 1);
  // console.log(start, end);
  return {flowIndex: flowIndex, nodeIds: generateSequence(startLine, endLine)};
}

function generateSequence(from, to) {
  const step = from <= to ? 1 : -1;
  const sequence = [];

  for (let i = from; step > 0 ? i <= to : i >= to; i += step) {
    sequence.push(String(i));
  }

  return sequence;
}
