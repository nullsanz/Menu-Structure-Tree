// State Management (in-memory storage)
const formState = {
  currentTab: 1,
  dataPribadi: {},
  pendidikan: [{}],
  organisasi: [{}],
  pengalamanKerja: [{}],
  completed: {
    1: false,
    2: false,
    3: false,
    4: false
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
  initializeEducation();
  initializeOrganization();
  initializeWork();
  initializeValidation();
  initializeNavigation();
  updateProgress();
});

// Tab Navigation
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = parseInt(this.dataset.tab);
      switchTab(targetTab);
    });
  });
}

function switchTab(tabNumber) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show target tab
  document.getElementById(`tab-${tabNumber}`).classList.add('active');
  document.querySelector(`[data-tab="${tabNumber}"]`).classList.add('active');
  
  // Update state
  formState.currentTab = tabNumber;
  
  // Update navigation buttons
  updateNavigationButtons();
  updateProgress();
  
  // Focus first input in tab
  const firstInput = document.querySelector(`#tab-${tabNumber} input, #tab-${tabNumber} select, #tab-${tabNumber} textarea`);
  if (firstInput) {
    firstInput.focus();
  }
}

function updateProgress() {
  const currentStep = formState.currentTab;
  document.getElementById('currentStep').textContent = currentStep;
  
  const progressBar = document.getElementById('progressBar');
  const percentage = (currentStep / 4) * 100;
  progressBar.style.width = `${percentage}%`;
  
  // Update completion status
  updateCompletionStatus();
}

function updateCompletionStatus() {
  const completedCount = Object.values(formState.completed).filter(v => v).length;
  const statusElement = document.getElementById('completionStatus');
  
  if (completedCount === 4) {
    statusElement.textContent = 'Semua data telah lengkap ✓';
    statusElement.style.color = '#10b981';
  } else {
    statusElement.textContent = `${completedCount}/4 bagian selesai`;
    statusElement.style.color = 'white';
  }
}

// Education Section
function initializeEducation() {
  addEducationEntry();
  
  document.getElementById('addEducation').addEventListener('click', function() {
    addEducationEntry();
  });
}

function addEducationEntry(data = {}) {
  const container = document.getElementById('education-list');
  const index = formState.pendidikan.length;
  
  const itemDiv = document.createElement('div');
  itemDiv.className = 'list-item';
  itemDiv.dataset.index = index;
  
  itemDiv.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">Pendidikan #${index + 1}</span>
      ${index > 0 ? '<button type="button" class="btn-remove" onclick="removeEducationEntry(this)">Hapus</button>' : ''}
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tingkat Pendidikan</label>
        <select name="edu_tingkat_${index}" class="form-control">
          <option value="">Pilih tingkat</option>
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA">SMA</option>
          <option value="D3">D3</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Institusi</label>
        <input type="text" name="edu_institusi_${index}" class="form-control" placeholder="Nama sekolah/universitas">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">Jurusan/Program Studi</label>
      <input type="text" name="edu_jurusan_${index}" class="form-control" placeholder="Nama jurusan">
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tahun Masuk</label>
        <input type="number" name="edu_tahun_masuk_${index}" class="form-control" placeholder="2020" min="1950" max="2030">
      </div>
      <div class="form-group">
        <label class="form-label">Tahun Lulus</label>
        <input type="number" name="edu_tahun_lulus_${index}" class="form-control" placeholder="2024" min="1950" max="2030">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">Nilai/IPK</label>
      <input type="number" name="edu_nilai_${index}" class="form-control" placeholder="3.50" step="0.01" min="0" max="4">
    </div>
  `;
  
  container.appendChild(itemDiv);
  formState.pendidikan.push({});
}

function removeEducationEntry(button) {
  const item = button.closest('.list-item');
  const index = parseInt(item.dataset.index);
  
  item.style.animation = 'slideOut 0.3s ease';
  setTimeout(() => {
    item.remove();
    formState.pendidikan.splice(index, 1);
    renumberEducationEntries();
  }, 300);
}

function renumberEducationEntries() {
  const items = document.querySelectorAll('#education-list .list-item');
  items.forEach((item, index) => {
    item.dataset.index = index;
    item.querySelector('.list-item-title').textContent = `Pendidikan #${index + 1}`;
  });
}

