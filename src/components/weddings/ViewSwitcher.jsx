const icon = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 };

const VIEWS = [
  {
    id: "carousel",
    label: "Deslizar",
    svg: (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...icon}>
        <rect x="5" y="4" width="10" height="12" />
        <path d="M2 7v6M18 7v6" />
      </svg>
    ),
  },
  {
    id: "detail",
    label: "Detalle",
    svg: (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...icon}>
        <rect x="2" y="3" width="7" height="14" />
        <path d="M12 5h6M12 10h6M12 15h4" />
      </svg>
    ),
  },
  {
    id: "grid",
    label: "Cuadrícula",
    svg: (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...icon}>
        <rect x="2" y="3" width="4" height="5" />
        <rect x="8" y="3" width="4" height="5" />
        <rect x="14" y="3" width="4" height="5" />
        <rect x="2" y="11" width="4" height="5" />
        <rect x="8" y="11" width="4" height="5" />
        <rect x="14" y="11" width="4" height="5" />
      </svg>
    ),
  },
];



export default function ViewSwitcher({ view, onView }) {
  return (
    <div className="views-bar">
      <div className="views" role="group" aria-label="Tipo de vista">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => onView(v.id)}
          >
            {v.svg}
            <span>{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}