(function() {
  const courseSelect = document.getElementById('id_course');
  const modulesSelect = document.getElementById('id_modules');
  if (!courseSelect || !modulesSelect) return;

  const updateModules = (courseId) => {
    if (!courseId) {
      modulesSelect.innerHTML = '';
      return;
    }

    // Determine the base admin URL for Enrollment (plural path) so we can call the helper endpoint.
    const match = window.location.pathname.match(/^(.*\/admin\/webapp\/enrollments\/)/);
    const base = match ? match[1] : '/admin/webapp/enrollments/';
    const url = `${base}modules-for-course/?course_id=${encodeURIComponent(courseId)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const selected = Array.from(modulesSelect.selectedOptions).map((o) => o.value);
        modulesSelect.innerHTML = '';
        data.modules.forEach((mod) => {
          const option = document.createElement('option');
          option.value = mod.id;
          option.textContent = `${mod.code} - ${mod.name}`;
          if (selected.includes(String(mod.id))) {
            option.selected = true;
          }
          modulesSelect.appendChild(option);
        });
      })
      .catch(() => {
        console.warn('Unable to load modules for selected course');
      });
  };

  courseSelect.addEventListener('change', () => {
    updateModules(courseSelect.value);
  });

  // On load, initialize module list for pre-selected course (edit form)
  if (courseSelect.value) {
    updateModules(courseSelect.value);
  }
})();
