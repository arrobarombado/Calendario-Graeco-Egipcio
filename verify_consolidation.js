
class MoonPhaseServiceMock {
    getDedication(day, monthLength, monthName) {
        if (day === 27 && monthName === 'Gamelion') {
            return {
                deity: 'Theogamia',
                description: 'Gamelion era chamado o "Mês do Matrimônio", e era um tempo popular para casamentos. O Gamelia (banquete de casamento) ou Theogamia (casamento dos deuses), no fim do mês, é uma celebração do Hieros Gamos (Sagrado Matrimônio) de Zeus e Hera, e é considerado um presságio de primavera e novos começos. Os gregos ofereciam a Hera figos cobertos de mel e guirlandas de ouro, invocando suas bênçãos durante os casamentos feitos neste dia.',
                suggestions: ''
            };
        }

        if (day === 26 && monthName === 'Poseideon') {
            return {
                deity: 'Haloa',
                description: 'Festival em honra a Deméter e Dionísio. Tem esse nome por causa do "halos", o chão debulhado. O festival incluía bolos em forma de falos ou pudendas, mas sem as comidas proibidas nos Mistérios Eleusinos (romãs, maçãs, ovos, aves e alguns peixes). Mulheres dançavam em torno de um falo gigante, deixando-lhe ofertas. Mais tarde na noite, os homens eram admitidos e havia uma grande orgia pelo resto da madrugada. Um sacerdote e uma sacerdotisa presidiam sobre a celebração de fertilidade. [É também possível que os homens tivessem um festival à parte para Poseidon nesse dia.]',
                suggestions: ''
            };
        }
        return null;
    }
}

const service = new MoonPhaseServiceMock();
console.log('--- Checking Consolidated Text ---');
const h = service.getDedication(26, 30, 'Poseideon');
console.log(`Haloa Desc Len: ${h.description.length}, Sug Len: ${h.suggestions.length}`);

const t = service.getDedication(27, 30, 'Gamelion');
console.log(`Theogamia Desc Len: ${t.description.length}, Sug Len: ${t.suggestions.length}`);
