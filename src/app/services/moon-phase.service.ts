import { Injectable } from '@angular/core';
import { Moon } from 'lunarphase-js';
import * as SunCalc from 'suncalc';

export interface Dedication {
    deity: string;
    description: string;
    suggestions?: string;
}

@Injectable({
    providedIn: 'root'
})
export class MoonPhaseService {

    private userCoords = { lat: -15.7801, lng: -47.9292 }; // Default: Brasilia (approx)

    constructor() { }

    requestUserLocation() {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('User location obtained:', this.userCoords);
                },
                (error) => {
                    console.warn('Geolocation denied or unavailable, using fallback:', error);
                }
            );
        }
    }

    getDedication(day: number, monthLength: number, monthName: string, gregorianDate?: Date): Dedication | null {
        // Solar Holidays (Gregorian Check)
        // ... kept for future compatibility, but Anthesphoria is moved to Attic date

        // Krónia - 12 de Hekatombaion
        if (day === 12 && monthName === 'Hekatombaion') {
            return {
                deity: 'Krónia',
                description: 'O Kronia é um festival cretense em honra de Cronos como o deus da colheita de grãos, que é representado com um gancho de ceifar. Neste dia, uma ceia com a safra celebra o final da colheita. Mais claramente, esta é uma celebração da Era de Ouro regida por Cronos e Réia, quando não havia trabalho laborioso nem opressão. Uma vez que essa era se deu antes de Zeus trazer ordem ao mundo, o Kronia é um festival caótico. Em tempos antigos, era permitido aos escravos correrem desordenadamente pelas ruas e serem convidados por seus senhores a suntuosos banquetes. Durante o Kronia, nós temos a permissão de um retorno temporário à Era de Ouro, à igualdade, à luxúria, ao ócio e à liberdade irrestrita. Antigamente, vestia-se um manto de linho branco e um amuleto de osso de porco com Zeus segurando uma foice. O cedro era associado ao sangue de Kronos.',
                suggestions: 'Celebre a liberdade e a igualdade (Era de Ouro). Faça um banquete onde todos são iguais. Use roupas de linho branco. Ofertas de grãos, frutas da colheita e libações a Cronos e Réia.'
            };
        }

        // Panathenaia - 25 de Hekatombaion
        if (day === 25 && monthName === 'Hekatombaion') {
            return {
                deity: 'Panathenaia',
                description: 'A Panathenaia é, de fato, a celebração do nascimento de Atena, de acordo com a tradição que diz que foi no dia 28 de Hekatombaion que Ela irrompeu da cabeça de Zeus (representado no frontão triangular do lado leste do Parthenon). Embora seja o dia dela, todos os Olimpianos atendem às festividades (como vemos no friso leste), porque todos eles estavam presentes no nascimento dEla. Esta é uma festa sagrada, na qual os deuses e mortais celebram juntos o nascimento de Atena. O dia anterior à procissão Panathenaica é chamado de Pannykhis/Ponnykhis (Vigília de Noite-Inteira, com corridas de tochas, danças de virgens e jogos juvenis; um aspecto comum dos festivais gregos, uma vez que eles começam ao pôr-do-sol). Ao nascer do sol, o fogo sagrado é tirado do altar de Eros na Academia, onde um sacrifício foi feito a Eros e Atena (na Academia também há um altar a Prometeu, que trouxe o fogo aos mortais), e uma corrida de tocha leva o fogo para o altar de Atena. A cada quatro anos, a Panathenaia Maior é feita, para a qual um novo peplos (manto) é tecido para a Deusa (Seu presente de aniversário). Em sua faixa central de painéis se apresenta a Gigantomaquia, a batalha dos Gigantes contra os Olimpianos (representada nas métopas leste do Parthenon), que simboliza o triunfo da civilização sobre a selvageria. A procissão traz o peplos até a cidade, pendurado como uma vela no mastro de um navio com timão, o qual é pilotado por sacerdotes e sacerdotisas adornados com guirlandas coloridas. Epheboi (jovens rapazes) montados podem acompanhar a procissão. O navio é deixado na entrada dos precintos sagrados e o manto é carregado pelo resto do caminho sozinho ou no mastro. Na cabeça da procissão Panathenaica estão as Kanephoroi, as garotas enfeitadas de ouro, que carregam as Kana, as sagradas cestas de oferendas, as quais são dadas aos mestres-de-cerimônias no altar. As Kana contém a cevada que é atirada sobre o sacrifício e que cobre os implementos sacrificiais escondidos nas Kana. Depois vêm as Ergastinai (Trabalhadoras), que teceram o novo peplos, e outras garotas trazem tigelas e jarros (cântaros/moringas), incensários e implementos adicionais do ritual. Em tempos antigos, a procissão se dividia em duas filas. A fila do norte trazia uma vaca para Atena Polias, a guardião da cidade na Era do Bronze, e uma ovelha para Pandrosos (uma das filhas de Kekrops). Elas eram sacrificadas no altar do Velho Templo, o qual as deusas compartilhavam, e a carne assada era comida pelos sacerdotes e funcionários públicos. Esse rito de local fechado é mais velho que o sacrifício ao ar livre, o qual era destinado à fila do sul, que trazia gado para Atena Parthenos, a padroeira da democracia, até o Grande Altar, fora do Parthenon, onde a carne assada era dada ao público. Na procissão mais sagrada do norte, o(s) vitorioso(s) da corrida de tocha (um vitorioso na Panathenaia Menor, e todos os quatro na Maior) devem trazer água para o sacricífio nos hydria (jarros d’água) que eles ganharam nas corridas; eles serviam como Hydriaphoroi (Carregadores de Água). Eles são seguidos por músicos, tanto tocadores de lira (Kitharodoi) quanto flautistas (Auletes), uma vez que a música normalmente acompanha os sacrifícios. Os músicos eram elegantemente vestidos, por exemplo, em khiton (túnica) com mangas, um peplos (manto) e uma himation (capa), como vemos no friso norte do Parthenon (nas placas VII e VIII). Em ambas as filas há os Skaphephoroi (Carregadores de Bandeja), jovens homens vestidos em becas púrpuras, que carregam em seus ombros bandejas de bronze ou prata com bolos/tortas e favos de mel. (Eles seguiam os vencedores da tocha na procissão do norte e o gado na procissão do sul.) Depois dos Carregadores de Bandeja, vinham na procissão os Thallophoroi (Carregadores de Ramos), Idosos bem-aparentados, que carregavam galhos das árvores sagradas de oliveira, e os outros celebrantes. Os Não-Helenos (nãogregos) carregavam ramos de carvalho. O número 4 organiza a procissão: quatro Hydriaphoroi, quatro Kitharodoi, quatro Auletes, quatro ovelhas e quatro vacas. O peplos é retirado do mastro, se necessário, e dobrado por um jovem garoto ou garota e um sacerdote (o Arkhon Basileus), que o dará para a sacerdotisa de Atena Polias. A garota pode ser uma das Arrhephoroi (veja o festival da Arrephoria no mês de Skirophorion), que eram as filhas rituais do Arkhon; o garoto, que é seu filho ritual, pode ser o rapaz encarregado de alimentar a Cobra Sagrada. Eles correspondem às três filhas e o filho de Kekrops, o homem-serpente que foi o primeiro rei de Atenas e um grande benfeitor das pessoas. Crianças participam de muitas outras formas; algumas carregam accerai (do latim, caixas de incenso) para preencher os thymiateria (incensários). Elas também carregam pequenas e sagradas mesas e cadeiras, que são arrumadas para entreter as deusas ctônicas (da terra) aliadas com Atena: Pandrosos (Toda Orvalhada) e Ge Kourotrophos (Mãe Terra Cuidadora, a padroeira das enfermeiras). Ge Kourotrophos tem a cadeira maior, uma vez que Ela é mais importante que Pandrosos, pois Ge recebe a prothyma (primeira oferenda) de todos os sacrifícios atenienses, talvez cevada do Kanoun (cesto sagrado) ou bolos de mel trazidos pelos Carregadores de Bandeja (ambas oferendas típicas a deidades ctônicas). A cidade é especialmente agradecida a Ela pelas lindas crianças e jovens mulheres, que caminham juntas na procissão. O trigésimo Hino Homérico agradece a Mãe Terra pelas condições bem-ordenadas da beleza das mulheres; onde seus filhos exultam com alegria e jovial folia; suas filhas tocam em danças de espalhar flores, com o coração feliz, e saltando sobre campos em flor. “Assim dadas a Ti, Sagrada e Rica Divindade”. Note que, como as vítimas do sacrifício, que devem ser livres de máculas, pessoas bem-aparentadas e distintas (hoi kaloi k’agathoi) são proeminentes na procissão - a Deusa é honrada com o melhor que a cidade tem a oferecer. O novo peplos é colocado nos joelhos de Atena como um presente, e é mais tarde armazenado com os tesouros; ela não ‘troca de roupa’ desta vez, isso é feito no festival da Plynteria. Sacrifícios são também feitos para Atena Hygieia (Deusa da Saúde) e Nikê (da Vitória). Na Panathenaia Maior, os três ou quatro dias seguintes à procissão são ocupados por Agones (competições) esportivas (corridas, boxe e luta-livre) e artísticas (música, poesia). Traditionalmente o prêmio para os atletas é uma ânfora Panathenaica contendo óleo de oliva do bosque sagrado da deusa; e o prêmio para os artistas é uma coroa dourada de olivas silvestres, e às vezes dinheiro. Podem haver competições para as crianças, nas quais elas são premiadas com coroas planas de oliveira. Dez funcionários públicos chamados de Hieropoioi (Administradores dos Ritos) organizam a Panathenaia Menor; os dez Agonothetai (Diretores das Competições) administram a Maior.',
                suggestions: 'Honre Atena com preces e hinos (Hino Homérico 28). Oferte azeite de oliva, bolos, figos e mel. Acenda velas ou tochas em homenagem ao fogo sagrado. Realize atividades artísticas ou físicas em honra à Deusa.'
            };
        }

        // Metageitnion Festivals
        if (monthName === 'Metageitnion') {
            const basicOfferings = 'Libações, Hinos e Oferendas Básicas:\nHonre os Deuses com libações de vinho misturado com água. Recite hinos (Hino Órfico ou Homérico) apropriados para a divindade celebrada. Oferendas tradicionais incluem incenso, grãos de cevada, bolos de mel e frutas da estação.';

            // Eleusínia & Erchia Sacrifices - 16
            if (day === 16) {
                return {
                    deity: 'Eleusínia & Sacrifícios em Erchia',
                    description: 'Festival de ação de graças e sacrifícios em honra a Deméter, na época da colheita dos grãos. Não tinha relação com os mistérios de Elêusis (apesar da semelhança dos nomes). O festival, realizado a cada dois anos, incluía jogos e concursos (anos pares: 2026, 2028...).\n\nTambém neste dia, sacrifícios são oferecidos a Kourotrophos, Hécate e Ártemis no demo de Erchia.',
                    suggestions: basicOfferings
                };
            }

            // Sacrifice to The Heroines - 19
            if (day === 19) {
                return {
                    deity: 'Sacrifício às Heroínas (Erchia)',
                    description: 'Sacrifício às Heroínas realizado no demo ático de Erchia.',
                    suggestions: basicOfferings
                };
            }

            // Sacrifice to Hera Thelchina - 20
            if (day === 20) {
                return {
                    deity: 'Sacrifício a Hera Thelchina (Erchia)',
                    description: 'Sacrifício a Hera Thelchina realizado no demo de Erchia.',
                    suggestions: basicOfferings
                };
            }

            // Sacrifice to Zeus Epoptes - 25
            if (day === 25) {
                return {
                    deity: 'Sacrifício a Zeus Epoptes (Erchia)',
                    description: 'Sacrifício a Zeus Epoptes (Aquele que Observa) realizado no demo de Erchia.',
                    suggestions: basicOfferings
                };
            }
        }



        // Boedromion Festivals
        if (monthName === 'Boedromion') {
            const basicOfferings = 'Libações, Hinos e Oferendas Básicas:\nHonre os Deuses com libações de vinho misturado com água. Recite hinos (Hino Órfico ou Homérico) apropriados para a divindade celebrada. Oferendas tradicionais incluem incenso, grãos de cevada, bolos de mel e frutas da estação.';

            // Niketéria - 2
            if (day === 2) {
                return {
                    deity: 'Niketéria',
                    description: 'Festival em honra de Niké, deusa da vitória. Este dia comemora a vitoria de Atena sobre Poseidon para virar a patrona da cidade.',
                    suggestions: basicOfferings
                };
            }

            // Genésios - 5
            if (day === 5) {
                return {
                    deity: 'Genésios',
                    description: 'Festival Ateniense público em honra dos mortos. As famílias honram particularmente seus mortos nos seus aniversários de falecimento. Há lamentações e discursos de louvor. Nos tempos antigos, a aproximação do equinócio de outono marcava o fim do tempo das campanhas de verão, então muitos desses festivais estão relacionados ao fim das lutas.\n\n"And may they worship forever the gods who possess the land with native honors of laurel bough held aloft, and oxen slain, even as their fathers did before their time.\nSince reverence for parents stand written third among the statues of Justice, to whom honor supreme is due."\n— Aischylos, Suppliant Maidens (703-8)',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nHonre os ankhu com libações de água, leite ou mel. É interessante oferecer flores no cemitério, mas caso não tenha acesso, pode oferecer em um altar. Oferendas tradicionais incluem incenso, grãos de cevada, bolos de mel e frutas da estação. Para os ankhu, não consuma as oferendas.'
                };
            }

            // Boedromia - 7
            if (day === 7) {
                return {
                    deity: 'Boedromia',
                    description: 'Este festival é uma ação de graças menor, para Apolo (uma vez que o dia 7 é seu aniversário), em gratidão a ele como um resgatador na guerra. O Boedromia é dedicado a Apolo Boedromios ("o que ajuda na aflição", "o que corre para ajudar alguém") era um festival de conotação militar, agradecendo sua intervenção nas guerras. Ele poderia ser a comemoração de um evento como a ajuda trazida a Teseu na batalha contra as amazonas ou como o auxílio dado ao rei Erecteus durante seu embate contra Eumolpus. Neste dia também se faziam sacrifícios a Artemis Agrotera. Artemis Argotera tinha um templo no século V AEC, com uma estátua carregando um arco. Durante o Boedromia, uma procissão armada ia ao templo fazer sacrifícios em honra da vitória na Batalha de Maratona. (Era um \'sacrifício matador\' [sphagion] de 600 cabras, para Artemis Agrotera.) O templo foi destruído em 1778, quando os otomanos que ocupavam Atenas demoliram antigos locais para ter material para construir uma muralha em torno da cidade.',
                    suggestions: basicOfferings
                };
            }

            // Demokratía - 12
            if (day === 12) {
                return {
                    deity: 'Demokratía',
                    description: 'Festival no qual os atenienses celebravam a democracia, o governo constitucional, e a justiça sob a lei. Eram honrados Zeus Agoraios, Atena Agoraia e a deusa Têmis. O estabelecimento da democracia em Atenas era visto como um presente divino dessas três deidades. Têmis é a deusa da lei divina, as primeiras leis não escritas que governavam a conduta humana e que foram estabelecidas primeiro pelos deuses celestes. Acredita-se que ela elaborou esses editos à humanidade através do oráculo de Delfos, o qual ela presidia com Apolo. Este é um dia para agradecer a liberdade política e os direitos que temos hoje.',
                    suggestions: basicOfferings
                };
            }

            // Eleusinian Mysteries - 15 a 21
            if (day >= 15 && day <= 21) {
                let suggestions = '';
                if (day === 15) {
                    suggestions = 'Dia de Agyrmos (Reunião). Comece o festival com rituais de purificação. Tome um banho de mar ou um banho de sal grosso para limpar as impurezas (Halade Mystai).';
                } else if (day >= 16 && day <= 19) {
                    suggestions = 'Dias de procissão e preparação. Prepare o Kykeon (bebida de cevada, água e hortelã). Realize jejuns parciais. Medite sobre a jornada de Deméter em busca de Perséfone. Oferendas sugeridas: bolos, papoulas, romãs, figos, funcho e hera.';
                } else if (day === 20) {
                    suggestions = 'O auge dos Mistérios. Quebre o jejum bebendo o Kykeon. Leia o Hino Homérico 2 a Deméter.';
                } else {
                    suggestions = 'Plemokhoi (Rito Final). Faça libações de água, vinho ou kykeon. Verta uma para o Leste e outra para o Oeste gritando "Hye! Kye!" (Chova! Conceba!) para abençoar a terra e a vida.';
                }

                return {
                    deity: 'Grandes Mistérios de Elêusis',
                    description: 'Os Grandes Mistérios de Elêusis (Eleusinia ta Megala), honrando Deméter e sua filha Perséfone, eram o mais popular dos cultos de mistério. Duravam uma semana e ocorriam em Elêusis. Todos os iniciados juravam segredo, mas sabemos que o rito envolvia uma jornada da escuridão para a luz.\n\nO primeiro dia envolvia banhar-se no mar, possivelmente com um leitão sacrificial para purificação. Nos dias seguintes, ocorriam sacrifícios, a preparação do <span class="interactive-link" data-action="toggle-kykeon">kykeon</span> e a procissão de Atenas a Elêusis. Ao chegar, a senha era: "I have fasted, drunk the kykeon, taken things out of the big basket and, after performing a rite, put them in the little basket, whence I put them back in the big basket".\n\nNo Telesterion, ocorria o mistério real, possivelmente envolvendo a revelação de itens sagrados (espiga de trigo, falos) e uma visão de Perséfone em luz cegante. O festival encerrava-se com o rito das Plemokhoi: duas vasilhas eram viradas, uma para o Leste e outra para o Oeste, enquanto se clamava "Hye! Kye!" (Chova! Conceba!), esse era o ritual final. A participação garantia aos iniciados uma pós-vida abençoada ("três vezes felizes").',
                    suggestions: suggestions
                };
            }

            // Sacrifice at Erchia - 27
            if (day === 27) {
                return {
                    deity: 'Sacrifício em Erchia (Ninfas, Aqueloo, Alochus, Hermes, Gaia)',
                    description: 'Sacrifício às Ninfas, Aqueloo, Alochus, Hermes e Gaia realizado no demo de Erchia.',
                    suggestions: basicOfferings
                };
            }
        }

        // Pyanepsion Festivals
        if (monthName === 'Pyanepsion' || monthName === 'Puanepsion') {
            // Proerosía - 6
            if (day === 6) {
                return {
                    deity: 'Proerosía',
                    description: 'Festival para obter as bênçãos de Deméter na preparação para o arado e semeadura na estação agrícola (proerosia = coisas antes do tempo de cultivo); em tempos antigos isso era feito nos Elêusis. Este festival imediatamente precede a Pyanépsia. Seu oráculo disse aos Atenienses para iniciar a Proerosia a fim de levar a fome mundial ao seu fim. Sob o comando de Hierophantes, o Arauto Sagrado proclama a Proerosia, reconta o mito de sua fundação, e chama pela oferta dos primeiros frutos.',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nFaça libações de mel e água para Deméter. Oferendas apropriadas incluem os primeiros frutos da colheita (especialmente cereais como cevada e trigo) e bolos de mel. É um momento para pedir bênçãos para o plantio.'
                };
            }

            // Pyanépsia - 7
            if (day === 7) {
                return {
                    deity: 'Pyanépsia',
                    description: 'O Pyanépsia é um festival dos recentes frutos colhidos no outono que recorre às bênçãos divinas para a semeadura no mesmo outono. Esse festival muito antigo honra Phoebos Apolo como deus sol, Hélio e as Horas. Os atenienses consideravam-se descendentes do Sol e de Ge (Terra). Apolo é celebrado no 7º dia de cada mês. Na procissão, a Eiresione (ramo de louro decorado com lã, frutas, e modelos de pães e copos) é carregada. As crianças levam a Eiresione de casa em casa cantando por presentes. O festival deriva seu nome do cozido de feijões (pyanon epsein) e outros vegetais (Panspermia) que é dividido com o Deus. Diz-se que Teseu oferendou isso a Apolo ao retornar de Creta.',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nPrepare um cozido de feijões e grãos (Panspermia) para compartilhar e ofertar a Apolo. Se possível, faça uma Eiresione (ramo de louro ou oliveira decorado com lã e frutos) e pendure acima da sua porta para abençoar a casa. Libações de vinho e azeite são apropriadas.'
                };
            }

            // Oskhophoria - 8
            if (day === 8) {
                return {
                    deity: 'Oskhophoria',
                    description: 'A Oskhophoria é uma cerimônia realizada no mesmo dia que a Pyanépsia (ou dia 8) honrando Dionísio e Atena Skira, que protegem a colheita da uva. A celebração consistia principalmente de uma procissão de um templo de Dionísio até o templo de Atena Skiras. Dois jovens vestidos como mulheres carregavam ramos de videira com cachos de uvas (oskhoi). O arauto da procissão não usava uma guirlanda na cabeça, mas no seu bastão, relembrando o mito de Teseu e a morte de Egeu. Como um festival em honra a Dionísio, lembra também o abandono de Ariadne por Teseu.',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nHonre Dionísio e Atena Skira. Oferendas de uvas, ramos de videira e vinho são essenciais. Como não há procissão, faça libações e oferendas a Dionísio durante sua refeição festiva. Feijões (comida dos mortos) também eram servidos neste dia em conexão com o luto de Teseu.'
                };
            }

            // Sténia - 9
            if (day === 9) {
                return {
                    deity: 'Sténia',
                    description: 'A Sténia é um festival noturno de mulheres para Deméter e Perséfone, precedendo a Thesmophoria. As mulheres se envolvem numa Aiskhrologia (linguagem chula, insultos) para comemorar como Iambe fez a ofendida Deméter rir. Também está relacionado aos "Thesmoi" (símbolos de fertilidade como massas em forma de cobras e falos, e leitões) colocados nas cavernas do santuário de Deméter para fertilizar o solo.',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nPara as mulheres, é um momento de reunião e "Aiskhrologia" (piadas e insultos jocosos) para honrar Deméter. Oferendas de incenso, bolos de mel e símbolos de fertilidade são adequados. Honre Deméter e Perséfone.'
                };
            }

            // Thesmophoria - 11, 12 e 13
            if (day >= 11 && day <= 13) {
                let description = 'A Thesmophoria era um festival pan-helênico que, em Atenas, durava três dias (11, 12 e 13) durante o plantio de outono. Mulheres casadas subiam ao Thesmophorion e acampavam longe dos homens durante esse feriado. O festival incluía abstenção sexual e de certos alimentos, aqueles relacionados a Deméter, como a romã, pois os mesmos eram vistos como oferendas para deuses ctônicos. "Hades secretamente deu [a Perséfone] sementes doces de romã para comer, cuidando para que ela não permanecesse continuamente com a grave Deméter de manto escuro" (Hino Homérico 2, linhas 372-374).\n\nO rito relembra o luto de Deméter por Perséfone. As mulheres sentavam-se no chão em galhos, imitando o modo de vida antigo, antes da civilização. Elas ficavam em jejum, pois Deméter nada comeu enquanto sofria por sua filha. O luto encerrava-se com aischrologia (linguagem obscena/zombeteira) para fazer as mulheres rirem, imitando Iambe que alegrou Deméter.\n\nO aspecto mais peculiar envolvia o sacrifício de leitões que, possivelmente, haviam sido jogados em cavernas meses antes (na Skirophoria). Esses restos ("thesmoi") eram colocados em altares e depois misturados à terra para garantir uma boa colheita. Leitões eram associados à genitália feminina, e os órgãos de ambos, homens e mulheres, eram associados com fertilidade do plantio.';

                let suggestions = '';
                if (day === 11) {
                    suggestions = 'Inicie o festival com jejum e abstenção sexual neste primeiro dia. Prepare-se mental e espiritualmente para os ritos dos dias seguintes.';
                } else if (day === 12) {
                    suggestions = 'Mantenha a abstenção sexual. Realize oferendas (exceto romãs) e entoe hinos a Deméter e Perséfone. É um momento de devoção intensa.';
                } else {
                    suggestions = 'Finalize o feriado mantendo a pureza ritual. Peça por abundância e fertilidade para a terra e a vida, celebrando a bênção da colheita assegurada.';
                }

                return {
                    deity: 'Thesmophoria',
                    description: description,
                    suggestions: suggestions
                };
            }

            // Khalkeía - 30
            if (day === 30) {
                return {
                    deity: 'Khalkeía',
                    description: 'A Khalkeía (Χαλχεία) é um festival para os artesãos, especialmente ferreiros e oleiros, honrando Hefesto e Atena Ergane (A Trabalhadora). Neste dia, as Ergastinai (Trabalhadoras) e Sacerdotisas colocam a lã no tear para começar a tecer o novo Peplos que será presenteado a Atena na Panateneia, nove meses depois. É um dia para celebrar o trabalho manual e a criatividade técnica.',
                    suggestions: 'Libações, Hinos e Oferendas Básicas:\nHonre Atena Ergane e Hefesto. Se você é artesão ou trabalha com criação, limpe e consagre suas ferramentas. Comece um novo projeto criativo ou dedique seu trabalho aos deuses. Libações de vinho e incenso são apropriadas.'
                };
            }
        }


        // Anthesphoria - Boedromion 10
        if (day === 10 && monthName === 'Boedromion') {
            return {
                deity: 'Anthesphoria',
                description: 'Festival das Flores que celebra o retorno da Primavera e de Perséfone do submundo. É o Equinócio de Primavera. Decore a casa e espaços sagrados com flores, faça uma limpeza de primavera (Spring Cleaning) para destralhar e livrar-se do desnecessário. É um tempo de renovar os escudos e proteções da casa.',
                suggestions: 'Limpeza profunda da casa (física e energética), abrir janelas, trazer flores (vasos, buquês, pétalas) para dentro. Renovar proteções. Jardinagem e início de plantio. Artesanatos florais (coroas de flores) ou com ovos. Preces focadas em crescimento e novos inícios. Recite o Hino Homérico 13 a Deméter e o Hino Órfico 29 a Perséfone.'
            };
        }

        /* 
        if (gregorianDate) {
            // Previous Gregorian Logic Removed/Commented
        }
        */

        // Last Day (Deipnon)
        if (day === monthLength) {
            return {
                deity: `O ${day}º dia é dedicado a Hécate (Deipnon)`,
                description: 'O Deipnon (Jantar/Ceia) de Hécate acontece na noite mais escura, honrando a "Portadora da Luz" com uma doação de comida nas encruzilhadas. É um tempo de purificação de si e do lar.\n\nAs ofertas mais comuns neste dia são pão, queijo, figos, azeitonas, carne, ovos, alho, alho-poró. Você também pode varrer sua casa, ofertar as coisas que não quer que continuem no mês que vai entrar, limpar o refrigerador, arrumar a despensa, pagar as dívidas, se entender com quem você está brigado, e tudo o mais que sirva para "virar a página" antes do próximo mês helênico.\n\nSe você tiver um Kathiskos em honra a Zeus Ktesios, essa é a hora de desfazer-se do conteúdo para (re)preenchê-lo com um novo.',
                suggestions: 'Sugestão de Rito:\n\nLimpe o altar. Isso pode ser feito mais cedo no mesmo dia ou imediatamente antes do ritual. Se quiser, junte as sobras de libações anteriores, restos de vela, e até poeira, para jogar no fogo - simbolizando o mês que terminou. Por exemplo: se você libou vinho e sobrou um pouco daquela garrafa, ou se ofertou cevada e sobrou uma porção no pote, essas coisas podem ser oferecidas a Hécate para limpar o mês inteiramente, seja queimando-as ou servindo-as no deipnon/jantar.\n\nVocê vai precisar de um prato de ofertas, uma taça de libação, um queimador de incenso, incenso, vela, líquido para libar (de preferência vinho ou mel), uma imagem de Hécate (se não tiver estátua, pode ser uma figura impressa), e - claro - a ceia de Hécate. A ceia tradicionalmente consistia de um pão doce ou bolo, peixe, alho, ovos e queijo; mas, se você não tiver tudo isso, pode oferecer algumas dessas coisas ou mesmo outras que sentir apropriadas. Azeitonas pretas costumam ser percebidas como uma boa oferta nos dias de hoje. Separe tudo antes do rito.\n\nComece no mínimo lavando as mãos - o ideal é tomar banho e usar roupas limpas. Se tiver khernips (água lustral), purifique as mãos nela. Aproxime-se do altar, acenda a vela e consagre-a a Héstia. Faça um momento de silêncio, depois leia o Hino Órfico a Hécate e/ou a passagem da Teogonia de Hesíodo que fala dela. Há também um hino nos Papiros Mágicos Gregos que podemos adaptar para este ritual. Se tiver algo para queimar, coloque no carvão ou no fogo primeiro. Depois coloque ou acenda o incenso. Verta a libação na taça. E apresente a ceia. Você pode dizer algo tipo: "Hécate, eu te ofereço este incenso, este vinho/mel, este (cite os itens da ceia)... Olhe com gentileza para estas ofertas e aceite-as com o coração alegre". Se estiver fazendo só o deipnon, o rito pode terminar aqui.\n\nSe já quiser começar a purificação para a Noumenia, faça uma prece como esta: "Hécate, seja favorável a seu/sua suplicante que lhe traz ofertas este dia assim como em outros dias no passado. Poderosa Hécate, por favor, leve embora a sujeira e as faltas deste lugar. Limpe-o de toda a negatividade e de coisas prejudiciais". Faça então uma fumigação do seu lar com o incenso, carregando o incensário pela casa (com cuidado para não se queimar). Faça um circuito que te leve de volta ao altar. Lá, faça uma prece para a proteção de Hécate durante o novo mês, como esta: "Hekate Propylaia, por favor conceda-nos sua proteção e evite que qualquer coisa prejudicial entre em nosso lar. Fazendo isso, lhe seremos sempre gratos".\n\nAqui você pode aproveitar para consultar um oráculo, se precisar de orientação de Hécate em algo.\n\nAo terminar o rito, ou no máximo no dia seguinte, junte as ofertas da ceia e se desfaça delas, seja deixando em uma encruzilhada ou no jardim ou - se for jogar no lixo - coloque já o saco para fora na mesma hora. Se onde você mora há horário para coleta de lixo, considere isso antes de retirar as ofertas do altar.'
            };
        }

        // Specific Holidays treated as Dedications
        if (day >= 11 && day <= 13 && monthName === 'Anthesterion') {
            let suggestions = '';
            if (day === 11) {
                suggestions = 'Pithoigia: Neste dia, os jarros (pithoi) do outono passado eram abertos e libações a Dionísio eram oferecidas. Então se fazia um banquete com o altar, a casa e as canecas decorados com flores de primavera. A quantidade consumida de bebida neste dia era moderada. Oferendas e libações a Hermes Chthonios são muito importantes para proteção, pois ele guia os mortos.';
            } else if (day === 12) {
                suggestions = 'Choes: Dia dos Copos. Podemos fazer libações para parentes mortos, a fim de ajudá-los na vida pós-morte. Para ofertar aos mortos, panspermia (mistura de sementes) é uma boa opção, mas também podemos oferecer ovos e alho. Se quiser, é interessante fazer competições de bebida! Lembre-se, este é um dia em que os mortos vagam, então proteção é essencial.';
            } else {
                suggestions = 'Chytroi: Dia dos Potes. Novamente, oferendas a Hermes Chthonios eram feitas, para então enviar os mortos de volta para o submundo. Diga com firmeza: "Vão embora, Keres (espíritos mortos), a Anthesteria terminou!". É muito importante fazer os mortos irem embora neste último dia.';
            }

            return {
                deity: 'Anthesteria',
                description: 'Seu nome traduz para Festival das Flores e, incrivelmente, também honra, ou pacifica, os mortos. No primeiro dia, a PITHOIGÍA, eram abertos os vinhos e feitas libações para Dionísio. Caso não tenha acesso a vinho, pode usar suco de uva. O segundo dia, KHOÉS (dia dos copos), era cheio de jogos de bebidas e uma vibe erótica. KHOÉS acabava com o sagrado matrimônio de Dionísio e a rainha. O último dia eram celebrados os mortos. Potes com oferendas tradicionais aos falecidos (grãos e sementes) eram deixados para os espíritos de ancestrais. Claro que a população tomava cuidado para não se aproximar demais dos mortos com vários métodos apotropaicos. Para encerrar a celebração: "Vão embora, Keres (espíritos mortos), o Anthesteria terminou!" Lembrem-se de diluir a água, 3 partes água para 1 vinho, e recitar os hinos órficos 30 e 45.',
                suggestions: suggestions
            };
        }

        if (day === 23 && monthName === 'Anthesterion') {
            return {
                deity: 'Diasia',
                description: 'A "Diasia" é o principal festival para Zeus Meilikhios (O Gentil), que é Zeus no seu aspecto submundano, manifestando-se como uma cobra gigante. Burkert sugere que essa imagem paternal significa reconciliação com os mortos, assim como seu epíteto se relaciona ao efeito apaziguador das ofertas aos mortos. Apesar desse efeito, o clima do festival era de alegria, como uma feira rústica, conforme Aristófanes dá a entender em várias referências. As famílias ricas queimavam ofertas inteiras a Zeus, mas as pessoas comuns ofereciam bolos no formato de animais. São as "ofertas sem sangue" ("thymata epikhoria"), como as descrevia Tucídides. Hoje fazemos apenas as ofertas de bolos/tortos/biscoitos no formato de animais, como ovelhas e porcos, mas também oferecemos grãos e frutos porque Ele é responsável pela fertilidade do solo e é normalmente mostrado com uma cornucópia (corno de bode). Segundo Kerényi, Zeus Meilikios também recebia ofertas de mel. Uma vez que este é um festival de propiciação, todas as ofertas são queimadas para o Deus. Depois disso, há uma festa geral e presentes são dados às crianças (que são especialmente queridas pelas deidades submundanas). A Diasia é um festival que acontecia não no centro de Atenas, mas na beira do rio Ilissos.',
                suggestions: 'Ofereça bolos, tortas ou biscoitos em formato de animais (como ovelhas e porcos), além de grãos, frutos e mel. Recite hinos a Zeus Meilikhios.'
            };
        }

        if (day === 8 && monthName === 'Elaphebolion') {
            return {
                deity: 'Asklepieia',
                description: 'Festival em honra de Asclépio, Apolo e Higéia. "Em honra de Asclépio, cobras eram usadas em rituais de cura. Serpentes não-venenosas eram deixadas para arrastar no chão de dormitórios onde enfermos e feridos dormiam. (...) Os centros de cura eram chamados de asclepieion; os peregrinos iam em bandos para lá para serem curados. Eles passavam a noite e contavam seus sonhos a um sacerdote no dia seguinte. Ele prescrevia a cura, que normalmente era uma visita aos banhos ou ao ginásio." (Michael Lahanas)',
                suggestions: 'Faça preces e rezas pela saúde. Recite hinos a Asclépio, Apolo e Higéia. Ofereça desenhos ou estátuas de cobras, especialmente as feitas à mão. Realize uma meditação de limpeza energética, pois a cura é o foco do feriado; khernips ou o senut são indicados.'
            };
        }

        if (day === 13 && monthName === 'Elaphebolion') {
            return {
                deity: 'Dionísia Urbana',
                description: 'Festival de vários dias em honra de Dionísio. A celebração começava com ofertas de touro e porco, com o deus Falo (Phallus) sendo coroado e a estátua de Dionísio sendo carregada pela noite. Também há procissão, teatro e danças ditirâmbicas.',
                suggestions: 'Ler ou assistir peças clássicas, ir ao teatro ou ler e escrever poesia. Vinho e decorações de uva, coroa de flores e heras (ivys). Fazer libações ao deus Dionísio e ler os hinos homéricos 1 e 7, órficos 30, 45, 46, 53 e 54.'
            };
        }

        // Eroteia - 4 de Mounukhion (A cada 5 anos: 2021, 2026...)
        if (day === 4 && monthName === 'Mounukhion' && gregorianDate) {
            const year = gregorianDate.getFullYear();
            if ((year - 2006) % 5 === 0) {
                return {
                    deity: 'Eroteia',
                    description: 'Festival em honra de Eros, que acontecia a cada cinco anos em Thespies, na Boiotea/Beócia. Sobre os detalhes nada se sabe, exceto que eram realizadas competições de música e ginástica.<div class="dedication-title">O 4º dia é dedicado a Afrodite, Hermes e Héracles</div>',
                    suggestions: ''
                };
            }
        }

        // Delphínia - 6 de Mounukhion
        if (day === 6 && monthName === 'Mounukhion') {
            return {
                deity: 'Delphínia',
                description: 'Festival para honrar Apollon Delphinio (ou seja, "Apolo de Delfos"; Delfos era a cidade onde havia um oráculo no templo de Apolo), com uma procissão na qual garotas virgens ofereciam Iketiria (ramo de oliveira amarrado com lã) e Popana (bolos assados no forno) para Seu santuário. Este festival acontece em memória do retorno de Teseu de Creta e para suplicar a Apolo que tenhamos viagens marítimas seguras (o inverno teria acabado e as jornadas no mar começariam nesta época do ano).<div class="dedication-title">O 6º dia é dedicado a Ártemis</div>',
                suggestions: ''
            };
        }

        // Mounykhía - 16 de Mounukhion
        if (day === 16 && monthName === 'Mounukhion') {
            return {
                deity: 'Mounykhía',
                description: 'Festival em honra de Ártemis Mounykhia e o herói Mounykhos. Este festival honra Ártemis como Deusa da Lua e a Senhora das Feras. Há uma procissão na qual as pessoas carregam Amphiphontes (brilhante dos dois lados), tortas arredondadas nas quais \'dadia\' (pequenas tochas) são fixadas, simbolizando o nascente e o poente da lua; bem parecido com as tortas oferecidas a Hécate. As tortas são oferecidas a Ártemis com uma prece semelhante a esta: "Ártemis, Querida Mestra, para Quem eu carrego, Senhora, este Amphiphon, e que deverá servir como oferta bebível". Alguns dizem que a razão da torta ser chamada Amphiphon, que também pode significar "Brilho de Dupla Luz", é que ela é oferecida quando o sol e a lua estão ambos visíveis. Nos tempos antigos, uma cabra era sacrificada à Senhora; agora nós podemos usar tortas em forma de cabra, ou oferecer folhas de palma, porque as palmas são sagradas a Ela. Este é também um tempo apropriado para o Arkteia (Encenação da Ursa) em agradecimento pelos animais dos jogos juvenis (o mais importante, para as tribos do Neolítico, era o urso). As Arktoi (Ursas) são jovens garotas (com cerca de 10 anos de idade) que dançavam vestidas em khitones (túnicas) de cor açafrão. Elas usam coroas de folhas no cabelo e carregam tochas ou galhos.',
                suggestions: 'Ofertas de Amphiphontes (tortas redondas com pequenas tochas/velas) ou biscoitos em formato de cabra e folhas de palma. Recite preces a Ártemis como Senhora das Feras. Realize a Arkteia (Encenação da Ursa) ou danças, usando coroa de folhas no cabelo e segurando tochas (ou velas na modernidade) e galhos, em honra à deusa.'
            };
        }

        // Olympeia - 19 de Mounukhion
        if (day === 19 && monthName === 'Mounukhion') {
            return {
                deity: 'Olympeia',
                description: 'Festival em honra a Zeus Olímpio. O festival incluía uma procissão de cavalaria, e às vezes também competições e exibições de cavalaria. Além disso, vários touros eram sacrificados a Zeus.',
                suggestions: ''
            };
        }

        // Thargélia - 6 e 7 de Thargelion
        if (day === 6 && monthName === 'Thargelion') {
            return {
                deity: 'Thargélia (Purificação)',
                description: 'O Thargelia é um festival da colheita e purificação para Apolo e Ártemis. O 6º dia (aniversário de Ártemis) é focado na purificação. Antigamente, dois homens (Pharmakoi) eram conduzidos pela cidade como bodes-expiatórios para absorver as impurezas e depois expulsos. Um usava colar de figos pretos (representando os homens) e o outro de figos brancos (mulheres).<div style="margin-top: 8px;"><h5 style="margin: 0 0 2px 0; font-size: 0.85em; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.5px;">OFERENDAS E ATIVIDADES</h5>Realize rituais de purificação do lar e pessoal. Queime ervas de limpeza ou faça uso de khernips para purificar o ambiente.</div><div class="dedication-title">O 6º dia é dedicado a Ártemis</div>',
                suggestions: ''
            };
        }

        // Bendídeia - 19 de Thargelion
        if (day === 19 && monthName === 'Thargelion') {
            return {
                deity: 'Bendídeia',
                description: 'Festival realizado na Trácia, dedicado à Bendi, deusa da lua e da fertilidade, que corresponde a Ártemis. O festival consistia de corridas de tochas a cavalo e de procissões indo para o templo de Pireus. O santuário de Bendis ficava na colina Mounykhia, perto do templo de Ártmis. Ela era representada como uma caçadora. Heródoto escreveu que as mulheres trácias ofereciam trigo a ela.<div style="margin-top: 8px;"><h5 style="margin: 0 0 2px 0; font-size: 0.85em; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.5px;">OFERENDAS E ATIVIDADES</h5>Ofertem trigo a Bendi (como as mulheres trácias). Realizem corridas de tochas ou procissões à luz de tochas/velas em honra à Deusa da Lua.</div>',
                suggestions: ''
            };
        }

        // Kallyntéria e Plyntéria - 25 de Thargelion
        if (day === 25 && monthName === 'Thargelion') {
            return {
                deity: 'Kallyntéria e Plyntéria',
                description: 'Kallyntéria é o festival da "Varredura" em que o templo de Atena é limpo e Sua chama eterna reacesa. Plyntéria é o festival para lavar (plynteria hiera) a estátua antiga de Atena Polias. O dia é considerado desafortunado (apophras) porque a Deusa está ausente. As mulheres retiram o peplos (manto) e jóias da imagem, que é coberta e levada em uma procissão para o local da lavagem. A procissão é conduzida por uma mulher carregando um cesto de tortas de figo, já que o figo é um antigo símbolo de fertilidade e foi a primeira comida cultivada; os doces devem ser oferecidos à Deusa no litoral. Lá, a estátua e o peplos são purificados por duas garotas (Loutrides). À noite, a Deusa retorna à Acrópole em procissão à luz de tochas, vestida com o peplos limpo.<div style="margin-top: 8px;"><h5 style="margin: 0 0 2px 0; font-size: 0.85em; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.5px;">OFERENDAS E ATIVIDADES</h5>Limpe e varra o altar/templo (Kallyntéria). Realize a lavagem simbólica (plynteria) da estátua de Atena e suas vestes. Oferte tortas de figo e recite hinos para a deusa.</div>',
                suggestions: ''
            };
        }

        // Arrephoria - 3 de Skirophorion
        if (day === 3 && monthName === 'Skirophorion') {
            return {
                deity: 'Arrephoria',
                description: 'Duas jovens garotas (entre 7 e 11 anos de idade), as Arrephoroi (Carregadoras das Coisas Não-Ditas) que são as filhas rituais do Arkhon Basileus (Sacerdote-Rei), passaram o ano precedente vivendo no templo de Atena Polias (guardiã da cidade). Alguns dizem que elas estiveram tecendo um novo peplos (manto) para Atena, o qual elas trarão a Ela na procissão sagrada (veja o festival Panathenaia no mês que vem). Em um secreto rito noturno, a Sacerdotisa dá para as Arrephoroi um pacote, cujo conteúdo é escondido de todas as três. Elas levam o pacote por um caminho secreto até o santuário de Afrodite nos Jardins, e trazem de volta outro pacote secreto. Depois disso, as Arrephoroi são substituídas por duas novas garotas. O rito recorda quando Atena deu o cesto contendo Erictônio para as filhas do Rei Kekrops, que atuaram como amas. Duas delas desobedeceram Sua ordem de não olhar no cesto, e quando elas viram o homem-serpente elas se jogaram da Acrópole, morrendo. O nome da ama leal era Pandrosos (TodaOrvalho), ou, de acordo com outras fontes, as duas filhas que se auto-sacrificaram eram Pandrosos e Herse (que também significa orvalho). (O festival também pode ser chamado de Ersephoria - Carregando Orvalho.) A árvore da oliveira, que era o presente especial de Atena a Atenas, traz pequenas olivas se não houver orvalho suficiente nesta época do ano. Afrodite, como Deusa da Manhã e Estrela Vespertina, era responsável pelo orvalho, e então Sua cooperação era essencial. As Arrephoroi usavam mantos brancos, jóias douradas, e comiam Anastatos (Feito-para-crescer), um pão leve especial (tipo um pastelão de queijo).<div style="margin-top: 8px;"><h5 style="margin: 0 0 2px 0; font-size: 0.85em; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.5px;">OFERENDAS E ATIVIDADES</h5>Recriem o rito noturno ou honrem Atena e Afrodite. Comam \'Anastatos\' (um pastelão de queijo). Usem roupas brancas e joias douradas. Comecem a terminar projetos incompletos e se livrem de tudo que não é mais necessário, para ter espaço para as coisas novas.</div><div class="dedication-title">O 3º dia é dedicado a Atena</div>',
                suggestions: ''
            };
        }

        // Skirophoria - 12 de Skirophorion
        if (day === 12 && monthName === 'Skirophorion') {
            return {
                deity: 'Skirophoria',
                description: 'Este festival ocorre na época do corte e debulhamento do grão. A Sacerdotisa de Atena, o Sacerdote de Poseidon e o Sacerdote de Hélio vão para o Skiron, um lugar sagrado para Deméter, Koré, Atena Skiras e Poseidon Pater, pois lá foi onde Atenas e Elêusis se reconciliaram. Atena e Poseidon representam a vida da cidade, e Deméter e Koré representam a agricultura; Hélio testemunha Seus juramentos (como Ele testemunhou o rapto de Koré). O Skiron é onde, de acordo com a tradição, a primeira semeadura aconteceu. Um grande e branco dossel (chamado de skiron) é carregado sobre as cabeças dos sacerdotes e sacerdotisas durante a procissão. É um escudo que simboliza a proteção dos campos, fazendas e pessoas do calor escaldante, evitando a queimada e a seca. A Skirophoria é celebrada principalmente por mulheres (enquanto os homens dominam a Cidade Dionísia - ver mês de Elaphebolion). Para trazer fertilidade, elas se abstém do intercurso neste dia, e para este fim elas comem alho para manter os homens afastados. Elas também jogam ofertas dentro das megara - cavernas sagradas de Deméter: bolos em forma de cobra, falos e leitõezinhos. (Eles se tornam os Thesmoi - coisas deitadas ao chão - que são removidas na Thesmophoria, no mês de Pyanepsion). Essa cerimônia relembra o guardador de porcos Eubouleus que foi engolido/tragado com seus porcos quando Perséfone foi raptada para dentro do submundo por Hades. Os homens têm uma corrida na qual eles carregam ramos de videira do santuário de Dionísio até o templo de Atena em Skiras. O vencedor ganha a Pentaploa (Taça Quíntupla), contendo vinho, mel, queijo, algum milho e óleo de oliva. Só a ele é permitido compartilhar essa bebida com a Deusa, para quem uma libação é vertida para que Ela abençoe esses frutos da estação.',
                suggestions: 'Para as mulheres: Abstinência sexual, consumo de alho e ofertas de bolos em forma de cobra, falos e leitõezinhos. Para os homens: Corrida carregando ramos de videira. Como o vencedor ganhava uma Pentaploa, podemos também oferecer seu conteúdo: mistura de vinho, mel, queijo, milho e óleo de oliva.'
            };
        }

        if (day === 7 && monthName === 'Thargelion') {
            return {
                deity: 'Thargélia (Oferenda)',
                description: 'O 7º dia (aniversário de Apolo) é para a oferta dos primeiros frutos ao Deus. O "Thargelos" é um cozido feito com o primeiro milho (ou grãos) e outros vegetais em um pote, oferecido a Apolo como guardião das safras. Há também disputas de coros masculinos e de meninos em honra ao Deus.',
                suggestions: 'Prepare e oferte um Thargelos (cozido de grãos e vegetais variados). Oferte as primícias da sua colheita ou projetos. Entoe hinos a Apolo e faça libações.'
            };
        }

        if (day >= 12 && day <= 15 && monthName === 'Gamelion') {
            return {
                deity: 'Lenaia',
                description: 'Festival que celebra Dionísio, deus do vinho e da fertilidade. Embora o festival não seja bem compreendido, ele provavelmente é realizado para trazer a fertilidade e a primavera. Há uma procissão, durante a qual o Daidykhos (carregador da tocha) diz: "Invoque-se o Deus" e os celebrantes respondem: "Filho de Sêmele, Iaco, Fornecedor de Prosperidade!". Há também competições de drama (teatro), canção (música) e poesia. O Lenaia mais provavelmente tem esse nome por causa das Lenai, que eram Mênades (mulheres participantes nos ritos orgiásticos dionisíacos). À meia-noite, vestidas e portando os thyrsos (cajado), castanholas, tamborins, flautas e tochas, elas começavam uma dança extasiante que durava a noite inteira, em frente a uma imagem de Dionísio com uma coroa de flores. Esse ídolo é um poste simples, vestido em túnica de homem, com ramos de flores como se fossem braços levantados, e com uma máscara barbada de Dionísio. Diante dele ficava uma mesa com dois stamnoi (jarros, moringas) de vinho e um kantharos (cálice) entre eles; dos stamnoi as dançarinas bebiam o inebriante vinho.',
                suggestions: ''
            };
        }

        if (day === 27 && monthName === 'Gamelion') {
            return {
                deity: 'Theogamia',
                description: 'Gamelion era chamado o "Mês do Matrimônio", e era um tempo popular para casamentos. O Gamelia (banquete de casamento) ou Theogamia (casamento dos deuses), no fim do mês, é uma celebração do Hieros Gamos (Sagrado Matrimônio) de Zeus e Hera, e é considerado um presságio de primavera e novos começos. Os gregos ofereciam a Hera figos cobertos de mel e guirlandas de ouro, invocando suas bênçãos durante os casamentos feitos neste dia.',
                suggestions: 'Recite os hinos órficos 15 para Zeus, 16 para Hera e o hino homérico 12 para Hera.'
            };
        }

        if (day === 26 && monthName === 'Poseideon') {
            return {
                deity: 'Haloa',
                description: 'Festival em honra a Deméter e Dionísio. Tem esse nome por causa do "halos", o chão debulhado. O festival incluía bolos em forma de falos ou pudendas, mas sem as comidas proibidas nos Mistérios Eleusinos (romãs, maçãs, ovos, aves e alguns peixes). Mulheres dançavam em torno de um falo gigante, deixando-lhe ofertas. Mais tarde na noite, os homens eram admitidos e havia uma grande orgia pelo resto da madrugada. Um sacerdote e uma sacerdotisa presidiam sobre a celebração de fertilidade. [É também possível que os homens tivessem um festival à parte para Poseidon nesse dia.]',
                suggestions: ''
            };
        }

        switch (day) {
            case 1:
                return {
                    deity: 'Noumenia',
                    description: '"Sempre que Mene [a Lua] com delgados chifres brilha na direção do Oeste, ela conta o começo de um novo mês." (Aratus, Phaenomena)\n\nA Noumenia é a festa primordial da família e do lar. O foco principal são os Deuses Domésticos: Héstia (o lar), Zeus Ktesios (a propriedade) e Zeus Erkeios (do quintal), além do Agathos Daimon (bom espírito). É o momento sagrado de pedir proteção e prosperidade para a casa no mês que se inicia.',
                    suggestions: 'Faça libações e recite hinos aos Deuses do Lar, especialmente a Héstia (a primeira e a última) e Zeus. Jogue grãos de cevada na tigela de ofertas do altar como rito de purificação e respeito. Opcionalmente, realize uma divinação para consultar a vontade dos deuses sobre o mês que chegou.\n\nO <span class="interactive-link" data-action="toggle-kathiskos">kathiskos</span>\nEm cada Noumenia, um kathiskos recém-preenchido é colocado na despensa ou onde a comida é guardada na sua casa. Como alternativa, ele pode ser mantido no altar da sua família. A cada Deipnon de Hécate, o pote pode ser esvaziado e limpo. O conteúdo pode ser esvaziado do lado de fora, de preferência no seu jardim ou em um composto de adubo. Uma planta de vaso funciona bem - especialmente uma cujas ervas ou comida para a família crescem nela. Isso ajuda a completar um ciclo onde a Zeus Ktesios é oferecida a comida da sua família em agradecimento à proteção dele e as ofertas são então usadas para crescer mais comida para a família consumir. Se isso não é algo que dê para você fazer, não se sinta como se estivesse fazendo algo errado. Faça o melhor que pode, mas - mais importante - faça com constância. Você ganha mais fazendo um culto regular de coração aberto do que fazendo um culto esporádico "perfeitinho".'
                };
            case 2:
                return {
                    deity: 'O 2º dia é dedicado a Agathos Daimon',
                    description: 'O Agathos Daimon, ou Bom Espírito, é celebrado no segundo dia de cada mês lunar. Esta observância doméstica honra uma divindade pessoal da família que traz boa sorte e proteção, muitas vezes associada a Zeus. Ele é frequentemente representado como uma serpente ou um jovem segurando uma cornucópia, agindo como um guardião benéfico. Antigamente, os banquetes eram encerrados com um gole de vinho diluído em água em sua homenagem para garantir a continuidade das bênçãos.',
                    suggestions: 'Ofereça uma libação de vinho diluído em água ou suco de uva ao seu Agathos Daimon e peça prosperidade para o lar. Recite o Hino Órfico 73 ou faça suas próprias preces por um bom ânimo e favor divino neste mês. É o momento ideal para cultivar a boa sorte e a harmonia familiar.'
                };
            case 3:
                return {
                    deity: 'O 3º dia é dedicado a Atena',
                    description: 'Atena é celebrada no 3º dia do mês lunar. Faça uma prece pedindo que Atena lhe ajude a planejar bem suas ações e falas neste dia.',
                    suggestions: 'Oferendas e Atividades:\nVista alguma peça de roupa azul-clara ou cinza, ofereça seus estudos e leituras de hoje a ela, e pratique atos corretos e nobres.\n\nSugestão de Epítetos:\nParthenos (Virgem), Polias (Protetora da Cidade), Boulaia (do Conselho), Ergane (Trabalhadora), Nike (Vitória).\n\nSugestão de Ofertas:\nAzeite de oliva, ramos de oliveira, pão, uma coruja de cerâmica ou desenho, um hino ou poema recitado, incenso de olíbano ou sálvia.'
                };
            case 4:
                return {
                    deity: 'Afrodite, Hermes e Héracles',
                    description: '<div class="dedication-title">O 4º dia é dedicado a Afrodite, Hermes e Héracles</div>'
                };
            case 6:
                return {
                    deity: 'Ártemis',
                    description: '<div class="dedication-title">O 6º dia é dedicado a Ártemis</div>'
                };
            case 7:
                return { deity: 'O 7º dia é dedicado a Apolo', description: '' };
            case 8:
                return { deity: 'O 8º dia é dedicado a Poseidon e Teseu', description: '' };
            default:
                return null;
        }
    }


    isSouthernHemisphere(): boolean {
        return true; // Configurado para Hemisfério Sul conforme pedido do usuário
    }

    getCurrentPhase(): string {
        return Moon.lunarPhase();
    }

    getCurrentPhaseEmoji(): string {
        return Moon.lunarPhaseEmoji();
    }

    getPhaseImage(date: Date = new Date()): string {
        const phase = Moon.lunarPhase(date);

        // Map lunarphase-js names to our assets
        const mapping: Record<string, string> = {
            'New': 'moon-new.png',
            'Waxing Crescent': 'moon-waxing-crescent.png',
            'First Quarter': 'moon-first-quarter.png',
            'Waxing Gibbous': 'moon-waxing-gibbous.png',
            'Full': 'moon-full.png',
            'Waning Gibbous': 'moon-waning-gibbous.png',
            'Last Quarter': 'moon-last-quarter.png',
            'Waning Crescent': 'moon-waning-crescent.png'
        };

        return `assets/${mapping[phase] || 'moon-full.png'}`;
    }

    getIllumination(date: Date = new Date()): string {
        const age = this.getMoonAge(date);
        const phase = 0.5 * (1 - Math.cos((2 * Math.PI * age) / 29.530588853));
        return (phase * 100).toFixed(1) + '%';
    }

    getPhaseDescription(): string {
        const phase = this.getCurrentPhase();
        // Tradução simples para PT-BR
        const translations: Record<string, string> = {
            'New': 'Lua Nova',
            'Waxing Crescent': 'Lua Crescente',
            'First Quarter': 'Quarto Crescente',
            'Waxing Gibbous': 'Crescente Gibosa',
            'Full': 'Lua Cheia',
            'Waning Gibbous': 'Minguante Gibosa',
            'Last Quarter': 'Quarto Minguante',
            'Waning Crescent': 'Lua Minguante'
        };
        return translations[phase] || phase;
    }

    private readonly months = [
        { lat: 'Hekatombaion', gr: 'Ἑκατομβαιών' },
        { lat: 'Metageitnion', gr: 'Μεταγειτνιών' },
        { lat: 'Boedromion', gr: 'Βοηδρομιών' },
        { lat: 'Pyanepsion', gr: 'Πυανεψιών' },
        { lat: 'Maimakterion', gr: 'Μαιμακτηριών' },
        { lat: 'Poseideon', gr: 'Ποσειδεών' },
        { lat: 'Gamelion', gr: 'Γαμηλιών' },
        { lat: 'Anthesterion', gr: 'Ἀνθεστηριών' },
        { lat: 'Elaphebolion', gr: 'Ἐλαφηβολιών' },
        { lat: 'Mounykhion', gr: 'μουνιχιών' },
        { lat: 'Thargelion', gr: 'Θαργηλιών' },
        { lat: 'Skirophorion', gr: 'Σκιροφοριών' }
    ];
    /* Simplificação: Assumindo ciclo metônico fixo ou lógica do ano corrente */
    private getMoonAge(date: Date): number {
        try {
            return Moon.lunarAge(date);
        } catch {
            return Moon.lunarAge();
        }
    }

    private readonly NOUMENIA_THRESHOLD = 1.5;

    // Metonic Cycle: Years 3, 6, 8, 11, 14, 17, 19 are intercalary



    // Data scraped from http://www.numachi.com/~ccount/hmepa/calendars/olympiads701-800.html
    private readonly OLYMPIAD_701_DATA = {
        "701.1": [
            { "name": "Hekatombaion", "length": 29, "start": "2025-06-26" },
            { "name": "Metageitnion", "length": 30, "start": "2025-07-25" },
            { "name": "Boedromion", "length": 29, "start": "2025-08-24" },
            { "name": "Puanepsion", "length": 30, "start": "2025-09-22" },
            { "name": "Maimakterion", "length": 30, "start": "2025-10-22" },
            { "name": "Poseideon", "length": 30, "start": "2025-11-21" },
            { "name": "Poseideon-2", "length": 30, "start": "2025-12-21" },
            { "name": "Gamelion", "length": 30, "start": "2026-01-20" },
            { "name": "Anthesterion", "length": 29, "start": "2026-02-19" },
            { "name": "Elaphebolion", "length": 30, "start": "2026-03-20" },
            { "name": "Mounukhion", "length": 29, "start": "2026-04-19" },
            { "name": "Thargelion", "length": 29, "start": "2026-05-18" },
            { "name": "Skirophorion", "length": 29, "start": "2026-06-16" }
        ],
        "701.2": [
            { "name": "Hekatombaion", "length": 29, "start": "2026-07-15" },
            { "name": "Metageitnion", "length": 29, "start": "2026-08-13" },
            { "name": "Boedromion", "length": 30, "start": "2026-09-11" },
            { "name": "Puanepsion", "length": 30, "start": "2026-10-11" },
            { "name": "Maimakterion", "length": 29, "start": "2026-11-10" },
            { "name": "Poseideon", "length": 30, "start": "2026-12-09" },
            { "name": "Gamelion", "length": 30, "start": "2027-01-08" },
            { "name": "Anthesterion", "length": 30, "start": "2027-02-07" },
            { "name": "Elaphebolion", "length": 29, "start": "2027-03-09" },
            { "name": "Mounukhion", "length": 30, "start": "2027-04-07" },
            { "name": "Thargelion", "length": 29, "start": "2027-05-07" },
            { "name": "Skirophorion", "length": 29, "start": "2027-06-05" }
        ],
        "701.3": [
            { "name": "Hekatombaion", "length": 30, "start": "2027-07-04" },
            { "name": "Metageitnion", "length": 29, "start": "2027-08-03" },
            { "name": "Boedromion", "length": 29, "start": "2027-09-01" },
            { "name": "Puanepsion", "length": 30, "start": "2027-09-30" },
            { "name": "Maimakterion", "length": 29, "start": "2027-10-30" },
            { "name": "Poseideon", "length": 30, "start": "2027-11-28" },
            { "name": "Gamelion", "length": 30, "start": "2027-12-28" },
            { "name": "Anthesterion", "length": 30, "start": "2028-01-27" },
            { "name": "Elaphebolion", "length": 30, "start": "2028-02-26" },
            { "name": "Mounukhion", "length": 29, "start": "2028-03-27" },
            { "name": "Thargelion", "length": 30, "start": "2028-04-25" },
            { "name": "Skirophorion", "length": 29, "start": "2028-05-25" }
        ],
        "701.4": [
            { "name": "Hekatombaion", "length": 29, "start": "2028-06-23" },
            { "name": "Metageitnion", "length": 30, "start": "2028-07-22" },
            { "name": "Boedromion", "length": 29, "start": "2028-08-21" },
            { "name": "Puanepsion", "length": 29, "start": "2028-09-19" },
            { "name": "Maimakterion", "length": 30, "start": "2028-10-18" },
            { "name": "Poseideon", "length": 29, "start": "2028-11-17" },
            { "name": "Poseideon-2", "length": 30, "start": "2028-12-16" },
            { "name": "Gamelion", "length": 30, "start": "2029-01-15" },
            { "name": "Anthesterion", "length": 30, "start": "2029-02-14" },
            { "name": "Elaphebolion", "length": 29, "start": "2029-03-16" },
            { "name": "Mounukhion", "length": 30, "start": "2029-04-14" },
            { "name": "Thargelion", "length": 29, "start": "2029-05-14" },
            { "name": "Skirophorion", "length": 30, "start": "2029-06-12" }
        ]
    };

    private isIntercalaryYear(atticYearStr: string): boolean {
        // e.g. "701.1" has Poseideon-2
        const yearData = this.OLYMPIAD_701_DATA[atticYearStr as keyof typeof this.OLYMPIAD_701_DATA];
        if (!yearData) return false;
        return yearData.some(m => m.name === 'Poseideon-2');
    }

    private getAdjustedMonths(atticYearStr: string): { lat: string, gr: string }[] {
        const yearData = this.OLYMPIAD_701_DATA[atticYearStr as keyof typeof this.OLYMPIAD_701_DATA];
        if (!yearData) {
            // Fallback to standard 12 months if outside 2025-2029
            // TODO: Or generate warning?
            return this.months;
        }

        return yearData.map(m => {
            // Find greek name from standard list
            // Match basic name (remove -2)
            const baseName = m.name.replace('-2', '');
            const standard = this.months.find(sm => sm.lat === baseName);
            let gr = standard ? standard.gr : m.name;

            if (m.name === 'Poseideon-2') {
                return { lat: 'Poseideon II', gr: 'Ποσειδεών Β' };
            }

            return { lat: m.name, gr: gr };
        });
    }

    getAthenianDate(inputDate: Date = new Date()): { day: number, monthName: string, monthGreek: string, year: string, monthIndex: number } {
        // Handle Sunset: Calculate sunset for the input date at user location
        const date = new Date(inputDate);

        // Get sunset time for determining day shift
        const times = SunCalc.getTimes(date, this.userCoords.lat, this.userCoords.lng);
        // If input time is after sunset, it's the next Attic day
        if (date.getTime() >= times.sunset.getTime()) {
            date.setDate(date.getDate() + 1);
        }


        // Normalize time to midnight for comparison
        date.setHours(0, 0, 0, 0);

        // Iterate through OLYMPIAD_DATA to find the date
        const years = Object.keys(this.OLYMPIAD_701_DATA);

        for (const year of years) {
            const months = this.OLYMPIAD_701_DATA[year as keyof typeof this.OLYMPIAD_701_DATA];

            for (let i = 0; i < months.length; i++) {
                const month = months[i];
                const startDate = new Date(month.start + 'T00:00:00'); // Assuming Start is Gregorian YYYY-MM-DD

                // Calculate End Date
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + month.length);
                // Month spans [startDate, endDate)

                if (date >= startDate && date < endDate) {
                    const diffTime = date.getTime() - startDate.getTime();
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    // If date == startDate, diff = 0. We want Day 1.
                    // Actually, Math.floor is safer.
                    const day = diffDays;

                    // Get Greek Name
                    let gr = '';
                    const baseName = month.name.replace('-2', '');
                    const standard = this.months.find(sm => sm.lat === baseName);
                    gr = standard ? standard.gr : month.name;
                    if (month.name === 'Poseideon-2') {
                        gr = 'Ποσειδεών Β';
                        return {
                            day: day,
                            monthName: 'Poseideon II',
                            monthGreek: gr,
                            year: year,
                            monthIndex: i
                        };
                    }

                    return {
                        day: day,
                        monthName: month.name,
                        monthGreek: gr,
                        year: year, // e.g. "701.1"
                        monthIndex: i
                    };
                }
            }
        }

        // Fallback for dates outside 2025-2029: Return placeholders or existing algorithmic logic?
        // User mainly cares about this range.
        return {
            day: 1,
            monthName: 'Unknown',
            monthGreek: '?',
            year: 'Out of Range',
            monthIndex: 0
        };
    }

    getNextEventInfo(date: Date = new Date()): { daysToDeipnon: number, daysToNoumenia: number, nextMonthLat: string, nextMonthGr: string } {
        // Adjust for Threshold
        const age = this.getMoonAge(date);
        const ageCorrected = age < this.NOUMENIA_THRESHOLD ? (age + 29.53) : age;
        // Age relative to "NoumeniaStart"

        const lunarCycle = 29.53;
        // Time until Age wraps to 0? No, time until Age hits 29.53?
        // New Cycle starts when Age >= Threshold.
        // So we want time until (Age mod 29.53) = Threshold.

        let daysRemaining = (lunarCycle + this.NOUMENIA_THRESHOLD) - age;
        if (daysRemaining > lunarCycle) daysRemaining -= lunarCycle;

        const daysToDeipnon = Math.floor(daysRemaining) - 1; // Approx
        const daysToNoumenia = daysToDeipnon + 1;

        const current = this.getAthenianDate(date);
        const monthsList = this.getAdjustedMonths(current.year);
        // Since we might be 'in the gap' (prev month), we should look at current.monthIndex + 1
        const nextIndex = (current.monthIndex + 1) % monthsList.length;
        // If current is 'gap', current.monthIndex is already shifted back. So +1 is the 'next' (which is the Crescent one).

        const nextMonth = monthsList[nextIndex];

        return {
            daysToDeipnon,
            daysToNoumenia,
            nextMonthLat: nextMonth.lat,
            nextMonthGr: nextMonth.gr
        };
    }

    getMonthEventDates(viewDate: Date): { deipnon: Date, noumenia: Date } {
        // We want the Deipnon/Noumenia of the CURRENT View Month.
        // Assuming viewDate is somewhere in the month.
        const age = this.getMoonAge(viewDate);

        // Find distance to next New Moon (Phase 0)
        // But our "Month End" is at Age < Threshold.
        // Effectively, end is when Age hits ~0 (or just before Threshold of next).

        const lunarCycle = 29.53;
        const daysToNewMoon = lunarCycle - age; // Days to Age 0

        // Deipnon is the day when Age is roughly 0 (or < 1.5).
        // Let's say Deipnon is the day 'Age 0' occurs.
        const deipnon = new Date(viewDate);
        deipnon.setDate(viewDate.getDate() + Math.round(daysToNewMoon));

        const noumenia = new Date(deipnon);
        noumenia.setDate(deipnon.getDate() + 1);

        return { deipnon, noumenia };
    }

    getAtticMonthLength(monthStartDate: Date): number {
        // Use getAthenianDate to find which month this start date belongs to.
        const info = this.getAthenianDate(monthStartDate);
        if (info.year === 'Out of Range') return 30; // Fallback

        const yearData = this.OLYMPIAD_701_DATA[info.year as keyof typeof this.OLYMPIAD_701_DATA];
        const month = yearData.find(m => m.name === info.monthName);
        return month ? month.length : 30;
    }
}
