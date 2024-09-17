// Fetch ToDo List from API
function fetchTodos() {
    const predefinedTasks = [
      { title: 'Initiation', completed: false },
      { title: 'Monitoring', completed: false },
      { title: 'Execution', completed: false },
      { title: 'Controlling', completed: false },
      { title: 'Closure', completed: false }
    ];
  
    const todoList = document.getElementById('todoList');
    let completedCount = 0;  // Track the number of completed tasks
    let totalItemCount = 0;  // Track the total number of items
  
    // Add predefined tasks to the list
    predefinedTasks.forEach(task => {
      if (totalItemCount < 6) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${task.title}
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
        `;
  
        // Event listener for marking predefined tasks as completed
        li.querySelector('input').addEventListener('change', function () {
          if (this.checked) {
            completedCount++;
          } else {
            completedCount--;
          }
  
          // Check if 5 tasks have been completed using a Promise
          checkCompletedTasks(completedCount)
            .then(() => {
              alert("Congrats. 5 Tasks have been Successfully Completed");
            })
            .catch(() => {
              // No action on rejection
            });
        });
  
        // Append each predefined task to the todoList
        todoList.appendChild(li);
        totalItemCount++;  // Increment total item count
      }
    });
  
    // Fetch remaining ToDo List from API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        // Loop through each todo item and create list elements
        data.forEach(todo => {
          if (totalItemCount < 6) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
              ${todo.title}
              <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            `;
  
            // If a task is already completed, increment the completedCount
            if (todo.completed) {
              completedCount++;
            }
  
            // Event listener for marking tasks as completed
            li.querySelector('input').addEventListener('change', function () {
              if (this.checked) {
                completedCount++;
              } else {
                completedCount--;
              }
  
              // Check if 5 tasks have been completed using a Promise
              checkCompletedTasks(completedCount)
                .then(() => {
                  alert("Congrats. 5 Tasks have been Successfully Completed");
                })
                .catch(() => {
                  // No action on rejection
                });
            });
  
            // Append each todo item to the todoList
            todoList.appendChild(li);
            totalItemCount++;  // Increment total item count
          }
        });
      })
      .catch(error => console.error('Error fetching todos:', error));
  }
  
  // Promise to validate when 5 tasks are completed

  // Promise to validate when 5 tasks are completed
  function checkCompletedTasks(count) {
    return new Promise((resolve, reject) => {
      if (count === 5) {
        resolve();  // Resolve when 5 tasks are completed
      } else {
        reject();  // Reject otherwise
      }
    });
  }
  
  // Fetch todos when the page loads
  if (window.location.pathname.includes('todo.html')) {
    fetchTodos();
  }
  
  // Log out functionality
  document.getElementById('logout').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to login page
  });
  