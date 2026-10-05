let promessa = null;

// Carrega o script do Google Sign-In uma única vez
export function carregarScriptGoogle() {
  if (window.google?.accounts?.id) return Promise.resolve();

  if (!promessa) {
    promessa = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => {
        promessa = null;
        reject(new Error('Não foi possível carregar o Google Sign-In'));
      };
      document.head.appendChild(script);
    });
  }
  return promessa;
}
