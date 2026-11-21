import { useEffect, useState } from 'react'

// ---- Edit your content here ----
const PHONES = { chhavi: ['7400744723'], mukul: ['8319662377'] }

// Instagram: open a reel/post > 3 dots > Copy link, then paste links below.
// Your Instagram account must be public for embeds to work.
const IG_PROFILE = 'https://www.instagram.com/kalaa_events_/'
const IG_POSTS = [
  // 'https://www.instagram.com/reel/XXXXXXXXXXX/',
  // 'https://www.instagram.com/p/XXXXXXXXXXX/',
]
const IG_COUNT = 3 // how many to show at once

const SERVICES = [
  ['Choreography', 'Solo, group and couple dance performances for all occasions.'],
  ['Decoration', 'Haldi, mehendi and birthday themed décor with floral artistry.'],
  ['E-invitations & video editing', 'Custom digital invites and professionally edited highlight reels.'],
  ['Bride & groom entry', 'Dramatic, personalised entry productions with props and effects.'],
  ['Anchor – male / female', 'Experienced anchors to host and energise your event.'],
  ['Background dancers & props', 'Trained dancers with themed props for unforgettable moments.'],
  ['Professional DJ', 'Premium sound setups with curated playlists for every vibe.'],
  ['Game setup', 'Fun wedding and corporate games to keep guests engaged.'],
  ['Wedding gift hampers', 'Thoughtfully curated hampers for guests and families.'],
  ['Wedding dress designers', 'Bespoke bridal and groom outfits tailored to your vision.'],
  ['Art workshops', 'Interactive art sessions: face painting, craft and more.'],
]

const CHOREO = {
  head: ['PERFORMANCES', 'RATE', 'YOU PAY', 'PACKAGE'],
  rows: [
    ['5', '₹5,500', '₹4,999', 'Standard'],
    ['10', '₹5,000', '₹4,599', 'Value'],
    ['More than 10', '₹4,500', '₹3,999', 'Best value'],
  ],
}
const ENTRY = {
  head: ['PACKAGE', 'DANCERS', 'PRICE', 'INCLUDES'],
  rows: [
    ['Entry Starter', '3–4', '₹5,000', 'Props + rehearsal'],
    ['Grand Entry', '5–8', '₹8,500', 'Props + costumes + rehearsal'],
    ['Royal Entry', '8+', 'Custom', 'Full production'],
  ],
}
const FACE = {
  head: ['SESSION', 'DURATION', 'PRICE'],
  rows: [
    ['Eye art / face painting', '3 hours', '₹4,000'],
    ['Kids face painting', '2 hours', '₹3,000'],
    ['Glitter art (adults)', '3 hours', '₹4,000'],
  ],
}

const toEmbed = url => {
  const m = String(url).match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/i)
  return m ? `https://www.instagram.com/${m[1].toLowerCase()}/${m[2]}/embed` : null
}
const IG_EMBEDS = IG_POSTS.map(toEmbed).filter(Boolean)
const pickRandom = () => {
  const a = [...IG_EMBEDS]
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]]
  }
  return a.slice(0, IG_COUNT)
}

// ---- Components ----

function Instagram() {
  const [items, setItems] = useState(pickRandom)
  return (
    <section className="alt" id="instagram">
      <div className="wrap">
        <div className="head"><p className="script">Follow along</p><h2>On Instagram</h2><p>Reels and posts from our latest celebrations.</p></div>
        <div className="ig-profile">
          <img src="/images/instagram-qr.png" alt="QR code for @kalaa_events_ on Instagram" loading="lazy" />
          <div>
            <h3>@kalaa_events_</h3>
            <p>Scan the code or tap the button to follow us.</p>
            <a className="btn ig" href={IG_PROFILE} target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
          </div>
        </div>
        {items.length > 0 && (
          <div className="ig-grid">
            {items.map(src => (
              <div className="ig-card" key={src}>
                <iframe src={src} title="Instagram reel or post by Kala Events" loading="lazy" scrolling="no" />
              </div>
            ))}
          </div>
        )}
        {IG_EMBEDS.length > IG_COUNT && (
          <div className="ig-more">
            <button className="btn outline" type="button" onClick={() => setItems(pickRandom())}>Show different reels</button>
          </div>
        )}
      </div>
    </section>
  )
}

