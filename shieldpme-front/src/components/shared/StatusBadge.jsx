import { rotuloStatus } from '../../utils/rotulos';

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-badge--${String(status).toLowerCase()}`}>{rotuloStatus(status)}</span>;
}
