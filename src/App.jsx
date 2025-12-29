import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// AIRCRAFT DATA
// ═══════════════════════════════════════════════════════════════

const aircraftData = [
  {
    id: 'mig-21pd',
    name: 'MiG-21PD',
    nato: 'Fishbed-G',
    year: '1966',
    image: 'mig21pd.jpg',
    wtImage: 'warthunder_mig21pd.jpg',
    description: `The MiG-21PD was a revolutionary experimental Soviet aircraft that pushed the boundaries of vertical takeoff technology. Developed in the 1960s at the height of the Cold War, this modified Fishbed incorporated two additional lift engines mounted in the fuselage, enabling dramatically shortened takeoff runs from damaged runways or improvised airstrips—a critical capability in the nuclear age.`,
    specs: {
      country: 'Soviet Union',
      role: 'Experimental Interceptor',
      engines: '1 main + 2 lift engines',
      firstFlight: 'June 16, 1966',
      status: 'Prototype Only',
      manufacturer: 'Mikoyan-Gurevich',
    },
    stats: {
      speed: 85,
      climb: 90,
      maneuverability: 45,
      armament: 60,
    },
    warThunder: {
      nation: 'USSR',
      rank: 'VII',
      battleRating: '10.3 - 10.7',
      role: 'Interceptor',
      armament: [
        'GSh-23L twin-barrel cannon',
        'R-3S infrared-guided missiles',
        'R-13M1 air-to-air missiles',
      ],
      pros: [
        'Exceptional acceleration',
        'Outstanding climb rate',
        'Small radar signature',
        'Good energy retention',
      ],
      cons: [
        'Limited sustained turn rate',
        'Restricted fuel capacity',
        'Narrow weapon selection',
      ],
    },
  },
  {
    id: 'mig-25bp',
    name: 'MiG-25BP',
    nato: 'Foxbat-A',
    year: '1970',
    image: 'mig25bp.jpg',
    wtImage: 'warthunder_mig25bp.jpg',
    description: `The MiG-25BP "Foxbat" stands as one of the most remarkable achievements in Soviet aviation engineering. Designed to intercept the XB-70 Valkyrie and SR-71 Blackbird, this stainless steel monster could reach speeds exceeding Mach 2.8 and altitudes above 80,000 feet. Its massive Tumansky R-15 engines made it the fastest operational interceptor ever built—a true apex predator of the Cold War skies.`,
    specs: {
      country: 'Soviet Union',
      role: 'High-Altitude Interceptor',
      engines: '2× Tumansky R-15B-300',
      topSpeed: 'Mach 2.83 (3,000 km/h)',
      serviceEntry: '1970',
      manufacturer: 'Mikoyan-Gurevich',
    },
    stats: {
      speed: 98,
      climb: 95,
      maneuverability: 25,
      armament: 85,
    },
    warThunder: {
      nation: 'USSR',
      rank: 'VIII',
      battleRating: '11.0 - 11.3',
      role: 'Long-Range Interceptor',
      armament: [
        'R-40R radar-guided missiles',
        'R-40T infrared-guided missiles',
        'R-60M short-range AAMs',
        'No internal cannon',
      ],
      pros: [
        'Unmatched top speed',
        'Powerful Smerch-A radar',
        'Devastating long-range missiles',
        'Exceptional high-altitude performance',
      ],
      cons: [
        'Extremely poor maneuverability',
        'Massive radar signature',
        'Vulnerable in dogfights',
        'No gun armament',
      ],
    },
  },
]

