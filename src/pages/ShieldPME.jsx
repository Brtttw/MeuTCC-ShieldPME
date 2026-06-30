import { useState, useEffect, useRef } from "react";

import "./ShieldPME.css";

import logosite from "../assets/icons/logosite.png";
import gestao from "../assets/imagens/gestão.png";
import relatorios from "../assets/imagens/relatórios executivos.png";
import cloud from "../assets/imagens/nuvem.png";
import analise from "../assets/imagens/analise.png";
import monitoramento from "../assets/imagens/monitoramento.png";
import IAM from "../assets/imagens/IAM.png";
import LGPD from "../assets/imagens/LGPD.png";
import ataques from "../assets/imagens/ataques.png";
import faltas from "../assets/imagens/faltas.png";
import ferramentas from "../assets/imagens/ferramentas.png";
import visibilidade from "../assets/imagens/visibilidade.png";
import prevenção from "../assets/imagens/prevenção.png";
import continuo from "../assets/imagens/continuo.png";
import respostas from "../assets/imagens/respostas.png";
import crescimento from "../assets/imagens/crescimento.png";
import semequipe from "../assets/imagens/semequipe.png";
import compliance from "../assets/imagens/compliance.png";
import incidente from "../assets/imagens/incidente.png";
import sobre from "../assets/imagens/sobre.jfif";

import DB from "../services/DB";

import Notification from "../components/Notification";
import AuthModal from "../components/AuthModal";
import CheckoutModal from "../components/CheckoutModal";

const fmt = (n) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

const PHRASES = [
  "Proteja o que importa. Com resposta.",
  "Segurança sem complexidade.",
  "Detecte antes dos ataques.",
  "Conformidade que não trava o negócio.",
];

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

const SERVICES = [
  {
    title: "SOC 24/7",
    icon: <img src={monitoramento} alt="SOC 24/7" width={"50px"} height={"50px"} />,
    desc: "Monitoramento 24/7 com resposta a incidentes.",
    tag: "Operação",
  },
  {
    title: "Pentest",
    icon: <img src={analise} alt="Pentest" width={"50px"} height={"50px"} />,
    desc: "Teste de segurança para descobrir vulnerabilidades.",
    tag: "Red Team",
  },
  {
    title: "Gestão IAM",
    icon: <img src={IAM} alt="Gestão IAM" width={"50px"} height={"50px"} />,
    desc: "Controle de acessos com MFA e least privilege.",
    tag: "Identidade",
  },
  {
    title: "Cloud Security",
    icon: <img src={cloud} alt="Cloud Security" width={"50px"} height={"50px"} />,
    desc: "Proteção contínua para AWS/Azure/GCP.",
    tag: "Nuvem",
  },
  {
    title: "LGPD",
    icon: <img src={LGPD} alt="LGPD" width={"50px"} height={"50px"} />,
    desc: "Adequação com evidências para auditoria.",
    tag: "Compliance",
  },
];

const PLANS = [
  {
    name: "Essencial",
    desc: "Para começar com segurança e governança básica.",
    monthly: 597,
    annual: 597 * 12,
    featured: false,
    badge: null,
    features: [
      { text: "Relatórios executivos mensais", active: true },
      { text: "Notificação de alertas", active: true },
      { text: "Orientação inicial de incidentes", active: true },
      { text: "Resposta ativa com SLA", active: false },
      { text: "Integrações SIEM e Webhooks", active: false },
    ],
  },
  {
    name: "Profissional",
    desc: "Monitoramento e resposta com SLA garantido.",
    monthly: 997,
    annual: 997 * 12,
    featured: true,
    badge: "Mais vendido",
    features: [
      { text: "SOC 24/7 com triagem", active: true },
      { text: "Resposta a incidentes (SLA)", active: true },
      { text: "Relatórios técnicos e executivos", active: true },
      { text: "Integrações SIEM", active: true },
      { text: "Webhooks de alertas", active: true },
    ],
  },
  {
    name: "Empresarial",
    desc: "Para times exigentes e ambientes críticos.",
    monthly: 1497,
    annual: 1497 * 12,
    featured: false,
    badge: "Enterprise",
    features: [
      { text: "Tudo do Profissional", active: true },
      { text: "Configurações customizadas", active: true },
      { text: "Onboarding em até 72h", active: true },
      { text: "Relatórios com cadência sob medida", active: true },
      { text: "Suporte prioritário", active: true },
    ],
  },
];

