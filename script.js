let meals = JSON.parse(localStorage.getItem("meals")) || [];
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];

function updateUI() {
  const mealList = document.getElementById("meal-list");
  const exerciseList = document.getElementById("exercise-list");
  const totals = document.getElementById("totals");

  mealList.innerHTML = "";
  exerciseList.innerHTML = "";

  let totalCalories = 0;
  let totalReps = 0;

  meals.forEach((meal,index) => {
    const li = document.createElement("li");
    li.innerHTML = `${meal.name} - ${meal.calories} kcal 
      <button onclick="deleteMeal(${index})" class="delete-btn">🗑️</button>`;
    mealList.appendChild(li);
    totalCalories += meal.calories;
  });

  exercises.forEach((ex,index) => {
    const li = document.createElement("li");
    li.innerHTML = `${ex.name} - ${ex.reps} reps 
      <button onclick="deleteExercise(${index})" class="delete-btn">🗑️</button>`;
    exerciseList.appendChild(li);
    totalReps += ex.reps;
  });

  totals.textContent = `Calories: ${totalCalories} | Reps: ${totalReps}`;

  localStorage.setItem("meals", JSON.stringify(meals));
  localStorage.setItem("exercises", JSON.stringify(exercises));
}

function addMeal() {
  const name = document.getElementById("meal-name").value;
  const calories = parseInt(document.getElementById("meal-calories").value);

  if (name && !isNaN(calories)) {
    meals.push({ name, calories });
    document.getElementById("meal-name").value = "";
    document.getElementById("meal-calories").value = "";
    updateUI();
  }
}

function addExercise() {
  const name = document.getElementById("exercise-name").value;
  const reps = parseInt(document.getElementById("exercise-reps").value);

  if (name && !isNaN(reps)) {
    exercises.push({ name, reps });
    document.getElementById("exercise-name").value = "";
    document.getElementById("exercise-reps").value = "";
    updateUI();
  }
}

function resetAll() {
  if (confirm("Are you sure you want to delete all data?")) {
    meals = [];
    exercises = [];
    updateUI();
  }
}

function deleteMeal(index) {
  meals.splice(index, 1);
  updateUI();
}

function deleteExercise(index) {
  exercises.splice(index, 1);
  updateUI();
}


// Poziva se na učitavanje stranice
updateUI();
