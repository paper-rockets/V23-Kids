import { useState, useEffect, useCallback } from 'react';
import {
  canInstallPWA,
  promptPWAInstall,
  subscribeInstallAvailability,
} from '../registerServiceWorker';

export interface PWAInstallState {
  canInstall: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
}

export function usePWAInstall(): PWAInstallState {
  const [canInstall, setCanInstall] = useState<boolean>(() => canInstallPWA());
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    );
  });

  const [isIOS, setIsIOS] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
    );
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check display mode for both standalone and fullscreen PWA
    const mediaStandalone = window.matchMedia('(display-mode: standalone)');
    const mediaFullscreen = window.matchMedia('(display-mode: fullscreen)');
    const handleMediaChange = () => {
      setIsInstalled(
        mediaStandalone.matches ||
          mediaFullscreen.matches ||
          (window.navigator as any).standalone === true
      );
    };

    if (mediaStandalone.addEventListener) {
      mediaStandalone.addEventListener('change', handleMediaChange);
      mediaFullscreen.addEventListener('change', handleMediaChange);
    } else {
      mediaStandalone.addListener(handleMediaChange);
      mediaFullscreen.addListener(handleMediaChange);
    }

    // Subscribe to beforeinstallprompt changes
    const unsubscribe = subscribeInstallAvailability((available) => {
      setCanInstall(available);
    });

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      unsubscribe();
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (mediaStandalone.removeEventListener) {
        mediaStandalone.removeEventListener('change', handleMediaChange);
        mediaFullscreen.removeEventListener('change', handleMediaChange);
      } else {
        mediaStandalone.removeListener(handleMediaChange);
        mediaFullscreen.removeListener(handleMediaChange);
      }
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (canInstall) {
      const outcome = await promptPWAInstall();
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setCanInstall(false);
      }
      return outcome;
    }

    if (isIOS) {
      alert(
        'To install this app on your iPhone or iPad:\n\n1. Tap the Share button in Safari (box with arrow)\n2. Scroll down and tap "Add to Home Screen"'
      );
      return 'unavailable';
    }

    alert(
      'To install Remix 3D:\n\nUse your browser menu (⋮ or ...) and select "Install App" or "Add to Home Screen".'
    );
    return 'unavailable';
  }, [canInstall, isIOS]);

  return {
    canInstall,
    isInstalled,
    isIOS,
    promptInstall,
  };
}
