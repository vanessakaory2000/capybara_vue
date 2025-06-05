# 🛒 Capybara - Catálogo de Produtos com Vue.js

Capybara é uma aplicação web construída com **Vue 3**, que permite aos usuários visualizar, favoritar e adicionar produtos ao carrinho de compras. Os dados são consumidos da API [DummyJSON](https://dummyjson.com/), e o estado do carrinho e favoritos é armazenado no `localStorage`.

## ✨ Funcionalidades

- 🔍 Busca e filtro de produtos
- 📦 Visualização de detalhes do produto
- 🛒 Adicionar e remover do carrinho
- ❤️ Adicionar e remover dos favoritos
- 📊 Visualização da quantidade em estoque, preço e avaliações
- 💾 Armazenamento no `localStorage`

## 🧑‍💻 Tecnologias utilizadas

- [Vue.js 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/capybara-vue.git
cd capybara-vue
```
2. Instale as dependências
```bash
Copiar
Editar
npm install
```
3. Inicie o servidor de desenvolvimento
```bash
Copiar
Editar
npm run dev
```
A aplicação estará disponível em http://localhost:5173.

🔗 API utilizada
https://dummyjson.com/products

📸 Captura de Tela

![Main Page](./public/tela_principal.png)
![Product Details](./public/detalhes_produto.png)
![Favorites](./public/favorites.png)
![Cart](./public/cart.png)