# Pages Refactoring Analysis - DashboardLayout Integration

## Executive Summary

All 11 pages follow an **identical structure** with duplicated code:

- **~400 lines of duplicated code per page**: Sidebar, header, profile section, navigation
- **Unique per page**: Page title, specific data arrays, custom components, content layout

This document maps what each page needs to **retain and keep organized** when refactoring to use a centralized `DashboardLayout` component.

---

# 1. WORKERS.jsx

**File Location:** `src/pages/core/Workers.jsx`

## Page-Specific Data

```javascript
// Two labor categorization arrays
const ownLabour = [
  {
    name: "Mohammed Al Rashidi",
    id: "W001",
    category: "Electrician",
    type: "Own",
    nationality: "Pakistani",
    salary: "2,800",
    status: "Deployed",
    expiry: "2025-08-14",
  },
  // ... 3 total items
];

const outsourcedLabour = [
  {
    name: "Carlos Fernandez",
    id: "W003",
    category: "Driver",
    type: "Outsourced",
    nationality: "Filipino",
    salary: "2,200",
    status: "Deployed",
    expiry: "2024-12-20",
  },
  // ... 3 total items
];
```

## Page-Specific Components

**`WorkerTable` Component** - Custom reusable table for worker categories

- **Props:** `title` (string), `icon` (LucideIcon), `description` (string), `workers` (array)
- **Renders:**
  - Header with icon, title, worker count badge, description
  - Table with columns: Worker, Category, Labour Type, Nationality, Salary, Status, Visa Expiry, Action

## Main Content Structure

```
┌─ Header ─────────────────────────────────────────┐
│ Title: "Workers"                                 │
│ Status badge | Notification bell | + Add Worker │
└──────────────────────────────────────────────────┘

┌─ Search/Filter Bar ──────────────────────────────┐
│ Search input | Status filter | Labour type filter│
│              | Filter button                     │
└──────────────────────────────────────────────────┘

┌─ Two WorkerTable Components ─────────────────────┐
│ 1. Own Labour (3 workers)                        │
│    - Table with worker details                   │
│                                                  │
│ 2. Outsourced Labour (3 workers)                 │
│    - Table with worker details                   │
└──────────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Workers"
- **Button:** "+ Add Worker" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

# 2. CLIENTS.jsx

**File Location:** `src/pages/core/Clients.jsx`

## Page-Specific Data

```javascript
const clientData = [
  {
    name: "Al Futtaim Group",
    contact: "Omar Al Futtaim",
    type: "Construction",
    workers: 28,
    rate: "3,200",
    till: "2025-12-31",
    status: "Active",
    revenue: "89,600",
  },
  {
    name: "Emaar Properties",
    contact: "Sarah Johnson",
    type: "Real Estate",
    workers: 45,
    rate: "3,500",
    till: "2026-06-30",
    status: "Active",
    revenue: "157,500",
  },
  // ... 5 total items
];
```

## Page-Specific Components

- None (uses standard HTML table)

## Main Content Structure

```
┌─ Header ─────────────────────────────────────────┐
│ Title: "Clients"                                 │
│ Status badge | Notification bell | + Add Client │
└──────────────────────────────────────────────────┘

┌─ Search Bar ─────────────────────────────────────┐
│ Search clients...                                │
└──────────────────────────────────────────────────┘

┌─ Main Table ─────────────────────────────────────┐
│ Columns: Client | Type | Workers | Rate/Worker  │
│          | Contract Till | Status | Action      │
│ 5 rows of client data                           │
└──────────────────────────────────────────────────┘

┌─ Analytics Grid (2 columns) ──────────────────────┐
│ Left Card: "Top Clients by Workers"              │
│   - Progress bars for each client                │
│                                                  │
│ Right Card: "Revenue by Client (AED)"            │
│   - Revenue breakdown list                       │
└──────────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Clients"
- **Button:** "+ Add Client" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

# 3. DEPLOYMENT.jsx

**File Location:** `src/pages/core/Deployment.jsx`

## Page-Specific Data

