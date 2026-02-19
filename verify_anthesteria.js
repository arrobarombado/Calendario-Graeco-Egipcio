
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day >= 11 && day <= 13 && monthName === 'Anthesterion') {
            return {
                deity: 'Anthesteria',
                description: 'Seu nome traduz para Festival das Flores e incrivelmente tambem honra, ou pacifica, os mortos. No primeiro dia, a PITHOIGÍA, eram abertos os vinhos e feitas libacoes para Dionisio. Caso nao tenha acesso a vinho, pode usar suco de uva. O segundo dia, KHOÉS (dia dos copos), era cheio de jogos de bebidas e uma vibe erotica. KHOÉS acabava com o sagrado matrimonio de Dionisio e a rainha. O ultimo dia eram celebrados os mortos. POtes com oferendas tradicionais aos falecidos (graos e sementes) eram deixados para os espiritos de ancestrais. Claro que a populacao tomava cuidado para nao se aproximar demais dos mortos com varios metodos apotropaicos. Para encerrar a clebracao "Vao embora, Keres (espiritos mortos), o Anthesteria terminou!" Lembrem-se de diluir a agua, 3 partes agua para 1 vinho e recitar os hinos orficos 30 e 45',
                suggestions: ''
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Anthesteria Description ---');
const res = service.getDedication(11, 29, 'Anthesterion');
console.log(`Desc Length: ${res.description.length}`);
console.log(`Sample: ${res.description.substring(0, 50)}...`);
