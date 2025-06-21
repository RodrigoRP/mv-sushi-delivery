# MV Sushi Delivery 🍣

Sistema completo de delivery para MV Sushi - São Francisco de Assis, RS

## 📋 Sobre o Projeto

Sistema moderno de delivery desenvolvido em React com design inspirado no iFood, incluindo interface do cliente e painel administrativo completo para gerenciamento da loja.

### 🏪 Informações do Estabelecimento

- **Nome:** MV Sushi Delivery
- **Telefone:** (55) 99600-5343
- **PIX:** 55996005343
- **Endereço:** Maurício Cardoso 1242, Centro - São Francisco de Assis, RS
- **Área de entrega:** São Francisco de Assis e região

## 🚀 Funcionalidades

### Para Clientes
- ✅ Interface moderna e responsiva
- ✅ Busca inteligente por produtos
- ✅ Filtros por categoria (Combos, Uramaki, Sashimis, etc.)
- ✅ Produtos populares destacados
- ✅ Carrinho lateral com controle de quantidade
- ✅ Sistema de pedidos integrado com WhatsApp
- ✅ Avaliações por produto (4.5-5.0 estrelas)
- ✅ Estados visuais (loading, empty, indisponível)

### Para Administradores
- ✅ Login seguro (senha: `admin123`)
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gestão completa de produtos (CRUD)
- ✅ Controle de disponibilidade
- ✅ Histórico de pedidos
- ✅ Configurações da loja (status, tempo de entrega)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização moderna
- **Lucide React** - Ícones consistentes
- **JavaScript ES6+** - Linguagem de programação
- **Responsive Design** - Mobile-first

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/mv-sushi-delivery.git
cd mv-sushi-delivery
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm start
```

4. **Acesse no navegador**
- Cliente: http://localhost:3000
- Admin: http://localhost:3000 (clique no ícone de configurações ou acesse via login)

### Outros comandos úteis

```bash
# Build para produção
npm run build

# Executar testes
npm test

# Analisar bundle
npm run build && npx serve -s build
```

## 📱 Como Usar

### Cliente
1. Navegue pelo cardápio usando os filtros de categoria
2. Use a busca para encontrar produtos específicos  
3. Adicione itens ao carrinho clicando no botão "+"
4. Abra o carrinho lateral para revisar o pedido
5. Clique em "Finalizar Pedido" e preencha seus dados
6. Será redirecionado para WhatsApp com o pedido formatado

### Administrador
1. Acesse `/admin` ou clique no ícone de configurações
2. Digite a senha: `admin123`
3. Visualize estatísticas no dashboard
4. Gerencie produtos (editar preços, disponibilidade, etc.)
5. Acompanhe pedidos em tempo real
6. Configure status da loja e tempo de entrega

## 🍣 Cardápio Completo

### Combos
- **MV Lo Gunkan** - R$ 95,00 (Popular)
- **MV Ro Kabu** - R$ 100,00
- **MV Trufamaki** - R$ 78,00
- **MV Tupimaki** - R$ 85,00
- **MV Supreme** - R$ 299,00 (Popular)

### Uramaki
- **Uramaki Philadelphia** - R$ 35,00 (Popular)
- **Uramaki Tropical** - R$ 30,00
- **Uramaki Skin** - R$ 35,00

### Sashimis
- **Sashimi Salmão (2 peças)** - R$ 18,00
- **Sashimi Salmão (4 peças)** - R$ 28,00 (Popular)
- **Sashimi Salmão Trufa (2 peças)** - R$ 20,00

### Temakis
- **Temaki Philadelphia** - R$ 45,00
- **Temaki Hot Philadelphia** - R$ 46,00
- **Temaki Mexicano** - R$ 46,00

### Hot Rolls
- **Hot Philadelphia** - R$ 28,00 (Popular)
- **Hot Salmão Especial** - R$ 30,00

### Poke
- **Poke Salmão (200g)** - R$ 45,00
- **Poke Tropical (300g)** - R$ 48,00

### Entrada
- **Sunomono** - R$ 22,00

## 🎨 Design e Identidade Visual

- **Logo:** Ícone de sushi (🍣) em gradiente vermelho-laranja
- **Cores principais:** 
  - Vermelho (#ef4444)
  - Laranja (#f97316)
  - Cinza claro (#f9fafb)
- **Typography:** Inter font family
- **Estilo:** Clean, moderno, cards arredondados
- **Animações:** Transições suaves, hover effects

## 📞 Integração WhatsApp

O sistema gera automaticamente mensagens formatadas para WhatsApp:

```
🍣 PEDIDO MV SUSHI DELIVERY

👤 Cliente: [Nome]
📱 Telefone: [Telefone]  
📍 Endereço: [Endereço]

🛒 Itens do Pedido:
[Quantidade]x [Produto] - R$ [Valor]

💰 TOTAL: R$ [Total]

💳 PIX: 55996005343

⚠️ Importante: Enviar comprovante do PIX após o pagamento para confirmação do pedido.
```

## 🔧 Configurações Técnicas

### Estados Principais
- `cart` - Itens no carrinho
- `sushiMenu` - Produtos disponíveis
- `orders` - Histórico de pedidos
- `storeSettings` - Configurações da loja
- `isAdmin` - Modo administrativo

### Funcionalidades Avançadas
- Busca em tempo real
- Filtros dinâmicos por categoria
- Produtos populares destacados
- Controle de disponibilidade
- Responsive design mobile-first
- Animações e transições suaves

## 🚀 Deploy

### GitHub Pages
```bash
npm run build
# Upload da pasta build para seu hosting
```

### Netlify
1. Conecte seu repositório
2. Configure build command: `npm run build`
3. Configure publish directory: `build`

### Vercel
```bash
npm i -g vercel
vercel --prod
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**MV Sushi Delivery**
- 📱 WhatsApp: (55) 99600-5343
- 📍 Maurício Cardoso 1242, Centro - São Francisco de Assis, RS
- 💳 PIX: 55996005343

---

⭐ **Desenvolvido com React + Tailwind CSS** ⭐

*Sistema profissional de delivery com foco na experiência do usuário e facilidade de gerenciamento.*