function Table({ data, priceCol, oldCol }) {
  return (
    <div className="scroll">
      <table>
        <thead><tr>{data.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {data.rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} data-label={data.head[j][0] + data.head[j].slice(1).toLowerCase()} className={j === priceCol ? 'price' : j === oldCol ? 'old' : ''}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Split({ id, alt, rev, photo, script, title, lead, children }) {
  return (
    <section id={id} className={alt ? 'alt' : ''}>
      <div className={'wrap split' + (rev ? ' rev' : '')}>
        <div className={'photo ' + photo} role="img" aria-label={title} />
        <div>
          <p className="script">{script}</p>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

function GalleryImg({ n }) {
  const src = `/images/gallery-${n}.jpg`
  const [ok, setOk] = useState(true)
  useEffect(() => {
    const img = new Image()
    img.onerror = () => setOk(false)
    img.src = src
  }, [src])
  if (!ok) return null
  return <div className="g" role="img" aria-label={`Kala Events celebration ${n}`} style={{ backgroundImage: `url(${src})` }} />
}

export default function App() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.classList.toggle('lock', open) }, [open])
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(false)
    const r = () => window.innerWidth > 820 && setOpen(false)
    window.addEventListener('keydown', k); window.addEventListener('resize', r)
    return () => { window.removeEventListener('keydown', k); window.removeEventListener('resize', r) }
  }, [])
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <>
      <nav className={'nav' + (solid ? ' solid' : '') + (open ? ' open' : '')}>
        <div className="wrap">
          <a className="logo" href="#top">✦ KALA EVENTS</a>
          <div className="links" onClick={() => setOpen(false)}>
            <a href="#services">Services</a><a href="#choreography">Choreography</a>
            <a href="#entry">Entries</a><a href="#facepaint">Face art</a><a href="#gallery">Gallery</a><a href="#instagram">Instagram</a>
            <a className="cta" href="#contact">Book now</a>
          </div>
          <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
        </div>
      </nav>
      <div className="callbar">
        <a className="c" href={`tel:+91${PHONES.chhavi[0]}`}>Call now</a>
        <a className="w" href={`https://wa.me/91${PHONES.chhavi[0]}`}>WhatsApp</a>
      </div>

      <header className="hero" id="top">
        <div className="wrap">
          <p className="script">Welcome to</p>
          <h1>KALA EVENTS</h1>
          <p className="types">WEDDING • CORPORATE • ENTERTAINMENT</p>
          <p className="tag">Making Your Celebration Memorable</p>
          <div className="btns">
            <a className="btn" href={`tel:+91${PHONES.chhavi[0]}`}>Call Us</a>
            <a className="btn ghost" href="#choreography">View pricing</a>
          </div>
        </div>
      </header>

      <section id="services">
        <div className="wrap">
          <div className="head"><p className="script">What we do</p><h2>Our services</h2><p>Everything for your celebration, from one team.</p></div>
          <div className="grid">
            {SERVICES.map(([t, d]) => (
              <div className="svc" key={t}><span>✦</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <Split id="choreography" alt photo="p-chor" script="Sangeet & more" title="Choreography"
        lead="From solo grooves to grand group performances, we craft every step with precision and passion. Perfect for weddings, sangeets, corporate events and private parties.">
        <Table data={CHOREO} priceCol={2} oldCol={1} />
        <p className="note">Song editing: ₹299/song &nbsp;•&nbsp; 3–4 background dancers per performance: ₹5,000 extra</p>
        <p className="styles">Bollywood • Contemporary • Folk • Western • Couple choreography</p>
      </Split>

      <Split id="entry" rev photo="p-entry" script="Make an entrance" title="Background dancers & entry props"
        lead="Elevate your bridal or groom entry with professionally trained dancers. Themed props, coordinated costumes and choreographed routines create unforgettable moments.">
        <Table data={ENTRY} priceCol={2} />
      </Split>

      <Split id="facepaint" alt photo="p-face" script="For every age" title="Eye art & face painting"
        lead="Magical face art and glitter designs for kids and adults alike. A highlight at weddings, birthday parties, fairs and corporate events.">
        <Table data={FACE} priceCol={2} />
      </Split>

      <section id="gallery">
        <div className="wrap">
          <div className="head"><p className="script">Moments we made</p><h2>Gallery</h2></div>
          <div className="gallery">{[1, 2, 3, 4, 5, 6].map(n => <GalleryImg key={n} n={n} />)}</div>
        </div>
      </section>

      <Instagram />

      <section className="contact" id="contact">
        <div className="wrap">
          <p className="script">Let's celebrate</p><h2>Get in touch</h2>
          <p>Available for weddings, sangeet, corporate events, birthdays and fairs.</p>
          <div className="people">
            <div><h3>Chhavi Shrivastava</h3>{PHONES.chhavi.map(p => <a key={p} href={`tel:+91${p}`}>{p}</a>)}</div>
            <div><h3>Mukul Kaushal</h3>{PHONES.mukul.map(p => <a key={p} href={`tel:+91${p}`}>{p}</a>)}</div>
          </div>
          <div className="btns">
            <a className="btn" href={`https://wa.me/91${PHONES.chhavi[0]}`}>Message on WhatsApp</a>
            <a className="btn ghost" href={IG_PROFILE} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </section>

      <footer>KALA EVENTS • Making Your Celebration Memorable</footer>
    </>
  )
}
