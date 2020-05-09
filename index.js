const output = document.getElementById("output")
const titleInput = document.getElementById("title-input")
const titleOutput = document.getElementById("title-output")
const mainInput = document.getElementById("main-input")
const openSelect = document.getElementById("open-select")

titleInput.oninput = (e) => {
  titleOutput.innerText = e.target.value
}

mainInput.oninput = (e) => {
  if (e.keyCode === 13) {
    const addedNewlines = e.target.value.split("\n").join("\\\\\n")
    reRender(addedNewlines)
  }

}

window.onkeyup = (e) => {
  e.preventDefault()
  var spliceText = "";
  var cursorOffset = 0;
  if (e.altKey) {

    switch (e.keyCode) {
      case 73:
        spliceText = "\\int_{}^{}"
        cursorOffset = 6
        break
      case 78:
        spliceText = "\n\\newline\n"
        cursorOffset = 10
        break
      case 76:
        spliceText = "\n\\\\\\cdot\\space\\text{}"
        cursorOffset = 20
        break
      case 84:
        spliceText = "\\text{}"
        cursorOffset = 6
        break
      case 79:
        spliceText = "\\frac{}{}"
        cursorOffset = 6
        break

      case 66:
        spliceText = "\\\\[7mm]\n"
        cursorOffset = 8
        break
    }

    const cursorPosition = mainInput.selectionStart;
    const mainText = mainInput.value;

    const newText = mainText.splice(cursorPosition, 0, spliceText)
    mainInput.value = newText
    mainInput.selectionStart = cursorPosition + cursorOffset
    mainInput.selectionEnd = cursorPosition + cursorOffset
    autoExpand(mainInput)
  }

}

var save = () => {
  localStorage.setItem(titleInput.value, mainInput.value)
}

var openFile = (e) => {
  const key = e.target.value
  const latex = localStorage.getItem(key)
  mainInput.value = latex;

  reRender(latex)

  titleInput.value = key
  titleOutput.innerText = key
}

var deleteFile = () => {
  const file = openSelect.value
  localStorage.removeItem(file);
  location.reload()
}

Object.keys(localStorage).map(key => {
  openSelect.innerHTML += `
      <option value="${key}">${key}</option>
    `
})

var reRender = (text) => {
  katex.render(text, output, {
    throwOnError: false
  });

  autoExpand(mainInput)
}

function insertAtCursor(input, textToInsert) {
  // get current text of the input
  const value = input.value;

  // save selection start and end position
  const start = input.selectionStart;
  const end = input.selectionEnd;

  // update the value with our text inserted
  input.value = value.slice(0, start) + textToInsert + value.slice(end);

  // update cursor to be at the end of insertion
  input.selectionStart = input.selectionEnd = start + textToInsert.length;
}

var autoExpand = function (field) {
  window.scrollTo(0, document.body.scrollHeight);

  // // Reset field height
  // field.style.height = 'inherit';

  // // Get the computed styles for the element
  // var computed = window.getComputedStyle(field);

  // // Calculate the height
  // var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
  //   + parseInt(computed.getPropertyValue('padding-top'), 10)
  //   + field.scrollHeight
  //   + parseInt(computed.getPropertyValue('padding-bottom'), 10)
  //   + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  // field.style.height = height + 'px';

};

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};