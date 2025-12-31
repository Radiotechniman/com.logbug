# LogBug 🐞

**Advanced Flow Debugger for Homey Pro**

> "I missed the ability to see what happens inside the wires, just like in iOS Shortcuts."

LogBug gives you the power to inspect tag values, measure execution time, and debug your flows visually. It works by providing Flow Cards that **intentionally fail**.

**Why fail?**
In Homey's Advanced Flow editor, when a card fails, it shows a red badge with the error message. LogBug exploits this by "throwing" the value you want to inspect as an error. This allows you to see the data directly on the canvas without opening logs or timelines.

---

## Features & Examples

### 1. 🏷️ Log Tag / Text
Inspect any tag or text value instantly.
*   **Card:** `Log Text / Any Tag`
*   **Usage:** Connect a tag to the `Value` field.
*   **Result:** The card turns red and shows: `Your Value Here`.

### 2. ⏱️ Stopwatch
Measure how long a part of your flow takes to execute.
*   **Start:** Use the `Start Stopwatch` card. Give it a name (e.g., `api_call`).
*   **Stop:** Use the `Stop & Log Stopwatch` card with the **same name**.
*   **Result:** `⏱️ 450ms` or `⏱️ 1.2s`.

### 3. 📈 Diff Meter
Track changes in a value between flow runs. Perfect for checking if a sensor value is rising or falling.
*   **Card:** `Log Difference`
*   **Usage:** Give it a name (ID) and the current value.
*   **Result:**
    *   Run 1: `First run: 100`
    *   Run 2 (val 105): `Δ +5 (Was: 100)`

### 4. 🔍 Type Inspector
Not sure if a tag is a Text, Number, or Boolean?
*   **Card:** `Inspect Type`
*   **Result:** `Type: string (Len: 5) Val: "12345"` vs `Type: number Val: 12345`.

### 5. 📦 JSON Viewer
Prettify JSON objects for easier reading.
*   **Card:** `Log JSON Object`
*   **Result:** Formatted JSON structure displayed in the error badge.

---

## Development & Installation

### Prerequisites
1.  **Node.js**: Installed.
2.  **Homey CLI**: `npm install -g homey`

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/Radiotechniman/com.logbug.git
    ```
2.  Install connections:
    ```bash
    cd com.logbug
    npm install
    ```
3.  Run on Homey:
    ```bash
    homey app run
    ```

---
*Made with ❤️ by Techniman*