function HomePage({ user, setModal, setAuthTab, setCheckoutPlan, annual, setAnnual, scrollTo, onNav }) {
  void scrollTo;




  const [phraseIdx, setPhraseIdx] = useState(0);

  const [phraseVisible, setPhraseVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhraseVisible(true);
      }, 450);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const openCheckout = (plan) => {
    if (!user) {
      setAuthTab("login");
      setModal("auth");
      return;
    }
    setCheckoutPlan(plan);
    setModal("checkout");
  };

  return (
    <>
      <section id="inicio" className="hero">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-badge">
          <div className="badge-dot" />Segurança Certificada ISO 27001
        </div>
        <h1>
          Sua Empresa Merece<br />
          <span className={`hero-phrase ${phraseVisible ? "fade-in" : "fade-out"}`}>{PHRASES[phraseIdx]}</span>
        </h1>
        <p>A ShieldPME oferece cibersegurança de nível enterprise adaptada para médias empresas — proteção real, sem complexidade desnecessária.</p>
        <div className="hero-btns">

    <button
        className="btn btn-primary btn-lg"
        onClick={() => onNav("como-resolvemos")}
    >
        Como Resolvemos
    </button>

    <button
        className="btn btn-outline btn-lg"
        onClick={() => onNav("para-quem-fazemos")}
    >
        Para quem Fazemos
    </button>

</div>


        <div className="hero-stats">
          {[["500+", "Empresas Protegidas"], ["99.9%", "Uptime Garantido"], ["< 4h", "Tempo de Resposta"], ["0", "Brechas em Clientes"]].map(([v, l]) => (
            <div className="hero-stat" key={l}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="trusted">
        <div className="trusted-inner">
          <span className="trusted-label">Confiado por</span>
          <div className="trusted-logos">
            {["GRUPO ATLAS", "TECHBRASIL", "MANUFACT CO.", "DELTA CORP", "PRIME TECH"].map((n) => (
              <span className="trusted-logo" key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <section id="sobre" style={{ background: "var(--bg2)" }}>
        <div className="about-grid">
          <div>
            <div className="eyebrow">Sobre a ShieldPME</div>
            <h2 className="sec-title">Cibersegurança Feita Para Empresas Como a Sua</h2>
            <p className="sec-sub">a ShieldPME nasceu para democratizar a proteção cibernética para médias empresas brasileiras.</p>
            <div className="about-pillars">
              {[
                { icon: <img src={gestao} alt="Gestão" width={"50px"} height={"50px"} />, title: "Especialistas em PMEs", desc: "Soluções para o orçamento e a realidade de médias empresas, sem overhead corporativo." },
                { icon: "🇧🇷", title: "100% Baseado no Brasil", desc: "Equipe local, dados no país, suporte em português e total conformidade com a LGPD." },
                { icon: <img src={relatorios} alt="Relatórios Executivos" width={"50px"} height={"50px"} />, title: "Relatórios Executivos", desc: "Informações claras e acionáveis para gestores, sem jargões técnicos desnecessários." },
              ].map((p) => (
                <div className="pillar" key={p.title}>
                  <div className="pillar-icon">{p.icon}</div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual"><img src={sobre} alt="Sobre a ShieldPME" width={"600px"} height={"850px"} style={{margin: "0 0px 10px 200px", borderRadius: "20px", borderColor: "white", border: "2px solid"}} /></div>
        </div>
      </section>

      <section id="servicos" style={{ background: "var(--bg)" }}>
        <div className="sec-hdr">
          <div className="eyebrow">O que oferecemos</div>
          <h2 className="sec-title">Serviços de Proteção Completa</h2>
          <p className="sec-sub">Uma stack completa de segurança cibernética, integrada e gerenciada por especialistas.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="planos" style={{ background: "var(--bg2)" }}>
        <div className="sec-hdr">
          <div className="eyebrow">Planos & Preços</div>
          <h2 className="sec-title">Investimento Previsível, Proteção Máxima</h2>
          <p className="sec-sub">Sem taxas ocultas. Cancele quando quiser. Upgrade a qualquer momento.</p>
        </div>
        <div className="plans-toggle">
          <span>Mensal</span>
          <div className={`toggle-switch${annual ? " on" : ""}`} onClick={() => setAnnual((a) => !a)}>
            <div className="toggle-knob" />
          </div>
          <span>Anual <strong style={{ color: "var(--text)" }}>(-20%)</strong></span>
        </div>
        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div className={`plan-card${plan.featured ? " featured" : ""}`} key={plan.name}>
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-desc">{plan.desc}</div>
              <div className="plan-price">
                <span className="currency">R$</span>
                <span className="amount">{(annual ? plan.annual : plan.monthly).toLocaleString("pt-BR")}</span>
                <span className="period">/mês</span>
              </div>
              {annual && (
                <div style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: "-1.2rem", marginBottom: "1.1rem" }}>
                  Cobrado como {fmt(((annual ? plan.annual : plan.monthly) * 12))}/ano
                </div>
              )}
              <ul className="plan-features">
                {plan.features.map((f) => (
                  <li key={f.text} className={f.active ? "active" : ""}>
                    <span className={f.active ? "chk" : "xx"}>{f.active ? "✓" : "✗"}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <button className={`btn btn-lg ${plan.featured ? "btn-primary" : "btn-outline"}`} style={{ width: "100%", justifyContent: "center" }} onClick={() => openCheckout(plan)}>
                {user?.plan === plan.name ? "✅ Plano Ativo" : `Assinar ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" style={{ background: "var(--bg2)" }}>
        <div className="cta-wrap">
          <div className="cta-banner">

          <h2>Pronto para blindar sua empresa?</h2>
          <p>Comece com uma avaliação gratuita de vulnerabilidades. Sem compromisso.</p>
          <div className="cta-btns">
            <button className="btn btn-primary btn-lg" onClick={() => { setAuthTab("register"); setModal("auth"); }}>
              🚀 Teste Gratuito por 14 dias
            </button>
          </div>
        </div>
      </div>
    </section>
    </>

  );
}


function InnerPage({ title, onNav, lead, blocks = [] }) {
  return (
    <div className="inner-page">

      <div className="inner-hero">
        <div className="eyebrow">ShieldPME</div>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      <div className="inner-content wide">
        {blocks.map((b) => (
          <div key={b.title} className="section-block">
            <h2>{b.title}</h2>
            {b.subtitle && <h3>{b.subtitle}</h3>}
            {b.paragraphs?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {b.bullets?.length ? (
              <ul>
                {b.bullets.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <div className="inner-actions">
          <button className="btn btn-outline" onClick={() => onNav("home")}>← Voltar ao início</button>
        </div>
      </div>
    </div>
  );
}

function ComoResolvemosPage({ onNav, scrollTo }) {
  const pilares = [
    {
      icon: <img src={prevenção} alt="Prevenção" width={"100px"} height={"95px"} />,
      titulo: "Prevenção",
      texto:
        "Identificamos vulnerabilidades e fortalecemos seu ambiente antes que elas sejam exploradas."
    },
    {
      icon: <img src={continuo} alt="Monitoramento Contínuo" width={"100px"} height={"95px"} />,
      titulo: "Monitoramento Contínuo",
      texto:
        "Acompanhamos eventos e comportamentos suspeitos em tempo real para detectar ameaças rapidamente."
    },
    {
      icon: <img src={respostas} alt="Resposta Inteligente" width={"100px"} height={"95px"} />,
      titulo: "Resposta Inteligente",
      texto:
        "Quando um incidente acontece, atuamos para conter impactos, orientar sua equipe e acelerar a recuperação."
    }
  ];

  const beneficios = [
    {
      titulo: "Mais Visibilidade",
      texto: "Relatórios claros e indicadores para acompanhar o nível de segurança da empresa."
    },
    {
      titulo: "Menos Prejuízos",
      texto: "Reduza riscos financeiros causados por ataques, indisponibilidade e vazamento de dados."
    },
    {
      titulo: "Mais Tempo",
      texto: "Sua equipe continua focada no negócio enquanto cuidamos da segurança."
    },
    {
      titulo: "Mais Confiança",
      texto: "Fortaleça sua imagem perante clientes, parceiros e auditorias."
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-badge">
          <div className="badge-dot" />
          Nossa Metodologia
        </div>

        <h1>
          Como
          <br />
          <span className="hero-phrase fade-in">
            Resolvemos
          </span>
        </h1>

        <p>
          Não entregamos apenas ferramentas de segurança. Criamos um processo
          contínuo para reduzir riscos, proteger operações e permitir que sua
          empresa cresça com tranquilidade.
        </p>

        <div className="hero-btns">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => scrollTo("planos")}
          >
            Conhecer Planos
          </button>

          <button
            className="btn btn-outline btn-lg"
            onClick={() => onNav("home")}
          >
            Voltar
          </button>
        </div>
      </section>

      <section style={{ background: "var(--bg2)" }}>
        <div className="sec-hdr">
          <div className="eyebrow">
            O desafio
          </div>

          <h2 className="sec-title">
            Segurança não é apenas instalar ferramentas
          </h2>

          <p className="sec-sub">
            Muitas empresas investem em soluções isoladas, mas continuam sem
            visibilidade e sem capacidade de responder rapidamente a incidentes.
          </p>
        </div>

        <div className="plans-grid">
          <div className="plan-card">
            <h3><img src={ataques} alt="Ataques cada vez mais sofisticados" width={"100px"} height={"95px"} /><br /> Ataques cada vez mais sofisticados</h3>
            <p>As ameaças evoluem diariamente.</p>
          </div>

          <div className="plan-card">
            <h3><img src={faltas} alt="Falta de especialistas" width={"100px"} height={"95px"} /><br /> Falta de especialistas</h3>
            <p>Nem toda empresa possui uma equipe dedicada à segurança.</p>
          </div>

          <div className="plan-card">
            <h3><img src={ferramentas} alt="Ferramentas desconectadas" width={"100px"} height={"95px"} /><br /> Ferramentas desconectadas</h3>
            <p>Soluções isoladas dificultam a identificação de riscos.</p>
          </div>

          <div className="plan-card">
            <h3><img src={visibilidade} alt="Pouca visibilidade" width={"100px"} height={"95px"} /><br /> Pouca visibilidade</h3>
            <p>Sem monitoramento constante, incidentes podem passar despercebidos.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="sec-hdr">
          <div className="eyebrow">
            Nossa abordagem
          </div>

          <h2 className="sec-title">
            Três pilares para uma proteção contínua
          </h2>
        </div>

        <div className="services-grid">
          {pilares.map((item) => (
            <div className="service-card" key={item.titulo}>
              <div style={{ fontSize: 55, marginBottom: 20 }}>
                {item.icon}
              </div>

              <h3>{item.titulo}</h3>

              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg2)", paddingBottom: "100px" }}>
        <div className="sec-hdr">
          <div className="eyebrow">
            Resultado
          </div>

          <h2 className="sec-title">
            O que muda para sua empresa
          </h2>
        </div>

        <div className="plans-grid">
          {beneficios.map((item) => (
            <div className="plan-card" key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="cta-wrap" style={{ maxWidth: "1000px" , margin: "-270px 400px -270px" }}>
          <div className="cta-banner">
            <h2>Proteção é um processo contínuo</h2>

            <p>
              Acompanhamos a evolução das ameaças e do seu ambiente para que sua
              empresa esteja sempre preparada para novos desafios.
            </p>

            <div className="cta-btns">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => scrollTo("planos")}
              >
                Conhecer os Planos
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={() => onNav("home")}
              >
                Página Inicial
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
   

function ParaQuemFazemosPage({ onNav, scrollTo }) {

  const perfis = [
    {
      icon: <img src={crescimento} alt="Empresas em Crescimento" width={"100px"} height={"95px"} />,
      titulo: "Empresas em Crescimento",
      texto:
        "Organizações que cresceram rapidamente e precisam estruturar sua segurança."
    },
    {
      icon: <img src={semequipe} alt="Sem Equipe de Segurança" width={"100px"} height={"95px"} />,
      titulo: "Sem Equipe de Segurança",
      texto:
        "Empresas que não possuem um SOC interno e precisam de especialistas dedicados."
    },
    {
      icon: <img src={compliance} alt="Compliance e LGPD" width={"100px"} height={"95px"} />,
      titulo: "Compliance e LGPD",
      texto:
        "Negócios que precisam atender auditorias, clientes corporativos e requisitos regulatórios."
    },
    {
      icon: <img src={incidente} alt="Após um Incidente" width={"100px"} height={"95px"} />,
      titulo: "Após um Incidente",
      texto:
        "Empresas que sofreram ataques e desejam fortalecer sua postura de segurança."
    }
  ];

  const desafios = [
    "Proteger dados críticos",
    "Controlar acessos",
    "Monitorar ameaças continuamente",
    "Responder rapidamente a incidentes",
    "Atender à LGPD",
    "Proteger ambientes em nuvem"
  ];

  const setores = [
    "Indústrias",
    "Saúde",
    "Escritórios",
    "Comércio",
    "Financeiro",
    "Logística",
    "Educação",
    "Empresas Cloud"
  ];

  return (
    <>
      <section className="hero">

        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-badge">
          <div className="badge-dot" />
          Empresas que protegemos
        </div>

        <h1>
          Para Quem
          <br />
          <span className="hero-phrase fade-in">
            Fazemos
          </span>
        </h1>

        <p>
          Independentemente do segmento, ajudamos empresas que dependem da tecnologia para manter suas operações seguras e disponíveis.
        </p>

        <div className="hero-btns">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => scrollTo("planos")}
          >
            Conhecer os Planos
          </button>

          <button
            className="btn btn-outline btn-lg"
            onClick={() => onNav("home")}
          >
            Voltar
          </button>
        </div>

      </section>

      <section style={{ background: "var(--bg2)" }}>

        <div className="sec-hdr">

          <div className="eyebrow">
            Perfil dos Clientes
          </div>

          <h2 className="sec-title">
            Quando a ShieldPME faz sentido
          </h2>

        </div>

        <div className="services-grid">

          {perfis.map((item) => (
            <div className="service-card" key={item.titulo}>

              <div style={{ fontSize: 55, marginBottom: 20 }}>
                {item.icon}
              </div>

              <h3>{item.titulo}</h3>

              <p>{item.texto}</p>

            </div>
          ))}

        </div>

      </section>

      <section style={{ background: "var(--bg)" }}>

        <div className="sec-hdr">

          <div className="eyebrow">
            Desafios
          </div>

          <h2 className="sec-title">
            Problemas que resolvemos diariamente
          </h2>

        </div>

        <div className="plans-grid">

          {desafios.map((item) => (
            <div className="plan-card" key={item}>
              <h3>{item}</h3>
            </div>
          ))}

        </div>

      </section>

      <section style={{ background: "var(--bg2)" }}>

        <div className="sec-hdr">

          <div className="eyebrow">
            Setores Atendidos
          </div>

          <h2 className="sec-title">
            Segurança para diferentes segmentos
          </h2>

        </div>

        <div className="plans-grid">

          {setores.map((item) => (
            <div className="plan-card" key={item}>
              <h3>{item}</h3>
            </div>
          ))}

        </div>

      </section>

      <section style={{ background: "var(--bg)" }}>

        <div className="cta-wrap" style={{ maxWidth: 800, margin: "-170px 400px -160px" }}>

          <div className="cta-banner">

            <h2>
              Se sua empresa depende da tecnologia, ela precisa de proteção contínua.
            </h2>

            <p>
              Nossa equipe atua para reduzir riscos, aumentar a disponibilidade dos serviços e manter sua operação protegida todos os dias.
            </p>

            <div className="cta-btns">

              <button
                className="btn btn-primary btn-lg"
                onClick={() => scrollTo("planos")}
              >
                Conhecer os Planos
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={() => onNav("home")}
              >
                Página Inicial
              </button>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default function ShieldPME() {
  const [page, setPage] = useState("home");
  const [pageParam, setPageParam] = useState(null);
  const [annual, setAnnual] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [authTab, setAuthTab] = useState("login");
  const [user, setUser] = useState(() => DB.getSession());
  const [notif, setNotif] = useState(null);
  const pendingPlanRef = useRef(null);

  const notify = (msg, type = "success") => setNotif({ msg, type });

  const handleLogin = (u) => {
    setUser(u);
    notify(`Bem-vindo, ${u.name?.split(" ")?.[0] || ""}!`);
    if (pendingPlanRef.current) {
      const plan = pendingPlanRef.current;
      pendingPlanRef.current = null;
      setTimeout(() => {
        setCheckoutPlan(plan);
        setModal("checkout");
      }, 300);
    }
  };

  const scrollTo = (id) => {
    setPage("home");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }, 80);
  };


  const navTo = (p, param = null) => {
    setPage(p);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  // eslint-disable-next-line no-unused-vars
  const openCheckout = (plan) => {
    if (!user) {
      pendingPlanRef.current = plan;
      setAuthTab("login");
      setModal("auth");
      return;
    }
    setCheckoutPlan(plan);
    setModal("checkout");
  };

  const NAV_LINKS = [
    { label: "Sobre", action: () => scrollTo("sobre") },
    { label: "Serviços", action: () => scrollTo("servicos") },
    { label: "Planos", action: () => scrollTo("planos") },
  ];


  const FOOTER = {
    Empresa: [
      { label: "Sobre nós", action: () => navTo("sobre-nos") },
      { label: "Time", action: () => navTo("sobre-nos") },
      { label: "Carreiras", action: () => navTo("carreiras") },
      { label: "Blog", action: () => navTo("blog") },
      { label: "Imprensa", action: () => navTo("imprensa") },
    ],
    Serviços: [
      { label: "SOC 24/7", action: () => navTo("servico", "SOC 24/7") },
      { label: "Pentest", action: () => navTo("servico", "Pentest") },
      { label: "Gestão IAM", action: () => navTo("servico", "Gestão IAM") },
      { label: "Cloud Security", action: () => navTo("servico", "Cloud Security") },
      { label: "LGPD", action: () => navTo("servico", "LGPD") },
    ],
    Suporte: [
      { label: "Central de Ajuda", action: () => navTo("ajuda") },
      { label: "Documentação", action: () => navTo("docs") },
      { label: "Status do Sistema", action: () => navTo("status") },
      { label: "Contato", action: () => navTo("contato") },
      { label: "Parceiros", action: () => navTo("parceiros") },
    ],
  };

  const renderPage = () => {
    switch (page) {
      case "sobre-nos":
        return (
          <InnerPage
            title="Sobre nós"
            onNav={navTo}
            lead="A ShieldPME foi criada para tornar a cibersegurança acessível, prática e mensurável para médias empresas."
            blocks={[
              {
                title: "Nossa missão",
                subtitle: "Proteção que cabe na rotina",
                paragraphs: [
                  "Transformar segurança em valor: monitoramento, resposta e governança com foco em reduzir risco sem paralisar o negócio.",
                  "Entregamos evidências e indicadores para que gestores acompanhem o que importa — e tomem decisões com confiança.",
                ],
              },
              {
                title: "O que nos guia",
                subtitle: "Tecnologia + atendimento",
                bullets: [
                  "Resposta rápida com triagem e processo",
                  "Relatórios executivos e técnicos",
                  "Adequação com LGPD e boas práticas",
                  "Integrações para operação contínua",
                ],
              },
            ]}
          />
        );
      case "carreiras":
        return (
          <InnerPage
            title="Carreiras"
            onNav={navTo}
            lead="Procura desafios reais em segurança? Venha construir produtos e operar serviços com impacto."
            blocks={[
              {
                title: "Como trabalhamos",
                subtitle: "Clareza, responsabilidade e aprendizado",
                paragraphs: [
                  "Priorizamos comunicação direta e melhoria contínua. Você terá autonomia para propor soluções e medir resultados.",
                ],
                bullets: [
                  "Cultura de segurança desde o desenvolvimento",
                  "Documentação e revisão por pares",
                  "Processos claros de incidentes e qualidade",
                ],
              },
              {
                title: "Vagas em destaque",
                subtitle: "Exemplos de áreas",
                bullets: [
                  "Analista de SOC (monitoramento e triagem)",
                  "Engenheiro(a) de Segurança (hardening e arquitetura)",
                  "Desenvolvedor(a) (painéis e automações de resposta)",
                  "Especialista de LGPD/Compliance",
                ],
              },
            ]}
          />
        );

      case "blog":
        return (
          <InnerPage
            title="Blog"
            onNav={navTo}
            lead="Conteúdo prático sobre ameaças, conformidade e boas práticas para empresas."
            blocks={[
              {
                title: "Destaques da semana",
                subtitle: "Leitura rápida e aplicável",
                paragraphs: [
                  "Publicamos artigos com foco em entendimento, decisão e execução — sem jargões desnecessários.",
                ],
                bullets: [
                  "Como reduzir superfície de ataque sem atrapalhar o time",
                  "Guia de evidências para auditoria e LGPD",
                  "O que observar em alertas: falsos positivos x risco real",
                ],
              },
              {
                title: "Categorias",
                bullets: [
                  "SOC & Resposta",
                  "Pentest & Vulnerabilidades",
                  "IAM & Acessos",
                  "LGPD & Compliance",
                  "Cloud Security",
                ],
              },
            ]}
          />
        );
      case "imprensa":
        return (
          <InnerPage
            title="Imprensa"
            onNav={navTo}
            lead="Materiais e informações para imprensa, parceiros e comunidade técnica."
            blocks={[
              {
                title: "Press kit",
                subtitle: "Identidade e informações institucionais",
                paragraphs: [
                  "Aqui você encontra descrições da plataforma, posicionamento e dados gerais da ShieldPME.",
                ],
                bullets: [
                  "Sobre a empresa e diferenciais",
                  "Indicadores e cases (quando aplicável)",
                  "Contato para entrevistas e colaborações",
                ],
              },
              {
                title: "Notas e comunicados",
                bullets: [
                  "Atualizações de serviço e recursos",
                  "Eventos e participação em comunidades",
                  "Conquistas de conformidade e certificações",
                ],
              },
            ]}
          />
        );
      case "servico":
        return (
          <InnerPage
            title={`Serviço: ${pageParam}`}
            onNav={navTo}
            lead="Entregas claras, processo bem definido e acompanhamento. Veja o que este serviço cobre."
            blocks={[
              {
                title: "O que você recebe",
                bullets: [
                  "Avaliação e diagnóstico inicial",
                  "Plano de ação com prioridades",
                  "Execução com evidências",
                  "Relatórios e recomendações objetivas",
                ],
              },
              {
                title: "Para quem é",
                subtitle: "Contextos comuns",
                bullets: [
                  "Empresas que precisam reduzir risco rapidamente",
                  "Times sem estrutura interna completa",
                  "Organizações com exigências de compliance",
                ],
              },
              {
                title: "Próximos passos",
                paragraphs: [
                  "Agende um contato para alinharmos seu cenário e definirmos a melhor forma de iniciar.",
                ],
              },
            ]}
          />
        );
      case "ajuda":
        return (
          <InnerPage
            title="Central de Ajuda"
            onNav={navTo}
            lead="Respostas diretas para dúvidas comuns — do primeiro acesso ao acompanhamento de incidentes."
            blocks={[
              {
                title: "Principais dúvidas",
                bullets: [
                  "Como começar um plano e ativar o serviço",
                  "Como funcionam alertas e resposta",
                  "Como interpretar relatórios executivos",
                  "Como proceder em caso de incidente",
                  "Como atualizar dados e usuários",
                ],
              },
              {
                title: "Atendimento",
                subtitle: "Canais e tempo estimado",
                paragraphs: [
                  "Você pode solicitar ajuda na área de contato e orientar a equipe com informações do seu ambiente.",
                ],
              },
            ]}
          />
        );
      case "docs":
        return (
          <InnerPage
            title="Documentação"
            onNav={navTo}
            lead="Referência para integrações, conceitos operacionais e boas práticas."
            blocks={[
              {
                title: "Base de conhecimento",
                bullets: [
                  "Conceitos: alertas, triagem e resposta",
                  "Integrações: webhooks e SIEM",
                  "Guia de evidências e auditoria",
                  "Boas práticas para hardening",
                ],
              },
              {
                title: "Comece por aqui",
                paragraphs: [
                  "Recomendamos iniciar pelo módulo de alertas e relatórios executivos para alinhar expectativas e operação.",
                ],
              },
            ]}
          />
        );
        case "como-resolvemos":
    return (
        <ComoResolvemosPage
            onNav={navTo}
            scrollTo={scrollTo}
        />
    );

case "para-quem-fazemos":
    return (
        <ParaQuemFazemosPage
            onNav={navTo}
            scrollTo={scrollTo}
        />
    );

      case "status":
        return (
          <InnerPage
            title="Status do Sistema"
            onNav={navTo}
            lead="Acompanhe o estado dos serviços. Use este painel como referência operacional."
            blocks={[
              {
                title: "Visão geral",
                subtitle: "Última atualização (exemplo)",
                bullets: [
                  "Plataforma: Operacional",
                  "Notificações: Operacional",
                  "Processamento de alertas: Operacional",
                  "Envio de relatórios: Operacional",
                ],
              },
              {
                title: "Histórico",
                paragraphs: [
                  "Quando houver incidentes, publicaremos comunicados e atualizações para transparência.",
                ],
              },
            ]}
          />
        );
      case "contato":
        return (
          <InnerPage
            title="Contato"
            onNav={navTo}
            lead="Fale com a ShieldPME. Envie sua demanda e responderemos com orientações objetivas."
            blocks={[
              {
                title: "Canais",
                bullets: [
                  "Comercial: solicitações de avaliação",
                  "Suporte: dúvidas e acompanhamento",
                  "Parcerias: integração e co-marketing",
                  "Imprensa: solicitações e entrevistas",
                ],
              },
              {
                title: "O que enviar",
                subtitle: "Para agilizar",
                bullets: [
                  "Nome da empresa e setor",
                  "Tamanho do time/ambiente",
                  "Objetivo inicial (ex.: SOC, pentest, LGPD)",
                  "Se há prazos ou auditoria em andamento",
                ],
              },
            ]}
          />
        );
      case "parceiros":
        return (
          <InnerPage
            title="Parceiros"
            onNav={navTo}
            lead="Junte-se à ShieldPME para levar cibersegurança com processo e evidência a mais empresas."
            blocks={[

              {
                title: "Modelo de parceria",
                subtitle: "Cooperação com qualidade",
                paragraphs: [
                  "Criamos um fluxo de integração com base em entregas e responsabilidades claras, garantindo consistência ao cliente.",
                ],
                bullets: [
                  "Treinamento e alinhamento",
                  "Materiais de apresentação e processo",
                  "Acompanhamento técnico quando necessário",
                ],
              },
              {
                title: "Áreas de interesse",
                bullets: [
                  "Integradores e consultorias",
                  "MSPs e provedores",
                  "Especialistas em compliance",
                  "Comunidades e eventos técnicos",
                ],
              },
            ]}
          />
        );
      case "incidentes":
        return (
          <InnerPage
            title="Resposta a Incidentes"
            onNav={navTo}
            lead="Quando acontece, o tempo importa. Nossa resposta é feita para reduzir impacto e restaurar o operacional com evidências."
            blocks={[
              {
                title: "O que você ganha"
                ,
                bullets: [
                  "Triagem inicial e priorização do que é crítico",
                  "Plano de contenção e erradicação com checklists",
                  "Orientação prática para sua equipe durante o processo",
                  "Relatórios com evidências e lições aprendidas",
                ],
              },
              {
                title: "Como funciona na prática",
                subtitle: "Do alerta à recuperação",
                paragraphs: [
                  "Você recebe orientações claras e acionáveis para conter o risco e recuperar o ambiente com segurança.",
                  "Acompanhamos o ciclo completo para garantir que a recuperação seja consistente, auditável e sem improviso.",
                ],
                bullets: [
                  "1) Avaliação do incidente",
                  "2) Contenção e mitigação",
                  "3) Remediação e validação",
                  "4) Relatório e recomendações",
                ],
              },
              {
                title: "Pré-requisitos",
                subtitle: "Para reduzir tempo de decisão",
                bullets: [
                  "Definição de papéis e contatos (time do cliente)",
                  "Acesso mínimo necessário para investigação",
                  "Critérios de severidade e SLA alinhados",
                  "Base inicial de ativos e contexto do ambiente",
                ],
              },
            ]}
          />
        );
      default:
        return (
          <HomePage
            user={user}

            setModal={setModal}
            setAuthTab={setAuthTab}
            setCheckoutPlan={setCheckoutPlan}
            annual={annual}
            setAnnual={setAnnual}
            scrollTo={scrollTo}
            onNav={navTo}
          />

        );
    }
  };


  return (
    <>

      {notif && <Notification msg={notif.msg} type={notif.type} onClose={() => setNotif(null)} />}

      {modal === "auth" && <AuthModal defaultTab={authTab} onClose={() => setModal(null)} onLogin={handleLogin} />}
      {modal === "checkout" && checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          annual={annual}
          user={user}
          onClose={() => setModal(null)}
          onSuccess={(planName) => {
            setModal(null);
            setUser(DB.getSession());
            notify(`Plano ${planName} ativado! 🎉`);
          }}
          onNeedLogin={() => {
            setModal("auth");
            setAuthTab("login");
          }}
        />
      )}

      <nav className="nav">
        <div className="nav-logo" onClick={() => navTo("home")}>
          <div className="nav-logo-icon"><img src={logosite} alt="ShieldPME Logo" width={"50px"} height={"50px"} /></div>
          Shield<span>PME</span>
        </div>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  l.action();
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          {user ? (
            <>
              <span style={{ fontSize: "0.78rem", color: "var(--muted2)", alignSelf: "center" }}>
                👤 {user.name?.split(" ")?.[0]}
                {user.plan && <span style={{ color: "var(--text)", marginLeft: 6 }}>· {user.plan}</span>}
              </span>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  DB.clearSession();
                  setUser(null);
                  notify("Sessão encerrada.", "error");
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => { setAuthTab("login"); setModal("auth"); }}>
                Entrar
              </button>
              <button className="btn btn-primary" onClick={() => { setAuthTab("register"); setModal("auth"); }}>
                Começar Grátis
              </button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </div>
      </nav>


      {renderPage()}

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ cursor: "pointer" }} onClick={() => navTo("home")}>
              <div className="nav-logo-icon"><img src={logosite} alt="ShieldPME Logo" width={"50px"} height={"50px"} /></div>
              Shield<span style={{ color: "var(--muted2)" }}>PME</span>
            </div>
            <p>Cibersegurança acessível e eficaz para médias empresas brasileiras. Sua proteção é a nossa missão.</p>
          </div>

          {Object.entries(FOOTER).map(([col, links]) => (
            <div className="footer-col" key={col}>
              <h5>{col}</h5>
              <ul>
                {links.map((l) => (
                  <li key={l.label}>
                    <button onClick={l.action}>{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2025 ShieldPME Tecnologia Ltda. · Todos os direitos reservados.</p>
          <div className="footer-certifs">
            {["ISO 27001", "SOC 2", "LGPD"].map((c) => (
              <div key={c} className="certif">{c}</div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

