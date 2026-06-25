/* Skunkworks Academy Labs catalogue runtime. Version: 2026-06-25 */
(function () {
  'use strict';

  const state = {
    labs: [],
    query: '',
    track: '',
    status: ''
  };

  const selectors = {
    grid: '#labGrid',
    search: '#searchInput',
    track: '#trackFilter',
    status: '#statusFilter',
    reset: '#resetFilters',
    resultNote: '#resultNote',
    year: '#year',
    metricTotal: '#metricTotal',
    metricAvailable: '#metricAvailable',
    metricTracks: '#metricTracks',
    metricMinutes: '#metricMinutes'
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function normalise(value) {
    return String(value || '').trim().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function safeUrl(value, fallback) {
    try {
      const url = new URL(value || fallback, window.location.href);
      if (!['https:', 'http:', 'mailto:'].includes(url.protocol)) return fallback;
      return url.href;
    } catch (error) {
      return fallback;
    }
  }

  function getStatusClass(status) {
    return normalise(status).replace(/[^a-z0-9-]/g, '') || 'planned';
  }

  function getSearchText(lab) {
    return [
      lab.id,
      lab.title,
      lab.track,
      lab.level,
      lab.status,
      lab.summary,
      lab.accessMode,
      lab.provider,
      lab.badge,
      ...(lab.tags || [])
    ].join(' ').toLowerCase();
  }

  function getFilteredLabs() {
    const query = normalise(state.query);
    return state.labs.filter((lab) => {
      const matchesQuery = !query || getSearchText(lab).includes(query);
      const matchesTrack = !state.track || lab.track === state.track;
      const matchesStatus = !state.status || normalise(lab.status) === state.status;
      return matchesQuery && matchesTrack && matchesStatus;
    });
  }

  function updateMetrics(labs) {
    const tracks = new Set(labs.map((lab) => lab.track).filter(Boolean));
    const totalMinutes = labs.reduce((sum, lab) => sum + Number(lab.durationMinutes || 0), 0);
    const formatter = new Intl.NumberFormat('en-ZA');

    $(selectors.metricTotal).textContent = formatter.format(labs.length);
    $(selectors.metricAvailable).textContent = formatter.format(labs.filter((lab) => normalise(lab.status) === 'available').length);
    $(selectors.metricTracks).textContent = formatter.format(tracks.size);
    $(selectors.metricMinutes).textContent = formatter.format(totalMinutes);
  }

  function populateTrackFilter(labs) {
    const trackFilter = $(selectors.track);
    const tracks = [...new Set(labs.map((lab) => lab.track).filter(Boolean))].sort();

    trackFilter.innerHTML = '<option value="">All tracks</option>';
    for (const track of tracks) {
      const option = document.createElement('option');
      option.value = track;
      option.textContent = track;
      trackFilter.appendChild(option);
    }
  }

  function renderResultNote(filtered) {
    const resultNote = $(selectors.resultNote);
    const total = state.labs.length;
    const count = filtered.length;
    resultNote.textContent = count === total
      ? `Showing all ${total} lab records.`
      : `Showing ${count} of ${total} lab records.`;
  }

  function renderLabs() {
    const grid = $(selectors.grid);
    const filtered = getFilteredLabs();
    renderResultNote(filtered);

    if (!filtered.length) {
      grid.innerHTML = '<div class="labs-empty">No labs match the current filters. Clear the filters or update <code>catalog/labs.json</code> with the required lab record.</div>';
      return;
    }

    grid.innerHTML = filtered.map((lab) => {
      const tags = (lab.tags || []).map((tag) => `<span class="labs-tag">${escapeHtml(tag)}</span>`).join('');
      const guideUrl = safeUrl(lab.guideUrl, 'https://github.com/skunkworks-academy/labs-guides');
      const portalUrl = 'https://portal.skunkworksacademy.com/';
      const duration = lab.durationMinutes ? `${escapeHtml(lab.durationMinutes)} min` : 'TBC';
      const badge = lab.badge || 'Evidence record';

      return `
        <article class="labs-lab-card" data-status="${escapeHtml(getStatusClass(lab.status))}">
          <div class="labs-lab-top">
            <div class="labs-lab-id">${escapeHtml(lab.id)}</div>
            <div class="labs-status ${getStatusClass(lab.status)}">${escapeHtml(lab.status || 'planned')}</div>
          </div>
          <h3>${escapeHtml(lab.title)}</h3>
          <p>${escapeHtml(lab.summary)}</p>
          <div class="labs-facts">
            <span><b>Track</b><em>${escapeHtml(lab.track || 'Unassigned')}</em></span>
            <span><b>Level</b><em>${escapeHtml(lab.level || 'TBC')}</em></span>
            <span><b>Duration</b><em>${duration}</em></span>
            <span><b>Access</b><em>${escapeHtml(lab.accessMode || 'Portal')}</em></span>
            <span><b>Badge</b><em>${escapeHtml(badge)}</em></span>
          </div>
          <div class="labs-tags">${tags}</div>
          <div class="labs-card-actions">
            <a href="${guideUrl}" target="_blank" rel="noopener">View guide</a>
            <a href="${portalUrl}">Open portal</a>
          </div>
        </article>
      `;
    }).join('');
  }

  async function loadLabs() {
    const grid = $(selectors.grid);

    try {
      const response = await fetch('catalog/labs.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Catalogue request failed with status ${response.status}`);
      }

      const labs = await response.json();
      if (!Array.isArray(labs)) {
        throw new Error('catalog/labs.json must contain an array.');
      }

      state.labs = labs;
      updateMetrics(labs);
      populateTrackFilter(labs);
      renderLabs();
    } catch (error) {
      console.error(error);
      grid.innerHTML = `
        <div class="labs-error">
          Could not load <code>catalog/labs.json</code>. Confirm the file exists, validates as JSON, and GitHub Pages is serving the latest commit.
        </div>
      `;
      $(selectors.resultNote).textContent = 'Catalogue unavailable.';
    }
  }

  function resetFilters() {
    state.query = '';
    state.track = '';
    state.status = '';
    $(selectors.search).value = '';
    $(selectors.track).value = '';
    $(selectors.status).value = '';
    renderLabs();
  }

  function bindEvents() {
    $(selectors.year).textContent = new Date().getFullYear();

    $(selectors.search).addEventListener('input', (event) => {
      state.query = event.target.value;
      renderLabs();
    });

    $(selectors.track).addEventListener('change', (event) => {
      state.track = event.target.value;
      renderLabs();
    });

    $(selectors.status).addEventListener('change', (event) => {
      state.status = event.target.value;
      renderLabs();
    });

    $(selectors.reset).addEventListener('click', resetFilters);
  }

  function init() {
    bindEvents();
    loadLabs();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
