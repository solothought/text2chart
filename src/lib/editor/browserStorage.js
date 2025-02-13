const FLOW_STORAGE_PREFIX = 'flow-text-';
const SELECTED_FLOW_KEY = 'selected-flow';
const FLOW_LIST_KEY = 'flow-list';

// NEW: Debounced function for saving flow text
let debounceTimeout;

export function saveFlowText(flowName, text) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        localStorage.setItem(`${FLOW_STORAGE_PREFIX}${flowName}`, text);
    }, 500); // 500ms delay
}

export function loadFlowText(flowName) {
    return localStorage.getItem(`${FLOW_STORAGE_PREFIX}${flowName}`) || 
           null;
}

export function saveSelectedFlowName(flowName) {
    localStorage.setItem(SELECTED_FLOW_KEY, flowName);
}

export function loadSelectedFlowName() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(SELECTED_FLOW_KEY);
    }else{
        return 1;
    }
}

export function saveFlowList(flows) {
    localStorage.setItem(FLOW_LIST_KEY, JSON.stringify(flows));
}

export function loadFlowList() {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(FLOW_LIST_KEY);
        return stored ? JSON.parse(stored) : null;
    }else{
        return null;
    }
}