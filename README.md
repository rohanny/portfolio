# ry.

minimal portfolio built with react, typescript, and tailwind.

## features

- **steam integration** — live gaming status & recently played
- **letterboxd integration** — latest watched films via rss
- **spotify/last.fm** — currently playing track
- **ascii matrix** — interactive pikachu animation
- **view transitions** — smooth theme switching

## stack

- vite + react + typescript
- tailwind css
- framer motion
- vercel serverless functions

## development

```bash
npm install
npm run dev
```

## environment variables

```env
VITE_LASTFM_USERNAME=
VITE_LASTFM_API_KEY=
VITE_STEAM_API_KEY=
VITE_STEAM_ID=
VITE_LETTERBOXD_USERNAME=

# serverless functions
STEAM_API_KEY=
```

## deployment

deployed on vercel. push to main to deploy.

---

*"despite everything, it's still you."*

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
