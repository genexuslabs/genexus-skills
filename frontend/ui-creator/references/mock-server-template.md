# Mock Server Template

Create `mock-server.ts` at the project root. Runs on port 3001 serving the same endpoints as the OpenAPI spec with in-memory mock data

```typescript
// mock-server.ts
import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PORT = 3001;

// --- Mock data (mutated in-memory for business logic simulation) ---
// IMPORTANT: After filling image URLs below, verify each one with:
//   curl -s -o /dev/null -w "%{http_code}" "<url>"
// Replace any non-200 URL with: https://placehold.co/{w}x{h}/E8F5E9/333?text={name}
let items = [
	{ id: 1, title: 'Sample', imageUrl: 'https://images.unsplash.com/photo-1234567890123?w=300&h=200&fit=crop' },
	// … 6–8 items
];

// --- Helpers ---
function json(res: ServerResponse, data: unknown, status = 200) {
	res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
	res.end(JSON.stringify(data));
}

function parseBody(req: IncomingMessage): Promise<any> {
	return new Promise((resolve) => {
		let body = '';
		req.on('data', (chunk: Buffer) => (body += chunk));
		req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); } });
	});
}

// --- Route handlers ---
type Handler = (req: IncomingMessage, res: ServerResponse, params: URLSearchParams) => void;

const routes: Record<string, Handler> = {
	'GET /rest/items': (_req, res) => json(res, items),
	// Add more endpoints matching the OpenAPI spec
};

// --- Server ---
const server = createServer((req, res) => {
	// Handle CORS preflight
	if (req.method === 'OPTIONS') {
		res.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		});
		return res.end();
	}

	const url = new URL(req.url!, `http://localhost:${PORT}`);
	const key = `${req.method} ${url.pathname}`;
	const handler = routes[key];
	if (handler) {
		handler(req, res, url.searchParams);
	} else {
		json(res, { error: 'Not found' }, 404);
	}
});

server.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
```