// ═══════════════════════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════════════════════

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS')

  useEffect(() => {
    const statuses = [
      'INITIALIZING SYSTEMS',
      'DECRYPTING ARCHIVES',
      'LOADING AIRCRAFT DATA',
      'ESTABLISHING UPLINK',
      'ACCESS GRANTED',
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5
        const statusIndex = Math.min(Math.floor(next / 25), statuses.length - 1)
        setStatusText(statuses[statusIndex])
        return next >= 100 ? 100 : next
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 500)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SOVIET ARCHIVES
        </motion.div>
        <div className="loading-bar">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.div
          className="loading-text"
          key={statusText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {statusText}
          <span className="loading-dots">...</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// BACKGROUND EFFECTS
// ═══════════════════════════════════════════════════════════════

function BackgroundEffects() {
  return (
    <>
      <div className="grid-bg" />
      <div className="radar-container">
        <div className="radar-sweep" />
        <div className="radar-rings" />
      </div>
      <div className="particles-container">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      <div className="scanlines" />
      <div className="noise-overlay" />
      <div className="vignette" />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// TARGETING CORNERS
// ═══════════════════════════════════════════════════════════════

function TargetingCorners() {
  return (
    <div className="targeting-corners">
      <div className="targeting-corner tl" />
      <div className="targeting-corner tr" />
      <div className="targeting-corner bl" />
      <div className="targeting-corner br" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <motion.section className="hero" style={{ opacity }}>
      <motion.div className="hero-content" style={{ y }}>
        <motion.div
          className="classification-stamp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          СЕКРЕТНО • CLASSIFIED
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Soviet <span className="accent">Jet</span> Interceptors
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Cold War Aviation Archives
        </motion.p>

        <motion.div
          className="hero-designation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="designation-item">
            <span className="designation-code">MiG-21PD</span>
            <span className="designation-label">Fishbed-G</span>
          </div>
          <div className="designation-item">
            <span className="designation-code">MiG-25BP</span>
            <span className="designation-label">Foxbat-A</span>
          </div>
        </motion.div>
      </motion.div>

      <TargetingCorners />

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span>Scroll to Declassify</span>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STAT BAR
// ═══════════════════════════════════════════════════════════════

function StatBar({ label, value, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="stat-bar" ref={ref}>
      <div className="stat-bar-header">
        <span className="stat-bar-label">{label}</span>
        <span className="stat-bar-value">{value}%</span>
      </div>
      <div className="stat-bar-track">
        <motion.div
          className="stat-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ delay: delay * 0.1, duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// AIRCRAFT CARD
// ═══════════════════════════════════════════════════════════════

function AircraftCard({ aircraft, index }) {
  const [activeTab, setActiveTab] = useState('specs')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.article
      ref={ref}
      className="aircraft-card"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <header className="aircraft-header">
        <div className="aircraft-designation">
          <h2 className="aircraft-name">{aircraft.name}</h2>
          <span className="aircraft-nato">NATO: {aircraft.nato}</span>
        </div>
        <div className="aircraft-year">{aircraft.year}</div>
      </header>

      <div className="aircraft-body">
        <motion.div
          className="aircraft-image-container"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src={aircraft.image}
            alt={aircraft.name}
            className="aircraft-image"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="image-overlay" />
          <div className="image-corners">
            <div className="image-corner tl" />
            <div className="image-corner tr" />
            <div className="image-corner bl" />
            <div className="image-corner br" />
          </div>
        </motion.div>

        <motion.div
          className="aircraft-description"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>{aircraft.description}</p>

          <div className="stat-bars">
            <StatBar label="Top Speed" value={aircraft.stats.speed} delay={0} />
            <StatBar label="Climb Rate" value={aircraft.stats.climb} delay={1} />
            <StatBar label="Maneuverability" value={aircraft.stats.maneuverability} delay={2} />
            <StatBar label="Armament" value={aircraft.stats.armament} delay={3} />
          </div>
        </motion.div>
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button
            className={`tab-button ${activeTab === 'warthunder' ? 'active' : ''}`}
            onClick={() => setActiveTab('warthunder')}
          >
            War Thunder Stats
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="tab-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'specs' ? (
              <SpecsTab specs={aircraft.specs} />
            ) : (
              <WarThunderTab data={aircraft.warThunder} image={aircraft.wtImage} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════
// SPECS TAB
// ═══════════════════════════════════════════════════════════════

function SpecsTab({ specs }) {
  const specItems = Object.entries(specs).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    value,
  }))

  return (
    <div className="specs-grid">
      {specItems.map((spec, index) => (
        <motion.div
          key={spec.label}
          className="spec-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="spec-label">{spec.label}</div>
          <div className={`spec-value ${index === 0 ? 'highlight' : ''}`}>
            {spec.value}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WAR THUNDER TAB
// ═══════════════════════════════════════════════════════════════

function WarThunderTab({ data, image }) {
  return (
    <div>
      <div className="wt-header">
        <div className="wt-icon">WT</div>
        <div className="wt-title">War Thunder Profile</div>
        <div className="battle-rating">BR {data.battleRating}</div>
      </div>

      <div className="wt-grid">
        <div className="wt-section">
          <div className="wt-section-title">General</div>
          <ul className="wt-list">
            <li>Nation: {data.nation}</li>
            <li>Rank: {data.rank}</li>
            <li>Role: {data.role}</li>
          </ul>
        </div>

        <div className="wt-section">
          <div className="wt-section-title">Armament</div>
          <ul className="wt-list">
            {data.armament.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="wt-section">
          <div className="wt-section-title">Advantages</div>
          <ul className="wt-list pros">
            {data.pros.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="wt-section">
          <div className="wt-section-title">Disadvantages</div>
          <ul className="wt-list cons">
            {data.cons.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className="aircraft-image-container"
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img
          src={image}
          alt="War Thunder Screenshot"
          className="aircraft-image"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="image-overlay" />
        <div className="image-corners">
          <div className="image-corner tl" />
          <div className="image-corner tr" />
          <div className="image-corner bl" />
          <div className="image-corner br" />
        </div>
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">☆ SOVIET ARCHIVES ☆</div>
        <p className="footer-text">
          Aviation Documentation Repository
        </p>
        <p className="footer-text">
          MiG-21PD & MiG-25BP Interceptor Files
        </p>
        <div className="footer-classification">
          DECLASSIFIED • FOR PUBLIC RELEASE
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BackgroundEffects />

          <main>
            <HeroSection />

            <section className="aircraft-section">
              <motion.header
                className="section-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Aircraft Dossiers</h2>
                <div className="section-divider" />
              </motion.header>

              {aircraftData.map((aircraft, index) => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} index={index} />
              ))}
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}
