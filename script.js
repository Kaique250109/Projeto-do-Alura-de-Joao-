const cards=[
{cat:"HTML",icon:"</>",q:"O que é HTML?",a:"HTML é a linguagem de marcação usada para estruturar o conteúdo de páginas web.",tip:"Pense no HTML como o esqueleto de um site."},
{cat:"HTML",icon:"H",q:"Para que serve a tag <head>?",a:"Ela reúne metadados, o título da página e links para recursos como arquivos CSS.",tip:"O conteúdo do head geralmente não aparece diretamente na página."},
{cat:"HTML",icon:"↗",q:"Qual tag cria um link?",a:"A tag <a>, com o atributo href indicando o destino.",tip:"Exemplo: <a href=\"https://exemplo.com\">Abrir</a>."},
{cat:"CSS",icon:"✳",q:"O que é CSS?",a:"CSS define a aparência da página, incluindo cores, fontes, espaçamentos e layout.",tip:"HTML estrutura; CSS estiliza."},
{cat:"CSS",icon:"🎨",q:"Como mudar a cor de um texto?",a:"Use a propriedade color, como color: blue;.",tip:"background-color muda a cor do fundo."},
{cat:"CSS",icon:"↔",q:"Para que serve o Flexbox?",a:"É um modelo de layout para alinhar e distribuir elementos dentro de um contêiner.",tip:"Ajuda a organizar menus, botões e cartões."},
{cat:"CSS",icon:"▣",q:"O que a propriedade padding faz?",a:"Cria espaço interno entre o conteúdo e a borda de um elemento.",tip:"Margin é espaço externo; padding é interno."},
{cat:"CSS",icon:"⌗",q:"Como selecionar uma classe no CSS?",a:"Use um ponto antes do nome, por exemplo .cartao.",tip:"No HTML: class=\"cartao\"."},
{cat:"Web",icon:"🌐",q:"O que é um navegador?",a:"É um programa que acessa e exibe sites e aplicações da web.",tip:"Chrome, Firefox e Edge são navegadores."},
{cat:"Web",icon:"▱",q:"O que é responsividade?",a:"É a capacidade de um site se adaptar a diferentes tamanhos de tela.",tip:"Media queries ajudam a adaptar o layout para celulares."},
{cat:"JavaScript",icon:"ϟ",q:"Para que serve JavaScript?",a:"Adiciona lógica e interatividade a páginas web.",tip:"Pode responder a cliques e atualizar conteúdos."},
{cat:"Web",icon:"⌘",q:"O que é Git?",a:"É um sistema de controle de versão que registra alterações nos arquivos de um projeto.",tip:"Ajuda a acompanhar o histórico do código."}
];
let shown=[...cards],idx=0,learned=new Set(),favs=new Set(),xp=0,onlyFavs=false,flipped=false;
const $=id=>document.getElementById(id);
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function renderCard(){if(!shown.length){$("studyCount").textContent="—";$("flashCategory").textContent="SEM RESULTADOS";$("flashQuestion").textContent="Nenhum card encontrado";$("flashAnswer").textContent="Tente ver todos os cards ou escolha outra trilha."; $("flashTip").textContent="";$("flashIcon").textContent="⌕";$("flashFavLabel").textContent="";$("studyCard").classList.remove("flipped");return}idx=(idx+shown.length)%shown.length;const c=shown[idx],real=cards.indexOf(c);$("studyCount").textContent=String(idx+1).padStart(2,"0");$("flashCategory").textContent=c.cat+" • FUNDAMENTOS";$("flashQuestion").textContent=c.q;$("flashAnswer").textContent=c.a;$("flashTip").textContent="Dica: "+c.tip;$("flashIcon").textContent=c.icon;$("flashFavLabel").textContent=favs.has(real)?"★ FAVORITADO":"☆ NÃO FAVORITADO";$("studyCard").classList.remove("flipped");flipped=false}
function progress(){const n=learned.size,p=Math.round(n/cards.length*100);$("progressText").textContent=p+"%";$("learnedText").textContent=n+" de "+cards.length+" cards";$("progressLine").style.width=p+"%";$("statLearned").textContent=n;$("statXP").textContent=xp+" XP";$("heroXp").textContent=xp+" XP";$("firstBadge").textContent=n>=2?"✓":"🔒";$("secondBadge").textContent=n>=6?"✓":"🔒";$("thirdBadge").textContent=n>=12?"✓":"🔒"}
function filters(cat=null){shown=cards.filter((c,i)=>(!cat||c.cat===cat)&&(!onlyFavs||favs.has(i)));idx=0;renderCard()}
$("studyCard").addEventListener("click",()=>{if(!shown.length)return;flipped=!flipped;$("studyCard").classList.toggle("flipped",flipped)});
$("backCard").addEventListener("click",()=>{idx--;renderCard()});$("nextCard").addEventListener("click",()=>{idx++;renderCard()});
$("markLearned").addEventListener("click",()=>{if(!shown.length)return;const real=cards.indexOf(shown[idx]);if(!learned.has(real)){learned.add(real);xp+=10;progress();toast("Card aprendido! +10 XP ✦")}else toast("Você já marcou esse card como aprendido.")});
$("toggleFav").addEventListener("click",()=>{if(!shown.length)return;const real=cards.indexOf(shown[idx]);if(favs.has(real))favs.delete(real);else favs.add(real);renderCard();toast(favs.has(real)?"Adicionado aos favoritos":"Removido dos favoritos")});
$("mixCards").addEventListener("click",()=>{shown.sort(()=>Math.random()-.5);idx=0;renderCard();toast("Cards embaralhados!")});
$("showFavs").addEventListener("click",()=>{onlyFavs=!onlyFavs;$("showFavs").textContent=onlyFavs?"★ Favoritos ativos":"☆ Ver favoritos";filters()});
$("clearFilter").addEventListener("click",()=>{onlyFavs=false;$("showFavs").textContent="☆ Ver favoritos";filters();toast("Mostrando todos os cards")});
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{onlyFavs=false;$("showFavs").textContent="☆ Ver favoritos";filters(b.dataset.filter);$("flashcards").scrollIntoView({behavior:"smooth"})}));
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light");$("themeBtn").textContent=document.body.classList.contains("light")?"☾":"☼"});
const qs=[
{topic:"CSS • LAYOUT",q:"Qual propriedade do Flexbox alinha os itens no eixo principal?",a:["align-items","justify-content","flex-direction","display"],ok:1,why:"Isso! justify-content alinha os itens no eixo principal."},
{topic:"CSS • SELETORES",q:"Qual símbolo seleciona uma classe no CSS?",a:["#",".","@","*"],ok:1,why:"Correto! O ponto (.) seleciona classes no CSS."},
{topic:"HTML • FUNDAMENTOS",q:"Qual linguagem organiza a estrutura de uma página web?",a:["CSS","JavaScript","HTML","Git"],ok:2,why:"Isso mesmo! HTML define a estrutura do conteúdo."},
{topic:"FERRAMENTAS • GIT",q:"Qual ferramenta ajuda a controlar as versões do código?",a:["Flexbox","Git","HTML","CSS"],ok:1,why:"Boa! Git registra alterações e permite acompanhar o histórico."}
];let qi=0,answered=false,quizXP=0;
function renderQuiz(){const q=qs[qi];answered=false;$("quizTopic").textContent=q.topic;$("quizStep").textContent=`PERGUNTA ${String(qi+1).padStart(2,"0")} / 04`;$("quizQuestion").textContent=q.q;$("quizAnswers").innerHTML=q.a.map((v,i)=>`<button data-choice="${i}">${String.fromCharCode(65+i)}. ${v}</button>`).join("");$("quizMessage").textContent="";$("quizNext").hidden=true;document.querySelectorAll("#quizAnswers button").forEach(b=>b.addEventListener("click",()=>answer(Number(b.dataset.choice))));document.querySelectorAll(".quiz-dots i").forEach((d,i)=>d.classList.toggle("active",i===qi))}
function answer(choice){if(answered)return;answered=true;const q=qs[qi];document.querySelectorAll("#quizAnswers button").forEach((b,i)=>{b.disabled=true;if(i===q.ok)b.classList.add("correct");if(i===choice&&i!==q.ok)b.classList.add("wrong")});if(choice===q.ok){quizXP+=10;xp+=10;$("quizScore").textContent=quizXP;progress();$("quizMessage").textContent="✓ "+q.why}else $("quizMessage").textContent="Quase! "+q.why;$("quizNext").hidden=false;$("quizNext").textContent=qi===3?"Refazer desafio ↻":"Próxima pergunta →"}
$("quizNext").addEventListener("click",()=>{if(qi===3){qi=0;quizXP=0;$("quizScore").textContent="0"}else qi++;renderQuiz()});
renderCard();renderQuiz();progress();
