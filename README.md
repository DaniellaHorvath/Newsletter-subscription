# Newsletter subscription

A responsive, three-step onboarding flow built with vanilla JavaScript using a modular structure.

## Project overview

This app guides users through a simple onboarding journey:

1. Choose interested topics
2. Choose newsletters to subscribe to
3. Review a final summary of their selections
A responsive, three-step onboarding flow built with vanilla JavaScript using a modular structure.

## Project overview

This app guides users through a simple onboarding journey:

1. Choose interested topics
2. Choose newsletters to subscribe to
3. Review a final summary of their selections

Users can move between steps using the Next and Back buttons.

Low fidelity wireframes have been included in the `wireframes` directory:

- [Topic and newsletter pages](wireframes/select-options.png)
- [Thank you page](wireframes/thanks.png)

## Project structure

```text
.
├── asset/icons/            # SVG icons used by the UI
├── css/                    # Stylesheet(s)
├── data/                   # JSON data for topics and newsletters
│   ├── newsletters.json
│   └── topics.json
├── js/                     # Application logic and tests
│   ├── app.js
│   ├── app.test.js
│   ├── data.js
│   ├── data.test.js
│   ├── render.js
│   └── render.test.js
├── index.html              # Application entry point
├── babel.config.js         # Babel configuration for Jest
├── package.json            # Scripts and dependencies
└── README.md
```

## Requirements

Use the following versions for the best experience:

- Node.js: 20.x or newer (recommended 20 LTS or 22 LTS; verified in this environment with v24.16.0)
- npm: 10+ (verified in this environment with 11.13.0)

If you use nvm, you can run:

```bash
nvm install 20
nvm use 20
```

## Setup

```bash
git clone <your-repo-url>
cd "Newsletter subscription"
npm install
```

## Run the app locally

Because the app uses ES modules, it should be served from a local web server rather than opened directly from the file system.

### Option 1: VS Code Live Server

- Install the Live Server extension in VS Code
- The repository already includes a VS Code setting for the local server port in [.vscode/settings.json](.vscode/settings.json)
- Right-click index.html and choose Open with Live Server

The app should open at http://localhost:5504 when using the workspace configuration.

### Option 2: Node.js static server

```bash
npx serve .
```

Then open the local URL shown in the terminal, typically http://localhost:3000.

## Run tests

This project uses Jest for unit testing.

```bash
npm test
```

To watch tests while developing:

```bash
npm run test:watch
```

## Format code with Prettier

The repository includes a Prettier script:

```bash
npm run format
```

To check formatting without rewriting files:

```bash
npx prettier --check .
```

## Architectural highlights

- Modular design with separate concerns for app state, data loading, and rendering
- Responsive layout built with modern CSS techniques
- DOM updates use safe DOM APIs to reduce XSS risk
- Semantic buttons and accessible pressed states are used for interaction