let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

const form = document.getElementById('rev-comment');
const nameInput = document.getElementById('rev-name');
const commInput = document.getElementById('rev-comm');
const submitBtn = document.getElementById('rev-btn');
const userList = document.getElementById('reviewList');

const stars = document.querySelectorAll('#star-rating span');
const starInput = document.getElementById('rev-stars');

// ⭐ اختيار النجوم
stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.dataset.value;
    starInput.value = value;

    stars.forEach(s => {
      s.classList.toggle('active', s.dataset.value <= value);
    });
  });
});

// Initial render
renderUsers();

// Add or edit review
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const comm = commInput.value.trim();
  const rating = starInput.value;

  if (!name ||  !comm || !rating) return;

  const user = { name, comm, rating };

  if (editIndex === null) {
    users.push(user);
  } else {
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent = 'إرسال التقييم';
  }

  form.reset();
  starInput.value = '';
  stars.forEach(s => s.classList.remove('active'));

  saveToLocalStorage();
  renderUsers();
});

// Display reviews
function renderUsers() {
  userList.innerHTML = '';

  users.forEach((user, index) => {
    const li = document.createElement('li');

    const info = document.createElement('span');
    info.innerHTML = `
      <strong>${user.name}</strong><br>
      ${'★'.repeat(user.rating)}${'☆'.repeat(5 - user.rating)}<br>
      ${user.comm}
    `;

    const actions = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.type = 'button';
    editBtn.onclick = () => editUser(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.type = 'button';
    deleteBtn.onclick = () => deleteUser(index);

    actions.append(editBtn, deleteBtn);
    li.append(info, actions);
    userList.appendChild(li);
  });
}

// Edit review
function editUser(index) {
  nameInput.value = users[index].name;
  commInput.value = users[index].comm;
  starInput.value = users[index].rating;

  stars.forEach(s => {
    s.classList.toggle('active', s.dataset.value <= users[index].rating);
  });

  editIndex = index;
  submitBtn.textContent = '🔄 Update';
}

// Delete review
function deleteUser(index) {
  if (confirm('Delete this review?')) {
    users.splice(index, 1);
    saveToLocalStorage();
    renderUsers();
  }
}

// Save
function saveToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}