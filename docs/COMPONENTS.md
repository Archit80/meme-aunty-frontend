# Component Documentation

## Architecture Overview

The application follows a modular component architecture with clear separation of concerns:

- **Layout Components**: Handle page structure
- **Step Components**: Manage workflow steps
- **UI Components**: Reusable interface elements
- **Utility Components**: Cross-cutting concerns

## Component Hierarchy

```
App
├── ErrorBoundary
├── Header
├── LoadingOverlay (conditional)
├── ProgressBar
├── PageHeader
└── Grid Container
    ├── Sidebar
    │   └── StepBasedAunty
    └── MainContent
        ├── StatusBanner
        ├── ErrorAlert
        └── Dynamic Step Content
            ├── UploadStep
            │   └── UploadBox
            ├── VibeStep
            │   └── VibeSlider
            └── ResultStep
                └── MemeResult
```

## Layout Components

### `MainContent`
Central content area that displays different steps based on app state.

**Props:**
- `currentState` - Current app state
- `selectedFile` - Currently selected file
- `selectedVibe` - Selected meme vibe
- `creditsLeft` - Remaining credits
- `error` - Error message if any
- `generatedMeme` - Generated meme data
- Event handlers for all user actions

**Responsibilities:**
- Renders StatusBanner and ErrorAlert
- Conditionally renders step components
- Passes props to child components

### `Sidebar`
Contains the interactive aunty character and contextual information.

**Props:**
- `currentState` - Current app state
- `selectedVibe` - Selected vibe
- `selectedFile` - Selected file
- `creditsLeft` - Remaining credits

**Features:**
- Sticky positioning for better UX
- Contextual messaging based on app state
- Progress visualization

### `PageHeader`
Simple header with app title and branding.

**Features:**
- Responsive text sizing
- Consistent brand messaging

## Step Components

### `UploadStep`
Handles file upload workflow.

**Props:**
- `onFileSelect` - File selection handler
- `selectedFile` - Currently selected file

**Child Components:**
- `UploadBox` - Drag & drop file upload interface

### `VibeStep`
Manages vibe selection and meme generation.

**Props:**
- `selectedFile` - Selected file info
- `selectedVibe` - Current vibe selection
- `onVibeChange` - Vibe change handler
- `onGenerate` - Generate button handler
- `onChangePhoto` - Change photo handler
- `creditsLeft` - Remaining credits

**Child Components:**
- `VibeSlider` - Interactive vibe selector

### `ResultStep`
Displays generated meme and sharing options.

**Props:**
- `generatedMeme` - Generated meme data
- `onMakeAnother` - New meme handler
- `onBackToVibe` - Back to vibe selection handler

**Child Components:**
- `MemeResult` - Meme display and sharing interface

## UI Components

### `StatusBanner`
Displays credit status and warnings.

**Props:**
- `creditsLeft` - Number of remaining credits

**States:**
- No credits (red alert with upgrade prompt)
- Low credits (yellow warning)
- Normal credits (no banner)

### `ErrorAlert`
Displays error messages with contextual actions.

**Props:**
- `error` - Error message
- `currentState` - Current app state
- `onBackToVibe` - Recovery action handler

**Features:**
- Conditional action buttons
- Contextual error messaging

### `ProgressBar`
Visual progress indicator for the workflow.

**Props:**
- `currentStep` - Current step number (1-4)

**Features:**
- Interactive step indicators
- Progress line animations
- Step completion states

### `Header`
Top navigation bar with branding and credits.

**Props:**
- `creditsLeft` - Remaining credits count

**Features:**
- Sticky positioning
- Credit status with color coding
- App branding and logo

## Interactive Components

### `UploadBox`
Drag & drop file upload interface.

**Props:**
- `onFileSelect` - File selection callback
- `selectedFile` - Currently selected file

**Features:**
- Drag & drop support
- File validation
- Visual feedback for drag states
- Error display for invalid files
- File information display

**State Management:**
- `isDragOver` - Drag state
- `error` - Validation errors

### `VibeSlider`
Interactive vibe selection with slider and buttons.

**Props:**
- `selectedVibe` - Current vibe
- `onVibeChange` - Vibe change handler
- `onGenerate` - Generate button handler
- `disabled` - Whether generation is disabled
- `creditsLeft` - Remaining credits

**Features:**
- Smooth slider interaction
- Snap-to-vibe functionality
- Visual vibe preview
- Disabled states for no credits

### `MemeResult`
Generated meme display with sharing options.

**Props:**
- `meme` - Meme data (imageUrl, caption)
- `onMakeAnother` - New meme handler
- `onBackToVibe` - Back button handler

**Features:**
- Meme image display
- Caption with copy functionality
- Download button
- Social sharing (Twitter, Web Share API)
- Like button interaction

### `StepBasedAunty`
Interactive character that provides contextual guidance.

**Props:**
- `currentState` - Current app state
- `selectedVibe` - Selected vibe
- `selectedFile` - Selected file
- `creditsLeft` - Remaining credits

**Features:**
- State-based character expressions
- Contextual messaging
- Progress indicators
- Helpful tips and guides

## Utility Components

### `ErrorBoundary`
Catches and handles component errors gracefully.

**Features:**
- Fallback UI for crashes
- Error logging
- Recovery options
- User-friendly error messages

### `LoadingOverlay`
Full-screen loading interface during meme generation.

**Props:**
- `vibe` - Current vibe for theming

**Features:**
- Animated loading states
- Vibe-specific theming
- Progress indicators
- Contextual loading messages

## Common Patterns

### Props Pattern
All components follow consistent prop naming:
- Event handlers: `onActionName`
- State data: descriptive names
- Flags: `isActive`, `disabled`, etc.

### State Management
- Local state for UI concerns
- Props for shared state
- Custom hooks for complex logic

### Styling
- Tailwind utility classes
- Consistent spacing and sizing
- Responsive design patterns
- Hover and focus states

### Error Handling
- Graceful degradation
- User-friendly messages
- Recovery actions where possible
- Console logging for debugging

## Component Guidelines

### Creating New Components

1. **Single Responsibility**: Each component has one clear purpose
2. **Props Interface**: Well-defined and documented props
3. **Error States**: Handle loading, error, and empty states
4. **Accessibility**: Proper ARIA labels and keyboard navigation
5. **Responsive**: Mobile-first responsive design

### Styling Guidelines

1. **Tailwind First**: Use Tailwind utilities over custom CSS
2. **Consistent Spacing**: Use standard spacing scale
3. **Color System**: Use defined color palette
4. **Animations**: Subtle, purposeful animations
5. **Dark Mode Ready**: Use CSS variables for colors

### Performance Considerations

1. **React.memo**: Memoize components that receive stable props
2. **useCallback**: Memoize event handlers
3. **useMemo**: Memoize expensive calculations
4. **Lazy Loading**: Use React.lazy for large components
5. **Image Optimization**: Proper image sizing and formats
