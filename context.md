# Money Flow Tracker – Project Context

## 1. Project Overview
**Money Flow Tracker** is a lightweight personal expense tracker designed for manually logging expenses and visualizing spending habits. It is built as a client-side application running entirely in the browser using **localStorage** for data persistence. This approach means no authentication or backend infrastructure is required, ensuring privacy and fast interactions.

## 2. Technology Stack
* **Framework**: Next.js (App Router) version 15+
* **Language**: JavaScript (ES6+), avoiding TypeScript entirely.
* **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/postcss`).
* **Persistence**: LocalStorage (via custom `useLocalStorage` React hook with `useEffect` to prevent React hydration mismatches).
* **Icons**: `lucide-react`
* **Charts**: `recharts` for responsive SVG visualizations.

## 3. Core Features

### 3.1 Adding Expenses
Users log expenses via the interactive form which captures:
* **Title** (string): The description of the expense (e.g., "Coffee").
* **Amount** (number): The cost of the expense in ₹ (rupees).
* **Date** (ISO date string format `YYYY-MM-DD`): Defaults to the current date.
* **Tags** (array of strings): Categories associated with the expense.

### 3.2 Tags System
Each expense supports an arbitrary number of tags.
* The system automatically generates lowercased tag suggestions while the user types, using previously recorded global tags.
* Allows creating new tags directly through the autocomplete dropdown.
* Tags are displayed distinctly within the transaction lists.

### 3.3 Import and Export Functionality
Users have complete control over their local data through file-based JSON exporting.
* **Export**: Downloads a Backup JSON file (`money-flow-backup-YYYY-MM-DD.json`) populated with the current expenses state.
* **Import**: Validates and reads external JSON arrays. Data effectively overrides local state and provides immediate DOM feedback without page reloads.

### 3.4 Dashboard Analytics
Summary cards display core metrics based on the dynamically selected Time Filter:
* **Total Spent**
* **Today's Spending**
* **Yesterday's Spending**
* **Last 7 Days Spending**
* **This Month's Spending**
* **Total Transactions** (Count)

### 3.5 Time Filters
Filters conditionally render both the transaction history and the top-level stats cards:
* Today
* Yesterday
* Last 7 Days
* This Month
* All Time

### 3.6 Charts Visualizations
* **Daily Spending Chart**: Bar chart showing granular spending for the last 14 unique days of data.
* **Monthly Spending Chart**: Bar chart aggregating total mathematical spending grouped per month (Last 12 months).
* **Tag Distribution Chart**: A dynamic Donut/Pie chart illustrating proportional spending distribution across the Top 8 most expensive tags.

### 3.7 Transactions History
Displays the entire list of expenses (or filtered scoped list) showcasing Title, Amount, Date, and Tags. Contains inline capabilities to permanently `Delete` individual transactions.

## 4. Architectural Structure
* `/app/page.js`: The central container assembling all Layouts, Forms, Charts, and Hooks. Hosts the active top-level state via `useExpenses`.
* `/app/layout.js`: Declares routing HTML structure and loads `Inter` font.
* `/components/AddExpenseForm.js`: Encapsulates the tracking log form. 
* `/components/ExpenseList.js` & `ExpenseItem.js`: Renders the sorted history UI and handles deletions.
* `/components/StatsCards.js`: Simple presentational grid for displaying aggregate sums.
* `/components/TagInput.js`: Complex sub-component handling user input logic, tokenization, and dynamic auto-suggest menus.
* `/components/FilterTabs.js`: Pills representing the currently active temporal filter.
* `/charts/DailyChart.js`, `MonthlyChart.js`, `TagChart.js`: Presentation components mapping raw expense arrays down into specific axis configuration for Recharts.
* `/hooks/useExpenses.js`: Primary state wrapper holding `addExpense`, `deleteExpense`, `importExpenses` commands alongside heavy derived analytics math operations.
* `/hooks/useLocalStorage.js`: Abstract hook wrapping `useState` and `useEffect` with generic JSON `serialize/deserialize` logic tailored to block Next.js server-side crashes.
* `/lib/dateUtils.js`: Boolean mathematical pure functions assessing standard temporal relative dates (e.g. `isToday()`).
* `/lib/tagUtils.js`: Array logic managing autocomplete filtering string matching operations.
