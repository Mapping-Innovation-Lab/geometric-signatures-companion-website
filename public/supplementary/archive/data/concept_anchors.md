# Concept anchors: full descriptions and paraphrase ensembles

Every case study uses ten concepts, one of which is the target. Each concept is represented in embedding space by an **anchor**: the L2-normalised mean of the embeddings of five English paraphrases of that concept. The paraphrase ensemble replaces a single hand-written phrase, so the result does not depend on one particular wording.

For each concept below: the **description** is the long definition carried in the concept config (it defines the concept's intended scope and is the text a reader should consult to know what was and was not meant to fall under it); the **aliases** are surface forms associated with the concept; the **paraphrases** are the five strings that are actually embedded and averaged to form the anchor.

Encoder for the anchors and the corpus: `intfloat/multilingual-e5-base`.

## Special relativity (1880-1920)

Target concept: `special_relativity`

### `special_relativity`  **(target)**

**Description.** Einstein's 1905 kinematic revolution and its immediate consequences: the two postulates (relativity of uniform motion and invariance of light speed), derivation of time dilation and length contraction from first principles, the relativity of simultaneity as a physical insight, relativistic velocity addition, mass-energy equivalence (E = mc squared), the Minkowski four-dimensional spacetime formulation, proper time, worldlines, the light cone, and the transition from Lorentz's dynamical contraction hypothesis to Einstein's kinematic reinterpretation.

**Aliases.** Einstein 1905; two postulates of relativity; time dilation; length contraction; mass-energy equivalence; E equals mc squared; Minkowski spacetime; four-dimensional spacetime; proper time; light cone; worldline; kinematic relativity

**Paraphrases (embedded and averaged):**

1. Kinematic relativity as introduced by Einstein in 1905: starting from two postulates, the principle of relativity for inertial frames and the constancy of the speed of light, one derives time dilation, length contraction, the relativity of simultaneity, relativistic addition of velocities, and the equivalence of mass and energy expressed as E = mc squared, culminating in the four-dimensional spacetime of Minkowski with proper time, worldlines, and the light cone, replacing Lorentz's dynamical contraction with a purely kinematic account.
2. The special theory of relativity, founded on the relativity of uniform motion and the invariance of light speed, produces a unified spacetime framework: proper time and worldlines parameterize trajectories, the Minkowski metric defines the light cone, time dilation and length contraction follow from frame transformations, simultaneity becomes frame-dependent, velocities add nonlinearly, and inertial mass is reinterpreted as a form of energy through E = m c^2.
3. Einstein's 1905 reformulation of space and time: dropping the Lorentzian aether-bound contraction in favor of a postulate-based derivation, the framework yields measurable time dilation, length contraction, mass-energy equivalence (E = m c^2), and a relativity of simultaneity, organized geometrically in Minkowski's four-dimensional spacetime with worldlines, proper time, and the light cone as structural primitives.
4. Special relativity treats inertial frames symmetrically and assigns the speed of light a frame-independent value, leading to consequences that include the contraction of moving rods, the dilation of moving clocks, the conversion factor c^2 between rest mass and energy, and the unification of space and time into the Minkowski continuum where causal structure is encoded by the light cone.
5. A kinematic reinterpretation of electrodynamics of moving bodies: the two relativity postulates replace dynamical ether-theoretic explanations of the Michelson result with first-principles derivations of length contraction, time dilation, simultaneity-as-convention, and the mass-energy relation E = m c^2, geometrized in Minkowski spacetime via four-vectors, worldlines, proper time, and light-cone causal structure.

### `aether_optics`

**Description.** The nineteenth-century aether and optical-motion problem: luminiferous ether, ether drift, ether wind, ether drag, aberration, Fresnel drag, Michelson-Morley interferometry, Fizeau-type experiments, interference, refraction, diffraction, polarization, and light propagation in media.

**Aliases.** aether; ether; luminiferous ether; ether drift; ether wind; Michelson-Morley experiment; interferometer; Fresnel drag; aberration of light; wave optics

**Paraphrases (embedded and averaged):**

1. Nineteenth-century optics in the framework of a luminiferous aether: ether drift, ether wind, and ether-drag hypotheses, aberration of starlight, Fresnel's partial-drag coefficient, Michelson-Morley interferometric null results, Fizeau-type measurements of light in moving water, and the classical wave-optical phenomena of interference, refraction, diffraction, and polarization in transparent media.
2. The optical-motion problem of the late nineteenth century: aether as a mechanical substrate for light propagation, ether drift relative to the Earth, ether drag in moving matter, Fresnel's coefficient, aberration, interferometric searches for the aether wind (Michelson-Morley), Fizeau's water-tube experiment, and the wave-optical effects of interference, diffraction, refraction, and polarization in optical media.
3. Pre-relativistic light propagation: the luminiferous ether and its kinematic interactions with matter, including ether drag, ether wind, the Fresnel drag coefficient, aberration of starlight, and interferometric tests such as Michelson-Morley and Fizeau-type setups, together with the wave-optical phenomena (interference, refraction, diffraction, polarization) governing light in dielectric media.
4. Aether-theoretic optics: the conjectured stationary or partially-dragged ether as the medium for light, with associated experimental signatures (Michelson-Morley interferometry, Fizeau measurements of light speed in moving media, stellar aberration), together with the broader optics of interference, diffraction, refraction, and polarization in transparent matter.
5. Light propagation through hypothesized ether: ether drift and ether drag as mechanical effects, the aberration of light from stars, Fresnel's drag coefficient, interferometric null tests of ether motion (Michelson-Morley), Fizeau-type measurements in moving water, and ordinary wave-optical effects including interference, refraction, diffraction, and polarization in optical media.

### `electrodynamics`

**Description.** The mathematical formalism of classical electromagnetic field theory, distinct from electron physics and from relativistic kinematics: Maxwell's field equations in their Heaviside-Hertz vector form, electromagnetic energy and the Poynting vector, retarded potentials, radiation from oscillating dipoles, boundary value problems in electrostatics and magnetostatics, dielectric polarization, magnetic susceptibility, the electromagnetic stress tensor, and the theoretical unification of optics with electricity and magnetism.

**Aliases.** electromagnetic field theory; Maxwell's field equations; Heaviside-Hertz form; Poynting vector; retarded potentials; electromagnetic stress tensor; boundary value problems; dielectric polarization; magnetic susceptibility; oscillating dipole radiation

**Paraphrases (embedded and averaged):**

1. Classical electromagnetic field theory in its mathematical form, separated from electron dynamics and from relativistic kinematics: the Heaviside-Hertz vector formulation of Maxwell's equations, the Poynting vector and electromagnetic energy density, retarded potentials, dipole radiation, electrostatic and magnetostatic boundary problems, dielectric polarization, magnetic susceptibility, the Maxwell stress tensor, and the unified field-theoretic description of optical, electrical, and magnetic phenomena.
2. The continuum field theory of electricity and magnetism developed by Maxwell, Heaviside, and Hertz: vector-form field equations, Poynting energy flux, retarded potentials, radiation from accelerated charges treated as oscillating dipoles, electromagnetic stress tensor, dielectric and magnetic response of matter, boundary value problems in statics, and the optical-electromagnetic unification, kept distinct from electron-theoretic and relativistic accounts.
3. Maxwell's electromagnetic field equations cast in modern vector form by Heaviside and Hertz, together with their structural consequences: the Poynting vector for energy flow, retarded potentials, dipole radiation patterns, magnetostatic and electrostatic boundary problems, polarization and susceptibility in material media, the electromagnetic stress tensor, and the unification of optics with electricity and magnetism as macroscopic field theory.
4. Field-theoretic electromagnetism in the late-classical sense: macroscopic Maxwell equations in vector form, electromagnetic energy density and the Poynting flux, retarded scalar and vector potentials, oscillating-dipole radiation, electromagnetic stress, dielectric polarization, magnetic susceptibility, and the optical-electromagnetic synthesis, distinguished from corpuscular electron theory and from relativistic transformations of fields.
5. Pre-relativistic classical electrodynamics as a continuum theory: Heaviside-Hertz vector form of Maxwell's equations, Poynting vector, retarded potentials, dipole radiation, boundary-value problems for electrostatic and magnetostatic systems, dielectric polarization and magnetic susceptibility, the electromagnetic stress tensor, and the unification of light with electric and magnetic phenomena.

### `electron_theory`

**Description.** Electron and charged-particle theory: electrons, corpuscles, cathode rays, ions, ionization, moving charges, electromagnetic mass, Lorentz electron theory, radiation from moving charges, charge distributions, conductivity, and electron dynamics.

**Aliases.** electron; corpuscle; electron theory; charged particle; cathode rays; ionization; electromagnetic mass; moving electron; dynamics of the electron

**Paraphrases (embedded and averaged):**

1. Electron and charged-particle theory in late-classical physics: electrons as corpuscles, cathode-ray and ion phenomena, ionization processes, dynamics of moving charges, electromagnetic mass of the electron, Lorentz's electron-theoretic framework, radiation from accelerated charges, charge distributions, electrical conductivity, and microscopic electron dynamics.
2. The corpuscular and dynamical theory of electrons: electrons and ions as discrete charge carriers, cathode rays, ionization, the Lorentz electron-theoretic program, electromagnetic mass arising from self-field interaction, radiation from moving and accelerating charges, charge density distributions, and the conduction of electricity in metals and gases.
3. Electron theory as developed by Lorentz, J. J. Thomson, and others: electrons, corpuscles, cathode rays, ions, ionization phenomena, the electromagnetic mass of moving charges, radiation from accelerated charges, charge-distribution dynamics, electrical conductivity, and a microscopic account of electromagnetic-matter interaction in terms of discrete charged particles.
4. Charged-particle dynamics in the Lorentz electron theory: motion of electrons and ions under electromagnetic forces, ionization processes, electromagnetic mass of the corpuscle, radiation reaction from accelerating charges, current and charge density distributions, conduction in metals and electrolytes, and the link between microscopic electron dynamics and macroscopic electromagnetic phenomena.
5. Microscopic charged-particle physics circa 1900: electrons (corpuscles) and ions, cathode rays, ionization, electromagnetic mass of the moving electron, Lorentz electron-theoretic equations, radiation from accelerated charges, charge distributions and conductivity, and the dynamics of discrete charged particles as the substrate of electric currents.

### `mechanics_time_measurement`

**Description.** Foundational and philosophical questions about mechanics and measurement, distinct from the application of mechanics to specific physical systems: the logical status of Newton's laws, Mach's critique of absolute space and absolute time, Poincare's conventionalism about geometry, Hertz's image-based reformulation of mechanics, the definition and measurement of simultaneity at distant locations, the operational meaning of length and duration, rigid body kinematics, and the epistemological foundations of dynamics.

**Aliases.** foundations of mechanics; Mach's critique; absolute space; absolute time; Poincare conventionalism; Hertz's mechanics; operational definition; measurement of simultaneity; epistemology of dynamics; rigid body kinematics

**Paraphrases (embedded and averaged):**

1. Foundational and philosophical analysis of mechanics and measurement: the logical and epistemic status of Newton's laws, Mach's critique of absolute space and absolute time, Poincare's geometric conventionalism, Hertz's image-based reformulation of mechanical theory, the operational definition of simultaneity at separated locations, the measurement of length and duration, rigid-body kinematics, and the foundations of dynamics, treated as conceptual rather than as applied mechanics.
2. Epistemological foundations of mechanics and operational measurement: critical examination of Newton's laws, Mach's rejection of absolute space and time, Poincare's conventionalist account of geometry and physical convention, Hertz's reformulation of mechanics through image theories, the operational meaning of distant simultaneity, length and duration as measured quantities, and rigid-body kinematics, as distinct from concrete dynamical applications.
3. Conceptual mechanics circa 1900: the philosophical status of Newton's laws and absolute space-time, Mach's critique, Poincare's conventionalism, Hertz's image-based reformulation of dynamics, the operational definition and measurement of simultaneity at a distance, length and time measurements as physical operations, and the kinematics of rigid bodies, as foundational rather than applied physics.
4. Foundations of mechanics and the operational status of measurement: the logical structure of Newton's three laws, Mach's anti-absolutist analysis of motion, Poincare on the conventionality of geometry, Hertz's mechanical image-theory, the conceptual problem of synchronizing distant clocks, operational definitions of length and time, rigid-body kinematics, and the epistemology of dynamics.
5. Mechanics treated philosophically: Newton's laws as logical postulates, the Mach critique of absolute space and absolute time, Poincare's conventional account of geometry, Hertz's reformulation of mechanics via image principles, the operational meaning of simultaneity at remote locations, length and duration as measurable quantities, rigid-body kinematics, and the foundational logic of dynamics.

### `thermodynamics_kinetic_theory`

**Description.** Thermodynamics and kinetic theory in late nineteenth-century physics: heat, temperature, entropy, specific heat, heat capacity, calorimetry, thermal conductivity, kinetic theory of gases, statistical mechanics, molecular motion, viscosity, diffusion, and gas laws.

**Aliases.** thermodynamics; kinetic theory of gases; kinetic theory; heat; temperature; entropy; specific heat; heat capacity; calorimetry; viscosity

**Paraphrases (embedded and averaged):**

1. Thermodynamics and the kinetic theory of gases in late nineteenth-century physics: heat and temperature as physical quantities, entropy and its irreversibility, specific heat and heat capacity, calorimetric measurement, thermal conductivity, the kinetic theory of gases, early statistical mechanics, molecular motion, viscosity, diffusion, and the macroscopic gas laws.
2. Heat physics circa 1880-1920: phenomenological thermodynamics (temperature, entropy, calorimetry, heat capacity, specific heat, thermal conductivity) together with the molecular-kinetic theory of gases, statistical mechanics, viscosity, diffusion processes, and the empirical gas laws relating pressure, volume, and temperature.
3. Classical thermodynamics and kinetic theory: thermal energy, temperature, entropy and the second law, calorimetric experiments, specific heat and heat capacity measurements, thermal conductivity, gas laws, kinetic theory accounts of molecular motion, viscosity, diffusion, and the statistical-mechanical underpinning of equilibrium thermodynamics.
4. Thermal and statistical physics of the late nineteenth century: heat, temperature, entropy, specific heat, heat capacity, calorimetry, thermal conduction, the kinetic theory of gases as a molecular-level explanation of pressure and temperature, statistical mechanics, molecular motion, viscosity, diffusion, and the gas laws.
5. Thermodynamics together with its molecular underpinning: phenomenological heat theory (temperature, entropy, calorimetry, specific and total heat capacities, thermal conduction), the kinetic theory of gases, statistical mechanics, molecular motion, transport phenomena (viscosity, diffusion), and the empirical gas laws.

### `radiation_quantum`

**Description.** Radiation theory and early quantum physics: radiant heat, radiation pressure, blackbody radiation, cavity radiation, Planck law, Wien law, Rayleigh-Jeans law, energy quanta, quantum hypothesis, photoelectric effect, light quantum, frequency, intensity, and electron emission.

**Aliases.** radiation; radiant heat; blackbody radiation; Planck law; energy quantum; quantum hypothesis; photoelectric effect; frequency; intensity

**Paraphrases (embedded and averaged):**

1. Radiation theory and the early quantum era: radiant heat, radiation pressure, blackbody and cavity radiation, the Planck distribution law, Wien's displacement and radiation laws, the Rayleigh-Jeans formula, energy quanta, the quantum hypothesis, the photoelectric effect, the light quantum, frequency and intensity dependence, and electron emission from illuminated surfaces.
2. Pre-quantum and early quantum radiation physics: thermal radiation in cavities, the Planck, Wien, and Rayleigh-Jeans distribution laws, radiation pressure on absorbing surfaces, the quantum hypothesis of discrete energy quanta, the photoelectric effect and light-quantum interpretation, and electron emission from surfaces under irradiation, as functions of frequency and intensity.
3. Blackbody radiation and the birth of quantum physics: radiant-heat spectra, cavity-radiation laws (Planck, Wien, Rayleigh-Jeans), radiation pressure, energy quanta of size h nu, the photoelectric effect, the light-quantum hypothesis, frequency and intensity dependences of photoemission, and the emission of electrons from illuminated metals.
4. Early quantum theory of radiation: radiation pressure, blackbody cavity spectra, the Planck distribution and its Wien and Rayleigh-Jeans limits, energy quanta and the quantum hypothesis, the photoelectric effect with its frequency-threshold and intensity-current relations, the light quantum, and electron emission from illuminated surfaces.
5. Radiation physics at the quantum boundary: spectra of blackbody and cavity radiation, the Wien, Rayleigh-Jeans, and Planck laws, radiation pressure, the hypothesis of discrete energy quanta, the photoelectric effect, the light quantum, frequency and intensity dependences of photoemission current, and electron emission from irradiated matter.

### `spectroscopy`

**Description.** Experimental spectroscopy as a laboratory and astronomical practice, distinct from radiation theory and from measurement instrumentation in general: the cataloguing of spectral lines, empirical series formulae (Balmer, Rydberg, Paschen), the Zeeman effect and its interpretation, Stark effect, spectral classification of stars, chemical analysis through characteristic line emission, absorption-line studies of solar and stellar atmospheres, and photographic recording of spectra.

**Aliases.** spectral lines; spectral series; Balmer series; Rydberg formula; Zeeman effect; Stark effect; spectral classification; line emission; solar spectrum; photographic spectra

**Paraphrases (embedded and averaged):**

1. Spectroscopy as a laboratory and astronomical practice: cataloguing of spectral lines, empirical series laws (Balmer, Rydberg, Paschen), the Zeeman magnetic-splitting effect, the Stark electric-field effect, spectral classification of stars, chemical analysis via characteristic emission lines, absorption-line studies of solar and stellar atmospheres, and photographic recording of spectra, treated as distinct from radiation theory and instrumentation.
2. Experimental atomic and astronomical spectroscopy: empirical organization of spectral lines into Balmer, Rydberg, and Paschen series, observation of Zeeman and Stark line splittings under magnetic and electric fields, stellar spectral classification, chemical identification through line emission, absorption studies of solar and stellar atmospheres, and photographic spectrographic technique.
3. Spectroscopy in the late nineteenth and early twentieth centuries: empirical line-series formulae (Balmer, Rydberg, Paschen), Zeeman and Stark effects on spectral lines, stellar spectral classification, chemical analysis via characteristic emission, absorption-line studies of solar and stellar atmospheres, and photographic recording of laboratory and astronomical spectra.
4. Experimental spectroscopy as practiced before modern quantum mechanics: the cataloguing of spectral lines and empirical formulae of the Balmer, Rydberg, and Paschen type, Zeeman and Stark splittings, classification of stellar spectra, chemical analysis through line emission, solar and stellar absorption-line studies, and photographic spectroscopic technique.
5. Spectral line measurement and analysis: empirical series formulae for hydrogen-like and other spectra (Balmer, Rydberg, Paschen), Zeeman magnetic and Stark electric splittings, stellar spectral classification, chemical identification through characteristic emission, absorption-line analysis of solar and stellar atmospheres, and photographic spectra as the primary observational medium.

### `gravitation`

**Description.** Gravitational physics from celestial mechanics through relativistic gravity: the Newtonian inverse-square law, planetary perturbations, the three-body problem, tidal theory, the anomalous advance of Mercury's perihelion as an observational challenge, Le Verrier's calculations, proposed modifications to Newton's law, Nordstrom's scalar theory, Einstein's field equations of 1915, Schwarzschild's exact solution, gravitational lensing predictions, and observational tests at solar eclipses.

**Aliases.** celestial mechanics; planetary perturbations; three-body problem; Mercury perihelion advance; Le Verrier; Nordstrom theory; Einstein field equations; Schwarzschild solution; gravitational lensing; solar eclipse test

**Paraphrases (embedded and averaged):**

1. Gravitational physics from Newton through Einstein: the inverse-square law, planetary perturbation theory, the three-body problem, tidal forces, the unexplained advance of Mercury's perihelion, Le Verrier's calculations, proposed modifications of Newtonian gravity, Nordstrom's scalar theory, Einstein's 1915 field equations, Schwarzschild's exact solution, gravitational lensing predictions, and solar-eclipse observational tests.
2. Gravity as physics: classical celestial mechanics under Newton's inverse-square law, planetary perturbations and the three-body problem, tidal theory, the anomaly in Mercury's perihelion advance and Le Verrier's calculations, modified-Newtonian proposals, Nordstrom's scalar gravity, the general-relativistic field equations and Schwarzschild solution, gravitational lensing, and solar-eclipse tests.
3. From Newtonian to Einsteinian gravity: inverse-square attraction, planetary orbital perturbations, the three-body problem, ocean tides, the Mercury perihelion anomaly as an observational anomaly, modifications to Newton's law, Nordstrom's scalar theory, Einstein's 1915 field equations and the Schwarzschild metric, predicted light deflection by the Sun, and eclipse-based tests.
4. Gravitational theory across the relativistic transition: Newton's inverse-square force, planetary perturbation theory, three-body dynamics, tidal effects, the Mercury perihelion problem and Le Verrier's analysis, proposed deviations from Newton, Nordstrom's scalar gravitation, Einstein's field equations of 1915, Schwarzschild's solution, gravitational deflection of light, and solar-eclipse measurements.
5. Celestial mechanics and gravitational theory: the Newtonian inverse-square law, perturbations of planetary orbits, the restricted three-body problem, tidal phenomena, anomalous advance of Mercury's perihelion as an empirical challenge to Newton, Le Verrier's calculation of the anomaly, modified-gravity proposals, Nordstrom's pre-Einsteinian scalar theory, Einstein's 1915 field equations, the Schwarzschild geometry, gravitational lensing, and solar-eclipse expeditions.

### `instrumentation_measurement`

**Description.** Measurement practice and physical instrumentation: precision instruments, interferometers, spectrometers, balances, thermometers, barometers, electrical measurement, optical measurement, standards, calibration, experimental error, metrology, observations, and laboratory methods.

**Aliases.** measurement; instrumentation; precision measurement; calibration; standard of length; standard of time; experimental error; thermometer; barometer

**Paraphrases (embedded and averaged):**

1. Physical instrumentation and measurement practice: precision instruments, interferometers, spectrometers, balances, thermometers, barometers, electrical and optical measurement techniques, standards of units, calibration procedures, experimental error analysis, metrology, observational technique, and laboratory methods.
2. Experimental measurement and instrumentation in laboratory physics: precision interferometers and spectrometers, balances, thermometers, barometers, electrical and optical measurement apparatus, primary standards, calibration of instruments, characterization of experimental error, metrology as a discipline, observational protocols, and general laboratory methodology.
3. Laboratory instrumentation and the practice of physical measurement: high-precision instruments (interferometers, spectrometers, balances, thermometers, barometers), measurement of electrical and optical quantities, maintenance of physical standards, calibration procedures, experimental-error analysis, metrological standards, observational practice, and laboratory technique.
4. Precision measurement as a physical practice: interferometers and spectrometers, mass and force balances, thermometers and barometers, electrical and optical metrology, measurement standards, instrument calibration, treatment of experimental error, metrology, and the general methodology of laboratory observation.
5. Physical metrology and instrumentation: interferometric and spectroscopic instruments, balances, thermometers, barometers, electrical and optical measurement apparatus, definition and maintenance of units, calibration, experimental-error analysis, observational technique, and laboratory practice as a physical discipline distinct from particular measurements.

## Godel incompleteness (1900-1970)

Target concept: `incompleteness`

### `incompleteness`  **(target)**

**Description.** Goedel's incompleteness theorems; undecidability of consistent formal systems; Goedel numbering; self-referential sentences; arithmetic truth unprovable within the system; limits of formal axiomatics.

**Aliases.** incompleteness theorem; undecidability; Goedel numbering; self-reference; unprovability

**Paraphrases (embedded and averaged):**

1. Goedel's incompleteness theorems for sufficiently strong consistent formal systems: arithmetization via Goedel numbering, construction of self-referential sentences, the first theorem establishing the existence of true-but-unprovable statements, the second theorem on the unprovability of system consistency from within, and the inherent limits of formal axiomatic mathematics.
2. The 1931 incompleteness results: any consistent recursively axiomatized system extending elementary arithmetic contains arithmetic truths that are not derivable within it, established via Goedel numbering and the diagonal construction of self-referential sentences, with the corollary that the system's own consistency cannot be proved internally.
3. Limits of formal axiomatics: through Goedel numbering and self-referential diagonal sentences, Goedel showed that any consistent formal system rich enough to express arithmetic must contain undecidable propositions, and that the consistency of such a system cannot be formally established within itself.
4. Goedelian undecidability: arithmetization of syntax via Goedel numbers, construction of a self-referential sentence asserting its own unprovability, first incompleteness theorem on the existence of true-but-unprovable arithmetic statements in any consistent system extending Peano arithmetic, and second incompleteness theorem on internal unprovability of consistency.
5. The incompleteness phenomena of mathematical logic: Goedel numbering as a coding of syntax into arithmetic, the diagonal lemma yielding self-referential sentences, formal systems whose consistency forces incompleteness, and the boundedness of formal axiomatic methods relative to mathematical truth.

### `hilbert_program`

**Description.** Hilbert's program for foundations of mathematics; consistency proofs by finitary methods; formalization of mathematics; completeness and decidability as goals; metamathematics.

**Aliases.** Hilbert's program; consistency proof; finitism; formalization; metamathematics

**Paraphrases (embedded and averaged):**

1. Hilbert's foundational program for mathematics: complete formalization of mathematical reasoning, the goal of finitary consistency proofs, completeness and decidability as guiding aspirations, and metamathematics as the meta-level study of formal systems.
2. The Hilbert program in the philosophy of mathematics: formalization of mathematical theories within axiomatic systems, the requirement that consistency be proved by finitary, intuitively safe methods, and the long-term goals of completeness and decidability, framed within metamathematics.
3. Hilbert's foundationalist project: explicit formalization of mathematics, proofs of consistency restricted to finitary combinatorial means, the formulation of completeness and effective decidability as ideal properties of formal systems, and the development of metamathematics as the meta-theoretic study of such systems.
4. Foundations of mathematics in the Hilbertian sense: full formalization, finitary consistency proofs for the resulting formal calculi, sought-after completeness and decidability, and the metamathematical methodology of treating formal systems as objects of mathematical study.
5. The early-twentieth-century Hilbert program: formalize mathematics, prove the consistency of the formal systems by finitary methods, exhibit their completeness and decidability where possible, and develop metamathematics as a discipline.

### `axiomatic_set_theory`

**Description.** Axiomatic set theory; Zermelo-Fraenkel axioms; axiom of choice; well-ordering; ordinal and cardinal arithmetic; continuum hypothesis.

**Aliases.** Zermelo-Fraenkel; axiom of choice; ZFC; set theory axioms; ordinal arithmetic

**Paraphrases (embedded and averaged):**

1. Axiomatic set theory: the Zermelo-Fraenkel axiom system with and without the axiom of choice (ZF and ZFC), well-ordering and its consequences, ordinal and cardinal arithmetic, transfinite induction, and the continuum hypothesis as an undecidable statement of cardinality.
2. Foundational set theory in axiomatic form: Zermelo-Fraenkel axioms, the axiom of choice and its equivalents, well-ordering of arbitrary sets, ordinal and cardinal arithmetic in the transfinite, and the status of the continuum hypothesis.
3. Zermelo-Fraenkel axiomatic set theory together with the axiom of choice (ZFC): well-ordering principle, ordinal and cardinal arithmetic, transfinite hierarchy, and Cantor's continuum hypothesis as an outstanding undecidable problem.
4. Modern axiomatic set theory: the Zermelo-Fraenkel axioms, the axiom of choice and well-ordering, the transfinite arithmetic of ordinals and cardinals, and the continuum hypothesis as a benchmark independence question.
5. Set theory on axiomatic foundations: Zermelo-Fraenkel axioms (ZF), the axiom of choice (yielding ZFC) and equivalents such as Zorn's lemma and the well-ordering theorem, ordinal and cardinal arithmetic, and the continuum hypothesis.

### `type_theory`

**Description.** Type theory and logicism; Russell and Whitehead's Principia Mathematica; theory of types to avoid paradoxes; ramified type hierarchy; reducibility axiom.

**Aliases.** type theory; logicism; Principia Mathematica; Russell; theory of types

**Paraphrases (embedded and averaged):**

1. Logicism and the theory of types: the Russell-Whitehead Principia Mathematica program of deriving mathematics from logic, the simple and ramified theories of types introduced to block self-referential paradoxes, the type hierarchy, and the axiom of reducibility.
2. Type theory as a foundation for mathematics: Russell and Whitehead's Principia Mathematica, the construction of a typed hierarchy to avoid the Russell-paradox class of antinomies, the ramified type system, and the reducibility axiom needed to recover ordinary mathematics.
3. The logicist program and its type-theoretic apparatus: Principia Mathematica, theory of types as a paradox-avoiding stratification of propositional and predicate logic, ramified type hierarchy, and Russell's axiom of reducibility.
4. Logicism in the Russell-Whitehead tradition: derive mathematics from pure logic via the typed predicate calculus of Principia Mathematica, with the ramified hierarchy of types preventing impredicative self-reference, supplemented by the axiom of reducibility.
5. Types and the logicist reduction of mathematics: Russell and Whitehead's typed predicate logic in Principia Mathematica, ramified type theory designed to block paradox, and the reducibility axiom required for analysis.

### `intuitionism`

**Description.** Brouwer's intuitionism and mathematical constructivism; rejection of excluded middle; constructive existence proofs; choice sequences; Heyting's formalization of intuitionistic logic.

**Aliases.** intuitionism; constructivism; Brouwer; Heyting; excluded middle rejection

**Paraphrases (embedded and averaged):**

1. Brouwerian intuitionism and constructive mathematics: rejection of the law of excluded middle for infinite domains, insistence on constructive existence proofs, the device of choice sequences for analyzing the continuum, and Heyting's formalization of intuitionistic propositional and predicate logic.
2. Intuitionistic foundations of mathematics: Brouwer's constructivist program, denial of the unrestricted excluded middle, constructive (witness-providing) existence proofs, choice sequences as a treatment of the intuitive continuum, and the Heyting calculus formalizing intuitionistic logic.
3. Mathematical constructivism in the Brouwer tradition: rejection of classical excluded middle, demand for constructive existence proofs that exhibit witnesses, the theory of choice sequences as an account of the continuum, and Heyting's syntactic formalization of intuitionistic logic.
4. Brouwer's intuitionism: a constructivist philosophy of mathematics rejecting non-constructive existence claims and the unrestricted excluded middle, formalized in the intuitionistic logic of Heyting, with choice sequences supporting an intuitionistic real analysis.
5. Intuitionistic mathematics: constructive existence proofs replace classical non-constructive ones, the law of excluded middle is dropped for infinite collections, the continuum is approached via choice sequences, and the resulting logic is given a formal syntactic treatment by Heyting.

### `computability`

**Description.** Recursive function theory and computability; Turing machines; Church's lambda calculus; Church-Turing thesis; halting problem; effective decidability; Kleene's recursion theory.

**Aliases.** Turing machine; lambda calculus; Church-Turing thesis; halting problem; recursive function

**Paraphrases (embedded and averaged):**

1. Recursive-function theory and the formalization of computation: Turing machines, Church's lambda calculus, the Church-Turing thesis identifying these models with effective computability, the unsolvability of the halting problem, effective decidability, and Kleene's general theory of recursive functions.
2. Theory of computability: equivalent formalisms of computation (Turing machines, lambda calculus, partial recursive functions), the Church-Turing thesis, the halting problem as a canonical undecidable problem, and Kleene's recursion-theoretic framework.
3. Computation as a mathematical object: Turing's machine model, Church's lambda calculus, their extensional equivalence and the Church-Turing identification of these with effective computability, the halting problem and other undecidable problems, and Kleene's recursive function theory.
4. Recursion theory and computability: definitions of effective computation by Turing machines and by Church's lambda calculus, the Church-Turing thesis, undecidable problems including the halting problem, effective decidability, and Kleene's recursion-theoretic apparatus.
5. The mathematics of computation in the 1930s: Turing machines, lambda calculus, the Church-Turing thesis, halting problem as a paradigm undecidable problem, the notion of effective decidability, and Kleene's systematic treatment of recursive functions.

### `model_theory`

**Description.** Model theory; satisfaction and truth in structures; completeness theorem; compactness theorem; Loewenheim-Skolem theorem; elementary equivalence.

**Aliases.** model theory; completeness theorem; compactness; Loewenheim-Skolem; satisfaction

**Paraphrases (embedded and averaged):**

1. Model theory: structures as interpretations of formal languages, satisfaction and truth, Goedel's completeness theorem for first-order logic, the compactness theorem, the Loewenheim-Skolem theorem on cardinalities of models, and elementary equivalence between structures.
2. First-order model theory: notion of satisfaction in a structure, completeness theorem linking provability and validity, compactness theorem, downward and upward Loewenheim-Skolem theorems, and elementary equivalence.
3. Model-theoretic foundations of logic: truth in structures, the completeness of first-order logic, compactness as a model-existence principle, Loewenheim-Skolem theorems on the existence of small and large models, and elementary equivalence between structures.
4. Model theory as a branch of mathematical logic: structures, satisfaction relations, completeness of first-order deduction, compactness, the Loewenheim-Skolem cardinality theorems, and the relation of elementary equivalence.
5. The theory of mathematical structures viewed model-theoretically: satisfaction and truth, completeness and compactness theorems for first-order logic, downward and upward Loewenheim-Skolem theorems, and elementary equivalence.

### `proof_theory`

**Description.** Proof theory and ordinal analysis; Gentzen's consistency proof for arithmetic; cut elimination; sequent calculus; natural deduction; proof-theoretic ordinals.

**Aliases.** proof theory; Gentzen; cut elimination; sequent calculus; ordinal analysis

**Paraphrases (embedded and averaged):**

1. Proof theory and ordinal analysis: Gentzen's consistency proof for first-order Peano arithmetic by transfinite induction up to epsilon-zero, cut elimination, the sequent calculus and natural deduction as proof systems, and proof-theoretic ordinals as measures of strength.
2. The Gentzen-style proof theory: sequent calculus, natural deduction, the cut elimination theorem, Gentzen's ordinal consistency proof for arithmetic, and proof-theoretic ordinals classifying the strength of formal systems.
3. Structural proof theory: formal proofs as objects in sequent calculus or natural deduction, the cut-elimination theorem, Gentzen's consistency proof for arithmetic via transfinite induction, and the assignment of proof-theoretic ordinals to formal systems.
4. Proof-theoretic study of formal arithmetic: cut elimination in sequent calculus, natural deduction, Gentzen's consistency proof using ordinals up to epsilon-zero, and the use of proof-theoretic ordinals as invariants of theories.
5. Proof theory after Gentzen: sequent calculus and natural deduction, cut-elimination theorem, consistency of arithmetic via transfinite induction on proof-theoretic ordinals, and ordinal analysis as a measure of theory strength.

### `algebraic_logic`

**Description.** Algebraic approaches to logic; Boolean algebras; lattice theory; relation algebras; algebraization of predicate logic.

**Aliases.** Boolean algebra; algebraic logic; lattice theory; relation algebra

**Paraphrases (embedded and averaged):**

1. Algebraic approaches to logic: Boolean algebras as the algebraic semantics of classical propositional logic, lattice-theoretic generalizations, relation algebras, and the algebraization of predicate logic via cylindric and polyadic algebras.
2. Logic studied algebraically: Boolean algebras for classical propositional logic, more general lattice structures, relation algebras following Tarski, and algebraic counterparts of first-order logic.
3. The algebraic side of logic: Boolean algebras, lattice theory, Tarski-style relation algebras, and the algebraic translation of quantified predicate logic into operations on algebras of relations.
4. Algebraic logic: representation of propositional logic by Boolean algebras, lattice-theoretic abstractions, Tarski's relation algebras, and algebraic formalizations of predicate logic.
5. Algebraization of logic in the Tarski tradition: Boolean and lattice-theoretic semantics of propositional logic, relation algebras, and algebraic structures encoding the logical operations of predicate calculus.

### `propositional_calculus`

**Description.** Formalization of propositional and predicate logic; axiom systems; deduction theorem; decision procedures; satisfiability; normal forms; quantifier elimination.

**Aliases.** propositional logic; predicate calculus; deduction theorem; satisfiability; quantifier elimination

**Paraphrases (embedded and averaged):**

1. Formal propositional and predicate logic: Hilbert-style axiom systems and natural-deduction calculi, the deduction theorem, decision procedures for propositional logic, satisfiability, normal forms (conjunctive and disjunctive), and quantifier elimination for tractable predicate theories.
2. Classical logic in formal form: axiomatic and natural-deduction formulations of propositional and predicate calculus, the deduction theorem, decision procedures for propositional satisfiability, conjunctive and disjunctive normal forms, and quantifier-elimination results.
3. Formalized logic: propositional and first-order predicate calculi, axiom systems and deductive apparatus, the deduction theorem, decision procedures for satisfiability, normal-form theorems, and quantifier elimination for decidable theories.
4. The propositional and predicate calculus as formal systems: axiomatic presentations, the deduction theorem, decidability and the satisfiability problem for propositional logic, normal forms, and quantifier-elimination methods in algebra and analysis.
5. Formalizations of mathematical logic: axiom systems for propositional and predicate calculus, deduction theorem, decision procedures for satisfiability, normal-form representations, and quantifier-elimination algorithms.

## Higgs mechanism (1955-1980)

Target concept: `higgs_mechanism`

### `higgs_mechanism`  **(target)**

**Description.** Spontaneous symmetry breaking in gauge theories; scalar field acquiring vacuum expectation value gives mass to gauge bosons; Higgs boson as residual excitation of the symmetry-breaking field.

**Aliases.** Higgs mechanism; spontaneous symmetry breaking; BEH mechanism; Brout-Englert-Higgs; scalar field mass generation

**Paraphrases (embedded and averaged):**

1. The Brout-Englert-Higgs mechanism: spontaneous breaking of a local gauge symmetry through a scalar field acquiring a nonzero vacuum expectation value, which generates masses for the otherwise massless gauge bosons; the physical Higgs boson appears as the residual quantum of the symmetry-breaking field.
2. Mass generation in gauge field theory through spontaneous symmetry breaking: a scalar (Higgs) field with a Mexican-hat potential acquires a vacuum expectation value, the would-be Goldstone bosons are absorbed by the gauge fields, and the remaining radial excitation is the Higgs boson.
3. The Higgs mechanism in non-abelian gauge theory: spontaneous breaking of gauge symmetry by a complex scalar field, vacuum expectation value of the scalar generating gauge boson masses, gauge bosons eating would-be Goldstone modes, and the surviving physical excitation appearing as a massive scalar Higgs boson.
4. Generation of gauge boson masses via spontaneous symmetry breaking, originally proposed by Brout, Englert, Higgs, Guralnik, Hagen, and Kibble: a scalar field with nonzero vacuum expectation value breaks the gauge symmetry, gauge bosons acquire longitudinal degrees of freedom and masses, and the radial mode of the scalar is the Higgs boson.
5. Spontaneous symmetry breaking applied to local gauge symmetries: a fundamental scalar field develops a nonzero vacuum expectation value, masses are dynamically generated for the gauge bosons without violating gauge invariance of the Lagrangian, and the residual scalar excitation around the broken vacuum is identified as the Higgs particle.

### `gauge_theories`

**Description.** Non-abelian gauge field theories based on local symmetry groups; Yang-Mills theory; gauge invariance and gauge bosons as force carriers.

**Aliases.** Yang-Mills; non-abelian gauge theory; gauge invariance; gauge bosons

**Paraphrases (embedded and averaged):**

1. Non-abelian gauge field theories: Yang-Mills construction of field theories invariant under local transformations of a non-abelian symmetry group, gauge invariance as a foundational principle, and gauge bosons as the mediators of the corresponding interactions.
2. Yang-Mills gauge theory: the general framework of field theories whose Lagrangian is invariant under spacetime-dependent transformations of a non-abelian Lie group, with gauge bosons appearing as connection fields and mediating the interaction.
3. Field theories built on local symmetry: non-abelian gauge groups, Yang-Mills construction, the gauge field as a connection ensuring covariance under local transformations, and gauge bosons as the force carriers of the theory.
4. Non-abelian gauge theories of the Yang-Mills type: vector bosons identified as gauge connections of a local non-abelian symmetry group, self-interacting due to the non-commutative algebra, and serving as carriers of the corresponding force.
5. Local-symmetry field theories: gauge invariance under non-abelian groups in the Yang-Mills sense, gauge fields as bosonic mediators of interactions, and the universal coupling structure imposed by the gauge principle.

### `weak_interactions`

**Description.** Theory of weak nuclear force; beta decay; four-fermion Fermi interaction; V-A structure; intermediate vector boson hypothesis.

**Aliases.** weak force; beta decay; Fermi interaction; V-A theory; intermediate vector boson

**Paraphrases (embedded and averaged):**

1. Theory of the weak nuclear force in the pre-electroweak era: beta decay phenomenology, Fermi's four-fermion contact interaction, the V minus A vector-axial-vector structure of the weak current, and the hypothesis of an intermediate vector boson as the underlying force mediator.
2. Weak interactions before unification: nuclear beta decay, Fermi's effective four-fermion theory, the V-A current-current Lagrangian implied by parity-violation experiments, and the proposed massive intermediate vector boson as the carrier of the weak force.
3. Phenomenology of the weak force: beta-decay rates and selection rules, Fermi's contact-interaction theory of beta decay, the V-A structure of the leptonic and hadronic weak currents, and the intermediate vector boson hypothesis.
4. Pre-Higgs weak interaction theory: four-fermion Fermi interaction for beta decay, parity violation and the V-A current structure, and the conjectured intermediate vector boson responsible for the weak force at short distance.
5. Weak nuclear interactions in the V minus A era: beta decay as the canonical weak process, Fermi's four-fermion effective Lagrangian, the vector-minus-axial-vector form of the charged current, and the intermediate vector boson hypothesis as a precursor to gauge unification.

### `qed_radiative`

**Description.** Quantum electrodynamics higher-order calculations; renormalization procedures; radiative corrections; Lamb shift; anomalous magnetic moment.

**Aliases.** QED; radiative corrections; renormalization; Lamb shift

**Paraphrases (embedded and averaged):**

1. Higher-order quantum electrodynamics: renormalization procedures handling ultraviolet divergences, radiative corrections to electromagnetic processes, the Lamb shift in hydrogen, and the anomalous magnetic moment of the electron as a benchmark precision test.
2. QED radiative-correction calculations: perturbative expansion in the fine-structure constant, renormalization of mass and charge, computation of the Lamb shift, and the electron's anomalous magnetic moment (g-2).
3. Quantum electrodynamics beyond tree level: vacuum polarization, vertex corrections, and self-energy diagrams, renormalization removing ultraviolet divergences, the Lamb shift between hydrogen levels, and the anomalous magnetic moment of the electron.
4. Precision QED: radiative corrections in the perturbative expansion, the renormalization program of Tomonaga, Schwinger, Feynman, and Dyson, the Lamb shift measurement and calculation, and the electron g-factor anomaly.
5. Higher-order quantum electrodynamics: systematic renormalization of charge and mass, radiative corrections at one and two loops, the Lamb shift in atomic hydrogen, and the anomalous magnetic moment of the electron as a high-precision test of the theory.

### `s_matrix_bootstrap`

**Description.** S-matrix theory and nuclear democracy; Regge poles and trajectories; bootstrap hypothesis; duality; Veneziano amplitude.

**Aliases.** S-matrix; bootstrap; Regge theory; Regge poles; Veneziano model

**Paraphrases (embedded and averaged):**

1. S-matrix theory of the strong interactions: nuclear-democratic equal status of all hadrons, Regge poles and trajectories organizing hadronic spectra, the bootstrap hypothesis that hadrons are self-consistently composed of one another, dual-resonance models, and the Veneziano amplitude as an explicit duality-respecting four-point amplitude.
2. Pre-QCD strong-interaction theory: the on-shell S-matrix as the fundamental observable, Regge-pole exchange and Regge trajectories, bootstrap and nuclear-democracy ideas, duality between s- and t-channel descriptions, and the Veneziano dual amplitude.
3. S-matrix and bootstrap programs of the 1960s: Regge poles and Regge trajectories, dual-resonance models, the bootstrap hypothesis of self-consistent hadronic dynamics without distinguished elementary particles, and the Veneziano four-point function.
4. Hadronic S-matrix theory: analytic and unitary on-shell amplitudes, Regge-pole exchange, the bootstrap idea that strong-interaction amplitudes determine themselves self-consistently, finite-energy duality, and the Veneziano amplitude.
5. The S-matrix program for strong interactions: Regge-pole and Regge-trajectory description of hadron exchange, the bootstrap hypothesis of nuclear democracy, finite-energy sum rules and duality, and the Veneziano amplitude as a prototype dual model.

### `current_algebra`

**Description.** Current algebra and PCAC; soft pion theorems; chiral symmetry breaking; Adler-Weisberger sum rule; partially conserved axial current.

**Aliases.** current algebra; PCAC; soft pion theorems; chiral symmetry

**Paraphrases (embedded and averaged):**

1. Current algebra and PCAC: the algebra of vector and axial-vector currents based on chiral symmetry, the hypothesis of a partially conserved axial current, soft-pion low-energy theorems, the Adler-Weisberger sum rule, and the role of spontaneous chiral symmetry breaking in hadronic physics.
2. Algebra of hadronic currents: SU(2) x SU(2) chiral current algebra, partially conserved axial current (PCAC), soft-pion theorems relating amplitudes at low momentum, the Adler-Weisberger sum rule, and the implicit pattern of spontaneous chiral symmetry breaking.
3. Pre-QCD chiral phenomenology: the algebra of vector and axial currents, PCAC relating divergence of the axial current to the pion field, soft-pion low-energy theorems, the Adler-Weisberger sum rule for axial coupling, and chiral symmetry breaking.
4. Current algebra of the 1960s: SU(2) x SU(2) commutation relations of hadronic vector and axial currents, the partially conserved axial current hypothesis, soft-pion theorems, Adler-Weisberger sum rule, and the chiral-symmetry-breaking picture underlying the pion.
5. Hadronic current algebra together with PCAC: vector and axial-current commutators, soft-pion low-energy theorems, partially conserved axial current relating to the pion as Goldstone boson, the Adler-Weisberger sum rule, and chiral symmetry breaking in QCD-like vacuum.

### `quark_model`

**Description.** Quark model of hadrons; SU(3) flavor symmetry; eightfold way; fractionally charged constituents; deep inelastic scattering partons.

**Aliases.** quark model; SU(3) flavor; eightfold way; partons

**Paraphrases (embedded and averaged):**

1. The quark model of hadrons: hadrons composed of fractionally charged constituents (quarks), the SU(3) flavor symmetry organizing hadron multiplets, Gell-Mann's eightfold way, and the parton interpretation of deep inelastic electron-proton scattering.
2. Quark constituents of hadrons: SU(3) flavor symmetry classifying baryons and mesons via the eightfold way, fractional electric charges of the quark constituents, and partons revealed in the high-momentum-transfer regime of deep inelastic scattering.
3. The Gell-Mann-Zweig quark model: hadrons built from fractionally charged quarks, the SU(3) flavor classification of baryons and mesons, the eightfold-way patterns, and the parton picture of deep inelastic lepton-hadron scattering.
4. Hadronic structure in the quark model: SU(3) flavor multiplets via the eightfold way, fractional-charge quarks as constituents of mesons and baryons, partons as the high-energy scattering quanta in deep inelastic scattering.
5. Quark model and SU(3) flavor classification: hadrons as bound states of fractionally charged quarks, the eightfold way for baryons and mesons, and the parton model of deep inelastic scattering.

### `strong_interactions`

**Description.** Strong nuclear force phenomenology before QCD; nuclear potentials; meson exchange; pion physics; nucleon-nucleon scattering.

**Aliases.** strong force; nuclear force; meson exchange; pion physics

**Paraphrases (embedded and averaged):**

1. Phenomenology of the strong nuclear force prior to QCD: nuclear potentials between nucleons, Yukawa-style meson exchange, pion physics, and nucleon-nucleon scattering experiments organizing the residual nuclear force.
2. Pre-QCD strong-interaction physics: nuclear-potential models of the nucleon-nucleon interaction, one-pion and heavier-meson exchange, pion-nucleon scattering, and the phenomenological account of the residual strong force.
3. Strong interactions in the era before quantum chromodynamics: nuclear potentials from meson-exchange phenomenology, pion physics and pion-nucleon coupling, nucleon-nucleon scattering data, and the picture of the strong force as residual interaction between hadrons.
4. Nuclear strong-force physics: Yukawa-meson-exchange potentials between nucleons, pion physics, nucleon-nucleon elastic and inelastic scattering, and the phenomenological treatment of the strong interaction before QCD.
5. Strong nuclear interactions as residual phenomena: nuclear potentials, meson exchange (especially pions and rho), pion-nucleon dynamics, and nucleon-nucleon scattering, prior to the introduction of QCD.

### `electroweak_unification`

**Description.** Unified theory of electromagnetic and weak interactions; Weinberg-Salam model; SU(2)xU(1) gauge group; neutral currents; W and Z boson predictions.

**Aliases.** electroweak; Weinberg-Salam; neutral currents; SU(2)xU(1)

**Paraphrases (embedded and averaged):**

1. Electroweak unification in the Weinberg-Salam model: SU(2) x U(1) gauge group spontaneously broken to U(1) electromagnetism, weak neutral currents as a key prediction, and massive W-plus, W-minus, and Z bosons as gauge mediators.
2. Unified theory of electromagnetic and weak interactions: SU(2) x U(1) gauge symmetry of Weinberg, Salam, and Glashow, the predicted neutral-current weak processes, and the W and Z vector bosons as gauge mediators.
3. Glashow-Weinberg-Salam electroweak theory: SU(2)-isospin times U(1)-hypercharge gauge group, spontaneous breaking to U(1)-electromagnetism, predicted neutral weak currents, and the W and Z gauge bosons.
4. Electroweak gauge unification: SU(2) x U(1) gauge structure, prediction of weak neutral currents observed at Gargamelle, and the W-plus, W-minus, and Z gauge bosons of the Weinberg-Salam model.
5. Unification of electromagnetism with the weak interaction: the SU(2) x U(1) Weinberg-Salam gauge model, neutral-current predictions confirmed experimentally, and the W and Z bosons as massive gauge mediators.

### `renormalizability`

**Description.** Proof of renormalizability of non-abelian gauge theories; 't Hooft-Veltman dimensional regularization; Ward identities; unitarity of massive gauge theories.

**Aliases.** renormalizability proof; dimensional regularization; 't Hooft; Veltman

**Paraphrases (embedded and averaged):**

1. The 't Hooft-Veltman proof of renormalizability of non-abelian gauge theories: dimensional regularization as a gauge-invariant regulator, Ward and Slavnov-Taylor identities ensuring cancellation of divergences, and the unitarity of spontaneously broken massive gauge theories.
2. Renormalizability of spontaneously broken Yang-Mills theories: 't Hooft's demonstration via dimensional regularization, generalized Ward identities controlling counterterm structure, and the unitarity of massive non-abelian gauge theories.
3. Proof of renormalizability for non-abelian gauge theories: the dimensional regularization scheme of 't Hooft and Veltman, Ward-Takahashi and Slavnov-Taylor identities, and the consistency of massive gauge theories with unitarity.
4. Renormalization of gauge theories with spontaneous symmetry breaking: 't Hooft-Veltman dimensional regularization preserving gauge invariance, generalized Ward identities, and the proof that massive non-abelian gauge theories are perturbatively unitary.
5. Renormalizability of the electroweak gauge theory: dimensional regularization, Ward and Slavnov-Taylor identities for non-abelian gauge symmetries, unitarity of the massive gauge sector, and the 't Hooft-Veltman proof.

## Deep learning (2005-2018)

Target concept: `deep_learning`

### `deep_learning`  **(target)**

**Description.** Deep neural networks with multiple hidden layers trained by backpropagation; convolutional neural networks for image recognition; dropout regularization; GPU-accelerated training; representation learning from raw data.

**Aliases.** deep learning; deep neural network; convolutional neural network; CNN; backpropagation; representation learning

**Paraphrases (embedded and averaged):**

1. Deep learning circa 2012: multilayer neural networks trained end-to-end by backpropagation, convolutional architectures for large-scale image recognition (AlexNet on ImageNet), dropout as a regularizer, GPU-accelerated stochastic gradient descent, and representation learning that replaces hand-crafted features with hierarchical features learned from raw data.
2. Deep neural networks at the AlexNet moment: many-layer architectures trained via backpropagation and stochastic gradient descent, convolutional layers for vision, dropout regularization, GPU-based training on large datasets, and the shift from engineered features to learned representations.
3. Modern deep learning: convolutional and fully-connected deep networks trained by backpropagation, the AlexNet ImageNet breakthrough as a paradigm case, dropout to mitigate overfitting, GPU acceleration of dense matrix operations, and feature hierarchies learned directly from raw pixels or signals.
4. End-to-end representation learning with deep neural networks: many-layer architectures (notably convolutional neural networks for vision), backpropagation training, dropout and related regularization, GPU-trained large models, and the displacement of hand-crafted feature engineering by learned representations.
5. Deep learning as it emerged around 2012: backpropagation-trained deep networks (including convolutional networks for image classification), dropout regularization, GPU-accelerated optimization, and representation learning that extracts hierarchical features directly from raw input data.

### `kernel_methods`

**Description.** Support vector machines and kernel methods; reproducing kernel Hilbert spaces; margin maximization; kernel trick for nonlinear classification.

**Aliases.** SVM; support vector machine; kernel methods; RKHS; margin classifier

**Paraphrases (embedded and averaged):**

1. Kernel methods and support vector machines: large-margin classifiers in reproducing kernel Hilbert spaces, the kernel trick mapping data implicitly into high-dimensional feature spaces, and convex optimization for nonlinear classification.
2. Support vector machines and the kernel framework: margin-maximizing classifiers, reproducing kernel Hilbert spaces underlying the kernel trick, and nonlinear classification via implicit high-dimensional feature mappings.
3. Kernel-based machine learning: SVMs as margin-maximizing classifiers, RKHS theory, the kernel trick enabling nonlinear separation, and the convex-optimization formulation underlying these methods.
4. Margin classifiers and kernel methods: support vector machines, reproducing kernel Hilbert spaces, the kernel trick for nonlinear classification and regression, and convex quadratic-programming training.
5. Pre-deep-learning supervised learning via kernel methods: support vector machines maximizing margin, reproducing kernel Hilbert spaces, and the kernel trick for implicit nonlinear feature maps.

### `graphical_models`

**Description.** Probabilistic graphical models; Bayesian networks; Markov random fields; belief propagation; variational inference; expectation maximization.

**Aliases.** graphical models; Bayesian networks; Markov random field; belief propagation

**Paraphrases (embedded and averaged):**

1. Probabilistic graphical models: directed Bayesian networks and undirected Markov random fields encoding joint distributions, inference algorithms including belief propagation and variational methods, and expectation-maximization for latent-variable estimation.
2. Graphical-model framework for probabilistic machine learning: Bayesian networks, Markov random fields, message-passing and belief propagation inference, variational inference for intractable posteriors, and expectation-maximization for hidden-variable models.
3. Probabilistic models on graphs: directed and undirected graphical models (Bayesian networks, Markov random fields), exact and approximate inference via belief propagation and variational methods, and EM for latent-variable learning.
4. The graphical-models tradition: encoding joint probability distributions over many variables in directed and undirected graphs, inference by belief propagation or variational approximation, and parameter estimation by expectation-maximization.
5. Probabilistic graphical models in machine learning: Bayesian networks, Markov random fields, sum-product and max-product belief propagation, variational inference, and the EM algorithm for latent-variable models.

### `ensemble_methods`

**Description.** Ensemble learning methods; random forests; gradient boosting; bagging; AdaBoost; decision tree ensembles for classification and regression.

**Aliases.** random forest; gradient boosting; AdaBoost; ensemble learning; bagging

**Paraphrases (embedded and averaged):**

1. Ensemble learning methods: bagging and random forests, gradient boosting (including XGBoost-style implementations), AdaBoost, and decision-tree ensembles applied to classification and regression.
2. Tree-ensemble methods for supervised learning: random forests built by bagging decision trees, gradient-boosted regression and classification trees, AdaBoost as adaptive boosting, and ensemble combinations of weak learners.
3. Ensembles of decision trees: random forests, gradient boosting machines, AdaBoost, and bagging as variance-reduction strategies for classification and regression.
4. Pre-deep-learning competitive supervised learning via ensembles: random forests, gradient-boosted trees, AdaBoost, bagging, and other weak-learner combinations for structured-data classification and regression.
5. Ensemble methods in classical machine learning: random forests, gradient boosting, AdaBoost, bagging, and decision-tree ensembles widely used for tabular classification and regression.

### `dimensionality_reduction`

**Description.** Dimensionality reduction and manifold learning; PCA; t-SNE; spectral methods; autoencoders; feature extraction.

**Aliases.** PCA; t-SNE; manifold learning; dimensionality reduction; feature extraction

**Paraphrases (embedded and averaged):**

1. Dimensionality reduction and manifold learning: principal component analysis, t-SNE, spectral embedding methods, autoencoder-based nonlinear reductions, and unsupervised feature extraction.
2. Methods for reducing data dimension: linear PCA, nonlinear t-SNE for visualization, spectral methods on graph Laplacians, autoencoder-based representations, and feature-extraction pipelines.
3. Unsupervised dimension reduction: PCA, t-SNE, Laplacian-eigenmaps and other spectral methods, autoencoders for nonlinear compression, and general feature-extraction techniques.
4. Manifold-learning and dimensionality-reduction techniques: PCA as a linear baseline, t-SNE for visualization, spectral and Laplacian-eigenmap methods, autoencoders, and feature-extraction methods generally.
5. Reducing high-dimensional data to lower-dimensional representations: PCA, t-SNE, spectral methods, autoencoders, and other unsupervised feature-extraction approaches.

### `reinforcement_learning`

**Description.** Reinforcement learning; Markov decision processes; Q-learning; policy gradient methods; temporal difference learning; exploration.

**Aliases.** reinforcement learning; Q-learning; policy gradient; MDP; temporal difference

**Paraphrases (embedded and averaged):**

1. Reinforcement learning: Markov decision processes as a model, value-based methods such as Q-learning, policy-gradient methods, temporal-difference learning, and exploration-exploitation strategies for sequential decision making.
2. Sequential decision making by trial and error: Markov decision process formalism, Q-learning, policy-gradient algorithms, temporal-difference updates, and exploration strategies in reinforcement learning.
3. Reinforcement learning as a separate ML tradition: MDP framework, Q-learning, policy gradients, temporal-difference updates, and exploration-vs-exploitation tradeoffs.
4. Algorithms for learning policies under reward signals: Markov decision processes, value-iteration and Q-learning, policy gradients including REINFORCE-style methods, temporal-difference learning, and exploration techniques.
5. Reinforcement-learning foundations: Markov decision processes, Q-learning and SARSA, policy-gradient methods, temporal-difference learning, and the exploration problem.

### `feature_engineering`

**Description.** Hand-crafted feature descriptors for computer vision; SIFT; HOG; bag of visual words; histogram features; Gabor filters.

**Aliases.** SIFT; HOG; bag of visual words; hand-crafted features; feature descriptor

**Paraphrases (embedded and averaged):**

1. Hand-crafted feature engineering for computer vision: SIFT descriptors, histogram-of-oriented-gradients (HOG), bag-of-visual-words encodings, color and intensity histograms, and Gabor filter banks.
2. Pre-deep-learning vision pipelines: SIFT and HOG keypoint and patch descriptors, bag-of-visual-words representations, histogram-based features, and Gabor filter responses as hand-engineered inputs to classifiers.
3. Engineered visual feature descriptors: SIFT, HOG, bag-of-visual-words representations, histogram features, and Gabor filters as the input layer of classical vision systems.
4. Manual feature design in computer vision: SIFT for invariant keypoints, HOG for object detection, bag-of-visual-words for image classification, histogram-based features, and Gabor-filter banks for texture and edge response.
5. Classical computer vision features: SIFT, HOG, bag-of-visual-words, histogram features, and Gabor filter representations, as hand-crafted alternatives to learned features.

### `convex_optimization`

**Description.** Convex optimization methods for machine learning; LASSO; sparse coding; compressed sensing; proximal gradient methods; L1 regularization.

**Aliases.** convex optimization; LASSO; sparse coding; compressed sensing; L1 regularization

**Paraphrases (embedded and averaged):**

1. Convex optimization in machine learning: L1-regularized regression (LASSO), sparse coding, compressed sensing, proximal gradient methods, and the broader convex-optimization toolkit for sparse and structured estimation.
2. Sparse-recovery and convex-optimization methods: LASSO regression with L1 regularization, sparse coding for signals and images, compressed sensing theory and algorithms, and proximal-gradient solvers.
3. Convex methods for sparse learning: LASSO, sparse coding, compressed sensing, proximal gradient and other operator-splitting methods, and L1 regularization.
4. Convex-optimization-based ML: L1-regularized estimators including LASSO, sparse coding, compressed sensing, and proximal-gradient methods for non-smooth objectives.
5. Optimization techniques behind classical statistical learning: LASSO and L1 regularization, sparse coding, compressed sensing, proximal-gradient algorithms, and the convex-optimization perspective on machine learning.

### `nlp_pretransformer`

**Description.** Pre-deep-learning NLP; hidden Markov models for sequence labeling; conditional random fields; topic models; LDA; n-gram language models.

**Aliases.** HMM; CRF; topic models; LDA; n-gram

**Paraphrases (embedded and averaged):**

1. Pre-neural NLP methods: hidden Markov models for sequence labeling tasks such as part-of-speech tagging, conditional random fields for structured prediction, latent Dirichlet allocation and other topic models, and n-gram language models.
2. NLP before deep learning: HMMs for sequence labeling, CRFs for structured prediction in named-entity recognition and parsing, LDA-style topic modeling, and n-gram statistical language models.
3. Classical statistical NLP: hidden Markov models, conditional random fields, latent-Dirichlet-allocation topic models, and n-gram language models as the dominant pre-neural approaches.
4. Pre-transformer natural language processing: HMM sequence labeling, CRFs for tagging and parsing, topic models including LDA, and n-gram language models.
5. Statistical and probabilistic NLP: HMMs, CRFs, topic models such as LDA, and n-gram language models, characteristic of the era before deep learning displaced them.

### `generative_models`

**Description.** Deep generative models; generative adversarial networks; variational autoencoders; normalizing flows; image generation and synthesis.

**Aliases.** GAN; generative adversarial network; VAE; variational autoencoder; generative model

**Paraphrases (embedded and averaged):**

1. Deep generative models: generative adversarial networks pairing generator and discriminator, variational autoencoders learning latent-variable distributions, normalizing flows providing exact likelihoods, and image generation and synthesis applications.
2. Generative deep models for high-dimensional data: GANs with min-max training, variational autoencoders combining inference networks with reconstruction losses, normalizing flows enabling tractable likelihoods, and image generation as a benchmark application.
3. Deep generative modeling: generative adversarial networks (Goodfellow et al.), variational autoencoders, normalizing flows, and synthesis applications such as image generation and editing.
4. Modern generative models in deep learning: GANs, VAEs, normalizing flows, and image-synthesis and generation pipelines built on these architectures.
5. Deep generative architectures: adversarial training (GANs), variational autoencoders, normalizing-flow models with exact likelihoods, and image-generation applications.

## Attention mechanism (2005-2023)

Target concept: `attention_mechanism`

### `attention_mechanism`  **(target)**

**Description.** Self-attention mechanism and transformer architecture; scaled dot-product attention; multi-head attention; positional encoding; attention-based sequence modeling replacing recurrence; encoder-decoder attention; cross-attention; transformer layers.

**Aliases.** attention mechanism; self-attention; transformer; multi-head attention; scaled dot-product attention

**Paraphrases (embedded and averaged):**

1. Self-attention and the Transformer architecture: scaled dot-product attention with query-key-value projections, multi-head attention across parallel subspaces, sinusoidal or learned positional encoding, encoder-decoder and cross-attention, and stacked transformer layers as a replacement for recurrence in sequence modeling.
2. The Transformer's self-attention mechanism: queries, keys, and values projected linearly, scaled dot-product attention with softmax normalization, multiple attention heads operating in parallel, positional encodings injecting order information, and encoder-decoder cross-attention enabling sequence-to-sequence modeling without recurrence.
3. Attention-based sequence modeling: scaled dot-product self-attention, multi-head attention with parallel subspace projections, positional encodings, cross-attention between encoder and decoder, and stacked transformer layers replacing LSTMs and convolutions for sequence-to-sequence tasks.
4. The Vaswani-et-al. Transformer architecture: self-attention as scaled dot-product over query-key-value triples, multi-head attention for parallel representation subspaces, positional encoding, encoder self-attention and decoder cross-attention, and the layer composition that defines the transformer block.
5. Self-attention layers as the basic building block: scaled dot-product attention, multi-head attention across multiple representation subspaces, positional encodings, encoder-decoder cross-attention, and the transformer architecture that displaced recurrent and convolutional sequence models.

### `recurrent_networks`

**Description.** Long short-term memory networks; gated recurrent units; bidirectional RNNs; vanishing gradient problem; sequence modeling with recurrence; hidden state propagation; encoder-decoder sequence-to-sequence models.

**Aliases.** LSTM; recurrent neural network; GRU; sequence model; seq2seq

**Paraphrases (embedded and averaged):**

1. Recurrent neural networks for sequence modeling: long short-term memory (LSTM) units, gated recurrent units (GRU), bidirectional RNNs, the vanishing-gradient problem motivating gating, hidden state propagation through time, and encoder-decoder sequence-to-sequence architectures.
2. Pre-Transformer sequence models based on recurrence: LSTM and GRU gating, bidirectional architectures, the vanishing-gradient pathology of vanilla RNNs, sequence-to-sequence encoder-decoder models, and hidden-state propagation as the mechanism of memory.
3. Recurrence-based sequence learning: vanilla RNNs and their vanishing-gradient problem, LSTM and GRU gated architectures, bidirectional RNNs, and encoder-decoder seq2seq models for translation and summarization.
4. Sequence modeling with recurrent neural networks: LSTM and GRU as gated alternatives to plain RNNs, bidirectional variants, the vanishing-gradient motivation for gating, hidden-state propagation through sequences, and encoder-decoder seq2seq models.
5. Recurrent architectures for sequences: LSTM and GRU gating, bidirectional RNNs, vanishing gradients in vanilla RNNs, hidden-state propagation, and encoder-decoder seq2seq for translation, summarization, and other sequence tasks.

### `convolutional_networks`

**Description.** Convolutional neural networks for image recognition and text classification; convolutional feature maps; pooling layers; residual networks; deep convolutional architectures; image classification benchmarks.

**Aliases.** convolutional neural network; CNN; ResNet; image classification; VGG

**Paraphrases (embedded and averaged):**

1. Convolutional neural networks for image and text classification: stacked convolutional feature maps, pooling layers for spatial reduction, residual connections (ResNet), deep architectures such as VGG and Inception, and image-classification benchmarks like ImageNet.
2. Deep convolutional networks: convolutional layers producing feature maps, pooling for downsampling and translation invariance, residual networks enabling very deep training, and image-classification benchmarks (ImageNet, CIFAR) as standard evaluation.
3. Convolutional architectures in deep learning: feature-map computation via convolutional kernels, pooling layers, residual connections in ResNet-style networks, deep convolutional stacks such as VGG and Inception, and image-classification benchmarks.
4. CNNs and their architectural variants: convolutional feature maps, pooling, residual blocks (ResNet), deep convolutional architectures (VGG, Inception, ResNet), and applications to image classification benchmarks and text classification.
5. Deep convolutional neural networks: convolutional filters producing feature maps, pooling layers, residual learning (He et al. ResNet), deep architectures including VGG and Inception, and benchmark image-classification evaluations.

### `word_embeddings`

**Description.** Distributed word representations; Word2Vec skip-gram and CBOW; GloVe; fastText; distributional semantics; embedding spaces for lexical items; context-independent word vectors.

**Aliases.** word embedding; Word2Vec; GloVe; distributional semantics; word vector

**Paraphrases (embedded and averaged):**

1. Distributed word representations: Word2Vec skip-gram and continuous-bag-of-words objectives, GloVe co-occurrence matrix factorization, fastText subword embeddings, distributional-semantics foundations, and context-independent embedding spaces for lexical items.
2. Static word embeddings: Word2Vec (skip-gram, CBOW), GloVe, fastText (with subword n-grams), and the distributional-semantics principle that words appearing in similar contexts have similar meanings, encoded as dense vectors.
3. Pre-contextual word embeddings: Word2Vec skip-gram and CBOW objectives, GloVe matrix-factorization embeddings, fastText subword-aware embeddings, distributional semantics, and embedding spaces for words considered out of context.
4. Vector representations of words: Word2Vec, GloVe, and fastText as the canonical static (context-independent) embedding methods, derived from distributional-semantic objectives over large text corpora.
5. Word embeddings as the input layer of NLP models: Word2Vec skip-gram and CBOW, GloVe global co-occurrence factorization, fastText subword extensions, distributional-semantics motivation, and the embedding-space organization of lexical items.

### `pretraining_finetuning`

**Description.** Transfer learning via pre-trained language and vision models; unsupervised pre-training followed by supervised fine-tuning; BERT; GPT; domain adaptation; multi-task pre-training; foundation models.

**Aliases.** pre-training; fine-tuning; transfer learning; BERT; GPT

**Paraphrases (embedded and averaged):**

1. Transfer learning via pre-training and fine-tuning: large-scale unsupervised pre-training (BERT masked language modeling, GPT autoregressive), supervised fine-tuning on downstream tasks, domain adaptation, multi-task pre-training, and the foundation-model paradigm.
2. The pretrain-finetune paradigm: self-supervised or unsupervised pre-training on massive corpora (e.g., BERT, GPT), task-specific fine-tuning with smaller labeled data, domain adaptation strategies, and multi-task pre-training as a path to foundation models.
3. Foundation models and transfer learning: unsupervised pre-training of large language models (BERT, GPT) and vision models, fine-tuning on labeled downstream tasks, domain adaptation, and multi-task or instruction-tuned pre-training pipelines.
4. Pretraining-and-finetuning in deep learning: large self-supervised pre-training (BERT-style masked LM, GPT-style next-token), supervised fine-tuning on downstream tasks, transfer-learning and domain-adaptation techniques, and the foundation-model paradigm that they enable.
5. Transfer learning via pretrained models: large language models pretrained on unsupervised objectives (BERT, GPT), task-specific fine-tuning, domain adaptation, multi-task pre-training, and the broader notion of foundation models.

### `reinforcement_learning`

**Description.** Policy gradient methods; Q-learning; actor-critic architectures; reward modeling; exploration-exploitation; Markov decision processes; deep reinforcement learning; AlphaGo.

**Aliases.** reinforcement learning; policy gradient; Q-learning; reward; actor-critic

**Paraphrases (embedded and averaged):**

1. Deep reinforcement learning: policy-gradient algorithms, Q-learning with deep value networks, actor-critic methods, reward modeling, exploration-exploitation tradeoffs, the Markov decision process formalism, and high-profile applications such as AlphaGo.
2. Reinforcement learning combined with deep neural networks: policy gradients, deep Q-learning (DQN), actor-critic architectures, reward modeling, exploration techniques, MDP formulation, and AlphaGo-style game playing as a milestone.
3. Deep RL: Markov decision processes, value-based methods (Q-learning, DQN), policy-gradient methods, actor-critic algorithms, reward modeling, exploration strategies, and milestone systems such as AlphaGo.
4. Reinforcement learning with deep networks: policy-gradient algorithms (REINFORCE, PPO), deep Q-learning, actor-critic methods, reward modeling, exploration-exploitation, MDP formalism, and applications like AlphaGo.
5. Modern reinforcement learning: deep Q-learning, policy gradients, actor-critic architectures, reward shaping and modeling, exploration-exploitation strategies, the MDP framework, and AlphaGo as a benchmark application of the approach.

### `generative_models`

**Description.** Generative adversarial networks; variational autoencoders; diffusion models; autoregressive generation; likelihood-based generative models; image synthesis; text generation.

**Aliases.** generative adversarial network; GAN; variational autoencoder; diffusion model; VAE

**Paraphrases (embedded and averaged):**

1. Generative models in deep learning: generative adversarial networks, variational autoencoders, diffusion models, autoregressive likelihood-based generators, and applications to image synthesis and text generation.
2. Deep generative architectures: GANs with adversarial training, VAEs with variational inference, diffusion models with iterative denoising, autoregressive sequence models, and applications to image and text generation.
3. Generative deep models for images and text: GANs, VAEs, diffusion-based denoising models, autoregressive likelihood models, and image-synthesis and text-generation applications.
4. Modern generative deep learning: GANs, VAEs, diffusion models, autoregressive likelihood-based generators, and their use in image synthesis and text generation pipelines.
5. Deep generative models for high-dimensional content: GANs, VAEs, diffusion models, autoregressive likelihood-based architectures, and image-synthesis and text-generation applications.

### `optimization_methods`

**Description.** Adaptive learning rate methods including Adam and AdaGrad; stochastic gradient descent; learning rate schedules; batch normalization; gradient clipping; weight decay; warmup schedules.

**Aliases.** Adam optimizer; stochastic gradient descent; batch normalization; learning rate; SGD

**Paraphrases (embedded and averaged):**

1. Deep-network optimization techniques: stochastic gradient descent, adaptive-learning-rate methods (Adam, AdaGrad, RMSProp), learning-rate schedules and warmup, batch normalization, gradient clipping, and weight decay regularization.
2. Optimization for training deep neural networks: SGD with momentum, adaptive methods such as Adam and AdaGrad, learning-rate schedules including warmup, batch normalization, gradient clipping, and weight decay.
3. Training-loop techniques for deep learning: stochastic gradient descent, adaptive optimizers (Adam, AdaGrad), learning-rate schedules, batch normalization, gradient clipping, weight decay, and warmup.
4. Modern optimization tooling: SGD, adaptive-learning-rate optimizers (Adam, AdaGrad), learning-rate decay and warmup schedules, batch normalization for stable training, gradient clipping, and weight-decay regularization.
5. Optimization stack for deep learning: stochastic gradient descent, adaptive optimizers (Adam, AdaGrad), batch normalization, gradient clipping, weight decay, and learning-rate schedules with warmup.

### `graph_networks`

**Description.** Graph neural networks; message passing neural networks; node and edge embeddings; graph attention networks; knowledge graph embeddings; relational reasoning on structured data.

**Aliases.** graph neural network; GNN; message passing; knowledge graph; graph attention

**Paraphrases (embedded and averaged):**

1. Graph neural networks: message-passing architectures, node and edge embeddings, graph-attention networks, knowledge-graph embeddings, and relational reasoning on structured graph-valued data.
2. Neural networks on graphs: message-passing neural networks (MPNN), graph convolutional networks, graph-attention networks, node and edge embeddings, knowledge-graph embeddings, and relational reasoning over structured data.
3. GNNs and graph-based deep learning: message passing, node-level and edge-level embeddings, graph-attention networks, knowledge-graph embeddings, and relational reasoning.
4. Graph neural network architectures: message-passing layers updating node embeddings from neighbors, graph convolutional and graph-attention variants, edge-level features, knowledge-graph embeddings, and relational reasoning.
5. Deep learning on graphs: message-passing neural networks, graph-attention architectures, node and edge embeddings, knowledge-graph embedding methods, and relational reasoning on structured data.

### `representation_learning`

**Description.** Self-supervised representation learning; contrastive learning methods including SimCLR and BYOL; masked prediction objectives; autoencoders; representation disentanglement; unsupervised pre-training.

**Aliases.** contrastive learning; self-supervised; autoencoder; representation; SimCLR

**Paraphrases (embedded and averaged):**

1. Self-supervised representation learning: contrastive methods such as SimCLR, MoCo, and BYOL, masked-prediction objectives, autoencoder-based representations, representation disentanglement, and unsupervised pre-training.
2. Learning representations without labels: contrastive learning (SimCLR, BYOL, MoCo), masked-prediction objectives in BERT-style models, autoencoder reconstructions, disentangled representations, and unsupervised pre-training.
3. Self-supervised pretraining objectives: contrastive learning (SimCLR, BYOL), masked-token and masked-patch prediction, autoencoder reconstruction, representation disentanglement, and unsupervised feature learning.
4. Representation learning in deep models: contrastive losses (SimCLR, BYOL), masked-prediction self-supervision, autoencoders, disentanglement of latent factors, and unsupervised pre-training as a way of learning transferable representations.
5. Modern self-supervised representation learning: contrastive learning methods (SimCLR, BYOL), masked-prediction objectives, autoencoder-style reconstruction, disentanglement of latent factors, and unsupervised pre-training of foundation models.

