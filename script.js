/**
 * CampusPulse - Single-Page Event Board & 1-Click RSVP
 * Features:
 *  - Fluid Sunrise & Sunset Animation (Sun sets down-right, Moon rises from bottom-left)
 *  - Custom Day / Night Sky Switch
 *  - Campus Email-Driven Role Detection (Admin, Council, Club Lead, Student)
 *  - 1-Click RSVP with LocalStorage Persistence
 *  - Category & Role Filtering + Real-Time Search
 *  - Google Calendar Integration & Community Event Publishing
 */

// Initial Seed Data with Verified Campus Emails & Roles
const DEFAULT_EVENTS = [
  {
    id: "evt-admin-1",
    title: "Dean's Welcome Address & First-Year Campus Orientation Fair",
    category: "Cultural",
    uploaderRole: "School Administration",
    uploaderName: "Office of the Dean of Student Welfare",
    uploaderEmail: "dean.welfare@admin.campus.edu",
    club: "University Administration",
    date: "2026-10-11T09:30:00",
    venue: "Main University Auditorium (Grand Hall)",
    description: "The official academic and campus welcome for all incoming freshers. Learn about campus resources, academic credits, mentorship pairings, and club registrations.",
    prerequisites: "Mandatory for all 1st-year students. Please bring your college admission slip or temporary ID card.",
    attendees: 320
  },
  {
    id: "evt-club-1",
    title: "Freshers' Hackathon 2026: 24h Web & AI Sprint",
    category: "Tech",
    uploaderRole: "Club Lead",
    uploaderName: "Sarah Mehta (GDSC Lead)",
    uploaderEmail: "sarah.mehta@clubs.campus.edu",
    club: "Google Developer Student Club (GDSC)",
    date: "2026-10-12T10:00:00",
    venue: "Turing Computing Lab, Block B",
    description: "Team up with fellow first-years to build innovative web apps and AI prototypes in 24 hours. Mentors will be on-site to help beginners with zero coding experience!",
    prerequisites: "Laptop + charger. Basic curiosity (no prior hackathon experience required). Free meals & red bull provided!",
    attendees: 84
  },
  {
    id: "evt-council-1",
    title: "Inter-Branch 7-a-Side Football Tournament 2026",
    category: "Sports",
    uploaderRole: "Student Council",
    uploaderName: "Campus Sports Committee (Student Council)",
    uploaderEmail: "sports.committee@council.campus.edu",
    club: "Student Council Sports Wing",
    date: "2026-10-13T15:00:00",
    venue: "Main Athletic Turf Ground",
    description: "The biggest fresher sports clash of the semester. Represent your department branch or come cheer on your classmates in high-energy knockout matches.",
    prerequisites: "Football cleats / sports shoes required for registered players. Spectators are welcome in the bleachers.",
    attendees: 115
  },
  {
    id: "evt-club-2",
    title: "Git & GitHub Hands-on Bootcamp for Freshers",
    category: "Tech",
    uploaderRole: "Club Lead",
    uploaderName: "Devansh Patel (Club President)",
    uploaderEmail: "devansh.patel@clubs.campus.edu",
    club: "Open Source Society",
    date: "2026-10-14T16:30:00",
    venue: "CS Seminar Hall 101",
    description: "Learn how to save your code, collaborate with classmates, and contribute to open-source projects. We'll set up your GitHub profile and push your very first repository.",
    prerequisites: "Bring your laptop with Git installed (or arrive 15 minutes early for install help).",
    attendees: 62
  },
  {
    id: "evt-student-1",
    title: "Campus Blitz Chess Open & Simultaneous Exhibition",
    category: "Sports",
    uploaderRole: "Student Initiative",
    uploaderName: "Rohan Verma & Batchmates (Section B)",
    uploaderEmail: "rohan.v26@student.campus.edu",
    club: "Hostel 4 Chess Enthusiasts",
    date: "2026-10-15T14:00:00",
    venue: "Student Lounge, 2nd Floor",
    description: "5-round Swiss tournament (5 min + 3 sec blitz). Organized by students for students. Top fresher player gets an exhibition match against our university champion!",
    prerequisites: "Knowledge of basic chess rules. FIDE ratings not required. Chess boards and clocks provided.",
    attendees: 38
  },
  {
    id: "evt-admin-2",
    title: "Campus Safety, Anti-Ragging & IT Network Briefing",
    category: "Tech",
    uploaderRole: "School Administration",
    uploaderName: "Campus IT Services & Proctorial Board",
    uploaderEmail: "proctor.office@admin.campus.edu",
    club: "Dean's Proctorial Board",
    date: "2026-10-16T11:00:00",
    venue: "Seminar Complex Room 2",
    description: "Learn how to configure your high-speed campus Wi-Fi credentials, access library research portals, and understand campus safety, cybersecurity, and emergency helplines.",
    prerequisites: "Have your university roll number handy. Bring your laptop/phone to configure Wi-Fi certificates on the spot.",
    attendees: 195
  },
  {
    id: "evt-club-3",
    title: "Battle of the Bands & Acoustic Sunset Jam",
    category: "Cultural",
    uploaderRole: "Club Lead",
    uploaderName: "Rhea Sen (Head of Music Society)",
    uploaderEmail: "cadence.music@clubs.campus.edu",
    club: "Cadence Music Society",
    date: "2026-10-17T17:30:00",
    venue: "Open Air Amphitheatre (OAT)",
    description: "Kick back after lectures and listen to campus bands battle for the annual fresher trophy. Open mic session starts right after the headline performances!",
    prerequisites: "Entry is completely free. Bring your college ID card and student friends.",
    attendees: 140
  },
  {
    id: "evt-student-2",
    title: "Fresher Peer Study Circle: Calculus & Python Prep",
    category: "Tech",
    uploaderRole: "Student Initiative",
    uploaderName: "Tanya & Aryan (Fresher Peer Tutors)",
    uploaderEmail: "tanya.math26@student.campus.edu",
    club: "First-Year Study Guild",
    date: "2026-10-18T18:00:00",
    venue: "Central Library Discussion Room 3",
    description: "Informal student-led study circle tackling upcoming mid-sem problem sets in Engineering Mathematics and Intro to Python. Great way to study with peers without stress!",
    prerequisites: "Bring your textbook/notes and problem sheets. Everyone is welcome to ask questions.",
    attendees: 29
  },
  {
    id: "evt-council-2",
    title: "Fresher Open Forum: Ask Your Student Council Anything",
    category: "Cultural",
    uploaderRole: "Student Council",
    uploaderName: "Aarav Sharma (Student Council President)",
    uploaderEmail: "president@council.campus.edu",
    club: "General Student Council",
    date: "2026-10-19T17:00:00",
    venue: "Student Activity Center (SAC) Meeting Hall",
    description: "Have questions about hostel mess menus, curfew hours, club funding, or campus transport? Your elected Student Council reps are hosting an open mic Q&A session.",
    prerequisites: "Open to all students. Bring any questions or suggestions for the semester.",
    attendees: 90
  },
  {
    id: "evt-club-4",
    title: "Street Play (Nukkad Natak) & Drama Auditions",
    category: "Cultural",
    uploaderRole: "Club Lead",
    uploaderName: "Vikram Malhotra (Dramatics Convener)",
    uploaderEmail: "rangmanch@clubs.campus.edu",
    club: "Rangmanch Dramatics Club",
    date: "2026-10-20T16:00:00",
    venue: "Student Activity Center (SAC) Stage",
    description: "Passionate about theatre, voice acting, or scriptwriting? Join our high-energy auditions for the annual national fest production. Roles open for actors, directors, and crew.",
    prerequisites: "Comfortable clothes. Bring a 1-minute monologue or prepare an impromptu prompt with us.",
    attendees: 47
  }
];

