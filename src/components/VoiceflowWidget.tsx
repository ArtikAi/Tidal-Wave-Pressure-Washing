import { useEffect, useRef } from 'react';
import { appendTrustedScript } from '../utils/security';

const VOICEFLOW_PROJECT_ID = 'YOUR_VOICEFLOW_PROJECT_ID';

type VoiceflowWidgetProps = {
  enabled: boolean;
};

export default function VoiceflowWidget({ enabled }: VoiceflowWidgetProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (initializedRef.current) {
      const voiceflow = (window as { voiceflow?: { chat?: { open?: () => void } } }).voiceflow;
      voiceflow?.chat?.open?.();
      return;
    }

    const initialize = () => {
      if (initializedRef.current) {
        return;
      }

      const voiceflow = (window as { voiceflow?: { chat?: { load?: (config: unknown) => void } } }).voiceflow;
      voiceflow?.chat?.load?.({
        verify: { projectID: VOICEFLOW_PROJECT_ID },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        render: { mode: 'overlay', open: true },
      });
      initializedRef.current = true;
    };

    const script = appendTrustedScript('https://cdn.voiceflow.com/widget/bundle.mjs', {
      id: 'voiceflow-widget',
      dataAttributes: { voiceflow: 'true' },
    });

    if (!script) {
      return;
    }

    const handleLoad = () => {
      initialize();
    };

    if ((window as { voiceflow?: { chat?: { load?: () => void } } }).voiceflow?.chat?.load) {
      initialize();
    } else {
      script.addEventListener('load', handleLoad);
    }

    return () => {
      script.removeEventListener('load', handleLoad);
    };
  }, [enabled]);

  return null;
}
