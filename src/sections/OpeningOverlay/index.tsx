import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const WEDDING_DATE = new Date("2026-10-15T20:00:00");
const PHOTO_DRIVE_LINK = "https://drive.google.com/drive/folders/REPLACE_WITH_YOUR_FOLDER_ID";

const getCountdown = () => {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const translations = {
  weddingDay: { en: "Wedding Day", ar: "يوم الزفاف" },
  groomName: { en: "Sayed", ar: "سيد" },
  brideName: { en: "Nedaa", ar: "نداء" },
  twoSoulsLine1: { en: "Two Souls", ar: "روحان" },
  twoSoulsLine2: { en: "One destiny", ar: "مصير واحد" },
  twoSoulsLine3: { en: "A Lifetime written by Allah", ar: "عمر كتبه الله" },
  dearFriends: {
    en: "Dear Friends and Family Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.",
    ar: "أعزاءنا الأهل والأصدقاء، انضموا إلينا في أمسية من الحب والضحك والدعاء وذكريات لا تُنسى ونحن نبدأ حياتنا الأبدية معًا.",
  },
  scrollDown: { en: "Scroll down", ar: "مرر للأسفل" },
  days: { en: "Days", ar: "أيام" },
  hours: { en: "Hours", ar: "ساعات" },
  minutes: { en: "Minutes", ar: "دقائق" },
  seconds: { en: "Seconds", ar: "ثواني" },
  celebrationBeginsIn: { en: "The Celebration Begins In", ar: "يبدأ الاحتفال بعد" },
  scheduleOfEvents: { en: "Our Celebration Days", ar: "أيام احتفالنا" },
  katbElkitab: { en: "Katb El-Kitab", ar: "كتب الكتاب" },
  katbElkitabPlace: { en: "Al-Safa Mosque", ar: "مسجد الصفا" },
  katbElkitabTime: { en: "After Asr Prayer", ar: "بعد صلاة العصر" },
  laylatElArosa: { en: "Bride's Night", ar: "ليلة العروسة" },
  laylatElArosaPlace: { en: "Al-Radwa Hall, Ezbet El-Tessein Road", ar: "قاعة الرضوى، طريق عزبة التسعين" },
  laylatElArosaTime: { en: "8:00 PM", ar: "الساعة ٨ مساءً" },
  hennaElAris: { en: "Groom's Henna", ar: "حنة العريس" },
  hennaElArisPlace: { en: "In Front of the Groom's House", ar: "أمام منزل العريس" },
  dressCode: { en: "Dress Code", ar: "قواعد الملابس" },
  dressCodeText: {
    en: "Your best outfit, your best moves, your best excuse to celebrate.",
    ar: "أفضل إطلالة، أجمل رقصة، وأفضل عذر للاحتفال.",
  },
  venueName: { en: "ElQasr Hall", ar: "قاعة القصر" },
  venueAddress: { en: "Talkha, Egypt", ar: "طلخا، مصر" },
  venueDate: { en: "15.10.2026", ar: "١٥.١٠.٢٠٢٦" },
  venueTime: { en: "8 PM", ar: "٨ مساءً" },
  location: { en: "Our Big Day", ar: "يومنا الكبير" },
  leaveMessage: { en: "Leave Us a Message", ar: "اتركوا لنا رسالة" },
  writeMessage: { en: "Write a Message", ar: "اكتب رسالة" },
  drawMessage: { en: "Draw a Message", ar: "ارسم رسالة" },
  yourName: { en: "Your Name", ar: "اسمك" },
  fullName: { en: "Full name", ar: "الاسم الكامل" },
  yourMessage: { en: "Your Message", ar: "رسالتك" },
  writeYourWishes: { en: "Write your wishes for the couple...", ar: "اكتب أمنياتك للعروسين..." },
  drawYourMessage: { en: "Draw Your Message", ar: "ارسم رسالتك" },
  clear: { en: "Clear", ar: "مسح" },
  sendMessage: { en: "Send Message", ar: "إرسال الرسالة" },
  sending: { en: "Sending...", ar: "جارٍ الإرسال..." },
  messageNameError: { en: "Please enter your name.", ar: "يرجى إدخال اسمك." },
  messageWrittenError: { en: "Please write a message.", ar: "يرجى كتابة رسالة." },
  messageDrawnError: { en: "Please draw a message.", ar: "يرجى رسم رسالة." },
  messageSuccess: { en: "Thank you! Your message has been sent.", ar: "شكرًا لكم! تم إرسال رسالتكم." },
  messageFailure: { en: "Failed to send message.", ar: "فشل إرسال الرسالة." },
  confirmAttendance: { en: "Confirm Your Attendance", ar: "تأكيد الحضور" },
  confirmAttendanceText: {
    en: "To help us prepare for a joyful celebration, kindly confirm your attendance.",
    ar: "لمساعدتنا في التحضير لاحتفال سعيد، يرجى تأكيد حضوركم.",
  },
  clickToOpen: { en: "Click to open", ar: "اضغط للفتح" },
  clickToClose: { en: "Click to close", ar: "اضغط للإغلاق" },
  willYouAttend: { en: "Will you attend?", ar: "هل ستحضرون؟" },
  joyfullyAccept: { en: "Joyfully Accept", ar: "نقبل بكل سرور" },
  regretfullyDecline: { en: "Regretfully Decline", ar: "نعتذر عن الحضور" },
  numberOfGuests: { en: "Number of Guests", ar: "عدد الضيوف" },
  guest: { en: "Guest", ar: "ضيف" },
  guests: { en: "Guests", ar: "ضيوف" },
  submitRsvp: { en: "Submit RSVP", ar: "إرسال التأكيد" },
  submitting: { en: "Submitting...", ar: "جارٍ الإرسال..." },
  rsvpFieldsError: { en: "Please fill in your name and attendance.", ar: "يرجى إدخال اسمك وتأكيد الحضور." },
  rsvpSuccess: { en: "Thank you! Your RSVP has been received.", ar: "شكرًا لكم! تم استلام تأكيد حضوركم." },
  rsvpFailure: { en: "Failed to submit RSVP.", ar: "فشل إرسال تأكيد الحضور." },
  sharePhotos: { en: "Share Your Photos", ar: "شاركوا صوركم" },
  sharePhotosText: {
    en: "Take photos during the celebration and upload them here so we can all cherish the memories together.",
    ar: "التقطوا الصور أثناء الاحتفال وارفعوها هنا لنحتفظ بالذكريات معًا.",
  },
  uploadPhotos: { en: "Upload Your Photos", ar: "ارفع صورك" },
  hopeToSeeYou: { en: "Hope to see you there!", ar: "بانتظار حضوركم!" },
  presenceText: {
    en: "Your presence will make our wedding day a cherished memory",
    ar: "حضوركم سيجعل يوم زفافنا ذكرى غالية",
  },
  tapToOpen: { en: "Tap to open", ar: "اضغط للفتح" },
  muteMusic: { en: "Mute music", ar: "كتم الصوت" },
  unmuteMusic: { en: "Unmute music", ar: "تشغيل الصوت" },
  madeBy: { en: "Made by ", ar: "صُنع بواسطة " },
} as const;

type TranslationKey = keyof typeof translations;

type SendStatus = { text: string; type: "success" | "error" | "info" | "" };

async function submitToServer(payload: Record<string, string>) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export const OpeningOverlay = () => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const t = (key: TranslationKey) => translations[key][language];
  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  // The design is laid out on a fixed 375px grid, so on wider phones it would sit in the
  // middle with empty margins. Scale each section up to the screen width with a transform:
  // the layout inside still resolves at exactly 375px on every device, so the timeline
  // dots, line and flower keep the positions they were designed with. (`zoom` would
  // re-run layout at a fractional width and land differently on each phone.)
  useEffect(() => {
    const applyScale = () => {
      const width = document.documentElement.clientWidth;
      const frames = document.querySelectorAll<HTMLElement>(".invite-frame");
      const scale = width / 375;

      frames.forEach((frame) => {
        if (width >= 768) {
          frame.style.transform = "";
          frame.style.marginBottom = "";
          return;
        }
        // offsetHeight is the unscaled layout height — transforms do not affect it.
        const height = frame.offsetHeight;
        frame.style.transform = `scale(${scale})`;
        // The transform does not take up space, so make up the difference in flow.
        frame.style.marginBottom = `${height * (scale - 1)}px`;
      });
    };

    applyScale();
    window.addEventListener("resize", applyScale);
    window.addEventListener("orientationchange", applyScale);
    return () => {
      window.removeEventListener("resize", applyScale);
      window.removeEventListener("orientationchange", applyScale);
    };
  }, []);

  const [isOpened, setIsOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoStartedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const timelineFlowerRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const [rsvpFormOpen, setRsvpFormOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState<"yes" | "no" | "">("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<SendStatus>({ text: "", type: "" });

  const [messageName, setMessageName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageSubmitting, setMessageSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState<SendStatus>({ text: "", type: "" });
  const [messageType, setMessageType] = useState<"written" | "drawn">("written");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Mobile browsers sometimes refuse the initial autoplay of the swans clip; keep nudging it.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("touchstart", tryPlay, { passive: true });
    window.addEventListener("click", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("click", tryPlay);
    };
  }, [isOpened]);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    // Distance the flower drifts down along the vertical line, from the first dot to the last.
    const MAX_OFFSET = 300;
    let target = 0;
    let current = 0;
    let frame = 0;

    const readTarget = () => {
      const section = timelineSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Start once the schedule has reached the middle of the screen, and finish
      // by the time the "11 PM" row has passed that same line.
      const triggerLine = window.innerHeight * 0.5;
      target = clamp((triggerLine - rect.top) / (rect.height * 0.7), 0, 1) * MAX_OFFSET;
    };

    // Ease toward the scroll target on every animation frame instead of writing the
    // transform straight from the scroll event — that is what made it feel steppy.
    const tick = () => {
      const flower = timelineFlowerRef.current;
      if (flower) {
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.05) current = target;
        flower.style.transform = `translate(-50%, -50%) translateY(${current.toFixed(2)}px)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => readTarget();

    readTarget();
    current = target;
    frame = window.requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = () => {
      if (isPlaying) return;
      audio.muted = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    document.addEventListener("touchstart", startAudio, { once: true, passive: true });
    document.addEventListener("click", startAudio, { once: true });

    return () => {
      document.removeEventListener("touchstart", startAudio);
      document.removeEventListener("click", startAudio);
    };
  }, [isPlaying]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!isPlaying && audio) {
      audio.muted = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    // Force the browser to decode and paint the first frame (muted autoplay
    // is allowed, so play immediately, then pause and rewind) instead of
    // showing a black box until playback actually starts.
    const paintFirstFrame = () => {
      // If the user already tapped to open the envelope while this priming
      // play() was still pending, don't pause/rewind out from under them —
      // that race is what made the open sometimes feel slow or stuck.
      if (videoStartedRef.current) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (videoStartedRef.current) return;
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {});
      }
    };
    if (video.readyState >= 2) {
      paintFirstFrame();
    } else {
      video.addEventListener("loadeddata", paintFirstFrame, { once: true });
    }
    return () => video.removeEventListener("loadeddata", paintFirstFrame);
  }, []);

  const startVideo = () => {
    // Guard with a ref, not just the `videoStarted` state: onClick and onPointerUp
    // both fire for a single tap, and since state updates aren't synchronous, both
    // calls could otherwise slip through and call video.play() twice back-to-back —
    // which left the video stuck until a page refresh.
    if (videoStartedRef.current) return;
    videoStartedRef.current = true;
    setVideoStarted(true);

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    if (isOpened || isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpened(true);
      setIsClosing(false);
    }, 500);
  };

  const handleRsvpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!rsvpName.trim() || (rsvpAttending !== "yes" && rsvpAttending !== "no")) {
      setRsvpStatus({ text: t("rsvpFieldsError"), type: "error" });
      return;
    }

    setRsvpSubmitting(true);
    setRsvpStatus({ text: t("submitting"), type: "info" });

    try {
      await submitToServer({
        type: "rsvp",
        name: rsvpName.trim(),
        attending: rsvpAttending,
        guests: rsvpAttending === "yes" ? rsvpGuests : "0",
      });
      setRsvpStatus({ text: t("rsvpSuccess"), type: "success" });
      setRsvpName("");
      setRsvpAttending("");
      setRsvpGuests("1");
    } catch (err) {
      setRsvpStatus({ text: err instanceof Error ? err.message : t("rsvpFailure"), type: "error" });
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const getCanvasPoint = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in event ? event.touches[0] : event;
    return {
      x: ((point.clientX - rect.left) / rect.width) * canvas.width,
      y: ((point.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const point = getCanvasPoint(event);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const drawStroke = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const point = getCanvasPoint(event);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#3b2a1a";
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    setHasDrawing(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  useEffect(() => {
    if (messageType !== "drawn") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [messageType]);

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!messageName.trim()) {
      setMessageStatus({ text: t("messageNameError"), type: "error" });
      return;
    }
    if (messageType === "written" && !messageText.trim()) {
      setMessageStatus({ text: t("messageWrittenError"), type: "error" });
      return;
    }
    if (messageType === "drawn" && !hasDrawing) {
      setMessageStatus({ text: t("messageDrawnError"), type: "error" });
      return;
    }

    setMessageSubmitting(true);
    setMessageStatus({ text: t("sending"), type: "info" });

    try {
      const payload: Record<string, string> = {
        type: "message",
        name: messageName.trim(),
      };
      if (messageType === "drawn") {
        payload.imageDataUrl = canvasRef.current?.toDataURL("image/png") || "";
      } else {
        payload.message = messageText.trim();
      }

      await submitToServer(payload);
      setMessageStatus({ text: t("messageSuccess"), type: "success" });
      setMessageName("");
      setMessageText("");
      clearCanvas();
    } catch (err) {
      setMessageStatus({ text: err instanceof Error ? err.message : t("messageFailure"), type: "error" });
    } finally {
      setMessageSubmitting(false);
    }
  };

  return (
    <div
      lang={language}
      className={`box-border caret-transparent outline-[3px] overflow-hidden ${language === "ar" ? "lang-ar" : ""}`}
    >
      <div className="box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="box-border caret-transparent outline-[3px] w-full before:accent-auto before:caret-transparent before:text-black before:table before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[normal] before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-0 before:border-separate before:font-times_new_roman after:accent-auto after:caret-transparent after:clear-both after:text-black after:table after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-[normal] after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:border-separate after:font-times_new_roman">
            <div className="box-border caret-transparent max-w-full outline-[3px] w-full">
              <audio
                ref={audioRef}
                src="/wedding-song.mp3"
                loop
                playsInline
                preload="auto"
                muted={isMuted}
                className="hidden"
              ></audio>
              {!isOpened && (
                <div
                  style={{
                    backgroundImage: "url(/envelope-poster.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#f4e9d7",
                  }}
                  className={`fixed items-center box-border caret-transparent flex flex-col justify-center outline-[3px] z-[99999] inset-0 cursor-pointer transition-all duration-500 ease-in-out ${
                    isClosing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={startVideo}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      startVideo();
                    }
                  }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    style={{ width: "100vw", height: "100svh", objectPosition: "center" }}
                    playsInline={true}
                    muted={true}
                    autoPlay={false}
                    controls={false}
                    loop={false}
                    preload="auto"
                    poster="/envelope-poster.jpg"
                    disablePictureInPicture
                    onEnded={handleVideoEnded}
                  >
                    <source src="/envelope.mp4" type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
            {isOpened && (
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? t("unmuteMusic") : t("muteMusic")}
                className="fixed bottom-4 right-4 z-[9999] w-12 h-12 rounded-full bg-[#c98f95] text-orange-50 shadow-lg flex items-center justify-center hover:bg-[#b57a80] transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            )}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
              className="fixed top-4 right-4 z-[9999] w-12 h-12 rounded-full bg-[#c98f95] text-orange-50 shadow-lg flex items-center justify-center hover:bg-[#b57a80] transition-colors font-newfonts font-thin text-sm"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
          </div>
        </div>
      </div>
      <div className={`bg-orange-100 box-border caret-transparent outline-[3px] ${!isOpened ? "invisible" : ""}`}>
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[1240px] outline-[3px] w-[375px] mx-auto overflow-hidden md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[1240px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[1240px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute box-border caret-transparent table h-[492px] left-[-37.5px] outline-[3px] w-[450px] z-[3] top-0 md:h-[762px] md:left-[415px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-top w-full bg-center relative">
                <div className="relative w-full h-full">
                  <img
                    src="/hero-wallpaper.jpg"
                    alt="Wedding Hero Wallpaper"
                    className="box-border caret-transparent object-contain outline-[3px] align-top w-full h-auto max-h-full block mx-auto drop-shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent h-[477px] left-[-184.5px] outline-[3px] w-[744px] z-[3] top-[763px] md:h-[487px] md:left-[268px] md:top-[753px]">
              <div className="box-border caret-transparent h-full outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png.webp"
                  alt=""
                  className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                />
              </div>            
            </div>
            <div className="absolute box-border caret-transparent table left-[-49.5px] outline-[3px] w-[218px] z-[3] top-[568px] md:w-56 md:left-[399px] md:top-[566px]">
              <div className="box-border caret-transparent table outline-[3px] w-[218px] md:w-56">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] top-[-785px] w-[735px] z-[3] left-[307.5px] md:left-80">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-1.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-[899px] md:left-[360px]">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[43px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("twoSoulsLine1")}{" "}
                <br className="box-border caret-transparent outline-[3px]" />
                {t("twoSoulsLine2")}{" "}
                <br className="box-border caret-transparent outline-[3px]" />
                {t("twoSoulsLine3")}
              </div>
            </div>
            <div className="absolute text-stone-600 box-border caret-transparent table outline-[3px] text-center w-[307px] z-[3] left-[34.5px] top-[1050px] md:left-[487px]">
              <div className="text-[21px] font-thin bg-cover box-border caret-transparent table-cell leading-[26px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("dearFriends")}
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToNextSection}
              aria-label={t("scrollDown")}
              className="absolute box-border caret-transparent table outline-[3px] w-[25px] z-[3] left-[115px] top-[690px] cursor-pointer md:left-[567.5px]"
            >
              <div className="box-border caret-transparent table outline-[3px] w-[25px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center animate-bounce">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/icon-3.svg"
                    alt="Icon"
                    className="box-border caret-transparent outline-[3px] align-baseline"
                  />
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={scrollToNextSection}
              aria-label={t("scrollDown")}
              className={`absolute text-yellow-700 box-border caret-transparent table outline-[3px] text-center w-[316px] z-[3] top-[650px] cursor-pointer ${
                language === "ar" ? "left-[74.5px] md:left-[527px]" : "left-[89.5px] md:left-[542px]"
              }`}
            >
              <div className="text-[24px] font-light bg-cover box-border caret-transparent table-cell leading-[27px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("scrollDown")}
              </div>
            </button>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[283px] z-[3] left-[46.5px] top-[813px] md:left-[499px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-2.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 box-border caret-transparent outline-[3px] py-[15px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[247px] outline-[3px] w-[375px] mx-auto overflow-hidden md:h-[257px] md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[247px] outline-[3px] w-full z-0 bg-center left-0 top-0 md:h-[257px]"></div>
            <div className="absolute box-border caret-transparent h-[247px] outline-[3px] w-full z-[1] left-0 top-0 md:h-[257px]"></div>
            <div className="absolute box-border caret-transparent table h-[170px] left-[-47.5px] outline-[3px] w-[470px] z-[3] top-6 md:w-[531px] md:left-[375px] md:top-[23px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-top w-full bg-center">
                <title className="box-border caret-transparent hidden outline-[3px]">
                  Countdown Timer
                </title>
                <div className="items-center box-border caret-transparent gap-x-1.5 flex justify-center outline-[3px] gap-y-1.5 mx-5 my-20">
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    <div className="items-center box-border caret-transparent flex h-14 justify-center outline-[3px] overflow-hidden">
                      <div className="text-[45px] bg-clip-text bg-[linear-gradient(105deg,rgb(180,140,61)_0%,rgb(180,140,61)_25%,rgb(205,169,90)_46%,rgb(216,186,114)_52%,rgb(205,169,90)_58%,rgb(180,140,61)_75%,rgb(180,140,61)_100%)] bg-size-[300%_100%] box-border caret-transparent leading-[54px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap font-ovo">
                        {countdown.days}
                      </div>
                    </div>
                    <div className="text-[#c98f95] text-[19px] box-border caret-transparent opacity-85 outline-[3px] mt-2 font-ovo">
                      {t("days")}
                    </div>
                  </div>
                  <div className="text-[#c98f95] text-[52px] box-border caret-transparent leading-[52px] min-h-[auto] min-w-[auto] opacity-90 outline-[3px] -mt-10 font-ovo">
                    :
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    <div className="items-center box-border caret-transparent flex h-14 justify-center outline-[3px] overflow-hidden">
                      <div className="text-[45px] bg-clip-text bg-[linear-gradient(105deg,rgb(180,140,61)_0%,rgb(180,140,61)_25%,rgb(205,169,90)_46%,rgb(216,186,114)_52%,rgb(205,169,90)_58%,rgb(180,140,61)_75%,rgb(180,140,61)_100%)] bg-size-[300%_100%] box-border caret-transparent leading-[54px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap font-ovo">
                        {countdown.hours}
                      </div>
                    </div>
                    <div className="text-[#c98f95] text-[19px] box-border caret-transparent opacity-85 outline-[3px] mt-2 font-ovo">
                      {t("hours")}
                    </div>
                  </div>
                  <div className="text-[#c98f95] text-[52px] box-border caret-transparent leading-[52px] min-h-[auto] min-w-[auto] opacity-90 outline-[3px] -mt-10 font-ovo">
                    :
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    <div className="items-center box-border caret-transparent flex h-14 justify-center outline-[3px] overflow-hidden">
                      <div className="text-[45px] bg-clip-text bg-[linear-gradient(105deg,rgb(180,140,61)_0%,rgb(180,140,61)_25%,rgb(205,169,90)_46%,rgb(216,186,114)_52%,rgb(205,169,90)_58%,rgb(180,140,61)_75%,rgb(180,140,61)_100%)] bg-size-[300%_100%] box-border caret-transparent leading-[54px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap font-ovo">
                        {countdown.minutes}
                      </div>
                    </div>
                    <div className="text-[#c98f95] text-[19px] box-border caret-transparent opacity-85 outline-[3px] mt-2 font-ovo">
                      {t("minutes")}
                    </div>
                  </div>
                  <div className="text-[#c98f95] text-[52px] box-border caret-transparent leading-[52px] min-h-[auto] min-w-[auto] opacity-90 outline-[3px] -mt-10 font-ovo">
                    :
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    <div className="items-center box-border caret-transparent flex h-14 justify-center outline-[3px] overflow-hidden">
                      <div className="text-[45px] bg-clip-text bg-[linear-gradient(105deg,rgb(180,140,61)_0%,rgb(180,140,61)_25%,rgb(205,169,90)_46%,rgb(216,186,114)_52%,rgb(205,169,90)_58%,rgb(180,140,61)_75%,rgb(180,140,61)_100%)] bg-size-[300%_100%] box-border caret-transparent leading-[54px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap font-ovo">
                        {countdown.seconds}
                      </div>
                    </div>
                    <div className="text-[#c98f95] text-[19px] box-border caret-transparent opacity-85 outline-[3px] mt-2 font-ovo">
                      {t("seconds")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-[29px] md:left-[360px] md:top-7">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("celebrationBeginsIn")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div ref={timelineSectionRef} className="invite-frame relative bg-orange-100 box-border caret-transparent h-[570px] outline-[3px] w-[375px] mx-auto md:w-[1280px] md:h-[560px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[570px] outline-[3px] w-full z-0 bg-center left-0 top-0 md:h-[560px]"></div>
            <div className="absolute box-border caret-transparent h-[570px] outline-[3px] w-full z-[1] left-0 top-0 md:h-[560px]"></div>
            <div className="absolute box-border caret-transparent h-[346px] left-[-184.5px] outline-[3px] w-[744px] z-[3] -top-5 md:left-[268px]">
              <div className="box-border caret-transparent h-full outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-3.webp"
                  alt=""
                  className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent h-[259px] left-[-184.5px] outline-[3px] w-[744px] z-[3] top-[321px] md:left-[268px]">
              <div className="box-border caret-transparent h-full outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-4.webp"
                  alt=""
                  className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute text-yellow-600 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-[45px] md:text-yellow-700 md:left-[360px]">
              <div
                className={`text-yellow-600 font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:text-yellow-700 md:bg-auto ${
                  language === "en" ? "text-[33px]" : "text-[41px]"
                }`}
              >
                {t("scheduleOfEvents")}
              </div>
            </div>
            <div className="relative z-[3] flex justify-center gap-2 pl-0 pr-3 pt-[150px] -translate-x-4 md:translate-x-0 md:gap-12 md:px-6 md:pt-[190px]">
              <div className="relative w-[130px] flex-shrink-0 md:w-[240px]" style={{ height: 330 }}>
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-stone-400/60 to-transparent"></div>
                <span className="absolute left-1/2 top-[15px] h-2 w-2 -translate-x-1/2 rotate-45 bg-stone-500"></span>
                <span className="absolute left-1/2 top-[165px] h-2 w-2 -translate-x-1/2 rotate-45 bg-stone-500"></span>
                <span className="absolute left-1/2 top-[315px] h-2 w-2 -translate-x-1/2 rotate-45 bg-stone-500"></span>
                <div
                  ref={timelineFlowerRef}
                  className="absolute left-1/2 top-[15px] w-full -translate-x-1/2 -translate-y-1/2 will-change-transform md:w-full"
                >
                  <img src="/flower.png" alt="" className="w-full" />
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0 max-w-[190px] -ml-9 md:ml-0 md:max-w-[380px]" style={{ height: 330 }}>
                {(
                  [
                    {
                      key: "katbElkitab" as const,
                      placeKey: "katbElkitabPlace" as const,
                      timeKey: "katbElkitabTime" as const,
                      date: "25 . 09 . 2026",
                    },
                    {
                      key: "laylatElArosa" as const,
                      placeKey: "laylatElArosaPlace" as const,
                      timeKey: "laylatElArosaTime" as const,
                      date: "13 . 10 . 2026",
                    },
                    {
                      key: "hennaElAris" as const,
                      placeKey: "hennaElArisPlace" as const,
                      timeKey: undefined,
                      date: "14 . 10 . 2026",
                    },
                  ]
                ).map((event) => (
                  <div key={event.key} className="text-center">
                    <span className="block font-webgency font-extrabold text-yellow-700 text-2xl leading-tight md:text-5xl">
                      {t(event.key)}
                    </span>
                    <span className="mt-1.5 flex items-center justify-center gap-2 md:mt-2.5 md:gap-3">
                      <span className="h-px w-5 bg-yellow-700/50 md:w-8"></span>
                      <span className="font-newfonts font-semibold text-sm uppercase tracking-[2px] text-stone-700 md:text-lg md:tracking-[3px]">
                        {event.date}
                      </span>
                      <span className="h-px w-5 bg-yellow-700/50 md:w-8"></span>
                    </span>
                    <span className="mt-1.5 block font-newfonts font-semibold text-stone-700 text-sm md:text-xl">
                      {t(event.placeKey)}
                    </span>
                    {event.timeKey && (
                      <span className="block font-newfonts font-semibold text-stone-700 text-sm md:text-xl">
                        {t(event.timeKey)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[78px] z-[3] left-[304.5px] top-14 md:left-[765px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/right-element_1.png.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
           <div className="absolute box-border caret-transparent table left-[-6.5px] outline-[3px] w-[79px] z-[3] top-14 md:left-[436px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/left-element_1.png.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 box-border caret-transparent outline-[3px] pt-[30px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[480px] outline-[3px] w-[375px] mx-auto md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[480px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[480px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-24 z-[3] left-[137.5px] top-[81px] md:left-[590px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/acomm-decor.png.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table left-[-2.5px] outline-[3px] w-[380px] z-[3] top-[227px] md:left-[450px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="/venue.png"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[41px] z-[3] left-[322.5px] top-5 md:left-[775px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[77px] translate-y-[381px] rotate-[1.999999842926156deg] w-[41px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-5.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[43px] z-[3] left-[64.5px] top-[11px] md:left-[509px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[-77px] translate-y-[381px] rotate-[1.999999842926156deg] w-[43px]">
                <div className="box-border caret-transparent table-cell outline-[3px] rotate-[-143.00001795368004deg] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-6.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table left-[-6.5px] outline-[3px] w-[42px] z-[3] top-[127px] md:left-[442px] md:top-[117px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[67px] translate-y-56 rotate-[-5.999972975483472deg] w-[42px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-7.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[38px] z-[3] left-[354.5px] top-36 md:left-[807px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[-99px] translate-y-[251px] rotate-[1.999999842926156deg] w-[38px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-8.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[38px] z-[3] left-[12.5px] top-[260px] md:left-[465px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[39px] translate-y-[83px] rotate-[-12.000012571476546deg] w-[38px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-9.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[42px] z-[3] left-[277.5px] top-[284px] md:left-[730px]">
              <div className="box-border caret-transparent table opacity-0 outline-[3px] translate-x-[-39px] translate-y-[73px] rotate-[-5.999972975483472deg] w-[42px]">
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-10.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/Ri3Hk1rejZ5jL3p7A"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute text-stone-600 box-border caret-transparent table outline-[3px] text-center w-[232px] z-[3] left-[71.5px] top-[111px] md:left-[524px]"
            >
              <div className="text-xl font-thin bg-cover box-border caret-transparent table-cell leading-[31px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("venueName")}
              </div>
            </a>
            <a
              href="https://maps.app.goo.gl/Ri3Hk1rejZ5jL3p7A"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute text-stone-600 box-border caret-transparent table outline-[3px] text-center w-[308px] z-[3] left-[33.5px] top-[149px] md:left-[486px]"
            >
              <div className="text-[17px] font-thin bg-cover box-border caret-transparent table-cell leading-[21px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("venueAddress")}
              </div>
            </a>
            <div className="absolute box-border caret-transparent table outline-[3px] text-center w-[260px] z-[3] left-[57.5px] top-[172px] md:left-[510px]">
              <div className="text-[19px] font-semibold bg-cover box-border caret-transparent table-cell leading-[24px] outline-[3px] align-middle w-full bg-center font-newfonts text-yellow-700 tracking-wide md:bg-auto">
                {t("venueDate")}
                <br />
                {t("venueTime")}
              </div>
            </div>
            <div ref={locationSectionRef} className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-7 md:left-[360px]">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("location")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 box-border caret-transparent outline-[3px] pt-[30px] pb-[60px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[343px] outline-[3px] w-[375px] mx-auto md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[343px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[343px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[341px] z-[3] left-[17.5px] top-0.5 md:left-[470px]">
              <div className="box-border caret-transparent table-cell opacity-80 outline-[3px] align-middle w-full bg-center -scale-100">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/Rectangle_270.svg"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table h-[343px] outline-[3px] w-full z-[3] left-0 top-px">
              <div className="box-border caret-transparent table-cell outline-[3px] align-top w-full bg-center">
                <div className="relative items-center box-border caret-transparent flex h-full justify-center outline-[3px]">
                  <img
                    src="/location-map.jpg"
                    alt="Map to ElQasr Hall"
                    className="box-border caret-transparent h-[335px] min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-[335px] rounded-[15px] object-cover"
                  />
                  <a
                    href="https://maps.app.goo.gl/Ri3Hk1rejZ5jL3p7A"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open location in Google Maps"
                    className="absolute box-border caret-transparent h-[335px] w-[335px] rounded-[15px] z-[4]"
                  ></a>
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] top-[-26px] w-[190px] z-[3] left-[92.5px] md:left-[545px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-11.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[190px] z-[3] left-[92.5px] top-[328px] md:left-[545px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-12.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Us a Message */}
      <div className="bg-orange-100 box-border caret-transparent outline-[3px] py-[40px]">
        <div className="relative w-full max-w-[375px] mx-auto md:max-w-[1280px]">
          <div className="absolute -top-6 -left-4 w-16 opacity-70 -rotate-12 pointer-events-none md:w-24 md:-left-6">
            <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/left-element_1.png.webp" alt="" className="w-full" />
          </div>
          <div className="absolute -top-6 -right-4 w-16 opacity-70 rotate-12 pointer-events-none md:w-24 md:-right-6">
            <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/right-element_1.png.webp" alt="" className="w-full" />
          </div>
          <div
            className="relative px-6 py-8 rounded-2xl border border-yellow-700/25 shadow-[0_10px_30px_-12px_rgba(120,90,40,0.35)]"
            style={{
              backgroundImage: "url(https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-2.webp)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#efe4d3",
            }}
          >
          <div className="mx-auto mb-2 w-14 opacity-80 md:w-20">
            <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/acomm-decor.png.webp" alt="" className="w-full" />
          </div>
          <div className="text-[41px] leading-[54px] font-light text-yellow-700 font-newfonts text-center">
            {t("leaveMessage")}
          </div>
          <div className="flex items-center justify-center gap-3 mb-6 mt-1">
            <span className="h-px w-10 bg-yellow-700/40"></span>
            <span className="h-1.5 w-1.5 rotate-45 bg-yellow-700/60"></span>
            <span className="h-px w-10 bg-yellow-700/40"></span>
          </div>

          <div className="flex gap-3 justify-center mb-6">
            <button
              type="button"
              onClick={() => setMessageType("written")}
              className={`px-5 py-2 rounded-full border font-newfonts font-thin text-[15px] transition-colors ${
                messageType === "written"
                  ? "bg-[#c98f95] text-orange-50 border-[#c98f95]"
                  : "bg-white/70 text-stone-700 border-[#c98f95]/40"
              }`}
            >
              {t("writeMessage")}
            </button>
            <button
              type="button"
              onClick={() => setMessageType("drawn")}
              className={`px-5 py-2 rounded-full border font-newfonts font-thin text-[15px] transition-colors ${
                messageType === "drawn"
                  ? "bg-[#c98f95] text-orange-50 border-[#c98f95]"
                  : "bg-white/70 text-stone-700 border-[#c98f95]/40"
              }`}
            >
              {t("drawMessage")}
            </button>
          </div>

          <form onSubmit={handleMessageSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1 font-newfonts font-thin">{t("yourName")}</label>
              <input
                type="text"
                value={messageName}
                onChange={(e) => setMessageName(e.target.value)}
                disabled={messageSubmitting}
                className="w-full px-3 py-2 rounded-lg border border-[#c98f95]/40 bg-white/70 text-stone-700 font-newfonts font-thin focus:outline-none focus:ring-2 focus:ring-[#c98f95]/50"
                placeholder={t("fullName")}
              />
            </div>

            {messageType === "written" ? (
              <div>
                <label className="block text-sm text-stone-600 mb-1 font-newfonts font-thin">{t("yourMessage")}</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  disabled={messageSubmitting}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-[#c98f95]/40 bg-white/70 text-stone-700 font-newfonts font-thin focus:outline-none focus:ring-2 focus:ring-[#c98f95]/50"
                  placeholder={t("writeYourWishes")}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm text-stone-600 mb-1 font-newfonts font-thin">{t("drawYourMessage")}</label>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={220}
                  onMouseDown={startDrawing}
                  onMouseMove={drawStroke}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={drawStroke}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[220px] rounded-lg border-2 border-[#c98f95]/40 bg-white touch-none cursor-crosshair"
                />
                <button
                  type="button"
                  onClick={clearCanvas}
                  disabled={messageSubmitting}
                  className="mt-2 px-4 py-1.5 rounded-full border border-[#c98f95]/40 bg-white/70 text-stone-600 font-newfonts font-thin text-sm hover:bg-[#c98f95]/10 transition-colors"
                >
                  {t("clear")}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={messageSubmitting}
              className="w-full py-3 rounded-lg bg-[#c98f95] text-orange-50 font-newfonts font-thin text-lg hover:bg-[#b57a80] transition-colors disabled:opacity-50"
            >
              {messageSubmitting ? t("sending") : t("sendMessage")}
            </button>
            {messageStatus.text && (
              <p
                className={`text-center text-sm font-newfonts font-thin ${
                  messageStatus.type === "error" ? "text-red-600" : messageStatus.type === "info" ? "text-stone-500" : "text-green-700"
                }`}
              >
                {messageStatus.text}
              </p>
            )}
          </form>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[491px] outline-[3px] w-[375px] mx-auto overflow-hidden md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[491px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[491px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[452px] left-[-184.5px] outline-[3px] w-[744px] z-[3] top-5 md:h-[453px] md:left-[268px]">
              <div className="box-border caret-transparent h-full outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-2.webp"
                  alt=""
                  className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute text-stone-600 box-border caret-transparent table outline-[3px] text-center w-[300px] z-[3] left-[37.5px] top-[245px] md:w-[310px] md:left-[485px]">
              <div className="text-[21px] font-thin bg-cover box-border caret-transparent table-cell leading-[26px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("dressCodeText")}
              </div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-[170px] md:left-[360px]">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("dressCode")}
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] top-[-614px] w-[587px] z-[3] left-[344.5px] md:left-[357px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-3.webp"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[276px] z-[3] left-[182.5px] -top-px md:w-[305px] md:left-[698px] md:top-[9px]">
              <div className="box-border caret-transparent table outline-[3px] w-[276px] md:w-[305px]">
                <div className="bg-cover box-border caret-transparent table-cell outline-[3px] rotate-[0.9999993263990709deg] align-middle w-full bg-center md:bg-auto md:transform-none">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-13.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute box-border caret-transparent table left-[-52.5px] outline-[3px] w-[251px] z-[3] top-[264px] md:left-[345px]">
              <div className="box-border caret-transparent table outline-[3px] w-[251px]">
                <div className="box-border caret-transparent table-cell outline-[3px] rotate-[-85.9999982984376deg] align-middle w-full bg-center">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/noroot.png-14.webp"
                    alt=""
                    className="box-border caret-transparent outline-[3px] align-baseline w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[438px] outline-[3px] w-[375px] mx-auto overflow-hidden md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[438px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[438px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute text-stone-600 box-border caret-transparent table outline-[3px] text-center w-[372px] z-[3] left-[1.5px] top-[135px] md:left-[454px]">
              <div className="text-[21px] font-thin bg-cover box-border caret-transparent table-cell leading-[26px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("confirmAttendanceText")}
              </div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-[51px] md:left-[360px]">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("confirmAttendance")}
              </div>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[190px] z-[3] left-[92.5px] top-[210px] md:left-[545px]">
              <button
                type="button"
                onClick={() => setRsvpFormOpen((prev) => !prev)}
                className="text-red-400 box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center cursor-pointer"
              >
                <img
                  src="/seal.png"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </button>
            </div>
            <div className="absolute box-border caret-transparent table outline-[3px] w-[25px] z-[3] left-[174.5px] top-[368px] md:left-[627px]">
              <div
                className={`box-border caret-transparent table outline-[3px] w-[25px] transition-transform duration-300 ${rsvpFormOpen ? "rotate-180" : ""}`}
              >
                <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center -scale-100">
                  <img
                    src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/icon-5.svg"
                    alt="Icon"
                    className="box-border caret-transparent outline-[3px] align-baseline"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRsvpFormOpen((prev) => !prev)}
              className="absolute text-yellow-700 box-border caret-transparent table outline-[3px] text-center w-56 z-[3] left-[75.5px] top-[387px] md:left-[528px]"
            >
              <div className="box-border caret-transparent table outline-[3px] w-56">
                <div className="text-[32px] font-light bg-cover box-border caret-transparent table-cell leading-[50px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                  {rsvpFormOpen ? t("clickToClose") : t("clickToOpen")}
                </div>
              </div>
            </button>
          </div>
          {rsvpFormOpen && (
            <div className="relative w-full max-w-[375px] mx-auto -mt-2 mb-10 md:max-w-[1280px]">
              <div className="absolute -top-6 -left-4 w-16 opacity-70 -rotate-12 pointer-events-none md:w-24 md:-left-6">
                <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/left-element_1.png.webp" alt="" className="w-full" />
              </div>
              <div className="absolute -top-6 -right-4 w-16 opacity-70 rotate-12 pointer-events-none md:w-24 md:-right-6">
                <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/right-element_1.png.webp" alt="" className="w-full" />
              </div>
              <div
                className="relative px-6 py-8 rounded-2xl border border-yellow-700/25 shadow-[0_10px_30px_-12px_rgba(120,90,40,0.35)]"
                style={{
                  backgroundImage: "url(https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-2.webp)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#efe4d3",
                }}
              >
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-stone-600 mb-1 font-newfonts font-thin">{t("yourName")}</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    disabled={rsvpSubmitting}
                    className="w-full px-3 py-2 rounded-lg border border-[#c98f95]/40 bg-white/70 text-stone-700 font-newfonts font-thin focus:outline-none focus:ring-2 focus:ring-[#c98f95]/50"
                    placeholder={t("fullName")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone-600 mb-2 font-newfonts font-thin">{t("willYouAttend")}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("yes")}
                      disabled={rsvpSubmitting}
                      className={`px-4 py-2 rounded-lg border font-newfonts font-thin transition-colors ${
                        rsvpAttending === "yes"
                          ? "bg-[#c98f95] text-orange-50 border-[#c98f95]"
                          : "bg-white/70 text-stone-700 border-[#c98f95]/40"
                      }`}
                    >
                      {t("joyfullyAccept")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("no")}
                      disabled={rsvpSubmitting}
                      className={`px-4 py-2 rounded-lg border font-newfonts font-thin transition-colors ${
                        rsvpAttending === "no"
                          ? "bg-[#c98f95] text-orange-50 border-[#c98f95]"
                          : "bg-white/70 text-stone-700 border-[#c98f95]/40"
                      }`}
                    >
                      {t("regretfullyDecline")}
                    </button>
                  </div>
                </div>
                {rsvpAttending === "yes" && (
                  <div>
                    <label className="block text-sm text-stone-600 mb-1 font-newfonts font-thin">{t("numberOfGuests")}</label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      disabled={rsvpSubmitting}
                      className="w-full px-3 py-2 rounded-lg border border-[#c98f95]/40 bg-white/70 text-stone-700 font-newfonts font-thin focus:outline-none focus:ring-2 focus:ring-[#c98f95]/50"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? t("guest") : t("guests")}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="w-full py-3 rounded-lg bg-[#c98f95] text-orange-50 font-newfonts font-thin text-lg hover:bg-[#b57a80] transition-colors disabled:opacity-50"
                >
                  {rsvpSubmitting ? t("submitting") : t("submitRsvp")}
                </button>
                {rsvpStatus.text && (
                  <p
                    className={`text-center text-sm font-newfonts font-thin ${
                      rsvpStatus.type === "error" ? "text-red-600" : rsvpStatus.type === "info" ? "text-stone-500" : "text-green-700"
                    }`}
                  >
                    {rsvpStatus.text}
                  </p>
                )}
              </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]"></div>
      </div>

      {/* Share Your Photos */}
      <div className="bg-orange-100 box-border caret-transparent outline-[3px] pt-[40px] pb-[80px]">
        <div className="relative w-full max-w-[375px] mx-auto md:max-w-[1280px]">
          <div className="absolute -top-6 -left-4 w-16 opacity-70 -rotate-12 pointer-events-none md:w-24 md:-left-6">
            <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/left-element_1.png.webp" alt="" className="w-full" />
          </div>
          <div className="absolute -top-6 -right-4 w-16 opacity-70 rotate-12 pointer-events-none md:w-24 md:-right-6">
            <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/right-element_1.png.webp" alt="" className="w-full" />
          </div>
          <div
            className="relative px-8 py-8 text-center rounded-2xl border border-yellow-700/25 shadow-[0_10px_30px_-12px_rgba(120,90,40,0.35)]"
            style={{
              backgroundImage: "url(https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/623915249_2629494717.png-2.webp)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#efe4d3",
            }}
          >
            <div className="mx-auto mb-2 w-14 opacity-80 md:w-20">
              <img src="https://c.animaapp.com/BdBzBMFXYuOpLb1uxjMwxw/assets/acomm-decor.png.webp" alt="" className="w-full" />
            </div>
            <div className="text-[41px] leading-[54px] font-light text-yellow-700 font-newfonts">
              {t("sharePhotos")}
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 mt-1">
              <span className="h-px w-10 bg-yellow-700/40"></span>
              <span className="h-1.5 w-1.5 rotate-45 bg-yellow-700/60"></span>
              <span className="h-px w-10 bg-yellow-700/40"></span>
            </div>
            <p className="text-stone-600 font-newfonts font-thin text-[18px] leading-[26px] mb-6">
              {t("sharePhotosText")}
            </p>
            <a
              href={PHOTO_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full bg-[#c98f95] text-orange-50 font-newfonts font-thin text-[18px] hover:bg-[#b57a80] transition-colors"
            >
              {t("uploadPhotos")}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="invite-frame relative bg-orange-100 box-border caret-transparent h-[673px] outline-[3px] w-[375px] mx-auto overflow-hidden md:w-[1280px]">
            <div className="absolute bg-no-repeat bg-cover box-border caret-transparent h-[673px] outline-[3px] w-full z-0 bg-center left-0 top-0"></div>
            <div className="absolute box-border caret-transparent h-[673px] outline-[3px] w-full z-[1] left-0 top-0"></div>
            <div className="absolute box-border caret-transparent table left-[-37.5px] outline-[3px] w-[450px] z-[3] top-0 md:left-[415px]">
              <div className="box-border caret-transparent table-cell outline-[3px] align-middle w-full bg-center">
                <img
                  src="/closing-photo.jpg"
                  alt=""
                  className="box-border caret-transparent outline-[3px] align-baseline w-full"
                />
              </div>
            </div>
            <div className="absolute box-border caret-transparent table h-[237px] left-[-37.5px] outline-[3px] w-[451px] z-[3] top-0 md:left-[414px]">
              <div className="bg-[linear-gradient(0deg,rgba(232,221,207,0)_0%,rgb(249,240,224)_100%)] bg-cover box-border caret-transparent table-cell outline-[3px] align-middle w-full md:bg-auto"></div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table left-[-92.5px] outline-[3px] text-center w-[560px] z-[3] top-0 md:left-[360px]">
              <div className="text-[41px] font-light bg-cover box-border caret-transparent table-cell leading-[64px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("hopeToSeeYou")}
              </div>
            </div>
            <div className="absolute text-yellow-700 box-border caret-transparent table outline-[3px] text-center w-[360px] z-[3] left-[7.5px] top-[78px] md:left-[460px]">
              <div className="text-[22px] font-thin bg-cover box-border caret-transparent table-cell leading-[32px] outline-[3px] align-middle w-full bg-center font-newfonts md:bg-auto">
                {t("presenceText")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-orange-100 py-4 pb-20 text-center text-xl md:text-2xl text-stone-700 font-newfonts tracking-wide relative z-[20] -mt-16 md:-mt-8">
        <p className="flex items-center justify-center gap-2 flex-wrap font-thin">
          <span>{t("madeBy")}</span>
          <a
            href="https://invitations.digitivaa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c98f95] hover:text-yellow-700 font-medium underline decoration-2 underline-offset-4 transition-colors"
          >
            Digitiva
          </a>
        </p>
      </footer>
    </div>
  );
};
