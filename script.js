// Hippo Animation and Modal Handling (no changes needed)

const mouthSpeed = 0.3;
const easeType = Power2.easeOut;
const mouthOpen = gsap.timeline({ paused: true });
mouthOpen.to('.mouth-back', {duration: mouthSpeed, ease: easeType, y: -70}, 0);
mouthOpen.to('.tongue', {duration: mouthSpeed * 1.5, ease: easeType, y: -70}, 0);
mouthOpen.to('.teeth', {duration: mouthSpeed, ease: easeType, y: -70, scaleY: 1.2}, 0);
mouthOpen.to('.body', {duration: mouthSpeed, ease: easeType, scaleY: 1.06, transformOrigin: 'center bottom'}, 0);
mouthOpen.to('.freckles', {duration: mouthSpeed, ease: easeType, y: -10}, 0);
mouthOpen.to('.ears', {duration: mouthSpeed, ease: easeType, y: 6}, 0);
mouthOpen.to('.eye-right', {duration: mouthSpeed, ease: easeType, x: -2}, 0);
mouthOpen.to('.eye-left', {duration: mouthSpeed, ease: easeType, x: 2}, 0);
mouthOpen.to('.eyes', {duration: mouthSpeed, ease: easeType, y: 2}, 0);
mouthOpen.to('.nostrils', {duration: mouthSpeed, ease: easeType, y: -6}, 0);

const hippoBtn = document.getElementById('openComplaintForm');
hippoBtn.addEventListener('mouseenter', () => mouthOpen.play());
hippoBtn.addEventListener('mouseleave', () => mouthOpen.reverse());
hippoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('complaintModal').style.display = 'flex';
});

function closeComplaintModal() {
  document.getElementById('complaintModal').style.display = 'none';
}

document.getElementById('notifIcon').onclick = function() {
  document.getElementById('notificationPopup').style.display = 'flex';
};
function closeNotificationPopup() {
  document.getElementById('notificationPopup').style.display = 'none';
}
document.getElementById('userIcon').onclick = function() {
  document.getElementById('loginModal').style.display = 'flex';
};
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}
window.onclick = function(event) {
  ['complaintModal','notificationPopup','loginModal'].forEach(function(id){
    const modal = document.getElementById(id);
    if(event.target === modal) modal.style.display = 'none';
  });
};
// Hippo ear wiggle and eye tracking code (remains unchanged)

// Submission and Login
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (username === 'admin' && password === 'admin') {
    window.location.href = 'admin.html';
  } else {
    alert('Login failed! Please enter the correct admin username and password.');
    document.getElementById('password').value = '';
  }
  closeLoginModal();
};

// ACTUAL COMPLAINT SUBMISSION (POST to PHP)
document.getElementById('complaintForm').onsubmit = function(e){
  e.preventDefault();
  const formData = new FormData(this);
  fetch('submit_complaint.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    if(msg.trim() === 'success'){
      alert('Complaint submitted!');
      closeComplaintModal();
      this.reset();
    } else {
      alert(msg); // now shows PHP error/help messages
    }
  })
  .catch(() => alert('Submission failed. Try again later.'));
};
