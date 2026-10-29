import React from 'react';

/**
 * Full-bleed background video that hides the small corner mark in the source files.
 * The mark sits in the bottom ~20% of the picture, so the video is shown inside a
 * frame that is a little wider than 16:9 (the bottom is clipped), and the frame is
 * then scaled to cover the area like object-fit: cover. No zoom, so as much of the
 * picture as possible stays visible on every screen size.
 */
const FRAME_RATIO = 2.3; // 16:9 is 1.78; 2.3 clips the bottom ~23% of the video

interface CroppedVideoProps {
  src: string;
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
  videoRef?: React.Ref<HTMLVideoElement>;
}

export const CroppedVideo: React.FC<CroppedVideoProps> = ({ src, poster, preload = 'metadata', videoRef }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ containerType: 'size' }} aria-hidden="true">
    <div
      className="absolute overflow-hidden"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `max(100cqw, calc(100cqh * ${FRAME_RATIO}))`,
        aspectRatio: String(FRAME_RATIO),
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        className="no-zoom"
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 'auto', aspectRatio: '16 / 9', display: 'block' }}
      />
    </div>
  </div>
);