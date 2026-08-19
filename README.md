\# Avorqin



Avorqin is a growing collection of fast, practical browser-based utility tools for developers and everyday technical tasks.



Production site: https://avorqin.com



\## Current Tool Library



Avorqin currently includes 75 utility tools across categories such as:



\- JSON \& Data

\- Code Formatters

\- Developer Converters

\- Encode \& Decode

\- Developer Generators

\- Web \& Code

\- Developer Calculators

\- Color Tools



Most tools perform their primary processing directly in the browser.



\## Technology



\- Next.js 15

\- React 19

\- TypeScript

\- Tailwind CSS

\- Lucide React

\- Cloudflare Pages



\## Prerequisites



\- Node.js 20+

\- npm



\## Environment Variables



| Variable | Required | Description |

|----------|----------|-------------|

| `NEXT\_PUBLIC\_SITE\_URL` | Yes in production | Production site URL. For Avorqin: `https://avorqin.com` |



\## Installation



```bash

npm install

```



\## Development



```bash

npm run dev

```



The local development site is available at:



```text

http://localhost:3000

```



\## Production Build



Set the production site URL before building:



```bash

export NEXT\_PUBLIC\_SITE\_URL=https://avorqin.com

npm run build

```



\## Deployment



Avorqin is deployed through Cloudflare Pages.



Production deployments are triggered from the connected GitHub repository.



\## Project Structure



```text

app/

&#x20; tools/

components/

&#x20; layout/

&#x20; shared/

&#x20; tools/

lib/

&#x20; tool-utils/

&#x20; tool-categories.ts

&#x20; tools-data.ts

public/

```



\## Adding a New Tool



1\. Add the tool configuration to `lib/tools-data.ts`.

2\. Add any required utility logic to `lib/tool-utils/`.

3\. Add the interactive tool component to `components/tools/`.

4\. Add the tool page under `app/tools/`.

5\. Assign the tool to the appropriate category or categories in `lib/tool-categories.ts`.

6\. Run the production build.

7\. Deploy and test the tool.



The sitemap and category architecture use the central tool and category registries so new pages can be included automatically.



\## Sitemap



Avorqin's sitemap is generated from:



\- the main site pages;

\- the tool registry in `lib/tools-data.ts`;

\- the category registry in `lib/tool-categories.ts`.



The production sitemap uses `https://avorqin.com` as its site URL through the `NEXT\_PUBLIC\_SITE\_URL` production environment variable.



\## Privacy



Most Avorqin tools are designed to perform their primary processing locally in the browser. Individual tools that require external resources or services may operate differently.



See the site's Privacy Policy for additional information.

