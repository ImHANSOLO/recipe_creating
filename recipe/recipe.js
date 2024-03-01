document.addEventListener("DOMContentLoaded", function () {
  const recipeMap = new Map(JSON.parse(localStorage.getItem("recipe")) || []);

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageURLInput = document.getElementById("imageURL");
  const stepsList = document.getElementById("stepsList");
  const saveRecipeButton = document.getElementById("saveRecipe");
  const addStepButton = document.getElementById("addStep");

  titleInput.value = recipeMap.get("title") || "";
  descriptionInput.value = recipeMap.get("description") || "";
  imageURLInput.value = recipeMap.get("imageURL") || "";
  const steps = recipeMap.get("steps") || [];

  const renderSteps = () => {
    stepsList.innerHTML = "";
    steps.forEach((step, index) => {
      const li = document.createElement("li");
      li.textContent = step;
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editStep(index);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteStep(index);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      stepsList.appendChild(li);
    });
  };

  const editStep = (index) => {
    const newStep = prompt("Edit step:", steps[index]);
    if (newStep) {
      steps[index] = newStep;
      saveRecipe();
    }
  };

  const deleteStep = (index) => {
    steps.splice(index, 1);
    saveRecipe();
  };

  addStepButton.onclick = () => {
    const step = prompt("New step:");
    if (step) {
      steps.push(step);
      saveRecipe();
    }
  };

  const saveRecipe = () => {
    recipeMap.set("title", titleInput.value);
    recipeMap.set("description", descriptionInput.value);
    recipeMap.set("imageURL", imageURLInput.value);
    recipeMap.set("steps", steps);
    localStorage.setItem("recipe", JSON.stringify([...recipeMap]));
    renderSteps();
  };

  renderSteps();

  saveRecipeButton.onclick = saveRecipe;
});
