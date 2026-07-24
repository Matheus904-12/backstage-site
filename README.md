# BACKSTAGE

Site institucional do coletivo BACKSTAGE (RH, Marketing, Cultura, Música, Cinema, Moda).

## Estrutura

```
index.html        → página inicial (carrossel + sobre + artigos)
sobre.html         → seção "o que é o BACKSTAGE"
rh.html            → página do departamento de RH
marketing.html     → página do departamento de Marketing
cultura.html       → página do departamento de Cultura
musica.html        → página do departamento de Música (+ bloco Spotify)
cinema.html        → página do departamento de Cinema (+ posts)
moda.html          → página do departamento de Moda (+ vídeo)
assets/style.css   → estilo compartilhado
assets/script.js   → carrossel, menu mobile, formulário de feedback
assets/img/        → imagens (reais e placeholders)
assets/video/      → vídeo de moda (ainda não enviado — ver pendências)
```

## Pendências (assets ainda não enviados)

- **Marketing:** sem fotos reais de dinâmica — o carrossel mostra um placeholder (`.media-placeholder` em `assets/style.css`) até a foto chegar
- **Cinema:** posts do Instagram (imagem + legenda) ainda são placeholders (`.media-placeholder`)
- **Moda:** vídeo real (`assets/video/moda-video.mp4`) ainda não enviado — o player está com poster de placeholder

Para trocar qualquer placeholder por uma foto real, substitua o `<div class="media-placeholder">...</div>` por um `<img src="assets/img/NOME-DA-FOTO.jpg" alt="...">` direto no HTML da página, mantendo o restante da estrutura.

## Rodar localmente

Basta abrir `index.html` no navegador, ou rodar um servidor local:

```bash
python3 -m http.server 8080
```

e acessar `http://localhost:8080`.
