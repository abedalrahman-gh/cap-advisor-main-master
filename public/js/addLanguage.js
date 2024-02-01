function addLanguage() {
  const languagesDiv = document.getElementById("languages");
  const inputFields = languagesDiv.getElementsByTagName("input");

  const lastInputField = inputFields[inputFields.length - 1];
  if (lastInputField.value.trim() === "") {
    alert("Please enter a language name.");
    return;
  }

  for (let i = 0; i < inputFields.length - 1; i++) {
    if (
      inputFields[i].value.toLowerCase() === lastInputField.value.toLowerCase()
    ) {
      alert("This language has already been added.");
      return;
    }
  }

  const newInputField = document.createElement("input");
  newInputField.type = "text";
  newInputField.name = "languages[]";
  newInputField.placeholder = "Enter a language";
  languagesDiv.appendChild(newInputField);
}
