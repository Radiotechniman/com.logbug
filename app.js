const { App } = require('homey');

class LogBugApp extends App {

    async onInit() {
        this.log('LogBug has been initialized');

        // State storage
        this.timers = new Map();
        this.diffs = new Map();

        // Register flow card listeners
        this.homey.flow.getActionCard('log_tag')
            .registerRunListener(async (args) => {
                let value = args.value;

                // Auto-detect boolean-like values for prettier logging
                if (value === true || value === 'true') {
                    value = this.homey.i18n.getLanguage() === 'nl' ? 'Ja' : 'Yes';
                } else if (value === false || value === 'false') {
                    value = this.homey.i18n.getLanguage() === 'nl' ? 'Nee' : 'No';
                }

                // Throwing an Error with the value makes it visible directly on the card in Advanced Flow
                throw new Error(`${value}`);
            });

        this.homey.flow.getActionCard('log_number')
            .registerRunListener(async (args) => {
                throw new Error(`${args.value}`);
            });

        this.homey.flow.getActionCard('log_json')
            .registerRunListener(async (args) => {
                try {
                    // Try to parse if it's a string, or just stringify if it's already an object (though args.value is defined as text, better safe)
                    const parsed = typeof args.value === 'string' ? JSON.parse(args.value) : args.value;
                    throw new Error(JSON.stringify(parsed, null, 2));
                } catch (e) {
                    // If parsing fails or it's just a string, log the value itself
                    throw new Error(`${args.value}`);
                }
            });

        // --- NEW FEATURES ---

        // 1. Stopwatch
        this.homey.flow.getActionCard('stopwatch_start')
            .registerRunListener(async (args) => {
                this.timers.set(args.name, Date.now());
                return true; // Don't throw error, just continue flow
            });

        this.homey.flow.getActionCard('stopwatch_stop')
            .registerRunListener(async (args) => {
                const start = this.timers.get(args.name);
                if (!start) {
                    throw new Error(`Timer '${args.name}' not started!`);
                }
                const duration = Date.now() - start;
                // Format duration nicely (ms if < 1s, s if >= 1s)
                const formatted = duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(2)}s`;
                throw new Error(`⏱️ ${formatted}`);
            });

        // 2. Type Inspector
        this.homey.flow.getActionCard('inspect_type')
            .registerRunListener(async (args) => {
                const val = args.value;
                let type = typeof val;

                // Detailed check
                if (val === null) type = 'null';
                else if (Array.isArray(val)) type = 'Array';

                let display = `Type: ${type}`;
                if (type === 'string') display += ` (Len: ${val.length})`;
                display += `\nVal: ${val}`;

                throw new Error(display);
            });

        // 3. HTTP Check
        this.homey.flow.getActionCard('check_url')
            .registerRunListener(async (args) => {
                try {
                    const res = await fetch(args.url);
                    const icon = res.ok ? '✅' : '❌';
                    throw new Error(`${icon} ${res.status} ${res.statusText}`);
                } catch (e) {
                    throw new Error(`🔥 Error: ${e.message}`);
                }
            });

        // 4. Math / JS Eval
        this.homey.flow.getActionCard('eval_math')
            .registerRunListener(async (args) => {
                try {
                    // WARNING: eval is dangerous, but new Function is slightly contained scope-wise. 
                    // Since this is a debug tool for admins, it's acceptable.
                    const func = new Function(`return ${args.expression}`);
                    const result = func();
                    throw new Error(`= ${result}`);
                } catch (e) {
                    throw new Error(`🧮 Err: ${e.message}`);
                }
            });

        // 5. Diff Meter
        this.homey.flow.getActionCard('log_diff')
            .registerRunListener(async (args) => {
                const prev = this.diffs.get(args.name);
                const current = args.value;

                this.diffs.set(args.name, current);

                if (prev === undefined) {
                    throw new Error(`First run: ${current}`);
                }

                const delta = current - prev;
                const sign = delta > 0 ? '+' : '';
                throw new Error(`Δ ${sign}${delta} (Was: ${prev})`);
            });
    }

}

module.exports = LogBugApp;
