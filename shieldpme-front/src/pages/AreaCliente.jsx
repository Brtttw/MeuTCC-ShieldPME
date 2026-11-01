import { useState } from 'react';
import PaginaInterna from '../components/shared/PaginaInterna';
import CatalogoServicos from '../components/cliente/CatalogoServicos';
import NovaSolicitacao from '../components/cliente/NovaSolicitacao';
import MinhasSolicitacoes from '../components/cliente/MinhasSolicitacoes';
import MeusRelatorios from '../components/cliente/MeusRelatorios';
import useAsync from '../hooks/useAsync';
import { useAuth } from '../context/AuthContext';
import { obterCatalogo } from '../services/clienteService';

const ABAS = [
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'solicitar', rotulo: 'Nova solicitação' },
  { id: 'solicitacoes', rotulo: 'Minhas solicitações' },
  { id: 'relatorios', rotulo: 'Relatórios' },
];

export default function AreaCliente() {
  const { usuario } = useAuth();
  const catalogo = useAsync(obterCatalogo, []);
  const [aba, setAba] = useState('servicos');
  const [servicoInicial, setServicoInicial] = useState(null);
  const [solicitacaoAberta, setSolicitacaoAberta] = useState(null);
  const [versao, setVersao] = useState(0); // força recarregar listas após criar uma solicitação

  function solicitar(servicoId) {
    setServicoInicial(servicoId);
    setAba('solicitar');
  }

  function aposCriar(id) {
    setSolicitacaoAberta(id);
    setVersao((v) => v + 1);
    setAba('solicitacoes');
  }

  return (
    <PaginaInterna
      titulo="Área do cliente"
      introducao={`${usuario.companyName ?? usuario.email} — solicite serviços, acompanhe o andamento e acesse seus relatórios.`}
    >
      <div className="area-abas" role="tablist">
        {ABAS.map(({ id, rotulo }) => (
          <div
            key={id}
            role="tab"
            tabIndex={0}
            aria-selected={aba === id}
            className={`area-aba${aba === id ? ' area-aba--ativa' : ''}`}
            onClick={() => setAba(id)}
            onKeyDown={(e) => e.key === 'Enter' && setAba(id)}
          >
            {rotulo}
          </div>
        ))}
      </div>

      {aba === 'servicos' && <CatalogoServicos catalogo={catalogo} aoSolicitar={solicitar} />}
      {aba === 'solicitar' && <NovaSolicitacao catalogo={catalogo} servicoInicial={servicoInicial} aoCriar={aposCriar} />}
      {aba === 'solicitacoes' && <MinhasSolicitacoes selecionadaInicial={solicitacaoAberta} versao={versao} />}
      {aba === 'relatorios' && <MeusRelatorios versao={versao} />}
    </PaginaInterna>
  );
}
