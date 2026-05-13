import React, { useState, useRef } from 'react';
import { hostService } from '../../services/hostService';
import './UploadEpisode.css';

const UploadEpisode = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Business & entrepreneurship',
    duration: '-- min',
  });

  const [audioFile, setAudioFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, completed
  const [fileMetadata, setFileMetadata] = useState(null);
  
  const audioInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const icons = {
    mic: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    musicUp: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M12 13V7"/><path d="M9 10l3-3 3 3"/></svg>,
    photoUp: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><path d="M12 13V7"/><path d="M9 10l3-3 3 3"/></svg>,
    send: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    arrowRight: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    file: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
    cloudCheck: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a3.5 3.5 0 1 1-.5-7c0-3-3-6-7-6-3.1 0-5.7 2-6.6 4.7A4 4 0 0 0 5 18h12.5"/><polyline points="9 13 11 15 15 11"/></svg>,
    info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12" y1="8" y2="8"/></svg>,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAudioFile(file);
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      const result = await hostService.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      setFileMetadata(result);
      setUploadStatus('completed');
      setFormData(prev => ({ ...prev, duration: `${result.duration} (auto-detected)` }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed: " + (error.response?.data?.message || error.message));
      setUploadStatus('idle');
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadStatus !== 'completed') {
      alert('Please upload an audio file first');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('description', formData.description);
    submissionData.append('category', formData.category);
    submissionData.append('audio_s3_key', fileMetadata.audio_s3_key);

    const result = await hostService.submitEpisode(submissionData);
    if (result.success) {
      alert(result.message);
      // Reset form
      setUploadStatus('idle');
      setAudioFile(null);
      setFileMetadata(null);
      setFormData({
        title: '',
        description: '',
        category: 'Business & entrepreneurship',
        duration: '-- min'
      });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="upload-page">
      <h1 className="page-title">Upload episode</h1>
      <p className="page-sub">Your file uploads directly to our CDN — no external links needed</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        {/* Left Column */}
        <div>
          <div className="field">
            <label>Episode title <span className="req">*</span></label>
            <input 
              type="text" 
              name="title"
              placeholder="Enter episode title"
              value={formData.title} 
              onChange={handleInputChange}
            />
          </div>

          <div className="field">
            <label>Description <span className="req">*</span></label>
            <textarea 
              name="description"
              placeholder="Describe what this episode is about"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="two-field">
            <div className="field">
              <label>Category <span className="req">*</span></label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Business & entrepreneurship</option>
                <option>Music shows & DJ mixes</option>
                <option>True crime & mystery</option>
                <option>Comedy & entertainment</option>
                <option>News & current affairs</option>
                <option>Health & wellness</option>
              </select>
              <div className="cat-pill">{formData.category}</div>
            </div>
            <div className="field">
              <label>Episode duration</label>
              <input 
                type="text" 
                value={formData.duration} 
                style={{ color: '#71360077' }} 
                readOnly 
              />
            </div>
          </div>

          <div className="field">
            <label>Audio file <span className="req">*</span></label>
            <div className="upload-zone" onClick={() => audioInputRef.current.click()}>
              <i>{icons.musicUp}</i>
              <div className="upload-zone-title">Drag & drop your audio file here</div>
              <div className="upload-zone-sub">MP3 or WAV · Max 200 MB · Uploads directly to CDN</div>
              <input 
                type="file" 
                ref={audioInputRef} 
                style={{ display: 'none' }} 
                accept="audio/*"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          <div className="field" style={{ marginBottom: '16px' }}>
            <label>Cover art</label>
            <div className="cover-zone" onClick={() => coverInputRef.current.click()}>
              <i>{icons.photoUp}</i>
              <div className="cover-zone-title">Upload cover image</div>
              <div className="cover-zone-sub">PNG or JPG · Square · Max 2 MB</div>
              <input 
                type="file" 
                ref={coverInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="flow-mini">
            <div className={`flow-step ${uploadStatus !== 'idle' ? 'active' : ''}`}><span>①</span>Pick file</div>
            <div className="flow-arr"><i>{icons.arrowRight}</i></div>
            <div className={`flow-step ${uploadStatus === 'uploading' || uploadStatus === 'completed' ? 'active' : ''}`}><span>②</span>CDN upload</div>
            <div className="flow-arr"><i>{icons.arrowRight}</i></div>
            <div className={`flow-step ${uploadStatus === 'completed' ? 'active' : ''}`}><span>③</span>URL saved</div>
            <div className="flow-arr"><i>{icons.arrowRight}</i></div>
            <div className="flow-step"><span>④</span>Pending</div>
          </div>

          <div className="audio-file-card">
            <div className="afc-label">Audio file</div>
            <div className="afc-file">
              <div className="afc-icon"><i>{icons.mic}</i></div>
              <div>
                <div className="afc-name">{audioFile ? audioFile.name : 'No file selected'}</div>
                <div className="afc-size">{fileMetadata ? fileMetadata.size : '0.0 MB'}</div>
              </div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            {uploadStatus === 'completed' && (
              <div className="afc-done">
                <i>{icons.check}</i> Uploaded to CDN — URL saved automatically
              </div>
            )}
            <div className="afc-meta">
              <div className="afc-meta-item"><i>{icons.clock}</i> {fileMetadata ? fileMetadata.duration : '-- min'}</div>
              <div className="afc-meta-item"><i>{icons.file}</i> {fileMetadata ? fileMetadata.format : '---'}</div>
              <div className="afc-meta-item"><i>{icons.cloudCheck}</i> Amazon S3</div>
            </div>
          </div>
        </div>
      </form>

      <div className="form-actions">
        <button type="submit" className="btn-primary" onClick={handleSubmit}>
          <i>{icons.send}</i> Submit for review
        </button>
        <button type="button" className="btn-ghost">Save draft</button>
      </div>

      <div className="info-card">
        <div className="info-title"><i>{icons.info}</i> How uploading works</div>
        <div className="info-item"><span className="info-dot">·</span> Your MP3 goes directly from your device to our CDN — no pasting links</div>
        <div className="info-item"><span className="info-dot">·</span> We store a permanent CDN URL in our database on your behalf</div>
        <div className="info-item"><span className="info-dot">·</span> Episode is set to Pending — admin reviews before it goes live</div>
        <div className="info-item"><span className="info-dot">·</span> Rejected episodes can be edited and resubmitted</div>
        <div className="info-item"><span className="info-dot">·</span> Approval typically takes 24–48 hours</div>
      </div>
    </div>
  );
};

export default UploadEpisode;
