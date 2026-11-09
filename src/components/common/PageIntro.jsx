
export function PageIntro({ eyebrow, title, description }) {
  return (
    <header className="page-intro container reveal active">
      <span className="section-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