```javascript
const deployments = [
  {
    id: "DEP-101",
    site: "DAMAC Arjan",
    client: "DAMAC Properties",
    workers: 12,
    supervisor: "Ahmed Hassan",
    status: "On-Site",
    time: "07:00 AM",
  },
  {
    id: "DEP-102",
    site: "Emaar Beachfront",
    client: "Emaar Properties",
    workers: 25,
    supervisor: "Ramesh Kumar",
    status: "In Transit",
    time: "08:30 AM",
  },
  // ... 4 total items
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Deployment Tracker"                  │
│ Status badge | Bell | + New Deployment      │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (3 columns) ──────────────┐
│ 1. Active Transports: 14 Vehicles            │
│    Truck icon, blue border-left              │
│                                              │
│ 2. Live Projects: 8 Sites                   │
│    MapPin icon, amber border-left            │
│                                              │
│ 3. Total Deployed: 85 Workers                │
│    Users icon, emerald border-left           │
└──────────────────────────────────────────────┘

┌─ "Live Deployment Status" Table ──────────────┐
│ Tabs: Today (active) | Weekly                │
│ Columns: Dep ID | Site/Project | Client     │
│          | Workers | Supervisor | Check-in   │
│          | Status                            │
│ 4 rows of deployment data                    │
│ Status badges: On-Site (blue), In Transit    │
│ (amber), Completed (emerald)                 │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Deployment Tracker"
- **Button:** "+ New Deployment" (brand-gold)
- **Icon:** Truck icon
- **Notification Badge:** 5

---

# 4. ATTENDANCE.jsx

**File Location:** `src/pages/operations/Attendance.jsx`

## Page-Specific Data

```javascript
const attendanceData = [
  {
    name: "Mohammed Al Rashidi",
    id: "MA",
    in: "07:02",
    out: "18:05",
    ot: "1.08 hrs",
    status: "Present",
  },
  {
    name: "Ramesh Kumar",
    id: "RK",
    in: "—",
    out: "—",
    ot: "—",
    status: "Absent",
  },
  // ... 6 total items with Present/Absent/Leave statuses
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Attendance"                          │
│ Status badge | Notification bell            │
│ (No Add button for this page)                │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (4 columns) ──────────────┐
│ 1. PRESENT TODAY: 4                          │
│ 2. ABSENT: 1                                 │
│ 3. ON LEAVE: 1                              │
│ 4. TOTAL OT HOURS: 4.2                       │
└──────────────────────────────────────────────┘

┌─ "Attendance — June 10, 2025" Table ────────┐
│ Date picker: 10/06/2025 | "Mark Today" btn  │
│ Columns: Worker | In Time | Out Time        │
│          | OT Hours | Status                │
│ 6 rows of attendance records                │
│ Status badges: Present (emerald), Absent    │
│ (red), Leave (amber)                        │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Attendance"
- **Button:** None (no Add button)
- **Notification Badge:** 5

---

# 5. RECRUITMENT.jsx

**File Location:** `src/pages/operations/Recruitment.jsx`

## Page-Specific Data

```javascript
const pipeline = [
  {
    stage: "Applied",
    color: "slate",
    count: 1,
    items: [
      {
        name: "Deepak Chaudhary",
        role: "Helper",
        nat: "Nepalese",
        exp: "1 yr",
        date: "2025-06-07",
      },
    ],
  },
  {
    stage: "Screening",
    color: "blue",
    count: 2,
    items: [
      {
        name: "Pradeep Singh",
        role: "Welder",
        nat: "Indian",
        exp: "5 yrs",
        date: "2025-06-05",
      },
      {
        name: "Samuel Okafor",
        role: "Mason",
        nat: "Nigerian",
        exp: "6 yrs",
        date: "2025-06-08",
      },
    ],
  },
  // ... 5 total stages: Applied, Screening, Interview, Offer, Hired
];
```

## Page-Specific Components

- None (uses standard cards in Kanban layout)

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Recruitment"                         │
│ Status badge | Bell | + Add Candidate        │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (3 columns) ──────────────┐
│ 1. TOTAL CANDIDATES: 7                       │
│ 2. IN PROGRESS: 5                            │
│ 3. HIRED THIS MONTH: 1                       │
└──────────────────────────────────────────────┘

┌─ Kanban Pipeline View (5 columns) ────────────┐
│ Applied | Screening | Interview | Offer | Hired
│ (1)     | (2)       | (2)       | (1)   | (1)
│         |           |           |       |
│ Candidate cards in each column:              │
│ - Avatar with initials                       │
│ - Name, Role                                 │
│ - Tags: 🌍 Nationality, 🏗️ Experience       │
│ - Date                                       │
│ - Either "✓ Hired" badge or ChevronRight btn │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Recruitment"
- **Button:** "+ Add Candidate" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

# 6. PAYROLL.jsx

**File Location:** `src/pages/operations/Payroll.jsx`

## Page-Specific Data

```javascript
const payrollData = [
  {
    name: "Mohammed Al Rashidi",
    basic: "2,800",
    ot: "875",
    allow: "400",
    ded: "-150",
    net: "3,925",
    status: "Paid",
  },
  {
    name: "Ramesh Kumar",
    basic: "2,400",
    ot: "—",
    allow: "350",
    ded: "-120",
    net: "2,630",
    status: "Pending",
  },
  // ... 4 total items with Paid/Pending/Processing statuses
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Payroll"                             │
│ Status badge | Bell | ▶ Run Payroll (navy)   │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (3 columns) ──────────────┐
│ 1. TOTAL PAYROLL: AED 19,100                 │
│    (June 2025) [brand-gold top border]       │
│                                              │
│ 2. PAID OUT: AED 11,995                      │
│    [emerald top border]                      │
│                                              │
│ 3. PENDING: AED 7,105                        │
│    [brand-gold top border]                   │
└──────────────────────────────────────────────┘

┌─ WPS Filing Alert ────────────────────────────┐
│ 📋 WPS filing due June 15, 2025.             │
│ Generate WPS → [blue background]             │
└──────────────────────────────────────────────┘

┌─ "Payroll — June 2025" Table ─────────────────┐
│ Columns: Worker | Basic | Overtime (AED)    │
│          | Allowance | Deduction | Net Pay  │
│          | Status | Action                  │
│ 4 rows of payroll data                      │
│ OT column shows value with "✏️" edit icon    │
│ Status badges: Paid (emerald), Pending      │
│ (amber), Processing (slate)                 │
│ Action: "Pay" button (emerald)              │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Payroll"
- **Button:** "▶ Run Payroll" (brand-navy)
- **Icon:** Play icon (text only)
- **Notification Badge:** 5

---

# 7. INVOICES.jsx

**File Location:** `src/pages/operations/Invoices.jsx`

## Page-Specific Data

```javascript
const invoices = [
  {
    id: "INV-001",
    client: "Al Futtaim Group",
    amt: "89,600",
    date: "2025-06-01",
    due: "2025-06-30",
    status: "Paid",
  },
  {
    id: "INV-002",
    client: "Emaar Properties",
    amt: "157,500",
    date: "2025-06-01",
    due: "2025-06-30",
    status: "Pending",
  },
  // ... 5 total items with Paid/Pending/Overdue statuses
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Invoices"                            │
│ Status badge | + New Invoice (brand-gold)    │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (3 columns) ──────────────┐
│ 1. TOTAL INVOICED: AED 427,100               │
│    [brand-gold top border]                   │
│                                              │
│ 2. COLLECTED: AED 120,800                    │
│    [emerald top border]                      │
│                                              │
│ 3. OUTSTANDING: AED 306,300                  │
│    [red top border]                          │
└──────────────────────────────────────────────┘

┌─ "All Invoices" Table ────────────────────────┐
│ Columns: Invoice # | Client | Amount (AED)  │
│          | Issued | Due Date | Status | Action
│ 5 rows of invoice data                      │
│ Invoice # in brand-gold color               │
│ Amount in brand-navy (uppercase mono font)   │
│ Due date shows red if Overdue               │
│ Status badges: Paid (emerald), Pending      │
│ (amber), Overdue (red)                      │
│ Action: "PDF" button                        │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Invoices"
- **Button:** "+ New Invoice" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** None

---

# 8. LEAVEMGMT.jsx

**File Location:** `src/pages/operations/LeaveMgmt.jsx`

## Page-Specific Data

```javascript
const requests = [
  {
    id: "RK",
    name: "Ramesh Kumar",
    cat: "LV001",
    type: "Annual",
    from: "2025-06-12",
    to: "2025-06-15",
    days: 4,
    reason: "Family visit to India",
    status: "Pending",
  },
  {
    id: "SP",
    name: "Sanjay Patel",
    cat: "LV002",
    type: "Sick",
    from: "2025-06-10",
    to: "2025-06-11",
    days: 2,
    reason: "Medical appointment",
    status: "Pending",
  },
  // ... 5 total items with Annual/Sick/Emergency types and Pending/Approved statuses
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Leave Management"                    │
│ Status badge | Bell | + Request Leave        │
└──────────────────────────────────────────────┘

┌─ Summary Stat Cards (4 columns) ──────────────┐
│ 1. PENDING REQUESTS: 3                       │
│ 2. APPROVED: 2                               │
│ 3. ON LEAVE TODAY: 1                         │
│ 4. TOTAL DAYS TAKEN: 13                      │
└──────────────────────────────────────────────┘

┌─ Tab Bar ────────────────────────────────────┐
│ "Leave Requests" (active, brand-gold)        │
│ "Balance & Entitlements"                     │
└──────────────────────────────────────────────┘

┌─ "Leave Requests" Table ───────────────────────┐
│ Columns: Worker | Type | From | To | Days   │
│          | Reason | Status | Action          │
│ 5 rows of leave request data                 │
│ Type badges: Annual (blue), Sick (amber),    │
│ Emergency (red)                              │
│ Status badges: Pending (amber), Approved     │
│ (emerald)                                    │
│ Action: For Pending only - Approve ✓ /      │
│ Reject × buttons                            │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Leave Management"
- **Button:** "+ Request Leave" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

# 9. DOCUMENTS.jsx

**File Location:** `src/pages/compliance/Documents.jsx`

## Page-Specific Data

```javascript
const docData = [
  {
    name: "Mohammed Al Rashidi",
    type: "Visa Copy",
    expiry: "2024-12-14",
    status: "Expiring Soon",
  },
  {
    name: "Carlos Fernandez",
    type: "Labor Card",
    expiry: "2025-08-20",
    status: "Valid",
  },
  // ... 5 total items with "Valid"/"Expiring Soon" statuses
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Documents"                           │
│ Status badge | Bell | + Upload Document      │
└──────────────────────────────────────────────┘

┌─ Search Bar ─────────────────────────────────┐
│ Search by worker or document type...         │
└──────────────────────────────────────────────┘

┌─ "Document Records" Table ────────────────────┐
│ Columns: Worker | Document Type | Expiry    │
│          | Status | Actions                  │
│ 5 rows of document records                  │
│ Expiry date shows red/bold if "Expiring Soon"│
│ Status badges: Valid (emerald), Expiring    │
│ Soon (red)                                   │
│ Action icons: Eye (view), Download           │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Documents"
- **Button:** "+ Upload Document" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

# 10. REPORTS.jsx

**File Location:** `src/pages/compliance/Reports.jsx`

## Page-Specific Data

```javascript
const reportCategories = [
  {
    title: "Manpower Utilisation",
    desc: "Detailed breakdown of worker deployment vs availability",
    icon: Users,
    color: "blue",
  },
  {
    title: "Financial Summary",
    desc: "Invoiced vs Collected reports for current fiscal year",
    icon: Wallet,
    color: "emerald",
  },
  {
    title: "Attendance Analytics",
    desc: "Overtime trends and absent patterns per site",
    icon: CalendarCheck,
    color: "amber",
  },
  {
    title: "Compliance Audit",
    desc: "Document expiry forecasts and legal status checks",
    icon: FileStack,
    color: "red",
  },
];
```

## Page-Specific Components

- None

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Reports Central"                     │
│ Status badge | 📊 Export Master Data (navy)  │
└──────────────────────────────────────────────┘

┌─ Report Category Cards (2 columns) ────────────┐
│ 4 cards, each with:                          │
│   - Icon in colored background               │
│   - Title                                    │
│   - Description                              │
│   - Two buttons:                             │
│     1. "Generate PDF" (brand-gold text)      │
│     2. "Excel" (slate text)                  │
│                                              │
│ Colors: blue, emerald, amber, red            │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Reports Central"
- **Button:** "📊 Export Master Data" (brand-navy)
- **Icon:** FileSpreadsheet icon
- **Notification Badge:** None

---

# 11. ROLESACCESS.jsx

**File Location:** `src/pages/RolesAccess.jsx`

## Page-Specific Data

```javascript
const permissions = [
  { module: "View Dashboard", roles: [true, true, true, true] },
  { module: "View All Workers", roles: [true, true, true, false] },
  { module: "Add / Edit Workers", roles: [true, true, true, false] },
  { module: "View Worker Salaries", roles: [true, false, false, false] },
  { module: "View Clients", roles: [true, true, false, false] },
  { module: "Manage Deployment", roles: [true, false, true, false] },
  { module: "Mark Attendance", roles: [true, true, true, false] },
  { module: "Manage Recruitment", roles: [true, true, false, false] },
];
```

## Page-Specific Components

- **`RoleCard` Component** - Role display card
  - Props: `title`, `icon`, `userCount`, `active`, `desc`, `colorClass`, `btnLabel`
  - Displays user count, "Active Role" badge if active, action button

- **`Toggle` Component** - Custom toggle switch
  - Props: `enabled` (boolean)
  - Animated on/off state with brand-gold for on, slate for off

## Main Content Structure

```
┌─ Header ─────────────────────────────────────┐
│ Title: "Roles & Permissions"                 │
│ Status badge | Bell | + Add User (brand-gold)│
└──────────────────────────────────────────────┘

┌─ Four Role Cards (4 columns) ──────────────────┐
│ 1. Admin (👑)                                 │
│    1 user | "Active Role" badge              │
│    "Switch to Admin" button                  │
│                                              │
│ 2. HR (👤)                                   │
│    2 users                                   │
│    "Switch to HR" button (blue)              │
│                                              │
│ 3. Supervisor (👷)                           │
│    3 users                                   │
│    "Switch to Supervisor" button (emerald)   │
│                                              │
│ 4. Worker (👷‍♂️)                              │
│    142 users                                 │
│    "Switch to Worker" button (orange)        │
└──────────────────────────────────────────────┘

┌─ "Permissions Matrix" Table ──────────────────┐
│ Columns: Module/Permission | Admin | HR      │
│          | Supervisor | Worker                │
│ 8 rows of permissions                        │
│ Each cell: Custom Toggle component           │
│ On = brand-gold, Off = slate-200             │
│ Legend: Green = allowed, Grey = denied       │
└──────────────────────────────────────────────┘
```

## Header Configuration

- **Title:** "Roles & Permissions"
- **Button:** "+ Add User" (brand-gold)
- **Icon:** Plus icon
- **Notification Badge:** 5

---

## REFACTORING SUMMARY TABLE

| Page            | Data Arrays                     | Custom Components    | Header Button           | Button Type | Notification Badge |
| --------------- | ------------------------------- | -------------------- | ----------------------- | ----------- | ------------------ |
| **Workers**     | `ownLabour`, `outsourcedLabour` | `WorkerTable`        | "+ Add Worker"          | brand-gold  | 5                  |
| **Clients**     | `clientData`                    | None                 | "+ Add Client"          | brand-gold  | 5                  |
| **Deployment**  | `deployments`                   | None                 | "+ New Deployment"      | brand-gold  | 5                  |
| **Attendance**  | `attendanceData`                | None                 | None                    | —           | 5                  |
| **Recruitment** | `pipeline`                      | None                 | "+ Add Candidate"       | brand-gold  | 5                  |
| **Payroll**     | `payrollData`                   | None                 | "▶ Run Payroll"         | brand-navy  | 5                  |
| **Invoices**    | `invoices`                      | None                 | "+ New Invoice"         | brand-gold  | None               |
| **LeaveMgmt**   | `requests`                      | None                 | "+ Request Leave"       | brand-gold  | 5                  |
| **Documents**   | `docData`                       | None                 | "+ Upload Document"     | brand-gold  | 5                  |
| **Reports**     | `reportCategories`              | None                 | "📊 Export Master Data" | brand-navy  | None               |
| **RolesAccess** | `permissions`                   | `RoleCard`, `Toggle` | "+ Add User"            | brand-gold  | 5                  |

---

## Key Takeaways for Refactoring

### Each page should retain:

1. ✅ All page-specific data arrays (internal state)
2. ✅ Custom page-specific components (`WorkerTable`, `RoleCard`, `Toggle`)
3. ✅ Main content JSX structure (layout, tables, cards)
4. ✅ Header configuration (title, button action)
5. ✅ useNavigate and useLocation hooks (if needed for internal navigation)

### Each page should remove:

1. ❌ Entire sidebar code and SidebarItem component
2. ❌ Profile section at bottom of sidebar
3. ❌ Duplicate import of all navigation icons
4. ❌ Main container div with flex structure
5. ❌ Header JSX structure (provided by DashboardLayout)

### DashboardLayout should handle:

1. ✅ Sidebar with SidebarItem component
2. ✅ Header bar structure and styling
3. ✅ Profile card section
4. ✅ Route tracking (useLocation, pathname comparison)
5. ✅ Main content area container
6. ✅ Responsive layout (flex, h-screen)
