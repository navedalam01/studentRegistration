const BASE = '/students'; // controller mapping

document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    course: document.getElementById('course').value.trim()
  };

  // basic validation
  if (!payload.name || !payload.email || !payload.phone || !payload.course) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch(`${BASE}/add`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Server returned ' + res.status);

    const saved = await res.json();
    alert('Saved: ' + (saved.id ?? 'id unknown'));
    // clear form
    document.getElementById('regForm').reset();
    loadAllStudents(); // refresh table
  } catch (err) {
    console.error(err);
    alert('Error saving student: ' + err.message);
  }
});

document.getElementById('loadAll').addEventListener('click', loadAllStudents);

async function loadAllStudents() {
  try {
    const res = await fetch(`${BASE}/all`);
    if (!res.ok) throw new Error('Server returned ' + res.status);
    const data = await res.json();
    renderTable(data);
  } catch (err) {
    console.error(err);
    alert('Error loading students: ' + err.message);
  }
}

function renderTable(list){
  const tbody = document.querySelector('#studentsTable tbody');
  tbody.innerHTML = '';
  if(!Array.isArray(list) || list.length === 0){
    tbody.innerHTML = '<tr><td colspan="5">No records</td></tr>';
    return;
  }
  for(const s of list){
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id ?? ''}</td>
                    <td>${escapeHtml(s.name)}</td>
                    <td>${escapeHtml(s.email)}</td>
                    <td>${escapeHtml(s.phone)}</td>
                    <td>${escapeHtml(s.course)}</td>`;
    tbody.appendChild(tr);
  }
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// auto load on page open
loadAllStudents();
