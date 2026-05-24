// JEE Main past-year questions, indexed by the corresponding question id in
// QUESTION_BANK. Each PYQ is a full MCQ — opens as its own page.

window.PYQ_BANK = {
  // ─── Physics ─────────────────────────────────────────────────────────────
  "p-emi-01": [
    {
      year: 2023,
      session: "Jan",
      question:
        "A square loop of side $10\\text{ cm}$ is placed in a magnetic field $B = 0.5\\text{ T}$ perpendicular to its plane. The field decreases to zero in $0.1\\text{ s}$. What is the induced EMF?",
      options: ["$0.005\\text{ V}$", "$0.05\\text{ V}$", "$0.5\\text{ V}$", "$0.025\\text{ V}$"],
      correct: 1,
      explain:
        "$|\\varepsilon| = A\\,|dB/dt| = (0.1)^2 \\times (0.5/0.1) = 0.05\\text{ V}$."
    },
    {
      year: 2022,
      session: "Jul",
      question:
        "A coil of $100$ turns and area $5\\times10^{-3}\\text{ m}^2$ is rotated at $50$ Hz in a uniform field $B = 0.2\\text{ T}$. Peak EMF?",
      options: [
        "$\\approx 15.7\\text{ V}$",
        "$\\approx 31.4\\text{ V}$",
        "$\\approx 62.8\\text{ V}$",
        "$\\approx 100\\text{ V}$"
      ],
      correct: 1,
      explain:
        "$\\varepsilon_0 = NBA\\omega = 100 \\times 0.2 \\times 5\\times10^{-3} \\times 100\\pi \\approx 31.4\\text{ V}$."
    }
  ],
  "p-kin-01": [
    {
      year: 2024,
      session: "Apr",
      question:
        "A projectile is fired at $30^\\circ$ above horizontal with speed $40\\text{ m s}^{-1}$. Taking $g = 10\\text{ m s}^{-2}$, the maximum height attained is:",
      options: ["$10\\text{ m}$", "$15\\text{ m}$", "$20\\text{ m}$", "$40\\text{ m}$"],
      correct: 2,
      explain:
        "$H = \\dfrac{u^2 \\sin^2\\theta}{2g} = \\dfrac{1600 \\times 0.25}{20} = 20\\text{ m}$."
    },
    {
      year: 2022,
      session: "Jun",
      question:
        "Two projectiles are launched with the same speed at angles $\\theta$ and $90^\\circ - \\theta$. The ratio of their ranges is:",
      options: ["$1:1$", "$2:1$", "$1:2$", "depends on $\\theta$"],
      correct: 0,
      explain:
        "$R(\\theta) = R(90^\\circ - \\theta)$ since $\\sin 2\\theta = \\sin(180^\\circ - 2\\theta)$."
    }
  ],
  "p-shm-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "A particle in SHM has amplitude $A$ and period $T$. The time to go from $x = 0$ to $x = A/2$ (moving outward) is:",
      options: ["$T/6$", "$T/12$", "$T/8$", "$T/4$"],
      correct: 1,
      explain:
        "$x = A\\sin(2\\pi t/T)$. $A/2 = A\\sin(2\\pi t/T) \\Rightarrow 2\\pi t/T = \\pi/6 \\Rightarrow t = T/12$."
    }
  ],
  "p-opt-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "Two thin lenses of focal lengths $+15\\text{ cm}$ and $-10\\text{ cm}$ are in contact. Effective focal length?",
      options: ["$-30\\text{ cm}$", "$+30\\text{ cm}$", "$-6\\text{ cm}$", "$+6\\text{ cm}$"],
      correct: 0,
      explain:
        "$1/F = 1/f_1 + 1/f_2 = 1/15 - 1/10 = -1/30$, so $F = -30\\text{ cm}$."
    },
    {
      year: 2022,
      session: "Jul",
      question:
        "Power of a lens of focal length $-25\\text{ cm}$ is:",
      options: ["$+4\\text{ D}$", "$-4\\text{ D}$", "$+25\\text{ D}$", "$-25\\text{ D}$"],
      correct: 1,
      explain:
        "$P = 1/f(\\text{m}) = 1/(-0.25) = -4\\text{ D}$ (diopters)."
    }
  ],
  "p-pho-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "Threshold wavelength of a metal is $500\\text{ nm}$. Stopping potential for incident light of $\\lambda = 400\\text{ nm}$? ($hc = 1240\\text{ eV nm}$.)",
      options: ["$0.31\\text{ V}$", "$0.62\\text{ V}$", "$1.24\\text{ V}$", "$3.1\\text{ V}$"],
      correct: 1,
      explain:
        "$eV_s = hc(1/\\lambda - 1/\\lambda_0) = 1240(1/400 - 1/500) = 0.62\\text{ eV}$, so $V_s = 0.62\\text{ V}$."
    },
    {
      year: 2022,
      session: "Jun",
      question:
        "Doubling the intensity of incident light (above threshold) on a metal will:",
      options: [
        "Double $K_{\\max}$, leave current unchanged",
        "Double the photocurrent, leave $K_{\\max}$ unchanged",
        "Double both the photocurrent and $K_{\\max}$",
        "Halve $K_{\\max}$"
      ],
      correct: 1,
      explain:
        "Intensity affects photon flux (hence current). $K_{\\max}$ depends only on frequency."
    }
  ],
  "p-elec-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "An electric dipole of moment $\\vec{p}$ is placed in a uniform field $\\vec{E}$ at angle $\\theta$. Torque magnitude?",
      options: ["$pE$", "$pE\\cos\\theta$", "$pE\\sin\\theta$", "$pE\\tan\\theta$"],
      correct: 2,
      explain:
        "$\\vec{\\tau} = \\vec{p}\\times\\vec{E}$. Magnitude $pE\\sin\\theta$. Maximum at $\\theta=90^\\circ$."
    },
    {
      year: 2023,
      session: "Apr",
      question:
        "On the axis of a short electric dipole, the field at distance $r \\gg d$ is:",
      options: ["$kp/r^3$", "$2kp/r^3$", "$kp/r^2$", "$2kp/r^2$"],
      correct: 1,
      explain:
        "Axial field $E_{\\text{ax}} = 2kp/r^3$; equatorial field $E_{\\text{eq}} = kp/r^3$, opposite to $\\vec{p}$."
    }
  ],

  // ─── Chemistry ───────────────────────────────────────────────────────────
  "c-eq-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "For $\\text{PCl}_5 \\rightleftharpoons \\text{PCl}_3 + \\text{Cl}_2$ at $T$ in a $1\\text{ L}$ vessel: $K_c = 1.8\\times10^{-3}$. If $[\\text{PCl}_3] = [\\text{Cl}_2] = 0.05\\text{ M}$ at eq., find $[\\text{PCl}_5]$.",
      options: [
        "$\\approx 0.36\\text{ M}$",
        "$\\approx 1.39\\text{ M}$",
        "$\\approx 0.72\\text{ M}$",
        "$\\approx 2.78\\text{ M}$"
      ],
      correct: 1,
      explain:
        "$K_c = [\\text{PCl}_3][\\text{Cl}_2]/[\\text{PCl}_5] \\Rightarrow [\\text{PCl}_5] = (0.05)^2/(1.8\\times10^{-3}) \\approx 1.39\\text{ M}$."
    },
    {
      year: 2022,
      session: "Jul",
      question:
        "For $2A(g) \\rightleftharpoons B(g)$, $K_p = K_c (RT)^{\\Delta n_g}$. The value of $\\Delta n_g$ is:",
      options: ["$+1$", "$0$", "$-1$", "$+2$"],
      correct: 2,
      explain:
        "$\\Delta n_g = n(\\text{products}) - n(\\text{reactants}) = 1 - 2 = -1$."
    }
  ],
  "c-th-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "$\\Delta H$ for $\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)$ is $-393\\text{ kJ}$ and for $\\text{CO}(g) + \\tfrac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}_2$ is $-283\\text{ kJ}$. $\\Delta H_f^\\circ$ of CO?",
      options: [
        "$-110\\text{ kJ/mol}$",
        "$+110\\text{ kJ/mol}$",
        "$-393\\text{ kJ/mol}$",
        "$-676\\text{ kJ/mol}$"
      ],
      correct: 0,
      explain:
        "By Hess: $\\Delta H_f(\\text{CO}) = -393 - (-283) = -110\\text{ kJ/mol}$."
    }
  ],
  "c-ec-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "Using the Nernst equation at $25^\\circ\\text{C}$, the EMF of $\\text{Zn}\\,|\\,\\text{Zn}^{2+}(0.01\\text{ M})\\,\\|\\,\\text{Cu}^{2+}(1\\text{ M})\\,|\\,\\text{Cu}$ is:",
      options: ["$1.04\\text{ V}$", "$1.10\\text{ V}$", "$1.16\\text{ V}$", "$1.22\\text{ V}$"],
      correct: 2,
      explain:
        "$E = E^\\circ - (0.059/2)\\log(0.01/1) = 1.10 - (-0.059) = 1.16\\text{ V}$."
    },
    {
      year: 2022,
      session: "Jul",
      question:
        "How many Faradays are required to deposit $63.5\\text{ g}$ of Cu from $\\text{CuSO}_4$ solution?",
      options: ["$0.5\\text{ F}$", "$1\\text{ F}$", "$2\\text{ F}$", "$4\\text{ F}$"],
      correct: 2,
      explain:
        "$\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$. 1 mol Cu = $63.5\\text{ g}$ needs 2 mol $e^-$ = 2 F."
    }
  ],
  "c-kin-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "A first-order reaction is $87.5\\%$ complete in $30\\text{ min}$. Its half-life is:",
      options: ["$5\\text{ min}$", "$10\\text{ min}$", "$15\\text{ min}$", "$20\\text{ min}$"],
      correct: 1,
      explain:
        "$87.5\\%$ done means $1/8$ remains $= (1/2)^3$, so 3 half-lives = 30 min, $t_{1/2}=10$ min."
    },
    {
      year: 2022,
      session: "Jun",
      question:
        "Activation energy of a reaction is $50\\text{ kJ/mol}$. By what factor does $k$ change when $T$ goes from $300\\text{ K}$ to $310\\text{ K}$? ($R = 8.314\\text{ J/mol·K}$)",
      options: ["$\\approx 1.43$", "$\\approx 1.93$", "$\\approx 2.5$", "$\\approx 3.0$"],
      correct: 1,
      explain:
        "$\\ln(k_2/k_1) = (E_a/R)(1/T_1 - 1/T_2) \\approx 0.65 \\Rightarrow k_2/k_1 \\approx 1.93$."
    }
  ],
  "c-cb-01": [
    {
      year: 2023,
      session: "Apr",
      question: "Hybridization of central atom in $\\text{XeF}_4$ and its molecular shape?",
      options: [
        "$sp^3$, tetrahedral",
        "$sp^3d$, see-saw",
        "$sp^3d^2$, square planar",
        "$sp^3d^2$, octahedral"
      ],
      correct: 2,
      explain:
        "Xe has 4 bond pairs + 2 lone pairs = 6 pairs → $sp^3d^2$. Lone pairs occupy axial positions → square planar."
    },
    {
      year: 2022,
      session: "Jun",
      question:
        "Correct order of bond angles in $\\text{NH}_3$, $\\text{PH}_3$, $\\text{AsH}_3$, $\\text{SbH}_3$:",
      options: [
        "$\\text{NH}_3 > \\text{PH}_3 > \\text{AsH}_3 > \\text{SbH}_3$",
        "$\\text{SbH}_3 > \\text{AsH}_3 > \\text{PH}_3 > \\text{NH}_3$",
        "$\\text{PH}_3 > \\text{NH}_3 > \\text{AsH}_3 > \\text{SbH}_3$",
        "All are equal"
      ],
      correct: 0,
      explain:
        "Down the group, electronegativity decreases; bond pair gets pushed further away → smaller bond angle. $\\text{NH}_3$ largest ($\\approx 107^\\circ$)."
    }
  ],
  "c-sol-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "Freezing-point depression of a $1\\text{ molal}$ aqueous NaCl solution? ($K_f = 1.86\\text{ K kg/mol}$, complete dissociation.)",
      options: ["$1.86\\text{ K}$", "$3.72\\text{ K}$", "$5.58\\text{ K}$", "$0.93\\text{ K}$"],
      correct: 1,
      explain:
        "$\\Delta T_f = iK_f m = 2 \\times 1.86 \\times 1 = 3.72\\text{ K}$. NaCl gives $i \\approx 2$."
    },
    {
      year: 2023,
      session: "Apr",
      question:
        "$\\Delta T_b$ for a $0.1\\text{ m}$ glucose solution in water ($K_b = 0.52\\text{ K kg/mol}$)?",
      options: ["$0.052\\text{ K}$", "$0.52\\text{ K}$", "$0.026\\text{ K}$", "$5.2\\text{ K}$"],
      correct: 0,
      explain:
        "$\\Delta T_b = iK_b m = 1 \\times 0.52 \\times 0.1 = 0.052\\text{ K}$ (glucose non-electrolyte)."
    }
  ],

  // ─── Math ────────────────────────────────────────────────────────────────
  "m-int-01": [
    {
      year: 2024,
      session: "Jan",
      question: "Evaluate $\\displaystyle\\int \\dfrac{x^4}{x^2+1}\\,dx$.",
      options: [
        "$\\dfrac{x^3}{3} + \\tan^{-1}x + C$",
        "$\\dfrac{x^3}{3} - x + \\tan^{-1}x + C$",
        "$x^3 - x + \\tan^{-1}x + C$",
        "$\\dfrac{x^5}{5(x^2+1)} + C$"
      ],
      correct: 1,
      explain:
        "$\\dfrac{x^4}{x^2+1} = x^2 - 1 + \\dfrac{1}{x^2+1}$ by polynomial division. Integrate term by term."
    },
    {
      year: 2022,
      session: "Jul",
      question:
        "$\\displaystyle\\int \\dfrac{dx}{1+\\cos x}$.",
      options: [
        "$\\tan(x/2) + C$",
        "$\\cot(x/2) + C$",
        "$\\ln|1+\\cos x| + C$",
        "$\\sec(x/2) + C$"
      ],
      correct: 0,
      explain:
        "$1+\\cos x = 2\\cos^2(x/2)$, so integrand $= \\tfrac{1}{2}\\sec^2(x/2)$ → integrates to $\\tan(x/2)$."
    }
  ],
  "m-der-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "Find $\\dfrac{dy}{dx}$ if $y = \\tan^{-1}\\!\\left(\\dfrac{1-x}{1+x}\\right)$.",
      options: [
        "$\\dfrac{1}{1+x^2}$",
        "$-\\dfrac{1}{1+x^2}$",
        "$\\dfrac{2}{1+x^2}$",
        "$-\\dfrac{2}{1+x^2}$"
      ],
      correct: 1,
      explain:
        "Use $\\tan^{-1}a - \\tan^{-1}b$ identity with $a=1$: $y = \\pi/4 - \\tan^{-1}x$, so $dy/dx = -1/(1+x^2)$."
    }
  ],
  "m-mat-01": [
    {
      year: 2024,
      session: "Apr",
      question:
        "If $A$ is a $3\\times 3$ matrix with $\\det(A) = 4$, find $\\det(\\text{adj}(A))$.",
      options: ["$4$", "$8$", "$16$", "$64$"],
      correct: 2,
      explain:
        "$\\det(\\text{adj}(A)) = (\\det A)^{n-1}$ for an $n\\times n$ matrix. Here $n=3$: $4^2 = 16$."
    },
    {
      year: 2022,
      session: "Jun",
      question: "If $A$ is $2\\times2$ and $\\det(A) = 3$, then $\\det(2A) = ?$",
      options: ["$6$", "$12$", "$24$", "$3$"],
      correct: 1,
      explain:
        "$\\det(kA) = k^n \\det(A)$ for $n\\times n$. So $2^2 \\times 3 = 12$."
    }
  ],
  "m-prob-01": [
    {
      year: 2024,
      session: "Jan",
      question:
        "Bag A has $3$R, $4$W; Bag B has $5$R, $2$W. A bag is chosen at random; a ball drawn is red. Probability it came from Bag A?",
      options: [
        "$\\dfrac{3}{8}$",
        "$\\dfrac{5}{8}$",
        "$\\dfrac{3}{7}$",
        "$\\dfrac{1}{2}$"
      ],
      correct: 0,
      explain:
        "$P(A|R) = \\dfrac{P(R|A)P(A)}{P(R)} = \\dfrac{(3/7)(1/2)}{(3/7+5/7)/2} = \\dfrac{3}{8}$."
    }
  ],
  "m-vec-01": [
    {
      year: 2023,
      session: "Apr",
      question:
        "If $\\vec{a} = 2\\hat{i} - \\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} + 2\\hat{j} - \\hat{k}$, find $\\vec{a}\\times\\vec{b}$.",
      options: [
        "$\\hat{i} - 3\\hat{j} - 5\\hat{k}$",
        "$-\\hat{i} + 3\\hat{j} + 5\\hat{k}$",
        "$-\\hat{i} - 3\\hat{j} + 5\\hat{k}$",
        "$\\hat{i} + 3\\hat{j} - 5\\hat{k}$"
      ],
      correct: 1,
      explain:
        "Expand $\\det\\begin{pmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\2&-1&1\\\\1&2&-1\\end{pmatrix} = -\\hat{i}+3\\hat{j}+5\\hat{k}$."
    }
  ],
  "m-lim-01": [
    {
      year: 2024,
      session: "Apr",
      question: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{1 - \\cos 2x}{x^2}$",
      options: ["$1$", "$2$", "$\\dfrac{1}{2}$", "does not exist"],
      correct: 1,
      explain:
        "$1-\\cos 2x = 2\\sin^2 x$. So limit $= 2\\lim(\\sin x / x)^2 = 2$."
    },
    {
      year: 2022,
      session: "Jun",
      question: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x - 1 - x}{x^2}$",
      options: ["$0$", "$1$", "$\\dfrac{1}{2}$", "does not exist"],
      correct: 2,
      explain:
        "Expand $e^x = 1 + x + x^2/2 + O(x^3)$. Numerator $= x^2/2 + O(x^3)$, divide by $x^2$ → $1/2$."
    }
  ]
};