class CampusPulseApp {
  constructor() {
    this.theme = this.loadTheme();
    this.events = this.loadEvents();
    this.userRsvps = this.loadRsvps();
    this.currentCategory = "all";
    this.selectedOrganizerRole = "all";
    this.searchQuery = "";
    this.sortBy = "date-asc";
    this.activeModalEvent = null;

    this.applyTheme(this.theme, false);
    this.initDOMElements();
    this.bindEvents();
    this.updateStats();
    this.render();
  }

  /* ------------------------------------------------------------------------
     Theme Management (Fluid Sunrise & Sunset Animation)
     ------------------------------------------------------------------------ */
  loadTheme() {
    const saved = localStorage.getItem("campuspulse_theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  applyTheme(theme, notify = true) {
    this.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("campuspulse_theme", theme);

    // Update switch text
    const switchStatusText = document.getElementById("switchStatusText");
    if (switchStatusText) {
      switchStatusText.textContent = theme === "dark" ? "Night" : "Day";
    }

    if (notify) {
      if (theme === "dark") {
        this.showToast("🌇 Sunset: The Sun has set, entering Night Mode 🌙", "info");
      } else {
        this.showToast("🌅 Sunrise: The Sun has risen, entering Day Mode ☀️", "info");
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme, true);
  }

  /* ------------------------------------------------------------------------
     Campus Email Domain & Role Detection Engine
     ------------------------------------------------------------------------ */
  detectRoleFromEmail(email) {
    const clean = (email || "").trim().toLowerCase();
    
    if (!clean || !clean.includes("@")) {
      return {
        role: "Student Initiative",
        label: "👥 Student Initiative",
        badgeClass: "uploader-student",
        verification: "Campus ID Pending",
        hint: "Enter your official university email (e.g. name@student.campus.edu)"
      };
    }

    // 1. School Administration
    if (
      clean.includes("@admin.") ||
      clean.includes("@administration.") ||
      clean.includes("dean@") ||
      clean.includes("proctor@") ||
      clean.includes("registrar@") ||
      clean.includes("director@") ||
      clean.includes("faculty@") ||
      clean.includes("@univ-admin.")
    ) {
      return {
        role: "School Administration",
        label: "🏛️ School Admin",
        badgeClass: "uploader-admin",
        verification: "✓ Verified Official Admin",
        hint: "Domain verified: @admin.campus.edu → Official University Announcement"
      };
    }

    // 2. Student Council
    if (
      clean.includes("@council.") ||
      clean.includes("council@") ||
      clean.includes("president@council") ||
      clean.includes("sports.committee@council") ||
      clean.includes("studentcouncil@")
    ) {
      return {
        role: "Student Council",
        label: "👑 Student Council",
        badgeClass: "uploader-council",
        verification: "✓ Verified Student Council",
        hint: "Domain verified: @council.campus.edu → Elected Student Government"
      };
    }

    // 3. Head of Club / Recognized Club Lead
    if (
      clean.includes("@clubs.") ||
      clean.includes("@club.") ||
      clean.includes("gdsc@") ||
      clean.includes("acm@") ||
      clean.includes("ieee@") ||
      clean.includes("lead@") ||
      clean.includes("society@") ||
      clean.includes("president@club")
    ) {
      return {
        role: "Club Lead",
        label: "⚡ Head of Club",
        badgeClass: "uploader-club",
        verification: "✓ Verified Club Lead",
        hint: "Domain verified: @clubs.campus.edu → Recognized Society Head"
      };
    }

    // 4. Default: Individual or Group of Normal Students
    return {
      role: "Student Initiative",
      label: "👥 Student Initiative",
      badgeClass: "uploader-student",
      verification: "✓ Verified Student Account",
      hint: `Domain verified: ${clean.split("@")[1] || "campus.edu"} → Peer Student Notice`
    };
  }

  /* ------------------------------------------------------------------------
     Storage Helpers
     ------------------------------------------------------------------------ */
  loadEvents() {
    try {
      const stored = localStorage.getItem("campuspulse_events_v3");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load events from localStorage:", e);
    }
    localStorage.setItem("campuspulse_events_v3", JSON.stringify(DEFAULT_EVENTS));
    return [...DEFAULT_EVENTS];
  }

  saveEvents() {
    try {
      localStorage.setItem("campuspulse_events_v3", JSON.stringify(this.events));
    } catch (e) {
      console.error("Failed to save events:", e);
    }
  }

  loadRsvps() {
    try {
      const stored = localStorage.getItem("campuspulse_rsvps");
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load RSVPs:", e);
    }
    return new Set(["evt-club-1"]);
  }

  saveRsvps() {
    try {
      localStorage.setItem(
        "campuspulse_rsvps",
        JSON.stringify(Array.from(this.userRsvps))
      );
    } catch (e) {
      console.error("Failed to save RSVPs:", e);
    }
  }

  /* ------------------------------------------------------------------------
     DOM Initialization
     ------------------------------------------------------------------------ */
  initDOMElements() {
    // Theme Switch & Navigation
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.switchStatusText = document.getElementById("switchStatusText");
    this.searchInput = document.getElementById("searchInput");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");
    this.filterPills = document.querySelectorAll(".filter-pill");
    this.organizerFilterSelect = document.getElementById("organizerFilterSelect");
    this.sortSelect = document.getElementById("sortSelect");
    this.eventsGrid = document.getElementById("eventsGrid");
    this.emptyState = document.getElementById("emptyState");
    this.resetFiltersBtn = document.getElementById("resetFiltersBtn");
    this.myRsvpsBtn = document.getElementById("myRsvpsBtn");
    this.rsvpBadgeCount = document.getElementById("rsvpBadgeCount");
    this.resultsCount = document.getElementById("resultsCount");
    this.filterLabel = document.getElementById("filterLabel");

    // Stats
    this.totalEventsCount = document.getElementById("totalEventsCount");
    this.techEventsCount = document.getElementById("techEventsCount");
    this.culturalEventsCount = document.getElementById("culturalEventsCount");
    this.sportsEventsCount = document.getElementById("sportsEventsCount");

    // Event Details Modal
    this.detailsModal = document.getElementById("detailsModal");
    this.closeDetailsModalBtn = document.getElementById("closeDetailsModalBtn");
    this.modalCategoryBadge = document.getElementById("modalCategoryBadge");
    this.modalUploaderBadge = document.getElementById("modalUploaderBadge");
    this.modalVerifiedStamp = document.getElementById("modalVerifiedStamp");
    this.modalClubName = document.getElementById("modalClubName");
    this.modalEventTitle = document.getElementById("modalEventTitle");
    this.modalDateTime = document.getElementById("modalDateTime");
    this.modalVenue = document.getElementById("modalVenue");
    this.modalUploadedBy = document.getElementById("modalUploadedBy");
    this.modalUploaderEmailLink = document.getElementById("modalUploaderEmailLink");
    this.modalAttendees = document.getElementById("modalAttendees");
    this.modalDescription = document.getElementById("modalDescription");
    this.modalPrereq = document.getElementById("modalPrereq");
    this.modalPrereqSection = document.getElementById("modalPrereqSection");
    this.modalCalendarLink = document.getElementById("modalCalendarLink");
    this.modalRsvpBtn = document.getElementById("modalRsvpBtn");

    // Create Modal & Live Detection
    this.createModal = document.getElementById("createModal");
    this.openCreateModalBtn = document.getElementById("openCreateModalBtn");
    this.closeCreateModalBtn = document.getElementById("closeCreateModalBtn");
    this.cancelCreateBtn = document.getElementById("cancelCreateBtn");
    this.createEventForm = document.getElementById("createEventForm");
    this.eventCampusEmailInput = document.getElementById("eventCampusEmailInput");
    this.detectedRoleBadge = document.getElementById("detectedRoleBadge");
    this.detectedVerification = document.getElementById("detectedVerification");
    this.emailHintText = document.getElementById("emailHintText");
    this.eventUploaderNameInput = document.getElementById("eventUploaderNameInput");
    this.eventUploaderRoleInput = document.getElementById("eventUploaderRoleInput");
    this.eventDateInput = document.getElementById("eventDateInput");

    // Initial Switch status label
    if (this.switchStatusText) {
      this.switchStatusText.textContent = this.theme === "dark" ? "Night" : "Day";
    }

    // Default datetime-local
    if (this.eventDateInput) {
      const now = new Date();
      now.setDate(now.getDate() + 3);
      now.setHours(16, 0, 0, 0);
      this.eventDateInput.value = now.toISOString().slice(0, 16);
    }
  }

  /* ------------------------------------------------------------------------
     Event Bindings
     ------------------------------------------------------------------------ */
  bindEvents() {
    // Custom Day/Night Switch: Triggers fluid sunrise / sunset animation
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());

    // Live Campus Email Detection in Post Event Modal
    this.eventCampusEmailInput.addEventListener("input", (e) => {
      this.handleEmailInput(e.target.value);
    });

    // Search
    this.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.clearSearchBtn.classList.toggle("hidden", this.searchQuery.length === 0);
      this.render();
    });