// Organization Section
function initializeOrganization() {
  addOrganizationEntry();
  
  document.getElementById('addOrganization').addEventListener('click', function() {
    addOrganizationEntry();
  });
}

function addOrganizationEntry(data = {}) {
  const container = document.getElementById('organization-list');
  const index = formState.organisasi.length;
  
  const itemDiv = document.createElement('div');
  itemDiv.className = 'list-item';
  itemDiv.dataset.index = index;
  
  itemDiv.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">Organisasi #${index + 1}</span>
      ${index > 0 ? '<button type="button" class="btn-remove" onclick="removeOrganizationEntry(this)">Hapus</button>' : ''}
    </div>
    
    <div class="form-group">
      <label class="form-label">Nama Organisasi</label>
      <input type="text" name="org_nama_${index}" class="form-control" placeholder="Nama organisasi">
    </div>
    
    <div class="form-group">
      <label class="form-label">Jabatan</label>
      <input type="text" name="org_jabatan_${index}" class="form-control" placeholder="Jabatan Anda">
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Periode Mulai</label>
        <input type="date" name="org_mulai_${index}" class="form-control">
      </div>
      <div class="form-group">
        <label class="form-label">Periode Selesai</label>
        <input type="date" name="org_selesai_${index}" class="form-control" id="org_selesai_${index}">
      </div>
    </div>
    
    <div class="form-group">
      <label class="checkbox-label">
        <input type="checkbox" name="org_aktif_${index}" onchange="toggleOrganizationEndDate(${index})">
        <span>Masih Aktif</span>
      </label>
    </div>
    
    <div class="form-group">
      <label class="form-label">Deskripsi Singkat</label>
      <textarea name="org_deskripsi_${index}" class="form-control" rows="3" placeholder="Deskripsi kegiatan dan pencapaian"></textarea>
      <span class="char-count"><span id="org_desc_count_${index}">0</span>/500</span>
    </div>
  `;
  
  container.appendChild(itemDiv);
  formState.organisasi.push({});
  
  // Add character counter
  const textarea = itemDiv.querySelector(`[name="org_deskripsi_${index}"]`);
  const counter = itemDiv.querySelector(`#org_desc_count_${index}`);
  textarea.addEventListener('input', function() {
    counter.textContent = this.value.length;
  });
}

function removeOrganizationEntry(button) {
  const item = button.closest('.list-item');
  const index = parseInt(item.dataset.index);
  
  item.style.animation = 'slideOut 0.3s ease';
  setTimeout(() => {
    item.remove();
    formState.organisasi.splice(index, 1);
    renumberOrganizationEntries();
  }, 300);
}

function renumberOrganizationEntries() {
  const items = document.querySelectorAll('#organization-list .list-item');
  items.forEach((item, index) => {
    item.dataset.index = index;
    item.querySelector('.list-item-title').textContent = `Organisasi #${index + 1}`;
  });
}

function toggleOrganizationEndDate(index) {
  const checkbox = document.querySelector(`[name="org_aktif_${index}"]`);
  const endDateInput = document.getElementById(`org_selesai_${index}`);
  
  if (checkbox.checked) {
    endDateInput.disabled = true;
    endDateInput.value = '';
    endDateInput.placeholder = 'Sekarang';
  } else {
    endDateInput.disabled = false;
    endDateInput.placeholder = '';
  }
}

// Work Experience Section
function initializeWork() {
  addWorkEntry();
  
  document.getElementById('addWork').addEventListener('click', function() {
    addWorkEntry();
  });
}

