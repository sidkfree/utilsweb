/* UtilsWeb — registry of client-side tools.
 * Each entry: { slug, name, tagline, icon, color, path, category, badge? }
 * The home page (main.js) auto-renders cards grouped by category.
 *
 * Categories:
 *   "documents"  📄 PDF & docs
 *   "images"     🖼️ Images & vision
 *   "audio"      🎙️ Audio & video
 *   "utility"    🛠️ Utilities
 *
 * badge (optional):
 *   "live"  → animated red dot (real-time / camera tools)
 *   "ai"    → AI/ML model badge
 *   "new"   → just shipped
 */
window.UTILSWEB_CATEGORIES = [
    { id: "documents", name: "Documents", icon: "📄", desc: "PDF, Word, OCR — anything paper-shaped.", accent: "#06B6D4" },
    { id: "images",    name: "Images & Vision", icon: "🖼️", desc: "Compress, upscale, strip metadata, see colours.", accent: "#A855F7" },
    { id: "audio",     name: "Audio & Video", icon: "🎙️", desc: "Speak, transcribe, record, make GIFs.", accent: "#EC4899" },
    { id: "utility",   name: "Utilities", icon: "🛠️", desc: "The little helpers.", accent: "#F59E0B" },
];

window.UTILSWEB_TOOLS = [
    // ── Documents ─────────────────────────────────────────────
    {
        slug: "pdf-to-word",
        name: "PDF → Word",
        tagline: "Extract the text from a PDF into a downloadable .docx file.",
        icon: "📄",
        color: "linear-gradient(135deg, #F59E0B, #EF4444)",
        path: "tools/pdf-to-word.html",
        category: "documents",
    },
    {
        slug: "word-to-pdf",
        name: "Word → PDF",
        tagline: "Render a .docx file to PDF — headings, lists, tables preserved.",
        icon: "📑",
        color: "linear-gradient(135deg, #10B981, #06B6D4)",
        path: "tools/word-to-pdf.html",
        category: "documents",
    },
    {
        slug: "pdf-merger",
        name: "PDF Merger",
        tagline: "Combine multiple PDFs into one file. Drag to reorder.",
        icon: "📚",
        color: "linear-gradient(135deg, #8B5CF6, #EC4899)",
        path: "tools/pdf-merger.html",
        category: "documents",
    },
    {
        slug: "ocr",
        name: "OCR — Photo to Text",
        tagline: "Extract text from photos, screenshots, handwriting. 100+ languages.",
        icon: "📝",
        color: "linear-gradient(135deg, #0EA5E9, #6366F1)",
        path: "tools/ocr.html",
        category: "documents",
        badge: "ai",
    },

    // ── Images & Vision ───────────────────────────────────────
    {
        slug: "image-compressor",
        name: "Image Compressor",
        tagline: "Shrink JPG / PNG / WebP. Quality slider, optional resize.",
        icon: "🗜️",
        color: "linear-gradient(135deg, #F97316, #EAB308)",
        path: "tools/image-compressor.html",
        category: "images",
    },
    {
        slug: "background-remover",
        name: "Background Remover",
        tagline: "Drop a photo, get a transparent-PNG cutout. The model runs in your browser.",
        icon: "🪄",
        color: "linear-gradient(135deg, #6366F1, #EC4899)",
        path: "tools/background-remover.html",
        category: "images",
        badge: "ai",
    },
    {
        slug: "image-upscaler",
        name: "AI Image Upscaler",
        tagline: "2×/3×/4× super-resolution with a TensorFlow model on your device.",
        icon: "🔍",
        color: "linear-gradient(135deg, #06B6D4, #22C55E)",
        path: "tools/image-upscaler.html",
        category: "images",
        badge: "ai",
    },
    {
        slug: "color-picker",
        name: "Color Picker from Image",
        tagline: "Click any pixel for HEX/RGB/HSL + the 8-colour palette.",
        icon: "🖌️",
        color: "linear-gradient(135deg, #EC4899, #8B5CF6)",
        path: "tools/color-picker.html",
        category: "images",
    },
    {
        slug: "exif-viewer",
        name: "EXIF Viewer & Stripper",
        tagline: "See every hidden field — GPS, camera, serial — and strip it.",
        icon: "🔎",
        color: "linear-gradient(135deg, #DC2626, #F59E0B)",
        path: "tools/exif-viewer.html",
        category: "images",
    },
    {
        slug: "object-detection",
        name: "Live Object Detection",
        tagline: "Point your webcam, see real-time YOLO bounding boxes.",
        icon: "🤖",
        color: "linear-gradient(135deg, #16A34A, #06B6D4)",
        path: "tools/object-detection.html",
        category: "images",
        badge: "live",
    },

    // ── Audio & Video ─────────────────────────────────────────
    {
        slug: "whisper-transcriber",
        name: "Whisper Transcriber",
        tagline: "Audio → text with OpenAI's Whisper, running locally.",
        icon: "🎙️",
        color: "linear-gradient(135deg, #06B6D4, #6366F1)",
        path: "tools/whisper-transcriber.html",
        category: "audio",
        badge: "ai",
    },
    {
        slug: "tts-studio",
        name: "Text-to-Speech Studio",
        tagline: "Type text, pick a language, hear it spoken. 60+ languages.",
        icon: "🎤",
        color: "linear-gradient(135deg, #F59E0B, #DC2626)",
        path: "tools/tts-studio.html",
        category: "audio",
        badge: "ai",
    },
    {
        slug: "screen-recorder",
        name: "Screen Recorder",
        tagline: "Capture screen + mic, export WebM. Native browser APIs.",
        icon: "🎬",
        color: "linear-gradient(135deg, #DC2626, #F97316)",
        path: "tools/screen-recorder.html",
        category: "audio",
        badge: "live",
    },
    {
        slug: "gif-maker",
        name: "GIF Maker from Video",
        tagline: "Drop a video, trim, export an animated GIF.",
        icon: "🎞️",
        color: "linear-gradient(135deg, #DB2777, #F59E0B)",
        path: "tools/gif-maker.html",
        category: "audio",
    },

    // ── Utilities ─────────────────────────────────────────────
    {
        slug: "qr-generator",
        name: "QR Code Generator",
        tagline: "Type anything, get a QR code instantly. Saves as PNG.",
        icon: "🔲",
        color: "linear-gradient(135deg, #06B6D4, #3B82F6)",
        path: "tools/qr-generator.html",
        category: "utility",
    },
];
