(function() {
  const courseSelect = document.getElementById('id_course');
  // Support both a plain SelectMultiple with id 'id_modules' and
  // Django admin's FilteredSelectMultiple which uses
  // 'id_modules_from' (available) and 'id_modules_to' (chosen).
  const modulesSelect = document.getElementById('id_modules');
  const modulesFrom = document.getElementById('id_modules_from');
  const modulesTo = document.getElementById('id_modules_to');
  if (!courseSelect || (!modulesSelect && !modulesFrom)) return;

  const updateModules = (courseId) => {
    if (!courseId) {
      if (modulesSelect) modulesSelect.innerHTML = '';
      if (modulesFrom) modulesFrom.innerHTML = '';
      return;
    }

    // Determine the base admin URL for Enrollment (plural path) so we can call the helper endpoint.
    const match = window.location.pathname.match(/^(.*\/admin\/webapp\/enrollments\/)/);
    const base = match ? match[1] : '/admin/webapp/enrollments/';
    const url = `${base}modules-for-course/?course_id=${encodeURIComponent(courseId)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        // If using FilteredSelectMultiple (admin), update the "available" list
        // while preserving options that are already in the "chosen" box.
        if (modulesFrom && modulesTo) {
          const chosenValues = Array.from(modulesTo.options).map((o) => o.value);
          // Clear available list
          modulesFrom.innerHTML = '';
          data.modules.forEach((mod) => {
            // don't add to available list if already chosen
            if (chosenValues.includes(String(mod.id))) return;
            const option = document.createElement('option');
            option.value = mod.id;
            option.textContent = `${mod.code} - ${mod.name}`;
            modulesFrom.appendChild(option);
          });
        } else if (modulesSelect) {
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
        }
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
