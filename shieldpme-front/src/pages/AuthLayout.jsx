import { Outlet } from 'react-router-dom';
import { SPLINE_LOGIN_URL } from '../config/env';

// Estrutura compartilhada por /login e /cadastro (o modelo 3D não recarrega ao alternar)
export default function AuthLayout() {
  return (
    <section className="auth-page" style={{ height: '100vh' }}>
      <div className="login-container">
        <div className="login-left">
          <spline-viewer
            url={SPLINE_LOGIN_URL}
            style={{ marginRight: '-300px', position: 'absolute' }}
          />
        </div>

        <div className="login-right">
          <Outlet />
          <div className="black" />
        </div>
      </div>
    </section>
  );
}
