import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { useDispatch } from 'react-redux';
import { setCurrentEpisode } from '../../features/player/playerSlice';
import './EpisodeReview.css';

const EpisodeReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const icons = {
    back: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
    clock: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mic: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    calendar: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    music: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    pause: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>,
    skipBack: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>,
    skipForward: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>,
    rewind10: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14l-4-4 4-4"/><path d="M5 10a8 8 0 1 1 4.7 7.1"/><text x="12" y="14" fontSize="8" fontWeight="bold" fill="currentColor">10</text></svg>,
    forward10: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14l4-4-4-4"/><path d="M19 10a8 8 0 1 0-4.7 7.1"/><text x="12" y="14" fontSize="8" fontWeight="bold" fill="currentColor">10</text></svg>,
    volume: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
    approve: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    reject: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>,
    play: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12" y1="8" y2="8"/></svg>,
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewData = await adminService.getEpisodeReviewData(id);
        setData(reviewData);
      } catch (error) {
        console.error("Error fetching review data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewData();
  }, [id]);

  const handlePreview = () => {
    if (!data) return;
    dispatch(setCurrentEpisode({
      id: id,
      title: data.title,
      host: data.host,
      audioUrl: data.audioUrl,
      imageUrl: data.imageUrl || 'https://via.placeholder.com/200'
    }));
  };

  const handleApprove = async () => {
    await adminService.updateEpisodeStatus(id, 'approved');
    setShowApproveModal(true);
  };

  const handleReject = async () => {
    await adminService.updateEpisodeStatus(id, 'rejected', rejectReason);
    setShowRejectModal(false);
    navigate('/admin/dashboard');
  };

  if (loading || !data) {
    return <div className="admin-loading">Loading episode for review...</div>;
  }

  return (
    <div className="episode-review">
      <div className="back-bar">
        <div className="back-link" onClick={() => navigate('/admin/dashboard')}>
          <i>{icons.back}</i> Back to approval queue
        </div>
        <div className="pending-badge">
          <i>{icons.clock}</i> Pending review
        </div>
      </div>

      <div className="review-content">
        <div className="review-main">
          <div className="ep-hero">
            <div className="ep-cover">
              <i>{icons.mic}</i>
            </div>
            <div className="ep-meta">
              <div className="ep-cat">{data.category}</div>
              <h1 className="ep-title">{data.title}</h1>
              <div className="ep-byline">
                <div className="ep-host-avatar">{data.host.substring(0, 2).toUpperCase()}</div>
                <div className="ep-host-name">{data.host}</div>
              </div>
              <div className="ep-stats">
                <div className="ep-stat"><i>{icons.clock}</i> {data.duration}</div>
                <div className="ep-stat"><i>{icons.calendar}</i> Submitted {data.submittedAt}</div>
                <div className="ep-stat"><i>{icons.music}</i> {data.fileInfo}</div>
              </div>
            </div>
          </div>

          <div className="player-card">
            <div className="admin-player-notice">
               <p>Preview this episode using the global player below.</p>
               <button className="btn-preview-main" onClick={handlePreview}>
                 <i>{icons.play}</i> Start Preview
               </button>
            </div>
          </div>

          <div className="action-row">
            <button className="btn-approve" onClick={handleApprove}>
              <i>{icons.approve}</i> Approve Episode
            </button>
            <button className="btn-reject" onClick={() => setShowRejectModal(true)}>
              <i>{icons.reject}</i> Reject Episode
            </button>
          </div>

          <div className="ep-desc-title">About this episode</div>
          <div className="ep-desc">{data.description}</div>
        </div>

        <div className="review-sidebar">
          <div className="host-card">
            <div className="host-ava">{data.host.substring(0, 2).toUpperCase()}</div>
            <div className="host-name">{data.host}</div>
            <div className="host-sub">{data.hostChannel}</div>
            <div className="host-stats">
              <div className="hstat">
                <div className="hstat-n">{data.hostStats.totalEpisodes}</div>
                <div className="hstat-l">Episodes</div>
              </div>
              <div className="hstat">
                <div className="hstat-n">{data.hostStats.totalPlays}</div>
                <div className="hstat-l">Total plays</div>
              </div>
              <div className="hstat">
                <div className="hstat-n">{data.hostStats.approved}</div>
                <div className="hstat-l">Approved</div>
              </div>
              <div className="hstat">
                <div className="hstat-n">{data.hostStats.rejected}</div>
                <div className="hstat-l">Rejected</div>
              </div>
            </div>
          </div>

          <div className="more-title">Other episodes by host</div>
          <div className="more-list">
            {data.otherEpisodes.length > 0 ? (
              data.otherEpisodes.map(ep => (
                <div key={ep.id} className="more-item">
                  <div className="more-art"><i>{icons.mic}</i></div>
                  <div className="more-info">
                    <div className="more-ep-title">{ep.title}</div>
                    <div className="more-ep-host">{ep.duration} · {ep.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-others">No previous uploads found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="reject-dialog">
            <div className="rd-title"><i>{icons.reject}</i> Reject episode</div>
            <p className="rd-sub">The host will be notified and can edit and resubmit.</p>
            
            <div className="rd-ep-chip">
              <div className="rd-ep-dot"></div>
              <div>
                <div className="rd-ep-name">{data.title}</div>
                <div className="rd-ep-host">by {data.host}</div>
              </div>
            </div>

            <div className="rd-label">
              Reason for rejection <span className="rd-optional">(optional)</span>
            </div>
            <textarea 
              className="rd-textarea" 
              placeholder="e.g. Audio quality is too low, excessive background noise..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="rd-hint">
              <i>{icons.info}</i> If left blank, the host will be notified without a specific reason.
            </div>

            <div className="rd-actions">
              <button className="rd-cancel" onClick={() => setShowRejectModal(false)}>Cancel</button>
              <button className="rd-confirm" onClick={handleReject}>
                <i>{icons.reject}</i> Confirm rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="reject-dialog success-dialog">
            <div className="success-icon-wrap">
              <i>{icons.approve}</i>
            </div>
            <div className="rd-title center">Episode approved</div>
            <p className="rd-sub center">
              {data.title} is now live and visible to listeners. {data.host} has been notified.
            </p>
            <button className="rd-confirm center-btn" onClick={() => navigate('/admin/dashboard')}>
              Back to queue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeReview;
