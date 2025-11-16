export default function LandingPage() {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "#5a4636",
      }}
    >
      <h1>Nouk</h1>
      <p>A quiet little house for short-lived threads.</p>

      <a
        href="/home"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "1rem 2rem",
          background: "#f0e5d8",
          borderRadius: "12px",
          textDecoration: "none",
          color: "#5a4636",
          fontWeight: "bold",
        }}
      >
        Enter the House
      </a>
    </div>
  );
}
