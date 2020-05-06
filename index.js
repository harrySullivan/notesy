const output = document.getElementById("output")
const titleInput = document.getElementById("title-input")
const titleOutput = document.getElementById("title-output")

const mainInput = document.getElementById("main-input")

titleInput.oninput = (e) => {
  titleOutput.innerText = e.target.value
}

mainInput.oninput = (e) => {
  katex.render(e.target.value, output, {
    throwOnError: false
  });

  autoExpand(e.target)
}

window.onkeyup = (e) => {
  e.preventDefault()
  var spliceText = "";
  if (e.altKey) {

    switch (e.keyCode) {
      case 73:
        spliceText = "\\int_{}^{}"
        break
      case 78:
        spliceText = "\n\\newline\n"
        break
      case 76:
        spliceText = "\n\\cdot\\space\\text{}"
        break
      case 84:
        spliceText = "\\text{}"
        break
      case 79:
        spliceText = "\\frac{}{}"
        break
    }

    const cursorPosition = mainInput.selectionStart;
    const mainText = mainInput.value;

    const newText = mainText.splice(cursorPosition, 0, spliceText)
    mainInput.value = newText
  }

}

var save = () => {
  localStorage.setItem(titleInput.value, mainInput.value)
}

var openFile = (e) => {
  const latex = localStorage.getItem(e.target.value)
  mainInput.value = latex;

  katex.render(mainInput.value, output, {
    throwOnError: false
  });

  autoExpand(mainInput)
}

Object.keys(localStorage).map(key => {
  document.getElementById("open-select").innerHTML += `
      <option value="${key}">${key}</option>
    `
})

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

  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
    + parseInt(computed.getPropertyValue('padding-top'), 10)
    + field.scrollHeight
    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';

};

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};