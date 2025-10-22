function renderComplaints() {
  fetch('get_complaints.php')
    .then(res => {
      if (!res.ok) throw new Error("Network error: " + res.status);
      return res.json();
    })
    .then(complaints => {
      const tbody = document.getElementById("complaintRows");
      tbody.innerHTML = "";
      if (!Array.isArray(complaints) || complaints.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No active complaints.</td></tr>`;
        return;
      }
      complaints.forEach(c => {
        tbody.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.location}</td>
          <td>${c.contact}</td>
          <td>${c.complaint}</td>
          <td>
            <select class="progress-dropdown progress-${c.progress.toLowerCase()}" onchange="changeProgress(${c.id}, this.value)">
              <option value="Pending"${c.progress === "Pending" ? " selected" : ""}>Pending</option>
              <option value="Ongoing"${c.progress === "Ongoing" ? " selected" : ""}>Ongoing</option>
              <option value="Resolved"${c.progress === "Resolved" ? " selected" : ""}>Resolved</option>
            </select>
          </td>
          <td>
            <button class="action-delete" onclick="confirmDelete(${c.id})" title="Delete">&times;</button>
          </td>
        </tr>
        `;
      });
    })
    .catch(err => {
      document.getElementById("complaintRows").innerHTML = 
        `<tr><td colspan="6" style="color:red;">Error loading data: ${err.message}</td></tr>`;
      console.error(err);
    });
}

function renderArchive() {
  fetch('archived.php')
    .then(res => res.json())
    .then(archive => {
      const tbody = document.getElementById("archiveRows");
      tbody.innerHTML = "";
      if (!Array.isArray(archive) || archive.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No archived complaints.</td></tr>`;
        return;
      }
      archive.forEach(c => {
        tbody.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.location}</td>
          <td>${c.contact}</td>
          <td>${c.complaint}</td>
          <td>${c.resolvedOn || ""}</td>
        </tr>
        `;
      });
    });
}

function changeProgress(id, value) {
  fetch('update_progress.php', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `id=${id}&progress=${encodeURIComponent(value)}`
  })
    .then(res => res.text())
    .then(() => {
      renderComplaints();
      renderArchive();
    })
    .catch(err => {
      alert("Failed to update progress: " + err.message);
    });
}

function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this complaint? This action cannot be undone.")) {
    deleteComplaint(id);
  }
}

function deleteComplaint(id) {
  fetch('delete_complaint.php', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `id=${id}`
  })
    .then(res => res.text())
    .then(() => {
      renderComplaints();
      renderArchive();
    })
    .catch(err => {
      alert("Failed to delete complaint: " + err.message);
    });
}

function sortByProgress() {
  renderComplaints();
}

function showTab(tab) {
  document.getElementById("dashboard").style.display = tab === 'dashboard' ? 'block' : 'none';
  document.getElementById("archived").style.display = tab === 'archived' ? 'block' : 'none';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-btn')[tab === 'dashboard' ? 0 : 1].classList.add('active');
}

function logout() {
  window.location.href = "index.html";
}

window.onload = function() {
  renderComplaints();
  renderArchive();
  showTab('dashboard');
};
