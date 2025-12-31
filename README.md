# LogBug - Development & Testing

This app contains debugging tools for Homey Advanced Flows.

## Prerequisites
1.  **Node.js**: Ensure Node.js is installed.
2.  **Homey CLI**: Install the Homey Command Line Interface globally.
    ```bash
    npm install -g homey
    ```

## How to Run
1.  **Login**: Connect the CLI to your Homey account.
    ```bash
    homey login
    ```
2.  **Select Homey**: Choose your active Homey (if you have multiple).
    ```bash
    homey select
    ```
3.  **Run**: Install and run the app on your Homey.
    ```bash
    homey app run
    ```
    *   Use `homey app install` to install permanently.
    *   Use `homey app run` to see live logs in the terminal.

## Features
*   **Log Tag/Number**: Throws an error to display values on the flow card.
*   **Log JSON**: Prettifies JSON objects.
*   **Stopwatch**: Start/Stop timers.
*   **Type Inspector**: Analyze variable types.
*   **HTTP Check**: Verify URL status.
*   **Diff Meter**: Log changes in values.