function addWorkEntry(data = {}) {
  const container = document.getElementById('work-list');
  const index = formState.pengalamanKerja.length;
  
  const itemDiv = document.createElement('div');
  itemDiv.className = 'list-item';
  itemDiv.dataset.index = index;
  
  itemDiv.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">Pengalaman Kerja #${index + 1}</span>
      ${index > 0 ? '<button type="button" class="btn-remove" onclick="removeWorkEntry(this)">Hapus</button>' : ''}
    </div>
    
    <div class="form-group">
      <label class="form-label">Nama Perusahaan/Institusi</label>
      <input type="text" name="work_perusahaan_${index}" class="form-control" placeholder="Nama perusahaan">
    </div>
    
    <div class="form-group">
      <label class="form-label">Posisi/Jabatan</label>
      <input type="text" name="work_posisi_${index}" class="form-control" placeholder="Posisi Anda">
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Periode Mulai</label>
        <input type="date" name="work_mulai_${index}" class="form-control">
      </div>
      <div class="form-group">
        <label class="form-label">Periode Selesai</label>
        <input type="date" name="work_selesai_${index}" class="form-control" id="work_selesai_${index}">
      </div>
    </div>
    
    <div class="form-group">
      <label class="checkbox-label">
        <input type="checkbox" name="work_aktif_${index}" onchange="toggleWorkEndDate(${index})">
        <span>Masih Bekerja</span>
      </label>
    </div>
    
    <div class="form-group">
      <label class="form-label">Deskripsi Tugas</label>
      <textarea name="work_deskripsi_${index}" class="form-control" rows="3" placeholder="Deskripsi tugas dan tanggung jawab"></textarea>
      <span class="char-count"><span id="work_desc_count_${index}">0</span>/500</span>
    </div>
  `;
  
  container.appendChild(itemDiv);
  formState.pengalamanKerja.push({});
  
  // Add character counter
  const textarea = itemDiv.querySelector(`[name="work_deskripsi_${index}"]`);
  const counter = itemDiv.querySelector(`#work_desc_count_${index}`);
  textarea.addEventListener('input', function() {
    counter.textContent = this.value.length;
  });
}

function removeWorkEntry(button) {
  const item = button.closest('.list-item');
  const index = parseInt(item.dataset.index);
  
  item.style.animation = 'slideOut 0.3s ease';
  setTimeout(() => {
    item.remove();
    formState.pengalamanKerja.splice(index, 1);
    renumberWorkEntries();
  }, 300);
}

function renumberWorkEntries() {
  const items = document.querySelectorAll('#work-list .list-item');
  items.forEach((item, index) => {
    item.dataset.index = index;
    item.querySelector('.list-item-title').textContent = `Pengalaman Kerja #${index + 1}`;
  });
}

function toggleWorkEndDate(index) {
  const checkbox = document.querySelector(`[name="work_aktif_${index}"]`);
  const endDateInput = document.getElementById(`work_selesai_${index}`);
  
  if (checkbox.checked) {
    endDateInput.disabled = true;
    endDateInput.value = '';
    endDateInput.placeholder = 'Sekarang';
  } else {
    endDateInput.disabled = false;
    endDateInput.placeholder = '';
  }
}

// Validation
function initializeValidation() {
  const form = document.getElementById('identityForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('invalid')) {
        validateField(this);
      }
    });
  });
  
  // Character counter for alamat
  const alamatTextarea = document.querySelector('[name="alamat"]');
  const alamatCounter = document.getElementById('alamat-count');
  if (alamatTextarea) {
    alamatTextarea.addEventListener('input', function() {
      alamatCounter.textContent = this.value.length;
    });
  }
}

