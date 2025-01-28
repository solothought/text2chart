// browserStorage.js
const FLOW_STORAGE_PREFIX = 'flow-text-';
const SELECTED_FLOW_KEY = 'selected-flow';
const FLOW_LIST_KEY = 'flow-list';

// NEW: Debounced function for saving flow text
let debounceTimeout;

export function saveFlowText(flowId, flowName, text) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        localStorage.setItem(`${FLOW_STORAGE_PREFIX}${flowId}`, text);
        localStorage.setItem(`${FLOW_STORAGE_PREFIX}${flowName}`, text);
    }, 500); // 500ms delay
}

export function loadFlowText(flowId, flowName) {
    return localStorage.getItem(`${FLOW_STORAGE_PREFIX}${flowId}`) || 
           localStorage.getItem(`${FLOW_STORAGE_PREFIX}${flowName}`) || 
           null;
}

export function saveSelectedFlowId(flowId) {
    localStorage.setItem(SELECTED_FLOW_KEY, flowId);
}

export function loadSelectedFlowId() {
    if (typeof window !== 'undefined') {
        return Number(localStorage.getItem(SELECTED_FLOW_KEY));
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