    this.clearSearchBtn.addEventListener("click", () => {
      this.searchInput.value = "";
      this.searchQuery = "";
      this.clearSearchBtn.classList.add("hidden");
      this.searchInput.focus();
      this.render();
    });

    // Category Filter Pills
    this.filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const category = pill.getAttribute("data-category");
        this.setCategory(category);
      });
    });

    // Organizer Role Filter Select
    this.organizerFilterSelect.addEventListener("change", (e) => {
      this.selectedOrganizerRole = e.target.value;
      this.render();
    });

    // Sort Select
    this.sortSelect.addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.render();
    });

    // Reset Filters
    this.resetFiltersBtn.addEventListener("click", () => {
      this.resetFilters();
    });

    // Header My RSVPs toggle
    this.myRsvpsBtn.addEventListener("click", () => {
      if (this.currentCategory === "my-rsvps") {
        this.setCategory("all");
      } else {
        this.setCategory("my-rsvps");
      }
    });

    // Modal Close triggers
    this.closeDetailsModalBtn.addEventListener("click", () => this.closeDetailsModal());
    this.closeCreateModalBtn.addEventListener("click", () => this.closeCreateModal());
    this.cancelCreateBtn.addEventListener("click", () => this.closeCreateModal());

    this.detailsModal.addEventListener("click", (e) => {
      if (e.target === this.detailsModal) this.closeDetailsModal();
    });

    this.createModal.addEventListener("click", (e) => {
      if (e.target === this.createModal) this.closeCreateModal();
    });

    // Keyboard ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeDetailsModal();
        this.closeCreateModal();
      }
    });

    // Open Create Modal
    this.openCreateModalBtn.addEventListener("click", () => {
      this.createModal.classList.remove("hidden");
      this.eventCampusEmailInput.focus();
    });

    // Submit Create Event
    this.createEventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleCreateEvent();
    });

    // Modal RSVP action
    this.modalRsvpBtn.addEventListener("click", () => {
      if (this.activeModalEvent) {
        this.toggleRsvp(this.activeModalEvent.id);
        this.updateModalRsvpState(this.activeModalEvent);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Live Email Detection Handler
     ------------------------------------------------------------------------ */
  handleEmailInput(email) {
    const detection = this.detectRoleFromEmail(email);

    // Update Live Preview Badge
    this.detectedRoleBadge.className = `uploader-badge ${detection.badgeClass}`;
    this.detectedRoleBadge.textContent = detection.label;
    this.detectedVerification.textContent = detection.verification;
    this.emailHintText.innerHTML = detection.hint;

    // Auto-select dropdown to match detected authority
    this.eventUploaderRoleInput.value = detection.role;

    // Auto-suggest name if empty
    if (!this.eventUploaderNameInput.value.trim() && email.includes("@")) {
      const alias = email.split("@")[0].replace(/[._-]/g, " ");
      const formatted = alias
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      this.eventUploaderNameInput.value = formatted;
    }
  }

  /* ------------------------------------------------------------------------
     Filter & State Logic
     ------------------------------------------------------------------------ */
  setCategory(category) {
    this.currentCategory = category;

    this.filterPills.forEach((p) => {
      const match = p.getAttribute("data-category") === category;
      p.classList.toggle("active", match);
      p.setAttribute("aria-selected", match ? "true" : "false");
    });

    this.myRsvpsBtn.classList.toggle("active", category === "my-rsvps");
    this.render();
  }

  resetFilters() {
    this.searchInput.value = "";
    this.searchQuery = "";
    this.clearSearchBtn.classList.add("hidden");
    this.organizerFilterSelect.value = "all";
    this.selectedOrganizerRole = "all";
    this.sortSelect.value = "date-asc";
    this.sortBy = "date-asc";
    this.setCategory("all");
  }

  updateStats() {
    const total = this.events.length;
    const tech = this.events.filter((e) => e.category === "Tech").length;
    const cultural = this.events.filter((e) => e.category === "Cultural").length;
    const sports = this.events.filter((e) => e.category === "Sports").length;

    this.totalEventsCount.textContent = total;
    this.techEventsCount.textContent = tech;
    this.culturalEventsCount.textContent = cultural;
    this.sportsEventsCount.textContent = sports;
    this.rsvpBadgeCount.textContent = this.userRsvps.size;
  }

  /* ------------------------------------------------------------------------
     1-Click RSVP Logic
     ------------------------------------------------------------------------ */
  toggleRsvp(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return;

    const isRsvpd = this.userRsvps.has(eventId);

    if (isRsvpd) {
      this.userRsvps.delete(eventId);
      event.attendees = Math.max(0, event.attendees - 1);
      this.showToast(`RSVP removed for: ${event.title}`, "info");
    } else {
      this.userRsvps.add(eventId);
      event.attendees += 1;
      this.showToast(`🎉 RSVP Confirmed! You're registered for "${event.title}"`, "success");
    }

    this.saveRsvps();
    this.saveEvents();
    this.updateStats();
    this.render();
  }

  /* ------------------------------------------------------------------------
     Create Event (with Campus Email Verification)
     ------------------------------------------------------------------------ */
  handleCreateEvent() {
    const email = this.eventCampusEmailInput.value.trim().toLowerCase();
    const uploaderRole = this.eventUploaderRoleInput.value;
    const uploaderName = this.eventUploaderNameInput.value.trim();
    const title = document.getElementById("eventTitleInput").value.trim();
    const category = document.getElementById("eventCategoryInput").value;
    const club = document.getElementById("eventClubInput").value.trim();
    const date = document.getElementById("eventDateInput").value;
    const venue = document.getElementById("eventVenueInput").value.trim();
    const desc = document.getElementById("eventDescInput").value.trim();
    const prereq = document.getElementById("eventPrereqInput").value.trim();

    if (!email || !title || !uploaderRole || !uploaderName || !category || !club || !date || !venue || !desc) {
      this.showToast("Please fill in all required fields.", "info");
      return;
    }

    const newEvent = {
      id: "evt-" + Date.now(),
      title,
      uploaderEmail: email,
      uploaderRole,
      uploaderName,
      category,
      club,
      date,
      venue,
      description: desc,
      prerequisites: prereq || "Open to all students! Bring your college ID card.",
      attendees: 1
    };

    this.events.unshift(newEvent);
    this.saveEvents();
    this.updateStats();

    this.createEventForm.reset();
    this.closeCreateModal();

    this.showToast(`📢 Event published by ${uploaderName} (${email})!`, "success");
    this.render();
  }

  closeCreateModal() {
    this.createModal.classList.add("hidden");
  }

  /* ------------------------------------------------------------------------
     Event Details Modal
     ------------------------------------------------------------------------ */
  openDetailsModal(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return;

    this.activeModalEvent = event;

    // Badges & Email
    this.modalCategoryBadge.className = `category-badge category-${event.category}`;
    this.modalCategoryBadge.textContent = this.getCategoryBadgeText(event.category);

    this.modalUploaderBadge.className = `uploader-badge ${this.getUploaderBadgeClass(event.uploaderRole)}`;
    this.modalUploaderBadge.textContent = this.getUploaderBadgeLabel(event.uploaderRole);

    this.modalClubName.textContent = `Host Organization: ${event.club}`;
    this.modalEventTitle.textContent = event.title;
    this.modalDateTime.textContent = this.formatFullDateTime(event.date);
    this.modalVenue.textContent = event.venue;
    this.modalUploadedBy.textContent = `${event.uploaderName} (${event.uploaderRole})`;
    
    // Email Link
    if (event.uploaderEmail) {
      this.modalUploaderEmailLink.textContent = `✉️ ${event.uploaderEmail} (Contact Organizer)`;
      this.modalUploaderEmailLink.href = `mailto:${event.uploaderEmail}?subject=Regarding ${encodeURIComponent(event.title)}`;
      this.modalUploaderEmailLink.classList.remove("hidden");
    } else {
      this.modalUploaderEmailLink.classList.add("hidden");
    }

    this.modalAttendees.textContent = `${event.attendees} students registered`;
    this.modalDescription.textContent = event.description;

    if (event.prerequisites) {
      this.modalPrereqSection.classList.remove("hidden");
      this.modalPrereq.textContent = event.prerequisites;
    } else {
      this.modalPrereqSection.classList.add("hidden");
    }

    this.modalCalendarLink.href = this.generateGoogleCalendarUrl(event);
    this.updateModalRsvpState(event);
    this.detailsModal.classList.remove("hidden");
  }

  updateModalRsvpState(event) {
    const isRsvpd = this.userRsvps.has(event.id);
    if (isRsvpd) {
      this.modalRsvpBtn.className = "btn btn-rsvp rsvpd";
      this.modalRsvpBtn.innerHTML = `<span>✓ You're RSVP'd</span>`;
    } else {
      this.modalRsvpBtn.className = "btn btn-rsvp";
      this.modalRsvpBtn.innerHTML = `<span>⚡ 1-Click RSVP</span>`;
    }
    this.modalAttendees.textContent = `${event.attendees} students registered`;
  }

  closeDetailsModal() {
    this.detailsModal.classList.add("hidden");
    this.activeModalEvent = null;
  }

  /* ------------------------------------------------------------------------
     Calendar URL Generator
     ------------------------------------------------------------------------ */
  generateGoogleCalendarUrl(event) {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatGDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${formatGDate(startDate)}/${formatGDate(endDate)}`,
      details: `${event.description}\n\nOrganizer: ${event.uploaderName} (${event.uploaderEmail})\nAuthority: ${event.uploaderRole}\nHost: ${event.club}`,
      location: event.venue
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  /* ------------------------------------------------------------------------
     Formatting & Badge Helpers
     ------------------------------------------------------------------------ */
  formatCardDate(dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  }

  formatFullDateTime(dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  }

  getCategoryBadgeText(category) {
    switch (category) {
      case "Tech":
        return "💻 Tech";
      case "Cultural":
        return "🎭 Cultural";
      case "Sports":
        return "⚽ Sports";
      default:
        return category;
    }
  }

  getUploaderBadgeClass(role) {
    switch (role) {
      case "School Administration":
        return "uploader-admin";
      case "Student Council":
        return "uploader-council";
      case "Club Lead":
        return "uploader-club";
      case "Student Initiative":
        return "uploader-student";
      default:
        return "uploader-student";
    }
  }

  getUploaderBadgeLabel(role) {
    switch (role) {
      case "School Administration":
        return "🏛️ School Admin";
      case "Student Council":
        return "👑 Student Council";
      case "Club Lead":
        return "⚡ Head of Club";
      case "Student Initiative":
        return "👥 Student Initiative";
      default:
        return role || "Student";
    }
  }

  /* ------------------------------------------------------------------------
     Filtering & Rendering Engine
     ------------------------------------------------------------------------ */
  getFilteredEvents() {
    let result = [...this.events];

    // Filter by Category
    if (this.currentCategory === "my-rsvps") {
      result = result.filter((e) => this.userRsvps.has(e.id));
    } else if (this.currentCategory !== "all") {
      result = result.filter((e) => e.category === this.currentCategory);
    }

    // Filter by Organizer Role
    if (this.selectedOrganizerRole !== "all") {
      result = result.filter((e) => e.uploaderRole === this.selectedOrganizerRole);
    }

    // Filter by Search Query (searches title, email, name, role, club, venue)
    if (this.searchQuery) {
      result = result.filter((e) => {
        const text = `${e.title} ${e.uploaderEmail || ""} ${e.uploaderName} ${e.uploaderRole} ${e.club} ${e.venue} ${e.description}`.toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    // Sort
    if (this.sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (this.sortBy === "popularity") {
      result.sort((a, b) => b.attendees - a.attendees);
    }

    return result;
  }

  render() {
    const filtered = this.getFilteredEvents();

    // Active Filter Label
    const activeFilters = [];
    if (this.currentCategory === "my-rsvps") {
      activeFilters.push("⭐ My RSVPs");
    } else if (this.currentCategory !== "all") {
      activeFilters.push(`Category: ${this.currentCategory}`);
    }

    if (this.selectedOrganizerRole !== "all") {
      activeFilters.push(`Role: ${this.getUploaderBadgeLabel(this.selectedOrganizerRole)}`);
    }

    if (activeFilters.length > 0) {
      this.filterLabel.classList.remove("hidden");
      this.filterLabel.textContent = activeFilters.join(" • ");
    } else {
      this.filterLabel.classList.add("hidden");
    }

    this.resultsCount.textContent = `Showing ${filtered.length} event${
      filtered.length === 1 ? "" : "s"
    }`;

    // Empty State
    if (filtered.length === 0) {
      this.eventsGrid.innerHTML = "";
      this.emptyState.classList.remove("hidden");
      return;
    }

    this.emptyState.classList.add("hidden");

    // Render Cards
    this.eventsGrid.innerHTML = filtered
      .map((event) => {
        const isRsvpd = this.userRsvps.has(event.id);
        const categoryClass = `category-${event.category}`;
        const categoryLabel = this.getCategoryBadgeText(event.category);
        const uploaderClass = this.getUploaderBadgeClass(event.uploaderRole);
        const uploaderLabel = this.getUploaderBadgeLabel(event.uploaderRole);
        const formattedDate = this.formatCardDate(event.date);
        const email = event.uploaderEmail || "student@campus.edu";

        return `
        <article class="event-card ${isRsvpd ? "is-rsvpd" : ""}" data-id="${event.id}">
          <div class="card-top">
            <span class="category-badge ${categoryClass}">${categoryLabel}</span>
            <span class="date-pill">📅 ${formattedDate}</span>
          </div>

          <!-- Uploader Role & Verified Campus Email Row -->
          <div class="uploader-row">
            <span class="uploader-badge ${uploaderClass}">${uploaderLabel}</span>
            <a 
              href="mailto:${this.escapeHTML(email)}?subject=Regarding ${encodeURIComponent(event.title)}" 
              class="uploader-email-pill" 
              title="Verified Campus Email: ${this.escapeHTML(email)}"
            >
              ✉️ ${this.escapeHTML(email)}
            </a>
          </div>

          <h3 class="card-title" data-action="view-details">${this.escapeHTML(event.title)}</h3>
          
          <div class="club-meta">
            <span>🏛️</span>
            <span><strong>${this.escapeHTML(event.club)}</strong> • ${this.escapeHTML(event.uploaderName)}</span>
          </div>

          <p class="card-desc">${this.escapeHTML(event.description)}</p>

          <div class="card-meta-list">
            <div class="meta-row">
              <span>📍</span>
              <span><strong>Venue:</strong> ${this.escapeHTML(event.venue)}</span>
            </div>
            <div class="meta-row">
              <span>👥</span>
              <span><strong>RSVPs:</strong> ${event.attendees} students going</span>
            </div>
          </div>

          <div class="card-actions">
            <button 
              class="btn btn-rsvp ${isRsvpd ? "rsvpd" : ""}" 
              data-action="rsvp" 
              aria-label="${isRsvpd ? "Cancel RSVP" : "1-Click RSVP"}"
            >
              <span>${isRsvpd ? "✓ RSVP'd" : "⚡ 1-Click RSVP"}</span>
            </button>
            <button 
              class="btn btn-details" 
              data-action="view-details"
              aria-label="View event details"
            >
              Details
            </button>
          </div>
        </article>
      `;
      })
      .join("");

    // Attach click listeners to cards
    this.eventsGrid.querySelectorAll(".event-card").forEach((card) => {
      const id = card.getAttribute("data-id");

      card.addEventListener("click", (e) => {
        // Don't intercept mailto clicks
        if (e.target.closest("a")) return;

        const target = e.target.closest("[data-action]");
        if (!target) return;

        const action = target.getAttribute("data-action");
        if (action === "rsvp") {
          this.toggleRsvp(id);
        } else if (action === "view-details") {
          this.openDetailsModal(id);
        }
      });
    });
  }

  escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ------------------------------------------------------------------------
     Toast Notifications
     ------------------------------------------------------------------------ */
  showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✅" : "ℹ️"}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px) scale(0.95)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.app = new CampusPulseApp();
});
