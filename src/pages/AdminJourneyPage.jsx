import { useState, useMemo, useRef } from 'react';
import { JOURNEY_CATEGORIES } from '../data/journeyCmsSeed';
import { useJourneyCms } from '../hooks/useJourneyCms';
import { authService } from '../services/authService';
import { journeyService } from '../services/journeyService';
import { projectService } from '../services/projectService';

const EMPTY_FORM = {
  title: '',
  category: 'Competitions',
  displayDate: '',
  sortDate: new Date().toISOString().slice(0, 10),
  organization: '',
  badge: '',
  description: '',
  link: '',
  status: 'published',
  featured: false
};

export function AdminJourneyPage({ onToast, onNavigate }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [username, setUsername] = useState('Suklal Gorai');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const {
    allEntries,
    createEntry,
    updateEntry,
    togglePublish,
    deleteEntry,
    resetToDefaults,
    importEntries
  } = useJourneyCms({ onlyPublished: false });

  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminProjects, setAdminProjects] = useState(() => projectService.getAllProjects());
  const titleInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const passcodeHint = authService.getDefaultPasscodeHint();

  const stats = useMemo(() => {
    const published = allEntries.filter((e) => e.status === 'published').length;
    const drafts = allEntries.length - published;
    const featured = allEntries.filter((e) => e.featured).length;
    return { total: allEntries.length, published, drafts, featured };
  }, [allEntries]);

  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allEntries.filter((item) => {
      const matchesCat = filterCategory === 'All' || item.category === filterCategory;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesStatus && matchesQuery;
    });
  }, [allEntries, filterCategory, statusFilter, searchQuery]);

  const handleSignIn = (event) => {
    event.preventDefault();
    const res = authService.signIn({ username, passcode });
    if (!res.ok) {
      setAuthError(res.error);
      return;
    }
    setAuthError('');
    setPasscode('');
    setSession(res.session);
    onToast?.(`Signed in to Journey CMS as ${res.session.username}`);
  };

  const handleSignOut = () => {
    authService.signOut();
    setSession(null);
    onToast?.('Signed out of Journey CMS');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formState.title.trim().length < 3) {
      setFormError('Please enter a milestone title (at least 3 characters).');
      titleInputRef.current?.focus();
      return;
    }
    if (formState.description.trim().length < 10) {
      setFormError('Please add a brief description (at least 10 characters).');
      return;
    }

    setFormError('');
    if (editingId) {
      updateEntry(editingId, formState);
      onToast?.(
        formState.status === 'published'
          ? `Updated & published "${formState.title.trim()}" to public timeline`
          : `Saved draft "${formState.title.trim()}"`
      );
    } else {
      createEntry(formState);
      onToast?.(
        formState.status === 'published'
          ? `Published "${formState.title.trim()}" to public timeline`
          : `Created draft "${formState.title.trim()}"`
      );
    }

    setEditingId(null);
    setFormState({
      ...EMPTY_FORM,
      sortDate: new Date().toISOString().slice(0, 10)
    });
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setFormError('');
    setFormState({
      title: item.title,
      category: item.category,
      displayDate: item.displayDate,
      sortDate: item.sortDate,
      organization: item.organization,
      badge: item.badge,
      description: item.description,
      link: item.link,
      status: item.status,
      featured: item.featured
    });
    titleInputRef.current?.focus();
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormError('');
    setFormState({
      ...EMPTY_FORM,
      sortDate: new Date().toISOString().slice(0, 10)
    });
  };

  const handleExport = () => {
    const json = journeyService.exportEntries();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'journey-cms-export.json';
    link.click();
    URL.revokeObjectURL(url);
    onToast?.('Exported Journey CMS JSON');
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      importEntries(parsed);
      onToast?.('Imported Journey CMS entries');
    } catch {
      onToast?.('Invalid JSON file for Journey CMS import');
    } finally {
      event.target.value = '';
    }
  };

  const previewCat =
    JOURNEY_CATEGORIES.find((c) => c.id === formState.category) || JOURNEY_CATEGORIES[0];

  if (!session) {
    return (
      <section className="admin-auth-section">
        <div className="container">
          <div className="admin-auth-card">
            <span className="section-eyebrow">// JOURNEY CMS ACCESS</span>
            <h1>Admin Dashboard Sign In</h1>
            <p className="admin-auth-subtitle">
              Authenticate to create, edit, or publish competitions, awards, college activities, certifications, project launches, and technical milestones.
            </p>

            <form onSubmit={handleSignIn} className="admin-auth-form" noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="cmsAdminName">
                  Publisher Name
                </label>
                <input
                  id="cmsAdminName"
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cmsAdminPasscode">
                  Admin Passcode
                </label>
                <input
                  id="cmsAdminPasscode"
                  type="password"
                  className="form-input"
                  placeholder="Enter CMS passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  autoComplete="current-password"
                  required
                />
              </div>

              {authError && (
                <p className="form-status form-status-error" role="alert">
                  {authError}
                </p>
              )}

              {passcodeHint && (
                <p className="admin-passcode-hint">
                  Demo / Owner Passcode: <code>{passcodeHint}</code>
                </p>
              )}

              <div className="admin-auth-actions">
                <button type="submit" className="btn btn-primary">
                  Unlock CMS Dashboard <span aria-hidden="true">→</span>
                </button>
                <a
                  href="/journey"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/journey');
                    }
                  }}
                >
                  Back to Public Timeline
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-cms-section">
      <div className="container">
        <header className="admin-cms-header">
          <div>
            <span className="section-eyebrow">// PROFESSIONAL JOURNEY CMS</span>
            <h1>Journey &amp; Achievements Studio</h1>
            <p>
              Signed in as <strong>{session.username}</strong>. Any published update syncs immediately to the public timeline and home highlights.
            </p>
          </div>

          <div className="admin-header-controls">
            <a
              href="/journey"
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/journey');
                }
              }}
            >
              View Public Timeline ↗
            </a>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleExport}>
              Export JSON
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="visually-hidden"
              onChange={handleImportFile}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                resetToDefaults();
                onToast?.('Restored default Journey CMS entries');
              }}
            >
              Reset Defaults
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Summary KPI Strip */}
        <div className="admin-stats-strip">
          <div className="admin-stat-box">
            <span className="admin-stat-num">{stats.total}</span>
            <span className="admin-stat-lbl">Total Entries</span>
          </div>
          <div className="admin-stat-box stat-blue">
            <span className="admin-stat-num">{stats.published}</span>
            <span className="admin-stat-lbl">Published Live</span>
          </div>
          <div className="admin-stat-box stat-yellow">
            <span className="admin-stat-num">{stats.drafts}</span>
            <span className="admin-stat-lbl">Drafts</span>
          </div>
          <div className="admin-stat-box stat-coral">
            <span className="admin-stat-num">{stats.featured}</span>
            <span className="admin-stat-lbl">Featured Spotlights</span>
          </div>
        </div>

        <div className="admin-workspace-grid">
          {/* Left: Editor Form + Live Card Preview */}
          <div className="admin-editor-column">
            <form className="admin-editor-card" onSubmit={handleFormSubmit} noValidate>
              <div className="admin-editor-top">
                <h2>{editingId ? 'Edit Milestone Entry' : 'Publish New Milestone'}</h2>
                {editingId && (
                  <button type="button" className="text-link" onClick={cancelEditing}>
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cmsEntryTitle">
                  Title
                </label>
                <input
                  ref={titleInputRef}
                  id="cmsEntryTitle"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Finalist at Smart India Hackathon"
                  value={formState.title}
                  onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntryCategory">
                    Category
                  </label>
                  <select
                    id="cmsEntryCategory"
                    className="form-select"
                    value={formState.category}
                    onChange={(e) => setFormState((prev) => ({ ...prev, category: e.target.value }))}
                  >
                    {JOURNEY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntryStatus">
                    Publish State
                  </label>
                  <select
                    id="cmsEntryStatus"
                    className="form-select"
                    value={formState.status}
                    onChange={(e) => setFormState((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntryDisplayDate">
                    Display Date
                  </label>
                  <input
                    id="cmsEntryDisplayDate"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Nov 2026"
                    value={formState.displayDate}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, displayDate: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntrySortDate">
                    Chronological Date
                  </label>
                  <input
                    id="cmsEntrySortDate"
                    type="date"
                    className="form-input"
                    value={formState.sortDate}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, sortDate: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntryOrg">
                    Organization / Platform
                  </label>
                  <input
                    id="cmsEntryOrg"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Netaji Subhas University"
                    value={formState.organization}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, organization: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cmsEntryBadge">
                    Highlight Badge
                  </label>
                  <input
                    id="cmsEntryBadge"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 1st Runner-Up / Verified"
                    value={formState.badge}
                    onChange={(e) => setFormState((prev) => ({ ...prev, badge: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cmsEntryDesc">
                  Story / Achievement Details
                </label>
                <textarea
                  id="cmsEntryDesc"
                  className="form-textarea"
                  placeholder="Describe what was achieved, built, or learned..."
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cmsEntryLink">
                  Proof / Credential URL (Optional)
                </label>
                <input
                  id="cmsEntryLink"
                  type="url"
                  className="form-input"
                  placeholder="https://..."
                  value={formState.link}
                  onChange={(e) => setFormState((prev) => ({ ...prev, link: e.target.value }))}
                />
              </div>

              <label className="admin-checkbox-row">
                <input
                  type="checkbox"
                  checked={formState.featured}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                />
                <span>Feature in Achievement Spotlight cards</span>
              </label>

              {formError && (
                <p className="form-status form-status-error" role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-submit">
                {editingId
                  ? 'Save Changes'
                  : formState.status === 'published'
                    ? 'Publish to Public Timeline'
                    : 'Save as Draft'}
              </button>
            </form>

            {/* Live Timeline Card Preview */}
            <div className="admin-preview-card">
              <span className="admin-preview-label">LIVE TIMELINE PREVIEW</span>
              <div className={`timeline-content preview cat-${previewCat.colorKey}`}>
                <div className="timeline-meta">
                  <span className="timeline-date">{formState.displayDate || 'Nov 2026'}</span>
                  <span className={`timeline-tag cat-${previewCat.colorKey}`}>
                    {previewCat.label}
                  </span>
                  {formState.badge && (
                    <span className="timeline-badge-pill">{formState.badge}</span>
                  )}
                </div>
                <h3 className="timeline-heading">
                  {formState.title || 'Your milestone title appears here'}
                </h3>
                {formState.organization && (
                  <p className="timeline-organization">{formState.organization}</p>
                )}
                <p className="timeline-text">
                  {formState.description ||
                    'Your milestone description, impact, and key takeaways will render cleanly in the editorial light timeline.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Entries Management List */}
          <div className="admin-entries-column">
            <div className="admin-list-toolbar">
              <input
                type="search"
                className="project-search-input"
                aria-label="Search CMS entries"
                placeholder="Search titles, orgs, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="admin-filter-row">
                <select
                  aria-label="Filter CMS entries by category"
                  className="form-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {JOURNEY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter CMS entries by status"
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                </select>
              </div>
            </div>

            <div className="admin-entries-list">
              {filteredList.map((entry) => {
                const catMeta =
                  JOURNEY_CATEGORIES.find((c) => c.id === entry.category) || JOURNEY_CATEGORIES[0];
                return (
                  <article key={entry.id} className={`admin-entry-item cat-${catMeta.colorKey}`}>
                    <div className="admin-entry-top">
                      <div className="admin-entry-badges">
                        <span className={`timeline-tag cat-${catMeta.colorKey}`}>
                          {entry.category}
                        </span>
                        <span className={`admin-status-pill status-${entry.status}`}>
                          {entry.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                        {entry.featured && <span className="admin-featured-pill">Featured</span>}
                      </div>
                      <span className="timeline-date">{entry.displayDate}</span>
                    </div>

                    <h3>{entry.title}</h3>
                    {entry.organization && (
                      <p className="admin-entry-org">{entry.organization}</p>
                    )}
                    <p className="admin-entry-desc">{entry.description}</p>

                    <div className="admin-entry-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => startEditing(entry)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          const updated = togglePublish(entry.id);
                          onToast?.(
                            updated?.status === 'published'
                              ? `Published "${entry.title}"`
                              : `Moved "${entry.title}" to Drafts`
                          );
                        }}
                      >
                        {entry.status === 'published' ? 'Unpublish' : 'Publish Live'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger-ghost btn-sm"
                        onClick={() => {
                          deleteEntry(entry.id);
                          if (editingId === entry.id) cancelEditing();
                          onToast?.(`Deleted "${entry.title}"`);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}

              {filteredList.length === 0 && (
                <div className="journey-empty-state">
                  <h3>No matching entries</h3>
                  <p>Adjust your filters or publish a new milestone using the editor.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Showcase Publishing Control */}
        <section className="admin-projects-panel" style={{ marginTop: '3rem' }}>
          <div className="admin-editor-card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: 'var(--radius-xl)' }}>
            <div className="admin-editor-top">
              <div>
                <span className="section-eyebrow">// PROJECT SHOWCASE CMS</span>
                <h2 style={{ margin: '0.25rem 0' }}>Manage Projects &amp; Public Visibility</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Control which projects appear on the public <code>/projects</code> grid and Home featured area.
                  Unpublished projects remain safely preserved in draft mode.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href="/projects"
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/projects');
                    }
                  }}
                >
                  View Public Projects ↗
                </a>
              </div>
            </div>

            <div className="admin-projects-table" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {adminProjects.map((proj) => {
                const isPub = proj.published === true;
                const isFeat = proj.featured === true;
                return (
                  <div
                    key={proj.id}
                    className="admin-project-item glass-frosted"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(220, 226, 245, 0.7)',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '1rem', color: 'var(--ink)' }}>{proj.name}</strong>
                        <span
                          className={`admin-status-pill ${isPub ? 'status-published' : 'status-draft'}`}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            background: isPub ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: isPub ? '#047857' : '#475569'
                          }}
                        >
                          {isPub ? '● Published' : '○ Draft (Hidden)'}
                        </span>
                        {isFeat && (
                          <span
                            className="admin-featured-pill"
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '999px',
                              fontWeight: 700,
                              background: 'rgba(245, 158, 11, 0.15)',
                              color: '#b45309'
                            }}
                          >
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Category: {proj.category} • {proj.projectType || 'Personal Project'} {proj.version ? `• v${proj.version}` : ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className={`btn btn-sm ${isPub ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => {
                          const updated = projectService.togglePublish(proj.id);
                          setAdminProjects([...projectService.getAllProjects()]);
                          onToast?.(
                            updated.published
                              ? `Published "${proj.name}" to public site`
                              : `Unpublished "${proj.name}" (moved to draft)`
                          );
                        }}
                      >
                        {isPub ? 'Unpublish' : 'Publish to Site'}
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          const updated = projectService.toggleFeatured(proj.id);
                          setAdminProjects([...projectService.getAllProjects()]);
                          onToast?.(
                            updated.featured
                              ? `Featured "${proj.name}" on Home`
                              : `Removed "${proj.name}" from Home feature`
                          );
                        }}
                      >
                        {isFeat ? '★ Featured' : '☆ Feature on Home'}
                      </button>

                      <a
                        href={`/projects/${proj.id}`}
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(`/projects/${proj.id}`);
                          }
                        }}
                      >
                        Inspect Detail ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
