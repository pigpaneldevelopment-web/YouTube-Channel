import { useState, useRef, useCallback, useEffect } from "react";

const STORAGE_KEY = "wedding-seating-v4";

const INIT_TABLES = [
  { id: 0, x: 50, y: 95, shape: "circle", seats: 10, r: 5.5, label: "Table 1" },
  { id: 1, x: 50, y: 72, shape: "circle", seats: 10, r: 5.5, label: "Table 2" },
  { id: 2, x: 50, y: 49, shape: "circle", seats: 10, r: 5.5, label: "Table 3" },
  { id: 3, x: 50, y: 26, shape: "circle", seats: 10, r: 5.5, label: "Table 4" },
  { id: 4, x: 75, y: 26, shape: "circle", seats: 10, r: 5.5, label: "Table 5" },
  { id: 5, x: 75, y: 49, shape: "circle", seats: 10, r: 5.5, label: "Table 6" },
  { id: 6, x: 75, y: 72, shape: "circle", seats: 10, r: 5.5, label: "Table 7" },
  { id: 7, x: 75, y: 95, shape: "circle", seats: 10, r: 5.5, label: "Table 8" },
  { id: 8, x: 100, y: 95, shape: "circle", seats: 10, r: 5.5, label: "Table 9" },
  { id: 9, x: 100, y: 72, shape: "circle", seats: 10, r: 5.5, label: "Table 10" },
  { id: 10, x: 100, y: 49, shape: "circle", seats: 10, r: 5.5, label: "Table 11" },
  { id: 11, x: 100, y: 26, shape: "circle", seats: 10, r: 5.5, label: "Table 12" },
  { id: 12, x: 125, y: 49, shape: "circle", seats: 10, r: 5.5, label: "Table 13" },
  { id: 13, x: 125, y: 72, shape: "circle", seats: 10, r: 5.5, label: "Table 14" },
  { id: 14, x: 125, y: 95, shape: "circle", seats: 10, r: 5.5, label: "Table 15" },
  { id: 15, x: 20, y: 62, shape: "headtable", seats: 30, w: 7, h: 95, label: "Head Table" },
];

const INIT_ELEMENTS = [
  { id: "e0", type: "cake", x: 16, y: 12, w: 12, h: 7 },
  { id: "e1", type: "dancefloor", x: 162, y: 50, w: 36, h: 52 },
];

const TABLE_COLORS = [
  "#C46A5E","#D4956A","#C4A96A","#7EA87E",
  "#5E8FA8","#6A7EB8","#9A6AAE","#B87A8E","#A8785E",
  "#8EA85E","#5EA8A8","#A85E8E","#C46A7E","#6A8EC4","#C4B46A",
  "#d4b483",
];

const ELEMENT_TYPES = {
  bar:       { label: "Bar",            icon: "🍸", color: "#d4b483" },
  beerwine:  { label: "Beer & Wine",    icon: "🍷", color: "#d4b483" },
  cocktail:  { label: "Cocktail Table", icon: "◎",  color: "#d4b483" },
  dancefloor:{ label: "Dance Floor",    icon: "♪",  color: "#7EA87E" },
  cake:      { label: "Cake Table",     icon: "🎂", color: "#B87A8E" },
  dessert:   { label: "Dessert",        icon: "🍰", color: "#d4b483" },
  guestbook: { label: "Guest Book",     icon: "📖", color: "#d4b483" },
  rem:       { label: "Remembrance",    icon: "♥",  color: "#C46A5E" },
  photobooth:{ label: "Photo Booth",    icon: "📷", color: "#5E8FA8" },
  divider:   { label: "Room Divider",   icon: "—",  color: "#555"    },
};

