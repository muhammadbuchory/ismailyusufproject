import { useState } from 'react';
import { Expand, Play } from 'lucide-react';
import { Dialog } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
export default function NewsMedia() {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(false);
  return (
    <section className="news-media" aria-label="Demonstration media gallery">
      <div>
        <img
          src="/images/campus.jpg"
          alt="Illustrative library interior"
          width="700"
          height="380"
          loading="lazy"
        />
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Expand size={15} />
          View gallery image
        </Button>
      </div>
      <div className="video-preview">
        <Play size={30} />
        <h3>Ideas in conversation</h3>
        <p>A demonstration academic talk video card.</p>
        <Button variant="outline" onClick={() => setVideo(true)}>
          Open video preview
        </Button>
        <small>Illustrative media ? no recorded lecture attached</small>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Academic life: demonstration gallery"
        description="Illustrative stock media; not a verified photograph of the portfolio owner's institution."
      >
        <img
          src="/images/campus.jpg"
          alt="Illustrative library with bookshelves and reading spaces"
        />
        <p className="small muted">
          Local demonstration image. Source information is recorded in
          docs/media-credits.md.
        </p>
      </Dialog>
      <Dialog
        open={video}
        onOpenChange={setVideo}
        title="Demonstration video preview"
        description="This presentation card is ready for a future authorized academic video."
      >
        <div className="video-placeholder">
          <Play size={40} />
          <p>No recording is attached in this demonstration.</p>
        </div>
        <p className="small muted">
          A future media provider can supply a local or approved hosted lecture.
          No external video is loaded.
        </p>
      </Dialog>
    </section>
  );
}
