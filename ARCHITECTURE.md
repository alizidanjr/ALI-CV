# System Architecture: Desktop OS Portfolio

## Overview
This project is a personal portfolio website built with **Next.js 15** and **React**, styled to resemble a retro-futuristic Desktop Operating System. It features a window management system, a taskbar, and interactive "applications" that display the user's CV data.

## Tech Stack
-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS v4
-   **UI Components**: Shadcn/UI (Radix Primitives)
-   **Animations**: Framer Motion v11
-   **Icons**: Lucide React

## Core Architecture

### 1. State Management (`DesktopContext`)
The heart of the OS is the `DesktopProvider` context, which manages the global state of the desktop environment.
-   **Windows State**: Tracks open/closed status, minimization, and z-index for each app (`terminal`, `projects`, `about`, `contact`, `settings`).
-   **Active Window**: Tracks the currently focused window.
-   **Wallpaper**: Manages the user's selected background theme.

### 2. Component Structure
The application is structured as a single-page application (SPA) within the Next.js App Router.

#### `Desktop` (Container)
-   **BootScreen**: Conditionally rendered on initial load.
-   **DesktopProvider**: Wraps the main content to provide state.
-   **DesktopContent**: The main UI layer containing:
    -   **Background**: Dynamic CSS grid/matrix effects.
    -   **Icons Grid**: Responsive grid of `DesktopIcon` components.
    -   **Window Manager**: Renders `WindowFrame` components for each app.
    -   **Taskbar**: Fixed bottom bar for navigation and window switching.

#### `WindowFrame`
A reusable wrapper component that handles:
-   **Draggability**: Uses `framer-motion` (disabled on mobile).
-   **Resizability**: Standard window controls.
-   **Responsiveness**: Automatically switches to full-screen mode on mobile devices (`< 768px`).
-   **Visibility**: Enforces `top-0 left-0` positioning to prevent off-screen rendering.

### 3. Applications (Apps)
Each "app" is a standard React component rendered inside a `WindowFrame`.
-   **TerminalApp**: Interactive CLI that parses user commands (`help`, `about`, `projects`).
-   **ProjectsApp**: Grid view of project cards with hover effects.
-   **SettingsApp**: Allows customization of the desktop wallpaper.
-   **AboutApp / ContactApp**: Content-focused components displaying CV data.

## Mobile Responsiveness Strategy
-   **Desktop Mode**: Draggable, floating windows.
-   **Mobile Mode**: Windows become full-screen modals. The `WindowFrame` detects screen size and disables drag/resize logic, forcing the window to fill the viewport.
