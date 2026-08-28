// Content (image src, title, description, tag) is filled in imperatively by initRedesign()
// when a "Read More" button is clicked, exactly like the original prototype — this component
// just renders the empty shell with the ids that code looks up.
export default function ServiceModal() {
  return (
    <div className="modal-overlay" id="modalOverlay" aria-hidden="true">
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle" tabIndex="-1">
        <div className="modal-media">
          <button type="button" className="modal-close" id="modalClose" aria-label="Close">×</button>
          <img id="modalImg" src="" alt="" />
        </div>
        <div className="modal-body">
          <div className="card-tag" id="modalTag" />
          {/* eslint-disable-next-line jsx-a11y/heading-has-content -- filled in by initRedesign() when a service card is opened */}
          <h3 id="modalTitle" />
          <p id="modalDesc" />
          <div className="modal-actions">
            <a href="#contact" className="btn btn-primary" data-talk-expert="true">Talk to an Expert →</a>
            <button type="button" className="btn btn-ghost" id="modalCloseBtn">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