const SEAT_OFF = -Math.PI / 2;
function circleSeats(cx, cy, r, n) {
  return Array.from({ length: n }, (_, i) => {
    const a = SEAT_OFF + (2 * Math.PI * i) / n;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
}
function headTableSeats(cx, cy, w, h, n) {
  const side1 = Math.floor(n / 2); // left side
  const side2 = Math.ceil(n / 2);  // right side gets extra if odd
  const seats = [];
  for (let i = 0; i < side1; i++) {
    const sy = cy - h / 2 + (h / (side1 + 1)) * (i + 1);
    seats.push({ x: cx - w / 2 - 2.2, y: sy, side: "left" });
  }
  for (let i = 0; i < side2; i++) {
    const sy = cy - h / 2 + (h / (side2 + 1)) * (i + 1);
    seats.push({ x: cx + w / 2 + 2.2, y: sy, side: "right" });
  }
  return seats;
}
function rectSeats(cx, cy, w, h, n) {
  const seats = [];
  const half = Math.ceil(n / 2);
  for (let i = 0; i < half; i++) seats.push({ x: cx - w/2 + (w/(half+1))*(i+1), y: cy - h/2 - 2 });
  const bot = n - half;
  for (let i = 0; i < bot;  i++) seats.push({ x: cx - w/2 + (w/(bot+1))*(i+1),  y: cy + h/2 + 2 });
  return seats;
}

// ── Element renderers ──
function RenderBar({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="0.8" fill="rgba(20,28,50,0.85)" stroke="#d4b483" strokeWidth="0.35" strokeOpacity="0.5"/>
    <text x={cx} y={cy+0.5} textAnchor="middle" fill="#d4b483" fontSize="1.6" fontFamily="'Playfair Display',serif" fontWeight="700">BAR</text>
  </g>);
}
function RenderBeerWine({ el }) {
  const { x: cx, y: cy, w, h } = el;
  const nT = 3, tH = (h-4)/nT;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="1" fill="rgba(20,28,50,0.4)" stroke="rgba(212,180,131,0.2)" strokeWidth="0.2"/>
    {Array.from({length:nT},(_,i)=>{
      const ty = cy-h/2+2+i*(tH+0.5);
      return (<g key={i}>
        <rect x={cx-w/2+1} y={ty} width={w-4} height={tH-0.5} rx="0.6" fill="rgba(20,28,50,0.85)" stroke="#d4b483" strokeWidth="0.25" strokeOpacity="0.4"/>
        <rect x={cx+w/2-2} y={ty+0.5} width="3" height={tH-1.5} rx="0.3" fill="rgba(212,180,131,0.06)"/>
      </g>);
    })}
    <text x={cx-w/2-1} y={cy} textAnchor="middle" fill="#d4b483" fontSize="1.6" fontFamily="'Playfair Display',serif" fontWeight="700" transform={`rotate(-90,${cx-w/2-1},${cy})`}>BEER &amp; WINE</text>
  </g>);
}
function RenderCocktail({ el }) {
  const { x: cx, y: cy } = el;
  return (<g>
    <circle cx={cx} cy={cy} r={2.2} fill="rgba(20,28,50,0.85)" stroke="#d4b483" strokeWidth="0.25" strokeOpacity="0.4"/>
    <circle cx={cx} cy={cy} r={0.6} fill="rgba(212,180,131,0.15)"/>
  </g>);
}
function RenderDanceFloor({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="1" fill="rgba(30,40,70,0.4)" stroke="rgba(212,180,131,0.15)" strokeWidth="0.3" strokeDasharray="1,1"/>
    <text x={cx} y={cy-2} textAnchor="middle" fill="rgba(212,180,131,0.5)" fontSize="2.2" fontFamily="'Playfair Display',serif" fontWeight="700">DANCE</text>
    <text x={cx} y={cy+1.5} textAnchor="middle" fill="rgba(212,180,131,0.5)" fontSize="2.2" fontFamily="'Playfair Display',serif" fontWeight="700">AREA</text>
  </g>);
}
function RenderCake({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="0.8" fill="rgba(20,28,50,0.85)" stroke="#B87A8E" strokeWidth="0.3" strokeOpacity="0.6"/>
    <text x={cx} y={cy+0.5} textAnchor="middle" fill="#B87A8E" fontSize="1.4" fontFamily="'Playfair Display',serif" fontWeight="700">CAKE</text>
  </g>);
}
function RenderDessert({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="0.8" fill="rgba(20,28,50,0.85)" stroke="#d4b483" strokeWidth="0.3" strokeOpacity="0.5"/>
    <text x={cx} y={cy+0.5} textAnchor="middle" fill="#d4b483" fontSize="1.5" fontFamily="'Playfair Display',serif" fontWeight="700">DESSERT</text>
  </g>);
}
function RenderGuestBook({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="0.8" fill="rgba(20,28,50,0.85)" stroke="rgba(212,180,131,0.35)" strokeWidth="0.25"/>
    <text x={cx} y={cy+0.4} textAnchor="middle" fill="#d4b483" fontSize="1.3" fontFamily="'Playfair Display',serif" fontWeight="700">GUEST BOOK</text>
  </g>);
}
function RenderRem({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="0.8" fill="rgba(20,28,50,0.85)" stroke="rgba(196,106,94,0.4)" strokeWidth="0.25"/>
    <text x={cx} y={cy+0.4} textAnchor="middle" fill="#C46A5E" fontSize="1.3" fontFamily="'Playfair Display',serif" fontWeight="700">REM.</text>
  </g>);
}
function RenderPhotoBooth({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return (<g>
    <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx="1" fill="rgba(20,28,50,0.85)" stroke="#5E8FA8" strokeWidth="0.3" strokeOpacity="0.6"/>
    <text x={cx} y={cy+0.5} textAnchor="middle" fill="#5E8FA8" fontSize="2" fontFamily="'Playfair Display',serif" fontWeight="700">PHOTO BOOTH</text>
  </g>);
}
function RenderDivider({ el }) {
  const { x: cx, y: cy, w, h } = el;
  return <rect x={cx-w/2} y={cy-h/2} width={w} height={h} fill="rgba(150,140,120,0.15)"/>;
}

const RENDERERS = { bar:RenderBar, beerwine:RenderBeerWine, cocktail:RenderCocktail, dancefloor:RenderDanceFloor, cake:RenderCake, dessert:RenderDessert, guestbook:RenderGuestBook, rem:RenderRem, photobooth:RenderPhotoBooth, divider:RenderDivider };

// ── Shared styles ──
const modalBase = { position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:"flex",flexDirection:"column",gap:10,background:"rgba(15,22,42,0.97)",borderRadius:12,padding:"20px 24px",boxShadow:"0 12px 48px rgba(0,0,0,0.6)",zIndex:100,minWidth:240 };
const lbl = { fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,0.5)",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:4 };
const smallLbl = { ...lbl, fontSize:10 };
const primaryBtn = (c="#7EA87E") => ({ flex:1,background:`${c}22`,border:`1px solid ${c}66`,color:c,fontFamily:"'Lato',sans-serif",fontSize:13,fontWeight:600,padding:"8px 0",borderRadius:6,cursor:"pointer" });
const cancelBtn = { flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(232,224,212,0.5)",fontFamily:"'Lato',sans-serif",fontSize:13,padding:"8px 0",borderRadius:6,cursor:"pointer" };
const selBtn = (on) => ({ flex:1,background:on?"rgba(126,168,126,0.2)":"rgba(255,255,255,0.05)",border:`1px solid ${on?"rgba(126,168,126,0.5)":"rgba(255,255,255,0.1)"}`,color:on?"#7EA87E":"rgba(232,224,212,0.5)",fontFamily:"'Lato',sans-serif",fontSize:12,padding:"6px 0",borderRadius:6,cursor:"pointer" });
const numIn = { background:"rgba(22,33,62,0.95)",border:"1px solid rgba(212,180,131,0.3)",borderRadius:6,color:"#e8e0d4",fontFamily:"'Lato',sans-serif",fontSize:13,padding:"6px 10px",outline:"none",width:"100%" };

// ── Persistence helpers ──
async function saveAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch { return false; }
}
async function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function SeatingChart() {
  const [tables,    setTables]    = useState(INIT_TABLES);
  const [tPos,      setTPos]      = useState(() => INIT_TABLES.map(t => ({ x:t.x, y:t.y })));
  const [guests,    setGuests]    = useState(() => { const g={}; INIT_TABLES.forEach((t,i)=>{ for(let s=0;s<t.seats;s++) g[`${i}-${s}`]=""; }); return g; });
  const [tNames,    setTNames]    = useState(() => { const n={}; INIT_TABLES.forEach((t,i)=>n[i]=t.label||`Table ${i+1}`); return n; });
  const [elems,     setElems]     = useState(INIT_ELEMENTS);
  const [ePos,      setEPos]      = useState(() => INIT_ELEMENTS.map(e => ({ x:e.x, y:e.y })));
  const [roomW,     setRoomW]     = useState(200);
  const [roomH,     setRoomH]     = useState(125);
  const [roomOX,    setRoomOX]    = useState(0);
  const [roomOY,    setRoomOY]    = useState(0);
  const [title,     setTitle]     = useState("Alexa & Sam — July 3, 2026");
  const [editing,   setEditing]   = useState(null);
  const [inputVal,  setInputVal]  = useState("");
  const [editTbl,   setEditTbl]   = useState(null);
  const [tblInputVal,setTblInputVal] = useState("");
  const [hovered,   setHovered]   = useState(null);
  const [hoveredElem,setHoveredElem] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [modal,     setModal]     = useState(null);
  const [unit,      setUnit]      = useState("ft");
  const [legendFilter,setLegendFilter] = useState("all");
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saving" | "saved" | "error"
  const [loaded,    setLoaded]    = useState(false);
  const [pool,       setPool]       = useState([]);
  const [poolSelected, setPoolSelected] = useState(null);
  const [importText, setImportText] = useState("");

  // Add table form
  const [ntS, setNtS] = useState("circle");
  const [ntN, setNtN] = useState(10);
  const [ntNm,setNtNm] = useState("");
  const [ntW, setNtW] = useState(12);
  const [ntH, setNtH] = useState(6);
  const [ntR, setNtR] = useState(5.5);
  // Add element form
  const [neT, setNeT] = useState("bar");
  const [neW, setNeW] = useState(10);
  const [neH, setNeH] = useState(6);

  const inRef  = useRef(null);
  const svgRef = useRef(null);
  const dragRef= useRef(null);
  const saveTimer = useRef(null);

  // ── Load on mount ──
  useEffect(() => {
    loadAll().then(data => {
      if (data) {
        // Patch seat counts from INIT_TABLES so changes (e.g. 29->30) always win
        const loadedTables = (data.tables || INIT_TABLES).map((t, i) => ({
          ...t,
          seats: INIT_TABLES[i] !== undefined ? INIT_TABLES[i].seats : t.seats,
        }));
        setTables(loadedTables);
        if (data.tPos)    setTPos(data.tPos);
        if (data.tNames)  setTNames(data.tNames);
        if (data.elems)   setElems(data.elems);
        if (data.ePos)    setEPos(data.ePos);
        if (data.roomW)   setRoomW(data.roomW);
        if (data.roomH)   setRoomH(data.roomH);
        if (data.roomOX !== undefined) setRoomOX(data.roomOX);
        if (data.roomOY !== undefined) setRoomOY(data.roomOY);
        if (data.title)   setTitle(data.title);
        // Merge saved guests, filling any new seat slots with empty string
        const merged = { ...(data.guests || {}) };
        loadedTables.forEach((t, i) => {
          for (let s = 0; s < t.seats; s++) {
            const k = `${i}-${s}`;
            if (!(k in merged)) merged[k] = "";
          }
        });
        setGuests(merged);
        if (Array.isArray(data.pool)) setPool(data.pool);
      }
      setLoaded(true);
    });
  }, []);

  // ── Auto-save whenever state changes (debounced 800ms) ──
  const stateRef = useRef({});
  stateRef.current = { tables, tPos, guests, tNames, elems, ePos, roomW, roomH, roomOX, roomOY, title, pool };

  useEffect(() => {
    if (!loaded) return;
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const ok = await saveAll(stateRef.current);
      setSaveStatus(ok ? "saved" : "error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [tables, tPos, guests, tNames, elems, ePos, roomW, roomH, roomOX, roomOY, title, pool, loaded]);

  // ── SVG drag ──
  const svgPt = useCallback((e) => {
    const svg = svgRef.current; if (!svg) return {x:0,y:0};
    const p = svg.createSVGPoint(); p.x=e.clientX; p.y=e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }, []);

  const drag = useCallback((e, i, arr, setArr) => {
    e.preventDefault();
    const pt=svgPt(e), pos=arr[i];
    dragRef.current = { i, ox:pt.x-pos.x, oy:pt.y-pos.y, sx:e.clientX, sy:e.clientY, dd:false, setArr };
    const mv = (me) => {
      if (!dragRef.current) return;
      if (!dragRef.current.dd && Math.abs(me.clientX-dragRef.current.sx)+Math.abs(me.clientY-dragRef.current.sy)>3) dragRef.current.dd=true;
      if (dragRef.current.dd) {
        const mp=svgPt(me);
        dragRef.current.setArr(p=>{ const n=[...p]; n[dragRef.current.i]={x:mp.x-dragRef.current.ox, y:mp.y-dragRef.current.oy}; return n; });
      }
    };
    const up = () => { setTimeout(()=>{ if(dragRef.current) dragRef.current.dd=false; },50); window.removeEventListener("mousemove",mv); window.removeEventListener("mouseup",up); };
    window.addEventListener("mousemove",mv); window.addEventListener("mouseup",up);
  }, [svgPt]);

  // ── Add table / element ──
  const addTable = () => {
    const i=tables.length, cx=roomOX+roomW/2, cy=roomH/2;
    const t = ntS==="circle"
      ? { id:i, x:cx, y:cy, shape:"circle",   seats:ntN, r:ntR,  label:ntNm.trim()||`Table ${i+1}` }
      : { id:i, x:cx, y:cy, shape:"rect",     seats:ntN, w:ntW, h:ntH, label:ntNm.trim()||`Table ${i+1}` };
    setTables(p=>[...p,t]); setTPos(p=>[...p,{x:cx,y:cy}]);
    setTNames(p=>({...p,[i]:ntNm.trim()||`Table ${i+1}`}));
    const ng={}; for(let s=0;s<ntN;s++) ng[`${i}-${s}`]="";
    setGuests(p=>({...p,...ng}));
    setNtNm(""); setNtN(10); setNtS("circle"); setNtW(12); setNtH(6); setNtR(5.5); setModal(null);
  };

  const addElem = () => {
    const cx=roomOX+roomW/2, cy=roomH/2;
    setElems(p=>[...p,{id:`e${Date.now()}`,type:neT,x:cx,y:cy,w:neW,h:neH}]);
    setEPos(p=>[...p,{x:cx,y:cy}]);
    setNeT("bar"); setNeW(10); setNeH(6); setModal(null);
  };

  const deleteElem = (idx) => {
    setElems(p=>p.filter((_,i)=>i!==idx));
    setEPos(p=>p.filter((_,i)=>i!==idx));
  };

  const resetAll = () => {
    if (!window.confirm("Reset everything to the original layout? This cannot be undone.")) return;
    const freshGuests={};
    INIT_TABLES.forEach((t,i)=>{ for(let s=0;s<t.seats;s++) freshGuests[`${i}-${s}`]=""; });
    setTables(INIT_TABLES);
    setTPos(INIT_TABLES.map(t=>({x:t.x,y:t.y})));
    setGuests(freshGuests);
    setTNames(()=>{ const n={}; INIT_TABLES.forEach((t,i)=>n[i]=t.label||`Table ${i+1}`); return n; });
    setElems(INIT_ELEMENTS);
    setEPos(INIT_ELEMENTS.map(e=>({x:e.x,y:e.y})));
    setRoomW(200); setRoomH(125); setRoomOX(0); setRoomOY(0);
    setTitle("Alexa & Sam — July 3, 2026");
  };

  const uLabel = unit==="ft"?"ft":"in";
  const startEdit = (k,v) => { if(dragRef.current?.dd) return; setEditing(k); setInputVal(v); setTimeout(()=>inRef.current?.focus(),30); };
  const commitEdit = () => { if(editing){ setGuests(p=>({...p,[editing]:inputVal.trim()})); setEditing(null); setInputVal(""); } };

  // Seat click: if a pool guest is selected and the seat is open, place them there.
  // Otherwise falls through to the normal manual-edit flow.
  const assignSeat = (k, existingName) => {
    if (dragRef.current?.dd) return;
    if (poolSelected && !existingName) {
      setGuests(p => ({ ...p, [k]: poolSelected }));
      setPool(p => p.filter(g => g !== poolSelected));
      setPoolSelected(null);
      return;
    }
    startEdit(k, existingName);
  };

  const importGuests = () => {
    const names = importText.split("\n").map(s => s.trim()).filter(Boolean);
    if (names.length > 0) {
      setPool(p => {
        const existing = new Set(p);
        const merged = [...p];
        names.forEach(n => { if (!existing.has(n)) { merged.push(n); existing.add(n); } });
        return merged;
      });
    }
    setImportText("");
    setModal(null);
  };

  const total  = tables.reduce((s,t)=>s+t.seats,0);
  const filled = Object.values(guests).filter(Boolean).length;

  const saveIndicator = {
    idle:    { text:"",         color:"transparent"          },
    saving:  { text:"Saving…",  color:"rgba(212,180,131,0.5)"},
    saved:   { text:"✓ Saved",  color:"#7EA87E"              },
    error:   { text:"⚠ Save failed", color:"#C46A5E"        },
  }[saveStatus];

  function renderHeadTableSeats(tbl, p, ti, c) {
    const seats = headTableSeats(p.x, p.y, tbl.w, tbl.h, tbl.seats);
    return seats.map((s,si) => {
      const k=`${ti}-${si}`, nm=guests[k]||"", hov=hovered===k, fl=!!nm;
      return (<g key={si}>
        <circle cx={s.x} cy={s.y} r={1.3}
          fill={fl?c:"rgba(20,28,50,0.7)"} fillOpacity={fl?.85:1}
          stroke={c} strokeWidth={hov?".3":".18"} strokeOpacity={fl?.9:.4}
          style={{cursor:"pointer",transformOrigin:`${s.x}px ${s.y}px`,transition:"all .15s"}}
          onMouseEnter={()=>setHovered(k)} onMouseLeave={()=>setHovered(null)}
          onClick={()=>assignSeat(k,nm)}/>
        <text x={s.x} y={s.y+0.4} textAnchor="middle"
          fill={fl?"#fff":"rgba(232,224,212,.22)"}
          fontSize={fl?"0.85":"0.8"} style={{pointerEvents:"none",fontFamily:"'Lato',sans-serif"}}>
          {fl?(nm.length>7?nm.slice(0,6)+"…":nm):si+1}
        </text>
      </g>);
    });
  }

  if (!loaded) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p style={{fontFamily:"'Lato',sans-serif",color:"rgba(212,180,131,0.6)",fontSize:14,letterSpacing:2}}>Loading your seating chart…</p>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)",fontFamily:"'Georgia',serif",color:"#e8e0d4",padding:"24px",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400&display=swap');
        *{box-sizing:border-box}
        .seat-circle{transition:all .15s;cursor:pointer}
        .seat-circle:hover{filter:brightness(1.3);transform:scale(1.12)}
        .table-label{font-family:'Playfair Display',Georgia,serif;font-weight:700;pointer-events:none}
        .guest-label{font-family:'Lato',sans-serif;font-weight:300;pointer-events:none}
        .title-input{background:transparent;border:none;border-bottom:2px solid rgba(212,180,131,.5);color:#d4b483;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;text-align:center;outline:none;width:480px;letter-spacing:2px}
        .name-input{background:rgba(22,33,62,.95);border:2px solid #d4b483;border-radius:8px;color:#e8e0d4;font-family:'Lato',sans-serif;font-size:14px;padding:8px 14px;outline:none;width:200px;z-index:100;box-shadow:0 8px 32px rgba(0,0,0,.5)}
        .pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:6px 16px;font-family:'Lato',sans-serif;font-size:13px;color:rgba(232,224,212,.7)}
        .abtn{font-family:'Lato',sans-serif;font-size:12px;padding:5px 14px;border-radius:16px;cursor:pointer;transition:all .2s}
        .room-label{font-family:'Playfair Display',Georgia,serif;font-weight:400;opacity:0.18;pointer-events:none;letter-spacing:3}
      `}</style>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:4}}>
          <div style={{width:80,height:1,background:"linear-gradient(90deg,transparent,#d4b483)"}}/>
          {editTitle
            ? <input className="title-input" value={title} onChange={e=>setTitle(e.target.value)} onBlur={()=>setEditTitle(false)} onKeyDown={e=>e.key==="Enter"&&setEditTitle(false)} autoFocus/>
            : <h1 onClick={()=>setEditTitle(true)} style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:"#d4b483",margin:0,letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>{title}</h1>
          }
          <div style={{width:80,height:1,background:"linear-gradient(270deg,transparent,#d4b483)"}}/>
        </div>
        <p style={{fontFamily:"'Lato',sans-serif",fontSize:12,color:"rgba(232,224,212,.4)",margin:"2px 0 4px",letterSpacing:2}}>CAMBRIDGE ROOM · WEDDING RECEPTION</p>

        {/* Save status */}
        <div style={{height:18,marginBottom:4,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:saveIndicator.color,letterSpacing:1,transition:"color .3s"}}>{saveIndicator.text}</span>
        </div>

        <p style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:"rgba(232,224,212,.4)",margin:"0 0 12px",letterSpacing:1}}>Click a seat to assign · Click a table name to rename · Drag to rearrange</p>

        <div style={{display:"flex",gap:8,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
          <span className="pill"><span style={{width:8,height:8,borderRadius:"50%",background:"#7EA87E"}}/>{filled} assigned</span>
          <span className="pill"><span style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,255,255,.2)"}}/>{total-filled} open</span>
          <span className="pill">🪑 {total} total seats</span>
          {filled>0 && <button className="abtn" style={{background:"rgba(196,106,94,.15)",border:"1px solid rgba(196,106,94,.3)",color:"#C46A5E"}} onClick={()=>{ const g={}; tables.forEach((t,i)=>{ for(let s=0;s<t.seats;s++) g[`${i}-${s}`]=""; }); setGuests(g); }}>Clear guests</button>}
          <button className="abtn" style={{background:"rgba(106,126,184,.15)",border:"1px solid rgba(106,126,184,.3)",color:"#6A7EB8"}} onClick={()=>setModal("importGuests")}>⬆ Import Guests</button>
          <button className="abtn" style={{background:"rgba(126,168,126,.15)",border:"1px solid rgba(126,168,126,.3)",color:"#7EA87E"}} onClick={()=>setModal("addTable")}>+ Add Table</button>
          <button className="abtn" style={{background:"rgba(212,180,131,.15)",border:"1px solid rgba(212,180,131,.3)",color:"#d4b483"}} onClick={()=>setModal("addElement")}>+ Add Element</button>
          <button className="abtn" style={{background:"rgba(94,143,168,.15)",border:"1px solid rgba(94,143,168,.3)",color:"#5E8FA8"}} onClick={()=>setModal("room")}>⚙ Room</button>
          <button className="abtn" style={{background:"rgba(154,106,174,.15)",border:"1px solid rgba(154,106,174,.3)",color:"#9A6AAE"}} onClick={resetAll}>↺ Reset</button>
        </div>
      </div>

      {/* Unassigned guest pool */}
      {pool.length>0 && (
        <div style={{maxWidth:900,margin:"0 auto 16px",display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",alignItems:"center"}}>
          <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,.4)",letterSpacing:1,marginRight:4}}>UNASSIGNED ({pool.length}):</span>
          {pool.map(name => (
            <span key={name} onClick={()=>setPoolSelected(p=>p===name?null:name)}
              style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:14,cursor:"pointer",
                fontFamily:"'Lato',sans-serif",fontSize:12,transition:"all .15s",
                background: poolSelected===name ? "rgba(126,168,126,0.25)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${poolSelected===name ? "rgba(126,168,126,0.6)" : "rgba(255,255,255,0.12)"}`,
                color: poolSelected===name ? "#7EA87E" : "rgba(232,224,212,.75)"}}>
              {name}
              <span onClick={(e)=>{e.stopPropagation(); setPool(p=>p.filter(g=>g!==name)); if(poolSelected===name) setPoolSelected(null);}} style={{opacity:0.5,cursor:"pointer"}}>×</span>
            </span>
          ))}
          {poolSelected && <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#7EA87E",marginLeft:6}}>Click an open seat to place {poolSelected}</span>}
        </div>
      )}

      {/* Map */}
      <div style={{position:"relative",maxWidth:900,margin:"0 auto",aspectRatio:`${roomW}/${roomH}`}}>
        <svg ref={svgRef} viewBox={`${roomOX} ${roomOY} ${roomW} ${roomH}`} style={{width:"100%",height:"100%",display:"block"}}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(212,180,131,.05)"/><stop offset="100%" stopColor="transparent"/>
            </radialGradient>
            {tables.map((_,i)=>{
              const c=TABLE_COLORS[i%TABLE_COLORS.length];
              return (<radialGradient key={i} id={`tg${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c} stopOpacity=".16"/><stop offset="100%" stopColor={c} stopOpacity=".03"/>
              </radialGradient>);
            })}
          </defs>
          <rect x={roomOX} y={roomOY} width={roomW} height={roomH} fill="url(#glow)"/>
          <text x="100" y="62" textAnchor="middle" className="room-label" fill="rgba(212,180,131,0.12)" fontSize="22">CAMBRIDGE</text>

          {/* Elements */}
          {elems.map((el,ei)=>{
            const pos=ePos[ei]; const R=RENDERERS[el.type]; if(!R) return null;
            const isHov=hoveredElem===ei;
            return (<g key={el.id} style={{cursor:"grab"}}
              onMouseDown={e=>drag(e,ei,ePos,setEPos)}
              onMouseEnter={()=>setHoveredElem(ei)}
              onMouseLeave={()=>setHoveredElem(null)}>
              <R el={{...el,x:pos.x,y:pos.y}}/>
              {isHov&&el.type!=="divider"&&(
                <g style={{cursor:"pointer",pointerEvents:"auto"}} onClick={e=>{e.stopPropagation();deleteElem(ei);setHoveredElem(null);}}>
                  <circle cx={pos.x+(el.w||5)/2-1} cy={pos.y-(el.h||5)/2+1} r="2.2" fill="rgba(196,106,94,0.9)" stroke="#fff" strokeWidth="0.25"/>
                  <text x={pos.x+(el.w||5)/2-1} y={pos.y-(el.h||5)/2+1.7} textAnchor="middle" fill="#fff" fontSize="2.5" fontWeight="bold" style={{pointerEvents:"none",fontFamily:"'Lato',sans-serif"}}>×</text>
                </g>
              )}
            </g>);
          })}

          {/* Tables */}
          {tables.map((tbl,ti)=>{
            const c=TABLE_COLORS[ti%TABLE_COLORS.length];
            const p=tPos[ti];
            const isHead=tbl.shape==="headtable";
            const isCir=tbl.shape==="circle";
            let seats=[];
            if(isHead)       seats=headTableSeats(p.x,p.y,tbl.w,tbl.h,tbl.seats);
            else if(isCir)   seats=circleSeats(p.x,p.y,(tbl.r||5.5)+2.2,tbl.seats);
            else             seats=rectSeats(p.x,p.y,tbl.w,tbl.h,tbl.seats);
            const nameFontSize=Math.max(0.9,1.8-Math.max(0,(tNames[ti]||"").length-7)*0.09);
            return (<g key={ti} style={{cursor:"grab"}} onMouseDown={e=>drag(e,ti,tPos,setTPos)}>
              {isHead
                ? <rect x={p.x-tbl.w/2-4} y={p.y-tbl.h/2-4} width={tbl.w+8} height={tbl.h+8} rx="3" fill={`url(#tg${ti})`}/>
                : isCir
                  ? <circle cx={p.x} cy={p.y} r={(tbl.r||5.5)+4} fill={`url(#tg${ti})`}/>
                  : <rect x={p.x-tbl.w/2-3} y={p.y-tbl.h/2-3} width={tbl.w+6} height={tbl.h+6} rx="3" fill={`url(#tg${ti})`}/>
              }
              {seats.map((s,si)=><line key={si} x1={p.x} y1={p.y} x2={s.x} y2={s.y} stroke={c} strokeOpacity=".1" strokeWidth=".12"/>)}
              {isHead
                ? (<>
                    <rect x={p.x-tbl.w/2} y={p.y-tbl.h/2} width={tbl.w} height={tbl.h} rx="1" fill="rgba(20,28,50,.85)" stroke={c} strokeWidth=".3" strokeOpacity=".5"/>
                    <text x={p.x} y={p.y-2} textAnchor="middle" className="table-label" fill={c} fontSize={nameFontSize} style={{cursor:"pointer",pointerEvents:"auto"}} onClick={()=>{if(dragRef.current?.dd)return;setEditTbl(ti);setTblInputVal(tNames[ti]);}}>{tNames[ti]}</text>
                    <text x={p.x} y={p.y+1.5} textAnchor="middle" className="guest-label" fill="rgba(232,224,212,.2)" fontSize=".7" style={{cursor:"pointer",pointerEvents:"auto"}} onClick={()=>{if(dragRef.current?.dd)return;setEditTbl(ti);setTblInputVal(tNames[ti]);}}>click to rename</text>
                  </>)
                : isCir
                  ? <circle cx={p.x} cy={p.y} r={tbl.r||5.5} fill="rgba(20,28,50,.85)" stroke={c} strokeWidth=".3" strokeOpacity=".5"/>
                  : <rect x={p.x-tbl.w/2} y={p.y-tbl.h/2} width={tbl.w} height={tbl.h} rx="1.2" fill="rgba(20,28,50,.85)" stroke={c} strokeWidth=".3" strokeOpacity=".5"/>
              }
              {!isHead&&(<>
                <text x={p.x} y={p.y-0.3} textAnchor="middle" className="table-label" fill={c} fontSize={nameFontSize} style={{cursor:"pointer",pointerEvents:"auto"}} onClick={()=>{if(dragRef.current?.dd)return;setEditTbl(ti);setTblInputVal(tNames[ti]);}}>{tNames[ti]}</text>
                <text x={p.x} y={p.y+1.8} textAnchor="middle" className="guest-label" fill="rgba(232,224,212,.2)" fontSize=".65" style={{cursor:"pointer",pointerEvents:"auto"}} onClick={()=>{if(dragRef.current?.dd)return;setEditTbl(ti);setTblInputVal(tNames[ti]);}}>click to rename</text>
              </>)}
              {isHead ? renderHeadTableSeats(tbl,p,ti,c) : seats.map((s,si)=>{
                const k=`${ti}-${si}`, nm=guests[k]||"", hov=hovered===k, fl=!!nm;
                return (<g key={si}>
                  <circle className="seat-circle" cx={s.x} cy={s.y} r={1.35}
                    fill={fl?c:"rgba(20,28,50,.7)"} fillOpacity={fl?.85:1}
                    stroke={c} strokeWidth={hov?".3":".18"} strokeOpacity={fl?.9:.35}
                    onMouseEnter={()=>setHovered(k)} onMouseLeave={()=>setHovered(null)}
                    onClick={()=>assignSeat(k,nm)} style={{transformOrigin:`${s.x}px ${s.y}px`}}/>
                  <text x={s.x} y={s.y+.4} textAnchor="middle" className="guest-label"
                    fill={fl?"#fff":"rgba(232,224,212,.22)"} fontSize={fl?".95":".85"} style={{pointerEvents:"none"}}>
                    {fl?(nm.length>8?nm.slice(0,7)+"…":nm):si+1}
                  </text>
                </g>);
              })}
            </g>);
          })}
        </svg>

        {/* Seat edit */}
        {editing&&(<div style={{...modalBase,border:"1px solid rgba(212,180,131,.3)",gap:8}}>
          <span style={lbl}>{tNames[parseInt(editing.split("-")[0])]}, Seat {parseInt(editing.split("-")[1])+1}</span>
          <input ref={inRef} className="name-input" style={{position:"relative"}} value={inputVal} placeholder="Guest name…"
            onChange={e=>setInputVal(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") commitEdit(); if(e.key==="Escape"){setEditing(null);setInputVal("");} }}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={commitEdit} style={primaryBtn("#d4b483")}>Save</button>
            <button onClick={()=>{setEditing(null);setInputVal("");}} style={cancelBtn}>Cancel</button>
          </div>
        </div>)}

        {/* Table rename */}
        {editTbl!==null&&(<div style={{...modalBase,border:`1px solid ${TABLE_COLORS[editTbl%TABLE_COLORS.length]}55`,gap:8}}>
          <span style={lbl}>Rename Table</span>
          <input className="name-input" style={{position:"relative"}} value={tblInputVal} placeholder="Table name…" autoFocus
            onChange={e=>setTblInputVal(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter"){setTNames(p=>({...p,[editTbl]:tblInputVal.trim()||`Table ${editTbl+1}`}));setEditTbl(null);} if(e.key==="Escape") setEditTbl(null); }}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setTNames(p=>({...p,[editTbl]:tblInputVal.trim()||`Table ${editTbl+1}`}));setEditTbl(null);}} style={primaryBtn("#d4b483")}>Save</button>
            <button onClick={()=>setEditTbl(null)} style={cancelBtn}>Cancel</button>
          </div>
        </div>)}

        {/* Import Guests */}
        {modal==="importGuests"&&(<div style={{...modalBase,border:"1px solid rgba(106,126,184,.3)",minWidth:300}}>
          <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:16,fontWeight:600,color:"#6A7EB8",textAlign:"center"}}>Import Guest List</span>
          <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,.45)",margin:0,lineHeight:1.5}}>Paste one name per line. They'll show up below as an unassigned pool — click a name, then click an open seat to place them.</p>
          <textarea value={importText} onChange={e=>setImportText(e.target.value)} rows={8} placeholder={"Jane Smith\nJohn Smith\n..."} autoFocus
            style={{...numIn, resize:"vertical", fontFamily:"'Lato',sans-serif", lineHeight:1.6}}/>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <button onClick={importGuests} style={primaryBtn("#6A7EB8")}>Add to Pool</button>
            <button onClick={()=>{setModal(null);setImportText("");}} style={cancelBtn}>Cancel</button>
          </div>
        </div>)}

        {/* Add Table */}
        {modal==="addTable"&&(<div style={{...modalBase,border:"1px solid rgba(126,168,126,.3)"}}>
          <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:16,fontWeight:600,color:"#7EA87E",textAlign:"center"}}>Add New Table</span>
          <div><label style={lbl}>Name</label><input style={numIn} value={ntNm} placeholder={`Table ${tables.length+1}`} onChange={e=>setNtNm(e.target.value)} autoFocus/></div>
          <div><label style={lbl}>Shape</label><div style={{display:"flex",gap:8}}><button onClick={()=>setNtS("rect")} style={selBtn(ntS==="rect")}>▬ Rectangle</button><button onClick={()=>setNtS("circle")} style={selBtn(ntS==="circle")}>● Round</button></div></div>
          <div><label style={lbl}>Seats</label><div style={{display:"flex",gap:6}}>{[4,6,8,10,12].map(n=><button key={n} onClick={()=>setNtN(n)} style={selBtn(ntN===n)}>{n}</button>)}</div></div>
          <div>
            <label style={lbl}>Dimensions ({uLabel})</label>
            {ntS==="rect"
              ? <div style={{display:"flex",gap:8}}><div style={{flex:1}}><span style={smallLbl}>Width</span><input type="number" style={numIn} value={ntW} onChange={e=>setNtW(Number(e.target.value)||6)}/></div><div style={{flex:1}}><span style={smallLbl}>Height</span><input type="number" style={numIn} value={ntH} onChange={e=>setNtH(Number(e.target.value)||4)}/></div></div>
              : <div><span style={smallLbl}>Radius</span><input type="number" step="0.5" style={numIn} value={ntR} onChange={e=>setNtR(Number(e.target.value)||4)}/></div>
            }
          </div>
          <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={addTable} style={primaryBtn()}>Add Table</button><button onClick={()=>setModal(null)} style={cancelBtn}>Cancel</button></div>
        </div>)}

        {/* Add Element */}
        {modal==="addElement"&&(<div style={{...modalBase,border:"1px solid rgba(212,180,131,.3)",maxHeight:"80vh",overflowY:"auto"}}>
          <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:16,fontWeight:600,color:"#d4b483",textAlign:"center"}}>Add Venue Element</span>
          <div>
            <label style={lbl}>Element Type</label>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {Object.entries(ELEMENT_TYPES).map(([k,info])=>(
                <button key={k} onClick={()=>{ setNeT(k); const d={bar:[10,6],beerwine:[16,28],cocktail:[4,4],dancefloor:[32,40],cake:[10,6],dessert:[12,20],guestbook:[14,7],rem:[10,7],photobooth:[40,12],divider:[160,2]}; const [dw,dh]=d[k]||[10,8]; setNeW(dw);setNeH(dh); }}
                  style={{display:"flex",alignItems:"center",gap:10,padding:"7px 12px",background:neT===k?`${info.color}22`:"rgba(255,255,255,.03)",border:`1px solid ${neT===k?info.color+"66":"rgba(255,255,255,.08)"}`,borderRadius:8,cursor:"pointer",color:neT===k?info.color:"rgba(232,224,212,.6)",fontFamily:"'Lato',sans-serif",fontSize:12,textAlign:"left"}}>
                  <span style={{fontSize:14,width:18,textAlign:"center"}}>{info.icon}</span><span>{info.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div><label style={lbl}>Size ({uLabel})</label><div style={{display:"flex",gap:8}}><div style={{flex:1}}><span style={smallLbl}>Width</span><input type="number" style={numIn} value={neW} onChange={e=>setNeW(Number(e.target.value)||4)}/></div><div style={{flex:1}}><span style={smallLbl}>Height</span><input type="number" style={numIn} value={neH} onChange={e=>setNeH(Number(e.target.value)||4)}/></div></div></div>
          <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={addElem} style={primaryBtn("#d4b483")}>Add Element</button><button onClick={()=>setModal(null)} style={cancelBtn}>Cancel</button></div>
        </div>)}

        {/* Room Settings */}
        {modal==="room"&&(<div style={{...modalBase,border:"1px solid rgba(94,143,168,.3)"}}>
          <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:16,fontWeight:600,color:"#5E8FA8",textAlign:"center"}}>Room Dimensions ({uLabel})</span>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}><label style={lbl}>Width</label><input type="number" style={numIn} value={roomW} onChange={e=>setRoomW(Number(e.target.value)||100)}/></div>
            <div style={{flex:1}}><label style={lbl}>Height</label><input type="number" style={numIn} value={roomH} onChange={e=>setRoomH(Number(e.target.value)||100)}/></div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}><label style={lbl}>Offset X</label><input type="number" style={numIn} value={roomOX} onChange={e=>setRoomOX(Number(e.target.value))}/></div>
            <div style={{flex:1}}><label style={lbl}>Offset Y</label><input type="number" style={numIn} value={roomOY} onChange={e=>setRoomOY(Number(e.target.value))}/></div>
          </div>
          <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,.35)",margin:"4px 0 0",lineHeight:1.4}}>Adjust viewBox to pan or zoom the visible floor plan.</p>
          <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={()=>setModal(null)} style={primaryBtn("#5E8FA8")}>Done</button></div>
        </div>)}
      </div>

      {/* Legend */}
      <div style={{maxWidth:900,margin:"24px auto 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,justifyContent:"space-between"}}>
          <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,fontWeight:600,color:"rgba(212,180,131,0.7)",margin:0,letterSpacing:2,textTransform:"uppercase"}}>Guest Roster</h2>
          <div style={{display:"flex",gap:6}}>
            {["all","assigned","unassigned"].map(f=>(
              <button key={f} onClick={()=>setLegendFilter(f)} style={{...selBtn(legendFilter===f),fontSize:11,padding:"4px 10px",flex:"none"}}>
                {f==="all"?"All":f==="assigned"?"Assigned":"Open"}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
          {tables.map((tbl,ti)=>{
            const tg=[]; for(let s=0;s<tbl.seats;s++){const n=guests[`${ti}-${s}`];if(n)tg.push(n);}
            const co=TABLE_COLORS[ti%TABLE_COLORS.length];
            const isAssigned=tg.length>0;
            if(legendFilter==="assigned"&&!isAssigned) return null;
            if(legendFilter==="unassigned"&&isAssigned) return null;
            return (<div key={ti} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${co}22`,borderRadius:8,padding:"8px 12px"}}>
              <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:13,fontWeight:600,color:co,marginBottom:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{tbl.shape==="headtable"?"⬛":tbl.shape==="rect"?"▬":"●"} {tNames[ti]}</span>
                <span style={{fontFamily:"'Lato',sans-serif",fontWeight:300,fontSize:11,color:"rgba(232,224,212,.35)"}}>{tg.length}/{tbl.seats}</span>
              </div>
              {tg.length>0
                ?<div style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,.55)",lineHeight:1.6}}>{tg.join(" · ")}</div>
                :<div style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"rgba(232,224,212,.2)",fontStyle:"italic"}}>No guests assigned</div>}
            </div>);
          })}
        </div>
      </div>
    </div>
  );
}
