const isTauri = () => {
    if (typeof window === 'undefined') return false;
    return '__TAURI_IPC__' in window;
};

const target_tauri = isTauri();

export const api_proxy_addr = "http://192.168.56.1:8000";
export const img_proxy_addr = "http://192.168.56.1:9000";

export const dest_api = target_tauri ? api_proxy_addr : "/api";
export const dest_img = target_tauri ? img_proxy_addr : "/images";
export const dest_root = target_tauri ? "" : "/frontend";

if (target_tauri) {
    console.log('🚀 Running in TAURI mode - using direct IP connections');
} else {
    console.log('🌐 Running in BROWSER mode - using proxy');
}
