/**
 * ReloadPrompt.jsx
 *  Service worker reload prompt component. Taken from
 */

import "./styles/ReloadPrompt.css";

import { useRegisterSW } from "virtual:pwa-register/react";

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = "__DATE__";
  // replaced dyanmicaly
  const reloadSW = "__RELOAD_SW__";

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`);
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            console.log("Checking for sw update");
            r.update();
          }, 200000);
      } else {
        console.log("SW Registered: " + r);
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className="ReloadPrompt-toast-button"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>
            Close
          </button>
        </div>
      )}
      <div className="ReloadPrompt-date">{buildDate}</div>
    </div>
  );
}

export default ReloadPrompt;
