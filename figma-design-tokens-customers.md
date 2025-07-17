# Figma Design Tokens - Customers Page

This document outlines the design tokens extracted from the Figma design and implemented in the Customers page UI.

## Color Tokens

### Background Colors
- `bg-gray-50` - Main page background
- `bg-white` - Card/table background
- `bg-gray-100` - Hover states and inactive status

### Text Colors
- `text-gray-900` - Primary text (customer names, contact info)
- `text-gray-700` - Table headers
- `text-gray-600` - Secondary text (descriptions)
- `text-gray-400` - Tertiary text (empty states, unassigned roofers)

### Interactive Colors
- `text-blue-600` - Clickable customer names
- `hover:text-blue-800` - Hover state for clickable elements
- `bg-blue-600` - Primary button background
- `hover:bg-blue-700` - Primary button hover state

### Status Badge Colors
- **Active Status**: `bg-green-100 text-green-800 border-green-200`
- **Inactive Status**: `bg-gray-100 text-gray-800 border-gray-200`

### Customer Type Badge Colors
- **Residential**: `bg-blue-100 text-blue-800 border-blue-200`
- **Commercial**: `bg-purple-100 text-purple-800 border-purple-200`

### Assigned Roofer Badge Colors
- **Assigned**: `bg-orange-100 text-orange-800 border-orange-200`

## Spacing Tokens

### Page Layout
- `px-6 lg:px-8` - Horizontal page padding (responsive)
- `py-8` - Vertical page padding
- `mb-8` - Section spacing

### Table Spacing
- `px-4 py-2` - Table cell padding
- `ml-2` - Icon spacing from text
- `space-x-1` - Inline element spacing

### Modal/Empty State Spacing
- `p-8` - Content area padding

## Typography Tokens

### Headings
- `text-2xl font-semibold` - Page title
- `text-lg font-medium` - Section headings

### Body Text
- `text-sm` - Table content
- `text-xs` - Badges and small text

## Layout Tokens

### Container
- `min-h-screen` - Full viewport height
- `max-w-full mx-auto` - Centered container
- `rounded-lg` - Card border radius
- `border border-gray-200` - Card borders
- `overflow-hidden` - Table container

## Interactive Tokens

### Hover States
- `hover:bg-gray-50` - Table row hover
- `hover:bg-gray-100` - Header hover
- `hover:underline` - Link hover

### Cursor
- `cursor-pointer` - Clickable elements
- `select-none` - Non-selectable text

## Accessibility Enhancements

### Focus Indicators
- Proper tabindex for keyboard navigation
- ARIA labels for screen readers
- Role attributes for semantic meaning

### Loading States
- `animate-spin` - Loading spinner animation
- Disabled button states

### Empty States
- Icon and descriptive text
- Call-to-action buttons

## Responsive Design

### Breakpoints
- `lg:px-8` - Larger horizontal padding on desktop
- Mobile-first approach with progressive enhancement

## Component-Specific Tokens

### Sort Icons
- `h-4 w-4` - Icon dimensions
- `text-gray-600` - Active sort icon color
- `text-gray-400` - Inactive sort icon color

### Badges
- `text-xs px-2 py-1` - Badge sizing
- `rounded-full` - Badge border radius

### Buttons
- `bg-blue-600 hover:bg-blue-700 text-white` - Primary button styling

---

*These tokens ensure visual consistency with the Figma design while maintaining accessibility and responsive design principles.*