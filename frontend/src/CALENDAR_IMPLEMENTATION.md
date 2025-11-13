# Calendar Implementation - Dynamic Activity Due Dates

## Overview
The calendar feature has been updated to dynamically display activity due dates based on user progress.

## How It Works

### 1. Initial State
- When a user first logs in, the calendar is **blank** (no events)
- Activities are locked until their related lessons are completed

### 2. When a User Completes a Lesson
Example: User completes "Shapes & Colors" lesson (ID: 4)

**What happens:**
1. Lesson is marked as completed with `completedDate`
2. All related activities are unlocked
3. Activity scores are initialized with:
   - `dueDate` = lesson completion date + 1 day
   - `completed` = false
   - Activity metadata (score, maxScore)

### 3. Calendar Events Generation
The calendar automatically scans for activities and creates events when:
- ✅ Activity is unlocked (related lesson is completed OR no related lesson)
- ✅ Activity is NOT completed yet
- ✅ Activity has a due date

**Event Format:**
- Title: "Due: [Activity Name]"
- Example: "Due: Shapes & Colors Challenge"
- Date: 1 day after lesson completion
- Color: Matches activity gradient color
- Type: 'activity'

### 4. Calendar Display
Accessible via the Calendar icon (📅) in the header:
- Shows all upcoming activity due dates
- Sorted chronologically
- Each event shows:
  - Activity title with "Due:" prefix
  - Due date (e.g., "Tomorrow", "In 2 days", or actual date)
  - Time
  - Event type badge

### 5. After Activity Completion
- Once an activity is completed, it's removed from the calendar
- Calendar shows "No upcoming deadlines" if there are no pending activities

## Example User Flow

1. **Day 1:** User completes "Shapes & Colors" lesson
2. **Calendar automatically shows:**
   - "Due: Shapes & Colors Challenge" - Due on Day 2
3. **Day 2:** User completes the activity
4. **Calendar updates:** Event is removed
5. **Result:** Calendar shows "No upcoming deadlines" (or next activity if another lesson was completed)

## Technical Details

### Files Modified
- `/contexts/AppContext.tsx` - Calendar events generation logic
- `/components/modals/CalendarPanel.tsx` - Already configured to display events
- `/data/activitiesData.ts` - Contains activity definitions with `relatedLessonId`

### Key Functions
- `completeLesson()` - Initializes activity scores with due dates
- `useEffect()` for calendar events - Scans activities and generates calendar entries
- Activity filtering based on lesson completion status

### Data Flow
```
Lesson Completed
    ↓
activityScores updated with dueDate
    ↓
useEffect triggers (dependency: activityScores, lessonProgress)
    ↓
Scan activitiesData for unlocked, uncompleted activities
    ↓
Generate CalendarEvent objects
    ↓
CalendarPanel displays events
```

## Notes
- All placeholder/static events have been removed
- Calendar is now fully dynamic based on user progress
- Activities appear on the calendar only when unlocked
- Due dates are calculated automatically (1 day after lesson completion)
- Calendar handles timezone and date formatting automatically
