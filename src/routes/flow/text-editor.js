export function handleEditing(event, textarea){
  const textarea = event.target;
  let text = textarea.value;  // Bound to the textarea
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (event.key === "Enter") {
    event.preventDefault();
    const beforeCursor = text.substring(0, start);
    const afterCursor = text.substring(end);
    const previousLine = beforeCursor.split("\n").pop() || "";
    const leadingSpaces = previousLine.match(/^\s*/)[0] || "";
    
    textarea.value = `${beforeCursor}\n${leadingSpaces}${afterCursor}`;
    moveCursor(textarea, beforeCursor.length + 1 + leadingSpaces.length);
  }
  else if (event.key === "Tab") {
    event.preventDefault();
    const spaces = "  "; //2
    const beforeCursor = text.substring(0, start);
    const afterCursor = text.substring(end);

    textarea.value = `${beforeCursor}${spaces}${afterCursor}`;
    moveCursor(textarea, beforeCursor.length + spaces.length);
  }
}

function moveCursor(textarea, position){
  textarea.setSelectionRange(position, position); //from and to are same
}