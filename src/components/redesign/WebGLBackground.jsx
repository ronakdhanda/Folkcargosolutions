// The persistent full-page WebGL canvas plus its overlay layers. initRedesign() (see
// src/lib/initRedesign.js) finds these elements by id/class and drives them — this component
// only renders the mount points, it does not touch Three.js directly.
export default function WebGLBackground() {
  return (
    <>
      <canvas id="webgl-bg" />
      <div className="noise" />
      <div className="vignette" />
      <svg className="crate-leader-svg" id="crateLeaderSvg" aria-hidden="true" />
      <div className="crate-labels" id="crateLabels" aria-hidden="true" />
    </>
  );
}