function validateField(field) {
  const errorSpan = field.parentElement.querySelector('.error-message');
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = 'Field ini wajib diisi';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Format email tidak valid';
    }
  } else if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Nomor telepon harus 10-15 digit angka';
    }
  } else if (field.name === 'nik' && field.value) {
    if (field.value.length !== 16 || !/^[0-9]{16}$/.test(field.value)) {
      isValid = false;
      errorMessage = 'NIK harus 16 digit angka';
    }
  } else if (field.type === 'radio' && field.hasAttribute('required')) {
    const radioGroup = document.querySelectorAll(`[name="${field.name}"]`);
    isValid = Array.from(radioGroup).some(radio => radio.checked);
    if (!isValid) {
      errorMessage = 'Pilih salah satu opsi';
    }
  }
  
  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');
    if (errorSpan) errorSpan.textContent = '';
  } else {
    field.classList.remove('valid');
    field.classList.add('invalid');
    if (errorSpan) errorSpan.textContent = errorMessage;
  }
  
  return isValid;
}

function validateTab(tabNumber) {
  const tab = document.getElementById(`tab-${tabNumber}`);
  const requiredFields = tab.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  // Update tab completion status
  formState.completed[tabNumber] = isValid;
  const tabButton = document.querySelector(`[data-tab="${tabNumber}"]`);
  
  if (isValid) {
    tabButton.classList.add('completed');
  } else {
    tabButton.classList.remove('completed');
  }
  
  return isValid;
}

// Navigation
function initializeNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const form = document.getElementById('identityForm');
  
  prevBtn.addEventListener('click', function() {
    if (formState.currentTab > 1) {
      switchTab(formState.currentTab - 1);
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (validateTab(formState.currentTab)) {
      if (formState.currentTab < 4) {
        switchTab(formState.currentTab + 1);
      }
    } else {
      alert('Mohon lengkapi semua field yang wajib diisi sebelum melanjutkan.');
    }
  });
  
  saveDraftBtn.addEventListener('click', function() {
    alert('Draft telah disimpan! Data Anda tersimpan sementara.');
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all tabs
    let allValid = true;
    for (let i = 1; i <= 4; i++) {
      if (!validateTab(i)) {
        allValid = false;
      }
    }
    
    if (allValid) {
      showSuccessModal();
    } else {
      alert('Mohon lengkapi semua field yang wajib diisi di semua tab.');
    }
  });
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  // Previous button
  prevBtn.disabled = formState.currentTab === 1;
  
  // Next/Submit button
  if (formState.currentTab === 4) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-flex';
  } else {
    nextBtn.style.display = 'inline-flex';
    submitBtn.style.display = 'none';
  }
}

// Success Modal
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  const modalBody = document.getElementById('modalBody');
  
  // Collect form data
  const formData = new FormData(document.getElementById('identityForm'));
  let summary = '<p><strong>Ringkasan Data:</strong></p>';
  
  summary += '<h3>Data Pribadi</h3>';
  summary += `<p><strong>Nama:</strong> ${formData.get('nama_lengkap')}</p>`;
  summary += `<p><strong>Email:</strong> ${formData.get('email')}</p>`;
  summary += `<p><strong>Telepon:</strong> ${formData.get('telepon')}</p>`;
  
  summary += '<h3>Pendidikan</h3>';
  const eduCount = document.querySelectorAll('#education-list .list-item').length;
  summary += `<p>${eduCount} riwayat pendidikan ditambahkan</p>`;
  
  summary += '<h3>Pengalaman Organisasi</h3>';
  const orgCount = document.querySelectorAll('#organization-list .list-item').length;
  summary += `<p>${orgCount} pengalaman organisasi ditambahkan</p>`;
  
  summary += '<h3>Pengalaman Kerja</h3>';
  const workCount = document.querySelectorAll('#work-list .list-item').length;
  summary += `<p>${workCount} pengalaman kerja ditambahkan</p>`;
  
  summary += '<p style="margin-top: 1rem; color: #10b981; font-weight: 600;">Data berhasil disimpan! Terima kasih telah mengisi form.</p>';
  
  modalBody.innerHTML = summary;
  modal.classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('successModal').classList.remove('active');
});

document.getElementById('resetForm').addEventListener('click', function() {
  if (confirm('Apakah Anda yakin ingin mengisi form baru? Data saat ini akan dihapus.')) {
    location.reload();
  }
});

// Add CSS for slideOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
`;
document.head.appendChild(style);