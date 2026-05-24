// Daily CBSE question bank — Physics, Chemistry, Math (Class 11 & 12)
// LaTeX delimiters: $...$ inline, $$...$$ block

window.QUESTION_BANK = {
  physics: [
    {
      id: "p-emi-01",
      cls: "XII",
      chapter: "Electromagnetic Induction",
      difficulty: "Medium",
      question:
        "A circular coil of radius $10\\text{ cm}$ with $200$ turns lies in a uniform magnetic field perpendicular to its plane. The field decreases steadily at $0.05\\text{ T s}^{-1}$. What is the magnitude of the induced EMF?",
      options: ["$0.157\\text{ V}$", "$0.314\\text{ V}$", "$0.628\\text{ V}$", "$3.14\\text{ V}$"],
      correct: 1,
      hints: [
        "Faraday's law: $\\varepsilon = -N\\dfrac{d\\Phi}{dt}$. You need the rate of change of flux through one turn.",
        "Flux through a single turn is $\\Phi = B\\cdot A$. Since area is constant, $\\dfrac{d\\Phi}{dt} = A\\dfrac{dB}{dt}$.",
        "Area of the loop $A = \\pi r^2 = \\pi(0.1)^2\\text{ m}^2$. Multiply by $N$ and $|dB/dt|$ and ignore the sign for magnitude."
      ],
      solution:
        "$$|\\varepsilon| = N\\,A\\,\\left|\\dfrac{dB}{dt}\\right| = 200 \\times \\pi(0.1)^2 \\times 0.05$$ $$= 200 \\times 0.0314 \\times 0.05 = 0.314\\text{ V}$$",
      concept:
        "Faraday's law of electromagnetic induction states that a changing magnetic flux through a closed loop induces an EMF equal to the negative rate of change of flux. For a coil with $N$ turns the EMFs add: $\\varepsilon = -N\\,d\\Phi/dt$. Flux $\\Phi = \\vec{B}\\cdot\\vec{A}$ can change because $B$ changes, because $A$ changes, or because the loop rotates. The negative sign (Lenz's law) tells you the induced current flows so as to oppose the change that produced it — here, as $B$ decreases, the induced current tries to maintain the flux."
    },
    {
      id: "p-kin-01",
      cls: "XI",
      chapter: "Kinematics",
      difficulty: "Easy",
      question:
        "A projectile is launched from ground level with speed $u = 20\\text{ m s}^{-1}$ at an angle of $45^\\circ$ above the horizontal. Taking $g = 10\\text{ m s}^{-2}$, what is its horizontal range?",
      options: ["$20\\text{ m}$", "$40\\text{ m}$", "$28.3\\text{ m}$", "$80\\text{ m}$"],
      correct: 1,
      hints: [
        "Use the range formula for a projectile on level ground: $R = \\dfrac{u^2 \\sin 2\\theta}{g}$.",
        "Note that $\\sin(2 \\times 45^\\circ) = \\sin 90^\\circ = 1$, so $R = u^2/g$.",
        "Substitute $u = 20$ and $g = 10$."
      ],
      solution:
        "$$R = \\dfrac{u^2 \\sin 2\\theta}{g} = \\dfrac{(20)^2 \\sin 90^\\circ}{10} = \\dfrac{400 \\times 1}{10} = 40\\text{ m}$$",
      concept:
        "Projectile motion decomposes into independent horizontal (uniform) and vertical (uniformly accelerated) components. For a launch from and landing at the same height, time of flight $T = 2u\\sin\\theta / g$, maximum height $H = u^2\\sin^2\\theta/(2g)$, and range $R = u^2\\sin 2\\theta/g$. The range is maximised at $\\theta = 45^\\circ$ and is symmetric: $\\theta$ and $90^\\circ-\\theta$ give the same range."
    },
    {
      id: "p-shm-01",
      cls: "XI",
      chapter: "Oscillations",
      difficulty: "Easy",
      question:
        "A block of mass $m = 0.5\\text{ kg}$ attached to a spring of force constant $k = 200\\text{ N m}^{-1}$ executes simple harmonic motion on a frictionless surface. What is the period of oscillation?",
      options: ["$0.1\\pi\\text{ s}$", "$0.2\\pi\\text{ s}$", "$\\pi/10\\text{ s}$", "$\\pi\\text{ s}$"],
      correct: 0,
      hints: [
        "For a spring-mass system, $T = 2\\pi\\sqrt{m/k}$.",
        "Compute $m/k = 0.5/200 = 1/400$.",
        "$\\sqrt{1/400} = 1/20$, so $T = 2\\pi/20 = \\pi/10$ s."
      ],
      solution:
        "$$T = 2\\pi\\sqrt{\\dfrac{m}{k}} = 2\\pi\\sqrt{\\dfrac{0.5}{200}} = 2\\pi \\cdot \\dfrac{1}{20} = \\dfrac{\\pi}{10}\\text{ s} \\approx 0.314\\text{ s}$$",
      concept:
        "Simple harmonic motion arises whenever the restoring force is proportional to displacement: $F = -kx$. The equation of motion $\\ddot{x} = -(k/m)x$ has angular frequency $\\omega = \\sqrt{k/m}$, period $T = 2\\pi/\\omega$, and frequency $f = 1/T$. The period depends only on $m$ and $k$ — not on amplitude. Energy oscillates between kinetic and elastic potential, with total $E = \\tfrac{1}{2}kA^2$ constant."
    },
    {
      id: "p-opt-01",
      cls: "XII",
      chapter: "Ray Optics",
      difficulty: "Medium",
      question:
        "A thin convex lens of focal length $20\\text{ cm}$ forms a real image of an object placed $30\\text{ cm}$ in front of it. Where is the image formed?",
      options: ["$12\\text{ cm}$ on the same side", "$60\\text{ cm}$ on the opposite side", "$60\\text{ cm}$ on the same side", "$15\\text{ cm}$ on the opposite side"],
      correct: 1,
      hints: [
        "Use the thin-lens equation in Cartesian sign convention: $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$.",
        "Object is on the incoming side, so $u = -30\\text{ cm}$. The lens is convex, so $f = +20\\text{ cm}$.",
        "Solve for $v$. A positive $v$ means the image is on the opposite (transmission) side and real."
      ],
      solution:
        "$$\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u} = \\dfrac{1}{20} + \\dfrac{1}{-30} = \\dfrac{3 - 2}{60} = \\dfrac{1}{60}$$ $$v = +60\\text{ cm}\\text{ (real, opposite side)}$$",
      concept:
        "The thin lens formula $1/v - 1/u = 1/f$ uses Cartesian sign convention: distances measured against the incident light are negative. For a convex lens $f>0$; concave lens $f<0$. Magnification $m = v/u$ — negative $m$ means inverted, positive means erect. When $|u|>f$ for a convex lens, the image is real and inverted; when $|u|<f$, it is virtual and erect (magnifying-glass regime)."
    },
    {
      id: "p-pho-01",
      cls: "XII",
      chapter: "Dual Nature of Radiation",
      difficulty: "Medium",
      question:
        "The work function of a metal is $\\phi = 2.0\\text{ eV}$. Light of wavelength $400\\text{ nm}$ falls on it. What is the maximum kinetic energy of the photoelectrons? (Use $hc = 1240\\text{ eV nm}$.)",
      options: ["$0.5\\text{ eV}$", "$1.1\\text{ eV}$", "$2.0\\text{ eV}$", "$3.1\\text{ eV}$"],
      correct: 1,
      hints: [
        "Einstein's photoelectric equation: $K_{\\max} = h\\nu - \\phi = \\dfrac{hc}{\\lambda} - \\phi$.",
        "Photon energy in eV: $E = \\dfrac{1240}{\\lambda(\\text{nm})}$.",
        "Subtract the work function from the photon energy."
      ],
      solution:
        "$$E_{\\text{photon}} = \\dfrac{1240}{400} = 3.1\\text{ eV}$$ $$K_{\\max} = E_{\\text{photon}} - \\phi = 3.1 - 2.0 = 1.1\\text{ eV}$$",
      concept:
        "Einstein explained the photoelectric effect by treating light as quanta (photons) of energy $E = h\\nu$. An electron is ejected only if a single photon carries enough energy to overcome the metal's work function $\\phi$ — the minimum binding energy. The leftover energy appears as kinetic energy of the ejected electron: $K_{\\max} = h\\nu - \\phi$. Below the threshold frequency $\\nu_0 = \\phi/h$, no electrons are ejected regardless of intensity — a result wave theory could not explain."
    },
    {
      id: "p-elec-01",
      cls: "XII",
      chapter: "Electrostatics",
      difficulty: "Hard",
      question:
        "A thin ring of radius $R$ carries total charge $Q$ uniformly distributed along it. What is the electric field on its axis at a distance $x$ from the centre?",
      options: [
        "$\\dfrac{kQ}{x^2}$",
        "$\\dfrac{kQx}{(R^2+x^2)^{3/2}}$",
        "$\\dfrac{kQ}{R^2+x^2}$",
        "$\\dfrac{kQR}{(R^2+x^2)^{3/2}}$"
      ],
      correct: 1,
      hints: [
        "Take a small element $dq$ on the ring and find $dE$ at the axial point — it points along the line from element to the point.",
        "By symmetry, components perpendicular to the axis cancel for the whole ring; only the axial component survives.",
        "The axial component is $dE\\cos\\theta = dE\\cdot\\dfrac{x}{\\sqrt{R^2+x^2}}$. Integrate $dq$ around the ring."
      ],
      solution:
        "$$dE = \\dfrac{k\\,dq}{R^2 + x^2},\\quad dE_{\\parallel} = dE\\cdot\\dfrac{x}{\\sqrt{R^2+x^2}}$$ Integrating $\\int dq = Q$: $$E = \\dfrac{kQx}{(R^2+x^2)^{3/2}}$$ At the centre ($x=0$) the field is zero, as expected by symmetry. The field is maximum at $x = R/\\sqrt{2}$.",
      concept:
        "Coulomb's law $\\vec{E} = kq\\hat{r}/r^2$ combined with the superposition principle lets you find the field of any continuous distribution by integrating contributions $d\\vec{E}$ from each charge element. Symmetry is the most powerful tool: identify which components must cancel before doing any algebra. For a ring on its axis, perpendicular components from diametrically opposite elements cancel; only the axial component survives, leaving a simple scalar integral over $dq$."
    }
  ],

  chemistry: [
    {
      id: "c-eq-01",
      cls: "XI",
      chapter: "Chemical Equilibrium",
      difficulty: "Medium",
      question:
        "For the reaction $\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)$, $K_c = 4$ at $500\\text{ K}$. At equilibrium $[\\text{N}_2] = 2\\text{ M}$ and $[\\text{H}_2] = 1\\text{ M}$. What is $[\\text{NH}_3]$?",
      options: ["$2\\text{ M}$", "$\\sqrt{8}\\text{ M}$", "$4\\text{ M}$", "$8\\text{ M}$"],
      correct: 1,
      hints: [
        "Write the expression for $K_c$ with products over reactants, each raised to its stoichiometric coefficient.",
        "$K_c = \\dfrac{[\\text{NH}_3]^2}{[\\text{N}_2][\\text{H}_2]^3}$. Plug in the known equilibrium concentrations.",
        "Solve for $[\\text{NH}_3]^2$ and take the square root."
      ],
      solution:
        "$$K_c = \\dfrac{[\\text{NH}_3]^2}{[\\text{N}_2][\\text{H}_2]^3} = 4$$ $$[\\text{NH}_3]^2 = 4 \\times 2 \\times (1)^3 = 8$$ $$[\\text{NH}_3] = \\sqrt{8} = 2\\sqrt{2} \\approx 2.83\\text{ M}$$",
      concept:
        "At equilibrium, forward and reverse reaction rates are equal and the concentrations of reactants and products are related by the equilibrium constant $K_c$ (in terms of concentrations) or $K_p$ (partial pressures). For $aA + bB \\rightleftharpoons cC + dD$: $K_c = [C]^c[D]^d / ([A]^a[B]^b)$. $K$ depends only on temperature. A large $K$ favours products; a small $K$ favours reactants. Le Chatelier's principle predicts the direction the system shifts when disturbed."
    },
    {
      id: "c-th-01",
      cls: "XI",
      chapter: "Thermodynamics",
      difficulty: "Medium",
      question:
        "Given $\\Delta H_f^\\circ(\\text{CO}_2) = -394\\text{ kJ/mol}$, $\\Delta H_f^\\circ(\\text{H}_2\\text{O}) = -286\\text{ kJ/mol}$, and $\\Delta H_f^\\circ(\\text{CH}_4) = -75\\text{ kJ/mol}$, what is the enthalpy of combustion of methane: $\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$?",
      options: ["$-755\\text{ kJ/mol}$", "$-891\\text{ kJ/mol}$", "$-605\\text{ kJ/mol}$", "$-394\\text{ kJ/mol}$"],
      correct: 1,
      hints: [
        "Use Hess's law: $\\Delta H_{\\text{rxn}} = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})$.",
        "$\\Delta H_f^\\circ$ of $\\text{O}_2$ (element in standard state) is zero.",
        "Don't forget the stoichiometric coefficient of 2 on $\\text{H}_2\\text{O}$."
      ],
      solution:
        "$$\\Delta H = [\\Delta H_f^\\circ(\\text{CO}_2) + 2\\Delta H_f^\\circ(\\text{H}_2\\text{O})] - [\\Delta H_f^\\circ(\\text{CH}_4) + 2\\Delta H_f^\\circ(\\text{O}_2)]$$ $$= [(-394) + 2(-286)] - [(-75) + 0]$$ $$= [-966] - [-75] = -891\\text{ kJ/mol}$$",
      concept:
        "Hess's law follows from enthalpy being a state function: the enthalpy change of a reaction depends only on initial and final states, not the path. The standard enthalpy of formation $\\Delta H_f^\\circ$ is the enthalpy change when 1 mol of a compound forms from its elements in their standard states. By convention, $\\Delta H_f^\\circ$ of an element in its standard state is zero. Any reaction's $\\Delta H$ can be computed as products' formation enthalpies minus reactants', each weighted by stoichiometric coefficients."
    },
    {
      id: "c-ec-01",
      cls: "XII",
      chapter: "Electrochemistry",
      difficulty: "Medium",
      question:
        "For the cell $\\text{Zn}\\,|\\,\\text{Zn}^{2+}\\,\\|\\,\\text{Cu}^{2+}\\,|\\,\\text{Cu}$ with $E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = -0.76\\text{ V}$ and $E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0.34\\text{ V}$, what is the standard cell EMF?",
      options: ["$0.42\\text{ V}$", "$-0.42\\text{ V}$", "$1.10\\text{ V}$", "$-1.10\\text{ V}$"],
      correct: 2,
      hints: [
        "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$ (both written as reduction potentials).",
        "The species with the higher reduction potential acts as the cathode (gets reduced).",
        "Cu²⁺/Cu has the higher $E^\\circ$, so Cu is the cathode and Zn is the anode."
      ],
      solution:
        "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn})$$ $$= 0.34 - (-0.76) = 1.10\\text{ V}$$",
      concept:
        "In a galvanic (voltaic) cell, oxidation happens at the anode and reduction at the cathode; the cell EMF measures the tendency for the overall redox reaction to occur. Standard reduction potentials are tabulated relative to the standard hydrogen electrode (0 V). $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$, both as reductions. Positive $E^\\circ_{\\text{cell}}$ means the reaction is spontaneous as written, related to free energy by $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$."
    },
    {
      id: "c-kin-01",
      cls: "XII",
      chapter: "Chemical Kinetics",
      difficulty: "Easy",
      question:
        "The half-life of a first-order reaction is $20\\text{ min}$. What fraction of the reactant remains after $60\\text{ min}$?",
      options: ["$1/2$", "$1/4$", "$1/8$", "$1/16$"],
      correct: 2,
      hints: [
        "For a first-order reaction, half-life is independent of initial concentration.",
        "After $n$ half-lives, the fraction remaining is $(1/2)^n$.",
        "$60$ min $= 3$ half-lives."
      ],
      solution:
        "Number of half-lives: $n = 60/20 = 3$. $$\\dfrac{[A]}{[A]_0} = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$$",
      concept:
        "A first-order reaction has rate $= k[A]$, which integrates to $[A] = [A]_0 e^{-kt}$. Its half-life $t_{1/2} = \\ln 2 / k$ is a constant — independent of initial concentration. This is the signature of first-order kinetics and is the basis of radioactive decay, many drug-elimination processes, and SN1 reactions. After $n$ half-lives, $(1/2)^n$ of the original material remains."
    },
    {
      id: "c-cb-01",
      cls: "XI",
      chapter: "Chemical Bonding",
      difficulty: "Medium",
      question:
        "What is the hybridization of the central atom and the molecular geometry of $\\text{SF}_6$?",
      options: ["$sp^3$, tetrahedral", "$sp^3d$, trigonal bipyramidal", "$sp^3d^2$, octahedral", "$sp^3d^3$, pentagonal bipyramidal"],
      correct: 2,
      hints: [
        "Count $\\sigma$-bond pairs and lone pairs around the central sulfur.",
        "Sulfur in $\\text{SF}_6$ forms 6 bonds to F and has 0 lone pairs — total 6 electron pairs.",
        "Six electron pairs → $sp^3d^2$ hybridization."
      ],
      solution:
        "Sulfur in $\\text{SF}_6$ has 6 bond pairs and 0 lone pairs. Six equivalent hybrid orbitals are needed → $sp^3d^2$ hybridization → octahedral geometry, bond angles of $90^\\circ$.",
      concept:
        "Valence Shell Electron Pair Repulsion (VSEPR) theory predicts molecular shape by minimising repulsion between electron pairs around the central atom. Steric number (bond pairs + lone pairs) determines the electron-pair geometry: 2→linear ($sp$), 3→trigonal planar ($sp^2$), 4→tetrahedral ($sp^3$), 5→trigonal bipyramidal ($sp^3d$), 6→octahedral ($sp^3d^2$). Lone pairs occupy more space than bond pairs and distort bond angles."
    },
    {
      id: "c-sol-01",
      cls: "XII",
      chapter: "Solutions",
      difficulty: "Medium",
      question:
        "What is the osmotic pressure of a $0.1\\text{ M}$ aqueous solution of glucose at $300\\text{ K}$? ($R = 0.0821\\text{ L atm K}^{-1}\\text{mol}^{-1}$.)",
      options: ["$0.246\\text{ atm}$", "$2.46\\text{ atm}$", "$24.6\\text{ atm}$", "$0.821\\text{ atm}$"],
      correct: 1,
      hints: [
        "Use the van 't Hoff equation: $\\pi = CRT$.",
        "$C$ is molarity, $R$ is the gas constant, $T$ in kelvin. Glucose is a non-electrolyte ($i = 1$).",
        "$\\pi = 0.1 \\times 0.0821 \\times 300$."
      ],
      solution:
        "$$\\pi = CRT = 0.1 \\times 0.0821 \\times 300 = 2.463\\text{ atm}$$",
      concept:
        "Osmotic pressure is a colligative property — it depends on the number of solute particles, not their identity. The van 't Hoff equation $\\pi = iCRT$ relates it to molarity, temperature, and the van 't Hoff factor $i$ (which accounts for dissociation in electrolytes; $i=1$ for non-electrolytes like glucose, $\\approx 2$ for NaCl, etc.). Osmotic pressure measurements are extremely sensitive and are commonly used to determine molecular masses of polymers and proteins."
    }
  ],

  math: [
    {
      id: "m-int-01",
      cls: "XII",
      chapter: "Integrals",
      difficulty: "Medium",
      question: "Evaluate $\\displaystyle \\int \\dfrac{x^2}{x^2+1}\\,dx$.",
      options: [
        "$x - \\tan^{-1} x + C$",
        "$\\tan^{-1} x + C$",
        "$\\dfrac{x^3}{3(x^2+1)} + C$",
        "$x + \\tan^{-1} x + C$"
      ],
      correct: 0,
      hints: [
        "The numerator's degree is not less than the denominator's. Try splitting the fraction algebraically.",
        "Write $\\dfrac{x^2}{x^2+1} = \\dfrac{(x^2+1) - 1}{x^2+1} = 1 - \\dfrac{1}{x^2+1}$.",
        "Now integrate term by term — both pieces are standard."
      ],
      solution:
        "$$\\int \\dfrac{x^2}{x^2+1}\\,dx = \\int\\left(1 - \\dfrac{1}{x^2+1}\\right)dx$$ $$= \\int 1\\,dx - \\int\\dfrac{dx}{x^2+1} = x - \\tan^{-1}x + C$$",
      concept:
        "When integrating a rational function $P(x)/Q(x)$ with $\\deg P \\ge \\deg Q$, the first move is always algebraic: polynomial-divide so you get a polynomial plus a proper rational part. The proper part can then be tackled with partial fractions, substitution, or recognised as a standard form. Two formulas worth memorising: $\\int dx/(x^2+a^2) = (1/a)\\tan^{-1}(x/a) + C$ and $\\int dx/(x^2-a^2) = (1/2a)\\ln|(x-a)/(x+a)| + C$."
    },
    {
      id: "m-der-01",
      cls: "XII",
      chapter: "Continuity & Differentiability",
      difficulty: "Easy",
      question: "If $y = \\sin^{-1}(2x\\sqrt{1-x^2})$ for $x \\in (0, 1/\\sqrt{2})$, then $\\dfrac{dy}{dx} = ?$",
      options: ["$\\dfrac{1}{\\sqrt{1-x^2}}$", "$\\dfrac{2}{\\sqrt{1-x^2}}$", "$\\dfrac{-2}{\\sqrt{1-x^2}}$", "$\\dfrac{1}{2\\sqrt{1-x^2}}$"],
      correct: 1,
      hints: [
        "Try the substitution $x = \\sin\\theta$. Then $\\sqrt{1-x^2} = \\cos\\theta$.",
        "$2x\\sqrt{1-x^2} = 2\\sin\\theta\\cos\\theta = \\sin 2\\theta$.",
        "So $y = \\sin^{-1}(\\sin 2\\theta) = 2\\theta = 2\\sin^{-1}x$ in the given range."
      ],
      solution:
        "Let $x = \\sin\\theta$, $\\theta \\in (0, \\pi/4)$. Then $2x\\sqrt{1-x^2} = 2\\sin\\theta\\cos\\theta = \\sin 2\\theta$. So $$y = \\sin^{-1}(\\sin 2\\theta) = 2\\theta = 2\\sin^{-1}x$$ $$\\dfrac{dy}{dx} = \\dfrac{2}{\\sqrt{1-x^2}}$$",
      concept:
        "Trigonometric substitution simplifies many inverse-trig derivative problems that look intimidating. Spotting the identity $2\\sin\\theta\\cos\\theta = \\sin 2\\theta$ collapses the messy expression. The catch is the domain: $\\sin^{-1}(\\sin\\alpha) = \\alpha$ only when $\\alpha \\in [-\\pi/2, \\pi/2]$. Outside that range, you must reduce $\\alpha$ using identities like $\\sin^{-1}(\\sin\\alpha) = \\pi - \\alpha$ for $\\alpha \\in [\\pi/2, 3\\pi/2]$ — always check which branch you're on before differentiating."
    },
    {
      id: "m-mat-01",
      cls: "XII",
      chapter: "Determinants",
      difficulty: "Easy",
      question: "If $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix}$, what is $\\det(A^{-1})$?",
      options: ["$5$", "$\\dfrac{1}{5}$", "$-5$", "$-\\dfrac{1}{5}$"],
      correct: 1,
      hints: [
        "$\\det(A^{-1}) = 1/\\det(A)$. So just compute $\\det(A)$.",
        "For a $2\\times 2$ matrix $\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$, $\\det = ad - bc$.",
        "$\\det(A) = 2\\cdot 4 - 1\\cdot 3 = 5$."
      ],
      solution:
        "$$\\det(A) = (2)(4) - (1)(3) = 8 - 3 = 5$$ $$\\det(A^{-1}) = \\dfrac{1}{\\det(A)} = \\dfrac{1}{5}$$",
      concept:
        "Key determinant properties: (1) $\\det(AB) = \\det(A)\\det(B)$, (2) $\\det(A^{-1}) = 1/\\det(A)$ (which requires $A$ invertible, i.e. $\\det(A) \\ne 0$), (3) $\\det(A^T) = \\det(A)$, (4) swapping two rows flips the sign, (5) scaling one row by $k$ scales $\\det$ by $k$. A matrix is invertible iff its determinant is non-zero — equivalently, its rows (and columns) are linearly independent."
    },
    {
      id: "m-prob-01",
      cls: "XII",
      chapter: "Probability",
      difficulty: "Hard",
      question:
        "A disease affects $1\\%$ of a population. A test is $99\\%$ accurate on the diseased (true positive rate) and $99\\%$ accurate on the healthy (true negative rate). If a randomly chosen person tests positive, what is the probability they actually have the disease?",
      options: ["$99\\%$", "$\\approx 50\\%$", "$\\approx 9\\%$", "$1\\%$"],
      correct: 1,
      hints: [
        "Use Bayes' theorem: $P(D \\mid +) = \\dfrac{P(+ \\mid D)\\,P(D)}{P(+)}$.",
        "Find $P(+)$ using the law of total probability: $P(+) = P(+ \\mid D)P(D) + P(+ \\mid D^c)P(D^c)$.",
        "Plug in $P(D) = 0.01$, $P(+ \\mid D) = 0.99$, $P(+ \\mid D^c) = 0.01$ (false positive rate)."
      ],
      solution:
        "$$P(+) = 0.99 \\times 0.01 + 0.01 \\times 0.99 = 0.0099 + 0.0099 = 0.0198$$ $$P(D \\mid +) = \\dfrac{0.99 \\times 0.01}{0.0198} = \\dfrac{0.0099}{0.0198} = 0.5$$ So roughly $50\\%$ — counter-intuitive but correct.",
      concept:
        "Bayes' theorem links conditional probabilities: $P(A \\mid B) = P(B \\mid A)\\,P(A)/P(B)$. It's how you update beliefs based on evidence. The classical 'base rate fallacy' is illustrated here: even a highly accurate test gives a low posterior probability of disease when the base rate is low, because false positives from the much larger healthy group can outnumber true positives. Always compute $P(B)$ via the law of total probability before applying Bayes."
    },
    {
      id: "m-vec-01",
      cls: "XII",
      chapter: "Vector Algebra",
      difficulty: "Easy",
      question:
        "Find the angle between $\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + \\hat{k}$.",
      options: ["$\\cos^{-1}(1/3)$", "$\\cos^{-1}(2/3)$", "$\\pi/3$", "$\\pi/2$"],
      correct: 0,
      hints: [
        "$\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\,|\\vec{b}|}$.",
        "$\\vec{a}\\cdot\\vec{b} = (1)(1) + (1)(-1) + (1)(1) = 1$.",
        "$|\\vec{a}| = |\\vec{b}| = \\sqrt{3}$, so $\\cos\\theta = 1/3$."
      ],
      solution:
        "$$\\vec{a}\\cdot\\vec{b} = 1 - 1 + 1 = 1,\\quad |\\vec{a}| = |\\vec{b}| = \\sqrt{3}$$ $$\\cos\\theta = \\dfrac{1}{\\sqrt{3}\\cdot\\sqrt{3}} = \\dfrac{1}{3}$$ $$\\theta = \\cos^{-1}(1/3) \\approx 70.5^\\circ$$",
      concept:
        "The dot product $\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$ is the workhorse for angle calculations in 3D. Three immediate consequences: (1) vectors are perpendicular iff $\\vec{a}\\cdot\\vec{b} = 0$; (2) the projection of $\\vec{a}$ on $\\vec{b}$ is $(\\vec{a}\\cdot\\vec{b})/|\\vec{b}|$; (3) $|\\vec{a}|^2 = \\vec{a}\\cdot\\vec{a}$. In component form $\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ — fast and coordinate-free in spirit."
    },
    {
      id: "m-lim-01",
      cls: "XI",
      chapter: "Limits",
      difficulty: "Medium",
      question:
        "Evaluate $\\displaystyle \\lim_{x\\to 0}\\dfrac{\\sin 3x}{\\tan 5x}$.",
      options: ["$3/5$", "$5/3$", "$1$", "$15$"],
      correct: 0,
      hints: [
        "Use the standard limits $\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1$ and $\\lim_{x\\to 0}\\dfrac{\\tan x}{x} = 1$.",
        "Multiply top and bottom by helpful factors so both look like $\\sin(\\square)/\\square$ and $\\tan(\\square)/\\square$.",
        "$\\dfrac{\\sin 3x}{\\tan 5x} = \\dfrac{\\sin 3x}{3x}\\cdot\\dfrac{5x}{\\tan 5x}\\cdot\\dfrac{3}{5}$."
      ],
      solution:
        "$$\\lim_{x\\to 0}\\dfrac{\\sin 3x}{\\tan 5x} = \\lim_{x\\to 0}\\dfrac{\\sin 3x}{3x}\\cdot\\dfrac{5x}{\\tan 5x}\\cdot\\dfrac{3}{5} = 1\\cdot 1\\cdot\\dfrac{3}{5} = \\dfrac{3}{5}$$",
      concept:
        "Two indispensable trigonometric limits sit at the foundation of calculus: $\\lim_{x\\to 0}(\\sin x)/x = 1$ and $\\lim_{x\\to 0}(1-\\cos x)/x^2 = 1/2$. They unlock derivatives of all trig functions and are the right tool for any $0/0$ form involving $\\sin$, $\\cos$, $\\tan$. Strategy: massage the expression so each trig piece appears as $\\sin(u)/u$ or $\\tan(u)/u$ with the same $u \\to 0$ — then it just evaluates to 1."
    }
  ]
};
