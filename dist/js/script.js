document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");

      // Remove os estilos ativos de TODOS os botões
      tabButtons.forEach((btn) => {
        btn.classList.remove("text-blue-600", "border-blue-600", "font-bold");
        btn.classList.add("text-gray-500", "border-transparent", "font-normal");
      });

      // Adiciona os estilos ativos no botão clicado
      button.classList.remove(
        "text-gray-500",
        "border-transparent",
        "font-normal",
      );
      button.classList.add("text-blue-600", "border-blue-600", "font-bold");

      // Esconde todos os painéis de conteúdo
      tabPanels.forEach((panel) => {
        panel.classList.add("hidden");
        panel.classList.remove("block");
      });

      // Exibe apenas o painel correspondente à aba clicada
      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) {
        activePanel.classList.remove("hidden");
        activePanel.classList.add("block");
      }
    });
  });
});

// Variáveis para compartilhamento

let modeloAtual = "X300 Ultra"; // Lembra qual celular está aberto

const descricoesIA = {
  "X300 Ultra":
    "Paisagem rural com montanhas cársticas na China durante o pôr do sol, capturada a partir de uma perspectiva aérea alta. Ao fundo, ergue-se uma vasta cadeia de formações montanhosas cónicas e pontiagudas, típicas da região de Guilin ou Yangshuo.",
  "X300 FE":
    "Esta foto mostra um dos maiores cartões-postais do Brasil: a estátua do Cristo Redentor, localizada no topo do Morro do Corcovado, na cidade do Rio de Janeiro.",
  V70: "Um dos cenários urbanos mais famosos e modernos do Brasil: a Ponte Estaiada Octávio Frias de Oliveira, localizada na cidade de São Paulo. O Rio Pinheiros corta o centro da imagem horizontalmente, com suas águas calmas refletindo o céu e os prédios ao redor.",
};

// Código do Simulador lado a lado

