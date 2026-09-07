"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio JavaScript loaded successfully.");

    /* =====================================================
       BASIC ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const navigation = document.querySelector(".navigation");
    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollProgress = document.querySelector(".scroll-progress");
    const cursorGlow = document.querySelector(".cursor-glow");

    /* =====================================================
       TYPING ANIMATION — UPDATED FIX
    ===================================================== */

    const heroRole = document.querySelector(".hero-role");

    let typingElement = document.querySelector(
        "#typing-text, #typingText, .typing-text, .typingText, [data-typing]"
    );

    /*
       Agar index.html me typing span missing hai,
       to JavaScript automatically create karega.
    */

    if (!typingElement && heroRole) {
        typingElement = document.createElement("span");
        typingElement.id = "typing-text";
        typingElement.className = "typing-text";

        heroRole.innerHTML = "";
        heroRole.appendChild(typingElement);

        const typingCursor = document.createElement("span");
        typingCursor.className = "typing-cursor";
        typingCursor.setAttribute("aria-hidden", "true");

        heroRole.appendChild(typingCursor);
    }

    const roles = [
        "Software Developer",
        "Full Stack Developer",
        "Backend Developer",
        "AI Enthusiast"
    ];

    if (typingElement) {
        let roleIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;

        typingElement.textContent = "";

        function runTypingAnimation() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                characterIndex++;

                typingElement.textContent = currentRole.substring(
                    0,
                    characterIndex
                );

                if (characterIndex === currentRole.length) {
                    isDeleting = true;

                    setTimeout(runTypingAnimation, 1500);
                    return;
                }
            } else {
                characterIndex--;

                typingElement.textContent = currentRole.substring(
                    0,
                    characterIndex
                );

                if (characterIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            const typingSpeed = isDeleting ? 45 : 90;

            setTimeout(runTypingAnimation, typingSpeed);
        }

        runTypingAnimation();
    } else {
        console.warn("Hero role element not found in index.html");
    }

    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projectData = {
        hirepilot: {
            label: "Featured Full Stack AI Project",

            title: "HirePilot AI",

            description:
                "HirePilot AI is an intelligent interview and recruitment platform designed to simplify candidate screening, resume analysis and interview preparation using artificial intelligence.",

            features: [
                "AI-powered ATS resume analysis and scoring",
                "Resume parsing and candidate information extraction",
                "AI-generated interview questions",
                "Candidate and recruiter dashboard",
                "Secure authentication using JWT",
                "MongoDB-based candidate management",
                "Responsive full-stack web interface"
            ],

            technologies: [
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "OpenAI API",
                "JWT",
                "Cloudinary"
            ]
        },

        recruitiq: {
            label: "AI Recruitment Platform",

            title: "RecruitIQ",

            description:
                "RecruitIQ is an AI-powered recruitment management platform created for job posting, applicant tracking, candidate management and intelligent hiring workflows.",

            features: [
                "Job posting and management",
                "Applicant tracking system",
                "Candidate profile management",
                "Recruitment dashboard",
                "Application status tracking",
                "Secure user authentication",
                "Responsive user interface"
            ],

            technologies: [
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "REST API",
                "JWT"
            ]
        },

        emotion: {
            label: "Computer Vision Project",

            title: "AI Emotion Detection",

            description:
                "AI Emotion Detection is a real-time facial emotion recognition system that uses computer vision and machine learning to identify human facial expressions.",

            features: [
                "Real-time webcam face detection",
                "Facial expression recognition",
                "Emotion classification",
                "Live prediction display",
                "Computer vision image processing",
                "Machine-learning model integration"
            ],

            technologies: [
                "Python",
                "OpenCV",
                "Machine Learning",
                "Computer Vision",
                "NumPy"
            ]
        },

        agriculture: {
            label: "Smart Technology Project",

            title: "Smart Agriculture System",

            description:
                "Smart Agriculture System is an intelligent farming solution designed to monitor farming conditions and support better resource-management decisions.",

            features: [
                "Environmental-condition monitoring",
                "Crop and farm-data management",
                "Smart resource-management support",
                "Digital monitoring dashboard",
                "Database-based records",
                "Responsive web interface"
            ],

            technologies: [
                "IoT",
                "HTML",
                "CSS",
                "JavaScript",
                "MongoDB",
                "Web Technologies"
            ]
        }
    };

    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const modalOverlay = document.querySelector(".modal-overlay");
    const modalCloseButton = document.querySelector(".modal-close");

    const modalLabel = document.querySelector(
        ".modal-label, #modal-label"
    );

    const modalTitle = document.querySelector(
        ".project-modal h2, #modal-title, [data-modal-title]"
    );

    const modalDescription = document.querySelector(
        ".modal-description, #modal-description, [data-modal-description]"
    );

    const modalFeatures = document.querySelector(
        ".modal-section ul, #modal-features, [data-modal-features]"
    );

    const modalTechnologies = document.querySelector(
        ".project-modal .project-technologies, #modal-technologies"
    );

    function normalizeProjectKey(value) {
        const normalizedValue = String(value || "")
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-z0-9]/g, "");

        if (normalizedValue.includes("hirepilot")) {
            return "hirepilot";
        }

        if (normalizedValue.includes("recruitiq")) {
            return "recruitiq";
        }

        if (
            normalizedValue.includes("emotion") ||
            normalizedValue.includes("opencv") ||
            normalizedValue.includes("detection")
        ) {
            return "emotion";
        }

        if (
            normalizedValue.includes("agriculture") ||
            normalizedValue.includes("farming") ||
            normalizedValue.includes("smartfarm")
        ) {
            return "agriculture";
        }

        return "";
    }

    function detectProject(button) {
        const explicitProject =
            button.dataset.project ||
            button.dataset.projectId ||
            button.dataset.modal ||
            button.getAttribute("href") ||
            "";

        let projectKey = normalizeProjectKey(explicitProject);

        if (projectKey) {
            return projectKey;
        }

        const projectContainer = button.closest(
            ".project-card, .featured-project, article"
        );

        if (!projectContainer) {
            return "";
        }

        const projectHeading = projectContainer.querySelector(
            "h2, h3, h4"
        );

        projectKey = normalizeProjectKey(
            projectHeading?.textContent || ""
        );

        return projectKey;
    }

    function createFeatureList(features) {
        return features
            .map((feature) => `<li>${feature}</li>`)
            .join("");
    }

    function createTechnologyList(technologies) {
        return technologies
            .map((technology) => `<span>${technology}</span>`)
            .join("");
    }

    function openProjectModal(projectKey) {
        const project = projectData[projectKey];

        if (!project) {
            console.error("Project data not found:", projectKey);
            return;
        }

        if (!modalOverlay) {
            alert(
                `${project.title}\n\n${project.description}\n\nTechnologies: ${project.technologies.join(", ")}`
            );

            return;
        }

        if (modalLabel) {
            modalLabel.textContent = project.label;
        }

        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        if (modalDescription) {
            modalDescription.textContent = project.description;
        }

        if (modalFeatures) {
            modalFeatures.innerHTML = createFeatureList(
                project.features
            );
        }

        if (modalTechnologies) {
            modalTechnologies.innerHTML = createTechnologyList(
                project.technologies
            );
        }

        modalOverlay.classList.add("open");
        modalOverlay.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        modalCloseButton?.focus();
    }

    function closeProjectModal() {
        if (!modalOverlay) {
            return;
        }

        modalOverlay.classList.remove("open");
        modalOverlay.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");
    }

    const projectButtons = document.querySelectorAll(
        [
            ".project-link",
            ".case-study-button",
            ".view-project-button",
            ".project-actions button",
            "[data-project]",
            "[data-project-id]",
            "[data-modal]"
        ].join(",")
    );

    projectButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const projectKey = detectProject(button);

            if (!projectKey) {
                console.error(
                    "Project could not be identified:",
                    button
                );

                return;
            }

            openProjectModal(projectKey);
        });
    });

    modalCloseButton?.addEventListener(
        "click",
        closeProjectModal
    );

    modalOverlay?.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeProjectModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectModal();
        }
    });

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    menuButton?.addEventListener("click", () => {
        const menuIsOpen = navigation?.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            Boolean(menuIsOpen)
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(Boolean(menuIsOpen))
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation?.classList.remove("open");
            menuButton?.classList.remove("active");

            menuButton?.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });

    /* =====================================================
       NAVBAR AND SCROLL PROGRESS
    ===================================================== */

    function updateScrollEffects() {
        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        navbar?.classList.toggle(
            "scrolled",
            scrollTop > 30
        );

        if (scrollProgress) {
            const scrollableHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrollPercentage =
                scrollableHeight > 0
                    ? (scrollTop / scrollableHeight) * 100
                    : 0;

            scrollProgress.style.width =
                `${scrollPercentage}%`;
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollEffects,
        { passive: true }
    );

    updateScrollEffects();

    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {
                        const href = link
                            .getAttribute("href")
                            ?.replace("#", "");

                        link.classList.toggle(
                            "active",
                            href === sectionId
                        );
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {
        window.addEventListener(
            "mousemove",
            (event) => {
                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;
            },
            { passive: true }
        );
    }

    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm = document.querySelector(
        ".contact-form, #contact-form"
    );

    const formStatus =
        document.querySelector(".form-status");

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const name = String(
            formData.get("name") || ""
        ).trim();

        const email = String(
            formData.get("email") || ""
        ).trim();

        const subject = String(
            formData.get("subject") || ""
        ).trim();

        const message = String(
            formData.get("message") || ""
        ).trim();

        if (!name || !email || !subject || !message) {
            if (formStatus) {
                formStatus.textContent =
                    "Please fill in all fields.";
            } else {
                alert("Please fill in all fields.");
            }

            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            if (formStatus) {
                formStatus.textContent =
                    "Please enter a valid email address.";
            } else {
                alert("Please enter a valid email address.");
            }

            return;
        }

        const emailSubject = encodeURIComponent(
            `${subject} - Portfolio message from ${name}`
        );

        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        if (formStatus) {
            formStatus.textContent =
                "Opening your email application...";
        }

        window.location.href =
            `mailto:piyushsrmu123@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        setTimeout(() => {
            contactForm.reset();

            if (formStatus) {
                formStatus.textContent =
                    "Message prepared successfully.";
            }
        }, 800);
    });

    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const currentYear = document.querySelector(
        "#current-year, [data-current-year]"
    );

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }
});