import { state } from '../store/authStore';
import { injectURLQuery, Queries } from './urls';

export async function getJSON<T>(url: string, queries?: Queries, credentials = true): Promise<T> {
  const formatURL = queries ? injectURLQuery(url, queries) : url;
  return request('GET', formatURL, undefined, credentials);
}

export async function postJSON(url: string, body?: unknown, credentials = true) {
  return request('POST', url, body, credentials);
}
export function putJSON<T>(url: string, body?: unknown, credentials = true): Promise<T> {
  return request('PUT', url, body, credentials);
}
export function deleteJSON<T>(url: string, credentials = true): Promise<T> {
  return request('DELETE', url, undefined, credentials);
}
export function patchJSON<T>(url: string, body?: unknown, credentials = true): Promise<T> {
  return request('PATCH', url, body, credentials);
}

export async function request<T>(method: string, url: string, body: unknown, credentials: boolean) {
  const xhr = await fetch(url, {
    method,
    headers: createHeaders(credentials, body !== undefined),
    body: serializeBody(body),
  });
  if (xhr.ok) {
    const {
      error, code, message, data,
    } = await xhr.json() as { error?: boolean; code: string; message: string; data: T };
    if (error) {
      throw new Error(`${message}(${code})`);
    }
    return data;
  }
  const text = await xhr.text();
  throw new Error(text || `${xhr.status} ${xhr.statusText}`);
}

function serializeBody(body?: unknown): string | undefined {
  if (body === undefined) { return undefined; }
  if (typeof body === 'string') { return body; }
  return JSON.stringify(body);
}
function createHeaders(credentials: boolean, hasBody: boolean) {
  const headers: Record<string, string> = {
    accept: 'application/json',
  };
  if (hasBody) {
    headers['content-type'] = 'application/json';
  }
  if (credentials) {
    const { token } = state;
    if (!token) {
      throw new Error('缺少登陆信息');
    }
    headers.token = token;
  }
  return headers;
}