function abrirSimulador(modelo) {
  // Atualiza a variável para o modelo clicado
  modeloAtual = modelo;
  const modal = document.getElementById("simulador-modal");
  const imgAparelho = document.getElementById("img-aparelho-modal");

  // Captura a foto grande da câmara e a miniatura que nomeámos no HTML
  const imgVisor = document.getElementById("img-visor-modal");
  const imgMiniatura = document.getElementById("img-miniatura-modal");

  // Troca as imagens dependendo de qual botão foi clicado
  if (modelo === "X300 Ultra") {
    imgAparelho.src = "./images/jovi-x300-ultra.png";

    // IMAGEM DO X300 ULTRA
    imgVisor.src = "./images/paisagem-china.jpg";
    imgMiniatura.src = "./images/paisagem-china.jpg";
  } else if (modelo === "X300 FE") {
    imgAparelho.src = "./images/jovi-x300fe.png";

    // IMAGEM DO X300 FE
    imgVisor.src = "./images/paisagem-rio-de-janeiro.jpg";
    imgMiniatura.src = "./images/paisagem-rio-de-janeiro.jpg";
  } else if (modelo === "V70") {
    imgAparelho.src = "./images/jovi-v70.png";

    // IMAGEM DO V70
    imgVisor.src = "./images/paisagem-sao-paulo.jpg";
    imgMiniatura.src = "./images/paisagem-sao-paulo.jpg";
  }

  // Mostra o Modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function fecharSimulador() {
  const modal = document.getElementById("simulador-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function tirarFoto() {
  // Efeito de Flash
  const flash = document.getElementById("efeito-flash");
  flash.style.opacity = "1";
  setTimeout(() => {
    flash.style.opacity = "0";
  }, 100);

  // Captura a imagem atual e o texto da I.A
  const imagemAtual = document.getElementById("img-visor-modal").src;
  const textoIA = descricoesIA[modeloAtual];

  // Envia para a Galeria Inteligente
  const galeria = document.getElementById("grid-galeria-inteligente");
  if (galeria) {
    const novaFoto = document.createElement("img");
    novaFoto.src = imagemAtual;
    novaFoto.className =
      "w-full h-64 object-cover rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]";
    galeria.appendChild(novaFoto);
  }

  // Envia para a aba Compartilhamento
  const containerCompartilhamento = document.getElementById(
    "container-compartilhamento",
  );
  if (containerCompartilhamento) {
    const novaLinha = document.createElement("div");
    novaLinha.className =
      "grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full mb-6";

    novaLinha.innerHTML = `
<!-- COLUNA 1: Foto -->
      <div class="relative w-full h-64 md:h-72 rounded-3xl overflow-hidden shadow-md">
        <img src="${imagemAtual}" class="w-full h-full object-cover">
        
        <!-- Botão redondo de partilha nativa -->
        <button onclick="compartilharNativo('${modeloAtual}')" class="absolute bottom-4 right-4 bg-white hover:bg-gray-100 p-2.5 rounded-full shadow-md transition-all cursor-pointer">
          <img src="./images/icone-compartilhar.png" alt="Partilhar" class="w-5 h-5 object-contain">
        </button>
      </div>

      <!-- COLUNA 2: Redes Sociais -->
      <div class="bg-gray-100/70 rounded-3xl p-6 h-64 md:h-72 flex items-center justify-center border border-gray-200/40">
        <div class="grid grid-cols-2 gap-4">
          <!-- Instagram -->
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 hover:scale-105 transition-transform cursor-pointer">
            <img src="./images/icone-instagram.png" alt="Instagram" class="w-full h-full object-contain">
          </a>
          <!-- Facebook -->
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 hover:scale-105 transition-transform cursor-pointer">
            <img src="./images/icone-facebook.png" alt="Facebook" class="w-full h-full object-contain">
          </a>
          <!-- WhatsApp -->
          <a href="https://api.whatsapp.com/send?text=Olha%20esta%20foto%20incr%C3%ADvel%20que%20tirei%20com%20o%20telem%C3%B3vel%20${modeloAtual}!" target="_blank" rel="noopener noreferrer" class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 hover:scale-105 transition-transform cursor-pointer">
            <img src="./images/icone-whatsapp.png" alt="WhatsApp" class="w-full h-full object-contain">
          </a>
          <!-- X (Twitter) -->
          <a href="https://twitter.com/intent/tweet?text=Olha%20esta%20foto%20incr%C3%ADvel%20que%20tirei%20com%20o%20telem%C3%B3vel%20${modeloAtual}!" target="_blank" rel="noopener noreferrer" class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 hover:scale-105 transition-transform cursor-pointer">
            <img src="./images/icone-x.png" alt="X" class="w-full h-full object-contain">
          </a>
        </div>
      </div>


      <!-- COLUNA 3: Descrição IA -->
      <div class="bg-gray-100/70 rounded-3xl p-6 h-64 md:h-72 flex flex-col items-center border border-gray-200/40">
        <!-- Tag superior da IA -->
        <div class="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm text-xs font-semibold text-gray-700 mb-3">
          <div class="w-5 h-5 white rounded-full flex items-center justify-center">
             <img src="./images/icone-lampada.png" alt="IA" class="w-5 h-5 object-contain rounded-md">
          </div>
          <span>Descrição gerada por i.a</span>
        </div>

        <!-- Texto gerado dinamicamente -->
        <div class="w-full bg-white rounded-2xl p-4 border border-gray-200 shadow-sm text-xs text-gray-600 leading-relaxed text-left flex-1 overflow-y-auto">
          ${textoIA}
        </div>
      </div>
    `;

    containerCompartilhamento.appendChild(novaLinha);
  }
}


// Função para o botão nativo de compartilhar

async function compartilharNativo(modelo) {
  // Verifica se o navegador/dispositivo suporta a funcionalidade de partilha nativa
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Foto capturada com o Jovi ${modelo}`,
        text: `Olha esta foto incrível que tirei com a câmara do Jovi ${modelo}!`,
        url: window.location.href // Compartilha o link seu site
      });
    } catch (error) {
      console.log('Partilha cancelada ou falhou.', error);
    }
  } else {
    // Caso o usuário esteja em um navegador antigo ou ambiente sem suporte
    alert(`O seu navegador não suporta a partilha nativa. Partilhe manualmente copiando o link: ${window.location.href}`);
  }
}

// Funções da galeria em tela cheia

function abrirModalImagem(caminhoDaImagem) {
  const modal = document.getElementById('modal-imagem-inteira');
  const imagemAmpliada = document.getElementById('imagem-ampliada');
  
  // Define a origem da imagem igual a foto que foi clicada
  imagemAmpliada.src = caminhoDaImagem;
  
  // Mostra o modal (tela preta)
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function fecharModalImagem() {
  const modal = document.getElementById('modal-imagem-inteira');
  
  // Esconde o modal
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}