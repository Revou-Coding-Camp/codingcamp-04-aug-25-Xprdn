console.log("JavaScript terhubung!");

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const noTaskFound = document.getElementById('noTaskFound');
    const deleteAllButton = document.getElementById('deleteAllButton');
    
    let tasks = [];

    // Fungsi untuk menampilkan tugas
    const renderTasks = () => {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            noTaskFound.style.display = 'block';
        } else {
            noTaskFound.style.display = 'none';
            tasks.forEach((task, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.text}</td>
                    <td>${task.date}</td>
                    <td>${task.status}</td>
                    <td>
                        <button class="action-button delete" data-index="${index}">Delete</button>
                    </td>
                `;
                taskList.appendChild(row);
            });
        }
    };

    // Fungsi untuk menambahkan tugas
    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;
        
        // Validasi input
        if (taskText === '' || taskDate === '') {
            alert('Please fill out both the task and the due date.');
            return;
        }

        const newTask = {
            text: taskText,
            date: taskDate,
            status: 'Pending'
        };
        tasks.push(newTask);
        
        // Kosongkan input
        taskInput.value = '';
        dateInput.value = '';
        
        renderTasks();
    };

    // Fungsi untuk menghapus semua tugas
    const deleteAllTasks = () => {
        tasks = [];
        renderTasks();
    };

    // Event listener untuk tombol tambah
    addButton.addEventListener('click', addTask);
    
    // Event listener untuk tombol hapus semua
    deleteAllButton.addEventListener('click', deleteAllTasks);
    
    // Event listener untuk tombol hapus per tugas
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Panggil renderTasks pertama kali untuk menampilkan status awal
    renderTasks();
});