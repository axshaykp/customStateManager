const stateManager = (function () {
    // Private state
    let state = {};
    let listeners = [];

    // Private methods
    function setState(newState) {
        state = { ...state, ...newState };
        notifyListeners();
    }

    function notifyListeners() {
        listeners.forEach((listener) => listener(state));
    }

    function addListener(listener) {
        listeners.push(listener);
    }

    // Public API
    return {
        set: function (key, value) {
            setState({ [key]: value });
        },
        get: function (key) {
            return state[key];
        },
        getAll: function () {
            return state;
        },
        subscribe: function (listener) {
            addListener(listener);
            return function unsubscribe() {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        },
    };
})();



// Subscribe to state changes
const unsubscribe = stateManager.subscribe((state) => {
    console.log("State updated:", state);
});

// Set initial state
stateManager.set("counter", 0);

// Increment the counter
// stateManager.set("counter", stateManager.get("counter") + 1);

// Unsubscribe from state changes
// unsubscribe();
