import React, {useEffect, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function normalise(value) {
  return String(value || '').trim().toLowerCase();
}

function safeHref(value) {
  if (!value) return 'https://portal.skunkworksacademy.com/';
  if (value.startsWith('/')) return value;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol)
      ? url.href
      : 'https://portal.skunkworksacademy.com/';
  } catch {
    return 'https://portal.skunkworksacademy.com/';
  }
}

function LabCard({lab}) {
  const tags = Array.isArray(lab.tags) ? lab.tags.slice(0, 5) : [];
  const href = safeHref(lab.guideUrl);
  const isInternal = href.startsWith('/');

  return (
    <article className="catalog-lab-card">
      <div className="catalog-lab-card__topline">
        <code>{lab.id || 'LAB'}</code>
        <span className="catalog-status catalog-status--available">Available</span>
      </div>

      <p className="catalog-track">{lab.track || 'Technical practice'}</p>
      <h3>{lab.title || 'Untitled lab'}</h3>
      <p className="catalog-summary">{lab.summary || 'Practical Skunkworks Academy lab.'}</p>

      <dl className="catalog-facts">
        <div>
          <dt>Level</dt>
          <dd>{lab.level || 'TBC'}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{lab.durationMinutes ? `${lab.durationMinutes} min` : 'TBC'}</dd>
        </div>
        <div>
          <dt>Access</dt>
          <dd>{lab.accessMode || 'Academy platform'}</dd>
        </div>
      </dl>

      {tags.length > 0 && (
        <div className="catalog-tags" aria-label={`${lab.title || 'Lab'} topics`}>
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      )}

      <div className="catalog-card-actions">
        <a
          className="catalog-primary-action"
          href={href}
          {...(!isInternal ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
          Open lab
          <span aria-hidden="true">→</span>
        </a>
        <a href="https://portal.skunkworksacademy.com/">Learner portal</a>
      </div>
    </article>
  );
}

export default function AvailableLabs() {
  const catalogUrl = useBaseUrl('/catalog/labs.json');
  const [labs, setLabs] = useState([]);
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState('');
  const [state, setState] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setState('loading');
        const response = await fetch(catalogUrl, {
          cache: 'no-store',
          signal: controller.signal,
          headers: {Accept: 'application/json'},
        });
        if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('catalog/labs.json must contain a JSON array');

        const available = data.filter((lab) => normalise(lab.status) === 'available');
        setLabs(available);
        setState('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Unable to load lab catalogue:', error);
        setState('error');
      }
    }

    load();
    return () => controller.abort();
  }, [catalogUrl]);

  const tracks = useMemo(
    () => [...new Set(labs.map((lab) => lab.track).filter(Boolean))].sort(),
    [labs],
  );

  const visibleLabs = useMemo(() => {
    const needle = normalise(query);
    return labs.filter((lab) => {
      const matchesTrack = !track || lab.track === track;
      const haystack = [
        lab.id,
        lab.title,
        lab.track,
        lab.level,
        lab.summary,
        lab.accessMode,
        ...(Array.isArray(lab.tags) ? lab.tags : []),
      ].join(' ').toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesTrack && matchesQuery;
    });
  }, [labs, query, track]);

  const totalMinutes = useMemo(
    () => labs.reduce((sum, lab) => sum + Number(lab.durationMinutes || 0), 0),
    [labs],
  );

  if (state === 'loading') {
    return (
      <div className="catalog-state" role="status" aria-live="polite">
        <span className="catalog-spinner" aria-hidden="true" />
        Loading available labs from <code>catalog/labs.json</code>…
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="catalog-state catalog-state--error" role="alert">
        <strong>Lab catalogue unavailable.</strong>
        <span> The page could not load <code>catalog/labs.json</code>. Try refreshing, or use the learner portal while the catalogue is being restored.</span>
      </div>
    );
  }

  return (
    <section className="dynamic-catalog" aria-labelledby="available-labs-heading">
      <div className="catalog-heading-row">
        <div>
          <p className="catalog-kicker">Live catalogue · JSON-backed</p>
          <h2 id="available-labs-heading">Available labs</h2>
          <p>
            These cards are generated directly from <code>catalog/labs.json</code>. Publishing a lab as <code>available</code> updates this catalogue automatically on the next page load.
          </p>
        </div>
        <a className="catalog-source-link" href="https://github.com/skunkworks-academy/labs/blob/main/catalog/labs.json" target="_blank" rel="noopener noreferrer">
          View catalogue source ↗
        </a>
      </div>

      <div className="catalog-metrics" aria-label="Available lab catalogue summary">
        <div><strong>{labs.length}</strong><span>Available labs</span></div>
        <div><strong>{tracks.length}</strong><span>Tracks</span></div>
        <div><strong>{totalMinutes.toLocaleString('en-ZA')}</strong><span>Guided minutes</span></div>
      </div>

      <div className="catalog-toolbar">
        <label>
          <span>Search labs</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, code, track or topic"
            autoComplete="off"
          />
        </label>
        <label>
          <span>Track</span>
          <select value={track} onChange={(event) => setTrack(event.target.value)}>
            <option value="">All tracks</option>
            {tracks.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => { setQuery(''); setTrack(''); }} disabled={!query && !track}>
          Clear filters
        </button>
      </div>

      <p className="catalog-result-note" aria-live="polite">
        Showing {visibleLabs.length} of {labs.length} available labs.
      </p>

      {visibleLabs.length > 0 ? (
        <div className="catalog-card-grid">
          {visibleLabs.map((lab) => <LabCard key={lab.id || lab.title} lab={lab} />)}
        </div>
      ) : (
        <div className="catalog-state">No available labs match the current filters.</div>
      )}
    </section>
  );
}
