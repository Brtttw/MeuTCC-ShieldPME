import { useEffect, useRef } from 'react';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { carregarScriptGoogle } from '../../utils/googleScript';

export default function GoogleLoginButton({ aoReceberCredencial }) {
  const containerRef = useRef(null);
  const callbackRef = useRef(aoReceberCredencial);
  callbackRef.current = aoReceberCredencial;

  useEffect(() => {
    let cancelado = false;

    carregarScriptGoogle()
      .then(() => {
        if (cancelado) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (resposta) => callbackRef.current(resposta),
        });
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          size: 'large',
          theme: 'outline',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      })
      .catch(() => {});

    return () => {
      cancelado = true;
    };
  }, []);

  return <div ref={containerRef} />;
}
