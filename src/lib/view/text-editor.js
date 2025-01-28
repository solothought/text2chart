export function handleEditing(event){
  const textarea = event.target;
  let text = textarea.value;  // Bound to the textarea
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const beforeCursor = text.substring(0, start);
  const afterCursor = text.substring(end);

  if (event.key === "Enter") {
    event.preventDefault();
    const previousLine = beforeCursor.split("\n").pop() || "";
    const leadingSpaces = previousLine.match(/^\s*/)[0] || "";
    
    textarea.value = `${beforeCursor}\n${leadingSpaces}${afterCursor}`;
    moveCursor(textarea, beforeCursor.length + 1 + leadingSpaces.length);
  }
  else if (event.key === "Tab") {
    event.preventDefault();
    const spaces = "  "; //2

    textarea.value = `${beforeCursor}${spaces}${afterCursor}`;
    moveCursor(textarea, beforeCursor.length + spaces.length);
  }
  else if(event.ctrlKey && event.key === "/"){
    event.preventDefault();
    toggleCommentLine(textarea, start, end, beforeCursor);
  }
  // else if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
  //   event.preventDefault();
  //   moveLine(textarea, start, end, beforeCursor, event.key === 'ArrowUp' ? 'up' : 'down');
  // }
}

function moveCursor(textarea, position){
  textarea.setSelectionRange(position, position); //from and to are same
}

// Toggle comment/uncomment for the current line
function toggleCommentLine(textarea, start, end, beforeCursor) {
  let text = textarea.value;
  let lines = text.split('\n');
  const lineIndex = text.substring(0, start).split('\n').length - 1;
  let move = 0;
  if (lines[lineIndex].startsWith('#')) {
    // Uncomment the line
    lines[lineIndex] = lines[lineIndex].substr(1);
    move  = -1
  } else {
    // Comment the line
    lines[lineIndex] = `#${lines[lineIndex]}`;
    move  = 1;
  }

  text = lines.join('\n');
  textarea.value = text;
  moveCursor(textarea, beforeCursor.length + move);
}

// Move the current line up or down
function moveLine(textarea, start, end, beforeCursor, direction) {
  let text = textarea.value;
  let lines = text.split('\n');
  const lineIndex = text.substring(0, start).split('\n').length - 1;

  if (direction === 'up' && lineIndex > 0) {
    // Swap with the line above
    let temp = lines[lineIndex - 1];
    lines[lineIndex - 1] = lines[lineIndex];
    lines[lineIndex] = temp;
  } else if (direction === 'down' && lineIndex < lines.length - 1) {
    // Swap with the line below
    let temp = lines[lineIndex + 1];
    lines[lineIndex + 1] = lines[lineIndex];
    lines[lineIndex] = temp;
  }

  text = lines.join('\n');
  textarea.value = text;
  //TODO: find the  distance of cursor position from in line
  // Add remaining length of current line + distance when moving line below
  // do reverse when moving line up
  moveCursor(textarea, beforeCursor.length);
}