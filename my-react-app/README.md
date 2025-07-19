# 🏨 Unravel - Hotel Room Listing App

A fast, modular, and user-friendly React application built using **Vite**, designed to showcase hotel room listings with video/image previews, room variants, and interactive scrolling features.

🚀 **Live App:** [https://unravel-task-d3m90laup-nishant679s-projects.vercel.app/](https://unravel-task-d3m90laup-nishant679s-projects.vercel.app/)

---

## 🧠 Strategy & Approach

This project was developed with performance and scalability in mind. The key goals were:

- **📦 Data Pagination**: Fetch only the required number of rooms at a time, reducing memory usage and improving load speed.
- **📽 Video Optimization**: Auto-play only when the video is in the viewport using `IntersectionObserver`.
- **🖼 Lazy Image Loading**: Smooth carousel with fallback and optimized lazy loading.
- **📊 Variant Display**: Collapse/expand options for room variants to reduce clutter.
- **⚡ React Performance**: Used `React.memo`, `useCallback`, and minimal state updates to avoid unnecessary re-renders.

---

## 🛠 Tech Stack

| Technology     | Purpose                             |
|----------------|-------------------------------------|
| React + Vite   | UI & Dev Environment                |
| Tailwind CSS   | Styling                             |
| Vercel         | Hosting & Continuous Deployment     |
| IntersectionObserver | Lazy loading & viewport detection |

---

## 📁 Project Structure

## 🚀 Strategy & Architecture

### 🧩 Component-Based Approach
Each part of the UI (Room cards, Images, Variants, etc.) is split into modular components for scalability and separation of concerns.

### 📈 Performance-First Design
Our goal is to **minimize re-renders**, **lazy-load heavy resources**, and **fetch only what's needed** based on viewport visibility.

### 🔄 Infinite Scroll + Lazy Loading
- Rooms load **in pages of 10**, based on scroll.
- Media like **videos and images are only rendered** when visible (via `IntersectionObserver`).
- Carousel and autoplay media handle **manual and auto navigation** smoothly without blocking paint.

---

## 🧱 Key Components

### `RoomListingApp`
- Core entry point for rendering the list of room cards.
- Fetches data using a paginated hook `useDataFetcher`.
- Tracks how many items are loaded and pending using simple counters.

### `RoomCard`
- Displays a single room's content (video or image carousel).
- Calls `fetchData()` if nearing end of scroll and more data is available.

### `VideoCard`
- Autoplays video only when 50% visible using `IntersectionObserver`.
- Pauses video when not in view.
- Fallback if video fails to load.

### `ShowImages`
- Memoized image carousel with:
  - Auto-sliding
  - Dot navigation
  - Preloading for adjacent images
  - Graceful fallback for broken links

### `ShowVariants`
- Initially displays only 2 variants.
- "Show more" button toggles remaining variant cards.
- Fully memoized and responsive.

---

## 🛠 Optimizations Implemented

- ✅ **Lazy component rendering** with `react-intersection-observer`
- ✅ **Media lazy loading** (`loading="lazy"` + conditional render)
- ✅ **Autoplay logic** only when content is visible
- ✅ **Preload next image** in carousel for faster transitions
- ✅ **Minimal useEffect dependencies** and cleanup of observers
- ✅ **State updates only when necessary**


---

## 🧪 Local Development

### 🔧 Prerequisites

- Node.js ≥ 16
- npm or yarn

### 🚀 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/unravel-task.git
cd unravel-task

# Install dependencies
npm install

# Start local server
npm run dev

